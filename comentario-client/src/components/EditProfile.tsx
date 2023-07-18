import { useState } from "react";

import api from "../api/apiConfig";
import LoadingSpinnerModal from "./LoadingSpinnerModal";
import { UserState } from "../interfaces/types"

interface Props {
  loggedInUser: UserState | undefined;
  closeModal: () => void;
  handleLogout: () => void;
}

const EditProfile: React.FC<Props> = ({ loggedInUser, closeModal }) => {
  const [fullName, setFullName] = useState(loggedInUser?.fullName);
  const [username, setUsername] = useState(loggedInUser?.username);
  const [email, setEmail] = useState(loggedInUser?.mailId);
  const [password, setPassword] = useState("");

  const [fullNameEdit, setFullNameEdit] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFullnameEdit = () => {
    setFullNameEdit(true)
    setDisableButton(false)
  }

  const handleUsernameEdit = () => {
    setUsernameEdit(true)
    setDisableButton(false)
  }

  const handleEmailEdit = () => {
    setEmailEdit(true)
    setDisableButton(false)
  }

  const handlePasswordEdit = () => {
    setPasswordEdit(true)
    setDisableButton(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: token,
      }
    };

    if (fullNameEdit) {
      if (!fullName) {
        setFullNameError("Full name is required");
        return;
      } else {
        setFullNameError("");
        api.put('/users/user/update-fullName', fullName, config)
          .then(response => {
            console.log(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
            const errorMessage = error.response.data.message;
            if (errorMessage.includes("Email")) {
              setEmailError(errorMessage);
            } else if (errorMessage.includes("Username")) {
              setUsernameError(errorMessage);
            } else if (errorMessage.includes("Fullname")) {
              setFullNameError(errorMessage);
            }
          });
      }
    }

    if (usernameEdit) {
      if (!username) {
        setUsernameError("Username is required");
        return;
      } else {
        setUsernameError("");

        api.put('/users/user/update-username', username, config)
          .then(response => {
            console.log(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
            const errorMessage = error.response.data.message;
            if (errorMessage.includes("Username")) {
              setUsernameError(errorMessage);
            }
          });
      }
    }
    
    if (emailEdit) {
      if (!email) {
        setEmailError("Email is required");
        return;
      } else {
        setEmailError("");
        api.put('/users/user/update-mailId', email, config)
          .then(response => {
            console.log(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
            const errorMessage = error.response.data.message;
            if (errorMessage.includes("Email")) {
              setEmailError(errorMessage);
            }
          });
      }
    }
    
    if (passwordEdit) {
      if (!password) {
        setPasswordError("Password is required");
        return;
      } else {
        setPasswordError("");
        api.put('/users/user/update-password', password, config)
          .then(response => {
            console.log(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
            const errorMessage = error.response.data.message;
            if (errorMessage.includes("Password")) {
              setPasswordError(errorMessage);
            }
          });
      }
    }
    window.location.reload();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === 'Space') event.preventDefault()
  }

  return (
    <div className="bg-primaryWhite shadow flex flex-col space-y-4 w-full rounded-md p-8">
      <h1 className="text-black font-bold text-2xl py-2">Edit profile</h1>
      <div className="w-full xl:w-4/5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <div className="flex justify-between w-[93.5%]">
                <label
                  htmlFor="fullname"
                  className={`block mb-2 text-sm font-small text-gray-900 ${fullNameError ? "text-red-500" : "text-black"
                    }`}
                >
                  Full name
                </label>
                <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{fullNameError}</small>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="fullname"
                  name="fullname"
                  id="fullname"
                  placeholder="Your full name"
                  className={`bg-gray-100 p-2 rounded-md text-black w-full focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${fullNameError && "border-2 border-red-500"
                    }`}
                  value={fullName}
                  disabled={!fullNameEdit}
                  onChange={(e) => setFullName(e.target.value)}
                ></input>
                <img src="../src/assets/edit-icon.png"
                  alt="edit icon"
                  className="logo-image h-6 cursor-pointer"
                  onClick={handleFullnameEdit}></img>
              </div>

            </div>
            <div className="flex flex-col">
              <div className="flex justify-between w-[93.5%]">
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-small text-gray-900 ${usernameError ? "text-red-500" : "text-black"
                    }`}
                >
                  Username
                </label>
                <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{usernameError}</small>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Your username"
                  className={`bg-gray-100 p-2 rounded-md text-black w-full focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${usernameError && "border-2 border-red-500"
                    }`}
                  value={username}
                  onKeyDown={onKeyDown}
                  disabled={!usernameEdit}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <img src="../src/assets/edit-icon.png"
                  alt="edit icon"
                  className="logo-image h-6 cursor-pointer"
                  onClick={handleUsernameEdit}></img>
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
                  disabled={!emailEdit}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <img src="../src/assets/edit-icon.png"
                  alt="edit icon"
                  className="logo-image h-6 cursor-pointer"
                  onClick={handleEmailEdit}></img>
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
                  id="password"
                  placeholder="Your password"
                  className={`bg-gray-100 p-2 rounded-md text-black w-full focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${passwordError && "border-2 border-red-500"
                    }`}
                  value={password}
                  minLength={8}
                  maxLength={15}
                  disabled={!passwordEdit}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <img src="../src/assets/edit-icon.png"
                  alt="edit icon"
                  className="logo-image h-6 cursor-pointer"
                  onClick={handlePasswordEdit}></img>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={disableButton}
                className="font-bold text-white bg-primaryBlue rounded-md p-2 hover:brightness-125"
              >
                Update your profile
              </button>
            </div>
          </div>
        </form >
      </div>
      {loading && <LoadingSpinnerModal closeModal={closeModal} />}
    </div>
  )
}

export default EditProfile