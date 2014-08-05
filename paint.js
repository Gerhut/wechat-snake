(function () {

var sprite = new Image();
sprite.addEventListener('load', spriteLoaded)
sprite.src = 'sprite.gif';
function spriteLoaded() {
  def(function (mod) {
    var context = mod('context')
      , layout = mod('layout')

    function getDir(pos0, pos1) {
      var dx = (pos1[0] - pos0[0]) % layout.columns
        , dy = (pos1[1] - pos0[1]) % layout.rows;

      if (dy === 1 || dy === 1 - layout.rows) return 0;
      if (dx === -1 || dx === layout.columns - 1) return 1;
      if (dy === -1 || dy === layout.rows - 1) return 2;
      if (dx === 1 || dx === 1- layout.columns) return 3;
    }

    return function (snake, food, result) {
      context.clearRect(0, 0, layout.width, layout.height);
      
      var dir = -1, prevDir = -1;
      for (var i = 0, l = snake.length; i < l; i++) {
        prevDir = dir;
        if (i < l - 1)
          dir = getDir(snake[i], snake[i + 1]);

        var spriteX, spriteY, spriteD;

        if (i === 0) { // head
          if (result === 'dead')
            spriteX = 40, spriteY = 0;
          else
            spriteX = 0, spriteY = 0;
          spriteD = dir * Math.PI / 2;
        } else if (i < l - 1) { //body
          if (dir === prevDir) { // straight
            spriteX = 0, spriteY = 40;
            spriteD = dir * Math.PI / 2;
          } else {
            spriteX = 40, spriteY = 40;
            if ((dir + 4 - prevDir) % 4 === 1)
              spriteD = dir * Math.PI / 2 - Math.PI;
            else
              spriteD = dir * Math.PI / 2 + Math.PI / 2;
          }
        } else { // tail
          spriteX = 80, spriteY = 40;
          spriteD = prevDir * Math.PI / 2;
        }

        context.translate(snake[i][0] * layout.columnWidth + layout.columnWidth / 2,
                          snake[i][1] * layout.rowHeight + layout.rowHeight / 2);
        context.rotate(spriteD);
        context.drawImage(sprite, spriteX, spriteY, 40, 40,
          -layout.columnWidth / 2,
          -layout.rowHeight / 2,
          layout.columnWidth, layout.rowHeight);
        context.setTransform(1, 0, 0, 1, 0, 0);
      }

      context.translate(food[0] * layout.columnWidth + layout.columnWidth / 2,
                        food[1] * layout.rowHeight + layout.rowHeight / 2);
      context.drawImage(sprite, 80, 0, 40, 40,
        -layout.columnWidth / 2,
        -layout.rowHeight / 2,
        layout.columnWidth, layout.rowHeight);
      context.setTransform(1, 0, 0, 1, 0, 0);
    };
  });
}

}) ();