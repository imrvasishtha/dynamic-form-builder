const Boom = require('@hapi/boom');
const AuthService = require('../services/AuthService');

/**
 * This method is responsible to check admin role
 * Get user role from request and check admin role exist or not.
 * Its work like middleware
 * pre is emit before handler method
 */
const admin = {
  assign: 'ADMIN',
  method: async (request, h) => {
    try {
      await AuthService.isRoleExist(request, 'admin');
      return h.continue;
    } catch (err) {
      global.logger().error('Error in user.middleware.admin', err);
      throw new Boom.Boom(err, { statusCode: 401 });
    }
  },
};

const owner = {
  assign: 'OWNER',
  method: async (request, h) => {
    try {
      await AuthService.isRoleExist(request, 'owner');
      return h.continue;
    } catch (err) {
      global.logger().error('Error in user.middleware.owner', err);
      throw new Boom.Boom(err, { statusCode: 401 });
    }
  },
};

const user = {
  assign: 'USER',
  method: async (request, h) => {
    try {
      await AuthService.isRoleExist(request, 'user');
      return h.continue;
    } catch (err) {
      global.logger().error('Error in user.middleware.user', err);
      throw new Boom.Boom(err, { statusCode: 401 });
    }
  },
};

module.exports = {
  admin,
  owner,
  user,
};
