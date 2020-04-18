const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// 从图像路径创建一个新的精灵
const bunny = PIXI.Sprite.from('examples/assets/bunny.png');

// 将精灵的锚点居中
bunny.anchor.set(0.5);

// 将精灵移动到屏幕中心
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// 监听动画更新
app.ticker.add((delta) => {
    // 只是为了好玩，让我们稍微旋转兔子先生
    // 如果以100％的性能运行，则增量为1
    // 创建与帧无关的转换
    bunny.rotation += 0.1 * delta;
});
