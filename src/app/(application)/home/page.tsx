import { getSession } from '@auth0/nextjs-auth0';

export default async function Profile() {
  const session = await getSession();
  const user = session?.user;
  return (
    <div className="max-w-7xl">
      <h1>Hi {user?.name}!!</h1>
      <p>Your user id is {user?.sub}</p>
    </div>
  );
}
