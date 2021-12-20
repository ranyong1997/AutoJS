/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-03-25 22:57:09
 * @LastEditTime: 2021-03-28 11:02:09
 */


bulid_catalog();

for (let i = 0; i < 10; i++) {
    var wait = random(2000, 4000);
    sleep(wait);
    swipe(device.width / 2, device.height / 2, device.width / 2, 0, 1000);
    var 模板名称 = id("template_title").findOne().getText();
    var 达人ID = id("user_name").findOne().getText();

    log("达人id:" + 达人ID + " " + "模板名称:" + 模板名称);

    files.append("/sdcard/即录模板/已预览模板.txt", "达人id:" + 达人ID + " " + "模板名称:" + 模板名称 + "\n");
}

function bulid_catalog() {   // 创建文件、文件夹
    files.createWithDirs("/sdcard/即录模板/已预览模板.txt");
}




