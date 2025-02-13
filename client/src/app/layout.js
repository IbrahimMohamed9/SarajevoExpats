import "./globals.css";
import Header from "@organisms/Header";
import Footer from "@organisms/Footer";
import RecoilRootWrapper from "@atoms/RecoilRootWrapper";
import AdSense from "@atoms/AdSense";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { favicon } from "@/favicon";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title: "Sarajevo Expats",
  description: "Your comprehensive guide to living in Sarajevo as an expat",
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "/favicon_io/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      {
        url: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-chrome-192",
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512",
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Sarajevo Expats",
    description: "Your comprehensive guide to living in Sarajevo as an expat",
    url: "https://sarajevoexpats.com",
    siteName: "Sarajevo Expats",
    images: [
      {
        url: "/favicon_io/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Sarajevo Expats Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarajevo Expats",
    description: "Your comprehensive guide to living in Sarajevo as an expat",
    images: ["/favicon_io/android-chrome-512x512.png"],
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        {/* Favicon Links */}
        {favicon.map((item, index) => (
          <link
            key={index}
            rel={item.rel}
            href={item.href}
            sizes={item.sizes}
            type={item.type}
          />
        ))}
        {/* Meta Tags for SEO */}
        <meta name="description" content={metadata.description} />
        <meta
          name="keywords"
          content="Sarajevo, expats, living in Sarajevo, local services, news, events"
        />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta
          property="og:image:width"
          content={metadata.openGraph.images[0].width}
        />
        <meta
          property="og:image:height"
          content={metadata.openGraph.images[0].height}
        />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        {/* Manifest Link */}
        <link rel="manifest" href={metadata.manifest} />
        {/* AdSense */}
        <AdSense />
      </Head>
      <body className={roboto.className}>
        <RecoilRootWrapper>
          <Header />
          {children}
          <Footer />
        </RecoilRootWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
