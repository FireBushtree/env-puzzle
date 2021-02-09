import React from 'react';
import {BMap} from 'env-puzzle';
import {Point} from 'env-puzzle/lib/b-map';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  aggregationDemo: {
    height: '100vh',
    width: '100%',
    display: 'flex',
  },
});

const AggregationDemo: React.FC = () => {
  const style = useStyles();
  const points: Array<Point> = [];

  return (
    <div className={style.aggregationDemo}>
      <BMap>
        <BMap.MarkerClusterer></BMap.MarkerClusterer>
      </BMap>
    </div>
  );
};

export default AggregationDemo;
