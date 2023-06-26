import EditProfileForm from "./EditProfileForm"


const EditProfile = () => {
  return (
    <div className="bg-primaryWhite shadow flex flex-col space-y-4 w-full rounded-md p-8">
        <h1 className="text-black font-bold text-2xl py-2">Edit profile</h1>
        <div className="w-full xl:w-4/5">
          <EditProfileForm />
        </div>
        
    </div>
  )
}

export default EditProfile