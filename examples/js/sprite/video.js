const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

// 创建可用于触发视频的播放按钮
const button = new PIXI.Graphics()
    .beginFill(0x0, 0.5)
    .drawRoundedRect(0, 0, 100, 100, 10)
    .endFill()
    .beginFill(0xffffff)
    .moveTo(36, 30)
    .lineTo(36, 70)
    .lineTo(70, 50);

// 定位按钮
button.x = (app.screen.width - button.width) / 2;
button.y = (app.screen.height - button.height) / 2;

// 在按钮上启用互动
button.interactive = true;
button.buttonMode = true;

// 添加到舞台
app.stage.addChild(button);

// 监听点击/触碰事件以开始播放视频
// 这对于某些移动平台很有用。 例如：
// 没有polyfill的ios9及以下版本无法在PIXI中渲染视频 - https://github.com/bfred-it/iphone-inline-video
// ios10及更高版本需要点击/触碰事件才能渲染视频
// 在PIXI中包含音频。没有音轨的视频没有此要求
button.on('pointertap', onPlayVideo);

function onPlayVideo() {
    // 不再需要该按钮
    button.destroy();

    // 从路径创建视频纹理
    const texture = PIXI.Texture.from('examples/assets/video.mp4');

    // 使用视频纹理创建一个新的Sprite（是的，就是这么简单）
    const videoSprite = new PIXI.Sprite(texture);

    // 全屏拉伸
    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;

    app.stage.addChild(videoSprite);
}
