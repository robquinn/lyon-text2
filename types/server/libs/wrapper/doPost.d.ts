declare namespace DoPostWrapper {
  type DoPost = (e: RequestParameters) => void;
  interface RequestParameters {
    queryString: string;
    parameter: Record<string, string>;
    parameters: Record<string, string[]>;
    pathInfo: string;
    contextPath: string;
    contentLength: number;
    postdata: {
      length: number;
      type: GoogleAppsScript.Content.MimeType;
      contents: string;
      name: string;
    };
  }
}
