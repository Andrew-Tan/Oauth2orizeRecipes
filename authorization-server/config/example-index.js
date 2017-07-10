'use strict';

//
// The configuration options of the server
//

/**
 * Change this value to enable/disable HTTPS scheme
 *
 * The HTTPS server is using self-signed certificate, refer to README in cert
 * for more detail
 */
exports.useHTTPSScheme = true;

/**
 * Change this value to switch between production or development environment
 *
 * Should be one of the following values:
 * 'test' -> for testing purpose
 * 'production' -> for production purpose
 *
 * NOTE: this also correspond to the name of the presets in database configuration
 */
exports.deployMode = 'test';

/**
 * Configuration of access tokens.
 *
 * expiresIn               - The time in minutes before the access token expires. Default is 60
 *                           minutes
 * calculateExpirationDate - A simple function to calculate the absolute time that the token is
 *                           going to expire in.
 */
exports.token = {
  expiresIn               : 60 * 60,
  calculateExpirationDate : () => new Date(Date.now() + (this.token.expiresIn * 1000)),
};

/**
 * Configuration of code token.
 * expiresIn - The time in minutes before the code token expires.  Default is 5 minutes.
 */
exports.codeToken = {
  expiresIn : 5 * 60,
};

/**
 * Configuration of refresh token.
 * expiresIn - The time in minutes before the code token expires.  Default is 100 years.  Most if
 *             all refresh tokens are expected to not expire.  However, I give it a very long shelf
 *             life instead.
 */
exports.refreshToken = {
  expiresIn : 52560000,
};

/**
 * Database configuration for access and refresh tokens.
 *
 * timeToCheckExpiredTokens - The time in seconds to check the database for expired access tokens.
 *                            For example, if it's set to 3600, then that's one hour to check for
 *                            expired access tokens.
 */
exports.db = {
  timeToCheckExpiredTokens : 3600,
};

/**
 * Session configuration
 *
 * maxAge - The maximum age in milliseconds of the session.  Use null for web browser session only.
 *          Use something else large like 3600000 * 24 * 7 * 52 for a year.
 * secret - The session secret that you should change to what you want
 */
exports.session = {
  cookie: {
    maxAge : 3600000 * 24 * 7 * 52,
    httpOnly: true,
    domain: null,
  },
  // TODO: You need to change this secret to something that you choose for your secret
  secret : 'A Secret That Should Be Changed',
};

/**
 * Database configuration
 *
 * development - development preset
 * test - test preset
 * production - production preset
 */
exports.database = {
  development: {
    dialect: 'sqlite',
    storage: './userdata.sqlite',
    logging: true,
  },
  // NOTE: DO NOT MODIFY preset "test" as it is used for unit tests. Change "deployMode"
  // to it during unit testing.
  test: {
    dialect: 'sqlite',
    storage: './userdata.sqlite',
    logging: false,
  },
  production: {
    dialect: 'mssql',
    host: 'hidden',
    port: 1433,
    dialectOptions: {
      encrypt: true,
    },
    database: 'hidden',
    username: 'hidden',
    password: 'hidden',
    logging: false,
  },
};

exports.email = {
  auth: {
    api_key: 'secret',
    domain: 'passcode',
  },
};