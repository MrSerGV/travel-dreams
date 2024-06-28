import React from 'react';
import { Input, Col, Button, Row } from 'antd';
import Icon from '@ant-design/icons';

import IconDice from '../../../assets/IconDice';
import { useTravelsContext } from '../../utils/TravelsContext';
import { useCookie } from '../../utils/useCookie';
import { getRandomTravelId } from '../../utils/filtersUtils';
import { useRandomTravelContextContext } from '../../utils/RandomTravelContext';
import useUpdateStatusOnRandom from '../../utils/useUpdateStatusOnRandom';

const { Search } = Input;

interface SearchBlockProps {
    onSetSearch: (value: string) => void;
}

const SearchBlock = ({ onSetSearch }: SearchBlockProps) => {
    const { travels} = useTravelsContext();
    const { setCookie } = useCookie();
    const { randomTravel} = useRandomTravelContextContext();
    const { updateStatus } = useUpdateStatusOnRandom();

    const onClickRandom =  async () => {
        const randomTravel = getRandomTravelId(travels);
        await updateStatus(parseInt(randomTravel, 10));
        setCookie(randomTravel);
    };

    const onClickSearch = (value: string) => {
        onSetSearch(value.toLowerCase());
    };

    return (
        <Row className='search-row'>
            <Col className='search-block' span={12} offset={6}>
                <h1>The places you dream of</h1>
                <div className='search-description'>Let’s live new adventures</div>
                <Search
                    id='search'
                    placeholder='Search trips'
                    enterButton='Search'
                    onSearch={onClickSearch}
                />
            </Col>
            {!randomTravel && <Col className='random-block' span={6}>
                <Button
                    id='statusBtn'
                    icon={<Icon component={() => <IconDice/>}/>}
                    type='text'
                    onClick={onClickRandom}>
                    Pick up a random trip
                </Button>
            </Col>}
        </Row>

    );
}

export default SearchBlock;