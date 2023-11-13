let canvas;
let context;
let c;
let s;
let k;
let g;
let gameStart = false;

let fpsInterval = 1000 / 60;
let now;
let then = Date.now();


let request_id;

let totalScore = 0;

let floor;

let moveLeft = false;
let moveRight = false;
let moveUp = false;

let jumpHeight;
jumpHeight = 20;
let time;
let timespeed;

let player = {
    x : 0,
    y : 1000,
    width :160,
    height : 160,
    frameX : 0,
    frameY : 0,
    health : 9,
    xChange : 0,
    yChange : 0,
    immunity : false,
    inAir : false
};
let slimeCount = 0;
let totalslime = [];
let slime;

//player sprite
let playerImgWalkRight = new Image();
let playerImgWalkLeft = new Image();
let playerImgIdle = new Image();
let playerImgBlink = new Image();
let playerImgSit = new Image();
let playerImgJump = new Image();
let playerImgLand = new Image();
let playerHurt = new Image();

//kitten sprite
let kitten1 = new Image();
let kitten2 = new Image();
let kitten3 = new Image();
let kitten4 = new Image();
let kitten5 = new Image();
let kittenArray =[];
let totalKitten = 0;
let kittenSprite;
let randomKitten;
let currentKittenSprite;

//Ghost
let ghost = new Image();
let ghostArray = [];
let ghostaudio = new Audio();

//idle animation
let currentSprite;
currentSprite = playerImgIdle;

//background image
let backgroundImg = new Image();
let bgPosition = 0;
let bgPositionY = 0;
let tileSet = new Image();

//slime
let enemySlime = new Image();
let enemySlimeDeath = new Image();

//coins
let coins = [];
let totalcoins = 0;
let goldCoins = new Image();
let coinSound = new Audio();

//ALL audio
let jumpAudio = new Audio();
let kittenSave = new Audio();
let slimeKill = new Audio();
let slimedmg = new Audio();
let meow = new Audio();

let replay;
let backgroundAudio1 = new Audio;
let backgroundAudio2 = new Audio;
let backgroundAudio3 = new Audio;


//Dmg & Immunity
let healthBar = false;
let showHealthBar;
let immunityTime;

//
let button =[];
let scoreButton =[];
let score =0;

const floorCollision = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 4446, 4446, 4446, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4446, 4446, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


class floorCollisionBlock {
    constructor( {position, height = 16, margin = 2} ) {
        this.position = position
        this.width = 16;
        this.height = height;
        this.margin = margin;
    };
}


let floorCollision2D = [];
for (let i = 0; i < floorCollision.length; i+=80) {
    floorCollision2D.push(floorCollision.slice(i, i + 80))
}


let floorCollisionBlockInputs=[];   // Platforms
for (let r= 0; r < 45; r+=1) {
    for (let c = 0; c < 80; c+=1) {
        let platform = floorCollision2D[r][c];
        if ( platform > 0 ) {
            floorCollisionBlockInputs.push(
                new floorCollisionBlock({
                    position: {
                        x:c * 16,
                        y:r * 16,
                    },
            })
            )
        }
    }
}





