(function(){

  var handleChange = function () {
    if ($("head style#dyn").length === 0) {
      $("head").append('<style id="dyn"></style>');
    }
    $("head style#dyn").text(
      $("input").val()
      + " {background-color: #fb6 !important}"
    );
    window.setTimeout(function(){
      $("input").focus();
    }, 100);

  };
  $(function() {
    $("input").on("change", handleChange);
    $(document).on("keypress", "form", function(e) {
      if (e.keyCode == 13) {
        e.preventDefault();
        handleChange();
        return false;
      }
    });
  });

})()
