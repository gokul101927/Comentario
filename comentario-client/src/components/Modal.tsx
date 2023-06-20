import React, { ReactNode } from 'react'

interface ModalProps {
    closeModal: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-80" onClick={closeModal}></div>
            <div className="z-10 bg-primaryWhite shadow p-8 rounded-xl w-80 md:w-96">
                {children}
            </div>
        </div>
    )
}

export default Modal