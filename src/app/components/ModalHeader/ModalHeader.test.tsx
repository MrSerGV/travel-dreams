import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ModalHeader from './ModalHeader';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('ModalHeader', () => {
    const navigate = useNavigate();

    it('renders without crashing', () => {
        const { getByAltText } = render(
            <Router>
                <ModalHeader title='Test Title' url='Test Url' />
            </Router>
        );
        expect(getByAltText('Test Title')).toBeInTheDocument();
    });

    it('navigates to home page when close button is clicked', () => {
        const {} = render(
            <Router>
                <ModalHeader title='Test Title' url='Test Url' />
            </Router>
        );

        const closeBtn = document.getElementById('closeBtn');
        if (!closeBtn) throw new Error('Cannot find element with id closeBtn');
        fireEvent.click(closeBtn);
        expect(navigate).toHaveBeenCalledWith('/');
    });

    it('does not navigate when close button is not clicked', () => {
        render(
            <Router>
                <ModalHeader title='Test Title' url='Test Url' />
            </Router>
        );
        expect(navigate).not.toHaveBeenCalled();
    });
});