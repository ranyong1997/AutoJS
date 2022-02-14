/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-02-23 16:39:01
 * @LastEditTime: 2021-02-25 22:47:13
 */

// 仿写一个ui界面
var QZ = files.exists("/storage/emulated/0/RanyongJS/仿写一个UI界面/Beta1.0脚本更新日志.txt");  //确保路径path所在的文件夹存在。如果该路径所在文件夹不存在，则创建该文件夹。
if (QZ == false) {
    var SD = dialogs.confirm("!!Beta1.0重要更新提醒", "脚本支持自动随机点击首页进行刷新视频\n\n");
    if (SD == true) {
        files.createWithDirs("/storage/emulated/0/RanyongJS/仿写一个UI界面/Beta1.0脚本更新日志.txt");
    }
}

dialogs_js();
var height = device.height;  // 获取手机屏幕高
var width = device.width;  // 获取手机屏幕宽


function dialogs_js() {
    var ScriptVersion = ("Beta1.0"); // 版本号
    log("软件已经开始运行，如果没有弹窗请强行停止再打开本软件");
    var options_ = ["▶ 开始运行脚本", "🕐 定时运行脚本", "❌ 停止脚本", "💭 向作者反馈", "📰 脚本介绍/作者信息", "❓ Q&A解答"]
    var i = dialogs.select("*+*+*+* 冉勇の脚本 *+*+*+*\n*+*+*+* Ranyong JS *+*+*+*\n\n欢迎使用 (◍•ᴗ•◍)❤" + "\n" + "“仿写一个UI界面”" + ScriptVersion + "\n请选择一个要进行的选项", options_);
    if (i < 0) {
        toastLog("您没有选择，如需关闭对话框\n 请选择“❌ 停止脚本”");
        dialogs_js();
    } else if (i == 0) {
        toastLog(options_[i]);
        context_Manualstate = 0;
        // Set_Back_way();
        var Mute = confirm("🔇要静音媒体音量吗？", "建议在公共场合选择静音,以免对他人造成影响\n\n若没有授予本软件“修改系统设置”权限手动静音。\n没有授予该权限点击确定后会跳转设置");
        if (Mute) {
            device.setMusicVolume(0);  // 设置当前媒体音量
            context_Mute = 1;
            toastLog("🔇已静音媒体音量");
            TC();
            ensureApp();
            Set_swipe_way();
        } else {
            context_Mute = 0;
        }
    } else if (i == 1) {
        toastLog("请稍后，正在检测权限....");
        context_Manualstate = 0;
        toastLog(options_[i]);
        device.keepScreenDim() // 保持屏幕常亮
        toastLog("检查权限设置....");
        context_Manualstate = 0;
        toastLog("等待无障碍权限开启....\n您必须手动授予本软件无障碍权限\n否则无法运行!");
        auto.waitFor(); // 检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；当无障碍服务启动后脚本会继续运行。
        toastLog("无障碍权限开启" + "\n" + "继续运行脚本....");
        sleep(2000);
        toastLog("为了保证脚本正常运行\n请授予本软件浮窗权限");
        sleep(2000);
        var test_rawWindow = floaty.rawWindow(  //指定悬浮窗的布局，创建并显示一个原始悬浮窗。
            <frame gravity="center" bg="#00000000" />
        );
        test_rawWindow.setSize(-1, -1); // 设置悬浮窗宽高。
        test_rawWindow.setTouchable(false);  // 是否可触摸。
        setTimeout(() => {
            test_rawWindow.close();
        }, 1000);  //这段代码运行后将会在屏幕上显示悬浮文字，并在一秒后消失。
        toastLog("悬浮窗已开启");
        var Mute = confirm("🔇要静音媒体音量吗？", "建议在公共场合选择静音,以免对他人造成影响\n\n若没有授予本软件“修改系统设置”权限手动静音。\n没有授予该权限点击确定后会跳转设置");
        if (Mute) {
            device.setMusicVolume(0);
            context_Mute = 1;
            toastLog("🔇已静音媒体音量");
        } else {
            context_Mute = 0;
        }
        sleep(2000);
        wait_Time_over();
    } else if (i == 2) {
        toastLog(options_[i]);
        exit();
    } else if (i == 3) {
        toastLog(options_[i]);
        app.openUrl("https://wj.qq.com/s2/8104693/5e7b");   // 向作者反馈问题
        sleep(1000);
        exit();
    } else if (i == 4) {
        toastLog(options_[i]);
        alert("(っ´Ι`)っ🥂干杯 \n脚本作者:码云@冉勇", "仿写一个UI界面" + ScriptVersion + "\n当前软件版本" + app.versionName + "(" + app.versionCode + ")\n\n全自动刷视频脚本!\n支持启动后自动更新脚本，无需卸载重装即可保持最新，且开放全部的脚本代码!\n脚本的全部运行不加任何广告，不干任何不相关的事情!不触碰任何人隐私!\n此脚本为兴趣制作，仅供参考，欢迎交流~\n\n如有任何问题，欢迎向作者反馈哦~")
        dialogs_js();
    } else if (i == 5) {
        toastLog(options_[i]);
        Q_A_();
    }
}

