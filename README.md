# AutoJS学习笔记

## 什么是Auto.js

``Auto.js``是个基于``JavaScript``语言运行在Android平台上的脚本框架。Auto.js主要工作原理是基于辅助服务``AccessibilityService``

## 功能介绍

- 数据监控：可以监视当前手机数据
- 图片监控：截图获取当前页面信息
- 控件操作：模拟操作手机控件
- 自动化工作流：编写简单的脚本，完成一系列自动化操作。如：微信/QQ自动点赞，快速抢单等。
- 定时功能：定时执行某个脚本，来完成定时任务。如：定时打卡签到等

## 项目介绍

- 项目地址：https://github.com/hyb1996/Auto.js
- 官方论坛：https://www.autojs.org/
- 在线文档：https://hyb1996.github.io/AutoJs-Docs/#/
- 简介：一个支持无障碍服务的Android平台上的Javascript IDE,其发展目标是JsBox和Workflow。
- 主要功能：由无障碍服务实现的简单易用的自动操作函数
- 协议：基于Mozilla Public License Version 2.0

## 手机安装使用步骤

①下载Auto.js或者AutoPro.js软件

![image-20210308130921041](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308130921041.png)

②开启无障碍服务

![image-20210308131054481](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308131054481.png)

无障碍服务每个品牌手机不一样，大家根据品牌手机开启即可

![image-20210308131151595](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308131151595.png)

![image-20210308131235144](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308131235144.png)

悬浮窗有4个控件：

![image-20210308131348210](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308131348210.png)

- 1）脚本列表
- 2）自动录制
- 3）布局范围分析与布局层次分析
- 4）更多

## Auto的优点

①开源：代码开源，可以查到源码

②无需root：Android7.0以上功能基本不需要root

③免费

④易用：代码自动生成

⑤语言：标准的JS语法

⑥灵活

⑦扩展：提供JS转JAVA桥梁，存在无限多的扩展

## 提倡自动动手编写Auto.js脚本

①安全：Auto.JS脚本拥有很大的权限，使用他人的脚本可能存在风险。

②编写简单：JS 脚本嵌套中文，方便阅读和书写。

③脚本升级：一旦APP版本升级，原脚本可能不使用了。

④提升自己的编写代码能力和解决问题能力。

## PC环境搭建

### VSCode安装

Visual Studio Code 官方下载地址：[https://code.visualstudio.com](https://code.visualstudio.com/) 根据你的电脑平台选择版本下载。

## Node.js安装

Node.js 官方下载地址：https://nodejs.org/en/download/  根据你的电脑平台选择版本下载。

### 安装AutoJS插件

点击 `扩展` 搜索 `Auto.js` 或 `hyb1996` 即可找到Auto.JS插件。

![image-20210308131809570](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308131809570.png)

#### 使用AutoJS插件开发

**`1.开启AutoJS插件`**

按 Ctrl+Shift+P 或点击"查看"->"命令面板"可调出命令面板，输入 Auto.js 可以看到几个命令，移动光标到命令Auto.js: Start Server，按回车键执行该命令。

![image-20210308131854965](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308131854965.png)

此时VS Code会在右上角显示"Auto.js server running"，即开启服务成功。

![image-20210308131933190](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308131933190.png)

**`2.连接手机终端`**

将手机连接到电脑启用的Wifi或者同一局域网中。通过命令行ipconfig(或者其他操作系统的相同功能命令)查看电脑的IP地址。在Auto.js的侧拉菜单中启用调试服务，并输入IP地址，等待连接成功。

![image-20210308132019642](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308132019642.png)



在电脑上编辑JavaScript文件并通过命令Run或者按键F5在手机上运行。

手机终端运行结果：

![image-20210308132212171](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210308132212171.png)

#### AutoJS插件常用命令

按 Ctrl+Shift+P 或点击"查看"->"命令面板"可调出命令面板，输入 Auto.js 可以看到几个命令：

`Start Server`: 启动插件服务。之后在确保手机和电脑在同一区域网的情况下，在Auto.js的侧拉菜单中使用连接电脑功能连接。
`Stop Server`: 停止插件服务。
`Run` 运行当前编辑器的脚本。如果有多个设备连接，则在所有设备运行。
`Rerun` 停止当前文件对应的脚本并重新运行。如果有多个设备连接，则在所有设备重新运行。
`Stop` 停止当前文件对应的脚本。如果有多个设备连接，则在所有设备停止。
`StopAll` 停止所有正在运行的脚本。如果有多个设备连接，则在所有设备运行所有脚本。
`Save` 保存当前文件到手机的脚本默认目录（文件名会加上前缀remote)。如果有多个设备连接，则在所有设备保存。
`RunOnDevice`: 弹出设备菜单并在指定设备运行脚本。
`SaveToDevice:` 弹出设备菜单并在指定设备保存脚本。
`New Project`（新建项目）：选择一个空文件夹（或者在文件管理器中新建一个空文件夹），将会自动创建一个项目
`Run Project`（运行项目）：运行一个项目，需要Auto.js 4.0.4Alpha5以上支持
`Save Project`（保存项目）：保存一个项目，需要Auto.js 4.0.4Alpha5以上支持

