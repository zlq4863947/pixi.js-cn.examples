// 略有根据Spicy Yoghurt的这篇文章
// 进一步阅读的URL: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
const app = new PIXI.Application({ backgroundColor: 0x111111 });
document.body.appendChild(app.view);

// 对象交互方式的选项
// 定义红块的移动速度
const movementSpeed = 0.05;

// 两个物体之间的推动力强度
const impulsePower = 5;

// 测试命中
// 两个不同方块之间的基本AABB检查
function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds2.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds2.height > bounds2.y;
}

// 计算碰撞的结果，使我们能够产生
// 将物体推开
function collisionResponse(object1, object2) {
    if (!object1 || !object2) {
        return new PIXI.Point(0);
    }

    const vCollision = new PIXI.Point(
        object2.x - object1.x,
        object2.y - object1.y,
    );

    const distance = Math.sqrt(
        (object2.x - object1.x) * (object2.x - object1.x)
        + (object2.y - object1.y) * (object2.y - object1.y),
    );

    const vCollisionNorm = new PIXI.Point(
        vCollision.x / distance,
        vCollision.y / distance,
    );

    const vRelativeVelocity = new PIXI.Point(
        object1.acceleration.x - object2.acceleration.x,
        object1.acceleration.y - object2.acceleration.y,
    );

    const speed = vRelativeVelocity.x * vCollisionNorm.x
        + vRelativeVelocity.y * vCollisionNorm.y;

    const impulse = impulsePower * speed / (object1.mass + object2.mass);

    return new PIXI.Point(
        impulse * vCollisionNorm.x,
        impulse * vCollisionNorm.y,
    );
}

// 计算两个指定点之间的距离
function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

// 我们将要撞击的绿色方块
const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
greenSquare.width = 100;
greenSquare.height = 100;
greenSquare.tint = '0x00FF00';
greenSquare.acceleration = new PIXI.Point(0);
greenSquare.mass = 3;

// 您可以四处走动的广场
const redSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
redSquare.position.set(0, 0);
redSquare.width = 100;
redSquare.height = 100;
redSquare.tint = '0xFF0000';
redSquare.acceleration = new PIXI.Point(0);
redSquare.mass = 1;

// 监听动画更新
app.ticker.add((delta) => {
    // 通过将每个循环的加速度降低0.01％的加速度来对两个平方应用减速度
    redSquare.acceleration.set(redSquare.acceleration.x * 0.99, redSquare.acceleration.y * 0.99);
    greenSquare.acceleration.set(greenSquare.acceleration.x * 0.99, greenSquare.acceleration.y * 0.99);

    const mouseCoords = app.renderer.plugins.interaction.mouse.global;

    // 检查绿色方块是否曾经移出屏幕。如果是，则朝该方向反向加速
    if (greenSquare.x < 0 || greenSquare.x > (app.screen.width - 100)) {
        greenSquare.acceleration.x = -greenSquare.acceleration.x;
    }

    if (greenSquare.y < 0 || greenSquare.y > (app.screen.height - 100)) {
        greenSquare.acceleration.y = -greenSquare.acceleration.y;
    }

    // 如果绿色方块线从警戒线中弹出，则会弹出回到中间
    if ((greenSquare.x < -30 || greenSquare.x > (app.screen.width + 30))
        || greenSquare.y < -30 || greenSquare.y > (app.screen.height + 30)) {
        greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
    }

    // 如果鼠标不在屏幕上，则不要再更新
    if (app.screen.width > mouseCoords.x || mouseCoords.x > 0
        || app.screen.height > mouseCoords.y || mouseCoords.y > 0) {
        // 获取红块的中心点
        const redSquareCenterPosition = new PIXI.Point(
            redSquare.x + (redSquare.width * 0.5),
            redSquare.y + (redSquare.height * 0.5),
        );

        // 计算鼠标指针和红色方块之间的方向向量
        const toMouseDirection = new PIXI.Point(
            mouseCoords.x - redSquareCenterPosition.x,
            mouseCoords.y - redSquareCenterPosition.y,
        );

        // 使用以上方法找出方向所具有的角度
        const angleToMouse = Math.atan2(
            toMouseDirection.y,
            toMouseDirection.x,
        );

        // 找出正方形应该经过的速度，它是红色正方形离鼠标指针的距离的函数
        const distMouseRedSquare = distanceBetweenTwoPoints(
            mouseCoords,
            redSquareCenterPosition,
        );
        const redSpeed = distMouseRedSquare * movementSpeed;

        // 计算红色方块的加速度
        redSquare.acceleration.set(
            Math.cos(angleToMouse) * redSpeed,
            Math.sin(angleToMouse) * redSpeed,
        );
    }

    // 如果两个方格相撞
    if (testForAABB(greenSquare, redSquare)) {
        // 计算碰撞导致的每个方格之间的加速度变化
        const collisionPush = collisionResponse(greenSquare, redSquare);
        // 设置两个方格的加速度变化
        redSquare.acceleration.set(
            (collisionPush.x * greenSquare.mass),
            (collisionPush.y * greenSquare.mass),
        );
        greenSquare.acceleration.set(
            -(collisionPush.x * redSquare.mass),
            -(collisionPush.y * redSquare.mass),
        );
    }

    greenSquare.x += greenSquare.acceleration.x * delta;
    greenSquare.y += greenSquare.acceleration.y * delta;

    redSquare.x += redSquare.acceleration.x * delta;
    redSquare.y += redSquare.acceleration.y * delta;
});

// 添加到舞台
app.stage.addChild(redSquare, greenSquare);
