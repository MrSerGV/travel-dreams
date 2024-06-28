import React from 'react';
import { render } from '@testing-library/react';
import ModalBody from './ModalBody';
import { TravelStatusKeys, TravelStatus } from '../../types/travelsTypes';
import { TravelsContext } from '../../utils/TravelsContext';

describe('ModalBody', () => {

    const itinerary = [
        { day: 1, location: 'Location 1', description: 'Description 1' },
        { day: 2, location: 'Location 2', description: 'Description 2' },
    ];

    const renderModalBody = (status:TravelStatus) => render(
        <TravelsContext.Provider value={{ travels: [], setTravels: () => {} }}>
            <ModalBody
                id={1}
                title='Test Title'
                status={status}
                description='Test Description'
                itinerary={itinerary}
            />
        </TravelsContext.Provider>
    );

    jest.mock('../../utils/useStatusRevert', () => ({
        useStatusRevert: () => ({
            revertStatus: jest.fn(),
        }),
    }));

    const { revertStatus } = require('../../utils/useStatusRevert').useStatusRevert();

    it('renders correctly with initial props', async () => {
        const { findByText } = renderModalBody(TravelStatusKeys.Upcoming);
        expect(await findByText('Test Title')).toBeInTheDocument();
        expect(await findByText('Test Description')).toBeInTheDocument();
        expect(await findByText('Itinerary')).toBeInTheDocument();
        expect(await findByText(/Location 1/i)).toBeInTheDocument();
        expect(await findByText(/Location 2/i)).toBeInTheDocument();
    });

    it('shows redo button when status is todo', async () => {
        const { } = renderModalBody(TravelStatusKeys.Upcoming);
        const statusBtn = document.getElementById('statusBtn');
        if (!statusBtn) throw new Error('Cannot find element with id statusBtn');
        expect(statusBtn).toBeInTheDocument();
    });

    it('shows redo button when status is done', () => {
        const { } = renderModalBody(TravelStatusKeys.Completed);
        const redoBtn = document.getElementById('redoBtn');
        if (!redoBtn) throw new Error('Cannot find element with id redoBtn');
        expect(redoBtn).toBeInTheDocument();
    });

});