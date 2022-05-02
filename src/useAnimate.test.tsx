import * as React from 'react';
import useAnimate from './useAnimate';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { triggerTransitionEnd } from './utils/testUtils';

let UseAnimate;
let container;
describe('useAnimate', () => {
  let componentStyle;

  const TestHook = ({ callback }) => {
    const { style, registerItemRef } = callback();
    componentStyle = style;
    return (
      <div
        ref={(r) => {
          container = r;
          registerItemRef(r);
        }}
        style={style}
      >
        errors
      </div>
    );
  };

  const TestComponent = (callback) => {
    mount(<TestHook callback={callback} />);
  };

  beforeEach(() => {
    TestComponent(() => {
      UseAnimate = useAnimate({
        end: { opacity: 1 },
        complete: { background: 'red' },
      });
      return UseAnimate;
    });

    jest.resetAllMocks();
  });

  it('should toggle style correctly', () => {
    act(() => {
      expect(UseAnimate.play(true)).toBeUndefined();
      expect(componentStyle).toEqual({
        transition: 'all 0.3s linear 0s',
      });
    });

    expect(componentStyle).toEqual({
      opacity: 1,
      transition: 'all 0.3s linear 0s',
    });
  });

  it('should finish with complete style', () => {
    act(() => {
      expect(UseAnimate.play(true)).toBeUndefined();
      if (container) {
        triggerTransitionEnd(container);
      }
    });
    expect(componentStyle).toEqual({ background: 'red' });
  });
});
