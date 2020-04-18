const app = new PIXI.Application({ antialias: true });
document.body.appendChild(app.view);

app.stage.interactive = true;

const graphics = new PIXI.Graphics();

// 设置填充和线条样式
graphics.beginFill(0xFF3300);
graphics.lineStyle(10, 0xffd900, 1);

// 画一个形状
graphics.moveTo(50, 50);
graphics.lineTo(250, 50);
graphics.lineTo(100, 100);
graphics.lineTo(250, 220);
graphics.lineTo(50, 220);
graphics.lineTo(50, 50);
graphics.closePath();
graphics.endFill();

// 再次设置填充和线条样式
graphics.lineStyle(10, 0xFF0000, 0.8);
graphics.beginFill(0xFF700B, 1);

// 画第二个形状
graphics.moveTo(210, 300);
graphics.lineTo(450, 320);
graphics.lineTo(570, 350);
graphics.quadraticCurveTo(600, 0, 480, 100);
graphics.lineTo(330, 120);
graphics.lineTo(410, 200);
graphics.lineTo(210, 300);
graphics.closePath();
graphics.endFill();

// 画一个矩形
graphics.lineStyle(2, 0x0000FF, 1);
graphics.drawRect(50, 250, 100, 100);

// 画一个圆圈
graphics.lineStyle(0);
graphics.beginFill(0xFFFF0B, 0.5);
graphics.drawCircle(470, 200, 100);
graphics.endFill();

graphics.lineStyle(20, 0x33FF00);
graphics.moveTo(30, 30);
graphics.lineTo(600, 300);


app.stage.addChild(graphics);

// 让我们创建一个移动的形状
const thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = 800 / 2;
thing.y = 600 / 2;

let count = 0;

// 只需在舞台上单击即可绘制随机线条
window.app = app;
app.renderer.plugins.interaction.on('pointerdown', onPointerDown);

function onPointerDown() {
    graphics.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1);
    graphics.moveTo(Math.random() * 800, Math.random() * 600);
    graphics.bezierCurveTo(
        Math.random() * 800, Math.random() * 600,
        Math.random() * 800, Math.random() * 600,
        Math.random() * 800, Math.random() * 600,
    );
}

app.ticker.add(() => {
    count += 0.1;

    thing.clear();
    thing.lineStyle(10, 0xff0000, 1);
    thing.beginFill(0xffFF00, 0.5);

    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
    thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
    thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
    thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
    thing.lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
    thing.closePath();

    thing.rotation = count * 0.1;
});
