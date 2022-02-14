const commonFunc = require("../common/common.js");
const { clickIfWidgetExists, clickIfWidgetClickable, swipeWithBezier, shortSleep, randomSleep, md5, swipeUpSlowly, swipeDownSlowly, newThread, randomStr, isNotNullObject, clickIfParentsClickable } = require("../common/common.js");
const httpUtilFunc = require("../network/httpUtil.js");
const { downloadVideo, reportLog, getIpInfo } = require("../network/httpUtil.js");

const LOGIN_STATUS = {
    LOGOUT : 0,     //  "账号未登录"
    LOGIN  : 1,     //  "正常登录"
    BANNED : 2,     //  "账号掉线或被禁"
    UNKNOW : -1     //  "未识别到登录状态"
}
//###
var targetApp = {};


targetApp.init = function(){
    commonFunc.showLog( "init targetApp" )
    targetApp.bid = "com.whatsapp"
    targetApp.appName = "whatsapp"
    targetApp.requireVersion = "2.21.20.16"
    targetApp.versionName = commonFunc.getAppVersionName( targetApp.bid )
    // log( "targetApp script init : " + targetApp.bid )
    httpUtilFunc.reportLog( "应用版本: " + targetApp.bid + "_" + (targetApp.versionName ? targetApp.versionName : '未安装' )  )
    httpUtilFunc.reportLog( "创建媒体文件夹: " + files.createWithDirs("/sdcard/DCIM/"+targetApp.appName+"/app.init") )
}
targetApp.keepFrontAppThread = function() {
    if(!launch(targetApp.bid)){ throw targetApp.bid + " 启动失败" }
    try {
        return threads.start(function() {
            log("前台应用守护进程已启动")
            while(true){
                if( targetApp.isOtherPage() ){
                    log("关闭其他页面")
                    sleep(1000)
                }
                if( !packageName(targetApp.bid).findOne(1) ){
                    launch(targetApp.bid)
                    // descStartsWith( "News Feed, Tab " ).findOne(6000)
                    sleep(5000)
                }                
                // log("前台应用: "+currentPackage())
                sleep(1000)
            }        
        })        
    } catch (error) { }
    return null
}
targetApp.isOtherPage = function(){
    // let alertTitle = id("android:id/alertTitle").visibleToUser().findOne(1)
    // if( alertTitle && clickIfWidgetClickable( id("android:id/aerr_wait").visibleToUser().findOne(1) ) ){
    //     reportLog( "应用崩溃: " + alertTitle.text() )
    //     sleep(6000)
    //     return true
        // 6 Rect(177, 1214 - 1263, 1307) android:id/alertTitle android.widget.TextView - TikTok isn't responding - null - false - false - false - true
        //  4 Rect(93, 1307 - 1347, 1724) android:id/customPanel android.widget.FrameLayout -  - null - false - false - false - true
        //   \1
        //    5 Rect(93, 1307 - 1347, 1724) android:id/custom android.widget.FrameLayout -  - null - false - false - false - true
        //     \1
        //      6 Rect(93, 1307 - 1347, 1724) null android.widget.LinearLayout -  - null - false - false - false - true
        //       \2
        //        7 Rect(93, 1360 - 1347, 1528) android:id/aerr_close android.widget.Button - Close app - null - false - false - true - true
        //        7 Rect(93, 1528 - 1347, 1696) android:id/aerr_wait android.widget.Button - Wait - null - false - false - true - true
    // }
    let message_view = id("android:id/alertTitle").visibleToUser().findOne(1) || id("com.android.packageinstaller:id/permission_message").visibleToUser().findOne(1) || id("android:id/message").visibleToUser().findOne(1)   
    if( message_view && message_view.id() == "android:id/alertTitle" && clickIfWidgetClickable( id("android:id/aerr_wait").visibleToUser().findOne(1) ) ){
        reportLog( "应用崩溃: " + message_view.text() )
        sleep(6000)
        return true
        // 6 Rect(177, 1214 - 1263, 1307) android:id/alertTitle android.widget.TextView - TikTok isn't responding - null - false - false - false - true
        //  4 Rect(93, 1307 - 1347, 1724) android:id/customPanel android.widget.FrameLayout -  - null - false - false - false - true
        //   \1
        //    5 Rect(93, 1307 - 1347, 1724) android:id/custom android.widget.FrameLayout -  - null - false - false - false - true
        //     \1
        //      6 Rect(93, 1307 - 1347, 1724) null android.widget.LinearLayout -  - null - false - false - false - true
        //       \2
        //        7 Rect(93, 1360 - 1347, 1528) android:id/aerr_close android.widget.Button - Close app - null - false - false - true - true
        //        7 Rect(93, 1528 - 1347, 1696) android:id/aerr_wait android.widget.Button - Wait - null - false - false - true - true
    }
    else if( message_view && message_view.id() == "android:id/message" && message_view.text().match("Check your phone's connection") ){
        throw message_view.text()
    } 
    else if( message_view && message_view.id() == "com.android.packageinstaller:id/permission_message" ){
        // 权限检查
        for (let index = 0; index < 6; index++) {
            try {
                let permission_message = id("com.android.packageinstaller:id/permission_message").visibleToUser().findOne(1000).text()
                if( new RegExp(/files/i).test(permission_message) && clickIfWidgetClickable( id("com.android.packageinstaller:id/permission_allow_button").visibleToUser().clickable().findOne(1) ) ){ 
                    reportLog( "允许权限 - " + permission_message )
                }
                else if( new RegExp(/record/i).test(permission_message) && clickIfWidgetClickable( id("com.android.packageinstaller:id/permission_allow_button").visibleToUser().clickable().findOne(1) ) ){ 
                    reportLog( "允许权限 - " + permission_message )
                }
                else if( new RegExp(/contacts/i).test(permission_message) && clickIfWidgetClickable( id("com.android.packageinstaller:id/permission_allow_button").visibleToUser().clickable().findOne(1) ) ){ 
                    reportLog( "允许权限 - " + permission_message )
                }
                else if( clickIfWidgetClickable( id("com.android.packageinstaller:id/permission_deny_button").visibleToUser().clickable().findOne(1)) ){ 
                    reportLog( "拒绝权限 - " + permission_message )
                }
                else{ break }
            } catch (error) {}
        }
    }
    else if( clickIfWidgetClickable( idContains("green_alert_continue_button").findOne(1) ) ){
        // if( clickIfWidgetClickable( text("CONTINUE").findOne(1) ) ){
            //  Continue
    }
    // else if( clickIfWidgetClickable( className("android.widget.Button").text("DENY").findOne(1) ) ){
    //     sleep(1000)
    // }
    // else if( clickIfWidgetClickable( className("android.widget.Button").desc("DENY").findOne(1) ) ){}
    // else if( clickIfWidgetClickable( className("android.widget.Button").text("Deny").findOne(1) ) ){
    //     sleep(1000)
    // }
    // else if( clickIfWidgetClickable( className("android.widget.Button").desc("Deny").findOne(1) ) ){}
    // else if( clickIfWidgetClickable( className("android.widget.Button").text("Skip").findOne(1) ) ){ }
    // else if( clickIfWidgetClickable( className("android.widget.Button").text("SKIP").findOne(1) ) ){ }
    // else if( text("Stop setting up your profile?") && clickIfWidgetClickable( text("STOP").findOne(1) ) ){ }
    else{
        return false
    }
    //  app 权限访问
    // 1 Rect(225, 654 - 855, 760) null android.view.ViewGroup - Allow Facebook to access your location? - Allow Facebook to access your location? - false - false - false - true
    // 1 Rect(225, 802 - 855, 1077) null android.view.ViewGroup - Facebook uses this to provide more relevant and personalized experiences, like helping you to check in, find local events and get better ads. - Facebook uses this to provide more relevant and personalized experiences, like helping you to check in, find local events and get better ads. - false - false - false - true
    // 1 Rect(575, 1119 - 726, 1214) null android.widget.Button -  - Deny - false - false - true - true
    // 1 Rect(726, 1119 - 855, 1214) null android.widget.Button -  - Allow - false - false - true - true


    // 系统权限访问
    // 2 Rect(310, 691 - 876, 948) com.android.packageinstaller:id/permission_message android.widget.TextView - Allow Facebook to access photos, media, and files on your device? - null - false - false - false - true
    // 2 Rect(215, 969 - 876, 1095) com.android.packageinstaller:id/do_not_ask_checkbox android.widget.CheckBox - Don't ask again - null - false - false - true - true
    // 2 Rect(521, 1074 - 689, 1200) com.android.packageinstaller:id/permission_deny_button android.widget.Button - DENY - null - false - false - true - true
    // 2 Rect(689, 1074 - 876, 1200) com.android.packageinstaller:id/permission_allow_button android.widget.Button - ALLOW - null - false - false - true - true
    return true
}

/**
 * 获取当前账号登录状态
 * @param {*} timeout [timeout=1000*60] 超时时间(毫秒) ,  
 * @returns 
 */
