import React, {FC, useState} from 'react';
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

  return (
    <div>
      <BMap zoom={12} className={style.wrap}>
        <BMap.Polygon boundaries={points} options={{strokeWeight: 10}} />
      </BMap>
    </div>
  );
};

export default PolygonDemo;
