import { useRandomTravelContextContext } from './RandomTravelContext';

const useGetTargetDate = () => {
    const { randomTravel} = useRandomTravelContextContext();
    const getTargetDate = (travelId: string): number | null => {
        return randomTravel?.travelId === travelId.toString() ? randomTravel.expirationDate : null;
    };

    return { getTargetDate };
};

export default useGetTargetDate;