import { NextRequest, NextResponse } from 'next/server';
import { Badge, DevelopmentArea, Milestone, MilestoneStep, MilestoneComment } from '@/types';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }
  try {
    const [milestones, milestoneSteps, milestoneComments, developmentAreas, badges] =
      await Promise.all([
        db.selectFrom('Milestone').selectAll().where('userId', '=', userId).execute(),
        db
          .selectFrom('MilestoneStep as ms')
          .innerJoin('Milestone as m', 'm.id', 'ms.milestoneId')
          .selectAll('ms')
          .select(['m.title as milestoneTitle'])
          .where('m.userId', '=', userId)
          .execute(),
        db
          .selectFrom('MilestoneComment as mc')
          .innerJoin('Milestone as m', 'm.id', 'mc.milestoneId')
          .selectAll('mc')
          .where('m.userId', '=', userId)
          .execute(),
        db.selectFrom('DevelopmentArea').selectAll().where('userId', '=', userId).execute(),
        db.selectFrom('Badge').selectAll().where('userId', '=', userId).execute(),
      ]);

    // Group comments by milestoneId
    const commentsByMilestone = milestoneComments.reduce(
      (acc, comment) => {
        if (!acc[Number(comment.milestoneId)]) {
          acc[Number(comment.milestoneId)] = [];
        }
        acc[Number(comment.milestoneId)].push(comment as unknown as MilestoneComment);
        return acc;
      },
      {} as Record<number, MilestoneComment[]>
    );

    // Attach comments to milestones
    const milestonesWithComments = milestones.map((milestone) => ({
      ...milestone,
      comments: commentsByMilestone[milestone.id] || [],
    }));

    return NextResponse.json({
      milestones: milestonesWithComments,
      milestoneSteps,
      developmentAreas,
      badges,
    });
  } catch (error) {
    console.error('Error in GET /api/development-hub:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userId = req.headers.get('X-User-Id');
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
    }

    const {
      milestones,
      milestoneSteps,
      developmentAreas,
      badges,
    }: {
      milestones: Partial<Milestone & { comments?: Partial<MilestoneComment>[] }>[];
      milestoneSteps: Partial<MilestoneStep>[];
      developmentAreas: Partial<DevelopmentArea>[];
      badges: Partial<Badge>[];
    } = await req.json();

    await db.transaction().execute(async (trx) => {
      // Handle milestones and their comments
      if (milestones) {
        const existingMilestones = await trx
          .selectFrom('Milestone')
          .select(['id'])
          .where('userId', '=', userId)
          .execute();

        const existingMilestoneIds = new Set(existingMilestones.map((m) => m.id));

        for (const milestone of milestones) {
          if (milestone.id && existingMilestoneIds.has(Number(milestone.id))) {
            // Update existing milestone
            await trx
              .updateTable('Milestone')
              .set({
                title: milestone.title,
                status: milestone.status,
                startDate: milestone.startDate?.toString(),
                endDate: milestone.endDate?.toString(),
              })
              .where('id', '=', Number(milestone.id))
              .where('userId', '=', userId)
              .execute();

            // Handle comments for existing milestone
            if (milestone.comments) {
              const existingComments = await trx
                .selectFrom('MilestoneComment')
                .select(['id'])
                .where('milestoneId', '=', milestone.id.toString())
                .execute();

              const existingCommentIds = new Set(existingComments.map((c) => c.id));

              for (const comment of milestone.comments) {
                if (comment.id && existingCommentIds.has(Number(comment.id))) {
                  // Update existing comment
                  await trx
                    .updateTable('MilestoneComment')
                    .set({
                      content: comment.content,
                    })
                    .where('id', '=', Number(comment.id))
                    .execute();
                  existingCommentIds.delete(Number(comment.id));
                } else if (comment.content) {
                  // Insert new comment
                  await trx
                    .insertInto('MilestoneComment')
                    .values({
                      milestoneId: milestone.id.toString(),
                      content: comment.content,
                      createdAt: new Date().toISOString(),
                    })
                    .execute();
                }
              }

              // Remove comments that no longer exist
              for (const commentIdToRemove of Array.from(existingCommentIds)) {
                await trx
                  .deleteFrom('MilestoneComment')
                  .where('id', '=', commentIdToRemove)
                  .execute();
              }
            }
          } else if (
            milestone.title &&
            milestone.status &&
            milestone.startDate &&
            milestone.endDate
          ) {
            // Insert new milestone
            const [newMilestone] = await trx
              .insertInto('Milestone')
              .values({
                userId,
                title: milestone.title,
                status: milestone.status,
                startDate: milestone.startDate?.toString(),
                endDate: milestone.endDate?.toString(),
              })
              .returning(['id'])
              .execute();

            // Insert associated comments if any
            if (milestone.comments && milestone.comments.length > 0) {
              await trx
                .insertInto('MilestoneComment')
                .values(
                  milestone.comments.map((comment) => ({
                    milestoneId: newMilestone.id.toString(),
                    content: comment.content,
                    createdAt: new Date().toISOString(),
                  }))
                )
                .execute();
            }
          }
          existingMilestoneIds.delete(Number(milestone.id));
        }

        // Remove milestones that no longer exist
        for (const idToRemove of Array.from(existingMilestoneIds)) {
          // Remove associated comments
          await trx;
          await trx.deleteFrom('MilestoneStep').where('milestoneId', '=', idToRemove).execute();

          // Then, delete associated MilestoneComments
          await trx
            .deleteFrom('MilestoneComment')
            .where('milestoneId', '=', idToRemove.toString())
            .execute();

          // Finally, delete the Milestone
          await trx
            .deleteFrom('Milestone')
            .where('id', '=', idToRemove)
            .where('userId', '=', userId)
            .execute();
        }
      }

      // Handle milestone steps
      if (milestoneSteps) {
        const existingSteps = await trx
          .selectFrom('MilestoneStep as ms')
          .innerJoin('Milestone as m', 'm.id', 'ms.milestoneId')
          .select(['ms.id'])
          .where('m.userId', '=', userId)
          .execute();

        const existingStepIds = new Set(existingSteps.map((s) => s.id));

        for (const step of milestoneSteps) {
          if (step.id && existingStepIds.has(Number(step.id))) {
            await trx
              .updateTable('MilestoneStep')
              .set({
                name: step.name,
                status: step.status,
                dueDate: step.dueDate?.toString(),
              })
              .where('id', '=', Number(step.id))
              .execute();
            existingStepIds.delete(Number(step.id));
          } else if (step.milestoneId && step.name && step.status) {
            await trx
              .insertInto('MilestoneStep')
              .values({
                milestoneId: step.milestoneId,
                name: step.name,
                status: step.status,
                dueDate:
                  step.dueDate?.toString() ||
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              })
              .execute();
          }
        }

        for (const idToRemove of Array.from(existingStepIds)) {
          await trx.deleteFrom('MilestoneStep').where('id', '=', idToRemove).execute();
        }
      }

      // Handle development areas
      if (developmentAreas) {
        const existingAreas = await trx
          .selectFrom('DevelopmentArea')
          .select(['id'])
          .where('userId', '=', userId)
          .execute();

        const existingAreaIds = new Set(existingAreas.map((a) => a.id));

        for (const area of developmentAreas) {
          if (area.id && existingAreaIds.has(Number(area.id))) {
            await trx
              .updateTable('DevelopmentArea')
              .set({ name: area.name })
              .where('id', '=', Number(area.id))
              .where('userId', '=', userId)
              .execute();
            existingAreaIds.delete(Number(area.id));
          } else if (area.name) {
            await trx.insertInto('DevelopmentArea').values({ userId, name: area.name }).execute();
          }
        }

        for (const idToRemove of Array.from(existingAreaIds)) {
          await trx
            .deleteFrom('DevelopmentArea')
            .where('id', '=', idToRemove)
            .where('userId', '=', userId)
            .execute();
        }
      }

      // Handle badges
      if (badges) {
        const existingBadges = await trx
          .selectFrom('Badge')
          .select(['id'])
          .where('userId', '=', userId)
          .execute();

        const existingBadgeIds = new Set(existingBadges.map((b) => b.id));

        for (const badge of badges) {
          if (badge.id && existingBadgeIds.has(Number(badge.id))) {
            await trx
              .updateTable('Badge')
              .set({
                name: badge.name,
                icon: badge.icon,
                senderName: badge.senderName,
                receivedDate: badge.receivedDate?.toString(),
                message: badge.message,
              })
              .where('id', '=', Number(badge.id))
              .where('userId', '=', userId)
              .execute();
            existingBadgeIds.delete(Number(badge.id));
          } else if (
            badge.name &&
            badge.icon &&
            badge.senderName &&
            badge.receivedDate &&
            badge.message
          ) {
            await trx
              .insertInto('Badge')
              .values({
                userId,
                name: badge.name,
                icon: badge.icon,
                senderName: badge.senderName,
                receivedDate: badge.receivedDate?.toString(),
                message: badge.message,
              })
              .execute();
          }
        }

        for (const idToRemove of Array.from(existingBadgeIds)) {
          await trx
            .deleteFrom('Badge')
            .where('id', '=', idToRemove)
            .where('userId', '=', userId)
            .execute();
        }
      }
    });

    return NextResponse.json({ message: 'Development hub updated successfully' });
  } catch (error) {
    console.error('Error in PUT /api/development-hub:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
