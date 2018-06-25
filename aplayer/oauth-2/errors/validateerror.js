/**
 * `OAuth2Error` error.
 *
 * @api public
 */
function ValidateError(message, code, uri, status) {
    Error.call(this);
    this.message = message;
    this.code = code || 'server_error';
    this.uri = uri;
    this.status = status || 500;
  }
  
  /**
   * Expose `OAuth2Error`.
   */
  module.exports = ValidateError;
  