import InternalToMap from './to-map';
import DrawArea from './draw-area';

type InternalToMapT = typeof InternalToMap;

interface ToMapI extends InternalToMapT {
  DrawArea: typeof DrawArea;
}

const ToMap: ToMapI = InternalToMap as ToMapI;
ToMap.DrawArea = DrawArea;

export default ToMap;
