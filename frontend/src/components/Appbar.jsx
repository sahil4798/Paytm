import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Appbar = ({ username }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between  shadow  h-14">
        <div className=" flex flex-col justify-center ml-4 h-ful">
          PayTM App
        </div>
        <div className="flex ">
          <div className="mr-4 flex flex-col justify-center h-full">
            {username}
          </div>
          <div className="bg-slate-200 h-12 w-12 mt-1 mr-2  flex justify-center rounded-full">
            <div className=" flex flex-col justify-center  h-full">U</div>
          </div>
          <div className="flex flex-col justify-center h-full mr-2 ">
            <Button
              label={"logout"}
              onClick={() => {
                localStorage.removeItem("jwtToken");
                navigate("/signin");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
