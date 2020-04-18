const app = new PIXI.Application();
document.body.appendChild(app.view);

// 从图像路径创建纹理
const texture = PIXI.Texture.from('examples/assets/p2.jpeg');

/* 创建一个平铺精灵...
 * 需要的纹理，宽度和高度
 * 在WebGL中，图片大小最好是2的幂
 */
const tilingSprite = new PIXI.TilingSprite(
    texture,
    app.screen.width,
    app.screen.height,
);
app.stage.addChild(tilingSprite);

let count = 0;

app.ticker.add(() => {
    count += 0.005;

    tilingSprite.tileScale.x = 2 + Math.sin(count);
    tilingSprite.tileScale.y = 2 + Math.cos(count);

    tilingSprite.tilePosition.x += 1;
    tilingSprite.tilePosition.y += 1;
});