targetApp.getLoginStatus = function( timeout ){
    timeout = timeout != null ? timeout : 1000*60
    log("登录状态检查")
    if( !app.getAppName(targetApp.bid) ){ throw "应用未安装: "+targetApp.bid }
    let app_enable = parseInt( context.getPackageManager().getApplicationEnabledSetting( targetApp.bid ) )
    if( app_enable > 1 ){ throw "应用状态: " + app_enable + " - " + targetApp.bid  }
    let status_code = LOGIN_STATUS.UNKNOW
    newThread(function(){        
        while( true ){
            if( !packageName(targetApp.bid).findOne(1) ){
                launch(targetApp.bid)
                sleep(3000)
            }
            if( id(targetApp.bid+":id/tab").text("STATUS").findOne(3000) ){
            // else if( id(targetApp.bid+":id/tab").text("CHATS").selected().findOne(3000) ){
                sleep(5000)
                if( id(targetApp.bid+":id/tab").text("STATUS").findOne(3000) ){
                    status_code = LOGIN_STATUS.LOGIN
                    break
                }
            }
            else if( textStartsWith("Enter your two-step").findOne(1) ){
                sleep(5000)
                status_code = LOGIN_STATUS.LOGIN
                break
            }
            else if( idContains("eula_accept").findOne(1) || idContains("verify_sms_code_input").findOne(1) ){
                status_code = LOGIN_STATUS.LOGOUT
                break
            }
            else if (  idContains("message").textContains( "no longer registered" ).findOne(1)){
                status_code = LOGIN_STATUS.BANNED
                // try {
                //     log( idContains("message").textContains( "no longer registered" ).findOne(1).text() )                    
                // } catch (error) {}
                break
            }
            else if( targetApp.isOtherPage() ){}
            else{
                back()
                sleep(2000)
            }
        }
    }, LOGIN_STATUS.UNKNOW, timeout, ()=>{ log("登录状态检查超时退出") })
    log("登录状态检查: " + status_code)
    return status_code
}
targetApp.getUnregisterAccount = function( req_data ){
    // return JSON.parse( '{"id":27,"appName":"whatsapp","type":1,"username":"whatsapp05072061","password":"1234","email":"whatsapp05072061@qq.com","emailPassword":"1234","phone":"2496506729","smsurl":"http://103.82.170.144/napi/view?token=883783cbcd424416ae5cb41cd2ef61d7","isRegistered":true,"isProcess":true,"extra":"nan","fromw":"nan","area":"1","createTime":"2021-05-07T12:50:22.625Z","isSuccess":false}' )
    // return JSON.parse( '{"id":27,"appName":"whatsapp","type":1,"username":"whatsapp05072061","password":"1234","email":"whatsapp05072061@qq.com","emailPassword":"1234","phone":"2496506729","smsurl":"http://103.82.170.144/napi/view?token=883783cbcd424416ae5cb41cd2ef61d7","isRegistered":true,"isProcess":true,"extra":"nan","fromw":"nan","area":"1","createTime":"2021-05-07T12:50:22.625Z","isSuccess":false}' )
    // return JSON.parse( '{\"id\": 31, \"appName\": \"whatsapp\", \"type\": 1, \"username\": \"whatsapp05072065\", \"password\": \"1234\", \"email\": \"whatsapp05072065@qq.com\", \"emailPassword\": \"1234\", \"phone\": \"5794575324\", \"smsurl\": \"http://103.82.170.144/napi/view?token=e9ed93634294477b800ed4fd2947029e\", \"isRegistered\": false, \"isProcess\": true, \"extra\": \"nan\", \"fromw\": \"nan\", \"dialCode\": \"1\", \"city\": \"unknown\", \"country\": \"unknown\", \"countryCode\": \"unknown\", \"createTime\": \"2021-05-07T12:50:22.665Z\"}' )
    return newThread(function() {
        try {
            // reportLog( "请求账号: " + JSON.stringify( req_data ) )
            // return JSON.parse( '{\"id\": 31, \"appName\": \"whatsapp\", \"type\": 1, \"username\": \"whatsapp05072065\", \"password\": \"1234\", \"email\": \"whatsapp05072065@qq.com\", \"emailPassword\": \"1234\", \"phone\": \"5794575324\", \"smsurl\": \"http://103.82.170.144/napi/view?token=e9ed93634294477b800ed4fd2947029e\", \"isRegistered\": false, \"isProcess\": true, \"extra\": \"nan\", \"fromw\": \"nan\", \"dialCode\": \"1\", \"city\": \"unknown\", \"country\": \"unknown\", \"countryCode\": \"unknown\", \"createTime\": \"2021-05-07T12:50:22.665Z\"}' )
            // return JSON.parse( '{"appName":"whatsapp","type":1,"dialCode":"1","phone":"8567623371","smsurl":"http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=b308ce15-cd90-4d9b-8ddc-e3dfce247591"}' )
            // register_info.appName       = "whatsapp"
            //             register_info.countryCode   = taskConfig.countryCode
            //             register_info.dialCode      = commonFunc.getDialCode( commonFunc.getDialCode( taskConfig.countryCode ) )
            //             register_info.phoneProvider = taskConfig.phoneProvider
            //             register_info.tag      = taskConfig.phoneTag
            let url = "http://192.168.91.3:8000/user/unregaccount?appName="+req_data.appName+"&countryCode="+req_data.countryCode+"&phoneProvider="+req_data.phoneProvider+"&tag="+req_data.tag
            // let res = http.postJson(url, req_data)
            reportLog( "请求账号: " + url )
            let res = http.get(url)

            res = res.body.json()
            if( res.code == 200 ){
                let data = JSON.parse( res.data )
                if( data.id && data.appName ){
                    return data
                }
            }
            throw res
        } catch (error) {
            // reportLog( "请求账号失败: " + commonFunc.objectToString(error) )
            throw "请求账号失败: " + commonFunc.objectToString(error) 
        }
    }, null, 1000*60*2 )
}
targetApp.getAccountFromAPI = function( req_data ){
    //  接码获取带注册账号
    let unreg_account =  newThread(function() {
        try {
            // reportLog( "请求账号: " )
            reportLog( "请求账号: " + JSON.stringify( req_data ) )
            let account = {
                // "id":2946,
                "appName":req_data.appName,
                "type":1,
                "forceRecord": true,
                "username":null,
                "password":null,
                "email":null,
                "emailPassword":null,
                "isRegistered":false,
                "isProcess":true,
                "extra":null,
                "dialCode":req_data.dialCode,
                "city":null,
                "country":null,
                "countryCode":req_data.countryCode,
                // "createTime":"2021-06-17T11:19:02.566Z",
                // "phone":_str[4],
                // "smsurl":req_data.smsApi + _str[4] ,
                // "phoneProvider":"ma37"
            } 
            // return JSON.parse( '{\"id\": 31, \"appName\": \"whatsapp\", \"type\": 1, \"username\": \"whatsapp05072065\", \"password\": \"1234\", \"email\": \"whatsapp05072065@qq.com\", \"emailPassword\": \"1234\", \"phone\": \"5794575324\", \"smsurl\": \"http://103.82.170.144/napi/view?token=e9ed93634294477b800ed4fd2947029e\", \"isRegistered\": false, \"isProcess\": true, \"extra\": \"nan\", \"fromw\": \"nan\", \"dialCode\": \"1\", \"city\": \"unknown\", \"country\": \"unknown\", \"countryCode\": \"unknown\", \"createTime\": \"2021-05-07T12:50:22.665Z\"}' )
            // return JSON.parse( '{"appName":"whatsapp","type":1,"dialCode":"1","phone":"8567623371","smsurl":"http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=b308ce15-cd90-4d9b-8ddc-e3dfce247591"}' )
            let url = req_data.phoneApi
            let res = http.get(url)
            if( url.match( /.*ma37.com.*/ ) ){
                res = res.body.string()
                reportLog( "请求结果: " + res )
                let _str = res.split("|")
                if( _str.length > 3 ){
                    // let account = {
                    //     // "id":2946,
                    //     "appName":"whatsapp",
                    //     "type":1,
                    //     "username":null,
                    //     "password":null,
                    //     "email":null,
                    //     "emailPassword":null,
                    //     "phone":_str[4],
                    //     "smsurl":req_data.smsApi + _str[4] ,
                    //     "isRegistered":false,
                    //     "isProcess":true,
                    //     "extra":null,
                    //     "dialCode":req_data.dialCode,
                    //     "city":null,
                    //     "country":null,
                    //     "countryCode":req_data.countryCode,
                    //     // "createTime":"2021-06-17T11:19:02.566Z",
                    //     "phoneProvider":"ma37"
                    // }   
                    account.phoneProvider = "ma37"
                    account.phone = _str[4]
                    account.smsurl = req_data.smsApi + _str[4]
                    return account                 
                }
            }
            else if( url.match( /.*chothuesimcode.com.*/ ) ){
                res = res.body.json()
                // {
                //     "ResponseCode": 0,
                //     "Msg": "OK",
                //     "Result": {
                //         "Id": 59268752,
                //         "Number": "569579931",
                //         "App": "WhatsApp",
                //         "Cost": 0.3,
                //         "Balance": 97.9
                //     }
                // }
                reportLog( "请求账号结果: " + JSON.stringify( res ) )
                if( res.Result && res.Result.Id ){
                    account.phoneProvider = "yuenanka"
                    account.phone = res.Result.Number
                    account.smsurl = req_data.smsApi + res.Result.Id
                    return account  
                }
            }
            throw res
        } catch (error) {
            // reportLog( "请求账号失败: " + commonFunc.objectToString(error) )
            throw "请求账号失败: " + commonFunc.objectToString(error)
        }
    }, null, 1000*60*3, ()=>{ throw "取号超时退出" } )

    //  写入未注册账号表
    unreg_account = newThread(function() {
        try {
            if( !unreg_account ){ return null }
            unreg_account.forceRecord = true
            reportLog( "写入账号: " + JSON.stringify( unreg_account ) )
            let res = http.postJson("http://192.168.91.3:8000/user/unregaccount", unreg_account )
            res = res.body.json()
            if( res.code == 200 ){ return JSON.parse( res.data ) }
            throw res
        } catch (error) {
            // reportLog( "请求账号失败: " + commonFunc.objectToString(error) )
            throw "写入账号失败: " + commonFunc.objectToString(error)
        }
    }, null, 1000*60*3, ()=>{ throw "写入超时退出" } )

    return unreg_account
}



