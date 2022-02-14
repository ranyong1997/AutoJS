

const { clickIfWidgetExists, clickIfWidgetClickable, swipeWithBezier, shortSleep, randomSleep, scrollShortUp, newThread } = require("../common/common.js");
const commonFunc = require("../common/common.js");
const httpUtilFunc = require("./httpUtil.js");

var proxySttings = {}
proxySttings.isOtherPage = function(){
    try {
        let message_view = id("android:id/alertTitle").visibleToUser().findOne(1) || id("com.android.packageinstaller:id/permission_message").visibleToUser().findOne(1) // || id("android:id/message").visibleToUser().findOne(1)   
        if( message_view && message_view.id() == "android:id/alertTitle" && clickIfWidgetClickable( id("android:id/aerr_wait").visibleToUser().findOne(1) ) ){
            log( "应用崩溃: " + message_view.text() )
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
        // else if( message_view && message_view.id() == "android:id/message" && message_view.text().match("Check your phone's connection") ){
        //     throw message_view.text()
        // } 
        else if( message_view && message_view.id() == "com.android.packageinstaller:id/permission_message" ){
            // 权限检查
            for (let index = 0; index < 6; index++) {
                try {
                    let permission_message = id("com.android.packageinstaller:id/permission_message").visibleToUser().findOne(1000).text()
                    if( new RegExp(/files/i).test(permission_message) && clickIfWidgetClickable( id("com.android.packageinstaller:id/permission_allow_button").visibleToUser().clickable().findOne(1) ) ){ 
                        log( "允许权限 - " + permission_message )
                    }
                    else if( new RegExp(/record/i).test(permission_message) && clickIfWidgetClickable( id("com.android.packageinstaller:id/permission_allow_button").visibleToUser().clickable().findOne(1) ) ){ 
                        log( "允许权限 - " + permission_message )
                    }
                    else if( new RegExp(/contacts/i).test(permission_message) && clickIfWidgetClickable( id("com.android.packageinstaller:id/permission_allow_button").visibleToUser().clickable().findOne(1) ) ){ 
                        log( "允许权限 - " + permission_message )
                    }
                    else if( clickIfWidgetClickable( id("com.android.packageinstaller:id/permission_deny_button").visibleToUser().clickable().findOne(1)) ){ 
                        log( "拒绝权限 - " + permission_message )
                    }
                    else{ break }
                    sleep(1000)
                } catch (error) {}
            }
            return true
        }
        else if( clickIfWidgetClickable( text("OK").findOne(1000) ) ){
            return true
        }
    } catch (error) {
        log("proxySttings.isOtherPage: " + commonFunc.objectToString(error))
    }
    return false
}
proxySttings.posternImport = function( proxy_info ) {
    try {
        let new_str = null
        let file_path = "/sdcard/Download/postern.conf"
        try { files.remove( file_path ) } catch (error) { }
        
        log( files.join(files.cwd(), "res/postern.conf") )
        let file_str = files.read( files.join(files.cwd(), "res/postern.conf") ) 
        let rep_str = "Proxy = " + proxy_info
        new_str = file_str.replace(/Proxy =.*/,rep_str)
        if( new RegExp( ".*"+rep_str+".*" ).test( new_str ) ){
            log("代理更新 " + rep_str)
            files.write( file_path, new_str )

            if( files.exists( file_path ) ){
                log("代理写入 " + "/sdcard/postern.conf" )
                // media.scanFile(file_path)

                //  force-stop "com.tunnelworkshop.postern"
                // app.openAppSetting("com.tunnelworkshop.postern")
                // sleep(1000)
                // clickIfWidgetClickable( text("FORCE STOP").findOne(3000) )
                // sleep(1000)
                // clickIfWidgetClickable( text("OK").findOne(3000) )
                // log( "Postern FORCE STOPED" )
                // sleep(3000)
                // back()

                let is_toasted = false
                let is_imported = newThread(function() {
                    while( true ){
                        if( clickIfWidgetClickable( packageName("com.android.vpndialogs").text("OK").findOne(1) ) ){
                            log( "Postern Proxy 点击 OK" )
                        }
                        else if( !packageName("com.tunnelworkshop.postern").findOne(1) && !packageName("com.android.documentsui").findOne(1) ){
                            log( "Postern launching .. " )
                            launch("com.tunnelworkshop.postern")
                            sleep(3000)
                        }

                        else if( id("left_drawer").findOne(1000) ){
                            if( clickIfWidgetClickable( text("Import Proxy/Rule").findOne(1) ) ){
                                log("Postern 点击 导入")
                            }
                        }
                        else if( clickIfWidgetClickable( text("Import Local").findOne(1) ) ){
                            log("Postern 点击 导入本地")
                        }
                        // else if(idContains("menu_search").clickable().findOne(1)){
                        else if( text("postern.conf").visibleToUser().findOne(1) ){
                            let t_thread = null
                            try {
                                t_thread = threads.start(function(){
                                    events.observeToast();
                                    events.onToast(function(toast){
                                        log("监听到 Toast 事件: " + toast.getText() );
                                        is_toasted = "Import Succeeded" == toast.getText()
                                        try {
                                            t_thread.interrupt()
                                        } catch (error) { }
                                    });
                                })                                
                            } catch (error) { }
                            if( clickIfWidgetExists( text("postern.conf").visibleToUser().findOne(2000) ) ){
                                sleep(5000)
                                if( is_toasted ){
                                    return true
                                }
                            }
                            sleep(3000)
                            try {
                                t_thread.interrupt()
                            } catch (error) { }
                        }
                        else if( clickIfWidgetExists( idContains("title").text("Downloads").findOne(1) ) ){
                            log("Postern 点击 Downloads")
                        }
                        else if( clickIfWidgetClickable( desc("Show roots").findOne(1) ) ){
                            log("Postern 点击 文件菜单")
                        }
                        // else if(idContains("menu_search").clickable(false).findOne(1)){
                        //     setText( "postern.conf" )
                        //     sleep(600)
                        // }
                        else if( clickIfWidgetClickable( desc("Postern, Close navigation drawer").findOne(1) ) ){
                            log( "Postern Proxy 点击 菜单" )
                        }
                        
                        else{
                            back()
                        }
                        sleep(2000)
                    }
                }, false, 1000*60*2)
                // try {
                //     t_thread.interrupt()
                // } catch (error) { }
                if( is_imported ){
                    log("代理导入 成功")
                    return true
                }else{
                    log("代理导入 失败")
                }
            }else{
                log("代理写入 " + "失败" )
            }
        }else{
            log("代理更新 失败 " + new_str)
        }        
    } catch (error) {
        log( "Postern 导入失败 - " + JSON.stringify(error) )        
    }
    return false
}

proxySttings.posternSetup = function(proxy_config) {
    let server_name = null
    let server_address = null
    let server_port = null
    let server_type = null
    let username = null
    let password = null

    try {
        server_address  = proxy_config.server
        server_port     = proxy_config.port
        server_type     = proxy_config.type
        username        = proxy_config.username || ""
        password        = proxy_config.password || ""
        server_name     = server_port
        if( !new RegExp(/\d+\.\d+\.\d+\.\d+/).test( server_address ) ){ throw "" }
        if( !new RegExp(/^\d+$/).test( server_port ) ){ throw "" }
        if( !( new RegExp(/HTTPS/i).test( server_type ) || new RegExp(/SOCKS5/i).test( server_type ) ) ){ throw "" }
    } catch (error) {
        log( "Postern 参数异常" )
        return false
    }

    let is_proxy_set = false
    let is_rule_set = false
    let is_postern_ready = true
    return newThread(function() {
        while( true ){                
            if( !packageName("com.tunnelworkshop.postern").findOne(1) ){
                log( "Postern launching .. " )
                launch("com.tunnelworkshop.postern")
                sleep(3000)
            }

            if( className("android.widget.Button").text("Add Proxy").findOne(3000) ){
                if( !is_proxy_set ){
                    let proxy_btn = id("rl_button_text_small").text(server_type + " - " + server_address).findOne(1000)
                    if( proxy_btn ){
                        try {
                            if( new RegExp(".*"+server_name).test( proxy_btn.parent().child(1).text() ) ){
                                is_proxy_set = true
                            }
                        } catch (error) { }
                    }
                    if( is_proxy_set ){
                        log( "Postern Proxy 已配置: " + server_type + " - " + server_address + ":" + server_name )
                        if( clickIfWidgetClickable( desc("Postern, Close navigation drawer").findOne(1000) ) ){
                            log( "Postern Proxy 点击菜单" )
                        }else{
                            log( "Postern Proxy 点击菜单异常" )
                        }
                    }
                    else if( clickIfWidgetExists( id("image_button_layout").findOne(1) ) || clickIfWidgetClickable( className("android.widget.Button").text("Add Proxy").findOne(1) ) ){
                        is_postern_ready = false
                        log( "Postern Proxy 编辑" )
                        id("save_proxy").findOne(3000)
                        sleep(1000)
                        try {
        
                            id("proxy_type_spinner").findOne(1000).click()
                            sleep(1000)
                            let btn = textStartsWith(server_type).findOne(1000) || textStartsWith( server_type.toUpperCase() ).findOne(1)
                            btn.click()
                            sleep(2000)
                        } catch (error) {
                            log( JSON.stringify( error ) )
                            is_proxy_set = false
                            back()
                        }
                        
                        // log( desc("Postern, Close navigation drawer").findOne(1000) )
                        try {
                            id("proxyname").findOne(2000).setText(server_port); sleep(1000)
                            id("address").findOne(1000).setText(server_address); sleep(1000)
                            id("port").findOne(1000).setText(server_port); sleep(1000)
                            id("username").findOne(1000).setText(username); sleep(1000)
                            id("password").findOne(1000).setText(password); sleep(1000)
                            id("save_proxy").findOne(1000).click(); sleep(1000)
                            log( "Postern Proxy 点击保存" )
                        } catch (error) {
                            log( JSON.stringify( error ) )
                            is_proxy_set = false
                            back()
                        }
                    }
                    else {
                        back()
                        log( "Postern Proxy 界面异常 - Add Proxy" )
                    }
                }else{
                    if( clickIfWidgetClickable( desc("Postern, Close navigation drawer").findOne(1000) ) ){
                        log( "Postern Proxy 点击菜单" )
                    }else{
                        log( "Postern Proxy 点击菜单失败" )
                    }
                }
            }
            else if( className("android.widget.Button").text("Add Rule").findOne(1) ){
                if( is_proxy_set && !is_rule_set ){
                    let rules_list = id("rl_button_text_big").find()
                    // let 
                    if( rules_list.length ){
                        for (let idx_rules = 0; idx_rules < rules_list.length; idx_rules++) {
                            let rule = rules_list[idx_rules]
                            // log( rule.text() )
                            if( new RegExp(".*"+ server_address + ":" + server_port ).test( rule.text() ) ){
                                is_rule_set = true
                                log( "Postern Rules 已配置: " + rule.text() )
                            }else{
                                press( rule.bounds().centerX(), rule.bounds().centerY(), 2000 )
                                sleep(1000)
                            }
                            if ( clickIfWidgetExists(text("Delete").findOne(1000)) ){
                                sleep(1000)
                            }                                
                        }
                    }
                    // if( new RegExp(".*"+ server_address + ":" + server_port ).test( rule.text() ) ){
                    //     is_rule_set = true
                    // }
                    if( is_rule_set ){
                        if( clickIfWidgetClickable( desc("Postern, Close navigation drawer").findOne(1000) ) ){
                            log( "Postern Rules 点击菜单" )
                        }else{
                            log( "Postern Rules 点击菜单失败" )
                        }
                    }
                    else if( clickIfWidgetClickable( className("android.widget.Button").text("Add Rule").findOne(1) ) ){
                        is_postern_ready = false
                        log( "Postern Rules 编辑 " )
                        id("save_rule").findOne(3000)
                        sleep(1000)
                        try {

                            id("rule_type_spinner").findOne(1000).click();   sleep(1000)
                            text("Match All").findOne(1000).click();   sleep(1000)
                            
                            id("rule_action_spinner").findOne(1000).click();   sleep(1000)
                            text("Proxy/Tunnel").findOne(1000).click();   sleep(1000)

                            id("proxy_list_spinner").findOne(1000).click();   sleep(1000)
                            // text( server_port + " - " + server_address + ":" + server_port).findOne(1000).click();   sleep(1000)
                            textMatches( ".*" + server_address + ":" + server_port).findOne(1000).click();   sleep(1000)

                            id("save_rule").findOne(1000).click();   sleep(1000)
                            log( "Postern Rule 点击保存" )
                        } catch (error) {
                            log( JSON.stringify( error ) )
                            back()
                        }
                    }
                    else{
                        back()
                    }
                }else{
                    if( clickIfWidgetClickable( desc("Postern, Close navigation drawer").findOne(1000) ) ){
                        log( "Postern Rules 点击菜单" )
                    }else{
                        log( "Postern Rules 点击菜单失败" )
                    }
                }
            }
            else if( id("left_drawer").findOne(1) ){
                if( !is_proxy_set && clickIfWidgetClickable( text("Proxy").findOne(1) ) ){
                    log( "Postern Proxy 设置" )
                }
                else if( !is_rule_set && clickIfWidgetClickable( text("Rules").findOne(1) ) ){
                    log( "Postern Rules 设置" )
                }
                else if( !is_postern_ready || text("VPN On").findOne(1) ){
                    if( clickIfWidgetClickable( text("VPN Off").findOne(1) ) ){
                        log( "Postern VPN Off" )
                    }
                    //  force-stop "com.tunnelworkshop.postern"
                    app.openAppSetting("com.tunnelworkshop.postern")
                    sleep(1000)
                    clickIfWidgetClickable( text("FORCE STOP").findOne(3000) )
                    log( "Postern FORCE STOP" )
                    sleep(1000)
                    clickIfWidgetClickable( text("OK").findOne(3000) )
                    sleep(3000)
                    back()
                    is_postern_ready = true

                }
                else if( text("VPN Off").findOne(1) ){
                    toastLog( "Postern VPN On" )
                    sleep(1000)
                    home()
                    sleep(1000)
                    return true
                }else{
                    log( "Postern will reset !" )
                    is_proxy_set = false
                    is_rule_set = false
                    is_postern_ready = false
                }
            }
            else{
                back()
            }
            sleep(1000)
        }            
    },false,1000*60*3)
}
proxySttings.kitsunebiInstall = function( url ){
    if( !app.getAppName("fun.kitsunebi.kitsunebi4android") ){ 
        if( !httpUtilFunc.downloadFile( url, "/storage/emulated/0/Kitsunebi_v1.8.0.apk", 1000*60, false ) ||  !commonFunc.installApk( "/storage/emulated/0/Kitsunebi_v1.8.0.apk", 1000*60 ) ){ 
            // throw "未安装 " + "fun.kitsunebi.kitsunebi4android"
            return false
        }
    }
    return true
}
proxySttings.kitsunebiUninstall = function(  ){
    // try { 
    //     context.getPackageManager().deletePackageAsUser("fun.kitsunebi.kitsunebi4android",null,0,commonFunc.userId) 
    //     sleep(5000)
    // } catch (error) { 
    //     log( JSON.stringify(error) ) 
    // }
    // return !app.getAppName("fun.kitsunebi.kitsunebi4android") ? true : false
    return commonFunc.uninstallApp("fun.kitsunebi.kitsunebi4android")
}
/**
 * 
 * @param {*} proxy_info 
 * @param {*} force_update 
 * @returns 
 */
proxySttings.kitsunebiSetup = function(proxy_info, proxy_provider,force_update){
    let server_name = null
    let server_address = null
    let server_port = null
    let server_type = null
    let username = null
    let password = null

    try {
        let _split = proxy_info.split( "," )
        server_type     = _split[0]
        server_address  = _split[1]
        server_port     = _split[2]
        username        = _split.length > 3 ? _split[3]: ""
        password        = _split.length > 4 ? _split[4]: ""
        server_name     = proxy_info
        // if( new RegExp(/u768\$\w+$/).test(username) ){
        //     username = username + "*美国"
        //     server_name = server_type +","+ server_address +","+ server_port +","+ username +","+ password
        // }
        // if( new RegExp(/u768\$\w+[^\*US]$/).test(username) ){
        //     username = username + "*US"
        //     server_name = server_type +","+ server_address +","+ server_port +","+ username +","+ password
        // }
        // if( !new RegExp(/\d+\.\d+\.\d+\.\d+/).test( server_address ) ){ throw "" }
        if( !server_address ){ throw "" }
        if( !new RegExp(/^\d+$/).test( server_port ) ){ throw "" }
        // if( !( new RegExp(/HTTPS/i).test( server_type ) || new RegExp(/SOCKS5/i).test( server_type ) ) ){ throw "" }
    } catch (error) {
        // log( "代理 参数异常" + JSON.stringify(error) )
        // return false
        throw "代理 参数异常" + commonFunc.objectToString(error)
    }
    if( !app.getAppName("fun.kitsunebi.kitsunebi4android") ){ throw "未安装 fun.kitsunebi.kitsunebi4android" }
    try { shell("pm enable --user " + commonFunc.userId + " fun.kitsunebi.kitsunebi4android") } catch (error) { }
    sleep(3000)

    let is_proxy_set = false
    let is_rule_set = false
    let is_proxy_ready = false
    let err_msg = ""
    let is_unknow_page = false
    let not_found_count = 0
    try {
        is_proxy_ready = newThread(function() {
            while( true ){
                is_unknow_page = false
                if( proxySttings.isOtherPage() ){ sleep(3000) }
                if( !packageName("fun.kitsunebi.kitsunebi4android").findOne(1) ){
                    home()
                    sleep(1000)
                    log( "kitsunebi launching .. " )
                    launch("fun.kitsunebi.kitsunebi4android")
                    sleep(3000)
                    if( !packageName("fun.kitsunebi.kitsunebi4android").findOne(6000) ){ err_msg = "代理软件启动失败" }
                }
                //  首页
                if( className("android.widget.TextView").text("Kitsunebi").findOne(2000) && id("fun.kitsunebi.kitsunebi4android:id/add_btn").findOne(1) ){
                    if( !force_update ){  
                        is_proxy_set = true
                    }
                    if( !is_proxy_set ){
                        //  清空现有节点列表
                        while(true) {
                            log( "清空节点" )
                            if( !clickIfWidgetClickable( id("fun.kitsunebi.kitsunebi4android:id/delete_btn").findOne(2000) ) ){ break }
                            clickIfWidgetClickable( id("android:id/button1").text("YES").findOne(2000) )
                            sleep(1000)                        
                        }

                        //  添加新的节点
                        clickIfWidgetClickable( id("fun.kitsunebi.kitsunebi4android:id/add_btn").findOne(2000) )
                        sleep(3000)
                        clickIfWidgetExists( text("Add Endpoint").findOne(1000) )
                        sleep(3000)
                        clickIfWidgetExists( text("Manual").findOne(1000) )
                        sleep(3000)  
                        
                    }
                    else 
                    if( !is_rule_set ){
                        if( text(server_name).findOne(3000) ){ 
                            is_rule_set=true
                            toastLog("跳过规则设置")
                            continue
                        }else{
                            toastLog("点击添加" + clickIfWidgetClickable( id("fun.kitsunebi.kitsunebi4android:id/add_btn").findOne(2000) ))                            
                            sleep(3000)
                            toastLog("点击规则" + clickIfWidgetExists( text("Rule Set").findOne(2000) ))                            
                            sleep(3000)
                            if( !(className("android.widget.TextView").text("Rule Set").findOne(3000) && id("fun.kitsunebi.kitsunebi4android:id/add_btn").findOne(3000) ) ){
                                err_msg = "规则检测异常"
                            }
                        }
                    }
                    else{
                        if( id("fun.kitsunebi.kitsunebi4android:id/endpoint_list_card_view").find().length > 1 ){
                            is_proxy_set = false
                            force_update = true
                            toastLog("识别到多余的节点")
                            continue
                        }
                        if( !clickIfWidgetExists( text(server_name).findOne(1000) ) ){
                            is_proxy_set = false
                            force_update = true
                            toastLog("查找节点: " + server_name )
                            continue
                        }
                        sleep(1000)
                        
                        for (let index = 0; index < 3; index++) {
                            clickIfWidgetClickable( id("fun.kitsunebi.kitsunebi4android:id/measure_latency_btn").findOne(1000) ) && toastLog("刷新节点")
                            // sleep(1000)
        
                            if( id("android:id/message").textStartsWith("Invalid").findOne(3000) ){
                                clickIfWidgetClickable( text("OK").findOne(1) )
                                toastLog("无效节点")
                                is_proxy_set = false
                                force_update = true
                                break
                            }
                            // let running_btn = id("fun.kitsunebi.kitsunebi4android:id/running_indicator").findOne(3000)
                            clickIfWidgetExists( text(server_name).findOne(1000) )
                            sleep(3000)

                            //  适配廖的代理
                            if( proxy_provider == "liao_proxy" && clickIfWidgetExists( text(server_name).findOne(1000) ) ){
                                id("fun.kitsunebi.kitsunebi4android:id/running_indicator").text("running").findOne(3000) || clickIfWidgetClickable( text("OK").findOne(1) )
                                id("fun.kitsunebi.kitsunebi4android:id/running_indicator").text("running").findOne(3000) || clickIfWidgetClickable( id( "fun.kitsunebi.kitsunebi4android:id/fab" ).findOne(1) ) && toastLog("启动代理")
                                clickIfWidgetClickable( text("OK").findOne(3000) )
                            }

                            let latency = id("fun.kitsunebi.kitsunebi4android:id/ep_latency").textMatches(/\d+ ms/).findOne(6000)
                            if( latency ){
                                toastLog("网络延迟: " + latency.text())
                                if( id("fun.kitsunebi.kitsunebi4android:id/running_indicator").text("running").findOne(3000) ){     
                                    toastLog("代理启动" )
                                    return true
                                }else{
                                    clickIfWidgetClickable( id( "fun.kitsunebi.kitsunebi4android:id/fab" ).findOne(1) ) && toastLog("启动代理")
                                    id("fun.kitsunebi.kitsunebi4android:id/running_indicator").text("running").findOne(3000) || clickIfWidgetClickable( text("OK").findOne(1) )
                                    id("fun.kitsunebi.kitsunebi4android:id/running_indicator").text("running").findOne(3000) || clickIfWidgetClickable( id( "fun.kitsunebi.kitsunebi4android:id/fab" ).findOne(1) ) && toastLog("启动代理")
                                    clickIfWidgetClickable( text("OK").findOne(3000) )
                                }
                            }else{
                                try { err_msg = id("fun.kitsunebi.kitsunebi4android:id/ep_latency").findOne(1000).text() } catch (error) { }

                                //  适配廖的代理
                                if( proxy_provider == "liao_proxy" && clickIfWidgetExists( text(server_name).findOne(1000) ) ){
                                    try {
                                        let url = "http://2.2.2.2/switch-ip?cityid=68000"
                                        let res = http.get(url);
                                        res = res.body.json()
                                        // log( "switch-ip?cityid=68000: " + commonFunc.objectToString(res) )
                                        if(res.code != 0){ throw res }
                                    } catch (error) { err_msg = "switch-ip?cityid=68000 error: " + commonFunc.objectToString(error) }
                                    sleep(10000)
                                }
                            }
                            try { toastLog( "节点测试: " + id("fun.kitsunebi.kitsunebi4android:id/ep_latency").findOne(1000).text() )  } catch (error) { }                            
                        }
                        // return true
                        // is_proxy_set = false
                        // force_update = true
                    }
                } 
                //  Rule set 页
                else if( className("android.widget.TextView").text("Rule Set").findOne(1000) && id("fun.kitsunebi.kitsunebi4android:id/add_btn").findOne(1) ){
                    log( "Rule Set Page" )
                    if( is_rule_set ){ 
                        back() 
                        sleep(2000)
                        continue
                    }
                    if( clickIfWidgetExists( id("fun.kitsunebi.kitsunebi4android:id/remark").text("Bypass LAN & Mainland China").findOne(1000) ) ){
                        is_rule_set = true
                        log( "代理规则: " + "Bypass LAN & Mainland China" )
                        sleep(1000)
                        back()
                        sleep(2000)
                        continue
                    }
                    clickIfWidgetClickable( id("fun.kitsunebi.kitsunebi4android:id/add_btn").findOne(2000) )
                    sleep(1000)                
                    clickIfWidgetExists( text("New Bypass LAN & Mainland China").findOne(2000) )
                    sleep(1000)
                }
                //  Add Endpoint 页
                else if( className("android.widget.TextView").text("Add Endpoint").findOne(1000) && id("fun.kitsunebi.kitsunebi4android:id/save_btn").findOne(1) ){
                    try {
                        is_proxy_set = false
                        log( "新增节点" )
                        id("fun.kitsunebi.kitsunebi4android:id/text_input_remark").findOne(1000).setText( server_name ) && toastLog( "输入: " + server_name )
                        sleep(1000)
                        clickIfWidgetExists( id("android:id/text1").findOne(1000) )
                        sleep(1000)
                        clickIfWidgetExists( text("socks").findOne(1000) )
                        sleep(1000)
                        try {
                            id("fun.kitsunebi.kitsunebi4android:id/socks_address").findOne(1000).child(0).child(0).setText( server_address ) && toastLog( "输入: " + server_address )
                            sleep(1000)
                            id("fun.kitsunebi.kitsunebi4android:id/socks_port").findOne(1000).child(0).child(0).setText( server_port ) && toastLog( "输入: " + server_port )
                            sleep(1000)
                            id("fun.kitsunebi.kitsunebi4android:id/socks_user").findOne(1000).child(0).child(0).setText( username ) && toastLog( "输入: " + username )
                            sleep(1000)
                            id("fun.kitsunebi.kitsunebi4android:id/socks_password").findOne(1000).child(0).child(0).setText( password ) && toastLog( "输入: " + password )
                            sleep(1000)                            
                        } catch (error) {
                            // 01:24:23.124/D:       2 Rect(42, 655 - 1038, 796) null android.widget.EditText - Address - null - false - false - true - true
                            // 01:24:23.128/D:       2 Rect(42, 810 - 1038, 951) null android.widget.EditText - Port - null - false - false - true - true
                            // 01:24:23.132/D:       2 Rect(42, 965 - 1038, 1106) null android.widget.EditText - User - null - false - false - true - true
                            // 01:24:23.136/D:       2 Rect(42, 1120 - 1038, 1261) null android.widget.EditText - Password - null - false - false - true - true
                            className("android.widget.EditText").text("Address").findOne(1000).setText( server_address ) && toastLog( "输入: " + server_address )
                            sleep(1000)
                            className("android.widget.EditText").text("Port").findOne(1000).setText( server_port ) && toastLog( "输入: " + server_port )
                            sleep(1000)
                            className("android.widget.EditText").text("User").findOne(1000).setText( username ) && toastLog( "输入: " + username )
                            sleep(1000)
                            className("android.widget.EditText").text("Password").findOne(1000).setText( password ) && toastLog( "输入: " + password )
                            sleep(1000)
                        }

                        is_proxy_set = clickIfWidgetClickable( id("fun.kitsunebi.kitsunebi4android:id/save_btn").findOne(1000) )
                        log( "保存节点: " + is_proxy_set + " - " + server_name )
                        // sleep(2000)
                    } catch (error) {
                        log( "新增节点异常: " + JSON.stringify( error ) )
                        back()
                    }
                    !className("android.widget.TextView").text("Kitsunebi").findOne(3000) && back()
                    // sleep(600)
                }                
                else{ is_unknow_page = true; not_found_count++ }
                
                if( is_unknow_page && not_found_count%2 == 0 ){
                    not_found_count = 0
                    log( "unknow page" )
                    err_msg = "界面异常"
                    back()
                    sleep(3000)
                }
                sleep(2000)
            }
        },false,1000*60*2,()=>{ throw err_msg ? err_msg : "超时退出" + currentActivity() })
    } catch (error) { throw "代理设置失败: " + commonFunc.objectToString(error) }
    return is_proxy_ready
}
/**
 * 
 * @param {*} url 
 * @returns 
 */
 proxySttings.v2rayInstall = function( url ){
    if( !app.getAppName("com.v2ray.ang") ){ 
        if( !httpUtilFunc.downloadFile( url, "/storage/emulated/obb/com.v2ray.ang_2000426.apk", 1000*60*2, false ) ||  !commonFunc.installApk( "/storage/emulated/obb/com.v2ray.ang_2000426.apk", 1000*60*2 ) ){ 
            return false
        }
    }
    return true
}
/**
 * 
 * @returns 
 */
proxySttings.v2rayUninstall = function(  ){
    return commonFunc.uninstallApp("com.v2ray.ang")
}
/**
 * 
 * @param {String} proxy_info 代理信息, 字符串模板: proxyType,server,port,username,password; 举例: SOCKS5,47.86.113.126,24001,user001,psw001
 * @param {Boolean} force_update 是否重新连接, true-强制重连, 断开当前连接, 并重新配置代理
 */
proxySttings.v2raySetup = function(proxy_info, force_update, timeout){
    let server_name = null
    let server_address = null
    let server_port = null
    let server_type = null
    let username = null
    let password = null

    try {
        let _split = proxy_info.split( "," )
        server_type     = _split[0]
        server_address  = _split[1]
        server_port     = _split[2]
        username        = _split.length > 3 ? _split[3]: ""
        password        = _split.length > 4 ? _split[4]: ""
        server_name     = proxy_info
        // if( !new RegExp(/\d+\.\d+\.\d+\.\d+/).test( server_address ) ){ throw "" }
        if( !server_address ){ throw "" }
        if( !new RegExp(/^\d+$/).test( server_port ) ){ throw "" }
        // if( !( new RegExp(/HTTPS/i).test( server_type ) || new RegExp(/SOCKS5/i).test( server_type ) ) ){ throw "" }
    } catch (error) {
        // log( "代理 参数异常" + JSON.stringify(error) )
        // return false
        throw "代理 参数异常" + commonFunc.objectToString(error)
    }
    let proxy_bid = "com.v2ray.ang"
    if( !app.getAppName(proxy_bid) ){ throw "未安装 "+ proxy_bid }
    try { shell("pm enable --user " + commonFunc.userId + " " + proxy_bid) } catch (error) { }
    sleep(3000)
    timeout = typeof(timeout) == "number" ? timeout : 1000*60*2

    let err_msg = null
    let is_proxy_set = false
    let is_rule_set = false
    let is_proxy_ready = false
    try {
        is_proxy_ready = newThread(function() {
            while( true ){                
                if( !packageName(proxy_bid).findOne(1) ){
                    home()
                    sleep(1000)
                    log( "launching " + proxy_bid )
                    launch(proxy_bid)
                    sleep(3000)
                }

                //  首页
                // if( className("android.widget.TextView").text("Configuration file").findOne(1000) && className("android.widget.TextView").desc("Add config").findOne(1) ){
                if( id("com.v2ray.ang:id/tv_test_state").visibleToUser().findOne(3000) ){
                    if( !force_update ){  
                        is_proxy_set = true
                    }
                    if( !is_proxy_set ){
                        //  清空现有节点列表
                        let config_list = id("com.v2ray.ang:id/layout_remove").find()
                        config_list.forEach(element => {
                            clickIfWidgetClickable( element )
                            sleep(2000)
                        });

                        //  添加新的节点
                        clickIfWidgetClickable( desc("Add config").findOne(2000) )
                        sleep(3000)
                        commonFunc.clickIfParentsClickable( text("Type manually[Socks]").visibleToUser().findOne(1000) )
                        sleep(3000)
                        // clickIfWidgetExists( text("Manual").findOne(1000) )
                        // sleep(3000)  

                    }
                    // else 
                    // if( !is_rule_set ){
                    //     toastLog("添加规则")
                    //     clickIfWidgetClickable( id("fun.kitsunebi.kitsunebi4android:id/add_btn").findOne(2000) )
                    //     sleep(3000)
                    //     clickIfWidgetExists( text("Rule Set").findOne(2000) )
                    //     sleep(3000)
                        
                    // }
                    else{
                        if( !clickIfWidgetExists( text(server_name).findOne(1000) ) ){
                            is_proxy_set = false
                            force_update = true
                            toastLog("查找节点: " + server_name )
                            continue
                        }

                        let test_status = null

                        for (let index = 0; index < 5; index++) {
                            clickIfWidgetExists( text(server_name).findOne(1000) ) 
                            sleep(3000)
                            log( "点击测试: " + clickIfWidgetClickable( id("com.v2ray.ang:id/layout_test").clickable().findOne(3000) ) )
                            sleep(10000)
                            try{ test_status = id("com.v2ray.ang:id/tv_test_state").findOne(5000).text() } catch (error) { }
                            if( !test_status ){ back(); continue }
                            log(test_status)
                            // if( test_status.match("Connected.*")){
                            //     // log( "点击测试: " + clickIfWidgetClickable( id("com.v2ray.ang:id/layout_test").clickable().findOne(3000) ) )
                            //     log( "点击测试: " + clickIfWidgetClickable( id("com.v2ray.ang:id/layout_test").clickable().findOne(3000) ) )
                            //     sleep(10000)
                            // }
                            // else 
                            if( test_status.match("Success.*")){
                                return true
                            }
                            else if( test_status.match("Not connected.*")){                                
                                log( "点击启动: " + clickIfWidgetClickable( id("com.v2ray.ang:id/fab").className("android.widget.ImageButton").clickable().findOne(3000) ) )
                                sleep(3000)
                                clickIfWidgetClickable( text("OK").findOne(1000) )
                                sleep(3000)
                            }
                            else if( test_status.match("Testing.*")){                                
                                sleep(5000)
                            }
                            else{
                                err_msg = test_status
                                log( "点击测试: " + clickIfWidgetClickable( id("com.v2ray.ang:id/layout_test").clickable().findOne(3000) ) )
                                sleep(10000)
                            }
                            
                            // else if( test_status.text() == "Success: HTTP connection took 1026ms" ){ }                            
                            sleep(3000)
                        }
                    }
                } 
                else if( id("com.v2ray.ang:id/et_address").findOne(1) ){
                    try {
                        is_proxy_set = false
                        log( "新增节点" )
                        id("com.v2ray.ang:id/et_remarks").findOne(1000).setText( server_name ) && toastLog( "输入: " + server_name )
                        sleep(1000)
                        // clickIfWidgetExists( id("android:id/text1").findOne(1000) )
                        // sleep(1000)
                        // clickIfWidgetExists( text("socks").findOne(1000) )
                        // sleep(1000)
                        id("com.v2ray.ang:id/et_address").findOne(1000).setText( server_address ) && toastLog( "输入: " + server_address )
                        sleep(1000)
                        id("com.v2ray.ang:id/et_port").findOne(1000).setText( server_port ) && toastLog( "输入: " + server_port )
                        sleep(1000)
                        id("com.v2ray.ang:id/et_security").findOne(1000).setText( username ) && toastLog( "输入: " + username )
                        sleep(1000)
                        id("com.v2ray.ang:id/et_id").findOne(1000).setText( password ) && toastLog( "输入: " + password )
                        sleep(1000)
                        is_proxy_set = clickIfWidgetClickable( id("com.v2ray.ang:id/save_config").findOne(2000) )
                        log( "保存节点: " + is_proxy_set + " - " + server_name )
                        // sleep(2000)
                    } catch (error) {
                        log( "新增节点异常: " + commonFunc.objectToString( error ) )
                        back()
                    }
                    !id("com.v2ray.ang:id/tv_test_state").visibleToUser().findOne(3000) && back()
                    // sleep(600)
                }
                else if( proxySttings.isOtherPage() ){}
                else{
                    log( "unknow page" )
                    back()
                    sleep(3000)
                }
                sleep(1000)
            }
        },false,timeout,()=>{ throw "超时退出 " + err_msg + " " + currentActivity() })        
    } catch (error) { throw "代理设置失败: " + commonFunc.objectToString(error) }
    return is_proxy_ready
}
module.exports = proxySttings;