function Q_A_() {
    var Q1 = ("1❓、MIUI11如何开启无障碍服务？");
    var A1 = ("💬 一般情况下脚本运行会自动弹出无障碍服务设置，之后只需要在无障碍服务设置中找到“已下载的服务”点击找到对应的名称打开即可。\n手动打开无障碍的方法为\n①打开“设置”→②在“搜索系统设置项”搜索“无障碍”点击第一项→③再在无障碍设置中找到“已下载的服务”点击进入后找到对应脚本名称打开即可");

    var Q2 = ("2❓、脚本突然停止运行了，怎么办？");
    var A2 = ("💬 这种情况一般是手机卡顿引起的。如果脚本卡住不动，您可以尝试关掉应用重新打开。若任然没用，请重启手机再次运行脚本");

    var Q3 = ("3❓、安卓6.0以下系统是否能正常使用脚本");
    var A3 = ("💬 本脚本完全使用Auto.js制作。因此在安卓6.0以下系统会不支持无障碍服务以及造成大量函数失效，因此脚本不支持安卓6.0以下系统的，敬请谅解");

    var Q4 = ("4❓、定时运行之后却没有在预定时间运行脚本");
    var A4 = ("💬 使用定时运行脚本会自动设置屏幕亮度并驻留后台，但清理本软件或者锁屏甚至关机以及关闭本软件必要的无障碍权限和浮窗权限都将会使定时任务失效，建议在定时运行时将加入清理白名单或锁定本软件后台且不要锁屏以及不要关闭无障碍功能与悬浮窗权限即可");

    var Q_A_options = [Q1, Q2, Q3, Q4]
    var Q_A = dialogs.select("(⊙o⊙)？\n Q&A常见问题解答", Q_A_options);  //显示一个带有选项列表的对话框，等待用户选择，返回用户选择的选项索引(0 ~ item.length - 1)。如果用户取消了选择，返回-1。
    if (Q_A == 0) {
        dialogs.alert(Q1, A1);   //创建一个对话框
        Q_A_();
    } else if (Q_A == 1) {
        dialogs.alert(Q2, A2);   //创建一个对话框
        Q_A_();
    } else if (Q_A == 2) {
        dialogs.alert(Q3, A3);   //创建一个对话框
        Q_A_();
    } else if (Q_A == 3) {
        dialogs.alert(Q4, A4);   //创建一个对话框
        Q_A_();
    } else if (Q_A < 0) {
        dialogs_js();
    }
}

// 创建一个点击首页的方法
function Set_swipe_way() {
    for (let i = 0; i < 100; i++) {
        click("首页");
        sleep(1000);
        var time = random(4000, 6000)
        sleep(time);
        toastLog("下个视频将在" + time / 1000 + "秒刷新")
        className("android.view.View").desc("精选").findOne().click()
    }
}

/**
 * @name: 
 * @test: test font
 * @msg: 创建一个返回方法及滑动速度
 * @param {*}
 * @return {*}
 */
