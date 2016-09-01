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
import com.zionex.t3sinc.common.ControlBoard.MyLoadTask;

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
public class sc_01060_plantAllocationPlanResultAnalysis_grid extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;
	
	Connection 	conn 	= null;
	Statement 	stmt	= null;
	ResultSet	rs		= null;	
	String 		sql 	= null;
	//Map sessionMap 	= new HashMap();
	
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();	
	
	boolean endChk = true; // ���� ���� üũ ���� ���� flag
	
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
	
	/* ��ȸ */
	public GridData doQuery(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();		
		int rowCount = 0;

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
									
			//String p_plant_id = gdReq.getParam("plant_id");
			String p_plant_alloc_version = gdReq.getParam("plant_alloc_version");
			String p_sdate  = gdReq.getParam("sdate");
			String p_checked_domain  = gdReq.getParam("checked_domain");
			String p_checked_pa_pr  = gdReq.getParam("checked_pa_pr");
			//String p_edate  = gdReq.getParam("edate");
			//String p_checked_po_type = gdReq.getParam("checked_po_type");
			
			System.out.println("p_plant_alloc_version : "+p_plant_alloc_version);
			System.out.println("p_sdate : "+p_sdate);
			System.out.println("p_checked_domain : "+p_checked_domain);
			System.out.println("p_checked_pa_pr : "+p_checked_pa_pr);
			
			//System.out.println("p_edate"+p_edate);
			
			//�����ܿ��� ���Ǵ� Ű(ID) ���� ����.
			//String paramKey   ="selected_plant!%!sdate!%!edate";
			String paramKey   ="plant_alloc_version!%!sdate!%!checked_domain!%!checked_pa_pr";
			
			//�����ܿ��� ���Ǵ� Ű���� ���� ���� ����.
			//String paramCode  = p_plant_id + "!%!" + p_sdate + "!%!" + p_edate;
			String paramCode  = p_plant_alloc_version + "!%!" + p_sdate + "!%!" + p_checked_domain + "!%!" + p_checked_pa_pr;
			
			//String query_id   = "sc_12030_dailyProductionPlanPoTrans_list" + p_checked_po_type;
			String query_id   = "sc_01060_plantAllocationPlanResultAnalysis_grid";

			//ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			
			rowCount = qResult.size();
			
			System.out.println("��ȸ�Ϸ�!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println(qResult);
			
			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");	
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			for (int i = 0; i < rowCount; i++) {
				
				//qResult�� 0���� ������. , rs �� 1���� ������!! 
				//gdRes.getHeader("RES_TP" ).addValue(rs.getString(1), "");
                gdRes.getHeader("RES_TP" ).addValue(qResult.get(i).get(2 ), ""); //��������
                gdRes.getHeader("ITEM_ID"  ).addValue(qResult.get(i).get(3 ), ""); //�����ڵ�
                gdRes.getHeader("ITEM_NAME"  ).addValue(qResult.get(i).get(4 ), ""); //�����ڵ��
                gdRes.getHeader("W3_AVG_RATIO"  ).addValue(qResult.get(i).get(5 ), ""); //3����������� (����)
                gdRes.getHeader("W1_AVG_RATIO"  ).addValue(qResult.get(i).get(6 ), ""); //1����������� (����)
                gdRes.getHeader("SAFETY_STOCK"  ).addValue(qResult.get(i).get(7 ), ""); //������� (����)
                gdRes.getHeader("BASE_STOCK"  ).addValue(qResult.get(i).get(8 ), ""); //������� (����)
                gdRes.getHeader("RECEIPT_EXPT"  ).addValue(qResult.get(i).get(9 ), ""); //���ֻ����ȹ (����)
                gdRes.getHeader("SALES_PLAN"  ).addValue(qResult.get(i).get(10), ""); //�����ǸŰ�ȹ (����)
                gdRes.getHeader("SALES_ACT_VS_SALES_PLAN_1"  ).addValue(qResult.get(i).get(38), ""); //���� �ǸŰ�ȹ - ���� 1�� ��� �ǸŽ��� (���� �ǸŰ�ȹ ��� ����) (����)
                gdRes.getHeader("SALES_VS_WEEK1_AVG"  ).addValue(qResult.get(i).get(11), ""); //1������ǸŴ�� (����)
                gdRes.getHeader("EXPERT_STOCK"  ).addValue(qResult.get(i).get(12), ""); //�������(������)
                gdRes.getHeader("N_PLAN_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(31), ""); //���ְ�ȹ�������ϼ�
                gdRes.getHeader("N_ACT_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(32), ""); //���ֽ����������ϼ�
                gdRes.getHeader("N_RECEIPT_EXPT"  ).addValue(qResult.get(i).get(13), ""); //���ֻ����ȹ
                gdRes.getHeader("RP1_QTY"  ).addValue(qResult.get(i).get(18), "");//����䱸��(����)
                gdRes.getHeader("PO_QTY1"  ).addValue(qResult.get(i).get(20), ""); //�����ʿ䷮(����)
                gdRes.getHeader("NWK_ADJ_QTY"  ).addValue(qResult.get(i).get(24), ""); //�䱸/���� ���� (����)
                gdRes.getHeader("W1_SALES_PLAN_DIFF"  ).addValue(qResult.get(i).get(41), ""); //1����� �Ǹ� ��ȹ ������
                gdRes.getHeader("W3_SALES_PLAN_DIFF"  ).addValue(qResult.get(i).get(42), ""); //3����� �Ǹ� ��ȹ ������
                gdRes.getHeader("N_SALES_PLAN"  ).addValue(qResult.get(i).get(25), ""); //�����ǸŰ�ȹ
                gdRes.getHeader("SALES_ACT_VS_SALES_PLAN_2"  ).addValue(qResult.get(i).get(39), ""); //���� �ǸŰ�ȹ - ���� 1�� ��� �ǸŽ��� (���� �ǸŰ�ȹ��� ����)
                gdRes.getHeader("EXPERT_STOCK2"  ).addValue(qResult.get(i).get(26), ""); //�������(������)
                gdRes.getHeader("NN_PLAN_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(33), ""); //�����ְ�ȹ�������ϼ�
                gdRes.getHeader("NN_ACT_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(34), ""); //�����ֽ����������ϼ�
                gdRes.getHeader("RP2_QTY"  ).addValue(qResult.get(i).get(19), ""); //����䱸��(������)
                gdRes.getHeader("PO_QTY2"  ).addValue(qResult.get(i).get(21), ""); //������ �����ʿ䷮.
                gdRes.getHeader("NN_SALES_PLAN"  ).addValue(qResult.get(i).get(22), ""); //�������ǸŰ�ȹ
                gdRes.getHeader("SALES_ACT_VS_SALES_PLAN_3"  ).addValue(qResult.get(i).get(40), ""); //������ �ǸŰ�ȹ - ������ 1�� ��� �ǸŽ��� (������ �ǸŰ�ȹ��� ����)
                gdRes.getHeader("EXPERT_STOCK3"  ).addValue(qResult.get(i).get(23), ""); //�������� ������� (������) �⸻!! �������.
                gdRes.getHeader("NNN_ACT_VS_STOCK_WORK"  ).addValue(qResult.get(i).get(37), ""); //�������ֽ����������ϼ� (������) �⸻! �����������ϼ�.
                gdRes.getHeader("CRUD" ).addValue(qResult.get(i).get(43 ), ""); //������׸����� crud ���°��� ������ (���� ���� ����)
                gdRes.getHeader("RP0_QTY" ).addValue(qResult.get(i).get(17 ), ""); //���� �����ʿ䷮
                gdRes.getHeader("W1" ).addValue(qResult.get(i).get(44 ), ""); //���� DUE_DATE (�ش� ���� ������� ������)
                gdRes.getHeader("W2" ).addValue(qResult.get(i).get(45 ), ""); //���� DUE_DATE (�ش� ���� ������� ������)
                gdRes.getHeader("W3" ).addValue(qResult.get(i).get(46 ), ""); //������ DUE_DATE (�ش� ���� ������� ������)
                gdRes.getHeader("NNWK_WORK" ).addValue(qResult.get(i).get(35 ), ""); //������ �����ϼ�
                gdRes.getHeader("SALES_MEAN_1WEEK" ).addValue(qResult.get(i).get(36 ), ""); //1�� ��� �Ǹ�
                gdRes.getHeader("MI_CHGO" ).addValue(qResult.get(i).get(47 ), ""); //���� �����
                
 			}

			//gdRes.addParam("mode", gdReq.getParam("mode"));
			gdRes.addParam("mode", "search");
			gdRes.setMessage("��ȸ�Ϸ�");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
				
		return gdRes;
	}
	
	/*
	 * insert, update, delete
	 */
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		int union_check = 0; // UNION ALL ���Կ��� CHECK
		

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			String mode = gdReq.getParam("mode");
			
			String p_in_up_chk = gdReq.getParam("p_in_up_chk");
			
			String p_plant_alloc_version = gdReq.getParam("plant_alloc_version");
			String p_sdate  = gdReq.getParam("sdate");
			String P_checked_domain  = gdReq.getParam("checked_domain");
			String p_checked_pa_pr  = gdReq.getParam("checked_pa_pr");
			String made_by = gdReq.getParam("user_id");

			String version = "";
			String item_id = "";
			String due_date1 = ""; //���� �ش� �����
			String due_date2 = ""; //���� �ش� �����
			String due_date3 = ""; //������ �ش� �����
			String made_type = "C";
			String made_dttm = "SYSDATE";

			
			//���� �����ʿ䷮
			String rp0_qty = "";
			//���� �����ʿ䷮.
			String po_qty1 = "";
			//������ �����ʿ䷮.
			String po_qty2 = "";
			
			String crud = "";
			
			System.out.println("p_plant_alloc_version : "+p_plant_alloc_version);
			System.out.println("p_sdate : "+p_sdate);
			System.out.println("P_checked_domain : "+P_checked_domain);
			System.out.println("p_checked_pa_pr : "+p_checked_pa_pr);
			System.out.println("p_in_up_chk : "+p_in_up_chk);

			
			
			//������ �Ǽ��� ������ �����ȳ����ϱ�����.
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("CRUD Row Count : " + rowCount);
			
			String sql1 = "";
			String sql = "";
			
			//������ ������ �ش� ������ PLANT_ALLOC_PLAN ���̺����� ��� PLANT_ALLOC_ITEM_ADJ ���̺� INSERT!!
			//����,���� �м��ؼ� ������ insert ������ �����´�.
/* �� �̷��� �ؾ��ϴ��� �𸣰��� _ 2009.06.17 */
/*			
			if(p_in_up_chk.equals("p_insert")){
				
				//sql += "insert into DAILY_SCH_PLAN_MATRIX(PLANT_ID, VERSION, PROC_ID, ITEM_ID, PROD_DATES, SHIFT_TYPE, SHIFT_QTY, ORD_NO, ORD_ITEM_NO, MADE_DTTM, MADE_BY) \n";
				sql1 = "INSERT INTO PLANT_ALLOC_ITEM_ADJ(VERSION, ITEM_ID, DUE_DATE, LST_PRODQTY, MADE_TYPE, MADE_DTTM, MADE_BY) \n";
				sql1 += "SELECT VERSION, ITEM_ID, DUE_DATE, SUM(QTY) AS QTY, '"+made_type+"', SYSDATE, '"+made_by+"' \n";
				sql1 += "  FROM PLANT_ALLOC_PLAN WHERE VERSION = '" + p_plant_alloc_version + "' \n";
				sql1 += " GROUP BY VERSION, ITEM_ID, DUE_DATE  \n";
                
    			System.out.println("-----------------------------------------------QUERY1111-----------------------------------------------");
    			System.out.println(sql1);
    			System.out.println("-----------------------------------------------QUERY1111-----------------------------------------------");
    			
    			System.out.println("executeQuery111 ����!!!");                
                
                rs = databaseUtility.executeQuery(stmt, sql1);
                
                System.out.println("executeQuery111 ����!!!");
			}
*/			
			
			
			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
				sql  = "merge into PLANT_ALLOC_ITEM_ADJ PA \n";
				sql += "using ( \n";
			
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				
				if(gdReq.getHeader("ITEM_ID").getValue(i).equals("�Ұ�") || gdReq.getHeader("ITEM_NAME").getValue(i).equals("�Ѱ�")){
					 System.out.println("ITEM_ID�� �Ұ��̰ų� ITEM_NAME�� �Ѱ��϶��� �ƹ��͵� �������!!!!");
				 } else {
					 
					if( union_check > 0){
						sql += "union all \n"; 
					}
					crud = gdReq.getHeader("CRUD").getValue(i);
					System.out.println(gdReq.getHeader("ITEM_NAME").getValue(i));	
					System.out.println(crud);					 
					 
					//�Ķ���͸� ������ ����!!
					 version = p_plant_alloc_version;
					 item_id = gdReq.getHeader("ITEM_ID").getValue(i);
					 due_date1 = gdReq.getHeader("W1").getValue(i);
					 due_date2 = gdReq.getHeader("W2").getValue(i);
					 due_date3 = gdReq.getHeader("W3").getValue(i);
					 made_type = "UD";
					 made_dttm = "SYSDATE";
					
					
					//���� �����ʿ䷮
					rp0_qty = gdReq.getHeader("RP0_QTY").getValue(i);
					//���� �����ʿ䷮.
					po_qty1 = gdReq.getHeader("PO_QTY1").getValue(i);
					//������ �����ʿ䷮.
					po_qty2 = gdReq.getHeader("PO_QTY2").getValue(i);
					
					
						
						//�Ѱ��� �ο�. 3���� �÷�.					//replace(�ʵ��, '����������', '�����Ĺ���')
						//-------------------------------------------------------------------------------------------------------------------
						sql += "select '" + version + "' AS VERSION, '" + item_id + "' AS ITEM_ID, '" + due_date1 + "' AS DUE_DATE, TO_NUMBER(REPLACE('" + rp0_qty + "',',','')) AS LST_PRODQTY, '" + made_type + "' AS MADE_TYPE, " + made_dttm + " AS MADE_DTTM, '" + made_by + "' AS MADE_BY from DUAL union all \n";
						sql += "select '" + version + "' AS VERSION, '" + item_id + "' AS ITEM_ID, '" + due_date2 + "' AS DUE_DATE, TO_NUMBER(REPLACE('" + po_qty1 + "',',','')) AS LST_PRODQTY, '" + made_type + "' AS MADE_TYPE, " + made_dttm + " AS MADE_DTTM, '" + made_by + "' AS MADE_BY from DUAL union all \n";
						sql += "select '" + version + "' AS VERSION, '" + item_id + "' AS ITEM_ID, '" + due_date3 + "' AS DUE_DATE, TO_NUMBER(REPLACE('" + po_qty2 + "',',','')) AS LST_PRODQTY, '" + made_type + "' AS MADE_TYPE, " + made_dttm + " AS MADE_DTTM, '" + made_by + "' AS MADE_BY from DUAL \n";
						//-------------------------------------------------------------------------------------------------------------------					 
				 
					union_check++;
				 }
				 
									
			}//for�� ��.
			
			sql += ") PP \n";
			
			
			sql += "on (PA.VERSION = PP.VERSION                                                                                                  \n";
			sql += "AND PA.ITEM_ID = PP.ITEM_ID                                                                                                  \n";
			sql += "AND PA.DUE_DATE = PP.DUE_DATE)                                                                                               \n";
			sql += "when matched then update set                                                                                                 \n";
			sql += "     --PA.VERSION = PP.VERSION,                                                                                                 \n";
			sql += "     --PA.ITEM_ID = PP.ITEM_ID,                                                                                                 \n";
			sql += "     --PA.DUE_DATE = PP.DUE_DATE,                                                                                               \n";
			sql += "     PA.LST_PRODQTY = PP.LST_PRODQTY,                                                                                                 \n";
			sql += "     PA.MADE_TYPE = PP.MADE_TYPE,                                                                                             \n";
			sql += "     PA.MADE_DTTM = PP.MADE_DTTM,                                                                                             \n";
			sql += "     PA.MADE_BY = PP.MADE_BY                                                                                                 \n";
			sql += "when not matched then insert(PA.VERSION, PA.ITEM_ID, PA.DUE_DATE, PA.LST_PRODQTY, PA.MADE_TYPE, PA.MADE_DTTM, PA.MADE_BY)    \n";
			sql += "values(PP.VERSION, PP.ITEM_ID, PP.DUE_DATE, PP.LST_PRODQTY, PP.MADE_TYPE, PP.MADE_DTTM, PP.MADE_BY)                                 \n";

			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		} finally {
	        databaseUtility.close(conn, stmt, rs);              
	    }
		System.out.println("doSave() end!!!");

		return gdRes;
	}	
	
}
