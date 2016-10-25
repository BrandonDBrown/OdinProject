$(function(){
  grid.render();
  directing();
  move();
  food();
});

var speed = 150;
var direction = 'r';

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
  initialPosition: [20,20],
  initialDirection: 'r',
  currentPosition: [[20,20],[20,19],[20,18],[20,17],[20,16]],
  segments: 4,
  eat: function() {
          if($('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').hasClass('food')) {
            food();
            $('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').removeClass('food');
            worm.currentPosition.push([worm.currentPosition[worm.segments-1][0], worm.currentPosition[worm.segments-1][1]]);
            worm.segments +=1;
            speed-=5;
          }
       },
};

function move() {
  if (worm.currentPosition[0][1] === -1 || worm.currentPosition[0][1] === 40 || worm.currentPosition[0][0] === 41 || worm.currentPosition[0][0] === 0) {
    gameOver();
  } else {
    $('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').removeClass('worm');
      for(i=worm.currentPosition.length-1; i>0; i--) {
        $('.container .row:nth-child('+worm.currentPosition[i][0]+') .unit:nth('+worm.currentPosition[i][1]+')').removeClass('worm');
        worm.currentPosition[i][0] = worm.currentPosition[i-1][0];
        worm.currentPosition[i][1] = worm.currentPosition[i-1][1];
      }
  }
    if (direction === 'r') {
        worm.currentPosition[0][1] += 1;
    } else if (direction === 'l') {
        worm.currentPosition[0][1] -= 1;
    } else if (direction === 'u') {
        worm.currentPosition[0][0] -= 1;
    } else {
        worm.currentPosition[0][0] += 1;
    }
    worm.eat();
      for(i=0;i<worm.segments; i++) {
        if(worm.currentPosition[0][0] === worm.currentPosition[i+1][0] && worm.currentPosition[0][1] === worm.currentPosition[i+1][1]) {
          gameOver();
        } else {
          $('.container .row:nth-child('+worm.currentPosition[i][0]+') .unit:nth('+worm.currentPosition[i][1]+')').addClass('worm');
        }
      }
  setTimeout(move, speed);
}

function gameOver() {
  $('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').removeClass('worm');
  worm.currentPosition[0] = [20,20];
  worm.segments = 4;
  direction = 'r';
  $('.container .row:nth-child('+worm.currentPosition[0][0]+') .unit:nth('+worm.currentPosition[0][1]+')').addClass('worm');
  return alert('Game Over');
}

function food() {
  var x = Math.floor((Math.random() * 39)+1);
  var y = Math.floor((Math.random() * 39));
  $('.container .row:nth-child('+x+') .unit:nth('+y+')').addClass('food');
}

// var compassRose = {
//   39: 'r',
//   37: 'l',
//   38: 'u',
//   40: 'd'
// };
function directing() {
  $(document.body).on('keydown',function(event) {
      var keyCode = ['r','l','u','d'];
      // direction = event.which;
      if(event.which === 39){
        // right
        direction = keyCode[0];
      } else if (event.which === 37){
        // left
        direction = keyCode[1];
      } else if (event.which === 38){
        // up
        direction = keyCode[2];
      } else if(event.which === 40) {
        // down
        direction = keyCode[3];
      }
  });
}
