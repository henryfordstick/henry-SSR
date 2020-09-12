import {getQueryValue} from "@utils/util";

describe('工具库函数单元测试',() =>{
  test('getQueryValue get result',() => {
    expect(getQueryValue('name','http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明'))
      .toBe('小明');
    expect(getQueryValue('rid','http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明'))
      .toBe('1');
  })
});