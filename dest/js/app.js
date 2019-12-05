"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lives = 4 - 1;
var score = 0;
var livesid = document.getElementById('lives');
var levelid = document.getElementById('score');
livesid.innerHTML = 'Lives: ' + lives;
levelid.textContent = 'Level: ' + score;

function updateLives() {
  lives--;
  livesid.innerHTML = 'Lives: ' + lives;

  if (lives < 1) {
    score = 0;
    levelid.textContent = 'Level: ' + score;
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 3) + 1;
    });
    lives = 4;
  }
}

function increaseLevel() {
  score++;
  levelid.textContent = 'Level: ' + score;

  if (score === 2) {
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 4) + 1;
    });
  }

  if (score === 3) {
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 5) + 2;
    });
  }

  if (score === 4) {
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 5) + 3;
    });
  }

  if (score === 5) {
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 5) + 4;
    });
  }
}

var Sun = function Sun() {
  _classCallCheck(this, Sun);

  this.x = 400;
  this.y = 0;
};

var Enemy =
/*#__PURE__*/
function () {
  function Enemy(x, y, direction, style) {
    _classCallCheck(this, Enemy);

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speed = Math.floor(Math.random() * 3) + 2;
  }

  _createClass(Enemy, [{
    key: "update",
    value: function update(dt) {
      this.x * dt;

      if (this.style === 'enemy1' && this.style === 'enemy2' && this.style === 'enemy3' || this.x >= 775) {
        this.x = 775;
        this.direction = 'rtl';
      }

      ;

      if (this.x <= 0) {
        this.x = 0;
        this.direction = 'ltr';
      }

      ;

      if (this.direction === 'ltr') {
        this.x = this.x + this.speed;
      } else {
        this.x = this.x - this.speed;
      }

      ;
      allEnemies.forEach(function (Enemy) {
        if (collision(Enemy, player)) {
          player.x = 400;
          player.y = 425;
          updateLives();
        }
      });
    }
  }]);

  return Enemy;
}();

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    this.x = 400;
    this.y = 425;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      if (collision(sun, player)) {
        this.x = 400;
        this.y = 425;
        increaseLevel();
      }
    }
  }, {
    key: "handleInput",
    value: function handleInput() {
      restriction();
    }
  }]);

  return Player;
}();

var player = new Player();
var sun = new Sun();

function restriction(keystring) {
  if (keystring === 'left') {
    player.x = player.x - 40;

    if (player.x <= 0) {
      player.x = 0;
    }
  }

  ;

  if (keystring === 'right') {
    player.x = player.x + 40;

    if (player.x >= 900 - 95) {
      player.x = 800;
    }
  }

  ;

  if (keystring === 'up') {
    player.y = player.y - 40;

    if (player.y < 0) {
      player.y = 0;
    }
  }

  ;

  if (keystring === 'down') {
    player.y = player.y + 40;

    if (player.y > 425) {
      player.y = 425;
    }
  }

  ;
}

var ene1 = new Enemy(0, 10, 'ltr', 'enemy1');
var ene2 = new Enemy(0, 150, 'ltr', 'enemy2');
var ene3 = new Enemy(0, 260, 'ltr', 'enemy3');
var allEnemies = [];
allEnemies.push(ene1, ene2, ene3);

function collision(rect1, rect2) {
  return !(rect1.x > rect2.x + 80 || rect1.x + 80 < rect2.x || rect1.y > rect2.y + 80 || rect1.y + 80 < rect2.y);
}

for (var i = 0; i < allEnemies.length; i++) {
  allEnemies[i].update(1);
}

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  restriction(allowedKeys[e.keyCode]);
});