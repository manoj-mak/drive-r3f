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
        }, 4000);
    }, []);

    

    return (
        <div className='toggle'>
          
            <Modal isOpen={isOpen} closeModal={closeModal} />
        </div>
    )
}

export default Phone;