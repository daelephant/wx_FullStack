
import {Base} from '../../utils/base.js';

class Home extends Base{

  constructor(){
    super();
  }
  getBannerData(id,callBack){

    var params = {
      url : 'banner/'+id,
      sCallBack:function(res){
        callback && callback(res);
      }
    }
    this.request(params);

    // wx.request({
    //   url: 'http://z.cn/api/v1/banner/'+id,
    //   method:'GET',
    //   success:function(res){
    //     // console.log(res);
    //     // return res;
    //     callBack(res);
    //   }
    // })
  }
}

export {Home};