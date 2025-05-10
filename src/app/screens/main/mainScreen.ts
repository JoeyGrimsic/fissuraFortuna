import { Container, Sprite, Assets, Ticker } from "pixi.js";
// import { engine } from "../../getEngine"; // this line was not needed?

export class MainScreen extends Container {
  // tell the engine which AssetPack to loaded, this variable is accessed from 
  public static assetBundles = ["main"]; // ← matches the main{m} folder

  private readonly level: number[][] = [
    // 0 = air, 1 = sandstone 
    // this is hardcoded now, but we will want to add procedural generation!

    // also we will want to modify values based on events in the game, for example
    // if a bomb explodes we will want to determine how to manipulate this array
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  private readonly tileSize = 16;                 // raw pixel size (before resize)
  private tileLayer: Container = new Container(); // holds all tile sprites
  private paused = false;

  constructor() {
    super();
    this.addChild(this.tileLayer);
  }

  // runs right after the bundle “main” is loaded
  public prepare() {
    this.buildLevel();
  }

  // create sprites for every tile in the level array
  private buildLevel() {
    const airTexture = Assets.get("sandstone4_background.png");
    const rockTexture = Assets.get("sandstone4.png");

    this.level.forEach((row, y) => {
      row.forEach((block, x) => {
        const texture = block === 1 ? rockTexture : airTexture; // fancy if-else one-liner syntax
        const sprite = new Sprite(texture);
        sprite.x = x * this.tileSize;
        sprite.y = y * this.tileSize;
        this.tileLayer.addChild(sprite);
      });
    });
  }

  // main game loop
  public update(_ticker: Ticker) {
    if (this.paused) return;
    // put per‑frame logic here (camera, player, etc.)
  }

  public pause() { this.paused = true; }
  public resume() { this.paused = false; }

  // handle window resize, but we will want to add to this function when we render more things to the screen 
  public resize(screenW: number, screenH: number) {
    const designH = this.level.length * this.tileSize;
    const scale = screenH / designH;
    this.tileLayer.scale.set(scale); // uniform scaling.. we want to change this so that textures don't lose resolution
    this.tileLayer.x = (screenW - this.tileLayer.width) / 2; // center for now, but eventually we want to move all of this, because after all if the character is moving then the ground should move around the player with the player in the middle of the screen
  }
}
