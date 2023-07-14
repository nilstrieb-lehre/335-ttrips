export default function debounce<T extends any[]>(
  cb: (...args: T) => void,
  delay = 250,
): (...args: T) => void {
  let timeout: any;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
