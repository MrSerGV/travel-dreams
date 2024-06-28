import React from 'react';

const IconCross = ({ width= '28px', height= '28px' }) => {
    return (
        <svg width={width} height={height} viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z'
                fill='currentColor'/>
            <path d='M19 9L9 19' stroke='white' strokeWidth='1.38' strokeLinecap='round' strokeLinejoin='round'/>
            <path d='M9 9L19 19' stroke='white' strokeWidth='1.38' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
    )
}

export default IconCross;