const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader
    .add('examples/assets/spritesheet/fighter.json')
    .load(onAssetsLoaded);

function onAssetsLoaded() {
    // 从图像路径创建纹理数组
    const frames = [];

    for (let i = 0; i < 30; i++) {
        const val = i < 10 ? `0${i}` : i;

        // 自从精灵板上加载了pixi加载器以来，魔术开始了
        frames.push(PIXI.Texture.from(`rollSequence00${val}.png`));
    }

    // 创建一个AnimatedSprite（带回Flash时代的记忆，对吧？）
    const anim = new PIXI.AnimatedSprite(frames);

    /*
     * AnimatedSprite继承了PIXI Sprite的所有属性
     * 因此您可以更改其位置，锚点，遮罩等
     */
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();

    app.stage.addChild(anim);

    // 动画旋转
    app.ticker.add(() => {
        anim.rotation += 0.01;
    });
}
