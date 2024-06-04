import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios';
import { useState } from "react"
import { useNavigate } from "react-router-dom"; // Add this import

export const Signin = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="harkirat@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
            label={"Email"}
          />
          <InputBox
            placeholder="123456"
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                  username,
                  password
                });
                const token = await response.data;
                localStorage.setItem("token", token.token);
                console.log("token stored in localstorage ",token.token);
                navigate("/dashboard"); // Navigate to "/dashboard" after successful sign-in
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
