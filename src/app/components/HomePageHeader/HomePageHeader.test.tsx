import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomePageHeader from './HomePageHeader';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('HomePageHeader', () => {
    const mockOnClick = jest.fn();

    it('renders without crashing', () => {
        const { } = render(<HomePageHeader onClickButton={mockOnClick} buttonText='Test' />);
        const header = document.getElementsByClassName('header')[0];
        expect(header).toBeInTheDocument();
    });

    it('calls onClickButton when button is clicked', () => {
        const { } = render(<HomePageHeader onClickButton={mockOnClick} buttonText='Test' />);
        const button = document.getElementById('creatBtn');
        if (!button) throw new Error('Cannot find element with id redoBtn');
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    });

    it('displays correct button text', () => {
        const { getByText } = render(<HomePageHeader onClickButton={mockOnClick} buttonText='Test' />);
        const button = getByText('Test');
        expect(button).toBeInTheDocument();
    });
});