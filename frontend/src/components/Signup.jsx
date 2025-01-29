import { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function formSubmitHandler(e) {
    e.preventDefault();
    const userData = { firstName, lastName, username, password };

    const res = await fetch("http://localhost:3000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    setFirstName("");
    setLastName("");
    setUsername("");
    setLastName("");
  }
  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          value={firstName}
          placeholder="firstname"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="text"
          value={lastName}
          placeholder="lastName"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br></br>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
