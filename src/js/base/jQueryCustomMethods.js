(function($) {
  $.fn.getFormData = function() {
    let data = {};
    let dataArray = $(this).serializeArray();

    // dataArray.forEach(function (element, index) {
    //     data[element.name] = element.value;
    // })

    dataArray.forEach(element => {
      data[element.name] = element.value;
    });

    // for (let i = 0; i < dataArray.length; i++) {
    //    data[dataArray[i].name] = dataArray[i].value;
    // }

    return data;
  };
})(jQuery);
