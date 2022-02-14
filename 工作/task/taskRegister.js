let taskDemo = {}
let taskPluginData = null
const targetApp = require("../app/whatsapp.js");
const httpUtilFunc = require("../network/httpUtil.js");
const commonFunc = require("../common/common.js");
const proxySttings = require("../network/proxySttings.js");

const { reportLog, isUrlAccessable, getIpInfo, getLocalIp } = require("../network/httpUtil.js");
const { newThread, randomSleep, clickIfWidgetClickable, clickIfWidgetExists, clearData, taskResultSet } = require("../common/common.js");


taskDemo.init = function(){
    log( "init taskRegister" )
    taskDemo.result = 0
    taskDemo.desc = ""
}
taskDemo.init()

taskDemo.runTask = function(){
    new function (){
        try {
            // if( !app.getAppName(targetApp.bid) || commonFunc.getAppVersionName(targetApp.bid) != targetApp.requireVersion ){
            //     // if( !httpUtilFunc.downloadFile( taskPluginData.appLink, "/storage/emulated/obb/apks/"+taskPluginData.appName, 1000*60*5, false ) || !commonFunc.installApk( "/storage/emulated/obb/apks/"+taskPluginData.appName, 1000*60*3 ) ) { 
            //         throw "未安装或版本不匹配: " + targetApp.bid + " " + commonFunc.getAppVersionName(targetApp.bid) +"->"+ targetApp.requireVersion
            //     // }
            // }
            // log(targetApp.getLoginStatus())
            // log(targetApp.doSetupPIN({},"123500"))
            // log(targetApp.doLoginWithPIN({"password":"123500"}))
            //  调试
            // commonFunc.clearData( targetApp.bid )
                                        // sleep(1000)
            // // let unreg_data = {"appName":"whatsappbusiness","type":1,"username":null,"password":null,"email":null,"emailPassword":null,"phone":"3024716774","smsurl":"https://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=4d8cfc70-4ec6-4651-91bc-d48ef14f9981","isRegistered":false,"isProcess":true,"extra":null,"dialCode":"1","city":null,"country":null,"countryCode":"US","createTime":"2021-09-17T02:39:31.503Z","phoneProvider":"globalsms","emailProvider":null,"proxy":null,"proxyProvider":null,"tag":"20210917001","updateTime":"2021-09-29T04:05:40.591Z"}
            // let unreg_data = {"appName":"whatsappbusiness","type":1,"username":null,"password":null,"email":null,"emailPassword":null,"phone":"8458171073","smsurl":"https://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=f4e2692b-b4cf-44b2-b5a4-372f0b4c6a2a","isRegistered":false,"isProcess":true,"extra":null,"dialCode":"1","city":null,"country":null,"countryCode":"US","createTime":"2021-09-17T02:39:31.503Z","phoneProvider":"globalsms","emailProvider":null,"proxy":null,"proxyProvider":null,"tag":"20210917001","updateTime":"2021-09-29T04:05:40.591Z"}
            // let unreg_data = {"appName":"whatsapp","type":1,"username":null,"password":null,"email":null,"emailPassword":null,"phone":"4582285797","smsurl":"https://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=7cea505c-8bc1-4e2a-a3c4-873ec0995963","isRegistered":false,"isProcess":true,"extra":null,"dialCode":"1","city":null,"country":null,"countryCode":"US","createTime":"2021-09-17T02:39:31.503Z","phoneProvider":"globalsms","emailProvider":null,"proxy":null,"proxyProvider":null,"tag":"20210917001","updateTime":"2021-09-29T04:05:40.591Z"}
            // targetApp.doRegister(unreg_data)
            
        } catch (error) {
            log( commonFunc.objectToString(error) )
        }
        // exit()

        try {
            let timestamp = new Date().getTime()
            try {   //  初始化测试
                if( !commonFunc.server ){ throw "未连接到群控后台" }

                //  初始化网络测试                
                if( !httpUtilFunc.getGlobalIp() && !commonFunc.uninstallApp("fun.kitsunebi.kitsunebi4android") ){ reportLog("设备环境异常") }
                randomSleep(3000)

                //  业务后台连接检测
                if( !httpUtilFunc.testTaskServer() ){ throw "业务后台连接异常" }
            } catch (error) { httpUtilFunc.taskStop(null,error); throw error }

            try {   //  获取插件配置
                taskPluginData = httpUtilFunc.getPluginData()
                if(taskPluginData){

                    taskPluginData.systemLanguage = taskPluginData.systemLanguage == "default" ? null : taskPluginData.systemLanguage
					taskPluginData.systemTimezone = taskPluginData.systemTimezone == "default" ? null : taskPluginData.systemTimezone

					taskPluginData.forceRegister = taskPluginData.forceRegister == "on" ? true : false
					taskPluginData.autoExtract = taskPluginData.autoExtract == "on" ? true : false
					// taskPluginData.autoBind = taskPluginData.autoBind == "on" ? true : false

					//	如果不提取账号, 自动绑定分区
					// taskPluginData.autoBind = taskPluginData.autoExtract == false ? true : taskPluginData.autoBind

					//	如果是普通环境, 且不提取, 自动绑定分区
					// taskPluginData.autoBind = taskPluginData.machineType == "normal" && !taskPluginData.autoExtract ? true : taskPluginData.autoBind
					taskPluginData.autoBind = taskPluginData.machineType == "normal" && !taskPluginData.autoExtract ? true : false

					//	如果是注册机模式, 强制注册
					taskPluginData.forceRegister = taskPluginData.machineType == "normal" ? taskPluginData.forceRegister : true


					taskPluginData.proxyProvider = taskPluginData.proxyProvider != "none" ? taskPluginData.proxyProvider : null
					// taskPluginData.customProxy = taskPluginData.proxyProvider == "custom" ? taskPluginData.customProxy : null
					// taskPluginData.customPhone = taskPluginData.phoneProvider == "custom" ? taskPluginData.customPhone : null
                    taskPluginData.proxyCountry = taskPluginData.proxyCountry
                    taskPluginData.proxyTag = taskPluginData.proxyTag
                    taskPluginData.proxyThreadTimeout = taskPluginData.proxyThreadTimeout ? parseInt(taskPluginData.proxyThreadTimeout) : 60

                    if( taskPluginData.phoneProvider == "custom" ){
                        taskPluginData.phoneProvider    = taskPluginData.customPhone
                    }
                    taskPluginData.phoneTag         = taskPluginData.phoneTag
                    taskPluginData.maxFails         = taskPluginData.maxFails ? parseInt( taskPluginData.maxFails ) : 1
                    taskPluginData.maxtTimeout      = taskPluginData.maxtTimeout ? 1000*60*parseInt( taskPluginData.maxtTimeout ) : 1000*60*15

                    

					// taskPluginData.updateName = taskPluginData.updateName == "on" ? true : false
					// taskPluginData.updateUsername = taskPluginData.updateUsername == "on" ? true : false
					// taskPluginData.updateBio = taskPluginData.updateBio == "on" ? true : false
					taskPluginData.updatePhoto = taskPluginData.updatePhoto == "on" ? true : false
					// taskPluginData.updateProfile = taskPluginData.updateName || taskPluginData.updateUsername || taskPluginData.updateBio || taskPluginData.updatePhoto
					taskPluginData.updateProfile = taskPluginData.updatePhoto
					taskPluginData.profileTag = taskPluginData.profileTag

                    taskPluginData.material_user_id = taskPluginData.material_user_id
                    taskPluginData.material_user_secret = taskPluginData.material_user_secret
                    
                    taskPluginData.used_times_model = taskPluginData.used_times_model || "lte"
                    taskPluginData.used_times = taskPluginData.used_times ? parseInt(taskPluginData.used_times) : 0


					taskPluginData.setupPIN = taskPluginData.setupPIN == "on" ? true : false


                    // if( taskPluginData.phoneProvider == "api" ){
                    //     taskPluginData.phoneApi
                    //     taskPluginData.smsApi
                    //     taskPluginData.releaseApi
                    // }
                }
                reportLog( "  插件配置: " + JSON.stringify( taskPluginData ) )
                log( "" )
            } catch (error) {
                log( "  插件配置 获取失败 " + commonFunc.objectToString(error) )
                throw "插件配置 获取失败 " + commonFunc.objectToString(error)
            }
            
            try {   //  语言和应用检测
                taskPluginData.systemLanguage = "en-US"
                if( taskPluginData.systemLanguage ){
                    reportLog( "检测系统语言: " + commonFunc.systemLanguageGet() )
                    commonFunc.systemLanguageSet( taskPluginData.systemLanguage )
                    sleep(3000)
                    if( taskPluginData.systemLanguage != commonFunc.systemLanguageGet() ){
                        throw "系统语言错误"                        
                    }
                }
                reportLog( "当前系统语言: " + commonFunc.systemLanguageGet() )

                
                taskPluginData.systemTimezone = "America/Los_Angeles"
                if( taskPluginData.systemTimezone ){
                    reportLog( "检测系统时区: " + commonFunc.systemTimezoneGet() )
                    commonFunc.systemTimezoneSet( taskPluginData.systemTimezone )
                    sleep(3000)
                    if( taskPluginData.systemTimezone != commonFunc.systemTimezoneGet() ){
                        throw "系统时区错误"                        
                    }
                }
                reportLog( "当前系统时区: " + commonFunc.systemTimezoneGet() )   
            } catch (error) { throw error }

            // if( !app.getAppName(targetApp.bid) ){
            if( !app.getAppName(targetApp.bid) || commonFunc.getAppVersionName(targetApp.bid) != targetApp.requireVersion ){
                taskPluginData.forceRegister = true                
                if( !httpUtilFunc.downloadFile( taskPluginData.appLink, "/storage/emulated/obb/apks/"+taskPluginData.appName, 1000*60*5, false ) || !commonFunc.installApk( "/storage/emulated/obb/apks/"+taskPluginData.appName, 1000*60*3 ) ) { 
                    // throw "未安装 " + targetApp.bid
                }
            }
            if( !app.getAppName(targetApp.bid) || commonFunc.getAppVersionName(targetApp.bid) != targetApp.requireVersion ){
                if( !httpUtilFunc.downloadFile( taskPluginData.appLink, "/storage/emulated/obb/apks/"+taskPluginData.appName, 1000*60*5, false ) || !commonFunc.installApk( "/storage/emulated/obb/apks/"+taskPluginData.appName, 1000*60*3 ) ) { 
                    throw "应用未安装或版本不匹配: " + targetApp.bid + " " + commonFunc.getAppVersionName(targetApp.bid) +"->"+ targetApp.requireVersion
                }
            }
            
            
            //  执行任务
            try{
                //  本地网络
                let local_ip = httpUtilFunc.getLocalIp()
                let global_ip = null
                // log( "本地 IP: " + local_ip )

                //  检查当前分区是否已有账号绑定
                if( !taskPluginData.forceRegister ){
                    if( local_ip ){  
                        let bind_info = httpUtilFunc.getDeviceBindInfo( targetApp.appName )
                        if( bind_info && bind_info.accountId ){ taskDemo.desc = "取消注册, 该分区已有账号绑定"; return 0 }
                    }
                }
                
                let proxy_info = null  
                let ipInfo = {}
                if( taskPluginData.proxyProvider ){
                    let proxy_thread_timeout = taskPluginData.proxyThreadTimeout || 60
                    proxy_thread_timeout = parseInt( proxy_thread_timeout )
                    let is_proxy_on = false
                    // let proxy_ip = null
                    is_proxy_on = newThread(()=>{
                        let proxy_loop_max = taskPluginData.proxyProvider == "doveip" || taskPluginData.proxyProvider == "cloudam" ? 5 : 1
                        for (let proxy_loop = 0; proxy_loop < proxy_loop_max; proxy_loop++) {
                            // 检测网络是否通畅, 如果网络不通, 则卸载 代理软件
                            if( !httpUtilFunc.getGlobalIp() && !commonFunc.uninstallApp("fun.kitsunebi.kitsunebi4android") ){ reportLog("设备环境异常") }
                            
                            //  从代理库获取代理信息
                            try {
                                commonFunc.showLog("申请代理: " + taskPluginData.proxyProvider + " - " + taskPluginData.proxyTag + " - " + taskPluginData.proxyCountry)
                                // let proxy_data = httpUtilFunc.getProxyData( taskPluginData.proxyProvider, taskPluginData.proxyTag )  
                                // // proxy_info = taskPluginData.proxyProvider == "doveip" ? httpUtilFunc.getProxyFromDoveip( proxy_data.proxy, { "geo":taskPluginData.proxyCountry, "timeout":taskPluginData.maxFails*10+10 } )  : proxy_data.proxy 
                                // if( taskPluginData.proxyProvider == "doveip" ){
                                //     proxy_info = httpUtilFunc.getProxyFromDoveip( proxy_data.proxy, { "geo":taskPluginData.proxyCountry, "timeout":taskPluginData.maxFails*10+10 } )
                                // }
                                // else if( taskPluginData.proxyProvider == "cloudam" ){
                                //     proxy_info = httpUtilFunc.getProxyFromCloudam( proxy_data.proxy, { "regionid":taskPluginData.proxyCountry } )
                                // }
                                // else{
                                //     proxy_info = proxy_data.proxy
                                // }

                                let proxy_data = httpUtilFunc.getProxyData( taskPluginData.proxyProvider, taskPluginData.proxyTag )  
                                // proxy_info = taskPluginData.proxyProvider == "doveip" ? httpUtilFunc.getProxyFromDoveip( proxy_data.proxy, { "geo":taskPluginData.countryCode, "timeout":taskPluginData.maxFails*10+10 } )  : proxy_data.proxy 
                                if( taskPluginData.proxyProvider == "doveip" ){
                                    proxy_info = httpUtilFunc.getProxyFromDoveip( proxy_data.proxy, { "geo":taskPluginData.proxyCountry, "timeout":10 } )
                                }
                                else if( taskPluginData.proxyProvider == "cloudam" ){
                                    proxy_info = httpUtilFunc.getProxyFromCloudam( proxy_data.proxy, { "regionid":taskPluginData.proxyCountry } )
                                }
                                else if( taskPluginData.proxyProvider == "bytesfly" ){
                                    proxy_info = httpUtilFunc.getProxyFromBytesfly( "SOCKS5", 0, "whatsapp", 1, 0, taskPluginData.proxyCountry )
                                }
                                else{
                                    proxy_info = proxy_data.proxy
                                }


                                reportLog( "获取的代理信息: " + JSON.stringify( proxy_info ) )
                                // commonFunc.showLog("获取的代理信息: \n" + JSON.stringify( proxy_info ))
                            } catch (error) {
                                taskDemo.desc = commonFunc.objectToString(error)
                                reportLog(taskDemo.desc)
                                proxy_info = null
                                randomSleep(30000)
                                if( taskDemo.desc.match("IP list is empty") ){
                                    home()
                                    for (let index = 0; index < 18; index++) {
                                        commonFunc.showLog("IP list is empty\n代理配置: " + taskPluginData.proxyProvider + " - " + taskPluginData.proxyTag + " - " + taskPluginData.proxyCountry)
                                        sleep(10000)
                                        proxy_loop_max = proxy_loop_max+1
                                    }
                                }
                                else if( taskDemo.desc.match("no new ip for you") ){
                                    home()
                                    for (let index = 0; index < 18; index++) {
                                        commonFunc.showLog("no new ip for you\n代理配置: " + taskPluginData.proxyProvider + " - " + taskPluginData.proxyTag + " - " + taskPluginData.proxyCountry )
                                        sleep(10000)
                                        proxy_loop_max = proxy_loop_max+1
                                    }
                                }
                                else if( taskDemo.desc.match("无可用信息") ){
                                    home()
                                    for (let index = 0; index < 18; index++) {
                                        commonFunc.showLog("无可用代理信息\n代理配置: " + taskPluginData.proxyProvider + " - " + taskPluginData.proxyTag + " - " + taskPluginData.proxyCountry)
                                        sleep(10000)
                                        proxy_loop_max = proxy_loop_max+1
                                    }
                                }
                            }
                            if( !proxy_info ){ continue }
                            reportLog( "代理配置 " + JSON.stringify( proxy_info ) )
                            commonFunc.showLog("代理配置 " + JSON.stringify( proxy_info ))
                            // if( !proxySttings.kitsunebiInstall( "http://192.168.97.3:8012/upload/1fa5393d-49ba-49cd-b8db-ba246d0f7249.apk" ) ){ throw "未安装 " + "fun.kitsunebi.kitsunebi4android" }
                            // if( !proxySttings.kitsunebiInstall( "http://192.168.91.3:8012/upload/e3acddc3-4ce1-4286-8ad6-f2c0e8bac093.apk" ) ){ throw "未安装 " + "fun.kitsunebi.kitsunebi4android" }
                            if( !proxySttings.kitsunebiInstall( taskPluginData.proxyLink ) ){ throw "未安装 " + "fun.kitsunebi.kitsunebi4android" }
                            try {
                                is_proxy_on = proxySttings.kitsunebiSetup( proxy_info )
                                // reportLog( "代理连接结果: " + is_proxy_on )
                                taskDemo.desc = "代理连接结果: " + is_proxy_on
                                reportLog( taskDemo.desc )
                            } catch (error) {
                                if( proxy_loop+1 > proxy_loop_max ){ throw error }
                                taskDemo.desc = "代理连接异常: " + commonFunc.objectToString(error)
                                reportLog( taskDemo.desc )
                                randomSleep(10000)
                                continue
                            }
                            if( !is_proxy_on ){ continue }
                            randomSleep(3000)

                            //  3. 检测代理
                            global_ip = null
                            for (let index = 0; index < 3; index++) {
                                is_proxy_on = false
                                commonFunc.showLog( "代理IP检测: " + global_ip )
                                global_ip = httpUtilFunc.getGlobalIp()
                                reportLog( "检测IP: " + local_ip + " -> " + global_ip )
                                commonFunc.showLog( "代理IP检测: " + global_ip )
                                if( global_ip ){ is_proxy_on = true; break } 
                                taskDemo.desc = "代理已连接, 但IP检测失败 " + local_ip + " -> " + global_ip

                                try { 
                                    if( httpUtilFunc.isUrlAccessable( "https://www.whatsapp.com", "whatsapp" ) ){ is_proxy_on = true; break } else{ taskDemo.desc = "代理已连接,但 whatsapp 网站访问失败: " }
                                } catch (error) { taskDemo.desc = "代理已连接,但 whatsapp 网站访问失败: " + commonFunc.objectToString(error) }
                                randomSleep(5000)
                            }
                            if( is_proxy_on ){
                                //  接码测试 针对 globalsms 接码测试, 如果当前 IP 被限制访问则切换 IP 
                                if( taskPluginData.phoneProvider == "globalsms" ){
                                    for (let index = 0; index < 3; index++) {
                                        randomSleep(5000)
                                        try {   
                                            let res = http.get( "https://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=0b3e8967-6ea5-43bd-ae6e-7f73dad94531" )
                                            res = res.body.string()
                                            if( res.match(/success/) ){ 
                                                taskDemo.desc = ""
                                                is_proxy_on=true; 
                                                break 
                                            } else if( res.match(/We blocked access to/) || res.match(/DOCTYPE html/) ){
                                                is_proxy_on=false;
                                                taskDemo.desc = "globalsms 限制访问, " + "建议切换代理"                                                
                                                break
                                            }
                                            throw res
                                        } catch (error) { taskDemo.desc = "globalsms 访问异常: " + commonFunc.objectToString(error) }
                                    }
                                    reportLog( taskDemo.desc )
                                    if(!is_proxy_on){ continue }    //  切换新的代理
                                } 
                                home()
                                return true
                            }
                            
                            // local_ip = null
                            // for (let index = 0; index < 3; index++) {
                            //     local_ip = httpUtilFunc.getLocalIp()
                            //     if(local_ip){break}
                            //     randomSleep(5000)
                            // }
                            // global_ip = null
                            // for (let index = 0; index < 3; index++) {
                            //     global_ip = httpUtilFunc.getGlobalIp()
                            //     if(global_ip){break}
                            //     randomSleep(5000)
                            // }
                            // reportLog( "检测IP - " + ( local_ip!=global_ip ) + " : " + local_ip + " -> " + global_ip )
                            // if( local_ip && global_ip ){
                            // if( local_ip && global_ip && local_ip != global_ip ){
                            //     //  接码测试 针对 globalsms 接码测试, 如果当前 IP 被限制访问则切换 IP 
                            //     if( taskPluginData.phoneProvider == "globalsms" ){
                            //         for (let index = 0; index < 10; index++) {
                            //             randomSleep(10000)
                            //             try {   
                            //                 let res = http.get( "https://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=0b3e8967-6ea5-43bd-ae6e-7f73dad94531" )
                            //                 res = res.body.string()
                            //                 if( res.match(/success/) ){ 
                            //                     is_proxy_on=true; 
                            //                     break 
                            //                 }
                            //                  else if( res.match(/We blocked access to/) || res.match(/DOCTYPE html/) ){
                            //                     is_proxy_on=false;
                            //                     taskDemo.desc = "globalsms 限制访问, " + "建议切换代理"                                                
                            //                     break
                            //                 }
                            //                 throw res
                            //             } catch (error) { 
                            //                 taskDemo.desc = "globalsms 访问异常: " + commonFunc.objectToString(error)
                            //             }
                            //         }
                            //         reportLog( taskDemo.desc )
                            //         if(!is_proxy_on){ continue }    //  切换新的代理
                            //     } 
                            //     home()
                            //     return true
                            // }
                            // taskDemo.desc = "代理无效? " + local_ip + " -> " + global_ip
                        }
                    },false,1000*60*proxy_thread_timeout,()=>{ throw "代理连接超时退出 " + taskDemo.desc })
                    if(!is_proxy_on){ throw taskDemo.desc }
                    ipInfo = httpUtilFunc.getIpInfo()
                    reportLog( "代理网络 " + JSON.stringify( ipInfo ) )
                    commonFunc.showLog("代理网络 \n" + JSON.stringify( ipInfo ))
                }    
                

                timestamp = new Date().getTime()
                let release_phone = null
                //  开启一个10分钟的阻塞线程 用于注册
                // newThread(function(){
    
                    let login_status = taskPluginData.forceRegister==true ? 0 : targetApp.getLoginStatus(1000*15)
                    if( login_status == 1 ){ taskDemo.desc = "取消注册, 该分区已有账号登录"; return 0 }
                    
                    // let timeout_stamp = new Date().getTime() + taskPluginData.maxtTimeout
                    for (let idx_loop = 1; idx_loop < taskPluginData.maxFails+1; idx_loop++) {
                        if( new Date().getTime() - timestamp > 1000*60*12 ){ reportLog("动态代理即将过期,退出注册"); break }
                        reportLog( "第 " + idx_loop + "次尝试注册" )
                        try {
                            let unreg_filter = {
                                "appName"         : targetApp.appName,
                                // "appName"         : "whatsapp",
                                "countryCode"     : taskPluginData.countryCode,
                                "phoneProvider"   : taskPluginData.phoneProvider,
                                "tag"             : taskPluginData.phoneTag,
                            }
                            // unreg_filter.appName       = targetApp.appName
                            // unreg_filter.countryCode   = taskPluginData.countryCode
                            // unreg_filter.dialCode      = commonFunc.getDialCode( taskPluginData.countryCode )
                            // unreg_filter.phoneProvider = taskPluginData.phoneProvider
                            // unreg_filter.tag      = taskPluginData.phoneTag

                            unreg_filter.dialCode      = commonFunc.getDialCode( taskPluginData.countryCode )
                            unreg_filter.ip            = ipInfo.query
                            unreg_filter.country       = ipInfo.country
                            unreg_filter.city          = ipInfo.city
                            
                            let unreg_data = null                            
                            // unreg_data = targetApp.getUnregisterAccount( register_info )
                            unreg_data = httpUtilFunc.accountUnregisterGet( unreg_filter )
                            if(!unreg_data){ throw "获取未注册账号失败" }
                            reportLog( "未注册账号: " + commonFunc.objectToString( unreg_data ) )    
                            if( unreg_data ){   
                                // commonFunc.taskResultSet( "获取号码: " + unreg_data.appName+"-"+unreg_data.id, "a" )                             
                                commonFunc.taskResultSet( "待注册账号: " + commonFunc.objectToString( unreg_data ), "a" )                             
                                try {
                                    //  记录代理信息
                                    unreg_data.proxy            = proxy_info
                                    unreg_data.proxyProvider    = taskPluginData.proxyProvider
                                    try { unreg_data.ip         = ipInfo.query  } catch (error) { } 
                                    try { unreg_data.account_tag = taskPluginData.accountTag ? "#"+taskPluginData.accountTag.replace(",","#") : null  } catch (error) { } 
                                    // unreg_data.isSent = false

                                        // commonFunc.clearData( targetApp.bid )
                                        // sleep(1000)
                                        //  应对注册机的首次启动无响应情况, 注册机模式
                                        // if( taskPluginData.machineType == "newMachine" ){
                                        //     for (let index = 0; index < 1; index++) {
                                        //         reportLog( "启动应用: " + targetApp.bid + " - " + launch( targetApp.bid ) )
                                        //         sleep(1000)
                                        //         toastLog( "启动应用测试" )
                                        //         if( clickIfWidgetClickable( id("android:id/aerr_wait").findOne(10000) ) ){ reportLog( "应用无响应: " + targetApp.bid ); sleep(6000) }
                                        //         // if( clickIfWidgetClickable( id("android:id/aerr_close").findOne(1000) ) ){ reportLog( "应用无响应: " + targetApp.bid ) }
                                        //         // if( clickIfWidgetClickable( text("Close app").findOne(1000) ) ){ reportLog( "应用无响应: " + targetApp.bid ) }
                                        //     }
                                        // }
                                        // targetApp.getLoginStatus(  )
                                        

                                        commonFunc.clearData( targetApp.bid )
                                        sleep(1000)
                                        //  进入注册流程
                                        registered_account = targetApp.doRegister( unreg_data )
                                        if( registered_account.isSuccess ){
                                            // unreg_data.isSuccess = true
                                            login_status = targetApp.getLoginStatus(1000*60)
                                            if( !login_status ){ throw "账号登录异常" + login_status }

                                            // let account_unique_id = targetApp.getLoginUsername()
                                            // reportLog( "账号状态: " + login_status )
                                            // 
                                            // registered_account.forceRecord = true
                                            

                                            //  记录注册
                                            let record_account = null
                                            for (let index = 0; index < 5; index++) {
                                                try {
                                                    // record_account.appName = targetApp.appName
                                                    record_account = httpUtilFunc.accountRegisterRecord( registered_account )
                                                    if( !record_account || !record_account.id ){ throw record_account }
                                                    commonFunc.taskResultSet( "注册账号: " + record_account.appName +"-"+ record_account.id, "a" ) 
                                                    break
                                                } catch (error) { 
                                                    if( index>3 ){ throw "记录注册失败: " + commonFunc.objectToString(error) }
                                                    sleep(10000)
                                                }
                                            }      
                                            // commonFunc.appendTaskResult( "注册成功: " + commonFunc.objectToString( record_account ) )
                                            // commonFunc.taskResultSet( "注册成功: " + commonFunc.objectToString( record_account ) + commonFunc.taskResultGet(), "w" )                                            
                                                                                       
                                            
                                            try {   //  自动绑定分区
                                                if( taskPluginData.autoBind && record_account ){
                                                    let bind_info = httpUtilFunc.updateDevice( targetApp.appName, { "proxy":null }, { "accountId": record_account.id } )
                                                    commonFunc.taskResultSet( "绑定分区: " + commonFunc.objectToString( bind_info ), "a" )
                                                }    
                                            } catch (error) {
                                                reportLog( "绑定分区异常: " + commonFunc.objectToString(error) )
                                            }

                                            //  上报登陆信息
                                            try {
                                                let account_unique_id = record_account.username
                                                let login_record = {}
                                                login_record.appName    = record_account.appName
                                                login_record.accountId  = record_account.id
                                                login_record.username   = account_unique_id
                                                login_record.ip         = global_ip
                                                login_record.proxy      = record_account.proxy
                                                login_record.proxyProvider  = record_account.proxyProvider

                                                login_record.actionType = 1
                                                login_record.result = 1                                                
                                                login_record.desc = "注册"
                                                // taskDemo.desc = login_record.desc
                                                // commonFunc.taskResultSet( "登录状态: " + login_record.desc, "a" )
                                                httpUtilFunc.accountLoginRecord( login_record )
                                                randomSleep(5000)
                                            } catch (error) { reportLog("上报登陆信息异常: " + commonFunc.objectToString(error)) }

                                            // let holding_time = random(10,60)
                                            // toastLog( "挂机等待 " + holding_time + " 秒" )
                                            // for (let index = holding_time; index > 0; index--) {
                                            //     index%5 == 0 && toast( "挂机 " + index + " 秒" )
                                            //     sleep(1000)
                                            // }
                                            

                                            //  设置PIN
                                            if( login_status==1 && taskPluginData.setupPIN ){
                                                try {
                                                    let new_PIN = commonFunc.randomStrInStr( "1234567890", 6 )
                                                    if( targetApp.doSetupPIN( record_account, new_PIN) ){
                                                        record_account.password = new_PIN
                                                        reportLog( "PIN 设置成功: " + new_PIN )
                                                        commonFunc.taskResultSet( "设置 PIN: " + new_PIN, "a" )  
                                                        httpUtilFunc.accountUpdate( record_account.id, { "password" : new_PIN } )
                                                    }
                                                } catch (error) {
                                                    reportLog( "PIN 设置异常: " + commonFunc.objectToString(error) )
                                                }
                                            }

                                            //  
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

                                                    let account_unique_id = "+"+record_account.dialCode+record_account.phone
                                                                        
                                                    //  修改头像
                                                    try {
                                                        if( taskPluginData.updatePhoto ){
                                                            targetApp.doForceToHomePage(record_account, 1000*60*2, 2)

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
                    
                                                            targetApp.doUpdatePhoto( record_account, material.media_path )
                                                            // account = httpUtilFunc.accountUpdate( account.id, { "photo":new_account.photo } )
                                                            commonFunc.taskResultSet( "成功修改头像: " + material.media_path, "a" )
                    
                                                            // try { feedback_data.task_result = 1; httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                                        }
                                                    } catch (error) {
                                                        // try { feedback_data.mid && httpUtilFunc.materialFeedback( feedback_data ) } catch (error) {}
                                                        try { httpUtilFunc.materialRollback( material ) } catch (error) {}
                                                        throw "修改头像异常: " + commonFunc.objectToString(error) 
                                                    }
                                                    
                                                } catch (error) {
                                                    // reportLog( commonFunc.objectToString(error) )
                                                    commonFunc.taskResultSet( error, "a" )
                                                    // throw error
                                                }
                                            }
                                            
                                            //  账号提取
                                            let draw_result = null
                                            if( taskPluginData.autoExtract ){
                                                try {
                                                    reportLog( "开始提取账号" )
                                                    for (let index = 0; index < 5; index++) {
                                                        try {                                                            
                                                            draw_result = SLChanges.drawWhatsApp();
                                                            let draw_json = JSON.parse( draw_result )
                                                            if( draw_json.code == 200 ){
                                                                record_account.isSold = true
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
                                                } catch (error) { 
                                                    commonFunc.taskResultSet( "提取账号异常: " + commonFunc.objectToString( error ), "a" )  
                                                    reportLog( "账号提取异常: " + commonFunc.objectToString( error ) )
                                                }
                                                // record_account.desc = "提取账号结果:  +" + record_account.dialCode + " " + record_account.phone + " - " + draw_result
                                                // reportLog( "提取账号结果:  +" + record_account.dialCode + " " + record_account.phone + " - " + draw_result )
                                                
                                                try {
                                                    for (let index = 0; index < 5; index++) {
                                                        try {
                                                            record_account.isSold && httpUtilFunc.accountUpdate( record_account.id, { "isSold" : true, "desc" : "提取信息: "+draw_result } )
                                                            break
                                                        } catch (error) { if(index>3){throw error} }
                                                        sleep(10000)
                                                    }
                                                } catch (error) {
                                                    commonFunc.taskResultSet( "账号更新异常" + commonFunc.objectToString(error), "a" )
                                                }
                                            }

                                            for (let index = 0; index < 5; index++) {
                                                try {
                                                    let account = httpUtilFunc.accountQuery( { "id" : record_account.id } )
                                                    if( account && account.id ){
                                                        commonFunc.taskResultSet( "注册完成: " + commonFunc.objectToString( account ) + " - " + commonFunc.taskResultGet(), "w" )
                                                        break
                                                    }                                                    
                                                // } catch (error) { if(index>3){throw "账号查询异常: " + commonFunc.objectToString(error)} }
                                                } catch (error) { if(index>3){ commonFunc.taskResultSet( "账号查询异常" + commonFunc.objectToString(error), "a" ) } }
                                                sleep(10000)
                                            }
                                            

                                            taskDemo.result = 1
                                            // taskDemo.desc = JSON.stringify( record_account )
                                            break
                                        }else{
                                            unreg_data.isUsed = registered_account.isUsed //  如果未发送验证码, 则重置未注册号码
                                            throw registered_account.desc || "未知异常"
                                        }
                                } catch (error) {
                                    // reportLog( "注册失败 - " + commonFunc.objectToString(error), 2 )
                                    reportLog( "注册异常 - " + commonFunc.objectToString(error) )
                                    if(!unreg_data.isUsed){  
                                        unreg_data.isRegistered = false
                                        unreg_data.isProcess = false
                                        targetApp.resetAccount( unreg_data )
                                    }
                                    else{
                                        unreg_data.isSuccess = false
                                        unreg_data.desc = commonFunc.objectToString(error)
                                        targetApp.reportRegister( unreg_data )
                                    }
                                    taskPluginData.debugOn && commonFunc.debugWidget( classNameStartsWith("android").findOne(1000) )
                                    // throw unreg_data.desc + " - " + JSON.stringify( unreg_data )
                                    throw unreg_data.desc
                                }
                            }
                        } catch (error) {
                            taskDemo.desc = commonFunc.objectToString(error)
                            reportLog( taskDemo.desc )
                            if(taskDemo.desc.match( '{"code":200,"msg":"Success","data":"[]"}' )){
                                //  账号库为空, 强制停止任务
                                httpUtilFunc.taskStop(null,"未注册账号库为空");
                            }
                        }
                        sleep(5000)
                        try { release_phone && targetApp.releasePhone( taskPluginData.releaseApi, release_phone ); release_phone = null } catch (error) { }
                    }
                    
                // },null,taskPluginData.maxtTimeout,()=>{ throw "任务超时退出" })
                try { release_phone && targetApp.releasePhone( taskPluginData.releaseApi, release_phone ); release_phone = null } catch (error) { }
                
                //  退出注册
                reportLog( "运行时间 - " + parseInt( (new Date().getTime() - timestamp)/1000/60 ) + "分钟" )
                if( taskDemo.result != 1 ) { throw taskDemo.desc }
            } catch (error) {
                throw error
            }        
        } catch (error) { 
            taskDemo.result = 0
            taskDemo.desc = commonFunc.objectToString(error)
            // commonFunc.taskResultSet( taskDemo.desc, "a" )
            commonFunc.taskResultSet( taskDemo.desc + " - \n" + commonFunc.taskResultGet(), "w" )
        }      
    }()


    sleep(3000)

    try { threads.shutDownAll() } catch (error) { }    
    try { home(); sleep(2000);  } catch (error) { }    

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