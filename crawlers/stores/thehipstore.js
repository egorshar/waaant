var helpers = require('../helpers');

module.exports = function () {
  return helpers.initCrawler("http://thehipstore.co.uk/collections/all/", {
    itemMatch: /products\//i,
    discoverRegex: [
      /(\shref\s?=\s?)[\"](.+(products\/)[^\"]+)/gi
    ],
    onFetch: function (url, window) {
      var product = window.$('#product-select option[selected]').text().split(' / '),
          mod_price = product[1].split(' - ');

      this.emit('good_fetched', {
        url: url,
        brand: window.$('.grid__item.three-quarters.portable-one-whole > p.half-bottom:first').text(),
        name: window.$.trim(window.$('h1.half-bottom').text()),
        mod: mod_price[0],
        img: window.$(".product--image-pop img").attr('src'),
        price: helpers.parsePrice(mod_price[1]),
        currency: window.$('#currency-select option[selected]').val(),
        sizes: window.$.makeArray(
          window.$('#product-select option').map(function () {
            return window.$(this).text().split(' ')[0];
          })
        ),
      });
    }
  });
};
