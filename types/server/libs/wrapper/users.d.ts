declare namespace UsersWrapper {
  type GetUsers = () => Users;
  type Users = SheetFetcher.Users;
}
