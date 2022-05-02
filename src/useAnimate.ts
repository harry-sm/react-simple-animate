import * as React from 'react';
import { AnimationProps } from './types';
import { ALL, DEFAULT_DURATION, DEFAULT_EASE_TYPE } from './constants';

export default function useAnimate(
  props: AnimationProps,
): {
  registerItemRef: (itemRef: React.RefObject<HTMLElement>) => void;
  isPlaying: boolean;
  style: React.CSSProperties;
  play: (boolean) => void;
} {
  const {
    start,
    end,
    complete,
    onComplete,
    delay = 0,
    duration = DEFAULT_DURATION,
    easeType = DEFAULT_EASE_TYPE,
  } = props;
  const transition = React.useMemo(
    () => `${ALL} ${duration}s ${easeType} ${delay}s`,
    [duration, easeType, delay],
  );
  const [animate, setAnimate] = React.useState<{
    isPlaying: boolean;
    style: React.CSSProperties;
  }>({
    isPlaying: false,
    style: { ...start, transition },
  });
  const { isPlaying, style } = animate;
  // const onCompleteTimeRef = React.useRef<NodeJS.Timeout>();
  const itemRef = React.useRef<null | HTMLElement>(null);

  function registerItemRef(item: any) {
    itemRef.current = item;
  }

  function _handleOnComplete() {
    if (onComplete) {
      onComplete();
    }

    if (complete) {
      setAnimate({
        ...animate,
        style: complete,
      });
    }
  }

  React.useEffect(() => {
    if (itemRef.current) {
      itemRef.current.addEventListener('transitionend', _handleOnComplete);
    }
    return () => {
      if (itemRef.current) {
        itemRef.current.removeEventListener('transitionend', _handleOnComplete);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isPlaying,
    style,
    registerItemRef,
    play: React.useCallback((isPlaying: boolean) => {
      setAnimate({
        ...animate,
        style: {
          ...(isPlaying ? end : start),
          transition,
        },
        isPlaying,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  };
}
