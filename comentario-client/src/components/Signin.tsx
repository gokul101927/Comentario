import { useState } from "react";
import { Link } from 'react-router-dom'

const Signin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [valid, isValid] = useState(false);

  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!identifier || identifier.length === 0) {
      setIdentifierError("Email/Username is required");
      isValid(false);
    } else {
      setIdentifierError("");
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
      if (identifier !== "gokul@gmail.com") {
        setIdentifierError("Account does not exist")
      }
    }
  };

  return (
    <div className="bg-primaryWhite shadow p-8 space-y-5 rounded-xl w-80 md:w-96">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex justify-center p-4 pb-8 items-center">
          <img
            src="../src/assets/logo.png"
            alt="logo"
            className="logo-image h-8"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-black font-bold">Sign-in to your account.</h2>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <label
                htmlFor="identifier"
                className={`block mb-2 text-sm font-small text-gray-900 ${identifierError ? "text-red-500" : "text-black"
                  }`}
              >
                Email/Username
              </label>
              <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{identifierError}</small>
            </div>

            <input
              type="identifier"
              name="identifier"
              id="identifier"
              placeholder="Your email address or username"
              className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${identifierError ? "border-red-500" : "border-gray-300"
                }`}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
              <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end	">{passwordError}</small>
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
              Sign in
            </button>
          </div>
          <div>
            <Link to="#" className="block text-sm font-small text-primaryBlue w-fit text-black hover:underline">
              Forgot your password?
            </Link>
          </div>
          <div className="flex gap-1">
            <p className="block mb-2 text-sm font-small text-gray-900 text-black">
              New to Comentario? 
            </p>
            <Link to="/sign-up" className="block mb-2 text-sm font-small text-gray-900 text-black hover:text-primaryBlue">Get started.</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
