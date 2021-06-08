import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

export interface DrawControls {
  clear: () => any;
}

export interface DrawingProps {
  map?: any;
  /**
   * 当完成多边形绘制的回调
   */
  onOverlayComplete?: (e: any) => any;
  onCreate?: (drawingManager: typeof window.BMapLib.DrawingManager) => any;
}

const Drawing: React.ForwardRefRenderFunction<DrawControls, DrawingProps> = (
  props,
  ref,
) => {
  const [drawingManager, setDrawingManager] = useState<any>();
  const {map, onCreate, onOverlayComplete} = props;
  useEffect(() => {
    const drawingManager = new window.BMapLib.DrawingManager(map, {
      isOpen: true,
      polygonOptions: {
        enableEditing: true,
        strokeColor: '#1890ff',
        strokeWeight: 2,
      },
    });
    drawingManager.setDrawingMode(window.BMAP_DRAWING_POLYGON);

    drawingManager.addEventListener('overlaycomplete', (e: any) => {
      // 补充额外的属性， 便于使用map.removeOverlay方法删除
      e.overlay.type = 'draw';
      onOverlayComplete && onOverlayComplete(e);
    });

    setDrawingManager(drawingManager);
    onCreate && onCreate(drawingManager);
  }, []);

  const getDrawOverlay = () => {
    const overlays = map.getOverlays();
    return (overlays || []).find((item: any) => item.type === 'draw');
  };

  useImperativeHandle(ref, () => ({
    clear: () => {
      const drawArea = getDrawOverlay();
      map.removeOverlay(drawArea);
      drawingManager?.close();
      drawingManager?.open();
    },
  }));

  return null;
};

export default forwardRef(Drawing);
