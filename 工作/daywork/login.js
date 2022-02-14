/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-12-20 15:41:55
 * @LastEditTime: 2021-12-20 18:14:38
 */
login()
function login() {
    show();
    toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
    auto.waitFor();
    toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");
    var appName = "com.zhiliaoapp.musically"
    toastLog("正在打开TikTop");
    launch(appName);
    sleep(3000);
    // 开启多线程监测弹窗
    threads.start(function () {
        TC();
    });
    requestScreenCapture();
    sleep(2000);
    my_();
    sign_up();
    add_();
    email_login();
    function TC() {   // 弹窗
        device.keepScreenOn()
        sleep(1000);
        var beginBtn = classNameContains("Button").textContains("立即开始").findOne(3000);
        if (beginBtn) {
            beginBtn.click();
        }
        var i_know = id("bt_know").text("知道了").findOne(2000);
        if (i_know) {
            i_know.click();
        }
    }
    function show() {   // 控制台输出
        console.show();
        console.setPosition(200, 100);
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

    function my_() {
        toastLog("点击我的头像");
        var my_ = id("chz").findOne(3000);
        my_.click();

    }

    function sign_up() {
        toastLog("点击登录")
        var sign_up = id("yz").findOne(2000);
        sign_up.click()
    }
    function add_() {
        toastLog("点击加号")
        var add_ = id("gl").findOne(2000);
        add_.click()

    }
    function email_login() {
        toastLog("使用邮箱登录")
        var email_login = id("acf").findOne(2000);
        email_login.click()
        sleep(2000)
        swipe(device.width / 1.5, device.height / 2, 0, device.height / 2, 500);
        input_use();
    }
    function input_use() {
        toastLog("输入邮箱")
        email = "veiyqrmctkcrm@hotmail.com"
        toastLog("输入密码")
        email_pwd = "WqxBC56Q3D7w"
        setText(1, email)
        setText(2, email_pwd)
    }
    function login() {
        toastLog("点击登录")
        var click_login = id("")
    }

}





