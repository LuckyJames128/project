let player;
let gravity = 0.4;
let Can_jump = true;
let frames = 0;
let seconds;
let showmessage1 = false;
let dead = false;
// arrays of objects for our player to interact with
let platforms = [];
let finish_points = [];
let lava = [];
let enemies = [];
let elevators = [];

// sprite sheets
let sprite_sheet_idle;
let sprite_sheet_run;
let sprite_sheet_jump;
let sprite_sheet_fall;
let sprite_sheet_die;
//////////////////////////////////////////////////////////////////////////////

// FUNCTIONS /////////////////////////////////////////////////////////////////

// Function that creates a platform for the player to stand on
function create_platform(x, y, w, h, col) {
  var new_platform = createSprite(x, y, w, h, "static");
  new_platform.shapeColor = col;
  new_platform.immovable = true;
  platforms.push(new_platform);
}

// Function that creates a finish point for our game
function create_finish_point(x, y, w, h, col) {
  var new_finish_point = createSprite(x, y, w, h, "static");
  new_finish_point.shapeColor = col;
  new_finish_point.immovable = true;
  finish_points.push(new_finish_point);
}
function create_lava(x, y, w, h) {
  var new_lava = createSprite(x, y, w, h, "static");
  new_lava.shapeColor = "#CF1020";
  new_lava.immovable = true;
  lava.push(new_lava);
}

// Function for when player is touching a platform
function on_platform(platform) {
  if (player.position.y < platform.position.y - platform.height / 2 + 10) {
    // player is on top of the platform
    Can_jump = true;
  }
}

// Function for when player is touching a finish point
function on_finish_point() {
  alert("You won in " + seconds + " seconds! Good job!");
  noLoop();
}

// Function for when player is touching lava
function ded() {
  player.changeAnimation("die");
  dead = true;

  //Let the animation complete before stopping code
  setTimeout(() => {
    while (showmessage1 == false) {
      alert("COSMO NOOOOOOOOOOOOOOO!!!!!!!!! YOU MONSTER!!!! (restart to bring him back to life)");
      showmessage1 = true;
    }
    noLoop();
  }, 300);
}

//Jump
function jump(sprite) {
  if (sprite === player) {
    if (Can_jump == true) {
      sprite.velocity.y = -7;
    }
  } else {
    sprite.velocity.y = -7;
  }
}

////////////////////////////////////////////////////////////////////////////
alert("You are Cosmo the cat. Cosmo is on his 9th (final) life. Control Cosmo using arrows, wasd, and/or space bar. Cosmo is suspiciously good at parkour. Cosmo is allergic to pink rectangles (They are his mortal enemy). Don't touch anything red either (He is also allergic). Double click OK to begin.");

