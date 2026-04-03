import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "N3 Vocabulary Learning",
  description: "Learn JLPT N3 vocabulary with flashcards, typing practice, and quizzes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
