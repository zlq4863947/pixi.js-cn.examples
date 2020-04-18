const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// 所有纹理的缩放模式，将保留像素
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const sprite = PIXI.Sprite.from('examples/assets/bunny.png');

// 设定初始位置
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

// 开启交互
sprite.interactive = true;

// 显示手形光标
sprite.buttonMode = true;

// 指针规范化触控和鼠标
sprite.on('pointerdown', onClick);

// 或者，使用鼠标和触控事件：
// sprite.on('click', onClick); // 仅鼠标
// sprite.on('tap', onClick); // 仅触控

app.stage.addChild(sprite);

function onClick() {
    sprite.scale.x *= 1.25;
    sprite.scale.y *= 1.25;
}
