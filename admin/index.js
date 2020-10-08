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
    companyName: 'Sports Hub Los Angeles',
    softwareBrothers: false
  },
  resources: [
    {
      resource: db.NewsSource,
      options: {
        listProperties: ['name', 'websiteUrl', 'slug'],
        properties: {
          name: { isTitle: true }
        }
      }
    },
    {
      resource: db.NewsFeed,
      options: {
        listProperties: ['url', 'teamId', 'newsSourceId', 'isActive', 'lastStatusCode'],
        properties: {
          url: { isTitle: true }
        }
      }
    },
    {
      resource: db.Article,
      options: {
        listProperties: ['title', 'newsFeedId', 'summary', 'author', 'clicks'],
        properties: {
          title: { isTitle: true }
        }
      }
    },
    {
      resource: db.User,
      options: {
        properties: {
          password: {
            type: 'password',
            isVisible: {
              show: false,
              edit: true,
              list: false,
              filter: false
            }
          }
        }
      }
    },
    {
      resource: db.Team,
      options: {
        listProperties: ['name', 'websiteUrl', 'slug', 'shortName'],
        properties: {
          name: { isTitle: true }
        }
      }
    },
    {
      resource: db.YoutubeAccount,
      options: {
        listProperties: ['channelId', 'teamId'],
        properties: {
          channelId: { isTitle: true }
        }
      }
    },
    {
      resource: db.NewsFeedType,
      options: {
        listProperties: ['name'],
        properties: {
          name: { isTitle: true }
        }
      }
    },
    {
      resource: db.TwitterAccountType,
      options: {
        listProperties: ['name'],
        properties: {
          name: { isTitle: true }
        }
      }
    },
    {
      resource: db.TwitterAccount,
      options: {
        listProperties: ['name', 'twitterAccountTypeId', 'newsSourceId', 'teamId'],
        properties: {
          name: { isTitle: true }
        }
      }
    }
  ]
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
