import { Travel } from '../types/travelsTypes';
import { deleteTravel } from '../api/travelsApi';
import { useTravelsContext } from './TravelsContext';

const useDeleteTravel = () => {
    const { travels, setTravels} = useTravelsContext();

    const removeTravel = async (travelId: number) => {
        await deleteTravel(travelId);
        setTravels(travels.filter((travel: Travel) => travel.id !== travelId));
    };

    return { removeTravel };
};

export default useDeleteTravel;