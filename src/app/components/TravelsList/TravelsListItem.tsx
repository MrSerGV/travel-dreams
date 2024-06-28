import React from 'react';
import { List, Button, Col, Statistic } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { Travel } from '../../types/travelsTypes';
import useDeleteTravel from '../../utils/useDeleteTravel';

const { Countdown } = Statistic;

interface TravelsListItemProps {
    travel: Travel;
    expirationDate: number| null;
}

const TravelsListItem = ({ travel, expirationDate }: TravelsListItemProps) => {
  const location = useLocation();
  const { removeTravel } = useDeleteTravel();

  const onClickRemoveButton = () => removeTravel(travel.id);

  return (
      <List.Item
          key={travel.title}
          className='travels-list-item'
      >
          {
              <>
                  <Col className='image-col' span={12}>
                      <img
                          alt={travel.title}
                          src={travel.photo_url}
                      />
                  </Col>
                  <Col className='content-col' span={12}>
                      <div className='title-wrapper'>
                          <div className='item-title'>{travel.title}</div>
                          {expirationDate && <Countdown value={expirationDate} format='D day H h m:s '/>}
                      </div>
                      <div className='item-description'>{travel.description}</div>
                      <div className='item-buttons'>
                          <Link
                              id='veiwBtn'
                              to={`/travel-view/${travel.id}`}
                              state={{ previousLocation: location }}
                          >
                              <Button id='veiwBtn' type='text'>See trip details</Button>
                          </Link>
                          <div className='modify-buttons'>
                              <Button id='editBtn' type='text'>Edit</Button>
                              <Button id='removeBtn' type='text' onClick={onClickRemoveButton}>Delete</Button>
                          </div>
                      </div>
                  </Col>
              </>
          }
      </List.Item>
  );
}

export default TravelsListItem;