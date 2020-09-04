import {types,Instance} from "mobx-state-tree";
import {serverProjectJson} from "@models/home.data"

export interface IHomeModel extends Instance<typeof HomeModel>{}

const ServerIntro = types.model('ServerTitle',{
  title: types.string,
  en: types.string,
  img: types.string
});

const ServerContext = types.model('ServerContext',{
  img: types.string,
  text: types.string
});

const ServerProject = types.model('ServerProject',{
  serverIntro:types.map(ServerIntro),
  serverContext: types.map(ServerContext)
});

const News = types.model('News',{
  id: types.string,
  title: types.string,
  content: types.string,
  time: types.string,
  img: types.string
});

const Advantage = types.model('Advantage',{
  img: types.string,
  title: types.string,
  text: types.string
});

const Strategic = types.model('Strategic',{
  img: types.string,
  tips: types.string
});

export const HomeModel = types.model("HomeModel",{
  serverProject: types.optional(types.array(ServerProject),serverProjectJson),
  news: types.array(News),
  honorary: types.array(types.string),
  advantage: types.array(Advantage),
  strategic: types.array(Strategic),
}).actions(self => ({
  setStr() {
    // @ts-ignore
    self.serverProject = serverProjectJson;
  },
  toggle() {

  },
}));