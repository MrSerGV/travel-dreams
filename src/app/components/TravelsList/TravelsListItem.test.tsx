import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TravelsListItem from './TravelsListItem';
import {TravelStatusKeys} from '../../types/travelsTypes';
import {RandomTravelContext} from '../../utils/RandomTravelContext';
import { BrowserRouter as Router } from 'react-router-dom';
import {TravelsContext} from '../../utils/TravelsContext';

describe('TravelsListItem', () => {
    const itinerary = [
        { day: 1, location: 'Location 1', description: 'Description 1' },
        { day: 2, location: 'Location 2', description: 'Description 2' },
    ];

    const mockTravel = {
        id: 1,
        title: 'Test Travel',
        photo_url: 'http://test.com',
        description: 'Test Description',
        status: TravelStatusKeys.Upcoming,
        itinerary,
    };

    test('renders travel item correctly', () => {
        const { getByText, getByAltText } = render(
            <Router>
                <TravelsContext.Provider value={{ travels: [], setTravels: () => {} }}>
                    <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                        <TravelsListItem travel={mockTravel} expirationDate={null} />
                    </RandomTravelContext.Provider>
                </TravelsContext.Provider>
            </Router>
        );

        expect(getByText('Test Travel')).toBeInTheDocument();
        expect(getByAltText('Test Travel')).toBeInTheDocument();
        expect(getByText('Test Description')).toBeInTheDocument();
    });

    test('renders countdown when expiration date is provided', () => {
        const { getByText } = render(
            <Router>
                <TravelsContext.Provider value={{ travels: [], setTravels: () => {} }}>
                    <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                        <TravelsListItem travel={mockTravel} expirationDate={Date.now() + 10000} />
                    </RandomTravelContext.Provider>
                </TravelsContext.Provider>
            </Router>
        );

        expect(getByText(/day/)).toBeInTheDocument();
    });

    test('does not render countdown when expiration date is null', () => {
        const { queryByText } = render(
            <Router>
                <TravelsContext.Provider value={{ travels: [], setTravels: () => {} }}>
                    <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                        <TravelsListItem travel={mockTravel} expirationDate={null} />
                    </RandomTravelContext.Provider>
                </TravelsContext.Provider>
            </Router>
        );

        expect(queryByText(/day/)).toBeNull();
    });

});