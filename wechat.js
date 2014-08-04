void function () {

var data = {
  imageURL: location.href + 'icon.gif',
  imageSize: 30,
  link: location.href,
  getText: function () { return '来试试老程做的贪吃蛇呵呵呵' }
}

document.addEventListener('WeixinJSBridgeReady', function () {
  WeixinJSBridge.on('menu:share:appmessage', function() {
    WeixinJSBridge.invoke('sendAppMessage', {
      img_url: data.imageURL,
      img_width: data.imageSize,
      img_height: data.imageSize,
      link: data.link,
      title: data.getText(),
      desc: data.getText()
    })
  })
  WeixinJSBridge.on('menu:share:timeline', function () {
    WeixinJSBridge.invoke('shareTimeline', {
      img_url: data.imageURL,
      img_width: data.imageSize,
      img_height: data.imageSize,
      link: data.link,
      title: data.getText()
    })
  })
})
} ()
