; ˢ�µ�ǰ��gp5�ļ�
SetWorkingDir %A_ScriptDir%

; ָ�������������Ļ������Ĭ��������ڻ����
CoordMode Pixel
CoordMode Mouse

; �ó���Ĵ��ڲ�����Ȼ�����ã�ֱ�ӵ�ͼ���
ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, Gp5Taskbar.bmp

if (ErrorLevel = 2) {
  MsgBox a
}
else if (ErrorLevel = 1) {
  MsgBox b
}
else {
  ; MsgBox %FoundX% %FoundY%
  ; ��� "�ű��༭"
  MouseClick, , FoundX+10, FoundY+10
}

; �Բۣ���������ð�
Sleep 1000
Send !f

