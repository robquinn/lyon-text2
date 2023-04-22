declare namespace Snackbar {
  interface Action {
    open: boolean;
    severity: 'error' | 'warning' | 'info' | 'success' | null;
    title: 'Error' | 'Warning' | 'Info' | 'Success' | null;
    message: string | null;
  }
}
