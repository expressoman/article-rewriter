
  var sentences = [];

  var btnParse_click = function() {
    var text = $('#existing_article').val().trim();
    var result = text.match( /[^\.!\?]+[\.!\?]+/g );
    sentences = result;
    Step02();
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

  var Step02 = function() {
    var   source = $("#step-02-template").html();
    var template = Handlebars.compile( source );
    var    count = 0;
    for ( var i = 0; i < sentences.length; i++ ) {
      count += sentences[ i ].split(" ").length;
    }
    var description = "Rewrite each sentence in your own words. The original article contains " + count + " words.";
    var     context = { title: "Rewrite Article", description: description, sentences : sentences };
    var        html = template( context );
    $("#content").html( html );
    $('#formStep02').submit( function() { return false; } );

    return false;
  };

  var main_init = function() {
    Step01();
  };

  $(document).ready( main_init );
