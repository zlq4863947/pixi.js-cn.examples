const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// 在开始之前加载它们Google字体...！
window.WebFontConfig = {
    google: {
        families: ['Snippet', 'Arvo:700italic', 'Podkova:700'],
    },

    active() {
        init();
    },
};

/* eslint-disable */
// 包含网络字体加载器脚本
(function() {
    const wf = document.createElement('script');
    wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
    }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}());
/* eslint-enabled */

function init() {
    // 使用Snippet网络字体创建一些白色文本
    const textSample = new PIXI.Text('Pixi.js text using the\ncustom "Snippet" Webfont', {
        fontFamily: 'Snippet',
        fontSize: 50,
        fill: 'white',
        align: 'left',
    });
    textSample.position.set(50, 200);
    app.stage.addChild(textSample);
}
