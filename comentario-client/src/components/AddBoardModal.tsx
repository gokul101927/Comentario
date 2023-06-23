import { useState } from "react";
import ImageUpload from "./ImageUpload";
import Modal from "./Modal";

interface ModalProps {
    closeModal: () => void;
}

const AddBoardModal: React.FC<ModalProps> = ({ closeModal }) => {
    const [title, setTitla] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [isSelf, setIsSelf] = useState(false);

    const [valid, isValid] = useState(false);

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [urlError, setUrlError] = useState("");

    const radioChange = (): void => {
        setIsSelf(!isSelf);
    }

    return (
        <Modal closeModal={closeModal}>
            <form className="space-y-3">
                <ImageUpload />
                <div className="flex flex-col">
                    <input
                        type="title"
                        name="title"
                        id="title"
                        placeholder="Title of the software"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:border-none focus:shadow-xl focus:bg-primaryWhite ${titleError ? "border-red-500" : "border-gray-300"
                            }`}
                        value={title}
                        onChange={(e) => setTitla(e.target.value)}
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

        </Modal>
    )


}

export default AddBoardModal