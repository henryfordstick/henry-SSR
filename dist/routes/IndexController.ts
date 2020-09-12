import {GET,route} from 'awilix-koa';
import {Context} from "@interfaces/IKoa";

console.log(111);

@route('/')
class IndexController {
  @route('/')
  @GET()
  async actionList(ctx: Context): Promise<void> {
    ctx.body = await ctx.render('index');
  }
}

export default IndexController;