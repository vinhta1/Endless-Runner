// Vinh Ta
// The Snail Wants to Kill You
// First day, 4-5 hours; Second day, 2.5 hours + 4.5 hours

// Resize to screen
//      https://phaser.discourse.group/t/scaling-game-to-fit-entire-window/6219/2
// Animations from texture atlas
//      https://phaser.io/examples/v3/view/animation/create-animation-from-texture-atlas
// Tint
//      https://phaser.io/examples/v3/view/display/tint/tint-and-alpha
// Destroying children
//      https://phaser.io/examples/v3/view/game-objects/group/destroy-child


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
            debug: true //true
        }
    },
    scene: [Load, Menu, Play, Over]
}

let game = new Phaser.Game(config);

let cursors;