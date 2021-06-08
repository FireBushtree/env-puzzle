import React, {useState} from 'react';
import {ToMap} from 'env-puzzle';
import BMap from '@/src/b-map';

export interface DrawAreaDemoProps {}

const DrawAreaDemo: React.FC<DrawAreaDemoProps> = (props) => {
  const [points, setPoints] = useState<Array<{lng: number; lat: number}>>([]);

  return (
    <>
      <ToMap.DrawArea
        onConfirm={(e) => {
          const points = e.overlay.nc.map((item: any) => item.vb);
          setPoints(points);
        }}
      />

      <BMap style={{height: 500, marginTop: 24}}>
        <BMap.Polygon boundaries={points} />
      </BMap>
    </>
  );
};

export default DrawAreaDemo;
