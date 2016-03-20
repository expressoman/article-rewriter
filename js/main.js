
  var main_init = function() {
    var   source = $("#step-01-template").html();
    var template = Handlebars.compile( source );
    var  context = { title: "Paste Article", description: "Paste an existing article in the textbox below."};
    var     html = template(context);
  };

  $(document).ready( main_init );
