import * as React from 'react';
import { AnimateContext } from './animateGroup';
import getSequenceId from './utils/getSequenceId';
import isUndefined from './utils/isUndefined';
import { ALL, DEFAULT_DURATION, DEFAULT_EASE_TYPE } from './constants';
import { AnimationProps } from './types';

export default function Animate(props: AnimationProps): JSX.Element {
  const {
    play,
    children,
    render,
    start,
    end,
    complete = '',
    onComplete,
    delay = 0,
    duration = DEFAULT_DURATION,
    easeType = DEFAULT_EASE_TYPE,
    sequenceId,
    sequenceIndex,
  } = props;
  const [style, setStyle] = React.useState(start || {});
  const { register, animationStates = {} } = React.useContext(AnimateContext);
  const id = getSequenceId(sequenceIndex, sequenceId);
  const itemRef = React.useRef<null | HTMLElement>(null);

  function registerItemRef(item: any) {
    itemRef.current = item;
  }

  // TBD:
  /* function registerItemRef() {
    return {
      ref: (item: any) => {
        itemRef.current = item;
      },
    };
  } */

  function _handleOnComplete() {
    complete && setStyle(complete);
    onComplete && onComplete();
  }

  React.useEffect(() => {
    if ((!isUndefined(sequenceIndex) && sequenceIndex >= 0) || sequenceId) {
      register(props);
    }

    /* Binds transitionend event to element which fires onComplete callback */
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

  React.useEffect(() => {
    const animationState = animationStates[id] || {};

    setStyle({
      ...(play || animationState.play ? end : start),
      transition: `${ALL} ${duration}s ${easeType} ${parseFloat(
        animationState.delay || delay,
      )}s`,
    });
  }, [id, animationStates, play, duration, easeType, delay, start, end]);

  return render ? (
    render({ style, registerItemRef })
  ) : (
    <div ref={registerItemRef} style={style}>
      {children}
    </div>
  );
}
