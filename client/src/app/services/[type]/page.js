import ServiceContent from "./ServiceContent";

export async function generateMetadata({ params }) {
  const type = params.type;
  const Type = type.charAt(0).toUpperCase() + type.slice(1);

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${Type} Services in Sarajevo | Sarajevo Expats`,
    description: `Find trusted ${type} services in Sarajevo. Browse our curated list of verified ${type} service providers, recommended by the expat community. Get reliable assistance for all your ${type} needs in Sarajevo.`,
    keywords: `${type} services Sarajevo, ${type} providers Bosnia, expat ${type} services, Sarajevo ${type}, Bosnia ${type}, trusted ${type} Sarajevo`,
    openGraph: {
      title: `${Type} Services in Sarajevo | Sarajevo Expats`,
      description: `Find trusted ${type} services in Sarajevo. Browse our curated list of verified ${type} service providers, recommended by the expat community.`,
      type: "website",
      locale: "en_US",
      siteName: "Sarajevo Expats",
    },
  };
}

const Page = async ({ params }) => {
  return <ServiceContent type={params.type} />;
};

export default Page;
