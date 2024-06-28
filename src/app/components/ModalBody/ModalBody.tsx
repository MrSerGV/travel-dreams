import React from 'react';
import { Button, Timeline } from 'antd';
import Icon from '@ant-design/icons';

import { TravelStatus, TravelStatusKeys } from '../../types/travelsTypes';
import IconCheck from '../../../assets/IconCheck';
import IconRedo from '../../../assets/IconRedo';
import useStatusRevert from '../../utils/useStatusRevert';
import TimelineItem from '../TimelineItem';

interface ModalBodyProps {
    id: number;
    title: string;
    status: TravelStatus;
    description: string;
    itinerary: { day: number; location: string; description: string }[];
}

const ModalBody = ({ id, title, status, description, itinerary }: ModalBodyProps) => {
    const { revertStatus } = useStatusRevert();

    const items = itinerary.map((step) => {
        return {
            children: <TimelineItem day={step.day} location={step.location} description={step.description}/>
        };
    });
    
    const onClickButton = () => revertStatus(id, status);

    return (
        <div className='modal-body'>
            <div className='item-title'>{title}</div>
            <div className={`item-status ${status}`}>
                <Button
                    id='statusBtn'
                    icon={<Icon component={() => <IconCheck/>}/>}
                    type='text'
                    onClick={onClickButton}>
                    {status === TravelStatusKeys.Completed ? 'Complete' : 'Mark as completed'}
                </Button>
                {status === TravelStatusKeys.Completed && <Button
                    id='redoBtn'
                    icon={<Icon component={() => <IconRedo/>}/>}
                    type='text'
                    onClick={onClickButton}>
                    Repeat trip
                </Button>}
            </div>
            <div className='item-description'>{description}</div>
            <div className='item-itinerary-title'>Itinerary</div>
            <Timeline
                className={'item-itinerary-timeline'}
                mode='left'
                items={items}
            />
        </div>
    );
}

export default ModalBody;