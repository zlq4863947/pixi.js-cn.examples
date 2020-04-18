const app = new PIXI.Application();
document.body.appendChild(app.view);

// 创建两个渲染纹理...这些动态纹理将用于将场景绘制到自身中
let renderTexture = PIXI.RenderTexture.create(
    app.screen.width,
    app.screen.height,
);
let renderTexture2 = PIXI.RenderTexture.create(
    app.screen.width,
    app.screen.height,
);
const currentTexture = renderTexture;

// 创建一个使用我们上面创建的渲染纹理的新精灵
const outputSprite = new PIXI.Sprite(currentTexture);

// 对齐精灵
outputSprite.x = 400;
outputSprite.y = 300;
outputSprite.anchor.set(0.5);

// 添加到舞台
app.stage.addChild(outputSprite);

const stuffContainer = new PIXI.Container();

stuffContainer.x = 400;
stuffContainer.y = 300;

app.stage.addChild(stuffContainer);

// 创建图像ID的数组。
const fruits = [
    'examples/assets/rt_object_01.png',
    'examples/assets/rt_object_02.png',
    'examples/assets/rt_object_03.png',
    'examples/assets/rt_object_04.png',
    'examples/assets/rt_object_05.png',
    'examples/assets/rt_object_06.png',
    'examples/assets/rt_object_07.png',
    'examples/assets/rt_object_08.png',
];

// 创建项目数组
const items = [];

// 现在创建一些项目并将它们随机放置在填充容器中
for (let i = 0; i < 20; i++) {
    const item = PIXI.Sprite.from(fruits[i % fruits.length]);
    item.x = Math.random() * 400 - 200;
    item.y = Math.random() * 400 - 200;
    item.anchor.set(0.5);
    stuffContainer.addChild(item);
    items.push(item);
}

// 用于快速旋转
let count = 0;

app.ticker.add(() => {
    for (let i = 0; i < items.length; i++) {
        // 旋转每个项目
        const item = items[i];
        item.rotation += 0.1;
    }

    count += 0.01;

    // 交换缓冲区...
    const temp = renderTexture;
    renderTexture = renderTexture2;
    renderTexture2 = temp;

    // 设置新的纹理
    outputSprite.texture = renderTexture;

    // 扭起来！
    stuffContainer.rotation -= 0.01;
    outputSprite.scale.set(1 + Math.sin(count) * 0.2);

    // 将舞台渲染为纹理
    // 'true' 在渲染内容之前清除纹理
    app.renderer.render(app.stage, renderTexture2, false);
});