document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    
    floor = canvas.height -90;

    kittenSprite = [kitten1, kitten2, kitten3, kitten4, kitten5];
    randomKitten = randint(0,4);
    currentKittenSprite = kittenSprite[randomKitten];

    canvas.addEventListener("click", function deactivateStoryClick() {
        gameStart = true;
        backgroundAudio2.loop = true;
        backgroundAudio2.play()
        backgroundAudio2.volume = 0.5;
        time = 0;
        canvas.removeEventListener("click", deactivateStoryClick);
    })

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
 
    

    load_assets([
        {"var" : playerImgIdle, "url" : "static/cat/nekoIdle.png"},
        {"var" : playerImgBlink, "url" : "static/cat/nekoBlink.png"},
        {"var" : playerImgSit, "url" : "static/cat/nekoSit.png"},
        {"var" : playerImgWalkRight, "url" : "static/cat/nekoWalk.png"},
        {"var" : playerImgWalkLeft, "url" : "static/cat/nekoWalkback.png"},
        {"var" : playerHurt, "url" : "static/cat/nekoHurt.png"},
        {"var" : kitten1, "url" : "static/kitten/kitten1.png"},
        {"var" : kitten2, "url" : "static/kitten/kitten2.png"},
        {"var" : kitten3, "url" : "static/kitten/kitten3.png"},
        {"var" : kitten4, "url" : "static/kitten/kitten4.png"},
        {"var" : kitten5, "url" : "static/kitten/kitten5.png"},
        {"var": backgroundImg, "url" : "static/forest/Platform.png"},
        {"var" : enemySlime, "url" : "static/slime/slimeMove.png"},
        {"var" : enemySlimeDeath, "url" : "static/slime/hitanddeath.png"},
        {"var" : goldCoins, "url" : "static/forest/coin.png"},
        {"var" : coinSound, "url" : "static/audio/coinSound.wav"},
        {"var" : jumpAudio, "url" : "static/audio/jump.mov"},
        {"var" : slimedmg, "url" : "static/audio/dmg.wav"},
        {"var" : slimeKill, "url" : "static/audio/slimeKill.wav"},
        {"var" : meow, "url" : "static/audio/meow1.mp3"},
        {"var" : backgroundAudio1, "url" : "static/audio/Chillax.mp3"},
        {"var" : backgroundAudio2, "url" : "static/audio/Evergreen.mp3"},
        {"var" : backgroundAudio3, "url" : "static/audio/Shizzle.mp3"},
        {"var" : ghost, "url" : "static/Ghost/ghost-Sheet.png"},
        {"var" : ghostaudio, "url" : "static/audio/boo.wav"},
    ], animate);

}
//Put music in init, and then create a new function to loop music, OR! (just loop 1 song is enough)

//All sprites were custom adjusted by me. Sorry for the messy code
//This is used for it's still 60fps but animations run at their own fps 

//Player Frame to run at 8fps
function updatePlayerFrame() {                           
    player.frameX = (player.frameX + 1) % 8;                     
    animate();
}
setInterval(updatePlayerFrame, 125);

//Idle Frame to run at 11fps
function SwitchSprites() {          
    if (currentSprite === playerImgIdle) {
        currentSprite = playerImgBlink;
        setTimeout(SwitchSprites, 2000);

    } else if (currentSprite === playerImgBlink) {
        currentSprite = playerImgSit;
        setTimeout(SwitchSprites, 4000);
    } else {
        currentSprite = playerImgIdle;
        setTimeout(SwitchSprites, 5000);
    }
    animate();
}
setTimeout(SwitchSprites, 11000);

//Slime Frame to run at 8fps
function updateEnemySlime() {                           
    for (let slime of totalslime) {
        slime.frameX = (slime.frameX + 1) % 13;             // I only have 8 frames           
        animate();
    }
}
setInterval(updateEnemySlime, 1000/13);

//Coin Frame runs at 9fps
function updateCoin() {                           
    for (let c of coins) {
        c.frameX = (c.frameX + 1) % 9;             
        animate();
    }
}
setInterval(updateCoin, 1000/9);

function updatekitten() {                           
    for (let k of kittenArray) {
        k.frameX = (k.frameX + 1) % 24;
        animate();
    }
}
setInterval(updatekitten, 1000/24);

function updateGhost() {                           
    for (let g of ghostArray) {
        g.frameX = (g.frameX + 1) % 4;
        animate();
    }
}
setInterval(updateGhost, 1000/4);


