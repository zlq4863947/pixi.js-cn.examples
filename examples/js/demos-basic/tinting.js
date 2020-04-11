const app = new PIXI.Application();
document.body.appendChild(app.view);

// 用来存放外星人
const aliens = [];

const totalDudes = 20;

for (let i = 0; i < totalDudes; i++) {
    // 创建一个使用我们刚刚生成的图像名称作为其源的新精灵
    const dude = PIXI.Sprite.from('examples/assets/eggHead.png');

    // 设置锚点，以使纹理居中于精灵上
    dude.anchor.set(0.5);

    // 设置一个随机比例 - 没必要让他们大小都一样！
    dude.scale.set(0.8 + Math.random() * 0.3);

    // 最后让我们把这家伙设成一个随机的位置..
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;

    dude.tint = Math.random() * 0xFFFFFF;

    // 创建一些控制移动的额外属性 :
    // 以弧度创建随机方向。这是一个介于0和PI*2之间的数字，相当于0-360度
    dude.direction = Math.random() * Math.PI * 2;

    // 这个数字会随着时间的推移来修改dude的方向
    dude.turningSpeed = Math.random() - 0.8;

    // 创建2 - 4之间的随机速度
    dude.speed = 2 + Math.random() * 2;

    // 最后我们把dude放入外星人数组中，这样以后就可以很容易地访问它了
    aliens.push(dude);

    app.stage.addChild(dude);
}

// 为dude创建一个边界框
const dudeBoundsPadding = 100;
const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2);

app.ticker.add(() => {
    // 遍历dudes并更新位置
    for (let i = 0; i < aliens.length; i++) {
        const dude = aliens[i];
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
