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
public class ip_02060_SalesAllocationNiceLikePlan extends HttpServlet {

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
System.out.println("mode ="+ mode);
			
			if (mode.equals("search")) // 
				gdRes = doQuery(gdReq);
			else if (mode.equals("search_DW2"))
				gdRes = doQuery2(gdReq);
			else if (mode.equals("search_DW3"))
				gdRes = doQuery3(gdReq);
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
		int rowCount = 0;
		
		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			System.out.println("getParam...");
			String item_id = gdReq.getParam("item_id");
			String cnfm_date = gdReq.getParam("cnfm_date");
			String chk_sel_01 = gdReq.getParam("chk_sel_01");
			String chk_sel_02 = gdReq.getParam("chk_sel_02");
			String chk_sel_03 = gdReq.getParam("chk_sel_03");
			
			String chk_sel_02_EDI = gdReq.getParam("chk_sel_02_EDI");

			String insel_allocQoutaType = gdReq.getParam("insel_allocQoutaType");
			
			String paramKey = "item_id!%!cnfm_date!%!chk_sel_01!%!chk_sel_02!%!chk_sel_03!%!chk_sel_02_EDI!%!insel_allocQoutaType";
			String paramCode = item_id + "!%!" + cnfm_date + "!%!" + chk_sel_01 + "!%!" + chk_sel_02 + "!%!" + chk_sel_03 + "!%!" + chk_sel_02_EDI
								+ "!%!" + insel_allocQoutaType;
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
			
