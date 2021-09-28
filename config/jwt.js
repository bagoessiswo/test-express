module.exports = {
  secret: process.env.JWT_SECRET_KEY,
  issuer: 'developer@web.id',
  audience: 'https://crawler.web.id',
  expiresIn: 31556952
}
