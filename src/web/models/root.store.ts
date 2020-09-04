import {types,Instance} from "mobx-state-tree"
import {DemoModel} from "@models/demo.store";
import {HomeModel} from "@models/home.store";
import {CommonModel} from "@models/common.store";

export interface IRootStoreModel extends Instance<typeof RootStore>{}
export type RootStoreType = typeof RootStore.Type;

export const RootStore = types.model("RootStore",{
  common: types.optional(CommonModel,{}),
  // home: types.optional(HomeModel,{}),

});

export const createStore = () => RootStore.create({});