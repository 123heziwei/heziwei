const express = require("express");
const app = express();
const port = 3003;
const user = require('./sql/user.js') 
const fs = require("fs");
const md5 = require("md5");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

// const user = require('./sql/user')
var cors=require('cors');
 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));





//123   md5(123)  Jhi78   1 A向后推10位数 10J 

const passwdCrypt = (req, res, next) => {
    var passwd = req.body.password;
    req.body.passwdCrypted = md5(passwd);
    next();
};





app.post('/ce', (req,res)=>{
    console.log('进来了ce')
    console.log(req.body )
    res.send({
        code:'1000',
        info:'success',
        info2:req.body.user_info
    })
})





app.get("/", (req, res) => res.send("Hello World!"));
app.post("/init", passwdCrypt, (req, res) => {
    res.send("init password is:" + req.body.passwdCrypted);
    // init password is:f5e441058f94f7318dc0【明文密码是123456】
});
const checkToken = function(req,res,next) {
    console.log('我进入校验token识别 这一步了')
    console.log('token')
    console.log(req.query.token)
    // 怎么样都可以传  这只是一种传递方式  能过来让服务器看见token就可以了
    var _token = req.query.token

    //这里要做 更合理的  各种情况的处理
    try {
        // jwt引擎 反推这个秘文  是否是我给你的  是的话 把你秘文变成你的 用户信息 还原
        let verify = jwt.verify(_token,jwt_secret)
        console.log('verify')
        console.log(verify)
        if(verify) {
            console.log('我进入verify里面了')
            req.body.user_info = verify
            console.log('req.body.user._info',req.body.user_info)
            next()
        }
        
       
    } catch (error) {
        res.send({
            code:'888',
            info:'你是不是没有我们的权限token乱来啊请重新登陆 '
        })
    }
}



app.get('/userinfo',checkToken,(req,res)=>{
    console.log('进来了/api/v1/user_info')
    console.log(req.body.user_info)
    res.send({
        code:'1000',
        info:'success',
        info2:req.body.user_info
    })
})
//  先命中注册 然后不往后执行 要执行 passwdCrypt函数
app.post('/zhuce',passwdCrypt,(req,res)=>{
    console.log('zhuce我进来了')
    // 拿get请求的参数 req.query  
    //post 请求 req.body 
    var obj = {
         
        mobile:req.body.mobile,
        // password:req.body.password,
        password:req.body.passwdCrypted
    }
    user.findOne({mobile:req.body.mobile},(err,data)=>{
        if(err) {
            console.log(err)
        }
        // 如果查到了 有data代表注册过  让她继续停留在注册页面 别管他‘
        
        if(data) {
            res.send({
                code:'409',
                message:'已经注册过了'
            })
        }else {
            // 如果没注册  开始注册 注册好了 进login页面 让他登录
            user.insertMany(obj,(err,data)=>{
                if(err) {
                    console.log('err',err)
                }
                console.log(data)
                //数据库有他就可以进入 /login 
                 res.send({
                     code:'200',
                     msg:data,
                     message:'注册成功'
                 })
            })
        }
    })
    
})



const jwt_secret = 'aaa'
app.post('/login',passwdCrypt, async (req,res)=>{
    console.log('/login')
    //这一步呼应 上面中间件处理的哪一步 req.body.passwdcrpyt = a 
    let {mobile,passwdCrypted} = req.body 
    console.log('mobile',mobile)
    console.log('passwdcrpty',passwdCrypted)
    let result = await user.findOne({mobile,password:passwdCrypted})
    if(result) {
        res.send ({
            code:'1000',
            info:'success',
            mobile:mobile,
            data:{
                _token:jwt.sign({
                    // userId:result.userId,
                    password:passwdCrypted,
                    mobile:result.mobile
                },
                    jwt_secret,
                    { expiresIn: 60*60*60}
                )
            }
        })
    }else {
        res.send({
            code:'9999',
            info:'走开 你不是我的用户 '
        })
    }


    
    

})





//用于axios企业封装  后端需求 


//  以下前后端连调代码  axios精讲

