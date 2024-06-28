export enum TravelStatusKeys {
    All = 'all',
    Upcoming = 'todo',
    Completed = 'done',
}

export type TravelStatus =`${TravelStatusKeys}`

export interface ItineraryStep {
    day: number;
    location: string;
    description: string;
}
export interface NewTravel {
    title: string;
    description: string;
    photo_url: string;
    status: TravelStatusKeys;
    itinerary: ItineraryStep[];
}

export interface Travel extends NewTravel {
    id: number;
}