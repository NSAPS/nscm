package com.zionex.t3sinc.tsf.tool;

import java.util.ArrayList;   

public class Util { // grild의 data 값을 생성하는 class

	public String makeColumn(ArrayList list) {
		
		String returnStr = "";
		String subList_String="";
 
		for (int i = 0; i < list.size(); i++) {

			ArrayList subList = (ArrayList) list.get(i);

			for (int y = 0; y < subList.size(); y++) {
				subList_String = (String) subList.get(y);
				if(subList_String.equals("Y")){
					subList_String = "삭제";
				} else if(subList_String.equals("N")){
					subList_String = "사용"; 
				}

				if( y != subList.size() -1) returnStr += subList_String  + "!%!";
				else returnStr += subList_String;				
			}

			if( i != list.size() -1) returnStr += "/%/";
		}

		return returnStr;
	}


}
