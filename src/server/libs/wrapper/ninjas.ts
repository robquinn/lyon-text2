import Ninjas from '../../config/ninjas';

const getNinjas: NinjasWrapper.GetNinjas = (): NinjasWrapper.Ninjas =>
  Ninjas.Choices;

export default getNinjas;
