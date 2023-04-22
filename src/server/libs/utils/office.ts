export default class OfficeResolver implements OfficeResolver.Instance {
  // eslint-disable-next-line no-useless-constructor
  constructor(private office: OfficeResolver.Office) {}

  getActual(): OfficeResolver.PhysicalOffice | OfficeResolver.LyonsDen {
    let actualOffice: OfficeResolver.PhysicalOffice | OfficeResolver.LyonsDen;
    switch (this.office) {
      case "Lyon's Den - PP":
      case "Lyon's Den - CF":
      case "Lyon's Den - PR":
      case "Lyon's Den - CT":
      case "Lyon's Den - TUC":
      case "Lyon's Den - TUB":
      case "Lyon's Den - FLG":
      case "Lyon's Den - DM":
      case "Lyon's Den - SEV":
      case "Lyon's Den - FH":
      case "Lyon's Den - SED":
      case "Lyon's Den - WV":
        actualOffice = "Lyon's Den";
        break;
      default:
        actualOffice = this.office;
        break;
    }
    return actualOffice;
  }

  getActualWithoutLyonsDen(): OfficeResolver.PhysicalOffice {
    let actualOffice;
    /* eslint-disable */
    switch (this.office) {
      case "Lyon's Den - PP":
        actualOffice = 'Pinnacle Peak';
        break;
      case "Lyon's Den - CF":
        actualOffice = 'Carefree';
        break;
      case "Lyon's Den - PR":
        actualOffice = 'Prescott';
        break;
      case "Lyon's Den - CT":
        actualOffice = 'Camelback Tower';
        break;
      case "Lyon's Den - TUC":
        actualOffice = 'Tucson';
        break;
      case "Lyon's Den - TUB":
        actualOffice = 'Tubac';
        break;
      case "Lyon's Den - FLG":
        actualOffice = 'Flagstaff';
        break;
      case "Lyon's Den - DM":
        actualOffice = 'Desert Mountain';
        break;
      case "Lyon's Den - SEV":
        actualOffice = 'Southeast Valley';
        break;
      case "Lyon's Den - FH":
        actualOffice = 'Fountain Hills';
        break;
      case "Lyon's Den - SED":
        actualOffice = 'Sedona';
        break;
      case "Lyon's Den - WV":
        actualOffice = 'West Valley';
        break;
      default:
        actualOffice = this.office;
        break;
    }
    return actualOffice;
  }
}
