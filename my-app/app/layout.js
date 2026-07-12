import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "FleetOps",
  description: "Fleet management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
