const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

app.loader
    .add('bg_grass', 'examples/assets/bg_grass.jpg')
    .load(build);

function build() {
    // 创建新纹理
    const texture = app.loader.resources.bg_grass.texture;

    // 创建简单平面
    const verticesX = 10;
    const verticesY = 10;
    const plane = new PIXI.SimplePlane(texture, verticesX, verticesY);

    plane.x = 100;
    plane.y = 100;

    app.stage.addChild(plane);

    // 获取顶点位置的缓冲区。
    const buffer = plane.geometry.getBuffer('aVertexPosition');

    // 监听动画更新
    app.ticker.add((delta) => {
        // 稍微随机化顶点位置以创建运动效果。
        for (let i = 0; i < buffer.data.length; i++) {
            buffer.data[i] += (Math.random() - 0.5);
        }
        buffer.update();
    });
}
