/*
 * Created on 2006-07-25 17:50 
 * Altered on 2007-11-28 14:37 
 * Altered on 2008-05-21 18:47
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.zionex.t3sinc.common;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Map;
import java.util.HashMap;
import java.util.StringTokenizer;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.zionex.t3sinc.util.db.SincDatabaseUtility;

public class CommonUtil {
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;
	String 		sqlid 	= null;
	Map<String, String> parameterMap = null;
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
	
	/**
	 * paramKey : parameter names
	 * paramCode : parameter values
	 * 코드 입력값으로 부터 코드, 코드 명을 ArrayList<ArrayList<String>> 형태로 반환
	 * @param paramKey
	 * @param paramCode
	 * @param query_id
	 * @return
	 */
	public static ArrayList<ArrayList<String>> getCodeInfo(String paramKey, String paramCode, String query_id) {
        
	    Connection conn = null;
        Statement stmt  = null;
        ResultSet rs    = null;
        
        ArrayList<ArrayList<String>> arrList = new ArrayList<ArrayList<String>>();
        SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
        
        System.out.println("getCodeInfo :: paramKey = " + paramKey + " : paramCode = " + paramCode + " : query_id = " + query_id);

        String[] paramKeyArr = paramKey.split("!%!");
        String[] paramCodeArr = paramCode.split("!%!");
        
        Map<String, String> parameterMap = new HashMap<String, String>();
        int paramCodeLen = paramCodeArr.length;
        
        for (int i = 0; i < paramKeyArr.length; i++) {
            if( i+1 > paramCodeLen )
                parameterMap.put(paramKeyArr[i], "");
            else
                parameterMap.put(paramKeyArr[i], paramCodeArr[i]);
        }
        parameterMap.put(paramKey, paramCode);
        System.out.println("parameterMap:"+parameterMap);
        
        try {                           
            conn = databaseUtility.getConnection("t3sinc");
            stmt = conn.createStatement();      

            System.out.println(databaseUtility.getQueryString(query_id, parameterMap));
            rs = databaseUtility.executeQuery(stmt, query_id, parameterMap);

            while (rs.next()) {
            	ArrayList<String> row = new ArrayList<String>();
            	row.add(rs.getString(1));
            	row.add(rs.getString(2));
            	arrList.add(row);
            }
            
            System.out.println("*Query Result*\n" + arrList);
                                
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
                
        } finally {
            //  ERROR CHECK END 
            databaseUtility.close(conn, stmt, rs);
        }
                        
        return arrList; 
        
    }
    
	/**
	 * code list 를 arrayList 형식으로 반환
	 * @param paramKey
	 * @param paramCode
	 * @param queryId
	 * @return
	 */
	public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId) {
        
	    Connection conn = null;
        Statement stmt  = null;
        ResultSet rs    = null;
        
        ArrayList<String> arrList = new ArrayList<String>();
        String codeName = "";
        SincDatabaseUtility databaseUtility = new SincDatabaseUtility();        
        
        System.out.println("getCodeList"); 
        System.out.println("paramKey:"+paramKey);
        System.out.println("paramCode:"+paramCode);
        System.out.println("queryId:"+queryId);
        
        try {                           
            conn = databaseUtility.getConnection("t3sinc");
            stmt = conn.createStatement();      

            String[] paramKeyArr = paramKey.split("!%!");
            String[] paramCodeArr = paramCode.split("!%!");
            
            System.out.println("paramCodeArr:"+paramCodeArr.toString());
            
            Map<String, String> parameterMap = new HashMap<String, String>();
            
            System.out.println("paramKeyArr.length:"+paramKeyArr.length);
            System.out.println("paramCodeArr.length:"+paramCodeArr.length);
            int paramCodeLen = paramCodeArr.length;
            
            for (int i = 0; i < paramKeyArr.length; i++) {
                if( i+1 > paramCodeLen )
                    parameterMap.put(paramKeyArr[i], "");
                else
                    parameterMap.put(paramKeyArr[i], paramCodeArr[i]);
            }
            parameterMap.put(paramKey, paramCode);
            System.out.println("parameterMap:"+parameterMap);
                
            System.out.println(databaseUtility.getQueryString(queryId, parameterMap));
            rs = databaseUtility.executeQuery(stmt, queryId, parameterMap);

            while (rs.next()) {             
                codeName = rs.getString(1);
                arrList.add(codeName);
            }
            
            System.out.println("Query Result:"+arrList);
                                
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
                
        } finally {
            //  ERROR CHECK END 
            databaseUtility.close(conn, stmt, rs);          
        }
                        
        return arrList; 
        
    }
	
	/**
	 * str 을 delimiter 로 잘라서 arrayList 로 반환
	 * @param str
	 * @param delimiter
	 * @return
	 */
	public static ArrayList<String> getSplit(String str, String delimiter) {
	    
	    ArrayList<String> arrList = new ArrayList<String>();
        
	    if( str.equals("")) {
	        return arrList;
	    }
	    
        // 데이터가 '' 인 경우 오류가 있어서
        // 마지막에 "!%! " (공백) 하나를 추가하고 
        // 마지막 데이터는 리턴하지 않는다
        str += "!%! ";
        
	    String[] strArr = str.split(delimiter);
	    for (int i = 0; i < strArr.length-1; i++) {
	        arrList.add(strArr[i]);
	    }
	    System.out.println("arrList : " + arrList);
	    return arrList;
	    
	}
	
	/**
	 * 콤마 제거
	 * @param str
	 * @return
	 */
	public static String deleteComma(String str){ 
		
		//String after_str = str.replace(",", ""); 
		//System.out.print("__:__" + str + " -> " + after_str); 
		//return after_str;
	    
	    String returnStr = "";
        
        if (str.indexOf(",") != -1){
            String[] arrStr = str.split(",");
        
            for (int i = 0 ; i < arrStr.length ; i++){
                returnStr =returnStr+arrStr[i];
            }
        }else{
          returnStr = str;
        }       
        return returnStr;
		
	} 
	
	/**
	 * % 제거
	 * @param str
	 * @return
	 */
	public String deletePercent(String str){ 
		
		String after_str = str.replace("%", ""); 
		//System.out.print("__:__" + str + " -> " + after_str); 
		return after_str; 
		
	} 
	
	/**
	 * 작은따옴표 삭제 - 이벤트 호출 시 에러 방지
	 * @param str
	 * @return str
	 */
	public String deleteSingleQuotation(String str){		
		
		str = str.replaceAll("'","");
		return str;
		
	}
	
	/**
	 * < ==> &lt;,  > ==> &gt; 로 변경 - 웹 문서에 <table>,<tr>,<td> 등이 포함되어 있을 경우 테이블 깨짐 방지
	 * @param str
	 * @return str
	 */
	public String changeStr(String str){
		
		str = str.replaceAll("<","&lt;");
		str = str.replaceAll(">","&gt;");
		return str;
		
	}
	
	/**
	 * srt 에 포함되는 regEx 를 replaceStr 로 치환
	 * @param str
	 * @param regEx
	 * @param replaceStr
	 * @return
	 */
	public String replaceAll(String str, String regEx, String replaceStr){	
		
		System.out.println(str+"___"+regEx+"___"+replaceStr);
	    return str.replaceAll(regEx, replaceStr);
	    
	}
	
	/**
	 * double quotation 을 &quot; 로 변환 
	 * @param str
	 * @return
	 */
	public static String replaceQuot( String str ) { 
	    
	    System.out.println("INPUT :: " + str);
		
		if( str == null ) {
	        str = ""; 
	    } else {
	        str = str.replaceAll("\\\"", "&quot;");
	    }

	    System.out.println("OUTPUT :: " + str);
	    
	    return str; 
	    
	}
	
	/**
	 * String to Uni-Code 
	 * @param str
	 * @return
	 */
	public static String StrtoUni(String str) {
	    
	    String uni = "" ;

		for ( int i = 0 ; i < str.length() ; i++)
		{
			char chr = str.charAt(i) ;
			String hex = Integer.toHexString(chr) ;
			//uni += "%u"+hex ;
			uni += "\\u"+hex ;
		}
		System.out.println(uni); 
		return uni ;
		
	}
	
	/**
	 * Uni-Code to String 
	 * @param uni
	 * @return
	 */
	public static String UnitoStr(String uni){
		
		String str = "" ;
		
		//StringTokenizer str1 = new StringTokenizer(uni,"%u") ;
		StringTokenizer str1 = new StringTokenizer(uni,"\\u") ;
	
		while(str1.hasMoreTokens())
		{
			String str2 = str1.nextToken() ;
			int i = Integer.parseInt(str2,16) ;
			str += (char)i ;
		}
		System.out.println(str); 
		return str ;
		
	}
	
	/**
	 * zLattice 데이터 포맷의 스트링 데이터를 arrayList 로 반환
	 * (일반적인 쿼리 반환 형태)
	 * @param data
	 * @return
	 */
	public ArrayList<ArrayList<String>> setArrayList(String data) { 
	    
	    ArrayList<ArrayList<String>> arrList = new ArrayList<ArrayList<String>>(); 
	    String rows[] = data.split("/%/"); 
	    for( int i = 0 ; i < rows.length ; ++i ) {
	        String cols[] = rows[i].split("!%!"); 
	        ArrayList<String> arrListIn = new ArrayList<String>();
	        for( int j = 0 ; j < cols.length ; ++j ) { 
	            arrListIn.add(cols[j]); 
	        }
	        arrList.add(arrListIn); 
	    }
	    System.out.println(arrList); 
	    return arrList; 
	    
	}
	
	/**
	 * 날짜 계산
	 * dateStr : input date ( yyyyMMdd or yyyy/mm/dd or yyyy-mm-dd ) 
	 * outType : Out Date Format : YYYY/MM/DD or YY/MM/DD or YYYY-MM-DD or YY-MM-DD or MM/DD or MM-DD 
	 * addOpt : YEAR or MONTH or DAY 
	 * addVal : adding amount 
	 * @param dateStr
	 * @param outType
	 * @param addOpt
	 * @param addVal
	 * @return
	 */
	public String toDate(String dateStr, String outType, String addOpt, int addVal) { 
	    
	    // delimiter & year format setting 
	    String delimiter = ""; 
	    char charChecker, beforeChar = ' '; 
	    int i = 0; 
	    int yearOutCnt = 0, monthOutCnt = 0, dayOutCnt = 0; 
	    int yearPosition = 0, monthPosition = 0, dayPosition = 0; 
	    int positionCheck = 0; 
	    outType = outType.toUpperCase().trim(); 
	    for( i = 0; i < outType.length(); ++i )
	    {
	        charChecker = outType.charAt(i); 
	        
	        if( beforeChar != charChecker && ( charChecker == 'Y' || charChecker == 'M' || charChecker == 'D' ) ) 
	            ++positionCheck; 
	        beforeChar = charChecker; 
	        
	        if( charChecker == 'Y' )
	        {
	            ++yearOutCnt;
	            yearPosition = positionCheck; 
	        } 
	        else if( charChecker == 'M' ) 
	        { 
	            ++monthOutCnt;
	            monthPosition = positionCheck; 
	        } 
	        else if( charChecker == 'D' )
	        { 
	            ++dayOutCnt;
	            dayPosition = positionCheck; 
	        } 
	        else if( delimiter == "" ) 
	            delimiter = String.valueOf(charChecker); 
	    }
	    
	    dateStr = dateStr.replaceAll("/", "").replaceAll("-", ""); 
	    int yearInt = Integer.parseInt(dateStr.substring(0, 4)); 
	    int monthInt = Integer.parseInt(dateStr.substring(4, 6)) - 1;
	    int dayInt = Integer.parseInt(dateStr.substring(6, 8)); 
	    Calendar cal = new GregorianCalendar();
	    
	    cal.set(Calendar.YEAR, yearInt);  
	    cal.set(Calendar.MONTH, monthInt); 
	    cal.set(Calendar.DAY_OF_MONTH, dayInt);  
	    
	    if( addOpt.toUpperCase().equals("YEAR") )
	    {
		    cal.add(Calendar.YEAR, addVal); 
	    }
	    else if( addOpt.toUpperCase().equals("MONTH") )
	    {
		    cal.add(Calendar.MONTH, addVal); 
	    }
	    else if( addOpt.toUpperCase().equals("DAY") ) 
	    {
	        cal.add(Calendar.DAY_OF_MONTH, addVal); 
	    }
	    
	    String yearStr = ""; 
	    if( yearOutCnt > 0 && yearOutCnt < 4 )
	        yearStr = Integer.toString(cal.get(Calendar.YEAR)).substring(4 - yearOutCnt, 4); 
	    else 
	        yearStr = Integer.toString(cal.get(Calendar.YEAR)); 
        String monthStr = Integer.toString(cal.get(Calendar.MONTH) + 1); 
        if( monthStr.length() == 1 )
            monthStr = "0" + monthStr; 
        String dayStr = Integer.toString(cal.get(Calendar.DAY_OF_MONTH)); 
        if( dayStr.length() == 1 )
            dayStr = "0" + dayStr; 
        
        dateStr = ""; 
        for( i= 0; i < positionCheck; ++i) 
        {
            if( i == yearPosition - 1 ) 
            {
                if( dateStr.equals("") == true ) 
            	    dateStr = yearStr; 
            	else 
            	    dateStr += delimiter + yearStr; 
            } 
            else if( i == monthPosition - 1 ) 
            { 
                if( dateStr.equals("") == true ) 
            	    dateStr = monthStr; 
            	else 
            	    dateStr += delimiter + monthStr; 
            }
            else if( i == dayPosition - 1 ) 
            { 
                if( dateStr.equals("") == true ) 
            	    dateStr = dayStr; 
            	else 
            	    dateStr += delimiter + dayStr; 
            }
        } 
        
	    return dateStr;
	    
	} 
	
	/**
	 * check_value : 체크할 key 값
	 * query_id : 실행할 query_id : 쿼리에서 체크할 key 변수는 $!{check_value} 로 해야 함 
	 * 쿼리 형태는 결과로 키 값을 count 하는 형태
	 * ex. select count(key_val) from target_table where key_val = '$!{check_value}' 
	 * @param check_value
	 * @param query_id
	 * @return
	 */
    public String checkKeyValue(String check_value, String query_id) {

        String check_count = "";
        
        System.out.println("___KeyCheck_____checkKeyValue()___");
        System.out.println("check_value_:_" + check_value + "_:_");
        System.out.println("query_id_:_" + query_id + "_:_");
        
        try {
            conn    = databaseUtility.getConnection("t3sinc");
            stmt 	= conn.createStatement();
            
            sqlid = query_id; 
            parameterMap = new HashMap<String, String>();    
            
            // 쿼리에서 체크할 key 변수는 $!{check_value} 로 해야 함 
            parameterMap.put("check_value", check_value ); 
                
            rs = databaseUtility.executeQuery(stmt, sqlid, parameterMap);
            
            while (rs.next()) {
                    
                System.out.println(parameterMap);
                System.out.println("---Key Check Result---cnt:" + rs.getString(1) ); 
                
                check_count = rs.getString(1); 
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            databaseUtility.close(conn, stmt, rs);              
        }
                        
        return check_count;
        
    } 
    
    /**
     * executeUpdate 실행
     * @param paramKey
     * @param paramCode
     * @param queryId
     * @return
     */
    public String executeQuery(String paramKey, String paramCode, String queryId){
        
    	String returnValue = "SUCCESS";
        try{
            conn = databaseUtility.getConnection("t3sinc");
            stmt = conn.createStatement();
            
            String[] paramKeyArr = paramKey.split("!%!");
            String[] paramCodeArr = paramCode.split("!%!");
            
            System.out.println("paramCodeArr:"+paramCodeArr.toString());
            
            parameterMap = new HashMap<String, String>();
            
            int paramCodeLen = paramCodeArr.length;
            
            for (int i = 0; i < paramKeyArr.length; i++) {
                if( i+1 > paramCodeLen )
                    parameterMap.put(paramKeyArr[i], "");
                else
                    parameterMap.put(paramKeyArr[i], paramCodeArr[i]);
            }
            parameterMap.put(paramKey, paramCode);
            System.out.println("parameterMap:"+parameterMap);
            
            int resultInt = databaseUtility.executeUpdate(stmt, queryId, parameterMap);
            System.out.println("resultInt : " + resultInt);
            
        } catch (SQLException e) {
            e.printStackTrace();
            returnValue = "FAIL";
        } finally {
            databaseUtility.close(conn, stmt, rs);              
        }
        
        return returnValue;
        
    } 
    
    /**
     * parameter 로 넘어온 String 의 길이 반환
     * @param str
     * @return
     */
    public static String getLength(String str) {
        
    	return Integer.toString(str.length());
    	
    }
    
    /**
     * str 의 해당 index character 반환
     * @param str
     * @param idx
     * @return
     */
    public static char getIdxChar(String str, int idx) {
        
        return str.charAt(idx);
        
    }
	
    /**
     * str 의 앞뒤 공백 제거
     * @param str
     * @return
     */
    public static String getStrTrim( String str ) {
        
        return str.trim();
        
    }
    
    /**
     * substr
     * @param str
     * @param from
     * @param to
     * @return
     */
    public static String getSubstr( String str, int from, int to ) {
    	
    	return str.substring(from, to);
    	
    }

    /**
     * SELECT 쿼리 결과 리턴
     * @param paramKey
     * @param paramCode
     * @param query_id
     * @return
     */
	public ArrayList<ArrayList<String>> getSelQeury(String paramKey, String paramCode, String query_id) {
        
	    Connection conn = null;
        Statement stmt  = null;
        ResultSet rs    = null;
        
        ArrayList<ArrayList<String>> arrList = new ArrayList<ArrayList<String>>();
        SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
        
        System.out.println("getCodeInfo :: paramKey = " + paramKey + " : paramCode = " + paramCode + " : query_id = " + query_id);

        String[] paramKeyArr = paramKey.split("!%!");
        String[] paramCodeArr = paramCode.split("!%!");
        
        Map<String, String> parameterMap = new HashMap<String, String>();
        int paramCodeLen = paramCodeArr.length;
        
        for (int i = 0; i < paramKeyArr.length; i++) {
            if( i+1 > paramCodeLen )
                parameterMap.put(paramKeyArr[i], "");
            else
                parameterMap.put(paramKeyArr[i], paramCodeArr[i]);
        }
        parameterMap.put(paramKey, paramCode);
        System.out.println("parameterMap:"+parameterMap);
        
        try {                           
            conn = databaseUtility.getConnection("t3sinc");
            stmt = conn.createStatement();      

            System.out.println(databaseUtility.getQueryString(query_id, parameterMap));
            rs = databaseUtility.executeQuery(stmt, query_id, parameterMap);
            
            int colLen = rs.getMetaData().getColumnCount();
            
            while (rs.next()) {
            	ArrayList<String> row = new ArrayList<String>();
            	for( int i=1 ; i <= colLen ; ++i ) {
            		if( rs.getString(i) == null || rs.getString(i).equals("") ) {
            			row.add("");
            		}
            		else {
            			row.add(rs.getString(i));
            		}
            	}
            	arrList.add(row);
            }
            
            System.out.println("*Query Result*\n" + arrList);
                                
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
                
        } finally {
            //  ERROR CHECK END 
            databaseUtility.close(conn, stmt, rs);          
        }
                        
        return arrList; 
        
    }
	
	/**
	 * 
	 * @param args
	 * 
	 * Main Method()
	 */
	public static void main(String[] args) {
		
		CommonUtil nUtil = new CommonUtil();
		System.out.println("___CommonUtil_Class___ :: " + nUtil);
		
	}
	
}
