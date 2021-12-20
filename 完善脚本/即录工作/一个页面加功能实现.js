"ui";
context_DayOrNight = 1;
context_widthofTen = device.width / 10;

function setDayMode() {
    context_framebg = "#FAFAFA" //全局背景
    context_sBarColor = "#BDBDBD"; //通知栏颜色
    context_textColor = "#000000" //文字颜色
    context_textBg = "#FAFAFA" //文字背景
    context_QxtextBg = "#FAFAFA" //权限设置中的背景
    context_FctextBg = "#FAFAFA" //悬浮窗权限中的背景
    context_SunMoon = "@drawable/ic_wb_sunny_black_48dp"; //☀️
    context_Logo = "https://gitee.com/ran_yong/auto.js/blob/master/Log/ranyongJS-logoWhite.png" //黑色logo
}


function setNightMode() {
    context_framebg = "#000000"; //全局背景
    context_sBarColor = "#000000"; //通知栏颜色
    context_textColor = "#FFFFFF" //文字颜色
    context_textBg = "#000000" //文字背景
    context_QxtextBg = "#903F3F3F" //权限设置中的背景
    context_FctextBg = "#646464" //悬浮窗的背景
    context_SunMoon = "@drawable/ic_brightness_2_black_48dp" //🌙
    context_Logo = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3497626341,1295092338&fm=26&gp=0.jpg" //白色Logo
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
                    <img src="{{context_Logo}}" h="40" margin="0 0 0 10" /> // 黑色logo
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

                    <linear orientation="horizontal" align="left" margin="0">    // 即录
                        <card h="150" w="300" cardCornerRadius="10dp" cardElevation="2dp" align="left" margin="5 5 5 5">
                            <View bg="#000000" h="*" w="*" />
                            <vertical padding="0 0" h="auto">
                                <linear orientation="horizontal" align="left" margin="0">
                                    <img src="https://oss-xpc0.xpccdn.com/Upload/user/2018/09/155b9c484eaeaa3.jpeg@290w_290h_1e_1c?id=734494483" w="40" h="40" margin="20 20 0 0" />
                                    <vertical padding="0 0" h="auto">
                                        <text text="即录" typeface="sans" textStyle="bold" color="#FFFFFF" gravity="center" size="20" margin="10 20 0 0" />
                                        <text text="推荐1.31+版本" typeface="monospace" color="#FFFFFF" gravity="center" size="5" margin="10 0 0 0" />
                                    </vertical>
                                </linear>
                                <linear orientation="horizontal" align="center" margin="0" layout_gravity="left">
                                    <card w="240" h="50" cardCornerRadius="5dp" cardElevation="0dp" margin="20 20 0 20">
                                        <View bg="#75878A" />
                                        <spinner id="soloop" entries="模板纯预览|模板扫描|模板下载耗时" textColor="#FFFFFF" align="center" marginLeft="10" textSize="20" layout_gravity="center" spinnerMode="dialog" />
                                    </card>
                                    <img src="@drawable/ic_play_arrow_black_48dp" id="R_soloop" w="*" h="30" tint="#725e82" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" circle="true" />
                                </linear>
                            </vertical>
                        </card>
                    </linear>
                    <linear orientation="horizontal" align="center" margin="5 15 5 15" >
                        <img src="{{context_SunMoon}}" id="changeColor" w="30" h="30" tint="{{context_textColor}}" bg="{{context_textBg}}" layout_weight="20" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        <text id="Privacy_Security" text="隐私与安全" color="#BDBDBD" bg="{{context_textBg}}" textSize="13sp" layout_weight="20" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        {/* <text id="JoinQQGroup" text="加入QQ群" color="#BDBDBD" bg="{{context_textBg}}" textSize="13sp" layout_weight="20" layout_gravity="center" bg="?attr/selectableItemBackground" clickable="true" /> */}
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
        /* // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
         if (auto.service == null) {
             app.startActivity({
                 action: "android.settings.ACCESSIBILITY_SETTINGS"
             });
         }*/
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

    ui.R_soloop.click(() => {
        //模板纯预览|模板扫描|模板下载耗时
        if (ui.soloop.getSelectedItemPosition() == 0) {
            engines.execScript("模板纯预览", "runScriptOne();\n" + runScriptOne.toString());
        } else if (ui.soloop.getSelectedItemPosition() == 1) {
            engines.execScript("模板扫描", "runScriptTwo();\n" + runScriptTwo.toString());
        } else if (ui.soloop.getSelectedItemPosition() == 2) {
            engines.execScript("模板下载耗时", "runScriptThree();\n" + runScriptThree.toString());
        }
    });
    function runScriptOne() {
        模板纯预览();
        function 模板纯预览() {
            show();
            toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
            auto.waitFor();
            toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");
            var appName = "com.coloros.videoeditor"
            toastLog("正在打开即录app");
            launch(appName);
            sleep(3000);
            // 开启多线程监测弹窗
            threads.start(function () {
                TC();
                error();
            });
            requestScreenCapture();
            sleep(1000);
            bulid_catalog();
            click_one();
            circular_sliding();
            // ------------------------------------------- 写方法区-------------------------------------------
            function click_one() {
                var creation = desc("使用模板");
                if (!creation) {
                    circular_sliding();
                } else {
                    // 点击第一个模板
                    var first_template = id("use_count_layout").find();
                    first_template.click();
                }
            }
            function circular_sliding() {
                // 循环滑动
                while (true) {
                    for (let i = 1; i > 0; i++) {
                        desc("使用模板").waitFor();
                        var wait = random(5000, 8000);
                        sleep(wait);
                        swipe(device.width / 2, device.height / 2, device.width / 2, 0, 1000);
                        sleep(1000);
                        console.verbose("已预览了" + i + "个视频");
                    }
                }
            }
            function TC() {   // 弹窗
                device.keepScreenOn()
                sleep(1000);
                var beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000);
                if (beginBtn) {
                    beginBtn.click();
                }
                var i_know = id("bt_know").text("知道了").findOne(2000);
                if (i_know) {
                    i_know.click();
                }
            }
            function bulid_catalog() {   // 创建文件、文件夹
                files.createWithDirs("/sdcard/即录模板/Error.txt");
                files.createWithDirs("/sdcard/即录模板/img/");
            }
            function show() {   // 控制台输出
                console.show();
                console.setPosition(200, 100);
                console.setGlobalLogConfig({
                    "file": "/sdcard/即录模板/log.txt"
                });
                var window = floaty.window(
                    <frame>
                        <button id="action" text="点击停止脚本" w="120" h="40" bg="#F0EB4336" />
                    </frame>
                );
                setInterval(() => { }, 1000);
                var execution = null;
                //记录按键被按下时的触摸坐标
                var x = 0,
                    y = 0;
                //记录按键被按下时的悬浮窗位置
                var windowX, windowY;
                //记录按键被按下的时间以便判断长按等动作
                var downTime;
                window.action.setOnTouchListener(function (view, event) {
                    switch (event.getAction()) {
                        case event.ACTION_DOWN:
                            x = event.getRawX();
                            y = event.getRawY();
                            windowX = window.getX();
                            windowY = window.getY();
                            downTime = new Date().getTime();
                            return true;
                        case event.ACTION_MOVE:
                            //移动手指时调整悬浮窗位置
                            window.setPosition(windowX + (event.getRawX() - x),
                                windowY + (event.getRawY() - y));
                            //如果按下的时间超过1.5秒判断为长按，退出脚本
                            if (new Date().getTime() - downTime > 1500) {
                                toast("长按可以移动位置哦～");
                            }
                            return true;
                        case event.ACTION_UP:
                            //手指弹起时如果偏移很小则判断为点击
                            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                                onClick();
                            }
                            return true;
                    }
                    return true;
                });
                function onClick() {
                    dialogs.alert("已停止运行脚本！");
                    log("用户点击了停止按钮");
                    exit();
                }
            }
            function error() {   // 网络异常提示
                while (true) {
                    for (let j = 1; j > 0; j++) {
                        var txt = "";//声明一个全局变量
                        threads.start(function () {
                            events.observeToast();//创建监听
                            events.onToast(function (toast) {
                                txt = toast.getText()//获取监听内容赋值给全局变量
                            });
                        })
                        let p = function () {
                            while (true) if (txt == "网络异常，请重试") return true;
                        }()
                        if (p) {
                            // 获取模板名字
                            var 模板名称 = id("template_title").findOne().getText();
                            var 达人名称 = id("user_name").findOne().getText();
                            console.error("发现异常,已截图");
                            sleep(300);
                            var im = captureScreen();
                            var path = "/sdcard/即录模板/img/" + 模板名称 + ".png";
                            im.saveTo(path);
                        }
                        console.verbose("播放失败了 " + j + " 个视频");
                    }
                }
            }
        }
    }
    function runScriptTwo() {
        模板扫描();
        function 模板扫描() {
            show();
            toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
            auto.waitFor();
            toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");
            var appName = "com.coloros.videoeditor"
            toastLog("正在打开即录app");
            launch(appName);
            sleep(3000);
            // 开启多线程监测弹窗
            threads.start(function () {
                TC();
                error();
            });
            requestScreenCapture();
            sleep(1000);
            bulid_catalog();
            click_one();
            circular_sliding();
            // ------------------------------------------- 写方法区-------------------------------------------
            function click_one() {
                var creation = desc("使用模板");
                if (!creation) {
                    circular_sliding();
                } else {
                    // 点击第一个模板
                    var first_template = id("use_count_layout").find();
                    first_template.click();
                }
            }
            function circular_sliding() {
                // 循环滑动
                while (true) {
                    for (let i = 1; i > 0; i++) {
                        desc("使用模板").waitFor();
                        var wait = random(6000, 8000);
                        sleep(wait);
                        使用模板();
                        导入素材();
                        console.time('导入时间');
                        下一步();
                        console.timeEnd('导入时间');
                        生成();
                        返回至模板();
                        sleep(1000);
                        swipe(device.width / 2, device.height / 2, device.width / 2, 0, 1000);
                        console.info("已生成了" + i + "个视频");
                    }
                }
            }
            function TC() {   // 弹窗
                device.keepScreenOn()
                sleep(1000);
                var beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000);
                if (beginBtn) {
                    beginBtn.click();
                }
                var i_know = id("bt_know").text("知道了").findOne(2000);
                if (i_know) {
                    i_know.click();
                }
            }
            function bulid_catalog() {   // 创建文件、文件夹
                files.createWithDirs("/sdcard/即录模板/Error.txt");
                files.createWithDirs("/sdcard/即录模板/img/");
            }
            function show() {   // 控制台输出
                console.show();
                console.setPosition(200, 100);
                console.setGlobalLogConfig({
                    "file": "/sdcard/即录模板/log.txt"
                });
                var window = floaty.window(
                    <frame>
                        <button id="action" text="点击停止脚本" w="120" h="40" bg="#F0EB4336" />
                    </frame>
                );
                setInterval(() => { }, 1000);
                //记录按键被按下时的触摸坐标
                var x = 0,
                    y = 0;
                //记录按键被按下时的悬浮窗位置
                var windowX, windowY;
                //记录按键被按下的时间以便判断长按等动作
                var downTime;
                window.action.setOnTouchListener(function (view, event) {
                    switch (event.getAction()) {
                        case event.ACTION_DOWN:
                            x = event.getRawX();
                            y = event.getRawY();
                            windowX = window.getX();
                            windowY = window.getY();
                            downTime = new Date().getTime();
                            return true;
                        case event.ACTION_MOVE:
                            //移动手指时调整悬浮窗位置
                            window.setPosition(windowX + (event.getRawX() - x),
                                windowY + (event.getRawY() - y));
                            //如果按下的时间超过1.5秒判断为长按，退出脚本
                            if (new Date().getTime() - downTime > 1500) {
                                toast("长按可以移动位置哦～");
                            }
                            return true;
                        case event.ACTION_UP:
                            //手指弹起时如果偏移很小则判断为点击
                            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                                onClick();
                            }
                            return true;
                    }
                    return true;
                });
                function onClick() {
                    dialogs.alert("已停止运行脚本！");
                    log("用户点击了停止按钮");
                    exit();
                }
            }
            function error() {   // 网络异常提示
                while (true) {
                    for (let j = 1; j > 0; j++) {
                        var txt = "";//声明一个全局变量
                        threads.start(function () {
                            events.observeToast();//创建监听
                            events.onToast(function (toast) {
                                txt = toast.getText()//获取监听内容赋值给全局变量
                            });
                        })
                        let p = function () {
                            while (true) if (txt == "网络异常，请重试") return true;
                        }()
                        if (p) {
                            // 获取模板名字
                            var 模板名称 = id("template_title").findOne().getText();
                            console.error("发现异常,已截图");
                            sleep(300);
                            var im = captureScreen();
                            var path = "/sdcard/即录模板/img/" + 模板名称 + ".png";
                            im.saveTo(path);
                        }
                        console.verbose("导入失败了 " + j + " 个视频");
                    }
                }
            }
            function 使用模板() {
                var 使用模板 = desc("使用模板").find(2000);
                使用模板.click()
                sleep(1000);
                if (text("允许").exists()) {
                    click("允许")
                }
            }
            function 导入素材() {
                sleep(1000);
                text("图片").untilFind();
                click("图片");
                sleep(1000);
                var 素材 = id("rv_timeline_item").find(4);
                素材.click()
                console.verbose("素材正在导入...")
            }
            function 下一步() {
                sleep(1000);
                click("下一步");
                if (click("下一步")) {
                    next_error();
                }
                text("生成").untilFind();
                console.verbose("正在点击下一步...")
            }
            function 生成() {
                var 生成 = text("生成").findOne();
                生成.click();
                console.verbose("点击生成...")
                text("完成").untilFind();
                console.verbose("素材生成成功...")
            }
            function 返回至模板() {
                var 返回箭头 = id("action_bar_back").findOne();
                返回箭头.click()
                if (text("返回").find()) {
                    click("返回");
                }
                var 返回箭头2 = id("template_edit_back").findOne();
                返回箭头2.click()
                if (text("直接退出").find()) {
                    click("直接退出");
                }
            }
            function next_error() {   // 点击下一步出现错误toast
                var txt = "";//声明一个全局变量
                threads.start(function () {
                    events.observeToast();//创建监听
                    events.onToast(function (toast) {
                        txt = toast.getText()//获取监听内容赋值给全局变量
                    });
                })
                let p = function () {
                    // 网络异常，请稍后重试" && "加载失败请重试
                    while (true) if (txt) return true;
                }()
                if (p) {
                    console.error(txt);
                }
                素材选择返回至模板();
                sleep(2000);
                swipe(device.width / 2, device.height / 2, device.width / 2, 0, 1000);
                circular_sliding();
            }
            function 素材选择返回至模板() {
                var 返回按钮 = desc("转到上一层及").find();
                返回按钮.click();
                back();
                if (text("放弃").findOne()) {
                    click("放弃");
                }
            }
        }
    }
    function runScriptThree() {
        模板下载耗时();
        function 模板下载耗时() {
            show();
            toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
            auto.waitFor();
            toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");
            // 开启多线程监测弹窗
            threads.start(function () {
                TC();
            });
            requestScreenCapture();
            var appName = "com.coloros.videoeditor"
            toastLog("正在打开即录app");
            launch(appName);
            sleep(3000);
            bulid_catalog();
            取出每行数据();
            sleep(1000)
            // ___________________________写方法去_____________________________
            function show() {   // 控制台输出
                console.show();
                console.setPosition(200, 100);
                console.setGlobalLogConfig({
                    "file": "/sdcard/即录模板/log.txt"
                });
                var window = floaty.window(
                    <frame>
                        <button id="action" text="点击停止脚本" w="120" h="40" bg="#F0EB4336" />
                    </frame>
                );
                setInterval(() => { }, 1000);
                //记录按键被按下时的触摸坐标
                var x = 0,
                    y = 0;
                //记录按键被按下时的悬浮窗位置
                var windowX, windowY;
                //记录按键被按下的时间以便判断长按等动作
                var downTime;
                window.action.setOnTouchListener(function (view, event) {
                    switch (event.getAction()) {
                        case event.ACTION_DOWN:
                            x = event.getRawX();
                            y = event.getRawY();
                            windowX = window.getX();
                            windowY = window.getY();
                            downTime = new Date().getTime();
                            return true;
                        case event.ACTION_MOVE:
                            //移动手指时调整悬浮窗位置
                            window.setPosition(windowX + (event.getRawX() - x),
                                windowY + (event.getRawY() - y));
                            //如果按下的时间超过1.5秒判断为长按，退出脚本
                            if (new Date().getTime() - downTime > 1500) {
                                toast("长按可以移动位置哦～");
                            }
                            return true;
                        case event.ACTION_UP:
                            //手指弹起时如果偏移很小则判断为点击
                            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                                onClick();
                            }
                            return true;
                    }
                    return true;
                });
                function onClick() {
                    dialogs.alert("已停止运行脚本！");
                    log("用户点击了停止按钮");
                    exit();
                }
            }
            function bulid_catalog() {   // 创建文件、文件夹
                files.createWithDirs("/sdcard/即录模板/Error.txt");
                files.createWithDirs("/sdcard/即录模板/img/");
                files.createWithDirs("/sdcard/即录模板/模板名称.txt");
                var text = "《新年九宫格》\n元旦九宫格祝福\n蜡笔小新祝福语!玩法\n新年快乐，大吉大利\n十二月你好\n元宵节快乐\n【新年快乐】春节模板\n过小年\n新春烟花\n跨年倒计时烟花\n";
                files.write("/sdcard/即录模板/模板名称.txt/", text);
            }
            function 取出每行数据() {
                for (let i = 0; i < 1; i++) {
                    var file = open("/sdcard/即录模板/模板名称.txt/")
                    var ub = file.readlines();
                    ub.length
                    for (let i = 0; i < ub.length; i++) {
                        var str = ub[i];
                        sleep(1000)
                        console.info(str);
                        放大镜();
                        setText(str)
                        点击搜索();
                    }
                    file.close();
                }
                console.info("模板遍历完成");
                log("3秒后退出程序")
                sleep(3000)
                exit();
                log("请手动关闭控制台")
                function 放大镜() {
                    var 放大镜 = id("iv_search_display").find();
                    放大镜.click();
                    sleep(1000);
                }
                function 点击搜索() {
                    var 搜索 = text("搜索").find();
                    搜索.click();
                    sleep(1000);
                    点击第一个模板();
                }
                function 点击第一个模板() {
                    var 第一个模板 = id("template_image_view").findOne();
                    第一个模板.click();
                    sleep(3000)
                    使用模板();
                    导入素材();
                    console.time('下载模板时间为');
                    下一步();
                    console.timeEnd('下载模板时间为');
                    返回至模板();
                    清除数据();
                    启动应用();
                    同意并使用();
                    进入首页();
                    大叉叉();
                }
                function 使用模板() {
                    var 使用模板 = desc("使用模板").find(2000);
                    使用模板.click()
                    sleep(1000);
                    if (text("允许").exists()) {
                        click("允许")
                    }
                }
                function 导入素材() {
                    sleep(1000);
                    text("图片").untilFind();
                    click("图片");
                    sleep(1000);
                    var 素材 = id("rv_timeline_item").find(4);
                    素材.click()
                    log("素材正在导入...")
                }
                function 下一步() {
                    text("下一步").untilFind();
                    try {
                        click("下一步");
                    } catch (e) {
                        error();
                        console.error($debug.getStackTrace(e));
                        sleep(500)
                        back();
                        click("放弃");
                    }
                    log("点击下一步");
                    text("生成").untilFind();
                    log("导入成功")
                }
                function 返回至模板() {
                    var 返回箭头 = id("template_edit_back").findOne();
                    返回箭头.click()
                    if (text("直接退出").find()) {
                        click("直接退出");
                    }
                    sleep(1000)
                    var 返回箭头1 = id("action_bar_back").find();
                    返回箭头1.click()
                    sleep(1000)
                }
                function 清除数据() {
                    app.openAppSetting("com.coloros.videoeditor")
                    text("存储占用").untilFind();
                    click("存储占用");
                    text("清除数据").untilFind();
                    click("清除数据");
                    text("确定").untilFind();
                    click("确定");
                    sleep(1000);
                    back();
                    sleep(1000);
                }
            }
            function 启动应用() {
                sleep(1000);
                var appName = "com.coloros.videoeditor"
                toastLog("正在打开即录app");
                launch(appName);
                sleep(1000);
            }
            function 同意并使用() {
                text("同意并使用").untilFind();
                if (click("同意并使用")) {
                    click("同意并使用");
                }
                log("点击同意并使用");
                sleep(1000);
            }
            function 进入首页() {
                sleep(1000);
                if (click("进入首页")) {
                    click("进入首页");
                }
                log("点击进入首页");
                sleep(1000);
            }
            function 大叉叉() {
                if (text("立即使用").exists()) { };
                var 大叉叉 = id("ad_float_cancel").findOne(2000);
                if (大叉叉) {
                    大叉叉.click();
                } else {
                    log("已进入首页");
                }
            }
            function TC() {   // 弹窗
                device.keepScreenOn();
                sleep(1000);
                var beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000);
                if (beginBtn) {
                    beginBtn.click();
                }
            }
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
                        <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs-Logo.png" w="40" h="50" padding="8 0 0 0" />//应用logo
                        <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs_logo.png" marginLeft="10" w="105" h="50" />//黑色logo
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
                        <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs-Logo.png" marginTop="50" w="auto" h="50" gravity="center" />//应用logo
                        <img src="{{context_Logo}}" w="auto" h="50" gravity="center" />//黑色logo
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto">
                            </vertical>
                            <View bg="#FFEA3324" h="*" w="*" />//卡片颜色1
                        </card>
                        <text text="软件及脚本开发者" color="{{context_textColor}}" textSize="10" textStyle="normal" marginLeft="5" />
                        <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/authorName.png" layout_gravity="center" w="150" h="30" />//作者名
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto">
                            </vertical>
                            <View bg="#FFFF711F" h="*" w="*" />//卡片颜色1
                        </card>
                        <text text="软件版本" color="{{context_textColor}}" textSize="10" textStyle="normal" marginLeft="5" />
                        <text id="AppVision" color="{{context_textColor}}" textSize="20" textStyle="normal" gravity="center" />
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto">
                            </vertical>
                            <View bg="#FFFABB06" h="*" w="*" />//卡片颜色1
                        </card>
                        <text text="设备信息" color="{{context_textColor}}" textSize="10" textStyle="normal" marginLeft="5" />
                        <text id="DeviceInformation" color="{{context_textColor}}" textSize="15" textStyle="normal" gravity="center" />
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto">
                            </vertical>
                            <View bg="#FF34A853" h="*" w="*" />//卡片颜色1
                        </card>
                        <text text="项目开源地址" color="{{context_textColor}}" textSize="10" textStyle="normal" marginLeft="5" />
                        <text id="OpenSource" autoLink="web" color="{{context_textColor}}" textSize="15" textStyle="normal" gravity="center" />
                        <card h="5" marginTop="10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto">
                            </vertical>
                            <View bg="#FF4285F4" h="*" w="*" />//卡片颜色1
                        </card>
                        <text id="Ttip" color="{{context_textColor}}" textSize="15" textStyle="normal" marginTop="5" gravity="center" />
                        <card h="5" margin="0 10 0 10" cardCornerRadius="0dp"
                            cardElevation="0dp" gravity="center_vertical">
                            <vertical padding="0 0" h="auto">
                            </vertical>
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
        ui.OpenSource.text("Github：https://github.com/Orange-shirt/OrangeJs" + "\n阿里云Code：\nhttps://code.aliyun.com/orange_shirt/OrangeJs");
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
                    <!-- lines属性用来设置输入框的行数 -->
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


    // ui.JoinQQGroup.click(() => {   // 指向加入QQ群模块
    //     engines.execScript("加入QQ群", "JoinQQGroup();\n" + JoinQQGroup.toString());
    // });
    function JoinQQGroup() {   // 加入QQ群
        var options = ["使用QQ加群", "使用TIM加群"]
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
                packageName: "com.tencent.tim",
                className: "com.tencent.mobileqq.activity.JumpActivity",
                data: app.parseUri("mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3Dv5ohaWahdOfqDmyX7L_a196dl3K-SX5_"),
                flags: ["grant_read_uri_permission", "grant_write_uri_permission"],
            });
        } else if (i == 0) {
            app.startActivity({
                action: "android.intent.action.VIEW",
                packageName: "com.tencent.mobileqq",
                className: "com.tencent.mobileqq.activity.JumpActivity",
                data: app.parseUri("mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3Dv5ohaWahdOfqDmyX7L_a196dl3K-SX5_"),
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
                        <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs-Logo.png" w="40" h="50" />//应用logo
                        <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs-logoWhite.png" marginLeft="10" w="105" h="50" />//黑色logo
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