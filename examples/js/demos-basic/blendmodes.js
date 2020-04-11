const app = new PIXI.Application();
document.body.appendChild(app.view);

// 创建一个新的背景精灵
const background = PIXI.Sprite.from('examples/assets/bg_rotate.jpg');
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

// 创建一个数组来存储dude
const dudeArray = [];

const totaldudes = 20;

for (let i = 0; i < totaldudes; i++) {
    // 创建一个使用我们刚刚生成的图像名称作为其源的新精灵
    const dude = PIXI.Sprite.from('examples/assets/flowerTop.png');

    dude.anchor.set(0.5);

    // 为dude设置随机比例
    dude.scale.set(0.8 + Math.random() * 0.3);

    // 最后让我们将dude设置在随机位置...
    dude.x = Math.floor(Math.random() * app.screen.width);
    dude.y = Math.floor(Math.random() * app.screen.height);

    // 此示例的重要部分，这里说明如何更改精灵的默认混合模式
    dude.blendMode = PIXI.BLEND_MODES.ADD;

    // 创建一些额外的属性来控制运动
    dude.direction = Math.random() * Math.PI * 2;

    // 该数字将用于随着时间的推移修改dude的方向
    dude.turningSpeed = Math.random() - 0.8;

    // 创建2 - 4之间的随机速度
    dude.speed = 2 + Math.random() * 2;

    // 最后我们将dude放入dudeArray，以便以后可以轻松访问
    dudeArray.push(dude);

    app.stage.addChild(dude);
}

// 为小家伙创建一个边界框
const dudeBoundsPadding = 100;

const dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2,
);

app.ticker.add(() => {
    // 遍历dudes并更新位置
    for (let i = 0; i < dudeArray.length; i++) {
        const dude = dudeArray[i];
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * dude.speed;
        dude.y += Math.cos(dude.direction) * dude.speed;
        dude.rotation = -dude.direction - Math.PI / 2;

        // 通过测试边界来包装dude...
        if (dude.x < dudeBounds.x) {
            dude.x += dudeBounds.width;
        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
            dude.x -= dudeBounds.width;
        }

        if (dude.y < dudeBounds.y) {
            dude.y += dudeBounds.height;
        } else if (dude.y > dudeBounds.y + dudeBounds.height) {
            dude.y -= dudeBounds.height;
        }
    }
});
