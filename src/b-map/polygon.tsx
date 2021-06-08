import React from 'react';
import {Point} from './b-map';

export interface PolygonOptions {
  /**
   * 边线颜色
   */
  strokeColor?: string;
  /**
   * 填充颜色。当参数为空时，折线覆盖物将没有填充效果
   */
  fillColor?: string;
  /**
   * 边线的宽度，以像素为单位
   */
  strokeWeight?: number;
  /**
   * 边线透明度，取值范围0 - 1
   */
  strokeOpacity?: number;
  /**
   * 填充的透明度，取值范围0 - 1
   */
  fillOpacity?: number;
  /**
   * 边线的样式，solid或dashed
   */
  strokeStyle?: string;
  /**
   * 是否在调用map.clearOverlays清除此覆盖物，默认为true
   */
  enableMassClear?: boolean;
  /**
   * 是否启用线编辑，默认为false
   */
  enableEditing?: boolean;
  /**
   * 是否响应点击事件，默认为true
   */
  enableClicking?: boolean;
}

export interface PolygonProps {
  map?: any;
  /**
   * 边界坐标点
   * 构成该覆盖物的点位
   */
  boundaries: Array<Point>;
  /**
   * 百度地图的`Polygon`类的配置项
   */
  options?: PolygonOptions;
}

const Polygon: React.FC<PolygonProps> = (props: PolygonProps) => {
  const {map, boundaries, options} = props;

  React.useEffect(() => {
    if (!map || !boundaries) {
      return;
    }

    const points: Array<typeof window.BMap.Point> = [];
    boundaries.forEach((item) => {
      const {lng, lat} = item;
      points.push(new window.BMap.Point(lng, lat));
    });

    const hole = new window.BMap.Polygon(points, {
      strokeWeight: 2,
      fillColor: '#1890ff',
      fillOpacity: 0.3,
      ...options,
    });

    map.addOverlay(hole);

    return () => {
      map.removeOverlay(hole);
    };
  }, [boundaries]);

  return <div />;
};

export default Polygon;
