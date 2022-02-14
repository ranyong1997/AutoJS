const { shortSleep, timing, screenTip, getSerial, commonClick, widgetCompare, clickAlreadyFindWidget, clickWidget, longSleep, newThread, isNotNullObject } = require("../common/common.js");
const commonFunc = require("../common/common.js");
var httpUtilFunc = {};
//初始化
httpUtilFunc.init = function(){
    try {
        log( "init httpUtilFunc" )
        let deviceInfo = "设备详情: " + "\n"
        deviceInfo = deviceInfo + "   happybay="+ commonFunc.happybayVersion + "\n"
        deviceInfo = deviceInfo + "   jsengine="+ commonFunc.jsengineVersion + "\n"
        deviceInfo = deviceInfo + "   androidId="+commonFunc.androidId+"    deviceId=" +commonFunc.deviceId+ "   folderId=" +commonFunc.folderId + "    userId="+commonFunc.userId + "    brand=" +commonFunc.brand+ "   model=" +commonFunc.model + "\n"
        deviceInfo = deviceInfo + "   server=" +commonFunc.server+ "   taskid=" +commonFunc.taskid + "\n"
        httpUtilFunc.reportLog( deviceInfo )
    } catch (error) { log( "    " + JSON.stringify(error) ) }
}
/**
 * 
 * @param {*} record_data 
 */
httpUtilFunc.accountLoginRecord = function( record_data ){
    try {
        record_data.appName = record_data.appName || null
        record_data.accountId = record_data.accountId || null
        record_data.username = record_data.username || null
        record_data.proxy = record_data.proxy || null
        record_data.proxyProvider = record_data.proxyProvider || null

        record_data.actionType = record_data.actionType || 2  //  1-注册; 2-登录
        record_data.result    = record_data.result || 0       //  0/1/-1  非空数字
        record_data.desc    = record_data.desc || null        //  描述信息
        record_data.deviceId  = commonFunc.deviceId
        record_data.folderId  = commonFunc.folderId

        try { record_data.ip = record_data.ip ? record_data.ip : httpUtilFunc.getGlobalIp() } catch (error) { }
        httpUtilFunc.reportLog("记录登陆信息: " + JSON.stringify(record_data) )
        let url = "http://" + commonFunc.server + ":8000/user/loginrecord"
        let res = http.postJson(url, record_data)
        res = res.body.json()
        // log( JSON.stringify(res) )
        if( res.code == 200 ){
            httpUtilFunc.reportLog( "记录登陆完成" )
            return true
        }else{
            throw res
        }        
    } catch (error) {
        httpUtilFunc.reportLog( "记录登陆失败 " + commonFunc.objectToString(error)  )
        throw error
    }
    // return false
}
httpUtilFunc.accountRegisterRecord = function( account ){
    try {
        let data = {
            "forceRecord"       : true,
            "appName"           : account.appName,
            "deviceId"          : commonFunc.deviceId,
            "folderId"          : commonFunc.folderId,
            "isSuccess"         : account.isSuccess,
            "isRegistered"      : true,
            "isUsed"            : false,
            "isDeleted"         : false,
            "isSold"            : account.isSold || false ,
            "username"          : account.username,
            "password"          : account.password,
            "email"             : account.email,
            "emailPassword"     : account.emailPassword,
            "phone"             : account.phone,
            "ip"                : account.ip,
            "dialCode"          : account.dialCode,
            "city"              : account.city,
            "country"           : account.country,
            "countryCode"       : account.countryCode,
            "extra"             : account.extra,
            "account_tag"       : account.account_tag,
            "phoneProvider"     : account.phoneProvider,
            "emailProvider"     : account.emailProvider,
            "proxy"             : account.proxy,
            "proxyProvider"     : account.proxyProvider,
            "desc"              : account.desc,
            "deviceInfo"        : commonFunc.brand + "-" + commonFunc.model,
            "androidId"         : commonFunc.androidId,
            "tag"               : account.tag,            
            // "createTime":"2021-09-09T18:55:20.647Z",
            // "updateTime":"2021-09-24T11:35:47.349Z"
        }
        try { data.ip = data.ip || httpUtilFunc.getGlobalIp() } catch (error) { }

        let log_text = data.isSuccess ? "注册成功 " : "注册失败 " + data.desc + " - "
        httpUtilFunc.reportLog( log_text + JSON.stringify(data), 1 )
        let url = "http://"+commonFunc.server+":8000/user/registered"
        let res = http.postJson(url, data)
        res = res.body.json()
        if( res.code == 200 ){
            // reportLog("记录注册结果完成: " + res.data )
            let record_account = JSON.parse( res.data )
            // record_account.accountId = record_account.id
            return record_account
        }else{
            throw res
        }
    } catch (error) {
        // reportLog("记录注册结果失败 " + commonFunc.objectToString(error)  )
        // throw "记录注册结果失败 " + commonFunc.objectToString(error)
        throw error
    }
}
/**
 * 
 * @param {*} filter 
 * @returns 
 */
httpUtilFunc.accountUnregisterGet = function( filter ){
    try {
        return newThread(function() {
            // reportLog( "请求账号: " + JSON.stringify( req_data ) )
            // return JSON.parse( '{\"id\": 31, \"appName\": \"whatsapp\", \"type\": 1, \"username\": \"whatsapp05072065\", \"password\": \"1234\", \"email\": \"whatsapp05072065@qq.com\", \"emailPassword\": \"1234\", \"phone\": \"5794575324\", \"smsurl\": \"http://103.82.170.144/napi/view?token=e9ed93634294477b800ed4fd2947029e\", \"isRegistered\": false, \"isProcess\": true, \"extra\": \"nan\", \"fromw\": \"nan\", \"dialCode\": \"1\", \"city\": \"unknown\", \"country\": \"unknown\", \"countryCode\": \"unknown\", \"createTime\": \"2021-05-07T12:50:22.665Z\"}' )
            // return JSON.parse( '{"appName":"whatsapp","type":1,"dialCode":"1","phone":"8567623371","smsurl":"http://api.globalsms.io/api_gsim/v1/public/getSmsByToken?token=b308ce15-cd90-4d9b-8ddc-e3dfce247591"}' )
            let appName         = filter.appName      
            let countryCode     = filter.countryCode  
            // let dialCode        = filter.dialCode     
            let phoneProvider   = filter.phoneProvider
            let tag             = filter.tag
            

            let url = "http://"+commonFunc.server+":8000/user/unregaccount?appName="+appName+"&countryCode="+countryCode+"&phoneProvider="+phoneProvider+"&tag="+tag
            if( !appName || !countryCode || !phoneProvider || !tag ){ throw "参数异常-"+url  }
            // let res = http.postJson(url, req_data)
            httpUtilFunc.reportLog( "请求账号: " + url )
            let res = http.get(url)
            res = res.body.json()
            if( res.code == 200 ){
                let data = JSON.parse( res.data )
                if( data.id && data.appName ){
                    return data
                }
            }
            throw res
        }, null, 1000*60*2, ()=>{ throw "超时退出" } )
    } catch (error) {
        // reportLog( "请求账号失败: " + commonFunc.objectToString(error) )
        throw "请求账号失败: " + commonFunc.objectToString(error) 
    }    
}
httpUtilFunc.accountUnregisterRecord = function( account ){
    try {
        let data = {
            "forceRecord"       : true,
            "appName"           : account.appName,

            "type"              : 1,
            "username"          : null,
            "password"          : null,
            "email"             : account.email || null,
            "emailPassword"     : null,
            "phone"             : account.phone || null,
            "smsurl"            : account.smsurl || null,
            "isRegistered"      : false,
            "isProcess"         : false,
            "extra"             : null,
            "dialCode"          : account.dialCode || null,
            "city"              : account.city || null ,
            "country"           : account.country || null,
            "countryCode"       : account.countryCode || null,
            "phoneProvider"     : account.phoneProvider || null,
        
            "proxy"             : null,
            "proxyProvider"     : null,
            "tag"               : account.tag || null
            
        }

        // let log_text = data.isSuccess ? "注册成功 " : "注册失败 " + data.desc + " - "
        // httpUtilFunc.reportLog( log_text + JSON.stringify(data), 1 )
        // let url = "http://"+commonFunc.server+":8000/user/registered"
        // let res = http.postJson(url, data)
        // res = res.body.json()
        // if( res.code == 200 ){
        //     // reportLog("记录注册结果完成: " + res.data )
        //     let record_account = JSON.parse( res.data )
        //     // record_account.accountId = record_account.id
        //     return record_account
        // }else{
        //     throw res
        // }
    } catch (error) {
        throw error
    }
}
/**
 * 
 * @param {*} filter 
 * @returns 
 */
