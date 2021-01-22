import OriginPercent from './percent';
import LinePercent from './line-percent';

type PercentT = typeof OriginPercent;

interface PercentI extends PercentT {
  LinePercent: typeof LinePercent;
}

const Percent: PercentI = OriginPercent as PercentI;
Percent.LinePercent = LinePercent;

export default Percent;
