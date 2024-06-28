import React from 'react';
import { render } from '@testing-library/react';

import { TravelsContext } from '../../utils/TravelsContext';
import { RandomTravelContext } from '../../utils/RandomTravelContext';
import { BrowserRouter as Router } from 'react-router-dom';
import TravelsList from './TravelsList';
import { TravelStatusKeys } from '../../types/travelsTypes';
import useGetTravels from '../../utils/useGetTravels';

jest.mock('../../utils/useGetTravels');

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('TravelsList', () => {
    const mockTravel = {
        id: 1,
        title: 'Test Travel',
        photo_url: 'http://test.com',
        description: 'Test Description',
        status: TravelStatusKeys.Upcoming,
        itinerary: [],
    };

    const mockLoadMoreData = jest.fn();

    beforeEach(() => {
        (useGetTravels as jest.Mock).mockReturnValue({
            loadMoreData: mockLoadMoreData,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders travels list correctly', () => {
        const { getByText } = render(
            <Router>
                <TravelsContext.Provider value={{ travels: [mockTravel], setTravels: () => {} }}>
                    <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                        <TravelsList currentTravelType={TravelStatusKeys.All} searchValue='' />
                    </RandomTravelContext.Provider>
                </TravelsContext.Provider>
            </Router>
        );

        expect(getByText('Test Travel')).toBeInTheDocument();
    });

    test('applies filters correctly', () => {
        const { getByText, queryByText } = render(
            <Router>
                <TravelsContext.Provider value={{ travels: [mockTravel], setTravels: () => {} }}>
                    <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                        <TravelsList currentTravelType={TravelStatusKeys.Completed} searchValue='' />
                    </RandomTravelContext.Provider>
                </TravelsContext.Provider>
            </Router>
        );

        expect(queryByText('Test Travel')).toBeNull();
    });

    test('loads more data on component mount', () => {
        render(
            <Router>
                <TravelsContext.Provider value={{ travels: [mockTravel], setTravels: () => {} }}>
                    <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                        <TravelsList currentTravelType={TravelStatusKeys.All} searchValue='' />
                    </RandomTravelContext.Provider>
                </TravelsContext.Provider>
            </Router>
        );

        expect(mockLoadMoreData).toHaveBeenCalled();
    });
});