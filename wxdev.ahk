; ��muse���׵���դ��ͼ
#IfWinActive ahk_exe Muse.exe

; ��������
F1::
  msgbox ctrl+q����ͼƬ��ctrl+p�Զ���·����ctrl+f������ʽ
return

; Ctrl+Q ����ͼƬ
^q:: 
  Send !f{down 2}{enter}
  Send +{tab }1190
  Send +{tab }1586
  Send +{tab 2}C:\Users\guanghui\Documents\museExport\
return

; ctrl+p ��������·��
^p::
  Send C:\Users\guanghui\Documents\docs\temp\filets\msc\TonghuaBook\Vol1
return

; Ctrl+f ������ʽ
^f:: 
  MouseClick, ,26, 60
  sleep 200
  MouseClick, ,109, 312
  sleep 600
  Send C:\Users\guanghui\Documents\�̲�\�̲�.fmt
  Send {Enter}
  sleep 200
  MouseClick, ,228, 390
return

#IfWinActive
