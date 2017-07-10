// Vivace JS Library v0.3.0
// Updated 30 June 2017

var Body = document.body;

function ToggleClass(Id, Class) {
    var Element = document.getElementById(Id);
    Element.classList.toggle(Class);
}

function HideOrShow(Id, Display, Variable) {
    if (typeof(Variable) === 'undefined') {
        document.getElementById(Id).style.display = Display;
    } else {
        window[Variable] = Variable;
        Variable.style.display = Display;
    }
}

function FadeIn(Id) {
    document.getElementById(Id).setAttribute('class', 'FadeIn');
}

function FadeOut(Id) {
    document.getElementById(Id).setAttribute('class', 'FadeOut');
}

function ScrollTo(To, Duration) {
    Element = Body;
    if (Duration <= 0) return;
    var Difference = To - Element.scrollTop;
    var PerTick = Difference / Duration * 10;

    setTimeout(function() {
        Element.scrollTop = Element.scrollTop + PerTick;
        if (Element.scrollTop === To) return;
        ScrollTo(To, Duration - 10);
    }, 10);
}

// Update element content
function UpdateContent(Id, Content, Variable) {
    if (typeof(Variable) === 'undefined') {
        document.getElementById(Id).innerHTML = Content;
    } else {
        window[Variable] = Variable;
        Variable.innerHTML = Content;
    }
}

// Clear input content
function ClearInput(Id) {
    document.getElementById(Id).value = '';
}

// Save attribute as variable (will be global)
function GetAttribute(Id, AttributeType, Variable) {
    var Value = document.getElementById(Id).getAttribute(AttributeType);
    window[Variable] = Value;
}

function ReturnAttribute(Id, AttributeType) {
    return document.getElementById(Id).getAttribute(AttributeType);
}

// Update attibute value
function UpdateAttribute(Content, Id, AttributeType) {
    document.getElementById(Id).setAttribute(AttributeType, Content);
}

// Create new node (for outputting arrays it is usually better to use VirtualNodeTree())
function CreateNode(ParentId, NewTagType, Text, AttributeType, AttributeName) {
    var NewTagType = document.createElement(NewTagType);
    var Text = document.createTextNode(Text);
    NewTagType.appendChild(Text);
    var element = document.getElementById(ParentId);
    g = element.appendChild(NewTagType);
    if (typeof AttributeType !== 'undefined') {
      g.setAttribute(AttributeType, AttributeName);
    }
}

// Output array with virtual DOM
function VirtualNodeTree(ParentId, TagType, Array, AttributeType, AttributeName) {
    parent = document.getElementById(ParentId);
    var Content = '';
    for (var i = 0; i < Array.length; i++) {
      if (typeof AttributeType !== 'undefined') {
        Attribute = AttributeType + '="' + AttributeName + '"';
      } else {
        Attribute = '';
      }
      if (TagType === 'img') {
        Content += '<' + TagType + ' ' + Array[i] + '>';

      } else {
        Content += '<' + TagType + ' ' + Attribute + '>' + Array[i] + '</' + TagType + '>';
      }
    }
    parent.innerHTML = Content;
}

// Lazy load script
function LazyLoad(src) {
  var script = document.createElement("script");
  script.src = src;
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
}

// AJAX / JSON (alpha)
function AjaxGet(Name, Url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', Url);
  xhr.onload = function() {
    if (xhr.status === 200) {
        window[Name] = xhr.responseText;
    } else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

// Load AJAX (alpha)
function loadAJAX() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("content").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", 'pages/' + page + '.php', true);
  xhttp.send();

  Render();
}
