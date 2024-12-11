import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sarajevo Expats",
  description: "A description of your site.",
  // openGraph: {
  //   title: "Sarajevo Expats",
  //   description: "A description of your site.",
  //   url: "https://yoursite.com",
  //   siteName: "Your Site Name",
  //   images: [
  //     {
  //       url: "https://yoursite.com/image.jpg",
  //       width: 800,
  //       height: 600,
  //       alt: "Your Image Description",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@yoursite",
  //   title: "Your Site Title",
  //   description: "A description of your site.",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
