import ArticleTemplete from "@templates/ArticleTemplete";

export async function generateMetadata({ params }) {
  const type = params.type;
  const Type = type.charAt(0).toUpperCase() + type.slice(1);

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `Best ${Type} in Sarajevo | Local Guide | Sarajevo Expats`,
    description: `Discover the finest ${type} in Sarajevo. From popular spots to hidden gems, explore our curated selection of ${type} recommended by local expats. Find authentic ${type} experiences in Bosnia's capital.`,
    keywords: `${type} Sarajevo, best ${type} Sarajevo, recommended ${type} Sarajevo, top ${type} Bosnia, expat guide ${type} Sarajevo, where to find ${type} Sarajevo, popular ${type} spots Sarajevo`,
    openGraph: {
      title: `Best ${Type} in Sarajevo | Local Guide`,
      description: `Discover the finest ${type} in Sarajevo. From popular spots to hidden gems, explore our curated selection of ${type} recommended by local expats.`,
      type: "website",
      locale: "en_US",
      siteName: "Sarajevo Expats",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://sarajevoexpats.com/places/${type}`,
    },
  };
}

const Page = async ({ params }) => {
  return <ArticleTemplete url={`/places/${params.id}`} contentType="Place" />;
};

export default Page;
