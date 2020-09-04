import useStoreData from "@tools/useStoreData";
import {storeContext} from "@tools/StoreProvider";
import {RootStoreType} from "@models/root.store";

export const useRootData = <Selection>(dataSelector: (Store:RootStoreType) => Selection) =>
  useStoreData(storeContext,contextData => contextData!,dataSelector);