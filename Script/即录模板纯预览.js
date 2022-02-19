run();
function run() {
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