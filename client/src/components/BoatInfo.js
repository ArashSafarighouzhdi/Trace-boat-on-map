import React from 'react';
import './styles/index.css';

const BoatInfo = ({ data }) => {
  return (
    <>
    {data && <div>
            <div>
                <span className='title'>ShipId: </span>
                <span className='value'>{data?.shipId}</span>
            </div>
            <div>
                <span className='title'>ShipName: </span>
                <span className='value'>{data?.shipName}</span>
            </div>
            <div>
                <span className='title'>MMSI: </span>
                <span className='value'>{data?.MMSI}</span>
            </div>
            <div>
                <span className='title'>longitude: </span>
                <span className='value'>{data?.longitude}</span>
            </div>
            <div>
                <span className='title'>latitude: </span>
                <span className='value'>{data?.latitude}</span>
            </div>
        </div>
    }
    </>
  )
}

export default BoatInfo;
