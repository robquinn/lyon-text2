// create and manage an object from sheet values
export default class SheetObject implements SheetObject.Instance {
  private _googleSheet: GoogleSheet.Instance;

  private _values: SheetObject.Values;

  private _headers: SheetObject.Headers;

  private _data: SheetObject.Data;

  constructor({ googleSheet }: { googleSheet: GoogleSheet.Instance }) {
    this.googleSheet = googleSheet;
  }

  writeCell: ({
    rowNumber,
    colNumber,
    value,
  }: {
    rowNumber: number;
    colNumber: number;
    value: string;
  }) => GoogleAppsScript.Spreadsheet.Range;

  get googleSheet(): GoogleSheet.Instance {
    return this._googleSheet;
  }

  set googleSheet(googleSheet: GoogleSheet.Instance) {
    this._googleSheet = googleSheet;
  }

  set headers(headers: SheetObject.Headers) {
    this._headers = headers;
  }

  get headers(): SheetObject.Headers {
    return this._headers;
  }

  set values(values: SheetObject.Values) {
    this._values = values;
  }

  get values(): SheetObject.Values {
    return this._values;
  }

  setValues({ data, headers }: { data: SheetObject.Data; headers: boolean }) {
    this.values = SheetObject.makeValues({
      data: data || this.data,
      headers,
    });
  }

  writeHeaders(options?: { values: SheetObject.Headers }): void {
    const values =
      (options && options.values) || SheetObject.makeHeaders(this.data);
    this.googleSheet.replaceHeaderRow({ values });
  }

  writeValues(options?: { values: SheetObject.Values }): void {
    const values = (options && options.values) || this.values;
    this.googleSheet.setValues({ values });
  }

  appendValues(options?: { values: SheetObject.Values }): void {
    const values = (options && options.values) || this.values;
    this.googleSheet.appendValues({ values });
  }

  readValues(): SheetObject.Values {
    this.values = this.googleSheet.getValues();
    this.setData({ values: this.values });
    return this.values;
  }

  static makeHeaders(data: SheetObject.Data): SheetObject.Headers {
    const headerRow = Object.keys(
      data.reduce((acc, row) => {
        Object.keys(row).forEach((col) => (acc[col] = col));
        return acc;
      }, {})
    );
    return headerRow;
  }

  static makeValues({
    data,
    headers,
  }: {
    data: SheetObject.Data;
    headers: boolean;
  }): unknown[][] {
    // derive the headers from the data
    const headerRow = Object.keys(
      data.reduce((acc, row) => {
        Object.keys(row).forEach((col) => (acc[col] = col));
        return acc;
      }, {})
    );
    // combine the headers and the values
    const dataRows = data.map((row) => headerRow.map((col) => row[col]));
    return headers ? [headerRow].concat(dataRows as string[][]) : dataRows;
  }

  set data(data: SheetObject.Data) {
    this._data = data;
  }

  get data(): SheetObject.Data {
    return this._data;
  }

  setData({ values }: { values: SheetObject.Values }): SheetObject.Data {
    const { headers, data } = SheetObject.makeData({
      values: values || this.values,
    });
    this.headers = headers;
    this.data = data;
    return this.data;
  }

  getData(): SheetObject.Data {
    this.readValues();
    return this.data;
  }

  writeData(options?: { data: SheetObject.Data; headers: boolean }): void {
    // convert data to values and write to sheet
    const data = (options && options.data) || this.data;
    this.setValues({
      data,
      headers: (options as { headers: boolean }).headers,
    });
    this.writeValues();
  }

  appendData(options: { data: SheetObject.Data; headers: boolean }): void {
    // convert data to values and write to sheet
    const data = (options && options.data) || this.data;
    this.setValues({ data, headers: options.headers });
    this.appendValues();
  }

  static makeData({ values }: { values: unknown[][] }): {
    data: SheetObject.Data;
    headers: SheetObject.Headers;
  } {
    const [headers, ...data] = values;
    return {
      data: data.map((row) =>
        headers.reduce((p, c, i) => {
          // console.log('p',p, 'c',c,'i',i)
          // eslint-disable-next-line no-param-reassign
          (p as string)[c as string] = row[i];
          return p;
        }, {})
      ) as SheetObject.Data,
      headers: headers as SheetObject.Headers,
    };
  }
}
