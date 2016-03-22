
  var original = "";
  var sentences = [];
  var composition = "";

  var btnParse_click = function() {
    var text = $('#existing_article').val().trim();
    var result = text.match( /[^\.!\?]+[\.!\?]+/g );
    for ( var i = 0; i < result.length; i++ ) {
      var count = result.length - i;
      var paragraph = false;
      if ( result[i].match( /^\n/g ) == null ) {
        paragraph = false;
      } else {
        paragraph = true;
      }
      if ( i == 0 ) paragraph = true;
      var sentence = result[ i ].trim();
      sentences[i] = { count : count, old : sentence, new : "", paragraph : paragraph };
    }
    Step02();
    return false;
  };


  var btnBack_click = function() {
    Step01();
    return false;
  };

  var btnBack_step02_click = function() {
    Step02();
    return false;
  };

  var btnComposeArticle_click = function() {
    Step03();
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
      count += sentences[ i ].old.split(" ").length;
    }
    var description = "Rewrite each sentence in your own words. The original article contains " + count + " words.";
    var     context = { title: "Rewrite Article", description: description, sentences : sentences };
    var        html = template( context );
    $("#content").html( html );
    $('#formStep02').submit( function() { return false; } );
    $('#btnBack').click( btnBack_click );
    $('#btnComposeArticle').click( btnComposeArticle_click );
    return false;
  };

  var Step03 = function() {
    composition = "";
    var first = true;
    var loc = 0;
    $('textarea.new').each( function() {
      var checked = $(this).parent().parent().parent().parent().find('input:checkbox').prop('checked');
      var sentence = $(this).val().trim();
      sentences[ loc ].new = sentence;
      loc++;
      if ( checked && sentence.trim() != "") {
        if ( first ) {
          composition += "<p>" + sentence;
          first = false;
        } else {
          composition += "</p>\n<p>" + sentence;
        }
      } else if ( sentence.trim() != "" ) {
        composition += " " + sentence + " ";
      }
    });
    if ( composition != "<p>" ) {
      composition += "</p>";
    }
    var   source = $("#step-03-template").html();
    var template = Handlebars.compile( source );
    var    count = 0;
    for ( var i = 0; i < sentences.length; i++ ) {
      count += sentences[ i ].new.split(" ").length;
    }
    var description = "Your new article contains " + count + " words."
    var     context = { title: "Preview Article", description: description, article : composition };
    var        html = template( context );
    $("#content").html( html );
    $('#formStep03').submit( function() { return false; } );
    $('#btnBack').click( btnBack_step02_click );
    $('#btnSave').click( btnSave_click );

    var clipboard = new Clipboard('#btnCopy');
    clipboard.on('success', function(e) {
      console.log(e);
    });
    clipboard.on('error', function(e) {
//      console.log(e);
    });

  };

  var btnSave_click = function() {
    var article = $("#taArticle").val();
    var href = 'data:text/plain;charset=utf-8,' + encodeURIComponent( article );
    $(this).attr('href', href );
    return true;
  };

  var btnCopy_click = function() {
    
  };

  var main_init = function() {
    Step01();
  };

  $(document).ready( main_init );
