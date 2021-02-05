import moment from 'moment';
import React, {useEffect} from 'react';
import {Point} from './b-map';

export interface LuShuProps {
  map?: any;
  points: Array<Point>;
  icon?: {
    url: string;
    width: number;
    height: number;
  };
}

const LuShu: React.FC<LuShuProps> = (props: LuShuProps) => {
  const {map, points, icon} = props;

  useEffect(() => {
    const path: Array<typeof window.BMap.Point> = [];

    points.forEach((item) => {
      const {lng, lat} = item;
      path.push(new window.BMap.Point(lng, lat));
    });

    const line = new window.BMap.Polyline(path);
    line.name = moment().valueOf();
    map.addOverlay(line);

    const lushu = new window.BMapLib.LuShu(map, path, {
      landmarkPois: [],
      icon: new window.BMap.Icon(
          icon?.url,
          new window.BMap.Size(icon?.width, icon?.height),
      ),
      defaultContent: '',
      enableRotation: true,
    });
    lushu.start();

    return () => {
      lushu.stop();
      lushu.hideInfoWindow();
      map.removeOverlay(line);
      map.removeOverlay(lushu._marker);
    };
  }, [points]);

  return <div />;
};

export default LuShu;
