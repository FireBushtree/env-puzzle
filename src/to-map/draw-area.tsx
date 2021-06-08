import {Button} from 'antd';
import React, {useRef, useState} from 'react';
import BMap from '../b-map';
import {DrawControls} from '../b-map/drawing';
import Container, {ExportAttributes} from './container';

export interface DrawAreaProps {
  onConfirm?: (event: any) => any;
}

const DrawArea: React.FC<DrawAreaProps> = (props) => {
  const {onConfirm} = props;
  const containerRef = useRef<ExportAttributes>();
  const drawingRef = useRef<DrawControls>();
  const [eventObject, setEventObject] = useState<any>();

  return (
    <Container
      ref={containerRef}
      onOk={() => {
        onConfirm && onConfirm(eventObject);
      }}
      headerBtns={
        <Button
          onClick={() => {
            drawingRef.current.clear();
          }}
        >
          重新绘制
        </Button>
      }
    >
      <BMap.Drawing
        ref={drawingRef}
        onOverlayComplete={(e) => {
          setEventObject(e);
        }}
      />
    </Container>
  );
};

export default DrawArea;
