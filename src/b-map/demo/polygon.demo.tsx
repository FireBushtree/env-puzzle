import React, {FC} from 'react';
import {BMap} from 'env-puzzle';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  wrap: {
    height: '100vh',
    width: '100%',
  },
});

const PolygonDemo: FC = () => {
  const style = useStyles();

  const points = [
    {lng: 120.541819, lat: 31.357112},
    {lng: 120.698771, lat: 31.337375},
    {lng: 120.687848, lat: 31.258877},
    {lng: 120.550443, lat: 31.261347},
  ];

  const anotherPoints = [
    {lng: 116.340453, lat: 39.94791},
    {lng: 116.520977, lat: 39.898884},
    {lng: 116.360288, lat: 39.857688},
  ];

  return (
    <div>
      <BMap zoom={12} className={style.wrap}>
        <BMap.Polygon boundaries={anotherPoints} />
        <BMap.Polygon boundaries={points} options={{strokeWeight: 10}} />
      </BMap>
    </div>
  );
};

export default PolygonDemo;
