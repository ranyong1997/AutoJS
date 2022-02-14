/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-03-25 22:57:09
 * @LastEditTime: 2021-04-16 17:31:16
 */

log("开启“悬浮日志”");

function toastLog(message) {
    log(message);
    var myDate = new Date();
    ui.run(() => {
        w.WZ.setText(myDate.getHours() + "时" + myDate.getMinutes() + "分" + myDate.getSeconds() + " 秒：" + message + "\n" + w.WZ.getText());
        return true;
    });

}

function errorLog(message) {
    log(message);
    var myDate = new Date();
    ui.run(() => {
        h.WX.setText(myDate.getHours() + "时" + myDate.getMinutes() + "分" + myDate.getSeconds() + " 秒：" + message + "\n" + h.WX.getText());
        return true;
    });
}


var w = floaty.rawWindow(    // 指定悬浮窗的布局，创建并显示一个原始悬浮窗
    <card bg="#80000000">
        <vertical align="center">
            {/* <img src="https://cdn.pixabay.com/photo/2021/04/06/14/46/city-6156596_960_720.jpg" h="50" margin="0 0 0 0" />//黑色logo */}
            <text text="─ 当前脚本运行日志 ─" textSize="15" color="#FFFFFF" textStyle="normal" gravity="center" margin="5 5 5 5" />
            <text id="WZ" textSize="14" color="#FCEFE7" marginLeft="15" />
            <text id="WX" textSize="14" color="#ffa401" marginLeft="15" />
        </vertical>
    </card>
);


var h = floaty.rawWindow(    // 指定悬浮窗的布局，创建并显示一个原始悬浮窗
    <card bg="#80000000">
        <vertical align="center">
            {/* <img src="https://cdn.pixabay.com/photo/2021/04/06/14/46/city-6156596_960_720.jpg" h="50" margin="0 0 0 0" />//黑色logo */}
            <text text="─ 当前脚本运行日志 ─" textSize="15" color="#FFFFFF" textStyle="normal" gravity="center" margin="5 5 5 5" />
            <text id="WX" textSize="14" color="#ffa401" marginLeft="15" />
        </vertical>
    </card>
);

w.setSize(device.width, device.height);   // 显示大小
w.setTouchable(false);   // 是否可触碰
w.setPosition(0, device.height - 800);   // 设置控制台的位置

h.setSize(device.width, device.height-1800);   // 显示大小
h.setTouchable(false);   // 是否可触碰
// h.setPosition(0, device.height - 800);   // 设置控制台的位置


while (true) {
    for (let i = 1; i > 0; i++) {
        toastLog("这是" + i + "行日志");
        sleep(1000);
        if (i % 3 == 0) {
            errorLog("这是" + (i + 1) + "行错误日志");
        }
    }
}