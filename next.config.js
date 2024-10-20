
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  images: {
    domains: ['storage.googleapis.com',"/via.placeholder.com"], // Add this line
  },
  poweredByHeader: false
};
