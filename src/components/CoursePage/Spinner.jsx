import React from 'react';
import './Spinner.css';

function Spinner() {
    return (
        <div className=' my-auto flex flex-col items-center space-y-2 '>
            <div className='custom-loader'></div>
            <p className=' text-lg font-semibold'>Loading...</p>
        </div>
    )
}

export default Spinner;