/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-03-13 18:21:20
 * @LastEditTime: 2021-03-16 20:02:44
*/

launchApp("Soul");
text("星球").waitFor();
threads.start(function () {
    sleep(1000);
    var beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)
    if (beginBtn) {
        beginBtn.click();
    }
});

requestScreenCapture();
sleep(1000);


var 小图片1 = images.read('/sdcard/1.png');
var 屏幕截图 = ""

while (true) {
    屏幕截图 = captureScreen()
    获取小姐姐()
    var random1 = random(1000, 2500)
    swipe(293, 2069, 293, 0, random1);
}
function 获取小姐姐() {
    var 小姐姐们 = id("iv_like").find();
    小姐姐们.forEach(一个小姐姐 => {
        let location = 一个小姐姐.bounds();
        if (location.top < 2100) {
            let 是否找到 = images.findImageInRegion(屏幕截图, 小图片1, location.left, location.top, 72, 72);
            if (!是否找到) {
                一个小姐姐.click();
            }
        }
        var randoms = random(800, 1500)
        sleep(randoms);
    });
}

