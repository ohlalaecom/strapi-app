'use strict';
const { MailtrapClient } = require('mailtrap');

const TOKEN = process.env.MAILTRAP_TOKEN; // keep it in .env

module.exports = {
  async sendEmail({ to, subject, text, html }) {
    try {
      const client = new MailtrapClient({ token: TOKEN });
      const sender = {
        email: "hello@yourdomain.com",
        name: "Your App Name",
      };

      await client.send({
        from: sender,
        to: [{ email: to }],
        subject,
        text,
        html,
      });

      strapi.log.info(`📧 Email sent to ${to} successfully`);
      return { success: true };
    } catch (error) {
      strapi.log.error("❌ Mailtrap error:", error);
      return { success: false, error };
    }
  },
};
