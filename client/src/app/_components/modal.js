import { useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(text);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <input className='w-20' type="text" value={text} onChange={handleInputChange} />
        <button className='p-2 text-blue-500 hover:text-blue-700' onClick={handleSubmit}>+</button>
      </div>
    </div>
  );
};

export default Modal;