targetApp.releasePhone = function( api, phone ){
    try {
        if( !api ){ throw "api " + api }
        if( !phone ){ throw "phone " + phone }
        newThread(()=>{
            log("释放号码: " + phone)
            let url = api + phone
            let res = http.get(url)
            res = res.body.string()
            log( "释放结果: " + res )
            if( res == "1|" ){ return true }            
        },null,1000*30)
    } catch (error) {
        log("释放号码异常: " + commonFunc.objectToString(error) )
    }
    return false
}

targetApp.reportRegister = function(account, reportType) {
    try {
        account.deviceId = commonFunc.deviceId
        account.folderId = commonFunc.folderId
        account.androidId = commonFunc.androidId
        // let ipInfo = getIpInfo()
        // account.ip = ipInfo.query || ""
        try { account.ip = account.ip || httpUtilFunc.getGlobalIp() } catch (error) { }
        account.deviceInfo = commonFunc.brand + "-" + commonFunc.model
        account.desc = account.desc || null
        // account.extra = account.desc || null
        //  临时转换
        // for (let key in account) {
        //     if( account[key] == null ){
        //         account[key] = ""
        //     }
        // }
        let log_text = account.isSuccess ? "注册成功 " : "注册失败 " + account.desc + " - "
        if( reportType == 2 ){ log_text = "更新账号 " }
        reportLog( log_text + JSON.stringify(account), 1 )
        let url = "http://192.168.91.3:8000/user/registered"
        let res = http.postJson(url, account)
        res = res.body.json()
        // log( JSON.stringify(res) )
        if( res.code == 200 ){
            reportLog("记录注册结果完成: " + res.data )
            let record_account = JSON.parse( res.data )
            return record_account
        }else{
            throw res
        }        
    } catch (error) {
        reportLog("记录注册结果失败 " + commonFunc.objectToString(error)  )
    }
    return null
}
targetApp.resetAccount = function(account) {
    try {
        reportLog( "注册失败 " + account.desc + " - 重置账号: " + JSON.stringify(account), 1 )
        let url = "http://192.168.91.3:8000/user/unregaccount"
        let res = http.postJson(url, account)
        res = res.body.json()
        // log( JSON.stringify(res) )
        if( res.code == 200 ){
            reportLog("账号重置完成: " + res.data )
            let reset_account = JSON.parse( res.data )
            return reset_account
        }
        throw res
    } catch (error) {
        reportLog("账号重置失败 " + commonFunc.objectToString(error)  )
    }
    return null
}

/**
 * 
 * @param {*} account 
 * @param {*} profile 
 * @returns 
 */
// targetApp.doEditProfile = function( account, profile ) {
//     let new_account = account
//     try {
//         let new_name = null
//         let save_name = null
//         let new_bio = null
//         let save_bio = null
//         let new_photo = null
//         let save_photo = null

//         let is_name_set = true
//         let is_bio_set = true
//         let is_photo_set = true
//         let max_timeout = 1000*60*2
//         if( !isNotNullObject(new_account) ){ throw "账号参数异常: " + new_account }
//         if( !isNotNullObject(profile) ){ throw "资料参数异常: " + profile }
//         if( !profile.name && !profile.bio && !profile.photo ){ throw "参数异常: " + commonFunc.objectToString( profile ) }
//         new_account.forceRecord = true
//         if( profile.name ){
//             is_name_set = false
//             new_name = profile.name.toLowerCase()
//             max_timeout = max_timeout + 1000*60*1
//         }
//         if( profile.bio ){
//             is_bio_set = false
//             new_bio = profile.bio
//             max_timeout = max_timeout + 1000*60*1
//         }
//         if( profile.photo ){
//             is_photo_set = false
//             new_photo = profile.photo
//             max_timeout = max_timeout + 1000*60*3
//         }

//         newThread( ()=>{
//             while( true ){
//                 if( clickIfWidgetClickable( desc("More options").clickable().visibleToUser().findOne(1) ) ){  }
//                 else if( clickIfWidgetExists( id(targetApp.bid+":id/title").text("Settings").visibleToUser().findOne(1) ) ){  }                
//                 else if( clickIfWidgetClickable( id(targetApp.bid+":id/profile_info").clickable().visibleToUser().findOne(1) ) ){  }
                
//                 else if( id(targetApp.bid+":id/profile_info_name_card").visibleToUser().findOne(1) ){
//                     if( !is_name_set ){
//                         is_name_set = true
//                         // //  检查当前用户昵称
//                         // if( desc( "Name"+new_name ).findOne(1000) || ( save_name && desc( "Name"+save_name ).findOne(1) ) ){
//                         //     is_name_set = true
//                         //     new_account.name = save_name || new_name
//                         //     continue;
//                         // }
//                         // let toast_msg = null
//                         // let t_thread = threads.start(function(){
//                         //         events.observeToast();
//                         //         events.onToast(function(toast){
//                         //             toast_msg = toast.getText()
//                         //             reportLog("监听 Name 修改事件: " + toast_msg );
//                         //             try { t_thread.interrupt() } catch (error) { }
//                         //         });
//                         //     })

//                         // //  开始修改昵称
//                         // clickIfWidgetClickable( descStartsWith("Name").clickable().findOne(1000) ) && randomSleep(5000)
//                         // for (let index = 0; index < 10; index++) {
//                         //     if( toast_msg == "Saved" ){ is_name_set = true; break }
//                         //     else if( id("com.ss.android.ugc.trill:id/title").text("Name").findOne(1000) ){
//                         //         //  可以修改昵称
//                         //         setText( new_name ); randomSleep()
//                         //         reportLog( "输入昵称: " + new_name )
//                         //         try { save_name = id(_ids.Profile_Name_EditText).findOne(1000).text() } catch (error) { }
//                         //         if( clickIfWidgetClickable( text("Save").clickable().findOne(6000) ) ){
//                         //             reportLog( "保存昵称: " + save_name )
//                         //             randomSleep(10000)
//                         //             // new_account.name = save_name
//                         //         }
//                         //     }                            
                            
//                         //     // else if( id("com.ss.android.ugc.trill:id/title").text("Edit profile").findOne(1) ){  break }
//                         //     // else if( clickIfWidgetClickable( text("SET USERNAME").clickable().findOne(1) ) ){ id("com.ss.android.ugc.trill:id/title").text("Edit profile").findOne(5000); randomSleep() }
//                         //     randomSleep()
//                         // }
//                         // try { t_thread.interrupt() } catch (error) { }
//                         // // if( textContains("isn't available").findOne(1) ){ throw "昵称修改失败: " + textContains("isn't available").findOne(1).text() }
//                         // // if( !id("com.ss.android.ugc.trill:id/title").text("Edit profile").findOne(3000) ){ throw "昵称修改失败" }
//                         // if( !is_name_set ){ throw "昵称修改失败" }
//                         // new_account.name = save_name
//                     }                    
//                     else if( !is_bio_set ){
//                         is_bio_set = true
//                     }
//                     else if( !is_photo_set ){
//                         //  1. 下载图片
//                         try {                            
//                             httpUtilFunc.downloadFile( new_photo, "/sdcard/DCIM/whatsapp/photo.png",null, true )
//                         } catch (error) { throw error }
                        

//                         //  2. 更新图片
//                         clickIfWidgetClickable( id(targetApp.bid+":id/change_photo_btn").clickable().visibleToUser().findOne(1000) ) && randomSleep(3000)
//                         clickIfWidgetClickable( text("ALLOW").visibleToUser().findOne(1) ) && randomSleep(3000) 
//                         clickIfParentsClickable( id(targetApp.bid+":id/name").text("Gallery").visibleToUser().findOne(1000) ) && randomSleep(3000)
//                         clickIfWidgetClickable( text("ALLOW").visibleToUser().findOne(1) ) && randomSleep(3000) 
//                         clickIfParentsClickable( id(targetApp.bid+":id/thumbnail").visibleToUser().findOne(1000) ) && randomSleep(3000) 
//                         // 
//                         let t_thread = threads.start(function(){
//                             events.observeToast();
//                             events.onToast(function(toast){
//                                 let t_msg = toast.getText()
//                                 log("监听到 Toast 事件: " + t_msg );
//                                 is_photo_set = t_msg == "Profile photo updated" ? true : is_photo_set
//                                 t_thread.interrupt()
//                             });
//                         })                       

//                         // id(targetApp.bid+":id/media_section").visibleToUser().findOne(1000) && clickIfWidgetClickable( className("android.widget.ImageView").desc("Photo").visibleToUser().findOne(1) ) && randomSleep(3000) 
//                         clickIfWidgetClickable( className("android.widget.ImageView").desc("Photo").visibleToUser().findOne(1000) ) && randomSleep(3000) 
//                         if( clickIfWidgetClickable( id(targetApp.bid+":id/ok_btn").text("DONE").visibleToUser().findOne(3000) ) ){
//                             is_photo_set = true
//                             randomSleep(3000)
//                         }
//                         try { t_thread.interrupt() } catch (error) { } 
//                     }
//                     else{                        
//                         back()
//                         return true
//                     }
//                 }
//                 else if( !packageName(targetApp.bid).findOne(1) ){
//                     toastLog("启动应用中...")
//                     launch( targetApp.bid )
//                     randomSleep( 3000 )
//                 } 
//                 else{
//                     back()
//                     toastLog("unknow page")
//                     randomSleep(3000)
//                 }
//                 randomSleep()
//             }
//         },false,max_timeout,()=>{ throw "超时退出" } )

