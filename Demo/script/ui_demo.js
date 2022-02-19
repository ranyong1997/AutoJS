/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-02-18 16:28:03
 * @LastEditTime: 2022-02-19 10:17:13
 */
"ui";

// 导包
importClass(android.content.Intent)
importClass(android.net.Uri)
importClass(java.io.File)
// 设置模式
context_DayOrNight = 1
// 透明导航栏
activity.window.addFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
context_LogomarginTop = "0"

// 保存本地数据
function setStorageData(name, key, value) {
    const storage = storages.create(name)
    storage.put(key, value)
}

// 读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name)
    if (storage.contains(key)) {
        return storage.get(key, "")
    }
}

// 检测无障碍权限是否开启
function enableAbs() {
    importClass(android.content.Context)
    importClass(android.provider.Settings)
    var packageName = context.getPackageName()
    var absPermittedByshell = false
    try {
        var enagledServices = Settings.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES)
        log('当前已经开启的辅助服务：' + enagledServices)
        if (enabledServices.indexOf(packageName) >= 0 && auto.service != null) {
            log('已经开启了辅助服务')
        } else {
            var Services = enabledServices + ':' + packageName + "/com.stardust.autojs.core.accessibility.AccessibilityService"
            Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services)
            Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1')
            log("开启辅助服务成功")
        }
        return true
    } catch (error) {
        if (absPermittedByshell == false && shell("pm grant " + packageName + " android.permission.WRITE_SECURE_SETTINGS").code == 0) {
            log("已经成功使用Shell开启无障碍服务功能")
            absPermittedByshell = true
            return this.enableAbs()
        } else {
            if (absPermittedByshell == true) {
                log("shell无法开启无障碍服务功能，但无法真正开启，请手动开启")
                return false
            } else {
                log("使用shell开启授权失败")
                return false
            }
        }
    }
}

// 获取长宽高
function clacAspectRatio(fromWidth, fromHeight, toWidthOrHeight, isWidth) {
    if (isWidth == true) {
        return fromHeight * (toWidthOrHeight / fromWidth)
    } else {
        return fromWidth * (toWidthOrHeight / fromHeight)
    }
}

// 设置日间模式
function setDayMode() {
    context_framebg = "#FFFFFF" // 全局背景
    context_textcolor = "#000000" // 全局文字颜色
    context_texBg = "#FAFAFA" // 文本背景
    context_Fgb = "#EEEEEE" // 分割线颜色
    context_SettingsCard = "#F5F5F5" //设置卡片颜色
    context_LogomarginTop = getStorageData("DayUi", "LogomarginTop");
    context_SunMoon = "@drawable/ic_wb_sunny_black_48dp"; //☀️
    // context_Logo = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_logo.png";
    context_Logo = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_logo.png";
    context_TopPics = getStorageData("DayUiPicture", "TopPics");
    context_TopPics_Copyright = getStorageData("DayUiPicture", "TopPicsCopyright");
    context_BottomPics = getStorageData("DayUiPicture", "BottomPics");
    context_BottomPics_Copyright = getStorageData("DayUiPicture", "BottomPicsCopyright");
    if (context_TopPics == undefined) {
        context_TopPics = "http://www.google.com"
    }
    if (context_BottomPics == undefined) {
        context_BottomPics = "http://www.google.com"
    }
    if (context_TopPics.search("file://") == 0 && images.read(context_TopPics.replace("file://", "")) == null) {
        let img = images.read(context_TopPics.replace("file://", ""))
        imgWidth = img.getWidth()
        imgHeight = img.getHeight()
        context_TopPics = device.width
        context_TopPics_Height = Math.round(clacAspectRatio(imgWidth, imgHeight, device.width, true))
    } else {
        context_TopPics = 0
        context_TopPics_height = 0
    }
    if (context_BottomPics.search("file://") == 0 && images.read(context_BottomPics.replace("file://", "")) == null) {
        let img = images.read(context_BottomPics.replace("file://", ""))
        imgWidth = img.getWidth()
        imgHeight = img.getHeight()
        context_BottomPics_width = device.width
        context_BottomPics_height = Math.round(clacAspectRatio(imgWidth, imgHeight, context_BottomPics_width, true))
    } else {
        context_BottomPics_width = 0
        context_BottomPics_height = 0
    }
}

// 设置夜间模式
function setNightMode() {
    context_framebg = "#000000" // 全局背景
    context_textcolor = "#FFFFFF" // 全局文字颜色
    context_texBg = "#000000" // 文本背景
    context_Fgb = "#50EEEEEE" // 分割线颜色
    context_SettingsCard = "#616161" //设置卡片颜色
    context_LogomarginTop = getStorageData("NightUi", "LogomarginTop");
    context_SunMoon = "@drawable/ic_brightness_2_black_48dp"; //🌙
    // context_Logo = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_logo.png";
    context_Logo = "https://gitee.com/ran_yong/auto.js/raw/master/Log/ranyongJS-logoWhite.png";
    context_TopPics = getStorageData("DayUiPicture", "TopPics");
    context_TopPics_Copyright = getStorageData("DayUiPicture", "TopPicsCopyright");
    context_BottomPics = getStorageData("DayUiPicture", "BottomPics");
    context_BottomPics_Copyright = getStorageData("DayUiPicture", "BottomPicsCopyright");
    if (context_TopPics == undefined) {
        context_TopPics = "http://www.google.com"
    }
    if (context_BottomPics == undefined) {
        context_BottomPics = "http://www.google.com"
    }
    if (context_TopPics.search("file://") == 0 && images.read(context_TopPics.replace("file://", "")) == null) {
        let img = images.read(context_TopPics.replace("file://", ""))
        imgWidth = img.getWidth()
        imgHeight = img.getHeight()
        context_TopPics = device.width
        context_TopPics_Height = Math.round(clacAspectRatio(imgWidth, imgHeight, device.width, true))
    } else {
        context_TopPics_width = 0
        context_TopPics_height = 0
    }
    if (context_BottomPics.search("file://") == 0 && images.read(context_BottomPics.replace("file://", "")) == null) {
        let img = images.read(context_BottomPics.replace("file://", ""))
        imgWidth = img.getWidth()
        imgHeight = img.getHeight()
        context_BottomPics_width = device.width
        context_BottomPics_height = Math.round(clacAspectRatio(imgWidth, imgHeight, context_BottomPics_width, true))
    } else {
        context_BottomPics_width = 0
        context_BottomPics_height = 0
    }
}

// 判断何时设置日、夜间模式
function WhatNowColor() {
    if (getStorageData("DayNightSetting", "AutoDayNight") != undefined) {
        var NightTime = getStorageData("DayNightSetting", "NightTime")
        var DayTime = getStorageData("DayNightSetting", "DayTime")
        var myDate = new Date()
        if (Number(NightTime) > Number(DayTime) && myDate.getHours() >= Number(NightTime) || Number(NightTime) > Number(DayTime) && myDate.getHours() < Number(DayTime) || Number(NightTime) < Number(DayTime) && myDate.getHours() >= Number(NightTime) && myDate.getHours() < Number(DayTime)) {
            return 0
        } else {
            return 1
        }
    }
}
if (WhatNowColor() != context_DayOrNight && getStorageData("DayNightSetting", "AutoDayNight") != undefined) {
    if (WhatNowColor() == 1) {
        context_DayOrNight = 1
        setDayMode()
    } else {
        context_DayOrNight = 0
        setDayMode()
    }
}

// 进行md5加密
function md5(string) {
    return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5")
        .digest(java.lang.String(string).getBytes())).toString(4 * 4);
}

ui.emitter.on("back_pressed", e => {
    try {
        clearInterval(contextJdtX)
    } catch (error) { throw error }
    if (context_NowUi != "SigUp" && context_NowUi != "mainUi") {
        mainUi()
        error.consumed = true
    } else if (getStorageData("uiProtectSetting", "UiProtext") != undefined) {
        let view = ui.inflate(
            <vertical bg="{{context_framebg}}">
                <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                    <img src="@drawable/ic_lock_outline_black_48dp" w="20" h="20" margin="18 10 2 0" tint="{{context_textColor}}" gravity="left" />
                    <text text="UI界面锁定" textSize="15" textStyle="bold" margin="0 10 0 0" textColor="{{context_textColor}}" />
                </linear>
                <text id="tip" textSize="10" margin="20 5 10 10" textColor="{{context_textColor}}" />
            </vertical>, null, false)
        view.tip.setText("• 如需保留界面和后台脚本，请点按Home键或直接切换到其它应用中\n• 若当前无定时任务且需要强制关闭界面，请点击“管理运行脚本”");
        dialogs.builds({
            customView: view,
            wrapInScrollView: false,
            autoDismiss: false
        }).show()
        e.consumed = true
    }
})

ui.emitter.on("resume", function () {
    if (WhatNowColor() == 1 && WhatNowColor() != context_DayOrNight) {
        context_DayOrNight = 1
        setDayMode()
        refreshUI()
    } else if (WhatNowColor() == 0 && WhatNowColor() != context_DayOrNight) {
        context_DayOrNight = 0
        setDayMode()
        refreshUI()
    }
    function refreshUI() {
        if (context_NowUi == "mainUi") {
            mainUi()

        } else if (context_NowUi == "SettingsUI") {
            SettingsUI()
        } else if (context_NowUi == "AboutApp") {
            AboutApp()
        } else if (context_NowUi == "SP") {
            SP()
        } else if (context_NowUi == "TalkToDeveloper") {
            TalkToDeveloper()
        } else if (context_NowUi == "SignUp") {
            SignUp()
        }
    }
    try {
        ui.autoService.checked = auto.service != null
    } catch (error) {
        throw error
    }
})
if (getStorageData("Sign", "SignKey") != undefined && md5(getStorageData("SignUp", "SignKey")) == "109e1be70ecf784109576e7a5df1750a") {
    mainUi()
} else {
    if (context_DayOrNight == 1) {
        setDayMode()
    } else {
        setNightMode()
    }
    SignUp()
}

