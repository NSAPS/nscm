package com.wisegrid.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zionex.t3sinc.common.CommonUtil;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;

import com.zionex.t3sinc.util.db.SincDatabaseUtility;


/**
 * 
 * @author iCOMPIA CORP.
 */
public class group_list extends HttpServlet {
	

	private static final long serialVersionUID = -419201700278107216L;
	
	
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;	
	String 		sql 	= null;
	//Map sessionMap 	= new HashMap();
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
	


	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		GridData gdReq = null;
		GridData gdRes = null;
        
        System.out.println("START...");
        
		// Encode Type; UTF-8
		req.setCharacterEncoding("UTF-8");
		res.setContentType("text/html;charset=UTF-8");
		
		
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("printWirter ��!!!!!!!!!!!!!!!!!!");
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		
		PrintWriter out = res.getWriter();
		
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		
		try {
			// WISEGRID_DATA Param WiseGridG
			String rawData = req.getParameter("WISEGRID_DATA");
			
			System.out.println("rawData: ys"+rawData);
						
			// 
			gdReq = OperateGridData.parse(rawData);
			
			System.out.println("gdReq: ys"+gdReq);

			//
			String mode = gdReq.getParam("mode");
			
			System.out.println("mode: ys"+mode);

			if (mode.equals("search")) // 
				gdRes = doQuery(gdReq);
			else if (mode.equals("insert")) // 
				gdRes = doInsert(gdReq); 
			else if (mode.equals("update")) // 
				gdRes = doUpdate(gdReq);				
			else if (mode.equals("delete")) // 
				gdRes = doDelete(gdReq);
			else if (mode.equals("save"))
				gdRes = doSave(gdReq);
				

		} catch (Exception e) {
			gdRes = new GridData();
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");
			e.printStackTrace();
		} finally {
			try {
				//
				OperateGridData.write(gdRes, out);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public GridData doQuery(GridData gdReq) throws Exception {
		  
		  GridData gdRes = new GridData();
		    
		  long startPoint = 0L; // ��������Ʈ
		  long endPoint = 0L;  // ����������Ʈ
		  long rowCount = 0L;  // ��ü������ ��

		  try {
		   /* WiseGrid���� �ö�� �÷������� gdRes�� �����Ѵ�.
		    * GridData ��ü�� �����Ͽ� ���ο� GridData��ü�� �����Ѵ�.
		    */
		   gdRes = OperateGridData.cloneResponseGridData(gdReq);
		  
		   String _board_search_condition = gdReq.getParam("_board_search_condition");
		   String _board_search_value = gdReq.getParam("_board_search_value");
		   String paramKey = "_board_search_condition!%!_board_search_value";
		   String paramCode = _board_search_condition + "!%!" + _board_search_value;
		   String query_id = "group_list";
		   
		   ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
		   rowCount = qResult.size();
		   /* �� ������ DB Connection�� ���� �ʰ� ������ ���� �����͸� ����� ��ȸ�Ѵ�.  */  
		   //sample_data sd = new sample_data();
		   System.out.println("������ ������_ũ��: "+ rowCount);
		   long pageCount = 0L; // ������ ������ 
		   long pageIndex = 0L; // �������ε���
		   
		   if (gdReq.getTotalCount() == -1L) {   
		              
		    /* �ӽ÷� ���� �������� rowCount�� ��ü Count�� �����Ѵ�.
		     * WiseGrid�� ��ü �����Ͱ� ��� �޾������� �Ǵ��ϴ� �����ͷ� ���ȴ�.
		     */ 
		    //rowCount = sd.getRowcount();
		    gdRes.setTotalCount(rowCount);
		    
		    /* ������ �����ͼ�, ���� �ε����� �����Ѵ�.
		     * ������ ������ ���� �� ������ count���� ũ�ų� ������ 
		     * ����¡ combobox�� ����� ���� �ʴ´�.
		     */
		    
		    gdRes.setNavigateValue("10,0");

		    pageCount = 10L; // ������ ������ �� 
		    pageIndex = 0L; // ���� �ε���

		   } else {
		    // �ӽ÷� ���� �������� rowCount�� ��ü Count�� �����Ѵ�.
		    gdRes.setTotalCount(gdReq.getTotalCount());
		    
		    // �޾ƿ� NavigateValue�� ���� �����Ѵ�.
		    gdRes.setNavigateValue(gdReq.getNavigateValue());
		    
		    // �޾ƿ� NavigateValue�� ���� ","�� �����ؼ� naviValue�� �迭�� �ִ´�.
		    String naviValue[] = gdRes.getNavigateValue().split(",");
		    
		    /* 0��° �迭���� ������ ������ ��
		     * 1��° �迭���� ������ �ε��� ��
		     */
		    pageCount = Long.parseLong(naviValue[0]);
		    pageIndex = Long.parseLong(naviValue[1]);
		    
		    // �ο�ī��Ʈ�� ������ ��ü ī��Ʈ���� �ִ´�..
		    rowCount = gdReq.getTotalCount();
		   }

		   // startPoint�� endPoint�� ����Ѵ�.
		   startPoint = pageCount * pageIndex ;
		   endPoint = startPoint + pageCount ;
		   

		   /* 
		    * ��üī��Ʈ���� endPoint�� �� Ŭ��� 
		    * ��ȸ�� �Ϸ�� ����̹Ƿ� endPoint�� ��ü ī��Ʈ�� �����Ѵ�.
		    */ 
		   if (endPoint >= rowCount)
			   endPoint = rowCount;
		   
		   // startPoint�� endPoint�� int ������ ��ȯ�Ѵ�,
		   int start = Integer.parseInt(String.valueOf(startPoint));
		   int end = Integer.parseInt(String.valueOf(endPoint));
		   
		   // DB ���� RowNnm�� ����ϹǷ� 
		   // DB startPoint = pageCount * pageIndex + 1
		   // DB endPoint = startPoint +(viewCount - 1) �� ���ش�.  

		   // startPoint���� endPoint������ �����͸� �����ͼ� �����͸� �����Ѵ�.
		   for (int i = start; i < end; i++) {
		   //GROUP_ID, GROUP_NAME 
		    
			gdRes.getHeader("CRUD").addValue("", "");				
			//gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("GROUP_ID").addValue(qResult.get(i).get(0), "");
			gdRes.getHeader("GROUP_NAME").addValue(qResult.get(i).get(1), "");
		   } 

		   if(rowCount == 0)
		    gdRes.setMessage("��ȸ����� �����ϴ�.");   
		   else
		    gdRes.setMessage( (startPoint+1) + " - " + endPoint + " ���� ��ȸ�Ǿ����ϴ�.");
		   
		   // ȭ�鿡 ������ Status�� �����Ѵ�
		   gdRes.setStatus("true");

		  } catch (Exception e) {
		   throw e;
		  }
		  
		  return gdRes;
		 }
	
	

	public GridData doQuery_old(GridData gdReq) throws Exception {
		
		System.out.println("�޴�Ŭ����!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		
		GridData gdRes = new GridData();
		
		
		long startPoint = 0L;	// ��������Ʈ
		long endPoint = 0L;		// ����������Ʈ
		long rowCountall = 0L;		// ��ü������ ��
		
		
		int rowCount = 0;

		try {
			/* WiseGrid���� �ö�� �÷������� gdRes�� �����Ѵ�.
			 * GridData ��ü�� �����Ͽ� ���ο� GridData��ü�� �����Ѵ�.
			 */			
			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			
			
			long pageCount = 0L; // ������ ������ 
			long pageIndex = 0L; // �������ε���
			

			
			
			
			//String from_date = gdReq.getParam("from_date");
			//String to_date = gdReq.getParam("to_date");
			
			String _board_search_condition = gdReq.getParam("_board_search_condition");
			String _board_search_value = gdReq.getParam("_board_search_value");
			String paramKey = "_board_search_condition!%!_board_search_value";
			String paramCode = _board_search_condition + "!%!" + _board_search_value;
			String query_id = "group_list";
			
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			
			rowCount = qResult.size();
			
			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");		
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("CRUD").addValue("", "");				
				//gdRes.getHeader("SELECTED").addValue("0", "");
				gdRes.getHeader("GROUP_ID").addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("GROUP_NAME").addValue(qResult.get(i).get(1), "");
				
			}
			System.out.println("rowCount ys2:"+rowCount);
			
			/* 
			 * 
			 * Status
			 */		
			gdRes.addParam("mode", "search");		
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		
		System.out.println("gdRes:"+gdRes);
				
		return gdRes;
	}

	
	/* 2009�� 2�� 9�� yongsoo update, insert, delete */
	/* ���� */
	public GridData doSave(GridData gdReq) throws Exception {
		
		System.out.println("doSave ���� Ž!!!");
		
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
	    stmt = conn.createStatement();                  // statement ��ü ����
	    String message = null;
		
		GridData gdRes = new GridData(); // WiseGrid ��ü����
		
		int rowCount = 0;
		int chkRowCnt = 0;
		
		String rsget = null;
		
		System.out.println("rowcnt: "+gdReq.getHeader("GROUP_ID").getRowCount());
						
		try {
			
			//ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			ArrayList createDataList = new ArrayList(rowCount);
			ArrayList updateDataList = new ArrayList(rowCount);
			ArrayList deleteDataList = new ArrayList(rowCount);
			
			System.out.println("rowCount:"+rowCount);
			System.out.println("chkRowCnt:"+chkRowCnt);
		 		 						
			//������ ����
			for (int i = 0; i < rowCount; i++) {
			 
				//ȭ�鿡�� ���޹��� "CRUD"�� HiddenValue�� �����´�.
				String crud = gdReq.getHeader("CRUD").getHiddenValue(i);
				
				if (crud.equals("C")) {
					System.out.println("�μ�Ʈ!!! ���� �����Ͽ� ����!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_insert";
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID!%!GROUP_NAME";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i)+"!%!";
							paramCode = paramCode + gdReq.getHeader("GROUP_NAME").getValue(i);
							

							//���� �߰��� ���� �ذ� �κ� �������� ���� �ȳ����� �ϱ����� �߰���.
							String sql= "";     
							       sql = "select GROUP_ID from REG_GROUP where GROUP_ID = '";
							       sql = sql + gdReq.getHeader("GROUP_ID").getValue(i)+ "'";       
							       rs = databaseUtility.executeQuery(stmt, sql);       
							        
							       if( rs.next() == false ){
							       	  new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							       }else{
							       	  System.out.println("������,,,;;");
							       }
							//�����߰� ����  ��.
							
							        
						  //new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
					}
					
					
					
					
				} else if (crud.equals("U")) {
					System.out.println("������Ʈ!! �����Ѱ��� ����!!!!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_update";
					
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID!%!GROUP_NAME";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i)+"!%!";
							paramCode = paramCode + gdReq.getHeader("GROUP_NAME").getValue(i);
							new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
					}
					
					
					
				} else if (crud.equals("D")) {
					System.out.println("����!! �����Ѱ��� ������!!!!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_delete";
					
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i);
							new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
						}
					
					
				}
			}
					
			/*
			 * ������ 3���� �ڷᱸ���� DataBase�� �Ѱ� ó���Ѵ�.
			 */
			
			// �� ������ ��������� ������ Ȯ���ϱ� ���� �����̹Ƿ�
			// ������� �����͸� ȭ���� fieldset����  ���� ���������� ����� �̷�������� Ȯ���Ѵ�.
			//String returnData = getSendData(createDataList, "C");
			//returnData += getSendData(updateDataList, "U");
			//returnData += getSendData(deleteDataList, "D");

			/* ȭ�鿡 ������  �Ķ���͸� �����Ѵ�.
			 * �޼����� �����Ѵ�.
			 * Status�� �����Ѵ�
			 */			
			gdRes.addParam("mode", "save");
			//gdRes.addParam("saveData", returnData);
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}
	
	private String getSendData(ArrayList sendData, String CRUDFlag) {
		
		StringBuffer sbData = new StringBuffer();
							
		for(int i = 0; i < sendData.size(); i++) {
			String[] rowData = (String[])sendData.get(i);					
			
			
			for(int k = 0; k < rowData.length; k++){
				sbData.append("[" + rowData[k] + "]");
			}
			sbData.append("\n");
		 
		}
		
			
		if (CRUDFlag.equals("C"))		
			sbData.append(sendData.size() + " ���� �����Ͱ� ��ϵǾ����ϴ�.\n\n");	
		else if (CRUDFlag.equals("U"))	
			sbData.append(sendData.size() + " ���� �����Ͱ� �����Ǿ����ϴ�.\n\n");
		else if (CRUDFlag.equals("D"))
			sbData.append(sendData.size() + " ���� �����Ͱ� �����Ǿ����ϴ�.\n\n");
			
		return sbData.toString();
	}	
	
	
	
	/* 2009�� 2�� 9�� yongsoo update, insert, delete ��...*/
	
	
	
	
	
	
	
	
	
	/**
	 * UI Connection LOG
	 * @param login_id
	 * @param service_id
	 * @param connection_ip
	 * @return
	 */
/*	
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
*/	
	
	

	/* ��� */
	
	
	private GridData doInsert(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();
		int rowCount = 0;
		
		
		String _board_search_condition = gdReq.getParam("_board_search_condition");
		String _board_search_value = gdReq.getParam("_board_search_value");
		String paramKey = "_board_search_condition!%!_board_search_value";
		String paramCode = _board_search_condition + "!%!" + _board_search_value;
		String query_id = "group_list";
		
		ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
		
		rowCount = qResult.size();
		
		
		
		// append�� StringBuffer�� insert_data�� �ѱ��.			
		String insertData = "";

		try {
			
	    
			
			// ȭ�鿡�� ���޹��� "SEQ_NO"�� Count�� �����´�.
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();
			
			// ��Ͻ� �Է��� �����͸� ������ ���·� ����� ���´�.
			String inData[][] = new String[rowCount][];

			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}
			
			/*
			 * ������ �ڷᱸ���� DataBase�� �Ѱ� ó���Ѵ�.
			 */
			
			// �� ������ ��������� ������ Ȯ���ϱ� ���� �����̹Ƿ�
			// ������� �����͸� ȭ���� fieldset����  ���� ���������� ����� �̷�������� Ȯ���Ѵ�.			
			insertData = getSendData(inData, "C");	
			
			/* ȭ�鿡 ������  �Ķ���͸� �����Ѵ�.
			 * �޼����� �����Ѵ�.
			 * Status�� �����Ѵ�
			 */	
			gdRes.addParam("mode", "insert");
			gdRes.addParam("insert_data", insertData);
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}

	/**/
	private GridData doUpdate(GridData gdReq) throws Exception {		
 
		System.out.println("������Ʈ!!!");
		GridData gdRes = new GridData();
		int rowCount = 0;
				
		String updatedata = "";
		
		String paramKey = "";
		String paramCode = "";
		String query_id = "group_list_update";

		try {
			//
			rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

			
			for (int i = 0; i < rowCount; i++) {	
				
				paramKey = "GROUP_ID!%!GROUP_NAME";
				
				paramCode = gdReq.getHeader("GROUP_ID").getValue(i)+"!%!";
				paramCode = paramCode + gdReq.getHeader("GROUP_NAME").getValue(i);
				new CommonUtil().executeQuery(paramKey,paramCode,query_id);
			}

			
			
			
			/*
			String inData[][] = new String[rowCount][];
			

			
			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}

			updatedata = getSendData(inData, "U");
			*/
			

			
			gdRes.addParam("mode", "update");
			gdRes.addParam("update_data", updatedata);
			gdRes.setMessage("Success");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}

	/* ���� */
	private GridData doDelete(GridData gdReq) throws Exception {
		
		System.out.println("����!!!!!!");
		GridData gdRes = new GridData();
		int rowCount = 0;
				
		String deleteData = "";
		
		String paramKey = "";
		String paramCode = "";
		String query_id = "group_list_delete";

		try {
			//
			rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

			
			for (int i = 0; i < rowCount; i++) {	
				
				paramKey = "GROUP_ID";
				
				paramCode = gdReq.getHeader("GROUP_ID").getValue(i);
				new CommonUtil().executeQuery(paramKey,paramCode,query_id);
			}
			
			gdRes.addParam("mode", "delete");
			gdRes.addParam("delete_data", deleteData);
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
			

		} catch (Exception e) {
			throw e;
		}
		return gdRes;
	}
	
	private String getSendData(String[][] sendData, String flag) {
		
		StringBuffer sbData = new StringBuffer();
					
		for(int i = 0; i < sendData.length; i++) {
			String[] rowData = (String[])sendData[i];
			for(int j = 0; j < rowData.length; j++)
				sbData.append("[" + rowData[j] + "]");
			sbData.append("\n");
		}
		
		if(flag.equals("C"))
			sbData.append(sendData.length + "\n");
		else if(flag.equals("U"))
			sbData.append(sendData.length + "\n");
			
		return sbData.toString();
	}
	
	private String getSendData2(String[] sendData) {
		
		StringBuffer sbData = new StringBuffer();
		
		sbData.append(sendData.length + "\n");
			
		return sbData.toString();
	}
}