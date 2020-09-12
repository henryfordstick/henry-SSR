/**
 2  * [通过参数名获取url中的参数值]
 3  * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
 4  * @param  {[string]} queryName [参数名]
 5  * @return {[string]}           [参数值]
 * @return {null}
 * @return {string}
 6  */
export function getQueryValue(queryName: string,url?:string) {
  let query = decodeURI(window.location.search.substring(1)) || url || "";
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === queryName) {
      return pair[1];
    }
  }
  return null;
}