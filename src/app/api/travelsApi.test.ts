import { fetchTravels, createTravel, updateTravel, updateTravelStatus, deleteTravel } from './travelsApi';
import fetchMock from 'fetch-mock';

import { NewTravel, Travel, TravelStatusKeys, ItineraryStep } from '../types/travelsTypes';

const ROUTE = 'https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels';

const mockItineraryStep: ItineraryStep = {
    day: 1,
    location: 'Test Location',
    description: 'Test Description',
};

const mockNewTravel: NewTravel = {
    title: 'Test Travel',
    description: 'Test Description',
    photo_url: 'https://test.com/photo.jpg',
    status: TravelStatusKeys.Upcoming,
    itinerary: [mockItineraryStep],
};

const mockTravel: Travel = {
    ...mockNewTravel,
    id: 1,
};

beforeEach(() => {
    fetchMock.restore();
});

describe('travelsApi', () => {

    test('fetchTravels returns all travels', async () => {
        const mockTravels: Travel[] = [mockTravel];
        fetchMock.getOnce(ROUTE, mockTravels);

        const result = await fetchTravels();

        expect(result).toEqual(mockTravels);
    });

    test('createTravel creates a new travel', async () => {
        fetchMock.postOnce(ROUTE, mockTravel);

        const result = await createTravel(mockNewTravel);

        expect(result).toEqual(mockTravel);
    });

    test('updateTravel updates a travel', async () => {
        fetchMock.putOnce(`${ROUTE}/${mockTravel.id}`, mockTravel);

        const result = await updateTravel(mockTravel);

        expect(result).toEqual(mockTravel);
    });

    test('updateTravelStatus updates a travel status', async () => {
        const updatedTravel = { ...mockTravel, status: TravelStatusKeys.Completed };
        fetchMock.patchOnce(`${ROUTE}/${mockTravel.id}`, updatedTravel);

        const result = await updateTravelStatus(mockTravel.id, TravelStatusKeys.Completed);

        expect(result).toEqual(updatedTravel);
    });

    test('deleteTravel deletes a travel', async () => {
        fetchMock.deleteOnce(`${ROUTE}/${mockTravel.id}`, {});

        const result = await deleteTravel(mockTravel.id);

        expect(result).toEqual({});
    });

});