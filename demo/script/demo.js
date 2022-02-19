/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-01-20 20:30:35
 * @LastEditTime: 2022-02-19 13:28:42
 * @description: 
 * @param: 
 * @return: 
 */

// const { randomSleep } = require("../lib/common")
// var commonFun = require("../lib/common")
// var FIND_WIDGET_TIMEOUT = 1000

// // commonFun.showLog("开始执行脚本",null)
// // commonFun.showLog(null,"开始执行脚本1")
// commonFun.showLog("当前设备分辨率：" + device.width + "x" + device.height)
// commonFun.showLog("唤醒屏幕:On", device.wakeUp())

// launchApp("TikTok")
// clickdemo()
// function clickdemo() {
//     sleep(3000)
//     var click_profile = text("Profile").findOne(FIND_WIDGET_TIMEOUT)
//     if (click_profile != null) {
//         commonFun.swipeUpSlowly()
//         randomSleep()
//         // commonFun.showLog("点击Profile")
//         randomSleep()
//         commonFun.clickWidget(click_profile)
//     }
// }



// md5(a.toString()) == "109e1be70ecf784109576e7a5df1750a"
log(md5("ranyong"))

function md5(string) {
    return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5")
        .digest(java.lang.String(string).getBytes())).toString(4 * 4);
}