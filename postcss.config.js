module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 1,
      features: {
        'custom-properties': false,
      },
    },
  },
}