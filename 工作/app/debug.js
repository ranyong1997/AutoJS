











debugWidget = function( widget, flag ){
    flag = flag != null ? flag : 0
    if( widget ){
        let prefix = ""
        for (let idx = 0; idx < flag; idx++) {            
            prefix = prefix + "  "
        }
        log( "  " + prefix + flag + " " + widget.bounds() + " " + widget.id() + " " + widget.className() + " - " + widget.text() + " - " + widget.desc() + " - " + widget.checked() + " - " + widget.selected() + " - " + widget.clickable() + " - " + widget.visibleToUser() )
        if(widget.childCount()){
            log(  prefix + "  " +  " \\" + widget.childCount()  )
            widget.children().forEach(child => {
                debugWidget( child, flag+1 )
            });
        }
    }
}


// log( currentPackage() )
// log( currentActivity() )
// debugWidget( classNameStartsWith("android").findOne(1000) )


// let a = "@eckedIOExcepti123488"
// console.log( a.match(/@(\S+)/)[1] )


// try {
//     let url = "http://2.2.2.2/switch-ip?cityid=68000"
//     let res = http.get(url);
//     res = res.body.json()
//     log( "switch-ip?cityid=68000: " + JSON.stringify(res) )
//     if(res.code != 0){ throw res }
// } catch (error) { log(error) }






// let res = http.get( "http://192.168.91.3:8000/user/search?datatype=2&appName=whatsapp&isSuccess=1" )
// res = res.body.string()
// log(res)
// var server = null
//         var port = null
//         var taskId = null
        
//         // taskId = getQueryVariable("taskid");
//         // var plugin_url = document.URL
//         var plugin_url = "http://192.168.91.3:8012/upload/b28b008e-c171-4eda-9011-b3c88266c24f/main.html?taskid=0a98b3c0-52cb-42e7-ad70-c586a507a32a"
//         // try { server = plugin_url.match(/\\\\([\d\.]):/)[1] } catch (error) { }
//         server = plugin_url.match(/\/\/([\d\.]+):/)[1]
//         log(server)



// "aa203601cd","aa203602da","aa2036031d","aa20360352","aa2036039b","aa20360415","aa20360494","aa20360741","aa2036078d","aa203608a2","aa203608d7","aa20360929","aa20360a24","aa20360a9b","aa20360aaf","aa20360ab4"
// 21340033 tiktok_HG
// "aa20360415","aa2036078d","aa2036039b","aa2036031d","aa20360aaf","aa20360ab4","aa203602da","aa20360a24","aa20360741","aa203608a2","aa20360a9b","aa203601cd","aa20360352","aa20360929","aa203608d7","aa20360494"




