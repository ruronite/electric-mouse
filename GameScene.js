let gameState = {
    player: {},
    computer: {},
    computerSprite: {},
    playerHealthBar: {},
    computerHealthBar: {},
    attackButton: {},
    defendButton: {},
    specialButton: {},
    information: {},
    playerMove: {},
    computerMove: {},
    waveCount: 0,
    opponents: []
  };
  
  class GameScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'GameScene'
      });
    }
  
    preload() {
        //loads images for buttons
      const baseURL = 'https://content.codecademy.com/courses/learn-phaser/electric-mouse/'
      this.load.image('Background', `${baseURL}background.png`);
      this.load.image('Attack', `${baseURL}button-attack.png`);
      this.load.image('Defend', `${baseURL}button-defend.png`);
      this.load.image('Special', `${baseURL}button-special.png`);
    
      const framePxWidth = 1500 / 9;
      this.load.spritesheet('Electric Mouse', `${baseURL}electric-mouse.png`, {
        frameWidth: framePxWidth,
        frameHeight: 128,
        endFrame: 8
      });
      this.load.spritesheet('Owl', `${baseURL}owl.png`, {
        frameWidth: framePxWidth,
        frameHeight: 132,
        endFrame: 8
      });
      this.load.spritesheet('Red Owl', `${baseURL}owl-red.png`, {
        frameWidth: framePxWidth,
        frameHeight: 132,
        endFrame: 8
      });
      this.load.spritesheet('Blue Owl', `${baseURL}owl-blue.png`, {
        frameWidth: framePxWidth,
        frameHeight: 132,
        endFrame: 8
      });
      this.load.spritesheet('Psychic Hairless Cat', `${baseURL}psychic-cat.png`, {
        frameWidth: framePxWidth,
        frameHeight: 148,
        endFrame: 11
      });
    } // End of Preload
  
    create() {
      // Character objects
      // Add the player object below:
      gameState.player = {
        name: 'Electric Mouse',
        health: 45,
        frames: [{
          key: 'playerIdle',
          start: 0,
          end: 2
        },
        {
          key: 'playerAttack',
          start: 3,
          end: 4
        },
        {
          key: 'playerDefend',
          start: 5,
          end: 6
        },
        {
          key: 'playerSpecial',
          start: 7,
          end: 8
        }]
      }
  
      gameState.opponents = [{
        name: 'Owl',
        health: 10,
        frames: [{
          key: 'OwlIdle',
          start: 0,
          end: 2
        },
        {
          key: 'OwlAttack',
          start: 3,
          end: 4
        },
        {
          key: 'OwlDefend',
          start: 5,
          end: 6
        },
        {
          key: 'OwlSpecial',
          start: 7,
          end: 8
        },
        ]
      },
      {
        name: 'Red Owl',
        health: 12,
        frames: [{
          key: 'Red OwlIdle',
          start: 0,
          end: 2
        },
        {
          key: 'Red OwlAttack',
          start: 3,
          end: 4
        },
        {
          key: 'Red OwlDefend',
          start: 5,
          end: 6
        },
        {
          key: 'Red OwlSpecial',
          start: 7,
          end: 8
        },
        ]
      },
      {
        name: 'Blue Owl',
        health: 15,
        frames: [{
          key: 'Blue OwlIdle',
          start: 0,
          end: 2
        },
        {
          key: 'Blue OwlAttack',
          start: 3,
          end: 4
        },
        {
          key: 'Blue OwlDefend',
          start: 5,
          end: 6
        },
        {
          key: 'Blue OwlSpecial',
          start: 7,
          end: 8
        },
        ],
      },
      {
        name: 'Psychic Hairless Cat',
        health: 30,
        frames: [{
          key: 'Psychic Hairless CatIdle',
          start: 0,
          end: 3
        },
        {
          key: 'Psychic Hairless CatAttack',
          start: 4,
          end: 7
        },
        {
          key: 'Psychic Hairless CatDefend',
          start: 8,
          end: 9
        },
        {
          key: 'Psychic Hairless CatSpecial',
          start: 10,
          end: 11
        },
        ]
      }
      ];
  
      // Set the current opponent below:
      gameState.computer = gameState.opponents[0];
  
      // Adds in the background
      this.add.sprite(240, 320, 'Background').setScale(.5);
  
      // Creates the initial sprites
      gameState.player.sprite = this.add.sprite(115, 275, 'Electric Mouse')
      gameState.computerSprite = this.add.sprite(375, 275, 'Owl') // first enemy
  
      // Creates all of the player animations
      gameState.player.frames.forEach(frame => {
        this.anims.create({
          key: frame.key,
          frames: this.anims.generateFrameNumbers(gameState.player.name, {
            start: frame.start,
            end: frame.end,
          }),
          frameRate: 3,
          repeat: -1,
          yoyo: true
        });
      });
  
      // Creates all the computer animations for each opponent
      gameState.opponents.forEach(opponent => {
        opponent.frames.forEach(frame => {
          this.anims.create({
            key: frame.key,
            frames: this.anims.generateFrameNumbers(opponent.name, {
              start: frame.start,
              end: frame.end
            }),
            frameRate: 3,
            repeat: -1,
            yoyo: true
          });
        });
      });
  
      // Plays initial animation
      gameState.player.sprite.anims.play('playerIdle');
      gameState.computerSprite.anims.play(`${gameState.computer.name}Idle`);
  
      // Renders the buttons in game and allows them to be clicked
      gameState.attackButton = this.add.sprite(90, 550, 'Attack').setInteractive();
      gameState.defendButton = this.add.sprite(240, 550, 'Defend').setInteractive();
      gameState.specialButton = this.add.sprite(390, 550, 'Special').setInteractive();
      // My button
      //gameState.jitsuButton = this.add.sprite(40, 550, 'Jitsu').setInteractive();
  
      // Add your information text and styling below: 
    let style = {
      font: '16px Helvetica',
      fill: '#000000',
      padding: {x:6, y:7}
    };
    gameState.playerMove = this.add.text(65,140,'', style);
  
  gameState.computerMove = this.add.text(320, 140, '', style);
  
  gameState.information = this.add.text(140,80,'',style);
  
  gameState.playerHealthBar = this.add.text(45, 45, `HP: ${gameState.player.health}`, style);
  
  gameState.computerHealthBar = this.add.text(375, 45, `HP: ${gameState.computer.health}`, style)
  
  
      // Attack button logic:
      gameState.attackButton.on('pointerup', () => {
        this.pauseIdle()
        if (game.input.enabled) {
          // Add your code for Electric Mouse attacking below:
          let randomMove = Math.floor(Math.random()* 3);
          if(randomMove === 0){
            // Display The move of the player and computer.
            gameState.playerMove.text = "Attack!";
            gameState.computerMove.text = "Attack!";
            // subtracting 1 from both player and computer health
            gameState.player.health --
            gameState.computer.health --
            //Updates the health bar display
            gameState.playerHealthBar.text = `HP: ${gameState.player.health}`;
            gameState.computerHealthBar.text= `HP: ${gameState.computer.health}`;
            // Display result of the moves by the player and computer
            gameState.information.text = `Electric Mouse and ${gameState.computer.name} lost 1 point each`;
            //Plays animation for player and computer
            gameState.player.sprite.anims.play('playerAttack');
            gameState.computerSprite.anims.play(gameState.computer.name + 'Attack');
  
          }
          else if (randomMove === 1){
            // Display Player and computer moves
            gameState.playerMove.text = "Attack";
            gameState.computerMove.text = "Defend";
            // Subtract from Player health
            gameState.player.health --
            //updates healthbar
            gameState.playerHealthBar.text = `HP: ${gameState.player.health}`;
            //Display result of moves by the player and computer
            gameState.information.text = `Electric Mouse lost 1 point`;
            // play animations
            gameState.player.sprite.anims.play('playerAttack');
            gameState.computerSprite.anims.play(gameState.computer.name + "Defend")
          }
          else{
            //Display moves
            gameState.playerMove.text = "Attack!";
            gameState.computerMove.text = "Special Attack!!";
  
            // update Computer health point
            gameState.computer.health -= 5;
            //Update health bar
            gameState.computerHealthBar.text = `HP: ${gameState.computer.health}`;
            // shows result of player and opponent choices.
            gameState.information.text = `${gameState.computer.name} loses 5 points`;
            //Plays animation for player and computer
            gameState.player.sprite.anims.play('playerAttack');
            gameState.computerSprite.anims.play(gameState.computer.name + `Special`);
  
          }   
        }
      });
      
      // Defend button logic:
      gameState.defendButton.on('pointerup', () => {
        this.pauseIdle()
        if (game.input.enabled) {
          // Add your code for Electric Mouse defending below:
          let randomMove = Math.floor(Math.random()* 3);
          if(randomMove === 0){
            //Display moves chosen
            gameState.playerMove.text = "Defend!";
            gameState.computerMove.text = "Attack!";
            //update value of health
            gameState.computer.health --
            //Update health bar
            gameState.computerHealthBar.text = `HP: ${gameState.computer.health}`;
            //Display result of the player and computer interaction
            gameState.information.text = `${gameState.computer.name} loses 1 point`
            //play animation
            gameState.player.sprite.anims.play('playerDefend');
            gameState.computerSprite.anims.play(gameState.computer.name + `Attack`);
          }
          else if (randomMove === 1){
            //Display moves
             gameState.playerMove.text = "Defend!";
            gameState.computerMove.text = "Defend!";
            // Health remains unchanged
            //Display result of player and Enemy moves
            gameState.information.text = `Electric mouse and ${gameState.computer.name} points remain unchanged`;
            //Play animation
            gameState.player.sprite.anims.play('playerDefend');
            gameState.computerSprite.anims.play(gameState.computer.name + `Defend`);
          }
          else{
            //Display moves
             gameState.playerMove.text = "Defend!";
            gameState.computerMove.text = "Special Attack!";
            //update health Values
            gameState.player.health -= 4
            //update healthbar text
            gameState.playerHealthBar.text = `HP: ${gameState.player.health}`;
            //Display  result of player and enemy moves
            gameState.information.text = `Electric Mouse loses 4 points`
            //Play animations
            gameState.player.sprite.anims.play('playerDefend');
            gameState.computerSprite.anims.play(gameState.computer.name + `Special`);
          }
  
        }
      });
      
      // Special Attack button logic (use for reference):
      gameState.specialButton.on('pointerup', () => {
        this.pauseIdle()
        if (game.input.enabled) {
          let randomMove = Math.floor(Math.random() * 3);
          if (randomMove === 0) {
            gameState.information.text = `The player loses 1 HP!`;
            gameState.playerMove.text = 'Special Attack!';
            gameState.computerMove.text = 'Attack!';
            gameState.player.health -= 1;
            gameState.playerHealthBar.text = `HP: ${gameState.player.health}`;
            gameState.player.sprite.anims.play('playerSpecial');
            gameState.computerSprite.anims.play(`${gameState.computer.name}Attack`);
          } else if (randomMove === 1) {
            gameState.information.text = `The ${gameState.computerSprite.texture.key} loses 4 HP!`;
            gameState.playerMove.text = 'Special Attack!';
            gameState.computerMove.text = 'Defend!';
            gameState.computer.health -= 4;
            gameState.computerHealthBar.text = `HP: ${gameState.computer.health}`;
            gameState.player.sprite.anims.play('playerSpecial');
            gameState.computerSprite.anims.play(`${gameState.computer.name}Defend`);
          } else {
            gameState.information.text = `You both lose 10 HP!`;
            gameState.playerMove.text = 'Special Attack!';
            gameState.computerMove.text = 'Special Attack!';
            gameState.player.health -= 10;
            gameState.playerHealthBar.text = `HP: ${gameState.player.health}`;
            gameState.computer.health -= 10;
            gameState.computerHealthBar.text = `HP: ${gameState.computer.health}`;
            gameState.player.sprite.anims.play('playerSpecial');
            gameState.computerSprite.anims.play(`${gameState.computer.name}Special`);
          }
        }
      });
    } // End of Create
  
    update() {
      this.waveCheck();
    } // End of Update 
  
    // Helper Functions
    // Check to see that the game is still running and plays the animation of the idle animation current enemy and Electric Mouse
    pauseIdle() {
      setTimeout(function () {
        if (gameState.waveCount !== 4 && gameState.player.health > 0) {
          gameState.player.sprite.anims.play('playerIdle');
          gameState.computerSprite.anims.play(`${gameState.computer.name}Idle`);
        }
      }, 1000)
    }
  
    // Manages the logic of changing the enemy waves
    waveCheck() {
      if (gameState.computer.health <= 0) {
        gameState.waveCount++;
        gameState.information.text = `The ${gameState.computer.name} has fainted!`;
        gameState.computer = gameState.opponents[gameState.waveCount];
        gameState.playerMove.text = '';
        gameState.computerMove.text = '';
        if (gameState.waveCount > 3) {
          this.scene.stop('GameScene');
          this.scene.start('EndScene');
        } else if (gameState.waveCount < 3) {
          game.input.enabled = false;
          setTimeout(function () {
            const text = gameState.waveCount === 3
              ? 'The Final Boss, the Psychic Hairless Cat!'
              : `A ${gameState.computer.name} appears`;
            gameState.information.text = text;
            gameState.computerHealthBar.text = `HP: ${gameState.computer.health}`;
            gameState.computerSprite.setTexture(gameState.computer.name);
            setTimeout(function () {
              game.input.enabled = true;
            }, 1500);
          }, 1000);
        }
      } else if (gameState.player.health <= 0) {
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
      }
    }
  
  } // end GameScene