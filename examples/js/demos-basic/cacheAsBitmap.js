const app = new PIXI.Application();
document.body.appendChild(app.view);

app.stop();

// 加载资源
app.loader
    .add('spritesheet', 'examples/assets/spritesheet/monsters.json')
    .load(onAssetsLoaded);

// 用来存放外星人
const aliens = [];
const alienFrames = [
    'eggHead.png',
    'flowerTop.png',
    'helmlok.png',
    'skully.png',
];

let count = 0;

// 创建一个空容器
const alienContainer = new PIXI.Container();
alienContainer.x = 400;
alienContainer.y = 300;

// 使舞台可以互动
app.stage.interactive = true;
app.stage.addChild(alienContainer);

function onAssetsLoaded() {
    // 从图像路径中添加一堆带有纹理的外星人
    for (let i = 0; i < 100; i++) {
        const frameName = alienFrames[i % 4];

        // 使用frame名创建外星人..
        const alien = PIXI.Sprite.from(frameName);
        alien.tint = Math.random() * 0xFFFFFF;

        /*
         * 告诉你个有趣的事：）
         * 执行上述操作的另一种实现方法是
         * var texture = PIXI.Texture.from(frameName);
         * var alien = new PIXI.Sprite(texture);
         */
        alien.x = Math.random() * 800 - 400;
        alien.y = Math.random() * 600 - 300;
        alien.anchor.x = 0.5;
        alien.anchor.y = 0.5;
        aliens.push(alien);
        alienContainer.addChild(alien);
    }
    app.start();
}

// 结合了鼠标点击和触控点击
app.stage.on('pointertap', onClick);

function onClick() {
    alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;

    // 随意使用以下内容
    // var sprite = new PIXI.Sprite(alienContainer.generateTexture());
    // app.stage.addChild(sprite);
    // sprite.x = Math.random() * 800;
    // sprite.y = Math.random() * 600;
}

app.ticker.add(() => {
    // 让我们稍微旋转一下外星人
    for (let i = 0; i < 100; i++) {
        const alien = aliens[i];
        alien.rotation += 0.1;
    }

    count += 0.01;

    alienContainer.scale.x = Math.sin(count);
    alienContainer.scale.y = Math.sin(count);
    alienContainer.rotation += 0.01;
});
