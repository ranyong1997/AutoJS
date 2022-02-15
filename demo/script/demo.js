/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-01-20 20:30:35
 * @LastEditTime: 2022-02-15 20:13:59
 * @description: 
 * @param: 
 * @return: 
 */

const { randomSleep } = require("../lib/common")
var commonFun = require("../lib/common")
var FIND_WIDGET_TIMEOUT = 1000
commonFun.showLog("开始执行脚本")
launchApp("TikTok")
clickdemo()
function clickdemo() {
    sleep(3000)
    log("ddddd")
    var click_profile = text("Profile").findOne(FIND_WIDGET_TIMEOUT)
    if (click_profile != null) {
        commonFun.swipeUpSlowly()
        randomSleep()
        commonFun.showLog("点击Profile")
        randomSleep()
        commonFun.clickWidget(click_profile)
    }
}
