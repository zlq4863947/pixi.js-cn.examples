const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// 获取绳索的纹理。
const trailTexture = PIXI.Texture.from('examples/assets/trail.png');
const historyX = [];
const historyY = [];
// historySize确定路径的长度。
const historySize = 20;
// ropeSize确定路径的平滑程度。
const ropeSize = 100;
const points = [];

// 创建历史记录数组。
for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
}
// 创建绳索点。
for (let i = 0; i < ropeSize; i++) {
    points.push(new PIXI.Point(0, 0));
}

// 创建绳索
const rope = new PIXI.SimpleRope(trailTexture, points);

// 设置混合模式
rope.blendmode = PIXI.BLEND_MODES.ADD;

app.stage.addChild(rope);

// 监听动画更新
app.ticker.add((delta) => {
    // 读取鼠标点，这也可以在mousemove/touchmove更新中完成。为了简单起见，现在在这里完成。
    // 正确实施此操作后，请确保实施touchmove，因为交互插件的鼠标在某些设备上可能不会更新。
    const mouseposition = app.renderer.plugins.interaction.mouse.global;

    // 将鼠标值更新为历史记录
    historyX.pop();
    historyX.unshift(mouseposition.x);
    historyY.pop();
    historyY.unshift(mouseposition.y);
    console.log(mouseposition.x, mouseposition.y)
    // 更新点以与历史记录相对应。
    for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        // 使用三次插值法平滑曲线以防止出现尖锐边缘。
        const ix = cubicInterpolation(historyX, i / ropeSize * historySize);
        const iy = cubicInterpolation(historyY, i / ropeSize * historySize);

        p.x = ix;
        p.y = iy;
    }
});

/**
 * 基于三次插值 https://github.com/osuushi/Smooth.js
 */
function clipInput(k, arr) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
}

function getTangent(k, factor, array) {
    return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}
