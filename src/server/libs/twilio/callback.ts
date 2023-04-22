import Google from '../../config/google';
import SheetWriter from '../sheet/writer';

const statusCallback: TwilioCallback.StatusCallback = (
  e: DoPostWrapper.RequestParameters
) => {
  if (typeof e !== 'undefined') {
    console.log(e.parameter);
    const messageStatus: string = e.parameter.MessageStatus;
    const messageSid: string = e.parameter.MessageSid;
    const sheetWriter = new SheetWriter(Google.Sheets.Sent);
    sheetWriter.writeMessageStatus({ messageSid, messageStatus });
  }
};

export default statusCallback;
