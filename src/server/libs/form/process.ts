import { nanoid } from 'nanoid/non-secure';
import Google from '../../config/google';
import SheetWriter from '../sheet/writer';
import getRequestsFromSmsData from '../twilio/requests';

export const processResponse: ProcessForm.ProcessResponse = (
  smsData: SmsData.Payload
) => {
  const responses: ProcessForm.Response[] = [];
  const twilioSmsRequests = getRequestsFromSmsData(smsData);
  const batchId = nanoid();
  for (let i = 0; i < twilioSmsRequests.length; i++) {
    const { request, user } = twilioSmsRequests[i];
    const requestResponse = UrlFetchApp.fetch(request.url, request.options);
    const twilioResponse = JSON.parse(
      requestResponse.getContentText()
    ) as FormatUtils.Twilio.RequestResponse;

    const response = {
      id: batchId,
      response: twilioResponse,
      user,
    };

    SheetWriter.getRecordObjects([response])
      .then((data) => {
        const sheetWriter = new SheetWriter(Google.Sheets.Sent);
        return sheetWriter.appendData(data);
      })
      .catch((err) => console.log(err.message));

    responses.push(response);
  }

  return responses;
};

export const getSmsPreview: ProcessForm.GetSmsPreview = (
  smsData: SmsData.Payload
) => getRequestsFromSmsData(smsData);
