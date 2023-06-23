import { useEffect, useState } from "react";
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
  const [otpVerified, isOtpVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [valid, isValid] = useState(false);

  const handleEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      isValidEmail(false);
    } else {
      setEmailError("");
      isValidEmail(true);
    }

  }

  const handleOtp = () => {
    if (!otp) {
      setOtpError("Otp is required");
      isValidOtp(false);
    } else {
      setOtpError("");
      isValidOtp(true);
    }

  }

  useEffect(() => {
    if (validOtp) {
      if (otp !== "1234") {
        setOtpError("Account does not exist")
        isValidOtp(false);
      } else {
        // Got to password
        isOtpVerified(true);
      }
    }
  }, [otp, validOtp]);

  useEffect(() => {
    if (validEmail) {
      if (email !== "gokul@gmail.com") {
        setEmailError("Account does not exist")
        isValidEmail(false);
      } else {
        isMailSent(true);
      }
    }
  }, [email, validEmail]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password) {
      setPasswordError("Password is required");
      isValid(false);
    } else {
      setPasswordError("");
      isValid(true);
    }

    if (valid) {
      // update password in the database
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
                className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${emailError && "border-2 border-red-500"
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
                      type="otp"
                      name="otp"
                      id="otp"
                      placeholder="Please enter the OTP"
                      className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${otpError && "border-2 border-red-500"
                            }`}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    ></input>
                    <button className="font=bold text-white bg-primaryBlue rounded-md p-2 mt-2 w-full hover:brightness-125 " type="button" onClick={handleOtp}>Submit</button>

                  </div>

                  : <div className="flex flex-col">
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
                      className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${passwordError && "border-2 border-red-500"
                            }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button className="text-white font-bold bg-primaryBlue rounded-md p-2 mt-2 w-full hover:brightness-125 " type="submit">Submit</button>

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