import Google from '../../config/google';
import SheetFetcher from '../sheet/fetcher';

const getOffices: OfficesWrapper.GetOffices = (): OfficesWrapper.Offices =>
  new SheetFetcher(Google.Sheets.Roster).offices();

export default getOffices;