// 写主ui界面
function mainUi() {
    context_NowUi = "mainUi"
    if (WhatNowColor() != context_DayOrNight && getStorageData("DayNightSetting", "AutoDayNight") != undefined) {
        if (WhatNowColor() == 1) {
            context_DayOrNight = 1
            setDayMode()
        } else {
            context_DayOrNight = 0
            setDayMode()
        }
    }
    if (context_DayOrNight == 1) {
        setDayMode()
    } else {
        setNightMode()
    }
    function Color(color) {
        return android.graphics.Color.parseColor(color)
    }
    function GradientDrawable(orientation, color) {
        var colors = []
        color.forEach(color => colors.push(Color(color)))
        return new android.graphics.drawable.GradientDrawable(android.graphics.GradientDrawable.Orientation[orientation], colors)
    }
    ui.layout(
        <scroll bg="{{context_framebg}}">
            <frame id="main" background="{{context_framebg}}">
                <vertical align="center" margin="0">
                    <card w="{{context_TopPics_width}}px" h="{{context_TopPics_height}}px" cardElevation="0dp" gravity="center_vertical">
                        <img id="Pics" src="{{context_TopPics}}" scaleType="fitXY" />
                        <text id="CopyrightTop" textColor="{{context_textColor}}" textSize="5" gravity="bottom|right" margin="2 0 5 2" padding="0 0 0 0" />
                    </card>
                    <img id="UiLogo" src="{{context_Logo}}" h="30" marginTop="{{context_LogomarginTop}}" marginBottom="10" />
                    <linear orientation="horizontal" align="left">
                        <HorizontalScrollView>
                            <linear orientation="horizontal" align="left" h="70" padding="0 10">
                                <card w="150dp" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center_vertical" cardBackgroundColor="{{context_textColor}}" alpha="0.7">
                                    <card h="40" w="*" margin="5 0 5 0" cardCornerRadius="20dp" cardElevation="0dp" align="center" cardBackgroundColor="{{context_framebg}}">
                                        <Switch id="autoService" margin="7 0" text="无障碍服务" textColor="{{context_textColor}}" gravity="center" textStyle="bold" checked="{{auto.service != null}}" textSize="12sp" />
                                    </card>
                                </card>
                                <card w="150dp" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center" cardBackgroundColor="{{context_textColor}}" alpha="0.7">
                                    <card id="StopAllScript" w="*" h="40" margin="5 0 5 0" cardCornerRadius="20dp" cardElevation="0dp" align="center" cardBackgroundColor="{{context_framebg}}" foreground="?selectableItemBackground">
                                        <text text="管理运行脚本" textStyle="bold" color="{{context_textColor}}" gravity="center" size="12" />
                                    </card>
                                </card>
                                <card w="150dp" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center" cardBackgroundColor="{{context_textColor}}" alpha="0.7">
                                    <card id="ViewLog" w="*" h="40" margin="5 0 5 0" cardCornerRadius="20dp" cardElevation="0dp" align="center" cardBackgroundColor="{{context_framebg}}" foreground="?selectableItemBackground" clickable="true">
                                        <text text="查看运行日志" textStyle="bold" color="{{context_textColor}}" gravity="center" size="12" />
                                    </card>
                                </card>
                                <card w="150dp" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center" cardBackgroundColor="{{context_textColor}}" alpha="0.7">
                                    <card id="RefreshUI" w="*" h="40" margin="5 0 5 0" cardCornerRadius="20dp" cardElevation="0dp" align="center" cardBackgroundColor="{{context_framebg}}" foreground="?selectableItemBackground" clickable="true">
                                        <text text="重启刷新界面" textStyle="bold" color="{{context_textColor}}" gravity="center" size="12" />
                                    </card>
                                </card>
                                <card w="150dp" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center" cardBackgroundColor="{{context_textColor}}" alpha="0.7">
                                    <card id="Settings" w="*" h="40" margin="5 0 5 0" cardCornerRadius="20dp" cardElevation="0dp" align="center" cardBackgroundColor="{{context_framebg}}" foreground="?selectableItemBackground" clickable="true">
                                        <text text="脚本设置" textStyle="bold" color="{{context_textColor}}" gravity="center" size="12" />
                                    </card>
                                </card>
                            </linear>
                        </HorizontalScrollView>
                    </linear>
                    <card h="1" margin="5 5" cardCornerRadius="1dp" cardElevation="0dp" gravity="center_vertical" cardBackgroundColor="{{context_Fgx}}" />
                    <linear orientation="horizontal" align="left" margin="0 5 0 0">
                        <card id="R_JD" layout_weight="50" h="120" cardCornerRadius="10dp" cardElevation="2dp" align="left" margin="5 0 3 5" foreground="?selectableItemBackground">
                            <View id="Jingdongbg" bg="#{{context_JDbgColor}}" h="*" w="*" />
                            <linear orientation="horizontal" align="left" margin="0">
                                <img src="https://app.jd.com/uploads/client-1.png" w="30" h="26" margin="15 18 0 0" />
                                <vertical padding="0 0" h="auto">
                                    <text text="京东" typeface="sans" textStyle="bold" color="#FFFFFF" gravity="center" size="15" margin="0 23 0 0" />
                                </vertical>
                            </linear>
                            <card w="*" h="40" cardCornerRadius="5dp" cardElevation="0dp" margin="20 20 20 0" gravity="center" layout_gravity="center">
                                <View bg="#90{{context_JDbgColor}}" />
                                <spinner id="sp_Jd1" entries="种豆得豆自动脚本|自动宠汪汪" textColor="#FFFFFF" align="center" marginLeft="10" textSize="15" gravity="center" />
                            </card>
                        </card>
                        <card h="120" layout_weight="50" cardCornerRadius="10dp" cardElevation="2dp" align="left" margin="5 0 3 5">
                            <View id="Weibobg" bg="#{{context_WBbgColor}}" h="*" w="*" />
                            <linear orientation="horizontal" align="left" margin="0">
                                <img src="https://pp.myapp.com/ma_icon/0/icon_9926_1588143998/96" w="20" h="20" margin="20 23 0 0" />
                                <vertical padding="0 0" h="auto">
                                    <text text="微博" typeface="sans" textStyle="bold" color="#FFFFFF" gravity="center" size="15" margin="5 23 0 0" />
                                </vertical>
                            </linear>
                            <card w="*" h="40" cardCornerRadius="5dp" cardElevation="0dp" margin="20 20 20 0" gravity="center" layout_gravity="center">
                                <View w="*" h="*" bg="#90{{context_WBbgColor}}" />
                                <text id="ScriptNine" text="微博任务自动脚本" typeface="sans" color="#FFFFFF" gravity="center" size="15" marginTop="0" bg="?attr/selectableItemBackground" clickable="true" />
                            </card>
                        </card>
                    </linear>
                    <linear orientation="horizontal" align="left" margin="0">
                        <card h="120" layout_weight="50" cardCornerRadius="10dp" cardElevation="2dp" align="left" margin="3 0 5 5">
                            <View id="Weixinbg" bg="#{{context_WXbgColor}}" h="*" w="*" />
                            <linear orientation="horizontal" align="left" margin="0">
                                <img src="http://pp.myapp.com/ma_icon/0/icon_10910_1577346809/256" w="20" h="20" margin="20 23 0 0" />
                                <vertical padding="0 0" h="auto">
                                    <text text="微信" typeface="sans" textStyle="bold" color="#FFFFFF" gravity="center" size="15" margin="5 23 0 0" />
                                </vertical>
                            </linear>
                            <card w="*" h="40" cardCornerRadius="5dp" cardElevation="0dp" margin="20 20 20 0" gravity="center" layout_gravity="center">
                                <View w="*" h="*" bg="#90{{context_WXbgColor}}" />
                                <text id="ScriptOne" text="自动微信发消息" typeface="sans" color="#FFFFFF" gravity="center" textSize="15" marginTop="0" bg="?attr/selectableItemBackground" clickable="true" />
                            </card>
                        </card>
                        <card h="120" layout_weight="50" cardCornerRadius="10dp" cardElevation="2dp" align="left" margin="5 0 3 5">
                            <View id="QQbg" bg="#{{context_QQbgColor}}" h="*" w="*" />
                            <linear orientation="horizontal" align="left" margin="0">
                                <img src="http://pp.myapp.com/ma_icon/0/icon_6633_1584375640/256" w="20" h="20" margin="20 23 0 0" />
                                <vertical padding="0 0" h="auto">
                                    <text text="QQ" typeface="sans" textStyle="bold" color="#FFFFFF" gravity="center" size="15" margin="5 23 0 0" />
                                </vertical>
                            </linear>
                            <card w="*" h="40" cardCornerRadius="5dp" cardElevation="0dp" margin="20 20 20 0" gravity="center" layout_gravity="center">
                                <View w="*" h="*" bg="#90{{context_QQbgColor}}" />
                                <text id="ScriptThi" text="自动动态点赞" typeface="sans" color="#FFFFFF" gravity="center" size="15" marginTop="0" bg="?attr/selectableItemBackground" clickable="true" />
                            </card>
                        </card>
                    </linear>
                    <card h="1" margin="5 0" cardCornerRadius="1dp" cardElevation="0dp" gravity="center_vertical" cardBackgroundColor="{{context_Fgx}}" />

                    <linear orientation="horizontal" gravity="center" margin="5 15 5 15" >
                        <img src="{{context_SunMoon}}" id="changeColor" w="30" h="30" tint="{{context_textColor}}" layout_weight="20" gravity="center" foreground="?attr/selectableItemBackground" clickable="true" />
                        <text id="Privacy_Security" text="隐私与安全" color="#BDBDBD" textSize="13sp" layout_weight="20" gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        <text id="JoinQQGroup" text="加入QQ群" color="#BDBDBD" textSize="13sp" layout_weight="20" gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        <text id="TalktoDeveloper" text="反馈问题" color="#BDBDBD" textSize="13sp" layout_weight="20" gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                        <text id="AboutApp" text="关于软件" color="#BDBDBD" textSize="13sp" layout_weight="20" gravity="center" bg="?attr/selectableItemBackground" clickable="true" />
                    </linear>
                    <card w="{{context_BottomPics_width}}px" h="{{context_BottomPics_height}}px" cardElevation="0dp" gravity="center_vertical" cardBackgroundColor="{{context_SettingsCard}}">
                        <img src="{{context_BottomPics}}" scaleType="fitXY" />
                        <text id="CopyrightBottom" textColor="{{context_textColor}}" textSize="5" gravity="bottom|right" margin="2 0 0 20" padding="0 0 0 0" />
                    </card>
                </vertical>
            </frame>
        </scroll>
    );
    if (getStorageData("mainUi", "NewWay") == undefined) {
        let view = ui.inflate(
            <vertical bg="{{context_framebg}}">
                <linear orientation="horizontal" align="left" margin="10" paddingTop="0">
                    <img src="@drawable/ic_fiber_new_black_48dp" w="20" h="20" tint="#3EC3FE" layout_gravity="center" />
                    <text text="新的操作方式" textStyle="bold" textSize="15" textColor="#3EC3FE" layout_gravity="center" />
                    <linear orientation="horizontal" w="match_parent" gravity="right||center">
                        <img id="ExitScript" src="@drawable/ic_clear_black_48dp" w="35" h="35" tint="#000000" foreground="?attr/selectableItemBackground" clickable="true" />
                    </linear>
                </linear>
                <linear gravity="center">
                    <img src="https://gitee.com/Orange_shirt/OrangeJs/raw/master/OtherRes/%E6%96%B0%E7%9A%84%E6%93%8D%E4%BD%9C%E6%96%B9%E5%BC%8F.jpg" scaleType="fitXY" w="300" h="200" gravity="center" />
                </linear>
            </vertical>, null, false)
        view.ExitScript.click(() => {
            DHK.dismiss();
        })
        let DHK = dialogs.build({
            customView: view,
            title: "新的操作方式",
            wrapInScrollView: false,
            cancelable: false,
            autoDismiss: true
        }).show()
        setStorageData("mainUi", "NewWay", "true")
    }
    if (context_TopPics != "http://www.googole.com" && context_TopPics_Copyright != undefined) {
        ui.CopyRightTop.setText(context_TopPics_Copyright)
    }
    if (context_BottomPics != "http://www.googole.com" && context_BottomPics_Copyright != undefined) {
        ui.CopyrightBottom.setText(context_BottomPics_Copyright)
    }
    if (getStorageData("ColorSetting", "GradientColor") != undefined) {
        ui.Weibobg.backgroundDrawable = GradientDrawable("TL_BR", ["#50" + context_JBScolor, "#" + context_WBbgColor, "#" + context_WBbgColor, "#" + context_WBbgColor]);
        ui.Weixinbg.backgroundDrawable = GradientDrawable("TL_BR", ["#50" + context_JBScolor, "#" + context_WXbgColor, "#" + context_WXbgColor, "#" + context_WXbgColor]);
        ui.QQbg.backgroundDrawable = GradientDrawable("TL_BR", ["#50" + context_JBScolor, "#" + context_QQbgColor, "#" + context_QQbgColor, "#" + context_QQbgColor, "#" + context_QQbgColor]);
        ui.Jingdongbg.backgroundDrawable = GradientDrawable("TL_BR", ["#50" + context_JBScolor, "#" + context_JDbgColor, "#" + context_JDbgColor, "#" + context_JDbgColor]);
    }
    ui.UiLogo.click(() => {
        let view = ui.inflate(
            <vertical padding="25 0" bg="{{context_framebg}}">
                <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                    <img src="@drawable/ic_unfold_more_black_48dp" h="30" marginTop="3" tint="{{context_textColor}}" layout_gravity="center" />
                    <text text="上间距调整" textSize="15" textStyle="bold" margin="0 5 10 0" textColor="{{context_textColor}}" layout_gravity="center" />
                </linear>
                <text id="nJj" textSize="10" margin="10 5 10 5" textColor="{{context_textColor}}" />
                <input id="TopMargin" hint="请输入10～100的数字" inputType="number" textColor="{{context_textColor}}" textColorHint="#9E9E9E" />
                <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                    <card layout_weight="50" h="30" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#F44336">
                        <text id="Determine" text="取消" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                    </card>
                    <card layout_weight="50" h="30" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#4CAF50">
                        <text id="cancel" text="确定" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                    </card>
                </linear>
            </vertical>, null, false);
        if (context_DayOrNight == 1) {
            view.nJj.setText("当前上间距为：" + getStorageData("DayUi", "LogomarginTop"));
        } else {
            view.nJj.setText("当前上间距为：" + getStorageData("NightUi", "LogomarginTop"));
        }
        view.Determine.click(() => {
            DHK.dismiss();
        });
        view.cancel.click(() => {
            let a = view.TopMargin.getText();
            if (Number(a) > 100) {
                view.TopMargin.setError("数值不能大于100");
            } else if (Number(a) < 10) {
                view.TopMargin.setError("数值不能小于10");
            } else {
                if (context_DayOrNight == 0 || context_DayOrNight == "0") {
                    setStorageData("NightUi", "LogomarginTop", a.toString());
                } else if (context_DayOrNight == 1 || context_DayOrNight == "1") {
                    setStorageData("DayUi", "LogomarginTop", a.toString());
                }
                DHK.dismiss();
                mainUi();
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <img src="@drawable/ic_check_circle_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                        <text id="tio" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                    </vertical>
                );
                view.tio.setText("上间距已调整为" + a.toString() + "\n如未变化请刷新界面");
                dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
            }
        });
        var DHK = dialogs.build({
            customView: view,
            wrapInScrollView: false,
            autoDismiss: false
        }).show();
    });
    ui.autoService.on("check", function (checked) {
        if (checked && auto.service == null) {
            var absPermittedByshell = false;
            try {
                var en = enableAbs();
            } catch (e) {
                log(e);
                var en = false;
            }
            if (en != true) {
                app.startActivity({
                    action: "android.settings.ACCESSIBILITY_SETTINGS"
                });
            }
        }
        if (!checked && auto.service != null) {
            let view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <img src="@drawable/ic_warning_black_48dp" h="20" marginTop="3" tint="#F44336" layout_gravity="center" />
                        <text text="您确定要关闭“无障碍服务”吗？" textSize="15" textStyle="bold" margin="0 5 10 0" textColor="#F44336" />
                    </linear>
                    <text text="本软件内的所有脚本均需要“无障碍服务”，若您关闭“无障碍服务”，本软件内的所有脚本都将立即无法工作，请确认" textStyle="bold" textSize="10" margin="10 5 10 5" textColor="#D32F2F" />
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#F44336">
                            <text id="Determine" text="确认关闭" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#4CAF50">
                            <text id="cancel" text="保持开启" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                </vertical>, null, false);
            view.cancel.click(() => {
                ui.autoService.setChecked(true);
                DHK.dismiss();
            });
            view.Determine.click(() => {
                auto.service.disableSelf();
                DHK.dismiss();
            });
            var DHK = dialogs.build({
                customView: view,
                wrapInScrollView: false,
                autoDismiss: false,
                cancelable: false
            }).show();
        }
    });
    function RunScript(ScriptUrl, ScriptName, AppPackageName) {
        if (app.getAppName(AppPackageName) != null && auto.service != null) {
            threads.start(function () {
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <text id="scriptText" textSize="15" margin="10 5 10 5" textColor="{{context_textColor}}" />
                        <text id="Network" textSize="10" margin="10 0 10 0" textColor="{{context_textColor}}" alpha="0.9" />
                        <text id="tips" textSize="8" margin="10 5 10 0" textColor="{{context_textColor}}" alpha="0.9" />
                        <progressbar indeterminate="true" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" />
                    </vertical>, null, false)
                view.scriptText.setText("正在请求脚本【" + ScriptName + "】请稍后...")
                let sometips = ["每次请求到的脚本都是最新的哦，懒到不用更新爽吧？🤪", "世界上最遥远的距离是“没网”，而最尴尬的事情是“网慢”🙃", "开发者很佛系的，若您有任何问题记得及时提交反馈哈～😃", "撸码可是很辛苦的内～有时候要有耐心哦😬", "偶尔去看看日志也许会有新发现呢～🤓", "人类的本质是……“🕊？”", "告诉你个小秘密，这条线最多只能坚持20秒……🙈", "哦～我亲爱的上帝～快来带走我所有的BUG吧～😇", "写代码能当饭吃的话还是挺不错的😋"]
                view.tips.setText("tips:" + sometips[random(0, sometips.length - 1)])
                contextDownJs = dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false,
                    cancelable: false
                }).show()
                try {
                    view.Network.setText("当前网络状态为:" + MyNetworkInformation())
                    var res_script = http.get(ScriptUrl, {
                        headers: {
                            "Accept-Language": "zh-CN,zh;q=0.9",
                            "User-Agent": "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
                        }
                    })
                    if (res_script.statusCode == 200) {
                        try {
                            view.scriptText.setText(ScriptName + "请求成功")
                            contextDownJs.dismiss()
                        } catch (error) {
                            log("获取脚本时捕获到一个错误：", error)
                        }
                        var OrangeJs = res_script.body.string()
                        let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";context_SettingsCard="' + context_SettingsCard + '";context_Logo="' + context_Logo + '";';
                        engines.execScript(ScriptName, sharevalue + OrangeJs)
                        exit()
                    } else {
                        contextDownJs.dismiss()
                        let view = ui.inflate(
                            <vertical padding="25 0" bg="{{context_framebg}}">
                                <linear orientation="horizontal" gravity="left" marginTop="10">
                                    <img src="@drawable/ic_warning_black_48dp" tint="{{context_textColor}}" h="27" />
                                    <text id="Statuscode" textStyle="bold" textSize="20" textColor="{{context_textColor}}" />
                                </linear>
                                <text id="tip" textStyle="bold" textSize="15" margin="10 5 10 5" textColor="{{context_textColor}}" />
                                <text id="tips" textSize="10" margin="10 0 40 10" textColor="{{context_textColor}}" alpha="0.9" />
                            </vertical>, null, false)
                        view.tip.setText("“" + ScriptName + "”" + "请求错误！");
                        view.tips.setText("这可能是一个严重的服务器端的错误，请先检查您的网络配置是否正确，若多次出现此错误请联系开发者。")
                        view.Statuscode.setText(res_script.statusMessage + res_script.statusCode);
                        dialogs.build({
                            customView: view,
                            wrapInScrollView: false,
                            autoDismiss: false
                        }).show()
                        exit()
                    }
                } catch (error) {
                    contextDownJs.dismiss();
                    let views = ui.inflate(
                        <vertical padding="25 0" bg="{{context_framebg}}">
                            <linear orientation="horizontal" gravity="left" marginTop="10">
                                <img src="@drawable/ic_warning_black_48dp" tint="{{context_textColor}}" h="27" />
                                <text id="Statuscode" textStyle="bold" textSize="20" textColor="{{context_textColor}}" />
                            </linear>
                            <text id="tip" textStyle="bold" textSize="15" margin="10 5 10 5" textColor="{{context_textColor}}" />
                            <text id="tips" textSize="10" margin="10 0 50 10" textColor="{{context_textColor}}" />
                        </vertical>, null, false)
                    views.tip.setText("无法请求“" + ScriptName + "”");
                    views.tips.setText("请检查您当前的网络连接可用性，连接可用网络并授予本软件联网权限后再尝试重新运行。\n\n错误代码：" + e)
                    views.Statuscode.setText("无可用网络")
                    dialogs.build({
                        customView: views,
                        wrapInScrollView: false,
                        autoDismiss: false
                    }).show()
                    exit()
                }
            })
            setTimeout(function () {
                contextDownJs.dismiss()
                let views = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <linear orientation="horizontal" gravity="left" marginTop="10">
                            <img src="@drawable/ic_warning_black_48dp" tint="{{context_textColor}}" h="27" />
                        </linear>
                        <text id="tip" textStyle="bold" textSize="15" margin="10 5 10 5" textColor="{{context_textColor}}" />
                        <text id="tips" textSize="10" margin="10 0 50 10" textColor="{{context_textColor}}" />
                    </vertical>, null, false)
                views.tip.setText(ScriptName + "请求超时！")
                views.tips.setText("请检查您当前的网络连接可用性，连接可用网络并授予本软件联网权限后再尝试重新运行。")
                dialogs.build({
                    customView: views,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show()
                exit()
            }, 2000)
        } else if (app.getAppName(AppPackageName) == null) {
            let viewss = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <linear orientation="horizontal" gravity="left" marginTop="10">
                        <img src="@drawable/ic_warning_black_48dp" tint="{{context_textColor}}" h="27" />
                        <text id="Statuscode" textStyle="bold" textSize="20" textColor="{{context_textColor}}" />
                    </linear>
                    <text id="tip" textStyle="bold" textSize="15" margin="10 5 10 5" textColor="{{context_textColor}}" />
                    <text id="tips" textSize="10" margin="10 0 50 10" textColor="{{context_textColor}}" />
                </vertical>, null, false)
            viewss.tip.setText("“" + ScriptName + "”" + "：未安装支持的APP")
            dialogs.build({
                customView: viewss,
                wrapInScrollView: false,
                autoDismiss: false
            }).show()
        } else {
            let views = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <linear orientation="horizontal" gravity="left" marginTop="10">
                        <img src="@drawable/ic_warning_black_48dp" tint="{{context_textColor}}" h="27" />
                    </linear>
                    <text id="tip" textStyle="bold" textSize="15" margin="10 5 10 5" textColor="{{context_textColor}}" />
                    <text id="tips" textSize="10" margin="10 0 50 10" textColor="{{context_textColor}}" />
                </vertical>, null, false)
            views.tip.setText("请开启无障碍权限")
            views.tips.setText("很抱歉，脚本运行必须使用“无障碍服务”，请在您的设备上自行授予“Orange Js橘衫の脚本”软件“无障碍权限”，之后可再次尝试运行脚本");
            dialogs.build({
                customView: views,
                wrapInScrollView: false,
                autoDismiss: false
            }).show()
        }
        function MyNetworkInformation() {
            importClass(android.net.ConnectivityManager)
            mConnectivityManager = context.getSystemService(context.CONNECTIVITY_SERVICE)
            netInfo = mConnectivityManager.getActiveNetworkInfo()
            if (netInfo != null && netInfo.isAvailable()) {
                name = netInfo.getTypeName()
                if (netInfo.getType() == ConnectivityManager.TYPE_WIFI) {
                    return "WIFI网络"
                } else if (netInfo.getType() == ConnectivityManager.TYPE_ETHERNET) {
                    return "有线网络"
                } else if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE) {
                    return "移动网络"
                }
            } else {
                return "网络断开"
            }
        }
    }
    ui.Settings.click(() => {
        SettingsUI()
    });
    ui.AboutApp.click(() => {
        AboutApp()
    });
    ui.RefreshUI.click(() => {
        ui.finish()
        engines.execScript("重启刷新界面", "RefreshMainUI();\n" + RefreshMainUI.toString())

        function RefreshMainUI() {
            app.startActivity({
                action: "android.intent.action.VIEW",
                packageName: "com.orange.orangejs",
                className: "com.stardust.auojs.inrt.SplashActivity"
            })
        }
    })
    ui.ScriptOne.click(() => {
        let Url = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_%E8%87%AA%E5%8A%A8%E5%BE%AE%E4%BF%A1%E5%8F%91%E6%B6%88%E6%81%AF_%E5%BE%AE%E4%BF%A1%E8%84%9A%E6%9C%AC.js";
        let str = 'RunScript("' + Url + '","自动微信发消息","com.tencent.mm")';
        let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";context_SettingsCard="' + context_SettingsCard + '";context_Logo="' + context_Logo + '";';
        engines.execScript("请求脚本", "" + sharevalue + str + ";\n" + RunScript.toString());
    })
    ui.R_JD.click(() => {
        /*if (ui.sp_Jd1.getSelectedItemPosition() == 2) {
            let Url = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_%E4%B8%9C%E4%B8%9C%E5%86%9C%E5%9C%BA%E8%87%AA%E5%8A%A8%E8%84%9A%E6%9C%AC_%E4%BA%AC%E4%B8%9C%E8%84%9A%E6%9C%AC.js";
            let str = 'RunScript("' + Url + '","东东农场自动脚本","com.jingdong.app.mall")';
            let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";context_SettingsCard="'+context_SettingsCard+'";context_Logo="'+context_Logo+'";';
                engines.execScript("请求脚本", "" + sharevalue + str + ";\n" + RunScript.toString());
        } else */
        if (ui.sp_Jd1.getSelectedItemPosition() == 1) {
            let Url = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_%E8%87%AA%E5%8A%A8%E5%AE%A0%E6%B1%AA%E6%B1%AA_%E4%BA%AC%E4%B8%9C%E8%84%9A%E6%9C%AC.js";
            let str = 'RunScript("' + Url + '","自动宠汪汪","com.jingdong.app.mall")';
            let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";context_SettingsCard="' + context_SettingsCard + '";context_Logo="' + context_Logo + '";';
            engines.execScript("请求脚本", "" + sharevalue + str + ";\n" + RunScript.toString());
        } else if (ui.sp_Jd1.getSelectedItemPosition() == 0) {
            let Url = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_%E7%A7%8D%E8%B1%86%E5%BE%97%E8%B1%86%E8%87%AA%E5%8A%A8%E8%84%9A%E6%9C%AC_%E4%BA%AC%E4%B8%9C%E8%84%9A%E6%9C%AC.js";
            let str = 'RunScript("' + Url + '","种豆得豆自动脚本","com.jingdong.app.mall")';
            let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";context_SettingsCard="' + context_SettingsCard + '";context_Logo="' + context_Logo + '";';
            engines.execScript("请求脚本", "" + sharevalue + str + ";\n" + RunScript.toString());
        }
    });

    /*ui.ScriptTen.click(() => {
        let Url = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_%E5%A4%9A%E5%A4%9A%E6%9E%9C%E5%9B%AD%E8%87%AA%E5%8A%A8%E8%84%9A%E6%9C%AC_%E6%8B%BC%E5%A4%9A%E5%A4%9A%E8%84%9A%E6%9C%AC.js";
        let str = 'RunScript("' + Url + '","多多果园自动脚本","com.xunmeng.pinduoduo")';
        let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";context_SettingsCard="'+context_SettingsCard+'";context_Logo="'+context_Logo+'";';
            engines.execScript("请求脚本", "" + sharevalue + str + ";\n" + RunScript.toString());
    });*/
    ui.ScriptNine.click(() => {
        let Url = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_%E5%BE%AE%E5%8D%9A%E4%BB%BB%E5%8A%A1%E8%87%AA%E5%8A%A8%E8%84%9A%E6%9C%AC_%E5%BE%AE%E5%8D%9A%E8%84%9A%E6%9C%AC.js";
        let str = 'RunScript("' + Url + '","微博任务自动脚本","com.sina.weibo")';
        let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";context_SettingsCard="' + context_SettingsCard + '";context_Logo="' + context_Logo + '";';
        engines.execScript("请求脚本", "" + sharevalue + str + ";\n" + RunScript.toString());
    });

    ui.ScriptThi.click(() => {
        let Url = getStorageData('APPbasic', 'URLprefix') + "/OrangeJs_%E8%87%AA%E5%8A%A8%E5%8A%A8%E6%80%81%E7%82%B9%E8%B5%9E_QQ%E8%84%9A%E6%9C%AC.js";
        let str = 'RunScript("' + Url + '","自动动态点赞","com.tencent.mobileqq")';
        let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";context_SettingsCard="' + context_SettingsCard + '";context_Logo="' + context_Logo + '";';
        engines.execScript("请求脚本", "" + sharevalue + str + ";\n" + RunScript.toString());
    });

    ui.TalktoDeveloper.click(() => {
        TalkToDeveloper();
    });

    ui.JoinQQGroup.click(() => {
        let view = ui.inflate(
            <vertical padding="25 0" bg="{{context_framebg}}">
                <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                    <img src="@drawable/ic_supervisor_account_black_48dp" h="20" marginTop="3" tint="#777777" layout_gravity="center" />
                    <text text="加入QQ群" textSize="15" textStyle="bold" margin="0 5 10 0" textColor="#777777" />
                </linear>
                <text text="请选择加群方式，期待与您一起愉快的玩耍:D" textSize="10" margin="10 5 10 5" textColor="#777777" />
                <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                    <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                        <text id="Determine" text="使用QQ加群" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                    </card>
                    <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                        <text id="cancel" text="使用TIM加群" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                    </card>
                </linear>
            </vertical>, null, false);
        view.cancel.click(() => {
            DHK.dismiss();
            try {
                app.startActivity({
                    action: "android.intent.action.VIEW",
                    packageName: "com.tencent.tim",
                    className: "com.tencent.mobileqq.activity.JumpActivity",
                    data: app.parseUri("mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3Dv5ohaWahdOfqDmyX7L_a196dl3K-SX5_"),
                    flags: ["grant_read_uri_permission", "grant_write_uri_permission"],
                });
            } catch (e) {
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <text text="当前设备未安装TIM" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                    </vertical>
                );
                dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
            }
        });
        view.Determine.click(() => {
            DHK.dismiss();
            try {
                app.startActivity({
                    action: "android.intent.action.VIEW",
                    packageName: "com.tencent.mobileqq",
                    className: "com.tencent.mobileqq.activity.JumpActivity",
                    data: app.parseUri("mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3Dv5ohaWahdOfqDmyX7L_a196dl3K-SX5_"),
                    flags: ["grant_read_uri_permission", "grant_write_uri_permission"],
                });
            } catch (e) {
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <text text="当前设备未安装QQ" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                    </vertical>
                );
                dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
            }
        });
        var DHK = dialogs.build({
            customView: view,
            wrapInScrollView: false,
            autoDismiss: false
        }).show();

    });
    ui.StopAllScript.click(() => {
        controlScript();
        function controlScript() {
            function stopscript(scriptId) {
                let execution = engines.all();
                for (var i = 0; i < execution.length; i++) {
                    if (scriptId == execution[i].getId()) {
                        execution[i].forceStop();
                        return true;
                    }
                }
            }
            let DHK = ui.inflate(
                <frame background="{{context_framebg}}" padding="5">
                    <scroll bg="{{context_framebg}}">
                        <vertical bg="{{context_framebg}}">
                            <linear orientation="horizontal" gravity="left||center">
                                <img src="{{context_Logo}}" w="85" h="35" />
                                <linear orientation="horizontal" w="match_parent" gravity="right||center">
                                    <text text="管理运行脚本" textStyle="bold" textSize="20" textColor="{{context_textColor}}" marginRight="5" />
                                </linear>
                            </linear>
                            <View bg="{{context_SettingsCard}}" w="*" h="1" margin="5" />
                            <list id="alljslist">
                                <card w="*" h="50" cardCornerRadius="10dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <linear orientation="horizontal" gravity="center|left">
                                        <img id="checkthisjs" src="{{icon}}" w="30" h="30" tint="{{context_textColor}}" marginLeft="5" />
                                        <text id="TAG" textSize="16sp" gravity="left||center" textColor="#FF9800" text="{{tag}}" />
                                        <text id="ID" textSize="16sp" gravity="left||center" textColor="#4CAF50" text="[{{Id}}]" />
                                        <text id="name" textSize="16sp" gravity="left||center" textColor="{{context_textColor}}" text="{{name}}" />
                                    </linear>
                                    <linear gravity="center||right" marginRight="20">
                                        <img id="deleteItem" src="@drawable/ic_clear_black_48dp" w="35" h="35" tint="{{context_textColor}}" foreground="?attr/selectableItemBackground" clickable="true" />
                                    </linear>
                                </card>
                            </list>
                            <text text="已经到底啦" textSize="10" textColor="{{context_textColor}}" margin="5 5 5 100" alpha="0.5" gravity="bottom||center" />
                        </vertical>
                    </scroll>
                    <card w="*" h="50" cardCornerRadius="10dp" cardElevation="0dp" layout_gravity="bottom" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                        <linear orientation="horizontal" gravity="center|left">
                            <img id="checkAll" src="@drawable/ic_panorama_fish_eye_black_48dp" w="30" h="30" tint="{{context_textColor}}" marginLeft="5" />
                            <text id="checkAllText" textSize="16sp" gravity="left||center" textColor="{{context_textColor}}" text="全选" />
                        </linear>
                        <linear gravity="center||right" marginRight="20">
                            <card id="finaldel" h="0" cardCornerRadius="5dp" gravity="center_vertical" cardBackgroundColor="#000000" foreground="?attr/selectableItemBackground" clickable="true">
                                <text text="强行停止" textColor="{{context_textColor}}" textSize="16sp" gravity="center" margin="10 0" />
                            </card>
                        </linear>
                    </card>
                </frame>, null, false);
            let ControlDHK = dialogs.build({
                customView: DHK,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
            DHK.finaldel.click(() => {
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                            <img src="@drawable/ic_warning_black_48dp" h="20" marginTop="3" tint="#F44336" layout_gravity="center" />
                            <text id="deleteTitle" textSize="15" textStyle="bold" margin="0 5 10 0" textColor="#F44336" />
                        </linear>
                        <text id="deleteTips" textStyle="bold" textSize="10" margin="10 5 10 5" textColor="#D32F2F" />
                        <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                            <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#F44336">
                                <text id="Determine" text="确认停止" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                            </card>
                            <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#4CAF50">
                                <text id="cancel" text="取消停止" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                            </card>
                        </linear>
                    </vertical>, null, false);
                view.deleteTitle.setText("您确定要强行停止以下" + context_ListDeletejs.length + "个脚本吗？");
                var waitdel = [];
                for (let i = 0; i < context_ListDeletejs.length; i++) {
                    waitdel.push("[" + context_ListDeletejs[i].Id + "]" + context_ListDeletejs[i].name);
                }
                view.deleteTips.setText("本次将强行停止的脚本：\n“" + waitdel + "”\n\n* 强行停止脚本可能会造成数据丢失等意外情况，请确认无误后再进行操作");
                view.cancel.click(() => {
                    DHK.dismiss();
                });
                view.Determine.click(() => {
                    let deleteWrong = [];
                    for (let i = 0; i < context_ListDeletejs.length; i++) {
                        if (stopscript(context_ListDeletejs[i].Id) != true) {
                            deleteWrong.push("[" + context_ListDeletejs[i].Id + "]" + context_ListDeletejs[i].name);
                        }
                    }
                    if (deleteWrong.length == 0) {
                        DHK.dismiss();
                        let views = ui.inflate(
                            <vertical padding="25 0" bg="{{context_framebg}}">
                                <img src="@drawable/ic_check_circle_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                                <text id="deleteDone" textStyle="bold" textSize="15" margin="10" textColor="{{context_textColor}}" gravity="center" />
                                <text id="deleteDonetips" textSize="10" margin="5" textColor="{{context_textColor}}" gravity="center" />
                            </vertical>
                        );
                        views.deleteDone.setText("已强行停止" + context_ListDeletejs.length + "个脚本");
                        deleteAlready = [];
                        for (let i = 0; i < context_ListDeletejs.length; i++) {
                            deleteAlready.push("[" + context_ListDeletejs[i].Id + "]" + context_ListDeletejs[i].name);
                        }
                        views.deleteDonetips.setText("已被强行停止的脚本：\n“" + deleteAlready + "”");
                        dialogs.build({
                            customView: views,
                            wrapInScrollView: false,
                            autoDismiss: true
                        }).show();
                    } else {
                        DHK.dismiss();
                        let views = ui.inflate(
                            <vertical padding="25 0" bg="{{context_framebg}}">
                                <img src="@drawable/ic_cancel_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                                <text id="deleteDone" textStyle="bold" textSize="15" margin="10" textColor="{{context_textColor}}" gravity="center" />
                                <text id="deleteDonetips" textSize="10" margin="5" textColor="{{context_textColor}}" gravity="center" />
                            </vertical>
                        );
                        views.deleteDone.setText("共有" + deleteWrong.length + "个脚本强行停止失败！");
                        views.deleteDonetips.setText("以下为本次强行停止失败的脚本：\n“" + deleteWrong + "”");
                        dialogs.build({
                            customView: views,
                            wrapInScrollView: false,
                            autoDismiss: true
                        }).show();
                    }
                    context_ListDeletejs = [];
                    items = [];
                    let execution = engines.all();
                    for (let i = 0; i < execution.length; i++) {
                        if (execution[i] != engines.myEngine()) {
                            items.push({
                                icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                                name: execution[i].getSource().toString().match(/([^/]+)$/)[1],
                                Id: execution[i].getId(),
                                tag: ""
                            });
                        } else {
                            items.push({
                                icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                                name: execution[i].getSource().toString().match(/([^/]+)$/)[1],
                                Id: execution[i].getId(),
                                tag: "[当前脚本]"
                            });
                        }
                    }
                    DHK.alljslist.setDataSource(items);
                    DHK.finaldel.attr("h", 0);
                    DHK.checkAllText.setText("全选");
                    DHK.checkAll.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
                });
                let DHK = dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
            });
            items = [];
            let execution = engines.all();
            for (let i = 0; i < execution.length; i++) {
                if (execution[i] != engines.myEngine()) {
                    items.push({
                        icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                        name: execution[i].getSource().toString().match(/([^/]+)$/)[1],
                        Id: execution[i].getId(),
                        tag: ""
                    });
                } else {
                    items.push({
                        icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                        name: execution[i].getSource().toString().match(/([^/]+)$/)[1],
                        Id: execution[i].getId(),
                        tag: "[当前脚本]"
                    });
                }
            }
            DHK.alljslist.setDataSource(items);
            context_ListDeletejs = [];
            DHK.alljslist.on("item_click", function (item, i, itemView, alljslistView) {
                function WhetherAlready(D) {
                    for (let i = 0; i < context_ListDeletejs.length; i++) {
                        if (D == context_ListDeletejs[i].Id) {
                            return i;
                        }
                    }
                }
                if (WhetherAlready(item.Id) != undefined) {
                    context_ListDeletejs.remove(context_ListDeletejs[WhetherAlready(item.Id)]);
                    itemView.checkthisjs.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
                } else {
                    context_ListDeletejs.push({
                        Id: item.Id,
                        name: item.name
                    });
                    itemView.checkthisjs.setSource("@drawable/ic_check_circle_black_48dp");
                }
                if (context_ListDeletejs.length > 0) {
                    DHK.finaldel.attr("h", 35);
                    DHK.finaldel.attr("cardBackgroundColor", "#F44336");
                    DHK.checkAllText.setText("全选（已勾选" + context_ListDeletejs.length + "个）");
                } else {
                    DHK.finaldel.attr("h", 0);
                    DHK.checkAllText.setText("全选");
                    DHK.checkAll.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
                }
                if (context_ListDeletejs.length > 0 && context_ListDeletejs.length == items.length) {
                    DHK.checkAll.setSource("@drawable/ic_check_circle_black_48dp");
                    DHK.finaldel.attr("h", 35);
                    DHK.finaldel.attr("cardBackgroundColor", "#F44336");
                } else if (context_ListDeletejs.length > 0) {
                    DHK.checkAll.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
                }
            });

            DHK.alljslist.on("item_bind", function (itemView, itemHolder) {
                itemView.deleteItem.on("click", function () {
                    let item = itemHolder.item;
                    let view = ui.inflate(
                        <vertical padding="25 0" bg="{{context_framebg}}">
                            <linear orientation="horizontal" align="left">
                                <img src="@drawable/ic_warning_black_48dp" h="20" marginTop="3" tint="#F44336" layout_gravity="center" />
                                <text id="deleteTitle" textSize="15" textStyle="bold" margin="0 5 0 0" textColor="#F44336" />
                            </linear>
                            <text id="deleteTips" textStyle="bold" textSize="10" margin="10 5 10 5" textColor="#D32F2F" />
                            <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#F44336">
                                    <text id="Determine" text="强行停止" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#4CAF50">
                                    <text id="cancel" text="取消停止" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                            </linear>
                        </vertical>, null, false);
                    view.deleteTitle.setText("您确定要强行停止“[" + item.Id + "]" + item.name + "”脚本吗？");

                    view.Determine.click(() => {
                        if (stopscript(item.Id) == true) {
                            items.splice(itemHolder.position, 1);
                            DHK.dismiss();
                            let views = ui.inflate(
                                <vertical padding="25 0" bg="{{context_framebg}}">
                                    <img src="@drawable/ic_check_circle_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                                    <text id="deleteDone" textStyle="bold" textSize="15" margin="10" textColor="{{context_textColor}}" gravity="center" />
                                </vertical>
                            );
                            views.deleteDone.setText("已成功停止“" + item.name + "(" + item.Id + ")”脚本");
                            dialogs.build({
                                customView: views,
                                wrapInScrollView: false,
                                autoDismiss: true
                            }).show();
                        } else {
                            DHK.dismiss();
                            let views = ui.inflate(
                                <vertical padding="25 0" bg="{{context_framebg}}">
                                    <img src="@drawable/ic_cancel_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                                    <text id="deleteDone" textStyle="bold" textSize="15" margin="10" textColor="{{context_textColor}}" gravity="center" />
                                </vertical>
                            );
                            views.deleteDone.setText("停止“" + item.name + "(" + item.Id + ")”脚本失败！");
                            dialogs.build({
                                customView: views,
                                wrapInScrollView: false,
                                autoDismiss: true
                            }).show();
                        }
                    });
                    view.cancel.click(() => {
                        DHK.dismiss();
                    });
                    let DHK = dialogs.build({
                        customView: view,
                        wrapInScrollView: false,
                        autoDismiss: false
                    }).show();
                })
            })
            context_CheckAlldelete = false;
            DHK.checkAll.on("click", function (item, i, itemView, alljslistView) {
                if (context_CheckAlldelete == true) {
                    context_CheckAlldelete = false;
                    DHK.checkAll.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
                    items = [];
                    let execution = engines.all();
                    for (let i = 0; i < execution.length; i++) {
                        if (execution[i] != engines.myEngine()) {
                            items.push({
                                icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                                name: execution[i].getSource().toString().match(/([^/]+)$/)[1],
                                Id: execution[i].getId(),
                                tag: ""
                            });
                        } else {
                            items.push({
                                icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                                name: execution[i].getSource().toString().match(/([^/]+)$/)[1],
                                Id: execution[i].getId(),
                                tag: "[当前脚本]"
                            })
                        }
                    }
                    DHK.alljslist.setDataSource(items);
                    context_ListDeletejs = []
                } else {
                    context_CheckAlldelete = true;
                    DHK.checkAll.setSource("@drawable/ic_check_circle_black_48dp");
                    items = []
                    let execution = engines.all();
                    for (let i = 0; i < execution.length; i++) {
                        if (execution[i] != engines.myEngine()) {
                            items.push({
                                icon: "@drawable/ic_check_circle_black_48dp",
                                name: execution[i].getSource().toString().match(/([^/]+)$/)[1],
                                Id: execution[i].getId(),
                                tag: ""
                            });
                        } else {
                            items.push({
                                icon: "@drawable/ic_check_circle_black_48dp",
                                name: execution[i].getSource().toString().match(/([^/]+)$/)[1],
                                Id: execution[i].getId(),
                                tag: "[当前脚本]"
                            })
                        }
                    }
                    DHK.alljslist.setDataSource(items);
                    context_ListDeletejs = []
                    for (let i = 0; i < items.length; i++) {
                        context_ListDeletejs.push({
                            Id: items[i].Id,
                            name: items[i].name
                        })
                    }
                }
                if (context_ListDeletejs.length > 0) {
                    DHK.checkAllText.setText("全选（已勾选" + context_ListDeletejs.length + "个）");
                    DHK.finaldel.attr("h", 35);
                    DHK.finaldel.attr("cardBackgroundColor", "#F44336");
                } else {
                    DHK.checkAllText.setText("全选");
                    DHK.finaldel.attr("h", 0)
                }
            });

            Array.prototype.indexOf = function (val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i
                }
                return -1
            };
            Array.prototype.remove = function (val) {
                var index = this.indexOf(val)
                if (index > -1) {
                    this.splice(index, 1);
                }
            }
        }
    })
    ui.ViewLog.click(() => {
        app.startActivity({
            action: "android.intent.action.VIEW",
            packageName: "com.orange.orangejs",
            className: "com.stardust.auojs.inrt.LogActivity"
        })
    })
    ui.changeColor.click(() => {
        if (getStorageData("DayNightSetting", "AutoDayNight") != undefined) {
            let view = ui.inflate(
                <vertical bg="{{context_framebg}}" padding="25 0">
                    <img src="@drawable/ic_announcement_black_48dp" w="25" h="25" margin="5 0" tint="{{context_textColor}}" />
                    <text text="您已开启“自动切换主题”确定要关闭吗？" textSize="15sp" textStyle="bold" textColor="{{context_textColor}}" gravity="left" margin="5 0 5 0" />
                    <text id="nowInformation" textSize="10sp" textStyle="bold" textColor="{{context_textColor}}" gravity="left" margin="5 0 5 0" />
                    <text text="*要在“自动切换主题”开启的情况下手动切换主题，你必须先点击“确定”关闭“自动切换主题”功能才能成功完成一次手动切换主题" textSize="5sp" textColor="{{context_textColor}}" gravity="left" margin="5 0 5 0" />
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="Determine" text="确定" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="cancel" text="取消" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                </vertical>, null, false);
            let DAY = "";
            let NIGHT = "";
            let a = Number(getStorageData("DayNightSetting", "DayTime"));
            let b = Number(getStorageData("DayNightSetting", "NightTime"));
            let c = Number(getStorageData("DayNightSetting", "NightTime"));
            let d = Number(getStorageData("DayNightSetting", "DayTime"));
            if (a > b) {
                var DAY = "次日";
            }
            if (c > d) {
                var NIGHT = "次日";
            }
            view.nowInformation.setText("当前时段切换设置 浅色：" + getStorageData("DayNightSetting", "DayTime") + "时-" + DAY + getStorageData("DayNightSetting", "NightTime") + "时  夜间：" + getStorageData("DayNightSetting", "NightTime") + "时-" + NIGHT + getStorageData("DayNightSetting", "DayTime") + "时");
            view.Determine.click(() => {
                delStorageData("DayNightSetting", "AutoDayNight");
                DHK.dismiss();
                if (context_DayOrNight == 1) {
                    context_DayOrNight = 0;
                } else {
                    context_DayOrNight = 1;
                }
                mainUi();
            });
            view.cancel.click(() => {
                DHK.dismiss();
            });
            var DHK = dialogs.build({
                customView: view,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
        } else {
            if (context_DayOrNight == 1) {
                context_DayOrNight = 0;
            } else {
                context_DayOrNight = 1;
            }
            mainUi();
        }
    })
    ui.Privacy_Security.click(() => {
        SP();
    });
}
function SignUp() {
    context_NowUi = "SignUp";
    activity.window.addFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS); //设置状态栏透明
    ui.layout(
        <scroll bg="#FFFFFF">
            <vertical layout_gravity="center" marginBottom="0">
                <linear orientation="horizontal" gravity="center">
                    {/* <img src="{{getStorageData('APPbasic', 'URLprefix')}}/OrangeJs_logo.png" w="85" h="35" /> */}
                </linear>
                <text text="欢迎使用" textSize="45sp" textColor="#000000" gravity="center" />
                <text text="全新1.1.0主界面" marginTop="10" textSize="15sp" textColor="#000000" gravity="center" />
                <linear orientation="horizontal" gravity="center" marginTop="150">
                    <card w="150dp" h="50" marginRight="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center" cardBackgroundColor="#2196F3" alpha="0.7">
                        <card id="SignUp" h="40" w="*" margin="5 0 5 0" cardCornerRadius="20dp" cardElevation="0dp" align="center" cardBackgroundColor="#FFFFFF" foreground="?selectableItemBackground" clickable="true">
                            <text text="填写注册问卷" textStyle="bold" color="#2196F3" gravity="center" size="12" />
                        </card>
                    </card>
                    <card w="50dp" h="50" marginLeft="2" cardCornerRadius="25dp" cardElevation="0dp" gravity="center" cardBackgroundColor="#4CAF50" alpha="0.7">
                        <card id="SignIn" h="40" w="*" margin="5 0 5 0" cardCornerRadius="20dp" cardElevation="0dp" align="center" cardBackgroundColor="#FFFFFF" foreground="?selectableItemBackground" clickable="true">
                            <img src="@drawable/ic_vpn_key_black_48dp" tint="#4CAF50" w="40" h="40" />
                        </card>
                    </card>
                </linear>
            </vertical>
        </scroll>
    );
    ui.SignUp.click(() => {
        let view = ui.inflate(
            <vertical bg="#FFFFFF" padding="25 10 25 0">
                <linear orientation="horizontal" gravity="left||center" marginBottom="5">
                    {/* <img src="{{getStorageData('APPbasic', 'URLprefix')}}/OrangeJs_logo.png" w="85" h="35" /> */}
                    <linear orientation="horizontal" w="match_parent" gravity="right||center">
                        <img id="ExitScript" src="@drawable/ic_clear_black_48dp" w="35" h="35" tint="#000000" foreground="?attr/selectableItemBackground" clickable="true" />
                    </linear>
                </linear>
                <ScrollView>
                    <webview id="webview" />
                </ScrollView>
            </vertical>
        )
        view.webview.loadUrl("https://www.wjx.top/jq/94788811.aspx");  // 填写注册问卷
        view.ExitScript.click(() => {
            android.webkit.WebStorage.getInstance().deleteAllData();
            DHK.dismiss()
        })
        let DHK = dialogs.build({
            customView: view,
            wrapInScrollView: false,
            cancelable: false,
            autoDismiss: true
        }).show()
    })
    ui.SignIn.click(() => {
        let view = ui.inflate(
            <vertical bg="#FFFFFF" padding="25 10 25 0">
                <input id="password" textColor="#000000" hint="请输入激活码[填写问卷立得]" textColorHint="#9E9E9E" />
                <button id="ok" text="确定" style="Widget.AppCompat.Button.Borderless.Colored" w="100" layout_gravity="center" />
            </vertical>
        )
        view.ok.click(() => {
            let a = view.password.getText();
            if (md5(a.toString()) == "109e1be70ecf784109576e7a5df1750a") {
                DHK.dismiss();
                setStorageData("SignUp", "SignKey", a.toString());
                if (getStorageData("DayUi", "LogomarginTop") == undefined) {
                    setStorageData("DayUi", "LogomarginTop", "10");
                    log("浅色主题主界面间距设为了10")
                }
                if (getStorageData("NightUi", "LogomarginTop") == undefined) {
                    setStorageData("NightUi", "LogomarginTop", "10");
                    log("深色主界面间距设为了10")
                }
                SettingsUI();
                let views = ui.inflate(
                    <vertical bg="#FFFFFF" padding="25 0 25 0">
                        <text text="欢迎" textSize="25" textStyle="bold" textColor="#000000" gravity="left" />
                        <text text="先来进行设置吧～" textSize="15" textStyle="bold" textColor="#000000" gravity="left" margin="0 5" />
                    </vertical>
                )
                dialogs.build({
                    customView: views,
                    wrapInScrollView: false,
                    autoDismiss: true
                }).show()
            } else {
                view.password.setErrorh("激活码输入错误")
            }
        });
        let DHK = dialogs.build({
            customView: view,
            wrapInScrollView: false,
            autoDismiss: true
        }).show()
    })
}
function SettingsUI() {
    context_NowUi = "SettingsUI";
    events.removeAllListeners();
    ui.layout(
        <frame background="{{context_framebg}}">
            <scroll bg="{{context_framebg}}">
                <vertical margin="0 25 0 0">
                    <linear orientation="horizontal" gravity="left||center">
                        <img src="{{context_Logo}}" w="85" h="30" />
                        <linear orientation="horizontal" w="match_parent" gravity="right||center">
                            <text text="设置" textStyle="bold" textSize="25" textColor="{{context_textColor}}" marginRight="5" />
                        </linear>
                    </linear>
                    <card h="1" cardCornerRadius="1dp" cardElevation="0dp" gravity="center_vertical" cardBackgroundColor="{{context_Fgx}}" margin="5 0" />
                    <list id='ZhuTiTu' orientation="horizontal" layout_gravity="center_vertical" layout_weight="80">
                        <card w="180" h="180" cardCornerRadius="5dp" cardElevation="5dp" layout_gravity="center" cardBackgroundColor="{{context_Fgx}}" margin="5" foreground="?attr/selectableItemBackground" clickable="true">
                            <img id="picView" src="{{this.Picture}}" scaleType="centerCrop" />
                            <card h="20" cardCornerRadius="2dp" cardElevation="0dp" layout_gravity="bottom|center" cardBackgroundColor="{{context_framebg}}" margin="50 5" alpha="0.8">
                                <text text="{{this.TextofPic}}" textSize="10" textColor="{{context_textColor}}" margin="0 0 0 0" gravity="center" />
                            </card>
                        </card>
                    </list>
                    <card h="50" cardCornerRadius="10dp" cardElevation="0dp" marginTop="10" cardBackgroundColor="{{context_SettingsCard}}">
                        <linear orientation="horizontal" gravity="center||left">
                            <img src="@drawable/ic_brightness_4_black_48dp" w="30" h="30" circle="true" tint="{{context_textColor}}" marginLeft="10" />
                            <linear orientation="vertical" marginLeft="5" gravity="center">
                                <text text="自动切换时段主题" textColor="{{context_textColor}}" textStyle="bold" textSize="15sp" />
                            </linear>
                        </linear>
                        <text id="nighttip" textSize="5sp" textColor="{{context_textColor}}" paddingLeft="2" gravity="bottom||left" margin="45 0 0 10" />
                        <Switch id="DayNight" marginRight="25" gravity="right||center" />
                    </card>
                    <card h="50" cardCornerRadius="10dp" cardElevation="0dp" gravity="center_vertical" marginTop="10" cardBackgroundColor="{{context_SettingsCard}}">
                        <linear orientation="horizontal" gravity="center||left">
                            <img src="@drawable/ic_color_lens_black_48dp" w="30" h="30" circle="true" tint="{{context_textColor}}" marginLeft="10" />
                            <linear orientation="vertical" marginLeft="5" gravity="center">
                                <text text="主页卡片颜色渐变" textColor="{{context_textColor}}" textStyle="bold" textSize="15sp" />
                            </linear>
                        </linear>
                        <Switch id="Gradient" marginRight="25" gravity="right||center" />
                    </card>
                    <card h="50" cardCornerRadius="10dp" cardElevation="0dp" gravity="center_vertical" marginTop="10" cardBackgroundColor="{{context_SettingsCard}}">
                        <linear orientation="horizontal" gravity="center||left">
                            <img src="@drawable/ic_lock_black_48dp" w="30" h="30" circle="true" tint="{{context_textColor}}" marginLeft="10" />
                            <linear orientation="vertical" marginLeft="5" gravity="center">
                                <text text="UI界面返回锁定" textColor="{{context_textColor}}" textStyle="bold" textSize="15sp" />
                            </linear>
                        </linear>
                        <text id="tips" text="* 推荐开启以防止直接返回退出导致界面关闭" textSize="5sp" textColor="{{context_textColor}}" paddingLeft="2" gravity="bottom||left" margin="45 0 0 5" />
                        <Switch id="uiProtect" marginRight="25" gravity="right||center" />
                    </card>
                    <card id="DeleteJsSettings" h="50" cardCornerRadius="10dp" cardElevation="0dp" gravity="center_vertical" marginTop="10" cardBackgroundColor="{{context_SettingsCard}}" foreground="?attr/selectableItemBackground" clickable="true">
                        <linear orientation="horizontal" gravity="center||left">
                            <img src="@drawable/ic_delete_sweep_black_48dp" w="30" h="30" circle="true" tint="{{context_textColor}}" marginLeft="10" />
                            <linear orientation="vertical" marginLeft="5" gravity="center">
                                <text text="手动删除脚本配置" textColor="{{context_textColor}}" textStyle="bold" textSize="15sp" />
                            </linear>
                        </linear>
                        <linear gravity="center||right" marginRight="10">
                            <img marginRight="25" src="@drawable/ic_keyboard_arrow_right_black_48dp" w="15" h="15" circle="true" tint="{{context_textColor}}" />
                        </linear>
                    </card>
                    <card id="GetUiObject" h="50" cardCornerRadius="10dp" cardElevation="0dp" gravity="center_vertical" marginTop="10" cardBackgroundColor="{{context_SettingsCard}}" foreground="?attr/selectableItemBackground" clickable="true">
                        <linear orientation="horizontal" gravity="center||left">
                            <img src="@drawable/ic_poll_black_48dp" w="30" h="30" circle="true" tint="{{context_textColor}}" marginLeft="10" />
                            <linear orientation="vertical" marginLeft="5" gravity="center">
                                <text text="APP控件数据获取" textColor="{{context_textColor}}" textStyle="bold" textSize="15sp" />
                            </linear>
                        </linear>
                        <linear gravity="center||right" marginRight="10">
                            <img marginRight="25" src="@drawable/ic_keyboard_arrow_right_black_48dp" w="15" h="15" circle="true" tint="{{context_textColor}}" />
                        </linear>
                    </card>
                    <card id="CodeTest" h="50" cardCornerRadius="10dp" cardElevation="0dp" gravity="center_vertical" marginTop="10" cardBackgroundColor="{{context_SettingsCard}}" foreground="?attr/selectableItemBackground" clickable="true">
                        <linear orientation="horizontal" gravity="center||left">
                            <img src="@drawable/ic_bug_report_black_48dp" w="30" h="30" circle="true" tint="{{context_textColor}}" marginLeft="10" />
                            <linear orientation="vertical" marginLeft="5" gravity="center">
                                <text text="开发人员代码测试" textColor="{{context_textColor}}" textStyle="bold" textSize="15sp" />
                            </linear>
                        </linear>
                        <linear gravity="center||right" marginRight="10">
                            <img marginRight="25" src="@drawable/ic_keyboard_arrow_right_black_48dp" w="15" h="15" circle="true" tint="{{context_textColor}}" />
                        </linear>
                    </card>
                    <card id="Appsettings" h="50" cardCornerRadius="10dp" cardElevation="0dp" gravity="center_vertical" marginTop="10" cardBackgroundColor="{{context_SettingsCard}}" foreground="?attr/selectableItemBackground" clickable="true">
                        <linear orientation="horizontal" gravity="center||left">
                            <img src="@drawable/ic_open_in_new_black_48dp" w="30" h="30" circle="true" tint="{{context_textColor}}" marginLeft="10" />
                            <linear orientation="vertical" marginLeft="5" gravity="center">
                                <text text="跳转软件自带设置" textColor="{{context_textColor}}" textStyle="bold" textSize="15sp" />
                            </linear>
                        </linear>
                        <linear gravity="center||right" marginRight="10">
                            <img marginRight="25" src="@drawable/ic_keyboard_arrow_right_black_48dp" w="15" h="15" circle="true" tint="{{context_textColor}}" />
                        </linear>
                    </card>
                </vertical>
            </scroll>
            <fab id="back" w="auto" h="auto" src="@drawable/ic_arrow_back_black_48dp"
                margin="16" layout_gravity="bottom|right" tint="#ffffff" />
        </frame>
    )
    ui.back.click(() => {
        mainUi()
    })
    ui.ZhuTiTu.on("item_click", function (item, i, itemView, listView) {
        function saveThisPic(ShouldsavePath) {
            var imgView = itemView.picView;
            var myBitmap = createBitmap(imgView);
            var imgPath = saveBitmap(myBitmap);
            return true;

            function createBitmap(view) {
                view.setDrawingCacheEnabled(true);
                view.buildDrawingCache();
                var bitmap = view.getDrawingCache();
                return bitmap;
            }

            function saveBitmap(bitmap) {
                var imgPath = ShouldsavePath;
                var canvas = new Canvas(bitmap);
                var myimg = canvas.toImage();
                images.save(myimg, imgPath);
                return imgPath;
            }
        }
        if (item.TextofPic == "当前顶图") {
            var view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <text text="您想对当前顶图做什么？" textStyle="bold" textSize="15" marginTop="10" textColor="#777777" gravity="center" />
                    <linear gravity="center">
                        <img src="{{context_TopPics}}" margin="10" scaleType="centerCrop" w="200" h="200" gravity="center" />
                    </linear>
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5 5 5 0" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="ChangePic" text="更换图片" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5 5 5 0" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="BeBottomPic" text="设为底图" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5 5 5 5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="SharePic" text="分享图片" textStyle="bold" textColor="#4CAF50" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5 5 5 5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="DeletePic" text="移除图片" textStyle="bold" textColor="#FF3D00" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                </vertical>, null, false);
            view.ChangePic.click(() => {
                DHK.dismiss();
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <text text="请选择您要更换的图片类型" textStyle="bold" textSize="15" marginTop="10" textColor="#777777" gravity="center" />
                        <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                            <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                <text id="LocalPic" text="更换本地图片" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                            </card>
                            <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                <text id="UrlPic" text="更换网络图片" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                            </card>
                        </linear>
                    </vertical>, null, false);
                view.LocalPic.click(() => {
                    DHKs.dismiss();
                    startChooseFile("image/*", {}, "选择顶图");
                });
                view.UrlPic.click(() => {
                    let view = ui.inflate(
                        <vertical padding="25 0" bg="{{context_framebg}}">
                            <text text="请输入网络图片直链" textStyle="bold" textColor="{{context_textColor}}" />
                            <input id="PictureUrl" text="http://" textColor="{{context_textColor}}" textColorHint="#9E9E9E" />
                            <text text="请输入图片版权信息" textStyle="bold" textColor="{{context_textColor}}" />
                            <input id="PictureCopyright" text="©" textColor="{{context_textColor}}" textColorHint="#9E9E9E" />
                            <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <text id="Determine" text="确定" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <text id="cancel" text="取消" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                            </linear>
                        </vertical>, null, false);
                    view.Determine.click(() => {
                        let Purl = String(view.PictureUrl.getText());
                        let Pcopyright = String(view.PictureCopyright.getText());
                        if (Purl.search("http://") == 0 || Purl.search("https://") == 0) {
                            DHKs.dismiss();
                            DHKss.dismiss();
                            if (context_DayOrNight == 0) {
                                let str = 'imgDownLoad("' + Purl + '","/storage/emulated/0/OrangeJs/主界面示例图片/夜间示例顶图.png","顶图","' + Pcopyright + '")';
                                let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";';
                                engines.execScript("下载图片", "" + sharevalue + str + ";\n" + imgDownLoad.toString());
                            } else if (context_DayOrNight == 1) {
                                let str = 'imgDownLoad("' + Purl + '","/storage/emulated/0/OrangeJs/主界面示例图片/示例顶图.png","顶图","' + Pcopyright + '")';
                                let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";';
                                engines.execScript("下载图片", "" + sharevalue + str + ";\n" + imgDownLoad.toString());
                            }
                            var keep = setInterval(function () { }, 1000);
                            var chaoshi = setTimeout(function () {
                                clearInterval(keep);
                            }, 25 * 1000);
                            events.broadcast.on('imgSetOk', function (zt) {
                                clearInterval(keep);
                                clearTimeout(chaoshi);
                                if (zt == "图片下载完成&设置成功") {
                                    mainUi();
                                    SettingsUI();
                                }
                            });
                        } else {
                            view.PictureUrl.setError("图片直链需以http://或https://开头");
                        }
                    });
                    view.cancel.click(() => {
                        DHKss.dismiss();
                    });
                    var DHKss = dialogs.build({
                        customView: view,
                        wrapInScrollView: false,
                        autoDismiss: false
                    }).show();
                });
                var DHKs = dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
            });
            view.BeBottomPic.click(() => {
                DHK.dismiss();
                if (context_DayOrNight == 0) {
                    setStorageData("NightUiPicture", "BottomPics", context_TopPics);
                    if (getStorageData("NightUiPicture", "BottomPicsCopyright") != undefined) {
                        setStorageData("NightUiPicture", "BottomPicsCopyright", context_TopPics_Copyright);
                    }
                } else if (context_DayOrNight == 1) {
                    setStorageData("DayUiPicture", "BottomPics", context_TopPics);
                    if (getStorageData("DayUiPicture", "BottomPicsCopyright") != undefined) {
                        setStorageData("DayUiPicture", "BottomPicsCopyright", context_TopPics_Copyright);
                    }
                }
                context_BottomPics = context_TopPics;
                context_BottomPics_Copyright = context_TopPics_Copyright;
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <text text="已设为底图" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                    </vertical>
                );
                dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
                SettingsUI();
            });
            view.SharePic.click(() => {
                DHK.dismiss();
                if (context_TopPics.search("http://") == 0 || context_TopPics.search("https://") == 0) {
                    var view = ui.inflate(
                        <vertical padding="25 0" bg="{{context_framebg}}">
                            <linear gravity="center">
                                <img src="{{context_TopPics}}" margin="10" scaleType="centerCrop" w="200" h="200" gravity="center" />
                            </linear>
                            <text id="showurl" textSize="8" margin="10 5 10 5" textColor="{{context_textColor}}" />
                            <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <text id="CopyUrltext" text="复制链接文字" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <text id="shareUrltext" text="分享链接文字" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                            </linear>
                        </vertical>, null, false);
                    view.showurl.setText("图片直链：" + context_TopPics + "\n图片版权：" + context_TopPics_Copyright);
                    let a = view.showurl.getText();
                    view.CopyUrltext.click(() => {
                        setClip(a);
                        let view = ui.inflate(
                            <vertical padding="25 0" bg="{{context_framebg}}">
                                <text text="链接文字已复制到剪切板" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                            </vertical>
                        );
                        dialogs.build({
                            customView: view,
                            wrapInScrollView: false,
                            autoDismiss: false
                        }).show();
                    });
                    view.shareUrltext.click(() => {
                        app.startActivity({
                            action: "android.intent.action.SEND",
                            type: "text/*",
                            extras: {
                                "android.intent.extra.TEXT": a
                            }
                        });
                    });
                    dialogs.build({
                        customView: view,
                        wrapInScrollView: false,
                        autoDismiss: false
                    }).show();
                } else {
                    let picfileurl = context_TopPics.replace("file://", "");
                    shareFile(picfileurl, "image/*");
                }
            });
            view.DeletePic.click(() => {
                DHK.dismiss();

                if (context_DayOrNight == 0) {
                    delStorageData("NightUiPicture", "TopPics");
                    delStorageData("NightUiPicture", "TopPicsCopyright");
                } else if (context_DayOrNight == 1) {
                    delStorageData("DayUiPicture", "TopPics");
                    delStorageData("DayUiPicture", "TopPicsCopyright");
                }
                ZhuTiTu.splice(i, 1);
            });
        } else if (item.TextofPic == "当前底图") {
            var view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <text text="您想对当前底图做什么？" textStyle="bold" textSize="15" marginTop="10" textColor="#777777" gravity="center" />
                    <linear gravity="center">
                        <img src="{{context_BottomPics}}" margin="10" scaleType="centerCrop" w="200" h="200" gravity="center" />
                    </linear>
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5 5 5 0" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="ChangePic" text="更换图片" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5 5 5 0" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="BeTopPic" text="设为顶图" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5 5 5 5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="SharePic" text="分享图片" textStyle="bold" textColor="#4CAF50" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5 5 5 5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="DeletePic" text="移除图片" textStyle="bold" textColor="#FF3D00" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                </vertical>, null, false);
            view.ChangePic.click(() => {
                DHK.dismiss();
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <text text="请选择您要更换的图片类型" textStyle="bold" textSize="15" marginTop="10" textColor="#777777" gravity="center" />
                        <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                            <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                <text id="LocalPic" text="更换本地图片" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                            </card>
                            <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                <text id="UrlPic" text="更换网络图片" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                            </card>
                        </linear>
                    </vertical>, null, false);
                view.LocalPic.click(() => {
                    DHKs.dismiss();
                    startChooseFile("image/*", {}, "选择底图");
                });
                view.UrlPic.click(() => {
                    let view = ui.inflate(
                        <vertical padding="25 0" bg="{{context_framebg}}">
                            <text text="请输入网络图片直链" textStyle="bold" textColor="{{context_textColor}}" />
                            <input id="PictureUrl" text="http://" textColor="{{context_textColor}}" textColorHint="#9E9E9E" />
                            <text text="请输入图片版权信息" textStyle="bold" textColor="{{context_textColor}}" />
                            <input id="PictureCopyright" text="©" textColor="{{context_textColor}}" textColorHint="#9E9E9E" />
                            <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <text id="Determine" text="确定" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <text id="cancel" text="取消" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                            </linear>
                        </vertical>, null, false);
                    view.Determine.click(() => {
                        let Purl = String(view.PictureUrl.getText());
                        let Pcopyright = String(view.PictureCopyright.getText());
                        if (Purl.search("http://") == 0 || Purl.search("https://") == 0) {
                            DHKs.dismiss();
                            DHKss.dismiss();
                            if (context_DayOrNight == 0) {
                                let str = 'imgDownLoad("' + Purl + '","/storage/emulated/0/OrangeJs/主界面示例图片/夜间示例底图.png","底图","' + Pcopyright + '")';
                                let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";';
                                engines.execScript("下载图片", "" + sharevalue + str + ";\n" + imgDownLoad.toString());
                            } else if (context_DayOrNight == 1) {
                                let str = 'imgDownLoad("' + Purl + '","/storage/emulated/0/OrangeJs/主界面示例图片/示例底图.png","底图","' + Pcopyright + '")';
                                let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";';
                                engines.execScript("下载图片", "" + sharevalue + str + ";\n" + imgDownLoad.toString());
                            }
                            var keep = setInterval(function () { }, 1000);
                            var chaoshi = setTimeout(function () {
                                clearInterval(keep);
                            }, 25 * 1000);
                            events.broadcast.on('imgSetOk', function (zt) {
                                clearInterval(keep);
                                clearTimeout(chaoshi);
                                if (zt == "图片下载完成&设置成功") {
                                    mainUi();
                                    SettingsUI();
                                }
                            });
                        } else {
                            view.PictureUrl.setError("图片直链需以http://或https://开头");
                        }
                    });
                    view.cancel.click(() => {
                        DHKss.dismiss();
                    });
                    var DHKss = dialogs.build({
                        customView: view,
                        wrapInScrollView: false,
                        autoDismiss: false
                    }).show();
                });
                var DHKs = dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
            });

            view.BeTopPic.click(() => {
                DHK.dismiss();
                if (context_DayOrNight == 0) {
                    setStorageData("NightUiPicture", "TopPics", context_BottomPics);
                    if (getStorageData("NightUiPicture", "TopPicsCopyright") != undefined) {
                        setStorageData("NightUiPicture", "TopPicsCopyright", context_BottomPics_Copyright);
                    }
                } else if (context_DayOrNight == 1) {
                    setStorageData("DayUiPicture", "TopPics", context_BottomPics);
                    if (getStorageData("DayUiPicture", "TopPicsCopyright") != undefined) {
                        setStorageData("DayUiPicture", "TopPicsCopyright", context_BottomPics_Copyright);
                    }
                }
                context_TopPics = context_BottomPics;
                context_TopPics_Copyright = context_BottomPics_Copyright;
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <text text="已设为顶图" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                    </vertical>
                );
                dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
                SettingsUI();
            });

            view.SharePic.click(() => {
                DHK.dismiss();
                if (context_BottomPics.search("http://") == 0 || context_BottomPics.search("https://") == 0) {
                    var view = ui.inflate(
                        <vertical padding="25 0" bg="{{context_framebg}}">
                            <linear gravity="center">
                                <img src="{{context_BottomPics}}" margin="10" scaleType="centerCrop" w="200" h="200" gravity="center" />
                            </linear>
                            <text id="showurl" textSize="8" margin="10 5 10 5" textColor="{{context_textColor}}" />
                            <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <text id="CopyUrltext" text="复制链接文字" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                                <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                    <text id="shareUrltext" text="分享链接文字" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                                </card>
                            </linear>
                        </vertical>, null, false);
                    view.showurl.setText("图片直链：" + context_BottomPics + "\n图片版权：" + context_BottomPics_Copyright);
                    let a = view.showurl.getText();
                    view.CopyUrltext.click(() => {
                        setClip(a);
                        let view = ui.inflate(
                            <vertical padding="25 0" bg="{{context_framebg}}">
                                <text text="链接文字已复制到剪切板" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                            </vertical>
                        );
                        dialogs.build({
                            customView: view,
                            wrapInScrollView: false,
                            autoDismiss: false
                        }).show();
                    });
                    view.shareUrltext.click(() => {
                        app.startActivity({
                            action: "android.intent.action.SEND",
                            type: "text/*",
                            extras: {
                                "android.intent.extra.TEXT": a
                            }
                        });
                    });
                    dialogs.build({
                        customView: view,
                        wrapInScrollView: false,
                        autoDismiss: false
                    }).show();
                } else {
                    let picfileurl = context_BottomPics.replace("file://", "");
                    shareFile(picfileurl, "image/*");
                }
            });
            view.DeletePic.click(() => {
                DHK.dismiss();
                if (context_DayOrNight == 0) {
                    delStorageData("NightUiPicture", "BottomPics");
                    delStorageData("NightUiPicture", "BottomPicsCopyright");
                } else if (context_DayOrNight == 1) {
                    delStorageData("DayUiPicture", "BottomPics");
                    delStorageData("DayUiPicture", "BottomPicsCopyright");
                }

                ZhuTiTu.splice(i, 1);
            });
        } else {
            var view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <text text="您想对这张图片做什么？" textStyle="bold" textSize="15" marginTop="10" textColor="#777777" gravity="center" />
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="BeTopPic" text="设为顶图" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="BeBottomPic" text="设为底图" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                </vertical>, null, false);
            view.BeTopPic.click(() => {
                DHK.dismiss();
                files.ensureDir("/storage/emulated/0/OrangeJs/主界面示例图片");
                if (context_DayOrNight == 0) {
                    let str = 'imgDownLoad("' + item.Picture + '","/storage/emulated/0/OrangeJs/主界面示例图片/夜间示例顶图.png","顶图","' + item.CopyrightOfPicture + '")';
                    let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";';
                    engines.execScript("下载图片", "" + sharevalue + str + ";\n" + imgDownLoad.toString());
                } else if (context_DayOrNight == 1) {
                    let str = 'imgDownLoad("' + item.Picture + '","/storage/emulated/0/OrangeJs/主界面示例图片/示例顶图.png","顶图","' + item.CopyrightOfPicture + '")';
                    let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";';
                    engines.execScript("下载图片", "" + sharevalue + str + ";\n" + imgDownLoad.toString());
                }
                var keep = setInterval(function () { }, 1000);
                var chaoshi = setTimeout(function () {
                    clearInterval(keep);
                }, 25 * 1000);
                events.broadcast.on('imgSetOk', function (zt) {
                    clearInterval(keep);
                    clearTimeout(chaoshi);
                    if (zt == "图片下载完成&设置成功") {
                        mainUi();
                        SettingsUI();
                    }
                });
            });
            view.BeBottomPic.click(() => {
                DHK.dismiss();
                files.ensureDir("/storage/emulated/0/OrangeJs/主界面示例图片");
                if (context_DayOrNight == 0) {
                    let str = 'imgDownLoad("' + item.Picture + '","/storage/emulated/0/OrangeJs/主界面示例图片/夜间示例底图.png","底图","' + item.CopyrightOfPicture + '")';
                    let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";';
                    engines.execScript("下载图片", "" + sharevalue + str + ";\n" + imgDownLoad.toString());
                } else if (context_DayOrNight == 1) {
                    let str = 'imgDownLoad("' + item.Picture + '","/storage/emulated/0/OrangeJs/主界面示例图片/示例底图.png","底图","' + item.CopyrightOfPicture + '")';
                    let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_DayOrNight="' + context_DayOrNight + '";';
                    engines.execScript("下载图片", "" + sharevalue + str + ";\n" + imgDownLoad.toString());
                }
                var keep = setInterval(function () { }, 1000);
                var chaoshi = setTimeout(function () {
                    clearInterval(keep);
                }, 25 * 1000);
                events.broadcast.on('imgSetOk', function (zt) {
                    clearInterval(keep);
                    clearTimeout(chaoshi);
                    if (zt == "图片下载完成&设置成功") {
                        mainUi();
                        SettingsUI();
                    }
                })
            })
        }
        var DHK = dialogs.build({
            customView: view,
            wrapInScrollView: false,
            autoDismiss: true
        }).show()

    });
    if (getStorageData("DayNightSetting", "AutoDayNight") != undefined) {
        let DAY = ""
        let NIGHT = ""
        ui.DayNight.setChecked(true);
        let a = Number(getStorageData("DayNightSetting", "DayTime"))
        let b = Number(getStorageData("DayNightSetting", "NightTime"))
        let c = Number(getStorageData("DayNightSetting", "NightTime"))
        let d = Number(getStorageData("DayNightSetting", "DayTime"))
        if (a > b) {
            var DAY = "次日"
        }
        if (c > d) {
            var NIGHT = "次日"
        }
        ui.nighttip.attr("textSize", "5sp");
        ui.nighttip.setText("浅色：" + getStorageData("DayNightSetting", "DayTime") + "时-" + DAY + getStorageData("DayNightSetting", "NightTime") + "时  夜间：" + getStorageData("DayNightSetting", "NightTime") + "时-" + NIGHT + getStorageData("DayNightSetting", "DayTime") + "时")
    }
    if (getStorageData("ColorSetting", "GradientColor") != undefined) {
        ui.Gradient.setChecked(true)
    }
    if (getStorageData("uiProtectSetting", "UiProtect") != undefined) {
        ui.uiProtect.setChecked(true)
        ui.tips.setText("")
    }
    ui.DayNight.on("click", (checked) => {
        if (ui.DayNight.isChecked() == true) {
            ui.DayNight.setChecked(false);
            let view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <img src="@drawable/ic_brightness_4_black_48dp" w="20" h="20" margin="5" tint="{{context_textColor}}" />
                    <text text="*请输入0-23的小时数字" textSize="10" textColor="#90A6AE" />
                    <text text="自动开启浅色主题时间" textColor="{{context_textColor}}" />
                    <input id="Day" textColor="{{context_textColor}}" inputType="number" hint="开启浅色时间（0～23数字）" textColorHint="#9E9E9E" />
                    <text text="自动开启夜间主题时间" textColor="{{context_textColor}}" />
                    <input id="Night" textColor="{{context_textColor}}" inputType="number" hint="开启深色时间（0～23数字）" textColorHint="#9E9E9E" />
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="Determine" text="确定" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                            <text id="cancel" text="取消" textStyle="bold" textColor="{{context_textColor}}" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                </vertical>, null, false);
            view.Determine.click(() => {
                let day = String(view.Day.getText());
                let night = String(view.Night.getText());
                while (true) {
                    if (day.search(" ") >= 0) {
                        var day = day.replace(" ", "");
                    } else if (night.search(" ") >= 0) {
                        var night = night.replace(" ", "");
                    } else {
                        break;
                    }
                }
                if (day == "") {
                    view.Day.setError("您未输入任何内容");
                } else if (night == "") {
                    view.Night.setError("您未输入任何内容");
                } else if (day == night) {
                    view.Night.setError("浅色与夜间主题不能在同一时间切换");
                } else if (day < 0 || day > 23) {
                    view.Day.setError("时间数应大于等于0小于24");
                } else if (night < 0 || night > 23) {
                    view.Night.setError("时间数应大于等于0小于24");
                } else if (isNaN(night) == true) {
                    view.Night.setError("您输入的时间非数字");
                } else if (isNaN(day) == true) {
                    view.Day.setError("您输入的时间数非数字");
                } else {
                    DHK.dismiss();
                    ui.DayNight.setChecked(true);
                    setStorageData("DayNightSetting", "AutoDayNight", true);
                    setStorageData("DayNightSetting", "DayTime", day);
                    setStorageData("DayNightSetting", "NightTime", night);
                    let DAY = "";
                    let NIGHT = "";
                    ui.DayNight.setChecked(true);
                    let a = Number(getStorageData("DayNightSetting", "DayTime"));
                    let b = Number(getStorageData("DayNightSetting", "NightTime"));
                    let c = Number(getStorageData("DayNightSetting", "NightTime"));
                    let d = Number(getStorageData("DayNightSetting", "DayTime"));
                    if (a > b) {
                        var DAY = "次日";
                    }
                    if (c > d) {
                        var NIGHT = "次日";
                    }
                    ui.nighttip.attr("textSize", "5sp");
                    ui.nighttip.setText("浅色：" + getStorageData("DayNightSetting", "DayTime") + "时-" + DAY + getStorageData("DayNightSetting", "NightTime") + "时  夜间：" + getStorageData("DayNightSetting", "NightTime") + "时-" + NIGHT + getStorageData("DayNightSetting", "DayTime") + "时");
                }
            });
            view.cancel.click(() => {
                DHK.dismiss();
            })
            var DHK = dialogs.build({
                customView: view,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
        } else {
            ui.DayNight.setChecked(false);
            delStorageData("DayNightSetting", "AutoDayNight");
            ui.nighttip.attr("textSize", "0sp");
            ui.nighttip.setText("");
        }
    });
    ui.Gradient.on("check", (checked) => {
        if (ui.Gradient.isChecked() == true) {
            ui.Gradient.setChecked(true);
            setStorageData("ColorSetting", "GradientColor", true);
        } else {
            ui.Gradient.setChecked(false);
            delStorageData("ColorSetting", "GradientColor");
        }
    });
    ui.uiProtect.on("check", (checked) => {
        if (ui.uiProtect.isChecked() == true) {
            ui.uiProtect.setChecked(true);
            ui.tips.setText("");
            setStorageData("uiProtectSetting", "UiProtect", true);
        } else {
            ui.uiProtect.setChecked(false);
            delStorageData("uiProtectSetting", "UiProtect");
            ui.tips.setText("* 推荐开启以防止直接退出导致界面关闭");
        }
    });
    ui.DeleteJsSettings.click(() => {
        let Deletejsview = ui.inflate(
            <frame background="{{context_framebg}}" padding="5">
                <scroll>
                    <vertical>
                        <linear orientation="horizontal" gravity="left||center">
                            <img src="{{context_Logo}}" w="85" h="35" />
                            <linear orientation="horizontal" w="match_parent" gravity="right||center">
                                <text text="删除脚本配置" textStyle="bold" textSize="20" textColor="{{context_textColor}}" marginRight="5" />
                            </linear>
                        </linear>
                        <View bg="{{context_SettingsCard}}" w="*" h="1" margin="5" />
                        <list id="alljslist">
                            <card w="*" h="50" cardCornerRadius="10dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                                <linear orientation="horizontal" gravity="center|left">
                                    <img id="checkthisjs" src="{{icon}}" w="30" h="30" tint="{{context_textColor}}" marginLeft="5" />
                                    <text id="name" textSize="16sp" gravity="left||center" textColor="{{context_textColor}}" text="{{name}}" />
                                </linear>
                                <linear gravity="center||right" marginRight="20">
                                    <img id="deleteItem" src="@drawable/ic_delete_forever_black_48dp" w="35" h="35" tint="{{context_textColor}}" foreground="?attr/selectableItemBackground" clickable="true" />
                                </linear>
                            </card>
                        </list>
                        <text id="Ttip" text="已经到底啦" textSize="10" textColor="{{context_textColor}}" margin="5 5 5 100" alpha="0.5" gravity="bottom||center" />
                    </vertical>
                </scroll>
                <card w="*" h="50" cardCornerRadius="10dp" cardElevation="0dp" layout_gravity="bottom" margin="5" cardBackgroundColor="{{context_SettingsCard}}">
                    <linear orientation="horizontal" gravity="center|left">
                        <img id="checkAll" src="@drawable/ic_panorama_fish_eye_black_48dp" w="30" h="30" tint="{{context_textColor}}" marginLeft="5" />
                        <text id="checkAllText" textSize="16sp" gravity="left||center" textColor="{{context_textColor}}" text="全选" />
                    </linear>
                    <linear gravity="center||right" marginRight="20">
                        <card id="finaldel" h="0" cardCornerRadius="5dp" gravity="center_vertical" cardBackgroundColor="#000000" foreground="?attr/selectableItemBackground" clickable="true">
                            <text text="删除" textColor="{{context_textColor}}" textSize="16sp" gravity="center" margin="10 0" />
                        </card>
                    </linear>
                </card>
            </frame>, null, false);
        if (files.listDir("/sdcard/").length == 0) {
            Deletejsview.Ttip.setText("无存储权限，无法获取脚本配置");
        }
        Deletejsview.finaldel.click(() => {
            let view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <img src="@drawable/ic_warning_black_48dp" h="20" marginTop="3" tint="#F44336" layout_gravity="center" />
                        <text id="deleteTitle" textSize="15" textStyle="bold" margin="0 5 10 0" textColor="#F44336" />
                    </linear>
                    <text id="deleteTips" textStyle="bold" textSize="10" margin="10 5 10 5" textColor="#D32F2F" />
                    <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#F44336">
                            <text id="Determine" text="确定删除" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                        <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#4CAF50">
                            <text id="cancel" text="取消删除" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                        </card>
                    </linear>
                </vertical>, null, false);
            view.deleteTitle.setText("您确定要删除以下" + context_ListDeletejs.length + "个脚本配置吗？");
            view.deleteTips.setText("本次将删除的脚本配置包含：\n“" + context_ListDeletejs + "”\n\n脚本配置一旦删除将无法恢复，若有个人文件存储于这些目录下请点击对应的单独删除按钮进行检查");
            view.cancel.click(() => {
                DHK.dismiss();
            });
            view.Determine.click(() => {
                let deleteWrong = [];
                for (let i = 0; i < context_ListDeletejs.length; i++) {
                    if (files.removeDir("/storage/emulated/0/OrangeJs/" + context_ListDeletejs[i]) == false) {
                        deleteWrong.push(context_ListDeletejs[i]);
                    }
                }
                if (deleteWrong.length == 0) {
                    DHK.dismiss();
                    let views = ui.inflate(
                        <vertical padding="25 0" bg="{{context_framebg}}">
                            <img src="@drawable/ic_check_circle_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                            <text id="deleteDone" textStyle="bold" textSize="15" margin="10" textColor="{{context_textColor}}" gravity="center" />
                            <text id="deleteDonetips" textSize="10" margin="5" textColor="{{context_textColor}}" gravity="center" />
                        </vertical>
                    );
                    views.deleteDone.setText("已成功删除" + context_ListDeletejs.length + "个脚本配置");
                    views.deleteDonetips.setText("已被删除的脚本配置目录：\n“" + context_ListDeletejs + "”");
                    dialogs.build({
                        customView: views,
                        wrapInScrollView: false,
                        autoDismiss: true
                    }).show();
                } else {
                    DHK.dismiss();
                    let views = ui.inflate(
                        <vertical padding="25 0" bg="{{context_framebg}}">
                            <img src="@drawable/ic_cancel_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                            <text id="deleteDone" textStyle="bold" textSize="15" margin="10" textColor="{{context_textColor}}" gravity="center" />
                            <text id="deleteDonetips" textSize="10" margin="5" textColor="{{context_textColor}}" gravity="center" />
                        </vertical>
                    );
                    views.deleteDone.setText("共有" + deleteWrong.length + "个脚本配置删除失败！");
                    views.deleteDonetips.setText("以下为本次删除失败的脚本配置目录：\n“" + deleteWrong + "”");
                    dialogs.build({
                        customView: views,
                        wrapInScrollView: false,
                        autoDismiss: true
                    }).show();
                }
                context_ListDeletejs = [];
                var items = [];
                for (let i = 0; i < files.listDir("/storage/emulated/0/OrangeJs").length; i++) {
                    if (files.isDir("/storage/emulated/0/OrangeJs/" + files.listDir("/storage/emulated/0/OrangeJs")[i]) == true) {
                        items.push({
                            icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                            name: files.listDir("/storage/emulated/0/OrangeJs")[i]
                        });
                    }
                }
                Deletejsview.alljslist.setDataSource(items);
                Deletejsview.finaldel.attr("h", 0);
                Deletejsview.checkAllText.setText("全选");
                Deletejsview.checkAll.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
            });
            let DHK = dialogs.build({
                customView: view,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
        });

        var items = [];
        for (let i = 0; i < files.listDir("/storage/emulated/0/OrangeJs").length; i++) {
            if (files.isDir("/storage/emulated/0/OrangeJs/" + files.listDir("/storage/emulated/0/OrangeJs")[i]) == true) {
                items.push({
                    icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                    name: files.listDir("/storage/emulated/0/OrangeJs")[i]
                });
            }
        }
        Deletejsview.alljslist.setDataSource(items);
        context_ListDeletejs = [];
        Deletejsview.alljslist.on("item_click", function (item, i, itemView, alljslistView) {
            if (context_ListDeletejs.indexOf(item.name) >= 0) {
                context_ListDeletejs.remove(item.name);
                itemView.checkthisjs.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
            } else {
                context_ListDeletejs.push(item.name);
                itemView.checkthisjs.setSource("@drawable/ic_check_circle_black_48dp");
            }
            if (context_ListDeletejs.length > 0) {
                Deletejsview.finaldel.attr("h", 35);
                Deletejsview.finaldel.attr("cardBackgroundColor", "#F44336");
                Deletejsview.checkAllText.setText("全选（已勾选" + context_ListDeletejs.length + "个）");
            } else {
                Deletejsview.finaldel.attr("h", 0);
                Deletejsview.checkAllText.setText("全选");
                Deletejsview.checkAll.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
            }
            if (context_ListDeletejs.length > 0 && context_ListDeletejs.length == items.length) {
                Deletejsview.checkAll.setSource("@drawable/ic_check_circle_black_48dp");
                Deletejsview.finaldel.attr("h", 35);
                Deletejsview.finaldel.attr("cardBackgroundColor", "#F44336");
            } else if (context_ListDeletejs.length > 0) {
                Deletejsview.checkAll.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
            }
        });

        Deletejsview.alljslist.on("item_bind", function (itemView, itemHolder) {
            itemView.deleteItem.on("click", function () {
                let item = itemHolder.item;
                let view = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                            <img src="@drawable/ic_warning_black_48dp" h="20" marginTop="3" tint="#F44336" layout_gravity="center" />
                            <text id="deleteTitle" textSize="15" textStyle="bold" margin="0 5 10 0" textColor="#F44336" />
                        </linear>
                        <text id="deleteTips" textStyle="bold" textSize="10" margin="10 5 10 5" textColor="#D32F2F" />
                        <linear orientation="horizontal" align="left" margin="0" paddingTop="0">
                            <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#F44336">
                                <text id="Determine" text="确定删除" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                            </card>
                            <card layout_weight="50" h="40" cardCornerRadius="5dp" cardElevation="0dp" gravity="center_vertical" margin="5" cardBackgroundColor="#4CAF50">
                                <text id="cancel" text="取消删除" textStyle="bold" textColor="#FFFFFF" gravity="center" textSize="12sp" foreground="?attr/selectableItemBackground" clickable="true" />
                            </card>
                        </linear>
                    </vertical>, null, false);
                view.deleteTitle.setText("您确定要删除“" + item.name + "”的脚本配置吗？");
                if (files.isDir("/storage/emulated/0/OrangeJs/" + item.name) == true && files.isEmptyDir("/storage/emulated/0/OrangeJs/" + item.name) == true) {
                    view.deleteTips.setText("“" + item.name + "”是一个空文件夹，可以放心删除");
                } else if (files.isDir("/storage/emulated/0/OrangeJs/" + item.name) == true) {
                    var listFile = null;
                    for (let i = 0; i < files.listDir("/storage/emulated/0/OrangeJs/" + item.name).length; i++) {
                        if (listFile == null) {
                            var listFile = "“" + files.listDir("/storage/emulated/0/OrangeJs/" + item.name)[i] + "”";
                        } else {
                            var listFile = listFile + "，" + "“" + files.listDir("/storage/emulated/0/OrangeJs/" + item.name)[i] + "”";
                        }
                    }
                    view.deleteTips.setText("“" + item.name + "”是一个非空文件夹，其中包括" + listFile + "文件，请谨慎删除");
                } else if (files.isFile("/storage/emulated/0/OrangeJs/" + item.name) == true) {
                    view.deleteTips.setText("“" + item.name + "”是一个" + files.getExtension("/storage/emulated/0/OrangeJs/" + item.name) + "文件，请谨慎删除");
                }
                view.Determine.click(() => {
                    if (files.removeDir("/storage/emulated/0/OrangeJs/" + item.name) == true) {
                        items.splice(itemHolder.position, 1);
                        DHK.dismiss();
                        let views = ui.inflate(
                            <vertical padding="25 0" bg="{{context_framebg}}">
                                <img src="@drawable/ic_check_circle_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                                <text id="deleteDone" textStyle="bold" textSize="15" margin="10" textColor="{{context_textColor}}" gravity="center" />
                            </vertical>
                        );
                        views.deleteDone.setText("已成功删除“" + item.name + "”的脚本配置");
                        dialogs.build({
                            customView: views,
                            wrapInScrollView: false,
                            autoDismiss: true
                        }).show();
                    } else {
                        DHK.dismiss();
                        let views = ui.inflate(
                            <vertical padding="25 0" bg="{{context_framebg}}">
                                <img src="@drawable/ic_cancel_black_48dp" size="20" margin="5" gravity="center" tint="{{context_textColor}}" />
                                <text id="deleteDone" textStyle="bold" textSize="15" margin="10" textColor="{{context_textColor}}" gravity="center" />
                            </vertical>
                        );
                        views.deleteDone.setText("删除“" + item.name + "”的脚本配置失败！");
                        dialogs.build({
                            customView: views,
                            wrapInScrollView: false,
                            autoDismiss: true
                        }).show();
                    }
                });
                view.cancel.click(() => {
                    DHK.dismiss();
                });
                let DHK = dialogs.build({
                    customView: view,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
            });
        })
        context_CheckAlldelete = false;
        Deletejsview.checkAll.on("click", function (item, i, itemView, alljslistView) {
            if (context_CheckAlldelete == true) {
                context_CheckAlldelete = false;
                Deletejsview.checkAll.setSource("@drawable/ic_panorama_fish_eye_black_48dp");
                var items = [];
                for (let i = 0; i < files.listDir("/storage/emulated/0/OrangeJs").length; i++) {
                    if (files.isDir("/storage/emulated/0/OrangeJs/" + files.listDir("/storage/emulated/0/OrangeJs")[i]) == true) {
                        items.push({
                            icon: "@drawable/ic_panorama_fish_eye_black_48dp",
                            name: files.listDir("/storage/emulated/0/OrangeJs")[i]
                        });
                    }
                }
                Deletejsview.alljslist.setDataSource(items);
                context_ListDeletejs = [];
            } else {
                context_CheckAlldelete = true;
                Deletejsview.checkAll.setSource("@drawable/ic_check_circle_black_48dp");
                var items = [];
                for (let i = 0; i < files.listDir("/storage/emulated/0/OrangeJs").length; i++) {
                    if (files.isDir("/storage/emulated/0/OrangeJs/" + files.listDir("/storage/emulated/0/OrangeJs")[i]) == true) {
                        items.push({
                            icon: "@drawable/ic_check_circle_black_48dp",
                            name: files.listDir("/storage/emulated/0/OrangeJs")[i]
                        });
                    }
                }
                Deletejsview.alljslist.setDataSource(items);
                context_ListDeletejs = [];
                for (let i = 0; i < items.length; i++) {
                    context_ListDeletejs.push(items[i].name);
                }
            }
            if (context_ListDeletejs.length > 0) {
                Deletejsview.checkAllText.setText("全选（已勾选" + context_ListDeletejs.length + "个）");
                Deletejsview.finaldel.attr("h", 35);
                Deletejsview.finaldel.attr("cardBackgroundColor", "#F44336");
            } else {
                Deletejsview.checkAllText.setText("全选");
                Deletejsview.finaldel.attr("h", 0);
            }
        });

        Array.prototype.indexOf = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        let deleteDHK = dialogs.build({
            customView: Deletejsview,
            wrapInScrollView: false,
            autoDismiss: false
        }).show();
    });
    ui.GetUiObject.click(() => {
        let a = auto.service;
        if (a == null) {
            let view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <img src="@drawable/ic_error_outline_black_48dp" h="35" tint="{{context_textColor}}" marginTop="5" />
                    <text text="请开启“无障碍服务”" textSize="15" margin="5 0" textStyle="bold" gravity="center" textColor="{{context_textColor}}" />
                    <text text="此功能需要“无障碍服务”，请前往主界面打开" textSize="10" gravity="center" margin="5 0 5 5" textColor="{{context_textColor}}" alpha="0.9" />
                </vertical>, null, false);
            dialogs.build({
                customView: view,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
        } else {
            let sharevalue = 'context_framebg="' + context_framebg + '";context_textColor="' + context_textColor + '";context_SettingsCard="' + context_SettingsCard + '";context_Logo="' + context_Logo + '";';
            engines.execScript("APP控件数据获取界面", "'ui';\n" + sharevalue + "\nUiObjectSearch();\n" + UiObjectSearch.toString());
        }
    });
    ui.CodeTest.click(() => {
        let a = auto.service;
        if (a == null) {
            let view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <img src="@drawable/ic_error_outline_black_48dp" h="35" tint="{{context_textColor}}" marginTop="5" />
                    <text text="请开启“无障碍服务”" textSize="15" margin="5 0" textStyle="bold" gravity="center" textColor="{{context_textColor}}" />
                    <text text="此功能需要“无障碍服务”，请前往主界面打开" textSize="10" gravity="center" margin="5 0 5 5" textColor="{{context_textColor}}" alpha="0.9" />
                </vertical>, null, false);
            dialogs.build({
                customView: view,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
        } else {
            engines.execScript("开关人员代码测试", "'ui';\nTESTCode();\n" + TESTCode.toString());
        }
    });
    ui.Appsettings.click(() => {
        app.startActivity({
            action: "android.intent.action.VIEW",
            packageName: "com.orange.orangejs",
            className: "com.stardust.auojs.inrt.SettingsActivity"
        });
    });
    var ZhuTiTu = [];
    
}