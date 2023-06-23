import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react'


interface ModalProps {
    children: ReactNode;
}

const LocationProvider: React.FC<ModalProps> = ({ children }) => {
  return (
    <AnimatePresence>
        {children}
    </AnimatePresence>
  )
}

export default LocationProvider