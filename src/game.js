const { Application, Sprite, Container, Texture, Assets } = PIXI; // we may need to add more classes here to avoid PIXI prefix

// Create the application helper and add its render target to the page
const app = new Application();
await app.init({ resizeTo: window });
document.body.appendChild(app.canvas);

// Load the background sandstone texture
const sandstone_background = await Assets.load("./assets/sandstone4.png");
sandstone_background.baseTexture.scaleMode = "nearest"; // preserve texture with scaling
sandstone_background.baseTexture.update();

// Load the sandstone texture
const sandstone = await Assets.load("./assets/sandstone4_background.png");
sandstone.baseTexture.scaleMode = "nearest"; // preserve texture with scaling
sandstone.baseTexture.update();

// block index:
//  0 = air
//  1 = sandstone

const level = [
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

let scale = 1;
let tileSize = 16 * scale;
let xpos = 0;
let ypos = 0;
let i = 0;

for (let block of (level) => {
  xpos = i % 16;
  ypos = i / 16;
  let blockSprite;

  if (block === 1) {
    blockSprite = Sprite.from(sandstone);
  } else {
    blockSprite = Sprite.from(sandstone_background);
  }

  blockSprite.x = xpos * tileSize;
  blockSprite.y = ypos * tileSize;
  app.stage.addChild(blockSprite);
})
  app.ticker.add(() => {
    // game loop updates will be in here
  });
