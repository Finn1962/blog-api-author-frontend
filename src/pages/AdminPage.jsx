import PageWrapper from "../Components/PageWrapper";
import DeleteButton from "../Components/DeleteButton";
import EditButton from "../Components/EditButton";

function AdminPage() {
  return (
    <PageWrapper>
      <div className="w-full max-w-5xl ">
        <div className="overflow-x-auto">
          <table className="table table-md bg-base-100 p-3 table-fixed w-full ">
            <thead>
              <tr className="h-14">
                <th className="w-20 "></th>
                <th className="w-1/4 text-accent font-heading text-lg">Name</th>
                <th className="text-accent font-heading hidden sm:table-cell text-lg">
                  Role
                </th>
                <th className=" text-accent font-heading sm:text-end text-start text-lg">
                  Created at
                </th>
                <th className="w-30"></th>
              </tr>
            </thead>
            <tbody>
              <User index={1} />
              <User index={2} />
              <User index={3} />
              <User index={4} />
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}

function User({ index }) {
  return (
    <tr className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}>
      <th>
        <div className="h-full bg-accent p-2 rounded-full w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-person-fill h-full invert opacity-20"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </div>
      </th>
      <td>Cy Ganderton</td>
      <td className="hidden sm:table-cell">Admin</td>
      <td className="sm:text-end text-start">01.01.2000</td>
      <td>
        <div className="flex gap-2 justify-end items-center h-full">
          <EditButton
            className={
              index % 2 === 0 ? "hover:bg-base-200" : "hover:bg-base-100"
            }
          />
          <DeleteButton
            className={
              index % 2 === 0 ? "hover:bg-base-200" : "hover:bg-base-100"
            }
          />
        </div>
      </td>
    </tr>
  );
}

export default AdminPage;
