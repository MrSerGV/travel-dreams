import {applyFilters, getRandomTravelId, isShownBySearch, isShownByStatus} from './filtersUtils';
import {Travel, TravelStatusKeys} from '../types/travelsTypes';


describe('filtersUtils', () => {

    describe('isShownBySearch', () => {
        const travel: Travel = {
            id: 1,
            title: 'Trip to Madrid',
            description: 'A trip to the capital of Spain',
            photo_url: '',
            itinerary: [
                { day: 1, location: 'Museo Nacional del Prado', description: 'The Prado has one of the largest art collections in the world, and is best known for its diverse assortment of works by Velasquez, Goya and El Greco.' },
                { day: 2, location: 'Museo Nacional Centro de Arte Reina Sofía', description: 'World famous modern art museum featuring a diverse collection of 20th century Spanish art, from Picasso to Solana.' }
            ],
            status: TravelStatusKeys.Upcoming
        }

        it('should return true when search value is in title (capital letters)', () => {
            expect(isShownBySearch(travel, 'madrid')).toBe(true);
        });


        it('should return true when search value is in description', () => {
            expect(isShownBySearch(travel, 'spain')).toBe(true);
        });

        it('should return true when search value is in itinerary', () => {
            expect(isShownBySearch(travel, 'picasso')).toBe(true);
        });

        it('should return false when search value is not found', () => {
            expect(isShownBySearch(travel, 'paris')).toBe(false);
        });

        it('should handle case insensitivity', () => {
            expect(isShownBySearch(travel, 'MADRID')).toBe(false);
        });
    });

    describe('isShownByStatus', () => {
        const travelUpcoming: Travel = {
            id: 1,
            title: 'Trip to Madrid',
            description: 'A trip to the capital of Spain',
            photo_url: '',
            itinerary: [],
            status: TravelStatusKeys.Upcoming
        }

        const travelCompleted: Travel = {
            ...travelUpcoming,
            status: TravelStatusKeys.Completed
        }

        it('should return true when travel status matches the current travel type', () => {
            expect(isShownByStatus(travelUpcoming, TravelStatusKeys.Upcoming)).toBe(true);
        });

        it('should return false when travel status does not match the current travel type', () => {
            expect(isShownByStatus(travelUpcoming, TravelStatusKeys.Completed)).toBe(false);
        });

        it('should return true when travel status matches the current travel type (different travel status)', () => {
            expect(isShownByStatus(travelCompleted, TravelStatusKeys.Completed)).toBe(true);
        });

        it('should return false when travel status does not match the current travel type (different travel status)', () => {
            expect(isShownByStatus(travelCompleted, TravelStatusKeys.Upcoming)).toBe(false);
        });
    });

    describe('getRandomTravelId', () => {
        it('should return a random travel id from the travels array', () => {
            const travels: Travel[] = [
                { id: 1, title: 'Trip 1', description: '', photo_url: '', itinerary: [], status: TravelStatusKeys.Completed },
                { id: 2, title: 'Trip 2', description: '', photo_url: '', itinerary: [], status: TravelStatusKeys.Completed },
                { id: 3, title: 'Trip 3', description: '', photo_url: '', itinerary: [], status: TravelStatusKeys.Completed }
            ];
            const result = getRandomTravelId(travels);
            expect(['1', '2', '3']).toContain(result);
        });

        it('should return undefined when the travels array is empty', () => {
            const travels: Travel[] = [];
            const result = getRandomTravelId(travels);
            expect(result).toBeUndefined();
        });
    });

    describe('applyFilters', () => {
        const travels: Travel[] = [
            { id: 1, title: 'Trip to Madrid', description: 'A trip to the capital of Spain', photo_url: '', itinerary: [], status: TravelStatusKeys.Upcoming },
            { id: 2, title: 'Trip to Paris', description: 'A trip to the capital of France', photo_url: '', itinerary: [], status: TravelStatusKeys.Completed },
            { id: 3, title: 'Trip to Rome', description: 'A trip to the capital of Italy', photo_url: '', itinerary: [], status: TravelStatusKeys.Upcoming }
        ];

        it('should return all travels when currentTravelType is All', () => {
            const result = applyFilters(travels, '', TravelStatusKeys.All);
            expect(result).toEqual(travels);
        });

        it('should return travels matching searchValue when currentTravelType is All', () => {
            const result = applyFilters(travels, 'madrid', TravelStatusKeys.All);
            expect(result).toEqual([travels[0]]);
        });

        it('should return travels matching currentTravelType when searchValue is empty', () => {
            const result = applyFilters(travels, '', TravelStatusKeys.Upcoming);
            expect(result).toEqual([travels[0], travels[2]]);
        });

        it('should return travels matching both searchValue and currentTravelType', () => {
            const result = applyFilters(travels, 'madrid', TravelStatusKeys.Upcoming);
            expect(result).toEqual([travels[0]]);
        });

        it('should return empty array when no travels match searchValue and currentTravelType', () => {
            const result = applyFilters(travels, 'berlin', TravelStatusKeys.Upcoming);
            expect(result).toEqual([]);
        });
    });
});
