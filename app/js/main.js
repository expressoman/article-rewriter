
  var btnParse_click = function() {
    var text = $('#existing_article').val().trim();
    var result = text.match( /[^\.!\?]+[\.!\?]+/g );
    console.log( result );
    return false;
  };

  var Step01 = function() {
    $('#formStep01').submit( function() { return false; });
    var   source = $("#step-01-template").html();
    var template = Handlebars.compile( source );
    var  context = { title: "Paste Article", description: "Paste an existing article in the textbox below."};
    var     html = template( context );
    $("#content").html( html );

    $("#btnParse").click( btnParse_click );
  };

  var main_init = function() {
    Step01();
  };

  $(document).ready( main_init );
