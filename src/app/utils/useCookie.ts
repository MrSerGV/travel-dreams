import { useEffect } from 'react';

import {useRandomTravelContextContext} from './RandomTravelContext';

export interface CookieValue {
    randomTravel: string;
    expirationDate: number;
}

export const useCookie = () => {
    const { setRandomTravel} = useRandomTravelContextContext();
    const travelCookieName = 'randomTravel';

    useEffect(() => {
        const cookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${travelCookieName}=`));

        setRandomTravel(cookie ? JSON.parse(cookie.split('=')[1]) : null);
    }, []);

    const setCookie = (travelId: string) => {
        const expirationDate = Date.now() + 1000 * 60 * 60 * 24 * 90;
        const cookieValue = { travelId, expirationDate };
        document.cookie = `${travelCookieName}=${JSON.stringify(cookieValue)}; expires=${expirationDate.toString()};`;
        setRandomTravel(cookieValue);
    };

    return { setCookie };
};