//Main Function Loop
function animate() {
    window.requestAnimationFrame(animate);
    let now = Date.now(); 
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }

    then = now - (elapsed % fpsInterval);    
    context.drawImage(backgroundImg, bgPosition, bgPositionY);
    if (!gameStart) {
        context.font = "bold 25px Arial";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("Click Anywhere to Start! Please wait for resources to load", canvas.width / 2, canvas.height / 2);
        return;
    }

    //winLose condition
    if (player.health < 1) {
        context.font = "bold 50px Arial";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("You lose", canvas.width / 2, canvas.height / 2);
        context.font = "bold 20px Arial";
        context.fillStyle = "black";
        context.fillText("Click 'Try Again' to play again", canvas.width / 2, canvas.height / 2 + 50);
        // create the button
        if(button.length < 1){
            let tryagain = document.createElement('button');
            tryagain.innerHTML = 'Try Again';
            tryagain.addEventListener('click', function() {
                window.location.reload();
            });
            
            // append the button to the document body
            document.body.appendChild(tryagain);
            button.push(tryagain);
        }
        stop();
        return;
    }
    //HealthBar when dmg
    if (showHealthBar) {
        context.fillStyle = 'Red';
        context.fillRect(player.x + 20, player.y + 80, player.width - 40, 10);
        context.fillStyle = 'Green';
        context.fillRect(player.x + 20, player.y + 80, ((player.width - 40) * (player.health / 9)), 10);
    }
    
    
    
    //Score
    context.save();
    context.textAlign = 'left';
    context.font = 'bold 36px Arial'
    context.fillStyle = 'white'
    context.fillText('Score: '+ score, 25, 50);
    context.fillStyle = 'white'
    context.fillText('Health: '+ player.health, 800, 50);
    context.fillStyle = 'white'
    context.fillText('Timer: '+ time, 400, 50);
    context.restore();

    timespeed = Math.floor(time / 30);
    //Coin Code
    if (coins.length < 1) {
        c = {
            x : randint(20, canvas.width -20),
            y: randint(100, floor - 100),
            width : 20,
            height : 20,
            frameX : 0,
            frameY : 0,
            health : 1,
            xChange : 0,
            yChange : 0,
            inAir : false
        };
        coins.push(c);
    };

    for (let c of coins) {
        context.drawImage(goldCoins,
        c.width * c.frameX, c.height * c.frameY, c.width, c.height,
        c.x, c.y + 30, c.width, c.height);
      };

    if (ghostArray.length < 5) {
        g = {
            x : 0,
            y: randint(0, floor-100),
            width : 128/4,
            height : 32,
            speed : randint(0.5, 2),
            frameX : 0,
            frameY : 0,
            health : 1,
            xChange : 0,
            yChange : 0,
            inAir : false
        };
        ghostArray.push(g);
    };

    for (let g of ghostArray) {
        context.drawImage(ghost,
        g.width * g.frameX, g.height * g.frameY, g.width, g.height,
        g.x, g.y, g.width, g.height);
      };


    //SlimeCode

    slimekill(player, totalslime);
    slimeDMG(player, totalslime); 
    kitten(player,kittenArray);
    ghostDMG(player,ghostArray);

    //Kitten Code
    if (kittenArray.length < 1) {
        k = {
          x: randint(20, canvas.width - 20),
          y: 10,
          width : 64,
          height : 64,
          frameX : 0,
          frameY : 0,
          xChange : 0,
          yChange : 0,
          inAir : false,
          spriteIndex: randint(0, kittenSprite.length - 1)
      };
        kittenArray.push(k);
    };

    for (let k of kittenArray) {
        let currentKittenSprite = kittenSprite[k.spriteIndex];
        context.drawImage(currentKittenSprite,
        k.width * k.frameX, k.height * k.frameY, k.width, k.height,
        k.x, k.y + 15, k.width, k.height);
      };

    
    if (coinCollect(player, coins)) {
        coins.pop(c);
    }

    if (totalslime.length < 5) {
        slime = {
          x: randint(20, canvas.width - 20),
          y: 10,
          width : 1664/13,
          height : 128,
          speed : randint(0.5, 2),
          frameX : 0,
          frameY : 0,
          health : 1,
          xChange : 0,
          yChange : 0,
          inAir : false
      };
        totalslime.push(slime);
    }
    
  for (let slime of totalslime) {
      context.drawImage(enemySlime,
      slime.width * slime.frameX, slime.height * slime.frameY, slime.width, slime.height,
      slime.x, slime.y + 30, slime.width, slime.height);
    }


    //Player Movement
    if ( moveLeft && moveRight) {
        context.drawImage(currentSprite,
            player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y +  30, player.width, player.height);
            context.clearImage();

    }

    if ( moveLeft && moveRight && player.inAir) {
        player.yChange = player.yChange + 0.9;
        player.y = player.y + player.yChange;
        if (player.y + player.height > floor) {
            player.inAir = false;
            player.y = floor - player.height;
            player.yChange = 0;
        }
    }

    if (! moveLeft && ! moveRight ||  moveLeft && moveRight && !player.inAir) {
        context.drawImage(currentSprite,
            player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y + 30, player.width, player.height);
       
    }
    
    if (moveRight) {
        player.x = player.x + 5;
        context.drawImage(playerImgWalkRight,
            player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y + 30, player.width, player.height);
    } 
    
    if (moveLeft) {
        player.x = player.x - 5;
        context.drawImage(playerImgWalkLeft,
            player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y +  30, player.width, player.height);
    }

    if (moveUp && ! player.inAir) {
        player.inAir = true;
        player.yChange = player.yChange - 15;
        jumpAudio.currentTime = 0;
        jumpAudio.volume = 0.4;
        jumpAudio.play();
    }
    
    //Slime Follow Player
    for (let slime of totalslime) {
        if (slime.x + slime.width != player.x + player.width -25 || 
            slime.x + slime.width != player.x + player.width / 2 ) {
          if (slime.x + slime.width >= player.x + player.width + 15 && slime.y + slime.height != player.y + player.height + 30) {
            slime.x = slime.x - slime.speed - timespeed;
          } else if (slime.x + slime.width <= player.x + player.width - 55  && slime.y + slime.height != player.y + player.height -50) {
            slime.x = slime.x + slime.speed + timespeed;
          } 
        }
      }
      
    
    //Gravity
    player.yChange = player.yChange + 0.9;
    for (let slime of totalslime) {
        slime.yChange = slime.yChange + 0.9;
    }
    for (let neko of kittenArray) {
        neko.yChange = neko.yChange + 0.9;
    }

    //Floor Collisions Player & Enemy
    if (player.y + player.height > floor) {
        player.inAir = false;
        player.y = floor - player.height;
        player.yChange = 0;
    }

    for (let slime of totalslime) {
        if (slime.y + slime.height > floor) {
            slime.inAir = false;
            slime.y = floor - slime.height;
            slime.yChange = 0;
        }
    }

    for (let neko of kittenArray) {
        if (neko.y + neko.height > floor) {
            neko.inAir = false;
            neko.y = floor - neko.height;
            neko.yChange = 0;
        }
    }

    //Player Collisions
    for (let i = 0; i < floorCollisionBlockInputs.length; i=i+1) {
        let platform = floorCollisionBlockInputs[i];  
        if (player.x < platform.position.x + platform.width &&
            player.x + player.width > platform.position.x &&
            player.y < platform.position.y + platform.height &&
            player.y + player.height > platform.position.y) {
                let onPlatform = platform.position.y;
            if (player.y + player.height <= onPlatform + player.yChange) {
                player.y = platform.position.y - player.height;
                player.yChange = 0;
                player.inAir = false;
              } 
            }
          }
    
          
    //Kitten Collisions     
    for (let j = 0; j < kittenArray.length; j=j+1) {
        let neko = kittenArray[j];
        for (let i = 0; i < floorCollisionBlockInputs.length; i=i+1) {
            let platform = floorCollisionBlockInputs[i];  
            if (neko.x < platform.position.x + platform.width &&
                neko.x + neko.width > platform.position.x &&
                neko.y < platform.position.y + platform.height &&
                neko.y + neko.height > platform.position.y) {
                    let onPlatform = platform.position.y;
                if (neko.y + neko.height <= onPlatform + neko.yChange) {
                    neko.y = platform.position.y - neko.height;
                    neko.yChange = 0;
                    neko.inAir = false;
                    } 
                }
            }
        }
    

    

    //Update the player
    player.x = player.x + player.xChange;
    player.y = player.y + player.yChange;

    //Update Kitten
    for (let neko of kittenArray) {
        neko.x = neko.x + neko.xChange;
        neko.y = neko.y + neko.yChange
    }

    //Update the enemy
    for (let slime of totalslime) {
    slime.x = slime.x + slime.xChange;
    slime.y = slime.y + slime.yChange;
    }

    
    for (let i = 0; i < ghostArray.length; i=i+1) {
        let g = ghostArray[i];
        if (g.x + g.width > canvas.width) {
            ghostArray.splice(i, 1);  
        } else {
            g.x = g.x + 1 + timespeed;
        }
    }

    if (player.x < -35) {
        player.x = -35;    
    } else if (player.x > canvas.width-player.width+50) {
        player.x = canvas.width-player.width+50;
    }

    //All slime collisions      
    for (let j = 0; j < totalslime.length; j=j+1) {
        let slime = totalslime[j];
        for (let i = 0; i < floorCollisionBlockInputs.length; i=i+1) {
            let platform = floorCollisionBlockInputs[i];  
            if (slime.x < platform.position.x + platform.width &&
                slime.x + slime.width > platform.position.x &&
                slime.y < platform.position.y + platform.height &&
                slime.y + slime.height > platform.position.y) {
                    let onPlatform = platform.position.y;
                if (slime.y + slime.height <= onPlatform + slime.yChange) {
                    slime.y = platform.position.y - slime.height;
                    slime.yChange = 0;
                    slime.inAir = false;
                    } 
                }
            }
        }
        
}

