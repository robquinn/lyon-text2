declare namespace GoogleSheet {
  interface SheetInfo {
    sheetId: string;
    sheetName: string;
  }

  interface Instance {
    get sheet(): Sheet & Sheet & GoogleAppsScript.Spreadsheet.Sheet;
    set sheet(sheet: Sheet & Sheet & GoogleAppsScript.Spreadsheet.Sheet);
    get dataRange(): Range;
    get values(): Values;
    set values(val: Values);
    getRowNumber: (value: string) => number;
    getColNumber: (value: string) => number;
    getCell: ({
      rowNumber,
      colNumber,
    }: {
      rowNumber: number;
      colNumber: number;
    }) => Range;
    replaceHeaderRow: ({ values }: { values: Headers }) => Range;
    getValues: () => Values;
    setValues: (args: { values: Values }) => Range;
    appendValues: ({ values }: { values: Values }) => Range;
  }

  type Values = unknown[][];
  type Headers = string[];
  type Range = GoogleAppsScript.Spreadsheet.Range;
  type Sheet = GoogleAppsScript.Spreadsheet.Sheet;
}
