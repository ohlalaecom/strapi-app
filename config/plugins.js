module.exports = ({ env }) => ({
  // ======================================
  // 📧 Email Plugin (Mailtrap SMTP)
  // ======================================
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('MAILTRAP_HOST', 'live.smtp.mailtrap.io'),
        port: env.int('MAILTRAP_PORT', 587),
        auth: {
          user: env('MAILTRAP_USER', 'api'),
          pass: env('MAILTRAP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('MAILTRAP_FROM', 'contact@jacobs-electronics.com'),
        defaultReplyTo: env('MAILTRAP_FROM', 'contact@jacobs-electronics.com'),
      },
    },
  },

  // ======================================
  // 📝 CKEditor Plugin
  // ======================================
  ckeditor: false,

  // ======================================
  // 🧩 Slugify Plugin
  // ======================================
  slugify: {
    enabled: true,
    shouldUpdateSlug: true,
    config: {
      shouldUpdateSlug: true,
      contentTypes: {
        post: { field: 'slug', references: 'title' },
        'post-category': { field: 'slug', references: 'title' },
        product: { field: 'slug', references: 'title' },
        'product-collection': { field: 'slug', references: 'title' },
        'product-category': { field: 'slug', references: 'title' },
        'product-brand': { field: 'slug', references: 'title' },
        'product-variant': { field: 'slug', references: 'title' },
        'product-store': { field: 'slug', references: 'title' },
        banner: { field: 'slug', references: 'name' },
      },
    },
  },

  // ======================================
  // 📬 EZForms Plugin (Optional)
  // ======================================
  ezforms: {
    config: {
      captchaProvider: { name: 'none' },
      notificationProviders: [],
    },
  },
});
