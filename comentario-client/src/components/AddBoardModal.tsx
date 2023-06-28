import { useState } from "react";
import CoverImageUpload from "./CoverImageUpload";
import Modal from "./Modal";

import api from "../api/apiConfig";
import LoadingSpinnerModal from "./LoadingSpinnerModal";

interface ModalProps {
    closeModal: () => void;
    mailId: string;
}

const AddBoardModal: React.FC<ModalProps> = ({ closeModal, mailId }) => {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [isSelf, setIsSelf] = useState(false);

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [urlError, setUrlError] = useState("");

    const [loading, setLoading] = useState(false);

    const radioChange = (): void => {
        setIsSelf(!isSelf);
    }

    const handleFile = (file: File | null): void => {
        setSelectedFile(file);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("clicked")
        if (!title) {
            setTitleError("title is required")
            return;
        } else {
            setTitleError("");
        }

        if (!description) {
            setDescriptionError("Password is required");
            return;
        } else {
            setDescriptionError("");
        }

        if (!url) {
            setUrlError("URL is required");
            return;
        } else {
            setUrlError("");
        }


        setLoading(true);
        closeModal();
        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: token,
                'Content-Type': `multipart/form-data`
            }
        };

        const requestBody = {
            title: title,
            description: description,
            url: url,
            isSelf: isSelf,
            mailId: mailId
        };

        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
            formData.append('data', JSON.stringify(requestBody));
        }

        api.post("/boards/add", formData, config)
            .then(response => {
                console.log(response)
                setLoading(false);
            })
            .catch(error => console.error(error))
    };

    return (
        <Modal closeModal={closeModal}>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <CoverImageUpload selectedFile={selectedFile} handleFile={handleFile} />
                <div className="flex flex-col">
                    <input
                        type="title"
                        name="title"
                        id="title"
                        placeholder="Title of the software"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${titleError ? "border-red-500" : "border-gray-300"
                            }`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div className="flex flex-col">
                    <input
                        type="description"
                        name="description"
                        id="description"
                        placeholder="Description of the software"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${descriptionError ? "border-red-500" : "border-gray-300"
                            }`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                <div className="flex flex-col">
                    <input
                        type="url"
                        name="url"
                        id="url"
                        placeholder="URL of the software"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${urlError ? "border-red-500" : "border-gray-300"
                            }`}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    ></input>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-1/2">
                        <input type="radio" name="option" id="self" className="peer hidden" onChange={radioChange} checked={isSelf} />
                        <label
                            htmlFor="self"
                            className="block cursor-pointer bg-gray-100 text-gray-400 select-none rounded-md p-2 text-center peer-checked:bg-primaryBlue peer-checked:font-bold peer-checked:text-white"
                        >Self</label>
                    </div>
                    <div className="w-1/2">
                        <input type="radio" name="option" id="out-source" className="peer hidden" onChange={radioChange} checked={!isSelf} />
                        <label
                            htmlFor="out-source"

                            className="block cursor-pointer bg-gray-100 text-gray-400 select-none rounded-md p-2 text-center peer-checked:bg-primaryBlue peer-checked:font-bold peer-checked:text-white"
                        >Out sourced</label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="text-sm font-small text-white rounded-md p-2 font-bold bg-primaryBlue hover:brightness-125" type="submit">+ Create</button>
                </div>
            </form>
            {loading && <LoadingSpinnerModal closeModal={closeModal}/>}
        </Modal>
    )


}

export default AddBoardModal