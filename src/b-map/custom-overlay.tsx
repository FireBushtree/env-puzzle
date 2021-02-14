/* eslint-disable require-jsdoc */
import {Point} from './b-map';

export default (BMapOverlay: typeof window.BMap.Overlay) =>
  class CustomOverlay extends BMapOverlay {
    options: any;

    point: typeof window.BMap.Point;

    content: HTMLElement;

    constructor(point: Point, content: HTMLElement, options?: any) {
      super();
      this.point = new window.BMap.Point(point.lng, point.lat);
      this.content = content;
      this.options = options || {};
    }

    initialize(map: any) {
      this.map = map;
      const div = document.createElement('div');
      this.div = div;
      div.setAttribute('tag', 'customoverlay');
      div.style.position = 'absolute';
      div.style.zIndex =
        this.options.zIndex || window.BMap.Overlay.getZIndex(this.point.lat);
      div.addEventListener('touchstart', (e) => {
        e.stopPropagation();
      });

      div.addEventListener('touchend', (e) => {
        e.stopPropagation();
      });

      div.appendChild(this.content);

      const pane = this.options.pane || 'labelPane';
      map.getPanes()[pane].appendChild(div);
      return div;
    }

    draw() {
      const {map} = this;
      const pixel = map.pointToOverlayPixel(this.point);
      const offset = this.options.offset || new window.BMap.Size(0, 0);

      this.div.style.left = `${pixel.x + offset.width}px`;
      this.div.style.top = `${pixel.y + offset.height}px`;
    }
  };
