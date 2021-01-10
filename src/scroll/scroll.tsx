import * as React from 'react';
import classnames from 'classnames';

type ScrollProps = {} & React.HTMLAttributes<HTMLDivElement>;

const Scroll: React.FC<ScrollProps> = (props: ScrollProps) => {
  let timer: any = null;
  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const {children, className, ...rest} = props;
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [hasCopy, setHasCopy] = React.useState(true);

  React.useEffect(() => {
    clearTimer();
    const {current: wrapper} = wrapperRef;
    const {current: content} = contentRef;

    // 当内容不足的时候, 不需要拷贝的元素
    if (wrapper.clientHeight > content.clientHeight) {
      setHasCopy(false);
      return;
    }

    // 重置滚动高度并拷贝元素
    setHasCopy(true);
    wrapper.scrollTop = 0;
    timer = setInterval(() => {
      if (!wrapper || !content) {
        return;
      }

      if (wrapper.scrollTop >= content.scrollHeight) {
        wrapper.scrollTop = 0;
      } else {
        wrapper.scrollTop++;
      }
    }, 20);

    return () => {
      clearTimer();
    };
  }, [children]);

  return (
    <div
      className={classnames('env-scroll', className)}
      ref={wrapperRef}
      {...rest}
    >
      <div ref={contentRef}>{children}</div>
      {hasCopy && <div>{children}</div>}
    </div>
  );
};

export default Scroll;
