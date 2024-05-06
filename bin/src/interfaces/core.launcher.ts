interface INT_METHOD<T> {
  info: string;
  magic: string;
  translate?: keyof T;
}

export {
  INT_METHOD
}