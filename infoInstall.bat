@echo off

echo Create watch dog schedule...

REM SCHTASKS /CREATE /TN "NBWatchDog" /TR "C:\NBWatchDog\info.vbs" /SC ONLOGON /IT
SCHTASKS /DELETE /TN "NBWatchDog"
SCHTASKS /CREATE /SC minute /MO 10 /TN "NBWatchDog" /TR "C:\NBWatchDog\info.vbs"

echo Done.
PAUSE