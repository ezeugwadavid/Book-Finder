export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null;
  
    const debounced = (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  
    debounced.cancel = () => {
      if (timer) clearTimeout(timer);
    };
  
    return debounced as T & { cancel: () => void };
  }