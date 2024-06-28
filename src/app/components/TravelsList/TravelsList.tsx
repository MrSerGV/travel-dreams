import React, { useEffect, useState } from 'react';
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingOutlined } from '@ant-design/icons';

import { Travel, TravelStatus } from '../../types/travelsTypes';
import TravelsListItem from './TravelsListItem';
import { TravelStatusKeys } from '../../types/travelsTypes';
import { useTravelsContext } from '../../utils/TravelsContext';
import useGetTravels from '../../utils/useGetTravels';
import { applyFilters } from '../../utils/filtersUtils';
import { useRandomTravelContextContext } from '../../utils/RandomTravelContext';

interface TravelsListProps {
    currentTravelType: TravelStatus;
    searchValue: string;
}

const TravelsList = ({ currentTravelType, searchValue }: TravelsListProps) => {
    const { travels} = useTravelsContext();
    const { loadMoreData } = useGetTravels();
    const [currentTravels, setCurrentTravels] = useState<Travel[]>([]);
    const { randomTravel } = useRandomTravelContextContext();

    /**
     *  apply filters on searchValue and currentTravelType change
     */
    useEffect(() => {
        if ((searchValue === '' && currentTravelType === TravelStatusKeys.All) || travels.length === 0) {
            setCurrentTravels([...travels]);
        } else {
            const filteredData = applyFilters(travels, searchValue, currentTravelType);
            setCurrentTravels([...filteredData]);
        }
    }, [searchValue, currentTravelType, travels]);

    /**
     *  load data on component mount
     */
    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div
            id='travelsList'
        >
            <InfiniteScroll
                dataLength={currentTravels.length}
                next={()=>{}}
                hasMore={false}
                loader={<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
                scrollableTarget='travelsList'
            >
                {currentTravels.length > 0 &&<List
                    className='travels-list'
                    dataSource={currentTravels}
                    renderItem={(item: Travel) => (
                       <TravelsListItem
                           travel={item}
                           expirationDate={randomTravel?.travelId === item.id.toString() ? randomTravel?.expirationDate : null }
                       />
                    )}
                />}
            </InfiniteScroll>
        </div>
    );
}

export default TravelsList;