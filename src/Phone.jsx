import React,{useState} from 'react';
import { useEffect } from 'react';
import Modal from './Modal';



function Phone() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect (() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 6000);
    }, []);

    

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