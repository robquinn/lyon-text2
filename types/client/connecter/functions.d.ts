type FunctionMap = Record<string, (...args: unknown[]) => unknown>;

type Promisified<F extends (...args: unknown[]) => unknown> = (
  ...params: Parameters<F>
) => Promise<ReturnType<F>>;

type RecognizedServerFunctions<R extends FunctionMap> = {
  [Name in keyof R]: Promisified<R[Name]>;
};

type UnrecognizedServerFunctions = Record<
  string,
  (...args: unknown[]) => Promise<unknown>
>;

type ServerFunctions<FM extends FunctionMap> = RecognizedServerFunctions<FM> &
  UnrecognizedServerFunctions;
