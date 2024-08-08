import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Badge, DevelopmentArea, Milestone, MilestoneStep } from '@/types';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('X-User-Id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  try {
    const [milestones, milestoneSteps, developmentAreas, badges] = await Promise.all([
      db.selectFrom('Milestone').selectAll().where('userId', '=', userId).execute(),
      db
        .selectFrom('MilestoneStep as ms')
        .innerJoin('Milestone as m', 'm.id', 'ms.milestoneId')
        .selectAll('ms')
        .select(['m.title as milestoneTitle'])
        .where('m.userId', '=', userId)
        .execute(),
      db.selectFrom('DevelopmentArea').selectAll().where('userId', '=', userId).execute(),
      db.selectFrom('Badge').selectAll().where('userId', '=', userId).execute(),
    ]);

    return NextResponse.json({
      milestones,
      milestoneSteps,
      developmentAreas,
      badges,
    });
  } catch (error) {
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
      milestones: Partial<Milestone>[];
      milestoneSteps: Partial<MilestoneStep>[];
      developmentAreas: Partial<DevelopmentArea>[];
      badges: Partial<Badge>[];
    } = await req.json();

    await db.transaction().execute(async (trx) => {
      if (milestoneSteps) {
        const existingSteps = await trx
          .selectFrom('MilestoneStep')
          .select('MilestoneStep.id as id')
          .innerJoin('Milestone', 'Milestone.id', 'MilestoneStep.milestoneId')
          .where('Milestone.userId', '=', userId)
          .execute();

        const existingStepIds = new Set(existingSteps.map((s) => s.id));

        for (const step of milestoneSteps) {
          if (step.id && existingStepIds.has(Number(step.id))) {
            await trx
              .updateTable('MilestoneStep')
              .set({
                name: step.name,
                status: step.status,
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
              })
              .execute();
          }
        }

        for (const idToRemove of Array.from(existingStepIds)) {
          await trx.deleteFrom('MilestoneStep').where('id', '=', idToRemove).execute();
        }
      }

      if (milestones) {
        const existingMilestones = await trx
          .selectFrom('Milestone')
          .select('id')
          .where('userId', '=', userId)
          .execute();

        const existingMilestoneIds = new Set(existingMilestones.map((m) => m.id));

        for (const milestone of milestones) {
          if (milestone.id && existingMilestoneIds.has(Number(milestone.id))) {
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
            existingMilestoneIds.delete(Number(milestone.id));
          } else if (
            milestone.title &&
            milestone.status &&
            milestone.startDate &&
            milestone.endDate
          ) {
            await trx
              .insertInto('Milestone')
              .values({
                userId,
                title: milestone.title,
                status: milestone.status,
                startDate: milestone.startDate?.toString(),
                endDate: milestone.endDate?.toString(),
              })
              .execute();
          }
        }

        for (const idToRemove of Array.from(existingMilestoneIds)) {
          await trx
            .deleteFrom('Milestone')
            .where('id', '=', idToRemove)
            .where('userId', '=', userId)
            .execute();
        }
      }

      if (developmentAreas) {
        const existingAreas = await trx
          .selectFrom('DevelopmentArea')
          .select('id')
          .where('userId', '=', userId)
          .execute();

        const existingAreaIds = new Set(existingAreas.map((a) => a.id));

        for (const area of developmentAreas) {
          if (area.id && existingAreaIds.has(Number(area.id))) {
            await trx
              .updateTable('DevelopmentArea')
              .set({
                name: area.name,
              })
              .where('id', '=', Number(area.id))
              .where('userId', '=', userId)
              .execute();
            existingAreaIds.delete(Number(area.id));
          } else if (area.name) {
            await trx
              .insertInto('DevelopmentArea')
              .values({
                userId,
                name: area.name,
              })
              .execute();
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

      if (badges) {
        const existingBadges = await trx
          .selectFrom('Badge')
          .select('id')
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
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
