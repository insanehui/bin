SetWorkingDir %A_ScriptDir%
WinActivate ahk_exe chrome.exe

; �ȴ�
WinWait ahk_exe chrome.exe

; ��󻯣���Ȼ����ڣ�
WinMaximize

ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, ����ô.bmp

if (ErrorLevel = 2) {
}
else if (ErrorLevel = 1) {
}
else {
  ; ���
  MouseClick, , FoundX+72, FoundY+82
}

WinWait ��
Sleep 1000
Send %1%
Sleep 1200
Send {Enter}

;Sleep 1500
;Send {F5}

; 
; ; �ƻ�ҳ����ͼ
; ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, yemianshitu.bmp
; MouseClick, , FoundX, FoundY
; 