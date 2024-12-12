import AdminTableTemplete from "@templates/AdminTableTemplete";

const Page = async () => {
  return (
    <>
      <AdminTableTemplete title="Services" tableKey="services" />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Service Subtypes"
        tableKey="serviceSubtypes/with-services"
        subDataTitle="Service"
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Service Types"
        tableKey="serviceTypes/with-subtypes"
        subDataTitle="Service Subtype"
      />
    </>
  );
};

export default Page;
