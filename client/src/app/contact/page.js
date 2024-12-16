import ContactInfo from "@/components/atoms/ContactInfo";

const Contact = () => {
  const phone = "+387 61 011 118";
  const email = "contact@example.com";
  const whatsappLink = "https://chat.whatsapp.com/K7yBPN5rYs7K4d2uNg1dHT";

  return (
    <div className="container mx-auto px-4 pb-8">
      <ContactInfo phone={phone} email={email} whatsappLink={whatsappLink} />
    </div>
  );
};

export default Contact;
