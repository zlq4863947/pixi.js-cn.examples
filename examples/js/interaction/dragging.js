const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// 从图像路径创建纹理
const texture = PIXI.Texture.from('examples/assets/bunny.png');

// 像素化的缩放模式
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

for (let i = 0; i < 10; i++) {
    createBunny(
        Math.floor(Math.random() * app.screen.width),
        Math.floor(Math.random() * app.screen.height),
    );
}

function createBunny(x, y) {
    // 创建我们的小兔子朋友。
    const bunny = new PIXI.Sprite(texture);

    // 使兔子能够互动...这将使其能够响应鼠标和触控事件
    bunny.interactive = true;

    // 此按钮模式表示当您用鼠标滑过兔子时出现手形光标
    bunny.buttonMode = true;

    // 使兔子的锚点居中
    bunny.anchor.set(0.5);

    // 使它更大一点，因此更容易抓住
    bunny.scale.set(3);

    // 使用指针事件进行鼠标+触控的设置事件
    bunny
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

    // 对于仅鼠标事件
    // .on('mousedown', onDragStart)
    // .on('mouseup', onDragEnd)
    // .on('mouseupoutside', onDragEnd)
    // .on('mousemove', onDragMove);

    // 对于仅触控事件
    // .on('touchstart', onDragStart)
    // .on('touchend', onDragEnd)
    // .on('touchendoutside', onDragEnd)
    // .on('touchmove', onDragMove);

    // 将精灵移动到指定位置
    bunny.x = x;
    bunny.y = y;

    // 将其添加到舞台
    app.stage.addChild(bunny);
}

function onDragStart(event) {
    // 存储对数据的引用的原因是由于多点触控
    // 我们要跟踪此指定触控的运动
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // 将交互数据设置为null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}
