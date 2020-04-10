const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// 创建一个新的纹理
const texture = PIXI.Texture.from('examples/assets/bunny.png');

// 创建一个5x5的兔子网格
for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
}

// 将容器移到中心
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// 将兔子精灵移动到本地容器坐标的中心
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// 监听动画更新
app.ticker.add((delta) => {
    // 旋转容器！
    // 使用增量创建与帧无关的转换
    container.rotation -= 0.01 * delta;
});
