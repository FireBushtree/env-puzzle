import React, {useState} from 'react';
import {ToMap} from 'env-puzzle';

export interface DrawAreaDemoProps {}

const DrawAreaDemo: React.FC<DrawAreaDemoProps> = (props) => {
  const [points, setPoints] = useState<Array<{lng: number; lat: number}>>([]);

  return (
    <>
      {points.map((item, index) => (
        <>
          <div key={index}>{item.lng}</div>
          <div key={index}>{item.lat}</div>
        </>
      ))}
      <ToMap.DrawArea
        onConfirm={(e) => {
          const points = e.overlay.nc.map((item: any) => item.vb);
          setPoints(points);
        }}
      />
    </>
  );
};

export default DrawAreaDemo;