function countTime() {
    if (time >= 0) {
        time=time +1;
    }
}

setInterval(countTime, 1000)


function coinCollect(player, coins) {
    for (let i = 0; i < coins.length; i++) {
        let c = coins[i];
        if (c.x + 50 < player.x + player.width && 
            c.x + c.width - 50 > player.x &&
            c.y + 40 < player.y + player.height &&
            c.y + c.height -30> player.y) {
            coins.splice(i, 1);
            score += 1;
            totalcoins += 1;
            coinSound.currentTime = 0;
            coinSound.volume = 0.3;
            coinSound.play();
            console.log(totalcoins);
            // generate a new coin at a random position
            c = {
                x: randint(20, canvas.width - 20),
                y: randint(100, floor),
                width: 20,
                height: 20,
                frameX: 0,
                frameY: 0,
                inAir: false
            };
            coins.push(c);
            return true;
        }
    }
    return false;
}

function kitten(player, kittenArray) {
    for (let i = 0; i < kittenArray.length; i=i+1) {
        let kittens = kittenArray[i];
        if (kittens.x + 90 < player.x + player.width&&
            kittens.x + kittens.width - 70 > player.x &&
            kittens.y < player.y + player.height &&
            kittens.y + kittens.height -70 > player.y) {
                score += 5;
                kittenArray.splice(i, 1);
                totalKitten += 1;
                meow.play();
            }
        }
}


