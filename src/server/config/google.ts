import isProd from '../libs/utils/env';

export default (() => {
  const Sheets: GoogleConfig.Sheets<'Roster' | 'Sent'> = {
    Roster: {
      sheetId: isProd()
        ? (process.env.LYON_TEXT__PROD__SHEET_ID as string)
        : (process.env.LYON_TEXT__DEV__SHEET_ID as string),
      sheetName: process.env.LYON_TEXT__ROSTER_SHEET_NAME as string,
    },
    Sent: {
      sheetId: isProd()
        ? (process.env.LYON_TEXT__PROD__SHEET_ID as string)
        : (process.env.LYON_TEXT__DEV__SHEET_ID as string),
      sheetName: process.env.LYON_TEXT__SENT_SHEET_NAME as string,
    },
  };
  return {
    Sheets,
  };
})() as Config.Google;
