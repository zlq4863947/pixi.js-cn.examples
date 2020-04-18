const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// 图标的CSS样式
const defaultIcon = "url('examples/assets/bunny.png'),auto";
const hoverIcon = "url('examples/assets/bunny_saturated.png'),auto";

// 添加自定义光标样式
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;

// 创建背景...
const background = PIXI.Sprite.from('examples/assets/bg_button.jpg');
background.width = app.screen.width;
background.height = app.screen.height;
// 为舞台添加背景...
app.stage.addChild(background);

// 从图像路径创建一些纹理
const textureButton = PIXI.Texture.from('examples/assets/button.png');
const textureButtonDown = PIXI.Texture.from('examples/assets/button_down.png');
const textureButtonOver = PIXI.Texture.from('examples/assets/button_over.png');

const buttons = [];

const buttonPositions = [
    175, 75,
    655, 75,
    410, 325,
    150, 465,
    685, 445,
];

for (let i = 0; i < 5; i++) {
    const button = new PIXI.Sprite(textureButton);
    button.cursor = 'hover';

    button.anchor.set(0.5);
    button.x = buttonPositions[i * 2];
    button.y = buttonPositions[i * 2 + 1];

    // 使按钮具有交互性...
    button.interactive = true;

    button
        // 鼠标和触控事件被标准化为pointer*事件，用于处理不同的按钮事件。
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

    // 使用仅鼠标事件
    // .on('mousedown', onButtonDown)
    // .on('mouseup', onButtonUp)
    // .on('mouseupoutside', onButtonUp)
    // .on('mouseover', onButtonOver)
    // .on('mouseout', onButtonOut)

    // 使用仅触控事件
    // .on('touchstart', onButtonDown)
    // .on('touchend', onButtonUp)
    // .on('touchendoutside', onButtonUp)

    // 将其添加到舞台
    app.stage.addChild(button);

    // 添加按钮到数组
    buttons.push(button);
}

// 设置一些值...
buttons[0].scale.set(1.2);
buttons[2].rotation = Math.PI / 10;
buttons[3].scale.set(0.8);
buttons[4].scale.set(0.8, 1.2);
buttons[4].rotation = Math.PI;

function onButtonDown() {
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;
}

function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = textureButtonOver;
    } else {
        this.texture = textureButton;
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = textureButtonOver;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = textureButton;
}
