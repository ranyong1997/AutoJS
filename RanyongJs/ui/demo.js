/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-01-20 20:30:35
 * @LastEditTime: 2022-02-20 20:46:28
 * @description: 
 * @param: 
 * @return: 
 */

const { randomSleep } = require("../lib/common")
var commonFun = require("../lib/common")
var FIND_WIDGET_TIMEOUT = 1000

// commonFun.showLog("开始执行脚本",null)
// commonFun.showLog(null,"开始执行脚本1")
commonFun.showLog("当前设备分辨率：" + device.width + "x" + device.height)
commonFun.showLog("唤醒屏幕:On", device.wakeUp())

launchApp("BOSS直聘")




