import { Container, Sprite, Assets, Ticker } from "pixi.js";
// import { engine } from "../../getEngine"; // this line was not needed?

export class MainScreen extends Container {
  // tell the engine which AssetPack bundles must be loaded first
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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  private readonly tileSize = 16;                 // raw pixel size (before resize)
  private tileLayer: Container = new Container(); // holds all tile sprites
  private paused = false;

  constructor() {
    super();
    this.addChild(this.tileLayer);
  }

  /** Runs right after the bundle “main” is loaded */
  public prepare() {
    this.buildLevel();
  }

  /** Create sprites for every tile in the level array */
  private buildLevel() {
    const airTex = Assets.get("sandstone_background.png");
    const rockTex = Assets.get("sandstone4.png");

    this.level.forEach((row, y) => {
      row.forEach((block, x) => {
        const tex = block === 1 ? rockTex : airTex;
        const sprite = new Sprite(tex);
        sprite.x = x * this.tileSize;
        sprite.y = y * this.tileSize;
        this.tileLayer.addChild(sprite);
      });
    });
  }

  /** Game‑loop‑style update */
  public update(_ticker: Ticker) {
    if (this.paused) return;
    // put per‑frame logic here (camera, player, etc.)
  }

  public pause() { this.paused = true; }
  public resume() { this.paused = false; }

  /** Handle window resize – keep the grid scaled to fit vertically */
  public resize(screenW: number, screenH: number) {
    const designH = this.level.length * this.tileSize;
    const scale = screenH / designH;
    this.tileLayer.scale.set(scale);              // uniform scaling
    this.tileLayer.x = (screenW - this.tileLayer.width) / 2; // center
  }
}