//         // try {
//             let msg =  "修改资料结果: " + "\n"
//             if( profile.name )      { msg = msg + "   修改昵称: " + account.name + " -> " + save_name + "\n" }
//             if( profile.username )  { msg = msg + "   修改名称: " + account.username + " -> " + save_username + "\n" }
//             if( profile.bio )       { msg = msg + "   修改签名: " + account.bio + " -> " + save_bio + "\n" }
//             if( profile.photo )     { msg = msg + "   修改头像: " + account.photo + " -> " + save_photo + "\n" }
//             msg = msg + JSON.stringify(new_account)
//             reportLog( msg )
//         // } catch (error) { }
//     } catch (error) {
//         let msg =  "修改资料结果: " + "\n"
//         msg = msg + commonFunc.objectToString(error) + "\n"
//         // msg = msg + JSON.stringify(new_account)
//         reportLog( msg + JSON.stringify(new_account) )
//         throw msg
//     }
//     return new_account
// }

targetApp.doAutoReply = function( account ){
    let getChatMsg = function( widget, message ){
        if( !widget ){ return message }
        message = isNotNullObject(message) ? message : {}
        if( widget.id() == "com.whatsapp:id/conversations_row_contact_name" ){
            message.name = widget.text()
        }
        else if( widget.id() == "com.whatsapp:id/conversations_row_date" ){
            message.date = widget.text()
        }
        else if( widget.id() == "com.whatsapp:id/single_msg_tv" ){
            message.msg = widget.text()
        }
        else if( widget.id() == "com.whatsapp:id/conversations_row_message_count" ){
            message.msgCount = widget.text()
        }else{
            widget.children().forEach(child => {
                getChatMsg( child, message )
            });         
        } 
        // log( JSON.stringify(message) )
        return message  
    }    
    let reply_count = 0
    try {
        // account = isNotNullObject(account) ? account : {}
        newThread(()=>{
            // let is_reply_sent = true
            let is_msg_sent = false
            while(true){
                if( !packageName(targetApp.bid).findOne(1) ){
                    if( clickIfWidgetClickable( text("ALLOW").findOne(1) ) ){
                        log("获取权限")
                        randomSleep( 5000 )
                    }
                    launch(targetApp.bid)
                    sleep(3000)
                }
                if( id("com.whatsapp:id/tab").text("CHATS").selected().findOne(1000) ){ 
                    randomSleep(3000)
                    is_msg_sent = true
                    //  查看未读消息
                    let btn_list = id("com.whatsapp:id/contact_row_container").find()
                    // log(btn_list.length)
                    for (let index = 0; index < btn_list.length; index++) {
                        let temp_msg = getChatMsg(btn_list[index])
                        // log( JSON.stringify(temp_msg) )
                        // log( btn_list[index] )
                        if( temp_msg && temp_msg.msgCount ){ 
                        // if( temp_msg && temp_msg.name == "1688" ){ 
                            log( "未读消息: " + JSON.stringify(temp_msg) )
                            clickIfWidgetClickable( btn_list[index] )
                            is_msg_sent = false
                            id("com.whatsapp:id/conversation_contact_name").visibleToUser().findOne(3000)
                            break
                        }        
                    }      
                    if( is_msg_sent ){
                        // 15 Rect(216, 377 - 576, 438) com.whatsapp:id/banner_title android.widget.TextView - Start a group chat - null - false - false - false - true
                        if( id("com.whatsapp:id/banner_title").text("Start a group chat").findOne(1) ){
                            reportLog("建群功能 已激活")
                        }
                        return true
                    }          
                }
                else if( id("com.whatsapp:id/conversation_contact_name").visibleToUser().findOne(1) ){
                    if( is_msg_sent ){
                        back()
                        sleep(2000)
                        continue
                    }
                    
                    try {
                        let contact_name = id("com.whatsapp:id/conversation_contact_name").findOne(1).text()                           
                        //  30% 的概率不回复消息
                        if( random(0,100) < 30 ){  
                            is_msg_sent = true
                            reportLog("不回复 " + contact_name + " 的消息")
                        }else{
                            // let msg_text = httpUtilFunc.randomJoke() || ""
                            let msg_text = httpUtilFunc.randomSentence() || ""
                            randomSleep(3000)
                            msg_text = msg_text + " " + httpUtilFunc.randomEmojis( random(0,3 ) )
                            id("com.whatsapp:id/entry").findOne(3000).setText( msg_text )
                            randomSleep(3000)
                            // is_msg_sent = true
                            is_msg_sent = clickIfWidgetClickable( id("com.whatsapp:id/send").clickable().findOne(3000) )
                            is_msg_sent && reply_count++
                            is_msg_sent && reportLog("发送消息: " + contact_name + " -> " + msg_text) 
                        }                      

                        randomSleep(5000)
                        clickIfWidgetClickable( id("com.whatsapp:id/back").clickable().findOne(1000) )
                        randomSleep(2000)
                    } catch (error) {
                        reportLog( "回复消息 发送异常: " + commonFunc.objectToString(error)  )
                        back()
                    }
                }
                else if( clickIfWidgetClickable( id("com.whatsapp:id/submit").text("CONTINUE").findOne(1) || id("com.android.packageinstaller:id/permission_allow_button").text("ALLOW").findOne(1) ) ){
                    log("获取权限")
                }
                else{
                    back()
                }
                sleep(1000)
            }
        },false, 1000*60*3,()=>{ reportLog("回复消息 超时退出") })        
    } catch (error) {
        throw error
    }

    return reply_count
}
targetApp.doSendMsg = function( account, contact, message ){
    try {
        account = isNotNullObject(account) ? account : {}
        if( !isNotNullObject( message ) || !message.type || !message.content ) { throw "消息对象异常: " + JSON.stringify(message) }       
        let msg_type = message.type
        let msg_content = message.content
        let phone = contact ? contact.phone : null
        return newThread(()=>{
            let contact_num = null
            
            let is_msg_ready = false
            let is_msg_sent = false
            while(true){
                
                if( !packageName(targetApp.bid).findOne(1) ){
                    if( clickIfWidgetClickable( text("ALLOW").findOne(1) ) ){
                        log("获取权限")
                        randomSleep( 5000 )
                    }
                    launch(targetApp.bid)
                    sleep(3000)
                }
                if( id("com.whatsapp:id/tab").text("CHATS").selected().findOne(1000) ){ //  聊天首页
                    // if( msg_count < 0 ){
                    // if( msg_idx > messageList.length-1 ){
                    if( is_msg_sent ){
                        try {
                            // 15 Rect(216, 377 - 576, 438) com.whatsapp:id/banner_title android.widget.TextView - Start a group chat - null - false - false - false - true
                            if( id("com.whatsapp:id/banner_title").text("Start a group chat").findOne(1) ){
                                account.groupChat = true
                                reportLog("建群功能 已激活")
                            }
                        } catch (error) { }
                        return true
                    }else if( clickIfWidgetClickable( desc("New chat").clickable().findOne(3000) ) ){    //  发起新的聊天
                        clickIfWidgetClickable( text("ALLOW").findOne(3000) ) && randomSleep(5000)
                    }else{
                        back()
                        sleep(2000)
                    }
                }
                else if( id("com.whatsapp:id/conversation_contact_name").visibleToUser().findOne(1) ){  //  聊天对话界面
                    if( is_msg_sent || !is_msg_ready ){
                        back()
                        sleep(2000)
                        continue
                    }
                    let contact_name = id("com.whatsapp:id/conversation_contact_name").findOne(1).text() 
                    if( msg_type == "text" ){                            
                        id("com.whatsapp:id/entry").findOne(1000).setText( msg_content )
                        sleep(1000)
                        is_msg_sent = clickIfWidgetClickable( id("com.whatsapp:id/send").clickable().findOne(3000) )
                        // is_msg_sent = true
                        reportLog("发送消息: " + is_msg_sent + " - " + contact_name + " -> " + msg_content ) 
                        randomSleep(5000)
                        clickIfWidgetClickable( id("com.whatsapp:id/back").clickable().findOne(1000) )
                        randomSleep(2000)
                    }
                    // 8 Rect(169, 858 - 416, 1059) com.whatsapp:id/pickfiletype_document_holder android.widget.LinearLayout -  - null - false - false - true - true
                    // 8 Rect(416, 858 - 663, 1059) com.whatsapp:id/pickfiletype_camera_holder android.widget.LinearLayout -  - null - false - false - true - true
                    // 8 Rect(663, 858 - 910, 1059) com.whatsapp:id/pickfiletype_gallery_holder android.widget.LinearLayout -  - null - false - false - true - true
                    // 8 Rect(169, 1117 - 416, 1318) com.whatsapp:id/pickfiletype_audio_holder android.widget.LinearLayout -  - null - false - false - true - true
                    // 8 Rect(416, 1117 - 663, 1318) com.whatsapp:id/pickfiletype_room_holder android.widget.LinearLayout -  - null - false - false - true - true
                    // 8 Rect(663, 1117 - 910, 1318) com.whatsapp:id/pickfiletype_location_holder android.widget.LinearLayout -  - null - false - false - true - true
                    // 8 Rect(169, 1376 - 416, 1577) com.whatsapp:id/pickfiletype_contact_holder android.widget.LinearLayout -  - null - false - false - true - true
                    else if( msg_type == "contact" ){   
                        // 13 Rect(694, 1659 - 810, 1782) com.whatsapp:id/input_attach_button android.widget.ImageButton -  - Attach - false - false - true - true
                        clickIfWidgetClickable( id("com.whatsapp:id/pickfiletype_contact_holder").clickable().findOne(1000) ) || clickIfWidgetClickable( id("com.whatsapp:id/input_attach_button").clickable().findOne(1000) ); randomSleep(3000)
                        clickIfWidgetClickable( id("com.whatsapp:id/pickfiletype_contact_holder").clickable().findOne(1000) ) || clickIfWidgetClickable( id("com.whatsapp:id/input_attach_button").clickable().findOne(1000) ); randomSleep(3000)
                        if( !text("Contacts to send").findOne(3000) ){ reportLog( "未识别到联系人名片界面" ); back(); continue }
                        // 9 Rect(435, 897 - 645, 1107) com.whatsapp:id/init_contacts_progress android.widget.ProgressBar -  - null - false - false - false - true
                    }
                    else if( msg_type == "gallery" ){   

                        //  1. 下载图片
                        try {
                            let media_name = "temp" + ( new RegExp(/\.\w{3,4}$/).test(msg_content) ? msg_content.match( /\.\w{3,5}$/ )[0] : ".png" ) //    url.match( /\.\w{3,5}$/ )[0]
                            httpUtilFunc.downloadFile( msg_content, "/sdcard/DCIM/whatsapp/" + media_name ,null, true )
                        } catch (error) { throw error }

                        newThread(()=>{
                            while(true){
                                clickIfWidgetClickable( id("com.whatsapp:id/pickfiletype_gallery_holder").clickable().findOne(1000) ) || clickIfWidgetClickable( id("com.whatsapp:id/input_attach_button").clickable().findOne(1) ); randomSleep(1000,3000)
                                clickIfWidgetClickable( id("com.whatsapp:id/pickfiletype_gallery_holder").clickable().findOne(1000) ) || clickIfWidgetClickable( id("com.whatsapp:id/input_attach_button").clickable().findOne(1) ); randomSleep(1000,3000)
                                clickIfWidgetClickable( text("ALLOW").visibleToUser().findOne(1) ) && randomSleep(3000) 
                                if( id("com.whatsapp:id/thumbnail").visibleToUser().findOne(1) ){  
                                    if( clickIfParentsClickable( id("com.whatsapp:id/title").text("All media").visibleToUser().findOne(1000) || id("com.whatsapp:id/thumbnail").visibleToUser().findOne(1) ) ){

                                    }
                                    // else if( clickIfParentsClickable( id("com.whatsapp:id/thumbnail").visibleToUser().findOne(1) ) ){  }
                                    else{  back(); reportLog("未识别到媒体文件夹") }
                                }
                                else if( id("com.whatsapp:id/media_section").visibleToUser().findOne(1) ){  
                                    // android.widget.ImageView -  - Photo
                                    if( clickIfWidgetClickable( className("android.widget.ImageView").descMatches(".+").clickable().visibleToUser().findOne(1000) ) ){

                                    }
                                    else{ back(); reportLog("未识别到媒体文件") }
                                }
                                else if( clickIfWidgetClickable( className("android.widget.ImageButton").desc("Send").visibleToUser().findOne(1000) ) ){
                                    is_msg_sent = true
                                    reportLog("发送文件: " + is_msg_sent + " - " + contact_name + " -> " + msg_content ) 
                                    return true
                                }
                            }
                        },null,1000*60*3,()=>{ throw "超时退出" })
                    }
                    else{
                        // msg_count -= 1
                        // is_msg_sent = true
                        // back()
                        throw "群发功能暂未支持此消息类型: " + msg_type
                    }
                }
                else if( id("com.whatsapp:id/quick_contact_divider").visibleToUser().findOne(1) ){  //  联系人快照
                    if( is_msg_sent ){ back(); continue }
                    // 8 Rect(204, 990 - 372, 1116) com.whatsapp:id/message_btn android.widget.ImageButton -  - Message contact - false - false - true - true
                    // 06:15:46.850/D:                   8 Rect(372, 990 - 540, 1116) com.whatsapp:id/audio_call_btn android.widget.ImageButton -  - Voice call - false - false - true - true
                    // 06:15:46.853/D:                   8 Rect(540, 990 - 708, 1116) com.whatsapp:id/video_call_btn android.widget.ImageButton -  - Video call - false - false - true - true
                    // 06:15:46.855/D:                   8 Rect(708, 990 - 876, 1116) com.whatsapp:id/info_btn android.widget.ImageButton -  - Info - false - false - true - true
                    if( ( msg_type == "text" || msg_type == "contact" || msg_type == "gallery" ) && clickIfWidgetClickable( id("com.whatsapp:id/message_btn").visibleToUser().findOne(3000) ) ){
                        id("com.whatsapp:id/conversation_contact_name").visibleToUser().findOne(2000)
                        is_msg_ready = true
                        reportLog( "即将发送消息类型: " + msg_type )
                    }else if( id("com.whatsapp:id/invite_btn").visibleToUser().findOne(1) ){
                        throw "目标号码未注册 WhatsApp: " + phone
                    }
                }                
                else if( msg_type == "contact" && text("Contacts to send").findOne(1) ){  
                    if( is_msg_sent ){ back(); continue }
                    log( "搜索名片: " + msg_content )
                    // 9 Rect(435, 897 - 645, 1107) com.whatsapp:id/init_contacts_progress android.widget.ProgressBar -  - null - false - false - false - true
                    for (let index = 0; index < 10; index++) {
                        randomSleep()
                        if( id("com.whatsapp:id/contactpicker_row_photo").visibleToUser().findOne(1) && randomSleep(3000) ){ break }
                        if( id("com.whatsapp:id/init_contacts_progress").visibleToUser().findOne(1) ){ log("好友列表加载中"); randomSleep(5000) }
                    }
                    try {
                        clickIfWidgetClickable( id("com.whatsapp:id/menuitem_search").findOne(1000) ) && randomSleep(3000)
                        id("com.whatsapp:id/search_src_text").findOne(3000).setText( msg_content ) && randomSleep(3000) && input(" ")  && randomSleep(3000)
                        // setText("1688") && randomSleep() && input(" ")
                    } catch (error) {  }
                    if( id("com.whatsapp:id/search_src_text").text(msg_content+" ").findOne(1000) ){
                        let temp_contact = id("com.whatsapp:id/contactpicker_row_photo").descMatches(/.+/).findOne(2000)
                        if( clickIfParentsClickable( temp_contact ) ){
                            reportLog( "选择名片: " + msg_content + " - " + temp_contact.desc() )
                            id("com.whatsapp:id/contact_row_photo").descMatches(/.+/).visibleToUser().findOne(2000) && clickIfWidgetClickable( id("com.whatsapp:id/next_btn").findOne(1000) ) && randomSleep(3000)
                            if( text("Send contact").visibleToUser().findOne(2000) ){
                                let temp_name = null
                                let temp_phone = null
                                try { temp_name = id("com.whatsapp:id/title_tv").findOne(1).text(); temp_phone = id("com.whatsapp:id/name").findOne(1).text()  } catch (error) { }
                                is_msg_sent = clickIfWidgetClickable( id("com.whatsapp:id/send_btn").findOne(1000) ) && randomSleep(3000)
                                reportLog( "发送名片:   " + is_msg_sent + "   " + temp_phone + "  -  " + temp_name  )
                                //  6 Rect(133, 806 - 947, 877) android:id/alertTitle android.widget.TextView - Processing… - null - false - false - false - true
                                id("com.whatsapp:id/conversation_contact_name").visibleToUser().findOne(10000); back()
                            }else{ reportLog( "未识别到名片发送页" ) }
                        }else{
                            throw "未识别到名片: " + msg_content
                        }
                    }else{ back() }
                }
                else if( text("Select contact").visibleToUser().findOne(1) ){
                // else if( id("com.whatsapp:id/search_src_text").visibleToUser().findOne(1) ){
                    if( !contact_num ){
                        try {
                            contact_num = parseInt( textMatches(/\d+ contact./).findOne(1).text().match(/(\d+)/)[1] )
                            reportLog( "联系人数量: " + contact_num )
                            account.contactNum = contact_num
                        } catch (error) { }
                    }
                    // if( msg_count < 0 ){                        
                    // if( msg_idx > messageList.length-1 ){                        
                    //     back()
                    //     continue
                    // }
                    if( is_msg_sent ){ back(); continue }
                    if( phone ){
                        // if( !isNotNullObject(contact) || !contact.phone ){ throw "发送对象异常: " + JSON.stringify(contact) }
                        log( "搜索对象: " + phone )
                        
                        try {
                            clickIfWidgetClickable( id("com.whatsapp:id/menuitem_search").findOne(1000) )
                            id("com.whatsapp:id/search_src_text").findOne(3000).setText( phone ) && randomSleep(3000) && input(" ")  && randomSleep(3000)
                        } catch (error) {  }
                        if( id("com.whatsapp:id/search_src_text").text(phone+" ").findOne(3000) ){
                            let temp_contact = id("com.whatsapp:id/contactpicker_row_photo").descMatches(/.+/).clickable().findOne(2000)
                            if( clickIfWidgetClickable( temp_contact ) ){
                                log( "选择发送对象: " + phone + " - " + temp_contact.desc() )
                                id("com.whatsapp:id/quick_contact_divider").visibleToUser().findOne(5000)
                                // log( "消息内容: " + msg_content )
                                // is_msg_sent = false
                                // is_msg_ready = true
                            }else{
                                // msg_count -= 1
                                // msg_idx++
                                // // reportLog( "未识别到联系人 - " + msg_count )
                                // reportLog( "未识别到联系人: " + phone + " " )
                                // back()
                                throw "未识别到联系人: " + phone
                            }
                        }
                        // 11 Rect(848, 73 - 975, 199) com.whatsapp:id/menuitem_search android.widget.TextView -  - Search - false - false - true - true
                        // 14 Rect(126, 88 - 1059, 183) com.whatsapp:id/search_src_text android.widget.EditText - Search… - null - false - false - true - true
                        // 12 Rect(42, 252 - 147, 357) com.whatsapp:id/contactpicker_row_photo android.widget.ImageView -  - deniz özkök - false - false - true - true


                    }
                    else if( contact_num > 2 ){
                        //  随机选择发送对象
                        let scroll_num = contact_num ? parseInt( contact_num/10 )*2 : 5
                        scroll_num = random( 0, scroll_num )
                        for (let index = 0; index < scroll_num; index++) {
                            if( !id("com.whatsapp:id/contactpicker_row_name").findOne(1) || (text("Invite friends").findOne(1) && text("New contact").findOne(1)) ){
                                break
                            }else if( text("Invite friends").findOne(1) ){
                                swipeDownSlowly()
                            }else{
                                swipeUpSlowly()
                            }
                            randomSleep(1000)
                        }
                        let name_list = id("com.whatsapp:id/contactpicker_row_photo").descMatches(/.+/).clickable().find()
                        let temp_contact = name_list[random(0,name_list.length-1)]
                        if( clickIfWidgetClickable( temp_contact ) ){
                            log( "选择发送对象: " + temp_contact.desc() )
                            id("com.whatsapp:id/quick_contact_divider").visibleToUser().findOne(5000)
                            // message = messageList[msg_count--]
                            // message = messageList[msg_idx++]
                            // log( "消息内容: " + msg_content )
                        }
                        else if( contact_num > 0 ){
                            reportLog( "未识别到联系人 - " + contact_num )
                            back()
                        }
                        else{ throw "联系人列表为空" }
                    }
                    else{
                        reportLog( "联系人太少, 不随机群发" )
                        throw "联系人太少, 不随机群发"
                    }
                }
                // else if( id("com.whatsapp:id/thumbnail").visibleToUser().findOne(1) ){  
                    
                // }
                // else if( id("com.whatsapp:id/media_section").visibleToUser().findOne(1) ){  
                    
                // }
                // else if( clickIfWidgetClickable( id("com.whatsapp:id/submit").text("CONTINUE").findOne(1) || id("com.android.packageinstaller:id/permission_allow_button").text("ALLOW").findOne(1) ) ){
                else if( clickIfWidgetClickable( id("com.whatsapp:id/submit").text("CONTINUE").findOne(1) || text("ALLOW").findOne(1) ) ){
                    log("获取权限")
                    randomSleep( 5000 )
                }
                else if( targetApp.isOtherPage() ){ sleep(3000) }
                else{
                    back()
                    toastLog("unknown page")
                    sleep(3000)
                }
                sleep(1000)
            }
        },false,1000*60*2)
    } catch (error) {
        reportLog( "群发消息: " + commonFunc.objectToString(error)  )
        throw error
    }
}
/**
 * 强制返回到应用首页
 * @param {Number} loop_count 循环检测次数
 * @returns 
 */
