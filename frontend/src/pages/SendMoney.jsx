import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.user;
  const token = localStorage.getItem("jwtToken");

  return (
    <div className="flex justify-center h-screen bg-slate-300 ">
      <div className="flex flex-col justify-center f-full ">
        <div className=" bg-white w-96 h-min  p-4  border shadow-lg rounded-lg text-card-foreground max-w-md space-y-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="text-center text-3xl font-bold ">Send Money</div>
          </div>
          <div className="flex  h-14 ">
            <div className=" h-12 w-12 mt-1 ml-2 rounded-full  bg-green-500  flex justify-center mr-4">
              <div className="text-2xl text-white flex flex-col justify-center h-full">
                {user.firstName[0].toUpperCase()}
              </div>
            </div>
            <div className="text-2xl font-semibold flex flex-col justify-center">
              {user.firstName + " " + user.lastName}
            </div>
          </div>
          <div className="">Amount (in Rs)</div>
          <div>
            <input
              type="number"
              className="shadow-sm border w-full rounded-md p-2"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <button
              type="button"
              className="w-full text-white bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={async () => {
                try {
                  const res = await axios.post(
                    "http://localhost:3000/api/v1/account/transfer",
                    { to: user._id, amount: amount },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  const { message } = res.data;
                  alert(message);
                  navigate("/dashboard");
                } catch (err) {
                  alert(err);
                }
              }}
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
