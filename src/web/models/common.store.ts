import {types,Instance} from "mobx-state-tree";

export type CommonStoreType = typeof CommonModel.Type;

export const CommonModel = types.model("CommonModel",{
  tel: types.optional(types.array(types.string),[]),
  companyName: types.optional(types.string,""),
  address: types.optional(types.string,"")
}).actions(self => ({
  getData(){
    // @ts-ignore
    self.tel = ['191 3765 9627','123 4567 5453'];
    self.companyName = '信阳绿洁居环保工程有限公司';
    self.address = '信阳市平桥区新十六街康诗丹郡C区52号楼1号店';
  }
}));