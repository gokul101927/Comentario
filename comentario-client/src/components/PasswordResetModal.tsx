import { useState } from "react";
import Modal from "./Modal";

interface ModalProps {
  closeModal: () => void;
}

const PasswordResetModal: React.FC<ModalProps> = ({ closeModal }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [valid, isValid] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || email.length === 0) {
      setEmailError("Email/Username is required");
      isValid(false);
    } else {
      setEmailError("");
      isValid(true);
    }

    if (!password) {
      setPasswordError("OTP is required");
      isValid(false);
    } else {
      setPasswordError("");
      isValid(true);
    }

    if (valid) {
      // Login the user
      if (email !== "gokul@gmail.com") {
        setEmailError("Account does not exist")
      }
    }
  };

  return (
    <Modal closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
          <div className="flex justify-center p-4 items-center">
            <img
              src="../src/assets/logo.png"
              alt="logo"
              className="logo-image h-8"
            />
          </div>
          <h2 className="text-black font-bold font-small">Forgot your password? we got you covered.</h2>
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
                htmlFor="otp"
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
              id="password"
              placeholder="Please enter your password"
              className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${passwordError ? "border-red-500" : "border-gray-300"
                }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className="text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125 " type="submit">Submit</button>
          </div>
        </form>

      </Modal>
  )
}

export default PasswordResetModal;