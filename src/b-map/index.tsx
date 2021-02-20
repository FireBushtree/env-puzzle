import InternalBMap, {Point, defaultCenter, defaultZoom} from './b-map';
import Marker from './marker';
import Polygon from './polygon';
import MarkerClusterer from './marker-clusterer';

type InternalBMapT = typeof InternalBMap;
interface BMapI extends InternalBMapT {
  defaultCenter: Point;
  defaultZoom: number;
  Marker: typeof Marker;
  Polygon: typeof Polygon;
  MarkerClusterer: typeof MarkerClusterer;
}

const BMap: BMapI = InternalBMap as BMapI;
BMap.defaultCenter = defaultCenter;
BMap.defaultZoom = defaultZoom;
BMap.Marker = Marker;
BMap.Polygon = Polygon;
BMap.MarkerClusterer = MarkerClusterer;

export default BMap;

export {Point};
