'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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

  async forgotPassword(ctx) {
    const { email } = ctx.request.body.data || ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email is required');
    }

    try {
      // Check if customer exists
      const customer = await strapi.query('api::customer.customer').findOne({
        where: { email },
      });

      if (!customer) {
        // Don't reveal if email exists or not for security
        return ctx.send({ message: 'If the email exists, a reset link has been sent.' });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Store token in database
      await strapi.query('api::password-reset-token.password-reset-token').create({
        data: {
          token: resetToken,
          email,
          expiresAt,
          used: false,
        },
      });

      // Send reset email
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      await strapi.plugin('email').service('email').send({
        to: email,
        subject: 'Password Reset Request - Jacobs Electronics',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your Jacobs Electronics account.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>This link will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
        text: `Password Reset Request\n\nYou requested a password reset for your Jacobs Electronics account.\n\nReset your password here: ${resetUrl}\n\nThis link will expire in 15 minutes.\n\nIf you didn't request this, please ignore this email.`,
      });

      return ctx.send({ message: 'If the email exists, a reset link has been sent.' });
    } catch (error) {
      strapi.log.error('Error in forgotPassword:', error);
      return ctx.internalServerError('An error occurred while processing your request');
    }
  },

  async resetPassword(ctx) {
    const { token, newPassword } = ctx.request.body.data || ctx.request.body;

    if (!token || !newPassword) {
      return ctx.badRequest('Token and new password are required');
    }

    try {
      // Find the reset token
      const resetToken = await strapi.query('api::password-reset-token.password-reset-token').findOne({
        where: {
          token,
          used: false,
          expiresAt: { $gt: new Date() },
        },
      });

      if (!resetToken) {
        return ctx.badRequest('Invalid or expired reset token');
      }

      // Find the customer
      const customer = await strapi.query('api::customer.customer').findOne({
        where: { email: resetToken.email },
      });

      if (!customer) {
        return ctx.badRequest('User not found');
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update customer password
      await strapi.query('api::customer.customer').update({
        where: { id: customer.id },
        data: { password: hashedPassword },
      });

      // Mark token as used
      await strapi.query('api::password-reset-token.password-reset-token').update({
        where: { id: resetToken.id },
        data: { used: true },
      });

      return ctx.send({ message: 'Password has been reset successfully' });
    } catch (error) {
      strapi.log.error('Error in resetPassword:', error);
      return ctx.internalServerError('An error occurred while resetting your password');
    }
  },
};
