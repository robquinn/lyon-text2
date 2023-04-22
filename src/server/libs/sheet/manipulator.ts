import GoogleSheet from './google';
import SheetObject from './object';

export default class SheetManipulator implements SheetManipulator.Instance {
  private _sheetObject: SheetObject.Instance;

  private _googleSheet: GoogleSheet.Instance;

  constructor(sheetInfo: GoogleSheet.SheetInfo) {
    this._googleSheet = new GoogleSheet(sheetInfo);
    this.sheetObject = new SheetObject({
      googleSheet: this._googleSheet,
    });
  }

  get sheetObject(): SheetObject.Instance {
    return this._sheetObject;
  }

  set sheetObject(sheetObject: SheetObject.Instance) {
    this._sheetObject = sheetObject;
  }

  get googleSheet(): GoogleSheet.Instance {
    return this._googleSheet;
  }

  set googleSheet(googleSheet: GoogleSheet.Instance) {
    this._googleSheet = googleSheet;
  }
}
