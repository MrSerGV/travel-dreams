import { renderHook } from '@testing-library/react-hooks';
import { useRandomTravelContextContext } from './RandomTravelContext';
import useGetTargetDate from './useGetTargetDate';

jest.mock('./RandomTravelContext');

describe('useGetTargetDate', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('returns null when travelId does not match', () => {
        (useRandomTravelContextContext as jest.Mock).mockReturnValue({
            randomTravel: { travelId: '123', expirationDate: 456 },
        });

        const { result } = renderHook(() => useGetTargetDate());
        expect(result.current.getTargetDate('789')).toBeNull();
    });

    it('returns expirationDate when travelId matches', () => {
        const mockExpirationDate = 456;
        (useRandomTravelContextContext as jest.Mock).mockReturnValue({
            randomTravel: { travelId: '123', expirationDate: mockExpirationDate },
        });

        const { result } = renderHook(() => useGetTargetDate());
        expect(result.current.getTargetDate('123')).toBe(mockExpirationDate);
    });

    it('handles null randomTravel gracefully', () => {
        (useRandomTravelContextContext as jest.Mock).mockReturnValue({
            randomTravel: null,
        });

        const { result } = renderHook(() => useGetTargetDate());
        expect(result.current.getTargetDate('123')).toBeNull();
    });
});