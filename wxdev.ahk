; 将muse曲谱导出栅格图
#IfWinActive ahk_exe Muse.exe

; 弹出帮助
F1::
  msgbox ctrl+q导出图片，ctrl+p自动填路径，ctrl+f加载样式
return

; Ctrl+Q 导出图片
^q:: 
  Send !f{down 2}{enter}
  Send +{tab }1190
  Send +{tab }1586
  Send +{tab 2}C:\Users\guanghui\Documents\museExport\
return

; ctrl+p 输入曲谱路径
^p::
  Send C:\Users\guanghui\Documents\docs\temp\filets\msc\TonghuaBook\Vol1
return

; Ctrl+f 加载样式
^f:: 
  MouseClick, ,26, 60
  sleep 200
  MouseClick, ,109, 312
  sleep 600
  Send C:\Users\guanghui\Documents\教材\教材.fmt
  Send {Enter}
  sleep 200
  MouseClick, ,228, 390
return

#IfWinActive
