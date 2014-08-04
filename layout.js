(function () {

var background = new Image();
background.addEventListener('load', backgroundLoaded)
background.src = 'background.gif';

function backgroundLoaded() {
  def(function(mod) {
    var canvas = mod('context').canvas
      , cvRatio

    function onResize() {
      var docWidth = document.documentElement.clientWidth
        , docHeight = document.documentElement.clientHeight
        , docRatio = docWidth / docHeight
        , width, height
      
      if (cvRatio > docRatio) {
        width = docWidth;
        height = docWidth * cvRatio;
        canvas.style.left = '0px';
        canvas.style.top = '0px';
      } else {
        width = docHeight / cvRatio;
        height = docHeight;
        canvas.style.left = (docWidth - width) / 2 + 'px';
        canvas.style.top = '0px';
      }

      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    }
    
    canvas.style.backgroundImage = "url('background.gif')";
    cvRatio = canvas.width / canvas.height;
    onResize();

    window.addEventListener('resize', onResize, true);

    return {
      'width': 600,
      'height': 600,
      'columns': 16,
      'rows': 16,
      'columnWidth': 600 / 16,
      'rowHeight': 600 / 16
    };
  });
}

})();