httpUtilFunc.accountQuery = function(filter){
    let account = null
    try {
        filter.datatype     = filter.datatype || 2
        filter.id           = filter.id || ""
        filter.appName      = filter.appName || ""        
        filter.androidId    = filter.androidId || ""
        filter.deviceId     = filter.deviceId || ""
        filter.folderId     = filter.folderId || ""
        filter.phone        = filter.phone || ""
        filter.username     = filter.username || ""
        if( filter.isSuccess != null ){ filter.isSuccess = filter.isSuccess ? 1 : 0 }
        if( filter.isSuccess == null ){ filter.isSuccess = "" }

        let url = "http://" + commonFunc.server + ":8000/user/search?datatype="+filter.datatype+"&id="+filter.id+"&appName="+filter.appName+"&isSuccess="+filter.isSuccess+"&androidId="+filter.androidId+"&deviceId="+filter.deviceId+"&folderId="+filter.folderId+"&phone="+filter.phone+"&username="+filter.username
        httpUtilFunc.reportLog( "查询账号: " + url )  
        var res = http.get(url);
        let res_json = res.body.json()
        //  {"code":200,"msg":"Success","data":"[{\"model\": \"model.registaccount\", \"pk\": 28842, \"fields\": {\"appName\": \"facebook\", \"deviceId\": \"AA2036086D\", \"folderId\": \"1\", \"isSuccess\": true, \"isRegistered\": false, \"isUsed\": true, \"isDeleted\": false, \"isSold\": false, \"username\": \"David Peterson\", \"password\": \"k(Sx6WA_!\", \"email\": null, \"emailPassword\": null, \"phone\": \"777507857\", \"ip\": \"14.233.65.24\", \"dialCode\": \"84\", \"city\": null, \"country\": null, \"countryCode\": \"VN\", \"extra\": null, \"account_tag\": null, \"phoneProvider\": \"yuenanka\", \"emailProvider\": null, \"proxy\": \"SOCKS5,18.138.238.133,58314\", \"proxyProvider\": \"doveip\", \"desc\": null, \"deviceInfo\": \"htc-HTC2Q55300\", \"androidId\": \"f0b0da3ef3565f1e\", \"tag\": null, \"forceRecord\": true, \"createTime\": \"2021-08-23T11:55:25.994Z\", \"updateTime\": \"2021-08-23T11:55:25.994Z\"}}]"}
        // log( JSON.stringify(res_json) )
        let data_list = JSON.parse( res_json.data )
        if( data_list.length ){
            for (let index = data_list.length-1; index > -1; index--) {
                account = data_list[index].fields
                account.id = data_list[index].pk
                account.accountId = account.id
                break
            }
        }
        account ? httpUtilFunc.reportLog( "查询账号结果: " + commonFunc.objectToString(account) ) : httpUtilFunc.reportLog( "查询账号失败: " + commonFunc.objectToString(res_json) ) 
    } catch (error) {
        // httpUtilFunc.reportLog( "查询账号失败: " + commonFunc.objectToString(error) )
        throw error
    }    
    return account
}
/**
 * 
 * @param {*} filter 
 * @returns 
 */
httpUtilFunc.accountQueryList = function(filter){
    let account_list = []
    try {
        filter.datatype     = filter.datatype || 2
        filter.id           = filter.id || ""
        filter.appName      = filter.appName || ""        
        filter.androidId    = filter.androidId || ""
        filter.deviceId     = filter.deviceId || ""
        filter.folderId     = filter.folderId || ""
        filter.phone        = filter.phone || ""
        filter.username     = filter.username || ""
        if( filter.isSuccess != null ){ filter.isSuccess = filter.isSuccess ? 1 : 0 }
        if( filter.isSuccess == null ){ filter.isSuccess = "" }

        let url = "http://" + commonFunc.server + ":8000/user/search?datatype="+filter.datatype+"&id="+filter.id+"&appName="+filter.appName+"&isSuccess="+filter.isSuccess+"&androidId="+filter.androidId+"&deviceId="+filter.deviceId+"&folderId="+filter.folderId+"&phone="+filter.phone+"&username="+filter.username
        try { if(filter.count){ url = url + "&count="+filter.count } } catch (error) { }
        httpUtilFunc.reportLog( "查询账号: " + url )  
        var res = http.get(url);
        let res_json = res.body.json()
        //  {"code":200,"msg":"Success","data":"[{\"model\": \"model.registaccount\", \"pk\": 28842, \"fields\": {\"appName\": \"facebook\", \"deviceId\": \"AA2036086D\", \"folderId\": \"1\", \"isSuccess\": true, \"isRegistered\": false, \"isUsed\": true, \"isDeleted\": false, \"isSold\": false, \"username\": \"David Peterson\", \"password\": \"k(Sx6WA_!\", \"email\": null, \"emailPassword\": null, \"phone\": \"777507857\", \"ip\": \"14.233.65.24\", \"dialCode\": \"84\", \"city\": null, \"country\": null, \"countryCode\": \"VN\", \"extra\": null, \"account_tag\": null, \"phoneProvider\": \"yuenanka\", \"emailProvider\": null, \"proxy\": \"SOCKS5,18.138.238.133,58314\", \"proxyProvider\": \"doveip\", \"desc\": null, \"deviceInfo\": \"htc-HTC2Q55300\", \"androidId\": \"f0b0da3ef3565f1e\", \"tag\": null, \"forceRecord\": true, \"createTime\": \"2021-08-23T11:55:25.994Z\", \"updateTime\": \"2021-08-23T11:55:25.994Z\"}}]"}
        // log( JSON.stringify(res_json) )
        let data_list = JSON.parse( res_json.data )
        if( data_list.length ){
            for (let index = data_list.length-1; index > -1; index--) {
                let account = data_list[index].fields
                account.id = data_list[index].pk
                account.accountId = account.id
                // break
                account_list[account_list.length] = account
            }
        }
        log(commonFunc.objectToString(account_list))
        // account ? httpUtilFunc.reportLog( "查询账号结果: " + commonFunc.objectToString(account) ) : httpUtilFunc.reportLog( "查询账号失败: " + commonFunc.objectToString(res_json) ) 
    } catch (error) {
        // httpUtilFunc.reportLog( "查询账号失败: " + commonFunc.objectToString(error) )
        throw error
    }
    return account_list
}
/**
 * 
 * @param {*} account_id 
 * @param {*} new_data 
 * @returns 
 */
