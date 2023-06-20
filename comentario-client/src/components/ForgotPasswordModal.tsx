import { useState } from "react";
import Modal from "./Modal";

interface ModalProps {
  closeModal: () => void;
}

const ForgotPasswordModal: React.FC<ModalProps> = ({ closeModal }) => {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [validEmail, isValidEmail] = useState(false);
  const [validOtp, isValidOtp] = useState(false);
  const [mailSent, isMailSent] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      isValidEmail(false);
    } else {
      setEmailError("");
      isValidEmail(true);
    }

    if (validEmail) {
      if (email !== "gokul@gmail.com") {
        setEmailError("Account does not exist")
      } else {
        isMailSent(true);
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!otp) {
      setOtpError("OTP is required");
      isValidOtp(false);
    } else {
      setOtpError("");
      isValidOtp(true);
    }

    if (validOtp) {
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
              disabled={mailSent}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          {!mailSent && <button className="text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125" type="button" onClick={handleEmail}>Get Otp</button>}
          {mailSent && <div className="flex flex-col">
            <div className="flex justify-between">
              <label
                htmlFor="otp"
                className={`block mb-2 text-sm font-small text-gray-900 ${otpError ? "text-red-500" : "text-black"
                  }`}
              >
                OTP
              </label>
              <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{otpError}</small>
            </div>

            <input
              type="otp"
              name="otp"
              id="otp"
              placeholder="Please enter the OTP"
              className={`bg-primaryWhite p-2 rounded-md border-2 text-black focus:outline-none focus:border-primaryBlue ${otpError ? "border-red-500" : "border-gray-300"
                }`}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            ></input>
            <button className="text-white bg-primaryBlue rounded-md p-2 mt-2 w-full hover:brightness-125 " type="submit">Submit</button>
          </div>
          }

        </div>
      </form>

    </Modal>
  )
}

export default ForgotPasswordModal