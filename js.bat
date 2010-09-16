:: This script checks for arguments, if they don't exist it opens the Rhino dialog
:: if arguments do exist, it loads the script in the first argument and passes the other arguments to the script
:: ie: js jmvc\script\controller Todo
@echo off
SETLOCAL ENABLEDELAYEDEXPANSION
if "%1"=="" (
	java -cp jmvc\rhino\selenium-java-client-driver.jar;jmvc\rhino\js.jar org.mozilla.javascript.tools.shell.Main
	GOTO END
)
if "%1"=="-h" GOTO PRINT_HELP
if "%1"=="-?" GOTO PRINT_HELP
if "%1"=="--help" GOTO PRINT_HELP

if "%1"=="-d" (
	java -classpath jmvc\rhino\selenium-java-client-driver.jar;jmvc/rhino/js.jar org.mozilla.javascript.tools.debugger.Main
	GOTO END
)
if "%1"=="-selenium" (
	java -jar jmvc\rhino\selenium-server.jar
	GOTO END
)
SET ARGS=[
SET FILENAME=%1
SET FILENAME=%FILENAME:\=/%
::haven't seen any way to loop through all args yet, so for now this goes through arg 2-7
for /f "tokens=2,3,4,5,6,7 delims= " %%a in ("%*") do SET ARGS=!ARGS!'%%a','%%b','%%c','%%d','%%e','%%f'
::remove the commas
for %%a in (",''=") do ( call set ARGS=%%ARGS:%%~a%% )
::remove the spaces
for /f "tokens=1*" %%A in ("%ARGS%") do SET ARGS=%%A
SET ARGS=%ARGS%]
java -cp jmvc\rhino\selenium-java-client-driver.jar;jmvc\rhino\js.jar org.mozilla.javascript.tools.shell.Main -e _args=%ARGS% -e load('%FILENAME%')

GOTO END

:PRINT_HELP
echo Load a command line Rhino JavaScript environment or run JavaScript script files in Rhino.
echo Available commands:
echo js				Opens a command line JavaScript environment
echo js	-d			Opens the Rhino debugger
echo js -selenium   Starts selenium server
echo js [FILE]			Runs FILE in the Rhino environment

echo JavaScriptMVC script usage:
echo js jmvc/generate/app [NAME]	Creates a new JavaScriptMVC application
echo js jmvc/generate/page [APP] [PAGE]	Generates a page for the application
echo js jmvc/generate/controller [NAME]	Generates a Controller file
echo js jmvc/generate/model [TYPE] [NAME]	Generates a Model file
echo js apps/[NAME]/compress.js	Compress your application and generate documentation

:END