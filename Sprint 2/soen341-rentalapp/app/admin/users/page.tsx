import Features from "@/components/admin/Features";
import FormWrapper from "@/components/admin/FormWrapper";
import Pagination from "@/components/admin/Pagination";
import TableRow from "@/components/table/row";
import { createUser, getAllUsers, updateUser } from "@/lib/actions/usersActions";
import User from "@/models/user";

export default async function UsersCrud({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { users, count, totalPage } = await getAllUsers(searchParams);
  let newUser = new User();
  const newUserJSON = {
    _id: newUser._id.toString(),
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: newUser.password,
    role: newUser.role,
  };
  return (
    <div className="w-[80%]">
      <FormWrapper updateAction={updateUser} createAction={createUser}></FormWrapper>
      <div className="flex w-full flex-col rounded-lg px-12 py-4">
        <Features newItemModel={newUserJSON} />
        <table className="table-auto rounded-xl border bg-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user._id} item={user}></TableRow>
            ))}
          </tbody>
        </table>
      </div>
      {totalPage && <Pagination totalPage={totalPage} />}
    </div>
  );
}
