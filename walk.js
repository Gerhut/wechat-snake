def(function(mod) {
  var layout = mod('layout')

  function aliveHead(snake, dir) {
    var head = [snake[0][0] + dir[0], snake[0][1] + dir[1]]
      , len = snake.length

    if (head[0] === -1) head[0] = layout.columns - 1
    if (head[1] === -1) head[1] = layout.rows - 1
    if (head[0] === layout.columns) head[0] = 0
    if (head[1] === layout.rows) head[1] = 0

    // 撞自己
    if (snake.some(function (pos, index) {
      if (index === len - 1 && len > 2) return false;
      return (head[0] === pos[0] && head[1] === pos[1])
    }))
      return null;

    /* 撞墙
    if (head[0] < 0 || head[0] >= layout.columns
      ||head[1] < 0 || head[1] >= layout.rows)
      return null;
    //*/

    return head;
  }

  function walk(snake, dir, food) {
    var head = aliveHead(snake, dir);

    if (head == null)
      return 'dead'

    snake.unshift(head);

    var eat = ((head[0] === food[0]) && (head[1] === food[1]));
    if (!eat)
      snake.pop();
    else
      return 'eat'
  }

  walk.aliveHead = aliveHead;

  return walk;
});