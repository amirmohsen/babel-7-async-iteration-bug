module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: '8.11.3'
          }
        }
      ]
    ]
  }
}
