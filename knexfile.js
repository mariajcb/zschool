module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/zschool_dev',
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
    },

}
