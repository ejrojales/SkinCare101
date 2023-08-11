import React, { useState } from 'react';
import { Input } from '@material-tailwind/react';

const EditableRoutineName = (routineName, setRoutineName) => {
    const [editing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSave = (e) => {
        if (e.key === 'Enter') {
            if (routineName.trim() === "") {
                setRoutineName(routineName)
                alert("Routine Name Cannot Be Empty")
            } else {
                setEditing(false);
            }
        }
    };

    return (
        <div className='text-center'>
            {editing ? (
                <Input
                    type="text"
                    placeholder={routineName}
                    value={routineName}
                    className="text-center !border !border-blue-gray-50 bg-white text-blue-gray-500 shadow-lg shadow-blue-gray-900/5 ring-4 ring-transparent placeholder:text-blue-gray-200 focus:!border-blue-500 focus:!border-t-blue-500 focus:ring-blue-500/20"
                    onChange={(e) => setRoutineName(e.target.value)}
                    onKeyDown={handleSave}
                    onBlur={() => setEditing(false)}
                    autoFocus // Automatically focuses the textarea when in edit mode
                />
            ) : (
                <h1 onClick={handleEditClick}>{routineName}</h1>
            )}
        </div>
    );
};

export default EditableRoutineName;
