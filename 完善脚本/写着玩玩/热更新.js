/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-04-19 09:33:25
 * @LastEditTime: 2021-04-20 18:52:17
 */

runScriptThi();
function runScriptThi() {
    var DownJs = dialogs.build({
        title: "正在请求脚本中……",
        progress: {
            max: -1
        },
        cancelable: false
    }).show();
    var ScriptTwo_Url = "https://gitee.com/ran_yong/auto.js/raw/master/%E5%AE%8C%E5%96%84%E8%84%9A%E6%9C%AC/%E5%86%99%E7%9D%80%E7%8E%A9%E7%8E%A9/%E5%A6%B9%E5%AD%90%E8%BD%AE%E6%92%AD%E5%9B%BE%E6%96%B0api.js"; //第十三个脚本网址
    var res_script = http.get(ScriptTwo_Url, {
        headers: {
            'Accept-Language': 'en-us,en;q=0.5',
            'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
        }
    });
    if (res_script.statusCode == 200) {
        DownJs.dismiss();
        toastLog("脚本获取成功");
        var OrangeJs = res_script.body.string();
        engines.execScript("妹子轮播图", OrangeJs);
    } else {
        DownJs.dismiss();
        dialogs.alert("脚本获取失败！这可能是您的网络原因造成的，建议您检查网络后再重新运行软件吧\nHTTP状态码:" + res_script.statusMessage);
    }
}