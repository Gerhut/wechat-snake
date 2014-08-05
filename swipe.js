def(function (mod) {
  var canvas = mod('context').canvas
    , handlers = {}

  if ('ontouchstart' in document) {
    evt = {
      'down': 'touchstart',
      'up': 'touchend'
    }
    document.addEventListener('touchstart', function (event) { event.preventDefault(); });
  } else if (window.navigator.msPointerEnabled) {
    evt = {
      'down': 'MSPointerDown',
      'up': 'MSPointerUp'
    }
    document.addEventListener('MSPointerDown', function (event) { event.preventDefault(); });
  } else
    evt = {
      'down': 'mousedown',
      'up': 'mouseup'
    }

  var x, y;

  function down(event) {
    var target = event
    if ('changedTouches' in event)
      target = event.changedTouches[0];
    x = target.screenX;
    y = target.screenY;
  }

  function up() {
    var target = event
      , name;
    if ('changedTouches' in event)
      target = event.changedTouches[0];
    
    var dx = target.screenX - x
      , dy = target.screenY - y;

    if (Math.abs(dx) > 5 && Math.abs(dx) > Math.abs(dy))
      name = dx > 0 ? 'right' : 'left';
    else if (Math.abs(dy) > 5 && Math.abs(dy) > Math.abs(dx))
      name = dy > 0 ? 'down' : 'up';

    if (typeof handlers[name] === 'function')
      handlers[name]();
  }

  document.addEventListener(evt.down, down, false)
  document.addEventListener(evt.up, up, false)

  return {
    'up': function (func) {
      handlers['up'] = func;
    },
    'down': function (func) {
      handlers['down'] = func;
    },
    'left': function (func) {
      handlers['left'] = func;
    },
    'right': function (func) {
      handlers['right'] = func;
    }
  };
});