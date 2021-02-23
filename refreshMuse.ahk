; 将Muse设为活动窗口
SetWorkingDir %A_ScriptDir%
WinActivate ahk_exe Muse.exe

; 等待
WinWait ahk_exe Muse.exe

; 最大化（当然活动窗口）
WinMaximize

ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, jiaobenbianji.bmp

if (ErrorLevel = 2) {
}
else if (ErrorLevel = 1) {
}
else {
  ; 点击 "脚本编辑"
  MouseClick, , FoundX, FoundY
}

Send !f
sleep 20
MouseClick, ,20, 254
Send !f
sleep 20
MouseClick, ,20, 254

; 移回页面视图
ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, yemianshitu.bmp
MouseClick, , FoundX, FoundY

; sleep 1000
; Send {Enter}
; Send !f{Down 8}
; sleep 1000
; Send {Enter}
; 
; ; 移到 "屏幕视图"
; MouseMove 180,0, ,R
; MouseClick
