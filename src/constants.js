const domain = process.env.DOMAIN || 'http://localhost:3000';

module.exports = {
  SERVER_APP_ROOT: `${domain}/.netlify/functions/server`,
  SERVER_APP_ROOT_REL: "/.netlify/functions/server"
}
