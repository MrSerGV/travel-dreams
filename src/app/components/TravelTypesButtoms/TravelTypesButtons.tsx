import React from 'react';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

import { TravelStatus, TravelStatusKeys } from '../../types/travelsTypes';

interface TravelTypesButtonsProps {
    currentTravelType: string;
    onSetCurrentTravelType: (value: TravelStatus) => void;
}

const TravelTypesButtons = ({ currentTravelType, onSetCurrentTravelType }: TravelTypesButtonsProps) => {

  const options = [
    { label: 'All', value: TravelStatusKeys.All },
    { label: 'Upcoming', value: TravelStatusKeys.Upcoming },
    { label: 'Completed', value: TravelStatusKeys.Completed }
  ];

  const onChangeTravelType = ({ target: { value } }: RadioChangeEvent) => {
    onSetCurrentTravelType(value);
  };

  return (
      <Radio.Group
          className='filter-buttons'
          options={options}
          onChange={onChangeTravelType}
          value={currentTravelType}
          optionType='button'
      />
  );
}

export default TravelTypesButtons;