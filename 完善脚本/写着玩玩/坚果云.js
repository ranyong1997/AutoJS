/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-04-16 23:04:03
 * @LastEditTime: 2021-04-18 21:48:47
 */
LQ();
function LQ() {
    var url = "https://dav.jianguoyun.com/dav/"  // 坚果云--设置--第三方应用管理
    var username = "1311518086@qq.com";   // 坚果云账号
    var password = "ag2396wr7gbczy5s";   // 第三方应用管理应用密码（该密码自动生成）
    var str = username + ":" + password
    var code = base64(str);
    获取("我的坚果云/云代码/妹子轮播图.js")
    // 删除("我的坚果云/1.txt")


    function 获取(path) {
        //获取一个资源文件
        //var url = "Put/Writer.txt";
        var res = http.get(url + path, {
            headers: {
                "Authorization": "Basic " + code,
                "Content-Type": "text/plain;charset=UTF-8",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip",
                'Accept-Language': 'en-us,en;q=0.5',
                'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
            }
        });
        var DownJs = dialogs.build({
            title: "正在请求脚本中……",
            progress: {
                max: -1
            },
            cancelable: false
        }).show();
        if (res.statusCode == 200) {
            DownJs.dismiss();   // 对话框消失时会触发的事件
            toastLog("脚本获取成功");
            var RanJs = res.body.string();
            engines.execScript("脚本运行", RanJs);   // 运行脚本
        } else {
            DownJs.dismiss();
            dialogs.alert("脚本获取失败！这可能是您的网络原因造成的，建议您检查网络后再重新运行软件吧\nHTTP状态码:" + res.statusMessage);
        }
    }



    function 删除(path) {
        //删除一个文件
        //var path = "Put/Writer.txt";
        http.request(url + path, {
            method: "DELETE",
            headers: {
                "Authorization": "Basic " + code,
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/3.12.1"
            }
        });
        toastLog("脚本删除成功");
    }


    function 上传(path, str) {
        //上传文件
        //var path = "Put/Writer.txt";
        var res = http.request(url, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + code,
                "Content-Type": "text/plain;charset=UTF-8",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/3.12.1"
            },
            //body: "Javascript 面向对象编程—继承和封装"
            body: str
        });
        log(res.body.string());
    }


    function base64(str) {
        return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
    }
}

