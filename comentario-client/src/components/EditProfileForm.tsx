import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import api from "../api/apiConfig";

const EditProfileForm = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [valid, isValid] = useState(false);

    const [fullnameError, setFullnameError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

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
                    navigate("/sign-in");

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
    }, [valid, email, fullname, username, password, navigate])

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <div className="flex justify-between w-[93.5%]">
                        <label
                            htmlFor="fullname"
                            className={`block mb-2 text-sm font-small text-gray-900 ${fullnameError ? "text-red-500" : "text-black"
                                }`}
                        >
                            Full name
                        </label>
                        <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{fullnameError}</small>
                    </div>
                    <div className="flex gap-4 items-center">
                        <input
                            type="fullname"
                            name="fullname"
                            id="fullname"
                            placeholder="Your full name"
                            className={`bg-gray-100 p-2 rounded-md text-black w-full focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${fullnameError && "border-2 border-red-500"
                                }`}
                            value={fullname}
                            disabled={true}
                            onChange={(e) => setFullname(e.target.value)}
                        ></input>
                        <img src="../src/assets/edit-icon.png"
                            alt="edit icon"
                            className="logo-image h-6 cursor-pointer"></img>
                    </div>

                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between w-[93.5%]">
                        <label
                            htmlFor="username"
                            className={`block mb-2 text-sm font-small text-gray-900 ${userNameError ? "text-red-500" : "text-black"
                                }`}
                        >
                            Username
                        </label>
                        <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{userNameError}</small>
                    </div>
                    <div className="flex gap-4 items-center">
                        <input
                            type="username"
                            name="username"
                            id="username"
                            placeholder="Your username"
                            className={`bg-gray-100 p-2 rounded-md text-black w-full focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${userNameError && "border-2 border-red-500"
                                }`}
                            value={username}
                            onKeyDown={onKeyDown}
                            disabled={true}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                        <img src="../src/assets/edit-icon.png"
                            alt="edit icon"
                            className="logo-image h-6 cursor-pointer"></img>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between w-[93.5%]">
                        <label
                            htmlFor="email"
                            className={`block mb-2 text-sm font-small text-gray-900 ${emailError ? "text-red-500" : "text-black"
                                }`}
                        >
                            Email
                        </label>
                        <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{emailError}</small>
                    </div>
                    <div className="flex gap-4 items-center">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your email address"
                            className={`bg-gray-100 p-2 rounded-md text-black w-full focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${emailError && "border-2 border-red-500"
                                }`}
                            value={email}
                            disabled={true}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <img src="../src/assets/edit-icon.png"
                            alt="edit icon"
                            className="logo-image h-6 cursor-pointer"></img>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between w-[93.5%]">
                        <label
                            htmlFor="password"
                            className={`block mb-2 text-sm font-small text-gray-900 ${passwordError ? "text-red-500" : "text-black"
                                }`}
                        >
                            Password
                        </label>
                        <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{passwordError}</small>
                    </div>
                    <div className="flex gap-4 items-center">
                        <input
                            type="password"
                            name="password"
                            id="emapasswordil"
                            placeholder="Your password"
                            className={`bg-gray-100 p-2 rounded-md text-black w-full focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${passwordError && "border-2 border-red-500"
                                }`}
                            value={password}
                            min={8}
                            max={15}
                            disabled={true}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <img src="../src/assets/edit-icon.png"
                            alt="edit icon"
                            className="logo-image h-6 cursor-pointer"></img>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="font-bold text-white bg-primaryBlue rounded-md p-2 hover:brightness-125"
                    >
                        Update your profile
                    </button>
                </div>
            </div>
        </form >
    );
};

export default EditProfileForm;
