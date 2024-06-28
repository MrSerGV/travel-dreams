import React, { useState } from 'react';

import './HomePage.css';
import TravelTypesButtons from '../../components/TravelTypesButtoms';
import TravelsList from '../../components/TravelsList';
import HomePageHeader from '../../components/HomePageHeader';
import SearchBlock from '../../components/SearchBlock';
import { TravelStatus, TravelStatusKeys } from '../../types/travelsTypes';
import { RandomTravel, RandomTravelContext } from '../../utils/RandomTravelContext';

const HomePage = () => {
    const [currentTravelType, setCurrentTravelType] = useState<TravelStatus>(TravelStatusKeys.All);
    const [searchValue, setSearchValue] = useState<string>('');
    const [randomTravel, setRandomTravel] = useState<RandomTravel| null>(null);

    return (
        <div className='homepage'>
            <HomePageHeader onClickButton={()=>{}} buttonText={'Create travel'} />
            <RandomTravelContext.Provider value={{ randomTravel, setRandomTravel }}>
                <SearchBlock onSetSearch={setSearchValue} />
                <TravelTypesButtons currentTravelType={currentTravelType} onSetCurrentTravelType={setCurrentTravelType} />
                <TravelsList currentTravelType={currentTravelType} searchValue={searchValue} />
            </RandomTravelContext.Provider>

        </div>
    );
}

export default HomePage;