import React, {useState} from 'react';
import {BMap} from 'env-puzzle';
import {Button} from 'antd';

const {Marker} = BMap;

const BMapDemo: React.FC = () => {
  const [center, setCenter] = useState<{lng: number; lat: number}>();

  return (
    <div style={{height: 300, display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', padding: '10px'}}>
        <Button
          onClick={() => {
            setCenter({lng: 120.591693, lat: 31.304737});
          }}
        >
          中心点：苏州
        </Button>
        <Button
          onClick={() => {
            setCenter({lng: 116.404, lat: 39.915});
          }}
        >
          中心点：北京
        </Button>
      </div>
      <BMap center={center} style={{flex: 1}}>
        <Marker lng={center?.lng} lat={center?.lat} onDragend={() => {}} />
        <Marker lng={120.591693} lat={31.304737} jump onDragend={() => {}}>
          <img
            style={{width: 32}}
            src={require('./icon-location.png')}
            alt="location"
          />
        </Marker>
      </BMap>
    </div>
  );
};

export default BMapDemo;
