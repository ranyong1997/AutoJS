let taskDemo = {}
let taskPluginData = null
const targetApp = require("../app/whatsapp.js");
const httpUtilFunc = require("../network/httpUtil.js");
const commonFunc = require("../common/common.js");

const { reportLog } = require("../network/httpUtil.js");
const { newThread, randomSleep, clickIfWidgetClickable, clickIfWidgetExists, clearData, isNotNullObject } = require("../common/common.js");
const proxySttings = require("../network/proxySttings.js");

taskDemo.init = function(){
    log( "init taskKeeping" )
    taskDemo.result = 0
    taskDemo.desc = ""

}
taskDemo.init()
taskDemo.runTask = function(){
    // targetApp.doForceToHomePage({"password":"123500"},null,null)
    // // targetApp.doUpdatePhoto( {}, "material.media_path" )
    // targetApp.doSetupPIN( {}, "123500" )
    
    
    // targetApp.doAutoReply({})
    // let joke = random(1,100) < 60 ? httpUtilFunc.randomSentence() : httpUtilFunc.randomJoke() 
    // joke = random(1,100) < 30 ? httpUtilFunc.randomEmojis( random(0,3) ) + " " + joke : joke
    // joke = joke.replace( "Chuck Norris", httpUtilFunc.randomEmojis( random(0,2) ) )
    // let message = {
    //     "type"      : "text",   //  text/document/camera/gallery/audio/room/location/contact
    //     "receiver"  : null,
    //     "content"   : joke,
    // }  
    // reportLog( "发送消息: " + targetApp.doSendMsg( {}, null, message ) + " - " + commonFunc.objectToString( message ) )
    
    // // proxySttings.v2raySetup("SOCKS5,50.117.127.106,1660,User-148,pwd@0987")
    // proxySttings.v2raySetup("SOCKS5,104.223.201.74,16883,xsockd,xsockd")
    // proxySttings.kitsunebiSetup( "SOCKS5,8.210.203.86,10808,D0041,123456", "s5_liao" )
    // log( httpUtilFunc.queryProxy({"datatype":4, "proxy":"SOCKS5,185.145.128.51,4113,u768$sGL8PFhY0,88tr" }) )
    // exit()

    new function (){ 
        
        try {
            let timestamp = new Date().getTime()
            try {   // 版本检测
                let happybayVersion = "1.1.40_beta_8_4"
                if(commonFunc.happybayVersion < happybayVersion ){ throw "happybayVersion "+commonFunc.happybayVersion+" -> "+happybayVersion }
    
                let jsengineVersion = "4.1.1 Alpha2-gxl-817"
                if(commonFunc.jsengineVersion < jsengineVersion ){ throw "jsengineVersion "+commonFunc.jsengineVersion+" -> "+jsengineVersion }
            } catch (error) {
                throw "系统应用版本过低,请先升级: " + commonFunc.objectToString(error)
            }
            try {   //  初始化测试
                if( !commonFunc.server ){ throw "未连接到群控后台" }

                //  初始化网络测试
                // if( !httpUtilFunc.getLocalIp() && !commonFunc.uninstallApp("fun.kitsunebi.kitsunebi4android") ){ reportLog("设备环境异常") }
                // if( !httpUtilFunc.getGlobalIp() && !commonFunc.uninstallApp("fun.kitsunebi.kitsunebi4android") ){ reportLog("设备环境异常") }
                // randomSleep(3000)

                //  业务后台连接检测
                // for (let index = 0; index < 5; index++) {
                //     try {
                //         if( httpUtilFunc.testTaskServer() ){ 
                //             break
                //         }else if( index > 3 ){
                //             throw "业务后台连接异常"
                //         }
                //     } catch (error) {
                //         if( index > 3 ){ throw error }
                //     }
                //     randomSleep(10000)
                // }

                let lan_test = null
                for (let index = 0; index < 6; index++) {
                    try { lan_test = httpUtilFunc.testTaskServer() } catch (error) {}
                    commonFunc.showLog("局域网测试: " + lan_test)
                    if(lan_test){break}
                    sleep(5000)
                }
                if( !lan_test ){ 
                    log( "业务后台连接异常" )
                    commonFunc.uninstallApp("fun.kitsunebi.kitsunebi4android")
                    // commonFunc.uninstallApp("com.v2ray.ang")

                    //  业务后台连接检测
                    for (let index = 0; index < 90; index++) {
                        try {
                            if( !httpUtilFunc.testTaskServer() ){ throw "" }
                            break
                        } catch (error) {
                            if( index > 80 ){ throw "业务后台连接异常, 请检查网络和服务器状态. "+commonFunc.objectToString(error) }
                            commonFunc.showLog("业务后台连接异常, 请检查网络和服务器状态. ")
                        }
                        sleep(60000)
                    } 
                }
                randomSleep(3000)

                commonFunc.showLog("")
                
            } catch (error) { throw error }

            try {   //  获取插件配置
                taskPluginData = httpUtilFunc.getPluginData()
                if( !commonFunc.isNotNullObject(taskPluginData) ){ throw taskPluginData }
                if( !taskPluginData.pluginName && !taskPluginData.title ){ throw taskPluginData }
                taskPluginData.pluginVersion = taskPluginData.pluginVersion ? parseInt(taskPluginData.pluginVersion) : 0

                commonFunc.pluginName = taskPluginData.pluginName || taskPluginData.title //   taskPluginData.title 仅用于兼容旧版本, 后续会弃用
                
                taskPluginData.proxyName = taskPluginData.proxyName
                taskPluginData.proxyLink = taskPluginData.proxyLink
                // taskPluginData.appName = taskPluginData.appName
                // taskPluginData.appLink = taskPluginData.appLink
                // taskPluginData.proxyOn = taskPluginData.proxyOn == "on" ? true : false 

                // taskPluginData.randomRead = taskPluginData.randomRead == "on" ? true : false
                // taskPluginData.readRange = taskPluginData.readRange

                // taskPluginData.randomWatch = taskPluginData.randomWatch == "on" ? true : false
                // taskPluginData.watchRange = taskPluginData.watchRange
                
                // taskPluginData.postVideo = taskPluginData.postVideo == "on" ? true : false
                // taskPluginData.videoTag = taskPluginData.videoTag
                // taskPluginData.postProbability = taskPluginData.postVideo && taskPluginData.postProbability ? parseInt(taskPluginData.postProbability) : 0

                taskPluginData.autoExtract = taskPluginData.autoExtract ? true : false
                if( taskPluginData.autoExtract ){
                    // 版本检测 com.happybay.business.plug
                    try {   
                        let businessVersion = "1.0.6"
                        let curr_bsVersion = ""
                        try {
                            let happybayVersion = shell( "dumpsys package com.happybay.business.plug | grep versionName" )
                            curr_bsVersion = happybayVersion.result.match(/versionName=([^\s]+)/)[1] 
                        } catch (error) { }
                        log(curr_bsVersion)
                        if( !curr_bsVersion ){ throw "com.happybay.business.plug 未安装" }
                        if(curr_bsVersion < businessVersion ){ throw "com.happybay.business.plug "+commonFunc.happybayVersion+" -> "+businessVersion }
                    } catch (error) {
                        throw "系统应用版本过低,请先升级: " + commonFunc.objectToString(error)
                    }
                }

                taskPluginData.addContact = taskPluginData.addContact ? true : false
                taskPluginData.addContactRange = taskPluginData.addContactRange
                
                taskPluginData.autoReply = taskPluginData.autoReply ? true : false
                taskPluginData.autoChat = taskPluginData.autoChat ? true : false
                taskPluginData.autoVoiceCall = taskPluginData.autoVoiceCall ? true : false
                taskPluginData.autoChatRange = taskPluginData.autoChatRange
                
                taskPluginData.updatePhoto = taskPluginData.updatePhoto ? true : false
                taskPluginData.profileTag = taskPluginData.profileTag
                                
                taskPluginData.material_user_id = taskPluginData.material_user_id
                taskPluginData.material_user_secret = taskPluginData.material_user_secret
                
                taskPluginData.used_times_model = taskPluginData.used_times_model || "lte"
                taskPluginData.used_times = taskPluginData.used_times ? parseInt(taskPluginData.used_times) : 0

                reportLog( "  插件配置: " + JSON.stringify( taskPluginData ) )
                log( "" )
            } catch (error) {
                log( "  插件配置 获取失败 " + commonFunc.objectToString(error) )
                throw "插件配置 获取失败 " + commonFunc.objectToString(error)
            }
            
            try {   //  语言和应用检测
                taskPluginData.systemLanguage = "en-US"
                if( taskPluginData.systemLanguage ){
                    // reportLog( "检测系统语言: " + commonFunc.systemLanguageGet() )
                    commonFunc.systemLanguageSet( taskPluginData.systemLanguage )
                    sleep(3000)
                    if( taskPluginData.systemLanguage != commonFunc.systemLanguageGet() ){
                        throw "系统语言错误"                        
                    }
                }
                reportLog( "当前系统语言: " + commonFunc.systemLanguageGet() )

                
                taskPluginData.systemTimezone = "America/Los_Angeles"
                if( taskPluginData.systemTimezone ){
                    // reportLog( "检测系统时区: " + commonFunc.systemTimezoneGet() )
                    commonFunc.systemTimezoneSet( taskPluginData.systemTimezone )
                    sleep(3000)
                    if( taskPluginData.systemTimezone != commonFunc.systemTimezoneGet() ){
                        throw "系统时区错误"                        
                    }
                }
                reportLog( "当前系统时区: " + commonFunc.systemTimezoneGet() )   
            } catch (error) { throw error }
            
            
            //  执行任务
            try{
                //  本地网络
                let local_ip = httpUtilFunc.getLocalIp()
                let global_ip = null
                log( "本地 IP: " + local_ip )

                let bind_info = httpUtilFunc.getDeviceBindInfo( targetApp.appName ) //
                
                reportLog( "设备绑定信息: " + JSON.stringify(bind_info) )
                if( !bind_info || !bind_info.accountId || !bind_info.proxy ){ 
                    taskDemo.desc   = "设备未绑定 " + targetApp.appName + " 数据 " + JSON.stringify(bind_info)
                    return 0
                    // throw "设备未绑定 " + targetApp.appName + " 数据" 
                }

                if( !proxySttings.kitsunebiInstall( taskPluginData.proxyLink ) ){ throw "未安装 " + "fun.kitsunebi.kitsunebi4android" }
                if( !app.getAppName(targetApp.bid) ){ throw "未安装 " + targetApp.bid }

                //  尝试连接代理
                // let ipInfo = {}
                // let proxy_info = bind_info.proxy
                // taskPluginData.proxyOn = true
                // if( taskPluginData.proxyOn ){
                //     let is_proxy_on = false
                //     reportLog( "代理配置 " + proxy_info )
                //     // commonFunc.showLog("代理配置 " + proxy_info )
                //     if(!proxy_info){ throw "设备未绑定 " + targetApp.appName + " 代理 " + commonFunc.objectToString(bind_info) }

                //     let proxy_thread_timeout = taskPluginData.proxyThreadTimeout || 15
                //     proxy_thread_timeout = parseInt( proxy_thread_timeout )   
                //     is_proxy_on = newThread(()=>{
                //         let proxy_loop_max = 5
                //         for (let proxy_loop = 0; proxy_loop < proxy_loop_max; proxy_loop++) {
                //             try {
                //                 is_proxy_on = proxySttings.kitsunebiSetup( proxy_info )
                //                 taskDemo.desc = "代理连接结果: " + is_proxy_on
                //                 reportLog( taskDemo.desc )
                //             } catch (error) {
                //                 taskDemo.desc = "代理连接异常: " + commonFunc.objectToString(error)
                //                 reportLog( taskDemo.desc )
                //                 continue
                //             }
                //             if( !is_proxy_on ){ continue }
                //             randomSleep(3000)

                //             local_ip = null
                //             for (let index = 0; index < 3; index++) {
                //                 local_ip = httpUtilFunc.getLocalIp()
                //                 if(local_ip){break}
                //                 randomSleep(5000)
                //             }
                //             global_ip = null
                //             for (let index = 0; index < 3; index++) {
                //                 global_ip = httpUtilFunc.getGlobalIp()
                //                 if(global_ip){break}
                //                 randomSleep(5000)
                //             }
                //             reportLog( "检测IP - " + ( local_ip!=global_ip ) + " : " + local_ip + " -> " + global_ip )
                //             // if( local_ip && global_ip ){
                //             if( local_ip && global_ip && local_ip != global_ip ){
                //                 home()
                //                 return true
                //             }
                //             taskDemo.desc = "代理无效? " + local_ip + " -> " + global_ip
                //         }
                //     },false,1000*60*proxy_thread_timeout,()=>{ throw "代理连接超时退出 " + taskDemo.desc })
                //     if(!is_proxy_on){ throw taskDemo.desc }
                //     ipInfo = httpUtilFunc.getIpInfo()
                //     reportLog( "代理网络 " + JSON.stringify( ipInfo ) )
                //     // commonFunc.showLog("代理网络 \n" + JSON.stringify( ipInfo ))
                // }

                //  尝试连接代理
                taskPluginData.proxyOn = true
                if( taskPluginData.proxyOn ){
                    if( !bind_info || !bind_info.proxy ){ throw "设备未绑定 " + targetApp.appName + " 代理 " + commonFunc.objectToString(bind_info) }
                    //  1. 获取代理
                    let proxy_info = bind_info.proxy
                    try { taskPluginData.proxyProvider = taskPluginData.proxyProvider || httpUtilFunc.queryProxy( {"proxy":proxy_info } ).proxyProvider } catch (error) { }
                    reportLog( "代理配置 " + proxy_info )
                    // commonFunc.showLog("代理配置 " + proxy_info )

                    let is_proxy_on = false
                    let ipInfo = {} 
                    let proxy_thread_timeout = parseInt( taskPluginData.proxyThreadTimeout || 15 )  //  代理连接超时时间(分钟)
                    taskPluginData.proxyName = "kit"
                    if( new RegExp( /v2ray/i ).test( taskPluginData.proxyName ) ){ //  v2rayNG_1.6.23_arm64-v8a.apk
                        //  使用 v2rayNG_1.6.23 代理 app 
                        try { commonFunc.uninstallApp("fun.kitsunebi.kitsunebi4android"); sleep(3000) } catch (error) { }
                        taskPluginData.proxyLink = "http://192.168.91.3:8012/upload/267e5d6a-d1fb-4ab2-a19b-ef27f8dd150d.apk"
                        if( !proxySttings.v2rayInstall( taskPluginData.proxyLink ) ){ throw "未安装 " + "com.v2ray.ang" }
                        is_proxy_on = newThread(()=>{
                            let proxy_loop_max = 3
                            for (let proxy_loop = 0; proxy_loop < proxy_loop_max; proxy_loop++) {
                                //  1. 获取代理
                                // try {
                                //     if( is_proxy_bind ){ 
                                //         proxy_info = bind_info.proxy
                                //         log("使用已绑定代理: " + proxy_info)
                                //     }
                                //     // else if( proxy_loop%2==0 ){
                                //     else{
                                //         temp_proxy = httpUtilFunc.getProxyData( taskPluginData.proxyProvider, taskPluginData.proxyTag )
                                //         if( !temp_proxy || !temp_proxy.proxy ){ throw taskPluginData.proxyProvider + " - " + taskPluginData.proxyTag }
                                //         if( proxy_info == temp_proxy.proxy ){ continue }
                                //         proxy_info = temp_proxy.proxy
                                //         log("使用新的代理: " + proxy_info)
                                //     }
                                //     if( !proxy_info ){ throw proxy_info }
                                // } catch (error) {
                                //     taskDemo.desc = "获取代理异常: " + commonFunc.objectToString(error)
                                //     continue
                                // }
                                //  2. 连接代理
                                try {
                                    is_proxy_on = proxySttings.v2raySetup( proxy_info, false, 1000*60*2 )
                                    taskDemo.desc = "代理连接结果: " + is_proxy_on
                                    reportLog( taskDemo.desc )
                                } catch (error) {
                                    taskDemo.desc = "代理连接异常: " + commonFunc.objectToString(error)
                                    reportLog( taskDemo.desc )
                                    continue
                                }
                                if( !is_proxy_on ){ continue }
                                // randomSleep(3000)

                                //  3. 检测代理
                                // local_ip = null
                                // for (let index = 0; index < 3; index++) {
                                //     local_ip = httpUtilFunc.getLocalIp()
                                //     if(local_ip){break}
                                //     randomSleep(5000)
                                // }
                                global_ip = null
                                for (let index = 0; index < 2; index++) {
                                    global_ip = httpUtilFunc.getGlobalIp()
                                    commonFunc.showLog( "代理IP测试: " + global_ip )
                                    if(global_ip){break}                                        
                                    // randomSleep(5000)
                                }
                                reportLog( "检测IP - " + local_ip + " -> " + global_ip )
                                commonFunc.showLog( "代理IP测试: " + local_ip + " -> " + global_ip )
                                // if( local_ip && global_ip ){
                                // if( local_ip && global_ip && local_ip != global_ip ){
                                if( global_ip ){
                                    home()
                                    return true
                                }
                                taskDemo.desc = "代理无效? " + local_ip + " -> " + global_ip
                            }
                        },false,1000*60*proxy_thread_timeout,()=>{ throw "代理连接多次失败退出 " + taskDemo.desc })
                    }else{
                        //  使用 kitsunebi4android 代理 app 
                        try { commonFunc.uninstallApp("com.v2ray.ang"); sleep(3000) } catch (error) { }
                        taskPluginData.proxyLink = "http://192.168.91.3:8012/upload/e3acddc3-4ce1-4286-8ad6-f2c0e8bac093.apk"   //  "fun.kitsunebi.kitsunebi4android"
                        if( !proxySttings.kitsunebiInstall( taskPluginData.proxyLink ) ){ throw "未安装 " + "fun.kitsunebi.kitsunebi4android" }
                        is_proxy_on = newThread(()=>{
                            let proxy_loop_max = 3
                            for (let proxy_loop = 0; proxy_loop < proxy_loop_max; proxy_loop++) {
                                // try {
                                //     if( is_proxy_bind ){ 
                                //         proxy_info = bind_info.proxy
                                //         log("使用已绑定代理: " + proxy_info)
                                //     }else if( proxy_loop%2==0 ){
                                //         temp_proxy = httpUtilFunc.getProxyData( taskPluginData.proxyProvider, taskPluginData.proxyTag )
                                //         if( !temp_proxy || !temp_proxy.proxy ){ throw taskPluginData.proxyProvider + " - " + taskPluginData.proxyTag }
                                //         if( proxy_info == temp_proxy.proxy ){ continue }
                                //         proxy_info = temp_proxy.proxy
                                //         log("使用新的代理: " + proxy_info)
                                //     }
                                //     if( !proxy_info ){ throw proxy_info }
                                // } catch (error) {
                                //     taskDemo.desc = "获取代理异常: " + commonFunc.objectToString(error)
                                //     continue
                                // }
                                
                                try {
                                    if(proxy_loop > 0){ commonFunc.forceStopApp("fun.kitsunebi.kitsunebi4android");sleep(2000) }
                                    is_proxy_on = proxySttings.kitsunebiSetup( proxy_info, taskPluginData.proxyProvider )
                                    taskDemo.desc = "代理连接结果: " + is_proxy_on
                                    reportLog( taskDemo.desc )
                                } catch (error) {
                                    taskDemo.desc = "代理连接异常: " + commonFunc.objectToString(error)
                                    reportLog( taskDemo.desc )                                    
                                    continue
                                }
                                if( !is_proxy_on ){ continue }
                                // randomSleep(3000)

                                //  3. 检测代理
                                global_ip = null
                                for (let index = 0; index < 3; index++) {
                                    commonFunc.showLog( "代理IP检测: " + global_ip )
                                    global_ip = httpUtilFunc.getGlobalIp()
                                    reportLog( "检测IP: " + local_ip + " -> " + global_ip )
                                    commonFunc.showLog( "代理IP检测: " + global_ip )
                                    if(global_ip){ return true } else{ taskDemo.desc = "代理已连接, 但IP检测失败 " + local_ip + " -> " + global_ip }
                                    try { if( httpUtilFunc.isUrlAccessable( "https://www.whatsapp.com", "whatsapp" ) ){ return true } } catch (error) { taskDemo.desc = "代理已连接,但 whatsapp 网站访问失败: " + commonFunc.objectToString(error) }
                                    randomSleep(5000)
                                }
                                // local_ip = null
                                // for (let index = 0; index < 2; index++) {
                                //     local_ip = httpUtilFunc.getLocalIp()
                                //     if(local_ip){break}
                                //     // randomSleep(5000)
                                // }
                                // global_ip = null
                                // for (let index = 0; index < 2; index++) {
                                //     global_ip = httpUtilFunc.getGlobalIp()
                                //     if(global_ip){
                                //         taskDemo.desc = "代理IP获取失败"
                                //         break
                                //     }
                                //     // randomSleep(5000)
                                // }
                                // reportLog( "检测IP - " + local_ip + " -> " + global_ip )
                                // commonFunc.showLog( "代理IP测试: " + local_ip + " -> " + global_ip )
                                // // reportLog( "检测IP - " + ( local_ip!=global_ip ) + " : " + local_ip + " -> " + global_ip )
                                // // if( local_ip && global_ip ){
                                // // if( local_ip && global_ip && local_ip != global_ip ){
                                // if( global_ip ){
                                //     home()
                                //     return true
                                // }
                                // taskDemo.desc = "代理无效? " + local_ip + " -> " + global_ip
                            }
                        },false,1000*60*proxy_thread_timeout,()=>{ throw "代理连接多次失败退出 " + taskDemo.desc })
                    }                    

                    if(!is_proxy_on){ throw taskDemo.desc }
                    ipInfo = httpUtilFunc.getIpInfo()
                    reportLog( "代理网络 " + JSON.stringify( ipInfo ) )
                    // commonFunc.showLog("代理网络 \n" + JSON.stringify( ipInfo ))
                    try { ipInfo.query && commonFunc.taskResultSet( "代理IP: " + ipInfo.countryCode + "-" + ipInfo.query, "a" ) } catch (error) { }
                }

                try {

                    let account = httpUtilFunc.getAccountOnDevice( { "id": bind_info.accountId, "appName" : targetApp.appName } )
                    // commonFunc.taskResultSet( "账号信息: " + commonFunc.objectToString(account), "a" )
                    try {
                        commonFunc.taskResultSet( "账号ID: " + account.appName +"-"+ account.id, "a" )
                    } catch (error) { } 
                    // if( !account || !account.accountId ){ taskDemo.desc = " 账号不存在"; return 0 }
                    // if( account.isSold ){ taskDemo.desc = " 账号已出售"; return 0 }
                    if( !account || !account.accountId ){ throw " 账号不存在" }
                    
                    if( account.isSold ){ throw " 账号已出售" }
                    // log( "登录账号: " + JSON.stringify(account) )
                    
                    // try { commonFunc.forceStopApp(targetApp.bid); randomSleep() } catch (error) { } 
                    launch(targetApp.bid)
                    sleep(10000)
                    let login_status = targetApp.getLoginStatus()
                    // let account_unique_id = targetApp.getLoginUsername()
                    let account_unique_id = "+" + account.dialCode + account.phone
                    commonFunc.taskResultSet( "登录检查: " + login_status, "a" )

                    //  上报登陆信息
                    try {
                        let login_record = {}
                        login_record.appName    = account.appName
                        login_record.accountId  = account.id
                        login_record.username   = account_unique_id
                        login_record.proxy      = bind_info.proxy
                        // login_record.proxyProvider  = account.proxyProvider

                        login_record.actionType = 2
                        login_record.result = login_status == 1 ? 1 : 0
                        switch(login_status) {
                            case 0:
                                login_record.desc = "未登录"
                                break;
                            case 1:
                                login_record.desc = "登录"
                                break;
                            case 2:
                                login_record.desc = "掉线或被禁"
                                break;
                            default:
                                login_record.desc = "识别失败"
                                break;
                        }
                        taskDemo.desc = login_record.desc
                        commonFunc.taskResultSet( "登录状态: " + login_record.desc, "a" )
                        httpUtilFunc.accountLoginRecord( login_record )
                        randomSleep(5000)
                    } catch (error) { throw "上报登陆信息异常: " + commonFunc.objectToString(error) }

                    if( login_status != 1 ){ 
                        //  没有账号登录 或者账号被封, 则解绑代理
                        // if( taskPluginData.autoUnbind ) {                            
                        //     httpUtilFunc.updateDevice( targetApp.appName, { "proxy":null }, { "accountId":null } )
                        // }                        
                        throw "  " + currentActivity() 
                    }
                    else if( !account_unique_id ){
                        throw "账号唯一标识获取失败"
                    }
                    else{
                        if( !targetApp.doForceToHomePage(account) ) { throw "首页识别异常" } 
                        randomSleep() 
                        // 检测 app网络连接情况
                        // if( targetApp.getConnectStatus() != 1 ){ commonFunc.forceStopApp(targetApp.bid) }
                        // if( targetApp.getConnectStatus() != 1 ){ throw targetApp.appName+"网络连接异常" }

                        // httpUtilFunc.updateDevice( targetApp.appName, null, account )
                        taskDemo.result = 1
                        taskDemo.desc = ""
                        // try {
                        //     if( new RegExp(/.* T/).test(account.username) ){
                        //         //  更新账号信息
                        //         reportLog( "更新账号 username: " + account_unique_id )
                        //         httpUtilFunc.accountUpdate( account.id, { "username":account_unique_id } )
                        //     }
                        // } catch (error) { reportLog( "更新账号异常: " + commonFunc.objectToString(error) ) }

                        //  账号提取                        
                        if( taskPluginData.autoExtract ){
                            let draw_result = null
                            try {
                                reportLog( "开始提取账号" )
                                for (let index = 0; index < 5; index++) {
                                    try {                                                            
                                        draw_result = SLChanges.drawWhatsApp();
                                        let draw_json = JSON.parse( draw_result )
                                        if( draw_json.code == 200 ){
                                            account.isSold = true
                                            commonFunc.taskResultSet( "提取账号: "+draw_json.msg, "a" )
                                            break
                                        }
                                        throw draw_result
                                    } catch (error) { if(index>3){throw error} }
                                    sleep(10000)
                                }
                                // commonFunc.taskResultSet( "提取账号: " +draw_result, "a" )  
                                
                                //  {"code":200,"data":{"data":{"envEncryptKey":"OoUPZXppAziqZSi+RS2XweorzdaWkD9/SzHQijZ+nlIWrlzA7YpExMBzpWrZ38jmLo67qLquHtUh1BVY0SlRVi5WuMkF5lQYC/iF+9gZVVhP0FUoUdIuKzJwHFdqcCYv","username":"8613128924906"}},"msg":"成功"}
                                //  {"code":-1,"msg":"not install com.whatsapp"}
                                try {
                                    for (let index = 0; index < 5; index++) {
                                        try {
                                            account.isSold && httpUtilFunc.accountUpdate( account.id, { "isSold" : true, "desc" : "提取信息: "+draw_result } )
                                            //  上报提取记录
                                            try {
                                                httpUtilFunc.accountLoginRecord( {
                                                    "appName"    : account.appName,
                                                    "accountId"  : account.id,
                                                    "username"   : account_unique_id,
                                                    "proxy"      : bind_info.proxy,
                                                    "proxyProvider"  : account.proxyProvider,
                                                    "actionType" : 2,
                                                    "result" : 1,
                                                    "ip" : global_ip,
                                                    "desc" : "账号提取",
                                                } )
                                            } catch (error) { throw "上报登陆信息异常: " + commonFunc.objectToString(error) }
                                            break
                                        } catch (error) { if(index>3){throw error} }
                                        sleep(10000)
                                    }
                                } catch (error) {
                                    commonFunc.taskResultSet( "账号更新异常" + commonFunc.objectToString(error), "a" )
                                }
                            } catch (error) { 
                                commonFunc.taskResultSet( "提取账号异常: " + commonFunc.objectToString( error ), "a" )  
                                reportLog( "账号提取异常: " + commonFunc.objectToString( error ) )
                            }
                            // record_account.desc = "提取账号结果:  +" + record_account.dialCode + " " + record_account.phone + " - " + draw_result
                            // reportLog( "提取账号结果:  +" + record_account.dialCode + " " + record_account.phone + " - " + draw_result )
                        }

                        if( taskPluginData.updateProfile ){
                            try {
                                let feedback_data = {}
                                let material = null
                                let app_id = taskPluginData.material_user_id
                                let app_secret = taskPluginData.material_user_secret
                                if( !app_id || !app_secret ){ throw "素材库账号异常: " + app_id +" " + app_secret }


                                let profileTag = taskPluginData.profileTag
                                try {
                                    //  临时方案, 取第一个标签
                                    profileTag = profileTag || account.account_tag.match( /#([^#]+)/ )[1]
                                } catch (error) { } 

                                // let account_unique_id = "+"+account.dialCode + account.phone

                                //  修改昵称
                                // try {                                    
                                //     if( taskPluginData.updateName ){
                                //         feedback_data = {
                                //             "app_id"        : app_id,
                                //             "app_secret"    : app_secret,
                                //             "mid"           : null,
                                //             "task_type"     : 0,                    //  "任务类型 0-未知; 1-发布视频",
                                //             "task_result"   : 0,                    //  "任务结果 1/0",
                                //             "account_id"    : account_unique_id,    //  "账号唯一标识",
                                //             "account_tags"  : profileTag,  //  "账号标签",
                                //             "ip"            : global_ip,            //  "当前代理IP" 
                                //             // "box_no"        : "",
                                //         }
                                //         material = null
                                //         // material = httpUtilFunc.materialGet(app_id,app_secret,0,1,0,profileTag)
                                //         // let material_req = 
                                //         material = httpUtilFunc.materialGet( {
                                //             "app_id"        : app_id,
                                //             "app_secret"    : app_secret,
                                //             "type"          : 0,
                                //             "classify"      : 1,
                                //             "used_times"    : 0,
                                //             "lable"         : profileTag,
                                //             "used_times_model"    : "lte",
                                //         } )
                                //         feedback_data.mid = material.id

                                //         let new_account = targetApp.editProfile( account,{ "name":material.text_content, "username":null, "bio": null, "photo":null } )                                        
                                        
                                //         account = httpUtilFunc.accountUpdate( account.id, { "name":new_account.name } )
                                //         commonFunc.taskResultSet( "成功修改昵称: " + material.text_content, "a" )
                                                                                
                                //         try { feedback_data.task_result = 1; httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                //     }
                                // } catch (error) {
                                //     try { feedback_data.mid && httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                //     // try { httpUtilFunc.materialRollback( material ) } catch (error) {}
                                //     // material = null
                                //     throw "修改昵称异常: " + commonFunc.objectToString(error) 
                                // }
                                // //  修改用户名
                                // try {
                                //     if( taskPluginData.updateUsername ){
                                //         feedback_data = {
                                //             "app_id"        : app_id,
                                //             "app_secret"    : app_secret,
                                //             "mid"           : null,
                                //             "task_type"     : 0,                    //  "任务类型 0-未知; 1-发布视频",
                                //             "task_result"   : 0,                    //  "任务结果 1/0",
                                //             "account_id"    : account_unique_id,    //  "账号唯一标识",
                                //             "account_tags"  : profileTag,  //  "账号标签",
                                //             "ip"            : global_ip,            //  "当前代理IP" 
                                //             // "box_no"        : "",
                                //         }
                                //         if( !material || !material.text_content ){
                                //             // material = httpUtilFunc.materialGet(app_id,app_secret,0,1,0,profileTag)
                                //             // let material_req = 
                                //             material = httpUtilFunc.materialGet( {
                                //                 "app_id"        : app_id,
                                //                 "app_secret"    : app_secret,
                                //                 "type"          : 0,
                                //                 "classify"      : 1,
                                //                 "used_times"    : 0,
                                //                 "lable"         : profileTag,
                                //                 "used_times_model"    : "lte",
                                //             } )
                                //         }
                                //         feedback_data.mid = material.id
                                //         let new_account = targetApp.editProfile( account,{ "name":null, "username":material.text_content, "bio":null, "photo":null } )                                        
                                //         account = httpUtilFunc.accountUpdate( account.id, { "username":new_account.username } )
                                //         commonFunc.taskResultSet( "成功修改名称: " + material.text_content, "a" )

                                //         try { feedback_data.task_result = 1; httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                //     }
                                // } catch (error) {
                                //     try { feedback_data.mid && httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                //     // try { httpUtilFunc.materialRollback( material ) } catch (error) {}
                                //     commonFunc.taskResultSet( "修改名称失败: " + commonFunc.objectToString(error) , "a" )
                                //     // throw "更新资料异常: " + commonFunc.objectToString(error) 
                                // }
                                // //  修改个性签名
                                // try {
                                //     if( taskPluginData.updateBio ){
                                //         feedback_data = {
                                //             "app_id"        : app_id,
                                //             "app_secret"    : app_secret,
                                //             "mid"           : null,
                                //             "task_type"     : 0,                    //  "任务类型 0-未知; 1-发布视频",
                                //             "task_result"   : 0,                    //  "任务结果 1/0",
                                //             "account_id"    : account_unique_id,    //  "账号唯一标识",
                                //             "account_tags"  : profileTag,  //  "账号标签",
                                //             "ip"            : global_ip,            //  "当前代理IP" 
                                //             // "box_no"        : "",
                                //         }
                                //         material = null
                                //         // material = httpUtilFunc.materialGet(app_id,app_secret,0,2,0,profileTag)
                                //         // let material_req = 
                                //         material = httpUtilFunc.materialGet( {
                                //             "app_id"        : app_id,
                                //             "app_secret"    : app_secret,
                                //             "type"          : 0,
                                //             "classify"      : 2,
                                //             "used_times"    : 0,
                                //             "lable"         : profileTag,
                                //             "used_times_model"    : "lte",
                                //         } )
                                //         feedback_data.mid = material.id

                                //         let new_account = targetApp.editProfile( account,{ "name":null, "username":null, "bio":material.text_content, "photo":null } )
                                        
                                //         account = httpUtilFunc.accountUpdate( account.id, { "bio":new_account.bio } )
                                //         commonFunc.taskResultSet( "成功修改签名: " + material.text_content, "a" )

                                //         try { feedback_data.task_result = 1; httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                //     }
                                // } catch (error) {
                                //     try { feedback_data.mid && httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                //     // try { httpUtilFunc.materialRollback( material ) } catch (error) {}
                                //     throw "修改签名异常: " + commonFunc.objectToString(error) 
                                // }
                                //  修改头像
                                try {
                                    if( taskPluginData.updatePhoto ){
                                        feedback_data = {
                                            "app_id"        : app_id,
                                            "app_secret"    : app_secret,
                                            "mid"           : null,
                                            "task_type"     : 0,                    //  "任务类型 0-未知; 1-发布视频",
                                            "task_result"   : 0,                    //  "任务结果 1/0",
                                            "account_id"    : account_unique_id,    //  "账号唯一标识",
                                            "account_tags"  : profileTag,  //  "账号标签",
                                            "ip"            : global_ip,            //  "当前代理IP" 
                                            // "box_no"        : "",
                                        }

                                        material = null
                                        // material = httpUtilFunc.materialGet(app_id,app_secret,1,2,0,profileTag)
                                        // let material_req = 
                                        material = httpUtilFunc.materialGet( {
                                            "app_id"        : app_id,
                                            "app_secret"    : app_secret,
                                            "type"          : 1,
                                            "classify"      : 2,
                                            "used_times"    : taskPluginData.used_times,
                                            "lable"         : profileTag,
                                            // "used_times_model"    : "lte",
                                            "used_times_model"    : taskPluginData.used_times_model,
                                        } )
                                        feedback_data.mid = material.id

                                        targetApp.doUpdatePhoto( account, material.media_path )
                                        // account = httpUtilFunc.accountUpdate( account.id, { "photo":new_account.photo } )
                                        commonFunc.taskResultSet( "成功修改头像: " + material.media_path, "a" )

                                        try { feedback_data.task_result = 1; httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                    }
                                } catch (error) {
                                    try { feedback_data.mid && httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                    // try { httpUtilFunc.materialRollback( material ) } catch (error) {}
                                    throw "修改头像异常: " + commonFunc.objectToString(error) 
                                }
                                
                            } catch (error) {
                                // reportLog( "更新资料异常: " + commonFunc.objectToString(error) )
                                throw error
                            }
                        }
                        

                        //  群发测试
                        if( taskPluginData.adsTest ){                            
                        }                        
                        //  定向群发
                        if( taskPluginData.sendAds ){
                        }
                        //  随机添加通讯录联系人
                        // taskPluginData.addContact = false
                        if( taskPluginData.addContact ){
                            try {
                                let addContactRange = taskPluginData.addContactRange || "0~0"
                                if( !addContactRange || !addContactRange.match( /\d+~\d+/ ) ){
                                    throw "插件配置 - 数量范围格式错误"
                                }
                                addContactRange = addContactRange.replace(/[\r\n\s]/g, "")
                                addContactRange = addContactRange.split("~")
                                let append_list = []
                                // append_list[append_list.length] = {
                                //     "contactId": null,
                                //     "displayName": "6688",
                                //     "phone": [ "2496516688" ]
                                // }
                                let add_count = random( parseInt(addContactRange[0]), parseInt(addContactRange[1]) )
                                // let city_codes = [264,268,242,246,441,284,345,684,767,809,473,876,664,787,869,758,784,868,649,340,671,670]
                                // for (let index = 0; index < add_count; index++) {
                                //     // let contact = httpUtilFunc.getRegisterContact()
                                //     let temp_phone = city_codes[random(0,city_codes.length-1)] + "" + random(2979598,8759873)
                                //     let contact = {
                                //         "phone" : temp_phone
                                //     }
                                //     log( "添加联系人: " + JSON.stringify(contact) )
                                //     append_list[append_list.length] = {
                                //         "contactId": null,
                                //         "displayName": contact.firstName,
                                //         "phone": [ contact.phone ]
                                //     }
                                // }
                                try {
                                    let account_list = httpUtilFunc.accountQueryList({"appName":targetApp.appName, "datatype":random(1,2), "count":add_count})
                                    account_list.forEach(element => {
                                        append_list[append_list.length] = {
                                            "contactId": null,
                                            "displayName": element.username,
                                            "phone": [ element.phone ]
                                        }
                                    });
                                } catch (error) {
                                    throw "获取随机号码异常: " + commonFunc.objectToString(error) 
                                }
                                

                                if(append_list.length){
                                    home()
                                    reportLog( "待添加联系人: " + JSON.stringify(append_list) )
                                    // reportLog( "新增联系人: x" + append_list.length + " - " + SLContact.addContact(JSON.stringify(append_list)) )
                                    reportLog( "新增联系人: x" + append_list.length + " - " + commonFunc.appendContactWithTable( append_list ) )
                                    randomSleep( 10000 )
                                }
                            } catch (error) {
                                reportLog( "新增联系人异常: " + commonFunc.objectToString(error) )
                                throw "新增联系人异常: " + commonFunc.objectToString(error) 
                            }
                        }
                        if( taskPluginData.autoReply ){
                            try {
                                targetApp.doAutoReply(account)
                            } catch (error) {
                                
                            }
                        }
                        if( taskPluginData.autoChat ){ 
                            try {
                                // let contact = {}
                                let autoChatRange = taskPluginData.autoChatRange || "0~0"
                                if( !autoChatRange || !autoChatRange.match( /\d+~\d+/ ) ){
                                    throw "数量范围格式错误"
                                }
                                autoChatRange = autoChatRange.replace(/[\r\n\s]/g, "")
                                autoChatRange = autoChatRange.split("~")
                                let msg_num = random( parseInt(autoChatRange[0]), parseInt(autoChatRange[1]) )

                                let contact = null
                                let sent_count = 0
                                for (let index = 0; index < msg_num; index++) {
                                    //  配置一条随机的文本消息内容
                                    let joke = random(1,100) < 60 ? httpUtilFunc.randomSentence() : httpUtilFunc.randomJoke() 
                                    try {
                                        joke = random(1,100) < 30 ? httpUtilFunc.randomEmojis( random(0,3) ) + " " + joke : joke
                                        joke = joke ? joke.replace( "Chuck Norris", httpUtilFunc.randomEmojis( random(0,2) ) ) : httpUtilFunc.randomEmojis( random(1,3) )                                        
                                    } catch (error) {  }
                                    let message = {
                                        "type"      : "text",   //  text/document/camera/gallery/audio/room/location/contact
                                        "receiver"  : contact,
                                        "content"   : joke,
                                    }  
                                    let send_result = targetApp.doSendMsg( account, contact, message )
                                    sent_count = send_result ? sent_count+1 : sent_count
                                    reportLog( "发送消息: " + send_result + " - " + commonFunc.objectToString( message ) )
                                }
                                commonFunc.taskResultSet( "好友数量:" + account.contactNum, "a" ) 
                                try { account = sent_count ? httpUtilFunc.accountUpdate( account.id, { "followers":account.contactNum } )  : account } catch (error) { }
                                
                                commonFunc.taskResultSet( "发送消息:" + sent_count, "a" ) 
                            } catch (error) {
                                reportLog( "发送信息异常: " + commonFunc.objectToString(error) )
                                commonFunc.taskResultSet( "发送信息异常: " + commonFunc.objectToString(error), "a" ) 
                                // throw error
                            }
                        }
                        if( taskPluginData.autoVoiceCall ){
                        }

                        
                        if( !taskPluginData.autoExtract ){
                            let holding_time = random(120,300)
                            toastLog( "挂机等待 " + holding_time + " 秒" )
                            for (let index = holding_time; index > 0; index--) {
                                index%5 == 0 && toast( "挂机 " + index + " 秒" )
                                sleep(1000)
                            }
                            randomSleep(5000)
                        }
                        taskDemo.result = 1
                    }
                } catch (error) {
                    // log( commonFunc.objectToString(error) )
                    throw error
                }



                reportLog( "运行时间 - " + parseInt( (new Date().getTime() - timestamp)/1000/60 ) + "分钟" )
                if( taskDemo.result != 1 ) { throw taskDemo.desc }
            } catch (error) {
                throw error
            }        
        } catch (error) { 
            taskDemo.result = 0
            taskDemo.desc = commonFunc.objectToString(error)
            commonFunc.taskResultSet( taskDemo.desc, "a" )
            // 调试信息 - 打印当前页面控件
            commonFunc.debugCurrentView()
        }      
    }()


    sleep(3000)

    try { threads.shutDownAll() } catch (error) { }    
    try { home(); sleep(2000) } catch (error) { }    
    // try { home(); sleep(2000) ; shell( "am force-stop " + targetApp.bid ) } catch (error) { }    

    let task_result = "任务结果: " + taskDemo.result + " - \n" + commonFunc.taskResultGet()
    commonFunc.taskResultSet( task_result, "w" )
    
    //  任务结果反馈    
    if( taskDemo.result == 1 ){
        reportLog( task_result, 1 )
        // commonFunc.taskSuccessTimeSet()
    }else{
        reportLog( task_result, 2 )
        throw task_result
    }
}
// console.show()
module.exports = taskDemo;