function slimekill(player, totalslime) {
    for (let i = 0; i < totalslime.length; i++) {
        let slime = totalslime[i];
        if (player.y + player.height < slime.y + slime.height &&
        slime.y + 100 < player.y + player.height &&
        player.x + player.width > slime.x + 110 &&   //right side
        player.x + 100 < slime.x + slime.width &&    //left side
        player.yChange > 0) {
            score +=3;
            totalslime.splice(i, 1);  
            slimeKill.currentTime = 0;
            slimeKill.volume = 0.5;
            slimeKill.play();
            slimeCount += 1;
        }
    }
}

function slimeDMG(player, totalslime) {
    for (let i = 0; i < totalslime.length; i=i+1) {
        let slime = totalslime[i];
        if (slime.x + 110 < player.x + player.width&&
            slime.x + slime.width -100 > player.x &&
            slime.y + 110 < player.y + player.height &&
            slime.y + slime.height - 110 > player.y) {
                    if (!player.immunity) {
                    player.health -= 1;
                    totalslime.splice(i, 1);  
                    slimedmg.currentTime = 0;
                    slimedmg.volume = 0.3;
                    slimedmg.play();

                    //show health bar for 3sec
                    healthBar = true;
                    clearTimeout(showHealthBar);
                    showHealthBar = setTimeout(() => {
                        showHealthBar = false;
                    }, 3000);

                    //immune to damage for 3 sec
                    player.immunity = true;
                    setTimeout(() => {
                        player.immunity = false;
                    }, 3000);
                }
           }
    }
}

