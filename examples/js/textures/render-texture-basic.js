const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

const texture = PIXI.Texture.from('examples/assets/bunny.png');

for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.x = (i % 5) * 30;
    bunny.y = Math.floor(i / 5) * 30;
    bunny.rotation = Math.random() * (Math.PI * 2);
    container.addChild(bunny);
}

const brt = new PIXI.BaseRenderTexture(300, 300, PIXI.SCALE_MODES.LINEAR, 1);
const rt = new PIXI.RenderTexture(brt);

const sprite = new PIXI.Sprite(rt);

sprite.x = 450;
sprite.y = 60;
app.stage.addChild(sprite);

/*
 * 使用addChild方法将所有兔子添加到容器中
 * 当您执行此操作时，所有的兔子都会成为该容器的子节点，并且当容器移动时，所有子节点将做相同处理。
 * 这给您很大的灵活性，并使在屏幕上放置元素更加容易
 */
container.x = 100;
container.y = 60;

app.ticker.add(() => {
    app.renderer.render(container, rt);
});