httpUtilFunc.accountUpdate = function( account_id, new_data ){
    try {
        if( !account_id || !commonFunc.isNotNullObject(new_data) ){ throw "参数异常" }
        let new_account = httpUtilFunc.accountQuery( { "id" : account_id } )
        if( !new_account ){ throw "查询账号失败-"+account_id }
        httpUtilFunc.reportLog( "账号更新: " + account_id + " - " + commonFunc.objectToString(new_data) )
        for (let key in new_data) {
            new_account[key] = new_data[key]
        }
        new_account.force_record = true
        let url = "http://" + commonFunc.server + ":8000/user/registered"
        let res = http.postJson(url, new_account)
        res = res.body.json()
        if( res.code == 200 ){
            httpUtilFunc.reportLog("账号更新完成: " + res.data )
            new_account = JSON.parse( res.data )
            return new_account
        }
        throw res      
    } catch (error) {
        // throw "账号更新异常" + commonFunc.objectToString(error)
        throw error
    }    
}
httpUtilFunc.downloadFile = function( file_url, file_path, timeout, force_download ){
    try {
        timeout = typeof(timeout) == "number" ? timeout : 120000
        force_download = typeof( force_download ) == "boolean" ? force_download : false
        if( !file_url ){ throw "file_url 异常: " + file_url }
        try {
            if( files.exists( file_path ) && !force_download ){ 
                log("文件已存在：" + file_url)
                return true 
            }
            files.remove( file_path )            
        } catch (error) { }
        
        //  下载文件
        let is_download = newThread( function(){
            log("开始下载文件：" + file_url)
            res = http.get(file_url)
            files.writeBytes(file_path, res.body.bytes())
            return true
        }, false, timeout )

        //  刷新设备媒体库
        if( is_download && files.exists(file_path) ){
            media.scanFile(file_path)
            log("文件已载入设备")
            return true
        }
        throw "未知异常"
    } catch (error) {
        log("文件下载失败 " + JSON.stringify(error))
    }   
    return false
}
/**
 * 
 * @param {*} filter 
 * @returns 
 */
httpUtilFunc.queryProxy = function(filter){
    let proxy_data = null
    try {
        filter.datatype     = filter.datatype || 4
        filter.id           = filter.id || filter.proxyId || ""
        filter.proxy      = filter.proxy || ""        
        filter.proxyProvider    = filter.proxyProvider || ""
        filter.tag     = filter.tag || ""
        filter.desc     = filter.desc || ""
        if( filter.isDeleted != null ){ filter.isDeleted = filter.isSuccess ? 1 : 0 }
        if( filter.isDeleted == null ){ filter.isDeleted = "" }

        let url = "http://" + commonFunc.server + ":8000/user/search?datatype="+filter.datatype+"&id="+filter.id+"&proxy="+filter.proxy+"&proxyProvider="+filter.proxyProvider+"&tag="+filter.tag+"&desc="+filter.desc+"&isDeleted="+filter.isDeleted
        httpUtilFunc.reportLog( "查询代理: " + url )  
        var res = http.get(url);
        let res_json = res.body.json()
        //  {"code":200,"msg":"Success","data":"[{\"model\": \"model.registaccount\", \"pk\": 28842, \"fields\": {\"appName\": \"facebook\", \"deviceId\": \"AA2036086D\", \"folderId\": \"1\", \"isSuccess\": true, \"isRegistered\": false, \"isUsed\": true, \"isDeleted\": false, \"isSold\": false, \"username\": \"David Peterson\", \"password\": \"k(Sx6WA_!\", \"email\": null, \"emailPassword\": null, \"phone\": \"777507857\", \"ip\": \"14.233.65.24\", \"dialCode\": \"84\", \"city\": null, \"country\": null, \"countryCode\": \"VN\", \"extra\": null, \"account_tag\": null, \"phoneProvider\": \"yuenanka\", \"emailProvider\": null, \"proxy\": \"SOCKS5,18.138.238.133,58314\", \"proxyProvider\": \"doveip\", \"desc\": null, \"deviceInfo\": \"htc-HTC2Q55300\", \"androidId\": \"f0b0da3ef3565f1e\", \"tag\": null, \"forceRecord\": true, \"createTime\": \"2021-08-23T11:55:25.994Z\", \"updateTime\": \"2021-08-23T11:55:25.994Z\"}}]"}
        // log( JSON.stringify(res_json) )
        let data_list = JSON.parse( res_json.data )
        if( data_list.length ){
            for (let index = data_list.length-1; index > -1; index--) {
                proxy_data = data_list[index].fields
                proxy_data.id = data_list[index].pk
                break
            }
        }
        proxy_data ? httpUtilFunc.reportLog( "查询代理结果: " + commonFunc.objectToString(proxy_data) ) : httpUtilFunc.reportLog( "查询代理失败: " + commonFunc.objectToString(res_json) ) 
    } catch (error) {
        // httpUtilFunc.reportLog( "查询代理失败: " + commonFunc.objectToString(error) )
        throw error
    }    
    return proxy_data
}
httpUtilFunc.downLoadImg = function( imgUrl, imgPath, timeout ){
    try {        
        timeout = timeout != null ? timeout : 30000
        let errMsg = ""
        let is_download = false
        try {
            log( "删除本地文件："+ imgPath + " -> " + files.remove( imgPath ) )
        } catch (error) { }
        let dl_thread = threads.start(function(){
            log("开始下载图片：" + imgUrl)
            let img = images.load(imgUrl)
            if(img){
                images.save(img, imgPath, "png");
                shortSleep()
                media.scanFile(imgPath)
                shortSleep()
            }else{
                errMsg = "图片下载失败"
            }
            is_download = files.exists(imgPath)
        })
        dl_thread.join(timeout)
        dl_thread.interrupt() 
        if( is_download ){
            log("图片已载入相册")
            return true
        }
        errMsg != "" ? errMsg : "图片下载异常"
        throw errMsg
    } catch (error) {
        errMsg = error
        log(errMsg)
    }   
    return false  
}
httpUtilFunc.downloadVideo = function( mediaUrl, mediaPath, timeout ){
    try {        
        timeout = timeout != null ? timeout : 30000
        let errMsg = ""
        let is_download = false
        try {
            log( "删除本地文件："+ mediaPath + " -> " + files.remove( mediaPath ) )
        } catch (error) { }
        let dl_thread = threads.start(function(){
            log("开始下载文件：" + mediaUrl)
            res = http.get(mediaUrl)
            files.writeBytes(mediaPath, res.body.bytes())            
            is_download = true
        })
        dl_thread.join(timeout)
        dl_thread.interrupt() 
        if( is_download && files.exists(mediaPath) ){
            media.scanFile(mediaPath)
            log("文件已载入相册")
            return true
        }
        errMsg != "" ? errMsg : "文件下载 未知异常"
        throw errMsg
    } catch (error) {
        errMsg = error
        log(errMsg)
    }   
    return false
}
/**
 * 获取已注册账号信息
 * @param {Object} filter {  "appName": "", "id": "", "isSuccess": "", "androidId": "", "deviceId": "", "folderId": "" }
 * @returns 
 */
