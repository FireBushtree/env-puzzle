import React from 'react';

export interface PolygonProps {
  map?: any;
  boundaries: Array<Array<number> | Array<string>>;
}

const Polygon: React.FC<PolygonProps> = (props: PolygonProps) => {
  const {map, boundaries} = props;

  React.useEffect(() => {
    if (!map || !boundaries) {
      return;
    }

    const points: Array<typeof window.BMap.Point> = [];
    boundaries.forEach((item) => {
      const [lng, lat] = item;
      points.push(new window.BMap.Point(lng, lat));
    });

    const hole = new window.BMap.Polygon(points, {
      strokeWeight: 2,
      fillColor: '#1890ff',
      fillOpacity: 0.3,
    });

    map.addOverlay(hole);
  }, []);

  return <div />;
};

export default Polygon;
