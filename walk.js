def(function(mod) {
  var layout = mod('layout')

  function willDie(snake, dir) {
    var head = [snake[0][0] + dir[0], snake[0][1] + dir[1]]
      , len = snake.length
    if (snake.some(function (pos, index) {
      if (index === snake.length - 1) return false;
      return (head[0] === pos[0] && head[1] === pos[1])
    }))
      return true;

    if (head[0] < 0 || head[0] >= layout.columns
      ||head[1] < 0 || head[1] >= layout.rows)
      return true;

    return false;
  }

  function walk (snake, dir, food) {
    var head = [snake[0][0] + dir[0], snake[0][1] + dir[1]]

    if (willDie(snake, dir))
      return 'dead'

    snake.unshift(head);

    var eat = ((head[0] === food[0]) && (head[1] === food[1]));
    if (!eat)
      snake.pop();
    else
      return 'eat'
  }

  walk.willDie = willDie;

  return walk;
});