httpUtilFunc.getAccountOnDevice = function( filter ){
    let account = null
    try {
        filter.datatype     = filter.datatype || 2
        filter.id           = filter.id || ""
        filter.appName      = filter.appName || ""        
        filter.androidId    = filter.androidId || ""
        filter.deviceId     = filter.deviceId || ""
        filter.folderId     = filter.folderId || ""
        filter.phone        = filter.phone || ""
        filter.username     = filter.username || ""
        if( filter.isSuccess != null ){ filter.isSuccess = filter.isSuccess ? 1 : 0 }
        if( filter.isSuccess == null ){ filter.isSuccess = "" }

        let url = "http://" + commonFunc.server + ":8000/user/search?datatype="+filter.datatype+"&id="+filter.id+"&appName="+filter.appName+"&isSuccess="+filter.isSuccess+"&androidId="+filter.androidId+"&deviceId="+filter.deviceId+"&folderId="+filter.folderId+"&phone="+filter.phone+"&username="+filter.username
        httpUtilFunc.reportLog( "查询本机账号: " + url )  
        var res = http.get(url);
        let res_json = res.body.json()
        //  {"code":200,"msg":"Success","data":"[{\"model\": \"model.registaccount\", \"pk\": 28842, \"fields\": {\"appName\": \"facebook\", \"deviceId\": \"AA2036086D\", \"folderId\": \"1\", \"isSuccess\": true, \"isRegistered\": false, \"isUsed\": true, \"isDeleted\": false, \"isSold\": false, \"username\": \"David Peterson\", \"password\": \"k(Sx6WA_!\", \"email\": null, \"emailPassword\": null, \"phone\": \"777507857\", \"ip\": \"14.233.65.24\", \"dialCode\": \"84\", \"city\": null, \"country\": null, \"countryCode\": \"VN\", \"extra\": null, \"account_tag\": null, \"phoneProvider\": \"yuenanka\", \"emailProvider\": null, \"proxy\": \"SOCKS5,18.138.238.133,58314\", \"proxyProvider\": \"doveip\", \"desc\": null, \"deviceInfo\": \"htc-HTC2Q55300\", \"androidId\": \"f0b0da3ef3565f1e\", \"tag\": null, \"forceRecord\": true, \"createTime\": \"2021-08-23T11:55:25.994Z\", \"updateTime\": \"2021-08-23T11:55:25.994Z\"}}]"}
        // log( JSON.stringify(res_json) )
        let data_list = JSON.parse( res_json.data )
        if( data_list.length ){
            // log( data_list.length )
            for (let index = data_list.length-1; index > -1; index--) {
                // if( filter.id && filter.id != data_list[index].pk ){ continue }
                account = data_list[index].fields
                account.id = data_list[index].pk
                account.accountId = account.id
                break
            }
        }
        account ? httpUtilFunc.reportLog( "查询本机账号结果: " + JSON.stringify(account) ) : httpUtilFunc.reportLog( "查询本机账号失败: " + JSON.stringify(res_json) ) 
    } catch (error) {
        httpUtilFunc.reportLog( "查询本机账号失败: " + JSON.stringify( error ) )        
    }    
    return account
}
/**
 * 
 * @param {*} appName 
 * @returns 
 */
httpUtilFunc.getDeviceBindInfo = function( appName ){
    let bind_info = null
    try {
        let deviceId = commonFunc.deviceId
        let folderId = commonFunc.folderId
        log( "查询绑定情况: " + appName )
        bind_info = newThread(()=>{            
            let url = "http://" + commonFunc.server + ":8000/user/search?datatype=5&appName="+appName+"&deviceId="+deviceId+"&folderId="+folderId
            let res = http.get(url);
            res = res.body.json()
            if(res.code != 200){ throw res }
            let list = JSON.parse( res.data )
            if( list.length ){ return list[0].fields }            
        },null,1000*30)
    } catch (error) { throw "查询绑定异常: " + JSON.stringify(error) }
    return bind_info
} 
httpUtilFunc.getRegisterContact = function(){
    let contact = {}
    try {
            let url_unreg = "http://" + commonFunc.server + ":8000/user/search?datatype=1&appName=whatsapp"
            let url_reg = "http://" + commonFunc.server + ":8000/user/search?datatype=2&appName=whatsapp&isSuccess=1"
            let url = random(0,100) < 20 ? url_unreg : url_reg
            var res = http.get(url);
            let res_json = res.body.json()
            // log( JSON.stringify(res_json) )
            let data_list = JSON.parse( res_json.data )
            if( data_list.length ){
                let temp_data = data_list[ random(0,data_list.length-1) ].fields
                contact.phone = temp_data.phone
                contact.firstName = temp_data.username
                contact.lastName = ""
                contact.email = temp_data.email
            }
    } catch (error) {
        httpUtilFunc.reportLog( "获取插件配置失败: " + JSON.stringify( error ) )
        
        // throw error
    }
    return contact
}
/**
 * 
 * @returns 
 */
httpUtilFunc.getPluginData = function(){
    let pluginData = null
    try {
        let url = "http://" + commonFunc.server + ":83/task/getplugindata?taskid=" + commonFunc.taskid
        log("   读取配置:"+url)
        commonFunc.taskResultSet("任务配置-"+url,"a")
        var res = http.get(url);
        let res_json = res.body.json()            
        if( commonFunc.isNotNullObject(res_json.param) ){
            pluginData = res_json.param.pluginData ? res_json.param.pluginData : res_json.param
        }else if( typeof(res_json.param) == "string" ){
            pluginData = JSON.parse(res_json.param)
        }
    } catch (error) {
        // httpUtilFunc.reportLog( "获取插件配置失败: " + JSON.stringify( error ) )
        throw error
    }
    return pluginData
}
/**
 * getProxyData 从代理库中获取一个可用代理
 * @param {String} proxy_provider 代理来源
 * @param {String} proxy_tag 代理标签
 * @returns {String} proxy_data 代理信息 示例: SOCKS5,18.139.39.145,59230
 */
httpUtilFunc.getProxyData = function( proxy_provider, proxy_tag ){ 
    try {
        if( !proxy_tag ){ throw "代理标签为空" }
        let url = null
        if( proxy_provider ){
            url = "http://" + commonFunc.server + ":8000/proxy/getproxy?proxyProvider=" + proxy_provider + "&tag="+proxy_tag
        }else{
            url = "http://" + commonFunc.server + ":8000/proxy/getproxy?tag="+proxy_tag
        }
        // if( !proxy_provider || !proxy_tag ){ throw "代理来源或代理标签为空" }
        // let url = "http://" + commonFunc.server + ":8000/proxy/getproxy?proxyProvider=" + proxy_provider + "&tag="+proxy_tag
        httpUtilFunc.reportLog( "获取代理: " + url )
        return newThread(function(){
            let res = http.get( url )
            res = res.body.json()
            if(res.code == 200){
                let data = JSON.parse( res.data )
                if( data.proxy ){ return data }  
            }
            throw res
        },null, 1000*20, ()=>{ throw "超时退出" })
    } catch (error) { throw "获取代理异常: " + commonFunc.objectToString(error) }
}
/**
 * 获取 北鲲云 动态代理
 * @param {*} base_url 
 * @param {*} args 
 * @returns 
 */
