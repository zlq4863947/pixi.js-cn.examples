const app = new PIXI.Application();
document.body.appendChild(app.view);

const sprites = new PIXI.ParticleContainer(10000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true,
});
app.stage.addChild(sprites);

// 创建一个数组来存储所有精灵
const maggots = [];

const totalSprites = app.renderer instanceof PIXI.Renderer ? 10000 : 100;

for (let i = 0; i < totalSprites; i++) {
    // 创建一个新的精灵
    const dude = PIXI.Sprite.from('examples/assets/maggot_tiny.png');

    dude.tint = Math.random() * 0xE8D4CD;

    // 设置锚点，以使纹理居中于精灵上
    dude.anchor.set(0.5);

    // 不同的蛆，不同的大小
    dude.scale.set(0.8 + Math.random() * 0.3);

    // 分散他们
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;

    dude.tint = Math.random() * 0x808080;

    // 以圆周率创建随机方向
    dude.direction = Math.random() * Math.PI * 2;

    // 该数字将用于随着时间的推移修改精灵的方向
    dude.turningSpeed = Math.random() - 0.8;

    // 在0-2之间产生一个随机速度，让蛆的速度变慢
    dude.speed = (2 + Math.random() * 2) * 0.2;

    dude.offset = Math.random() * 100;

    // 最后我们将dude放入maggots数组，以便以后可以轻松访问
    maggots.push(dude);

    sprites.addChild(dude);
}

// 为maggots创建一个边界框
const dudeBoundsPadding = 100;
const dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2,
);

let tick = 0;

app.ticker.add(() => {
    // 遍历精灵并更新它们的位置
    for (let i = 0; i < maggots.length; i++) {
        const dude = maggots[i];
        dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
        dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
        dude.rotation = -dude.direction + Math.PI;

        // wrap the maggots
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

    // 增加ticker
    tick += 0.1;
});
