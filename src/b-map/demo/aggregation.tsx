import React from 'react';
import {BMap} from 'env-puzzle';
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

  return (
    <div className={style.aggregationDemo}>
      <BMap></BMap>
    </div>
  );
};

export default AggregationDemo;
