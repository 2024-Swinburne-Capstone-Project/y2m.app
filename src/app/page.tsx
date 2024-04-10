import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <>
          <a href="/api/auth/logout">Logout</a>
          <code>{JSON.stringify(user, null, 2)}</code>
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
}
