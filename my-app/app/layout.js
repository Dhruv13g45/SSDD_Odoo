import AuthProvider from "@/components/auth/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "TransitOps",
  description: "Transit operations management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
