"ui";
importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(java.io.File);
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