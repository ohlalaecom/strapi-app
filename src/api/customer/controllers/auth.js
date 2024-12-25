'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async login(ctx) {
    // Ensure the payload is extracted properly (flat or nested format)
    const payload = ctx.request.body.data || ctx.request.body;
    const { identifier, password } = payload;

    // Debug object to capture error details
    const debugInfo = {
      identifierReceived: identifier,
      customerFound: null,
      passwordValidation: null,
      error: null,
    };

    try {
      // Validate input
      if (!identifier || !password) {
        debugInfo.error = 'Identifier and password are required';
        return ctx.badRequest({
          message: 'Identifier and password are required',
          debug: debugInfo,
        });
      }

      // Log the incoming request data for debugging purposes
      console.log('Received login request:', { identifier, password });

      // Find customer by Email (case-sensitive, ensure the field matches your model)
      const customer = await strapi.query('api::customer.customer').findOne({
        where: { email: identifier }, // Ensure this field matches your Strapi model field name
      });

      debugInfo.customerFound = !!customer;

      if (!customer) {
        debugInfo.error = 'Customer not found';
        return ctx.unauthorized({
          message: 'Invalid identifier or password',
          debug: debugInfo,
        });
      }

      // Compare passwords (ensure bcrypt is used correctly)
      const validPassword = await bcrypt.compare(password, customer.password);
      debugInfo.passwordValidation = validPassword;

      if (!validPassword) {
        debugInfo.error = 'Invalid password';
        return ctx.unauthorized({
          message: 'Invalid identifier or password',
          debug: debugInfo,
        });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: customer.id },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1d' }
      );

      // Return success response
      return ctx.send({
        jwt: token,
        user: {
          id: customer.id,
          email: customer.email,
        },
        debug: debugInfo, // Include debug info for testing
      });
    } catch (error) {
      debugInfo.error = error.message;
      return ctx.internalServerError({
        message: 'An error occurred',
        debug: debugInfo,
      });
    }
  },
};