targetApp.doForceToHomePage = function( account, timeout, loop_count ){    
    if( !app.getAppName(targetApp.bid) ){ throw "应用未安装: "+targetApp.bid }
    let app_enable = parseInt( context.getPackageManager().getApplicationEnabledSetting( targetApp.bid ) )
    if( app_enable > 1 ){ throw "应用状态: " + app_enable + " - " + targetApp.bid  }    
        // shell("pm enable --user "+ commonFunc.userId +" "+targetApp.bid)

    try {
        let PIN_code = account ? account.password : null
        timeout = typeof(timeout) == "number" ? timeout : 1000*60*2
        loop_count = typeof(loop_count) == "number" ? loop_count : 2

        for (let idx_loop = 0; idx_loop < loop_count; idx_loop++) {
            try {
                return newThread(()=>{
                    while(true){
                        if( id(targetApp.bid+":id/tab").text("STATUS").findOne(3000) ){
                        // else if( id(targetApp.bid+":id/tab").text("CHATS").selected().findOne(3000) ){
                            sleep(5000)
                            if( id(targetApp.bid+":id/tab").text("STATUS").findOne(3000) ){
                                toastLog("识别到应用首页")
                                return true
                            }
                            back()
                        }
                        else if( !packageName(targetApp.bid).findOne(1) ){
                            launch(targetApp.bid)
                            sleep(3000)
                        }
                        else if( textStartsWith("Enter your two-step").findOne(1) ){
                            randomSleep()
                            if( new RegExp( /^\d\d\d\d\d\d$/ ).test(PIN_code) ){
                                reportLog( "输入 PIN: " + PIN_code + " - " + input( PIN_code ) )
                                randomSleep(3000); 
                                id(targetApp.bid+":id/tab").text("STATUS").findOne(3000);                 
                                if( text("Incorrect PIN. Try again.").findOne(1000) ){ throw "PIN 码错误: " + PIN_code }
                            }else { throw "PIN 码异常: " + PIN_code }
                        }
                        else if( idContains("eula_accept").findOne(1) || idContains("verify_sms_code_input").findOne(1) ){ throw "账号未登录" }
                        else if (  idContains("message").textContains( "no longer registered" ).findOne(1)){ throw "账号掉线或被禁" }
                        else if( targetApp.isOtherPage() ){}
                        else{ back(); sleep(2000) }
                        sleep(1000)
                    }
                },false,timeout,()=>{ throw "超时退出" })                            
            } catch (error) {
                if( idx_loop+1 == loop_count ){ throw error }
            }
            //  重启应用
            // try { log( shell( "am force-stop --user "+ commonFunc.userId +" "+targetApp.bid ) ) } catch (error) { } 
            try { log( shell( "am force-stop "+targetApp.bid ) ) } catch (error) { } 
        }
    } catch (error) { throw "首页识别异常: " + commonFunc.objectToString(error) }
    return false
}
/**
 * 
 * @param {*} account 
 * @param {*} timeout 
 * @returns 
 */
