const pkg = require("./package.json");

// app.json statik olarak yüklendikten sonra buraya `config` olarak gelir;
// version alanı burada package.json'dan okunur, iki dosya arasında elle senkron gerekmez.
module.exports = ({ config }) => ({
  ...config,
  version: pkg.version,
});
