/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-04-17 10:12:24
 * @LastEditTime: 2021-12-11 10:20:45
 *
"ui";
context_DayOrNight = 1;
context_widthofTen = device.width / 10;
page = random(0, 670);
num = 1;
word = "福利";
boo = false;
var c = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518200624346&di=41443ef9f076d78712fb61e6c800f004&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fblog%2F201308%2F08%2F20130808194552_5ktHs.thumb.700_0.jpeg"];

function setDayMode() {
    context_framebg = "#FFFFFF" //全局背景
    context_sBarColor = "#BDBDBD"; //通知栏颜色
    context_textColor = "#000000" //文字颜色
    context_textBg = "#FFFFFF" //文字背景
    context_QxtextBg = "#FFFFFF" //权限设置中的背景
    context_FctextBg = "#FFFFFF" //悬浮窗权限中的背景
    context_SunMoon = "@drawable/ic_wb_sunny_black_48dp"; //☀️
    context_Logo = "https://www.pakutaso.com/shared/img/thumb/ishinagemorigirl_TP_V.jpg" //黑色logo
}
importClass(android.animation.ObjectAnimator);
ui.emitter.on("resume", function () {
    try {
        ui.autoService.checked = auto.service != null;
    } catch (e) { }
});
mainUi();
function mainUi() {
    setDayMode();
    ui.statusBarColor(context_sBarColor);
    ui.layout(
        <ScrollView>
            <frame id="main" background="{{context_framebg}}">
                <vertical align="center" >
                    <img src="{{context_Logo}}" h="200" w="*"/> //logo
                    {/* 停止全部脚本 */}
                    <linear orientation="horizontal" align="center">
                        <card layout_weight="50" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center">
                            <vertical padding="10 0"/>
                            <View id="TEST" bg="#801dae" h="*" w="*" />//卡片颜色1
                            <View bg="#FF832FFD" h="*" w="0" />//卡片颜色2
                            <card id="stop" layout_weight="50" h="40" margin="5 0 5 0" cardCornerRadius="20dp"
                                cardElevation="0dp" align="center" foreground="?attr/selectableItemBackground" clickable="true">
                                <vertical padding="10 0" h="auto" />
                                <View bg="{{context_FctextBg}}" h="*" w="*" />//悬浮窗权限中的卡片颜色
                            <text textStyle="bold" text="▶ 播放 | ⏹ 停止" color="{{context_textColor}}" bg="{{context_FctextBg}}" gravity="center" size="15" h="auto" />
                            </card>
                        </card>
                        <card layout_weight="50" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center">
                            <vertical padding="10 0" h="auto" />
                            <View id="TEST" bg="#FF007CF3" h="*" w="*" />//卡片颜色1
                            <View bg="#FF4395FB" h="*" w="0" />//卡片颜色2
                            <card id="xfc_text" layout_weight="50" h="40" margin="5 0 5 0" cardCornerRadius="20dp"
                                cardElevation="0dp" align="center" foreground="?attr/selectableItemBackground" clickable="true">
                                <vertical padding="10 0" h="auto" />
                                <View bg="{{context_FctextBg}}" h="*" w="*" />//悬浮窗权限中的卡片颜色
                            <text textStyle="bold" text="停止脚本" color="{{context_textColor}}" bg="{{context_FctextBg}}" gravity="center" size="15" h="auto" />
                            </card>
                        </card>
                    </linear>
                    {/* 分割线 */}
                    <card h="1" margin="5" cardCornerRadius="1dp"
                        cardElevation="0dp" gravity="center_vertical">
                        <View bg="#FF832FFD" h="*" w="*" />//分割线颜色1
                        <View bg="#FF4395FB" h="*" marginRight="63" />//分割线颜色2
                        <View bg="#FF32F558" h="*" marginRight="126" />//分割线颜色3
                        <View bg="#FFFCD830" h="*" marginRight="189" />//分割线颜色4
                        <View bg="#FFFE8E2D" h="*" marginRight="252" />//分割线颜色5
                        <View bg="#FFFC3032" h="*" marginRight="315" />//分割线颜色6
                    </card>
                    <vertical align="top" margin="0">
                        <webview id="web" h="500" />
                    </vertical>
                </vertical>
            </frame>
        </ScrollView>
    )

    // 停止脚本
    ui.xfc_text.click(() => {
        engines.stopAllAndToast();
    });


    {/* 妹子轮播图 */ }
    ui.web.loadUrl(c);
    if (boo) {
        boo = false;
        tt.interrupt()
    }
    else {
        boo = true;
        tt = threads.start(function () {
            while (boo) {
                sleep(1000);
                page = random(0, 670)
                a = threads.start(getimg);   // 展示图片
                a.join();
                log(page);
                ui.run(function () {
                    ui.web.loadUrl(c[0]);
                });
            }
        });
    }
    ui.stop.click(() => {
        if (boo) {
            boo = false;
            tt.interrupt()
        }
        else {
            boo = true;
            tt = threads.start(function () {
                while (boo) {
                    sleep(1000);
                    page = random(0, 670)
                    a = threads.start(getimg);   // 展示图片
                    a.join();
                    log(page);
                    ui.run(function () {
                        ui.web.loadUrl(c[0]);
                    });
                }
            });
        }
    })
}

function getimg() {
    var url = "http://gank.io/api/data/" + word + "/" + num + "/" + page;
    a = http.get(url).body.json();
    if (a.results[0] == null) {
        c[0] = null;
        return null;
    }
    for (i in a.results) {
        c[i] = a.results[i].url;
    }
    return c;
}