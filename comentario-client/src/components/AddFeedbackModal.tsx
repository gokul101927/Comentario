import { useState } from "react";
import Modal from "./Modal";
import { Category } from "../interfaces/types";
import api from "../api/apiConfig";
import LoadingSpinnerModal from "./LoadingSpinnerModal";

interface Props {
    closeModal: () => void;
    boardId: string | undefined;
}


const AddFeedbackModal: React.FC<Props> = ({ closeModal, boardId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryType, setCategoryType] = useState("");

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const [loading, setLoading] = useState(false);

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

        setLoading(true);
        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: token,
            }
        };

        const requestBody = {
            title: title,
            category: categoryType,
            description: description,
            boardId: boardId
        };

        api.post("/feedbacks/add", requestBody, config)
            .then(response => {
                console.log(response)
                setLoading(false);
                window.location.reload();
                closeModal();
            })
            .catch(error => {
                console.error(error)
                setLoading(false);
                closeModal();
            })

    };

    return (
        <Modal closeModal={closeModal}>
            <h1 className="text-black text-sm font-bold pb-2">Create new feedback.</h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <input
                        type="title"
                        name="title"
                        id="title"
                        placeholder="Title of the software"

                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${titleError && "border-2 border-red-500 placeholder:text-red-500"
                            }`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div className="flex flex-col">
                    <select id="sort" className="cursor-pointer text-black p-2 rounded-md bg-gray-100 border-0 border-gray-200 appearance-none focus:outline-none focus:ring-0 peer" onChange={(e) => setCategoryType(e.target.value)}>
                        <option disabled selected>Select a category</option>
                        <option value={Category.UI} >{Category.UI}</option>
                        <option value={Category.UX} >{Category.UX}</option>
                        <option value={Category.Enhancement} >{Category.Enhancement}</option>
                        <option value={Category.Feature} >{Category.Feature}</option>
                        <option value={Category.Bug} >{Category.Bug}</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <textarea
                        name="description"
                        rows={4}
                        id="description"
                        placeholder="Description of the software"
                        className={`bg-gray-100 p-2 rounded-md text-black focus:outline-none focus:shadow-xl focus:bg-primaryWhite ${descriptionError && "border-2 border-red-500 placeholder:text-red-500"
                            }`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button className="text-sm font-small text-white rounded-md p-2 font-bold bg-primaryBlue hover:brightness-125" type="submit">+ Create</button>
                </div>
            </form>
            {loading && <LoadingSpinnerModal closeModal={closeModal} />}
        </Modal>
    )


}

export default AddFeedbackModal