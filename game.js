def(function(mod) {
  var layout = mod('layout')
    , canvas = mod('context').canvas
    , swipe = mod('swipe')
    , walk = mod('walk')
    , paint = mod('paint')
    , snake = [[8, 7], [7, 7]]
    //, snake = [[3, 4], [3, 3], [2, 3], [2, 4], [2, 5], [2, 6], [3, 6], [3, 5], [4, 5], [4, 6], [4, 7], [4, 8], [3, 8], [3, 7]]
    , dir = [1, 0]
    , food = [10, 7]
    , interval = 300

  swipe.up(function () { changeDir([0, -1]); });
  swipe.down(function () { changeDir([0,  1]); });
  swipe.left(function () { changeDir([-1, 0]); });
  swipe.right(function () { changeDir([ 1, 0]); });

  function changeDir(newDir) {
    if (!walk.willDie(snake, newDir))
      dir = newDir;
  }

  function genFood() {
    var rnd = Math.floor(Math.random() * (layout.columns * layout.rows - snake.length));
    while (snake.some(function (pos) {
      return rnd === pos[0] * layout.columns + pos[1];
    })) rnd++;

    food[0] = Math.floor(rnd / layout.columns);
    food[1] = rnd % layout.columns;
  }

  genFood();
  paint(snake, food);

  setTimeout(tick, interval);

  function tick() {
    var result = walk(snake, dir, food);
    if (result === 'eat')
      genFood();
    paint(snake, food, result);
    if (result !== 'dead') {
      if (interval > 50)
        interval -= 1
      setTimeout(tick, interval);
    }
  }
});