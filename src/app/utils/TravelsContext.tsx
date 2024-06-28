import React from 'react';

import { Travel } from '../types/travelsTypes';

interface TravelsContextValue {
    travels: Travel[];
    setTravels: React.Dispatch<React.SetStateAction<Travel[]>>;
}

export const TravelsContext = React.createContext<TravelsContextValue | undefined>(undefined);

export const useTravelsContext = () => {
    const travelContext = React.useContext(TravelsContext);
    if (travelContext === undefined) {
        throw new Error('useTravelsContext must be inside a TravelsProvider');
    }
    return travelContext;
};