md5 = function(string){
    function md5_RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
    function md5_AddUnsigned(lX,lY){
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
            } else {
                    return (lResult ^ lX8 ^ lY8);
            }
    }         
    function md5_F(x,y,z){
            return (x & y) | ((~x) & z);
    }
    function md5_G(x,y,z){
            return (x & z) | (y & (~z));
    }
    function md5_H(x,y,z){
            return (x ^ y ^ z);
    }
    function md5_I(x,y,z){
            return (y ^ (x | (~z)));
    }
    function md5_FF(a,b,c,d,x,s,ac){
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_GG(a,b,c,d,x,s,ac){
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a,b,c,d,x,s,ac){
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_II(a,b,c,d,x,s,ac){
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                    lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
    };
    function md5_WordToHex(lValue){
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for(lCount = 0;lCount<=3;lCount++){
                    lByte = (lValue>>>(lCount*8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
    };
    function md5_Utf8Encode(string){
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                            utftext += String.fromCharCode(c);
                    }else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
            }
            return utftext;
    };
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=md5_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=md5_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=md5_FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=md5_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=md5_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=md5_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=md5_FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=md5_FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=md5_FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=md5_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=md5_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=md5_GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=md5_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=md5_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=md5_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=md5_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=md5_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=md5_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=md5_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=md5_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=md5_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=md5_HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=md5_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=md5_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=md5_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=md5_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=md5_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=md5_HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=md5_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=md5_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=md5_II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=md5_II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=md5_II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=md5_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=md5_II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=md5_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=md5_II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=md5_II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=md5_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=md5_II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=md5_AddUnsigned(a,AA);
            b=md5_AddUnsigned(b,BB);
            c=md5_AddUnsigned(c,CC);
            d=md5_AddUnsigned(d,DD);
    }
    return (md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}
/**
 * 
 * @param {*} type 素材类型（0:纯文本；1:图片；2:视频；3:音频）
 * @param {*} count 获取数量
 * @param {*} classify 分类
 * @param {*} used_times 已使用次数低于n次(不传默认无限制)
 * @param {*} lable 标签(不传默认无限制)
 * @returns 
 */
let getMaterials = function( type, count, classify, used_times, lable ){
// let getMaterials = function( args ){
    try {
        let args_data = {
            "type": type,
            "count": count,
            "classify": classify,
            "used_times": used_times,
            "lable": lable
        } 
        // if( !args || !args.type ){ throw "参数异常 " + args }
        // let args_data = {}
        // args_data.type  = args.type || 1
        // args_data.count = args.count || 1
        // args_data.classify = args.classify || 1
        // args_data.used_times = args.used_times || null
        // args_data.lable = args.lable || null

        let app_id = "2556dd6d0987e7e6f00c956a688e217a"
        let app_secret = "200d5a8ed05c67a385797c0f3d067b1d"
        // let ts = "1591680284041"
        let ts = new Date().getTime()
        // log(ts)
        // log( new Date().getTime() )
        let call = "material_get"
        let version = "1.0.0"   
        let sign = md5( app_id + ts + call + JSON.stringify(args_data) + version + app_secret )
        let data_json = {
            "data": {
                "app_id": app_id,
                "ts": ts,
                "call": call,
                "version": version,
                "args": args_data,
                "sign": sign
            }
        }
        // delete data_json.lable
        log(data_json)
        let res = http.postJson("http://192.168.91.3:3002/i/a/" ,data_json )
        res = res.body.json()
        if( res.data && res.data.code == "000000" ){
            return res.data.data.materials
        }
        // log( JSON.stringify(res) )
        // log( res.data )
        throw res        
    } catch (error) {
        throw error
    }
}
/**
 * 
 * @param {*} type 素材类型（0:纯文本；1:图片；2:视频；3:音频）
 * @param {*} classify 文本素材类型（0:默认；1:昵称；2:简介；3:外链; 4:对话模板）
 * @param {*} used_times 已使用次数低于n次(不传默认无限制)
 * @param {*} lable 标签(不传默认无限制)
 * @returns 
 */
 let getMaterial = function( type, classify, used_times, lable ){
    try {
        return getMaterials(type, 1, classify, used_times, lable)[0]
    } catch (error) {
        log(error)
        // throw error
    }
}
// let data = getMaterial( 0, 1, 0, null)
// log( JSON.stringify(data) )

let rollback = function( type, count, classify, used_times, lable ){
    // let getMaterials = function( args ){
    try {
        let args_data = {                
            "mid": 3380
        } 
        // if( !args || !args.type ){ throw "参数异常 " + args }
        // let args_data = {}
        // args_data.type  = args.type || 1
        // args_data.count = args.count || 1
        // args_data.classify = args.classify || 1
        // args_data.used_times = args.used_times || null
        // args_data.lable = args.lable || null

        let app_id = "2556dd6d0987e7e6f00c956a688e217a"
        let app_secret = "200d5a8ed05c67a385797c0f3d067b1d"
        // let ts = "1591680284041"
        let ts = new Date().getTime()
        // log(ts)
        // log( new Date().getTime() )
        let call = "material_rollback"
        let version = "1.0.0"   
        let sign = md5( app_id + ts + call + JSON.stringify(args_data) + version + app_secret )
        let data_json = {
            "data": {
                "app_id": app_id,
                "ts": ts,
                "call": call,
                "version": version,
                "args": args_data,
                "sign": sign
            }
        }
        // delete data_json.lable
        log(data_json)
        let res = http.postJson("http://192.168.91.3:3002/i/a/" ,data_json )
        res = res.body.json()
        if( res.data && res.data.code == "000000" ){
            // return res.data.data.materials
        }
        log( JSON.stringify(res) )
        // log( res.data )
        throw res        
    } catch (error) {
        throw error
    }
}
// rollback()


// {"data":{"code":"000000","msg":"success","data":{"materials":[{"id":22,"text_content":"","media_path":"http://192.168.91.3:3302/taurus/production/typhoon/img/material/20210731/1627716277732-eWv1uh.jpg","media_size":125,"lables":"automotive & transportation,beauty"}]},"cost":5}}
// {
//     "data":{
//         "code":"000000",
//         "msg":"success",
//         "data":{
//             "materials":[
//                 {
//                     "id":22,
//                     "text_content":"",
//                     "media_path":"http://192.168.91.3:3302/taurus/production/typhoon/img/material/20210731/1627716277732-eWv1uh.jpg",
//                     "media_size":125,
//                     "lables":"automotive & transportation,beauty"
//                 }
//             ]
//         },
//         "cost":5
//     }
// }


// log( app_id + ts + call + JSON.stringify(args) + version + app_secret )
// log( sign )

// log( JSON.stringify( data_json ) )
// let res = http.postJson("http://192.168.91.3:3002/i/a/" ,data_json )
// res = res.body.json()
// // log( JSON.stringify(res) )
// log( res )

// let data =
// { data: 
//     { app_id: '2556dd6d0987e7e6f00c956a688e217a',
//       ts: '1591680284041',
//       call: 'material_get',
//       version: '1.0.0',
//       args: { count: 1, type: 1, classify: 1, used_times: 0 },
//       sign: '87ec357d30a771e82ab9a2c389334096' 
//     } 
// }











// log( currentPackage() )
// log( currentActivity() )
// debugWidget( classNameStartsWith("android").findOne(1000) )




// let account = {"id":40838,"appName":"tiktok","type":1,"username":"user5326144272886","password":null,"email":null,"emailPassword":null,"phone":"8386390174","smsurl":"http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=af531cb9-a613-4470-a922-25d55465920b","isRegistered":false,"isProcess":true,"extra":null,"dialCode":"1","city":null,"country":null,"countryCode":"US","createTime":"2021-08-05T13:44:32.023Z","phoneProvider":"globalsms","emailProvider":null,"proxy":"SOCKS5,44.193.164.123,46363","proxyProvider":"doveip","tag":"20210805(tt_350)","updateTime":"2021-08-11T03:22:15.385Z","ip":"65.24.180.70","isUsed":true,"isSuccess":true,"deviceId":"AA20360388","folderId":"1","deviceInfo":"Nokia-NokiaX6","desc":null}
// let url = "http://192.168.91.3:8000/user/registered"
//         let res = http.postJson(url, account)
//         res = res.body.json()
//         log( JSON.stringify(res) )
        // if( res.code == 200 ){
        //     // reportLog("记录注册结果完成: " + res.data )
        //     let record_account = JSON.parse( res.data )
        //     return record_account
        // }else{
        //     throw res
        // }        

// let timeZone = "en-US"
// let _str = timeZone.split("-") 
// log(_str)
// let data = {
//     "data": {
//       "app_id": "2556dd6d0987e7e6f00c956a688e217a",
//       "ts": "1591680284041",
//       "call": "material_get",
//       "version": "1.0.0",
//       "args": {
//           "count": 1,
//           "type": 1,
//           "classify": 1,
//           "used_times": 0,
//           "lable": "art"
//       },
//       "sign": "594AE138-6800-4D5C-B0D8-9215A5AD2B7B"
//       }
//   }
//   log( JSON.stringify( {
//     "count": 1,
//     "type": 1,
//     "classify": 1,
//     "used_times": 0,
//     "lable": "art"
// } ) )
// "{"count":1,"type":1,"classify":1,"used_times":0,"lable":"art"}"
// md5(app_id + ts + call + JSON.stringify(args) + version + app_secret)

// let sign = "2556dd6d0987e7e6f00c956a688e217a" + "1591680284041" + "material_get" + JSON.stringify( {
//     "count": 1,
//     "type": 1,
//     "classify": 1,
//     "used_times": 0,
//     "lable": "art"
// } ) + "1.0.0" + "200d5a8ed05c67a385797c0f3d067b1d"
// importClass(android.provider.Settings);
// importClass(android.content.Context);
// importClass(java.util.TimeZone);
// importClass(java.util.Locale);

// setSystemTimezone = function (timeZone){
//     try {
//         shell("setprop persist.sys.timezone "+timeZone);
//         Settings.Global.putInt(context.getContentResolver(),Settings.Global.AUTO_TIME_ZONE, 0);
//         let am = context.getSystemService(Context.ALARM_SERVICE)
//         am.setTimeZone(timeZone)        
//     } catch (error) {
//         throw error
//     }
// }
// setSystemTimezone( "Asia/Ho_Chi_Minh" )
// log( Locale.getDefault().getLanguage()+"-"+Locale.getDefault().getCountry() )
// log( TimeZone.getDefault().getID() )
// getProxyFromDoveip = function( base_url, args ){ 
//     try {
//         if( !base_url || !args ){ throw "getProxyFromDoveip 参数异常" }
//         return newThread(function(){ 
//             let geo         = args.geo || "US"
//             let selfip      = args.selfip || ""
//             let accurate    = args.accurate || 0
//             let timeout     = args.timeout  || 10
//             let agreement   = args.agreement || 0
//             let url = base_url + "&geo="+geo+"&selfip="+selfip+"&accurate="+accurate+"&timeout="+timeout+"&agreement="+agreement
//             log(url)
//             let res = http.get(url)
//             res = res.body.json()
//             if(res.errno == 200){
//                 proxy_info = "SOCKS5" + "," + res.data.ip + "," + res.data.port
//                 return proxy_info
//             }
//             throw res
//         },null, 1000*20, ()=>{ throw "超时退出" })
//     } catch (error) { throw "获取代理超时退出" + JSON.stringify(error) }
// }
// log( getProxyFromDoveip( "http://dvapi.doveip.com/cmapi.php?rq=distribute&user=ip210520&token=akduVTV2T0FhRjdGa2F5T1J4Q1ZSdz09", {} ) )
// let url = "https://gimg2.Baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1114%2F0H120155P2%2F200H1155P2-8-1200.mp4"
// // log( url.match( /\.[^\.]+$/ )[0] )
// log( url.match( /\.\w{3,5}$/ )[0] )
// log( new RegExp( /(baidu.com)/i ).test(url) )
// log( url.match( new RegExp( /(baidu.com)/i ) )[0] )

// let tab = {
//     "aa":"aaa",
//     "bb" : "bbbb"
// }
// log(tab)
// delete tab.aa
// log(tab)





// setText( "hello" )
// log( "创建媒体文件夹: " + files.createWithDirs("/sdcard/DCIM/"+"whatsapp"+"/app.init") )

// clickIfWidgetClickable( className("android.widget.ImageButton").desc("Send").visibleToUser().findOne(1000) )
// log( className("android.widget.ImageButton").desc("Send").visibleToUser().findOne(1000).click() )

// let t = "https://chothuesim00code.com/api?act=expired&apik=43820ead&isd=123456"
// log( t.match( /chothuesimcode.com/ )  )


// let maxFails = 2
// for (let index = 0; index < maxFails; index++) {
//     log( index )
//     if( index > 0 ){ maxFails = 5 }
// }

// let phone = "1562543187984"
// if( phone.match( /^56\d+/ ) ){ log("true") }


// let res = http.get("https://chothuesimcode.com/api?act=code&apik=43820ead&id=59268752")
//     res = res.body.json()
//     // if( res.Result.Id ){
//     //     log( res.Result.Number )
//     //     log( res.Result.Id )
//     // }
//     if( res.Result.Code ){
//         log( res.Result.Code )
//     }


// let a = 123
// log( JSON.stringify(a) )


// let PIN_code = "1234567"
// for (let index = 0; index < PIN_code.length; index++) {
//     input( PIN_code.substr(index,1) )
//     sleep(1000)
// }
// if( !new RegExp( /^\d\d\d\d\d\d$/ ).test(PIN_code) ){ 
// // if( !new RegExp( /\d\d\d\d\d\d/ ).test(PIN_code) ){ 
//     throw "PIN 码异常: " + PIN_code
// }
// setText("12345678")
// input( "123456" )


// (function () {
// 　　log("futest ")
// }());
// (function() {
//     　　log("futest ")
//     })

// 10 Rect(0, 1259 - 1080, 1386) com.whatsapp:id/add_btn android.widget.LinearLayout -  - null - false - false - true - true
// 01:08:43.412/D:                        \2
// 01:08:43.416/D:                         11 Rect(53, 1291 - 116, 1354) null android.widget.ImageView -  - null - false - false - false - true
// 01:08:43.418/D:                         11 Rect(116, 1296 - 1059, 1349) com.whatsapp:id/add_btn_text android.widget.TextView - ADD TO CONTACTS - Add to contacts button. Double tap to add. - false - false - false - true




// let randomSleep = function(){
//     sleep(3000)
//     return true
// }
// setText("1688") && randomSleep() && input(" ")
// setText("")
// sleep(1000)




// 8 Rect(169, 858 - 416, 1059) com.whatsapp:id/pickfiletype_document_holder android.widget.LinearLayout -  - null - false - false - true - true
// 8 Rect(416, 858 - 663, 1059) com.whatsapp:id/pickfiletype_camera_holder android.widget.LinearLayout -  - null - false - false - true - true
// 8 Rect(663, 858 - 910, 1059) com.whatsapp:id/pickfiletype_gallery_holder android.widget.LinearLayout -  - null - false - false - true - true
// 8 Rect(169, 1117 - 416, 1318) com.whatsapp:id/pickfiletype_audio_holder android.widget.LinearLayout -  - null - false - false - true - true
// 8 Rect(416, 1117 - 663, 1318) com.whatsapp:id/pickfiletype_room_holder android.widget.LinearLayout -  - null - false - false - true - true
// 8 Rect(663, 1117 - 910, 1318) com.whatsapp:id/pickfiletype_location_holder android.widget.LinearLayout -  - null - false - false - true - true
// 8 Rect(169, 1376 - 416, 1577) com.whatsapp:id/pickfiletype_contact_holder android.widget.LinearLayout -  - null - false - false - true - true

// clickIfParentsClickable = function(widget){
//     if( !widget ){ return false}
//     log( widget.clickable() )
//     if( widget.clickable() ){ return widget.click() }
//     if( widget.parent() ){ return clickIfParentsClickable( widget.parent() ) }
//     return false
// }
// clickIfParentsClickable( desc( "1688" ).findOne(1000) )
// let new_PIN = 0123456
// let new_PIN = null
// if( !new_PIN || new_PIN.length != 6 || new RegExp(/[^0-9]/).test( new_PIN ) ){ throw "PIN 码格式错误: " + new_PIN }
// if( !new RegExp(/\d\d\d\d\d\d/).test( new_PIN ) ){ throw "PIN 格式错误: " + new_PIN }

// 11 Rect(975, 73 - 1080, 199) null android.widget.ImageView -  - More options - false - false - true - true
// 6 Rect(597, 611 - 1028, 668) com.whatsapp:id/title android.widget.TextView - Settings - null - false - false - false - true
//  9 Rect(247, 281 - 572, 352) com.whatsapp:id/profile_info_name android.widget.TextView - Lothar Bächle - null - false - false - false - true
    //  7 Rect(0, 496 - 1080, 688) com.whatsapp:id/settings_account_info android.widget.LinearLayout -  - null - false - false - true - true
//  7 Rect(0, 525 - 1080, 672) com.whatsapp:id/two_step_verification_preference android.widget.LinearLayout -  - null - false - false - true - true
    //  8 Rect(63, 714 - 1017, 873) com.whatsapp:id/description android.widget.TextView - For added security, enable two-step verification, which will require a PIN when registering your phone number with WhatsApp again. - null - false - false - false - true
    //  7 Rect(414, 1626 - 666, 1752) com.whatsapp:id/enable_button android.widget.Button - ENABLE - null - false - false - true - true

    // 9 Rect(63, 273 - 1017, 393) com.whatsapp:id/code_info android.widget.TextView - Enter a 6-digit PIN which you'll be asked for when you register your phone number with WhatsApp: - null - false - false - false - true
        // setText("123500")
    // 9 Rect(376, 273 - 703, 330) com.whatsapp:id/code_info android.widget.TextView - Confirm your PIN: - null - false - false - false - true
    // 01:35:09.762/D:                       10 Rect(330, 372 - 750, 450) com.whatsapp:id/code android.widget.EditText - *** *** - null - false - false - true - true
        // setText("123500")

        // 9 Rect(63, 273 - 1017, 452) com.whatsapp:id/description android.widget.TextView - Add an email address to your account which will be used to reset your PIN if you forget it and safeguard your account. Skip - null - false - false - false - true
        // 10 Rect(731, 401 - 813, 452) null android.view.View -  - Skip - false - false - true - true

        // 9 Rect(70, 776 - 1010, 980) android:id/message android.widget.TextView - If you don't add an email address and you forget your PIN, you won't be able to re-register your phone number with WhatsApp. - null - false - false - false - true
        // 8 Rect(810, 991 - 978, 1117) android:id/button1 android.widget.Button - OK - OK - false - false - true - true
            // 8 Rect(322, 902 - 947, 953) android:id/message android.widget.TextView - Applying settings… - null - false - false - false - true
            // 9 Rect(70, 825 - 1010, 931) android:id/message android.widget.TextView - Couldn't set PIN. Check your phone's connection and try again. - null - false - false - false - true
            // 8 Rect(810, 942 - 978, 1068) android:id/button1 android.widget.Button - OK - OK - false - false - true - true

        // 10 Rect(424, 1605 - 655, 1731) com.whatsapp:id/done_button android.widget.Button - DONE - null - false - false - true - true

        // 8 Rect(63, 638 - 1017, 797) com.whatsapp:id/description android.widget.TextView - Two-step verification is enabled. You'll need to enter your PIN when registering your phone number with WhatsApp again. - null - false - false - false - true



// debugWidget( packageName("com.whatsapp").findOne(1000) )
// debugWidget( packageName("com.android.packageinstaller").findOne(1000) )
// debugWidget( packageName("com.android.contacts").findOne(1000) )
// debugWidget( packageName("com.android.settings").findOne(1000) )
// debugWidget( packageName("com.tunnelworkshop.postern").findOne(1000) )
// debugWidget( packageName("com.android.documentsui").findOne(1000) )
// 8382409735
// 3024956750
// 5186660320
// 8383844594
// 5189941409
// 8382376224
// 3027465505
// 5189789922
// 8386660937
// 8386978291

// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=5cd915fb-ca2d-4e3d-a31a-1d8b642de91b
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=7fce3fe2-de15-48bf-a6b4-f3d86e9e00e4
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=16779a6d-4576-44cd-a37c-9ce1656cc6d2
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=d1ebfa21-ff8b-4731-b288-bbfa218000ce
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=ecde9db5-d623-4c84-a3b2-b9ecb0c50438
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=08acbbe3-808b-4665-8a29-f266efddd403
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=9c4ef248-783b-44a4-9904-d797930f5adf
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=b845b61c-0085-463f-befb-296d8826bddb
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=30d94c3a-8ffb-4fc0-a1c1-b0a80851208e
// http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=e63c7087-8dd2-40f1-ab5a-a0bc34c8a679



// 1|10993225836604|2021-06-17T20:07:55|COM323|3225836604||
// 1|10993225871283|2021-06-17T20:08:10|COM326|3225871283||
// 1|10993225861648|2021-06-17T20:08:23|COM328|3225861648||

// http://api.ma37.com/yhapi.ashx?act=getPhoneCode&token=4fa161a5afab078c9a15f17f09094759&pid=10993225836604

// http://api.ma37.com/yhapi.ashx?act=getPhoneCode&token=4fa161a5afab078c9a15f17f09094759&pid=10993225871283

// http://api.ma37.com/yhapi.ashx?act=getPhoneCode&token=4fa161a5afab078c9a15f17f09094759&pid=10993225861648

//  AA203606F4-15
// 1|10993134415560|2021-06-17T20:30:02|COM335|3134415560||
// http://api.ma37.com/yhapi.ashx?act=getPhoneCode&token=4fa161a5afab078c9a15f17f09094759&pid=10993134415560

//  aa20360143-14
// 1|10993134335420|2021-06-17T20:34:41|COM336|3134335420||
// http://api.ma37.com/yhapi.ashx?act=getPhoneCode&token=4fa161a5afab078c9a15f17f09094759&pid=10993134335420

//  aa2036013c-10
// 1|10993134460725|2021-06-17T20:52:07|COM338|3134460725||
// http://api.ma37.com/yhapi.ashx?act=getPhoneCode&token=4fa161a5afab078c9a15f17f09094759&pid=10993134460725







randomEmojis = function( num ){
    let str = ""
    try {
        num = typeof(num) == "number" ? num : 1
        let emojis = [
            "😀",
            "😃",
            "😄",
            "😁",
            "😆",
            "😅",
            "😂",
            "🤣",
            "😊",
            "😇",
            "🙂",
            "🙃",
            "😉",
            "😌",
            "😍",
            "🥰",
            "😘",
            "😗",
            "😙",
            "😚",
            "😋",
            "😛",
            "😝",
            "😜",
            "🤪",
            "🤨",
            "🧐",
            "🤓",
            "😎",
            "🤩",
            "🥳",
            "😏",
            "😒",
            "😞",
            "😔",
            "😟",
            "😕",
            "🙁",
            "☹️",
            "😣",
            "😖",
            "😫",
            "😩",
            "🥺",
            "😢",
            "😭",
            "😤",
            "😠",
            "😡",
            "🤬",
            "🤯",
            "😳",
            "🥵",
            "🥶",
            "😱",
            "😨",
            "😰",
            "😥",
            "😓",
            "🤗",
            "🤔",
            "🤭",
            "🤫",
            "🤥",
            "😶",
            "😐",
            "😑",
            "😬",
            "🙄",
            "😯",
            "😦",
            "😧",
            "😮",
            "😲",
            "🥱",
            "😴",
            "🤤",
            "😪",
            "😵",
            "🤐",
            "🥴",
            "🤢",
            "🤮",
            "🤧",
            "😷",
            "🤒",
            "🤕",
            "🤑",
            "🤠",
            "😈",
            "👿",
            "👹",
            "👺",
            "🤡",
            "💩",
            "👻",
            "💀",
            "☠️",
            "👽",
            "👾",
            "🤖",
            "🎃",
            "😺",
            "😸",
            "😹",
            "😻",
            "😼",
            "😽",
            "🙀",
            "😿",
            "😾",
            "👋",
            "🤚",
            "🖐",
            "✋",
            "🖖",
            "👌",
            "🤌",
            "🤏",
            "✌️",
            "🤞",
            "🤟",
            "🤘",
            "🤙",
            "👈",
            "👉",
            "👆",
            "🖕",
            "👇",
            "☝️",
            "👍",
            "👎",
            "✊",
            "👊",
            "🤛",
            "🤜",
            "👏",
            "🙌",
            "👐",
            "🤲",
            "🤝",
            "🙏",
            "✍️",
            "💅",
            "🤳",
            "💪",
            "🦾",
            "🦵",
            "🦿",
            "🦶",
            "👣",
            "👂",
            "🦻",
            "👃",
            "🫀",
            "🫁",
            "🧠",
            "🦷",
            "🦴",
            "👀",
            "👁",
            "👅",
            "👄",
            "💋",
            "🩸",
            "👶",
            "👧",
            "🧒",
            "👦",
            "👩",
            "🧑",
            "👨",
            "👩‍🦱",
            "🧑‍🦱",
            "👨‍🦱",
            "👩‍🦰",
            "🧑‍🦰",
            "👨‍🦰",
            "👱‍♀️",
            "👱",
            "👱‍♂️",
            "👩‍🦳",
            "🧑‍🦳",
            "👨‍🦳",
            "👩‍🦲",
            "🧑‍🦲",
            "👨‍🦲",
            "🧔",
            "👵",
            "🧓",
            "👴",
            "👲",
            "👳‍♀️",
            "👳",
            "👳‍♂️",
            "🧕",
            "👮‍♀️",
            "👮",
            "👮‍♂️",
            "👷‍♀️",
            "👷",
            "👷‍♂️",
            "💂‍♀️",
            "💂",
            "💂‍♂️",
            "🕵️‍♀️",
            "🕵️",
            "🕵️‍♂️",
            "👩‍⚕️",
            "🧑‍⚕️",
            "👨‍⚕️",
            "👩‍🌾",
            "🧑‍🌾",
            "👨‍🌾",
            "👩‍🍳",
            "🧑‍🍳",
            "👨‍🍳",
            "👩‍🎓",
            "🧑‍🎓",
            "👨‍🎓",
            "👩‍🎤",
            "🧑‍🎤",
            "👨‍🎤",
            "👩‍🏫",
            "🧑‍🏫",
            "👨‍🏫",
            "👩‍🏭",
            "🧑‍🏭",
            "👨‍🏭",
            "👩‍💻",
            "🧑‍💻",
            "👨‍💻",
            "👩‍💼",
            "🧑‍💼",
            "👨‍💼",
            "👩‍🔧",
            "🧑‍🔧",
            "👨‍🔧",
            "👩‍🔬",
            "🧑‍🔬",
            "👨‍🔬",
            "👩‍🎨",
            "🧑‍🎨",
            "👨‍🎨",
            "👩‍🚒",
            "🧑‍🚒",
            "👨‍🚒",
            "👩‍✈️",
            "🧑‍✈️",
            "👨‍✈️",
            "👩‍🚀",
            "🧑‍🚀",
            "👨‍🚀",
            "👩‍⚖️",
            "🧑‍⚖️",
            "👨‍⚖️",
            "👰‍♀️",
            "👰",
            "👰‍♂️",
            "🤵‍♀️",
            "🤵",
            "🤵‍♂️",
            "👸",
            "🤴",
            "🥷",
            "🦸‍♀️",
            "🦸",
            "🦸‍♂️",
            "🦹‍♀️",
            "🦹",
            "🦹‍♂️",
            "🤶",
            "🧑‍🎄",
            "🎅",
            "🧙‍♀️",
            "🧙",
            "🧙‍♂️",
            "🧝‍♀️",
            "🧝",
            "🧝‍♂️",
            "🧛‍♀️",
            "🧛",
            "🧛‍♂️",
            "🧟‍♀️",
            "🧟",
            "🧟‍♂️",
            "🧞‍♀️",
            "🧞",
            "🧞‍♂️",
            "🧜‍♀️",
            "🧜",
            "🧜‍♂️",
            "🧚‍♀️",
            "🧚",
            "🧚‍♂️",
            "👼",
            "🤰",
            "🤱",
            "👩‍🍼",
            "🧑‍🍼",
            "👨‍🍼",
            "🙇‍♀️",
            "🙇",
            "🙇‍♂️",
            "💁‍♀️",
            "💁",
            "💁‍♂️",
            "🙅‍♀️",
            "🙅",
            "🙅‍♂️",
            "🙆‍♀️",
            "🙆",
            "🙆‍♂️",
            "🙋‍♀️",
            "🙋",
            "🙋‍♂️",
            "🧏‍♀️",
            "🧏",
            "🧏‍♂️",
            "🤦‍♀️",
            "🤦",
            "🤦‍♂️",
            "🤷‍♀️",
            "🤷",
            "🤷‍♂️",
            "🙎‍♀️",
            "🙎",
            "🙎‍♂️",
            "🙍‍♀️",
            "🙍",
            "🙍‍♂️",
            "💇‍♀️",
            "💇",
            "💇‍♂️",
            "💆‍♀️",
            "💆",
            "💆‍♂️",
            "🧖‍♀️",
            "🧖",
            "🧖‍♂️",
            "💅",
            "🤳",
            "💃",
            "🕺",
            "👯‍♀️",
            "👯",
            "👯‍♂️",
            "🕴",
            "👩‍🦽",
            "🧑‍🦽",
            "👨‍🦽",
            "👩‍🦼",
            "🧑‍🦼",
            "👨‍🦼",
            "🚶‍♀️",
            "🚶",
            "🚶‍♂️",
            "👩‍🦯",
            "🧑‍🦯",
            "👨‍🦯",
            "🧎‍♀️",
            "🧎",
            "🧎‍♂️",
            "🏃‍♀️",
            "🏃",
            "🏃‍♂️",
            "🧍‍♀️",
            "🧍",
            "🧍‍♂️",
            "👭",
            "🧑‍🤝‍🧑",
            "👬",
            "👫",
            "👩‍❤️‍👩",
            "💑",
            "👨‍❤️‍👨",
            "👩‍❤️‍👨",
            "👩‍❤️‍💋‍👩",
            "💏",
            "👨‍❤️‍💋‍👨",
            "👩‍❤️‍💋‍👨",
            "👪",
            "👨‍👩‍👦",
            "👨‍👩‍👧",
            "👨‍👩‍👧‍👦",
            "👨‍👩‍👦‍👦",
            "👨‍👩‍👧‍👧",
            "👨‍👨‍👦",
            "👨‍👨‍👧",
            "👨‍👨‍👧‍👦",
            "👨‍👨‍👦‍👦",
            "👨‍👨‍👧‍👧",
            "👩‍👩‍👦",
            "👩‍👩‍👧",
            "👩‍👩‍👧‍👦",
            "👩‍👩‍👦‍👦",
            "👩‍👩‍👧‍👧",
            "👨‍👦",
            "👨‍👦‍👦",
            "👨‍👧",
            "👨‍👧‍👦",
            "👨‍👧‍👧",
            "👩‍👦",
            "👩‍👦‍👦",
            "👩‍👧",
            "👩‍👧‍👦",
            "👩‍👧‍👧",
            "🗣",
            "👤",
            "👥",
            "🧳",
            "🌂",
            "☂️",
            "🧵",
            "🪡",
            "🪢",
            "🧶",
            "👓",
            "🕶",
            "🥽",
            "🥼",
            "🦺",
            "👔",
            "👕",
            "👖",
            "🧣",
            "🧤",
            "🧥",
            "🧦",
            "👗",
            "👘",
            "🥻",
            "🩴",
            "🩱",
            "🩲",
            "🩳",
            "👙",
            "👚",
            "👛",
            "👜",
            "👝",
            "🎒",
            "👞",
            "👟",
            "🥾",
            "🥿",
            "👠",
            "👡",
            "🩰",
            "👢",
            "👑",
            "👒",
            "🎩",
            "🎓",
            "🧢",
            "⛑",
            "🪖",
            "💄",
            "💍",
            "💼",
            "👋🏻",
            "🤚🏻",
            "🖐🏻",
            "✋🏻",
            "🖖🏻",
            "👌🏻",
            "🤌🏻",
            "🤏🏻",
            "✌🏻",
            "🤞🏻",
            "🤟🏻",
            "🤘🏻",
            "🤙🏻",
            "👈🏻",
            "👉🏻",
            "👆🏻",
            "🖕🏻",
            "👇🏻",
            "☝🏻",
            "👍🏻",
            "👎🏻",
            "✊🏻",
            "👊🏻",
            "🤛🏻",
            "🤜🏻",
            "👏🏻",
            "🙌🏻",
            "👐🏻",
            "🤲🏻",
            "🙏🏻",
            "✍🏻",
            "💅🏻",
            "🤳🏻",
            "💪🏻",
            "🦵🏻",
            "🦶🏻",
            "👂🏻",
            "🦻🏻",
            "👃🏻",
            "👶🏻",
            "👧🏻",
            "🧒🏻",
            "👦🏻",
            "👩🏻",
            "🧑🏻",
            "👨🏻",
            "👩🏻‍🦱",
            "🧑🏻‍🦱",
            "👨🏻‍🦱",
            "👩🏻‍🦰",
            "🧑🏻‍🦰",
            "👨🏻‍🦰",
            "👱🏻‍♀️",
            "👱🏻",
            "👱🏻‍♂️",
            "👩🏻‍🦳",
            "🧑🏻‍🦳",
            "👨🏻‍🦳",
            "👩🏻‍🦲",
            "🧑🏻‍🦲",
            "👨🏻‍🦲",
            "🧔🏻",
            "👵🏻",
            "🧓🏻",
            "👴🏻",
            "👲🏻",
            "👳🏻‍♀️",
            "👳🏻",
            "👳🏻‍♂️",
            "🧕🏻",
            "👮🏻‍♀️",
            "👮🏻",
            "👮🏻‍♂️",
            "👷🏻‍♀️",
            "👷🏻",
            "👷🏻‍♂️",
            "💂🏻‍♀️",
            "💂🏻",
            "💂🏻‍♂️",
            "🕵🏻‍♀️",
            "🕵🏻",
            "🕵🏻‍♂️",
            "👩🏻‍⚕️",
            "🧑🏻‍⚕️",
            "👨🏻‍⚕️",
            "👩🏻‍🌾",
            "🧑🏻‍🌾",
            "👨🏻‍🌾",
            "👩🏻‍🍳",
            "🧑🏻‍🍳",
            "👨🏻‍🍳",
            "👩🏻‍🎓",
            "🧑🏻‍🎓",
            "👨🏻‍🎓",
            "👩🏻‍🎤",
            "🧑🏻‍🎤",
            "👨🏻‍🎤",
            "👩🏻‍🏫",
            "🧑🏻‍🏫",
            "👨🏻‍🏫",
            "👩🏻‍🏭",
            "🧑🏻‍🏭",
            "👨🏻‍🏭",
            "👩🏻‍💻",
            "🧑🏻‍💻",
            "👨🏻‍💻",
            "👩🏻‍💼",
            "🧑🏻‍💼",
            "👨🏻‍💼",
            "👩🏻‍🔧",
            "🧑🏻‍🔧",
            "👨🏻‍🔧",
            "👩🏻‍🔬",
            "🧑🏻‍🔬",
            "👨🏻‍🔬",
            "👩🏻‍🎨",
            "🧑🏻‍🎨",
            "👨🏻‍🎨",
            "👩🏻‍🚒",
            "🧑🏻‍🚒",
            "👨🏻‍🚒",
            "👩🏻‍✈️",
            "🧑🏻‍✈️",
            "👨🏻‍✈️",
            "👩🏻‍🚀",
            "🧑🏻‍🚀",
            "👨🏻‍🚀",
            "👩🏻‍⚖️",
            "🧑🏻‍⚖️",
            "👨🏻‍⚖️",
            "👰🏻‍♀️",
            "👰🏻",
            "👰🏻‍♂️",
            "🤵🏻‍♀️",
            "🤵🏻",
            "🤵🏻‍♂️",
            "👸🏻",
            "🤴🏻",
            "🥷🏻",
            "🦸🏻‍♀️",
            "🦸🏻",
            "🦸🏻‍♂️",
            "🦹🏻‍♀️",
            "🦹🏻",
            "🦹🏻‍♂️",
            "🤶🏻",
            "🧑🏻‍🎄",
            "🎅🏻",
            "🧙🏻‍♀️",
            "🧙🏻",
            "🧙🏻‍♂️",
            "🧝🏻‍♀️",
            "🧝🏻",
            "🧝🏻‍♂️",
            "🧛🏻‍♀️",
            "🧛🏻",
            "🧛🏻‍♂️",
            "🧜🏻‍♀️",
            "🧜🏻",
            "🧜🏻‍♂️",
            "🧚🏻‍♀️",
            "🧚🏻",
            "🧚🏻‍♂️",
            "👼🏻",
            "🤰🏻",
            "🤱🏻",
            "👩🏻‍🍼",
            "🧑🏻‍🍼",
            "👨🏻‍🍼",
            "🙇🏻‍♀️",
            "🙇🏻",
            "🙇🏻‍♂️",
            "💁🏻‍♀️",
            "💁🏻",
            "💁🏻‍♂️",
            "🙅🏻‍♀️",
            "🙅🏻",
            "🙅🏻‍♂️",
            "🙆🏻‍♀️",
            "🙆🏻",
            "🙆🏻‍♂️",
            "🙋🏻‍♀️",
            "🙋🏻",
            "🙋🏻‍♂️",
            "🧏🏻‍♀️",
            "🧏🏻",
            "🧏🏻‍♂️",
            "🤦🏻‍♀️",
            "🤦🏻",
            "🤦🏻‍♂️",
            "🤷🏻‍♀️",
            "🤷🏻",
            "🤷🏻‍♂️",
            "🙎🏻‍♀️",
            "🙎🏻",
            "🙎🏻‍♂️",
            "🙍🏻‍♀️",
            "🙍🏻",
            "🙍🏻‍♂️",
            "💇🏻‍♀️",
            "💇🏻",
            "💇🏻‍♂️",
            "💆🏻‍♀️",
            "💆🏻",
            "💆🏻‍♂️",
            "🧖🏻‍♀️",
            "🧖🏻",
            "🧖🏻‍♂️",
            "💃🏻",
            "🕺🏻",
            "🕴🏻",
            "👩🏻‍🦽",
            "🧑🏻‍🦽",
            "👨🏻‍🦽",
            "👩🏻‍🦼",
            "🧑🏻‍🦼",
            "👨🏻‍🦼",
            "🚶🏻‍♀️",
            "🚶🏻",
            "🚶🏻‍♂️",
            "👩🏻‍🦯",
            "🧑🏻‍🦯",
            "👨🏻‍🦯",
            "🧎🏻‍♀️",
            "🧎🏻",
            "🧎🏻‍♂️",
            "🏃🏻‍♀️",
            "🏃🏻",
            "🏃🏻‍♂️",
            "🧍🏻‍♀️",
            "🧍🏻",
            "🧍🏻‍♂️",
            "👭🏻",
            "🧑🏻‍🤝‍🧑🏻",
            "👬🏻",
            "👫🏻",
            "🧗🏻‍♀️",
            "🧗🏻",
            "🧗🏻‍♂️",
            "🏇🏻",
            "🏂🏻",
            "🏌🏻‍♀️",
            "🏌🏻",
            "🏌🏻‍♂️",
            "🏄🏻‍♀️",
            "🏄🏻",
            "🏄🏻‍♂️",
            "🚣🏻‍♀️",
            "🚣🏻",
            "🚣🏻‍♂️",
            "🏊🏻‍♀️",
            "🏊🏻",
            "🏊🏻‍♂️",
            "⛹🏻‍♀️",
            "⛹🏻",
            "⛹🏻‍♂️",
            "🏋🏻‍♀️",
            "🏋🏻",
            "🏋🏻‍♂️",
            "🚴🏻‍♀️",
            "🚴🏻",
            "🚴🏻‍♂️",
            "🚵🏻‍♀️",
            "🚵🏻",
            "🚵🏻‍♂️",
            "🤸🏻‍♀️",
            "🤸🏻",
            "🤸🏻‍♂️",
            "🤽🏻‍♀️",
            "🤽🏻",
            "🤽🏻‍♂️",
            "🤾🏻‍♀️",
            "🤾🏻",
            "🤾🏻‍♂️",
            "🤹🏻‍♀️",
            "🤹🏻",
            "🤹🏻‍♂️",
            "🧘🏻‍♀️",
            "🧘🏻",
            "🧘🏻‍♂️",
            "🛀🏻",
            "🛌🏻",
            "👋🏼",
            "🤚🏼",
            "🖐🏼",
            "✋🏼",
            "🖖🏼",
            "👌🏼",
            "🤌🏼",
            "🤏🏼",
            "✌🏼",
            "🤞🏼",
            "🤟🏼",
            "🤘🏼",
            "🤙🏼",
            "👈🏼",
            "👉🏼",
            "👆🏼",
            "🖕🏼",
            "👇🏼",
            "☝🏼",
            "👍🏼",
            "👎🏼",
            "✊🏼",
            "👊🏼",
            "🤛🏼",
            "🤜🏼",
            "👏🏼",
            "🙌🏼",
            "👐🏼",
            "🤲🏼",
            "🙏🏼",
            "✍🏼",
            "💅🏼",
            "🤳🏼",
            "💪🏼",
            "🦵🏼",
            "🦶🏼",
            "👂🏼",
            "🦻🏼",
            "👃🏼",
            "👶🏼",
            "👧🏼",
            "🧒🏼",
            "👦🏼",
            "👩🏼",
            "🧑🏼",
            "👨🏼",
            "👩🏼‍🦱",
            "🧑🏼‍🦱",
            "👨🏼‍🦱",
            "👩🏼‍🦰",
            "🧑🏼‍🦰",
            "👨🏼‍🦰",
            "👱🏼‍♀️",
            "👱🏼",
            "👱🏼‍♂️",
            "👩🏼‍🦳",
            "🧑🏼‍🦳",
            "👨🏼‍🦳",
            "👩🏼‍🦲",
            "🧑🏼‍🦲",
            "👨🏼‍🦲",
            "🧔🏼",
            "👵🏼",
            "🧓🏼",
            "👴🏼",
            "👲🏼",
            "👳🏼‍♀️",
            "👳🏼",
            "👳🏼‍♂️",
            "🧕🏼",
            "👮🏼‍♀️",
            "👮🏼",
            "👮🏼‍♂️",
            "👷🏼‍♀️",
            "👷🏼",
            "👷🏼‍♂️",
            "💂🏼‍♀️",
            "💂🏼",
            "💂🏼‍♂️",
            "🕵🏼‍♀️",
            "🕵🏼",
            "🕵🏼‍♂️",
            "👩🏼‍⚕️",
            "🧑🏼‍⚕️",
            "👨🏼‍⚕️",
            "👩🏼‍🌾",
            "🧑🏼‍🌾",
            "👨🏼‍🌾",
            "👩🏼‍🍳",
            "🧑🏼‍🍳",
            "👨🏼‍🍳",
            "👩🏼‍🎓",
            "🧑🏼‍🎓",
            "👨🏼‍🎓",
            "👩🏼‍🎤",
            "🧑🏼‍🎤",
            "👨🏼‍🎤",
            "👩🏼‍🏫",
            "🧑🏼‍🏫",
            "👨🏼‍🏫",
            "👩🏼‍🏭",
            "🧑🏼‍🏭",
            "👨🏼‍🏭",
            "👩🏼‍💻",
            "🧑🏼‍💻",
            "👨🏼‍💻",
            "👩🏼‍💼",
            "🧑🏼‍💼",
            "👨🏼‍💼",
            "👩🏼‍🔧",
            "🧑🏼‍🔧",
            "👨🏼‍🔧",
            "👩🏼‍🔬",
            "🧑🏼‍🔬",
            "👨🏼‍🔬",
            "👩🏼‍🎨",
            "🧑🏼‍🎨",
            "👨🏼‍🎨",
            "👩🏼‍🚒",
            "🧑🏼‍🚒",
            "👨🏼‍🚒",
            "👩🏼‍✈️",
            "🧑🏼‍✈️",
            "👨🏼‍✈️",
            "👩🏼‍🚀",
            "🧑🏼‍🚀",
            "👨🏼‍🚀",
            "👩🏼‍⚖️",
            "🧑🏼‍⚖️",
            "👨🏼‍⚖️",
            "👰🏼‍♀️",
            "👰🏼",
            "👰🏼‍♂️",
            "🤵🏼‍♀️",
            "🤵🏼",
            "🤵🏼‍♂️",
            "👸🏼",
            "🤴🏼",
            "🥷🏼",
            "🦸🏼‍♀️",
            "🦸🏼",
            "🦸🏼‍♂️",
            "🦹🏼‍♀️",
            "🦹🏼",
            "🦹🏼‍♂️",
            "🤶🏼",
            "🧑🏼‍🎄",
            "🎅🏼",
            "🧙🏼‍♀️",
            "🧙🏼",
            "🧙🏼‍♂️",
            "🧝🏼‍♀️",
            "🧝🏼",
            "🧝🏼‍♂️",
            "🧛🏼‍♀️",
            "🧛🏼",
            "🧛🏼‍♂️",
            "🧜🏼‍♀️",
            "🧜🏼",
            "🧜🏼‍♂️",
            "🧚🏼‍♀️",
            "🧚🏼",
            "🧚🏼‍♂️",
            "👼🏼",
            "🤰🏼",
            "🤱🏼",
            "👩🏼‍🍼",
            "🧑🏼‍🍼",
            "👨🏼‍🍼",
            "🙇🏼‍♀️",
            "🙇🏼",
            "🙇🏼‍♂️",
            "💁🏼‍♀️",
            "💁🏼",
            "💁🏼‍♂️",
            "🙅🏼‍♀️",
            "🙅🏼",
            "🙅🏼‍♂️",
            "🙆🏼‍♀️",
            "🙆🏼",
            "🙆🏼‍♂️",
            "🙋🏼‍♀️",
            "🙋🏼",
            "🙋🏼‍♂️",
            "🧏🏼‍♀️",
            "🧏🏼",
            "🧏🏼‍♂️",
            "🤦🏼‍♀️",
            "🤦🏼",
            "🤦🏼‍♂️",
            "🤷🏼‍♀️",
            "🤷🏼",
            "🤷🏼‍♂️",
            "🙎🏼‍♀️",
            "🙎🏼",
            "🙎🏼‍♂️",
            "🙍🏼‍♀️",
            "🙍🏼",
            "🙍🏼‍♂️",
            "💇🏼‍♀️",
            "💇🏼",
            "💇🏼‍♂️",
            "💆🏼‍♀️",
            "💆🏼",
            "💆🏼‍♂️",
            "🧖🏼‍♀️",
            "🧖🏼",
            "🧖🏼‍♂️",
            "💃🏼",
            "🕺🏼",
            "🕴🏼",
            "👩🏼‍🦽",
            "🧑🏼‍🦽",
            "👨🏼‍🦽",
            "👩🏼‍🦼",
            "🧑🏼‍🦼",
            "👨🏼‍🦼",
            "🚶🏼‍♀️",
            "🚶🏼",
            "🚶🏼‍♂️",
            "👩🏼‍🦯",
            "🧑🏼‍🦯",
            "👨🏼‍🦯",
            "🧎🏼‍♀️",
            "🧎🏼",
            "🧎🏼‍♂️",
            "🏃🏼‍♀️",
            "🏃🏼",
            "🏃🏼‍♂️",
            "🧍🏼‍♀️",
            "🧍🏼",
            "🧍🏼‍♂️",
            "👭🏼",
            "🧑🏼‍🤝‍🧑🏼",
            "👬🏼",
            "👫🏼",
            "🧗🏼‍♀️",
            "🧗🏼",
            "🧗🏼‍♂️",
            "🏇🏼",
            "🏂🏼",
            "🏌🏼‍♀️",
            "🏌🏼",
            "🏌🏼‍♂️",
            "🏄🏼‍♀️",
            "🏄🏼",
            "🏄🏼‍♂️",
            "🚣🏼‍♀️",
            "🚣🏼",
            "🚣🏼‍♂️",
            "🏊🏼‍♀️",
            "🏊🏼",
            "🏊🏼‍♂️",
            "⛹🏼‍♀️",
            "⛹🏼",
            "⛹🏼‍♂️",
            "🏋🏼‍♀️",
            "🏋🏼",
            "🏋🏼‍♂️",
            "🚴🏼‍♀️",
            "🚴🏼",
            "🚴🏼‍♂️",
            "🚵🏼‍♀️",
            "🚵🏼",
            "🚵🏼‍♂️",
            "🤸🏼‍♀️",
            "🤸🏼",
            "🤸🏼‍♂️",
            "🤽🏼‍♀️",
            "🤽🏼",
            "🤽🏼‍♂️",
            "🤾🏼‍♀️",
            "🤾🏼",
            "🤾🏼‍♂️",
            "🤹🏼‍♀️",
            "🤹🏼",
            "🤹🏼‍♂️",
            "🧘🏼‍♀️",
            "🧘🏼",
            "🧘🏼‍♂️",
            "🛀🏼",
            "🛌🏼",
            "👋🏽",
            "🤚🏽",
            "🖐🏽",
            "✋🏽",
            "🖖🏽",
            "👌🏽",
            "🤌🏽",
            "🤏🏽",
            "✌🏽",
            "🤞🏽",
            "🤟🏽",
            "🤘🏽",
            "🤙🏽",
            "👈🏽",
            "👉🏽",
            "👆🏽",
            "🖕🏽",
            "👇🏽",
            "☝🏽",
            "👍🏽",
            "👎🏽",
            "✊🏽",
            "👊🏽",
            "🤛🏽",
            "🤜🏽",
            "👏🏽",
            "🙌🏽",
            "👐🏽",
            "🤲🏽",
            "🙏🏽",
            "✍🏽",
            "💅🏽",
            "🤳🏽",
            "💪🏽",
            "🦵🏽",
            "🦶🏽",
            "👂🏽",
            "🦻🏽",
            "👃🏽",
            "👶🏽",
            "👧🏽",
            "🧒🏽",
            "👦🏽",
            "👩🏽",
            "🧑🏽",
            "👨🏽",
            "👩🏽‍🦱",
            "🧑🏽‍🦱",
            "👨🏽‍🦱",
            "👩🏽‍🦰",
            "🧑🏽‍🦰",
            "👨🏽‍🦰",
            "👱🏽‍♀️",
            "👱🏽",
            "👱🏽‍♂️",
            "👩🏽‍🦳",
            "🧑🏽‍🦳",
            "👨🏽‍🦳",
            "👩🏽‍🦲",
            "🧑🏽‍🦲",
            "👨🏽‍🦲",
            "🧔🏽",
            "👵🏽",
            "🧓🏽",
            "👴🏽",
            "👲🏽",
            "👳🏽‍♀️",
            "👳🏽",
            "👳🏽‍♂️",
            "🧕🏽",
            "👮🏽‍♀️",
            "👮🏽",
            "👮🏽‍♂️",
            "👷🏽‍♀️",
            "👷🏽",
            "👷🏽‍♂️",
            "💂🏽‍♀️",
            "💂🏽",
            "💂🏽‍♂️",
            "🕵🏽‍♀️",
            "🕵🏽",
            "🕵🏽‍♂️",
            "👩🏽‍⚕️",
            "🧑🏽‍⚕️",
            "👨🏽‍⚕️",
            "👩🏽‍🌾",
            "🧑🏽‍🌾",
            "👨🏽‍🌾",
            "👩🏽‍🍳",
            "🧑🏽‍🍳",
            "👨🏽‍🍳",
            "👩🏽‍🎓",
            "🧑🏽‍🎓",
            "👨🏽‍🎓",
            "👩🏽‍🎤",
            "🧑🏽‍🎤",
            "👨🏽‍🎤",
            "👩🏽‍🏫",
            "🧑🏽‍🏫",
            "👨🏽‍🏫",
            "👩🏽‍🏭",
            "🧑🏽‍🏭",
            "👨🏽‍🏭",
            "👩🏽‍💻",
            "🧑🏽‍💻",
            "👨🏽‍💻",
            "👩🏽‍💼",
            "🧑🏽‍💼",
            "👨🏽‍💼",
            "👩🏽‍🔧",
            "🧑🏽‍🔧",
            "👨🏽‍🔧",
            "👩🏽‍🔬",
            "🧑🏽‍🔬",
            "👨🏽‍🔬",
            "👩🏽‍🎨",
            "🧑🏽‍🎨",
            "👨🏽‍🎨",
            "👩🏽‍🚒",
            "🧑🏽‍🚒",
            "👨🏽‍🚒",
            "👩🏽‍✈️",
            "🧑🏽‍✈️",
            "👨🏽‍✈️",
            "👩🏽‍🚀",
            "🧑🏽‍🚀",
            "👨🏽‍🚀",
            "👩🏽‍⚖️",
            "🧑🏽‍⚖️",
            "👨🏽‍⚖️",
            "👰🏽‍♀️",
            "👰🏽",
            "👰🏽‍♂️",
            "🤵🏽‍♀️",
            "🤵🏽",
            "🤵🏽‍♂️",
            "👸🏽",
            "🤴🏽",
            "🥷🏽",
            "🦸🏽‍♀️",
            "🦸🏽",
            "🦸🏽‍♂️",
            "🦹🏽‍♀️",
            "🦹🏽",
            "🦹🏽‍♂️",
            "🤶🏽",
            "🧑🏽‍🎄",
            "🎅🏽",
            "🧙🏽‍♀️",
            "🧙🏽",
            "🧙🏽‍♂️",
            "🧝🏽‍♀️",
            "🧝🏽",
            "🧝🏽‍♂️",
            "🧛🏽‍♀️",
            "🧛🏽",
            "🧛🏽‍♂️",
            "🧜🏽‍♀️",
            "🧜🏽",
            "🧜🏽‍♂️",
            "🧚🏽‍♀️",
            "🧚🏽",
            "🧚🏽‍♂️",
            "👼🏽",
            "🤰🏽",
            "🤱🏽",
            "👩🏽‍🍼",
            "🧑🏽‍🍼",
            "👨🏽‍🍼",
            "🙇🏽‍♀️",
            "🙇🏽",
            "🙇🏽‍♂️",
            "💁🏽‍♀️",
            "💁🏽",
            "💁🏽‍♂️",
            "🙅🏽‍♀️",
            "🙅🏽",
            "🙅🏽‍♂️",
            "🙆🏽‍♀️",
            "🙆🏽",
            "🙆🏽‍♂️",
            "🙋🏽‍♀️",
            "🙋🏽",
            "🙋🏽‍♂️",
            "🧏🏽‍♀️",
            "🧏🏽",
            "🧏🏽‍♂️",
            "🤦🏽‍♀️",
            "🤦🏽",
            "🤦🏽‍♂️",
            "🤷🏽‍♀️",
            "🤷🏽",
            "🤷🏽‍♂️",
            "🙎🏽‍♀️",
            "🙎🏽",
            "🙎🏽‍♂️",
            "🙍🏽‍♀️",
            "🙍🏽",
            "🙍🏽‍♂️",
            "💇🏽‍♀️",
            "💇🏽",
            "💇🏽‍♂️",
            "💆🏽‍♀️",
            "💆🏽",
            "💆🏽‍♂️",
            "🧖🏽‍♀️",
            "🧖🏽",
            "🧖🏽‍♂️",
            "💃🏽",
            "🕺🏽",
            "🕴🏽",
            "👩🏽‍🦽",
            "🧑🏽‍🦽",
            "👨🏽‍🦽",
            "👩🏽‍🦼",
            "🧑🏽‍🦼",
            "👨🏽‍🦼",
            "🚶🏽‍♀️",
            "🚶🏽",
            "🚶🏽‍♂️",
            "👩🏽‍🦯",
            "🧑🏽‍🦯",
            "👨🏽‍🦯",
            "🧎🏽‍♀️",
            "🧎🏽",
            "🧎🏽‍♂️",
            "🏃🏽‍♀️",
            "🏃🏽",
            "🏃🏽‍♂️",
            "🧍🏽‍♀️",
            "🧍🏽",
            "🧍🏽‍♂️",
            "👭🏽",
            "🧑🏽‍🤝‍🧑🏽",
            "👬🏽",
            "👫🏽",
            "🧗🏽‍♀️",
            "🧗🏽",
            "🧗🏽‍♂️",
            "🏇🏽",
            "🏂🏽",
            "🏌🏽‍♀️",
            "🏌🏽",
            "🏌🏽‍♂️",
            "🏄🏽‍♀️",
            "🏄🏽",
            "🏄🏽‍♂️",
            "🚣🏽‍♀️",
            "🚣🏽",
            "🚣🏽‍♂️",
            "🏊🏽‍♀️",
            "🏊🏽",
            "🏊🏽‍♂️",
            "⛹🏽‍♀️",
            "⛹🏽",
            "⛹🏽‍♂️",
            "🏋🏽‍♀️",
            "🏋🏽",
            "🏋🏽‍♂️",
            "🚴🏽‍♀️",
            "🚴🏽",
            "🚴🏽‍♂️",
            "🚵🏽‍♀️",
            "🚵🏽",
            "🚵🏽‍♂️",
            "🤸🏽‍♀️",
            "🤸🏽",
            "🤸🏽‍♂️",
            "🤽🏽‍♀️",
            "🤽🏽",
            "🤽🏽‍♂️",
            "🤾🏽‍♀️",
            "🤾🏽",
            "🤾🏽‍♂️",
            "🤹🏽‍♀️",
            "🤹🏽",
            "🤹🏽‍♂️",
            "🧘🏽‍♀️",
            "🧘🏽",
            "🧘🏽‍♂️",
            "🛀🏽",
            "🛌🏽",
            "👋🏾",
            "🤚🏾",
            "🖐🏾",
            "✋🏾",
            "🖖🏾",
            "👌🏾",
            "🤌🏾",
            "🤏🏾",
            "✌🏾",
            "🤞🏾",
            "🤟🏾",
            "🤘🏾",
            "🤙🏾",
            "👈🏾",
            "👉🏾",
            "👆🏾",
            "🖕🏾",
            "👇🏾",
            "☝🏾",
            "👍🏾",
            "👎🏾",
            "✊🏾",
            "👊🏾",
            "🤛🏾",
            "🤜🏾",
            "👏🏾",
            "🙌🏾",
            "👐🏾",
            "🤲🏾",
            "🙏🏾",
            "✍🏾",
            "💅🏾",
            "🤳🏾",
            "💪🏾",
            "🦵🏾",
            "🦶🏾",
            "👂🏾",
            "🦻🏾",
            "👃🏾",
            "👶🏾",
            "👧🏾",
            "🧒🏾",
            "👦🏾",
            "👩🏾",
            "🧑🏾",
            "👨🏾",
            "👩🏾‍🦱",
            "🧑🏾‍🦱",
            "👨🏾‍🦱",
            "👩🏾‍🦰",
            "🧑🏾‍🦰",
            "👨🏾‍🦰",
            "👱🏾‍♀️",
            "👱🏾",
            "👱🏾‍♂️",
            "👩🏾‍🦳",
            "🧑🏾‍🦳",
            "👨🏾‍🦳",
            "👩🏾‍🦲",
            "🧑🏾‍🦲",
            "👨🏾‍🦲",
            "🧔🏾",
            "👵🏾",
            "🧓🏾",
            "👴🏾",
            "👲🏾",
            "👳🏾‍♀️",
            "👳🏾",
            "👳🏾‍♂️",
            "🧕🏾",
            "👮🏾‍♀️",
            "👮🏾",
            "👮🏾‍♂️",
            "👷🏾‍♀️",
            "👷🏾",
            "👷🏾‍♂️",
            "💂🏾‍♀️",
            "💂🏾",
            "💂🏾‍♂️",
            "🕵🏾‍♀️",
            "🕵🏾",
            "🕵🏾‍♂️",
            "👩🏾‍⚕️",
            "🧑🏾‍⚕️",
            "👨🏾‍⚕️",
            "👩🏾‍🌾",
            "🧑🏾‍🌾",
            "👨🏾‍🌾",
            "👩🏾‍🍳",
            "🧑🏾‍🍳",
            "👨🏾‍🍳",
            "👩🏾‍🎓",
            "🧑🏾‍🎓",
            "👨🏾‍🎓",
            "👩🏾‍🎤",
            "🧑🏾‍🎤",
            "👨🏾‍🎤",
            "👩🏾‍🏫",
            "🧑🏾‍🏫",
            "👨🏾‍🏫",
            "👩🏾‍🏭",
            "🧑🏾‍🏭",
            "👨🏾‍🏭",
            "👩🏾‍💻",
            "🧑🏾‍💻",
            "👨🏾‍💻",
            "👩🏾‍💼",
            "🧑🏾‍💼",
            "👨🏾‍💼",
            "👩🏾‍🔧",
            "🧑🏾‍🔧",
            "👨🏾‍🔧",
            "👩🏾‍🔬",
            "🧑🏾‍🔬",
            "👨🏾‍🔬",
            "👩🏾‍🎨",
            "🧑🏾‍🎨",
            "👨🏾‍🎨",
            "👩🏾‍🚒",
            "🧑🏾‍🚒",
            "👨🏾‍🚒",
            "👩🏾‍✈️",
            "🧑🏾‍✈️",
            "👨🏾‍✈️",
            "👩🏾‍🚀",
            "🧑🏾‍🚀",
            "👨🏾‍🚀",
            "👩🏾‍⚖️",
            "🧑🏾‍⚖️",
            "👨🏾‍⚖️",
            "👰🏾‍♀️",
            "👰🏾",
            "👰🏾‍♂️",
            "🤵🏾‍♀️",
            "🤵🏾",
            "🤵🏾‍♂️",
            "👸🏾",
            "🤴🏾",
            "🥷🏾",
            "🦸🏾‍♀️",
            "🦸🏾",
            "🦸🏾‍♂️",
            "🦹🏾‍♀️",
            "🦹🏾",
            "🦹🏾‍♂️",
            "🤶🏾",
            "🧑🏾‍🎄",
            "🎅🏾",
            "🧙🏾‍♀️",
            "🧙🏾",
            "🧙🏾‍♂️",
            "🧝🏾‍♀️",
            "🧝🏾",
            "🧝🏾‍♂️",
            "🧛🏾‍♀️",
            "🧛🏾",
            "🧛🏾‍♂️",
            "🧜🏾‍♀️",
            "🧜🏾",
            "🧜🏾‍♂️",
            "🧚🏾‍♀️",
            "🧚🏾",
            "🧚🏾‍♂️",
            "👼🏾",
            "🤰🏾",
            "🤱🏾",
            "👩🏾‍🍼",
            "🧑🏾‍🍼",
            "👨🏾‍🍼",
            "🙇🏾‍♀️",
            "🙇🏾",
            "🙇🏾‍♂️",
            "💁🏾‍♀️",
            "💁🏾",
            "💁🏾‍♂️",
            "🙅🏾‍♀️",
            "🙅🏾",
            "🙅🏾‍♂️",
            "🙆🏾‍♀️",
            "🙆🏾",
            "🙆🏾‍♂️",
            "🙋🏾‍♀️",
            "🙋🏾",
            "🙋🏾‍♂️",
            "🧏🏾‍♀️",
            "🧏🏾",
            "🧏🏾‍♂️",
            "🤦🏾‍♀️",
            "🤦🏾",
            "🤦🏾‍♂️",
            "🤷🏾‍♀️",
            "🤷🏾",
            "🤷🏾‍♂️",
            "🙎🏾‍♀️",
            "🙎🏾",
            "🙎🏾‍♂️",
            "🙍🏾‍♀️",
            "🙍🏾",
            "🙍🏾‍♂️",
            "💇🏾‍♀️",
            "💇🏾",
            "💇🏾‍♂️",
            "💆🏾‍♀️",
            "💆🏾",
            "💆🏾‍♂️",
            "🧖🏾‍♀️",
            "🧖🏾",
            "🧖🏾‍♂️",
            "💃🏾",
            "🕺🏾",
            "🕴🏿",
            "👩🏾‍🦽",
            "🧑🏾‍🦽",
            "👨🏾‍🦽",
            "👩🏾‍🦼",
            "🧑🏾‍🦼",
            "👨🏾‍🦼",
            "🚶🏾‍♀️",
            "🚶🏾",
            "🚶🏾‍♂️",
            "👩🏾‍🦯",
            "🧑🏾‍🦯",
            "👨🏾‍🦯",
            "🧎🏾‍♀️",
            "🧎🏾",
            "🧎🏾‍♂️",
            "🏃🏾‍♀️",
            "🏃🏾",
            "🏃🏾‍♂️",
            "🧍🏾‍♀️",
            "🧍🏾",
            "🧍🏾‍♂️",
            "👭🏾",
            "🧑🏾‍🤝‍🧑🏾",
            "👬🏾",
            "👫🏾",
            "🧗🏾‍♀️",
            "🧗🏾",
            "🧗🏾‍♂️",
            "🏇🏾",
            "🏂🏾",
            "🏌🏾‍♀️",
            "🏌🏾",
            "🏌🏾‍♂️",
            "🏄🏾‍♀️",
            "🏄🏾",
            "🏄🏾‍♂️",
            "🚣🏾‍♀️",
            "🚣🏾",
            "🚣🏾‍♂️",
            "🏊🏾‍♀️",
            "🏊🏾",
            "🏊🏾‍♂️",
            "⛹🏾‍♀️",
            "⛹🏾",
            "⛹🏾‍♂️",
            "🏋🏾‍♀️",
            "🏋🏾",
            "🏋🏾‍♂️",
            "🚴🏾‍♀️",
            "🚴🏾",
            "🚴🏾‍♂️",
            "🚵🏾‍♀️",
            "🚵🏾",
            "🚵🏾‍♂️",
            "🤸🏾‍♀️",
            "🤸🏾",
            "🤸🏾‍♂️",
            "🤽🏾‍♀️",
            "🤽🏾",
            "🤽🏾‍♂️",
            "🤾🏾‍♀️",
            "🤾🏾",
            "🤾🏾‍♂️",
            "🤹🏾‍♀️",
            "🤹🏾",
            "🤹🏾‍♂️",
            "🧘🏾‍♀️",
            "🧘🏾",
            "🧘🏾‍♂️",
            "🛀🏾",
            "🛌🏾",
            "👋🏿",
            "🤚🏿",
            "🖐🏿",
            "✋🏿",
            "🖖🏿",
            "👌🏿",
            "🤌🏿",
            "🤏🏿",
            "✌🏿",
            "🤞🏿",
            "🤟🏿",
            "🤘🏿",
            "🤙🏿",
            "👈🏿",
            "👉🏿",
            "👆🏿",
            "🖕🏿",
            "👇🏿",
            "☝🏿",
            "👍🏿",
            "👎🏿",
            "✊🏿",
            "👊🏿",
            "🤛🏿",
            "🤜🏿",
            "👏🏿",
            "🙌🏿",
            "👐🏿",
            "🤲🏿",
            "🙏🏿",
            "✍🏿",
            "💅🏿",
            "🤳🏿",
            "💪🏿",
            "🦵🏿",
            "🦶🏿",
            "👂🏿",
            "🦻🏿",
            "👃🏿",
            "👶🏿",
            "👧🏿",
            "🧒🏿",
            "👦🏿",
            "👩🏿",
            "🧑🏿",
            "👨🏿",
            "👩🏿‍🦱",
            "🧑🏿‍🦱",
            "👨🏿‍🦱",
            "👩🏿‍🦰",
            "🧑🏿‍🦰",
            "👨🏿‍🦰",
            "👱🏿‍♀️",
            "👱🏿",
            "👱🏿‍♂️",
            "👩🏿‍🦳",
            "🧑🏿‍🦳",
            "👨🏿‍🦳",
            "👩🏿‍🦲",
            "🧑🏿‍🦲",
            "👨🏿‍🦲",
            "🧔🏿",
            "👵🏿",
            "🧓🏿",
            "👴🏿",
            "👲🏿",
            "👳🏿‍♀️",
            "👳🏿",
            "👳🏿‍♂️",
            "🧕🏿",
            "👮🏿‍♀️",
            "👮🏿",
            "👮🏿‍♂️",
            "👷🏿‍♀️",
            "👷🏿",
            "👷🏿‍♂️",
            "💂🏿‍♀️",
            "💂🏿",
            "💂🏿‍♂️",
            "🕵🏿‍♀️",
            "🕵🏿",
            "🕵🏿‍♂️",
            "👩🏿‍⚕️",
            "🧑🏿‍⚕️",
            "👨🏿‍⚕️",
            "👩🏿‍🌾",
            "🧑🏿‍🌾",
            "👨🏿‍🌾",
            "👩🏿‍🍳",
            "🧑🏿‍🍳",
            "👨🏿‍🍳",
            "👩🏿‍🎓",
            "🧑🏿‍🎓",
            "👨🏿‍🎓",
            "👩🏿‍🎤",
            "🧑🏿‍🎤",
            "👨🏿‍🎤",
            "👩🏿‍🏫",
            "🧑🏿‍🏫",
            "👨🏿‍🏫",
            "👩🏿‍🏭",
            "🧑🏿‍🏭",
            "👨🏿‍🏭",
            "👩🏿‍💻",
            "🧑🏿‍💻",
            "👨🏿‍💻",
            "👩🏿‍💼",
            "🧑🏿‍💼",
            "👨🏿‍💼",
            "👩🏿‍🔧",
            "🧑🏿‍🔧",
            "👨🏿‍🔧",
            "👩🏿‍🔬",
            "🧑🏿‍🔬",
            "👨🏿‍🔬",
            "👩🏿‍🎨",
            "🧑🏿‍🎨",
            "👨🏿‍🎨",
            "👩🏿‍🚒",
            "🧑🏿‍🚒",
            "👨🏿‍🚒",
            "👩🏿‍✈️",
            "🧑🏿‍✈️",
            "👨🏿‍✈️",
            "👩🏿‍🚀",
            "🧑🏿‍🚀",
            "👨🏿‍🚀",
            "👩🏿‍⚖️",
            "🧑🏿‍⚖️",
            "👨🏿‍⚖️",
            "👰🏿‍♀️",
            "👰🏿",
            "👰🏿‍♂️",
            "🤵🏿‍♀️",
            "🤵🏿",
            "🤵🏿‍♂️",
            "👸🏿",
            "🤴🏿",
            "🥷🏿",
            "🦸🏿‍♀️",
            "🦸🏿",
            "🦸🏿‍♂️",
            "🦹🏿‍♀️",
            "🦹🏿",
            "🦹🏿‍♂️",
            "🤶🏿",
            "🧑🏿‍🎄",
            "🎅🏿",
            "🧙🏿‍♀️",
            "🧙🏿",
            "🧙🏿‍♂️",
            "🧝🏿‍♀️",
            "🧝🏿",
            "🧝🏿‍♂️",
            "🧛🏿‍♀️",
            "🧛🏿",
            "🧛🏿‍♂️",
            "🧜🏿‍♀️",
            "🧜🏿",
            "🧜🏿‍♂️",
            "🧚🏿‍♀️",
            "🧚🏿",
            "🧚🏿‍♂️",
            "👼🏿",
            "🤰🏿",
            "🤱🏿",
            "👩🏿‍🍼",
            "🧑🏿‍🍼",
            "👨🏿‍🍼",
            "🙇🏿‍♀️",
            "🙇🏿",
            "🙇🏿‍♂️",
            "💁🏿‍♀️",
            "💁🏿",
            "💁🏿‍♂️",
            "🙅🏿‍♀️",
            "🙅🏿",
            "🙅🏿‍♂️",
            "🙆🏿‍♀️",
            "🙆🏿",
            "🙆🏿‍♂️",
            "🙋🏿‍♀️",
            "🙋🏿",
            "🙋🏿‍♂️",
            "🧏🏿‍♀️",
            "🧏🏿",
            "🧏🏿‍♂️",
            "🤦🏿‍♀️",
            "🤦🏿",
            "🤦🏿‍♂️",
            "🤷🏿‍♀️",
            "🤷🏿",
            "🤷🏿‍♂️",
            "🙎🏿‍♀️",
            "🙎🏿",
            "🙎🏿‍♂️",
            "🙍🏿‍♀️",
            "🙍🏿",
            "🙍🏿‍♂️",
            "💇🏿‍♀️",
            "💇🏿",
            "💇🏿‍♂️",
            "💆🏿‍♀️",
            "💆🏿",
            "💆🏿‍♂️",
            "🧖🏿‍♀️",
            "🧖🏿",
            "🧖🏿‍♂️",
            "💃🏿",
            "🕺🏿",
            "🕴🏿",
            "👩🏿‍🦽",
            "🧑🏿‍🦽",
            "👨🏿‍🦽",
            "👩🏿‍🦼",
            "🧑🏿‍🦼",
            "👨🏿‍🦼",
            "🚶🏿‍♀️",
            "🚶🏿",
            "🚶🏿‍♂️",
            "👩🏿‍🦯",
            "🧑🏿‍🦯",
            "👨🏿‍🦯",
            "🧎🏿‍♀️",
            "🧎🏿",
            "🧎🏿‍♂️",
            "🏃🏿‍♀️",
            "🏃🏿",
            "🏃🏿‍♂️",
            "🧍🏿‍♀️",
            "🧍🏿",
            "🧍🏿‍♂️",
            "👭🏿",
            "🧑🏿‍🤝‍🧑🏿",
            "👬🏿",
            "👫🏿",
            "🧗🏿‍♀️",
            "🧗🏿",
            "🧗🏿‍♂️",
            "🏇🏿",
            "🏂🏿",
            "🏌🏿‍♀️",
            "🏌🏿",
            "🏌🏿‍♂️",
            "🏄🏿‍♀️",
            "🏄🏿",
            "🏄🏿‍♂️",
            "🚣🏿‍♀️",
            "🚣🏿",
            "🚣🏿‍♂️",
            "🏊🏿‍♀️",
            "🏊🏿",
            "🏊🏿‍♂️",
            "⛹🏿‍♀️",
            "⛹🏿",
            "⛹🏿‍♂️",
            "🏋🏿‍♀️",
            "🏋🏿",
            "🏋🏿‍♂️",
            "🚴🏿‍♀️",
            "🚴🏿",
            "🚴🏿‍♂️",
            "🚵🏿‍♀️",
            "🚵🏿",
            "🚵🏿‍♂️",
            "🤸🏿‍♀️",
            "🤸🏿",
            "🤸🏿‍♂️",
            "🤽🏿‍♀️",
            "🤽🏿",
            "🤽🏿‍♂️",
            "🤾🏿‍♀️",
            "🤾🏿",
            "🤾🏿‍♂️",
            "🤹🏿‍♀️",
            "🤹🏿",
            "🤹🏿‍♂️",
            "🧘🏿‍♀️",
            "🧘🏿",
            "🧘🏿‍♂️",
            "🛀🏿",
            "🛌🏿",
            "🐶",
            "🐱",
            "🐭",
            "🐹",
            "🐰",
            "🦊",
            "🐻",
            "🐼",
            "🐻‍❄️",
            "🐨",
            "🐯",
            "🦁",
            "🐮",
            "🐷",
            "🐽",
            "🐸",
            "🐵",
            "🙈",
            "🙉",
            "🙊",
            "🐒",
            "🐔",
            "🐧",
            "🐦",
            "🐤",
            "🐣",
            "🐥",
            "🦆",
            "🦅",
            "🦉",
            "🦇",
            "🐺",
            "🐗",
            "🐴",
            "🦄",
            "🐝",
            "🪱",
            "🐛",
            "🦋",
            "🐌",
            "🐞",
            "🐜",
            "🪰",
            "🪲",
            "🪳",
            "🦟",
            "🦗",
            "🕷",
            "🕸",
            "🦂",
            "🐢",
            "🐍",
            "🦎",
            "🦖",
            "🦕",
            "🐙",
            "🦑",
            "🦐",
            "🦞",
            "🦀",
            "🐡",
            "🐠",
            "🐟",
            "🐬",
            "🐳",
            "🐋",
            "🦈",
            "🐊",
            "🐅",
            "🐆",
            "🦓",
            "🦍",
            "🦧",
            "🦣",
            "🐘",
            "🦛",
            "🦏",
            "🐪",
            "🐫",
            "🦒",
            "🦘",
            "🦬",
            "🐃",
            "🐂",
            "🐄",
            "🐎",
            "🐖",
            "🐏",
            "🐑",
            "🦙",
            "🐐",
            "🦌",
            "🐕",
            "🐩",
            "🦮",
            "🐕‍🦺",
            "🐈",
            "🐈‍⬛",
            "🪶",
            "🐓",
            "🦃",
            "🦤",
            "🦚",
            "🦜",
            "🦢",
            "🦩",
            "🕊",
            "🐇",
            "🦝",
            "🦨",
            "🦡",
            "🦫",
            "🦦",
            "🦥",
            "🐁",
            "🐀",
            "🐿",
            "🦔",
            "🐾",
            "🐉",
            "🐲",
            "🌵",
            "🎄",
            "🌲",
            "🌳",
            "🌴",
            "🪵",
            "🌱",
            "🌿",
            "☘️",
            "🍀",
            "🎍",
            "🪴",
            "🎋",
            "🍃",
            "🍂",
            "🍁",
            "🍄",
            "🐚",
            "🪨",
            "🌾",
            "💐",
            "🌷",
            "🌹",
            "🥀",
            "🌺",
            "🌸",
            "🌼",
            "🌻",
            "🌞",
            "🌝",
            "🌛",
            "🌜",
            "🌚",
            "🌕",
            "🌖",
            "🌗",
            "🌘",
            "🌑",
            "🌒",
            "🌓",
            "🌔",
            "🌙",
            "🌎",
            "🌍",
            "🌏",
            "🪐",
            "💫",
            "⭐️",
            "🌟",
            "✨",
            "⚡️",
            "☄️",
            "💥",
            "🔥",
            "🌪",
            "🌈",
            "☀️",
            "🌤",
            "⛅️",
            "🌥",
            "☁️",
            "🌦",
            "🌧",
            "⛈",
            "🌩",
            "🌨",
            "❄️",
            "☃️",
            "⛄️",
            "🌬",
            "💨",
            "💧",
            "💦",
            "☔️",
            "☂️",
            "🌊",
            "🌫",
            "🍏",
            "🍎",
            "🍐",
            "🍊",
            "🍋",
            "🍌",
            "🍉",
            "🍇",
            "🍓",
            "🫐",
            "🍈",
            "🍒",
            "🍑",
            "🥭",
            "🍍",
            "🥥",
            "🥝",
            "🍅",
            "🍆",
            "🥑",
            "🥦",
            "🥬",
            "🥒",
            "🌶",
            "🫑",
            "🌽",
            "🥕",
            "🫒",
            "🧄",
            "🧅",
            "🥔",
            "🍠",
            "🥐",
            "🥯",
            "🍞",
            "🥖",
            "🥨",
            "🧀",
            "🥚",
            "🍳",
            "🧈",
            "🥞",
            "🧇",
            "🥓",
            "🥩",
            "🍗",
            "🍖",
            "🦴",
            "🌭",
            "🍔",
            "🍟",
            "🍕",
            "🫓",
            "🥪",
            "🥙",
            "🧆",
            "🌮",
            "🌯",
            "🫔",
            "🥗",
            "🥘",
            "🫕",
            "🥫",
            "🍝",
            "🍜",
            "🍲",
            "🍛",
            "🍣",
            "🍱",
            "🥟",
            "🦪",
            "🍤",
            "🍙",
            "🍚",
            "🍘",
            "🍥",
            "🥠",
            "🥮",
            "🍢",
            "🍡",
            "🍧",
            "🍨",
            "🍦",
            "🥧",
            "🧁",
            "🍰",
            "🎂",
            "🍮",
            "🍭",
            "🍬",
            "🍫",
            "🍿",
            "🍩",
            "🍪",
            "🌰",
            "🥜",
            "🍯",
            "🥛",
            "🍼",
            "🫖",
            "☕️",
            "🍵",
            "🧃",
            "🥤",
            "🧋",
            "🍶",
            "🍺",
            "🍻",
            "🥂",
            "🍷",
            "🥃",
            "🍸",
            "🍹",
            "🧉",
            "🍾",
            "🧊",
            "🥄",
            "🍴",
            "🍽",
            "🥣",
            "🥡",
            "🥢",
            "🧂",
            "⚽️",
            "🏀",
            "🏈",
            "⚾️",
            "🥎",
            "🎾",
            "🏐",
            "🏉",
            "🥏",
            "🎱",
            "🪀",
            "🏓",
            "🏸",
            "🏒",
            "🏑",
            "🥍",
            "🏏",
            "🪃",
            "🥅",
            "⛳️",
            "🪁",
            "🏹",
            "🎣",
            "🤿",
            "🥊",
            "🥋",
            "🎽",
            "🛹",
            "🛼",
            "🛷",
            "⛸",
            "🥌",
            "🎿",
            "⛷",
            "🏂",
            "🪂",
            "🏋️‍♀️",
            "🏋️",
            "🏋️‍♂️",
            "🤼‍♀️",
            "🤼",
            "🤼‍♂️",
            "🤸‍♀️",
            "🤸",
            "🤸‍♂️",
            "⛹️‍♀️",
            "⛹️",
            "⛹️‍♂️",
            "🤺",
            "🤾‍♀️",
            "🤾",
            "🤾‍♂️",
            "🏌️‍♀️",
            "🏌️",
            "🏌️‍♂️",
            "🏇",
            "🧘‍♀️",
            "🧘",
            "🧘‍♂️",
            "🏄‍♀️",
            "🏄",
            "🏄‍♂️",
            "🏊‍♀️",
            "🏊",
            "🏊‍♂️",
            "🤽‍♀️",
            "🤽",
            "🤽‍♂️",
            "🚣‍♀️",
            "🚣",
            "🚣‍♂️",
            "🧗‍♀️",
            "🧗",
            "🧗‍♂️",
            "🚵‍♀️",
            "🚵",
            "🚵‍♂️",
            "🚴‍♀️",
            "🚴",
            "🚴‍♂️",
            "🏆",
            "🥇",
            "🥈",
            "🥉",
            "🏅",
            "🎖",
            "🏵",
            "🎗",
            "🎫",
            "🎟",
            "🎪",
            "🤹",
            "🤹‍♂️",
            "🤹‍♀️",
            "🎭",
            "🩰",
            "🎨",
            "🎬",
            "🎤",
            "🎧",
            "🎼",
            "🎹",
            "🥁",
            "🪘",
            "🎷",
            "🎺",
            "🪗",
            "🎸",
            "🪕",
            "🎻",
            "🎲",
            "♟",
            "🎯",
            "🎳",
            "🎮",
            "🎰",
            "🧩",
            "🚗",
            "🚕",
            "🚙",
            "🚌",
            "🚎",
            "🏎",
            "🚓",
            "🚑",
            "🚒",
            "🚐",
            "🛻",
            "🚚",
            "🚛",
            "🚜",
            "🦯",
            "🦽",
            "🦼",
            "🛴",
            "🚲",
            "🛵",
            "🏍",
            "🛺",
            "🚨",
            "🚔",
            "🚍",
            "🚘",
            "🚖",
            "🚡",
            "🚠",
            "🚟",
            "🚃",
            "🚋",
            "🚞",
            "🚝",
            "🚄",
            "🚅",
            "🚈",
            "🚂",
            "🚆",
            "🚇",
            "🚊",
            "🚉",
            "✈️",
            "🛫",
            "🛬",
            "🛩",
            "💺",
            "🛰",
            "🚀",
            "🛸",
            "🚁",
            "🛶",
            "⛵️",
            "🚤",
            "🛥",
            "🛳",
            "⛴",
            "🚢",
            "⚓️",
            "🪝",
            "⛽️",
            "🚧",
            "🚦",
            "🚥",
            "🚏",
            "🗺",
            "🗿",
            "🗽",
            "🗼",
            "🏰",
            "🏯",
            "🏟",
            "🎡",
            "🎢",
            "🎠",
            "⛲️",
            "⛱",
            "🏖",
            "🏝",
            "🏜",
            "🌋",
            "⛰",
            "🏔",
            "🗻",
            "🏕",
            "⛺️",
            "🛖",
            "🏠",
            "🏡",
            "🏘",
            "🏚",
            "🏗",
            "🏭",
            "🏢",
            "🏬",
            "🏣",
            "🏤",
            "🏥",
            "🏦",
            "🏨",
            "🏪",
            "🏫",
            "🏩",
            "💒",
            "🏛",
            "⛪️",
            "🕌",
            "🕍",
            "🛕",
            "🕋",
            "⛩",
            "🛤",
            "🛣",
            "🗾",
            "🎑",
            "🏞",
            "🌅",
            "🌄",
            "🌠",
            "🎇",
            "🎆",
            "🌇",
            "🌆",
            "🏙",
            "🌃",
            "🌌",
            "🌉",
            "🌁",
            "⌚️",
            "📱",
            "📲",
            "💻",
            "⌨️",
            "🖥",
            "🖨",
            "🖱",
            "🖲",
            "🕹",
            "🗜",
            "💽",
            "💾",
            "💿",
            "📀",
            "📼",
            "📷",
            "📸",
            "📹",
            "🎥",
            "📽",
            "🎞",
            "📞",
            "☎️",
            "📟",
            "📠",
            "📺",
            "📻",
            "🎙",
            "🎚",
            "🎛",
            "🧭",
            "⏱",
            "⏲",
            "⏰",
            "🕰",
            "⌛️",
            "⏳",
            "📡",
            "🔋",
            "🔌",
            "💡",
            "🔦",
            "🕯",
            "🪔",
            "🧯",
            "🛢",
            "💸",
            "💵",
            "💴",
            "💶",
            "💷",
            "🪙",
            "💰",
            "💳",
            "💎",
            "⚖️",
            "🪜",
            "🧰",
            "🪛",
            "🔧",
            "🔨",
            "⚒",
            "🛠",
            "⛏",
            "🪚",
            "🔩",
            "⚙️",
            "🪤",
            "🧱",
            "⛓",
            "🧲",
            "🔫",
            "💣",
            "🧨",
            "🪓",
            "🔪",
            "🗡",
            "⚔️",
            "🛡",
            "🚬",
            "⚰️",
            "🪦",
            "⚱️",
            "🏺",
            "🔮",
            "📿",
            "🧿",
            "💈",
            "⚗️",
            "🔭",
            "🔬",
            "🕳",
            "🩹",
            "🩺",
            "💊",
            "💉",
            "🩸",
            "🧬",
            "🦠",
            "🧫",
            "🧪",
            "🌡",
            "🧹",
            "🪠",
            "🧺",
            "🧻",
            "🚽",
            "🚰",
            "🚿",
            "🛁",
            "🛀",
            "🧼",
            "🪥",
            "🪒",
            "🧽",
            "🪣",
            "🧴",
            "🛎",
            "🔑",
            "🗝",
            "🚪",
            "🪑",
            "🛋",
            "🛏",
            "🛌",
            "🧸",
            "🪆",
            "🖼",
            "🪞",
            "🪟",
            "🛍",
            "🛒",
            "🎁",
            "🎈",
            "🎏",
            "🎀",
            "🪄",
            "🪅",
            "🎊",
            "🎉",
            "🎎",
            "🏮",
            "🎐",
            "🧧",
            "✉️",
            "📩",
            "📨",
            "📧",
            "💌",
            "📥",
            "📤",
            "📦",
            "🏷",
            "🪧",
            "📪",
            "📫",
            "📬",
            "📭",
            "📮",
            "📯",
            "📜",
            "📃",
            "📄",
            "📑",
            "🧾",
            "📊",
            "📈",
            "📉",
            "🗒",
            "🗓",
            "📆",
            "📅",
            "🗑",
            "📇",
            "🗃",
            "🗳",
            "🗄",
            "📋",
            "📁",
            "📂",
            "🗂",
            "🗞",
            "📰",
            "📓",
            "📔",
            "📒",
            "📕",
            "📗",
            "📘",
            "📙",
            "📚",
            "📖",
            "🔖",
            "🧷",
            "🔗",
            "📎",
            "🖇",
            "📐",
            "📏",
            "🧮",
            "📌",
            "📍",
            "✂️",
            "🖊",
            "🖋",
            "✒️",
            "🖌",
            "🖍",
            "📝",
            "✏️",
            "🔍",
            "🔎",
            "🔏",
            "🔐",
            "🔒",
            "🔓",
            "❤️",
            "🧡",
            "💛",
            "💚",
            "💙",
            "💜",
            "🖤",
            "🤍",
            "🤎",
            "💔",
            "❣️",
            "💕",
            "💞",
            "💓",
            "💗",
            "💖",
            "💘",
            "💝",
            "💟",
            "☮️",
            "✝️",
            "☪️",
            "🕉",
            "☸️",
            "✡️",
            "🔯",
            "🕎",
            "☯️",
            "☦️",
            "🛐",
            "⛎",
            "♈️",
            "♉️",
            "♊️",
            "♋️",
            "♌️",
            "♍️",
            "♎️",
            "♏️",
            "♐️",
            "♑️",
            "♒️",
            "♓️",
            "🆔",
            "⚛️",
            "🉑",
            "☢️",
            "☣️",
            "📴",
            "📳",
            "🈶",
            "🈚️",
            "🈸",
            "🈺",
            "🈷️",
            "✴️",
            "🆚",
            "💮",
            "🉐",
            "㊙️",
            "㊗️",
            "🈴",
            "🈵",
            "🈹",
            "🈲",
            "🅰️",
            "🅱️",
            "🆎",
            "🆑",
            "🅾️",
            "🆘",
            "❌",
            "⭕️",
            "🛑",
            "⛔️",
            "📛",
            "🚫",
            "💯",
            "💢",
            "♨️",
            "🚷",
            "🚯",
            "🚳",
            "🚱",
            "🔞",
            "📵",
            "🚭",
            "❗️",
            "❕",
            "❓",
            "❔",
            "‼️",
            "⁉️",
            "🔅",
            "🔆",
            "〽️",
            "⚠️",
            "🚸",
            "🔱",
            "⚜️",
            "🔰",
            "♻️",
            "✅",
            "🈯️",
            "💹",
            "❇️",
            "✳️",
            "❎",
            "🌐",
            "💠",
            "Ⓜ️",
            "🌀",
            "💤",
            "🏧",
            "🚾",
            "♿️",
            "🅿️",
            "🛗",
            "🈳",
            "🈂️",
            "🛂",
            "🛃",
            "🛄",
            "🛅",
            "🚹",
            "🚺",
            "🚼",
            "⚧",
            "🚻",
            "🚮",
            "🎦",
            "📶",
            "🈁",
            "🔣",
            "ℹ️",
            "🔤",
            "🔡",
            "🔠",
            "🆖",
            "🆗",
            "🆙",
            "🆒",
            "🆕",
            "🆓",
            "0️⃣",
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣",
            "6️⃣",
            "7️⃣",
            "8️⃣",
            "9️⃣",
            "🔟",
            "🔢",
            "#️⃣",
            "*️⃣",
            "⏏️",
            "▶️",
            "⏸",
            "⏯",
            "⏹",
            "⏺",
            "⏭",
            "⏮",
            "⏩",
            "⏪",
            "⏫",
            "⏬",
            "◀️",
            "🔼",
            "🔽",
            "➡️",
            "⬅️",
            "⬆️",
            "⬇️",
            "↗️",
            "↘️",
            "↙️",
            "↖️",
            "↕️",
            "↔️",
            "↪️",
            "↩️",
            "⤴️",
            "⤵️",
            "🔀",
            "🔁",
            "🔂",
            "🔄",
            "🔃",
            "🎵",
            "🎶",
            "➕",
            "➖",
            "➗",
            "✖️",
            "♾",
            "💲",
            "💱",
            "™️",
            "©️",
            "®️",
            "〰️",
            "➰",
            "➿",
            "🔚",
            "🔙",
            "🔛",
            "🔝",
            "🔜",
            "✔️",
            "☑️",
            "🔘",
            "🔴",
            "🟠",
            "🟡",
            "🟢",
            "🔵",
            "🟣",
            "⚫️",
            "⚪️",
            "🟤",
            "🔺",
            "🔻",
            "🔸",
            "🔹",
            "🔶",
            "🔷",
            "🔳",
            "🔲",
            "▪️",
            "▫️",
            "◾️",
            "◽️",
            "◼️",
            "◻️",
            "🟥",
            "🟧",
            "🟨",
            "🟩",
            "🟦",
            "🟪",
            "⬛️",
            "⬜️",
            "🟫",
            "🔈",
            "🔇",
            "🔉",
            "🔊",
            "🔔",
            "🔕",
            "📣",
            "📢",
            "👁‍🗨",
            "💬",
            "💭",
            "🗯",
            "♠️",
            "♣️",
            "♥️",
            "♦️",
            "🃏",
            "🎴",
            "🀄️",
            "🕐",
            "🕑",
            "🕒",
            "🕓",
            "🕔",
            "🕕",
            "🕖",
            "🕗",
            "🕘",
            "🕙",
            "🕚",
            "🕛",
            "🕜",
            "🕝",
            "🕞",
            "🕟",
            "🕠",
            "🕡",
            "🕢",
            "🕣",
            "🕤",
            "🕥",
            "🕦",
            "🕧",
            "✢",
            "✣",
            "✤",
            "✥",
            "✦",
            "✧",
            "★",
            "☆",
            "✯",
            "✡︎",
            "✩",
            "✪",
            "✫",
            "✬",
            "✭",
            "✮",
            "✶",
            "✷",
            "✵",
            "✸",
            "✹",
            "→",
            "⇒",
            "⟹",
            "⇨",
            "⇾",
            "➾",
            "⇢",
            "☛",
            "☞",
            "➔",
            "➜",
            "➙",
            "➛",
            "➝",
            "➞",
            "♠︎",
            "♣︎",
            "♥︎",
            "♦︎",
            "♤",
            "♧",
            "♡",
            "♢",
            "♚",
            "♛",
            "♜",
            "♝",
            "♞",
            "♟",
            "♔",
            "♕",
            "♖",
            "♗",
            "♘",
            "♙",
            "⚀",
            "⚁",
            "⚂",
            "⚃",
            "⚄",
            "⚅",
            "🂠",
            "⚈",
            "⚉",
            "⚆",
            "⚇",
            "𓀀",
            "𓀁",
            "𓀂",
            "𓀃",
            "𓀄",
            "𓀅",
            "𓀆",
            "𓀇",
            "𓀈",
            "𓀉",
            "𓀊",
            "𓀋",
            "𓀌",
            "𓀍",
            "𓀎",
            "𓀏",
            "𓀐",
            "𓀑",
            "𓀒",
            "𓀓",
            "𓀔",
            "𓀕",
            "𓀖",
            "𓀗",
            "𓀘",
            "𓀙",
            "𓀚",
            "𓀛",
            "𓀜",
            "𓀝",
            "🏳️",
            "🏴",
            "🏁",
            "🚩",
            "🏳️‍🌈",
            "🏳️‍⚧️",
            "🏴‍☠️",
            "🇦🇫",
            "🇦🇽",
            "🇦🇱",
            "🇩🇿",
            "🇦🇸",
            "🇦🇩",
            "🇦🇴",
            "🇦🇮",
            "🇦🇶",
            "🇦🇬",
            "🇦🇷",
            "🇦🇲",
            "🇦🇼",
            "🇦🇺",
            "🇦🇹",
            "🇦🇿",
            "🇧🇸",
            "🇧🇭",
            "🇧🇩",
            "🇧🇧",
            "🇧🇾",
            "🇧🇪",
            "🇧🇿",
            "🇧🇯",
            "🇧🇲",
            "🇧🇹",
            "🇧🇴",
            "🇧🇦",
            "🇧🇼",
            "🇧🇷",
            "🇮🇴",
            "🇻🇬",
            "🇧🇳",
            "🇧🇬",
            "🇧🇫",
            "🇧🇮",
            "🇰🇭",
            "🇨🇲",
            "🇨🇦",
            "🇮🇨",
            "🇨🇻",
            "🇧🇶",
            "🇰🇾",
            "🇨🇫",
            "🇹🇩",
            "🇨🇱",
            "🇨🇳",
            "🇨🇽",
            "🇨🇨",
            "🇨🇴",
            "🇰🇲",
            "🇨🇬",
            "🇨🇩",
            "🇨🇰",
            "🇨🇷",
            "🇨🇮",
            "🇭🇷",
            "🇨🇺",
            "🇨🇼",
            "🇨🇾",
            "🇨🇿",
            "🇩🇰",
            "🇩🇯",
            "🇩🇲",
            "🇩🇴",
            "🇪🇨",
            "🇪🇬",
            "🇸🇻",
            "🇬🇶",
            "🇪🇷",
            "🇪🇪",
            "🇪🇹",
            "🇪🇺",
            "🇫🇰",
            "🇫🇴",
            "🇫🇯",
            "🇫🇮",
            "🇫🇷",
            "🇬🇫",
            "🇵🇫",
            "🇹🇫",
            "🇬🇦",
            "🇬🇲",
            "🇬🇪",
            "🇩🇪",
            "🇬🇭",
            "🇬🇮",
            "🇬🇷",
            "🇬🇱",
            "🇬🇩",
            "🇬🇵",
            "🇬🇺",
            "🇬🇹",
            "🇬🇬",
            "🇬🇳",
            "🇬🇼",
            "🇬🇾",
            "🇭🇹",
            "🇭🇳",
            "🇭🇰",
            "🇭🇺",
            "🇮🇸",
            "🇮🇳",
            "🇮🇩",
            "🇮🇷",
            "🇮🇶",
            "🇮🇪",
            "🇮🇲",
            "🇮🇱",
            "🇮🇹",
            "🇯🇲",
            "🇯🇵",
            "🎌",
            "🇯🇪",
            "🇯🇴",
            "🇰🇿",
            "🇰🇪",
            "🇰🇮",
            "🇽🇰",
            "🇰🇼",
            "🇰🇬",
            "🇱🇦",
            "🇱🇻",
            "🇱🇧",
            "🇱🇸",
            "🇱🇷",
            "🇱🇾",
            "🇱🇮",
            "🇱🇹",
            "🇱🇺",
            "🇲🇴",
            "🇲🇰",
            "🇲🇬",
            "🇲🇼",
            "🇲🇾",
            "🇲🇻",
            "🇲🇱",
            "🇲🇹",
            "🇲🇭",
            "🇲🇶",
            "🇲🇷",
            "🇲🇺",
            "🇾🇹",
            "🇲🇽",
            "🇫🇲",
            "🇲🇩",
            "🇲🇨",
            "🇲🇳",
            "🇲🇪",
            "🇲🇸",
            "🇲🇦",
            "🇲🇿",
            "🇲🇲",
            "🇳🇦",
            "🇳🇷",
            "🇳🇵",
            "🇳🇱",
            "🇳🇨",
            "🇳🇿",
            "🇳🇮",
            "🇳🇪",
            "🇳🇬",
            "🇳🇺",
            "🇳🇫",
            "🇰🇵",
            "🇲🇵",
            "🇳🇴",
            "🇴🇲",
            "🇵🇰",
            "🇵🇼",
            "🇵🇸",
            "🇵🇦",
            "🇵🇬",
            "🇵🇾",
            "🇵🇪",
            "🇵🇭",
            "🇵🇳",
            "🇵🇱",
            "🇵🇹",
            "🇵🇷",
            "🇶🇦",
            "🇷🇪",
            "🇷🇴",
            "🇷🇺",
            "🇷🇼",
            "🇼🇸",
            "🇸🇲",
            "🇸🇦",
            "🇸🇳",
            "🇷🇸",
            "🇸🇨",
            "🇸🇱",
            "🇸🇬",
            "🇸🇽",
            "🇸🇰",
            "🇸🇮",
            "🇬🇸",
            "🇸🇧",
            "🇸🇴",
            "🇿🇦",
            "🇰🇷",
            "🇸🇸",
            "🇪🇸",
            "🇱🇰",
            "🇧🇱",
            "🇸🇭",
            "🇰🇳",
            "🇱🇨",
            "🇵🇲",
            "🇻🇨",
            "🇸🇩",
            "🇸🇷",
            "🇸🇿",
            "🇸🇪",
            "🇨🇭",
            "🇸🇾",
            "🇹🇼",
            "🇹🇯",
            "🇹🇿",
            "🇹🇭",
            "🇹🇱",
            "🇹🇬",
            "🇹🇰",
            "🇹🇴",
            "🇹🇹",
            "🇹🇳",
            "🇹🇷",
            "🇹🇲",
            "🇹🇨",
            "🇹🇻",
            "🇻🇮",
            "🇺🇬",
            "🇺🇦",
            "🇦🇪",
            "🇬🇧",
            "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
            "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
            "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
            "🇺🇳",
            "🇺🇸",
            "🇺🇾",
            "🇺🇿",
            "🇻🇺",
            "🇻🇦",
            "🇻🇪",
            "🇻🇳",
            "🇼🇫",
            "🇪🇭",
            "🇾🇪",
            "🇿🇲",
            "🇿🇼",
            "🤵‍♀️",
            "🤵🏻‍♀️",
            "🤵🏼‍♀️",
            "🤵🏽‍♀️",
            "🤵🏾‍♀️",
            "🤵🏿‍♀️",
            "🤵‍♂️",
            "🤵🏻‍♂️",
            "🤵🏼‍♂️",
            "🤵🏽‍♂️",
            "🤵🏾‍♂️",
            "🤵🏿‍♂️",
            "👰‍♀️",
            "👰🏻‍♀️",
            "👰🏼‍♀️",
            "👰🏽‍♀️",
            "👰🏾‍♀️",
            "👰🏿‍♀️",
            "👰‍♂️",
            "👰🏻‍♂️",
            "👰🏼‍♂️",
            "👰🏽‍♂️",
            "👰🏾‍♂️",
            "👰🏿‍♂️",
            "👩‍🍼",
            "👩🏻‍🍼",
            "👩🏼‍🍼",
            "👩🏽‍🍼",
            "👩🏾‍🍼",
            "👩🏿‍🍼",
            "🧑‍🍼",
            "🧑🏻‍🍼",
            "🧑🏼‍🍼",
            "🧑🏽‍🍼",
            "🧑🏾‍🍼",
            "🧑🏿‍🍼",
            "👨‍🍼",
            "👨🏻‍🍼",
            "👨🏼‍🍼",
            "👨🏽‍🍼",
            "👨🏾‍🍼",
            "👨🏿‍🍼",
            "🧑‍🎄",
            "🧑🏻‍🎄",
            "🧑🏼‍🎄",
            "🧑🏽‍🎄",
            "🧑🏾‍🎄",
            "🧑🏿‍🎄",
            "🐈‍⬛",
            "🐻‍❄️",
            "😮‍💨",
            "😵‍💫",
            "😶‍🌫️",
            "❤️‍🔥",
            "❤️‍🩹",
            "🧔‍♀️",
            "🧔🏻‍♀️",
            "🧔🏼‍♀️",
            "🧔🏽‍♀️",
            "🧔🏾‍♀️",
            "🧔🏿‍♀️",
            "🧔‍♂️",
            "🧔🏻‍♂️",
            "🧔🏼‍♂️",
            "🧔🏽‍♂️",
            "🧔🏾‍♂️",
            "🧔🏿‍♂️",
            "💑🏻",
            "💑🏼",
            "💑🏽",
            "💑🏾",
            "💑🏿",
            "💏🏻",
            "💏🏼",
            "💏🏽",
            "💏🏾",
            "💏🏿",
            "👨🏻‍❤️‍👨🏻",
            "👨🏻‍❤️‍👨🏼",
            "👨🏻‍❤️‍👨🏽",
            "👨🏻‍❤️‍👨🏾",
            "👨🏻‍❤️‍👨🏿",
            "👨🏼‍❤️‍👨🏻",
            "👨🏼‍❤️‍👨🏼",
            "👨🏼‍❤️‍👨🏽",
            "👨🏼‍❤️‍👨🏾",
            "👨🏼‍❤️‍👨🏿",
            "👨🏽‍❤️‍👨🏻",
            "👨🏽‍❤️‍👨🏼",
            "👨🏽‍❤️‍👨🏽",
            "👨🏽‍❤️‍👨🏾",
            "👨🏽‍❤️‍👨🏿",
            "👨🏾‍❤️‍👨🏻",
            "👨🏾‍❤️‍👨🏼",
            "👨🏾‍❤️‍👨🏽",
            "👨🏾‍❤️‍👨🏾",
            "👨🏾‍❤️‍👨🏿",
            "👨🏿‍❤️‍👨🏻",
            "👨🏿‍❤️‍👨🏼",
            "👨🏿‍❤️‍👨🏽",
            "👨🏿‍❤️‍👨🏾",
            "👨🏿‍❤️‍👨🏿",
            "👩🏻‍❤️‍👨🏻",
            "👩🏻‍❤️‍👨🏼",
            "👩🏻‍❤️‍👨🏽",
            "👩🏻‍❤️‍👨🏾",
            "👩🏻‍❤️‍👨🏿",
            "👩🏻‍❤️‍👩🏻",
            "👩🏻‍❤️‍👩🏼",
            "👩🏻‍❤️‍👩🏽",
            "👩🏻‍❤️‍👩🏾",
            "👩🏻‍❤️‍👩🏿",
            "👩🏼‍❤️‍👨🏻",
            "👩🏼‍❤️‍👨🏼",
            "👩🏼‍❤️‍👨🏽",
            "👩🏼‍❤️‍👨🏾",
            "👩🏼‍❤️‍👨🏿",
            "👩🏼‍❤️‍👩🏻",
            "👩🏼‍❤️‍👩🏼",
            "👩🏼‍❤️‍👩🏽",
            "👩🏼‍❤️‍👩🏾",
            "👩🏼‍❤️‍👩🏿",
            "👩🏽‍❤️‍👨🏻",
            "👩🏽‍❤️‍👨🏼",
            "👩🏽‍❤️‍👨🏽",
            "👩🏽‍❤️‍👨🏾",
            "👩🏽‍❤️‍👨🏿",
            "👩🏽‍❤️‍👩🏻",
            "👩🏽‍❤️‍👩🏼",
            "👩🏽‍❤️‍👩🏽",
            "👩🏽‍❤️‍👩🏾",
            "👩🏽‍❤️‍👩🏿",
            "👩🏾‍❤️‍👨🏻",
            "👩🏾‍❤️‍👨🏼",
            "👩🏾‍❤️‍👨🏽",
            "👩🏾‍❤️‍👨🏾",
            "👩🏾‍❤️‍👨🏿",
            "👩🏾‍❤️‍👩🏻",
            "👩🏾‍❤️‍👩🏼",
            "👩🏾‍❤️‍👩🏽",
            "👩🏾‍❤️‍👩🏾",
            "👩🏾‍❤️‍👩🏿",
            "👩🏿‍❤️‍👨🏻",
            "👩🏿‍❤️‍👨🏼",
            "👩🏿‍❤️‍👨🏽",
            "👩🏿‍❤️‍👨🏾",
            "👩🏿‍❤️‍👨🏿",
            "👩🏿‍❤️‍👩🏻",
            "👩🏿‍❤️‍👩🏼",
            "👩🏿‍❤️‍👩🏽",
            "👩🏿‍❤️‍👩🏾",
            "👩🏿‍❤️‍👩🏿",
            "🧑🏻‍❤️‍🧑🏼",
            "🧑🏻‍❤️‍🧑🏽",
            "🧑🏻‍❤️‍🧑🏾",
            "🧑🏻‍❤️‍🧑🏿",
            "🧑🏼‍❤️‍🧑🏻",
            "🧑🏼‍❤️‍🧑🏽",
            "🧑🏼‍❤️‍🧑🏾",
            "🧑🏼‍❤️‍🧑🏿",
            "🧑🏽‍❤️‍🧑🏻",
            "🧑🏽‍❤️‍🧑🏼",
            "🧑🏽‍❤️‍🧑🏾",
            "🧑🏽‍❤️‍🧑🏿",
            "🧑🏾‍❤️‍🧑🏻",
            "🧑🏾‍❤️‍🧑🏼",
            "🧑🏾‍❤️‍🧑🏽",
            "🧑🏾‍❤️‍🧑🏿",
            "🧑🏿‍❤️‍🧑🏻",
            "🧑🏿‍❤️‍🧑🏼",
            "🧑🏿‍❤️‍🧑🏽",
            "🧑🏿‍❤️‍🧑🏾",
            "👨🏻‍❤️‍💋‍👨🏻",
            "👨🏻‍❤️‍💋‍👨🏼",
            "👨🏻‍❤️‍💋‍👨🏽",
            "👨🏻‍❤️‍💋‍👨🏾",
            "👨🏻‍❤️‍💋‍👨🏿",
            "👨🏼‍❤️‍💋‍👨🏻",
            "👨🏼‍❤️‍💋‍👨🏼",
            "👨🏼‍❤️‍💋‍👨🏽",
            "👨🏼‍❤️‍💋‍👨🏾",
            "👨🏼‍❤️‍💋‍👨🏿",
            "👨🏽‍❤️‍💋‍👨🏻",
            "👨🏽‍❤️‍💋‍👨🏼",
            "👨🏽‍❤️‍💋‍👨🏽",
            "👨🏽‍❤️‍💋‍👨🏾",
            "👨🏽‍❤️‍💋‍👨🏿",
            "👨🏾‍❤️‍💋‍👨🏻",
            "👨🏾‍❤️‍💋‍👨🏼",
            "👨🏾‍❤️‍💋‍👨🏽",
            "👨🏾‍❤️‍💋‍👨🏾",
            "👨🏾‍❤️‍💋‍👨🏿",
            "👨🏿‍❤️‍💋‍👨🏻",
            "👨🏿‍❤️‍💋‍👨🏼",
            "👨🏿‍❤️‍💋‍👨🏽",
            "👨🏿‍❤️‍💋‍👨🏾",
            "👨🏿‍❤️‍💋‍👨🏿",
            "👩🏻‍❤️‍💋‍👨🏻",
            "👩🏻‍❤️‍💋‍👨🏼",
            "👩🏻‍❤️‍💋‍👨🏽",
            "👩🏻‍❤️‍💋‍👨🏾",
            "👩🏻‍❤️‍💋‍👨🏿",
            "👩🏻‍❤️‍💋‍👩🏻",
            "👩🏻‍❤️‍💋‍👩🏼",
            "👩🏻‍❤️‍💋‍👩🏽",
            "👩🏻‍❤️‍💋‍👩🏾",
            "👩🏻‍❤️‍💋‍👩🏿",
            "👩🏼‍❤️‍💋‍👨🏻",
            "👩🏼‍❤️‍💋‍👨🏼",
            "👩🏼‍❤️‍💋‍👨🏽",
            "👩🏼‍❤️‍💋‍👨🏾",
            "👩🏼‍❤️‍💋‍👨🏿",
            "👩🏼‍❤️‍💋‍👩🏻",
            "👩🏼‍❤️‍💋‍👩🏼",
            "👩🏼‍❤️‍💋‍👩🏽",
            "👩🏼‍❤️‍💋‍👩🏾",
            "👩🏼‍❤️‍💋‍👩🏿",
            "👩🏽‍❤️‍💋‍👨🏻",
            "👩🏽‍❤️‍💋‍👨🏼",
            "👩🏽‍❤️‍💋‍👨🏽",
            "👩🏽‍❤️‍💋‍👨🏾",
            "👩🏽‍❤️‍💋‍👨🏿",
            "👩🏽‍❤️‍💋‍👩🏻",
            "👩🏽‍❤️‍💋‍👩🏼",
            "👩🏽‍❤️‍💋‍👩🏽",
            "👩🏽‍❤️‍💋‍👩🏾",
            "👩🏽‍❤️‍💋‍👩🏿",
            "👩🏾‍❤️‍💋‍👨🏻",
            "👩🏾‍❤️‍💋‍👨🏼",
            "👩🏾‍❤️‍💋‍👨🏽",
            "👩🏾‍❤️‍💋‍👨🏾",
            "👩🏾‍❤️‍💋‍👨🏿",
            "👩🏾‍❤️‍💋‍👩🏻",
            "👩🏾‍❤️‍💋‍👩🏼",
            "👩🏾‍❤️‍💋‍👩🏽",
            "👩🏾‍❤️‍💋‍👩🏾",
            "👩🏾‍❤️‍💋‍👩🏿",
            "👩🏿‍❤️‍💋‍👨🏻",
            "👩🏿‍❤️‍💋‍👨🏼",
            "👩🏿‍❤️‍💋‍👨🏽",
            "👩🏿‍❤️‍💋‍👨🏾",
            "👩🏿‍❤️‍💋‍👨🏿",
            "👩🏿‍❤️‍💋‍👩🏻",
            "👩🏿‍❤️‍💋‍👩🏼",
            "👩🏿‍❤️‍💋‍👩🏽",
            "👩🏿‍❤️‍💋‍👩🏾",
            "👩🏿‍❤️‍💋‍👩🏿",
            "🧑🏻‍❤️‍💋‍🧑🏼",
            "🧑🏻‍❤️‍💋‍🧑🏽",
            "🧑🏻‍❤️‍💋‍🧑🏾",
            "🧑🏻‍❤️‍💋‍🧑🏿",
            "🧑🏼‍❤️‍💋‍🧑🏻",
            "🧑🏼‍❤️‍💋‍🧑🏽",
            "🧑🏼‍❤️‍💋‍🧑🏾",
            "🧑🏼‍❤️‍💋‍🧑🏿",
            "🧑🏽‍❤️‍💋‍🧑🏻",
            "🧑🏽‍❤️‍💋‍🧑🏼",
            "🧑🏽‍❤️‍💋‍🧑🏾",
            "🧑🏽‍❤️‍💋‍🧑🏿",
            "🧑🏾‍❤️‍💋‍🧑🏻",
            "🧑🏾‍❤️‍💋‍🧑🏼",
            "🧑🏾‍❤️‍💋‍🧑🏽",
            "🧑🏾‍❤️‍💋‍🧑🏿",
            "🧑🏿‍❤️‍💋‍🧑🏻",
            "🧑🏿‍❤️‍💋‍🧑🏼",
            "🧑🏿‍❤️‍💋‍🧑🏽",
            "🧑🏿‍❤️‍💋‍🧑🏾"
        ]  
        for (let index = 0; index < num; index++) {
            str = str + emojis[random( 0, emojis.length-1 )]
        }    
    } catch (error) { }
    return str
}
// log(randomEmojis(1))
// log(randomEmojis(1))
// log(randomEmojis(3))
// log(randomEmojis(5))
// log("🧑🏿‍❤️‍💋‍🧑🏾".length)


// setText(emojis.substr( 0,2 ))
// "2358"	"whatsapp"	"AA20360A85"	"15"	"1"	"1"				"5406199250"	"174.57.68.81"	
// "2359"	"whatsapp"	"AA2036069C"	"14"	"1"	"1"				"8382297259"	"98.198.138.9"	
// "2360"	"whatsapp"	"AA203609F6"	"15"	"1"	"1"				"6817318632"	"68.82.225.144"	

// "5406199250"	"http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=a8214a9e-d138-4237-a062-7df603777171"


// 9 Rect(0, 210 - 1080, 1794) com.android.contacts:id/contacts_list_container android.widget.FrameLayout -  - null - false - false - false - true
// 11 Rect(0, 210 - 1080, 1794) com.android.contacts:id/contact_list android.widget.FrameLayout -  - null - false - false - false - true
//      15 Rect(333, 268 - 996, 325) com.android.contacts:id/cliv_name_textview android.widget.TextView - deniz özkök - deniz özkök - false - false - false - true
    // let contact_list = id("cliv_name_textview").find()

// 10 Rect(891, 1605 - 1038, 1752) com.android.contacts:id/floating_action_button android.widget.ImageButton -  - Create new contact - false - false - true - true
// 14 Rect(179, 785 - 933, 927) null android.widget.EditText - First name - null - false - false - true - true
// 20:05:15.424/D:                               14 Rect(179, 927 - 933, 1019) null android.widget.EditText - Last name - null - false - false - true - true
// 14 Rect(179, 1074 - 933, 1019) null android.widget.EditText - Phone - null - false - false - true - false
// 14 Rect(179, 1363 - 933, 1019) null android.widget.EditText - Email - null - false - false - true - false

// setText( "🧐" )
// let a = []
// let temp_contact = a[random(0,-1)]
// log( temp_contact )

// log( textMatches(/\d+ contact./).findOne(1).text().match(/(\d+)/)[1] )

// log( parseInt( 13/10 ) )

// let contact_list = id("com.android.contacts:id/cliv_name_textview").find()
//                         log("通讯录: " + contact_list.length)
//                         for (let index = 0; index < contact_list.length; index++) {
//                             try {
//                                 let temp_view = contact_list[index];
//                                 let temp_phone = temp_view.text().replace(/[\r\n\s\(\)-]/g, "")    
//                                 log( temp_phone )                            
//                             } catch (error) { }
//                         }

// let str = "Call Mobile (249) 651-6688"
// log( str.replace(/[^\d]/g, "") )








	
// 13.44	12-Apr-21
// app.viewFile("/storage/emulated/0/test.apk");
// let test = shell("pm install -r /storage/emulated/0/test.apk")
// log(test)

// 13 Rect(105, 1558 - 349, 1794) com.whatsapp:id/instruction_text android.widget.TextView - Start a chat - null - false - false - false - true

// 13 Rect(208, 247 - 327, 298) com.whatsapp:id/tab android.widget.TextView - CHATS - null - false - true - false - true
// 8 Rect(858, 1551 - 1069, 1794) com.whatsapp:id/fab android.widget.ImageButton -  - New chat - false - false - true - true

// 10 Rect(189, 101 - 530, 172) null android.widget.TextView - Select contact - null - false - true - false - true
//  15 Rect(189, 442 - 442, 503) com.whatsapp:id/contactpicker_row_name android.widget.TextView - New contact - null - false - false - false - true
//  let list = contactpicker_row_photo


// app.openAppSetting("")
// app.startActivity("com.android.settings.Settings")


// log( idContains("icon").text("Contacts").findOne(1) )


// com.android.contacts






// app.launch("com.android.settings")
    // desc("在设置中搜索")
    // 11 Rect(189, 1645 - 273, 1702) android:id/title android.widget.TextView - 系统 - null - false - false - false - true
    // 14 Rect(189, 252 - 441, 309) android:id/title android.widget.TextView - 语言和输入法 - null - false - false - false - true
    // 14 Rect(189, 252 - 273, 309) android:id/title android.widget.TextView - 语言 - null - false - false - false - true
    // 12 Rect(0, 535 - 1080, 724) com.android.settings:id/add_language android.widget.Button - 添加语言 - null - false - false - true - true
    // 7 Rect(954, 73 - 1080, 199) android:id/locale_search_menu android.widget.TextView -  - 搜索 - false - false - true - true
    // 10 Rect(210, 88 - 1008, 183) android:id/search_src_text android.widget.EditText - 输入语言名称 - null - false - false - true - true
    // setText("English")
    // setText("English United States")
    // 12 Rect(0, 601 - 1080, 790) android:id/locale android.widget.TextView - English - 英语 - false - false - true - true
    // 12 Rect(0, 695 - 1080, 884) android:id/locale android.widget.TextView - United States - 美国 - false - false - true - true
    // 7 Rect(975, 73 - 1080, 199) null android.widget.ImageButton -  - 更多选项 - false - false - true - true
    // 5 Rect(597, 107 - 1028, 164) android:id/title android.widget.TextView - 移除 - null - false - false - false - true
    // 13 Rect(0, 231 - 1080, 535) null android.widget.RelativeLayout -  - 1, 中文（中国） - false - false - false - true
    // 20:32:07.075/D:                              \3
    // 20:32:07.079/D:                               14 Rect(42, 231 - 933, 420) com.android.settings:id/checkbox android.widget.CheckBox - 中文（中国） - 中文（中国） - true - false - true - true
    // 20:32:07.081/D:                               14 Rect(42, 346 - 933, 535) com.android.settings:id/l10nWarn android.widget.TextView - 某些应用可能无法以该语言显示 - null - false - false - false - true
    // 20:32:07.082/D:                               14 Rect(0, 532 - 1080, 535) null android.view.View -  - null - false - false - false - true
    // 20:32:07.084/D:                             13 Rect(0, 535 - 1080, 724) null android.widget.RelativeLayout -  - 2, 英语（美国） - false - false - false - true
    // 20:32:07.085/D:                              \2
    // 20:32:07.088/D:                               14 Rect(0, 721 - 1080, 724) null android.view.View -  - null - false - false - false - true
    // 20:32:07.090/D:                               14 Rect(42, 535 - 933, 724) com.android.settings:id/checkbox android.widget.CheckBox - English (United States) - 英语（美国） - false - false - true - true
    // 7 Rect(954, 73 - 1080, 199) null android.widget.TextView -  - 移除 - false - false - true - true
    // 6 Rect(810, 998 - 978, 1124) android:id/button1 android.widget.Button - 确定 - null - false - false - true - true
    // 6 Rect(189, 101 - 717, 172) null android.widget.TextView - Language preferences - null - false - false - false - true


    // let added_list = id("com.android.settings:id/label").find()
    // for (let index = 0; index < added_list.length; index++) {
    //     let btn = added_list[index]
    //     log(btn.text())
    //     if( new RegExp( "English" + ".*" + "United States" + ".*" ).test( btn.text() ) ){
    //         log("true")
    //         break
    //     }
    // }



// log( idContains("registration_cc").findOne(3000) )

// id	appName	type	username	password	email	emailPassword	phone	smsurl	extra	createTime	isRegistered	isProcess	fromw	city	country	countryCode	dialCode
// log( idContains("message").textContains( "no longer registered" ).findOne(1).text() )

// let t_thread = threads.start(function(){
//     events.observeToast();
//     events.onToast(function(toast){
//         log("监听到 Toast 事件: " + toast.getText() );
//         // errMsg = toast.getText().indexOf("帐号违反") != -1 ? toast.getText() : errMsg
//         t_thread.interrupt()
//     });
// })
// sleep(5000)
// t_thread.interrupt()
// let server_type = "socks5"
// log( server_type )
// let upper = server_type.toUpperCase()
// log(upper)
// // log( server_type.toUpperCase() )
// let btn = textStartsWith(server_type).findOne(1000) || textStartsWith( server_type.toUpperCase() ).findOne(1)
// btn.click()

// log( "1997-04-27T21:43:58.818Z".match( /(\d\d\d\d-\d\d-\d\d)/ )[0] )

// textStartsWith( /socks5/ig).findOne(1000).click()
// textStartsWith( new RegExp( "socks5", "i") ).findOne(1000).click()
// textStartsWith( "socks5".toUpperCase() ).findOne(1000).click()

// if( clickIfWidgetExists( id("image_button_layout").findOne(1) ) || clickIfWidgetClickable( id("android.widget.Button").text("Add Proxy").findOne(1) ) ){}
// log( className("android.widget.Button").text("Add Proxy").findOne(1) ) 

// log( new RegExp(".*"+ "192.168.91.128" + ":" + "24000" ).test( "Rule1: Through Proxy: 192.168.91.128:24000" ) )


// input( "123456" )
// setText( "123456" )

// log( id("verify_sms_code_input").findOne(1000) )     appName	username



//  eula_accept
// log( id("eula_accept").findOne(1000).click() );  sleep(1000)
// log( id("registration_cc").findOne(1000).setText("1") );  sleep(1000)
// log( id("registration_phone").findOne(1000).setText("5794635469") );  sleep(1000)
// log( id("registration_submit").findOne(1000).click() );  sleep(1000)

// let sms = "Your WhatsApp code: 412-230 You can also tap on this link to verify your phone: v.whatsapp.com/412230 Don't share this code with others"
// log( sms.match( /(\d\d\d\d\d\d)/ )[1] )

// log( idContains("button1").findOne(3000) )


function getNewAccount() {
    // http://192.168.91.3:8000/user/unregaccount
    // let url = "http://192.168.91.3:8000/user/unregaccount"
        // let data = {
        //     "appname"     :   "whatsapp",
        //     "folderid"    :   null,
        //     "deviceid"    :   null,
        //     "unique"      :   false,
        // }            
        // let res = http.postJson(url, data );

    let url = "http://192.168.91.3:8000/user/unregaccount"
    // let res = http.postMultipart(url, {
    //     "appname": "whatsapp",
    //     // "folderid"    :   null,
    //     // "deviceid"    :   null,
    //     // "unique"      :   false
    // });
    let res = http.postJson(url, {
        "appname": "whatsapp",
        "folderid"    :   null,
        "deviceid"    :   null,
        "unique"      :   false
    })



    res = res.body.json()           
    // log( JSON.stringify(res) )
    if( res.code == 200 ){
        // log( "    上报日志成功" )
        let data = JSON.parse( res.data )
        log( JSON.stringify(data) )
        return data
    }else{
        throw res
    }
}
// getNewAccount()

function getDataList(){
    
    let url = "http://192.168.91.3:8000/user/search?datatype=1&appname=whatsapp"
    let res = http.get(url)
    res = res.body.json()           
    log( JSON.stringify(res) )
    if( res.code == 200 ){
        // log( "    上报日志成功" )
        let data = JSON.parse( res.data )
        return data
        // log( typeof( data ) )
        // log( JSON.stringify(data) )
    }else{
        throw res
    }
}
// getDataList()
// let server_address = "192.168.91.128"
// let server_port = "24001"
// let server_type = "socks5"

//         log( new RegExp(/\d+\.\d+\.\d+\.\d+/).test( server_address ) )
//         log( new RegExp(/^\d+$/).test( server_port ) )
//         log( new RegExp(/HTTPS/i).test( server_type ) || new RegExp(/SOCKS5/i).test( server_type ) )

// let postern_config = ''

// try {
//     let url = "http://192.168.91.3:8000/user/registered"
//     let res = http.postJson(url, {"id":23,"appName":"whatsapp","type":1,"username":"whatsapp05072057","password":"1234","email":"whatsapp05072057@qq.com","emailPassword":"1234","phone":"5794597391","smsurl":"http://103.82.170.144/napi/view?token=89005316e36d4f1085020835e6c6fbf8","isRegistered":false,"isProcess":true,"isSucess":false,"extra":"nan","fromw":"nan","area":"1","deviceId":"1","folderId":"1","ip":"1","createTime":"2021-05-07T12:50:22.603Z"})
//     res = res.body.json()
//     // log( JSON.stringify(res) )
//     if( res.code == 200 ){
//         log("记录注册结果")
//         // return true
//     }else{
//         throw res
//     }        
// } catch (error) {
//     log("记录注册结果失败" + JSON.stringify(error) )
// }

// let a = {"id":17,"appName":"whatsapp","type":1,"username":"whatsapp05072051","password":"1234","email":"whatsapp05072051@qq.com","emailPassword":"1234","phone":"2496503542","smsurl":"http://103.82.170.144/napi/view?token=b28e6937d00b4c61a5bd58f30730243a","isRegistered":false,"isProcess":true,"extra":"nan","fromw":"nan","area":"1","createTime":"2021-05-07T12:50:22.572Z"}
// let b = {}
// for (let key in a) {
//     b[ key.toLowerCase() ] = a[key]
// }
// log( JSON.stringify(b) )

function getPosternConf() {
    let new_str = null
    let file_str = files.read( "/sdcard/postern.conf" )
    let t_str = null
    // let rep_str = "Proxy = " + server_type + "," + server_address  + "," + server_port + "," + username + "," + password
    let rep_str = "Proxy = " + "SOCKS5,192.168.91.128,12315"
    // let rep_str = "Proxy = " + "123456sdlfggkf"
    try {
        // t_str = file_str.match( "(Proxy =.*)" )[1]
        new_str = file_str.replace(/Proxy =.*/,rep_str)
        
    } catch (error) {
        log( JSON.stringify(error) )
    }
    // log(file_str.length )
    // log(file_str.match( "(Proxy = .*24000)" )[1] )
    // log(file_str.match( "(Proxy = .*[Rule])" )[1] )
    // log(file_str.match( "(Proxy = .*)" )[1] )
    // log(file_str.match( "(DOMAIN-KEYWORD.*)" )[1] )
    if( new RegExp( ".*"+rep_str+".*" ).test( new_str ) ){
        log("代理更新: " + rep_str)
    }else{
        log("代理更新失败")
    }
    files.write( "/sdcard/postern-new.conf", new_str )
    log( new_str )
}
// getPosternConf()

// let msg = '{"flag":true,"data":[],"message":"Your WhatsApp account is being registered on a new device Do not share this code with anyone Your WhatsApp code: 493-561"}'
// let msg = "Your WhatsApp code: 789-982 You can also tap on this link to verify your phone: v.whatsapp.com/789982 Don't share this code with others"
// let verifyCode = ""
// if( new RegExp(/.*\d\d\d-\d\d\d.*/ ).test( msg ) ){
//     verifyCode = msg.match( /(\d\d\d-\d\d\d)/ )[1].replace( "-", "" ).trim()
// }else if( new RegExp(/.*\d\d\d\d\d\d.*/ ).test( msg ) ){
//     verifyCode = msg.match( /(\d\d\d\d\d\d)/ )[1].trim()
// }
// log( verifyCode )
// let proxy_configs = {   
//     "task_list"  : [
//         {
//             "taskid" : "1001",
//             "proxy_url" : "Luminati"
//         }
//     ]

// }

// let proxys = [

// ]

// {
//     "proxy_from" : "Luminati",
//     "proxy_list" : [

//     ]
// }

// {"id":1391,"appName":"whatsapp","type":1,"username":"Michael Davis","password":null,"email":null,"emailPassword":null,"phone":"5794601668","smsurl":"http://103.82.170.144/napi/view?token=1e071d6db7a04fc5b8b5ab1c62f30f0b","isRegistered":true,"isProcess":true,"extra":"注册未完成","fromw":null,"dialCode":"1","city":null,"country":null,"countryCode":"US","createTime":"2021-05-12T01:54:25.917Z","isSuccess":false,"deviceId":"AA20360B69","folderId":"2","ip":"91.188.247.226"}

// "号码来源
// string
// 默认为 null"	"email来源
// string
// 默认为 null"	"代理配置
// string
// 默认为 null"	"代理来源
// string
// 默认为 null"
// 	phoneProvider	emailProvider	proxy	proxyProvider
// 1	globalSMS.io		192.168.91.128|24000|SOCKS5|username|password	Luminati
// 2	5sim.com	y1024.com	47.253.12.97|53685|SOCKS5|user|test123	Doveip

//  http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=d8a2661d-5ded-4e3d-87e4-18dd3d5b4ce7
// let v_code = null
//     try {
//         // v_code = newThread(function(){        
//             // let res = http.get("http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=d8a2661d-5ded-4e3d-87e4-18dd3d5b4ce7")
//             let res = http.get("http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=b308ce15-cd90-4d9b-8ddc-e3dfce247591")
//             // res = res.body.json()
//             // if( res.statusCode == 200 ){
//                 // 
//                 log(res.body.string() )
//                 // return res.ip
//             // }
//         // },null, 1000*10)
//     } catch (error) { log(JSON.stringify(error)) }

// let proxy_info = "aaa|dd"
// let proxy_data = {}
//         try {
//             let _info = proxy_info.split( "|" ) 
//             proxy_data.server   = _info[0]
//             proxy_data.port     = _info[1]
//             proxy_data.type     = _info[2]
//             proxy_data.username = _info[3]
//             proxy_data.password = _info[4]
//             if( !proxy_data.server || !proxy_data.port || !proxy_data.type ){
//                 // return false
//                 log("err")
//             }
//             log("done")
//         } catch (error) { 
//             log( error )
//         }


//         log( JSON.stringify(proxy_data) )

// log( "213.166.76.181 |1085|SOCKS5||".replace(/\s+/gm,'') )

// let proxyProvider = "doveip"
// let proxy_list = []
// //  http://192.168.91.3:8000/user/search?datatype=1&appName=proxy
// let res = http.get("http://192.168.91.3:8000/user/search?datatype=1&appName=proxy")
//             if( res.statusCode == 200 ){
//                 res = res.body.json()
//                 if(res.code == 200){
//                     let list = JSON.parse( res.data )
//                     if( list.length ){
//                         for (let index = 0; index < list.length; index++) {
//                             if( proxyProvider == list[index].fields.proxyProvider && !list[index].fields.isRegistered ){
//                                 proxy_list[proxy_list.length] = list[index].fields.proxy
//                             }
//                         }
//                     }
//                     // log( JSON.stringify(proxy_list) )
//                     log( proxy_list.length )
//                     log( proxy_list[random(0,proxy_list.length-1)] )
//                 }
//             }



// let str = "192.168.91.3:83"

// log( str.match( /(\d+\.\d+\.\d+\.\d+)\:\d+/)[1] )










































































































































































































































