			//�׸��忡 data input
			System.out.println("DW1_�׸��� ��ü�� Data Input");
			for (int i = 0; i < rowCount; i++) {

				gdRes.getHeader("CRUD"			 		).addValue("","");                    
				gdRes.getHeader("DEPT_CODE"			    ).addValue(qResult.get(i).get(0 ),"");	
				gdRes.getHeader("DEPT_NAME"		 		).addValue(qResult.get(i).get(1 ),""); 
				gdRes.getHeader("PRE_INFO"			    ).addValue(qResult.get(i).get(5 ),"");	
				gdRes.getHeader("PRE_REQT_BOX"		    ).addValue(qResult.get(i).get(2 ),"");	
				gdRes.getHeader("PRE_SELL_BOX"		    ).addValue(qResult.get(i).get(3 ),"");
				gdRes.getHeader("PRE_ALLOC_BOX"		    ).addValue(qResult.get(i).get(4 ),"");
				gdRes.getHeader("PRE_USE_ALLOC_RATE"	).addValue(qResult.get(i).get(5 ),"");
				gdRes.getHeader("PRE_CLOSE_RATE"		).addValue(qResult.get(i).get(6 ),"");
				gdRes.getHeader("PLAN_BOX"			    ).addValue(qResult.get(i).get(7 ),"");
				gdRes.getHeader("CUM_SELL_BOX"		    ).addValue(qResult.get(i).get(8),"");
				gdRes.getHeader("GOAL_RATE"			    ).addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("EDI_00"				).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("EDI_TOT"				).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("EDI_21"				).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("EDI_22"				).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("EDI_23"				).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("EDI_ETC"				).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("ALLOC_RATE"			).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("ALLOC_BOX"			    ).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("REQT_BOX"			    ).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("REMN_BOX"			    ).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("USE_ALLOC_RATE"		).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("REQT_ALLOC_BOX"		).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("ADD_ALLOC_BOX"		    ).addValue(qResult.get(i).get(21),qResult.get(i).get(21));
				gdRes.getHeader("REQT_ALLOC_REASON"	    ).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("ALLOC_ZONE_02"	   		).addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("ALLOC_ZONE_03"	    	).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("ALLOC_ZONE_04"	    	).addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("ALLOC_ZONE_05"	    	).addValue(qResult.get(i).get(26),"");
				gdRes.getHeader("CMP_ADD_ALLOC_BOX"		).addValue(qResult.get(i).get(21),"");
				
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

	public GridData doQuery2(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();		
		int rowCount = 0;
		
		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			System.out.println("getParam...");
			String item_id = gdReq.getParam("item_id");
			String cnfm_date = gdReq.getParam("cnfm_date");
			String chk_sel_10 = gdReq.getParam("chk_sel_10");
			String chk_sel_11 = gdReq.getParam("chk_sel_11");
			String insel_allocQoutaType = gdReq.getParam("insel_allocQoutaType");
			
			String paramKey = "item_id!%!cnfm_date!%!chk_sel_10!%!chk_sel_11!%!insel_allocQoutaType";
			String paramCode = item_id + "!%!" + cnfm_date + "!%!" + chk_sel_10 + "!%!" + chk_sel_11 + "!%!" + insel_allocQoutaType;;
			String query_id = gdReq.getParam("query_id");
			System.out.println("getSelQeury : " + query_id);
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search_DW2");
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			
	        //�׸��忡 data input
			System.out.println("DW2_�׸��� ��ü�� Data Input");
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("DC_ID"			).addValue(qResult.get(i).get(0 ), "");
				gdRes.getHeader("DC_NAME"		).addValue(qResult.get(i).get(1 ), ""); 
				gdRes.getHeader("BASE_STOCK"	).addValue(qResult.get(i).get(2 ), "");
				gdRes.getHeader("CHGO"		    ).addValue(qResult.get(i).get(3 ), "");
				gdRes.getHeader("IPGO"		    ).addValue(qResult.get(i).get(4 ), "");
				gdRes.getHeader("STOCK_EXPT"	).addValue(qResult.get(i).get(5 ), "");
				gdRes.getHeader("PLAN_BOX"	    ).addValue(qResult.get(i).get(6 ), "");
				gdRes.getHeader("CUM_SELL_BOX"  ).addValue(qResult.get(i).get(7 ), "");
				gdRes.getHeader("GOAL_RATE"	    ).addValue(qResult.get(i).get(8 ), "");
				gdRes.getHeader("ALLOC_RATE"	).addValue(qResult.get(i).get(9 ), "");
				gdRes.getHeader("ALLOC_BOX"	    ).addValue(qResult.get(i).get(10 ), qResult.get(i).get(10 ));
				gdRes.getHeader("NEXT_STOCK"	).addValue(qResult.get(i).get(11 ), "");
			}
		
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			System.out.println("ȭ�鿡 ������ �ĸ����� ����");
			gdRes.addParam("mode", "search_DW2");
			gdRes.setMessage("��ȸ �Ϸ�");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		System.out.println("�׸��� ��ü return");		
		return gdRes;
	}
	
