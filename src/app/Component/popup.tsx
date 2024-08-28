import React, { useEffect, useRef, useState } from 'react';

interface PopupProps {
    onClose: () => void;
    onSave: (newName: string) => void;
    currentName: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, onSave, currentName }) => {
    const [newName, setNewName] = useState<string>(currentName);

    const inputRef = useRef<HTMLInputElement>(null);

    // Automatically focus the input field when the component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSave(newName);
        }
    }
    return (
        <div className='absolute flex flex-col justify-center w-[300px] transition ease-in-out items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] bg-gradient-to-r from-zinc-700 to-neutral-700 rounded-lg transform-gpu p-4'>
            <label htmlFor="newname" className='text-xl font-medium'>
                File Name
            </label>
            <input
                ref={inputRef} // Attach ref to the input field
                type="text"
                id='newname'
                placeholder={newName}
                onKeyDown={handleKeyPress}
                onChange={(e) => setNewName(e.target.value)}
                className='border-2 rounded-2xl outline-1 text-black mx-4 px-4 py-2 w-full'
            />
            <div className='flex justify-evenly items-center w-full mt-5'>
                <button
                    className='bg-neutral-600 w-24 py-1 rounded-xl'
                    onClick={() => onSave(newName)}
                >
                    Save
                </button>
                <button
                    className='bg-neutral-600 w-24 py-1 rounded-xl'
                    onClick={onClose}
                >
                    Discard
                </button>
            </div>
        </div>
    );
};

export default Popup;
