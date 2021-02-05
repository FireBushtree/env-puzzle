import React, {Component} from 'react';
import {render} from 'react-dom';
import getCustomOverlay from './custom-overlay';

export interface MarkerProps {
  map?: any;
  icon?: {
    url: string;
    width: number;
    height: number;
  };
  lng: number;
  lat: number;
  jump?: boolean;
  zIndex?: number;
  onClick?: (...rest: any[]) => any;
  onDragend?: (lng: number, lat: number, address: string, detail?: any) => any;
}

export interface MarkerState {}

/**
 * 百度地图的Marker组件，用于在地图上标记点位
 */
class Marker extends Component<MarkerProps, MarkerState> {
  marker: any;

  static defaultProps = {
    jump: false,
  };

  // eslint-disable-next-line require-jsdoc
  componentDidMount() {
    this.init();
  }

  // eslint-disable-next-line require-jsdoc
  componentDidUpdate() {
    this.init();
  }

  // eslint-disable-next-line require-jsdoc
  componentWillUnmount() {
    this.destroy();
  }

  /**
   * 在组件销毁的时候以及点位更新的时候， 需要在地图上先清空点位
   */
  destroy() {
    const {map} = this.props;
    if (this.marker) {
      map.removeOverlay(this.marker);
      this.marker = null;
    }
  }

  /**
   * 初始化点位信息，可以使用两种方式初始化。
   * 1. 原始点位初始化(不传入children)
   * 2. 自定义点位 -> 传入children初始化
   * 当使用自定义点位初始化的时候， 暂不支持拖拽， 但是能够使用css修改样式， 更为灵活。
   */
  init() {
    this.destroy();
    const {
      zIndex,
      icon,
      map,
      lng,
      lat,
      onClick,
      onDragend,
      children,
      jump,
    } = this.props;

    if (children) {
      const contentDom = document.createElement('div');
      render(
          <div className="eh-bmap-marker__point">{children}</div>,
          contentDom,
      );
      const CustomOverlay = getCustomOverlay(window.BMap.Overlay);
      this.marker = new CustomOverlay({lng, lat}, contentDom, {zIndex});
      map.addOverlay(this.marker);
    } else {
      const point = new window.BMap.Point(lng, lat);

      const markerOptions: {
        icon?: typeof window.BMap.Icon;
      } = {};

      if (icon) {
        const myIcon = new window.BMap.Icon(
            icon.url,
            new window.BMap.Size(icon.width, icon.height),
        );

        markerOptions.icon = myIcon;
      }

      this.marker = new window.BMap.Marker(point, markerOptions);
      map.addOverlay(this.marker);

      if (jump) {
        this.marker.setAnimation(window.BMAP_ANIMATION_BOUNCE);
      }

      if (onClick) {
        this.marker.addEventListener('click', (...rest: any[]) =>
          onClick(...rest),
        );
      }

      // 设置拖拽事件
      if (onDragend) {
        const myGeo = new window.BMap.Geocoder({extensions_town: true});
        this.marker.enableDragging();
        this.marker.addEventListener('dragend', (e: any) => {
          myGeo.getLocation(new window.BMap.Point(lng, lat), (result: any) => {
            if (result) {
              onDragend(e.point.lng, e.point.lat, result.address, result);
            }
          });
        });
      }
    }
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    return null;
  }
}

export default Marker;
