import Modal from "./Modal"

interface ModalProps {
    closeModal: () => void;
}

const LoadingSpinnerModal: React.FC<ModalProps> = ({ closeModal }) => {
    return (
        <Modal closeModal={closeModal}>
            <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent"></div>
                    <h1 className="text-black font-bold">Processing</h1>
            </div>
        </Modal>
    )
}

export default LoadingSpinnerModal