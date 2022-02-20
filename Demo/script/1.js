

function URIUtils_uriToFile(uri) { //Source : https://www.cnblogs.com/panhouye/archive/2017/04/23/6751710.html
    var r = null,
        cursor, column_index, selection = null,
        selectionArgs = null,
        isKitKat = android.os.Build.VERSION.SDK_INT >= 19,
        docs;
    if (uri.getScheme().equalsIgnoreCase("content")) {
        if (isKitKat && android.provider.DocumentsContract.isDocumentUri(activity, uri)) {
            if (String(uri.getAuthority()) == "com.android.externalstorage.documents") {
                docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                if (docs[0] == "primary") {
                    return android.os.Environment.getExternalStorageDirectory() + "/" + docs[1];
                }
            } else if (String(uri.getAuthority()) == "com.android.providers.downloads.documents") {
                uri = android.content.ContentUris.withAppendedId(
                    android.net.Uri.parse("content://downloads/public_downloads"),
                    parseInt(android.provider.DocumentsContract.getDocumentId(uri))
                );
            } else if (String(uri.getAuthority()) == "com.android.providers.media.documents") {
                docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                if (docs[0] == "image") {
                    uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if (docs[0] == "video") {
                    uri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if (docs[0] == "audio") {
                    uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }
                selection = "_id=?";
                selectionArgs = [docs[1]];
            }
        }
        try {
            cursor = activity.getContentResolver().query(uri, ["_data"], selection, selectionArgs, null);
            if (cursor && cursor.moveToFirst()) {
                r = String(cursor.getString(cursor.getColumnIndexOrThrow("_data")));
            }
        } catch (e) {
            log(e)
        }
        if (cursor) cursor.close();
        return r;
    } else if (uri.getScheme().equalsIgnoreCase("file")) {
        return String(uri.getPath());
    }
    return null;
}
function startChooseFile(mimeType, callback, Type) {
    var i = new android.content.Intent(android.content.Intent.ACTION_GET_CONTENT);
    i.setType(mimeType);
    ResultIntent.startActivityForResult(i, function (resultCode, data) {
        if (resultCode != activity.RESULT_OK) return;
        let fileurlselect = URIUtils_uriToFile(data.getData());
        if (fileurlselect != null && fileurlselect != undefined && Type == "选择底图") {
            if (context_DayOrNight == 0) {
                setStorageData("NightUiPicture", "BottomPics", "file://" + fileurlselect);
                delStorageData("NightUiPicture", "BottomPicsCopyright");
                context_BottomPics = "file://" + fileurlselect;
                context_BottomPics_Copyright = "";
            } else if (context_DayOrNight == 1) {
                setStorageData("DayUiPicture", "BottomPics", "file://" + fileurlselect);
                delStorageData("DayUiPicture", "BottomPicsCopyright");
                context_BottomPics = "file://" + fileurlselect;
                context_BottomPics_Copyright = "";
            }
            let view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <text text="已将您的本地图片设为底图" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                </vertical>
            );
            dialogs.build({
                customView: view,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
            SettingsUI();
        } else if (fileurlselect != null && fileurlselect != undefined && Type == "选择顶图") {
            if (context_DayOrNight == 0) {
                setStorageData("NightUiPicture", "TopPics", "file://" + fileurlselect);
                delStorageData("NightUiPicture", "TopPicsCopyright");
                context_TopPics = "file://" + fileurlselect;
                context_TopPics_Copyright = "";
            } else if (context_DayOrNight == 1) {
                setStorageData("DayUiPicture", "TopPics", "file://" + fileurlselect);
                delStorageData("DayUiPicture", "TopPicsCopyright");
                context_TopPics = "file://" + fileurlselect;
                context_TopPics_Copyright = "";
            }
            let view = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <text text="已将您的本地图片设为顶图" textStyle="bold" textSize="15" margin="10" textColor="#777777" gravity="center" />
                </vertical>
            );
            dialogs.build({
                customView: view,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
            SettingsUI();
        }
    });
}
function shareFile(file, type) {
    importPackage(android.content);
    importClass(android.net.Uri);
    importClass(java.io.File);
    importClass(android.provider.MediaStore);
    let f = new File(file);
    let uri = Uri.fromFile(f);
    let fp = app.parseUri(uri.toString());
    let intent = new Intent("android.intent.action.SEND");
    intent.setType(type);
    intent.putExtra(Intent.EXTRA_STREAM, uri);
    intent.setClipData(ClipData.newRawUri(MediaStore.EXTRA_OUTPUT, fp));
    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(intent);
}
function imgDownLoad(imgUrl, imgSavePath, WhatIsThis, PicCopyright) {
    let view = ui.inflate(
        <vertical padding="25 0" bg="{{context_framebg}}">
            <linear orientation="horizontal" gravity="left" marginTop="10">
                <img src="@drawable/ic_get_app_black_48dp" tint="{{context_textColor}}" h="30" layout_gravity="center" />
                <text text="正在下载图片……" textStyle="bold" textSize="20" textColor="{{context_textColor}}" layout_gravity="center" />
            </linear>
            <text id="tip" textSize="10" margin="10 5 10 5" textColor="{{context_textColor}}" alpha="0.8" />
            <progressbar id="loading" indeterminate="true" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" />
            <linear orientation="horizontal" gravity="center||right" margin="0 5 10 10">
                <text id="exit" text="取消" textStyle="bold" textColor="{{context_textColor}}" textSize="16sp" gravity="center" margin="10 0" foreground="?attr/selectableItemBackground" clickable="true" />
            </linear>
        </vertical>, null, false);

    context_imgDownloadDHK = dialogs.build({
        customView: view,
        wrapInScrollView: false,
        autoDismiss: false,
        cancelable: false
    }).show();
    view.tip.setText("图片链接：" + imgUrl);
    view.exit.click(() => {
        context_imgDownloadDHK.dismiss();
        events.broadcast.emit('imgSetOk', '用户取消');
        exit();
    });

    var Downloadimgthread = threads.start(function () {
        try {
            let res = http.get(imgUrl, {
                headers: {
                    'Accept-Language': 'en-us,en;q=0.5',
                    'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
                }
            });
            if (res.statusCode == 200) {
                files.createWithDirs(imgSavePath);
                files.writeBytes(imgSavePath, res.body.bytes());
                if (WhatIsThis == "底图") {
                    if (context_DayOrNight == 0) {
                        setStorageData("NightUiPicture", "BottomPics", "file:///storage/emulated/0/RanyongJs/主界面示例图片/夜间示例底图.png");
                        if (PicCopyright != undefined) {
                            setStorageData("NightUiPicture", "BottomPicsCopyright", PicCopyright);
                            context_BottomPics_Copyright = PicCopyright;
                        } else {
                            delStorageData("DayUiPicture", "BottomPicsCopyright");
                            context_BottomPics_Copyright = "";
                        }
                        context_BottomPics = "file:///storage/emulated/0/RanyongJs/主界面示例图片/夜间示例底图.png"
                    } else if (context_DayOrNight == 1) {
                        setStorageData("DayUiPicture", "BottomPics", "file:///storage/emulated/0/RanyongJs/主界面示例图片/示例底图.png");
                        if (PicCopyright != undefined) {
                            setStorageData("DayUiPicture", "BottomPicsCopyright", PicCopyright);
                            context_BottomPics_Copyright = PicCopyright;
                        } else {
                            delStorageData("DayUiPicture", "BottomPicsCopyright");
                            context_BottomPics_Copyright = "";
                        }
                        context_BottomPics = "file:///storage/emulated/0/RanyongJs/主界面示例图片/示例底图.png";
                    }
                } else if (WhatIsThis == "顶图") {
                    if (context_DayOrNight == 0) {
                        setStorageData("NightUiPicture", "TopPics", "file:///storage/emulated/0/RanyongJs/主界面示例图片/夜间示例顶图.png");
                        if (PicCopyright != undefined) {
                            setStorageData("NightUiPicture", "TopPicsCopyright", PicCopyright);
                            context_TopPics_Copyright = PicCopyright;
                        } else {
                            setStorageData("NightUiPicture", "TopPicsCopyright", "");
                            context_TopPics_Copyright = "";
                        }
                        context_TopPics = "file:///storage/emulated/0/RanyongJs/主界面示例图片/夜间示例顶图.png"
                    } else if (context_DayOrNight == 1) {
                        setStorageData("DayUiPicture", "TopPics", "file:///storage/emulated/0/RanyongJs/主界面示例图片/https://gitee.com/mirrors_Orange-shirt/OrangeJs/raw/master/%E5%9B%BE%E7%89%87%E7%9B%B4%E9%93%BE/PicsArt_05-04-10.09.31.jpg.png");
                        if (PicCopyright != undefined) {
                            setStorageData("DayUiPicture", "TopPicsCopyright", PicCopyright);
                            context_TopPics_Copyright = PicCopyright;
                        } else {
                            setStorageData("DayUiPicture", "TopPicsCopyright", "");
                            context_TopPics_Copyright = "";
                        }
                        context_TopPics = "file:///storage/emulated/0/RanyongJs/主界面示例图片/https://gitee.com/mirrors_Orange-shirt/OrangeJs/raw/master/%E5%9B%BE%E7%89%87%E7%9B%B4%E9%93%BE/PicsArt_05-04-10.09.31.jpg.png";
                    }
                }
                context_imgDownloadDHK.dismiss();
                let views = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <linear orientation="horizontal" gravity="left" marginTop="10">
                            <img src="@drawable/ic_offline_pin_black_48dp" tint="{{context_textColor}}" h="30" layout_gravity="center" />
                            <text id="title" textStyle="bold" textSize="20" textColor="{{context_textColor}}" layout_gravity="center" />
                        </linear>
                        <text id="tip" textSize="10" margin="10 5 10 5" textColor="{{context_textColor}}" alpha="0.8" />
                    </vertical>, null, false);
                views.title.setText("图片下载完成&设置成功");
                views.tip.setText("图片下载成功并已设置为主界面“" + WhatIsThis + "”");
                dialogs.build({
                    customView: views,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
                events.broadcast.emit('imgSetOk', '图片下载完成&设置成功')
                exit();
            } else {
                context_imgDownloadDHK.dismiss();
                let views = ui.inflate(
                    <vertical padding="25 0" bg="{{context_framebg}}">
                        <linear orientation="horizontal" gravity="left" marginTop="10">
                            <img src="@drawable/ic_cancel_black_48dp" tint="{{context_textColor}}" h="30" layout_gravity="center" />
                            <text text="图片下载失败" textStyle="bold" textSize="20" textColor="{{context_textColor}}" layout_gravity="center" />
                        </linear>
                        <text id="tip" textSize="10" margin="10 5 10 5" textColor="{{context_textColor}}" alpha="0.8" />
                    </vertical>, null, false);
                views.tip.setText("该图片不存在或者该图片无法解码，请检查后重试\nHTTP状态码：" + res.statusCode + res.statusMessage + "\n图片链接：" + imgUrl);
                dialogs.build({
                    customView: views,
                    wrapInScrollView: false,
                    autoDismiss: false
                }).show();
                events.broadcast.emit('imgSetOk', '图片下载失败')
                exit();
            }
        } catch (e) {
            context_imgDownloadDHK.dismiss();
            let views = ui.inflate(
                <vertical padding="25 0" bg="{{context_framebg}}">
                    <linear orientation="horizontal" gravity="left" marginTop="10">
                        <img src="@drawable/ic_cancel_black_48dp" tint="{{context_textColor}}" h="30" layout_gravity="center" />
                        <text text="网络连接错误" textStyle="bold" textSize="20" textColor="{{context_textColor}}" layout_gravity="center" />
                    </linear>
                    <text id="tip" textSize="10" margin="10 5 10 5" textColor="{{context_textColor}}" alpha="0.8" />
                </vertical>, null, false);
            views.tip.setText("当前网络错误，请检查后重试\n错误代码：" + e);
            log("下载错误--->", e)
            dialogs.build({
                customView: views,
                wrapInScrollView: false,
                autoDismiss: false
            }).show();
            events.broadcast.emit('imgSetOk', '网络连接错误');
            exit();
        }
    });
    setTimeout(function () {
        context_imgDownloadDHK.dismiss();
        let views = ui.inflate(
            <vertical padding="25 0" bg="{{context_framebg}}">
                <linear orientation="horizontal" gravity="left" marginTop="10">
                    <img src="@drawable/ic_cancel_black_48dp" tint="{{context_textColor}}" h="30" layout_gravity="center" />
                    <text text="图片下载超时" textStyle="bold" textSize="20" textColor="{{context_textColor}}" layout_gravity="center" />
                </linear>
                <text id="tip" textSize="10" margin="10 5 10 5" textColor="{{context_textColor}}" alpha="0.8" />
            </vertical>, null, false);
        views.tip.setText("这种情况可能是图片过大造成的，若图片过大可更换小体积图片后重试。\n也有可能是您的网络原因所导致，若网络连接错误请检查网络后重试");
        var DHK = dialogs.build({
            customView: views,
            wrapInScrollView: false,
            autoDismiss: true
        }).show();
        Downloadimgthread.interrupt();
        events.broadcast.emit('imgSetOk', '图片下载超时');
        exit();
    }, 20000);
}