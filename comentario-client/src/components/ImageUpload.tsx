import { useEffect, useState } from "react"

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (!selectedFile) {
            setPreview("")
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
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
        <div className="flex flex-col items-center justify-center">
            
            {selectedFile ? <img className="rounded-md border border-black object-center object-cover h-44 w-full" src={preview} /> : 
            <div className="rounded-md object-center object-cover p-6 bg-gray-100 w-full flex flex-col items-center justify-center">            
                <label className="text-black cursor-pointer text-sm border rounded-md border-solid border-black p-2" htmlFor="image-upload">Upload your cover image here.</label>
                <input className="hidden" id="image-upload" type='file' onChange={onSelectFile} />
            </div>}
        </div>
    )
}

export default ImageUpload