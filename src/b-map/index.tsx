import InternalBMap, {
  Point,
  defaultCenter,
  defaultZoom,
  InternalBMapProps,
} from './b-map';
import Marker from './marker';
import Drawing from './drawing';
import Polygon from './polygon';
import MarkerClusterer from './marker-clusterer';

type InternalBMapT = typeof InternalBMap;
interface BMapI extends InternalBMapT {
  defaultCenter: Point;
  defaultZoom: number;
  Marker: typeof Marker;
  Polygon: typeof Polygon;
  Drawing: typeof Drawing;
  MarkerClusterer: typeof MarkerClusterer;
}

const BMap: BMapI = InternalBMap as BMapI;
BMap.defaultCenter = defaultCenter;
BMap.defaultZoom = defaultZoom;
BMap.Marker = Marker;
BMap.Polygon = Polygon;
BMap.Drawing = Drawing;
BMap.MarkerClusterer = MarkerClusterer;

export default BMap;

export {Point, InternalBMapProps};
