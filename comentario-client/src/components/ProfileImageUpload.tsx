import { useEffect, useState } from "react"

interface Props {
    profileImageUrl: string;
}

const ProfileImageUpload: React.FC<Props> = ({profileImageUrl}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
            setSelectedFile(null)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    return (
        <div>
        <div>
            
        </div>
        <div className="flex flex-col items-center justify-center">
            
            {selectedFile ? <img
                src={preview}
                alt="profile image"
                className="rounded-full object-center object-cover h-32 w-32 border-primaryBlue border"
            /> : 
            <div>            
                <label className="cursor-pointer" htmlFor="image-upload">
                <img
                src={profileImageUrl}
                alt="profile image"
                className="rounded-full h-32 w-32 object-center object-cover border-black border"
            />
                </label>
                <input className="hidden" id="image-upload" type='file' onChange={onSelectFile} />
            </div>}
        </div>
        </div>
    )
}

export default ProfileImageUpload;