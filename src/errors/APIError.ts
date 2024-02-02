export class APIError {
  error: string;
  message: string;

  constructor(error = '', message = '') {
    this.error = error;
    this.message = message;
  }
}
