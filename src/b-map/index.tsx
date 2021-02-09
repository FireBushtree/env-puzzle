import InternalBMap, {Point} from './b-map';
import Marker from './marker';
import Polygon from './polygon';
import MarkerClusterer from './marker-clusterer';

type InternalBMapT = typeof InternalBMap;
interface BMapI extends InternalBMapT {
  Marker: typeof Marker;
  Polygon: typeof Polygon;
  MarkerClusterer: typeof MarkerClusterer;
}

const BMap: BMapI = InternalBMap as BMapI;
BMap.Marker = Marker;
BMap.Polygon = Polygon;
BMap.MarkerClusterer = MarkerClusterer;

export default BMap;

export {Point};
