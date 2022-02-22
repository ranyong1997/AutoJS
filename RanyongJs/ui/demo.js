/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-01-20 20:30:35
 * @LastEditTime: 2022-02-23 00:13:03
 * @description: 
 * @param: 
 * @return: 
 */

const { randomSleep } = require("../lib/common")
var commonFun = require("../lib/common")
var FIND_WIDGET_TIMEOUT = 1000

const taskDemo = {}
taskDemo.init = function () {
    commonFun.showLog("init tit_register_v22_4_5")
    commonFun.showLog("当前设备分辨率：" + device.width + "x" + device.height)
    commonFun.showLog("唤醒屏幕:On", device.wakeUp())
}
taskDemo.init()

new function () {
    let timestamp = new Date().getTime()
    try {
        commonFun.showLog("当前网络状态为:" + MyNetworkInformation())
    } catch (e) {
        throw "请检查您当前的网络连接可用性，连接可用网络并授予本软件联网权限后再尝试重新运行。" + (e)
    }
    
}







function MyNetworkInformation() {
    importClass(android.net.ConnectivityManager)
    mConnectivityManager = context.getSystemService(context.CONNECTIVITY_SERVICE)
    netInfo = mConnectivityManager.getActiveNetworkInfo()
    if (netInfo != null && netInfo.isAvailable()) {
        name = netInfo.getTypeName()
        if (netInfo.getType() == ConnectivityManager.TYPE_WIFI) {
            return "WIFI网络"
        } else if (netInfo.getType() == ConnectivityManager.TYPE_ETHERNET) {
            return "有线网络"
        } else if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE) {
            return "移动网络"
        }
    } else {
        return "网络断开"
    }
}



