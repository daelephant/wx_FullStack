
import { Config } from '../utils/config.js';
import { Token } from 'token.js';

class Base{
  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }

  //当noRefetch为true时，不做未授权重试机制
  request(params,noRefetch){
    var that = this;
    var url = this.baseRequestUrl + params.url;

    if(!params.type){
      params.type = 'GET';
    }

    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header:{
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success:function(res){
        // if(params.sCallback){
        //   params.sCallback(res);
        // }
        //params.sCallback&&params.sCallback(res.data);


        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          //AOP
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          that._processError(res);
          if(noRefetch){
            params.eCallback && params.eCallback(res.data);
          }
        }
      },
      fail:function(err){
        console.log(err);
      }
    })
  }

  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);//这里面用this不用that是因为使用了=>箭头函数，保持环境变量不改变是箭头函数的特点。如果使用剪头函数作为回调，this是不会发生改变的，通过上面success回调是会改变的
    });
  }

  _processError(err) {
    console.log(err);
  }

  // 获取元素上的绑定的值
  getDataSet(event,key){
    return event.currentTarget.dataset[key];
  }
}
export {Base};