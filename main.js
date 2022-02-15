/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-01-21 20:22:07
 * @LastEditTime: 2022-02-15 20:08:39
 * @description: 
 * @param: 
 * @return: 
 */
var commonFun = require("./Demo/lib/common")
function init() {
    // 设置日志文件
    try {
        // 初始化日志文件 存放在 /sdcard/CloudMobile/ 中
        let log_file = "/sdcard/autojs/" + require("./project.json").name + ".log"; // 日志文件
        files.createWithDirs(log_file);
        console.setGlobalLogConfig({
            "file": log_file,
            "maxFileSize": 1024 * 1024 //  1M 
        });
        log("初始化日志:" + log_file)
    } catch (error) {
        log("日志初始化异常:" + JSON.stringify(error))
    }
    try {
        log("初始化 main文件  版本号:1.2.4  作者:ranyong")
        home()
        sleep(1000)
    } catch (error) {
        log("main error:" + error)
    }
    try {
        toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
        auto.waitFor();
        toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");
    } catch (error) {
        throw error
    }
    try {
        toastLog("当前设备宽度：" + device.width + "\n" + "当前设备高度：" + device.height + "\n" + "唤醒屏幕:On", device.wakeUp())
        commonFun.StopAll()
        commonFun.limit()
    } catch (error) {
        throw error
    }
}
init()
require("./Demo/script/demo.js");
