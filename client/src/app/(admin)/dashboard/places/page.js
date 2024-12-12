import AdminTableTemplete from "@templates/AdminTableTemplete";

const Page = async () => {
  return (
    <>
      <AdminTableTemplete title="Places" tableKey="places" />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Place Types"
        tableKey="placetypes/with-places"
        subDataTitle="Place"
      />
    </>
  );
};

export default Page;
