import "./globals.scss";
import Providers from './providers';

export const metadata = {
  title: "Econest",
  description: "Melhor loja online para seus produtos favoritos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>  
      </body>
    </html>
  );
}
