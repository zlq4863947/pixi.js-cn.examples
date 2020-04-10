# Pixi v5示例准则: #

这是使用PixiJS v5的示例的存储库。

显示示例的iframe为 **800 * 600**，因此，请避免创建大于这个尺寸的渲染器。

## 如何运行项目 ##

这个微型网站是使用HTML和jQuery构建的，可以在您的本地服务器上运行，而无需其他要求。

如果您在`src/js/pixi-examples.js`中更改站点代码或在`src/less`中更改任何样式，则需要重新构建项目。
通过`npm i`安装依赖项后，您可以通过`npm run build`执行一次构建并使用`http-server -c-1`打开网站，您也可以通过`npm run watch`启动监视进程以进行开发。

## 项目结构 ##

所有示例都存储在 `examples/js` 文件夹中，并通过 `examples/manifest.json` 文件加载。

全部资产都存储在 `examples/assets` 中。

示例文件夹中的每个子文件夹都对应于网站侧栏中的一个子菜单。

## 如何建立示例 ##

您可以将基本示例用作模板，它位于[```examples/js/demos-basic/container.js```](examples/js/demos-basic/container.js)。
您需要做的就是将该文件复制并粘贴到您认为示例在`examples/js`文件夹结构内的位置，并更改内容以创建一个新示例。 然后，您还需要更新 `examples/manifest.json`，以使菜单指向您的新示例。
