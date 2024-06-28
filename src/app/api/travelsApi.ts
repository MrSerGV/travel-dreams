import { HttpMethod } from '../types/apiTypes';
import { NewTravel, Travel, TravelStatus } from '../types/travelsTypes';

const ROUTE = 'https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels';
const headers = { 'Content-type': 'application/json; charset=UTF-8' };

/**
 * fetches all travels
 * @returns list of travels
 */
export async function fetchTravels(): Promise<Travel[]> {
    return fetch(ROUTE).then((res) => res.json());
}

/**
 * create new travel
 * @param travelData
 * @returns created travel
 */
export async function createTravel(travelData: NewTravel): Promise<Travel> {
    return fetch(ROUTE, {
        method: HttpMethod.POST,
        body: JSON.stringify(travelData),
        headers,
    }).then((response) => response.json());
}

/**
 * update travel by id
 * @param travelData
 * @returns updated travel
 */
export async function updateTravel(travelData: Travel): Promise<Travel> {
    return fetch(`${ROUTE}/${travelData.id}`, {
        method: HttpMethod.PUT,
        body: JSON.stringify(travelData),
        headers,
    }).then((response) => response.json());
}

/**
 * update status for travel by id
 * @param travelId
 * @param status
 * @returns updated travel
 */
export async function updateTravelStatus(travelId: number, status: TravelStatus): Promise<Travel> {
    return fetch(`${ROUTE}/${travelId}`, {
        method: HttpMethod.PATCH,
        body: JSON.stringify({ status }),
        headers,
    }).then((response) => response.json());
}

/**
 * delete travels by id
 * @param travelId
 * @returns
 */
export async function deleteTravel(travelId: number) {
    return fetch(`${ROUTE}/${travelId}`, {
        method: HttpMethod.DELETE,
    }).then((response) => response.json());
}