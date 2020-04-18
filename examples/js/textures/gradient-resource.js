// PixiJS V5纹理资源API + canvas2d渐变API + WebGL texImage2D
// 在此处查看高级上传功能：
// https://github.com/pixijs/pixi.js/blob/dev/packages/core/src/textures/resources/BaseImageResource.js#L54

class GradientResource extends PIXI.resources.Resource {
    constructor() {
    // 通过宽度和高度。（0,0）如果我们还不知道
    // 渐变仅需1像素高度
        super(256, 1);
    }

    upload(renderer, baseTexture, glTexture) {
        const { width } = this; // 默认大小还是来自baseTexture？
        const { height } = this; // 你的选择。

        // 临时画布，纹理上传到GPU后我们不再需要
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        const grd = ctx.createLinearGradient(0, 0, width, 0);
        grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
        grd.addColorStop(0.3, 'cyan');
        grd.addColorStop(0.7, 'red');
        grd.addColorStop(1, 'green');

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);

        // 如果上传是第二次，此信息很有用
        // 有些人用它来跟踪已用的内存
        glTexture.width = width;
        glTexture.height = height;

        // 纯粹的WEBGL调用 - 这就是它的全部内容。
        // Pixi JS无法包装所有API，我们为您提供访问它的权限！
        const { gl } = renderer;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.premultiplyAlpha);
        gl.texImage2D(baseTexture.target, 0, baseTexture.format, baseTexture.format, baseTexture.type, canvas);

        return true;
    }
}

const app = new PIXI.Application({ antialias: true });
document.body.appendChild(app.view);

const gradBaseTexture = new PIXI.BaseTexture(new GradientResource());
// 在这里您可以伪造baseTexture大小以避免调整所有精灵的大小
// 每个渐变可以有多个baseTextures，但请注意：
// 资源将产生更多的glTextures！
gradBaseTexture.setSize(500, 50);

const gradTexture = new PIXI.Texture(gradBaseTexture);

const sprite = new PIXI.Sprite(gradTexture);
sprite.position.set(100, 100);
sprite.rotation = Math.PI / 8;
app.stage.addChild(sprite);
