declare namespace SheetObject {
  interface Instance {
    set values(values: Values);
    get values(): Values;
    set headers(headers: Headers);
    get headers(): Headers;
    set data(data: Data);
    get data(): Data;
    get googleSheet(): GoogleSheet.Instance;

    setValues: ({ data, headers }: { data: Data; headers: boolean }) => void;
    setData: ({ values }: { values: Values }) => Data;
    getData: () => Data;
    writeHeaders: (options?: { values: Headers }) => void;
    writeData: (options?: { data: Data; headers?: boolean }) => void;
    writeValues: (options?: { values: Values }) => void;
    appendData: (options?: { data: Data; headers?: boolean }) => void;
    appendValues: (options?: { values: Values }) => void;
    readValues: () => Values;
    writeCell: ({
      rowNumber,
      colNumber,
      value,
    }: {
      rowNumber: number;
      colNumber: number;
      value: string;
    }) => GoogleSheet.Range;
  }

  // type RawValues<T extends any[][], U extends 'data' | 'headers'> = T extends [
  //   infer H extends any[],
  //   ...infer D extends any[][]
  // ]
  //   ? U extends 'headers'
  //     ? H
  //     : D
  //   : T;

  type Values = unknown[][];
  type Data = Array<Record<string, unknown>>;
  type Headers = string[];
}
