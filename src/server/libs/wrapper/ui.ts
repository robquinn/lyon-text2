export const onOpen: UiWrapper.OnOpen = (): void => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('Messaging')
    .addItem('Send SMS', 'openDialogMUI');
  // .addItem('About me', 'openAboutSidebar');

  menu.addToUi();
};

export const openDialogMUI: UiWrapper.OpenDialogMUI = (): void => {
  const html = HtmlService.createHtmlOutputFromFile('dialog')
    .setWidth(900)
    .setHeight(900);
  SpreadsheetApp.getUi().showModalDialog(html, 'Send SMS');
};

export const openAboutSidebar: UiWrapper.OpenAboutSidebar = (): void => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar');
  SpreadsheetApp.getUi().showSidebar(html);
};
