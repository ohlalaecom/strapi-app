"use strict";

module.exports = (plugin) => {
  const sendWelcomeEmail = async (user) => {
    try {
      await strapi.plugin("email").service("email").send
({
        to: user.email,
        subject: "Welcome to Jacobs Electronics!",
        html: `
          <h2>Hello ${user.username || user.email},</h2>
          <p>Welcome to <strong>Jacobs Electronics</strong>!</p>
          <p>Your account has been successfully created.</p>
          <p>Thank you for joining us!</p>
        `,
        text: `Hello ${user.username || user.email}, Welcome to Jacobs Electronics!`,
      });

      strapi.log.info(`📧 Welcome email sent to ${user.email}`);
    } catch (err) {
      strapi.log.error("❌ Error sending welcome email:", err);
    }
  };

  const originalRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    const response = await originalRegister(ctx);
    if (response?.user?.email) {
      await sendWelcomeEmail(response.user);
    }
    return response;
  };

  return plugin;
};
