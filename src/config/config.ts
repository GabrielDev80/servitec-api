import dotenv from "dotenv";

interface Config {
  environment: {
    env: string | undefined;
  };
  url: {
    url: string | undefined;
  };
  server: {
    port: string | undefined;
  };
  dbClient: {
    client: string | undefined;
  };
  db: {
    cs: string | undefined;
    dbUser: string | undefined;
    dbPass: string | undefined;
    dbName: string | undefined;
    testing: string | undefined;
  };
  companyAlias: {
    alias: string | undefined;
  };
  session: {
    secret: string | undefined;
    ttl: string | undefined;
  };
  jwt: {
    secret: string | undefined;
    expire: string | undefined;
  };
  nodemailer: {
    user: string | undefined;
    pass: string | undefined;
  };
}
const environment = process.env.NODE_ENV || "development"; // change environment to 'production', 'development'or 'testing'.

dotenv.config({
  path:
    environment === "development"
      ? ".env.development"
      : environment === "testing"
        ? ".env.testing"
        : ".env.production",
});

const config: Config = {
  environment: {
    env: process.env.NODE_ENV,
  },

  url: {
    url: process.env.BASE_URL,
  },

  server: {
    port: process.env.PORT,
  },

  dbClient: {
    client: process.env.DB_CLIENT,
  },

  db: {
    cs: process.env.MONGO_URI,
    dbUser: process.env.MONGO_USER,
    dbPass: process.env.MONGO_PASS,
    dbName: process.env.MONGO_NAME,
    testing: process.env.MONGO_TEST,
  },

  companyAlias: {
    alias: process.env.COMPANY_ALIAS,
  },

  session: {
    secret: process.env.SESSION_SECRET,
    ttl: process.env.SESSION_TTL,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
  },

  nodemailer: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

// console.log("js: ", config);

export default config;
