const crypto = require('crypto');

const generateSessionKey = () => crypto.randomBytes(16).toString('base64');

module.exports = { generateSessionKey };
