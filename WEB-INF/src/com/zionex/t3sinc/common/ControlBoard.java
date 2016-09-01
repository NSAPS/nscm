/*
 * Created on 2008-07-15 15:20
 * BY KTJ
 * NONGSHIM SCM SYSTEM
 * 컨트롤보드(CONTROL BOARD) 관련 CLASS
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
import java.util.Hashtable;
import java.util.ArrayList;
import java.util.Vector;
import java.sql.ResultSet;
import java.net.MalformedURLException;
import java.io.IOException;
import com.zionex.t3sinc.util.db.SincDatabaseUtility;

import org.apache.xmlrpc.XmlRpcClient;
import org.apache.xmlrpc.XmlRpcException;
 
public class ControlBoard {
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;
	String 		sqlid 	= null;
	Map<String, String> parameterMap = null;
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
	
	private static final int SERVICE_LOAD_SCHEDULE_INFO = 0;
	private static final String SELECTED_SCHEDULE_ID = "SELECTED_SCHEDULE_ID";
	private static final String J_PARAMETERS = "jParameters";

	private static final int SERVICE_DO_SCHEDULE = 1;
	private static final String TARGET_SCRIPT = "Target Script";
	
	private static final int SERVICE_SAVE_SCHEDULING_RESULT = 2;
	
	private static int checkStatus = 0; 
	
	/**  
	 * ENGN LOADING...
	 * @param engn_ip
	 * @param period_type
	 * @param cat_id
	 * @param pdb_user
	 * @return
	 */
	public static String execSchLoad(String engn_ip, String period_type, String cat_id, String pdb_user) {
		
		String returnVal = "FAIL";

		System.out.println("=====================================================================================================");
		System.out.println("Method execSchLoad() is called with parameters :: engn_ip = " + engn_ip 
								+ ", period_type = " + period_type + ", cat_id = " + cat_id + ", pdb_user : " + pdb_user);
		System.out.println("=====================================================================================================");
		
		// 유통가공(scm_etc), 반제품(scm_ss)
		// 안양(scm_ps_any), 안성(scm_ps_ans), 아산(scm_ps_asa), 구미(scm_ps_kum), 부산(scm_ps_pus), 녹산(scm_ps_nok)
		// 안성음료공장(scm_ps_ansb)
		/*
		if( pdb_user.equals("scm_etc") || pdb_user.equals("scm_ss") 
				|| pdb_user.equals("scm_ps_any") || pdb_user.equals("scm_ps_ans") || pdb_user.equals("scm_ps_asa")
				|| pdb_user.equals("scm_ps_kum") || pdb_user.equals("scm_ps_pus") || pdb_user.equals("scm_ps_nok")
				|| pdb_user.equals("scm_ps_ansb") ) {
		*/
		if( cat_id.equals("PS") || cat_id.equals("SS") ) {
			try {
				// TEST IP : 172.25.1.241:8080
				XmlRpcClient xmlrpc = new XmlRpcClient("http://" + engn_ip + "/XMLRPC");
				Hashtable<String, Object> subParams = new Hashtable<String, Object>();
	
				System.out.println("XmlRpcClient :: " + xmlrpc.toString() + " :: " + xmlrpc.getURL());
				
				// 해당 Script 에서 사용하고자 하는 정보가 존재할 경우 jParameters 정보를 담아 사용하면 됩니다.
				Hashtable<String, Object> jParameters = new Hashtable<String, Object>();
	
				subParams.put(SELECTED_SCHEDULE_ID, pdb_user.toUpperCase());
				subParams.put(J_PARAMETERS, jParameters);
				
				Vector<Object> params = new Vector<Object>();
	
				params.addElement(new Integer(SERVICE_LOAD_SCHEDULE_INFO));
				params.addElement(subParams);
	
				Boolean bool = (Boolean) xmlrpc.execute("XMLRPC.request", params);
				System.out.println("=====================================================================================================");
				System.out.println("로딩 결과 := " + bool);
				System.out.println("=====================================================================================================");
				if (bool) {
					returnVal = "SUCCESS";
				} else {
					returnVal = "FAIL";
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (XmlRpcException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (IOException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		// 보충/수송(T3SupplyNet_RP)
		//else if( pdb_user.equals("T3SupplyNet_RP") || pdb_user.equals("T3SupplyNet_FA") ) {
		else if( cat_id.equals("RP") ) {
			try {
				String port = engn_ip.split(":")[1];
				String ipp = engn_ip.split(":")[0];
				// RMIClient constructor params : 1. host address, 2. port, 3. server name
				com.zionex.client.RMIClient client = new com.zionex.client.RMIClient(ipp, port, pdb_user);
				com.zionex.server.RMIService service = client.getService();

				boolean bool = service.dataLoadAll();
				System.out.println("=====================================================================================================");
				System.out.println("로딩 결과 :: " + bool);
				System.out.println("=====================================================================================================");
				if( bool ) {
					returnVal = "SUCCESS";
				}
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		// 공장할당 : T3SupplyNet
		// 계획수립시간이 오래 걸리는 이유로 연결이 끊기는 현상 발생, 따라서 반복적으로 서버 상태 체크하여 진행
		/*
		 * int getServiceStatus();
		 * int값 반환
		 * STATUS_UNLOADED = 10;
		 * STATUS_LOADING  = 12;
		 * STATUS_LOADED   = 14;
		 * STATUS_PLANNING = 22;
		 * STATUS_PLANNED  = 24;
		 * STATUS_SAVING   = 32;
		 * STATUS_SAVED    = 34;
		 */
		else if( cat_id.equals("FA") ) {
			try {
				
				String port = engn_ip.split(":")[1];
				String ipp = engn_ip.split(":")[0];
				// RMIClient constructor params : 1. host address, 2. port, 3. server name
				com.zionex.client.RMIClient client = new com.zionex.client.RMIClient(ipp, port, pdb_user);
				com.zionex.server.RMIService service = client.getService();

				/*==================================================================================================================
				boolean bool = service.dataLoadAll();
				System.out.println("=====================================================================================================");
				System.out.println("로딩 결과 :: " + bool);
				System.out.println("=====================================================================================================");
				if( bool ) {
					returnVal = "SUCCESS";
				}
				==================================================================================================================*/
				
				// checkStatus 초기화
				setCheckStatus(0);
				
				// loading 진행을 위한 Timer, TimerTask 선언 & 진행
				java.util.Timer timerL = new java.util.Timer(true);
				MyLoadTask lTask = null;
				lTask = new MyLoadTask();
				lTask.setService(service);
				timerL.schedule(lTask, 0);
				
				// 서버 상태 체크를 위한 Timer, TimerTask 선언 & 진행
				java.util.Timer timerM = new java.util.Timer(true);
				MyTimerTask mTask = new MyTimerTask();
				mTask.setService(service);
				timerM.schedule(mTask, 0);

				// 강제 지연
				try{
					Thread.sleep(10000);
				} catch(InterruptedException e){ 
					e.printStackTrace();
					returnVal = "ERROR"; 
				}
				
				System.out.println("=====================================================================================================");
				System.out.println("SUPPLYNET 현재 상태 :: " + checkStatus);
				System.out.println("=====================================================================================================");
				
				// STATUS_UNLOADED OR STATUS_PLANNED OR STATUS_SAVED
				if( checkStatus == 10 || checkStatus == 24 || checkStatus == 34 ) {
					//boolean bool = service.dataLoadAll();
					returnVal = "CONTINUE";
				}
				// 성공
				else if( checkStatus == 14) {
					returnVal = "SUCCESS";
				}
				// 화면에 STATUS_LOADING 상태 리턴 : LOADING ..
				else if( checkStatus == 12) {
					returnVal = "CONTINUE";
				}
				// 화면에 STATUS_LOADING 상태 리턴
				else {
					returnVal = Integer.toString(checkStatus);
				}
				
				// Task 정지
				if( lTask != null ) {
					lTask.cancel();
				}
				mTask.cancel();
				// Timer 정지
				timerL.cancel();
				timerM.cancel();
				
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}

	// 서버(SupplyNet) 에서 DATA LOADING 진행을 위한 CLASS
	public static class MyLoadTask extends java.util.TimerTask { 
		
		private com.zionex.server.RMIService service;
		private String script = null;

		// com.zionex.server.RMIService service 저장
		public void setService(com.zionex.server.RMIService service){
			this.service = service;
		}
		
		public void run() {
			//String result = null;
			try {
				if( service.getServiceStatus() == 10 || service.getServiceStatus() == 24 || service.getServiceStatus() == 34 ) { // LOADED 상태인 경우 계획수립
					// 서버(SupplyNet) 에서 로딩 진행
					System.out.println("=====================================================================================================");
					System.out.println("엔진 로딩 시작,,, ");
					System.out.println("=====================================================================================================");
					boolean bool = service.dataLoadAll();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			//this.cancel();
		}
		
	}
	
	/**
	 * ENGN SCHEDULING...
	 * @param engn_ip
	 * @param period_type
	 * @param cat_id
	 * @param pdb_user
	 * @return
	 */
	public static String execScheduling(String engn_ip, String period_type, String cat_id, String pdb_user) {
		
		String returnVal = "SUCCESS";

		System.out.println("=====================================================================================================");
		System.out.println("Method execScheduling() is called with parameters :: engn_ip = " + engn_ip 
								+ ", period_type = " + period_type + ", cat_id = " + cat_id + ", pdb_user = " + pdb_user);
		System.out.println("=====================================================================================================");
		
		// 생산계획 : T3Schedule
		// DAILY 는 EPST, MONTHLY 는 LPST : 다른 스크립트를 적용해야 함
		if( cat_id.equals("PS") || cat_id.equals("SS") ) {
			try {
				// TEST IP : 172.25.1.241:8080
				XmlRpcClient xmlrpc = new XmlRpcClient("http://" + engn_ip + "/XMLRPC");
				Hashtable<String, Object> subParams = new Hashtable<String, Object>();
	
				System.out.println("XmlRpcClient :: " + xmlrpc.toString() + " :: " + xmlrpc.getURL());
				
				// 해당 Script 에서 사용하고자 하는 정보가 존재할 경우 jParameters 정보를 담아 사용하면 됩니다.
				Hashtable<String, Object> jParameters = new Hashtable<String, Object>();
	
				subParams.put(TARGET_SCRIPT, "standard_Script.py");
				subParams.put(J_PARAMETERS, jParameters);
				
				Vector<Object> params = new Vector<Object>();
				params.addElement(new Integer(SERVICE_DO_SCHEDULE));
				params.addElement(subParams);
	
				Boolean bool = (Boolean) xmlrpc.execute("XMLRPC.request", params);
				System.out.println("=====================================================================================================");
				System.out.println("스케줄링 결과 :: " + bool);
				System.out.println("=====================================================================================================");
				if (bool) {
					returnVal = "SUCCESS";
				} else {
					returnVal = "FAIL";
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (XmlRpcException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (IOException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		// 수송 : T3SupplyNet
		else if( cat_id.equals("RP") ) {
			try {
				String port = engn_ip.split(":")[1];
				String ipp = engn_ip.split(":")[0];
				// RMIClient constructor params : 1. host address, 2. port, 3. server name
				com.zionex.client.RMIClient client = new com.zionex.client.RMIClient(ipp, port, pdb_user);
				com.zionex.server.RMIService service = client.getService();
				
				String script = null;
				script = pdb_user + ".py";
				
				String result = service.runPlanStript(script);	   // %T3SupplyNet_HOME%/scripts/ 에서 스크립트를 찾아 실행
				//service.dataSaveAll("RELEASE", "Description");  // first param: CANDIDATE or RELEASE
				System.out.println("=====================================================================================================");
				System.out.println("스케줄링 결과 :: " + result);
				System.out.println("=====================================================================================================");
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		// 공장할당 : T3SupplyNet
		// 계획수립시간이 오래 걸리는 이유로 연결이 끊기는 현상 발생, 따라서 반복적으로 서버 상태 체크하여 진행
		/*
		 * int getServiceStatus();
		 * int값 반환
		 * STATUS_UNLOADED = 10;
		 * STATUS_LOADING  = 12;
		 * STATUS_LOADED   = 14;
		 * STATUS_PLANNING = 22;
		 * STATUS_PLANNED  = 24;
		 * STATUS_SAVING   = 32;
		 * STATUS_SAVED    = 34;
		 */
		else if( cat_id.equals("FA") ) {
			try {
				String port = engn_ip.split(":")[1];
				String ipp = engn_ip.split(":")[0];
				// RMIClient constructor params : 1. host address, 2. port, 3. server name
				com.zionex.client.RMIClient client = new com.zionex.client.RMIClient(ipp, port, pdb_user);
				com.zionex.server.RMIService service = client.getService();
				
				String script = null;
				script = pdb_user + ".py";
				
				// checkStatus 초기화
				setCheckStatus(0);
				
				// scheduling 진행을 위한 Timer, TimerTask 선언 & 진행
				java.util.Timer timerS = new java.util.Timer(true);
				MySchTask   sTask = new MySchTask();
				sTask.setService(service);
				sTask.setScript(script);
				timerS.schedule(sTask, 0);
				
				// 서버 상태 체크를 위한 Timer, TimerTask 선언 & 진행
				java.util.Timer timerM = new java.util.Timer(true);
				MyTimerTask mTask = new MyTimerTask();
				mTask.setService(service);
				timerM.schedule(mTask, 0);

				// 강제 지연
				try{
					Thread.sleep(10000);
				} catch(InterruptedException e){ 
					e.printStackTrace();
					returnVal = "ERROR"; 
				}
				
				System.out.println("=====================================================================================================");
				System.out.println("스케줄링 현재 상태 :: " + checkStatus);
				System.out.println("=====================================================================================================");
				
				// 성공
				if( checkStatus == 24) {
					returnVal = "SUCCESS";
				}
				// 화면에 STATUS_PLANNING 상태 리턴 : PLANNING ..
				else if( checkStatus == 22) {
					returnVal = "CONTINUE";
				}
				// 화면에 STATUS_PLANNING 상태 리턴
				else {
					returnVal = Integer.toString(checkStatus);
				}
				
				// Task 정지
				sTask.cancel();
				mTask.cancel();
				// Timer 정지
				timerS.cancel();
				timerM.cancel();
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}
	
	// 서버(SupplyNet) 상태를 전달하기 위한 변수
	public static void setCheckStatus(int checkStatuss) {
		checkStatus = checkStatuss;
	}
	
	// 서버(SupplyNet) 상태를 체크하기 위한 CLASS
	public static class MyTimerTask extends java.util.TimerTask { 
		
		private com.zionex.server.RMIService service;
		
		// com.zionex.server.RMIService service 저장
		public void setService(com.zionex.server.RMIService service){
			this.service = service;
		}
		
		public void run() {
			int checkStatus = 0;
			try {
				checkStatus = service.getServiceStatus();
			} catch (Exception e) {
				e.printStackTrace();
			}
			// 부모 class 로 서버 상태 전달
			setCheckStatus(checkStatus);
			//System.out.println("=====================================================================================================");
			//System.out.println("스케줄링 현재 상태2 :: " + checkStatus);
			//System.out.println("=====================================================================================================");
		}
		
	}

	// 서버(SupplyNet) 에서 스케줄링 진행을 위한 CLASS
	public static class MySchTask extends java.util.TimerTask { 
		
		private com.zionex.server.RMIService service;
		private String script = null;

		// com.zionex.server.RMIService service 저장
		public void setService(com.zionex.server.RMIService service){
			this.service = service;
		}

		// scripts 저장
		public void setScript(String scripts) {
			script = scripts;
		}
		
		public void run() {
			String result = null;
			try {
				if( service.getServiceStatus() == 14 ) { // LOADED 상태인 경우 계획수립
					// 서버(SupplyNet) 에서 스케줄링 진행
					System.out.println("=====================================================================================================");
					System.out.println("엔진 스케줄링 시작,,, ");
					System.out.println("=====================================================================================================");
					result = service.runPlanStript(script);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			//this.cancel();
		}
		
	}
	
	/**
	 * 일간 공장 할당 계획 1차 : Batch 진행
	 * 
	 * @param engn_ip
	 * @param period_type
	 * @param cat_id
	 * @param pdb_user
	 * @return
	 */
	public static String execSchedulingBatFA(String engn_ip, String period_type, String cat_id, String pdb_user) {
		
		String returnVal = "SUCCESS";

		System.out.println("=====================================================================================================");
		System.out.println("Method execSchedulingBatFA() is called with parameters :: engn_ip = " + engn_ip 
								+ ", period_type = " + period_type + ", cat_id = " + cat_id + ", pdb_user = " + pdb_user);
		System.out.println("=====================================================================================================");
		
		// 공장할당 : T3SupplyNet
		// 계획수립시간이 오래 걸리는 이유로 연결이 끊기는 현상 발생, 따라서 반복적으로 서버 상태 체크하여 진행
		/*
		 * int getServiceStatus();
		 * int값 반환
		 * STATUS_UNLOADED = 10;
		 * STATUS_LOADING  = 12;
		 * STATUS_LOADED   = 14;
		 * STATUS_PLANNING = 22;
		 * STATUS_PLANNED  = 24;
		 * STATUS_SAVING   = 32;
		 * STATUS_SAVED    = 34;
		 */
		if( cat_id.equals("FA") ) {
			try {
				String port = engn_ip.split(":")[1];
				String ipp = engn_ip.split(":")[0];
				// RMIClient constructor params : 1. host address, 2. port, 3. server name
				com.zionex.client.RMIClient client = new com.zionex.client.RMIClient(ipp, port, pdb_user);
				com.zionex.server.RMIService service = client.getService();
				
				String script = null;
				//script = pdb_user + ".py";
				script = "NS_FA_IC" + ".py";
				
				// checkStatus 초기화
				setCheckStatus(0);
				
				// scheduling 진행을 위한 Timer, TimerTask 선언 & 진행
				java.util.Timer timerS = new java.util.Timer(true);
				MySchTaskFA sTask = new MySchTaskFA();
				sTask.setService(service);
				sTask.setScript(script);
				timerS.schedule(sTask, 0);

				// 강제 지연
				try{
					Thread.sleep(10000);
				} catch(InterruptedException e){ 
					e.printStackTrace();
					returnVal = "ERROR"; 
				}
				
				System.out.println("=====================================================================================================");
				System.out.println("스케줄링 현재 상태 :: " + checkStatus);
				System.out.println("=====================================================================================================");
				
				// 성공
				if( checkStatus == 24) {
					returnVal = "SUCCESS";
				}
				// 화면에 STATUS_PLANNING 상태 리턴 : PLANNING ..
				else if( checkStatus == 12 || checkStatus == 14 || checkStatus == 22 || checkStatus == 23 || checkStatus == 32) {
					returnVal = "CONTINUE";
				}
				// 화면에 STATUS_PLANNING 상태 리턴
				else {
					returnVal = Integer.toString(checkStatus);
				}
				
				// Task 정지
				sTask.cancel();
				// Timer 정지
				timerS.cancel();
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}
	
	/**
	 * 일간 공장 할당 계획 1차 : Batch 진행 중 서버 상태 체크
	 * 
	 * @param engn_ip
	 * @param period_type
	 * @param cat_id
	 * @param pdb_user
	 * @return
	 */
	public static String execCheckStatusBatFA(String engn_ip, String period_type, String cat_id, String pdb_user) {
		
		String returnVal = "SUCCESS";

		System.out.println("=====================================================================================================");
		System.out.println("Method execCheckStatusBatFA() is called with parameters :: engn_ip = " + engn_ip 
								+ ", period_type = " + period_type + ", cat_id = " + cat_id + ", pdb_user = " + pdb_user);
		System.out.println("=====================================================================================================");
		
		// 공장할당 : T3SupplyNet
		// 계획수립시간이 오래 걸리는 이유로 연결이 끊기는 현상 발생, 따라서 반복적으로 서버 상태 체크하여 진행
		/*
		 * int getServiceStatus();
		 * int값 반환
		 * STATUS_UNLOADED = 10;
		 * STATUS_LOADING  = 12;
		 * STATUS_LOADED   = 14;
		 * STATUS_PLANNING = 22;
		 * STATUS_PLANNED  = 24;
		 * STATUS_SAVING   = 32;
		 * STATUS_SAVED    = 34;
		 */
		if( cat_id.equals("FA") ) {
			try {
				String port = engn_ip.split(":")[1];
				String ipp = engn_ip.split(":")[0];
				// RMIClient constructor params : 1. host address, 2. port, 3. server name
				com.zionex.client.RMIClient client = new com.zionex.client.RMIClient(ipp, port, pdb_user);
				com.zionex.server.RMIService service = client.getService();
				
				// checkStatus 초기화
				setCheckStatus(0);
				
				// 서버 상태 체크를 위한 Timer, TimerTask 선언 & 진행
				java.util.Timer timerM = new java.util.Timer(true);
				MyTimerTask mTask = new MyTimerTask();
				mTask.setService(service);
				timerM.schedule(mTask, 0);

				// 강제 지연
				try{
					Thread.sleep(10000);
				} catch(InterruptedException e){ 
					e.printStackTrace();
					returnVal = "ERROR"; 
				}
				
				System.out.println("=====================================================================================================");
				System.out.println("스케줄링 현재 상태 :: " + checkStatus);
				System.out.println("=====================================================================================================");
				
				// 성공
				if( checkStatus == 24) {
					returnVal = "SUCCESS";
				}
				// 화면에 STATUS_PLANNING 상태 리턴 : PLANNING ..
				else if( checkStatus == 12 || checkStatus == 14 || checkStatus == 22 || checkStatus == 23 || checkStatus == 32) {
					returnVal = "CONTINUE";
				}
				// 화면에 STATUS_PLANNING 상태 리턴
				else {
					returnVal = Integer.toString(checkStatus);
				}
				
				// Task 정지
				mTask.cancel();
				// Timer 정지
				timerM.cancel();
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}

	// 서버(SupplyNet) 에서 스케줄링 진행을 위한 CLASS
	public static class MySchTaskFA extends java.util.TimerTask { 
		
		private com.zionex.server.RMIService service;
		private String script = null;

		// com.zionex.server.RMIService service 저장
		public void setService(com.zionex.server.RMIService service){
			this.service = service;
		}

		// scripts 저장
		public void setScript(String scripts) {
			script = scripts;
		}
		
		public void run() {
			String result = null;
			try {
				//if( service.getServiceStatus() == 10 ) { // STATUS_UNLOADED 상태인 경우 계획수립
					// 서버(SupplyNet) 에서 스케줄링 진행
					System.out.println("=====================================================================================================");
					System.out.println("엔진 스케줄링 시작,,, ");
					System.out.println("=====================================================================================================");
					result = service.runPlanStript(script);
				/*}
				else if( service.getServiceStatus() == 34 ) { // STATUS_SAVED 상태인 경우 계획수립 : 이전 계획 완료
					// 서버(SupplyNet) 에서 스케줄링 진행
					System.out.println("=====================================================================================================");
					System.out.println("엔진 스케줄링 시작,,, ");
					System.out.println("=====================================================================================================");
					result = service.runPlanStript(script);
				}*/
			} catch (Exception e) {
				e.printStackTrace();
			}
			//this.cancel();
		}
		
	}
	
	/**
	 * ENGN SAVE RESULT...
	 * @param engn_ip
	 * @param period_type
	 * @param cat_id
	 * @param pdb_user
	 * @return
	 */
	public static String execSchSave(String engn_ip, String period_type, String cat_id, String pdb_user) {
		
		String returnVal = "SUCCESS";

		System.out.println("=====================================================================================================");
		System.out.println("Method execSchSave() is called with parameters :: engn_ip = " + engn_ip 
								+ ", period_type = " + period_type + ", cat_id = " + cat_id + ", pdb_user = " + pdb_user);
		System.out.println("=====================================================================================================");
		
		// 유통가공(scm_etc), 반제품(scm_ss)
		// 안양(scm_ps_any), 안성(scm_ps_ans), 아산(scm_ps_asa), 구미(scm_ps_kum), 부산(scm_ps_pus), 녹산(scm_ps_nok)
		// 안성음료공장(scm_ps_ansb)
		/*
		if( pdb_user.equals("scm_etc") || pdb_user.equals("scm_ss") 
				|| pdb_user.equals("scm_ps_any") || pdb_user.equals("scm_ps_ans") || pdb_user.equals("scm_ps_asa")
				|| pdb_user.equals("scm_ps_kum") || pdb_user.equals("scm_ps_pus") || pdb_user.equals("scm_ps_nok")
				|| pdb_user.equals("scm_ps_ansb") ) {
		*/
		if( cat_id.equals("PS") || cat_id.equals("SS") ) {
			try {
				// TEST IP : 172.25.1.241:8080
				XmlRpcClient xmlrpc = new XmlRpcClient("http://" + engn_ip + "/XMLRPC");
				Hashtable<String, Object> subParams = new Hashtable<String, Object>();
	
				System.out.println("XmlRpcClient :: " + xmlrpc.toString() + " :: " + xmlrpc.getURL());
				
				// 해당 Script 에서 사용하고자 하는 정보가 존재할 경우 jParameters 정보를 담아 사용하면 됩니다.
				//===========================================================================================================
				/*
				Hashtable<String, Object> jParameters = new Hashtable<String, Object>();
	
				subParams.put(J_PARAMETERS, jParameters);
				
				Vector<String> tables = new Vector<String>();
				tables.add("VERSION");
				//tables.add("WORKORDER");
				//tables.add("UNUSED_WORKORDER");
				tables.add("ACTIVITY");
				//tables.add("ACTIVITY_RELATION");
				tables.add("MRP_RESULT");
				//tables.add("STOCK_USING_ACT_RESULT");
				//tables.add("STOCK_USING_WO_RESULT");
				//tables.add("STOCK_IN_PROCESS");
				
				jParameters.put("tables", tables);
				jParameters.put("comment", "웹에서 저장 !!!");
				
				Vector<Object> params = new Vector<Object>();
				params.addElement(new Integer(SERVICE_SAVE_SCHEDULING_RESULT));
				params.addElement(subParams);
				*/
				//===========================================================================================================
				Hashtable<String, Object> jParameters = new Hashtable<String, Object>();
				Vector<String> tables = new Vector<String>();
				tables.add("VERSION");
				tables.add("WORKORDER");
				//tables.add("UNUSED_WORKORDER");
				tables.add("ACTIVITY");
				//tables.add("ACTIVITY_RELATION");
				tables.add("MRP_RESULT");
				tables.add("STOCK_USING_ACT_RESULT");
				//tables.add("STOCK_USING_WO_RESULT");
				//tables.add("STOCK_IN_PROCESS");
				jParameters.put("tables", tables);
				jParameters.put("comment", "웹에서 저장 !!!");
				Vector<Object> params = new Vector<Object>();
	            params.addElement(new Integer(SERVICE_SAVE_SCHEDULING_RESULT));
	            params.addElement(jParameters);
				//===========================================================================================================
				
				Boolean bool = (Boolean) xmlrpc.execute("XMLRPC.request", params);
				System.out.println("=====================================================================================================");
				System.out.println("계획결과 저장 결과 :: " + bool);
				System.out.println("=====================================================================================================");
				if (bool) {
					returnVal = "SUCCESS";
				} else {
					returnVal = "FAIL";
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (XmlRpcException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (IOException e) {
				e.printStackTrace();
				returnVal = "FAIL";
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		// 보충/수송(T3SupplyNet_RP), 공장할당(T3SupplyNet_FA)
		//else if( pdb_user.equals("T3SupplyNet_RP") || pdb_user.equals("T3SupplyNet_FA") ) {
		else if( cat_id.equals("FA") || cat_id.equals("RP") ) {
			try {
				String port = engn_ip.split(":")[1];
				String ipp = engn_ip.split(":")[0];
				// RMIClient constructor params : 1. host address, 2. port, 3. server name
				com.zionex.client.RMIClient client = new com.zionex.client.RMIClient(ipp, port, pdb_user);
				com.zionex.server.RMIService service = client.getService();

				service.dataSaveAll("RELEASE", "Description");  // first param: CANDIDATE or RELEASE
				System.out.println("=====================================================================================================");
				System.out.println("계획결과 저장 결과 :: ");
				System.out.println("=====================================================================================================");
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}
	
	/**
	 * PLAN_VERSION_LOG 의 상태 불러오기
	 * @param period_type
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @return
	 */
	public static String getStat(String period_type, String run_date, String run_seq, String plan_step) {
		
		Connection conn = null;
		Statement stmt  = null;
		ResultSet rs	= null;
		
		String sql = null;
		String returnVal = null;
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method getStat() is called with parameters :: period_type = " + period_type 
								+ ", run_date = " + run_date + ", run_seq = " + run_seq + ", plan_step = " + plan_step);
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "SELECT PL.STATUS ";
			sql += "FROM PLAN_VERSION_LOG PL ";
			sql += "WHERE PL.PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND TO_CHAR(PL.RUN_DATE, 'YYYYMMDD') = REPLACE(REPLACE('" + run_date + "', '-', ''), '/', '') ";
			sql += "AND PL.RUN_SEQ = TO_NUMBER('" + run_seq + "') ";
			sql += "AND PL.PLAN_STEP = TO_NUMBER('" + plan_step + "') ";
			System.out.println(sql);
			
			rs = databaseUtility.executeQuery(stmt, sql);

			while (rs.next()) {
				returnVal = rs.getString(1);
			}
			
			if( returnVal != null ) {
				System.out.println("Query Result::" + returnVal.toString());
			}
			else {
				returnVal = "0";
				System.out.println("Query Result::NULL");
			}
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = null;
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt, rs);
		}
						
		return returnVal; 
		
	}
	
	/**
	 * META to PDB SP CALL
	 * @param sp_id
	 * @param period_type
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @param plant_id
	 * @return
	 */
	public static String callSP(String sp_id, String period_type, String run_date
									, String run_seq, String plan_step, String plant_id) {
		
		Connection conn = null;
		Statement stmt  = null;
		
		String sql = null;
		String returnVal = "SUCCESS";
		
		// 강제 지연
		try{
			//Thread.sleep(1000);
			Thread.sleep(300); 
		} catch(InterruptedException e){ 
			e.printStackTrace(); 
			returnVal = "ERROR"; 
		}
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();		
		
		// PLANT ID 가 없는 경우 NA 로 설정
		if( plant_id.equals("") ) {
			plant_id = "NA";
		}

		System.out.println("=====================================================================================================");
		System.out.println("Method callSP() is called with parameters :: sp_id = " + sp_id + ", period_type = " + period_type
								+ ", run_date = " + run_date + ", run_seq = " + run_seq + ", plan_step = " + plan_step + ", plant_id = " + plant_id);
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			// p_period_type IN VARCHAR2, p_run_date IN DATE, p_run_seq IN NUMBER, p_plan_step IN NUMBER, p_plant IN VARCHAR2, p_if_dttm IN DATE
			sql = "CALL " + sp_id + "('" + period_type + "'";
			sql += ", TO_DATE(REPLACE(REPLACE('" + run_date + "', '-', ''), '/', ''), 'YYYYMMDD')";
			sql += ", TO_NUMBER('" + run_seq + "'), TO_NUMBER('" + plan_step + "')";
			sql += ", '" + plant_id + "'";
			sql += ", SYSDATE)";
			System.out.println(sql);
			int result = databaseUtility.executeUpdate(stmt, sql);
			
			System.out.println("Query Result::" + Integer.toString(result));
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = "ERROR";
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt);
		}
						
		return returnVal; 
		
	}
	
	/**
	 * PLAN_VERSION_LOG 테이블 상태 UPDATE
	 * @param period_type
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @param status
	 * @param user_id
	 * @return
	 */
	public static String updateStat(String period_type, String run_date, String run_seq, String plan_step, String status, String user_id) {
		
		Connection conn = null;
		Statement stmt  = null;
		
		String sql = null;
		String returnVal = "SUCCESS";
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method updateStat() is called with parameters :: period_type = " + period_type + ", run_date = " + run_date
								+ ", run_seq = " + run_seq + ", plan_step = " + plan_step + ", status = " + status + ", user_id = " + user_id);
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "UPDATE PLAN_VERSION_LOG ";
			sql += "SET STATUS = '" + status + "', MADE_TYPE = 'UP', MADE_DTTM = SYSDATE, MADE_BY = '" + user_id + "' ";
			sql += "WHERE PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND RUN_DATE = TO_DATE(REPLACE(REPLACE('" + run_date + "', '-', ''), '/', ''), 'YYYYMMDD') ";
			sql += "AND RUN_SEQ = TO_NUMBER('" + run_seq + "') ";
			sql += "AND PLAN_STEP = TO_NUMBER('" + plan_step + "') ";
			System.out.println(sql);
			int result = databaseUtility.executeUpdate(stmt, sql);
			
			System.out.println("Query Result::" + Integer.toString(result));
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = "ERROR";
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt);
		}
						
		return returnVal; 
		
	}
	
	/**
	 * 계획 결과를 PDB to META 로 전송하는 SP 호출
	 * @param period_type
	 * @param cat_id
	 * @param sub_cat
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @param plant_id
	 * @return
	 */
	public static String callSpConv(String period_type, String cat_id, String sub_cat
										, String run_date, String run_seq, String plan_step, String plant_id) {
		
		Connection conn = null;
		Statement stmt  = null;
		ResultSet rs	= null;
		
		String sql = null;
		String returnVal = "SUCCESS";
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method callSpConv() is called with parameters :: period_type = " + period_type
								+ ", cat_id = " + cat_id + ", sub_cat = " + sub_cat + ", run_date = " + run_date
								+ ", run_seq = " + run_seq + ", plan_step = " + plan_step + ", plant_id = " + plant_id);
		System.out.println("=====================================================================================================");
		
		ArrayList<String> spList = new ArrayList<String>();
		try {
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "SELECT JI.SP_ID ";
			sql += "FROM ENGN_BAT_JOB_INFO JI ";
			sql += "WHERE JI.PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND JI.CAT_ID = '" + cat_id + "' ";
			sql += "AND JI.SUB_CAT = '" + sub_cat + "' ";
			sql += "AND JI.JOB_TYPE = 'PDB_OUT' ";
			sql += "ORDER BY JI.SEQ ";
			System.out.println(sql);
			
			rs = databaseUtility.executeQuery(stmt, sql);

			while (rs.next()) {
				spList.add(rs.getString(1));
			}
			
			System.out.println("SP LIST Query Result::" + spList.toString());
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = "ERROR";
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt, rs);
		}
		
		for( int i = 0 ; i < spList.size() ; i++ ) {
			if( returnVal.equals("SUCCESS") ) {
				returnVal = callSP(spList.get(i), period_type, run_date, run_seq, plan_step, plant_id);
			}
		}
						
		return returnVal; 
		
	}
	
	/**
	 * 계획 결과를 META to LEGACY 로 전송하는 SP 호출
	 * @param period_type
	 * @param cat_id
	 * @param sub_cat
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @param plant_id
	 * @return
	 */
	public static String callSpToLegacy(String period_type, String cat_id, String sub_cat
										, String run_date, String run_seq, String plan_step, String plant_id) {
		
		Connection conn = null;
		Statement stmt  = null;
		ResultSet rs	= null;
		
		String sql = null;
		String returnVal = "SUCCESS";
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method callSpToLegacy() is called with parameters :: period_type = " + period_type
								+ ", cat_id = " + cat_id + ", sub_cat = " + sub_cat + ", run_date = " + run_date
								+ ", run_seq = " + run_seq + ", plan_step = " + plan_step + ", plant_id = " + plant_id);
		System.out.println("=====================================================================================================");
		
		ArrayList<String> spList = new ArrayList<String>();
		try {
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "SELECT JI.SP_ID ";
			sql += "FROM ENGN_BAT_JOB_INFO JI ";
			sql += "WHERE JI.PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND JI.CAT_ID = '" + cat_id + "' ";
			sql += "AND JI.SUB_CAT = '" + sub_cat + "' ";
			sql += "AND JI.JOB_TYPE = 'META_OUT' ";
			sql += "ORDER BY JI.SEQ ";
			System.out.println(sql);
			
			rs = databaseUtility.executeQuery(stmt, sql);

			while (rs.next()) {
				spList.add(rs.getString(1));
			}
			
			System.out.println("SP LIST Query Result::" + spList.toString());
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = "ERROR";
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt, rs);
		}
		
		for( int i = 0 ; i < spList.size() ; i++ ) {
			if( returnVal.equals("SUCCESS") ) {
				returnVal = callSP(spList.get(i), period_type, run_date, run_seq, plan_step, plant_id);
			}
		}
						
		return returnVal; 
		
	}
	
	/**
	 * PLAN_VERSION_LOG 테이블에서 VERSION, SEQ 읽어오기
	 * @param period_type
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @return
	 */
	public static ArrayList<String> getVersions(String period_type, String run_date, String run_seq, String plan_step) {
		
		Connection conn = null;
		Statement stmt  = null;
		ResultSet rs	= null;
		
		String sql = null;
		ArrayList<String> arrList = new ArrayList<String>();
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method getVersions() is called with parameters :: period_type = " + period_type
								+ ", run_date = " + run_date + ", run_seq = " + run_seq + ", plan_step = " + plan_step);
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "SELECT PL.VERSION, PL.SEQ, PL.COMMTS ";
			sql += "FROM PLAN_VERSION_LOG PL ";
			sql += "WHERE PL.PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND TO_CHAR(PL.RUN_DATE, 'YYYYMMDD') = REPLACE(REPLACE('" + run_date + "', '-', ''), '/', '') ";
			sql += "AND PL.RUN_SEQ = TO_NUMBER('" + run_seq + "') ";
			sql += "AND PL.PLAN_STEP = TO_NUMBER('" + plan_step + "') ";
			System.out.println(sql);
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			while (rs.next()) {
				arrList.clear();
				if( rs.getString(1) == null ) {
					arrList.add("");
				} else {
					arrList.add(rs.getString(1));
				}
				if( rs.getString(2) == null ) {
					arrList.add("");
				} else {
					arrList.add(rs.getString(2));
				}
				if( rs.getString(3) == null ) {
					arrList.add("");
				} else {
					arrList.add(rs.getString(3));
				}
			}
			
			System.out.println("Query Result::" + arrList.toString());
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			arrList = null;
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt, rs);
		}
						
		return arrList; 
		
	}
	
	/**
	 * 새로운 PLAN_STEP 생성
	 * @param period_type
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @param cat_id
	 * @param sub_cat
	 * @param user_id
	 * @return
	 */
	public static String createPlanRec(String period_type, String run_date, String run_seq, String plan_step
										, String cat_id, String sub_cat, String user_id) {
		
		Connection conn = null;
		Statement stmt  = null;
		ResultSet rs	= null;
		
		String sql = null;
		String returnVal = "SUCCESS";
		int planCnt = 9999; // 해당 CAT_ID, SUB_CAT 으로 생성된 계획 COUNTING
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method createPlanRec() is called with parameters :: period_type = " + period_type
								+ ", run_date = " + run_date + ", run_seq = " + run_seq + ", plan_step = " + plan_step
								+ ", cat_id = " + cat_id + ", sub_cat = " + sub_cat + ", user_id = " + user_id);
		System.out.println("=====================================================================================================");
		
		if( plan_step.equals("") || plan_step == null ) {
			// 해당 CAT_ID, SUB_CAT 으로 생성된 계획이 있는지 먼저 체크
			// (동시에 다른 사용자가 컨트롤 보드에서 계획을 생성했는지 체크해야 함)
			try {
				conn = databaseUtility.getConnection("t3sinc");
				stmt = conn.createStatement();
				
				sql = "SELECT COUNT(PL.PERIOD_TYPE) CNT ";
				sql += "FROM PLAN_VERSION_LOG PL ";
				sql += "WHERE PL.PERIOD_TYPE = '" + period_type + "' ";
				sql += "AND TO_CHAR(PL.RUN_DATE, 'YYYYMMDD') = REPLACE(REPLACE('" + run_date + "', '-', ''), '/', '') ";
				sql += "AND PL.RUN_SEQ = TO_NUMBER('" + run_seq + "') ";
				sql += "AND PL.CAT_ID = '" + cat_id + "' ";
				sql += "AND PL.SUB_CAT = '" + sub_cat + "' ";
				sql += "AND ( PL.STATUS IS NULL OR PL.STATUS = '0' )";
				System.out.println(sql);
				
				rs = databaseUtility.executeQuery(stmt, sql);
				
				while (rs.next()) {
					//returnVal = rs.getString(1);
					planCnt = Integer.parseInt(rs.getString(1));
				}
				System.out.println("Query Result::" + Integer.toString(planCnt));
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				returnVal = "ERROR";
			} finally {
				//  ERROR CHECK END 
				databaseUtility.close(conn, stmt);
			}
			
			if( planCnt != 9999 && planCnt > 0 ) {
				return "REFRESH";
			}
			
			try {
				conn = databaseUtility.getConnection("t3sinc");
				stmt = conn.createStatement();
				
				sql = "INSERT INTO PLAN_VERSION_LOG ";
				sql += "(PERIOD_TYPE, RUN_DATE, RUN_SEQ, PLAN_STEP, CAT_ID, SUB_CAT, MADE_TYPE, MADE_DTTM, MADE_BY) ";
				sql += "SELECT '" + period_type + "' PERIOD_TYPE ";
				sql += ", TO_DATE(REPLACE(REPLACE('" + run_date + "', '-', ''), '/', ''), 'YYYYMMDD') RUN_DATE ";
				sql += ", TO_NUMBER('" + run_seq + "') RUN_SEQ ";
				sql += ", NVL(MV.PLAN_STEP, 1) PLAN_STEP ";
				sql += ", '" + cat_id + "' CAT_ID ";
				sql += ", '" + sub_cat + "' SUB_CAT ";
				sql += ", 'AD' MADE_TYPE, SYSDATE MADE_DTTM ";
				sql += ", '" + user_id + "' MADE_BY ";
				sql += "FROM ( SELECT MAX(NVL(VL.PLAN_STEP, 0))+1 PLAN_STEP FROM PLAN_VERSION_LOG VL ";
				sql += "WHERE VL.PERIOD_TYPE = '" + period_type + "' ";
				sql += "AND VL.RUN_DATE = TO_DATE(REPLACE(REPLACE('" + run_date + "', '-', ''), '/', ''), 'YYYYMMDD') ";
				sql += "AND VL.RUN_SEQ = TO_NUMBER('" + run_seq + "') ";
				sql += ") MV ";
				System.out.println(sql);
				int result = databaseUtility.executeUpdate(stmt, sql);
				
				System.out.println("Query Result::" + Integer.toString(result));
									
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				returnVal = "ERROR";
			} finally {
				//  ERROR CHECK END 
				databaseUtility.close(conn, stmt);
			}
		}
						
		return returnVal; 
		
	}
	
	/**
	 * PLAN_VERSION_LOG 의 MAX(PLAN_STEP) 찾기
	 * @param period_type
	 * @param run_date
	 * @param run_seq
	 * @return
	 */
	public static String getMaxPlanStep(String period_type, String run_date, String run_seq) {
		
		Connection conn = null;
		Statement stmt  = null;
		ResultSet rs	= null;
		
		String sql = null;
		String returnVal = null;
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method getMaxPlanStep() is called with parameters :: period_type = " + period_type
								+ ", run_date = " + run_date + ", run_seq = " + run_seq);
		System.out.println("=====================================================================================================");
		
		try {
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "SELECT MAX(PL.PLAN_STEP) PLAN_STEP ";
			sql += "FROM PLAN_VERSION_LOG PL ";
			sql += "WHERE PL.PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND TO_CHAR(PL.RUN_DATE, 'YYYYMMDD') = REPLACE(REPLACE('" + run_date + "', '-', ''), '/', '') ";
			sql += "AND PL.RUN_SEQ = TO_NUMBER('" + run_seq + "') ";
			System.out.println(sql);
			
			rs = databaseUtility.executeQuery(stmt, sql);

			while (rs.next()) {
				returnVal = rs.getString(1);
			}
			
			System.out.println("Query Result::" + returnVal);
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = null;
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt, rs);
		}
						
		return returnVal; 
		
	}
	
	/**
	 * 계획 comment 저장
	 * @param period_type
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @param comment
	 * @param user_id
	 * @return
	 */
	public static String setComment(String period_type, String run_date, String run_seq, String plan_step, String comment, String user_id) {
		
		Connection conn = null;
		Statement stmt  = null;
		
		String sql = null;
		String returnVal = "SUCCESS";
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method setComment() is called with parameters :: period_type = " + period_type + ", run_date = " + run_date
								+ ", run_seq = " + run_seq + ", plan_step = " + plan_step + ", comment = " + comment + ", user_id = " + user_id);
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "UPDATE PLAN_VERSION_LOG ";
			sql += "SET COMMTS = '" + comment + "', MADE_TYPE = 'UP', MADE_DTTM = SYSDATE, MADE_BY = '" + user_id + "' ";
			sql += "WHERE PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND RUN_DATE = TO_DATE(REPLACE(REPLACE('" + run_date + "', '-', ''), '/', ''), 'YYYYMMDD') ";
			sql += "AND RUN_SEQ = TO_NUMBER('" + run_seq + "') ";
			sql += "AND PLAN_STEP = TO_NUMBER('" + plan_step + "') ";
			System.out.println(sql);
			int result = databaseUtility.executeUpdate(stmt, sql);
			
			System.out.println("Query Result::" + Integer.toString(result));
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = "ERROR";
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt);
		}
						
		return returnVal; 
		
	}
	
	/**
	 * HORIZON_INFO 테이블의 HORZN_START, HORZN_END, PLAN_START UPDATE
	 * @param period_type
	 * @param cat_id
	 * @param user_id
	 * @param horzn_start
	 * @param horzn_end
	 * @param plan_start
	 * @return
	 */
	public static String updateHorizonInfo(String period_type, String cat_id, String user_id
											, String horzn_start, String horzn_end, String plan_start) {
		
		Connection conn = null;
		Statement stmt  = null;
		
		String sql = null;
		String returnVal = "SUCCESS";
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method updateHorizonInfo() is called with parameters :: period_type = " + period_type 
								+ ", cat_id = " + cat_id + ", user_id = " + user_id
								+ ", horzn_start = " + horzn_start + ", horzn_end = " + horzn_end + ", plan_start = " + plan_start);
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "UPDATE HORIZON_INFO ";
			sql += "SET HORZN_START = TO_DATE(REPLACE(REPLACE('" + horzn_start + "'";
			sql += "||( SELECT CM.CAT01 FROM CODE_MST CM WHERE CM.CD_GRP = 'SHIFT_TYPE' AND CM.CD = '1' AND CM.MADE_TYPE != 'DE' )";
			sql += ", '/', ''), '-', ''), 'YYYYMMDDHH24MI') ";
			sql += ", HORZN_END = TO_DATE(REPLACE(REPLACE('" + horzn_end + "'";
			sql += "||( SELECT CM.CAT01 FROM CODE_MST CM WHERE CM.CD_GRP = 'SHIFT_TYPE' AND CM.CD = '1' AND CM.MADE_TYPE != 'DE' )";
			sql += ", '/', ''), '-', ''), 'YYYYMMDDHH24MI') ";
			sql += ", PLAN_START = TO_DATE(REPLACE(REPLACE('" + plan_start + "'";
			sql += "||( SELECT CM.CAT01 FROM CODE_MST CM WHERE CM.CD_GRP = 'SHIFT_TYPE' AND CM.CD = '1' AND CM.MADE_TYPE != 'DE' )";
			sql += ", '/', ''), '-', ''), 'YYYYMMDDHH24MI') ";
			sql += ", MADE_TYPE = 'UP', MADE_DTTM = SYSDATE, MADE_BY = '" + user_id + "' ";
			sql += "WHERE PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND CAT_ID = '" + cat_id + "' ";
			System.out.println(sql);
			int result = databaseUtility.executeUpdate(stmt, sql);
			
			System.out.println("Query Result::" + Integer.toString(result));
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = "ERROR";
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt);
		}
						
		return returnVal; 
		
	}
	
	/**
	 * 일간 수송 계획 수립 전
	 * PLAN_VERSION_LOG 테이블에 ORDER_FLAG, SAFETY_FLAG UPDATE
	 * @param period_type
	 * @param run_date
	 * @param run_seq
	 * @param plan_step
	 * @param order_flag
	 * @param safety_flag
	 * @return
	 */
	public static String updateDailyRpOption(String period_type, String run_date, String run_seq, String plan_step
												, String order_flag, String safety_flag, String pre_plan_add_flag) {
		
		Connection conn = null;
		Statement stmt  = null;
		
		String sql = null;
		String returnVal = "SUCCESS";
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method updateDailyRpOption() is called with parameters :: period_type = " + period_type 
								+ ", run_date = " + run_date + ", run_seq = " + run_seq + ", plan_step = " + plan_step
								+ ", order_flag = " + order_flag + ", safety_flag = " + safety_flag + ", pre_plan_add_flag = " + pre_plan_add_flag );
		System.out.println("=====================================================================================================");
		
		try {						   
			conn = databaseUtility.getConnection("t3sinc");
			stmt = conn.createStatement();
			
			sql = "UPDATE PLAN_VERSION_LOG ";
			sql += "SET ORDER_FLAG = '" + order_flag + "'";
			sql += ", SAFETY_FLAG = '" + safety_flag + "' ";
			sql += ", PRE_PLAN_ADD_FLAG = '" + pre_plan_add_flag + "' ";
			sql += "WHERE PERIOD_TYPE = '" + period_type + "' ";
			sql += "AND RUN_DATE = TO_DATE(REPLACE(REPLACE('" + run_date + "', '-', ''), '/', ''), 'YYYYMMDD') ";
			sql += "AND RUN_SEQ = TO_NUMBER('" + run_seq + "') ";
			sql += "AND PLAN_STEP = TO_NUMBER('" + plan_step + "') ";
			System.out.println(sql);
			int result = databaseUtility.executeUpdate(stmt, sql);
			
			System.out.println("Query Result::" + Integer.toString(result));
								
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnVal = "ERROR";
		} finally {
			//  ERROR CHECK END 
			databaseUtility.close(conn, stmt);
		}
						
		return returnVal; 
		
	}
	
	/**
	 * 
	 * @param args
	 * 
	 * Main Method()
	 */
	public static void main(String[] args) {
		
		ControlBoard cBoard = new ControlBoard();
		System.out.println("___ControlBoard_Class___ :: " + cBoard);
		
	}
}