targetApp.doLoginWithPIN = function( account, timeout ){
    log("PIN 状态检查")
    timeout = timeout != null ? timeout : 60
    let PIN_code = account ? account.password : null
    return newThread(function(){        
        while( true ){
            if( !packageName(targetApp.bid).findOne(1) ){
                launch(targetApp.bid)
                sleep(6000)
            }
            else if( id(targetApp.bid+":id/tab").text("STATUS").findOne(3000) ){
            // else if( id(targetApp.bid+":id/tab").text("CHATS").selected().findOne(3000) ){
                sleep(3000)
                if( id(targetApp.bid+":id/tab").text("STATUS").findOne(3000) ){
                    return true
                }
            }
            else if( textStartsWith("Enter your two-step").findOne(1) ){
                randomSleep()
                if( !new RegExp( /^\d\d\d\d\d\d$/ ).test(PIN_code) ){
                    throw "PIN 码异常: " + PIN_code
                }
                // setText( PIN_code ); 
                reportLog( "输入 PIN: " + PIN_code + " - " + input( PIN_code ) )
                randomSleep(3000); 
                id(targetApp.bid+":id/tab").text("STATUS").findOne(3000);                 
                if( text("Incorrect PIN. Try again.").findOne(1000) ){ throw "PIN 码错误: " + PIN_code }
            }
            else if( idContains("eula_accept").findOne(1) || idContains("verify_sms_code_input").findOne(1) ){
                return false
            }
            else if (  idContains("message").textContains( "no longer registered" ).findOne(1)){
                return false
            }
            else{
                back()
                randomSleep(3000)
            }
        }        
    }, false,1000*timeout,()=>{})
}
/**
 * 
 * @param {*} unregister_data 
 * @returns 
 */
