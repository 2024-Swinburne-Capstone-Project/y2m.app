import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Adjust the path as necessary


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function resetDatabase() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Truncate all tables to reset the database
    await client.query('TRUNCATE TABLE "AccountNotification", "Badge", "Chat", "ChatParticipant", "DevelopmentArea", "Education", "Experience", "GetInTouch", "MediaRelease", "MentorFeedback", "MentorshipNotification", "MentorshipRequest", "Milestone", "MilestoneComment", "MilestoneStep", "Message", "MessageNotification", "User", "Video" CASCADE;');
    await client.query('COMMIT');
    
    // Log success message
    console.log('Database reset successfully'); // Add this line
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error resetting database:', error);
  } finally {
    client.release();
  }
}

// Export the function as the default export
export default resetDatabase;
