declare namespace SheetWriter {
  interface RecordObject extends FormatUtils.FormatSmsForSheet {}
  interface Instance {
    appendData: (data: SheetWriter.RecordObject[]) => void;
    writeMessageStatus: ({
      messageSid,
      messageStatus,
    }: {
      messageSid: string;
      messageStatus: string;
    }) => GoogleSheet.Range;
  }
}
