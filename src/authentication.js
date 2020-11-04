const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');

const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());


  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
