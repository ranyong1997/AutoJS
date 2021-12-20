/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-02-26 16:26:12
 * @LastEditTime: 2021-03-06 00:20:21
 */



// 获取屏幕宽高
var height = device.height;
var width = device.width;

var InstalledVersion = getPackageVersion("com.tencent.mm");
var SupportVersion = ["8.0.1", "7.0.12"]

var Each = SupportVersion.length;
var While = 1;
while (While == 1) {
    if (Each < 0) {
        context_check = null;
        // 判断是否选择了不在显示
        if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/不再显示.txt") != true) {
            dialogs.build({   // 对话框属性，用于配置对话框。
                // 对话框标题
                title: "当前微信APP版本未经测试",
                // 对话框标题颜色
                titleColor: "#FF00FF",
                contentLineSpacing: 1.2,
                // 对话框内容
                content: "本脚本目前已测试的软件版本有:\n微信" + SupportVersion + "\n您当前安装的版本为:" + InstalledVersion + "\n您如果使用没有问题可直接忽略\n若有问题可使用相应的版本或反馈",
                // 对话框颜色
                contentColor: "#4B0082",
                // 确定键内容
                positive: "继续运行",
                // 确定键颜色
                positiveColor: "#388E3C",
                // 取消键内容
                negative: "取消运行",
                // 取消键颜色
                negativeColor: "#D32F2F",
                // 中性键内容
                neutral: "给作者反馈",
                // 对话框是否可取消，false 手动取消
                cancelable: false,
                // 对话框是否在点击对话框之外区域时自动取消 false 不可取消
                canceledOnTouchOutside: false,
                // 中性键颜色
                neutralColor: "#616161",
                // 勾选框内容
                checkBoxPrompt: "能正常使用，不再提示"
            }).on("positive", () => {
                //监听确定键
                toast("继续运行脚本");
                if (context_check == 1) {
                    // 创建一个文件或文件夹并返回是否创建成功。
                    var NeverShow = files.createWithDirs("/storage/emulated/0/RanyongJs/自动微信发消息/不再显示.txt");
                    if (NeverShow == false) {
                        dialogs.alert("设置不在显示失败! \n请授予本软件存储权限!");
                    }
                }
                // 运行脚本
                engines.execScript("运行自动微信发消息", "RunJs()\n" + RunJs.toString());
            }).on("neutral", () => {
                //监听中性键
                app.openUrl("https://wj.qq.com/s2/8104693/5e7b");
            }).on("negative", () => {
                //监听消极键
                exit();
            }).on("check", (checked) => {
                //监听勾选框
                log("勾选框状态" + checked);
                if (checked == true) {
                    context_check = 1;
                    toastLog("请确保您当前软件的版本可以正常使用\n否则请不要勾选此按钮");
                } else {
                    context_check = null;
                }
            }).show();
        } else {
            // 运行脚本 
            engines.execScript("运行自动微信发消息", "RunJs()\n" + RunJs.toString());
        }
        var While = 0;
    } else if (SupportVersion[Each] != InstalledVersion) {
        Each--;
    } else {
        var While = 0;
        log("已安装支持的软件版本:" + SupportVersion[Each]);
        // 运行脚本 
        engines.execScript("运行自动微信发消息", "RunJs()\n" + RunJs.toString());
    }
}
// 判断用户是否安装微信
function getPackageVersion(packageName) {
    try {
        importPackage(android.content);  // 全局变量。一个android.content.Context对象。
        var pckMan = context.getPackageManager();
        var packageInfo = pckMan.getPackageInfo(packageName, 0);
        return packageInfo.versionName;
    } catch (e) {
        dialogs.alert("您没有安装微信");
        exit();
    }
}

