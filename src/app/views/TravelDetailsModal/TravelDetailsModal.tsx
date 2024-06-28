import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col } from 'antd';

import './TravelDetailsModal.css';
import { useTravelsContext } from '../../utils/TravelsContext';
import ModalHeader from '../../components/ModalHeader';
import ModalBody from '../../components/ModalBody';

const TravelDetailsModal = () => {
    const modalRef = useRef<HTMLInputElement>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { travels} = useTravelsContext();
    const travel = travels.find((travel) => travel.id.toString() === id);

    return (
        <div ref={modalRef} className='modal-wrapper' onClick={() => navigate('/')}>
            {travel && <Col className='modal' span={12}>
               <ModalHeader title={travel.title} url={travel.photo_url} />
               <ModalBody 
                   id={travel.id}
                   title={travel.title}
                   status={travel.status}
                   description={travel.description}
                   itinerary={travel.itinerary}
               />
            </Col>}
        </div>
    );
}

export default TravelDetailsModal;