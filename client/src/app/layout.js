import "./globals.css";
import Header from "@organisms/Header";
import Footer from "@organisms/Footer";
import RecoilRootWrapper from "@atoms/RecoilRootWrapper";

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
  // TODO: delete suppressHydrationWarning
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <RecoilRootWrapper>
          <Header />
          {children}
          <Footer />
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
