interface Result<T> {
  count: number;
  next: number;
  previous: number;
  results: T[];
}

export { Result };
