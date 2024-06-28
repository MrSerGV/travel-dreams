import React from 'react';

interface TimelineItemProps {
    day: number;
    location: string;
    description: string;
}

const TimelineItem = ({ day, location, description }: TimelineItemProps) => {
    return (
        <div className='step'>
            <div className='step-title'>{`Day ${day}: ${location}`}</div>
            <div className='step-description'>{description}</div>
        </div>
    );
}

export default TimelineItem;