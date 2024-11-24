import "./globals.scss";


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
          {children}
      </body>
    </html>
  );
}
