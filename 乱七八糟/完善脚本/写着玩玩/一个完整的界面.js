"ui";
context_DayOrNight = 1;
context_widthofTen = device.width / 10;

function setDayMode() {
    context_framebg = "#FAFAFA" //全局背景
    context_sBarColor = "#BDBDBD"; //通知栏颜色
    context_textColor = "#30251f" //文字颜色
    context_textBg = "#FAFAFA" //文字背景
    context_QxtextBg = "#FAFAFA" //权限设置中的背景
    context_FctextBg = "#FAFAFA" //悬浮窗权限中的背景
    context_SunMoon = "@drawable/ic_wb_sunny_black_48dp"; //☀️
    context_Logo = "https://www.pakutaso.com/shared/img/thumb/relaxmorigirl_TP_V.jpg" //黑色logo
}


function setNightMode() {
    context_framebg = "#000000"; //全局背景
    context_sBarColor = "#000000"; //通知栏颜色
    context_textColor = "#FFFFFF" //文字颜色
    context_textBg = "#000000" //文字背景
    context_QxtextBg = "#903F3F3F" //权限设置中的背景
    context_FctextBg = "#646464" //悬浮窗的背景
    context_SunMoon = "@drawable/ic_brightness_2_black_48dp" //🌙
    context_Logo = "https://www.pakutaso.com/shared/img/thumb/relaxmorigirl_TP_V.jpg" //白色Logo
}
mainUi();
function mainUi() {
    if (context_DayOrNight == 1) {
        setDayMode();
    } else {
        setNightMode();
    }
    ui.statusBarColor(context_sBarColor); //通知栏颜色
    ui.layout(
        <ScrollView>
            <frame id="main" background="{{context_framebg}}">  // 全局背景颜色
                <vertical align="center" paddingTop="5" margin="0">
                    <img src="{{context_Logo}}" h="200" margin="0" /> // 黑色logo
                    <text id="text" textStyle="bold" color="{{context_textColor}}" gravity="left" size="15" marginLeft="28" />   // 水平线性布局
                    <linear orientation="horizontal" align="center" margin="5">
                        <card layout_weight="50" h="50" marginRight="2" cardCornerRadius="25dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="10 0" h="auto">
                            </vertical>
                            <View bg="#FFEA3324" h="*" w="*" /> // 卡片颜色1
                            <View bg="#FF4395FB" h="*" w="0" /> // 卡片颜色2
                            <card layout_weight="50" h="40" margin="5 0 5 0" cardCornerRadius="20dp"
                                cardElevation="0dp" align="center" >
                                <vertical padding="10 0" h="auto">
                                </vertical>
                                <View bg="{{context_QxtextBg}}" h="*" w="*" />
                                <Switch id="autoService" text="无障碍服务" textColor="{{context_textColor}}" gravity="center" textStyle="bold" bg="{{context_QxtextBg}}" checked="{{auto.service != null}}" padding="5 5 5 5" textSize="15sp" />
                            </card>
                        </card>

                        <card layout_weight="50" h="50" marginLeft="2" cardCornerRadius="25dp"
                            cardElevation="0dp" gravity="center">
                            <vertical padding="10 0" h="auto">
                            </vertical>
                            <View id="TEST" bg="#FF007CF3" h="*" w="*" />   // 卡片颜色1
                            <View bg="#FF4395FB" h="*" w="0" /> // 卡片颜色2

                            <card layout_weight="50" h="40" margin="5 0 5 0" cardCornerRadius="20dp"
                                cardElevation="0dp" align="center">
                                <vertical padding="10 0" h="auto">
                                </vertical>
                                <View bg="{{context_FctextBg}}" h="*" w="*" />  // 悬浮窗权限中的卡片颜色
                                <text id="xfc_text" textStyle="bold" color="{{context_textColor}}" bg="{{context_FctextBg}}" gravity="center" size="15" h="auto" bg="?attr/selectableItemBackground" clickable="true" />
                            </card>
                        </card>
                    </linear>
                    <card h="1" margin="5 5" cardCornerRadius="1dp"
                        cardElevation="0dp" gravity="center_vertical">
                        <View bg="#FF832FFD" h="*" w="*" /> // 分割线颜色1
                        <View bg="#FF4395FB" h="*" marginRight="63" />  // 分割线颜色2
                        <View bg="#FF32F558" h="*" marginRight="126" /> // 分割线颜色3
                        <View bg="#FFFCD830" h="*" marginRight="189" /> // 分割线颜色4
                        <View bg="#FFFE8E2D" h="*" marginRight="252" /> // 分割线颜色5
                        <View bg="#FFFC3032" h="*" marginRight="315" /> // 分割线颜色6
                    </card>
                    <text id="NowScript" text="可运行脚本" textStyle="bold" color="{{context_textColor}}" gravity="left" size="15" marginLeft="28">
                    </text>

                    <linear orientation="horizontal" align="left" margin="0">    // 妹子轮播图
                        <card h="150" cardCornerRadius="10dp" cardElevation="2dp" align="left" margin="5 0">
                            <View bg="#ef7a82" h="*" w="*" />
                            <vertical padding="0 0" h="auto">
                                <linear orientation="horizontal" align="left" margin="0">
                                    <img src="https://www.pakutaso.com/shared/img/thumb/ishinagemorigirl2_TP_V.jpg" w="100" h="40" margin="10 20 0 5" />
                                    <vertical padding="0" h="auto">
                                        <text text="妹子轮播图" typeface="sans" textStyle="bold" color="#FFFFFF" gravity="center" size="20" margin="0 20 0 0" />
                                        <text text="v1.0.0" typeface="monospace" color="#FFFFFF" gravity="center" size="5" margin="10 0 0 0" />
                                    </vertical>
                                </linear>
                                <linear orientation="horizontal" align="center" margin="0" layout_gravity="left">
                                    <card w="240" h="50" cardCornerRadius="5dp" cardElevation="0dp" margin="20 20" >
                                        <View w="*" h="*" bg="#ecd1d8" />
                                        <text id="ScriptThi" text="妹子轮播图" typeface="sans" color="#FFFFFF" gravity="center" textSize="20" marginTop="0" bg="?attr/selectableItemBackground" clickable="true" />
                                    </card>
                                </linear>

                            </vertical>
                        </card>
                    </linear>
                    <linear orientation="horizontal" align="center" margin="5 15 5 15" >
                        <img src="{{context_SunMoon}}" id="changeColor" w="30" h="30" tint="{{context_textColor}}" bg="{{context_textBg}}" layout_weight="20" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        <text id="Privacy_Security" text="隐私与安全" color="#BDBDBD" bg="{{context_textBg}}" textSize="13sp" layout_weight="20" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        <text id="JoinQQGroup" text="获取联系" color="#BDBDBD" bg="{{context_textBg}}" textSize="13sp" layout_weight="20" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        <text id="TalktoDeveloper" text="反馈问题" color="#BDBDBD" bg="{{context_textBg}}" textSize="13sp" layout_weight="20" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        <text id="AboutApp" text="关于软件" color="#BDBDBD" bg="{{context_textBg}}" textSize="13sp" layout_weight="20" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                    </linear>
                    <vertical gravity="center" margin="0 0 0 0">
                        <View w="*" h="5" bg="#FC3032" />
                        <View w="*" h="5" bg="#FE8E2D" />
                        <View w="*" h="5" bg="#FCD830" />
                        <View w="*" h="5" bg="#32F558" />
                        <View w="*" h="5" bg="#4395FB" />
                        <View w="*" h="5" bg="#832FFD" />
                    </vertical>
                </vertical>
            </frame>
        </ScrollView>
    );

    ui.autoService.on("check", function (checked) {

        if (!checked && auto.service != null) {
            auto.service.disableSelf();
        } else if (auto.service == null) {
            if (checked) {
                engines.execScript("Auto", "auto.waitFor();\ntoastLog('无障碍权限已开启！')");
            }
        }
    });
    // 当用户回到本界面时，resume事件会被触发
    ui.main.on("resume", function () {
        // 此时根据无障碍服务的开启情况，同步开关的状态
        ui.autoService.checked = auto.service != null;
    });
    ui.ScriptThi.click(() => {   // 指向妹子轮播图模块
        engines.execScript("自动动态点赞", "runScriptThi();\n" + runScriptThi.toString());
    });

    function runScriptThi() {
        var DownJs = dialogs.build({
            title: "正在请求脚本中……",
            progress: {
                max: -1
            },
            cancelable: false
        }).show();
        var ScriptTwo_Url = "https://gitee.com/ran_yong/auto.js/raw/master/%E5%AE%8C%E5%96%84%E8%84%9A%E6%9C%AC/%E5%86%99%E7%9D%80%E7%8E%A9%E7%8E%A9/%E5%A6%B9%E5%AD%90%E8%BD%AE%E6%92%AD%E5%9B%BE%E6%96%B0api.js"; //第十三个脚本网址
        var res_script = http.get(ScriptTwo_Url, {
            headers: {
                'Accept-Language': 'en-us,en;q=0.5',
                'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
            }
        });
        if (res_script.statusCode == 200) {
            DownJs.dismiss();
            toastLog("脚本获取成功");
            var OrangeJs = res_script.body.string();
            engines.execScript("妹子轮播图", OrangeJs);
        } else {
            DownJs.dismiss();
            dialogs.alert("脚本获取失败！这可能是您的网络原因造成的，建议您检查网络后再重新运行软件吧\nHTTP状态码:" + res_script.statusMessage);
        }
    }

    ui.TalktoDeveloper.click(() => {  // 指向反馈问题
        engines.execScript("问题反馈", "\"ui\";TalkToDeveloper();" + TalkToDeveloper.toString());
    });
    function TalkToDeveloper() {   // 反馈问题
        ui.statusBarColor("#BDBDBD"); //通知栏颜色
        events.removeAllListeners();
        ui.layout(
            <frame w="*" h="*">
                <vertical align="left">
                    <linear orientation="horizontal" align="left" margin="0" >
                        {/* <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs-Logo.png" w="40" h="50" padding="8 0 0 0" />//应用logo
                        <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs_logo.png" marginLeft="10" w="105" h="50" />//黑色logo */}
                        <text text="问题反馈" textStyle="bold" textSize="20sp" textColor="#000000" padding="10 8 0 0" />
                        <View bg="#FFFFFF" h="*" w="*" />//打底卡片颜色1
                    </linear>
                    <progressbar id="progressX" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" layout_gravity="top" />
                    <ScrollView>
                        <webview id="webview" />
                    </ScrollView>

                </vertical>
                <fab id="Back" w="auto" h="auto" src="@drawable/ic_arrow_back_black_48dp"
                    margin="16" layout_gravity="bottom|right" tint="#ffffff" />
            </frame>
        );
        ui.webview.loadUrl("https://wj.qq.com/s2/8104693/5e7b");
        ui.Back.click(() => {   // 指向返回按钮
            clearInterval(JdtX);
            android.webkit.WebStorage.getInstance().deleteAllData(); //清空WebView的localStorage
            ui.finish();
        });
        var JdtX = setInterval(() => {
            var P = ui.webview.getProgress(); //获取进度
            var T = ui.webview.getTitle(); //获取网页标题
            if (P == 100) {
                ui.run(() => {
                    ui.progressX.setVisibility(8);
                });
            } else {
                ui.run(() => {
                    ui.progressX.setVisibility(0);
                    ui.progressX.progress = P;
                });
            };
        }, 100);
    }

    ui.AboutApp.click(() => {  // 指向关于软件模块
        AboutApp();
    });

    function AboutApp() {   // 关于软件
        events.removeAllListeners();
        ui.layout(
            <ScrollView>
                <frame w="*" h="*" background="{{context_framebg}}">
                    <vertical align="center">
                        <img src="https://www.pakutaso.com/shared/img/thumb/mitsuamigirl001_TP_V.jpg" marginTop="10" w="*" h="220" gravity="center" />//应用logo
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto" />
                            <View bg="#FFEA3324" h="*" w="*" />//卡片颜色1
                        </card>
                        <text text="软件及脚本开发者" color="{{context_textColor}}" textSize="10" textStyle="normal" marginLeft="5" />
                        <text text="冉 勇" layout_gravity="center" w="150" h="30" marginLeft="50" textSize="20" />
                        {/* <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/authorName.png" layout_gravity="center" w="150" h="30" />//作者名 */}
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto" />
                            <View bg="#FFFF711F" h="*" w="*" />//卡片颜色1
                        </card>
                        <text text="软件版本" color="{{context_textColor}}" textSize="10" textStyle="normal" marginLeft="5" />
                        <text id="AppVision" color="{{context_textColor}}" textSize="20" textStyle="normal" gravity="center" />
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto" />
                            <View bg="#FFFABB06" h="*" w="*" />//卡片颜色1
                        </card>
                        <text text="设备信息" color="{{context_textColor}}" textSize="10" textStyle="normal" marginLeft="5" />
                        <text id="DeviceInformation" color="{{context_textColor}}" textSize="15" textStyle="normal" gravity="center" />
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto" />
                            <View bg="#FF34A853" h="*" w="*" />//卡片颜色1
                        </card>
                        <text text="项目开源地址" color="{{context_textColor}}" textSize="10" textStyle="normal" marginLeft="5" />
                        <text id="OpenSource" autoLink="web" color="{{context_textColor}}" textSize="15" textStyle="normal" gravity="center" />
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto" />
                            <View bg="#FF4285F4" h="*" w="*" />//卡片颜色1
                        </card>
                        <text id="Ttip" color="{{context_textColor}}" textSize="15" textStyle="normal" marginTop="5" gravity="center" />
                        <card h="5" margin="0 10 0 10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto" />
                            <View bg="#FF9D41F9" h="*" w="*" />//卡片颜色1
                        </card>
                        <button id="TESTcode" text="代码测试台" color="#FFFFFF" bg="#90A4AE" textSize="15" textStyle="normal" margin="5 5 5 200" gravity="center" />
                    </vertical>
                    <fab id="Back" w="auto" h="auto" src="@drawable/ic_arrow_back_black_48dp"
                        margin="0 0 15 120" layout_gravity="bottom|right" tint="#ffffff" />
                </frame>
            </ScrollView>
        );
        ui.AppVision.text(app.versionName + "(" + app.versionCode + ")");
        ui.OpenSource.text("Gitee：https://gitee.com/ran_yong");
        ui.DeviceInformation.text("设备品牌/型号：" + device.brand + "(" + device.model + ")\n" + "安卓版本：" + device.release + device.baseOS + "\n修订版本号：" + device.buildId + "\n设备分辨率：" + device.height + "*" + device.width);
        ui.Ttip.text("此软件/脚本均为兴趣制作，仅供学习参考交流使用\n请勿将本软件/脚本用于任何商业用途");
        ui.Back.click(() => {
            engines.execScript(mainUi());
        });
        ui.TESTcode.click(() => {  // 指向代码测试台
            TESTCode();
        });
        function TESTCode() {   // 关于软件--代码测试台
            ui.statusBarColor("#000000"); //通知栏颜色
            ui.layout(
                <vertical bg="#000000">
                    {/* lines属性用来设置输入框的行数  */}
                    <text text="请输入要运行的代码" textColor="white" textSize="16sp" marginTop="16" />
                    <input id="x" color="#FFFFFF" lines="20" />
                    //水平线性布局
                    <linear orientation="horizontal" align="center" margin="5 0 5 0" weightSum="10">
                        <button id="ru" layout_weight="5" h="50" bg="#4CAF50" color="#FFFFFF" marginRight="5" text="运行" gravity="center" />
                        <button id="qk" layout_weight="5" h="50" bg="#FF5722" color="#FFFFFF" marginLeft="5" text="清空" gravity="center" />
                    </linear>
                    <button id="con" w="*" h="50" bg="#2196F3" color="#FFFFFF" margin="5 5 5 0" text="打开控制台" gravity="center" />
                    <text text="* 使用 Auto.js(4.0) 作为脚本引擎" color="#9e9e9e" textSize="10" marginTop="10" gravity="center" />
                    <fab id="Back" w="auto" h="auto" src="@drawable/ic_arrow_back_black_48dp"
                        margin="10" layout_gravity="bottom|right" tint="#ffffff" />
                </vertical>
            );
            ui.ru.on("click", () => {
                var text = ui.x.getText();
                if (text != "") {
                    engines.execScript("测试运行", text);
                } else {
                    toastLog("没有输入任何代码");
                }
            });
            ui.qk.on("click", () => {
                dialogs.confirm("您确定要清空吗？", "此操作将无法撤销").then(value => {
                    if (value == true) {
                        ui.x.text("");
                        toastLog("已清空");
                    }
                })
            });
            ui.con.on("click", () => {
                threads.start(function () {
                    console.show();
                });
            });
            ui.Back.click(() => {
                AboutApp();
            });
        }
    }


    ui.JoinQQGroup.click(() => {   // 指向加入QQ群模块
        engines.execScript("加入QQ群", "JoinQQGroup();\n" + JoinQQGroup.toString());
    });
    function JoinQQGroup() {   // 加入QQ群
        // var options = ["使用QQ加好友", "使用QQ加群"]
        var options = ["使用QQ加好友"]

        var i = dialogs.select("请选择", options);
        if (i >= 0) {
            toast("您选择的是" + options[i]);
        } else {
            toastLog("您取消了选择");
            exit();
        }
        if (i == 1) {
            app.startActivity({
                action: "android.intent.action.VIEW",
                packageName: "com.tencent.mobileqq",
                className: "com.tencent.mobileqq.activity.JumpActivity",
                data: app.parseUri("mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26jump_from%3Dwebapi%26k%3D7ck9DUB2l_1NNSkbCgG_5hEu8QF_t9Vb"),
                flags: ["grant_read_uri_permission", "grant_write_uri_permission"],
            });
        } else if (i == 0) {
            app.startActivity({
                action: "android.intent.action.VIEW",
                packageName: "com.tencent.mobileqq",
                className: "com.tencent.mobileqq.activity.JumpActivity",
                data: app.parseUri("https://qm.qq.com/cgi-bin/qm/qr?k=LeaxqF5_uvF1w1ZVK3eVv-A6JcDnBSAN&noverify=0"),   // 个人QQ名片
                flags: ["grant_read_uri_permission", "grant_write_uri_permission"],
            });
        }
    }

    ui.text.text("权限设置");
    ui.xfc_text.text("停止全部脚本");
    ui.Privacy_Security.click(() => {
    });

    ui.xfc_text.click(() => {
        engines.stopAllAndToast();
    });

    ui.changeColor.click(() => {   // 开启夜间模式
        if (context_DayOrNight == 1) {
            context_DayOrNight = 0;
        } else {
            context_DayOrNight = 1;
        }
        engines.execScript(events.removeAllListeners(), mainUi());
    });

    ui.Privacy_Security.click(() => {   // 隐私与安全
        engines.execScript("隐私与安全", "\"ui\";SP();" + SP.toString());
    });
    function SP() {
        events.removeAllListeners();
        ui.statusBarColor("#2196F3"); //通知栏颜色
        //Not pink色是#DFC8C6
        ui.layout(
            <frame background="#2196F3">//全局背景颜色
                <vertical align="left" paddingTop="5" margin="20 5 20 0">
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        {/* <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs-Logo.png" w="40" h="50" />//应用logo
                        <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs-logoWhite.png" marginLeft="10" w="105" h="50" />//黑色logo */}
                    </linear>
                    <ScrollView>
                        <linear orientation="vertical" align="left" margin="0" paddingTop="0">
                            <text text="隐私与安全（完善中……）" textSize="20" color="#FFFFFF" textStyle="bold" typeface="sans" paddingTop="5" />
                            <text text="文档日期:2020年1月4日" textSize="15" color="#FFFFFF" textStyle="bold" typeface="sans" />
                            <text id="Privacy" color="#F5F5F5" textStyle="bold" typeface="sans">
                            </text>
                            <text id="Q0" text="软件需要什么权限？" textSize="15" color="#FFFFFF" textStyle="bold" typeface="sans" paddingTop="5" />
                            <text id="A0" text="（↑请点击上方问题查看答案）" textSize="15" typeface="sans" color="#FFFFFF" />
                            <text id="Q1" text="为什么要收集信息？" textSize="15" color="#FFFFFF" textStyle="bold" typeface="sans" paddingTop="5" />
                            <text id="A1" text="（↑请点击上方问题查看答案）" textSize="15" typeface="sans" color="#FFFFFF" />
                            <text id="Q2" text="本软件会收集哪些信息？" textSize="15" color="#FFFFFF" textStyle="bold" typeface="sans" paddingTop="5" />
                            <text id="A2" text="（↑请点击上方问题查看答案）" textSize="15" typeface="sans" color="#FFFFFF" />
                        </linear>
                    </ScrollView>
                </vertical>
                <fab id="back" w="auto" h="auto" src="@drawable/ic_arrow_back_black_48dp"
                    margin="16" layout_gravity="bottom|right" tint="#ffffff" />
            </frame>
        );
        ui.Privacy.text("隐私安全事关重大！" +
            "\n因此，在开发本软件、脚本以及各项功能时，我都在考虑该如何合理收集信息以及保持信息安全");
        ui.Q0.click(() => { //软件需要什么权限?
            ui.A0.text("软件的正常运行需要“存储空间”权限！因为本软件/脚本内的设置项目都是以文件方式保存在您手机中的。" +
                "\n\n脚本的运行需要“无障碍权限”来执行各种自动操作，例如:点击，滑动，获取文字等。" +
                "\n\n“悬浮窗权限”是为了显示“停止运行脚本”等需要此权限才能使用的悬浮控件" +
                "\n\n“联网权限”是本软件最重要的权限，软件的所有源码存储在网络，您必须联网获取后才能正常运行。这样的设计是为了方便更新以及提升体验，因此您无需操作即可同步最新代码");
        });
        ui.back.click(() => {
            ui.finish();
        });
        ui.Q1.click(() => { //为什么要收集信息？
            ui.A1.text("待添加....");
        });
        ui.Q2.click(() => { //本软件会收集哪些信息?
            ui.A2.text("本软件将收集的信息分为两类，分别为“个人信息（可辨识您身份的信息，如：姓名、性别、电话、QQ、IP地址等）" +
                "”与“非个人信息（除个人信息之外的信息，例如：手机品牌、型号、分辨率、系统版本等）”，但无论是哪种信息本软件都是在必要前提下再进行收集并保存在您的设备中的，收集的所有信息都绝对不会在未经您允许的情况下传播给任何人" +
                "");
        });
    }
}