function preload() {
  // loading in the sprite sheets
  sprite_sheet_idle = loadSpriteSheet("https://cdn.glitch.global/dc395a04-15e9-44d5-9201-26ff5041b8e3/cat05_idle_blink_strip8.png?v=1699223918990", 40, 33, 8);
  sprite_sheet_run = loadSpriteSheet("https://cdn.glitch.global/30d045a8-5a18-4f39-abfa-c9f9da92e34e/cat05_run_strip4.png?v=1698884107224", 40, 33, 4);
  sprite_sheet_jump = loadSpriteSheet("https://cdn.glitch.global/dc395a04-15e9-44d5-9201-26ff5041b8e3/cat05_jump_strip4.png?v=1699224827775", 40, 33, 4);
  sprite_sheet_fall = loadSpriteSheet("https://cdn.glitch.global/dc395a04-15e9-44d5-9201-26ff5041b8e3/cat05_fall_strip3.png?v=1699225090081", 40, 33, 3);
  sprite_sheet_die = loadSpriteSheet("https://cdn.glitch.global/dc395a04-15e9-44d5-9201-26ff5041b8e3/cat05_die_strip8.png?v=1699507745910", 40, 33, 8);

  // make sure to specify width and height of each frame and number of frames

  // Create a sprite object and attach the animation to it
  player = createSprite(5,180, 40, 33);
  player.setCollider("rectangle", 0, 8, 16, 16);
  player.addAnimation("idle", sprite_sheet_idle);
  player.addAnimation("run", sprite_sheet_run);
  player.addAnimation("jump", sprite_sheet_jump);
  player.addAnimation("fall", sprite_sheet_fall);
  player.addAnimation("die", sprite_sheet_die);

  // ADDING OBJECTS INTO OUR GAME ////////////////////////////////////////////
  create_platform(1000, 200, 5000, 10, "#7CFC00");
  create_finish_point(2750, 190, 80, 30, "yellow");
  create_lava(-100, 0, 3, 400);
  create_lava(300, 175, 10, 40);
  create_lava(250, 182.5, 10, 25);
  create_lava(390, 150, 22.5, 10);
  create_lava(450, 180, 10, 30);
  create_platform(450, 150, 10, 30, "grey");
  create_platform(600, 155, 40, 5, "grey");
  create_lava(580, 175, 10, 40);
  create_lava(620, 142, 10, 30);
  create_platform(640, 177, 40, 3, "grey");
  create_platform(660, -100, 2, 555, "grey");
  create_platform(700, 100, 30, 10, "grey");
  create_platform(760, 100, 20, 10, "grey");
  create_lava(740, 180, 10, 50);
  create_lava(800, 180, 10, 50);
  create_lava(1200, 120, 600, 160);
  create_platform(925, 30, 40, 10, "grey");
  create_lava(950, 20, 10, 50);
  create_platform(980, 30, 50, 10, "grey");
  create_platform(1100, 30, 50, 10, "grey");
  create_platform(1225, 30, 50, 10, "grey");
  create_lava(1255, 20, 10, 50);
  create_platform(1300, 30, 40, 10, "grey");
  create_lava(1375, -120, 3, 280);
  create_platform(1450, 30, 100, 10, "grey");
  create_lava(1650, 170, 10, 50);
  create_lava(1850, 180, 10, 40);
  create_platform(2400, -195, 600, 10, "grey");
  create_lava(2375, -225, 10, 50);
  create_lava(2140, -220, 10, 40);
  create_lava(2200, -215, 10, 30);
  create_lava(2275, -225, 10, 50);
  create_lava(2450, -220, 10, 40);
  create_lava(2500, -225, 10, 50);
  create_lava(2560, -215, 10, 30);
  create_lava(2695, 0, 3, 340);
  create_lava(2800, 0, 3, 340);
  create_platform(2750, -240, 60, 10, "grey");
  create_lava(2840, -220, 10, 40);
  create_lava(2885, -220, 10, 40);
  create_lava(2940, -220, 10, 40);
  create_lava(2995, -225, 10, 50);
  create_lava(3050, -210, 10, 20);
  create_lava(3120, -220, 10, 40);
  create_lava(3200, -226, 10, 52);
  create_lava(3275, -225, 10, 50);
  create_lava(3330, -220, 10, 40);
  create_lava(3400, -225, 10, 50);
  create_platform(3200, -195, 800, 10, "grey");
  create_lava(3601.5, 0, 3, 8000);
  create_lava(2300, 175, 10, 40);
  create_lava(2360, 170, 10, 50);
  create_lava(2440, 180, 10, 30);
  create_lava(2500, 170, 10, 50);
  create_lava(2510, 180, 10, 30);

  elevator0 = createSprite(875, 140, 40, 10);
  elevator0.shapeColor = "grey";
  elevator0.velocity.y = -1;
  elevator1 = createSprite(1350, 10, 40, 10);
  elevator1.shapeColor = "grey";
  elevator1.velocity.y = -2;
  elevator2 = createSprite(1950, 1, 40, 10);
  elevator2.shapeColor = "grey";
  elevator2.velocity.y = 2;
  elevator3 = createSprite(2020, -1, 40, 10); // Oops bad nostalgia (2020)
  elevator3.shapeColor = "grey";
  elevator3.velocity.y = -2;

  elevators.push(elevator0);
  elevators.push(elevator1);
  elevators.push(elevator2);
  elevators.push(elevator3);

  // ENEMIES /////////////////////////////////////////////////////////////////
  enemy0 = createSprite(100, 185, 20, 16.5);
  enemy0.setCollider("rectangle", 0, 0, 20, 16.5);
  enemy0.velocity.x = 2;
  enemy1 = createSprite(380, 185, 20, 16.5);
  enemy1.setCollider("rectangle", 0, 0, 20, 16.5);
  enemy1.velocity.x = 1;
  enemy2 = createSprite(490, 185, 20, 16.5);
  enemy2.setCollider("rectangle", 0, 0, 20, 16.5);
  enemy2.velocity.x = -0.5;
  enemy3 = createSprite(700, 185, 20, 16.5);
  enemy3.setCollider("rectangle", 0, 0, 20, 16.5);
  enemy3.velocity.x = 1;
  enemy4 = createSprite(1200, 15, 20, 16.5);
  enemy4.setCollider("rectangle", 0, 0, 20, 16.5);
  enemy4.velocity.x = 1.5;
  enemy5 = createSprite(1720, 185, 20, 16.5);
  enemy5.setCollider("rectangle", 0, 0, 20, 16.5);
  enemy5.velocity.x = 1;
  enemy6 = createSprite(1690, 185, 20, 16.5);
  enemy6.setCollider("rectangle", 0, 0, 20, 16.5);
  enemy6.velocity.x = -1.5;

  enemy0.shapeColor = "#FF69B4";
  enemy1.shapeColor = "#FF69B4";
  enemy2.shapeColor = "#FF69B4";
  enemy3.shapeColor = "#FF69B4";
  enemy4.shapeColor = "#FF69B4";
  enemy5.shapeColor = "#FF69B4";
  enemy6.shapeColor = "#FF69B4";

  enemies.push(enemy0);
  enemies.push(enemy1);
  enemies.push(enemy2);
  enemies.push(enemy3);
  enemies.push(enemy4);
  enemies.push(enemy5);
  enemies.push(enemy6);
  /////////////////////////////////////////////////////////////////////////////
}