function RunJs() {
    dialogs_js();

    function toastLog(message) {
        toast(message);
        log(message);
    }

    function dialogs_js() {
        var ScriptVersion = ("Beta1.0");  // 版本号
        log("软件脚本已开始运行，如果没有弹出菜单请强制停止再打开软件!");
        var options_ = ["▶️ 开始运行脚本", "🕒 计时运行脚本", "⏰ 定时运行脚本", "⏹ 停止运行脚本", "🛠 修改脚本配置", "🔙 返回方法设置", "💬 吐司/日志切换"]
        var i = dialogs.select("*+*+*+* 冉勇の脚本 *+*+*+*\n*+*+*+* Ranyong JS *+*+*+*\n\n欢迎使用 (◍•ᴗ•◍)❤" + "\n" + "“微信自动发消息”" + ScriptVersion + "\n请选择一个要进行的选项", options_);
        if (i < 0) {
            toastLog("没有选择，如需要关闭对话框\n 请选择“停止脚本”");
            dialogs_js();
        } else if (i == 0) {
            toastLog(options_[i]);
            context_Manualstate = 0;
            if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt") != true) {  // 返回在路径path处的文件是否存在。
                InformationSettings();
            } else {
                var PZ = open("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt");
                var Pz = PZ.readlines(); // 读取剩余的所有行，并返回它们按顺序组成的字符串数组。
                PZ.close();   // 关闭文件
                context_DX = Pz[0];  // 读取消息设置的第一行
                context_XX = null;
                for (let i = 1; i < Pz.length; i++) {
                    if (context_XX == null) {
                        context_XX = Pz[i];
                    } else {
                        context_XX = context_XX + "\n" + Pz[i]
                    }
                }
            }
            Set_Back_way();
        } else if (i == 1) {
            if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt") == null) {  // 返回在路径path处的文件是否存在。
                dialogs.alert("您还没有配置脚本，不能定时运行");
                dialogs_js();
            } else {
                toastLog("请稍后，正在检查权限...");
                context_Manualstate = 0;
                toastLog(options_[i]);
                if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt") != true) {
                    InformationSettings();
                } else {
                    var PZ = open("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt");
                    var Pz = PZ.readlines();
                    PZ.close();
                    context_DX = Pz[0];
                    context_XX = null;
                    for (let i = 1; i < Pz.length; i++) {
                        if (context_XX == null) {
                            context_XX = Pz[i];
                        } else {
                            context_XX = context_XX + "\n" + Pz[i];
                        }
                    }
                }
                device.keepScreenDim(); //  屏幕保持常亮的时间
                toastLog("检测权限设置....");
                context_Manualstate = 0;
                toastLog("等待无障碍权限开启....\n 您必须手动授予本软件无障碍权限 \n 否则本软件无法工作! ");
                auto.waitFor();  // 检查无障碍服务是否已经启用
                toastLog("无障碍服务已开启" + "\n" + "继续运行脚本");
                sleep(2000);
                toastLog("为保证脚本正常运行\n 请授予本软件悬浮窗权限");
                sleep(2000);
                var test_rawWindow = floaty.rawWindow(  // 指定悬浮窗的布局，创建并显示一个原始悬浮窗
                    <frame gravity="center" bg="#00000000" />
                );
                test_rawWindow.setSize(-1, -1);
                test_rawWindow.setTouchable(false);  // 是否可触摸
                setTimeout(() => {
                    test_rawWindow.close();
                }, 1000);
                toastLog("悬浮窗权限已开启");
                sleep(2000);
                wait_Time_over();
                device.keepScreenDim(); //  屏幕保持常亮的时间
            }
        } else if (i == 2) {
            if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt") == null) {
                dialogs.alert("您还没有配置脚本，不能定时运行哦");
                dialogs_js();
            } else {
                toastLog("请稍候，正在检测权限...");
                if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt") != true) {
                    InformationSettings();
                } else {
                    var PZ = open("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt");
                    var Pz = PZ.readlines();
                    PZ.close();
                    context_DX = Pz[0];
                    context_XX = null;
                    for (let i = 1; i < Pz.length; i++) {
                        if (context_XX == null) {
                            context_XX = Pz[i];
                        } else {
                            context_XX = context_XX + "\n" + Pz[i];
                        }
                    }
                }
                context_Manualstate = 0;
                toastLog(options_[i]);
                device.keepScreenDim(); //  屏幕保持常亮的时间
                toastLog("检测权限设置...");
                context_Manualstate = 0;
                toastLog("等待无障碍权限开启....\n 您必须手动授予本软件无障碍权限 \n 否则本软件无法工作! ");
                auto.waitFor();
                toastLog("无障碍权限已开启" + "\n" + "继续运行脚本...");
                sleep(2000);
                toastLog("为保证脚本正常运行\n请授予本软件悬浮窗权限");
                sleep(2000);
                var test_rawWindow = floaty.rawWindow(
                    <frame gravity="center" bg="#00000000" />
                );
                test_rawWindow.setSize(-1, -1);
                test_rawWindow.setTouchable(false);
                setTimeout(() => {
                    test_rawWindow.close();
                }, 1000);
                toastLog("悬浮窗权限已开启");
                context_Manualstate = 0;
                Set_Back_way();
                DS();
                device.keepScreenDim();
            }
        } else if (i == 3) {
            toastLog(options_[i]);
            exit();
        } else if (i == 4) {
            if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt") != true) {
                InformationSettings();
            } else {
                var PZ = open("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt");
                var Pz = PZ.readlines();
                PZ.close();
                context_DX = Pz[0];
                context_XX = null;
                for (let i = 1; i < Pz.length; i++) {
                    if (context_XX == null) {
                        context_XX = Pz[i];
                    } else {
                        context_XX = context_XX + "\n" + Pz[i];
                    }
                }
                var PZxg = dialogs.confirm("您当前的运行信息配置如下", "联系人备注/群聊名称/公众号名称：\n" + context_DX + "\n\n将发送的消息内容：" + context_XX + "\n\n您确定要修改吗？");  // 显示一个包含“确定”和“取消”按钮的提示对话框 
                if (PZxg = true) {
                    InformationSettings();
                }
                dialogs_js();
            }
        } else if (i == 5) {
            if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt") == true && files.read("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置设置.txt") > 1 && files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/滑动返回速度设置.txt")) {
                files.remove("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt");
                log("当前返回方法设置为滑动返回但未这是滑动返回速度");
            }
            if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt") == true) {
                files.rename("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt", "X返回方法设置.txt");
                Set_Back_way();
            } else {
                dialogs.alert("您未保存任何返回方法，请运行脚本后再进行修改");
                dialogs_js();
            }
        } else if (i == 6) {
            toastLog(options_[i]);
            context_Manualstate = 0;
            if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt") == true) {
                var z = files.read("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt");
                if (z != "吐司" && z != "日志") {
                    alert("“吐司or日志”文件错误，已尝试删除错误文件");
                    try {
                        files.removez("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt");
                    } catch (e) {
                        toastLog("删除“吐司or日志”文件失败");
                    }
                    var Z = "";
                } else {
                    var Z = "当前脚本使用:" + z + "\n";
                }
            } else {
                var Z = "";
            }
            let da = dialogs.select(Z + "请选择一个选项", "使用吐司（Toast）", "使用脚本悬浮日志");
            if (da == 0) {
                toastLog("您选择了:使用吐司");
                try {
                    var T = 0;
                    files.createWithDirs("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt");  // 创建一个文件或文件夹并返回是否创建成功
                    files.write("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt", "吐司");
                } catch (e) {
                    log("未授予存储权限或存储权限错误，当前设置为吐司");
                    var T = 0;
                }
            } else if (da == 1) {
                toastLog("您选择了:使用悬浮日志");
                try {
                    var T = 1;
                    files.createWithDirs("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt");  // 创建一个文件或文件夹并返回是否创建成功
                    files.write("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt", "日志");
                } catch (e) {
                    log("未授予存储权限或存储权限错误，开启悬浮日志");
                    var T = 1;
                }
            }
            dialogs_js();
        }
    }

    function InformationSettings() {
        while (true) {
            context_DX = dialogs.prompt("请输入联系名称");  // 相当于 dialogs.rawInput();
            if (context_DX != "") {
                if (context_DX != null) {
                    break;
                }
            }
        }
        while (true) {
            context_XX = dialogs.prompt("请输入要发送的信息内容");
            if (context_XX != "") {
                if (context_XX != null) {
                    var QR = dialogs.confirm("请确认以下信息", "联系人备注/群聊名称/公众号名称：\n" + context_DX + "\n" + "将发送的消息内容：" + context_XX + "\n\n之后运行将默认使用此配置，确定之后如需更改请在脚本配置中进行");
                    if (QR = true) {
                        files.createWithDirs("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt");
                        files.write("/storage/emulated/0/RanyongJs/自动微信发消息/消息设置.txt", context_DX + "\n" + context_XX);
                        break;
                    } else {
                        InformationSettings();
                        break;
                    }
                }
            }
        }
    }

    // 返回方法
    function Set_Back_way() {
        try {
            if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt") == true) {
                context_i_back = files.read("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt");
                log("返回方法:" + context_i_back);
                if (context_i_back > 1) {
                    try {
                        context_gestures_speed = files.read("/storage/emulated/0/RanyongJs/自动微信发消息/滑动返回速度.txt")
                        log("滑动返回速度:" + context_gestures_speed)
                    } catch (e) {
                        log("上次未完成滑动返回速度设置");
                        files.remove("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt");
                        Set_Back_way();
                    }
                }
            } else {
                // 💟🕎⛎设定返回方法及滑动速度的代码
                var options_hq = ["🔙 普通的返回\n(使用无障碍权限)", "#⃣ 使用ROOT返回\n(必须授予本软件ROOT权限)", "👉👉🏻👉🏼👉🏽👉🏾👉🏿 \n从屏幕中间从左向内滑动\n(全面屏手势返回 例如:小米MIUI)", "              👈🏿👈🏾👈🏽👈🏼👈🏻👈 \n从屏幕中间从右向内滑动\n(全面屏手势返回 例如:华为EMUI)", "👆👆🏻👆🏼👆🏽👆🏾👆🏿 \n从屏幕左侧下方向上滑动\n(全面屏手势返回 例如:锤子Smartisan UI)", "               ☝🏿☝🏾☝🏽☝🏼☝🏻☝️ \n从屏幕右侧下方向上滑动\n(全面屏手势返回)"]
                var i_back = dialogs.select(" Hi! ( ╹▽╹ )\n请选择一个方法\n用于实现返回操作", options_hq);
                if (i_back >= 0) {
                    toastLog("您选择的是" + options_hq[i_back]);
                    sleep(2000);
                    var options_select = option_hql[i_back];
                    context_i_back = i_back;
                    files.createWithDirs("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt");
                    files.write("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt", context_i_back);
                } else {
                    dialogs_js();
                    toastLog("没有选择返回方法!");
                    device.cancelKeepingAwake(); // 取消屏幕常亮
                }
                if (i_back > 1) {
                    var options_hd = ["200毫秒\n(默认，如果太快请选其它)", "500毫秒", "800毫秒", "1秒(1000毫秒)", "1.5秒（1500毫秒）", "2秒（2000毫秒）"]
                    var iix = dialogs.select("Ok! (・∀・) 您选择了:\n" + options_select + "\n请选择滑动速度\n单位:毫秒（1秒=1000毫秒）", options_hd);
                    if (ilx < 0) {
                        toastLog("没有选择滑动速度");
                        Set_Back_way();
                    } else {
                        if (iix == 0) {
                            context_gestures_speed = 200;
                            toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
                            sleep(2000);
                        }
                        if (iix == 1) {
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
                        files.createWithDirs("/storage/emulated/0/RanyongJs/自动微信发消息/滑动返回速度.txt"); // 创建一个文件或文件夹并返回是否创建成功。如果文件所在文件夹不存在，则先创建他所在的一系列文件夹。如果文件已经存在，则直接返回false。
                        files.write("/storage/emulated/0/RanyongJs/自动微信发消息/滑动返回速度.txt", context_gestures_speed);
                    }
                }
                if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/返回方法设置.txt") == true && files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/X返回方法设置.txt") == true) {
                    log("删除");
                    files.remove("/storage/emulated/0/RanyongJs/自动微信发消息/X返回方法设置.txt");
                    dialogs_js();
                } else if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/X返回方法设置.txt") == true) {
                    log("重命名");
                    files.rename("/storage/emulated/0/RanyongJs/自动微信发消息/X返回方法设置.txt", "返回方法设置.txt");
                    dialogs_js();
                }
            }
        } catch (e) {
            log("未授予“存储权限”");
            var options_hq = ["🔙 普通的返回\n(使用无障碍权限)", "#⃣ 使用ROOT返回\n(必须授予本软件ROOT权限)", "👉👉🏻👉🏼👉🏽👉🏾👉🏿 \n从屏幕中间从左向内滑动\n(全面屏手势返回 例如:小米MIUI)", "              👈🏿👈🏾👈🏽👈🏼👈🏻👈 \n从屏幕中间从右向内滑动\n(全面屏手势返回 例如:华为EMUI)", "👆👆🏻👆🏼👆🏽👆🏾👆🏿 \n从屏幕左侧下方向上滑动\n(全面屏手势返回 例如:锤子Smartisan UI)", "               ☝🏿☝🏾☝🏽☝🏼☝🏻☝️ \n从屏幕右侧下方向上滑动\n(全面屏手势返回)"]
            var i_back = dialogs.select(" Hi! ( ╹▽╹ )\n请选择一个方法\n用于实现返回操作", options_hq);
            if (i_back >= 0) {
                toastLog("您选择的是" + options_hq[i_back]);
                sleep(2000);
                var options_select = options_hq[i_back];
                context_i_back = i_back;
            } else {
                toastLog("没有选择返回方法");
                device.cancelKeepingAwake();
            }
            if (i_back > 2) {
                var options_hd = ["200毫秒\n(默认，如果太快请选其它)", "500毫秒", "800毫秒", "1秒(1000毫秒)", "1.5秒（1500毫秒）", "2秒（2000毫秒）"]
                var iix = dialogs.select("Ok! (・∀・) 您选择了:\n" + options_select + "\n请选择滑动速度\n单位:毫秒（1秒=1000毫秒）", options_hd);
                if (iix < 0) {
                    toastLog("没有选择滑动速度");
                    Set_Back_way();
                } else {
                    if (iix == 0) {
                        context_gestures_speed = 200;
                        toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
                        sleep(2000);
                    }
                    if (iix == 1) {
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
                }
            }
        }
    }

    sleep(1000);
    toastLog("等待无障碍权限开启....\n 您必须手动授予本软件无障碍权限\n否则本软件将无法工作");
    auto.waitFor();
    toastLog("无障碍权限已开启" + "\n" + "继续运行脚本....");
    if (files.exists("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt") == true) {
        let z = files.read("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt");
        if (z == "吐司") {
            var T = 0;
        } else if (z == "日志") {
            var T = 1;
        } else {
            toastLog("“吐司or日志”文件错误，已尝试删除并使用默认日志");
            try {
                files.remove("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt");
            } catch (e) {
                toastLog("删除“吐司or日志”文件失败");
            }
            var T = 1;
        }
    } else {
        try {
            files.createWithDirs("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt");
            files.write("/storage/emulated/0/RanyongJs/自动微信发消息/吐司or日志.txt", "日志");
            var T = 1;
            log("默认使用日志，如需更改请在主菜单进行");
        } catch (e) {
            log("为授予存储权限或存储权限错误，默认开启悬浮日志");
            var T = 1;
        }
    }

    // 定时
    function DS() {
        var While = 1;
        while (While == 1) {
            var 时 = dialogs.rawInput("🔵定时→定分→定秒→确认\n\n请输入0-23的小时数\n到此时间脚本会自动运行");
            if (时 == null) {
                // 用户没有输入
                toastLog("没有输入!返回主菜单");
                var While = 0;
                dialogs_js();
            } else if (时 == "") {
                // 用户没有输入
                toastLog("没有输入!返回主菜单");
                var While = 0;
                dialogs_js();
            } else if (时 >= 0) {
                if (时 < 24) {
                    var While = 2;
                    while (While == 2) {
                        var 分 = dialogs.rawInput("✔️定时🔵定分→定秒→确认\n\n请输入0-59的分钟数\n\n" + 时 + "时" + "❓分❓秒");
                        if (分 == null) {
                            toastLog("没有输入!返回上级");
                            var While = 1;
                        } else if (分 == null) {
                            toastLog("没有输入!返回上级");
                            var While = 1;
                        } else if (分 >= 0) {
                            if (分 < 60) {
                                var While = 3;
                                while (While == 3) {
                                    var 秒 = dialogs.rawInput("✔️定时✔️定分🔵定秒→确认\n\n请输入0-59的秒数\n\n" + 时 + "时" + 分 + "分❓秒");
                                    if (秒 == null) {
                                        toastLog("没有输入!返回上级");
                                        var While = 2;
                                    } else if (秒 == null) {
                                        toastLog("没有输入!返回上级");
                                        var While = 2;
                                    } else if (秒 >= 0) {
                                        if (秒 < 60) {
                                            var QR = dialogs.confirm("脚本将在\n⏰" + 时 + "时" + 分 + "分" + 秒 + "秒\n准时运行！", "如需更改请点击取消\n点击确定定时，定时状态可以在日志中查看");
                                            if (QR == false) {
                                                // 返回主菜单
                                                var While = 1;
                                            } else {
                                                var While = 0;
                                                // 仅定时运行一次
                                                while (true) {
                                                    var myDate = new Date();
                                                    if (myDate.getHours() == 时 && myDate.getMinutes() == 分 && myDate.getSeconds() == 秒) {
                                                        console.warn("时间到!开始运行脚本" + myDate.getHours() + "时" + myDate.getMinutes + "分" + myDate.getSeconds() + "秒");
                                                        device.wakeUpIfNeeded();  // 如果屏幕没有点亮，则唤醒设备。
                                                        break;
                                                    }
                                                    sleep(1000);
                                                    console.info("现在是" + myDate.getHours() + "时" + myDate.getMinutes + "分" + myDate.getSeconds() + "秒\n脚本将在" + 时 + "时" + 分 + "分" + 秒 + "秒,准时运行!\n请保持手机处于工作状态，不要锁屏关机等");
                                                }
                                            }
                                        } else {
                                            toastLog("输入错误!秒必须小于等于60");
                                        }
                                    } else {
                                        toastLog("输入错误!秒必须大于等于0");
                                    }
                                }
                            } else {
                                toastLog("输入错误!分钟必须小于等于60");
                            }
                        } else {
                            toastLog("输入错误!分钟必须大于等于0");
                        }
                    }
                } else {
                    toastLog("输入错误!时间必须小于24");
                }
            } else {
                toastLog("输入错误!时间必须大于等于0");
            }
        }
    }

    function wait_Time_over() {
        var i_wait = dialogs.singleChoice("🕗 定时运行\n\n(＾∇＾)ﾉ♪\n请选择一个选项\n计时结束会自动运行", ["1分钟后运行", "5分钟后运行", "10分钟后运行", "30分钟后运行", "一小时后运行", "两小时后运行", "三小时后运行", "四小时后运行", "五小时后运行", "六小时后运行", "七小时后运行", "八小时后运行", "九小时后运行", "十小时后运行"], 2);
        if (i_wait < 0) {
            toastLog("您取消了选择");
            device.cancelKeepingAwake();
            dialogs_js();
        }
        if (i_wait >= 0) {
            context_i_wait = i_wait;
        }
        if (i_wait == 0) {
            var choice_confirm = dialogs.confirm("您选择了1分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");  // 显示一个包含“确定”和“取消”按钮的提示对话框
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 1) {
            var choice_confirm = dialogs.confirm("您选择了5分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 2) {
            var choice_confirm = dialogs.confirm("您选择了10分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 3) {
            var choice_confirm = dialogs.confirm("您选择了30分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 4) {
            var choice_confirm = dialogs.confirm("您选择了一小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 5) {
            var choice_confirm = dialogs.confirm("您选择了两小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 6) {
            var choice_confirm = dialogs.confirm("您选择了三小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 7) {
            var choice_confirm = dialogs.confirm("您选择了四小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 8) {
            var choice_confirm = dialogs.confirm("您选择了五小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 9) {
            var choice_confirm = dialogs.confirm("您选择了六小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 10) {
            var choice_confirm = dialogs.confirm("您选择了七小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 11) {
            var choice_confirm = dialogs.confirm("您选择了八小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 12) {
            var choice_confirm = dialogs.confirm("您选择了九小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 13) {
            var choice_confirm = dialogs.confirm("您选择了十小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
    }

    function waiting_time() {
        // 计时运行脚本
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
                            console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
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
                            console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 7) {
            var Hours = 3;
            for (Hours == 3; Hours >= 0; Hours--) {
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
        }
        if (context_i_wait == 8) {
            var Hours = 4;
            for (Hours == 4; Hours >= 0; Hours--) {
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
        }
        if (context_i_wait == 9) {
            var Hours = 5;
            for (Hours == 5; Hours >= 0; Hours--) {
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
        }
        if (context_i_wait == 10) {
            var Hours = 6;
            for (Hours == 6; Hours >= 0; Hours--) {
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
        }
        if (context_i_wait == 11) {
            var Hours = 7;
            for (Hours == 7; Hours >= 0; Hours--) {
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
        }
        if (context_i_wait == 12) {
            var Hours = 8;
            for (Hours == 8; Hours >= 0; Hours--) {
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
        }
        if (context_i_wait == 13) {
            var Hours = 9;
            for (Hours == 9; Hours >= 0; Hours--) {
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
        }
    }

    // 下面是悬浮窗
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
        dialogs.alert("已经停止脚本");
        log("用户点击了停止脚本");
        exit();
    }

    function Justback() {
        //💝💝💝💝💝使用用户设定的返回方法
        if (context_i_back == 0) {
            toastLog("使用普通返回");
            back();
            sleep(1000);
        }
        if (context_i_back == 1) {
            toastLog("使用Root返回\n确保已给root权限");
            Back();
            sleep(1000);
        }
        if (context_i_back == 2) {
            toastLog("从屏幕中间向左内滑动来返回");
            gestures([context_gestures_speed, [0, height / 2], [500, height / 2]]); // 同时模拟多个手势
            sleep(1000);
        }
        if (context_i_back == 3) {
            toastLog(" 从屏幕中间向从右向内滑动来返回");
            gestures([context_gestures_speed, [width - 1, height / 2], [width - 500, height / 2]]);
            sleep(1000);
        }
        if (context_i_back == 4) {
            toastLog("从屏幕左侧下方向上滑动来返回");
            gestures([context_gestures_speed, [width / 2 - 300, height - 1], [width / 2 - 300, height - 500]]);
            sleep(1000);
        }
        if (context_i_back == 5) {
            toastLog("从屏幕左侧下面向上面滑动来返回");
            gestures([context_gestures_speed, [width / 2 + 300, height - 1], [width / 2 + 300, height - 500]]);
            sleep(1000);
        }
    }

    if (T == 1) {
        log("使用“悬浮日志”");

        function toastLog(message) {
            log(message);
            var myDate = new Date();
            ui.run(() => {
                w.WZ.setText(myDate.getHours() + "时" + myDate.getMinutes() + "分" + myDate.getSeconds() + "秒:" + message + "\n" + w.WZ.getText());
                return true;
            });
        }
        var w = floaty.rawWindow(
            <card bg="#80000000">
                <vertical align="center">
                    <img src="https://code.aliyun.com/orange_shirt/OrangeJs/raw/master/OrangeJs-logoWhite.png" h="30" margin="0 10 0 5" /> // 黑色logo
                    <text text="─ 当前脚本运行日志 ─" textSize="15" color="#FFFFFF" textStyle="bold" gravity="center" margin="0 0 0 5" />
                    <text id="WZ" text="" textSize="15" color="#FFFFFF" marginLeft="10" gravity="left" />
                </vertical>
            </card>
        );
        w.setSize(device.width, 500);  // 设置悬浮窗宽高。
        w.setTouchable(false); // 是否可触摸
        w.SetPosition(0, device.height - 500); // 指定悬浮窗的布局，创建并显示一个原始悬浮窗
    } else if (T == 0) {
        log("使用脚本自带“吐司”");
    }

    function SendTAF(context_XX) { // 发送文本
        try {
            var str = context_XX;
            if (str.search("/storage/emulated/0/") == 0) {
                log("文件路径:" + str);
                if (files.exists(str) == true) {
                    var str = str.replace("/storage/emulated/0/", "");
                    var n = str.search("/");
                    // 判断发送消息是否为➕号
                    if (id("aja").findOnce() != null) { //7.0.12
                        id("aja").findOnce().click();
                        toastLog("已尝试点击“加号菜单”按钮");
                        sleep(2000);
                        if (id("com.tencent.mm:id/p6").text("文件").findOnce() != null) {
                            id("com.tencent.mm:id/p6").text("文件").findOnce().parent().parent().parent().click();
                            toastLog("已尝试点击“文件”按钮");
                            sleep(2000);
                            if (id("com.tencent.mm:id/buo").findOnce() != null) {
                                id("com.tencent.mm:id/buo").findOnce().click();
                                toastLog("已尝试点击“切换存储目录”按钮");
                                sleep(2000);
                                if (id("com.tencent.mm:id/cqq").text("手机存储").findOnce() != null) {
                                    id("com.tencent.mm:id/cqq").text("手机存储").findOnce().parent().click();
                                    toastLog("已尝试点击“手机存储”按钮");
                                    sleep(2000);
                                }
                            }
                        }
                        // 判断输入框是否有文字，如果有就替换
                    } else if (id("ajs").findOnce() != null && id("ajs").findOnce().text() != "") { //7.0.12
                        id("ajs").findOnce().setText("");
                        toastLog("已尝试清除输入框文字");
                        sleep(2000);
                        SendTAF(context_XX);
                    } else {
                        toastLog("未知错误!找不到加号按钮!");
                        sleep(2000);
                    }
                    // 回到顶端
                    function GoAttheTop() {
                        while (className("android.widget.ListView").id("com.tencent.mm:id/bus").findOnce() != null) { //7.0.12到顶部
                            if (id("com.tencent.mm:id/bun").text("没有文件").findOnce() != null) {
                                toastLog("停止！没有文件！");
                                break;
                            } else {
                                var m = className("android.widget.TextView").id("com.tencent.mm:id/cqq").findOnce().text();
                                for (let l = 3; l > 0; l--) {
                                    className("android.widget.ListView").id("com.tencent.mm:id/bus").scrollUp();
                                    sleep(100);
                                }
                                if (className("android.widget.TextView").id("com.tencent.mm:id/cqq").findOnce().text() == m) {
                                    toastLog("已到达顶部");
                                    break;
                                } else {
                                    className("android.widget.ListView").id("com.tencent.mm:id/bus").scrollUp();
                                }
                            }
                        }
                    }
                    while (n >= 0) {
                        if (n >= 0) {
                            var i = 0;
                            for (i = 0; i <= n; i++) {
                                if (i != n) {
                                    if (g != null) {
                                        var g = g + str[i];
                                    } else {
                                        var g = str[i];
                                    }
                                } else {
                                    var A = g;
                                }
                            }
                            log(A);
                            var str = str.replace(A + "/", "");
                            GoAttheTop();
                            while (className("android.widget.ListView").id("com.tencent.mm:id/bus").findOnce() != null) { //7.0.12
                                if (className("android.widget.TextView").id("com.tencent.mm:id/cqq").text(A).findOnce() != null) {
                                    className("android.widget.TextView").id("com.tencent.mm:id/cqq").text(A).findOnce().parent().parent().click();
                                    toastLog("已尝试点击：" + A + "（文件夹）");
                                    sleep(2000);
                                    break;
                                } else {
                                    className("android.widget.ListView").id("com.tencent.mm:id/bus").scrollDown();
                                    sleep(100);
                                }
                            }
                        } else {
                            var A = str;
                            log(A);
                        }
                        var g = null;
                        var n = str.search("/");
                    }
                    log(str);
                    var A = str;
                    GoAttheTop();
                    while (className("android.widget.ListView").id("com.tencent.mm:id/bus").findOnce() != null) { //7.0.12选中文件
                        if (className("android.widget.TextView").id("com.tencent.mm:id/cqq").text(A).findOnce() != null) {
                            className("android.widget.TextView").id("com.tencent.mm:id/cqq").text(A).findOnce().parent().parent().child(2).click();
                            toastLog("已尝试勾选：" + A + "（文件）");
                            sleep(2000);
                            break;
                        } else {
                            className("android.widget.ListView").id("com.tencent.mm:id/bus").scrollDown();
                            sleep(100);
                        }
                    }
                    if (className("android.widget.Button").id("com.tencent.mm:id/ch").text(str).findOnce() != null && id("com.tencent.mm:id/ch").findOnce() != null) {
                        id("com.tencent.mm:id/ch").findOnce().click();
                        toastLog("已尝试点击发送文件按钮");
                        sleep(3000);
                        if (className("android.widget.Button").id("com.tencent.mm:id/dj6").text("发送").findOnce() != null) {
                            className("android.widget.Button").id("com.tencent.mm:id/dj6").text("发送").findOnce().click();
                            toastLog("已尝试点击“确定发送”按钮");
                            sleep(2000);
                            if (className("android.widget.ImageView").id("com.tencent.mm:id/dn").desc("返回").findOnce() != null) {
                                className("android.widget.ImageView").id("com.tencent.mm:id/dn").desc("返回").findOnce().parent().click();
                                toastLog("已尝试点击返回聊天界面");
                                sleep(2000);
                            }
                            device.cancelKeepingAwake();
                            dialogs.alert("自动微信发消息：\n脚本已运行完成");
                            log("脚本已运行完成");
                            exit();
                        }
                    }
                } else {
                    toastLog("您的设备中没有此文件！请检查文件路径：" + str);
                }
            } else {
                log("文字消息：" + str);
                if (className("android.widget.EditText").id("com.tencent.mm:id/ajs").findOnce() != null) { //7.0.12
                    className("android.widget.EditText").id("com.tencent.mm:id/ajs").findOnce().setText(str);
                    sleep(2000);
                    if (id("com.tencent.mm:id/amb").findOnce() != null) {
                        id("com.tencent.mm:id/amb").findOnce().click();
                        toastLog("已点击“发送”按钮");
                        device.cancelKeepingAwake();
                        dialogs.alert("自动微信发消息：\n脚本已运行完成");
                        log("脚本已运行完成");
                        exit();
                    } else {
                        toastLog("当前界面找不到消息发送按钮，正在重新进入搜寻……");
                        sleep(2000);
                        OpenWXcontent();
                    }
                } else {
                    toastLog("当前非正确的联系界面，正在重新进入搜寻……");
                    sleep(2000);
                    OpenWXcontent();
                }
            }
        } catch (e) {
            log(e);
            OpenWXcontent();
            Doit();
        }
    }

    // 自动打开微信至主页通讯录界面
    function OpenWXcontent() {
        try {
            while (true) {
                if (id("civ").className("android.widget.TextView").text("通讯录").findOnce() != null) { //7.0.12
                    id("civ").className("android.widget.TextView").text("通讯录").findOne().parent().parent().click();
                    toastLog("已尝试点击“通讯录”按钮");
                    sleep(2000);
                } else if (currentPackage() == "com.tencent.mm") {
                    Justback();  //💝💝💝💝💝使用用户设定的返回方法
                    toastLog("已经处于微信中但非界面，正在尝试返回主界面");
                    sleep(2000);
                } else {
                    app.startActivity({
                        action: "android.intent.action.VIEW", //此处可为其他值
                        packageName: "com.tencent.mm",
                        className: "com.tencent.mm.ui.LauncherUI"
                    });
                    toastLog("当前未处于微信中，正在重新打开微信");
                    console.warn("当前活动：" + currentActivity() + "，当前包名：" + currentPackage() + "当前应用名：" + getAppName(currentPackage()));
                    sleep(3000);
                }
            }
        } catch (e) {
            log("打开微信出现错误" + e);
            OpenWXcontent();
        }
    }

    function Doit() {  // 处于微信打开之聊天界面
        try {
            while (true) {
                if (id("com.tencent.mm:id/dhg").findOnce() != null &&
                    className("android.widget.RelativeLayout").id("com.tencent.mm:id/dhg").findOnce() != null &&
                    id("com.tencent.mm:id/dhg").desc("搜索").findOnce() != null) {
                    log("7.0.12");
                    id("dhg").findOne().click();
                    toast("已尝试点击“搜索”按钮");
                    sleep(2000);
                    if (id("com.tencent.mm:id/bem").findOnce() != null) {
                        id("com.tencent.mm:id/bem").findOnce().setText(context_DX);
                        toastLog("已设置搜索文字");
                        sleep(2000);
                        if (id("com.tencent.mm:id/g2t").text(context_DX).findOnce() != null) {
                            id("com.tencent.mm:id/g2t").text(context_DX).findOnce().parent().parent().parent().parent().click();
                            toastLog("已尝试点击设定的“联系对象”");
                            sleep(2000);
                            if (id("com.tencent.mm:id/b7k").text("公众号").findOnce() != null) {
                                id("com.tencent.mm:id/g2t").findOnce().click();
                                click(context_DX)[0];
                                toastLog("已尝试点击“公众号”");
                                sleep(2000);
                            } else {
                                log("非公众号");
                            }// 发送
                            SendTAF(context_XX);
                        } else {
                            var WrongDX = 0;
                            WrongDX++;
                            toastLog("当前界面未找到设定的联系名称，正在重新进入搜索....");
                            if (WrongDX >= 3) {
                                dialogs.alert("无法找到配置的联系名称，请确认您输入的联系名称是否正确", "在输入联系名称时请确保完全正确，您可重新运行脚本并在脚本配置中修改联系名称配置");
                                exit();
                            }
                            OpenWXcontent();
                        }
                    } else {
                        toastLog("当前界面未找到搜索框，正在重新进入搜索....");
                        OpenWXcontent();
                    }
                } else {
                    toastLog("当前未处于“微信通讯录”界面，正在尝试回到此界面");
                    sleep(2000);
                    OpenWXcontent();
                }
            }
        } catch (e) {
            log("打开之聊天界面时出现错误" + e);
            OpenWXcontent();
            Doit();
        }
    }
    device.wakeUp(); // 唤醒设备
    device.keepScreenOn(3600 * 1000); // 屏幕常亮
    Doit();
}
