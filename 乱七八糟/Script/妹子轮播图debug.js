/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-04-17 10:12:24
 * @LastEditTime: 2021-04-20 17:20:44
 */
"ui";
context_DayOrNight = 1;
context_widthofTen = device.width / 10;
num = 10000;
page = 1;
boo = false;
var c = ["https://gank.io/images/0f536c69ada247429b8a9e38d3dba8bb"];

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

function setNightMode() {
    context_framebg = "#000000"; //全局背景
    context_sBarColor = "#000000"; //通知栏颜色
    context_textColor = "#FFFFFF" //文字颜色
    context_textBg = "#000000" //文字背景
    context_QxtextBg = "#903F3F3F" //权限设置中的背景
    context_FctextBg = "#646464" //悬浮窗的背景
    context_SunMoon = "@drawable/ic_brightness_2_black_48dp" //🌙
    context_Logo = "https://www.pakutaso.com/shared/img/thumb/ishinagemorigirl_TP_V.jpg" //白色Logo
}
ui.emitter.on("resume", function () {
    try {
        ui.autoService.checked = auto.service != null;
    } catch (e) { }
});
mainUi();
function mainUi() {
    if (context_DayOrNight == 1) {
        setDayMode();
    } else {
        setNightMode();
    }
    ui.statusBarColor(context_sBarColor);
    ui.layout(
        <ScrollView>
            <frame id="main" background="{{context_framebg}}">
                <vertical align="center">
                    <img src="{{context_Logo}}" h="150" margin="5" /> //logo
                    {/* 停止全部脚本 */}
                    <linear orientation="horizontal" align="center" >
                        <card layout_weight="50" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center">
                            <vertical padding="10 0" h="auto" />
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
                    <card h="1" margin="5 5" cardCornerRadius="1dp"
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
                a = threads.start(getimg);   // 展示图片
                a.join();
                ui.run(function () {
                    ui.web.loadUrl(c[random(0, i)]);
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
                    // page = random(0, 10)
                    a = threads.start(getimg);   // 展示图片
                    a.join();
                    log(page);
                    ui.run(function () {
                        ui.web.loadUrl(c[random(0, i)]);
                    });
                }
            });
        }
    })
}

function getimg() {
    var url = "https://gank.io/api/v2/data/category/Girl/type/Girl/page/" + page + "/count/" + num;
    a = http.get(url).body.json();
    if (a.data[0] == null) {
        c[0] = null;
        return null;
    }
    for (i in a.data) {
        c[i] = a.data[i].url;
    }
    return c
}