httpUtilFunc.getProxyFromCloudam = function( base_url, args ){ 
    try {
        if( !base_url || !args ){ throw "getProxyFromCloudam 参数异常" }
        let protocol        = args.protocol || "socks"
        let regionid         = args.regionid || "US"
        let needpwd      = args.needpwd || false
        let duplicate    = args.duplicate || true
        let amount     = args.amount  || 1
        let type   = args.type || "text"

        let uri = "?protocol="+protocol+"&regionid="+regionid+"&needpwd="+needpwd+"&duplicate="+duplicate+"&amount="+amount+"&type="+type
        let url = base_url + uri.toLowerCase()
        log( "尝试获取动态代理: " + url)
        return newThread(function(){ 
            let res = http.get(url)
            res = res.body.string().replace(/[\r\n\s]/g, "")
            if( new RegExp(/\d+\.\d+\.\d+\.\d+:\d+/).test(res) ){
                res = res.replace(":",",")
                res = "SOCKS5,"+res
                return res
            }
            throw res
        },null, 1000*20, ()=>{ throw "超时退出" })
    } catch (error) { throw "获取代理异常: " + commonFunc.objectToString(error) }
}
/**
 * 
 * @param {*} proxyType     代理类型 - 默认socks5
 * @param {*} timeliness    代理时效 - 0:短效; 1:长效
 * @param {*} appName       应用分类 - "whatsapp", "facebook", "tiktok"
 * @param {*} actionTag     使用场景 - 0:通用; 1:注册; 2:养号
 * @param {*} isStrict      地址严格 - 0:非严格; 1:严格
 * @param {*} countryCode   国家代码 - US
 * @returns 
 */
httpUtilFunc.getProxyFromBytesfly = function( proxyType, timeliness, appName, actionTag, isStrict, countryCode  ){
    try {
        function httpRequest(apiCall, body) {
            try {
                let commArgs = {
                    "appId": 1,
                    // "androidId": device.getAndroidId(),
                    "appVersion": app.versionName,
                    "appVersionNo": app.versionCode,
                    // "brand": device.brand,
                    "channel": "mainc",
                    "deviceId": device.fingerprint,
                    "gps": "",
                    "idfa": "",
                    "idfv": "",
                    // "imei1": device.getIMEI(),
                    "imei2": "",
                    "imsi1": "",
                    "imsi2": "",
                    "ip": "",
                    "language": "zh",
                    "latitude": null,
                    "longitude": null,
                    "wifiMac": device.getMacAddress(),
                    "networkTypeName": 1,
                    "osType": 1,
                    "osVersion": "",
                    "sdkInt": device.sdkInt,
                    "packageName": "",
                    "resolution": device.width + "*" + device.height,
                    "btMac": "",
                    "province": "",
                    "city": "",
                    "zone": "",
                    // "deviceModel": deivce.model,
                    "eip": "",
                    "oaid": ""
                };
            
                // let headers = {
                //     "x-Token": null,
                //     "wechatId": requestConfig.wechatId
                // };
            
                // var body = {
                //     "register_app_id": 2,
                //     "limit": 1,
                //     "status": 0
                //  }
                var args = {
                    "body": body,
                    "comm_args": commArgs
                }
                var ts = new Date().getTime()
                var appId = "1"
                var callStr = apiCall
                var version = "1.0.0"
                var ua =  "script"
                var sign = commonFunc.md5(ua+ts+callStr+JSON.stringify(args)+version)
                var data = {
                    "app_id": appId,
                    "ts": ts,
                    "call": callStr,
                    "args": args,
                    "version": version,
                    "sign": sign,
                    "ua": ua
            
                }
                return newThread( ()=>{
                    // let requestUuTag = commonFunc.randomStr(16);
                    // let result = http.postJson("http://192.168.2.194:3003/i/a", data);
                    let result = http.postJson("http://bytesfly.tpddns.cn:8090/i/a", data);
                    // toastLog("  result = "+result.body.string())
                    return result;
                }, null, 1000*60*3, ()=>{ throw "超时退出" } )
            } catch (error) {
                throw error
            }
            // return null;
        }
        
        vpn_proxy_type = 0                              //  0:socks; 1:http
        vpn_proxy_timeliness = timeliness ? 1 : 0       //  0:短效; 1:长效
        use_app_tag = 0                                 //  app分类
        use_action_tag = 0                              //  使用场景 - 0:通用; 1:注册; 2:养号
        addrStrict = isStrict ? 1 : 0                   //  
        country = countryCode || "US"                   // 

        switch (appName) {
            case "whatsapp":
                use_app_tag = 1
                break;
            case "facebook":
                use_app_tag = 2
                break;
            case "tiktok":
                use_app_tag = 12
                break;        
            default:
                break;
        }
        switch (actionTag) {
            case 1:
                use_action_tag = 1
                break;
            case 2:
                use_action_tag = 2
                break;        
            default:
                use_action_tag = 0
                break;
        }     
        let body = {
            "vpn_proxy_type": 0,
            "vpn_proxy_timeliness": 0,
            "use_app_tag": use_app_tag,
            "use_action_tag": use_action_tag,
            "addrStrict": 0,
            "country": country,
        }
        log( commonFunc.objectToString(body) )
        let res = httpRequest("vpnProxyGet", body)
        res = res.body.json()
        log( commonFunc.objectToString(res) )
        // log(result);
        // { data: { code: '000000',msg: 'success', data: { ips: [{ proxy_host: '198.2.192.91', proxy_port: 21963, proxy_real_addr: '96.40.102.207' }] }, proxy_way_id: 1, cost: 533 } }
        if(res.data && res.data.code == "000000"){
            let data = res.data.data.ips[0]
            if(data.proxy_host && data.proxy_port){
                return "SOCKS5,"+data.proxy_host + "," + data.proxy_port
            }
            throw res
        }else{
            throw res
        }
    } catch (error) {
        throw "获取代理异常: " + commonFunc.objectToString(error)
    }
}
/**
 * 获取 doveip 动态代理
 * @param {*} base_url 
 * @param {*} args 
 * @returns 
 */
httpUtilFunc.getProxyFromDoveip = function( base_url, args ){ 
    try {
        if( !base_url || !args ){ throw "getProxyFromDoveip 参数异常" }
        let geo         = args.geo || "US"
        let selfip      = args.selfip || ""
        let accurate    = args.accurate || 0
        let timeout     = args.timeout  || 10
        let agreement   = args.agreement || 0
        let url = base_url + "&geo="+geo+"&selfip="+selfip+"&accurate="+accurate+"&timeout="+timeout+"&agreement="+agreement
        log( "尝试获取动态代理: " + url)
        return newThread(function(){ 
            let res = http.get(url)
            res = res.body.json()
            if(res.errno == 200){
                proxy_info = "SOCKS5" + "," + res.data.ip + "," + res.data.port
                return proxy_info
            }
            throw res
        },null, 1000*20, ()=>{ throw "超时退出" })
    } catch (error) { throw "获取代理异常: " + commonFunc.objectToString(error) }
}
/**
 * 从 https://api.ipify.org 或 https://www.whatismyip.com 获取当前网络IP
 * @param {*} timeout 
 * @returns ip
 */
