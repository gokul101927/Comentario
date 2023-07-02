import ProfileImageUpload from "./ProfileImageUpload"

interface Props {
    profileImageUrl: string | undefined;
}

const ProfileCard: React.FC<Props> = ({profileImageUrl}) => {
    return (
        <div className="bg-primaryWhite shadow flex flex-col items-center space-y-2 w-full lg:w-2/6 rounded-md py-4 h-72">
            <h1 className="text-black font-bold">Gokul L</h1>
            <h3 className="text-gray-400">@iamgokul</h3>
            <ProfileImageUpload profileImageUrl={profileImageUrl}/>
            <div>
                <button
                    type="submit"
                    className="font-bold text-white bg-primaryBlue rounded-md p-2 w-full hover:brightness-125">
                    Upload profile photo
                </button>
            </div>
        </div>
    )
}

export default ProfileCard