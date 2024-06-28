import { useState } from 'react';

import { fetchTravels } from '../api/travelsApi';
import { useTravelsContext } from './TravelsContext';

const useGetTravels = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setTravels} = useTravelsContext();

    const loadMoreData = async () => {
        try {
            if (loading) return;
            setLoading(true);

            const data = await fetchTravels();
            setTravels([...data]);
            setLoading(false);
        } catch {
            setLoading(false);
        }
    };

    return { loadMoreData };
};

export default useGetTravels;