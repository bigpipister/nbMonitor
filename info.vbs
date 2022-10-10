Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "C:\NBWatchDog"
shell.Run chr(34) & "info.bat" & Chr(34), 0
Set WshShell = Nothing