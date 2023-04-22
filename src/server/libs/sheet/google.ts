export default class GoogleSheet implements GoogleSheet.Instance {
  private _sheet: GoogleAppsScript.Spreadsheet.Sheet;

  private _values: GoogleSheet.Values;

  constructor(sheetInfo: GoogleSheet.SheetInfo) {
    this._sheet = GoogleSheet.open(sheetInfo);
  }

  static open({
    sheetId,
    sheetName,
  }: GoogleSheet.SheetInfo): GoogleSheet.Sheet {
    const ss = SpreadsheetApp.openById(sheetId);
    return ss.getSheetByName(sheetName) as GoogleSheet.Sheet;
  }

  static replaceValues({
    sheet,
    values,
  }: {
    sheet: GoogleSheet.Sheet;
    values: GoogleSheet.Values;
  }): GoogleSheet.Range {
    sheet.getDataRange().clear();
    const range = sheet.getRange(1, 1, values.length, values[0].length);
    return range.setValues(values);
  }

  get sheet(): GoogleSheet.Sheet & GoogleAppsScript.Spreadsheet.Sheet {
    return this._sheet;
  }

  set sheet(sheet: GoogleSheet.Sheet & GoogleAppsScript.Spreadsheet.Sheet) {
    this._sheet = sheet;
  }

  get dataRange(): GoogleSheet.Range {
    return this.sheet.getDataRange();
  }

  get values(): GoogleSheet.Values {
    return this._values || this.getValues();
  }

  set values(val: GoogleSheet.Values) {
    this._values = val;
  }

  getValues(): GoogleSheet.Values {
    this._values = this.dataRange.getValues();
    return this._values;
  }

  getCell({
    rowNumber,
    colNumber,
  }: {
    rowNumber: number;
    colNumber: number;
  }): GoogleSheet.Range {
    return this.sheet.getRange(rowNumber, colNumber, 1, 1);
  }

  getColNumber(value: string): number {
    let colNumber = 0;
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.values[i].length; j++) {
        if (this.values[i][j] === value) {
          colNumber = j + 1;
          return colNumber;
        }
      }
    }
    return colNumber;
  }

  getRowNumber(value: string): number {
    let rowNumber = 0;
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.values[i].length; j++) {
        if (this.values[i][j] === value) {
          rowNumber = i + 1;
          return rowNumber;
        }
      }
    }
    return rowNumber;
  }

  replaceHeaderRow({
    values,
  }: {
    values: GoogleSheet.Headers;
  }): GoogleSheet.Range {
    this.sheet.setFrozenRows(1);
    const range = this.sheet.getRange(1, 1, 1, (values as string[]).length);
    range.clear();
    range.setFontWeight('bold');
    return range.setValues([values]);
  }

  appendValues({ values }: { values: GoogleSheet.Values }): GoogleSheet.Range {
    const lastRow = this.sheet.getLastRow();
    const range = this.sheet.getRange(
      lastRow + 1,
      1,
      values.length,
      values[0].length
    );
    return range.setValues(values);
  }

  setValues({ values }: { values: GoogleSheet.Values }): GoogleSheet.Range {
    if (values) {
      this.values = values;
    }
    return GoogleSheet.replaceValues({
      sheet: this.sheet,
      values: this.values,
    });
  }
}
