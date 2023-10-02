import React from "react";
import './Modal.css'

export default function Modal({active, setActive, children, restart}) {
    return <div className={active ? 'modal active' : 'modal'}>
        <div className={active ? 'modal__content active' : 'modal__content'}>
            <img className='close' src="close.jpg" onClick={() => {
                setActive(false)
                document.addEventListener('keypress', restart);
            }
            } alt="Exit sign"/>
            {children}
        </div>
    </div>
}
