; 刷新当前的gp5文件
SetWorkingDir %A_ScriptDir%

; 指定这是相对于屏幕，否则默认是相对于活动窗口
CoordMode Pixel
CoordMode Mouse

; 用常规的窗口操作竟然不管用，直接点图标吧
ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, Gp5Taskbar.bmp

if (ErrorLevel = 2) {
  MsgBox a
}
else if (ErrorLevel = 1) {
  MsgBox b
}
else {
  ; MsgBox %FoundX% %FoundY%
  ; 点击 "脚本编辑"
  MouseClick, , FoundX+10, FoundY+10
}

; 卧槽，这个不管用啊
Sleep 1000
Send !f

