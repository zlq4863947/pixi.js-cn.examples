const app = new PIXI.Application({ antialias: true });
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();

// 矩形
graphics.beginFill(0xDE3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();

// 矩形 + 线样式1
graphics.lineStyle(2, 0xFEEB77, 1);
graphics.beginFill(0x650A5A);
graphics.drawRect(200, 50, 100, 100);
graphics.endFill();

// 矩形 + 线样式2
graphics.lineStyle(10, 0xFFBD01, 1);
graphics.beginFill(0xC34288);
graphics.drawRect(350, 50, 100, 100);
graphics.endFill();

// 矩形2
graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.beginFill(0xAA4F08);
graphics.drawRect(530, 50, 140, 100);
graphics.endFill();

// 圆形
graphics.lineStyle(0); // 绘制一个圆，将lineStyle设置为零，以便圆没有轮廓
graphics.beginFill(0xDE3249, 1);
graphics.drawCircle(100, 250, 50);
graphics.endFill();

// 圆形 + 线样式1
graphics.lineStyle(2, 0xFEEB77, 1);
graphics.beginFill(0x650A5A, 1);
graphics.drawCircle(250, 250, 50);
graphics.endFill();

// 圆形 + 线样式2
graphics.lineStyle(10, 0xFFBD01, 1);
graphics.beginFill(0xC34288, 1);
graphics.drawCircle(400, 250, 50);
graphics.endFill();

// 椭圆形 + 线样式2
graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.beginFill(0xAA4F08, 1);
graphics.drawEllipse(600, 250, 80, 50);
graphics.endFill();

// 绘制一个形状
graphics.beginFill(0xFF3300);
graphics.lineStyle(4, 0xffd900, 1);
graphics.moveTo(50, 350);
graphics.lineTo(250, 350);
graphics.lineTo(100, 400);
graphics.lineTo(50, 350);
graphics.closePath();
graphics.endFill();

// 绘制一个圆角的矩形
graphics.lineStyle(2, 0xFF00FF, 1);
graphics.beginFill(0x650A5A, 0.25);
graphics.drawRoundedRect(50, 440, 100, 100, 16);
graphics.endFill();

// 绘制一个星星
graphics.lineStyle(2, 0xFFFFFF);
graphics.beginFill(0x35CC5A, 1);
graphics.drawStar(360, 370, 5, 50);
graphics.endFill();

// 绘制一个星星2
graphics.lineStyle(2, 0xFFFFFF);
graphics.beginFill(0xFFCC5A, 1);
graphics.drawStar(280, 510, 7, 50);
graphics.endFill();

// 绘制一个星星3
graphics.lineStyle(4, 0xFFFFFF);
graphics.beginFill(0x55335A, 1);
graphics.drawStar(470, 450, 4, 50);
graphics.endFill();

// 绘制多边形
const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];

graphics.lineStyle(0);
graphics.beginFill(0x3500FA, 1);
graphics.drawPolygon(path);
graphics.endFill();

app.stage.addChild(graphics);
