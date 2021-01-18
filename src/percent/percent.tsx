import * as React from 'react';
import classnames from 'classnames';

export interface PercentProps {
  className?: string;
  style?: React.CSSProperties;
  value: number;
  title: string;
}

const THEME_COLOR = '#4EF6FC';

const Percent: React.FC<PercentProps> = (props: PercentProps) => {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const {value, title, style, className} = props;

  React.useEffect(() => {
    if (!canvasRef) {
      return;
    }

    const canvasWidth = wrapRef.current.clientWidth;
    const canvasHeight = wrapRef.current.clientHeight;

    const {current} = canvasRef;
    const ctx = canvasRef.current.getContext('2d');
    current.width = canvasWidth;
    current.height = canvasHeight;

    const padding = canvasWidth * 0.05; // 距离上下左右的距离;
    const maxRadius = (canvasWidth - 2 * padding) / 2; // 最大可使用半径
    const pointLength = 10; // 圆弧边上柱子的长度
    const clearance = canvasWidth * 0.1; // 两个圆之间的间隙
    const innerRadius = maxRadius - pointLength - clearance;

    const circleCenterX = canvasWidth / 2;
    const circleCenterY = maxRadius + padding;

    // 渲染内部圆弧
    ctx.arc(circleCenterX, circleCenterY, innerRadius, Math.PI, 0);
    ctx.lineWidth = 4;
    ctx.strokeStyle = THEME_COLOR;
    ctx.shadowColor = THEME_COLOR;
    ctx.shadowOffsetY = -3;
    ctx.shadowBlur = 8;
    ctx.stroke();

    // 渲染边上的柱子
    const total = 30;
    const angle = Math.PI / total;
    const perValue = 100 / total;
    const activeCount = Math.floor(value / perValue);

    const renderColumn = (i: number, color: string) => {
      ctx.beginPath();
      const currentAngle = angle * i;
      ctx.moveTo(
          circleCenterX - maxRadius * Math.cos(currentAngle),
          circleCenterY - maxRadius * Math.sin(currentAngle),
      );
      ctx.lineTo(
          circleCenterX - (innerRadius + clearance) * Math.cos(currentAngle),
          circleCenterY - (innerRadius + clearance) * Math.sin(currentAngle),
      );
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    for (let i = 0; i <= total; i++) {
      renderColumn(i, '#ccc');
    }

    let currentActiveCount = 0;
    const renderActiveColumn = () => {
      if (currentActiveCount <= activeCount) {
        renderColumn(currentActiveCount, THEME_COLOR);
        currentActiveCount += 1;
        setTimeout(() => {
          renderActiveColumn();
        }, 100);
      }
    };

    renderActiveColumn();

    // 渲染文字
    ctx.font = `bold 18px Arial`;
    ctx.fillStyle = THEME_COLOR;
    ctx.fillText(
        title,
        (ctx.canvas.width - ctx.measureText(title).width) / 2,
        circleCenterY + 40,
    );

    ctx.font = `12px Arial`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('0', padding, circleCenterY + 14);

    ctx.textAlign = 'right';
    ctx.fillText('100%', canvasWidth - padding, circleCenterY + 14);
    ctx.textAlign = 'start';
  }, [wrapRef]);

  return (
    <div
      className={classnames(className, 'env-percent-semicircle')}
      style={style}
      ref={wrapRef}
    >
      <canvas ref={canvasRef}></canvas>
      <div className="env-percent-semicircle__value">{value}%</div>
    </div>
  );
};

export default Percent;
