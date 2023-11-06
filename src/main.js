// Vinh Ta
// The Snail Wants to Kill You
// First day, 4-5 hours; Second day, 2.5 hours; Third day, 8.5 hours
// Creative Tilt:
//      I produced all the assets other than one sample (unprocessed chomp). Pretty proud of the thematic feel of the game.
//      I think it invokes a calm sense of dread that fits the joke the game was based off of (the immortal snail that kills you)
//      As for technical aspects, I'm proud of using the camera as a practical joke, setting up the snail as the focalizer and anchor point.
//      This might not be worth as much, but I'm starting to figure out groups and call back functions a bit better.
//      Reading the Phaser documentation has been difficult, but I'm getting better at it.

// A BUNCH from Professor Nathan's github
//      https://github.com/nathanaltice
// Resize to screen
//      https://phaser.discourse.group/t/scaling-game-to-fit-entire-window/6219/2
// Animations from texture atlas
//      https://phaser.io/examples/v3/view/animation/create-animation-from-texture-atlas
// Tint
//      https://phaser.io/examples/v3/view/display/tint/tint-and-alpha
// Destroying children (I don't think this actually stayed in because it didn't work)
//      https://phaser.io/examples/v3/view/game-objects/group/destroy-child
// Camera fade in
//      https://phaser.io/examples/v3/view/camera/camera-fade-in-and-out
// Passing data
//      https://phaser.io/examples/v3/view/scenes/passing-data-to-a-scene


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