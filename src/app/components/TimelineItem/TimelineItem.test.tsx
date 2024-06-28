import React from 'react';
import { render, screen } from '@testing-library/react';
import TimelineItem from './TimelineItem';

describe('TimelineItem', () => {
    it('renders correctly with valid props', () => {
        render(<TimelineItem day={1} location='Location Test' description='Description Test' />);

        expect(screen.getByText('Day 1: Location Test')).toBeInTheDocument();
        expect(screen.getByText('Description Test')).toBeInTheDocument();
    });

    it('renders correctly when day is two', () => {
        render(<TimelineItem day={2} location='Location Test' description='Description Test' />);

        expect(screen.getByText('Day 2: Location Test')).toBeInTheDocument();
    });

});