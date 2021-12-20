/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2021-05-10 21:58:26
 * @LastEditTime: 2021-05-17 15:01:13
 */

auto.waitFor();
toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");
// 绿色()
填写页面()
function 绿色() {
    var banner = id("main_banner_image").findOne();
    click(banner.bounds().centerX(), banner.bounds().centerY());
    sleep(1000)
    swipe(567, 1770, 572, 1115, 500)
    sleep(200)
}

function 填写页面() {
    // var 模板视频id = text("模板视频id:").findOne();
    // click(模板视频id.bounds().centerX() - 100, 模板视频id.bounds().centerY() + 60);
    input(2, "834845799333494784");
    sleep(500)
    // var 卡片标题 = text("卡片标题:").findOne();
    // click(卡片标题.bounds().centerX() - 100, 卡片标题.bounds().centerY() + 60);
    input(3, "分享标题");
    sleep(500)
    // var 卡片内容 = text("卡片内容:").findOne();
    // click(卡片内容.bounds().centerX() - 100, 卡片内容.bounds().centerY() + 60);
    input(4, "分享描述");
    sleep(500)
    // var 分享卡片 = text("分享卡片上的封面图:").findOne();
    // click(分享卡片.bounds().centerX() - 100, 分享卡片.bounds().centerY() + 60);
    input(5, "https://image-c.wanyol.com/soloop-bucket/2021/04/22/707999119544680448/834845799333494784.jpg?region=cn-south-1&x-oss-process=image/quality,Q_30/resize,m_afit,w_480");
    sleep(500)
    // var 分享活动 = text("分享活动模板标题:").findOne();
    // click(分享活动.bounds().centerX() - 100, 分享卡片.bounds().centerY() + 60);
    input(6, "模板标题");
    sleep(500)
    // var 分享来源 = text("分享来源:").findOne();
    // click(分享来源.bounds().centerX() - 100, 分享来源.bounds().centerY() + 60);
    input(7, "template");
    sleep(500)
    // var video = text("videoType:").findOne();
    // click(video.bounds().centerX() - 100, video.bounds().centerY() + 60);
    input(8, "2");
    sleep(500)
    // var activity = text("activityId:").findOne();
    // click(activity.bounds().centerX() - 100, activity.bounds().centerY() + 60);
    input(10, "cpc_activity_task_general");
    sleep(500)
    input(11, "18");
    sleep(500)
    input(12, "2");
}
