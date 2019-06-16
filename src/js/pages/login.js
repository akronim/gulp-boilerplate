let handleLogin = function(options) {
  if (options) {
    // imam li objekt
    if (options.login) {
      // ako objekt nema određeno svojstvo, neće baciti grešku
      $("#loginForm").on("submit", function(e) {
        e.preventDefault();

        let data = $(this).getFormData();
        console.log(data);
      });

      $("#loginModal").on("hidden.bs.modal", function(e) {
        $(this)
          .find("input,textarea,select")
          .val("")
          .end()
          .find("input[type=checkbox], input[type=radio]")
          .prop("checked", "")
          .end();
      });
    }
  }
};
