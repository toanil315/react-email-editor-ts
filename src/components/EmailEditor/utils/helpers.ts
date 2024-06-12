export const deepClone = <T extends Record<string, any> | Array<any>>(source: T) => {
  const targetObj = source.constructor === Array ? ([] as unknown as T) : ({} as T);
  for (const key in source) {
    const keyWithType = key as keyof T;
    if (source.hasOwnProperty(keyWithType)) {
      if (source[keyWithType] && typeof source[keyWithType] === 'object') {
        targetObj[keyWithType] = (
          (source[keyWithType] as any).constructor === Array ? [] : {}
        ) as T[keyof T];
        targetObj[keyWithType] = deepClone(source[keyWithType] as any) as T[keyof T];
      } else {
        targetObj[keyWithType] = source[keyWithType];
      }
    }
  }
  return targetObj;
};

export const throttle = (fn: (...args: any[]) => any, delay: number) => {
  let timer: NodeJS.Timeout | null = null;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

export const debounce = (fn: (...args: any[]) => any, delay: number) => {
  let timer: NodeJS.Timeout | null = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();
      timer = null;
    }, delay);
  };
};
