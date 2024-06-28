import React, {useState} from 'react';

import TravelDetailsModal from './app/views/TravelDetailsModal';

import './App.css';
import HomePage from './app/views/HomePage';
import { Route, Routes, useLocation} from 'react-router-dom';
import { TravelsContext } from './app/utils/TravelsContext';
import { Travel } from './app/types/travelsTypes';

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const [travels, setTravels] = useState<Travel[]>([]);
  return (
    <div className='App'>
        <TravelsContext.Provider value={{ travels, setTravels }}>
            <Routes location={previousLocation || location}>
                <Route path='/' element={<HomePage />}></Route>
            </Routes>

            {previousLocation && (
                <Routes>
                    <Route path='/travel-view/:id' element={<TravelDetailsModal />} />
                </Routes>
            )}
        </TravelsContext.Provider>
    </div>
  );
}

export default App;
