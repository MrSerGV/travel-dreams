import {Travel, TravelStatus, TravelStatusKeys} from '../types/travelsTypes';

export const isShownBySearch = (travel: Travel, searchValue: string): boolean => {
    return travel.title.toLowerCase().includes(searchValue) ||
        travel.description.toLowerCase().includes(searchValue) ||
        travel.itinerary.some((step) => step.location.toLowerCase().includes(searchValue) || step.description.toLowerCase().includes(searchValue));
};

export const isShownByStatus = (travel: Travel, currentTravelType: TravelStatus): boolean => {
    return travel.status === currentTravelType;
};

export const getRandomTravelId = (travels: Travel[]): string => {
    const randomIndex = Math.floor(Math.random() * travels.length);
    return travels[randomIndex]?.id.toString();
};

export const applyFilters = (travels: Travel[], searchValue: string, currentTravelType: TravelStatus): Travel[] => {
    if (currentTravelType === TravelStatusKeys.All) {
        return travels.filter((travel: Travel) => isShownBySearch(travel, searchValue));
    } else if (searchValue === '') {
        return travels.filter((travel: Travel) => isShownByStatus(travel, currentTravelType));
    } else {
        return travels.filter((travel: Travel) => isShownByStatus(travel, currentTravelType) && isShownBySearch(travel, searchValue));
    }
};