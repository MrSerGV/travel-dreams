import { Travel, TravelStatus, TravelStatusKeys } from '../types/travelsTypes';
import { updateTravelStatus } from '../api/travelsApi';
import { useTravelsContext } from './TravelsContext';

const useStatusRevert = () => {
    const { travels, setTravels} = useTravelsContext();

    const revertStatus = async (travelId: number, status: TravelStatus) => {
        const newStatus = status === TravelStatusKeys.Completed ? TravelStatusKeys.Upcoming : TravelStatusKeys.Completed;
        const updatedTravel = await updateTravelStatus(travelId, newStatus);
        setTravels(travels.map((travel: Travel) => travel.id === travelId ? updatedTravel : travel));
    };

    return { revertStatus };
};

export default useStatusRevert;