import { motion } from "framer-motion";
import { Link } from 'react-router-dom'

import api from "../api/apiConfig";
import LoadingSpinnerModal from "../components/LoadingSpinnerModal";
import { useState } from "react";

interface ModalProps {
  closeModal: () => void;
  mailId: string;
}

const Signup: React.FC<ModalProps> = ({ closeModal }) => {

  const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailSent, setEmailSent] = useState(false);

    const [fullNameError, setFullNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!fullName) {
            setFullNameError("Full name is required");
            return;
        } else {
            setFullNameError("");
        }

        if (!username) {
            setUsernameError("Username is required");
            return;
        } else {
            setUsernameError("");
        }

        if (!email) {
            setEmailError("Email is required");
            return;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required");
            return;
        } else {
            setPasswordError("");
        }

        if (fullNameError || usernameError || emailError || passwordError) {
            return;
        }

        console.log("submitted");
        setLoading(true);
        // Login the user
        const requestBody = {
            fullName: fullName,
            username: username,
            mailId: email,
            password: password
        };

        api.post('/users/register', requestBody)
            .then(response => {
                console.log(response.data);
                setEmailSent(true);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                const errorMessage = error.response.data.message;
                if (errorMessage.includes("email")) {
                    setEmailError(errorMessage);
                } else if (errorMessage.includes("Password")) {
                    setPasswordError(errorMessage);
                } else if (errorMessage.includes("username")) {
                    setUsernameError(errorMessage);
                } else if (errorMessage.includes("fullname")) {
                    setFullNameError(errorMessage);
                }
            });

    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.code === 'Space') event.preventDefault()
    }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center min-h-screen">
      <div className="bg-primaryWhite shadow p-8 space-y-5 rounded-xl w-80 md:w-96">
        <div className="flex justify-center p-4 items-center">
          <Link to="/">
            <img
              src="../src/assets/logo.png"
              alt="logo"
              className="logo-image h-8"
            />
          </Link>
          
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
            {!emailSent ?<div className="flex flex-col space-y-3">
                <h2 className="text-black font-bold">Get started now.</h2>
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <label
                            htmlFor="fullname"
                            className={`block mb-2 text-sm font-small text-gray-900 ${fullNameError ? "text-red-500" : "text-black"
                                }`}
                        >
                            Full name
                        </label>
                        <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{fullNameError}</small>
                    </div>
                    <input
                        type="fullname"
                        name="fullname"
                        id="fullname"
                        placeholder="Your full name"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${fullNameError && "border-2 border-red-500"
                            }`}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    ></input>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <label
                            htmlFor="username"
                            className={`block mb-2 text-sm font-small text-gray-900 ${usernameError ? "text-red-500" : "text-black"
                                }`}
                        >
                            Username
                        </label>
                        <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{usernameError}</small>
                    </div>
                    <input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="Your username"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${usernameError && "border-2 border-red-500"
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
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${emailError && "border-2 border-red-500"
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
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${passwordError && "border-2 border-red-500"
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
                        className="font-bold text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125"
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
                <div className="flex flex-col gap-2 h-36 fadeIn">
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
                {loading && <LoadingSpinnerModal closeModal={closeModal} />}
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
