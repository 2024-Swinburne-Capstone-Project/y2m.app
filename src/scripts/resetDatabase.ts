import { execSync } from 'child_process';

async function globalSetup() {
  // Start the database
  execSync('npm run db:start', { stdio: 'inherit' });

  // Optionally, you can add a delay here to ensure the database is fully up
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds

  // You can also add any other setup logic here if needed
}

// Call this function to stop the database after tests
async function globalTeardown() {
  execSync('npm run db:stop', { stdio: 'inherit' });
}

export default globalSetup;
export { globalTeardown };