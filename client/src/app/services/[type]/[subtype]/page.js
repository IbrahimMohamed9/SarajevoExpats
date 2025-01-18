import ServiceContent from "../ServiceContent";

export async function generateMetadata({ params }) {
  const type = params.type;
  const subtype = params.subtype;
  const Type = type.charAt(0).toUpperCase() + type.slice(1);
  const Subtype = subtype.charAt(0).toUpperCase() + subtype.slice(1);
  const fullServiceName = `${Subtype} ${Type}`;

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${fullServiceName} Services in Sarajevo | Sarajevo Expats`,
    description: `Find trusted ${fullServiceName.toLowerCase()} services in Sarajevo. Get connected with verified ${type} providers specializing in ${subtype} services. Access reliable ${subtype} assistance recommended by the expat community in Sarajevo.`,
    keywords: `${subtype} ${type} Sarajevo, ${fullServiceName.toLowerCase()} services, ${subtype} providers Sarajevo, expat ${type} services ${subtype}, Sarajevo ${subtype} ${type}, Bosnia ${subtype} assistance`,
    openGraph: {
      title: `${fullServiceName} Services in Sarajevo | Sarajevo Expats`,
      description: `Find trusted ${fullServiceName.toLowerCase()} services in Sarajevo. Get connected with verified ${type} providers specializing in ${subtype} services. Access reliable ${subtype} assistance recommended by the expat community in Sarajevo.`,
      type: "website",
      locale: "en_US",
      siteName: "Sarajevo Expats",
    },
  };
}

const Page = async ({ params }) => {
  return <ServiceContent type={params.type} subtype={params.subtype} />;
};

export default Page;