function Set_Back_way() {
    // 💟🕎⛎设定返回方法及滑动速度的代码
    var options_hq = ["🔙 普通的返回\n(使用无障碍权限)", "#⃣ 使用ROOT返回\n(必须授予本软件ROOT权限)", "🔍 通过调用搜索界面进入\n（“曲线救国法” 若其它返回均失效\n    来尝试此方法吧）", "👉👉🏻👉🏼👉🏽👉🏾👉🏿 \n从屏幕中间从左向内滑动\n(全面屏手势返回 例如:小米MIUI)", "              👈🏿👈🏾👈🏽👈🏼👈🏻👈 \n从屏幕中间从右向内滑动\n(全面屏手势返回 例如:华为EMUI)", "👆👆🏻👆🏼👆🏽👆🏾👆🏿 \n从屏幕左侧下方向上滑动\n(全面屏手势返回 例如:锤子Smartisan UI)", "               ☝🏿☝🏾☝🏽☝🏼☝🏻☝️ \n从屏幕右侧下方向上滑动\n(全面屏手势返回)"]
    var i_back = dialogs.select(" Hi! ( ╹▽╹ )\n请选择一个方法\n用于实现返回操作", options_hq);
    if (i_back >= 0) {
        toastLog("您选择的是" + options_hq[i_back]);
        sleep(2000);
        var options_select = options_hq[i_back];
        context_i_back = i_back;
    } else {
        toastLog("没有选择返回方法!");
        device.cancelKeepingAwake();  //取消屏幕常亮
        dialogs_js();
    }
    if (i_back > 2) {
        var options_hd = ["200毫秒\n(默认，如果太快请选其它)", "500毫秒", "800毫秒", "1秒(1000毫秒)", "1.5秒（1500毫秒）", "2秒（2000毫秒）"]
        var iix = dialogs.select("Ok! (・∀・) 您选择了:\n" + options_select + "\n请选择滑动速度\n单位:毫秒（1秒=1000毫秒）", options_hd);
    }
    if (i_back == 0) {
        context_gestures_speed = 200;
        toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
        sleep(2000);
    }
    if (i_back == 1) {
        context_gestures_speed = 500;
        toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
        sleep(2000);
    }
    if (iix == 2) {
        context_gestures_speed = 800;
        toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
        sleep(2000);
    }
    if (iix == 3) {
        context_gestures_speed = 1000;
        toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
        sleep(2000);
    }
    if (iix == 4) {
        context_gestures_speed = 1500;
        toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
        sleep(2000);
    }
    if (iix == 5) {
        context_gestures_speed = 2000;
        toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
        sleep(2000);
    }
    if (iix < 0) {
        toastLog("没有选择滑动速度");
        Set_Back_way();
    }
}
sleep(1000);
toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
auto.waitFor(); //检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；当无障碍服务启动后脚本会继续运行。
toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");


// 创建一个定时任务
function wait_Time_over() {
    var i_wait = dialogs.singleChoice("🕐 定时任务\n\n ヾ(≧▽≦*)o\n请选择一个选项\n计时结束会自动运行", ["1分钟后运行", "5分钟后运行", "10分钟后运行", "30分钟后运行", "一小时后运行", "三小时后运行", "五小时后运行"], 2);  //显示一个单选列表对话框，等待用户选择，返回用户选择的选项索引(0 ~ item.length - 1)。如果用户取消了选择，返回-1。
    if (i_wait < 0) {
        toast("您取消了选择");
        device.cancelKeepingAwake();  // 取消屏幕常亮
        dialogs_js();
    }
    if (i_wait >= 0) {
        context_i_wait = i_wait;
    }
    if (i_wait == 0) {
        var choice_confirm = dialogs.confirm("您选择了1分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n🚫请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效"); // 显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 true ，否则返回 false 。 
        if (choice_confirm == false) {
            toastLog("您取消了定时运行确认");
            wait_Time_over();
        } else {
            waiting_time();
            TC();
            ensureApp();
            Set_swipe_way();
        }
    }
    if (i_wait == 1) {
        var choice_confirm = dialogs.confirm("您选择了5分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n🚫请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效"); // 显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 true ，否则返回 false 。 
        if (choice_confirm == false) {
            toastLog("您取消了定时运行确认");
            wait_Time_over();
        } else {
            TC();
            ensureApp();
            Set_swipe_way();
        }
    }
    if (i_wait == 2) {
        var choice_confirm = dialogs.confirm("您选择了10分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n🚫请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效"); // 显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 true ，否则返回 false 。 
        if (choice_confirm == false) {
            toastLog("您取消了定时运行确认");
            wait_Time_over();
        } else {
            TC();
            ensureApp();
            Set_swipe_way();
        }

    }
    if (i_wait == 3) {
        var choice_confirm = dialogs.confirm("您选择了30分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n🚫请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效"); // 显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 true ，否则返回 false 。 
        if (choice_confirm == false) {
            toastLog("您取消了定时运行确认");
            wait_Time_over();
        } else {
            TC();
            ensureApp();
            Set_swipe_way();
        }
    }
    if (i_wait == 4) {
        var choice_confirm = dialogs.confirm("您选择了一小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n🚫请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效"); // 显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 true ，否则返回 false 。 
        if (choice_confirm == false) {
            toastLog("您取消了定时运行确认");
            wait_Time_over();
        } else {
            TC();
            ensureApp();
            Set_swipe_way();
        }
    }
    if (i_wait == 5) {
        var choice_confirm = dialogs.confirm("您选择了三小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n🚫请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效"); // 显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 true ，否则返回 false 。 
        if (choice_confirm == false) {
            toastLog("您取消了定时运行确认");
            wait_Time_over();
        } else {
            TC();
            ensureApp();
            Set_swipe_way();
        }
    }
    if (i_wait == 6) {
        var choice_confirm = dialogs.confirm("您选择了五小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n🚫请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效"); // 显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 true ，否则返回 false 。 
        if (choice_confirm == false) {
            toastLog("您取消了定时运行确认");
            wait_Time_over();
        } else {
            TC();
            ensureApp();
            Set_swipe_way();
        }
    }
}

