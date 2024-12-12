import AdminTableTemplete from "@/components/templetes/AdminTableTemplete";

const Page = async () => {
  return (
    <>
      <AdminTableTemplete title="Places" path="/places" />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Place Types"
        path="/placetypes/with-places"
        subDataTitle="Place"
      />
    </>
  );
};

export default Page;
