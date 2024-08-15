import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{`Kelsey's Birthday Challenge`}</title>
        <meta name="theme-color" content="darkgray" />
        <meta property="og:url" content="/" />
        <meta property="og:title" content={`Kelsey's Birthday Challenge`} />
        <meta property="og:type" content="website" />
      </head>
      <body>{children}</body>
    </html>
  );
}