app.get("/axiosget1", (req, res) => {
    console.log("进来/axiosget1里面了");
    console.log(req.query);

    // setTimeout(()=>{
    //     res.status(200).send({
    //         code:'6102',
    //         data:'我是数据666'
    //       })
    // },2000)
  
  
   
  
    setTimeout(()=>{
      res.status(403).send({
        // 4000代码代表这个用户 很危险 曾经多次尝试攻击我们服务器
        //多次没权限想翻墙攻击我们
        code:'4000',
        data:'可能存在什么错误哦'
      })
    },3000)
  
  });


  app.get("/axiosget2", (req, res) => {
    console.log("进来/axiosget2里面了");
    console.log(req.query);
  
  
    // res.status(200).send({
    //   code:'666',
    //   data:'我是数据666',
    //   data2:req.query
    // })
  
 
      res.status(403).send({
        // 4000代码代表这个用户 很危险 曾经多次尝试攻击我们服务器
        code:'4000',
        data:'可能存在什么错误哦',
        data2:req.query
      })
 
  
  });
  



  app.post("/axiospost1", (req, res) => {
    console.log("进来/axiospost1里面了");
    console.log(req.body)
  
  
    // res.status(200).send({
    //   code:'666',
    //   data:'我是数据666',
       
    // })
  
//  实际用的时候 是啥你就写啥 就把http报错状态码 打印一张纸 放在你的工位前面！！！！
      res.status(505).send({
        // 4000代码代表这个用户 很危险 曾经多次尝试攻击我们服务器
        code:'4000',
        data:'可能存在什么错误哦',
        
      })
 
  
  });






  app.post("/axiospost2", (req, res) => {
    console.log("进来/axiospost2里面了");
    console.log(req.body)
  
  
    res.status(200).send({
      code:'666',
      data:'我是数据666',
      data2:req.body
       
    })
  
 
    //   res.status(505).send({
    //     // 4000代码代表这个用户 很危险 曾经多次尝试攻击我们服务器
    //     code:'4000',
    //     data:'可能存在什么错误哦',
    //      data2:req.body
    //   })
 
  
  });








//   以下react专属API设计 


