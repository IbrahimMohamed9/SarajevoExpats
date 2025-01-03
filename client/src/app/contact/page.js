import ContactInfo from "@atoms/ContactInfo";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title: "Contact Us | Get in Touch | Sarajevo Expats",
  description:
    "Connect with Sarajevo Expats community. Reach out to us via phone, email, or WhatsApp for inquiries, support, or to join our expat community in Sarajevo. We're here to help you make the most of your time in Bosnia.",
  keywords:
    "contact Sarajevo Expats, reach out, get in touch, expat support Sarajevo, WhatsApp group Sarajevo, expat community contact, Sarajevo expat help",
  openGraph: {
    title: "Contact Sarajevo Expats | Get in Touch",
    description:
      "Connect with Sarajevo Expats community. Reach out to us via phone, email, or WhatsApp for inquiries and support.",
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
    canonical: "https://sarajevoexpats.com/contact",
  },
};

const Contact = () => {
  const phone = "+387 61 011 118";
  const email = "contact@example.com";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8 text-center">
          Have questions or need assistance? We're here to help! Reach out to us
          through any of the following channels:
        </p>
        <ContactInfo phone={phone} email={email} />
      </div>
    </div>
  );
};

export default Contact;
