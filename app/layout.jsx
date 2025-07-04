import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "HaikuVerse – Create, Share & Discover Haiku Poetry",
  description:
    "HaikuVerse is a modern Next.js app for writing, editing, and sharing beautiful haiku poems. Explore a vibrant community, upload images, and enjoy a seamless poetry experience.",
  openGraph: {
    title: "HaikuVerse – Create, Share & Discover Haiku Poetry",
    description:
      "Write, edit, and share haiku poems with images. Join a creative community on HaikuVerse.",
    images: [
      {
        url: "https://cdn.slidesharecdn.com/ss_thumbnails/ghaikulessonpresentation-090820222228-phpapp02-thumbnail.jpg", // Place this image in your public/ directory
        width: 1200,
        height: 630,
        alt: "HaikuVerse – Create, Share & Discover Haiku Poetry",
      },
    ],
  },
  icons: {
    icon: "/favicon.png", // Place your favicon.ico in the public/ directory
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className=" bg-gray-600 ">
          <Header />
        </header>
        <main className="container mx-auto p-10">{children}</main>

        <footer className="footer p-4 bg-gray-800 text-center fixed bottom-0 w-full">
          <div className="flex justify-center items-center gap-1">
            <p className="text-gray-400">
              Copyright &copy; {new Date().getFullYear()}{" "}
            </p>
            <a
              className="text-purple-500 hover:text-purple-400 transition-colors"
              href="https://razorisuru.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              RaZoR
            </a>
            <p className="text-gray-400">- All Rights Reserved</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
