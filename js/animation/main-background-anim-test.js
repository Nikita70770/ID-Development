(function($){
    var canvas = $('#home-bg-anim').children('canvas'),
      background = canvas[0],
      foreground1 = canvas[1],
      foreground2 = canvas[2],
      config = {
        line: {
          amount: 45,
          layer: 3,
          color: [143, 30, 58],
          alpha: 0.5
        },
        speed: 0.5,
        angle: 45
      };
  
    if (background.getContext){
      var bctx = background.getContext('2d'),
        fctx1 = foreground1.getContext('2d'),
        fctx2 = foreground2.getContext('2d'),
        M = window.Math, // Cached Math
        degree = config.angle/360*M.PI*2,
        lines = [],
        wWidth, wHeight, timer;
      
      requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback, element) { setTimeout(callback, 1000 / 60); };
  
      cancelAnimationFrame = window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        clearTimeout;
  
      var setCanvasHeight = function(){
        wWidth = $(window).width();
        wHeight = $(window).height(),
  
        canvas.each(function(){
          this.width = wWidth;
          this.height = wHeight;
        });
      };
  
      var drawLine = function(x, y, width, color, alpha){
        var endX = x+M.sin(degree)*width,
          endY = y-M.cos(degree)*width,
          gradient = fctx2.createLinearGradient(x, y, endX, endY);
        gradient.addColorStop(0, 'rgba('+color[0]+','+color[1]+','+color[2]+','+alpha+')');
        gradient.addColorStop(1, 'rgba('+color[0]+','+color[1]+','+color[2]+','+(alpha-0.1)+')');
  
        fctx2.beginPath();
        fctx2.moveTo(x, y);
        fctx2.lineTo(endX, endY);
        fctx2.lineWidth = 3;
        fctx2.lineCap = 'round';
        fctx2.strokeStyle = gradient;
        fctx2.stroke();
      };
  
      var drawBack = function(){
        bctx.clearRect(0, 0, wWidth, wHeight);
  
        var gradient = [];
        
        gradient[0] = bctx.createRadialGradient(wWidth*0.3, wHeight*0.1, 0, wWidth*0.3, wHeight*0.1, wWidth*0.9);
        gradient[0].addColorStop(0, 'rgb(0, 0, 0)');
        gradient[0].addColorStop(1, 'transparent');
  
        bctx.translate(wWidth, 0);
        bctx.scale(-1,1);
        bctx.beginPath();
        bctx.fillStyle = gradient[0];
        bctx.fillRect(0, 0, wWidth, wHeight);
  
        gradient[1] = bctx.createRadialGradient(wWidth*0.1, wHeight*0.1, 0, wWidth*0.3, wHeight*0.1, wWidth);
        gradient[1].addColorStop(0, 'rgb(0, 0, 0)');
        gradient[1].addColorStop(0.8, 'transparent');
  
        bctx.translate(wWidth, 0);
        bctx.scale(-1,1);
        bctx.beginPath();
        bctx.fillStyle = gradient[1];
        bctx.fillRect(0, 0, wWidth, wHeight);
  
        gradient[2] = bctx.createRadialGradient(wWidth*0.1, wHeight*0.5, 0, wWidth*0.1, wHeight*0.5, wWidth*0.5);
        gradient[2].addColorStop(0, 'rgb(0, 0, 0)');
        gradient[2].addColorStop(1, 'transparent');
  
        bctx.beginPath();
        bctx.fillStyle = gradient[2];
        bctx.fillRect(0, 0, wWidth, wHeight);
      };
  
      var animate = function(){
        var sin = M.sin(degree),
          cos = M.cos(degree);
  
        if (config.line.amount > 0 && config.line.layer > 0){
          fctx2.clearRect(0, 0, wWidth, wHeight);
          for (var j=0, len = lines.length; j<len; j++){
            var item = lines[j],
              x = item.x,
              y = item.y,
              width = item.width,
              speed = item.speed;
  
            if (x > wWidth + width * sin){
              x = -width * sin;
            } else if (x < -width * sin){
              x = wWidth + width * sin;
            } else {
              x += sin*speed;
            }
  
            if (y > wHeight + width * cos){
              y = -width * cos;
            } else if (y < -width * cos){
              y = wHeight + width * cos;
            } else {
              y -= cos*speed;
            }
            
            item.x = x;
            item.y = y;
            drawLine(x, y, width, item.color, item.alpha);
          }
        }
  
        timer = requestAnimationFrame(animate);
      };
  
      var createItem = function(){
        lines = [];
  
        if (config.line.amount > 0 && config.line.layer > 0){
          for (var m=0; m<config.line.amount/config.line.layer; m++){
            for (var n=0; n<config.line.layer; n++){
              lines.push({
                x: M.random() * wWidth,
                y: M.random() * wHeight,
                width: M.random()*(20+n*5)+(20+n*5),
                color: config.line.color,
                alpha: M.random()*0.2+(config.line.alpha-n*0.1),
                speed: config.speed*(1+n*0.5)
              });
            }
          }
        }
  
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(animate);
        drawBack();
      };
  
      $(document).ready(function(){
        setCanvasHeight();
        createItem();
      });
      $(window).resize(function(){
        setCanvasHeight();
        createItem();
      });
    }
  })(jQuery);