/*
 * Created on 2008-07-02 19:50
 * BY KTJ
 * NONGSHIM SCM SYSTEM
 * 보충수송계획(REPLENISHMENTPLANNING) 관련 CLASS
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

public class ReplenishPlan {
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;
	String 		sqlid 	= null;
	Map<String, String> parameterMap = null;
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
    
	/**
	 * dc_id, item_id 로 팔레트 당 박수 수량 구함
	 * @param paramKey
	 * @param paramCode
	 * @param queryId
	 * @return
	 */
	public static String getBoxPerPalet(String dc_id, String item_id, String query_id) {
        
	    Connection conn = null;
        Statement stmt  = null;
        ResultSet rs    = null;
        
        ArrayList<String> arrList = new ArrayList<String>();
        String boxPerPalet = "";
        SincDatabaseUtility databaseUtility = new SincDatabaseUtility();        
        
        System.out.println("getBoxPerPalet :: dc_id = " + dc_id + " : item_id = " + item_id + " : query_id = " + query_id);
        
        try {                           
            conn = databaseUtility.getConnection("t3sinc");
            stmt = conn.createStatement();      

            Map<String, String> parameterMap = new HashMap<String, String>();
            
            parameterMap.put("dc_id", dc_id);
            parameterMap.put("item_id", item_id);
            System.out.println("parameterMap:"+parameterMap);
                
            System.out.println(databaseUtility.getQueryString(query_id, parameterMap));
            rs = databaseUtility.executeQuery(stmt, query_id, parameterMap);

            while (rs.next()) {             
            	boxPerPalet = rs.getString(1);
            }
            
            System.out.println("Query Result:boxPerPalet:" + boxPerPalet);
                                
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
                
        } finally {
            //  ERROR CHECK END 
            databaseUtility.close(conn, stmt, rs);          
        }
                        
        return boxPerPalet; 
        
    }
	
	/**
	 * 사용자가 입력한 input value 로부터 item_id & item_name 조회
	 * @param input_value
	 * @param query_id
	 * @return
	 */
	public static ArrayList<ArrayList<String>> getItemInfo(String dc_id, String input_value, String query_id) {
        
	    Connection conn = null;
        Statement stmt  = null;
        ResultSet rs    = null;
        
        ArrayList<ArrayList<String>> arrList = new ArrayList<ArrayList<String>>();
        SincDatabaseUtility databaseUtility = new SincDatabaseUtility();        
        
        System.out.println("getItemInfo :: dc_id = " + dc_id + " : input_value = " + input_value + " : query_id = " + query_id);
        
        try {                           
            conn = databaseUtility.getConnection("t3sinc");
            stmt = conn.createStatement();      

            Map<String, String> parameterMap = new HashMap<String, String>();
            
            parameterMap.put("dc_id", dc_id);
            parameterMap.put("input_value", input_value);
            System.out.println("parameterMap:"+parameterMap);
                
            System.out.println(databaseUtility.getQueryString(query_id, parameterMap));
            rs = databaseUtility.executeQuery(stmt, query_id, parameterMap);

            while (rs.next()) {
            	ArrayList<String> row = new ArrayList<String>();
            	row.add(rs.getString(1));
            	row.add(rs.getString(2));
            	row.add(rs.getString(3));
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
		
		ReplenishPlan rPlan = new ReplenishPlan();
		System.out.println("___ReplenishPlan_Class___ :: " + rPlan);
		
	}
}
