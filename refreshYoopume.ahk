SetWorkingDir %A_ScriptDir%
WinActivate ahk_exe chrome.exe

; �ȴ�
WinWait ahk_exe chrome.exe

; ��󻯣���Ȼ����ڣ�
WinMaximize

ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, ���µ���.bmp

if (ErrorLevel = 2) {
}
else if (ErrorLevel = 1) {
}
else {
  ; ���
  MouseClick, , FoundX+10, FoundY+10
}

WinWait ��
Sleep 900
Send %1%
Sleep 800
Send {Enter}

;Sleep 1500
;Send {F5}

; 
; ; �ƻ�ҳ����ͼ
; ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, yemianshitu.bmp
; MouseClick, , FoundX, FoundY
; 
