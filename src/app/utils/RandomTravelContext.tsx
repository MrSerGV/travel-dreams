import React from 'react';

export interface RandomTravel {
    travelId: string;
    expirationDate: number;
}

interface RandomTravelContextValue {
    randomTravel: RandomTravel | null;
    setRandomTravel: React.Dispatch<React.SetStateAction<RandomTravel|null>>;
}

export const RandomTravelContext = React.createContext<RandomTravelContextValue | undefined>(undefined);

export const useRandomTravelContextContext = () => {
    const randomTravelContext = React.useContext(RandomTravelContext);
    if (randomTravelContext === undefined) {
        throw new Error('useRandomTravelContext must be inside a RandomTravelProvider');
    }
    return randomTravelContext;
};