	public GridData doQuery3(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();		

		int rowCount = 0;

		try {

			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			System.out.println("getParam...");

			String item_id 	   = gdReq.getParam("item_id");
			String trans_start = gdReq.getParam("trans_start");
			//String scm_charge  = gdReq.getParam("scm_charge");
			String version 	   = gdReq.getParam("version");
			String seq 		   = gdReq.getParam("seq");
			String itype 	   = gdReq.getParam("itype");
			String check_day   = gdReq.getParam("check_day");
			String paramKey    = "item_id!%!trans_start!%!version!%!seq!%!itype!%!check_day";
			String paramCode   = item_id + "!%!" + trans_start + "!%!" + version + "!%!" + seq + "!%!" + itype + "!%!" + check_day + "!%!";
			String query_id    = gdReq.getParam("query_id");

			System.out.println("getSelQeury : " + query_id);
			
			

			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			System.out.println("����	 : " + paramCode);
			rowCount = qResult.size();

			// 

			if (rowCount == 0) {

				gdRes.addParam("mode", "search_DW3");
				gdRes.setMessage("...");
				gdRes.setStatus("true");

				return gdRes;

			}

	        //�׸��忡 data input

			System.out.println("DW3_�׸��� ��ü�� Data Input");
			
			for (int i = 0; i < rowCount; i++) {
					
				//gdRes.getHeader("CRUD"			).addValue("", "");                    
				gdRes.getHeader("DC_NAME"		).addValue(qResult.get(i).get(1), qResult.get(i).get(0)); // �԰����/�԰����ڵ�
				gdRes.getHeader("BASE_STOCK"	).addValue(qResult.get(i).get(2),  "");	//�������

				gdRes.getHeader("CHGO_QTY"		).addValue(qResult.get(i).get(3),  "");	//�������

				gdRes.getHeader("PROD01_1"		).addValue(qResult.get(i).get(4),  "");	//D����������
				gdRes.getHeader("PROD01_3"	 	).addValue(qResult.get(i).get(5),  "");	//D���ְ�����

				gdRes.getHeader("CONF_STOCK"	).addValue(qResult.get(i).get(6),  "");	//����ɷ�

				gdRes.getHeader("TRANS_QTY"		).addValue(qResult.get(i).get(7),  "");	//���Ȯ��

				gdRes.getHeader("NEXT_CHGO_QTY" ).addValue(qResult.get(i).get(8),  "");	//�������
				gdRes.getHeader("NEXT_TRANS_QTY").addValue(qResult.get(i).get(9),  "");	//���ϰ�ȹ
				
				gdRes.getHeader("PROD01"		).addValue(qResult.get(i).get(10), "");	//D��	�߰�����
				gdRes.getHeader("PROD02"	 	).addValue(qResult.get(i).get(11), "");	//D+1��	��������
				gdRes.getHeader("PROD03"	 	).addValue(qResult.get(i).get(12), "");	//D+1��	�ְ�����
				gdRes.getHeader("PROD04"	 	).addValue(qResult.get(i).get(13), "");	//D+1��	�߰�����
				gdRes.getHeader("PROD05"		).addValue(qResult.get(i).get(14), "");	//D+2	��������
				gdRes.getHeader("PROD06"	 	).addValue(qResult.get(i).get(15), "");	//D+2	�ְ�����
				gdRes.getHeader("PROD07"	 	).addValue(qResult.get(i).get(16), "");	//D+2	�߰�����
				gdRes.getHeader("PROD08"		).addValue(qResult.get(i).get(17), "");	//D+3	����
				gdRes.getHeader("PROD09"		).addValue(qResult.get(i).get(18), "");	//D+4	����
				gdRes.getHeader("PROD10"	 	).addValue(qResult.get(i).get(19), "");	//D+5	����
				gdRes.getHeader("PROD11"		).addValue(qResult.get(i).get(20), "");	//D+6	����
				gdRes.getHeader("PROD12"		).addValue(qResult.get(i).get(21), "");	//D+7	����
				gdRes.getHeader("PROD13"		).addValue(qResult.get(i).get(22), "");	//D+8	����
				gdRes.getHeader("PROD14"		).addValue(qResult.get(i).get(23), "");	//D+9	����
				gdRes.getHeader("PROD15"		).addValue(qResult.get(i).get(24), "");	//D+10	����
				gdRes.getHeader("PROD16"		).addValue(qResult.get(i).get(25), "");	//D+11	����
				gdRes.getHeader("PROD17"		).addValue(qResult.get(i).get(26), "");	//D+12	����
				gdRes.getHeader("PROD18"		).addValue(qResult.get(i).get(27), "");	//D+13	����
				gdRes.getHeader("PROD19"		).addValue(qResult.get(i).get(28), "");	//D+14	����
				gdRes.getHeader("PROD20"		).addValue(qResult.get(i).get(29), "");	//D+15	����

				gdRes.getHeader("PROD_AVAILABLE").addValue(qResult.get(i).get(30), "");	//D+9	����

				gdRes.getHeader("USE_CAPA"		).addValue(qResult.get(i).get(32), "");	//CDC�ѻ��CAPA
				gdRes.getHeader("USE_CAPA_PAL"	).addValue(qResult.get(i).get(31), "");	//CDC�ѻ��CAPA�ȷ�
				gdRes.getHeader("USE_CAPA_BOX"	).addValue(qResult.get(i).get(32), "");	//CDC�ѻ��CAPA�ڽ�

			}

			/*

			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�

			 */

			System.out.println("ȭ�鿡 ������ �ĸ����� ����");

			gdRes.addParam("mode", "search_DW3");
			gdRes.setMessage("��ȸ �Ϸ�");
			gdRes.setStatus("true");

		} catch (Exception e) {

			throw e;

		}

		System.out.println("�׸��� ��ü return");		

		return gdRes;

	}


