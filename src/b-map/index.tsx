import InternalBMap from './b-map';
import Marker from './marker';
import Polygon from './polygon';

type InternalBMapT = typeof InternalBMap;
interface BMapI extends InternalBMapT {
  Marker: typeof Marker;
  Polygon: typeof Polygon;
}

const BMap: BMapI = InternalBMap as BMapI;
BMap.Marker = Marker;
BMap.Polygon = Polygon;

export default BMap;
