// >>> 主函数
function init(){
    try {
        files.createWithDirs("/storage/emulated/obb/apks/");
        files.createWithDirs("/storage/emulated/obb/logs/");
    } catch (error) { }
    // 设置日志文件
    try {
        let log_file = "/storage/emulated/obb/logs/" + require("project.json").name + ".log"; // 日志文件
        files.createWithDirs(log_file);
        console.setGlobalLogConfig({
            "file": log_file,
            "maxFileSize": 1024 * 1024 * 10 //  1M 
        });    
        log( "初始化日志：" + log_file )
    } catch (error) {
        log( "日志初始化异常：" + JSON.stringify(error) )
    }
    try {
        log("")
        log("")
        log("")
        log("")    
        log("init main")    
        //  清除顶部蒙版(手机Bug)
        // swipe( 200, 1, 200, 500, 600 )
        // sleep(2000)
        // back()
        sleep(1000)
        shell( "cmd statusbar expand-notifications" )
        sleep(3000)
        shell( "cmd statusbar collapse" )
        sleep(1000)
        home()
        sleep(1000)
    } catch (error) { }

    home()
    sleep(2000)
}
init()

//  注册业务
// var mainTask = require("task/taskRegister.js");
// mainTask.runTask()

//  养号业务
var mainTask = require("task/taskKeeping.js");
mainTask.runTask()