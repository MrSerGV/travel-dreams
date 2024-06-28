import { render, fireEvent } from '@testing-library/react';
import { TravelsContext } from '../../utils/TravelsContext';
import { RandomTravelContext } from '../../utils/RandomTravelContext';
import SearchBlock from './SearchBlock';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('SearchBlock', () => {
    let setSearchMock: jest.Mock;

    beforeEach(() => {
        setSearchMock = jest.fn();
    });

    it('should render without crashing', () => {
        render(
            <TravelsContext.Provider value={{ travels: [], setTravels: ()=>{}}}>
                <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                    <SearchBlock onSetSearch={setSearchMock} />
                </RandomTravelContext.Provider>
            </TravelsContext.Provider>
        );
    });

    it('should call onSetSearch with lowercased input value when search is clicked', () => {
        const { getByPlaceholderText } = render(
            <TravelsContext.Provider value={{ travels: [], setTravels: ()=>{}}}>
                <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                    <SearchBlock onSetSearch={setSearchMock} />
                </RandomTravelContext.Provider>
            </TravelsContext.Provider>
        );
        const input = getByPlaceholderText('Search trips');
        const button = document.getElementsByClassName('ant-input-search-button')[0];
        if (!button) throw new Error('Cannot find element with class ant-input-search-button');

        fireEvent.change(input, { target: { value: 'TEST' } });
        fireEvent.click(button);

        expect(setSearchMock).toHaveBeenCalledWith('test');
    });

    it('should call onSetSearch with empty string when search is clicked with no input', () => {
        const { getByPlaceholderText } = render(
            <TravelsContext.Provider value={{ travels: [], setTravels: ()=>{}}}>
                <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                    <SearchBlock onSetSearch={setSearchMock} />
                </RandomTravelContext.Provider>
            </TravelsContext.Provider>
        );
        const input = getByPlaceholderText('Search trips');
        const button = document.getElementsByClassName('ant-input-search-button')[0];
        if (!button) throw new Error('Cannot find element with class ant-input-search-button');

        fireEvent.keyPress(input, { key: 'Enter', code: 13 });
        fireEvent.click(button);

        expect(setSearchMock).toHaveBeenCalledWith('');
    });

    it('should call onClickRandom when random trip button is clicked', () => {
        const { getByText } = render(
            <TravelsContext.Provider value={{ travels: [], setTravels: ()=>{}}}>
                <RandomTravelContext.Provider value={{ randomTravel: null, setRandomTravel: ()=>{} }}>
                    <SearchBlock onSetSearch={setSearchMock} />
                </RandomTravelContext.Provider>
            </TravelsContext.Provider>
        );
        const button = getByText('Pick up a random trip');

        fireEvent.click(button);

    });
});