/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-03-19 18:39:22
 * @LastEditTime: 2021-04-06 09:46:08
 */


device.wakeUp()
sleep(1000);
swipe(device.width / 2, device.height / 2, device.width / 2, 0, 500)
sleep(2000);
toast("已解锁");
device.keepScreenOn()
log("开启常亮")


show();
toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
auto.waitFor();
toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");

var appName = "com.isoftstone.client.ipsa"
toastLog("正在打开ipsa");
launch(appName);
sleep(3000);
text("员工查询").waitFor();

swipe(device.width / 2, device.height / 2, device.width / 2, 0, 1000);

toastLog("点击考勤打卡");
var 考勤打卡 = text("考勤打卡").find();
考勤打卡.click();

text("切换").waitFor();
toastLog("判断地理位置是否在范围内");
var 地理位置 = id("tv_name").findOne().getText();
if (地理位置 == "华润前海中心(建设中)") {
    console.warn("符合当前定位!");
    var 打卡下班 = id("just_sign").findOne();
    打卡下班.click();
} else {
    console.warn("你的位置不对哦!");
}
sleep(3000);
console.info("3秒后退出程序");
no_show();
device.keepScreenDim()
log("关闭常亮")



function show() { // 控制台输出
    console.show();
    console.setPosition(200, 100);
};

function no_show() { // 隐藏控制台P
    back();
    sleep(1000);
    back();
    sleep(1000);
    console.hide()
};