WScript.Sleep 10000

Set WshShell = CreateObject("WScript.Shell")

On Error Resume Next 
WshShell.Run "taskkill /im app.exe", , True
If Err.Number <> 0 Then
  WScript.Echo "Error in DoStep1: " & Err.Description
  Err.Clear
End If

WshShell.Run chr(34) & ".\app.exe" & Chr(34), 0
If Err.Number <> 0 Then
  WScript.Echo "Error in DoStep1: " & Err.Description
  Err.Clear
End If

'If you no longer want to continue following an error after that block's completed,
'call this.
On Error Goto 0

Set WshShell = Nothing