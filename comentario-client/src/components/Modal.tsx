import React, { ReactNode, useEffect, useState } from 'react'

interface ModalProps {
    closeModal: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                closeModal();
            }, 400)

            return () => {
                clearTimeout(timer);
            }
        }
    }, [isClosing, closeModal])

    const handleClose = () => {
        setIsClosing(true);
    }

    return (
        <div id='modal-container' className={`fixed inset-0 z-50 flex items-center justify-center ${isClosing ? 'fadeOut' : 'fadeIn'}`}>
            <div className="fixed inset-0 bg-black opacity-70" onClick={handleClose}></div>
            <div className="z-10 bg-primaryWhite shadow p-8 rounded-xl w-80 md:w-96">
                {children}
            </div>
        </div>
    )
}

export default Modal