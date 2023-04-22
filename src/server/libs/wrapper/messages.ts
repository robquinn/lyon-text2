import Google from '../../config/google';
import SheetFetcher from '../sheet/fetcher';

const getMessages: MessagesWrapper.GetMessages = (id) => {
  const messages = new SheetFetcher(Google.Sheets.Sent).messages(id);
  return JSON.stringify(messages);
};

export default getMessages;
