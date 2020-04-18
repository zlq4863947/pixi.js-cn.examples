const app = new PIXI.Application();
document.body.appendChild(app.view);

let bol = false;

// 从图像路径创建纹理
const texture = PIXI.Texture.from('examples/assets/flowerTop.png');

// 创建第二个纹理
const secondTexture = PIXI.Texture.from('examples/assets/eggHead.png');

// 使用纹理创建一个新的Sprite
const dude = new PIXI.Sprite(texture);

// 将精灵的锚点居中
dude.anchor.set(0.5);

// 将精灵移动到屏幕中心
dude.x = app.screen.width / 2;
dude.y = app.screen.height / 2;

app.stage.addChild(dude);

// 开启精灵交互事件
dude.interactive = true;
dude.buttonMode = true;

dude.on('pointertap', () => {
    bol = !bol;
    if (bol) {
        dude.texture = secondTexture;
    } else {
        dude.texture = texture;
    }
});

app.ticker.add(() => {
    // 只是为了好玩，让我们稍微旋转兔子先生
    dude.rotation += 0.1;
});
