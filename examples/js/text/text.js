const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const basicText = new PIXI.Text('pixi中的基本文字');
basicText.x = 50;
basicText.y = 100;

app.stage.addChild(basicText);

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // 斜度
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const richText = new PIXI.Text('带有多种选项且跨多行的富文本', style);
richText.x = 50;
richText.y = 250;

app.stage.addChild(richText);
