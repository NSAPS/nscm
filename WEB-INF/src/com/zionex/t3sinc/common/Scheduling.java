/*
 * Created on 2008-07-10 19:50
 * BY JJK
 * NONGSHIM SCM SYSTEM
 * 생산계획(SCHEDULING) 관련 CLASS
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

public class Scheduling {
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;
	String 		sqlid 	= null;
	Map<String, String> parameterMap = null;
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
	
	/**
	 * 입력한 param에 대한 작업장 리스트 조회
	 * @param param
	 * @param plant_id
	 * @param query_id
	 * @return 
	 */
	public static ArrayList<ArrayList<String>> getProcInfo1(String param, String plant_id, String query_id) {
        
	    Connection conn = null;
        Statement stmt  = null;
        ResultSet rs    = null;
        
        ArrayList<ArrayList<String>> arrList = new ArrayList<ArrayList<String>>();
        SincDatabaseUtility databaseUtility = new SincDatabaseUtility();        
        
        System.out.println("getPackingProcInfo :: param = " + param + " : input_value = " + plant_id + " : query_id = " + query_id);
        
        try {                           
            conn = databaseUtility.getConnection("t3sinc");
            
            stmt = conn.createStatement();      

            Map<String, String> parameterMap = new HashMap<String, String>();
            
            parameterMap.put(param, plant_id);
            System.out.println("parameterMap:"+parameterMap);
                
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
	 * 입력한 복수의 param에 대한 작업장 리스트 조회
	 * @param param1
	 * @param plant_id
	 * @param param2
	 * @param line_id
	 * @param query_id
	 * @return 
	 */
	public static ArrayList<ArrayList<String>> getProcInfo2(String param1, String plant_id, String param2, String line_id, String query_id) {
        
	    Connection conn = null;
        Statement stmt  = null;
        ResultSet rs    = null;
        
        ArrayList<ArrayList<String>> arrList = new ArrayList<ArrayList<String>>();
        SincDatabaseUtility databaseUtility = new SincDatabaseUtility();        
        
        System.out.println("getPackingProcInfo :: param1 = " + param1 + " : input_value = " + plant_id + ": param2 = " + param2 + " : input_value = " + line_id + " : query_id = " + query_id);
        
        try {                           
            conn = databaseUtility.getConnection("t3sinc");
            
            stmt = conn.createStatement();      

            Map<String, String> parameterMap = new HashMap<String, String>();
            
            parameterMap.put(param1, plant_id);
            parameterMap.put(param2, line_id);
            System.out.println("parameterMap:"+parameterMap);
                
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
	 * 선택한 대분류에 대한 아이템 리스트 조회
	 * @param param
	 * @param select_ty1
	 * @param query_id
	 * @return 
	 */
	public static ArrayList<ArrayList<String>> getItemList(String param, String select_ty1, String query_id) {
        
	    Connection conn = null;
        Statement stmt  = null;
        ResultSet rs    = null;
        
        ArrayList<ArrayList<String>> arrList = new ArrayList<ArrayList<String>>();
        SincDatabaseUtility databaseUtility = new SincDatabaseUtility();        
        
        System.out.println("getPackingProcInfo :: param = " + param + " : input_value = " + select_ty1 + " : query_id = " + query_id);
        
        try {                           
            conn = databaseUtility.getConnection("t3sinc");
            
            stmt = conn.createStatement();      

            Map<String, String> parameterMap = new HashMap<String, String>();
            
            parameterMap.put(param, select_ty1);
            System.out.println("parameterMap:"+parameterMap);
                
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
	 * 
	 * @param args
	 * 
	 * Main Method()
	 */
	public static void main(String[] args) {
		
		Scheduling sched = new Scheduling();
		System.out.println("___Scheduling_Class___ :: " + sched);
		
	}

}
