import SheetManipulator from './manipulator';
import { formatSmsForSheet } from '../utils/format';

export default class SheetWriter
  extends SheetManipulator
  // eslint-disable-next-line no-use-before-define
  implements SheetWriter.Instance
{
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-useless-constructor
  constructor(private sheetInfo: GoogleSheet.SheetInfo) {
    super(sheetInfo);
  }

  static getRecordObjects(
    responses: ProcessForm.Response[]
  ): Promise<SheetWriter.RecordObject[]> {
    return new Promise((resolve) => {
      const recordObjects: SheetWriter.RecordObject[] = [];
      for (let i = 0; i < responses.length; i += 1) {
        const recordObject = formatSmsForSheet(responses[i]);
        recordObjects.push(recordObject as unknown as SheetWriter.RecordObject);
      }
      resolve(recordObjects);
    });
  }

  static sentSheetHeaderRow(): string[] {
    return [
      'Batch ID',
      'First Name',
      'Last Name',
      'Office',
      'Role',
      'Ninja',
      'Message',
      'From',
      'To',
      'Status',
      'Date Created',
      'Date Sent',
      'Date Updated',
      'Error Code',
      'Error Message',
      'Messaging Service SID',
      'Num Media',
      'Num Segments',
      'Price',
      'Price Unit',
      'SID',
      'SubResource URIs',
      'Account SID',
      'API Version',
      'URI',
      'Direction',
    ];
  }

  public appendData(data: SheetWriter.RecordObject[]) {
    const headers = SheetWriter.sentSheetHeaderRow();
    this.sheetObject.writeHeaders({ values: headers });
    return this.sheetObject.appendData({
      data: data as unknown as Record<string, unknown>[],
      headers: false,
    });
  }

  public writeMessageStatus({
    messageSid,
    messageStatus,
  }: {
    messageSid: string;
    messageStatus: string;
  }): GoogleSheet.Range {
    const colNumber: number = this.googleSheet.getColNumber('Status');
    const rowNumber: number = this.googleSheet.getRowNumber(messageSid);
    const cell = this.googleSheet.getCell({ rowNumber, colNumber });
    return cell.setValue(messageStatus);
  }
}
