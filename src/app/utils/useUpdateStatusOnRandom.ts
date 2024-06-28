import { Travel, TravelStatusKeys } from '../types/travelsTypes';
import { updateTravelStatus } from '../api/travelsApi';
import { useTravelsContext } from './TravelsContext';

const useUpdateStatusOnRandom = () => {
    const { travels, setTravels} = useTravelsContext();

    const updateStatus = async (travelId: number) => {
        const prevStatus = travels.find((travel: Travel) => travel.id === travelId)?.status;
        if (prevStatus === TravelStatusKeys.Completed) {
            const updatedTravel = await updateTravelStatus(travelId, TravelStatusKeys.Upcoming);
            setTravels(travels.map((travel: Travel) => travel.id === travelId ? updatedTravel : travel));
        }
    };

    return { updateStatus };
};

export default useUpdateStatusOnRandom;