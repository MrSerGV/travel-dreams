import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TravelStatusKeys } from '../../types/travelsTypes';
import TravelTypesButtons from './TravelTypesButtons';

interface GroupProps {
    options: { label: string, value: string }[];
    onChange: (event: { target: { value: string } }) => void;
    value: string;
}

jest.mock('antd', () => ({
    Radio: {
        Group: ({ options, onChange, value }: GroupProps) => (
            <div>
                {options.map((option, index) => (
                    <button key={index} onClick={() => onChange({ target: { value: option.value } })}>
                        {option.label}
                    </button>
                ))}
                <div data-testid='value'>{value}</div>
            </div>
        ),
    },
}));

describe('TravelTypesButtons', () => {
    it('renders correctly', () => {
        const { getByText } = render(<TravelTypesButtons currentTravelType={TravelStatusKeys.All} onSetCurrentTravelType={() => {}} />);
        expect(getByText('All')).toBeInTheDocument();
        expect(getByText('Upcoming')).toBeInTheDocument();
        expect(getByText('Completed')).toBeInTheDocument();
    });

    it('handles onChange event', () => {
        const mockOnChange = jest.fn();
        const { getByText } = render(<TravelTypesButtons currentTravelType={TravelStatusKeys.All} onSetCurrentTravelType={mockOnChange} />);
        fireEvent.click(getByText('Upcoming'));
        expect(mockOnChange).toHaveBeenCalledWith(TravelStatusKeys.Upcoming);
    });

    it('sets initial value correctly', () => {
        const { getByTestId } = render(<TravelTypesButtons currentTravelType={TravelStatusKeys.Completed} onSetCurrentTravelType={() => {}} />);
        expect(getByTestId('value').textContent).toBe(TravelStatusKeys.Completed);
    });
});