import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Providers } from "./providers"; // Vamos criar este arquivo abaixo
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning é necessário para next-themes
    <html lang="pt-br" suppressHydrationWarning>
      <body className="bg-brand-bg dark:bg-brand-dark flex flex-col min-h-screen antialiased transition-colors duration-500">
        <Providers>
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}