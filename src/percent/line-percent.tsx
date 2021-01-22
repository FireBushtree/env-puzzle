import React, {useRef} from 'react';

export interface LinePercenetProps {
  name: React.ReactNode;
  value: number;
  lineWidth?: number;
  suffix?: React.ReactNode;
}

const LinePercenet: React.FC<LinePercenetProps> = (
    props: LinePercenetProps,
) => {
  const {name, value, suffix, lineWidth} = props;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) {
      return;
    }

    const canvasWidth = wrapRef.current.clientWidth;
    const canvasHeight = wrapRef.current.clientHeight;

    canvasRef.current.width = canvasWidth;
    canvasRef.current.height = canvasHeight;

    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;

    // 擦除
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // render base line
    const lineHeight = 10;
    const topLeftPointX = 5;
    const topLeftPointY = canvasHeight - lineHeight;
    const lineLength = canvasWidth - topLeftPointX;
    ctx.moveTo(topLeftPointX, topLeftPointY);
    ctx.lineTo(topLeftPointX + lineLength, topLeftPointY);
    ctx.lineTo(lineLength, topLeftPointY + lineHeight);
    ctx.lineTo(0, topLeftPointY + lineHeight);
    ctx.closePath();
    ctx.fillStyle = 'rgba(22, 61, 92, 1)';
    ctx.fill();

    const itemColLength = 10;
    const itemColPadding = 5; // 每个小柱子的间距
    const totalCol = Math.floor(canvasWidth / (itemColLength + itemColPadding));
    const perValue = 100 / totalCol;
    const activeValueCount = Math.floor(value / perValue);

    let i = 0;
    const renderItemCol = () => {
      if (i < activeValueCount) {
        ctx.beginPath();
        const tilt = 12;
        const itemTopLeftPointX = i * (itemColLength + itemColPadding) + tilt;
        const itemTopLeftPointY = 0;

        ctx.moveTo(itemTopLeftPointX, itemTopLeftPointY);
        ctx.lineTo(itemTopLeftPointX + itemColLength, itemTopLeftPointY);
        ctx.lineTo(itemTopLeftPointX + itemColLength - tilt, canvasHeight);
        ctx.lineTo(itemTopLeftPointX - tilt, canvasHeight);
        ctx.closePath();
        ctx.fillStyle = `rgba(70, 181, 192, ${i / activeValueCount / 2 + 0.5})`;
        ctx.fill();

        setTimeout(() => {
          renderItemCol();
        }, 100);
      }

      i += 1;
    };

    renderItemCol();
  }, [value]);

  return (
    <div className="env-percent-line">
      <div className="env-percent-line__name">{name}</div>
      <img
        className="env-percent-line__arrow"
        src={require('./images/icon-arrow.png')}
      />
      <div
        ref={wrapRef}
        style={{width: lineWidth}}
        className="env-percent-line__value"
      >
        <canvas ref={canvasRef}></canvas>
      </div>

      {suffix && <div className="env-percent-line__suffix">{suffix}</div>}
    </div>
  );
};

LinePercenet.defaultProps = {
  lineWidth: 300,
};

export default LinePercenet;
