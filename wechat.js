document.addEventListener('WeixinJSBridgeReady', function () {
  WeixinJSBridge.on('menu:share:timeline', function () {
    WeixinJSBridge.invoke('shareTimeline', {
      img_url: location.href + 'icon.gif',
      img_width: 200, img_height: 300,
      link: location.href,
      title: '老程做的贪吃蛇呵呵呵',
      desc: '老程做的贪吃蛇呵呵呵'
    });
  });
});