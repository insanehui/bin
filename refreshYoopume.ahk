SetWorkingDir %A_ScriptDir%
WinActivate ahk_exe chrome.exe

; 等待
WinWait ahk_exe chrome.exe

; 最大化（当然活动窗口）
WinMaximize

ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, 有谱么.bmp

if (ErrorLevel = 2) {
}
else if (ErrorLevel = 1) {
}
else {
  ; 点击
  MouseClick, , FoundX+72, FoundY+82
}

WinWait 打开
Sleep 1000
Send %1%
Sleep 1200
Send {Enter}

;Sleep 1500
;Send {F5}

; 
; ; 移回页面视图
; ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, yemianshitu.bmp
; MouseClick, , FoundX, FoundY
; 
