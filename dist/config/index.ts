import {extend} from "lodash";
import {join} from "path";

let config = {
  viewDir: join(__dirname,'..','views'),
  staticDir: join(__dirname,'..','assets'),
  memoryFlag: false,
  port: 8000,
};

if(process.env.NODE_ENV === "development"){
  const localConfig = {
    port: 8081,
    memoryFlag: false,
  };
  config = extend(config,localConfig);
}

if(process.env.NODE_ENV === "production"){
  const prodConfig = {
    port: 8082,
    memoryFlag: true
  };
  config = extend(config,prodConfig);
}

export default config;