targetApp.doRegister = function( unregister_data ){
    let account     = unregister_data
    let frontapp_thread = null
    try {
        reportLog( "开始注册" )        
        let dialCode    = null
        let phoneNumber = null
        let verifyType  = null  //  1-napi; 2-globalsms; 3-
        let smsurl      = null
        let username    = null
        let PIN         = null
        let new_PIN     = null
        let category    = null
        let user_agent  = commonFunc.getRandomUA() 
        try {
            // account     = unregister_data
            dialCode    = account.dialCode
            phoneNumber = account.phone
            smsurl      = account.smsurl
            verifyType  = account.verifyType
            category    = account.category
            // new_PIN     = paramObj.PIN
            log( "手机号码: +" + dialCode + " " + phoneNumber )
        } catch (error) {
            throw error
        }
        // if( !new_website ){ throw "参数异常: " + JSON.stringify( new_website ) }
        //  商业分类, 普通版可忽略
        let categories = [
            "Automotive Service",
            "Apparel & Clothing",
            "Arts & Entertainment",
            "Beauty, Cosmetic & Personal Care",
            "Education",
            "Event Planner",
            "Finance",
            "Grocery Store",
            "Hotel",
            "Medical & Health",
            "Nonprofit Organization",
            "Restaurant",
            "Shopping & Retail",
            "Travel & Transportation"
        ]
        // if( categories.indexOf(category) < 0 ){ throw "商业分类异常: " + JSON.stringify( category ) }
        if( !category || categories.indexOf(category) < 0 ){ category = categories[random(0,categories.length-1)] }

        let verifyCode = null
        let lastCode = null
        try {
            //  获取上一次的验证码, 以在后续获取时过滤掉, 主要用于 globalsms.io 接码
            
            let msg = ""
            let res = http.get( smsurl, { headers: {  'User-Agent': user_agent  } })
            if( smsurl.match( /.*napi.*/ ) ){
                msg = res.body.json().message
            }
            else if( smsurl.match( /.*globalsms.*/ ) ){
                msg = res.body.string()
            }
            else if( smsurl.match( /.*chothuesimcode.*/ ) ){
                msg = res.body.json()
                if( msg.Result ){
                    lastCode = msg.Result.Code
                    return lastCode
                }
            }

            log( "  接码测试: " + msg )
            if( msg.match(/whatsapp/i) ){
                if( new RegExp(/.*\d\d\d-\d\d\d.*/ ).test( msg ) ){
                    lastCode = msg.match( /(\d\d\d-\d\d\d)/ )[1].replace( "-", "" ).trim()
                }else if( new RegExp(/.*\d\d\d\d\d\d.*/ ).test( msg ) ){
                    lastCode = msg.match( /(\d\d\d\d\d\d)/ )[1].trim()
                }
                log( "屏蔽旧的验证码: " + lastCode )
                return lastCode
            }else if( msg.match(/We blocked access to/) ){
                account.desc = "接码测试异常 We blocked access to" 
            }
        } catch (error) { reportLog( "  接码测试异常: " + commonFunc.objectToString(error) ) }
        if( account.desc == "接码测试异常 We blocked access to"  ) { throw account.desc }
        // account.isSuccess = true
        // return account

        //  测试接码网络
        for (let index = 0; index < 15; index++) {            
            try {   
                let res = http.get( smsurl, { headers: {  'User-Agent': user_agent  } })
                res = res.body.string()
                toast("接码测试: " + res)
                if( res.match(/success/) ){ break  }
                throw res
            } catch (error) { 
                let err_msg = "globalsms 访问异常: " + commonFunc.objectToString(error)                 
                if( err_msg.match(/We blocked access to/) || err_msg.match(/DOCTYPE html/) ){ throw "globalsms 限制访问" }
                if( index > 10 ){ throw err_msg }
            }
            sleep(10000)
        }

        newThread(()=>{

            launch( targetApp.bid )
            sleep(3000)
            frontapp_thread = targetApp.keepFrontAppThread()
            // sleep(3000)
            launch( targetApp.bid )
            sleep(3000)

            // if( clickIfWidgetClickable( idContains("eula_accept").findOne(3000) ) ){
            //     randomSleep()
            // }
            // if( clickIfWidgetClickable( text("USE A DIFFERENT NUMBER").findOne(3000) ) ){
            //     randomSleep()
            // }

            // let cc_btn = idContains("registration_cc").findOne(3000)
            // if( cc_btn ){
            //     reportLog( "输入区号: " + dialCode )
            //     cc_btn.setText(dialCode)
            //     // reportLog( shell( "input text " + dialCode ) )
            //     randomSleep(1000)
            // }else{
            //     reportLog( "输入区号异常 " + dialCode )
            // }
            // let phone_btn = idContains("registration_phone").findOne(1000)
            // if( phone_btn ){
            //     reportLog( "输入号码: " + phoneNumber )
            //     phone_btn.setText(phoneNumber)
            //     // reportLog( shell( "input text " + phoneNumber ) )
            //     randomSleep(2000)
            // }else{
            //     reportLog( "输入号码异常 " + phoneNumber )
            // }
            // if( clickIfWidgetClickable( idContains("registration_submit").findOne(1000) ) ){
            //     log( "提交号码 " )
            //     randomSleep(3000)
            //     account.isUsed = true
            // }

            
            for (let index = 0; index < 10; index++) {
                if( clickIfWidgetClickable( idContains("eula_accept").visibleToUser().findOne(1) ) ){
                    randomSleep()
                }
                if( clickIfWidgetClickable( text("USE A DIFFERENT NUMBER").visibleToUser().findOne(1) ) ){
                    randomSleep()
                }

                let banned_btn = textContains("is banned").findOne(5000) || textContains("We couldn't send").findOne(1) || textContains("is not a valid").findOne(1) || textContains("data network is required").findOne(1)
                if( banned_btn ){
                    reportLog("注册过程异常: " + banned_btn.text())
                    account.desc = "注册过程异常: " + banned_btn.text()
                    // return false
                    // break
                    throw account.desc
                }
                else if( idContains("registration_cc").visibleToUser().findOne(1) ){
                    let cc_btn = idContains("registration_cc").findOne(3000)
                    if( cc_btn ){
                        reportLog( "输入区号: " + dialCode )
                        cc_btn.setText(dialCode)
                        // reportLog( shell( "input text " + dialCode ) )
                        randomSleep(1000)
                    }else{
                        reportLog( "输入区号异常 " + dialCode )
                    }
                    let phone_btn = idContains("registration_phone").findOne(1000)
                    if( phone_btn ){
                        reportLog( "输入号码: " + phoneNumber )
                        phone_btn.setText(phoneNumber)
                        // reportLog( shell( "input text " + phoneNumber ) )
                        randomSleep(2000)
                    }else{
                        reportLog( "输入号码异常 " + phoneNumber )
                    }
                    if( clickIfWidgetClickable( idContains("registration_submit").findOne(1000) ) ){
                        log( "提交号码 " )
                        randomSleep(3000)
                        account.isUsed = true
                    }
                    if( clickIfWidgetClickable( text("OK").clickable().findOne(1) ) ){
                        reportLog("点击发送验证码")
                        sleep(2000)
                        text("NOT NOW").clickable().findOne(3000)
                    }
                }
                else if( clickIfWidgetClickable( text("OK").clickable().findOne(1) ) ){
                    reportLog("点击发送验证码")
                    sleep(2000)
                    text("NOT NOW").clickable().findOne(3000)
                }
                else if( clickIfWidgetClickable( text("NOT NOW").clickable().findOne(1) ) ){
                    log("点击 NOT NOW")
                    sleep(5000)
                }
                else if( clickIfWidgetClickable( idContains("registration_submit").findOne(1000) ) ){
                    sleep(3000)
                    text("OK").clickable().findOne(3000)
                    account.isUsed = true
                }                
                else if( idContains("verify_sms_code_input").findOne(1000) ){
                    
                    //  轮询查收验证码
                    reportLog("开始查收验证码: " + smsurl )                
                    for (let idx_sms_loop = 1; idx_sms_loop < 10; idx_sms_loop++) {
                        let banned_message = textStartsWith("Can't send an SMS").findOne(1)
                        if( banned_message ){
                            // account.desc = banned_message.text().replace(/[\r\n\s]/g, " ")
                            account.desc = banned_message.text()
                            reportLog("访问频繁 " + account.desc )
                            break
                        }
                        try {
                            // verifyCode = newThread(function(){
                            newThread(function(){
                                let msg = ""
                                let res = http.get( smsurl, {
                                    headers: {
                                        'User-Agent': user_agent
                                    }
                                } )
                                if( smsurl.match( /.*napi.*/ ) ){
                                    //  {"flag":false,"data":[],"message":"No has message"}
                                    //  {"flag":true,"data":[],"message":"Your WhatsApp code: 412-230 You can also tap on this link to verify your phone: v.whatsapp.com/412230 Don't share this code with others"}
                                    msg = res.body.json().message
                                }
                                else if( smsurl.match( /.*globalsms.*/ ) || smsurl.match( /.*ma37.com.*/ ) ){
                                    //  {"error_type": "not_found_error", "success": false}
                                    //  Your WhatsApp code: 926-696\n\nYou can also tap on this link to verify your phone: v.whatsapp.com/926696\n\nDon't share this code with others
                                    msg = res.body.string()
                                }
                                else if( smsurl.match( /.*chothuesimcode.*/ ) ){
                                    msg = res.body.json()
                                    if( msg.Result ){
                                        verifyCode = msg.Result.Code
                                        return verifyCode
                                    }
                                }

                                log( "轮询查收-" + idx_sms_loop + " " + msg )
                                if( msg.match(/whatsapp/i) ){
                                    if( new RegExp(/.*\d\d\d-\d\d\d.*/ ).test( msg ) ){
                                        verifyCode = msg.match( /(\d\d\d-\d\d\d)/ )[1].replace( "-", "" ).trim()
                                    }else if( new RegExp(/.*\d\d\d\d\d\d.*/ ).test( msg ) ){
                                        verifyCode = msg.match( /(\d\d\d\d\d\d)/ )[1].trim()
                                    }else{
                                        account.desc = msg
                                    }
                                }
                                else if( idx_sms_loop == 9 ){ 
                                    account.desc = ( msg.match(/We blocked access to/) ? "We blocked access to" : msg )
                                    // throw "未获取到验证码 " + ( msg.match(/doctype html/) ? "<!doctype html>" : msg )
                                }
                            })
                        } catch (error) {
                            account.desc = commonFunc.objectToString(error)
                            log( "验证码获取异常 " + account.desc )
                            // reportLog( commonFunc.objectToString(error)  )
                        }
                        if( verifyCode && verifyCode != lastCode ){
                            account.desc = null
                            break   //    break from sms checking
                        }
                        sleep(10000)
                    }
                    if( !verifyCode ){ throw "未获取到验证码: " + account.desc }
                    break
                }
                else {
                    account.desc = "提交号码界面异常"
                }
            }
            reportLog( "获取的验证码: " + verifyCode )
            if( verifyCode ){            
                for (let index = 0; index < 3; index++) {
                    let vc_btn = idContains("verify_sms_code_input").findOne(1000)
                    if( vc_btn ){
                        vc_btn.setText( verifyCode )
                        // shell( "input text " + verifyCode )
                        randomSleep(3000)
                        idContains("registration_name").findOne(3000)
                        break
                    }else{
                        back()
                        sleep(3000)
                        launch(targetApp.bid)
                    }
                }
                //  
                for (let index = 0; index < 10; index++) {
                    if( !packageName(targetApp.bid).findOne(1) ){
                        break
                    }
                    let banned_btn = idContains("message").textContains( "no longer" ).findOne(3000) || textContains("account is protected").findOne(1)
                    if ( banned_btn ){
                        account.desc = banned_btn.text()
                        reportLog( "号码被锁 " + account.desc )
                        break
                    }
                    else if( idContains("categoryedit_bottom_container_results").visibleToUser().findOne(1) ){
                        setText(category)
                        randomSleep(3000)
                        clickIfWidgetExists( id(targetApp.bid+":id/category_listitem_text").text(category).findOne(3000) )
                    }
                    else if( idContains("registration_name").visibleToUser().findOne(1) ){
                        //  商业账号类型设置
                        if( !idContains("form_field_main_label").text(category).findOne(3000) && clickIfWidgetExists( idContains("form_field_main_label").findOne(1000) ) && randomSleep(3000) ){ continue }
                        try { account.category = idContains("form_field_main_label").findOne(1000).text() } catch (error) { }

                        let name = phoneNumber
                        try {
                            let user_info = httpUtilFunc.randomUserInfo()
                            name = user_info.name || name
                        } catch (error) { }
        
                        setText( name ) 
                        // shell( "input text " + name )
                        account.username = name
                        reportLog( "输入名字: " + name )
                        randomSleep(2000)
                        if( clickIfWidgetClickable( idContains("register_name_accept").findOne(3000) ) ){
                            randomSleep(3000)
                        }   
                    }
                    else  if( targetApp.isOtherPage() ){

                    }
                    else if( clickIfWidgetClickable( text("USE").clickable().findOne(1) ) ){
                        log("点击 NOT NOW")
                        sleep(3000)
                    }
                    else if( clickIfWidgetClickable( text("NOT NOW").clickable().findOne(1) ) ){
                        log("点击 NOT NOW")
                        sleep(3000)
                    }
                    else if( idContains("tab").text("STATUS").findOne(1) ){
                        toastLog("已登录")
                        sleep(3000)
                        break
                    }
                    else if( textStartsWith("Initiali").visibleToUser().findOne(1) ){
                        toastLog("Initializing")
                        sleep(500)
                    }
                    else{
                        toastLog("等待检测中")
                    }
                    sleep(3000)
                }

                //  完成注册
                if( targetApp.getLoginStatus( 1000*60 ) == 1 ){
                    account.isSuccess = true
                    return account
                }else{
                    let banned_btn = idContains("message").textContains( "no longer" ).findOne(1000)
                    //  完成注册
                    account.desc = banned_btn ? banned_btn.text() : account.desc
                }            
            }
            else { throw account.desc || "界面异常" }
        },account, 1000*60*10, ()=>{ throw "超时退出" } )        
    } catch (error) {
        reportLog( "注册过程异常 " + commonFunc.objectToString(error)  )
        account.desc = commonFunc.objectToString(error) 
    }
    try { frontapp_thread.interrupt(); log("前台应用守护进程已关闭") } catch (error) {  }
    // account.isSuccess = false
    // account.desc = account.desc != null ? account.desc : "其他异常情况"
    reportLog( "注册结束" )
    return account
}
targetApp.doUpdatePhoto = function( account, new_photo ){
    try {
        // let new_photo = null
        // let save_photo = null

        let is_photo_set = false
        let max_timeout = 1000*60*2
        return newThread( ()=>{
            while( true ){
                // if( !packageName(targetApp.bid).findOne(1000) ){
                //     launch(targetApp.bid)
                //     sleep(3000)
                // }
                if( clickIfWidgetClickable( desc("More options").clickable().visibleToUser().findOne(2000) ) ){  }
                else if( clickIfWidgetExists( id(targetApp.bid+":id/title").text("Settings").visibleToUser().findOne(1) ) ){  }                
                else if( clickIfWidgetClickable( id(targetApp.bid+":id/profile_info").clickable().visibleToUser().findOne(1) ) ){  }                
                else if( id(targetApp.bid+":id/profile_info_name_card").visibleToUser().findOne(1) ){
                    if( !is_photo_set ){
                        //  1. 下载图片
                        try {                            
                            httpUtilFunc.downloadFile( new_photo, "/sdcard/DCIM/whatsapp/photo.png",null, true )
                        } catch (error) { throw error }
                        

                        //  2. 更新图片
                        clickIfWidgetClickable( id(targetApp.bid+":id/change_photo_btn").clickable().visibleToUser().findOne(1000) ) && randomSleep(3000)
                        clickIfWidgetClickable( text("ALLOW").visibleToUser().findOne(1) ) && randomSleep(3000) 
                        clickIfParentsClickable( id(targetApp.bid+":id/name").text("Gallery").visibleToUser().findOne(1000) ) && randomSleep(3000)
                        clickIfWidgetClickable( text("ALLOW").visibleToUser().findOne(1) ) && randomSleep(3000) 
                        clickIfParentsClickable( id(targetApp.bid+":id/thumbnail").visibleToUser().findOne(1000) ) && randomSleep(3000) 

                        // 
                        let t_thread = threads.start(function(){
                            events.observeToast();
                            events.onToast(function(toast){
                                let t_msg = toast.getText()
                                log("监听到 Toast 事件: " + t_msg );
                                if( t_msg.match("photo updated") ){
                                    is_photo_set = true
                                }else if( t_msg.match("Failed to update") ){
                                    is_photo_set = false
                                }
                                // is_photo_set = t_msg == "Profile photo updated" ? true : is_photo_set
                                t_thread.interrupt()
                            });
                        })                       

                        // id(targetApp.bid+":id/media_section").visibleToUser().findOne(1000) && clickIfWidgetClickable( className("android.widget.ImageView").desc("Photo").visibleToUser().findOne(1) ) && randomSleep(3000) 
                        clickIfWidgetClickable( className("android.widget.ImageView").desc("Photo").visibleToUser().findOne(1000) ) && randomSleep(3000) 
                        if( clickIfWidgetClickable( id(targetApp.bid+":id/ok_btn").text("DONE").visibleToUser().findOne(3000) ) ){
                            for (let index = 0; index < 12; index++) {
                                if( is_photo_set ){ 
                                    // back()
                                    // back()                                    
                                    break 
                                }
                                sleep(6000)
                            }
                            // is_photo_set = true

                            randomSleep(3000)
                        }
                        try { t_thread.interrupt() } catch (error) { } 
                    }
                    else{                        
                        back()
                        return true
                    }
                }
                else if(targetApp.isOtherPage()){}
                else if( !packageName(targetApp.bid).findOne(1) ){
                    toastLog("启动应用中...")
                    launch( targetApp.bid )
                    randomSleep( 3000 )
                } 
                else{
                    back()
                    toastLog("unknow page")
                    randomSleep(3000)
                }
                randomSleep(2000)
            }
        },false,max_timeout,()=>{ throw "超时退出" } )
    } catch (error) {
        throw error
    }
}
/**
 * 
 * @param {*} account 
 * @param {*} new_PIN 
 * @returns 
 */
