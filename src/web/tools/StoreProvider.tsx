import React from "react";
import {RootStoreType,createStore} from "@models/root.store";

export const storeContext = React.createContext<RootStoreType | null>(
  createStore()
);