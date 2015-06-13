$(document).ready(function(){

  function loadTextile(path, options) {
    if (!options) {
      options = {push: true, link_replacing: false }
    }
    if (!path || path === "") {
      path = "index"
    } else if (path.slice(0,3) == "#!/") {
      path = path.substr(3)
    }
    path = path.replace(/\//gi, '')
    // console.log("path: ", path)

    var url = "/pages/" + path + ".textile";
    $.ajax({
      url: url,
    }).done( function(data) {

      if (options.push) {
        var bang_path = '#!/' + path;
        if (typeof(window.history.pushState) == 'function') {
          window.history.pushState({path: path}, bang_path, bang_path);
        } else {
          window.location.hash = bang_path;
        }
      }

      var html = textile(data)
      $("#content").html(html)
      if (false && options.link_replacing) {
        $("#content a").each(function (){
          // console.log("content a",  this);
          var $this = $(this);
          var href = $this.attr("href");
          // alredy #!
          if (href.slice(0,2) == "#!" ) {
            return;
          }
          // external
          if (this.hostname != window.location.hostname) {
            return;
          };
          // console.log("  a.href", href, " this.pathname", this.pathname)
          this.pathname = window.location.pathname;
          this.hash = "#!" + href;
        })
      }
    })
  }

  loadTextile(window.location.hash)

  $('#content, nav').on("click", "a", function(e) {
    var w = window,
        l = window.location,
        t = e.target;
    // console.log("event ", e);

    if ( t.hostname === l.hostname &&
         t.pathname === l.pathname &&
         t.hash.slice(0,2) === "#!" && true
         //!(e.which != 1 || e.metaKey || e.ctrlKey)
         ) {
      // console.log(" textile link")
      e.preventDefault();
      loadTextile(e.target.hash)
    }

  })

  //Pop State
  $(window).on('popstate', function(e){
      var state = e.originalEvent.state;
      if(e.originalEvent && state){
        var path = state.path;
        loadTextile(path, {push: false});
      }
  });
})
