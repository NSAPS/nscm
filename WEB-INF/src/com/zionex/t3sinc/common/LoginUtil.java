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

public class LoginUtil {
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;
	String 		sqlid 	= null;
	Map<String, String> parameterMap = null;
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
	
	/**
	 * SSO 에서 SSO ID 가 정상적으로 넘어 왔는지 체크
	 * @param request
	 * @return
	 */
	public static boolean checkSsoId(HttpServletRequest request) {
		
		boolean bool = true;
		
		String sso_id = request.getHeader("iv-user");
		//sso_id = "admin";
		if( sso_id != null && !(sso_id.equals("Unauthenticated")) ) {
			// SSO 로부터 ID 가 넘어왔을 때
			// 처리
			bool = updateSsoId(sso_id);
	        System.out.println("===================================================");
	        System.out.println("ID : " + sso_id);
	        System.out.println("===================================================");
		}
		else {
			bool = false;
	        System.out.println("===================================================");
	        System.out.println("FAIL SSO AUTHENTICATION!!");
	        System.out.println("===================================================");
		}
		
		return bool;
		
	}
	
	/**
	 * SSO ID 가 정상적으로 넘어온 경우 REG_USER.LOGIN_CHECK 에 SSO ID 를 넣어줌
	 * @param sso_id
	 * @return
	 */
	public static boolean updateSsoId(String sso_id) {
		
		Connection conn = null;
		Statement stmt  = null;
		
		String sql = null;
		boolean bool = true;
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method updateSsoId() is called with parameters :: sso_id = " + sso_id);
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "UPDATE REG_USER ";
			sql += "SET LOGIN_CHECK = '" + sso_id + "' ";
			sql += "WHERE USER_ID = '" + sso_id + "' ";
			sql += "AND MADE_TYPE != 'DE' ";
			System.out.println(sql);
			int result = databaseUtility.executeUpdate(stmt, sql);
			
			System.out.println("Query Result::" + Integer.toString(result));
			System.out.println("=====================================================================================================");
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			bool = false;
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt);
		}
						
		return bool; 
		
	}
	
	/**
	 * 로그인 성공 후, REG_USER.LOGIN_CHECK 필드 초기화
	 * @param user_id
	 * @return
	 */
	public static boolean initSsoId(String user_id) {
		
		Connection conn = null;
		Statement stmt  = null;
		
		String sql = null;
		boolean bool = true;
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method initSsoId() is called with parameters :: sso_id = " + user_id);
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "UPDATE REG_USER ";
			sql += "SET LOGIN_CHECK = NULL ";
			sql += "WHERE USER_ID = '" + user_id + "' ";
			sql += "AND MADE_TYPE != 'DE' ";
			System.out.println(sql);
			int result = databaseUtility.executeUpdate(stmt, sql);
			
			System.out.println("Query Result::" + Integer.toString(result));
			System.out.println("=====================================================================================================");
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			bool = false;
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt);
		}
						
		return bool; 
		
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