function setup() {
  createCanvas(900, 600);
}

function draw() {
  background("#87CEEB");
  player.debug = true;
  
  // CAMERA STUFF //////////////////////////////
  let x_translation = width / 2 - player.position.x * 3;
  if (x_translation > 100) {
    x_translation = 100;
  }
  let y_translation = height / 2 - player.position.y * 3;
  if (y_translation < 0) {
    y_translation = 0;
  }

  translate(x_translation, y_translation);
  scale(3);

  /////////////////////////////////////////////// ELEVATOR
  if (elevator0.position.y < 40 || elevator0.position.y > 170) {
    elevator0.velocity.y = -elevator0.velocity.y;
  }
  if (elevator1.position.y < -275 || elevator1.position.y > 25) {
    elevator1.velocity.y = -elevator1.velocity.y;
  }
  if (elevator2.position.y < -10 || elevator2.position.y > 170) {
    elevator2.velocity.y = -elevator2.velocity.y;
  }
  if (elevator3.position.y < -170 || elevator3.position.y > 10) {
    elevator3.velocity.y = -elevator3.velocity.y;
  }

  //  Apply gravity to our player
  
  if (player.position.y < 180 || player.velocity.y < 7) {
    if (Can_jump == false) {
      player.velocity.y += gravity;
    }
  }

  // Loop through our platforms (and lava and enemies) and apply collision
  Count = 0;
  for (var i = 0; i < platforms.length; i++) {
    if (player.collide(platforms[i])) {
      on_platform(platforms[i]);
      Count++;
    }
    if (Count == 0) {
      Can_jump = false;
    }
  }
  for (var k = 0; k < elevators.length; k++) {
    if (player.collide(elevators[k])) {
      on_platform(elevators[k]);
      Count++;
    }
    if (Count == 0) {
      Can_jump = false;
    }
  }
  for (var j = 0; j < finish_points.length; j++) {
    if (player.collide(finish_points[j])) {
      on_finish_point();
    }
  }

  for (var l = 0; l < lava.length; l++) {
    if (player.collide(lava[l])) {
      ded();
    }
    if (enemy0.collide(lava[l])) {
      enemy0.velocity.x = -enemy0.velocity.x;
    }
    if (enemy1.collide(lava[l])) {
      enemy1.velocity.x = -enemy1.velocity.x;
    }
    if (enemy2.collide(lava[l])) {
      enemy2.velocity.x = -enemy2.velocity.x;
    }
    if (enemy3.collide(lava[l])) {
      enemy3.velocity.x = -enemy3.velocity.x;
    }
    if (enemy4.collide(lava[l])) {
      enemy4.velocity.x = -enemy4.velocity.x;
    }
    if (enemy5.collide(lava[l])) {
      enemy5.velocity.x = -enemy5.velocity.x;
    }
    if (enemy6.collide(lava[l])) {
      enemy6.velocity.x = -enemy6.velocity.x;
    }
  }
  for (var n = 0; n < enemies.length; n++) {
    if (player.collide(enemies[n])) {
     ded();
    }
  }

  // Draw our sprites
  drawSprites();

  // HANDLING USER INPUTS //////////////////////////////////////////
  if (dead == false) {
    if (player.velocity.y < 0) {
      player.changeAnimation("jump");
    } else if (player.velocity.y > 0 && Can_jump == false) {
      player.changeAnimation("fall");
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      player.velocity.x = 2.5;
      player.mirrorX(1);
      if (Can_jump == true) {
        player.changeAnimation("run");
      }
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      player.velocity.x = -2.5;
      player.mirrorX(-1);
      if (Can_jump == true) {
        player.changeAnimation("run");
      }
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      Can_jump = false;
    } else {
      player.velocity.x = 0;
      if (Can_jump == true) {
        player.changeAnimation("idle");
      }
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)) {
      jump(player);
    }

    // HANDLING TIMER ////////////////////////////////////////////////
    frames++;
  }
  seconds = round(frames / 60, 2);
  text(seconds, -(x_translation / 3) + 8, -y_translation / 3 + 20);
  //////////////////////////////////////////////////////////////////
  // TEXT IN GAME
  text("Playtesters: Henry K, Lucas K",25,70)
  text("---->", 25, 100);
  text("--->", 250, 150);
  text("up", 850, 175);
  text("----->", 950, 0);
  text("Go down, trust", 2710, -225);
  text("NOT A PRANK", 2710, -275);
  text("Bruh, I told you. Go back <--", 3450, -225);
  textSize(5);
  text("By playing this game, you agree to not cheat, exploit, or pirate this game.", 20, 110)
  text("This is a reminder that piracy is illegal under the Protecting Intellectual Rights Against Theft and Expropriation Act of 2004.",20, 116)
  text(" ''$(uff3d (@t g@m3'' is copyrighted by the Lucas K organization.'' ", 19, 122)
  text("No animals were harmed in the making of this videogame.", 20, 128)
  
  //LEADERBOARD
  text("1st: 26.63 - LJK", -x_translation / 3 + 5, -y_translation / 3 + 30);
  text("2nd: 26.75 - AJV", -x_translation / 3 + 5, -y_translation / 3 + 36);
  text("3rd: 38.63 - HGK", -x_translation / 3 + 5, -y_translation / 3 + 42);
  text("Hold down arrow to get unstuck (if stuck on bottom)",530,120)
  
