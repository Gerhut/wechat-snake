(function () {

var moduleNames = ['context', 'layout', 'swipe', 'walk', 'paint', 'game']
  , modules = {}

function loadModule() {
  var currentModuleName = moduleNames.shift()
    , scriptElement = document.createElement('script')

  function mod(name) {
    return name in modules
      ? modules[name]
      : null;
  }

  function windowDef(constructor) {
    var module = constructor(mod);
    document.head.removeChild(scriptElement);
    delete window.def;

    //alert(currentModuleName + ': ' + module);

    if (typeof module !== 'undefined')
      modules[currentModuleName] = module;
    if (moduleNames.length > 0)
      loadModule();
  }

  scriptElement.setAttribute('src', currentModuleName + '.js');
  window.def = windowDef;
  document.head.appendChild(scriptElement);
}

loadModule();

}) (); 