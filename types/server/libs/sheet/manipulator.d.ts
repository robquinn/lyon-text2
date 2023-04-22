declare namespace SheetManipulator {
  interface Instance {
    get sheetObject(): SheetObject.Instance;
    set sheetObject(sheetObject: SheetObject.Instance);
    get googleSheet(): GoogleSheet.Instance;
    set googleSheet(googleSheet: GoogleSheet.Instance);
  }
}
