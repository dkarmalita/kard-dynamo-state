class ErrorState {
  constructor(
    message = 'An error occurred',
    statusCode = 500,
  ) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ErrorState;
