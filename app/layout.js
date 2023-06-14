import "./globals.css";

export const metadata = {
  title: "Todo It",
  description: "A todo list for everyday",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
