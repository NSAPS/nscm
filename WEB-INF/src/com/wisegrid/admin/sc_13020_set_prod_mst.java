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
public class sc_13020_set_prod_mst extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	ResultSet	rs2		= null;	                                                                                             
	ResultSet	rs3		= null;	                                                                                             
	
	String 		sql 	= null;  
	String 		sql2 	= null;
	String 		sql3 	= null;	
	
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
			                                                                                                                 
			gdReq = OperateGridData.parse(rawData);                                                                          
                                                                                                                             
			String mode = gdReq.getParam("mode");                                                                            
			System.out.println("Test :: mode = " + mode);                                                                    
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);                                                                                      
			else if (mode.equals("save")) //                                                                               
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
			                                                                                                                 
			
			String start_date	= gdReq.getParam("start_date");
			String end_date		= gdReq.getParam("end_date");
			String idu_flag		= gdReq.getParam("idu_flag");
			String scm_charge	= gdReq.getParam("scm_charge");
			String cm_gubn		= gdReq.getParam("cm_gubn");
			
			                                                                                                                 
			String paramKey   ="start_date!%!end_date!%!idu_flag!%!scm_charge!%!cm_gubn";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+idu_flag+"!%!"+scm_charge+"!%!"+cm_gubn;   		
			
			//String paramKey   ="in_fr_date!%!in_to_date!%!in_item_id!%!in_bl_no";                                                                      
			//String paramCode  = in_fr_date+"!%!"+in_to_date+"!%!"+in_item_id+"!%!"+in_bl_no;   			
			
	        System.out.println("idu_flag="+idu_flag);                                                                                      
			
                                                                                                                             
			String query_id   = "sc_13020_set_prod_mst";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}
			
			String query_id2;	
			ArrayList<ArrayList<String>> cdList; 
			int arrIdx;
			String[] cd;
			String[] cdName;
				
			/* PROC_TYPE �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "PROC_TYPE", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("PROC_TYPE �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("PROC_TYPE �÷��� �޺�����Ʈ set");
			gdRes.getHeader("PROC_TYPE").setComboValues(cdName, cd );
			
			
			/* OPER_TYPE �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "OPER_TYPE", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("OPER_TYPE �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("OPER_TYPE �÷��� �޺�����Ʈ set");
			gdRes.getHeader("OPER_TYPE").setComboValues(cdName, cd );			
			
			
			/* COST_GUBN �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "COST_GUBN", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("COST_GUBN �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("COST_GUBN �÷��� �޺�����Ʈ set");
			gdRes.getHeader("COST_GUBN").setComboValues(cdName, cd );			
			
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {

				
				gdRes.getHeader("CRUD"			).addValue( "", "");
				gdRes.getHeader("ITYPE"			).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("DIVISION"		).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("SALES_CAT01"	).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("SALES_CAT02"	).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("SPEC"			).addValue(qResult.get(i).get(6  ),"");  
				gdRes.getHeader("BM"			).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("PROD_VER"		).addValue(qResult.get(i).get(8  ),"");
				gdRes.getHeader("PROC_ID"		).addValue(qResult.get(i).get(9  ),"");                                      
				gdRes.getHeader("PROC_NAME"		).addValue(qResult.get(i).get(10 ),"");
				gdRes.getHeader("LOC_ID"		).addValue(qResult.get(i).get(11 ),"");                                      
				gdRes.getHeader("LOC_NAME"		).addValue(qResult.get(i).get(12 ),"");
				gdRes.getHeader("PROC_TYPE"		).addSelectedHiddenValue(qResult.get(i).get(13));//OPER_TYPE
				gdRes.getHeader("OPER_TYPE"		).addSelectedHiddenValue(qResult.get(i).get(14));//OPER_TYPE                                      
				gdRes.getHeader("OPER_QTY"		).addValue(qResult.get(i).get(15 ),"");                                      
				gdRes.getHeader("START_DATE"	).addValue(qResult.get(i).get(16 ),"");                                      
				gdRes.getHeader("END_DATE"		).addValue(qResult.get(i).get(17 ),"");
				gdRes.getHeader("SELL_STOP_DATE").addValue(qResult.get(i).get(18 ),"");                     
				gdRes.getHeader("COST_GUBN"		).addSelectedHiddenValue(qResult.get(i).get(19));//OPER_TYPE
				gdRes.getHeader("MAN_TO"		).addValue(qResult.get(i).get(20 ),"");                                      
				gdRes.getHeader("WOMEN_TO"		).addValue(qResult.get(i).get(21 ),"");
				gdRes.getHeader("MAN_COST"		).addValue(qResult.get(i).get(22 ),"");
				gdRes.getHeader("WOMEN_COST"	).addValue(qResult.get(i).get(23 ),"");
				gdRes.getHeader("BOX_COST"		).addValue(qResult.get(i).get(24 ),"");
				gdRes.getHeader("WORK_CAPA"		).addValue(qResult.get(i).get(25 ),"");
                                                                                                                             
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}


	//�����Ҵ����� ����
	public GridData doSave(GridData gdReq) throws Exception {

//		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			String user_id    = gdReq.getParam("user_id");
					
			//�ش� ������ ������쿡�� (MERGE INTO��  UPDATE�� INSERT��) ����!!	
			sql   = "merge into SET_PROD_MST SM				           \n";
			sql  += "using (                                           \n";
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
					}
					flag = true;
					
					// combo �� ���� !!
					String proc_type = "";
					if(gdReq.getHeader("PROC_TYPE").getSelectedIndex(i) > -1){							
						proc_type = gdReq.getHeader("PROC_TYPE").getComboHiddenValues()[gdReq.getHeader("PROC_TYPE").getSelectedIndex(i)];
					}
					
					// combo �� ���� !!
					String oper_type = "";
					if(gdReq.getHeader("OPER_TYPE").getSelectedIndex(i) > -1){							
						oper_type = gdReq.getHeader("OPER_TYPE").getComboHiddenValues()[gdReq.getHeader("OPER_TYPE").getSelectedIndex(i)];
					}					
					
					// combo �� ���� !!
					String cost_gubn = "";
					if(gdReq.getHeader("COST_GUBN").getSelectedIndex(i) > -1){							
						cost_gubn = gdReq.getHeader("COST_GUBN").getComboHiddenValues()[gdReq.getHeader("COST_GUBN").getSelectedIndex(i)];
					}	
					
					//-------------------------------------------------------------------------------------------------------------------
					//�Ķ���͸� ������ ����!!  
					sql += "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					sql += "				'" + gdReq.getHeader("PROD_VER").getValue(i)		+ "'	AS PROD_VER,	    	\n";
					sql += "				'" + gdReq.getHeader("BM").getValue(i)				+ "'	AS NEW_BM,	    		\n";
					sql += "				'" + proc_type										+ "'	AS NEW_PROC_TYPE,       \n";

					sql += "				'" + oper_type										+ "'	AS NEW_OPER_TYPE,       \n";
					sql += "				'" + gdReq.getHeader("OPER_QTY").getValue(i)		+ "'	AS NEW_OPER_QTY,	    \n";
					sql += "				'" + gdReq.getHeader("START_DATE").getValue(i)		+ "'	AS NEW_START_DATE,	    \n";
					sql += "				'" + gdReq.getHeader("END_DATE").getValue(i)		+ "'	AS NEW_END_DATE,	    \n";

					sql += "				'" + cost_gubn										+ "'	AS NEW_COST_GUBN,       \n";
					
					sql += "				'" + gdReq.getHeader("MAN_TO").getValue(i)			+ "'	AS NEW_MAN_TO,	    	\n";
					sql += "				'" + gdReq.getHeader("WOMEN_TO").getValue(i)		+ "'	AS NEW_WOMEN_TO,	    \n";
					sql += "				'" + gdReq.getHeader("MAN_COST").getValue(i)		+ "'	AS NEW_MAN_COST,	    \n";
					sql += "				'" + gdReq.getHeader("WOMEN_COST").getValue(i)		+ "'	AS NEW_WOMEN_COST,	    \n";
					
					sql += "				'" + gdReq.getHeader("BOX_COST").getValue(i)		+ "'	AS NEW_BOX_COST,	    \n";
					sql += "				'" + gdReq.getHeader("WORK_CAPA").getValue(i)		+ "'	AS NEW_WORK_CAPA,	    \n";
					sql += "				'" + user_id										+ "'	AS NEW_MADE_BY		    \n";
					sql += "	FROM	DUAL			                                                  						\n";
				} 
									
		//	}//for�� ��.
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") SM1 														   	\n";
			sql += "ON (SM.ITEM_ID		= SM1.ITEM_ID    						   	\n";
			sql += "AND SM.PROD_VER		= SM1.PROD_VER            				   	\n";
			sql += "AND SM.START_DATE	= SM1.NEW_START_DATE)						\n";
			sql += "when matched then update set            					   	\n";
			sql += "	SM.BM			= SM1.NEW_BM,				SM.PROC_TYPE	= SM1.NEW_PROC_TYPE,			        \n";
			sql += "	SM.OPER_TYPE	= SM1.NEW_OPER_TYPE,		SM.OPER_QTY		= SM1.NEW_OPER_QTY,			       		\n";
			sql += "	SM.END_DATE		= SM1.NEW_END_DATE,			SM.COST_GUBN	= SM1.NEW_COST_GUBN,			        \n";
			sql += "	SM.MAN_TO		= SM1.NEW_MAN_TO,			SM.WOMEN_TO		= SM1.NEW_WOMEN_TO,			            \n";
			sql += "	SM.MAN_COST		= SM1.NEW_MAN_COST,			SM.WOMEN_COST	= SM1.NEW_WOMEN_COST,		            \n";
			sql += "	SM.BOX_COST		= SM1.NEW_BOX_COST,			SM.WORK_CAPA	= SM1.NEW_WORK_CAPA,	                \n";
			sql += "	SM.MADE_BY		= SM1.NEW_MADE_BY,			SM.MADE_TYPE	= 'UP',	SM.MADE_DTTM	= SYSDATE		\n";
			////////////////////
			sql += "when not matched then insert" +
				   "(ITEM_ID, PROD_VER, START_DATE, END_DATE, PROC_TYPE, OPER_TYPE, OPER_QTY, BM, " +
				   " COST_GUBN, MAN_TO, WOMEN_TO, MAN_COST, WOMEN_COST, BOX_COST, WORK_CAPA, MADE_TYPE, MADE_DTTM, MADE_BY)\n";
			sql += "values                      " +
				   "(SM1.ITEM_ID, SM1.PROD_VER, NVL(SM1.NEW_START_DATE, TO_CHAR(SYSDATE,'YYYY-MM-DD')), NVL(SM1.NEW_END_DATE,'9999-12-31'), " +
				   " SM1.NEW_PROC_TYPE, SM1.NEW_OPER_TYPE, SM1.NEW_OPER_QTY, SM1.NEW_BM, SM1.NEW_COST_GUBN, SM1.NEW_MAN_TO, SM1.NEW_WOMEN_TO," +
				   " SM1.NEW_MAN_COST, SM1.NEW_WOMEN_COST, SM1.NEW_BOX_COST, SM1.NEW_WORK_CAPA, 'AD', SYSDATE, '"+ user_id +"') \n";
			
			//---------------------------------------------------------------------------------------------------------------------------		
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
	

	
	public GridData doSave_B(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount			= gdReq.getHeader("CRUD").getRowCount();
			String cnfm_date 	= gdReq.getParam("cnfm_date");
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Save");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql, sql2, inner_sql2, sql3, inner_sql3;
			
			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.BM,			T2.NEW_BM,				T1.OPER_TYPE,		T2.NEW_OPER_TYPE,							\n";
			sql += "			T1.OPER_QTY,	T2.NEW_OPER_QTY,		T1.START_DATE,		T2.NEW_START_DATE,							\n";
			sql += "			T1.END_DATE,	T2.NEW_END_DATE,		T1.CUST_TYPE,		T2.NEW_CUST_TYPE,							\n";
			sql += "			T1.WORK_COST,	T2.NEW_WORK_COST,		T1.ROH2_COST,		T2.NEW_ROH2_COST,							\n";
			sql += "			T1.TO_MEN,		T2.NEW_TO_MEN,			T1.TO_WOMEN,		T2.NEW_TO_WOMEN,							\n";
			sql += "			T1.WORK_CAPA,	T2.NEW_WORK_CAPA		T1.MADE_BY,			T2.NEW_MADE_BY								\n";
			sql += "	FROM	SET_PROD_MST	T1,                                                                                    	\n";
			sql += "			(                                                                                                      	\n";
			boolean flag = false;
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				System.out.println("��𿡼� ���� !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					String oper_type = "";
					if(gdReq.getHeader("OPER_TYPE").getSelectedIndex(i) > -1){							
						oper_type = gdReq.getHeader("OPER_TYPE").getComboHiddenValues()[gdReq.getHeader("OPER_TYPE").getSelectedIndex(i)];
					}					
					
					String cust_type = "";
					if(gdReq.getHeader("CUST_TYPE").getSelectedIndex(i) > -1){							
						cust_type = gdReq.getHeader("CUST_TYPE").getComboHiddenValues()[gdReq.getHeader("CUST_TYPE").getSelectedIndex(i)];
					}							
					
					//�Ķ���͸� ������ ����!!  
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + gdReq.getHeader("PROD_VER").getValue(i)		+ "'	AS PROD_VER,	    	\n";
					inner_sql += "				'" + gdReq.getHeader("BM").getValue(i)				+ "'	AS NEW_BM,	    		\n";
					inner_sql += "				'" + oper_type										+ "'	AS NEW_OPER_TYPE,       \n";
					inner_sql += "				'" + gdReq.getHeader("OPER_QTY").getValue(i)		+ "'	AS NEW_OPER_QTY,	    \n";
					inner_sql += "				'" + gdReq.getHeader("START_DATE").getValue(i)		+ "'	AS NEW_START_DATE,	    \n";
					inner_sql += "				'" + gdReq.getHeader("END_DATE").getValue(i)		+ "'	AS NEW_END_DATE,	    \n";
					inner_sql += "				'" + cust_type										+ "'	AS NEW_CUST_TYPE,       \n";
					inner_sql += "				'" + gdReq.getHeader("ROH2_COST").getValue(i)		+ "'	AS NEW_ROH2_COST,	   	\n";
					inner_sql += "				'" + gdReq.getHeader("WORK_COST").getValue(i)		+ "'	AS NEW_WORK_COST,	   	\n";
					inner_sql += "				'" + gdReq.getHeader("TO_MEN").getValue(i)			+ "'	AS NEW_TO_MEN,	    	\n";
					inner_sql += "				'" + gdReq.getHeader("TO_WOMEN").getValue(i)		+ "'	AS NEW_TO_WOMEN,	    \n";
					inner_sql += "				'" + gdReq.getHeader("WORK_CAPA").getValue(i)		+ "'	AS NEW_WORK_CAPA,	    \n";
					inner_sql += "				'" + gdReq.getHeader("MADE_BY").getValue(i)			+ "'	AS NEW_MADE_BY		    \n";
					inner_sql += "	FROM	DUAL			                                                  						\n";
					sql += inner_sql;
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql += "	UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for�� ��.
			sql += "			)			T2                                                                          \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                \n";
			sql += "	AND		T1.PROD_VER	= T2.PROD_VER                                                               \n";
			sql += "	AND		T1.START_DATE	= T2.START_DATE                                                         \n";
			sql += "	)                                                                                               \n";
			sql += "	SET		BM = NEW_BM,							OPER_TYPE = NEW_OPER_TYPE,			            \n";
			sql += "			OPER_QTY = NEW_OPER_QTY,				START_DATE = NEW_START_DATE,			        \n";
			sql += "			END_DATE = NEW_END_DATE,				CUST_TYPE = NEW_CUST_TYPE,			            \n";
			sql += "			WORK_COST = NEW_WORK_COST,				TO_MEN = NEW_TO_MEN,			                \n";
			sql += "			TO_WOMEN = NEW_TO_WOMEN,				WORK_CAPA = NEW_WORK_CAPA,	                  	\n";
			sql += "			ROH2_COST = NEW_ROH2_COST			                  									\n";

			System.out.println("-----------------------------------------------QUERY_1-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY_1-----------------------------------------------");

			
			
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


			System.out.println("-----------------------------------------------QUERY_2-----------------------------------------------");
			//System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY_2-----------------------------------------------");
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			//rs2 = databaseUtility.executeQuery(stmt, sql2);
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);
            databaseUtility.close(conn, stmt, rs2);
            databaseUtility.close(conn, stmt, rs3);
        }

        System.out.println("doSave() end!!!");

		return gdRes;
	}
	
	
	
	
}                                                                                                                            