(function () {
  UrlCore = function (conf) {
    this.conf = conf;
    this.api = this.conf.api;
    this._urls = {};

  };
  UrlCore.prototype.update = function(urls) {
    return angular.merge(this._urls, urls);
  };

  UrlCore.prototype.formatUrl = function(url, ctx) {
    var replacer;
    if (ctx == null) {
      ctx = {};
    }
    replacer = function(match) {
      match = match.replace(/:/, '');
      return ctx[match] || "undefined";
    };
    return url.replace(/(:\w+)/g, replacer);
  };

  UrlCore.prototype.resolve = function(name, ctx) {
    var url;
    url = this._urls[name];
    if (!url) {
      return "";
    }
    if (ctx) {
      url = this.formatUrl(url, ctx);
    }
    return this.api + url;
  };

  UrlCore.prototype.getAll = function () {
    return this.api;
  };

  app.utilize = app.utilize || {};
  app.utilize.UrlCore = UrlCore;
})();