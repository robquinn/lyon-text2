declare namespace Search {
  type Preview = string;
  type Sent = string;

  type Types = Preview | Sent;

  interface Action {
    preview: Preview;
    sent: Sent;
  }
}
