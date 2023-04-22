declare namespace CheckResponse {
  interface Instance {
    isDefined: () => boolean;
    isUndefined: () => boolean;
    matchesUser: () => boolean;
  }
}
