module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      features: {
        'nesting-rules': true,
      },
    },
    'postcss-import': {

    },
    'node-css-mqpacker': {}

  },

};