SetWorkingDir %A_ScriptDir%
WinActivate ahk_exe chrome.exe

; 等待
WinWait ahk_exe chrome.exe

; 最大化（当然活动窗口）
WinMaximize

ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, 重新导入.bmp

if (ErrorLevel = 2) {
}
else if (ErrorLevel = 1) {
}
else {
  ; 点击
  MouseClick, , FoundX+10, FoundY+10
}

WinWait 打开
Send 领悟.jcx{Enter}
; 
; ; 移回页面视图
; ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, yemianshitu.bmp
; MouseClick, , FoundX, FoundY
; 
