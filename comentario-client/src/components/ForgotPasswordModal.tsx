import { useState } from "react";
import Modal from "./Modal";
import { Link, useNavigate } from "react-router-dom"
import api from "../api/apiConfig";

interface ModalProps {
  closeModal: () => void;
  handleLogin: (token: string) => void;
}

const ForgotPasswordModal: React.FC<ModalProps> = ({ closeModal, handleLogin }) => {

  const [email, setEmail] = useState("");
  const [otpRef, setOtpRef] = useState("");
  const [otp, setOtp] = useState("");

  const [mailSent, isMailSent] = useState(false);
  const [otpVerified, isOtpVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();

  const handleEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    } else {
      setEmailError("");
    }

    api.get(`/users/verify-email?mailId=${email}`)
      .then(response => {
        console.log(response.data)
        isMailSent(true);
        setOtpRef(response.data.toString());
      })
      .catch(error => {
        console.error(error);
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("Email")) {
          setEmailError(errorMessage);
        } else if (errorMessage.includes("verified")) {
          setEmailError(errorMessage);
        }
      })

  }

  const handleOtp = () => {
    if (!otp) {
      setOtpError("OTP is required");
      return;
    } else {
      setOtpError("");
      if (otp.trim() === otpRef.trim()) {
        isOtpVerified(true);
        setOtpError("")
      } else {
        console.log(otp + " is not matching with " + otpRef);
        setOtpError("OTP is not matching");
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password) {
      setPasswordError("Password is required");
      return;
    } else {
      setPasswordError("");
    }

    const requestBody = {
      identifier: email,
      password: password
    };

    // update password in the database
    api.put("users/reset-password", requestBody)
      .then(response => {
        console.log(response)
        handleLogin(response.data);
        navigate('/');
        closeModal();
      })
      .catch(error => console.log(error));

  };

  return (
    <Modal closeModal={closeModal}>

      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="flex justify-center p-4 items-center">
            <Link to="/">
              <img
                src="../src/assets/logo.png"
                alt="logo"
                className="logo-image h-12"
              />
            </Link>
          </div>
          <h2 className="text-black font-bold font-small">Forgot your password? we got you.</h2>
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
              className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${emailError && "border-2 border-red-500"
                }`}
              value={email}
              disabled={mailSent}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          {!mailSent && <button className="text-white font-bold bg-primaryBlue rounded-md p-2 w-full hover:brightness-125" type="button" onClick={handleEmail}>Get Otp</button>}
          {mailSent &&
            <div>
              {!otpVerified ?
                <div className="flex flex-col">
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
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Please enter the OTP"
                    className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${otpError && "border-2 border-red-500"
                      }`}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  ></input>
                  <button className="font=bold text-white bg-primaryBlue rounded-md p-2 mt-2 w-full hover:brightness-125 " type="button" onClick={handleOtp}>Submit OTP</button>

                </div>

                : <div className="flex flex-col">
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
                    id="password"
                    placeholder="Please enter your password"
                    className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${passwordError && "border-2 border-red-500"
                      }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <button className="text-white font-bold bg-primaryBlue rounded-md p-2 mt-2 w-full hover:brightness-125 " type="submit">Update password</button>

                </div>
              }
            </div>
          }

        </div>
      </form>
    </Modal>
  )
}

export default ForgotPasswordModal