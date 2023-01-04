import React,{useState} from 'react';
import Modal from './Modal';
import cross from "./cross.png";
import cam from "./cam.png";

function Phone() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    

    return (
        <div className='toggle'>
            <button onClick={
                () => {
                    if(isOpen) {
                        closeModal();
                    } else {
                        openModal();
                    }
                }
            }>phone</button>
            <Modal isOpen={isOpen} closeModal={closeModal} />
        </div>
    )
}

export default Phone;