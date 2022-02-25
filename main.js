/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-01-21 20:22:07
 * @LastEditTime: 2022-02-24 23:49:31
 * @description: 
 * @param: 
 * @return: 
 */
var commonFun = require("./RanyongJs/lib/common")
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
        log("初始化 main 文件  版本号:1.2.4  作者:ranyong")
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
        log("当前设备分辨率：" + device.width + "x" + device.height)
        commonFun.volume_Stop()
        commonFun.StopAll()
        commonFun.limit()
    } catch (error) {
        throw error
    }
}
init()
require("./RanyongJs/ui/demo.js");
