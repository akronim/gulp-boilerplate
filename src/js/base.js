/* Application Controller
--------------------------------------- */

let App = (function() {
  "use strict";

  let settings;

  return {
    init: function(options) {
      if (options) {
        settings = options;
      }

      this.initBase(settings);
    },
    initBase: function(settings) {
      this.initComponents(settings);
      this.initPages(settings);
    },
    initComponents: function(settings) {
      handleLogin(settings);
      handleRegister(settings);
    },
    initPages: function(settings) {}
  };
})();
