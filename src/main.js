// Vinh Ta
// The Snail Wants to Kill You
// First day, 4-5 hours

// Resize to screen
//      https://phaser.discourse.group/t/scaling-game-to-fit-entire-window/6219/2
// Animations from texture atlas
//      https://phaser.io/examples/v3/view/animation/create-animation-from-texture-atlas

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT
    },
    render: {
      pixelArt: true  
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false //true
        }
    },
    scene: [Load, Play]
}

let game = new Phaser.Game(config);

let cursors;