declare namespace GoogleConfig {
  interface Sheet {
    sheetId: string;
    sheetName: string;
  }

  type Sheets<T extends string> = Record<T, Sheet>;

  interface All {
    Sheets: Sheets<'Roster' | 'Sent'>;
  }
}
