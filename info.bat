@echo off
if %os%==Windows_NT goto WINNT
goto NOCON

:WINNT
REM wait 600 sec
timeout /t 600
echo Using a Windows NT based system

echo Getting data [Computer: %computername%]...
echo Please Wait...

REM set variables
set system=
set uploadUrl="http://10.170.182.43/upload"
REM set uploadUrl="http://127.0.0.1/upload"

REM Get Computer Name
FOR /F "tokens=2 delims='='" %%A in ('wmic OS Get csname /value') do SET system=%%A

echo Generate system info: %system%_info.txt
systeminfo /fo csv > %system%_info.txt
echo Upload %system%_info.txt to server
curl -i -X POST -F filedata=@%system%_info.txt %uploadUrl%

echo Generate software info: %system%_product.txt
wmic /output:"%system%_product.txt" product get name,version /format:csv
curl -i -X POST -F filedata=@%system%_product.txt %uploadUrl%
echo Upload %system%_product.txt to server

echo Generate logon info: %system%_logon.txt
echo "last logon info" > %system%_logon.txt
query user >> %system%_logon.txt
REM @For /F Tokens^=2^,4Delims^=^" %%G In ('%__AppDir__%wbem\WMIC.exe UserAccount^
REM Assoc /AssocClass:Win32_NetworkLoginProfile 2^>NUL')Do @For /F %%I In (
REM    '%__AppDir__%wbem\WMIC.exe Path Win32_NetworkLoginProfile Where^
REM     "Name='%%G\\%%H' And LastLogon Is Not Null" Get LastLogon 2^>NUL^
REM     ^|%__AppDir__%findstr.exe "[0123456789]"')Do @Echo %%H , %%~nI >> %system%_logon.txt
curl -i -X POST -F filedata=@%system%_logon.txt %uploadUrl%
echo Upload %system%_logon.txt to server

goto WINNT

:NOCON
echo Error...Invalid Operating System...
echo Error...No actions were made...
goto END

:END
