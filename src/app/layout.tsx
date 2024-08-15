import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>{`Kelsey's Birthday Challenge`}</title>
      <body>{children}</body>
    </html>
  );
}
