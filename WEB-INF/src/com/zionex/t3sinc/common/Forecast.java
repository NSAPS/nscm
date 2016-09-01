/*
 * Created on 2008-07-10 19:50
 * BY JJK
 * NONGSHIM SCM SYSTEM
 * 수요예측(FORECAST) 관련 CLASS
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.zionex.t3sinc.common;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.Map;
import java.util.HashMap;
import java.sql.ResultSet;
import java.util.ArrayList;
import com.zionex.t3sinc.util.db.SincDatabaseUtility;

public class Forecast {

	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;
	String 		sqlid 	= null;
	Map<String, String> parameterMap = null;
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
	
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
            conn = databaseUtility.getConnection("fcst");
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
	 * 
	 * @param args
	 * 
	 * Main Method()
	 */
	public static void main(String[] args) {
		
		Forecast fcst = new Forecast();
		System.out.println("___Forecast_Class___ :: " + fcst);
		
	}
}
