$(function(){
  grid.render();
  directing();
  move();
  food();
});

var grid = {
  gridX: 40,
  gridY: 40,
  render: function() {
            $('body').append("<div class=container></div>");
            for(j=0; j<grid.gridY; j++) {
              $('.container').append("<div class=row></div>");
              for(i=0;i<grid.gridX; i++) {
                $('.container .row:last-child').append('<div class="unit"></div>');
              }
            }
          }
};

var worm = {
  direction: 'r',
  currentPosition: [[20,20],[20,19],[20,18],[20,17],[20,16]],
  segments: 4,
  speed: 150,
  eat: function() {
          if($('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').hasClass('food')) {
            food();
            worm.currentPosition.push([worm.currentPosition[worm.segments-1][0], worm.currentPosition[worm.segments-1][1]]);
            worm.segments +=1;
            worm.speed -=5;
          }
       }
};

function move() {
  if (worm.currentPosition[0][1] === -1 || worm.currentPosition[0][1] === 40 || worm.currentPosition[0][0] === 41 || worm.currentPosition[0][0] === 0) {
    restartGame();
  } else {
    $('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').removeClass('worm');
      for(i=worm.currentPosition.length-1; i>0; i--) {
        $('.container .row:nth-child('+worm.currentPosition[i][0]+') .unit:nth('+worm.currentPosition[i][1]+')').removeClass('worm');
        worm.currentPosition[i][0] = worm.currentPosition[i-1][0];
        worm.currentPosition[i][1] = worm.currentPosition[i-1][1];
      }
  }

    if (worm.direction === 'r') {
        worm.currentPosition[0][1] += 1;
    } else if (worm.direction === 'l') {
        worm.currentPosition[0][1] -= 1;
    } else if (worm.direction === 'u') {
        worm.currentPosition[0][0] -= 1;
    } else {
        worm.currentPosition[0][0] += 1;
    }

    worm.eat();
      for(i=0;i<worm.segments; i++) {
        if(worm.currentPosition[0][0] === worm.currentPosition[i+1][0] && worm.currentPosition[0][1] === worm.currentPosition[i+1][1]) {
          restartGame();
        } else {
          $('.container .row:nth-child('+worm.currentPosition[i][0]+') .unit:nth('+worm.currentPosition[i][1]+')').addClass('worm');
        }
      }
  setTimeout(move, worm.speed);
}

function restartGame() {
  $('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').removeClass('worm');
  worm.currentPosition[0] = [20,20];
  worm.segments = 4;
  worm.direction = 'r';
  alert("Ready to restart?");
}

function food() {
  $('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').removeClass('food');
  var x = Math.floor((Math.random() * 39)+1);
  var y = Math.floor((Math.random() * 39));
  $('.container .row:nth-child('+x+') .unit:nth('+y+')').addClass('food');
}

function directing() {
  $(document.body).on('keydown',function(event) {
      var keys = ['r','l','u','d'];
      var codes = [39, 37, 38, 40];
      worm.direction = keys[codes.indexOf(event.which)];
  });
}
