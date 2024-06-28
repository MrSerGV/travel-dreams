import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Icon from '@ant-design/icons';

import IconCross from '../../../assets/IconCross';

interface ModalHeaderProps {
    title: string;
    url: string;
}

const ModalHeader = ({ title, url }: ModalHeaderProps) => {
    const navigate = useNavigate();
    
    return (
        <div className='modal-header'>
            <img
                alt={title}
                src={url}
            />
            <Button
                id='closeBtn'
                icon={<Icon component={() => <IconCross/>}/>}
                type='link'
                onClick={() => navigate('/')}>
            </Button>
        </div>
    );
}

export default ModalHeader;