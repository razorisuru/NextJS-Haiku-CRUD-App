import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Haiku App",
  description: "NextJS-Haiku-CRUD-App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className=" bg-gray-600 ">
          <Header />
        </header>
        <main className="container mx-auto p-10">{children}</main>

        <footer className="footer footer-center p-10 ">
          <p className="text-gray-400">
            Copyright &copy; {new Date().getFullYear()} - All Right Reserved
          </p>
        </footer>
      </body>
    </html>
  );
}
