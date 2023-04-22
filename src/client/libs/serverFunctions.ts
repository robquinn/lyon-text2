import GASClient from './connecter/index';
import * as publicServerFunctions from '../../server/index';

const { serverFunctions } = new GASClient<typeof publicServerFunctions>({
  // this is necessary for local development but will be ignored in production
  allowedDevelopmentDomains: (origin) =>
    /https:\/\/.*\.googleusercontent\.com$/.test(origin),
});

export default serverFunctions;