app.get("/globaltravel", (req, res) => {
    console.log("进来/reactxiangmu1里面了");
    console.log(req.query)
  
  
    res.send({
      code:'666',
      data:'我是数据666',
      data2: {
        "id": "fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1",
        "title": "埃及阿斯旺+卢克索+红海Red Sea+开罗+亚历山大12日跟团游(5钻)",
        "description": "【官方旗舰明星纯玩团】25人封顶|含签证小费全程餐|3晚尼罗河游轮+3晚红海全包度假村+1晚底比斯古都|升级内陆飞机|优质中文导游队伍|七大神庙+赠项目",
        "price": 1199.999,
        "originalPrice": 11999.99,
        "discountPresent": 0.1,
        "rating": 3.5,
        "travelDays": "EightPlus",
        "tripType": "HotelAndAttractions",
        "departureCity": "Beijing",
        "createTime": "0001-01-01T00:00:00",
        "updateTime": null,
        "departureTime": null,
        // "features":  "<div><h1>hello world</h1></div>",
       
        
      
        
         "features": "<div class=\"bd\"><p style=\"text-align:center\"><strong><span style=\"color:#ffffff;font-size:24px\"><a href=\"http://vacations.ctrip.com/tour/detail/p19441039s2.html\" target=\"_blank\"></a></span></strong><strong style=\"color:rgb(192, 0, 0)\"><span style=\"font-size:24px\">【2020自营一价包升级款：埃及五星尼罗河游轮+红海度假+古文明探索12日内陆飞机精品团】</span></strong></p><p style=\"text-align:center\"><span style=\"color:rgb(192, 0, 0)\"><strong><span style=\"color:rgb(192, 0, 0);font-size:14px\"><strong style=\"color:rgb(34, 34, 34);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;font-size:14px;text-align:center;white-space:normal;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);font-size:24px;position:static;height:auto\">【25人封顶小团|增加底比斯古都停留|赠特色项目|行程更舒适】</span></strong></span></strong></span></p><p style=\"text-align:center\"><span style=\"color:rgb(0, 0, 0)\"><span style=\"font-size:14px;background-color:rgb(255, 255, 255)\">*畅销好评多年,超6000人出游超好评</span><span style=\"font-size:14px;background-color:rgb(255, 255, 255)\">！线路可以模仿,品质无法同比,图片可以抄袭,点评无法仿造*</span></span><br></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);text-align:center;font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><br></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【升级说明】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">2020年明星产品再次升级，一生只去一次的埃及不能只看表面，食住行游娱之外更重要的就是中文导游专业讲解，我们多年合作的优质中文导游队伍一定让您不虚此行！</span></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><strong style=\"float:none;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">冬季重磅升级·跟团游玩出新花样</span></strong></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【人数封顶】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">整团人数25位封顶，告别拥挤超级大团！</span></span><span style=\"color:rgb(192, 0, 0);position:static;height:auto\"><br>☆【住卢克索】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">卢克索尼罗河畔住宿1晚，底比斯古都私属时光！</span></span></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【超长游览】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">埃及历史博物馆超长游览3小时,不留遗憾！</span></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【特色项目】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">乘马车晨游底比斯古都，你会懂为什么那么多电影大片偏爱卢克索！</span></span><span style=\"color:rgb(192, 0, 0);position:static;height:auto\"><br>☆【特别安排】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">学画象形文字，制作一幅属于自己的纸草画！（每人赠送1张）</span></span></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【巴士升级】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">16位游客以上团队直接升级奔驰品牌巴士！没有什么比行驶安全更重要！</span></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><strong style=\"float:none;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">&nbsp;经典内飞版尼罗河游轮旅行 七大神庙+五大景区</span></strong></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【特色主题】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">尼罗河游轮穿越千年文明+浪漫红海度假+古文明探索!<br><span style=\"color:rgb(255, 0, 0);position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【五大景区】</span><span style=\"color:rgb(0, 0, 0);position:static;height:auto\">开罗+阿斯旺+卢克索+红海+亚历山大真正全景环游！</span></span><br></span></span><span style=\"color:rgb(255, 0, 0);position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【七大神庙】</span><span style=\"color:rgb(0, 0, 0);position:static;height:auto\">六大经典神庙入内(两游轮专享)+可选阿布辛贝神庙！<br><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【重要景点】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">金字塔+狮身人面像+埃及博物馆一个都不能少！</span></span></span></span></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"><span style=\"color:rgb(255, 0, 0);position:static;height:auto\"><span style=\"color:rgb(0, 0, 0);position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\"><span style=\"color:rgb(0, 0, 0);position:static;height:auto\"><span style=\"color:rgb(192, 0, 0)\">☆【游轮住宿】</span><span style=\"position:static;height:auto\">尼罗河游轮3晚连住,常年合作品质游轮(河景房标准间)！</span><br></span></span></span></span></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【红海度假】</span><span style=\"color:rgb(0, 0, 0);position:static;height:auto\">红海海滨指定卓越度假村3晚连住,真正度假之旅！</span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"><span style=\"color:rgb(255, 0, 0);position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【升级内飞】</span><span style=\"color:rgb(0, 0, 0);position:static;height:auto\">升级一段内陆飞机,不乘不能洗澡的夜火车！</span></span><br></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\"><strong style=\"color:rgb(34, 34, 34);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;font-size:14px;white-space:normal;position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">&nbsp;省心预订放心出行&nbsp;包含超千元签证小费等必含费用</span></strong></span></p><p><span style=\"font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;font-size:14px;background-color:rgb(255, 255, 255);color:rgb(192, 0, 0);position:static;height:auto\">☆【便捷签证】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">跟团办理落地签,无需护照原件无需提交材料!</span></span><br><span style=\"font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;font-size:14px;background-color:rgb(255, 255, 255);color:rgb(192, 0, 0);position:static;height:auto\">☆【包含小费】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">含价值900元司导服务小费+尼罗河游轮服务费!<br><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【省心含餐】<span style=\"color:rgb(0, 0, 0);position:static;height:auto\">含埃及境内全程正餐,无自理餐安排,省心放心！</span></span></span></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"><span style=\"color:rgb(255, 0, 0);position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【安全保障】</span><span style=\"color:rgb(0, 0, 0);position:static;height:auto\">多年</span></span>合作当地知名地接社+优质持证导游队伍！</span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"><span style=\"color:rgb(192, 0, 0);position:static;height:auto\">☆【服务设备】</span>车载WIFI满足上网需求！</span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"><br></span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\">特别说明：为了丰富行程体验,即日起将赠送尼罗河风帆船项目更改为赠送卢克索乘马车晨游底比斯古都，变更不再单独通知。</span></p><p style=\"margin-top:0px;margin-bottom:0px;padding:0px;color:rgb(34, 34, 34);font-size:14px;white-space:normal;background-color:rgb(255, 255, 255);font-family:Arial, &quot;Lucida Grande&quot;, Verdana, &quot;Microsoft YaHei&quot;, hei;float:none;position:static;height:auto\"><span style=\"position:static;height:auto\"></span></p><p><img imageid=\"21313898\" src=\"//dimg04.c-ctrip.com/images/30050o000000f6rizD972.jpg\" data-src=\"//dimg04.c-ctrip.com/images/30050o000000f6rizD972.jpg\" title=\"A-NEW.jpg\" imageauthorize=\"21313898图片有效-有效期\" style=\"opacity: 1;\"> &nbsp; <br></p></div>",
        "fees": "<div class=\"bd\"><dl class=\"mod_info_box\"><dt>费用包含</dt><dd><div class=\"tour_description_table_box\"><table class=\"tour_description_table\"><tbody><tr><th>大交通</th><td><p>往返含税经济舱机票</p></td></tr><tr><th>住宿</th><td><p>行程所列酒店住宿费用</p><p>酒店标准2人间</p></td></tr><tr><th>餐食</th><td><p>行程内所列餐食，具体情况请见行程推荐/安排、飞机餐是否收费请参照航空公司规定</p></td></tr><tr><th>门票及地面项目</th><td><p>行程中所列景点首道大门票旅游用车</p></td></tr><tr><th>随团服务人员</th><td><p>中文领队和当地中文导游服务</p></td></tr><tr><th>儿童价标准</th><td><p>年龄2-12周岁（不含），不占床，服务标准同成人</p></td></tr></tbody></table></div></dd></dl><dl class=\"mod_info_box\"><dt>自理费用</dt><dd><div class=\"tour_description_table_box\"><table class=\"tour_description_table\"><tbody><tr><th>儿童附加费</th><td><p>团队中儿童的价格均为不占床含早餐的价格，如需占床，请在预订后续页面中选择儿童占床补差可选项；1位成人携带1位儿童出行，儿童必须占床，请选择儿童占床补差可选项。</p></td></tr><tr><th>补充</th><td><p>出入境个人物品海关征税; 超重行李的托运费、保管费;  酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费; 自由活动期间的用车服务; 提供导游服务的产品在自由活动期间无陪同服务; 当地参加的自费以及“费用包含”中不包含的其它项目</p><p>单房差</p></td></tr></tbody></table></div></dd></dl><dl class=\"mod_info_box\"><dt>推荐活动参考 （需自费）</dt><dd><div class=\"tour_self_table_box\"><table class=\"tour_self_table\"><tbody><tr><th style=\"width: 170px;\">活动</th><th style=\"width: 110px;\">参考价格</th><th>说明</th></tr><tr><td>菲莱神庙声光秀</td><td>70美金/人（2-5人）</td><td>70美金/人（2-5人）65美金/人（6-9人）60美金/人（10人及以上）费用包含：车费、导游费用、景点门票</td></tr><tr><td>金字塔声光秀</td><td>75美金/人（2-5人）</td><td>在现代声与光的结合下，感受4千多年前的历史沧桑。含接送服务，中文导游陪同以及门票。<br>75美金/人（2-5人）<br>65美金/人（6人以上）<br></td></tr><tr><td>夜游尼罗河</td><td>85美金/人（4-9人）</td><td>晚上乘坐尼罗河游船，欣赏两岸风光，并在船上享用晚餐（不含酒水饮料），欣赏当地特色表演（斋月期间表演暂停）。包含码头接送服务，以及中文导游陪同服务。<br>85美金/人（4-9人）<br> 75美金/人（10人及以上）<br></td></tr><tr><td>阿布辛贝神庙</td><td>145美金/人</td><td>早上约4点左右出发，在沙漠护卫队下前往和返回。阿布辛贝神庙是阿斯旺的旅游重点。是古埃及伟大的法老拉美西斯二世（ Ramses Ⅱ）所建，也是新帝国的法老王时代受保护的遗迹。包含车费，中文导游陪同和讲解服务以及景点门票<br>145美金/人（6-9人）<br>140美金/人（10-14人）<br>125美金/人（15人及以上）<br></td></tr><tr><td>阿斯旺努比亚村游览</td><td>50美金/人（4-7人）</td><td>搭乘小船前往阿斯旺特有的“少数民族”村落--努比亚村。在这里可以体验到古老的努比亚文明，参观努比亚人特有的彩色房子，学习当地语言，并参观当人家。包含码头接送服务，中文导游陪同以及努比亚村特色饮料和骑骆驼。<br>50美金/人（4-7人）<br>45美金/人（8人及以上）<br></td></tr><tr><td>四驱吉普冲沙</td><td>90美金/人（4-7人）</td><td>下午2点半左右，搭乘四驱车从酒店出发，前往埃及特有的东部隔壁沙漠冲沙。在空旷的隔壁中放飞自我。爬上沙丘顶端欣赏日落。之后前往古老的贝都因人村落，一探贝都因人的生活。并体验骑骆驼的乐趣。返程途中幸运的话还可以看到满天繁星。<br>注意：此项目为刺激性项目。四驱车行驶过程中较为颠簸，存在一定风险性，老弱妇孺及病患请慎重参加！上下骆驼请注意安全！若用车座椅未配备安全带，请您拒绝上车并要求退还相应费用！<br>90美金/人（4-7人）<br>80美金/人（8人以上）<br>费用包含：4*4吉普车费、导游费用、景点门票、BBQ烤肉晚餐</td></tr><tr><td>吉夫顿岛游览</td><td>80美金/人（10人以上）</td><td>早上8点半左右从酒店出发，前往码头，登上游艇，进入美丽的红海。包船出海不与其他游客拼船，尽享红海风景。喂海鸥，钓鱼，浮潜各项游乐随心选择。游艇上提供浮潜设备，钓鱼基本设备。中午在船上享用简单午餐。包括接送，中文导游陪同服务。<br>注意：<br>乘坐游艇出海上下船时请注意安全，依次排队切勿拥挤、小心地滑。船长和救生员未作出安排前，切勿做出危险性动作。由于游艇速度较快，海上较为颠簸，老弱妇孺及病患请慎重参加！）<br>80美金/人（10人以上）<br></td></tr><tr><td>辛巴达号潜艇</td><td>115美金/人（2人起）</td><td>前往码头搭乘快艇前往潜水艇平台，搭乘潜水艇潜入7米深红海，欣赏神秘美丽的红海海底世界。并有潜水员为您献上海底喂鱼的表演。含接送，中文导游陪同<br>注意：<br>此项目为刺激性项目，由于海下具有一定压强，老弱妇孺及病患请慎重参加！<br>115美金/人（2人起）</td></tr><tr><td>红海玻璃船游览</td><td>70美金/人（4人起）</td><td>搭乘特殊定制的游船，在游船底部设有大型观光窗，便于欣赏奇妙的海底世界。包含接送，中文导游陪同<br>注意：<br>上下船时请注意安全，依次排队切勿拥挤、小心地滑。<br>70美金/人（4人起）</td></tr><tr><td>卢克索热气球</td><td>165美金/人（2-3人）</td><td>早上5点左右从酒店出发前往码头，搭乘小船前往尼罗河西岸。小船上准备有热咖啡，茶，以及小点心。搭乘热气球迎接日出，并俯瞰卢克索。途径哈布城，女王神庙，帝王谷等景点，从高空体验不一样的卢克索。落地后会举办一个小的庆祝仪式，并为客人颁发证书。之后专车送返酒店。<br>特别提示：<br>1.热气球项目为高风险项目，请根据自身情况谨慎选择参加。<br>2.行程安排仅供参考，视当天具体天气情况而定。若因天气状况而无法乘坐热气球，则原价退还！<br>3.小童不满7岁无法参加此项目<br>4.热气球期间，领队与导游全程不陪同。上下热气球时请按次序耐心等待，切勿着急上下热气球而作出危险动作，以免发生意外。且飞且珍惜！165美金/人（2-3人）<br><br>150美金/人（4人及以上）</td></tr><tr><td colspan=\"3\">以上所列项目均是建议性项目，客人本着“自愿自费”的原则选择参加，部分项目参加人数不足或资源不足时，可能无法成行。</td></tr></tbody></table></div></dd></dl></div>",
        "notes": "<div class=\"bd\"><dl class=\"mod_info_box\"><dt>费用包含</dt><dd><div class=\"tour_description_table_box\"><table class=\"tour_description_table\"><tbody><tr><th>大交通</th><td><p>往返含税经济舱机票</p></td></tr><tr><th>住宿</th><td><p>行程所列酒店住宿费用</p><p>酒店标准2人间</p></td></tr><tr><th>餐食</th><td><p>行程内所列餐食，具体情况请见行程推荐/安排、飞机餐是否收费请参照航空公司规定</p></td></tr><tr><th>门票及地面项目</th><td><p>行程中所列景点首道大门票旅游用车</p></td></tr><tr><th>随团服务人员</th><td><p>中文领队和当地中文导游服务</p></td></tr><tr><th>儿童价标准</th><td><p>年龄2-12周岁（不含），不占床，服务标准同成人</p></td></tr></tbody></table></div></dd></dl><dl class=\"mod_info_box\"><dt>自理费用</dt><dd><div class=\"tour_description_table_box\"><table class=\"tour_description_table\"><tbody><tr><th>儿童附加费</th><td><p>团队中儿童的价格均为不占床含早餐的价格，如需占床，请在预订后续页面中选择儿童占床补差可选项；1位成人携带1位儿童出行，儿童必须占床，请选择儿童占床补差可选项。</p></td></tr><tr><th>补充</th><td><p>出入境个人物品海关征税; 超重行李的托运费、保管费;  酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费; 自由活动期间的用车服务; 提供导游服务的产品在自由活动期间无陪同服务; 当地参加的自费以及“费用包含”中不包含的其它项目</p><p>单房差</p></td></tr></tbody></table></div></dd></dl><dl class=\"mod_info_box\"><dt>推荐活动参考 （需自费）</dt><dd><div class=\"tour_self_table_box\"><table class=\"tour_self_table\"><tbody><tr><th style=\"width: 170px;\">活动</th><th style=\"width: 110px;\">参考价格</th><th>说明</th></tr><tr><td>菲莱神庙声光秀</td><td>70美金/人（2-5人）</td><td>70美金/人（2-5人）65美金/人（6-9人）60美金/人（10人及以上）费用包含：车费、导游费用、景点门票</td></tr><tr><td>金字塔声光秀</td><td>75美金/人（2-5人）</td><td>在现代声与光的结合下，感受4千多年前的历史沧桑。含接送服务，中文导游陪同以及门票。<br>75美金/人（2-5人）<br>65美金/人（6人以上）<br></td></tr><tr><td>夜游尼罗河</td><td>85美金/人（4-9人）</td><td>晚上乘坐尼罗河游船，欣赏两岸风光，并在船上享用晚餐（不含酒水饮料），欣赏当地特色表演（斋月期间表演暂停）。包含码头接送服务，以及中文导游陪同服务。<br>85美金/人（4-9人）<br> 75美金/人（10人及以上）<br></td></tr><tr><td>阿布辛贝神庙</td><td>145美金/人</td><td>早上约4点左右出发，在沙漠护卫队下前往和返回。阿布辛贝神庙是阿斯旺的旅游重点。是古埃及伟大的法老拉美西斯二世（ Ramses Ⅱ）所建，也是新帝国的法老王时代受保护的遗迹。包含车费，中文导游陪同和讲解服务以及景点门票<br>145美金/人（6-9人）<br>140美金/人（10-14人）<br>125美金/人（15人及以上）<br></td></tr><tr><td>阿斯旺努比亚村游览</td><td>50美金/人（4-7人）</td><td>搭乘小船前往阿斯旺特有的“少数民族”村落--努比亚村。在这里可以体验到古老的努比亚文明，参观努比亚人特有的彩色房子，学习当地语言，并参观当人家。包含码头接送服务，中文导游陪同以及努比亚村特色饮料和骑骆驼。<br>50美金/人（4-7人）<br>45美金/人（8人及以上）<br></td></tr><tr><td>四驱吉普冲沙</td><td>90美金/人（4-7人）</td><td>下午2点半左右，搭乘四驱车从酒店出发，前往埃及特有的东部隔壁沙漠冲沙。在空旷的隔壁中放飞自我。爬上沙丘顶端欣赏日落。之后前往古老的贝都因人村落，一探贝都因人的生活。并体验骑骆驼的乐趣。返程途中幸运的话还可以看到满天繁星。<br>注意：此项目为刺激性项目。四驱车行驶过程中较为颠簸，存在一定风险性，老弱妇孺及病患请慎重参加！上下骆驼请注意安全！若用车座椅未配备安全带，请您拒绝上车并要求退还相应费用！<br>90美金/人（4-7人）<br>80美金/人（8人以上）<br>费用包含：4*4吉普车费、导游费用、景点门票、BBQ烤肉晚餐</td></tr><tr><td>吉夫顿岛游览</td><td>80美金/人（10人以上）</td><td>早上8点半左右从酒店出发，前往码头，登上游艇，进入美丽的红海。包船出海不与其他游客拼船，尽享红海风景。喂海鸥，钓鱼，浮潜各项游乐随心选择。游艇上提供浮潜设备，钓鱼基本设备。中午在船上享用简单午餐。包括接送，中文导游陪同服务。<br>注意：<br>乘坐游艇出海上下船时请注意安全，依次排队切勿拥挤、小心地滑。船长和救生员未作出安排前，切勿做出危险性动作。由于游艇速度较快，海上较为颠簸，老弱妇孺及病患请慎重参加！）<br>80美金/人（10人以上）<br></td></tr><tr><td>辛巴达号潜艇</td><td>115美金/人（2人起）</td><td>前往码头搭乘快艇前往潜水艇平台，搭乘潜水艇潜入7米深红海，欣赏神秘美丽的红海海底世界。并有潜水员为您献上海底喂鱼的表演。含接送，中文导游陪同<br>注意：<br>此项目为刺激性项目，由于海下具有一定压强，老弱妇孺及病患请慎重参加！<br>115美金/人（2人起）</td></tr><tr><td>红海玻璃船游览</td><td>70美金/人（4人起）</td><td>搭乘特殊定制的游船，在游船底部设有大型观光窗，便于欣赏奇妙的海底世界。包含接送，中文导游陪同<br>注意：<br>上下船时请注意安全，依次排队切勿拥挤、小心地滑。<br>70美金/人（4人起）</td></tr><tr><td>卢克索热气球</td><td>165美金/人（2-3人）</td><td>早上5点左右从酒店出发前往码头，搭乘小船前往尼罗河西岸。小船上准备有热咖啡，茶，以及小点心。搭乘热气球迎接日出，并俯瞰卢克索。途径哈布城，女王神庙，帝王谷等景点，从高空体验不一样的卢克索。落地后会举办一个小的庆祝仪式，并为客人颁发证书。之后专车送返酒店。<br>特别提示：<br>1.热气球项目为高风险项目，请根据自身情况谨慎选择参加。<br>2.行程安排仅供参考，视当天具体天气情况而定。若因天气状况而无法乘坐热气球，则原价退还！<br>3.小童不满7岁无法参加此项目<br>4.热气球期间，领队与导游全程不陪同。上下热气球时请按次序耐心等待，切勿着急上下热气球而作出危险动作，以免发生意外。且飞且珍惜！165美金/人（2-3人）<br><br>150美金/人（4人及以上）</td></tr><tr><td colspan=\"3\">以上所列项目均是建议性项目，客人本着“自愿自费”的原则选择参加，部分项目参加人数不足或资源不足时，可能无法成行。</td></tr></tbody></table></div></dd></dl></div>",
        "touristRoutePictures": [
            {
                "id": 1,
                "url": "https://s3.ax1x.com/2020/12/15/rMQOIJ.jpg",
                "touristRouteId": "fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1"
            },
            {
                "id": 2,
                "url": "https://s3.ax1x.com/2020/12/15/rMQRaQ.jpg",
                "touristRouteId": "fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1"
            },
            {
                "id": 3,
                "url": "https://s3.ax1x.com/2020/12/15/rMQhPs.jpg",
                "touristRouteId": "fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1"
            },
            {
                "id": 4,
                "url": "https://s3.ax1x.com/2020/12/15/rMQIx0.jpg",
                "touristRouteId": "fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1"
            }
        ],
        "links": [
            {
                "href": "http://123.56.149.216:8080/api/TouristRoutes/fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1",
                "rel": "self",
                "method": "GET"
            },
            {
                "href": null,
                "rel": "update",
                "method": "PUT"
            },
            {
                "href": null,
                "rel": "partially_update",
                "method": "PATCH"
            },
            {
                "href": null,
                "rel": "delete",
                "method": "DELETE"
            },
            {
                "href": "http://123.56.149.216:8080/api/touristRoutes/fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1/pictures",
                "rel": "get_pictures",
                "method": "GET"
            },
            {
                "href": "http://123.56.149.216:8080/api/touristRoutes/fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1/pictures",
                "rel": "create_picture",
                "method": "POST"
            }
        ]
    }
       
    })
  
 
 
 
  
  });



  
  
  




























app.listen(port, () => console.log(`Server is running at http://127.0.0.1:${port}!`));