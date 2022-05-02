import * as React from 'react';

export type Style = React.CSSProperties;
export interface AnimationType {
  play?: boolean;
  overlay?: number;
  duration?: number;
  delay?: number;
  easeType?: string;
  children?: any;
  register?: (data: any) => void;
  render?: (data: {
    style: Style;
    registerItemRef: (item: any) => void;
  }) => any;
  sequenceId?: string | number;
  sequenceIndex?: number;
}

export interface AnimationStateType {
  [key: string]: AnimationType;
}

export type Sequences = AnimationType[];

export type HookSequences = {
  keyframes?: Keyframes;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: number;
  start?: Style;
  end?: Style;
  overlay?: number;
  duration?: number;
  delay?: number;
  easeType?: string;
}[];

export type Keyframes =
  | string[]
  | { [key: number]: string }[]
  | { [key: string]: string | number }[];

export interface AnimationProps extends AnimationType {
  onComplete?: () => void;
  start?: Style;
  end?: Style;
  complete?: Style;
  animationStates?: AnimationStateType;
}

export interface AnimateKeyframesProps extends AnimationType {
  keyframes: Keyframes;
  complete?: Style;
  onComplete?: () => void;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: string | number;
  animationStates?: AnimationStateType;
  pause?: boolean;
}
