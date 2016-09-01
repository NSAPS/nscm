@echo off

echo Copyright (c) 2001-2004 Zionex Corporation. All rights reserved.
echo license seed generator

set LOCALCLASSPATH=./;./license.jar

java -cp "%LOCALCLASSPATH%" com.zionex.license.LicenseSeedGen