function ghostDMG(player, ghostArray) {
    for (let i = 0; i < ghostArray.length; i=i+1) {
        let ghost = ghostArray[i];
        if (ghost.x + 40< player.x + player.width &&
            ghost.x + ghost.width - 40 > player.x &&
            ghost.y + 40 < player.y + player.height &&
            ghost.y + ghost.height - 90 > player.y ) {
                    if (!player.immunity) {
                    player.health -= 1;
                    ghostArray.splice(i, 1);
                    ghostaudio.currentTime = 0;
                    ghostaudio.volume = 0.5;
                    ghostaudio.play();  

                    //show health bar for 3sec
                    healthBar = true;
                    clearTimeout(showHealthBar);
                    showHealthBar = setTimeout(() => {
                        showHealthBar = false;
                    }, 3000);

                    //immune to damage for 3 sec
                    player.immunity = true;
                    setTimeout(() => {
                        player.immunity = false;
                    }, 3000);
                }
           }
    }
}





function randint(min, max) {
    return Math.round(Math.random()* (max-min)) + min;
}

let xhttp;





function deactivate(event){
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key ==='ArrowRight') {
        moveRight = false;
    } else if (key ==='ArrowUp') {
        moveUp = false;
    } else if (key ==='a') {
        moveLeft = false;
    } else if (key ==='d') {
        moveRight = false;
    } else if (key ==='w') {
        moveUp = false;
    } else if (key ==='A') {
        moveLeft = false;
    } else if (key ==='D') {
        moveRight = false;
    } else if (key ==='W') {
        moveUp = false;
    }
}

function activate(event){
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key ==='ArrowRight') {
        moveRight = true;
    } else if (key ==='ArrowUp') {
        moveUp = true;
    } else if (key ==='a') {
        moveLeft = true;
    } else if (key ==='d') {
        moveRight = true;
    } else if (key ==='w') {
        moveUp = true;
    } else if (key ==='A') {
        moveLeft = true;
    } else if (key ==='D') {
        moveRight = true;
    } else if (key ==='W') {
        moveUp = true;
    }
    
}

let dataStored = false;

function stop() {
    window.cancelAnimationFrame(request_id);
    window.removeEventListener('keydown', activate);
    window.removeEventListener('keyup', deactivate);
    backgroundAudio2.pause();
    totalScore = (totalKitten) + (slimeCount*3) + (totalcoins*5)
    let outcome_element = document.querySelector('#outcome');
    outcome_element.innerHTML = 'score'+ totalScore;
    if (!dataStored) {

    let data = new FormData();
    data.append('score', totalScore);
    data.append('kitten', totalKitten);
    data.append('coins', totalcoins);
    data.append('slime', slimeCount);


    xhttp = new XMLHttpRequest();
    xhttp.addEventListener('readystatechange', handle_response, false);
    xhttp.open("POST", 'store_score', true);
    xhttp.send(data);
    }
    dataStored = true;
}

function handle_response() {
    if ( xhttp.readyState === 4 ) {
        if ( xhttp.status === 200 ) {
            if (xhttp.responseText === "success" ) {
                console.log("yes")
                let tryagain1 = document.createElement('button');
                tryagain1.innerHTML = 'Try Again';
                tryagain1.addEventListener('click', function() {
                    window.location.href = "/~el24/cgi-bin/ca2/run.py/score_board";
                });
                
                // append the button to the document body
                document.body.appendChild(tryagain1);
                button.push(tryagain1);
            }else {
                console.log("no")
            }
        }
    }
}


function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function() {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };

    for (let asset of assets) {
        let element = asset.var;
        if ( element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
    
        else if ( element instanceof HTMLAudioElement ) {
            console.log("audio");
            element.addEventListener('canplaythrough', loaded, false)
        }
        element.src = asset.url;
    };
}