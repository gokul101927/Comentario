import { useState } from "react";

import ProfileImageUpload from "./ProfileImageUpload"
import api from "../api/apiConfig";
import LoadingSpinnerModal from "./LoadingSpinnerModal";

interface Props {
    profileImageUrl: string | undefined;
    closeModal: () => void;
}

const ProfileCard: React.FC<Props> = ({profileImageUrl, closeModal}) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleFile = (file: File | null): void => {
        setSelectedFile(file);
        setDisabled(false);
    }

    const handleProfileImage = () => {
        setLoading(true);
        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: token,
                'Content-Type': `multipart/form-data`
            }
        };

        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        api.put("/users/user/update-profile", formData, config)
            .then(response => {
                console.log(response)
                setLoading(false);
            })
            .catch(error => {
                console.error(error)
                setLoading(false);
        })
    }

    return (
        <div className="bg-primaryWhite shadow flex flex-col items-center space-y-2 w-full lg:w-2/6 rounded-md py-4 h-72">
            <h1 className="text-black font-bold">Gokul L</h1>
            <h3 className="text-gray-400">@iamgokul</h3>
            <ProfileImageUpload profileImageUrl={profileImageUrl} selectedFile={selectedFile} handleFile={handleFile}/>
            <div>
                <button
                    type="button"
                    disabled={disabled}
                    className="font-bold text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125"
                    onClick={handleProfileImage}>
                    Upload profile photo
                </button>
            </div>
            {loading && <LoadingSpinnerModal closeModal={closeModal} />}
        </div>

    )
}

export default ProfileCard