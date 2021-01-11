import * as React from 'react';

export interface PercentProps {}

const Percent: React.FC<PercentProps> = () => {
  const wrapRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!wrapRef) {
      return;
    }

    const {current} = wrapRef;
    current.height = 500;
    current.width = 500;
    const ctx = wrapRef.current.getContext('2d');

    // 渲染内部圆弧
    ctx.arc(250, 250, 200, Math.PI, 0);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#4EF6FC';
    ctx.shadowColor = '#4EF6FC';
    ctx.shadowOffsetY = -3;
    ctx.shadowBlur = 6;
    ctx.stroke();

    // 渲染边上的柱子
    const total = 60;
    const angle = Math.PI / total;

    for (let i = 0; i <= total; i++) {
      ctx.beginPath();
      const currentAngle = angle * i;
      ctx.moveTo(
          250 - 230 * Math.cos(currentAngle),
          250 - 230 * Math.sin(currentAngle),
      );
      ctx.lineTo(
          250 - 220 * Math.cos(currentAngle),
          250 - 220 * Math.sin(currentAngle),
      );
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#4EF6FC';
      ctx.stroke();
    }
  }, []);

  return <canvas ref={wrapRef}></canvas>;
};

export default Percent;
