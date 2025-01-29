import Heading from "../components/Heading";
import InputField from "../components/InputBox";
import Subheading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const buttonClickHandler = async () => {
    const newUser = { firstName, lastName, username, password };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        newUser
      );
      const { token, message } = res.data;
      if (token) {
        localStorage.setItem("jwtToken", token);
        alert(message);
        navigate("/dashboard");
      } else {
        alert("Sign-up failed.");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex justify-center  bg-slate-300 h-screen">
      <div className="flex flex-col justify-center ">
        <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your information to create an account"} />
          <InputField
            label="Firstname"
            placeholder={"jack"}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <InputField
            label="Lastname"
            placeholder={"sher"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            label="Email"
            placeholder={"jack@gmail.com"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            label="Password"
            placeholder={"duniyakapapa"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4">
            <Button label={"Sign up"} onClick={buttonClickHandler} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
