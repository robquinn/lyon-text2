declare namespace OfficeResolver {
  interface Instance {
    getActual: () => PhysicalOffice | LyonsDen;
    getActualWithoutLyonsDen: () => PhysicalOffice;
  }

  type LyonsDen = "Lyon's Den";

  type LyonsDenOffice =
    | "Lyon's Den - PP"
    | "Lyon's Den - CF"
    | "Lyon's Den - PR"
    | "Lyon's Den - CT"
    | "Lyon's Den - TUC"
    | "Lyon's Den - TUB"
    | "Lyon's Den - FLG"
    | "Lyon's Den - DM"
    | "Lyon's Den - SEV"
    | "Lyon's Den - FH"
    | "Lyon's Den - SED"
    | "Lyon's Den - WV";

  type PhysicalOffice =
    | 'Pinnacle Peak'
    | 'Carefree'
    | 'Prescott'
    | 'Camelback Tower'
    | 'Tucson'
    | 'Tubac'
    | 'Flagstaff'
    | 'Desert Mountain'
    | 'Southeast Valley'
    | 'Fountain Hills'
    | 'Sedona'
    | 'West Valley';

  type Office = PhysicalOffice | LyonsDenOffice;
}
