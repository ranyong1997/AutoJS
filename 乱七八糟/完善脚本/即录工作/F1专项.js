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