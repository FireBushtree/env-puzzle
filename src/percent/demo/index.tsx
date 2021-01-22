import * as React from 'react';
import {Percent} from 'env-puzzle';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  percentDemo: {
    width: '100%',
    height: 600,
    background: 'rgba(0, 0, 0, 1)',
  },
  percentItem: {
    width: 300,
    height: 200,
  },
});

const {LinePercent} = Percent;

const PercentDemo: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.percentDemo}>
      <Percent
        className={classes.percentItem}
        title="生活垃圾增长率"
        value={80}
      />

      <LinePercent lineWidth={500} name="我的颜值" value={80} />
    </div>
  );
};

export default PercentDemo;
