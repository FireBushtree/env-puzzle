import React from 'react';
import {Percent} from 'env-puzzle';
import {createUseStyles} from 'react-jss';

const {LinePercent} = Percent;

const useStyles = createUseStyles({
  wrap: {
    width: '100%',
    height: 200,
    background: '#000',
    padding: 10,
  },
  percentItem: {
    '& + &': {
      marginTop: 20,
    },
  },
});

const LinePercentDemo: React.FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <LinePercent className={classes.percentItem} value={50} />

      <LinePercent
        title="你的颜值"
        className={classes.percentItem}
        value={20}
        suffix="20%"
      />

      <LinePercent
        title="我的颜值"
        lineWidth={375}
        className={classes.percentItem}
        value={100}
        suffix="100%"
      />
    </div>
  );
};

export default LinePercentDemo;
