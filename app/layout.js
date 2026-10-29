import './globals.css';

export const metadata = {
  title: 'MixMate — Mocktail recipes',
  description: 'Discover, save, and create delicious mocktail recipes.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a className="brand" href="/">MixMate</a>
          <nav>
            <a href="/recipes">Recipes</a>
            <a href="/favorites">Favorites</a>
            <a href="/login">Log in</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
