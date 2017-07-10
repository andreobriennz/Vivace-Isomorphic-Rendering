// Router to load sections (updated)
// Get url clicked, and find coresponding page info, then call Render() function in templating engine
// LazyLoad("assets/models/pages.js");

window.onclick = function(e) {
  e.preventDefault();

  href = e.target.href.split('/');
  href = href[href.length - 1];

  loadModel(href);

  return false;
}

function loadModel(href) {
  $.ajax({
      url: "assets/models/" + pages[href] + ".js",
      success: function(data) {
        app = JSON.parse(data);

        var stateObj = { page: app["title"] };
        history.pushState(stateObj, app["title"], app["page"]);
        console.log(app["page"]);

        Render();
      }
  });
}





// Simple templating engine
function Render(section) {
  var v = document.querySelectorAll('[v]');

  for (var i = 0; i < v.length; i++) {
    if (typeof section === 'undefined' || (typeof section === 'string' && section === v[i].getAttribute("v"))) {
      vAttrib = v[i].getAttribute("v");

      if (Array.isArray(app[vAttrib])) {
        RenderArray();
      } else {
        CreateElement(v[i]);
      }
    }
  }
}

function RenderArray() {
  var id = v[i].parentNode.setAttribute('id', vAttrib);
  tag = v[i].tagName.toLowerCase();
  VirtualNodeTree(vAttrib, tag, app[vAttrib]);
  document.getElementById(vAttrib).firstChild.setAttribute('v', vAttrib);
}

function CreateElement(el) {
  if (el.tagName.toLowerCase() !== 'img') {
    el.innerHTML = app[vAttrib];
  } else {
      el.parentNode.setAttribute('id', vAttrib);
      el.parentNode.innerHTML ='<' + el.tagName.toLowerCase() + ' ' + app[vAttrib] + '>';
  }
}
