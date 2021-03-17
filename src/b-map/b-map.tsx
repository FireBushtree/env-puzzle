import * as React from 'react';
import classnames from 'classnames';
import DomUtil from '@/src/utils/dom-util';

export const defaultCenter = {lng: 116.404, lat: 39.915};
export const defaultZoom = 15;

export interface Point {
  lng: number | string;
  lat: number | string;
}

export interface InternalBMapProps {
  className?: string;
  style?: React.CSSProperties;
  center?: Point;
  zoom?: number;
  onZoomChange?: (zoom: number) => any;
  onCreate?: (mapInstance: any) => any;
}

export interface InternalBMapState {
  map: any;
}

/**
 * 原始的百度地图组件
 */
class InternalBMap extends React.Component<
  InternalBMapProps,
  InternalBMapState
> {
  mapInstance: any;

  containerRef: HTMLDivElement | null;

  static defaultProps = {
    center: defaultCenter,
    zoom: defaultZoom,
  };

  /**
   * 构造函数
   * @param {InternalBMapProps} props
   */
  constructor(props: InternalBMapProps | Readonly<InternalBMapProps>) {
    super(props);
    this.state = {
      map: null,
    };
    this.containerRef = null;
  }

  /**
   * 钩子函数， 做一些初始化数据
   */
  componentDidMount() {
    this.init();
  }

  /**
   * 在状态变更的时候变更地图信息
   * @param {InternalBMapProps} prevProps
   */
  componentDidUpdate(prevProps: InternalBMapProps) {
    const {center, zoom} = this.props;

    if (prevProps.center !== center && this.mapInstance) {
      const {lng, lat} = center as Point;
      this.mapInstance.customSetMapCenter(lng, lat);
    }

    if (
      prevProps.zoom !== zoom &&
      this.mapInstance &&
      this.mapInstance.getZoom() !== zoom
    ) {
      this.mapInstance.setZoom(zoom);
    }
  }

  /**
   * 1. 加载百度地图需要的js文件
   * 2. 向百度地图示例上挂载一些自定义函数， 便于操作
   * 3. 初始化百度地图示例
   * @return {void}
   */
  async init() {
    if (!window.BMap) {
      await DomUtil.loadJavascript(
          'http://api.map.baidu.com/getscript?v=3.0&ak=42IughV5lDxAt0wI8AhDVuGR',
      );

      await DomUtil.loadJavascript(
          'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js',
      );

      await DomUtil.loadJavascript(
          'https://api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js',
      );

      // eslint-disable-next-line max-len
      window.BMap.Map.prototype.customSetMapCenter = function customSetMapCenter(
          lng: number,
          lat: number,
      ) {
        const point = new window.BMap.Point(lng, lat);
        this.setCenter(point);
      };
    }

    const {center, zoom, onCreate, onZoomChange} = this.props;

    // 1. 创建map实例
    const map = new window.BMap.Map(this.containerRef, {
      enableMapClick: false,
    });

    this.mapInstance = map;
    this.setState({map: this.mapInstance});

    // 2. 设置中心点
    const point = new window.BMap.Point(center?.lng, center?.lat);
    map.centerAndZoom(point, zoom);

    // 3. 开启滚轮缩放
    map.enableScrollWheelZoom(true);

    if (onCreate) {
      onCreate(map);
    }

    if (onZoomChange) {
      map.addEventListener('zoomend', function() {
        const zoom = map.getZoom();
        onZoomChange(zoom);
      });
    }
  }

  /**
   * 渲染子节点， 并且向子元素的`props`自动填充`map`属性
   * @return {React.ReactNode} node
   */
  renderChildren() {
    const {children} = this.props;
    const {map} = this.state;

    if (!children || !map) return;

    return React.Children.map(children, (child) => {
      if (!child) {
        return;
      }

      if (
        typeof child === 'string' ||
        typeof child === 'number' ||
        typeof child === 'boolean'
      ) {
        return child;
      }

      // 给子元素自动添加地图prop
      return React.cloneElement(child as React.ReactElement, {
        map,
      });
    });
  }

  render() {
    const {className, style} = this.props;

    return (
      <div
        className={classnames(className, 'eh-bmap')}
        style={style}
        ref={(ref) => {
          this.containerRef = ref;
        }}
      >
        {this.renderChildren()}
      </div>
    );
  }
}

export default InternalBMap;
