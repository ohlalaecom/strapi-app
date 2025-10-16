module.exports = ({ env }) => ({
  // ======================================
  // 🚀 Email Plugin (Resend Provider)
  // ======================================
  email: {
    config: {
      provider: 'strapi-provider-resend', // 👈 Must match your provider folder name
      providerOptions: {
        apiKey: env('RESEND_API_KEY'), // Defined in .env
      },
      settings: {
        defaultFrom: env('EMAIL_FROM'), // contact@jacobs-electronics.com
        defaultReplyTo: env('EMAIL_FROM'),
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