targetApp.doSetupPIN = function( account, new_PIN ){    
    try {
        if( !new RegExp(/\d\d\d\d\d\d/).test( new_PIN ) ){ throw "PIN 格式错误: " + new_PIN }
        reportLog( "开始设置 PIN: " + new_PIN )
        if( !packageName(targetApp.bid).findOne(1000) ){
            launch(targetApp.bid)
            sleep(6000)
        }
        return newThread( ()=>{
            let is_PIN_set = false
            while( true ){
                if( !packageName(targetApp.bid).findOne(1000) ){
                    launch(targetApp.bid)
                    sleep(3000)
                }
                if( clickIfWidgetClickable( desc("More options").clickable().findOne(1) ) ){  }
                else if( clickIfWidgetExists( id(targetApp.bid+":id/title").text("Settings").findOne(1) ) ){  }
                else if( clickIfWidgetClickable( id(targetApp.bid+":id/settings_account_info").clickable().findOne(1) ) ){  }
                else if( clickIfWidgetClickable( id(targetApp.bid+":id/two_step_verification_preference").clickable().findOne(1) ) ){
                    // findOne(6000)
                }
                else if( id(targetApp.bid+":id/description").textStartsWith("Two-step verification is enabled").findOne(1000) ){ 
                    reportLog( "设置成功: " + new_PIN )
                    return true 
                }
                else if( id(targetApp.bid+":id/description").textStartsWith("For added security, enable two-step verification").findOne(1) && clickIfWidgetClickable( id(targetApp.bid+":id/enable_button").text("ENABLE").clickable().findOne(1) ) ){  }
                else if( id(targetApp.bid+":id/code_info").findOne(1000) ){ 
                    setText( new_PIN ) 
                    reportLog( "输入 PIN: " + new_PIN )
                    randomSleep(3000)
                }
                else if( id(targetApp.bid+":id/description").textStartsWith("Add an email address to your account").findOne(1) && clickIfWidgetClickable( desc("Skip").clickable().findOne(1) ) ){  
                    if( id("android:id/message").findOne(3000) && clickIfWidgetClickable( desc("OK").clickable().findOne(1) ) ){  }
                    randomSleep(5000)
                }
                // else if( id(targetApp.bid+":id/description").findOne(1) && clickIfWidgetClickable( desc("OK").clickable().findOne(1) ) ){  }
                // else if( textStartsWith("Couldn't set PIN.").findOne(1) && clickIfWidgetClickable( desc("OK").clickable().findOne(1) ) ){  
                //     for (let index = 0; index < 5; index++) {
                //         back()
                //         randomSleep(500)                        
                //     }
                // }                
                // else if( id("android:id/message").findOne(1) && clickIfWidgetClickable( desc("OK").clickable().findOne(1) ) ){  }
                else if( clickIfWidgetClickable( text("DONE").clickable().findOne(1) ) ){  }
                else if( textStartsWith("Enter your two-step").findOne(1) ){  }
                else if( targetApp.isOtherPage() ){}
                else{
                    toastLog("unknown page")
                    back()
                    sleep(3000)

                }
                randomSleep(2000)
            }
        },false, 1000*60*3, ()=>{ throw "超时退出" } )
    } catch (error) {
        throw error
    }
}
targetApp.init()
module.exports = targetApp;