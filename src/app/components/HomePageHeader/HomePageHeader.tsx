import React from 'react';
import { Button, Row } from 'antd';

import IconLogo from '../../../assets/IconLogo';

interface HeaderProps {
    onClickButton: () => void;
    buttonText: string;
}

const HomePageHeader = ({ onClickButton, buttonText}: HeaderProps) => {
    return (
        <Row className='header'>
            <IconLogo />
            <Button id='creatBtn' onClick={onClickButton}>{buttonText}</Button>
        </Row>
    );
}

export default HomePageHeader;