//FACES OF ENEMIES
  fill("black");
  // Too lazy to untidy
  line(
    enemy0.position.x - 6,
    enemy0.position.y - 10,
    enemy0.position.x,
    enemy0.position.y - 6
  );
  line(
    enemy0.position.x + 6,
    enemy0.position.y - 10,
    enemy0.position.x,
    enemy0.position.y - 6
  );
  ellipse(enemy0.position.x - 5, enemy0.position.y - 5, 1, 4);
  ellipse(enemy0.position.x + 5, enemy0.position.y - 5, 1, 4);
  arc(enemy0.position.x, enemy0.position.y + 5, 10, 5, PI, 0, OPEN);
  line(
    enemy1.position.x - 6,
    enemy1.position.y - 10,
    enemy1.position.x,
    enemy1.position.y - 6
  );
  line(
    enemy1.position.x + 6,
    enemy1.position.y - 10,
    enemy1.position.x,
    enemy1.position.y - 6
  );
  ellipse(enemy1.position.x - 5, enemy1.position.y - 5, 1, 4);
  ellipse(enemy1.position.x + 5, enemy1.position.y - 5, 1, 4);
  arc(enemy1.position.x, enemy1.position.y + 5, 10, 5, PI, 0, OPEN);
  line(
    enemy2.position.x - 6,
    enemy2.position.y - 10,
    enemy2.position.x,
    enemy2.position.y - 6
  );
  line(
    enemy2.position.x + 6,
    enemy2.position.y - 10,
    enemy2.position.x,
    enemy2.position.y - 6
  );
  ellipse(enemy2.position.x - 5, enemy2.position.y - 5, 1, 4);
  ellipse(enemy2.position.x + 5, enemy2.position.y - 5, 1, 4);
  arc(enemy2.position.x, enemy2.position.y + 5, 10, 5, PI, 0, OPEN);
  line(
    enemy3.position.x - 6,
    enemy3.position.y - 10,
    enemy3.position.x,
    enemy3.position.y - 6
  );
  line(
    enemy3.position.x + 6,
    enemy3.position.y - 10,
    enemy3.position.x,
    enemy3.position.y - 6
  );
  ellipse(enemy3.position.x - 5, enemy3.position.y - 5, 1, 4);
  ellipse(enemy3.position.x + 5, enemy3.position.y - 5, 1, 4);
  arc(enemy3.position.x, enemy3.position.y + 5, 10, 5, PI, 0, OPEN);
  line(
    enemy4.position.x - 6,
    enemy4.position.y - 10,
    enemy4.position.x,
    enemy4.position.y - 6
  );
  line(
    enemy4.position.x + 6,
    enemy4.position.y - 10,
    enemy4.position.x,
    enemy4.position.y - 6
  );
  ellipse(enemy4.position.x - 5, enemy4.position.y - 5, 1, 4);
  ellipse(enemy4.position.x + 5, enemy4.position.y - 5, 1, 4);
  arc(enemy4.position.x, enemy4.position.y + 5, 10, 5, PI, 0, OPEN);
  line(
    enemy5.position.x - 6,
    enemy5.position.y - 10,
    enemy5.position.x,
    enemy5.position.y - 6
  );
  line(
    enemy5.position.x + 6,
    enemy5.position.y - 10,
    enemy5.position.x,
    enemy5.position.y - 6
  );
  ellipse(enemy5.position.x - 5, enemy5.position.y - 5, 1, 4);
  ellipse(enemy5.position.x + 5, enemy5.position.y - 5, 1, 4);
  arc(enemy5.position.x, enemy5.position.y + 5, 10, 5, PI, 0, OPEN);
  line(
    enemy6.position.x - 6,
    enemy6.position.y - 10,
    enemy6.position.x,
    enemy6.position.y - 6
  );
  line(
    enemy6.position.x + 6,
    enemy6.position.y - 10,
    enemy6.position.x,
    enemy6.position.y - 6
  );
  ellipse(enemy6.position.x - 5, enemy6.position.y - 5, 1, 4);
  ellipse(enemy6.position.x + 5, enemy6.position.y - 5, 1, 4);
  arc(enemy6.position.x, enemy6.position.y + 5, 10, 5, PI, 0, OPEN);
}
