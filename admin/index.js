const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');
const db = require('./../db/models');
const User = db.User;
const bcrypt = require('bcryptjs');

AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
  databases: [db],
  rootPath: '/admin',
  branding: {
    companyName: 'Sports Hub L.A.'
  }
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const matched = await bcrypt.compare(password, user.password);

      if (matched && user.isAdmin === true) return user;
    }

    return false;
  },
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD
});

module.exports = { path: adminBro.options.rootPath, router };
