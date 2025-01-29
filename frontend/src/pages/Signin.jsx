import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function buttonClickHandler() {
    const userData = { username, password };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        userData
      );

      const { message, token } = res.data;
      if (token) {
        localStorage.setItem("jwtToken", token);
        alert(message);
        navigate("/dashboard");
      } else {
        alert("Sign-in failed.");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex  justify-center bg-slate-300 h-screen">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg text-center w-80 p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            label={"Email"}
            placeholder={"jack@gmail.com"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"duniyakapapa"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={buttonClickHandler} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
