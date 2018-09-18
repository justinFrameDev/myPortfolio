
// switches between tabs without reloading

$(".tab-list").each(function() {
    var $this = $(this);
    var $tab = $this.find("li.active");
    var $link = $tab.find("a");
    var $panel = $($link.attr("href"));
  
    $this.on("click", ".tab-control", function(e) {
      e.preventDefault();
      var $link = $(this),
        id = this.hash;
      if (id && !$link.is(".active")) {
        $panel.removeClass("active");
        $tab.removeClass("active");
  
        $panel = $(id).addClass("active");
  
        $tab = $link.parent().addClass("active");
      }
    });
  });
  
  // updates everytime I modify the page
  var msg = "<p>last modified: " + document.lastModified + "</p>";
  
  var el = document.getElementById("bottom");
  el.innerHTML = msg;
  
  // sends data to php file when the send button is clicked
  function _(id) {
    return document.getElementById(id);
  }
  function submitForm() {
    _("mybtn").disabled = true;
    _("status").innerHTML = " please wait...";
    var formdata = new FormData();
    formdata.append("n", _("n").value);
    formdata.append("e", _("e").value);
    formdata.append("m", _("m").value);
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "form.php");
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        if (ajax.responseText == "success") {
          _("my-form").innerHTML =
            "<h2>Thanks " + _("n").value + ", your message has been sent.</h2>";
        } else {
          _("status").innerHTML = ajax.responseText;
          _("mybtn").disabled = false;
        }
      }
    };
    ajax.send(formdata);
  }
  