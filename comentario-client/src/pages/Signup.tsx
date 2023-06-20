import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import api from "../api/apiConfig";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [valid, isValid] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [fullnameError, setFullnameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullname) {
      setFullnameError("Full name is required");
      isValid(false);
    } else {
      setFullnameError("");
    }

    if (!username) {
      setUserNameError("Username is required");
      isValid(false);
    } else {
      setUserNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid(false);
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid(false);
    } else {
      setPasswordError("");
    }

    if (username && password && fullname && email) {
      isValid(true);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === 'Space') event.preventDefault()
  }

  useEffect(() => {
    if (valid) {
      console.log("submitted");
      // Login the user
      const requestBody = {
        fullName: fullname,
        userName: username,
        mailId: email,
        password: password
      };

      api.post('/users/register', requestBody)
        .then(response => {
          console.log(response.data);
          setEmailSent(true);
        })
        .catch(error => {
          isValid(false);
          console.error(error);
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("email")) {
            setEmailError(errorMessage);
          } else if (errorMessage.includes("Password")) {
            setPasswordError(errorMessage);
          } else if (errorMessage.includes("username")) {
            setUserNameError(errorMessage);
          } else if (errorMessage.includes("fullname")) {
            setFullnameError(errorMessage);
          }
        });
    }
  }, [valid, email, fullname, username, password])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-primaryWhite shadow p-8 space-y-5 rounded-xl w-80 md:w-96">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex justify-center p-4 items-center">
            <img
              src="../src/assets/logo.png"
              alt="logo"
              className="logo-image h-8"
            />
          </div>
          {!emailSent ? <div className="flex flex-col space-y-3">
            <h2 className="text-black font-bold">Get started now.</h2>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label
                  htmlFor="fullname"
                  className={`block mb-2 text-sm font-small text-gray-900 ${fullnameError ? "text-red-500" : "text-black"
                    }`}
                >
                  Full name
                </label>
                <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{fullnameError}</small>
              </div>
              <input
                type="fullname"
                name="fullname"
                id="fullname"
                placeholder="Your full name"
                className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${fullnameError ? "border-red-500" : "border-gray-300"
                  }`}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-small text-gray-900 ${userNameError ? "text-red-500" : "text-black"
                    }`}
                >
                  Username
                </label>
                <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{userNameError}</small>
              </div>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="Your username"
                className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${userNameError ? "border-red-500" : "border-gray-300"
                  }`}
                value={username}
                onKeyDown={onKeyDown}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-small text-gray-900 ${emailError ? "text-red-500" : "text-black"
                    }`}
                >
                  Email
                </label>
                <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{emailError}</small>
              </div>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email address"
                className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${emailError ? "border-red-500" : "border-gray-300"
                  }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-small text-gray-900 ${passwordError ? "text-red-500" : "text-black"
                    }`}
                >
                  Password
                </label>
                <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{passwordError}</small>
              </div>
              <input
                type="password"
                name="password"
                id="emapasswordil"
                placeholder="Your password"
                className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                value={password}
                min={8}
                max={15}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125"
              >
                Sign up
              </button>
            </div>
            <div className="flex gap-1">
              <p className="block mb-2 text-sm font-small text-gray-900 text-black">
                Already signed-up?
              </p>
              <Link to="/sign-in" className="block mb-2 text-sm font-small text-primaryBlue hover:underline">Sign-in now.</Link>
            </div>
          </div> :
            <div className="flex flex-col gap-2 h-36">
              <h2 className="text-black font-bold text-center">Verify your account.</h2>
              <p className="text-black text-center">We have sent you an email with a link, kindly click it to verify your account.</p>
              <Link target="_blank" rel="noopener noreferrer" to="https://mail.google.com/" className="text-center text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125 flex justify-center items-center">Open Gmail
                <img
                  src="../src/assets/new-tab-icon.png"
                  alt="logo"
                  className="h-4"
                />
              </Link>
            </div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
