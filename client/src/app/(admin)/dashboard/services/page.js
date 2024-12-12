import AdminTableTemplete from "@/components/templetes/AdminTableTemplete";

const Page = async () => {
  return (
    <>
      <AdminTableTemplete title="Services" path="/services" />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Service Subtypes"
        path="/serviceSubtypes/with-services"
        subDataTitle="Service"
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Service Types"
        path="/serviceTypes/with-subtypes"
        subDataTitle="Service Subtype"
      />
    </>
  );
};

export default Page;
