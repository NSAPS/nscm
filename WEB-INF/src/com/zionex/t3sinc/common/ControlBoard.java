/*
 * Created on 2008-07-15 15:20
 * BY KTJ
 * NONGSHIM SCM SYSTEM
 * ��Ʈ�Ѻ���(CONTROL BOARD) ���� CLASS
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
		
		// ���밡��(scm_etc), ����ǰ(scm_ss)
		// �Ⱦ�(scm_ps_any), �ȼ�(scm_ps_ans), �ƻ�(scm_ps_asa), ����(scm_ps_kum), �λ�(scm_ps_pus), ���(scm_ps_nok)
		// �ȼ��������(scm_ps_ansb)
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
				
				// �ش� Script ���� ����ϰ��� �ϴ� ������ ������ ��� jParameters ������ ��� ����ϸ� �˴ϴ�.
				Hashtable<String, Object> jParameters = new Hashtable<String, Object>();
	
				subParams.put(SELECTED_SCHEDULE_ID, pdb_user.toUpperCase());
				subParams.put(J_PARAMETERS, jParameters);
				
				Vector<Object> params = new Vector<Object>();
	
				params.addElement(new Integer(SERVICE_LOAD_SCHEDULE_INFO));
				params.addElement(subParams);
	
				Boolean bool = (Boolean) xmlrpc.execute("XMLRPC.request", params);
				System.out.println("=====================================================================================================");
				System.out.println("�ε� ��� := " + bool);
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
		// ����/����(T3SupplyNet_RP)
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
				System.out.println("�ε� ��� :: " + bool);
				System.out.println("=====================================================================================================");
				if( bool ) {
					returnVal = "SUCCESS";
				}
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		// �����Ҵ� : T3SupplyNet
		// ��ȹ�����ð��� ���� �ɸ��� ������ ������ ����� ���� �߻�, ���� �ݺ������� ���� ���� üũ�Ͽ� ����
		/*
		 * int getServiceStatus();
		 * int�� ��ȯ
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
				System.out.println("�ε� ��� :: " + bool);
				System.out.println("=====================================================================================================");
				if( bool ) {
					returnVal = "SUCCESS";
				}
				==================================================================================================================*/
				
				// checkStatus �ʱ�ȭ
				setCheckStatus(0);
				
				// loading ������ ���� Timer, TimerTask ���� & ����
				java.util.Timer timerL = new java.util.Timer(true);
				MyLoadTask lTask = null;
				lTask = new MyLoadTask();
				lTask.setService(service);
				timerL.schedule(lTask, 0);
				
				// ���� ���� üũ�� ���� Timer, TimerTask ���� & ����
				java.util.Timer timerM = new java.util.Timer(true);
				MyTimerTask mTask = new MyTimerTask();
				mTask.setService(service);
				timerM.schedule(mTask, 0);

				// ���� ����
				try{
					Thread.sleep(10000);
				} catch(InterruptedException e){ 
					e.printStackTrace();
					returnVal = "ERROR"; 
				}
				
				System.out.println("=====================================================================================================");
				System.out.println("SUPPLYNET ���� ���� :: " + checkStatus);
				System.out.println("=====================================================================================================");
				
				// STATUS_UNLOADED OR STATUS_PLANNED OR STATUS_SAVED
				if( checkStatus == 10 || checkStatus == 24 || checkStatus == 34 ) {
					//boolean bool = service.dataLoadAll();
					returnVal = "CONTINUE";
				}
				// ����
				else if( checkStatus == 14) {
					returnVal = "SUCCESS";
				}
				// ȭ�鿡 STATUS_LOADING ���� ���� : LOADING ..
				else if( checkStatus == 12) {
					returnVal = "CONTINUE";
				}
				// ȭ�鿡 STATUS_LOADING ���� ����
				else {
					returnVal = Integer.toString(checkStatus);
				}
				
				// Task ����
				if( lTask != null ) {
					lTask.cancel();
				}
				mTask.cancel();
				// Timer ����
				timerL.cancel();
				timerM.cancel();
				
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}

	// ����(SupplyNet) ���� DATA LOADING ������ ���� CLASS
	public static class MyLoadTask extends java.util.TimerTask { 
		
		private com.zionex.server.RMIService service;
		private String script = null;

		// com.zionex.server.RMIService service ����
		public void setService(com.zionex.server.RMIService service){
			this.service = service;
		}
		
		public void run() {
			//String result = null;
			try {
				if( service.getServiceStatus() == 10 || service.getServiceStatus() == 24 || service.getServiceStatus() == 34 ) { // LOADED ������ ��� ��ȹ����
					// ����(SupplyNet) ���� �ε� ����
					System.out.println("=====================================================================================================");
					System.out.println("���� �ε� ����,,, ");
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
		
		// �����ȹ : T3Schedule
		// DAILY �� EPST, MONTHLY �� LPST : �ٸ� ��ũ��Ʈ�� �����ؾ� ��
		if( cat_id.equals("PS") || cat_id.equals("SS") ) {
			try {
				// TEST IP : 172.25.1.241:8080
				XmlRpcClient xmlrpc = new XmlRpcClient("http://" + engn_ip + "/XMLRPC");
				Hashtable<String, Object> subParams = new Hashtable<String, Object>();
	
				System.out.println("XmlRpcClient :: " + xmlrpc.toString() + " :: " + xmlrpc.getURL());
				
				// �ش� Script ���� ����ϰ��� �ϴ� ������ ������ ��� jParameters ������ ��� ����ϸ� �˴ϴ�.
				Hashtable<String, Object> jParameters = new Hashtable<String, Object>();
	
				subParams.put(TARGET_SCRIPT, "standard_Script.py");
				subParams.put(J_PARAMETERS, jParameters);
				
				Vector<Object> params = new Vector<Object>();
				params.addElement(new Integer(SERVICE_DO_SCHEDULE));
				params.addElement(subParams);
	
				Boolean bool = (Boolean) xmlrpc.execute("XMLRPC.request", params);
				System.out.println("=====================================================================================================");
				System.out.println("�����ٸ� ��� :: " + bool);
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
		// ���� : T3SupplyNet
		else if( cat_id.equals("RP") ) {
			try {
				String port = engn_ip.split(":")[1];
				String ipp = engn_ip.split(":")[0];
				// RMIClient constructor params : 1. host address, 2. port, 3. server name
				com.zionex.client.RMIClient client = new com.zionex.client.RMIClient(ipp, port, pdb_user);
				com.zionex.server.RMIService service = client.getService();
				
				String script = null;
				script = pdb_user + ".py";
				
				String result = service.runPlanStript(script);	   // %T3SupplyNet_HOME%/scripts/ ���� ��ũ��Ʈ�� ã�� ����
				//service.dataSaveAll("RELEASE", "Description");  // first param: CANDIDATE or RELEASE
				System.out.println("=====================================================================================================");
				System.out.println("�����ٸ� ��� :: " + result);
				System.out.println("=====================================================================================================");
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		// �����Ҵ� : T3SupplyNet
		// ��ȹ�����ð��� ���� �ɸ��� ������ ������ ����� ���� �߻�, ���� �ݺ������� ���� ���� üũ�Ͽ� ����
		/*
		 * int getServiceStatus();
		 * int�� ��ȯ
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
				
				// checkStatus �ʱ�ȭ
				setCheckStatus(0);
				
				// scheduling ������ ���� Timer, TimerTask ���� & ����
				java.util.Timer timerS = new java.util.Timer(true);
				MySchTask   sTask = new MySchTask();
				sTask.setService(service);
				sTask.setScript(script);
				timerS.schedule(sTask, 0);
				
				// ���� ���� üũ�� ���� Timer, TimerTask ���� & ����
				java.util.Timer timerM = new java.util.Timer(true);
				MyTimerTask mTask = new MyTimerTask();
				mTask.setService(service);
				timerM.schedule(mTask, 0);

				// ���� ����
				try{
					Thread.sleep(10000);
				} catch(InterruptedException e){ 
					e.printStackTrace();
					returnVal = "ERROR"; 
				}
				
				System.out.println("=====================================================================================================");
				System.out.println("�����ٸ� ���� ���� :: " + checkStatus);
				System.out.println("=====================================================================================================");
				
				// ����
				if( checkStatus == 24) {
					returnVal = "SUCCESS";
				}
				// ȭ�鿡 STATUS_PLANNING ���� ���� : PLANNING ..
				else if( checkStatus == 22) {
					returnVal = "CONTINUE";
				}
				// ȭ�鿡 STATUS_PLANNING ���� ����
				else {
					returnVal = Integer.toString(checkStatus);
				}
				
				// Task ����
				sTask.cancel();
				mTask.cancel();
				// Timer ����
				timerS.cancel();
				timerM.cancel();
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}
	
	// ����(SupplyNet) ���¸� �����ϱ� ���� ����
	public static void setCheckStatus(int checkStatuss) {
		checkStatus = checkStatuss;
	}
	
	// ����(SupplyNet) ���¸� üũ�ϱ� ���� CLASS
	public static class MyTimerTask extends java.util.TimerTask { 
		
		private com.zionex.server.RMIService service;
		
		// com.zionex.server.RMIService service ����
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
			// �θ� class �� ���� ���� ����
			setCheckStatus(checkStatus);
			//System.out.println("=====================================================================================================");
			//System.out.println("�����ٸ� ���� ����2 :: " + checkStatus);
			//System.out.println("=====================================================================================================");
		}
		
	}

	// ����(SupplyNet) ���� �����ٸ� ������ ���� CLASS
	public static class MySchTask extends java.util.TimerTask { 
		
		private com.zionex.server.RMIService service;
		private String script = null;

		// com.zionex.server.RMIService service ����
		public void setService(com.zionex.server.RMIService service){
			this.service = service;
		}

		// scripts ����
		public void setScript(String scripts) {
			script = scripts;
		}
		
		public void run() {
			String result = null;
			try {
				if( service.getServiceStatus() == 14 ) { // LOADED ������ ��� ��ȹ����
					// ����(SupplyNet) ���� �����ٸ� ����
					System.out.println("=====================================================================================================");
					System.out.println("���� �����ٸ� ����,,, ");
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
	 * �ϰ� ���� �Ҵ� ��ȹ 1�� : Batch ����
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
		
		// �����Ҵ� : T3SupplyNet
		// ��ȹ�����ð��� ���� �ɸ��� ������ ������ ����� ���� �߻�, ���� �ݺ������� ���� ���� üũ�Ͽ� ����
		/*
		 * int getServiceStatus();
		 * int�� ��ȯ
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
				
				// checkStatus �ʱ�ȭ
				setCheckStatus(0);
				
				// scheduling ������ ���� Timer, TimerTask ���� & ����
				java.util.Timer timerS = new java.util.Timer(true);
				MySchTaskFA sTask = new MySchTaskFA();
				sTask.setService(service);
				sTask.setScript(script);
				timerS.schedule(sTask, 0);

				// ���� ����
				try{
					Thread.sleep(10000);
				} catch(InterruptedException e){ 
					e.printStackTrace();
					returnVal = "ERROR"; 
				}
				
				System.out.println("=====================================================================================================");
				System.out.println("�����ٸ� ���� ���� :: " + checkStatus);
				System.out.println("=====================================================================================================");
				
				// ����
				if( checkStatus == 24) {
					returnVal = "SUCCESS";
				}
				// ȭ�鿡 STATUS_PLANNING ���� ���� : PLANNING ..
				else if( checkStatus == 12 || checkStatus == 14 || checkStatus == 22 || checkStatus == 23 || checkStatus == 32) {
					returnVal = "CONTINUE";
				}
				// ȭ�鿡 STATUS_PLANNING ���� ����
				else {
					returnVal = Integer.toString(checkStatus);
				}
				
				// Task ����
				sTask.cancel();
				// Timer ����
				timerS.cancel();
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}
	
	/**
	 * �ϰ� ���� �Ҵ� ��ȹ 1�� : Batch ���� �� ���� ���� üũ
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
		
		// �����Ҵ� : T3SupplyNet
		// ��ȹ�����ð��� ���� �ɸ��� ������ ������ ����� ���� �߻�, ���� �ݺ������� ���� ���� üũ�Ͽ� ����
		/*
		 * int getServiceStatus();
		 * int�� ��ȯ
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
				
				// checkStatus �ʱ�ȭ
				setCheckStatus(0);
				
				// ���� ���� üũ�� ���� Timer, TimerTask ���� & ����
				java.util.Timer timerM = new java.util.Timer(true);
				MyTimerTask mTask = new MyTimerTask();
				mTask.setService(service);
				timerM.schedule(mTask, 0);

				// ���� ����
				try{
					Thread.sleep(10000);
				} catch(InterruptedException e){ 
					e.printStackTrace();
					returnVal = "ERROR"; 
				}
				
				System.out.println("=====================================================================================================");
				System.out.println("�����ٸ� ���� ���� :: " + checkStatus);
				System.out.println("=====================================================================================================");
				
				// ����
				if( checkStatus == 24) {
					returnVal = "SUCCESS";
				}
				// ȭ�鿡 STATUS_PLANNING ���� ���� : PLANNING ..
				else if( checkStatus == 12 || checkStatus == 14 || checkStatus == 22 || checkStatus == 23 || checkStatus == 32) {
					returnVal = "CONTINUE";
				}
				// ȭ�鿡 STATUS_PLANNING ���� ����
				else {
					returnVal = Integer.toString(checkStatus);
				}
				
				// Task ����
				mTask.cancel();
				// Timer ����
				timerM.cancel();
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}

	// ����(SupplyNet) ���� �����ٸ� ������ ���� CLASS
	public static class MySchTaskFA extends java.util.TimerTask { 
		
		private com.zionex.server.RMIService service;
		private String script = null;

		// com.zionex.server.RMIService service ����
		public void setService(com.zionex.server.RMIService service){
			this.service = service;
		}

		// scripts ����
		public void setScript(String scripts) {
			script = scripts;
		}
		
		public void run() {
			String result = null;
			try {
				//if( service.getServiceStatus() == 10 ) { // STATUS_UNLOADED ������ ��� ��ȹ����
					// ����(SupplyNet) ���� �����ٸ� ����
					System.out.println("=====================================================================================================");
					System.out.println("���� �����ٸ� ����,,, ");
					System.out.println("=====================================================================================================");
					result = service.runPlanStript(script);
				/*}
				else if( service.getServiceStatus() == 34 ) { // STATUS_SAVED ������ ��� ��ȹ���� : ���� ��ȹ �Ϸ�
					// ����(SupplyNet) ���� �����ٸ� ����
					System.out.println("=====================================================================================================");
					System.out.println("���� �����ٸ� ����,,, ");
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
		
		// ���밡��(scm_etc), ����ǰ(scm_ss)
		// �Ⱦ�(scm_ps_any), �ȼ�(scm_ps_ans), �ƻ�(scm_ps_asa), ����(scm_ps_kum), �λ�(scm_ps_pus), ���(scm_ps_nok)
		// �ȼ��������(scm_ps_ansb)
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
				
				// �ش� Script ���� ����ϰ��� �ϴ� ������ ������ ��� jParameters ������ ��� ����ϸ� �˴ϴ�.
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
				jParameters.put("comment", "������ ���� !!!");
				
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
				jParameters.put("comment", "������ ���� !!!");
				Vector<Object> params = new Vector<Object>();
	            params.addElement(new Integer(SERVICE_SAVE_SCHEDULING_RESULT));
	            params.addElement(jParameters);
				//===========================================================================================================
				
				Boolean bool = (Boolean) xmlrpc.execute("XMLRPC.request", params);
				System.out.println("=====================================================================================================");
				System.out.println("��ȹ��� ���� ��� :: " + bool);
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
		// ����/����(T3SupplyNet_RP), �����Ҵ�(T3SupplyNet_FA)
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
				System.out.println("��ȹ��� ���� ��� :: ");
				System.out.println("=====================================================================================================");
			} catch (Exception e) {
				e.printStackTrace();
				returnVal = "FAIL";
			}
		}
		
		return returnVal;
		
	}
	
	/**
	 * PLAN_VERSION_LOG �� ���� �ҷ�����
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
		
		// ���� ����
		try{
			//Thread.sleep(1000);
			Thread.sleep(300); 
		} catch(InterruptedException e){ 
			e.printStackTrace(); 
			returnVal = "ERROR"; 
		}
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();		
		
		// PLANT ID �� ���� ��� NA �� ����
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
	 * PLAN_VERSION_LOG ���̺� ���� UPDATE
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
	 * ��ȹ ����� PDB to META �� �����ϴ� SP ȣ��
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
	 * ��ȹ ����� META to LEGACY �� �����ϴ� SP ȣ��
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
	 * PLAN_VERSION_LOG ���̺��� VERSION, SEQ �о����
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
	 * ���ο� PLAN_STEP ����
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
		int planCnt = 9999; // �ش� CAT_ID, SUB_CAT ���� ������ ��ȹ COUNTING
		
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		System.out.println("=====================================================================================================");
		System.out.println("Method createPlanRec() is called with parameters :: period_type = " + period_type
								+ ", run_date = " + run_date + ", run_seq = " + run_seq + ", plan_step = " + plan_step
								+ ", cat_id = " + cat_id + ", sub_cat = " + sub_cat + ", user_id = " + user_id);
		System.out.println("=====================================================================================================");
		
		if( plan_step.equals("") || plan_step == null ) {
			// �ش� CAT_ID, SUB_CAT ���� ������ ��ȹ�� �ִ��� ���� üũ
			// (���ÿ� �ٸ� ����ڰ� ��Ʈ�� ���忡�� ��ȹ�� �����ߴ��� üũ�ؾ� ��)
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
	 * PLAN_VERSION_LOG �� MAX(PLAN_STEP) ã��
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
	 * ��ȹ comment ����
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
	 * HORIZON_INFO ���̺��� HORZN_START, HORZN_END, PLAN_START UPDATE
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
	 * �ϰ� ���� ��ȹ ���� ��
	 * PLAN_VERSION_LOG ���̺� ORDER_FLAG, SAFETY_FLAG UPDATE
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
