import { useState } from "react";
import { Link } from 'react-router-dom'

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [valid, isValid] = useState(false);

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullname) {
      setFirstnameError("Full name is required");
      isValid(false);
    } else {
      setFirstnameError("");
      isValid(true);
    }

    if (!username) {
      setLastnameError("Username is required");
      isValid(false);
    } else {
      setLastnameError("");
      isValid(true);
    }

    if (!email) {
      setEmailError("Email is required");
      isValid(false);
    } else {
      setEmailError("");
      isValid(true);
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid(false);
    } else {
      setPasswordError("");
      isValid(true);
    }

    if (valid) {
      // Login the user
      if (email !== "gokul@gmail.com") {
        setEmailError("Email does not match")
      }
    }
  };

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
          <div className="flex flex-col space-y-3">
            <h2 className="text-black font-bold">Get started now.</h2>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label
                  htmlFor="fullname"
                  className={`block mb-2 text-sm font-small text-gray-900 ${firstnameError ? "text-red-500" : "text-black"
                    }`}
                >
                  Full name
                </label>
                <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{firstnameError}</small>
              </div>
              <input
                type="fullname"
                name="fullname"
                id="fullname"
                placeholder="Your full name"
                className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${firstnameError ? "border-red-500" : "border-gray-300"
                  }`}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-small text-gray-900 ${lastnameError ? "text-red-500" : "text-black"
                    }`}
                >
                  Username
                </label>
                <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{lastnameError}</small>
              </div>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="Your username"
                className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${lastnameError ? "border-red-500" : "border-gray-300"
                  }`}
                value={username}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
