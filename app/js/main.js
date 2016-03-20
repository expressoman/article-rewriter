
  var btnParse_click = function() {};
  var btnPaste_click = function() {};

  var Step01 = function() {
    var   source = $("#step-01-template").html();
    var template = Handlebars.compile( source );
    var  context = { title: "Paste Article", description: "Paste an existing article in the textbox below."};
    var     html = template( context );
    $("#content").html( html );

    $("#btnPaste").click( btnPaste_click );
    $("#btnParse").click( btnParse_click );
  };

  var main_init = function() {
    Step01();
  };

  $(document).ready( main_init );
