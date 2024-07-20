class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

export { HttpError, NotFoundError, BadRequestError, ForbiddenError };
