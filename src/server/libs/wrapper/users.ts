import Google from '../../config/google';
import SheetFetcher from '../sheet/fetcher';

const getUsers: UsersWrapper.GetUsers = (): UsersWrapper.Users =>
  new SheetFetcher(Google.Sheets.Roster).users();

export default getUsers;
