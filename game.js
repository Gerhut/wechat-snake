def(function(mod) {
  var layout = mod('layout')
    , canvas = mod('context').canvas
    , swipe = mod('swipe')
    , walk = mod('walk')
    , paint = mod('paint')
    , INTERVAL_LIMIT = [200, 50]
    , snake, dir, food, interval, result

  swipe.up(function () { initOrChangeDir([0, -1]); });
  swipe.down(function () { initOrChangeDir([0,  1]); });
  swipe.left(function () { initOrChangeDir([-1, 0]); });
  swipe.right(function () { initOrChangeDir([ 1, 0]); });

  function init() {
    snake = [[8, 7], [7, 7]];
    dir = [1, 0];
    interval = INTERVAL_LIMIT[0];
    result = void 0;
    window.score = 0;
    genFood();
    paint(snake, food);
    setTimeout(tick, interval);
  }


  function initOrChangeDir(newDir) {
    if (result === 'dead')
      init()
    else
      changeDir(newDir);
  }

  function changeDir(newDir) {
    if (walk.aliveHead(snake, newDir))
      dir = newDir;
  }

  function genFood() {
    var rnd = Math.floor(Math.random() * (layout.columns * layout.rows - snake.length));
    while (snake.some(function (pos) {
      return rnd === pos[0] * layout.columns + pos[1];
    })) rnd++;

    food = [
      Math.floor(rnd / layout.columns),
      rnd % layout.columns
    ]

    if (interval > INTERVAL_LIMIT[1])
      interval -= 10
  }

  alert('用手指在屏幕上划下划左划右划就能控制蛇的转向，点击确定开始。');
  init();

  function tick() {
    result = walk(snake, dir, food);
    if (result === 'eat') {
      score += 1;
      genFood();
    }
    paint(snake, food, result);
    if (result !== 'dead') {
      setTimeout(tick, interval);
    } else {
      alert('你吃掉了 '+window.score + ' 个小苹果，快分享给你的朋友们吧！\n关闭窗口之后随便划一下就能重玩儿。')
    }
  }
});