// 创建一个倒计时
function waiting_time() {
    //计时运行脚本
    if (context_i_wait == 0) {
        var Seconds = 60;
        for (Seconds == 60; Seconds > 0; Seconds--) {
            console.warn("【定时运行】计时中……\n" + Seconds + "秒后开始运行");
            sleep(1000);
        }
    }
    if (context_i_wait == 1) {
        var Minutes = 4;
        for (Minutes == 4; Minutes >= 0; Minutes--) {
            if (Minutes >= 0) {
                var Seconds = 60;
                for (Seconds == 60; Seconds > 0; Seconds--) {
                    console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                    sleep(1000);
                }
            }
        }
    }
    if (context_i_wait == 2) {
        var Minutes = 9;
        for (Minutes == 9; Minutes >= 0; Minutes--) {
            if (Minutes >= 0) {
                var Seconds = 60;
                for (Seconds == 60; Seconds > 0; Seconds--) {
                    console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                    sleep(1000);
                }
            }
        }
    }
    if (context_i_wait == 3) {
        var Minutes = 29;
        for (Minutes == 29; Minutes >= 0; Minutes--) {
            if (Minutes >= 0) {
                var Seconds = 60;
                for (Seconds == 60; Seconds > 0; Seconds--) {
                    console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                    sleep(1000);
                }
            }
        }
    }
    if (context_i_wait == 4) {
        var Minutes = 59;
        for (Minutes == 59; Minutes >= 0; Minutes--) {
            if (Minutes >= 0) {
                var Seconds = 60;
                for (Seconds == 60; Seconds > 0; Seconds--) {
                    console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                    sleep(1000);
                }
            }
        }
    }
    if (context_i_wait == 5) {
        var Hours = 1;
        for (Hours == 1; Hours >= 0; Hours--) {
            var Minutes = 59;
            for (Minutes == 59; Minutes >= 0; Minutes--) {
                if (Minutes >= 0) {
                    var Seconds = 60;
                    for (Seconds == 60; Seconds > 0; Seconds--) {
                        console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                        sleep(1000);
                    }
                }
            }
        }
    }
    if (context_i_wait == 6) {
        var Hours = 2;
        for (Hours == 2; Hours >= 0; Hours--) {
            var Minutes = 59;
            for (Minutes == 59; Minutes >= 0; Minutes--) {
                if (Minutes >= 0) {
                    var Seconds = 60;
                    for (Seconds == 60; Seconds > 0; Seconds--) {
                        console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                        sleep(1000);
                    }
                }
            }
        }
    }
    if (context_i_wait == 7) {
        var Hours = 4;
        for (Hours == 4; Hours >= 0; Hours--) {
            var Minutes = 59;
            for (Minutes == 59; Minutes >= 0; Minutes--) {
                if (Minutes >= 0) {
                    var Seconds = 60;
                    for (Seconds == 60; Seconds > 0; Seconds--) {
                        console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                        sleep(1000);
                    }
                }
            }
        }
    }
}

// 下面是浮窗
function TC() {
    //下面是悬浮窗
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
        engines.stopAllAndToast();
    }
}

// 启动app
function ensureApp() {
    var WhileT = 1;
    var name = getAppName("com.smile.gifmaker");  // 获取应用包名对应的已安装的应用的名称。如果该找不到该应用，返回null。
    if (currentPackage() != name) {
        toastLog("检测到" + name + "未打开\n正在打开" + name + WhileT + "次");
        app.startActivity({
            action: "android.intent.action.VIEW", //此处可为其他值
            packageName: "com.smile.gifmaker",
            className: "com.yxcorp.gifshow.HomeActivity"
        });
        // 等待app打开
        toastLog("等待app缓冲中" + WhileT + "次");
        sleep(3000);
    }
}

log("脚本已完成");
dialogs.alert("(☞ﾟ∀ﾟ)☞\n(☞^o^) ☞     脚本已运行完毕\n(☞ ͡° ͜ʖ ͡°)☞", "检测不到任务喽～\n如有遗漏请自行操作或再次运行\n如有任何问题欢迎向作者反馈哦～\n\n脚本作者@冉勇");
exit();