	// �����Ҵ����� ����
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("DEPT_CODE").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			String cnfm_date = gdReq.getParam("cnfm_date");
			String item_id = gdReq.getParam("item_id");
			String nfos_ok = gdReq.getParam("nfos_ok");
			String user_id = gdReq.getParam("user_id");

			
			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
			sql  = "merge into SDORT204 PA \n";
			sql += "using ( \n";
			
			boolean flag = false;
			
			if (nfos_ok.equals("Y")) { // NFOS���� ��  
				// ������ ����
				for (int i = 0; i < rowCount; i++) {
					
					String crud = gdReq.getHeader("CRUD").getValue(i);
					String add_alloc_box = gdReq.getHeader("ADD_ALLOC_BOX").getValue(i);
					String cmp_add_alloc_box = gdReq.getHeader("CMP_ADD_ALLOC_BOX").getValue(i);
					//System.out.println("crud ="+crud);
					// 2015.03.19 �߰� �����Ҵ緮�� ������ �ȵ� ���� �������� �ʴ´�!
					if(crud.equals("U") && !add_alloc_box.equals(cmp_add_alloc_box)) {
						if( flag){
							sql += "union all \n"; 
						}
						flag = true;
						//�Ķ���͸� ������ ����!!
						String dept_code = gdReq.getHeader("DEPT_CODE").getValue(i);
						String alloc_box = gdReq.getHeader("ALLOC_BOX").getValue(i);
						//String add_alloc_box = gdReq.getHeader("ADD_ALLOC_BOX").getValue(i);
							
						//-------------------------------------------------------------------------------------------------------------------
						sql +=	"select '" + item_id + "' AS ITEM_ID, " +
								"		'" + cnfm_date + "' AS CNFM_DATE, " + 
								"		'" + dept_code + "' AS SALES_LOC, " +
								"		TO_NUMBER(NVL('" + alloc_box + "',0)) AS ALLOC_BOX, " +
								"		TO_NUMBER(NVL('" + add_alloc_box + "',0)) AS ADD_ALLOC_BOX, " +
								"		'" + user_id + "' AS ADD_EMP_NO, TO_CHAR(SYSDATE,'YYYYMMDD') UPDT_DATE, TO_CHAR(SYSDATE,'HH24MISS') UPDT_TIME from DUAL \n";
						//-------------------------------------------------------------------------------------------------------------------					 
					 
					}
										
				}//for�� ��.
				
				sql += ") PP \n";
				
				
				sql += "on (PA.CNFM_DATE = PP.CNFM_DATE                                                                 \n";
				sql += "AND PA.PROD_CODE = PP.ITEM_ID                                                                   \n";
				sql += "AND PA.DEPT_CODE = PP.SALES_LOC                                                                 \n";
				sql += "AND PA.CUST_CODE = '0000000')                                                                   \n";
				sql += "when matched then update set                                                                    \n";
				sql += "	PA.MODI_BOX = (	CASE                                                                   		\n";
				sql += "						WHEN PA.REMN_BOX - PA.ADD_ALLOC_BOX + PP.ADD_ALLOC_BOX < 0 THEN    		\n";
				sql += "							PA.MODI_BOX - PA.REMN_BOX                                      		\n";
				sql += "						ELSE PA.MODI_BOX - PA.ADD_ALLOC_BOX + PP.ADD_ALLOC_BOX             		\n";
				sql += "					END                                                                    		\n";
				sql += "					),                                                                     		\n";
				sql += "	PA.REMN_BOX = (	CASE                                                                   		\n";
				sql += "						WHEN PA.REMN_BOX - PA.ADD_ALLOC_BOX + PP.ADD_ALLOC_BOX < 0 THEN 0  		\n";
				sql += "						ELSE PA.REMN_BOX - PA.ADD_ALLOC_BOX + PP.ADD_ALLOC_BOX             		\n";
				sql += "					END                                                                    		\n";
				sql += "					),                                                                     		\n";
				sql += "	PA.ADD_ALLOC_BOX = (CASE                                                               		\n";
				sql += "							WHEN PA.REMN_BOX - PA.ADD_ALLOC_BOX + PP.ADD_ALLOC_BOX < 0 THEN		\n";
				sql += "								 PA.MODI_BOX - PA.ADD_ALLOC_BOX + PA.REMN_BOX	               	\n";
				sql += "							ELSE PP.ADD_ALLOC_BOX                                          		\n";
				sql += "						END                                                                		\n";
				sql += "						),                                                                 		\n";
				sql += "	PA.UPDT_EMP_NO = PP.ADD_EMP_NO,                                                        		\n";
				sql += "	PA.UPDT_DATE = PP.UPDT_DATE,            			                                		\n";
				sql += "	PA.UPDT_TIME = PP.UPDT_TIME				                                            		\n";
				sql += "when not matched then insert(PA.CNFM_DATE, PA.PROD_CODE, PA.DEPT_CODE, PA.STOR_CODE, PA.CUST_CODE, PA.MODI_BOX, PA.REMN_BOX, PA.ADD_ALLOC_BOX, PA.ADD_EMP_NO, PA.IPUT_DATE, PA.IPUT_TIME, PA.IPUT_EMP_NO)    \n";
				sql += "values(PP.CNFM_DATE, PP.ITEM_ID, PP.SALES_LOC, '0000', '0000000', PP.ALLOC_BOX, PP.ALLOC_BOX, PP.ADD_ALLOC_BOX, PP.ADD_EMP_NO, PP.UPDT_DATE, PP.UPDT_TIME, PP.ADD_EMP_NO)                                 \n";
			}
			else { // NFOS���� �� --> �߰��Ҵ緮�� �������� �ʴ´� ���� �־ �����Ѵ�!!!!
				   
				// ������ ����
				for (int i = 0; i < rowCount; i++) {
					
					String crud = gdReq.getHeader("CRUD").getValue(i);
					System.out.println("crud ="+crud);
					if(crud.equals("U")) {
						 
						if( flag){
							sql += "union all \n"; 
						}
						flag = true;
						//�Ķ���͸� ������ ����!!
						String dept_code = gdReq.getHeader("DEPT_CODE").getValue(i);
						String alloc_box = gdReq.getHeader("ALLOC_BOX").getValue(i);
						String add_alloc_box = gdReq.getHeader("ADD_ALLOC_BOX").getValue(i);
							
						//-------------------------------------------------------------------------------------------------------------------
						sql +=	"select '" + item_id + "' AS ITEM_ID, " +
								"		'" + cnfm_date + "' AS CNFM_DATE, " + 
								"		'" + dept_code + "' AS SALES_LOC, " +
								"		TO_NUMBER(NVL('" + alloc_box + "',0)) AS ALLOC_BOX, " +
								"		TO_NUMBER(NVL('" + add_alloc_box + "',0)) AS ADD_ALLOC_BOX, " + // �߰��Ҵ緮�� �������� �ʴ´� ���� �־ �����Ѵ�!!!!
								"		'" + user_id + "' AS MADE_BY, TO_CHAR(SYSDATE,'YYYYMMDD') IPUT_DATE, TO_CHAR(SYSDATE,'HH24MISS') IPUT_TIME from DUAL \n";
						//-------------------------------------------------------------------------------------------------------------------					 
					 
					}
										
				}//for�� ��.
				
				sql += ") PP \n";
				
				
				sql += "on (PA.CNFM_DATE = PP.CNFM_DATE                                                                     \n";
				sql += "AND PA.PROD_CODE = PP.ITEM_ID                                                                       \n";
				sql += "AND PA.DEPT_CODE = PP.SALES_LOC                                                                     \n";
				sql += "AND PA.CUST_CODE = '0000000')                                                                       \n";
				sql += "when matched then update set                                                                        \n";
				sql += "	PA.SUPL_BOX = (	CASE                                                                   			\n";
				sql += "						WHEN PA.REMN_BOX = PA.MODI_BOX THEN -- �ֹ�������		  						\n";
				sql += "							PP.ALLOC_BOX			                                      			\n";
				sql += "						ELSE CASE																	\n";
				sql += "								WHEN (PA.MODI_BOX - PA.REMN_BOX) <= PP.ALLOC_BOX THEN PP.ALLOC_BOX 	\n";
				sql += "								ELSE (PA.MODI_BOX - PA.REMN_BOX)                           			\n";
				sql += "							 END                                                           			\n";
				sql += "					END                                                                    			\n";
				sql += "					),                                                                     			\n";
				sql += "	PA.MODI_BOX = (	CASE                                                                   			\n";
				sql += "						WHEN PA.REMN_BOX = PA.MODI_BOX THEN -- �ֹ�������		  						\n";
				sql += "							PP.ALLOC_BOX			                                      			\n";
				sql += "						ELSE CASE																	\n";
				sql += "								WHEN (PA.MODI_BOX - PA.REMN_BOX) <= PP.ALLOC_BOX THEN PP.ALLOC_BOX  \n";
				sql += "								ELSE (PA.MODI_BOX - PA.REMN_BOX)                           			\n";
				sql += "							 END                                                           			\n";
				sql += "					END                                                                    			\n";
				sql += "					),                                                                     			\n";
				sql += "	PA.REMN_BOX = (	CASE                                                                   			\n";
				sql += "						WHEN PA.REMN_BOX = PA.MODI_BOX THEN -- �ֹ�������		  						\n";
				sql += "							PP.ALLOC_BOX			                                      			\n";
				sql += "						ELSE CASE																	\n";
				sql += "								WHEN (PA.MODI_BOX - PA.REMN_BOX) <= PP.ALLOC_BOX THEN 				\n";
				sql += "									PP.ALLOC_BOX - (PA.MODI_BOX - PA.REMN_BOX)						\n";
				sql += "								ELSE 0			                                           			\n";
				sql += "							 END                                                           			\n";
				sql += "					END                                                                    			\n";
				sql += "					),                                                                     			\n";
				sql += "     PA.IPUT_DATE = PP.IPUT_DATE,                                                                                             \n";
				sql += "     PA.IPUT_TIME = PP.IPUT_TIME,                                                                                             \n";
				sql += "     PA.IPUT_EMP_NO = PP.MADE_BY                                                                                                 \n";
				sql += "when not matched then insert(PA.CNFM_DATE, PA.PROD_CODE, PA.DEPT_CODE, PA.STOR_CODE, PA.CUST_CODE, PA.SUPL_BOX, PA.MODI_BOX, PA.REMN_BOX, PA.IPUT_DATE, PA.IPUT_TIME, PA.IPUT_EMP_NO)    \n";
				sql += "values(PP.CNFM_DATE, PP.ITEM_ID, PP.SALES_LOC, '0000', '0000000', PP.ALLOC_BOX, PP.ALLOC_BOX, PP.ALLOC_BOX, PP.IPUT_DATE, PP.IPUT_TIME, PP.MADE_BY)                                 \n";
			}
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "doSave");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doSave() end!!!");

		return gdRes;
	}
	
}
