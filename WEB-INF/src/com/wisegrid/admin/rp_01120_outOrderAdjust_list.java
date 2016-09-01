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
public class rp_01120_outOrderAdjust_list extends HttpServlet {

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
		
		PrintWriter out = res.getWriter();
		try {
			// WISEGRID_DATA Param WiseGridG
			String rawData = req.getParameter("WISEGRID_DATA");
			
			// 
			gdReq = OperateGridData.parse(rawData);

			//
			String mode = gdReq.getParam("mode");
			
			if (mode.equals("search")) // 
				gdRes = doQuery(gdReq);
			else if (mode.equals("save"))
				gdRes = doSave(gdReq);
			else if (mode.equals("create"))
				gdRes = doCreate(gdReq);

			
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
		int rowCount = 0;
		
		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			System.out.println("getParam...");
			String item_id = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_start");
			String version = gdReq.getParam("version");
			String sales_yyyy = gdReq.getParam("sales_yyyy");
			String sales_version = gdReq.getParam("sales_version");
			String seq = gdReq.getParam("seq");
			
			String paramKey = "item_id!%!trans_start!%!version!%!sales_yyyy!%!sales_version!%!seq";
			String paramCode = item_id + "!%!" + trans_start + "!%!"
							 + version + "!%!" + sales_yyyy + "!%!" 
							 + sales_version + "!%!" + seq;
			String query_id = gdReq.getParam("query_id");
			System.out.println("getSelQeury : " + query_id);
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			/*��� ����� ����Ʈ�� �����Ͽ� �޺����� ����*/
			String query_id2 = "new_src_loc_and_short_name_list"; 
			System.out.println("getSelQeury : " + query_id2);
			ArrayList<ArrayList<String>> locList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = locList.size();
			
			String[] locIdList = new String[arrIdx];
			String[] locNameList = new String[arrIdx];
			
			System.out.println("��� ����� �޺�����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				locIdList[i] = locList.get(i).get(0);   // ��� ����� ID �޺�����Ʈ ����
				locNameList[i] = locList.get(i).get(1); // ��� ����� �̸� �޺�����Ʈ ����
			}
			
			System.out.println("��� ����� �÷��� �޺�����Ʈ set");
			gdRes.getHeader("SRC_LOC").setComboValues(locNameList, locIdList );		//��� ����� �޺�����Ʈ ��� ����� �÷��� set
				        
	        //�׸��忡 data input
			System.out.println("�׸��� ��ü�� Data Input");
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("CRUD"			 ).addValue("", "");                    
				gdRes.getHeader("DC_NAME"		 ).addValue(qResult.get(i).get(2 ), qResult.get(i).get(1 )); // �԰����/�԰����ڵ�
				gdRes.getHeader("MON_QTY"		 ).addValue(qResult.get(i).get(0 ), "");//��������
				gdRes.getHeader("BEFORE_SALE_QTY").addValue(qResult.get(i).get(21), "");//�����Ǹ�
				gdRes.getHeader("SALE_CUM_QTY"	 ).addValue(qResult.get(i).get(4 ), "");//�ǸŴ���
				gdRes.getHeader("TODAY_SALE_PLAN").addValue(qResult.get(i).get(23), "");//�����ǸŰ�ȹ
				gdRes.getHeader("ORD_QTY"		 ).addValue(qResult.get(i).get(5 ), "");//�Ǹ��ֹ�
				gdRes.getHeader("WEEK1_QTY"		 ).addValue(qResult.get(i).get(6 ), "");//1������Ǹ�
				gdRes.getHeader("WEEK3_QTY"		 ).addValue(qResult.get(i).get(7 ), "");//3������Ǹ�
				gdRes.getHeader("TODAY_STOCK"	 ).addValue(qResult.get(i).get(3 ), "");//�������
				gdRes.getHeader("IN_TRANS_QTY"	 ).addValue(qResult.get(i).get(8 ), "");//�԰���
				gdRes.getHeader("OUT_TRANS_QTY"	 ).addValue(qResult.get(i).get(9 ), "");//�����
				gdRes.getHeader("STOCK_DAY"		 ).addValue(qResult.get(i).get(11), "");//����ϼ�
				gdRes.getHeader("STOCK_TERM"	 ).addValue(qResult.get(i).get(25), "");//���Ⱓ
				gdRes.getHeader("SAFETY_STOCK"	 ).addValue(qResult.get(i).get(13), "");//�������
				gdRes.getHeader("SALE_QTY2"		 ).addValue(qResult.get(i).get(12), "");//�����ǸŰ�ȹ
				gdRes.getHeader("ORD_QTY2"		 ).addValue(qResult.get(i).get(24), "");//�����ֹ�
				gdRes.getHeader("STOCK_QTY1"	 ).addValue(qResult.get(i).get(10), "");//���ϱ������
				gdRes.getHeader("REP_QTY"		 ).addValue(qResult.get(i).get(14), "");//����䱸��
				gdRes.getHeader("TRANS_PLAN_PLT" ).addValue(qResult.get(i).get(15), "");//����PLT
				gdRes.getHeader("TRANS_PLAN_QTY" ).addValue(qResult.get(i).get(16), "");//����BOX
				gdRes.getHeader("SRC_LOC"		 ).addSelectedHiddenValue(qResult.get(i).get(17));//�������
				gdRes.getHeader("STOCK_QTY2"	 ).addValue(qResult.get(i).get(19), "");//���ϱ⸻���
				gdRes.getHeader("MIN_PICK_QTY"	 ).addValue(qResult.get(i).get(20), "");//�ּҼ��۴���
				gdRes.getHeader("BOX_PER_PLT"	 ).addValue("", "");
				gdRes.getHeader("OLD_SAFE_QTY"	 ).addValue(qResult.get(i).get(13), "");// 
				gdRes.getHeader("OLD_BOX_QTY"	 ).addValue(qResult.get(i).get(16), "");
				gdRes.getHeader("OLD_SRC_LOC"	 ).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("SAFE_UPDATE_FLAG").addValue("", "");
				gdRes.getHeader("PLAN_UPDATE_FLAG").addValue("", "");
				gdRes.getHeader("UNIT_UPDATE_FLAG").addValue("", "");
							
			}
		
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			System.out.println("ȭ�鿡 ������ �ĸ����� ����");
			gdRes.addParam("mode", "search");
			gdRes.setMessage("��ȸ �Ϸ�");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		System.out.println("�׸��� ��ü return");		
		return gdRes;
	}

	
	
	// ����
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("DC_NAME").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			System.out.println("CRUD Row Count : " + rowCount);
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("getParam");
			String version = gdReq.getParam("version");
			String seq = gdReq.getParam("seq");
			String item_id = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_date");
			String user_id = gdReq.getParam("user_id");
			String stock_type = gdReq.getParam("stock_type");
			
			String pre_sql = "DELETE  OUT_ORDER_ADJUST_TEMP \n"
						   + "WHERE   USER_ID ='" + user_id + "' \n"
						   + "AND	  ITEM_ID ='" + item_id + "' \n"; 							   
			
			System.out.println("pre_sql executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, pre_sql);
			
			System.out.println("pre_sql executeQuery ����!!!");
			
			String sql;
			if(stock_type.equals("base")){
				sql= "INSERT  INTO OUT_ORDER_ADJUST_TEMP (VERSION, SEQ, ITEM_ID, TRANS_START, TGT_LOC, \n" 
				+ "            SAFE_QTY, OLD_SAFE_QTY, PLT_QTY, BOX_QTY, OLD_BOX_QTY, SRC_LOC,      \n" 
				+ "            OLD_SRC_LOC, MIN_TRANS_QTY, SAFE_UPDATE_FLAG, PLAN_UPDATE_FLAG,      \n" 
				+ "            UNIT_UPDATE_FLAG, USER_ID)                                           \n";
			}else{
				sql= "INSERT  INTO OUT_ORDER_ADJUST_TEMP (VERSION, SEQ, ITEM_ID, TRANS_START, TGT_LOC, \n" 
					+ "            SAFE_QTY, OLD_SAFE_QTY, PROD_PLT, PROD_BOX, OLD_BOX_QTY, SRC_LOC,      \n" 
					+ "            OLD_SRC_LOC, MIN_TRANS_QTY, SAFE_UPDATE_FLAG, PLAN_UPDATE_FLAG,      \n" 
					+ "            UNIT_UPDATE_FLAG, USER_ID)                                           \n";
			}
			
			boolean flag = false;
			// ������ ����
			System.out.println("sql ���� ����");
			for (int i = 0; i < rowCount; i++) {
				
				String tgt_loc = gdReq.getHeader("DC_NAME").getHiddenValue(i);
				if(tgt_loc.equals("") || tgt_loc.equals(null)){
					continue;
				}else{
					
					if( flag ){
						sql += " union all \n"; 
					} 
					flag = true;
					//String tgt_loc = gdReq.getHeader("DC_NAME").getHiddenValue(i);
					String safe_qty = gdReq.getHeader("SAFETY_STOCK").getValue(i);
					String old_safe_qty = gdReq.getHeader("OLD_SAFE_QTY").getValue(i);
					String plt_qty = gdReq.getHeader("TRANS_PLAN_PLT").getValue(i);
					String box_qty = gdReq.getHeader("TRANS_PLAN_QTY").getValue(i);
					String old_box_qty = gdReq.getHeader("OLD_BOX_QTY").getValue(i);
					
					String src_loc = "";
					if(gdReq.getHeader("SRC_LOC").getSelectedIndex(i) > -1){							
						src_loc = gdReq.getHeader("SRC_LOC").getComboHiddenValues()[gdReq.getHeader("SRC_LOC").getSelectedIndex(i)];
					}
					
					String old_src_loc = gdReq.getHeader("OLD_SRC_LOC").getValue(i);
					String min_trans_qty = gdReq.getHeader("MIN_PICK_QTY").getValue(i);
					String safe_update_flag = gdReq.getHeader("SAFE_UPDATE_FLAG").getValue(i);
					String plan_update_flag = gdReq.getHeader("PLAN_UPDATE_FLAG").getValue(i);
					String unit_update_flag = gdReq.getHeader("UNIT_UPDATE_FLAG").getValue(i);
					
					sql += "SELECT  '" + version + "' VERSION, '" + seq + "' SEQ, '" + item_id + "' ITEM_ID, TO_DATE('" + trans_start + "','YYYY-MM-DD') TRANS_START, '" + tgt_loc + "' TGT_LOC, '" + safe_qty + "' SAFE_QTY, '" + old_safe_qty + "' OLD_SAFE_QTY, '" + plt_qty + "' PLT_QTY, '" + box_qty + "' BOX_QTY, '" + old_box_qty + "' OLD_BOX_QTY, '" + src_loc + "' SRC_LOC, '" + old_src_loc + "' OLD_SRC_LOC, '" + min_trans_qty + "' MIN_TRANS_QTY, '" + safe_update_flag + "' SAFE_UPDATE_FLAG, '" + plan_update_flag + "' PLAN_UPDATE_FLAG, '" + unit_update_flag + "' UNIT_UPDATE_FLAG, '" + user_id + "' USER_ID  FROM DUAL ";
				}			
			}
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			System.out.println("call sp_01120_outOrderAdjust() ����!!!");
			
			String sql2 = "call sp_01120_outOrderAdjust('" + user_id + "','" + item_id + "')";
			
			boolean result = stmt.execute(sql2);
			
			System.out.println("call sp_01120_outOrderAdjust() ����!!! - ��� : " + result);
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doSave() end!!!");

		return gdRes;
	}	
	
	// ������� ��ȹ�ݿ�
	public GridData doCreate(GridData gdReq) throws Exception {

		System.out.println("doCreate() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("DC_NAME").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			//rowCount = gdReq.getHeader("CRUD").getRowCount();
			rowCount = gdReq.getHeader("DC_NAME").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "create");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			//System.out.println("CRUD Row Count : " + rowCount);
			
			String sql 
			= "INSERT  INTO OUT_ORDER_ADJUST_TEMP (VERSION, SEQ, ITEM_ID, TRANS_START, TGT_LOC, \n" 
			+ "            SAFE_QTY, OLD_SAFE_QTY, PLT_QTY, BOX_QTY, OLD_BOX_QTY, SRC_LOC,      \n" 
			+ "            OLD_SRC_LOC, MIN_TRANS_QTY, SAFE_UPDATE_FLAG, PLAN_UPDATE_FLAG,      \n" 
			+ "            UNIT_UPDATE_FLAG, USER_ID)                                           \n";

			System.out.println("getParam");
			String version = gdReq.getParam("version");
			String seq = gdReq.getParam("seq");
			String item_id = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_date");
			String user_id = gdReq.getParam("user_id");
			
			// ������ ����
			System.out.println("sql ���� ����");
			for (int i = 0; i < rowCount; i++) {
				String tgt_loc = gdReq.getHeader("DC_NAME").getHiddenValue(i);
				System.out.println(tgt_loc);
				if(tgt_loc.equals(null) || tgt_loc.equals("")) {
					continue;
				}
				else{
					if( i > 1){
						sql += " union all \n"; 
					} 
					
					String safe_qty = gdReq.getHeader("SAFETY_STOCK").getValue(i);
					String old_safe_qty = gdReq.getHeader("OLD_SAFE_QTY").getValue(i);
					String plt_qty = gdReq.getHeader("TRANS_PLAN_PLT").getValue(i);
					String box_qty = gdReq.getHeader("TRANS_PLAN_QTY").getValue(i);
					String old_box_qty = gdReq.getHeader("OLD_BOX_QTY").getValue(i);
					
					String src_loc = "";
					if(gdReq.getHeader("SRC_LOC").getSelectedIndex(i) > -1){							
						src_loc = gdReq.getHeader("SRC_LOC").getComboHiddenValues()[gdReq.getHeader("SRC_LOC").getSelectedIndex(i)];
					}
					
					String old_src_loc = gdReq.getHeader("OLD_SRC_LOC").getValue(i);
					String min_trans_qty = gdReq.getHeader("MIN_PICK_QTY").getValue(i);
					String safe_update_flag = gdReq.getHeader("SAFE_UPDATE_FLAG").getValue(i);
					String plan_update_flag = gdReq.getHeader("PLAN_UPDATE_FLAG").getValue(i);
					String unit_update_flag = gdReq.getHeader("UNIT_UPDATE_FLAG").getValue(i);
					
					
					sql += "SELECT  '" + version + "' VERSION, '" + seq + "' SEQ, '" + item_id + "' ITEM_ID, TO_DATE('" + trans_start + "','YYYY-MM-DD') TRANS_START, '" + tgt_loc + "' TGT_LOC, '" + safe_qty + "' SAFE_QTY, '" + old_safe_qty + "' OLD_SAFE_QTY, '" + plt_qty + "' PLT_QTY, '" + box_qty + "' BOX_QTY, '" + old_box_qty + "' OLD_BOX_QTY, '" + src_loc + "' SRC_LOC, '" + old_src_loc + "' OLD_SRC_LOC, '" + min_trans_qty + "' MIN_TRANS_QTY, '" + safe_update_flag + "' SAFE_UPDATE_FLAG, '" + plan_update_flag + "' PLAN_UPDATE_FLAG, '" + unit_update_flag + "' UNIT_UPDATE_FLAG, '" + user_id + "' USER_ID  FROM DUAL ";
				}
								
			}
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			System.out.println("call sp_01120_outOrderAdjust_create() ����!!!");
			
			String sql2 = "call sp_01120_outOrderAdjust_create('" + item_id + "', '" + user_id + "')";
			
			boolean result = stmt.execute(sql2);
			
			System.out.println("call sp_01120_outOrderAdjust_create() ����!!! - ��� : " + result);
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "create");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doCreate() end!!!");

		return gdRes;
	}
	
}