httpUtilFunc.getGlobalIp = function(timeout){
    let ip = null
    try {
        timeout = typeof(timeout) == "number" ? timeout : 1000*30
        ip = newThread(function(){        
            // let user_agent  = commonFunc.getRandomUA()
            let res = http.get( "https://api.ipify.org/?format=json", {
                "headers": {
                    'User-Agent': commonFunc.getRandomUA()
                }
            } )
            if( res.statusCode == 200 ){
                res = res.body.json()
                return res.ip
            }
            throw res.statusCode
        },null, timeout,()=>{throw "超时退出"})
    } catch (error) { log( "    https://api.ipify.org/?format=json: request error " ) }
    try {
        ip = ip || newThread(function(){        
            let res = http.get( "https://ipinfo.io/json" , {
                "headers": {
                    'User-Agent': commonFunc.getRandomUA()
                }
            } )
            if( res.statusCode == 200 ){
                res = res.body.json()
                return res.ip
            }
            throw res
        },null, timeout, ()=>{throw "超时退出"})
    } catch (error) { log( "    https://ipinfo.io/json: request error " ) }
    try {
        ip = ip || newThread(function(){        
            let res = http.get( "https://ifconfig.me/" , {
                "headers": {
                    'User-Agent': commonFunc.getRandomUA()
                }
            } )
            res = res.body.string()
            let reg = new RegExp(/id="ip_address">([^<]+)/)
            if( reg.test( res ) ){                
                return res.match(reg)[1]
            }
            throw res
        },null, timeout, ()=>{throw "超时退出"})
    } catch (error) { log( "    https://ifconfig.me/ request error " ) }
    try {
        ip = ip || newThread(function(){        
            let res = http.get( "https://www.whatismyip.com/" , {
                "headers": {
                    'User-Agent': commonFunc.getRandomUA()
                }
            } )
            res = res.body.string()
            let reg = new RegExp(/Detailed information about IP address ([^"]+)/)
            if( reg.test( res ) ){                
                return res.match(reg)[1]
            }
            throw res
        },null, timeout, ()=>{throw "超时退出"})
    } catch (error) { log( "    https://www.whatismyip.com/ request error " ) }
    return ip
}
/**
 * 从 http://ip-api.com 获取当前网络IP和IP所属地理位置信息
 * @param {*} timeout 
 * @returns 示例数据: {"status":"success","country":"United States","countryCode":"US","region":"NY","regionName":"New York","city":"Buffalo","zip":"14202","lat":42.893,"lon":-78.8753,"timezone":"America/New_York","isp":"ColoCrossi
ng","org":"ColoCrossing","as":"AS36352 ColoCrossing","query":"23.94.65.69"}
 */
httpUtilFunc.getIpInfo = function(timeout){
    let ipInfo = {}
    try {
        timeout = typeof(timeout) == "number" ? timeout : 1000*30
        ipInfo = newThread(function(){        
            let res = http.get( "http://ip-api.com/json/" , {
                "headers": {
                    'User-Agent': commonFunc.getRandomUA()
                }
            } )
            return res.body.json()
        },{}, timeout, ()=>{throw "超时退出"})
    } catch (error) { log("  http://ip-api.com/json/: " + commonFunc.objectToString(error) ) }
    return ipInfo
}
/**
 * 从 https://www.ip.cn 获取 Bypass 网络IP
 * @param {*} timeout 
 * @returns ip
 */
httpUtilFunc.getLocalIp = function(timeout){
    let ip = null
    try {
        timeout = typeof(timeout) == "number" ? timeout : 1000*30
        ip = newThread(function(){        
            let res = http.get("https://www.ip.cn/api/index?ip=&type=0", {
                "headers": {
                    'User-Agent': commonFunc.getRandomUA()
                }
            } )
            if( res.statusCode == 200 ){
                res = res.body.json()
                return res.ip
            }
            throw res.statusCode
        },null, timeout, ()=>{throw "超时退出"})
    } catch (error) { log( "    https://www.ip.cn/api/index?ip=&type=0: " + commonFunc.objectToString(error)) }
    return ip
}
/**
 * @param {Number} type 素材类型（0:纯文本；1:图片；2:视频；3:音频）
 * @param {Number} count 获取数量
 * @param {Number} classify classify 文本类型(0:默认；1:昵称；2:简介；3:外链; 4:对话模板) / 图片类型(0:默认；1:发布内容；2:头像) / 视频类型(0:默认；1:发布内容)
 * @param {Number} used_times 已使用次数低于n次(不传默认无限制)
 * @param {Number} used_times_model 已使用次数模型 lte:小于等于; eq:等于; gt:大于; gte:大于等于; 默认为 lte
 * @param {String} lable 标签(不传默认无限制)
 * @returns {Array} 返回素材列表 
 */
httpUtilFunc.materialGetList = function( req_data ){
    // let getMaterials = function( args ){
    try {
        // let args_data = {
        //     "type": type,
        //     "count": count,
        //     "classify": classify,
        //     "used_times": used_times,
        //     "lable": lable
        // } 
        if( !commonFunc.isNotNullObject(req_data) ){ throw "参数异常 " + commonFunc.objectToString(req_data) }
        httpUtilFunc.reportLog( "素材申请参数: " + commonFunc.objectToString(req_data) )
        // if( !app_id || !app_secret ){ throw "参数异常 " + commonFunc.objectToString(req_data) }
        let app_id      = req_data.app_id
        let app_secret  = req_data.app_secret

        let args_data = {}
        args_data.type              = req_data.type
        args_data.count             = req_data.count || 1
        args_data.classify          = req_data.classify || 0
        args_data.used_times        = typeof(req_data.used_times) == "number" ? req_data.used_times : null
        args_data.used_times_model  = req_data.used_times_model || "lte"
        args_data.lable             = req_data.lable || null

        let call = "material_get"
        let version = "1.0.0"   
        let ts = new Date().getTime()
        let sign = commonFunc.getmd5( app_id + ts + call + JSON.stringify(args_data) + version + app_secret )
        let data_json = {
            "data": {
                "app_id": app_id,
                "ts": ts,
                "call": call,
                "version": version,
                "args": args_data,
                "sign": sign
            }
        }
        httpUtilFunc.reportLog( "素材申请提交: " + commonFunc.objectToString(data_json) )
        let res = http.postJson("http://" + commonFunc.server + ":3002/i/a/" ,data_json )
        res = res.body.json()
        if( res.data && res.data.code == "000000" ){
            return res.data.data.materials
        }
        throw res        
    } catch (error) {
        throw "素材申请异常: " + commonFunc.objectToString(error)
    }
}
/**
 * 素材获取
 * @param {*} req_data 参数体 { "type":"", "classify":"", "used_times":"", "used_times_model":"", "lable":""}
 * @param {Number} type 素材类型（0:纯文本；1:图片；2:视频；3:音频）
 * @param {Number} classify 文本类型(0:默认；1:昵称；2:简介；3:外链; 4:对话模板) / 图片类型(0:默认；1:发布内容；2:头像) / 视频类型(0:默认；1:发布内容)
 * @param {Number} used_times 已使用次数低于n次(不传默认无限制)
 * @param {Number} used_times_model 已使用次数模型 lte:小于等于; eq:等于; gt:大于; gte:大于等于; 默认为 lte
 * @param {String} lable 标签(不传默认无限制)
 * @returns {Object} 返回素材对象 
 */
httpUtilFunc.materialGet = function( req_data ){
    try {
        let material = httpUtilFunc.materialGetList(req_data)[0]
        // if( material.media_path.match( "http://192.168.91.3:3302" ) ){}
        if( material.media_path ){  
            material.media_path = material.media_path.replace( new RegExp( 'http://[0-9\.]+:3302' ), 'http://'+commonFunc.server+':3302' )
        }
        httpUtilFunc.reportLog( "获取素材: " + commonFunc.objectToString(material) )
        return material
    } catch (error) {
        throw error
    }
}
/**
 * 
 * @param {*} feedback_data { "app_id":"", "app_secret":"", "mid":"素材id", "task_type":"任务类型 0-未知; 1-发布视频", "task_result":"任务结果 1/0", "account_id":"账号唯一标识", "account_tags":"账号标签", "ip":"当前代理IP" }
 * @returns 
 */
httpUtilFunc.materialFeedback = function( feedback_data ){
    try {        
        if( !commonFunc.isNotNullObject(feedback_data) ){ throw "参数异常 " + commonFunc.objectToString(feedback_data) }
        httpUtilFunc.reportLog( "素材反馈参数: " + commonFunc.objectToString(feedback_data) )

        let app_id      = feedback_data.app_id
        let app_secret  = feedback_data.app_secret

        let args_data = { }
        args_data.mid               = feedback_data.mid
        args_data.task_type         = feedback_data.task_type
        args_data.task_result       = feedback_data.task_result
        args_data.tiktok_unique_id  = feedback_data.account_id
        args_data.tiktok_lables     = feedback_data.account_tags
        try { args_data.task_ip     = feedback_data.ip || httpUtilFunc.getGlobalIp() } catch (error) { }        

        args_data.task_id               = commonFunc.taskid
        // args_data.box_no                = "unknow"
        args_data.mobile_no             = commonFunc.deviceId
        args_data.folder_no             = commonFunc.folderId
        args_data.folder_bind_param_id  = commonFunc.androidId
        args_data.folder_device_model   = commonFunc.brand +" "+ commonFunc.model
        args_data.folder_device_os_version     = device.release


        let call = "material_result"
        let version = "1.0.0"   
        let ts = new Date().getTime()
        let sign = commonFunc.getmd5( app_id + ts + call + JSON.stringify(args_data) + version + app_secret )
        let data_json = {
            "data": {
                "app_id": app_id,
                "ts": ts,
                "call": call,
                "version": version,
                "args": args_data,
                "sign": sign
            }
        }
        httpUtilFunc.reportLog( "素材反馈提交: " + commonFunc.objectToString(data_json) )
        let res = http.postJson("http://" + commonFunc.server + ":3002/i/a/" ,data_json )
        res = res.body.json()
        if( res.data && res.data.code == "000000" ){
            return true
        }
        throw res 
    } catch (error) {
        httpUtilFunc.reportLog( "素材反馈异常: " + commonFunc.objectToString(error) )
    }
    return false
}
/**
 * 素材回滚, 用于业务失败时回滚素材资源
 * @param {*} app_id 
 * @param {*} app_secret 
 * @param {*} material 
 * @returns 
 */
httpUtilFunc.materialRollback = function( app_id, app_secret, material ){
    try {
        // "mid": 3380
        if( !material ){ return false }
        if( !isNotNullObject(material) || !material.id ){ throw "参数异常" + commonFunc.objectToString(material) }
        httpUtilFunc.reportLog( "素材回滚: " + commonFunc.objectToString(material) )
        let args_data = {
            "mid": material.id
        }
        let call = "material_rollback"
        let version = "1.0.0"   
        let ts = new Date().getTime()
        let sign = commonFunc.getmd5( app_id + ts + call + JSON.stringify(args_data) + version + app_secret )
        let data_json = {
            "data": {
                "app_id": app_id,
                "ts": ts,
                "call": call,
                "version": version,
                "args": args_data,
                "sign": sign
            }
        }        
        let res = http.postJson("http://" + commonFunc.server + ":3002/i/a/" ,data_json )
        res = res.body.json()
        if( res.data && res.data.code == "000000" ){
            // return res.data.data.materials
            return true
        }
        throw res 
    } catch (error) {
        httpUtilFunc.reportLog( "素材回滚异常: " + commonFunc.objectToString(error) )
        // throw error
    }
    return false
}
httpUtilFunc.isUrlAccessable = function(url, flag_content, timeout){
    let is_accessable = false
    try {
        let errMsg = null
        log( "访问网址：" + url )
        let timeout = typeof( timeout ) == "number" ? timeout : 1000*60*2 
        let thread = threads.start(function(){
            try {
                let res = http.get(url)
                res = res.body.string()
                if( res.indexOf( flag_content ) != -1 ){
                    is_accessable = true
                }
            } catch (error) {
                // log( "访问异常: " + JSON.stringify(error) )
                errMsg = error
            }
        })
        thread.join(timeout)
        thread.interrupt()
        if(errMsg){ throw errMsg }
    } catch (error) {
        // log( JSON.stringify( error ) )
        throw error
    }
    log( "访问结果：" + is_accessable )
    return is_accessable
}
httpUtilFunc.randomAnswer = function(){
    //  http://random-answer.goodplace.eu/
    return newThread(function() {
        try {
            var result = http.get("http://random-answer.goodplace.eu/");
            result = result.body.string();
            result = result.match( 'style="text-decoration: none">"(.*)"</a>' )[1]
            // log( result )
            return result
        } catch (error) { }
    },null,10000)
}
httpUtilFunc.randomEmojis = function( num ){
    let str = ""
    try {
        num = typeof(num) == "number" ? num : 1
        let emojis = require("./randomData.js").emojis
        for (let index = 0; index < num; index++) {
            str = str + emojis[random( 0, emojis.length-1 )]
        }    
    } catch (error) { log(JSON.stringify(error)) }
    return str
}
httpUtilFunc.randomJoke = function(){
    //  http://random-answer.goodplace.eu/
    return newThread(function() {
        try {
            var result = http.get("https://geek-jokes.sameerkumar.website/api?format=json");
            result = result.body.json();
            result = result.joke
            result = result.replace( "Chuck Norris", "" )
            // log( result )
            return result
        } catch (error) { }
    },null,15000)
}
httpUtilFunc.randomSentence = function(){
    try {
        let sentences = require("./randomData.js").sentences        
        return sentences[random(0, sentences.length-1)]        
    } catch (error) { }
    return null
}
httpUtilFunc.randomWd = function(){
    var result = http.get("http://39.97.173.173:82/api/randomName?key=%E4%B8%AD");
    var resultJson = result.body.json();
    var content = resultJson["data"]
    content = content.substr(content.length-1,1)
    return content
}

httpUtilFunc.randomMingyan = function(){
    var result = http.get("https://v1.alapi.cn/api/mingyan");
    var resultJson = result.body.json();
    var content = resultJson["data"]["content"]
    return content
}

httpUtilFunc.randomName = function() {
    return newThread(function() {
        try {
            var result = http.get("https://namey.muffinlabs.com/name.json?count=1&with_surname=true&frequency=common");
            var resultJson = result.body.json();
            var name = resultJson[0]
            return name
        } catch (error) { }
    },null,10000)
    // 示例:  ["James Allen","David Hill","Sarah Perry","Michael Ford"]
}
httpUtilFunc.randomUserDetail = function() {
    return newThread(function() {
        try {
            var result = http.get("https://randomuser.me/api/");
            var resultJson = result.body.json();
            var userDetail = resultJson["results"][0]
            return userDetail
        } catch (error) { }
    },null,10000)
    // 示例:  {"results":[{"gender":"male","name":{"title":"Mr","first":"Leo","last":"Crawford"},"location":{"street":{"number":3030,"name":"Taylor St"},"city":"Wollongong","state":"Northern Territory","country":"Australia","postcode":2468,"coordinates":{"latitude":"-85.4453","longitude":"-44.6631"},"timezone":{"offset":"+6:00","description":"Almaty, Dhaka, Colombo"}},"email":"leo.crawford@example.com","login":{"uuid":"92c4df59-468c-4380-8e26-9c2d34e96efc","username":"bluegorilla653","password":"teaser","salt":"rzIWpHbq","md5":"7d2696223a78c4580b8e6c2f842fbeb9","sha1":"740cfbb52c4b08fa5490ad4a309805ca994ff822","sha256":"082a677fad6b4c1c0d0746f2d47f8d00f54c7983384830d61ea5cf766a55f8db"},"dob":{"date":"1986-08-31T06:31:26.426Z","age":35},"registered":{"date":"2004-12-13T06:32:09.056Z","age":17},"phone":"02-2954-8981","cell":"0415-652-217","id":{"name":"TFN","value":"963820663"},"picture":{"large":"https://randomuser.me/api/portraits/men/82.jpg","medium":"https://randomuser.me/api/portraits/med/men/82.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/82.jpg"},"nat":"AU"}],"info":{"seed":"ef340505dc7f98b9","results":1,"page":1,"version":"1.3"}}
}
httpUtilFunc.randomUserInfo = function() {    
    let userInfo = null
    try {            
        var user = httpUtilFunc.randomUserDetail()
        userInfo = {
            "gender"    : user.gender,
            "name"      : user.name.first + " " + user.name.last,
            "birthday"  : user.dob.date.match( /(\d\d\d\d-\d\d-\d\d)/ )[0],
            // "email"     : user.email,    
            "picture"   : user.picture.large
        }
    } catch (error) { }
    return userInfo
}
httpUtilFunc.reportLog = function( context, logType ){
    let is_upload = false
    try {
        let errMsg = ""
        context = typeof(context)=="object" ? JSON.stringify( context ) : context
        log( "  " + context )
        let rep_thread = threads.start(function(){
            try {
                let log_type = logType != null ? logType : 0
                // let url = "http://192.168.91.3:83/api/logger/rptlogs"
                // let url = "http://172.16.0.100:83/api/logger/rptlogs"
                let url = "http://" + commonFunc.server + ":83/api/logger/rptlogs"
                let data = {
                    "AndroidId"     :   commonFunc.androidId,
                    "mobile_no"     :   commonFunc.deviceId,
                    "user_id"       :   commonFunc.folderId,
                    "task_id"       :   commonFunc.taskid,
                    "log_type"      :   log_type,
                    "log_content"   :   context
                }            
                let res = http.postJson(url, data );
                res = res.body.json()           
                if( res.code == 200 ){
                    // log( "    上报日志成功" )
                    is_upload = true
                    return true
                }else{
                    throw res
                }
            } catch (error) { 
                log( "  " + JSON.stringify( error ) )
            }
        })
        rep_thread.join(1000*5)
        rep_thread.interrupt()
    } catch (error) { log( "  " + JSON.stringify( error ) ) }
    if(!is_upload){
        log( "  上报结果：" + is_upload )
    }    
    return is_upload
}
httpUtilFunc.taskStop = function(taskid,desc){
    try {
        taskid = commonFunc.taskid
        desc = commonFunc.objectToString(desc)
        httpUtilFunc.reportLog( "强制停止任务: " + commonFunc.taskid + " - " + desc )
        let url = "http://" + commonFunc.server + ":83/task/stoptask?taskid="+taskid
        let res = http.post( url )
        res = res.body.json()
        if( res.code == 1 ){
            httpUtilFunc.reportLog("停止任务成功: " + commonFunc.taskid )
            return true
        }
        throw res
    } catch (error) {
        httpUtilFunc.reportLog("停止任务异常: " + commonFunc.taskid + " - " + commonFunc.objectToString(error))
    }
    return false
}
httpUtilFunc.testGlobalNetwork = function(){

}
httpUtilFunc.testLocalNetwork = function(){

}
httpUtilFunc.testTaskServer = function(){
    try {
        let deviceId = commonFunc.deviceId
        let folderId = commonFunc.folderId
        let url = "http://" + commonFunc.server + ":8000/user/search?datatype=5&appName="+"testTaskServer"+"&deviceId="+deviceId+"&folderId="+folderId
        this.reportLog( "业务后台连接检测: " + url  )        
        let res = http.get(url);
        res = res.body.json()
        if(res.code != 200 || !res.data){ throw res }
        // this.reportLog( "业务后台连接正常" )
        return true
    } catch (error) { throw "业务后台连接异常: " + JSON.stringify(error) }
}
httpUtilFunc.updateDevice = function( appName, proxyData, accountData ){
    try {        
        return newThread(()=>{
            let data = {
                "deviceId": commonFunc.deviceId,
                "folderId": commonFunc.folderId,
                "appName": appName,
            }
            if( proxyData ){
                log(JSON.stringify(proxyData))
                data.proxyId = proxyData.proxyId || proxyData.id || null
                data.proxy = proxyData.proxy
            }
            if( accountData ){
                log(JSON.stringify(accountData))
                data.accountId = accountData.accountId || accountData.id
            }
            // "proxyId": proxyData.proxyId,
            // "proxy": proxyData.proxy,
            // "accountId": isNotNullObject(accountData) ? accountData.accountId : null,
            httpUtilFunc.reportLog( "更新设备绑定账号: " +  JSON.stringify(data) )
            let url = "http://" + commonFunc.server + ":8000/proxy/updatedevice"
            var res = http.postJson(url, data);
            res = res.body.json()
            httpUtilFunc.reportLog( "更新设备绑定结果: " +  JSON.stringify(res.data) )
            if(res.code != 200){ throw res }
            return JSON.parse( res.data )
        },null,1000*10)
    } catch (error) { httpUtilFunc.reportLog( "更新设备绑定异常: " + JSON.stringify(error) ) }
    return null
}

httpUtilFunc.init()
module.exports = httpUtilFunc;