以上命令一些有对应的快捷键，参照命令后面的说明即可。

## 常见容器控件

| LinearLayout   | 线性布局容器 |
| -------------- | ------------ |
| RelativeLayout | 相对布局容器 |
| FrameLayout    | 帧布局       |
| ListView       | 列表容器     |
| RecyclerView   | 复用容器     |
| ScrollView     | 滚动容器     |

![image-20210306153008566](https://gitee.com/ran_yong/auto.js/raw/master/img/image-20210306153008566.png)

## API文档

### 应用APP

```javascript
launchApp("微信");   // 通过app名启动
launch("com.tencent.mm");  // 通过包名启动
app.uninstall("com.tencent.mm");  // 通过包名卸载
app.openUrl("www.baidu.com");  // 通过手机浏览器打开指定url
app.openAppSetting("com.tencent.mm");  // 打开指定app应用详情页
app.getPackageName(); // 获取应用包名  
```

### 基于坐标操作

```javascript
cilck(x,y); // 模拟点击坐标x,y   
longclick(x,y);  //模拟长按坐标x,y
press(x,y,duration);  // 模拟按住x,y,duration为按住的时间（通常以毫秒为单位）
swipe(x1,y1,x2,y2,duration);  // 模拟从坐标x1,y1滑动到x2,y2，duration为滑动的时间（通常以毫秒为单位）
gesture(delay1,duration1,[x1,y1],[x2,y2],[x3,y3],....);  // 同时模拟多个手势，delay1为延迟多久，duration1为手势执行时长
```

### 设备-Devices

```javascript
device.width   // 设备屏幕分辨率宽度
device.height  // 设备屏幕分辨率高度
device.release  // Android系统版本号
device.getIMEI()  // 返回设备IMEI号
device.getBrightness()  // 返回当前亮度。范围0~255
device.getBrightnessMode()  // 返回当前亮度模式，0为手动亮度，1为自动亮度
device.setBrightness(b)   // 设置当前手动亮度  b:0~255
device.setBrightnessMode(mode)  // 设置当前亮度模式  mode：0为手动亮度，1为自动亮度
device.getMusicVolume()  // 返回当前媒体音量
device.setMusicVolume(volume)  // 设置当前媒体音量  volume：0~99
device.wakeUpIfNeeded()   // 唤醒设备
device.keepScreenOn()   // 一直保持屏幕常亮
device.cancelKeepingAwake()   // 取消屏幕常亮
```

### 对话框

```javascript
alert("您好");    // 弹出一个标题为“您好”对话框，只许用户点击确定
alert("您好","AutoJS");    // 弹出一个标题为“您好”，内容为“AutoJS”的对话框，只许用户点击确定
confirm("要清除所有缓存吗?");   //弹出一个标题为“要清除所有缓存吗?”的对话框，需要用户点击确定或取消
confirm("要清除所有缓存吗?","点击确定立马清理");   //弹出一个标题为“要清除所有缓存吗?”，内容为“点击确定立马清理”的对话框，用户可以点击确定或取消

举个例子：
"ui";
// 回调形式
confirm("要清除所有缓存吗?").then(clear => {
    if (clear) {
        alert("清除成功!");
    }
});

dialogs.alert(title,content,callback);  // title:对话框标题，content：对话框内容，callback：用于UI模式
举个例子：
"ui";
alert("嘿嘿嘿").then(()=>{    // ②一旦用户点击确定，就会弹出一个“嘿嘿嘿”的一个对话框，需要用户点击确定
    //当点击确定后会执行这里
});
alert("出现错误~", "出现未知错误，请联系脚本作者");   // ①弹出标题为“出现错误~”，内容为“出现未知错误，请联系脚本作者”的一个对话框，需要用户点击确定
exit();   //退出程序

dialogs.confirm(title,content,callback);   // title:对话框标题，content：对话框内容，callback：用于UI模式
举个例子：
"ui";
confirm("确定吗").then(value => {    // ②一旦用户不管点了确定或者取消都会再次弹出一个确定或者取消的按钮，所以不建议用两次confirm
    //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
});
confirm("要清理垃圾吗？");     // ①弹出标题为“要清理垃圾吗？”的一个对话框，需要用户点击确定或者取消
exit();

dialogs.rawInput(title,prefill,callback);   // title:对话框标题，prefill：输入框内容，callback：用于UI模式
举个例子：
rawInput("请输入您的名字", "小冉");  // 显示一个包含输入框的对话框，等待用户输入内容
用于全局函数：
var 名字 = rawInput("请输入您的名字", "小冉");     
alert("您的名字是" + 名字);
用于UI模式：
"ui";
rawInput("请输入您的名字", "小冉").then(name => {
    alert("您的名字是" + name);
});

dialogs.input(title,prefill,callback);   // title:对话框标题，prefill：输入框内容，callback：用于UI模式，该函数和rawInput的区别在于，会把输入的字符串用eval计算一遍再返回，返回的可能不是字符串。可以用该函数输入数字、数组等。
举个例子：
dialogs.input("请输入您的年龄", "18");    // 显示一个包含输入框的对话框，等待用户输入内容
用于全局函数：
var age = dialogs.input("请输入您的年龄", "18");
// new Date().getYear() + 1900 可获取当前年份
var year = new Date().getYear() + 1900 - age;
alert("您的出生年份是" + year);             
用于UI模式：
"ui";
dialogs.input("请输入您的年龄", "18").then(age => {
    var year = new Date().getYear() + 1900 - age;
    alert("您的出生年份是" + year);
});

dialogs.select(title,items,callback);   // title:对话框标题，items：对话框的选项列表，是一个字符串数组，callback:用于UI模式
举个例子：
dialogs.select("请选择一个选项:", ["选项A", "选项B", "选项C", "选项D"]);  // 显示一个带有选项列表的对话框，等待用户选择，返回用户选择的选项索引(0 ~ item.length - 1)
用于全局函数：
var options = ["选项A", "选项B", "选项C", "选项D"]
var i = dialogs.select("请选择一个选项", options);
if (i >= 0) {
    toast("您选择的是" + options[i]);
} else {
    toast("您取消了选择");
}
用于UI模式：
"ui";
dialogs.select("请选择一个选项", ["选项A", "选项B", "选项C", "选项D"]).then(i => {
        toast(i);
});

dialogs.singleChoice(title,items,index,callback);  // title对话框的标题，items：对话框的选项列表，是一个字符串数组，index：对话框的初始选项的位置，callback:用于UI模式
dialogs.singleChoice("标题 ", ["选项A", "选项B", "选项C", "选项D"], 1); // 显示一个单选列表对话框
用于全局函数：
var options = ["选项A", "选项B", "选项C", "选项D"]
var i = dialogs.singleChoice("请选择一个选项", options);
if (i >= 0) {
    toast("您选择的是" + options[i]);
} else {
    toast("您取消了选择");
}
用于UI模式：
"ui";
dialogs.singleChoice("请选择一个选项", ["选项A", "选项B", "选项C", "选项D"], 1).then(i => {
    toast(i);
});

dialogs.multiChoice(title,items,indices,callback);  // title对话框的标题，items：对话框的选项列表，是一个字符串数组，index：对话框的初始选项的位置，callback:用于UI模式
举个例子：
dialogs.multiChoice("请选择一个选项", ["选项A", "选项B", "选项C", "选项D"]);  // 显示一个多选列表对话框
用于全局函数：
var options = ["选项A", "选项B", "选项C", "选项D"]
var i = dialogs.multiChoice("请选择一个选项", options);
if (i >= 0) {
    toast("您选择的是" + options[i]);
} else {
    toast("您取消了选择");
}
用于UI模式：
"ui";
dialogs.multiChoice("请选择一个选项", ["选项A", "选项B", "选项C", "选项D"]).then(i => {
    toast(i);
});

dialogs.build(properties);  // properties： 对话框属性
选项properties可供配置的项目为:
- title {string} 对话框标题
- titleColor {string} | {number} 对话框标题的颜色
- buttonRippleColor {string} | {number} 对话框按钮的波纹效果颜色
- icon {string} | {Image} 对话框的图标，是一个URL或者图片对象
- content {string} 对话框文字内容
- contentColor{string} | {number} 对话框文字内容的颜色
- contentLineSpacing{number} 对话框文字内容的行高倍数，1.0为一倍行高
- items {Array} 对话框列表的选项
- itemsColor {string} | {number} 对话框列表的选项的文字颜色
- itemsSelectMode {string} 对话框列表的选项选择模式，可以为:
- select 普通选择模式
- single 单选模式
- multi 多选模式
- itemsSelectedIndex {number} | {Array} 对话框列表中预先选中的项目索引，如果是单选模式为一个索引；多选模式则为数组
- positive {string} 对话框确定按钮的文字内容(最右边按钮)
- positiveColor {string} | {number} 对话框确定按钮的文字颜色(最右边按钮)
- neutral {string} 对话框中立按钮的文字内容(最左边按钮)
- neutralColor {string} | {number} 对话框中立按钮的文字颜色(最左边按钮)
- negative {string} 对话框取消按钮的文字内容(确定按钮左边的按钮)
- negativeColor {string} | {number} 对话框取消按钮的文字颜色(确定按钮左边的按钮)
- checkBoxPrompt {string} 勾选框文字内容
- checkBoxChecked {boolean} 勾选框是否勾选
- progress {Object} 配置对话框进度条的对象：
- max {number} 进度条的最大值，如果为-1则为无限循环的进度条
- horizontal {boolean} 如果为true, 则对话框无限循环的进度条为水平进度条
- showMinMax {boolean} 是否显示进度条的最大值和最小值
- cancelable {boolean} 对话框是否可取消，如果为false，则对话框只能用代码手动取消
- canceledOnTouchOutside {boolean} 对话框是否在点击对话框以外区域时自动取消，默认为true
- inputHint {string} 对话框的输入框的输入提示
- inputPrefill {string} 对话框输入框的默认输入内容

举个例子：
dialogs.build({
    //对话框标题
    title: "当前微信APP版本未经测试",
    titleColor: "#F44336",
    contentLineSpacing: 1.2,
    //对话框内容
    content: "本脚本目前已测试的软件版本有：\n微信" + "\n如您使用没有问题可直接忽略\n若有问题可使用相应版本或反馈",
    //对话框文字颜色
    contentColor: "#777777",
    //确定键内容
    positive: "继续运行",
    positiveColor: "#388E3C",
    //取消键内容
    negative: "取消运行",
    negativeColor: "#D32F2F",
    //中性键内容
    neutral: "给作者反馈",
    neutralColor: "#616161",
    cancelable: false,
    canceledOnTouchOutside: false,
    //勾选框内容
    checkBoxPrompt: "能正常使用，不再提示"
}).on("positive", () => {
    //监听确定键
    toast("继续运行脚本");
}).on("neutral", () => {
    //监听中性键
    app.openUrl("https://wj.qq.com/s2/8104693/5e7b");
}).on("negative", () => {
    //监听消极键
    exit();
}).on("check", (checked) => {
    //监听勾选框
    log("勾选框状态：" + checked);
}).show();
```

### 事件与监听

```javascript
events.onKeyDown(keyName, listener);  // keyName:要监听的按键名称，listener：按键监听器
- volume_up 音量上键
- volume_down 音量下键
- home 主屏幕键
- back 返回键
- menu 菜单键
举个例子：
//启用按键监听
events.observeKey();
//监听"主屏幕键按下
events.onKeyDown("home", function(event){
    toast("主屏幕键被按下了");
});
//监听返回键按下
events.onKeyDown("back", function(event){
    toast("返回键被按下了");
    exit();
});

events.onKeyUp(keyName, listener);  // keyName:要监听的按键名称，listener：按键监听器 
举个例子：
//启用按键监听
events.observeKey();
//监听音量下键弹起
events.onKeyDown("volume_down", function(event){
    toast("音量上键弹起");
});
//监听Home键弹起
events.onKeyDown("home", function(event){
    toast("Home键弹起");
    exit();
});
```

### 悬浮窗

```javascript
floaty.window(layout);   // 指定悬浮窗的布局，创建并显示一个悬浮窗
举个例子：
var w = floaty.window(
    <frame gravity="center">
        <text id="text">悬浮文字</text>
    </frame>
);
setInterval(() => { }, 1000);

floaty.rawWindow(layout); // 指定悬浮窗的布局，创建并显示一个原始悬浮窗，您可以根据自己需要编写任何布局
举个例子：
var w = floaty.rawWindow(
    <frame gravity="center">
        <text id="text">悬浮文字</text>
    </frame>
);

w.setPosition(500, 500);   设置悬浮窗位置。

setTimeout(()=>{
    w.close();
}, 2000);
```

### 文件系统

```javascript
files.createWithDirs(path);  // 创建一个文件或文件夹并返回是否创建成功。如果文件所在文件夹不存在，则先创建他所在的一系列文件夹
举个例子：
files.createWithDirs("/sdcard/新文件夹/新文件夹/新文件夹/1.txt");

files.exists(path);   // 返回在路径path处的文件是否存在。
举个例子：
log(files.exists("/sdcard/新文件夹/新文件夹/新文件夹/1.txt"));

files.read(path[, encoding = "utf-8"]);  // 读取文本文件path的所有内容并返回
举个例子：
log(files.read("/sdcard/1.txt", encoding = "utf-8"));

files.write(path, text);   // 把text写入到文件path中。 新的text会覆盖以前的
举个例子：
var text = "这是一个文件内容";
// 判断是否有此文件，如果没就创建一个
files.createWithDirs("/sdcard/1.txt");
//写入文件
files.write("/sdcard/1.txt", text);
//用其他应用查看文件
app.viewFile("/sdcard/1.txt");

files.append(path, text);  // 把text追加到文件path的末尾
举个例子：
var text = "追加的文件内容";
files.append("/sdcard/1.txt", text);
files.append("/sdcard/1.txt", text);
//用其他应用查看文件
app.viewFile("/sdcard/1.txt");

files.copy(fromPath, toPath);  // 复制文件，返回是否复制成功
举个例子：
files.copy("/sdcard/1.txt", "/sdcard/Download/1.txt");

files.move(fromPath, toPath);  // 移动文件，返回是否移动成功也可改名
举个例子：
files.move("/sdcard/1.txt", "/sdcard/Download/1.txt");

files.getName(path);  // 返回文件的文件名
举个例子：
log(files.getName("/sdcard/1.txt"));

files.remove(path);  // 删除文件或空文件夹，返回是否删除成功
举个例子：
log(files.remove("/sdcard/1.txt"));

files.removeDir(path);  // 删除文件夹，如果文件夹不为空，则删除该文件夹的所有内容再删除该文件夹
举个例子：
log(files.removeDir("/sdcard/1.txt"));

files.getSdcardPath();  // 返回SD卡路径
举个例子：
log(files.getSdcardPath());   // 返回结果：/storage/emulated/0

close();  // 关闭该文件
```

### 全局函数

```javascript
sleep(n);  // n:暂停运行n毫秒的时间。1秒等于1000毫秒。
举个例子：
sleep(1000);  // 暂停运行1秒

currentPackage(); // 返回正在运行的应用的包名
举个例子：
log(currentPackage());  // 返回：org.autojs.autojspro

currentActivity();  // 返回正在运行的Activity的名称
举个例子：
log(currentActivity());  // 返回：org.autojs.autojs.ui.main.MainActivity

toast(message);  // 以气泡显示信息message几秒
举个例子：
toast("你好autoJS"); // 屏幕出现  你好autoJS 字样，几秒后消失

toastLog(message);  // 显示信息message并在控制台中输出
举个例子：
toastLog("你好autoJS");  // 屏幕和控制台同时出现 你好autoJS 字样

waitForActivity(activity]); // activity:等待指定的Activity出现，period:为检查Activity的间隔。
举个例子：
log(waitForActivity("org.autojs.autojs.ui.main.MainActivity")); 

waitForPackage(package);  // 等待指定的应用出现
举个例子：
waitForPackage("org.autojs.autojspro"); 

exit();   // 立即停止脚本运行。

random(min, max);   // 返回一个在[min...max]之间的随机数
举个例子：
log(random(0, 2));   // 返回可能时0，1，2

random();   // 返回一个[0，1)的随机浮点数
```

### Http

```javascript
http.get(url,options,callback);   // 对地址url进行一次GET请求，option：加入请求头，callback:回调函数
举个例子：
console.show();
var r = http.get("www.baidu.com");
log("code = " + r.statusCode);
log("html = " + r.body.string());

option：
console.show();
var r = http.get("www.baidu.com", {
    headers: {
        'Accept-Language': 'zh-cn,zh;q=0.5',
        'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
    }
});
log("code = " + r.statusCode);
log("html = " + r.body.string());

回调函数：
console.show();
http.get("www.baidu.com", {}, function(res, err){
    if(err){
        console.error(err);
        return;
    }
    log("code = " + res.statusCode);
    log("html = " + res.body.string());
});

http.post(url, data, options, callback);  // 对地址url进行一次GET请求，data:POST数据，option：加入请求头，callback:回调函数
举个例子：
var url = "https://login.taobao.com/member/login.jhtml";
var username = "你的用户名";
var password = "你的密码";
var res = http.post(url, {
    "TPL_username": username,
    "TPL_password": password
});
var html = res.body.string();
if(html.contains("页面跳转中")){
    toast("登录成功");
}else{
    toast("登录失败");
}

http.postJson(url, data, options, callback); // 以JSON格式向目标Url发起POST请求。
举个例子：
var url = "http://www.tuling123.com/openapi/api";
r = http.postJson(url, {
    key: "65458a5df537443b89b31f1c03202a80",
    info: "你好啊",
    userid: "1",
});
toastLog(r.body.string());

http.request(url, options, callback);  // 对目标地址url发起一次HTTP请求
____待补充

Response  // HTTP请求的响应。
Response.statusCode  // 当前响应的HTTP状态码。例如200(OK), 404(Not Found)等。
Response.statusMessage // 当前响应的HTTP状态信息。例如"OK", "Bad Request", "Forbidden"。
举个例子：
var res = http.get("www.baidu.com");
if(res.statusCode >= 200 && res.statusCode < 300){
    toast("页面获取成功!");
}else if(res.statusCode == 404){
    toast("页面没找到哦...");
}else{
    toast("错误: " + res.statusCode + " " + res.statusMessage);
}
Response.headers  // 当前响应的HTTP头部信息。
举个例子：
console.show();
var res = http.get("www.qq.com");
console.log("HTTP Headers:")
for(var headerName in res.headers){
    console.log("%s: %s", headerName, res.headers[headerName]);
}
Response.body  // 当前响应的内容
Response.request  // 当前响应所对应的请求
Response.url  // 当前响应所对应的请求URL
Response.method  // 当前响应所对应的HTTP请求的方法。例如"GET", "POST", "PUT"等。
```

### 图片与颜色

```javascript
找图找色
images.requestScreenCapture([landscape])  // 申请截图权限（只需执行一次）
举个例子：
//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
//连续截图10张图片(间隔1秒)并保存到存储卡目录
for(var i = 0; i < 10; i++){
    captureScreen("/sdcard/screen_capture_" + i + ".png");
    sleep(1000);
}

images.captureScreen()  // 截图当前屏幕返回一个Image对象
举个例子：
// 请求横屏截图
requestScreenCapture(true);
// 截图
var img = captureScreen();
// 获取在点(100, 100)的颜色值
var color = images.pixel(img, 100, 100);
// 显示该颜色值
toast(colors.toString(color));

images.captureScreen(path);  // path:截图保存路径
举个例子：
// 请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
// 截图保存在指定path
images.captureScreen("/sdcard/DCIM/新建文件夹/1.png");

// 在图片img指定区域中找到颜色和color完全相等的某个点
images.findColorEquals(img, color[, x, y, width, height]); 
举个例子：
requestScreenCapture();  //请求截图
launchApp("QQ");   // 启动QQ
sleep(1200);   // 等待1.2秒
var p = findColorEquals(captureScreen(), "#f64d30");    
if(p){
    toast("有未读消息");
}else{
    toast("没有未读消息");
}

举个例子：
// 请求截图
var 获取截图权限 = requestScreenCapture();
// console.log("获取截图权限===>", 获取截图权限);
// 截图屏幕图片 并放指定位置
images.captureScreen("/sdcard/屏幕大图" + ".png");
// 扣小图片
var 读取图片 = images.read("/sdcard/屏幕大图.png");    // 读取大图
var 小心心 = images.clip(读取图片, 923, 828, 109, 115);   // 根据大图进行xyz裁剪
images.save(小心心, "/sdcard/小心心.png");    // 将图片存储指定位置
var 小图片 = images.read("/sdcard/小心心.png");   // 读取小图片
// var 是否找到 = images.findImage(读取图片, 小图片);   // 根据大图找小图
var 是否找到 = images.findImageInRegion(读取图片, 小图片, 921, 830, 116, 113);   // 根据区域找图
console.log("是否找到===>", 是否找到);
```

### 模拟按键

```javascript
back();	// 模拟按下返回键
home();	// 模拟按下Home键
powerDialog();  //长按电源键
notifications();  // 拉出通知栏
quickSettings();  // 完全拉出通知栏
recents();	// 显示最近任务
```

### 基于控件的操作

```javascript
auto.waitFor(); // 检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；
click("小红书");   // 点击文本
click("啦啦啦", 0);   // 点击文本 点击第一个文本
longClick("小红书");  // 长按文本
longClick("啦啦啦", 0);  // 长按文本 点击第一个文本
scrollUp(0); //  找到上滑或左滑
setText("测试");  // 输入文本 会清除
input("测试一下"); // 输入文本 会追加后面

var sendButton = text("小红书").findOne().click(); // 定义这个元件  根据文本
sendButton.click();  // 元件点击
desc("搜索").findOne().click();  // 根据desc进行点击
id("action_search").findOne().click();  // 根据id进行点击
className("ImageView").depth(10).findOne().click();  // 组合来完成定位
click(); // 控件clickable为true，才能使用
longClick(); // 控件longClickable属性为true
setText();  // 设置文本，用于编辑控件设置文本  id("search_edit_text").findOne().setText("测试");
exits(); // 判断控件是否存在
waitFor(); // 等待控件出现
scrollForward(); // id("music_list").findOne().scrollForward(); 上滑 如果控件scrollForward属性为true
scrollBackward(); // id("music_list").findOne().scrollBackward();  下滑 scrollBackward属性为true

举个例子：
className("android.widget.EditText").findOne().setText("狐狸");
var 搜索 = text("搜索").findOne().click();
搜索.click();

// 如果控件名以“android.widget.”开头 可以直接省略,例如文本控件可以直接使用
className("TextView"); 
常见控件的类名如下：
android.widget.TextView 文本控件
android.widget.ImageView 图片控件
android.widget.Button 按钮控件
android.widget.EditText 输入框控件
android.widget.AbsListView 列表控件
android.widget.LinearLayout 线性布局
android.widget.FrameLayout 帧布局
android.widget.RelativeLayout 相对布局
android.widget.RelativeLayout 相对布局
android.support.v7.widget.RecyclerView 通常也是列表控件

UiSelector.findOne(timeout);  // 对屏幕上的控件进行搜索，直到屏幕上出现满足条件的一个控件为止
举个例子：
//启动Auto.js
launchApp("Auto.js");
//在6秒内找出日志图标的控件
var w = id("action_log").findOne(6000);
//如果找到控件则点击
if(w != null){
    w.click();
}else{
    //否则提示没有找到
    toast("没有找到日志图标");
}

UiSelector.findOnce(i);  // 对屏幕上的控件进行搜索，如果找到符合条件的控件则返回该控件 i:索引

UiSelector.find();  // 找出所有满足条件的控件并返回一个控件集合
举个例子：
var c = className("AbsListView").find();
if(c.empty()){   // empty() 返回控件集合是否为空
    toast("找到啦");
}else{
    toast("没找到╭(╯^╰)╮");
}

UiSelector.untilFind();  // 对屏幕上的控件进行搜索，直到找到至少一个满足条件的控件为止  没找到会一直卡在那儿

UiSelector.exists(); // 判断屏幕上是否存在控件
举个例子：
if(text("某个文本").exists()){
    //要支持的动作
    toast("这是某个文本");
}

UiSelector.waitFor();  // 等待屏幕上出现符合条件的控件
举个例子：
textContains("退出").waitFor();   // textContains(str) 为当前选择器附加控件"text需要包含字符串str"的筛选条件
click("退出");

UiSelector.filter(f)  // 为当前选择器附加自定义的过滤条件。
举个例子：
// 要找出屏幕上所有文本长度为10的文本控件的代码为：
var uc = className("TextView").filter(function(w){
    return w.text().length == 10;
});

UiObject.click(); // 点击该控件  需要控件的clickable为true才可使用

UiObject.longClick();  // 长按该控件  需要控件的longClickable为true才可使用

UiObject.setText(text);  // 设置输入框控件的文本内容  需要控件的editable为true才可使用

UiObject.copy();  // 对输入框文本的选中内容进行复制 该函数只能用于输入框控件，并且当前输入框控件有选中的文本
举个例子：
var et = className("EditText").findOne();
//选中前两个字
et.setSelection(0, 2);  // setSelection()  设置输入框选中的内容
//对选中内容进行复制
if(et.copy()){
    toast("复制成功");
}else{
    toast("复制失败");
}
```

