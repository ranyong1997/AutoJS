/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-01-21 20:22:07
 * @LastEditTime: 2022-02-15 19:28:00
 * @description: 
 * @param: 
 * @return: 
 */
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
        log("初始化 main文件  版本号:1.2.3  作者:ranyong")
        home()
        sleep(1000)
    } catch (error) {
        log("main error:" + error)
    }
}
init()
require("./Demo/script/demo.js");
