import React from 'react';
import './Popup.css';

interface PopupProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

// Declare the Popup component with its props
// const Popup: FunctionComponent<PopupProps>;

function Popup(props: PopupProps) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'> 
            <button className='close-btn' onClick={() => props.setTrigger(false)}>Close</button>
            {props.children}
            <button className='create-btn' onClick={() => props.setTrigger(false)}>Create</button>
        </div>
    </div>
  ) : "";
}

export default Popup