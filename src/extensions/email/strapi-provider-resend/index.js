"use strict";

const { Resend } = require("resend");

module.exports = {
  init(providerOptions, settings) {
    const resend = new Resend(providerOptions.apiKey);

    return {
      async send(options) {
        const { to, from = settings.defaultFrom, replyTo = settings.defaultReplyTo, subject, text, html } = options;

        try {
          const data = await resend.emails.send({
            from,
            to,
            subject,
            text,
            html,
            reply_to: replyTo,
          });

          strapi.log.info("✅ Email sent via Resend:", data);
        } catch (error) {
          strapi.log.error("❌ Resend error:", error);
          throw error;
        }
      },
    };
  },
};
