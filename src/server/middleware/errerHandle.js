import Koa from "koa";
import {Context} from "@interfaces/IKoa.ts";
import {Logger} from "log4js";

class ErrorHandle {
  static error(app,logger:Logger){
    app.use(async (ctx: Context,next: () => Promise<unknown>) => {
      try {
        await next();
      }catch(e){
        logger.error(e);
        ctx.status = ctx.status || 500;
        ctx.body = "500请求啦~正在努力恢复中."
      }
    })

    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      await next();
      if (ctx.status !== 404) {
        return;
      }
      ctx.status = 200;
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  }
}

export default ErrorHandle;

