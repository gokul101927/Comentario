import { useEffect, useState } from "react"

interface ModalProps {
    selectedFile: File | null;
    handleFile: (file: File | null) => void;
}

const CoverImageUpload: React.FC<ModalProps> = ({selectedFile, handleFile}) => {
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
        <div className="flex flex-col items-center justify-center">

            <div className="rounded-md object-center object-cover p-6 bg-gray-100 w-full flex flex-col items-center justify-center">
                <label className="text-black cursor-pointer text-sm border rounded-md border-solid border-black p-2" htmlFor="image-upload">
                    {selectedFile ? <img className="rounded-md border border-black object-center object-cover h-44 w-full" src={preview} /> : <p>Upload your cover image here.</p>}
                </label>
                <input className="hidden" id="image-upload" type='file' onChange={onSelectFile} accept="image/png, image/gif, image/jpeg, image/jpg, image/svg" />
            </div>
        </div>
    )
}

export default CoverImageUpload