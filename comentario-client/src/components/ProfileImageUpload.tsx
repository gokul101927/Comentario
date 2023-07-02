import { useEffect, useState } from "react"

interface Props {
    profileImageUrl: string | undefined;
    selectedFile: File | null;
    handleFile: (file: File | null) => void;
}

const ProfileImageUpload: React.FC<Props> = ({ profileImageUrl, selectedFile, handleFile }) => {
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (!selectedFile) {
            setPreview("")
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            handleFile(null)
            return
        }

        handleFile(e.target.files[0])
    }

    return (
        <div>
            <div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <label className="cursor-pointer" htmlFor="image-upload">
                        {selectedFile ? <img
                            src={preview}
                            alt="profile image"
                            className="rounded-full object-center object-cover h-32 w-32 border-primaryBlue border"
                        /> :
                            <img
                                src={profileImageUrl}
                                alt="profile image"
                                className="rounded-full h-32 w-32 object-center object-cover border-black border"
                            />}
                    </label>
                    <input className="hidden" id="image-upload" type='file' onChange={onSelectFile} accept="image/png, image/gif, image/jpeg, image/jpg, image/svg" />
                </div>
            </div>
        </div>
    )
}

export default ProfileImageUpload;