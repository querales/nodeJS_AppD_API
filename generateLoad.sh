#!/bin/sh
i=0
if [ $# -eq 0 ]; then
	IP=127.0.0.1
	echo "host ip default: " $IP  
else
	echo "host ip: " $1
	IP=$1	
 
fi
while true; do
i=$[$i+1]
echo "i value " $i	
echo "-------------------------"
echo " Generating Load. 1	...     "
echo "-------------------------"
ab  http://127.0.0.1:3000/test?var1=hello&var2=hello2
sleep 10s
#ab  http://127.0.0.1:3000/longLoop
echo "-------------------------"
echo "done!!!!!!               "
echo "-------------------------"
done
