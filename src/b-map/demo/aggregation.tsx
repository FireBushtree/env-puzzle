import React, {useState} from 'react';
import {BMap} from 'env-puzzle';
import {createUseStyles} from 'react-jss';
import {Button} from 'antd';
import {Point} from 'env-puzzle/lib/b-map';

const {MarkerClusterer, Marker} = BMap;

const useStyles = createUseStyles({
  aggregationDemo: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

const AggregationDemo: React.FC = () => {
  const style = useStyles();
  const [mapCenter, setMapCenter] = useState({lng: 120.591693, lat: 31.304737});
  const [currentPoint, setCurrentPoint] = useState<Point>();

  const points: Array<Point> = [];

  for (let i = 0; i < 2000; i++) {
    const pointLng = mapCenter.lng + (Math.random() - 0.5) * 0.1;
    const pointLat = mapCenter.lat + (Math.random() - 0.5) * 0.1;
    points.push({lng: pointLng, lat: pointLat});
  }

  return (
    <div className={style.aggregationDemo}>
      {currentPoint && (
        <div>
          <Button
            onClick={() => {
              setCurrentPoint(undefined);
            }}
          >
            返回
          </Button>
        </div>
      )}

      <BMap center={mapCenter}>
        {currentPoint ? (
          <Marker
            lng={currentPoint?.lng || ''}
            lat={currentPoint?.lat || ''}
            icon={{
              url: require('./images/icon-small-point.png'),
              width: 10,
              height: 10,
            }}
            jump
          />
        ) : (
          <MarkerClusterer
            onMarkerClick={(point) => {
              setMapCenter(point);
              setCurrentPoint(point);
            }}
            markerIcon={{
              url: require('./images/icon-small-point.png'),
              width: 10,
              height: 10,
            }}
            markerClusterIcon={{
              url: require('./images/icon-point.png'),
              width: 87,
              height: 87,
            }}
            points={points}
          />
        )}
      </BMap>
    </div>
  );
};

export default AggregationDemo;
