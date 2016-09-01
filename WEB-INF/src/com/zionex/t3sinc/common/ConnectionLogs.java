/*
 * Created on 2006-07-25 17:50 
 * Altered on 2007-11-28 14:36 
 * Altered on 2008-06-09 16:49
 * 		: Add Error Log Method
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.zionex.t3sinc.common;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.*;
import java.sql.ResultSet;
import com.zionex.t3sinc.util.db.SincDatabaseUtility;

public class ConnectionLogs {
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;	
	String 		sqlid 	= null;
	Map sessionMap 	= new HashMap();
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility(); 
	
	/**
	 * UI Connection LOG
	 * @param login_id
	 * @param service_id
	 * @param connection_ip
	 * @return
	 */
	public String insertLogs(String login_id, String service_id, String connection_ip) {
		
		String returnVal = null; 
	    System.out.println("login_id_:_" + login_id + "_::_service_id_:_" + service_id + "_::_connection_ip_:_" + connection_ip); 
	    Map parameterMap = new HashMap(); 
	    parameterMap.put("login_id", login_id); 
	    parameterMap.put("service_id", service_id); 
	    parameterMap.put("connection_ip", connection_ip); 
	    String queryId = "insert_connection_logs"; 
	    try {
	    	conn = databaseUtility.getConnection("t3sinc");
	    	stmt = conn.createStatement();
			System.out.println(databaseUtility.getQueryString(queryId, parameterMap));
		    databaseUtility.executeUpdate(stmt, queryId, parameterMap);
			
	    }catch(SQLException e){
	        e.printStackTrace(); 
	        returnVal = e.toString(); 
	    } finally {
			// ERROR CHECK END 
			databaseUtility.close(conn, stmt); 
		}
	    returnVal = "Success"; 
		return returnVal; 
	}
	
	/**
	 * Error LOG
	 * @param login_id
	 * @param service_id
	 * @param connection_ip
	 * @param err_msg
	 * @return
	 */
	public String insertLogsErr(String login_id, String service_id, String connection_ip, String err_msg, String err_detail) {
		
		String returnVal = null; 
	    System.out.println("login_id_:_" + login_id + "_::_service_id_:_" + service_id
	    					+ "_::_connection_ip_:_" + connection_ip + "_::_err_msg_:_" + err_msg + "_::_err_detail_:_" + err_detail);
	    Map parameterMap = new HashMap();
	    parameterMap.put("login_id", login_id);
	    parameterMap.put("service_id", service_id);
	    parameterMap.put("connection_ip", connection_ip);
	    parameterMap.put("err_msg", err_msg);
	    parameterMap.put("err_detail", err_detail);
	    String queryId = "insert_connection_logs_err"; 
	    try {
	    	conn = databaseUtility.getConnection("t3sinc");
	    	stmt = conn.createStatement();
			System.out.println(databaseUtility.getQueryString(queryId, parameterMap));
		    databaseUtility.executeUpdate(stmt, queryId, parameterMap); 
			
	    }catch(SQLException e){
	        e.printStackTrace(); 
	        returnVal = e.toString(); 
	    } finally {
			// ERROR CHECK END 
			databaseUtility.close(conn, stmt); 
		}
	    returnVal = "Success"; 
		return returnVal; 
	}
	
	/**
	 * error.vm 에서 Exception 을 받아서 StackTraceElement[] 로 반환
	 * @param err_obj
	 * @return
	 */
	public StackTraceElement[] getExceptionList( Exception err_obj ) {
		
		StackTraceElement[] ste = err_obj.getStackTrace();
		return ste;
		
	}
	
	/**
	 * 
	 * @param args
	 * 
	 * Main Method()
	 */
	public static void main(String[] args) {
	    ConnectionLogs connLogs = new ConnectionLogs();
		System.out.println("___ConnectionLogs_Class___"); 

	}
}
