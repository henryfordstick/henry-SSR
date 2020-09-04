import Koa from "koa";
import render from "koa-swig";
import serve from "koa-static";
import co from "co"
import moduleAlias  from "module-alias";
import log4js from "log4js";
import {historyApiFallback} from "koa2-connect-history-api-fallback";
import ErrorHandle from "@middleware/errorHandle";
import {createContainer,Lifetime} from "awilix";
import {scopePerRequest,loadControllers} from "awilix-koa";

import config from "@config/index";

const app = new Koa();
const {port,staticDir,viewDir,memoryFlag} = config;

// 静态资源加载
app.use(serve(staticDir));

// 设置别名
moduleAlias.addAliases({
  '@root': __dirname,
  '@interfaces': `${__dirname}/interfaces`,
  '@config': `${__dirname}/config`,
  '@middleware': `${__dirname}/middleware`,
});

// 模版资源
//前端模板
//co的作用是把 *函数全部自动向下执行 next -> next -> done
//async await 语法糖版本 koa-swig 并为KOA2 升级 KOA1
app.context.render = co.wrap(
  render<render.DefaultSettings>({
    root: viewDir,
    autoescape: true,
    cache: memoryFlag,
    writeBody: false,
    ext: 'html',
  })
);

// 设置日志
log4js.configure({
  appenders: { cheese: { type: 'file', filename: `${__dirname}/logs/yd.log` } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});
const logger = log4js.getLogger('cheese');
ErrorHandle.error(app, logger);

// 依赖注入
//创建一个容器，管理所有的服务和路由
const container = createContainer();
// 把所有的service注册容器
// 每一个controller把需要的service注册进去
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.use(scopePerRequest(container));
app.use(loadControllers(`${__dirname}/routers/*.ts`));

app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));

app.listen(port, () => {
  console.log('node服务启动成功,启动地址为：http://localhost:'+ port);
});