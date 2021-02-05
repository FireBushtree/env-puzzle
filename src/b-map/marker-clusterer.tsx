import React from 'react';
import {Point} from './b-map';

export interface MarkerClusterProps {
  map?: any;
  points: Array<Point>;
  onMarkerClick: (item: any) => any;
  markerIcon: {
    url: string;
    width: number;
    height: number;
  };
  markerClusterIcon: {
    url: string;
    width: number;
    height: number;
  };
}

const MarkerCluster: React.FC<MarkerClusterProps> = (
    props: MarkerClusterProps,
) => {
  const {map, markerIcon, markerClusterIcon, points, onMarkerClick} = props;

  React.useEffect(() => {
    const markers: Array<typeof window.BMap.Marker> = [];
    const myIcon = new window.BMap.Icon(
        markerIcon.url,
        new window.BMap.Size(markerIcon.width, markerIcon.height),
    );

    let markerClusterer: any = undefined;

    points.forEach((item) => {
      const point = new window.BMap.Point(item.lng, item.lat);
      const marker = new window.BMap.Marker(point, {
        icon: myIcon,
      });

      marker.addEventListener('click', () => {
        onMarkerClick && onMarkerClick(item);
      });
      markers.push(marker);
    });

    markerClusterer = new window.BMapLib.MarkerClusterer(map, {
      markers,
      styles: [
        {
          url: markerClusterIcon.url,
          size: new window.BMap.Size(
              markerClusterIcon.width,
              markerClusterIcon.height,
          ),
        },
      ],
    });

    return () => {
      markerClusterer.clearMarkers();
    };
  }, [points]);

  return <div />;
};

export default MarkerCluster;
