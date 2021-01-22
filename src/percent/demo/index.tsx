import * as React from 'react';
import {Percent} from 'env-puzzle';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  percentDemo: {
    width: '100%',
    height: 300,
    background: 'rgba(0, 0, 0, 1)',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  percentItem: {
    width: 300,
    height: 240,
  },
});

const PercentDemo: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.percentDemo}>
      <Percent
        className={classes.percentItem}
        title="生活垃圾增长率"
        value={80}
      />

      <Percent
        className={classes.percentItem}
        title="叹气次数增长率"
        value={36}
      />

      <Percent
        className={classes.percentItem}
        title="不想干了次数增长率"
        value={100}
      />
    </div>
  );
};

export default PercentDemo;
