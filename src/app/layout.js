import { Inter } from "next/font/google"


export const metadata = {
  title: "AsciiDoc tool",
  description: "AsciiDoc live preview editor by Tu2l",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
