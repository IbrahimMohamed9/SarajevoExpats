import Button from "@mui/material/Button";

export default async function Home() {
  return (
    <>
      <div className="container m-auto flex flex-col gap-4 overflow-hidden p-5">
        <div className="flex justify-end">
          <Button variant="contained" color="primary">
            Add New
          </Button>
        </div>
      </div>

      <div className="container m-auto flex flex-col gap-4 overflow-hidden p-5">
        <div className="flex justify-end">
          <Button variant="contained" color="primary">
            Add New
          </Button>
        </div>
      </div>

      <div className="container m-auto flex flex-col gap-4 overflow-hidden p-5">
        <div className="flex justify-end">
          <Button variant="contained" color="primary">
            Add New
          </Button>
        </div>
      </div>
    </>
  );
}
