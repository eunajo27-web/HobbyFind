export const fadeEase = [0.22, 1, 0.36, 1] as const;

export const fadeTransition = {
  type: 'tween' as const,
  duration: 1.05,
  ease: fadeEase,
};

/** WAAPI opacity 애니메이션이 끝날 때 한 프레임 깜빡이지 않게 메인 스레드로 그립니다. */
export function keepOpacityOnMainThread() {
  return undefined;
}
