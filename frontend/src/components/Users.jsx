import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Users = ({ users, onChange, value }) => {
  return (
    <div className="mt-6">
      <div>
        <div className="pb-2 font-bold text-xl">Users</div>
        <input
          placeholder="Search users..."
          type="text"
          className="shadow-sm border w-full rounded-md px-2 py-1"
          onChange={onChange}
          value={value}
        />
      </div>
      <div className="mt-4">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between h-14  ">
      <div className="flex">
        <div className="h-12 w-12 bg-slate-200 mt-1 ml-2 flex justify-center rounded-full">
          <div className=" h-full flex flex-col justify-center text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full  ml-2">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="h-full bg  flex flex-col justify-center ">
        <Button
          label={"Send Money"}
          onClick={() => {
            navigate("/send", { state: { user } });
          }}
        />
      </div>
    </div>
  );
}

export default Users;
