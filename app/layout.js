import './globals.css';
import { getCurrentUser } from '@/lib/session';

export const metadata = {
  title: 'MixMate — Mocktail recipes',
  description: 'Discover, save, and create delicious mocktail recipes.'
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a className="brand" href="/">MixMate</a>
          <nav>
            <a href="/recipes">Recipes</a>
            <a href="/favorites">Favorites</a>
            <a href="/my-recipes">My recipes</a>
            {user ? <><span className="user-greeting">Hi, {user.username}</span><a href="/api/auth/logout">Log out</a></> : <><a href="/login">Log in</a><a className="button primary nav-button" href="/register">Create account</a></>}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
