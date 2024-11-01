// reactapp/src/FoxAnimation/omponents/FoxAnimation.js
// Note: phaser was installed for this project, to uninstall - in reactapp, run `npm uninstall phaser`

import React, { useEffect } from 'react';
import Phaser from 'phaser';
import "./FoxAnimation.css";

let game;

const FoxAnimation = () => {
  useEffect(() => {
    if (!game) { 
      const config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 800,
        scale: {
          autoCenter: Phaser.Scale.CENTER_BOTH 
        },
        scene: {
          preload: function() {
            this.load.spritesheet('fox', require('./assets/fox-sprite-sheet.png'), {
              frameWidth: 32,
              frameHeight: 32
            });
          },
          create: function() {
            // Create the normal running animation (frames 0 to 8)
            this.anims.create({
              key: 'full-loop',
              frames: this.anims.generateFrameNumbers('fox', { start: 0, end: 8 }),
              frameRate: 10,
              repeat: -1
            });

            // Create the alternating animation (frames 6 and 7, repeated 30 times)
            this.anims.create({
              key: 'run',
              frames: [
                { key: 'fox', frame: 5 },
                { key: 'fox', frame: 6 }
              ],
              frameRate: 5, // Adjust speed as needed
              repeat: 29 // Repeat 29 times to get 30 alternations
            });

            // Add the fox sprite
            const fox = this.add.sprite(400, 300, 'fox').setScale(3);

            // Chain the animations
            fox.play('full-loop'); // Start with the normal run animation

            // Set a timer to trigger the alternating animation when it reaches frame 5
            this.time.addEvent({
              delay: 500, // Adjust delay based on frame rate and timing to reach frame 5
              callback: () => {
                fox.play('run'); // Play the alternating animation
                this.time.addEvent({
                  delay: 6000, // Delay to cover the 30 alternations
                  callback: () => {
                    fox.play('full-loop'); // Resume the normal running animation
                  }
                });
              }
            });
          }
        },
        parent: 'phaser-container'
      };

      game = new Phaser.Game(config);
    }

    return () => {
      if (game) {
        game.destroy(true, false);
        game = null;
      }
    };
  }, []);

  return (
    <div className="animation-page">
      <div id="phaser-container"></div>
    </div>
  );
};

export default FoxAnimation;
