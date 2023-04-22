import Google from '../../config/google';
import SheetFetcher from '../sheet/fetcher';

const getRoles: RolesWrapper.GetRoles = (): OfficesWrapper.Offices =>
  new SheetFetcher(Google.Sheets.Roster).roles();

export default getRoles;
