import { useState } from "react";
import CoverImageUpload from "./CoverImageUpload";
import Modal from "./Modal";

import api from "../api/apiConfig";
import LoadingSpinnerModal from "./LoadingSpinnerModal";

interface ModalProps {
    closeModal: () => void;
    username: string | undefined;
}

const AddBoardModal: React.FC<ModalProps> = ({ closeModal, username }) => {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [isSelf, setIsSelf] = useState(true);

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [urlError, setUrlError] = useState("");

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleFile = (file: File | null): void => {
        setSelectedFile(file);
        setDisabled(false);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            username: username
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
                window.location.reload();
            })
            .catch(error => {
                console.error(error)
                const errorMessage = error.response.data.message;
                if (errorMessage.includes("URL")) {
                    setUrlError(errorMessage);
                }
                setLoading(false);
            })
    };

    return (
        <Modal closeModal={closeModal}>
            <h1 className="text-black text-sm font-bold pb-2">Create new board.</h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <CoverImageUpload selectedFile={selectedFile} handleFile={handleFile} />
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{urlError}</small>
                    </div>
                    <input
                        type="title"
                        name="title"
                        id="title"
                        placeholder="Title of the software"
                        maxLength={32}
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${titleError && "border-2 border-red-500 placeholder:text-red-500"
                            }`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div className="flex flex-col">
                    <textarea
                        name="description"
                        rows={4}
                        id="description"
                        placeholder="Description of the software"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${descriptionError && "border-2 border-red-500 placeholder:text-red-500"
                            }`}
                        maxLength={100}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between">

                        <small className="block mb-2 text-sm font-small text-gray-900 text-red-500 text-end">{urlError}</small>
                    </div>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        placeholder="URL of the software"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${urlError && "border-2 border-red-500 placeholder:text-red-500"
                            }`}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    ></input>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-1/2">
                        <input type="radio" name="self" id="self" className="peer hidden" onChange={() => setIsSelf(true)} checked={isSelf} />
                        <label
                            htmlFor="self"
                            className="block cursor-pointer bg-gray-100 text-gray-400 select-none rounded-md p-2 text-center peer-checked:bg-primaryBlue peer-checked:font-bold peer-checked:text-white"
                        >Self</label>
                    </div>
                    <div className="w-1/2">
                        <input type="radio" name="out-source" id="out-source" className="peer hidden" onChange={() => setIsSelf(false)} checked={!isSelf} />
                        <label
                            htmlFor="out-source"
                            className="block cursor-pointer bg-gray-100 text-gray-400 select-none rounded-md p-2 text-center peer-checked:bg-primaryBlue peer-checked:font-bold peer-checked:text-white"
                        >Out sourced</label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button disabled={disabled} className="text-sm font-small text-white rounded-md p-2 font-bold bg-primaryBlue hover:brightness-125" type="submit">+ Create</button>
                </div>
            </form>
            {loading && <LoadingSpinnerModal closeModal={closeModal} />}
        </Modal>
    )


}

export default AddBoardModal