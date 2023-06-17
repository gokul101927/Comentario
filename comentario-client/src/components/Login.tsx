import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [valid, isValid] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || email.length === 0) {
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
    <div className="bg-primaryWhite shadow p-8 space-y-5 rounded-xl w-80 sm:w-96">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex justify-center p-4 pb-8 items-center">
          <img
            src="../src/assets/logo.png"
            alt="logo"
            className="logo-image h-8"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-black font-bold">Login below</h2>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-small text-gray-900 ${emailError ? "text-red-500" : "text-black"
                  }`}
              >
                Email
              </label>
              <small className="block mb-2 text-sm font-small text-gray-900 text-red-500">{emailError}</small>
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
              <small className="block mb-2 text-sm font-small text-gray-900 text-red-500">{passwordError}</small>
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
              Login
            </button>
          </div>
          <div>
            <p className="block text-sm font-small text-gray-900 text-black hover:text-primaryBlue">
              Forgot your password?
            </p>
          </div>
          <div>
            <p className="block mb-2 text-sm font-small text-gray-900 text-black">
              New to Comentario? Get started.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
