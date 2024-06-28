import { renderHook, act } from '@testing-library/react-hooks';
import { useCookie } from './useCookie';
import useGetTargetDate from './useGetTargetDate';

jest.mock('./RandomTravelContext', () => ({
    useRandomTravelContextContext: () => ({
        setRandomTravel: jest.fn(),
    }),
}));

describe('useCookie', () => {
    let setItemSpy: jest.SpyInstance;
    let getItemSpy: jest.SpyInstance;

    beforeEach(() => {
        setItemSpy = jest.spyOn(document, 'cookie', 'set');
        getItemSpy = jest.spyOn(document, 'cookie', 'get');
    });

    afterEach(() => {
        setItemSpy.mockRestore();
        getItemSpy.mockRestore();
    });

    it('should set cookie when setCookie is called', () => {
        const { result } = renderHook(() => useCookie());
        act(() => {
            result.current.setCookie('123');
        });
        expect(setItemSpy).toHaveBeenCalledWith(expect.stringContaining('randomTravel'));
    });
});