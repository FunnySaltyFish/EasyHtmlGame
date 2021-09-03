const Keys = {
  player: "player",
  star: "star",
  bmob: "bomb",
  anim_left: "anim_left",
  anim_right: "anim_right",
  anim_attack: "anim_attack",
  anim_turn: "anim_turn",
};

let gameWidth = GAME_WIDTH, gameHeight = GAME_HEIGHT;
const gameConfig = {
  targetScore: 200,
  eachBmobs: [1, 1, 1, 1, 2, 2, 2],
  eachStars: [3, 3, 3, 4, 5, 5, 5]
}

let currentState = 0;

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

let isAttacking = false;

let GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  // 在整个工程中只会执行一次
  initialize: function BootScene() {



  },
  // 每次调用场景SceneA会执行一次;
  init: function () {

  },
  preload: function () {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image(Keys.star, "assets/star.png");
    this.load.image(Keys.bmob, "assets/bomb.png");
    this.load.spritesheet(Keys.player, "assets/player.png", {
      frameWidth: 32,
      frameHeight: 48,
      //   spacing : 45,
      //   margin:6
    });
  },
  create: function () {
    //  A simple background for our game
    this.add.image(gameWidth / 2, gameHeight / 2, "sky");

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    // The player and its settings
    player = this.physics.add.sprite(100, 450, Keys.player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: Keys.anim_right,
      frames: this.anims.generateFrameNumbers(Keys.player, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: Keys.anim_turn,
      frames: [{ key: Keys.player, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: Keys.anim_left,
      frames: this.anims.generateFrameNumbers(Keys.player, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
      key: Keys.star,
      repeat: maxIn(gameConfig.eachStars),
      setXY: { x: gameWidth / 2, y: 0, stepX: randomInt(30, 40) },
    });

    stars.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(0.2);
      child.setBounceX(1);
      child.setVelocityX(randomInt(0, 2) == 1 ? -50 : 50);
      child.setCollideWorldBounds(true);
    });

    bombs = this.physics.add.group();
    var x =
      player.x < gameWidth / 2
        ? Phaser.Math.Between(gameWidth / 2, gameWidth)
        : Phaser.Math.Between(0, gameWidth / 2);

    var bomb = bombs.create(x, 16, Keys.bmob);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

    //  The score
    scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    let targetText = this.add.text(16, 56, "Target: " + gameConfig.targetScore, {
      fontSize: "32px",
      fill: "#000",
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //this.physics.add.collider(monsters, platforms);

    //this.physics.add.collider(monsters,game.world)

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
  },
  update : function(){
    if (gameOver) {
      return;
    }
  
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play(Keys.anim_left, true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play(Keys.anim_right, true);
    } else {
      player.setVelocityX(0);
      player.anims.play(Keys.anim_turn);
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
});

function collectStar(player, star) {
  star.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    currentState++;
    if (currentState >= gameConfig.eachStars.length) currentState = 0;

    let curNum = 0;
    //  A new batch of stars to collect
    stars.children.iterate(function (child) {
      if (curNum < gameConfig.eachStars[currentState]) {
        child.enableBody(true, child.x, 0, true, true);
        child.setVelocityX(randomInt(0, 2) == 1 ? -50 : 50);
        curNum++;
      }
    });

    for (let index = 0; index < gameConfig.eachBmobs[currentState]; index++) {
      var x =
        player.x < gameWidth / 2
          ? Phaser.Math.Between(gameWidth / 2, gameWidth)
          : Phaser.Math.Between(0, gameWidth / 2);

      var bomb = bombs.create(x, 16, Keys.bmob);
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play(Keys.anim_turn);

  gameOver = true;
}