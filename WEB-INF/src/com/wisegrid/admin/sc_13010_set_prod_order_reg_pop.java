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
public class sc_13010_set_prod_order_reg_pop extends HttpServlet {                                                             
                                                                                                                             
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
			                                                                                                                 
			gdReq = OperateGridData.parse(rawData);                                                                          
                                                                                                                             
			String mode = gdReq.getParam("mode");                                                                            
			System.out.println("Test :: mode = " + mode);                                                                    
                                                                                                                             
			if (mode.equals("search")) // ���ȭ�� �ϴ� �׸���
				gdRes = doQuery(gdReq);                                                                                      
			if (mode.equals("search2")) // ����ȭ�� �ϴܵ帮��
				gdRes = doQuery2(gdReq);                                                                                      
			else if (mode.equals("doReg")) // ���ȭ�� ����
				gdRes = doReg(gdReq);
			else if (mode.equals("doMod")) // ����ȭ�� ����
				gdRes = doMod(gdReq);
			else if (mode.equals("doDelete")) // ����ȭ�� ����
				gdRes = doDelete(gdReq);
			else if (mode.equals("doDeleteIf")) // ERP ����
				gdRes = doDeleteIf(gdReq);

			
			
			
		
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

	
	// ��� ��� �ϴ� �׸��� ��ȸ // ���� �Է��� ���� ����
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			// service_url += "&=" + item_id + "&=" + item_name + "&=" +
			// week_flag;
			
			
			String item_id	= gdReq.getParam("item_id");
			String qty		= gdReq.getParam("qty");
			String prod_ver	= gdReq.getParam("prod_ver");
			                                                                                                                 
			
			String paramKey   ="item_id!%!qty!%!prod_ver";                                                                      
			String paramCode  = item_id+"!%!"+qty+"!%!"+prod_ver;   			
                                                                                                                             
			String query_id   = "sc_13010_set_prod_order_get_mbom";                                                             
                                                                                                                             
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

				
				
				gdRes.getHeader("CRUD"			).addValue( "", "");
				gdRes.getHeader("SEQ" 			).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("CONS_ITEM_ID" 	).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("CONS_ITEM_NAME").addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("CONS_QTY_UOM" 	).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("CONS_QTY" 		).addValue(qResult.get(i).get(4  ),"");
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	
	// ������� �ϴ� �׸��� ��ȸ // �˾�â ������ ���� ����
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			// service_url += "&=" + item_id + "&=" + item_name + "&=" +
			// week_flag;
			
			
			String item_id	= gdReq.getParam("item_id");
			String qty		= gdReq.getParam("qty");
			String prod_ver	= gdReq.getParam("prod_ver");
			String wo_id	= gdReq.getParam("wo_id");
			                                                                                                                 
			
			String paramKey   ="item_id!%!qty!%!prod_ver!%!wo_id";                                                                      
			String paramCode  = item_id+"!%!"+qty+"!%!"+prod_ver+"!%!"+wo_id;   			
                                                                                                                             
			String query_id   = "sc_13010_set_prod_order_pop_up";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search2");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                

			
			for (int i = 0; i < rowCount; i++) {                                                                             

				
				
				gdRes.getHeader("CRUD"			).addValue( "", "");
				gdRes.getHeader("SEQ" 			).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("CONS_ITEM_ID" 	).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("CONS_ITEM_NAME").addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("CONS_QTY_UOM" 	).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("CONS_QTY" 		).addValue(qResult.get(i).get(4  ),"");
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}         	
	
	
	// doReg // ���ȭ�� ����
	public GridData doReg(GridData gdReq) throws Exception {

		System.out.println("doReg() start!!!");



		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // SEQ �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("SEQ").getRowCount());


			rowCount = gdReq.getHeader("SEQ").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doReg");
				gdRes.setMessage("doSave : ������ DATA�� �����ϴ�.");
				gdRes.setStatus("true");
				return gdRes;
			}
			



		////////////
			 			
			String sql 
			= "INSERT  INTO IF_SET_PROD_ORDER(	WO_ID, SEQ, PLANT_ID, ITEM_ID, PROD_VER, PROC_ID, OPER_ID, LOC_ID, QTY, QTY_UOM, START_DATE, START_TIME, 	\n"
			+ "                          		END_DATE, END_TIME, CONS_ITEM_ID, CONS_QTY, CONS_QTY_UOM, IDU_FLAG, MADE_TYPE, MADE_DTTM, MADE_BY)			\n";

			System.out.println("getParam");
			String wo_id		= gdReq.getParam("wo_id");
			String plant_id		= gdReq.getParam("plant_id");
			String prod_item_id = gdReq.getParam("prod_item_id");
			String prod_ver		= gdReq.getParam("prod_ver");
			String proc_id		= gdReq.getParam("proc_id");
			String oper_id		= gdReq.getParam("oper_id");
			String loc_id		= gdReq.getParam("loc_id");
			String qty			= gdReq.getParam("qty");
			String qty_uom		= gdReq.getParam("qty_uom");
			String start_date	= gdReq.getParam("start_date");
			String start_time	= gdReq.getParam("start_time");
			String end_date		= gdReq.getParam("end_date");
			String end_time		= gdReq.getParam("end_time");							
			String user_id		= gdReq.getParam("user_id");	

			
			// ������ ����
			System.out.println("sql ���� ����");
			for (int i = 0; i < rowCount; i++)  {  
				
				
					if( i > 0){
						sql += " union all \n"; 
					} 
					
					//String crud = gdReq.getHeader("CRUD").getValue(i);
					//System.out.println(crud);
						sql += "	SELECT	'" + wo_id										+ "'	AS WO_ID,          			\n";
						sql += "			'" + gdReq.getHeader("SEQ").getValue(i)			+ "'    AS SEQ,            			\n";
						sql += "			'" + plant_id									+ "'	AS PLANT_ID,       			\n";
						sql += "			'" + prod_item_id								+ "'	AS ITEM_ID,        			\n";
						sql += "			'" + prod_ver									+ "'	AS PROD_VER,       			\n";
						sql += "			'" + proc_id									+ "'	AS PROC_ID,        			\n";
						sql += "			'" + oper_id									+ "'	AS OPER_ID,        			\n";
						sql += "			'" + loc_id										+ "'	AS LOC_ID,         			\n";
						sql += "			'" + qty										+ "'	AS QTY,            			\n";
						sql += "			'" + qty_uom									+ "'	AS QTY_UOM,        			\n";
						sql += "			REPLACE('" + start_date+ "','-','')						AS START_DATE,     			\n";
						sql += "			'" + start_time									+ "'	AS START_TIME,     			\n";
						sql += "			REPLACE('" + end_date+ "','-','')						AS END_DATE,     			\n";
						sql += "			'" + end_time									+ "'	AS END_TIME,       			\n";
						sql += "			'" + gdReq.getHeader("CONS_ITEM_ID").getValue(i)+ "'    AS CONS_ITEM_ID,   			\n";
						sql += "			'" + gdReq.getHeader("CONS_QTY").getValue(i)	+ "'    AS CONS_QTY,       			\n";
						sql += "			'" + gdReq.getHeader("CONS_QTY_UOM").getValue(i)+ "'    AS CONS_QTY_UOM,   			\n";
						sql += "			'I'														AS IDU_FLAG,       			\n";
						sql += "			'AD'													AS MADE_TYPE,      			\n";
						sql += "			SYSDATE													AS MADE_DTTM,      			\n";
						sql += "			'" + user_id									+ "'	AS MADE_BY 	    			\n";
						sql += "	FROM	DUAL			                                                  					\n";						

			}
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement ��ü ����
				
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");

			gdRes.addParam("mode", "doReg");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");			
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }
		System.out.println("doReg() end!!!");

		return gdRes;
	}	


	public GridData doMod(GridData gdReq) throws Exception {

		System.out.println("doMod() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("SEQ").getRowCount());

		
		System.out.println("getParam");

		
		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("SEQ").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doMod");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql;
			
			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!
			
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			sql += "			T1.WO_ID,       T1.SEQ,         	T1.PLANT_ID,   	T1.ITEM_ID,     	T1.PROD_VER,					\n";
			sql += "			T1.PROC_ID,     T1.OPER_ID,     	T1.LOC_ID,     	T1.QTY,         	T1.QTY_UOM,						\n";
			sql += "			T1.START_DATE,  T1.START_TIME,  	T1.END_DATE,   	T1.END_TIME,    	T1.CONS_ITEM_ID,				\n";
			sql += "			T1.CONS_QTY,    T1.CONS_QTY_UOM,	T1.IDU_FLAG,   	T1.MADE_TYPE,   	T1.MADE_DTTM,    	T1.MADE_BY,	\n";
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			sql += "			T2.N_WO_ID,       T2.N_SEQ,         T2.N_PLANT_ID,    T2.N_ITEM_ID,     T2.N_PROD_VER,					\n";
			sql += "			T2.N_PROC_ID,     T2.N_OPER_ID,     T2.N_LOC_ID,      T2.N_QTY,         T2.N_QTY_UOM, 					\n";
			sql += "			T2.N_START_DATE,  T2.N_START_TIME,  T2.N_END_DATE,    T2.N_END_TIME,    T2.N_CONS_ITEM_ID, 				\n";
			sql += "			T2.N_CONS_QTY,    T2.N_CONS_QTY_UOM, T2.N_IDU_FLAG,   T2.N_MADE_TYPE,   T2.N_MADE_DTTM,		T2.N_MADE_BY	\n";
			sql += "	FROM	IF_SET_PROD_ORDER	T1,                                                                                 \n";
			sql += "			(                                                                                                      	\n";
			
			boolean flag = false;
			
			//////////////////////////////////////////////////////////////////////////////////////
			String wo_id		= gdReq.getParam("wo_id");
			String plant_id		= gdReq.getParam("plant_id");
			String prod_item_id = gdReq.getParam("prod_item_id");
			String prod_ver		= gdReq.getParam("prod_ver");
			String proc_id		= gdReq.getParam("proc_id");
			String oper_id		= gdReq.getParam("oper_id");
			String loc_id		= gdReq.getParam("loc_id");
			String qty			= gdReq.getParam("qty");
			String qty_uom		= gdReq.getParam("qty_uom");
			String start_date	= gdReq.getParam("start_date");
			String start_time	= gdReq.getParam("start_time");
			String end_date		= gdReq.getParam("end_date");
			String end_time		= gdReq.getParam("end_time");							
			String user_id		= gdReq.getParam("user_id");
			
			
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				System.out.println("��𿡼� ���� !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println("crud ="+crud);
				
				//if(crud.equals("U"))  {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					//�Ķ���͸� ������ ����!!  
					inner_sql  = "	SELECT	'" + wo_id										+ "'	AS N_WO_ID,          			\n";
					inner_sql += "			'" + gdReq.getHeader("SEQ").getValue(i)			+ "'    AS N_SEQ,            			\n";
					inner_sql += "			'" + plant_id									+ "'	AS N_PLANT_ID,       			\n";
					inner_sql += "			'" + prod_item_id								+ "'	AS N_ITEM_ID,        			\n";
					inner_sql += "			'" + prod_ver									+ "'	AS N_PROD_VER,       			\n";
					inner_sql += "			'" + proc_id									+ "'	AS N_PROC_ID,        			\n";
					inner_sql += "			'" + oper_id									+ "'	AS N_OPER_ID,        			\n";
					inner_sql += "			'" + loc_id										+ "'	AS N_LOC_ID,         			\n";
					inner_sql += "			'" + qty										+ "'	AS N_QTY,            			\n";
					inner_sql += "			'" + qty_uom									+ "'	AS N_QTY_UOM,        			\n";
					inner_sql += "			REPLACE('" + start_date+ "','-','')						AS N_START_DATE,     			\n";
					inner_sql += "			'" + start_time									+ "'	AS N_START_TIME,     			\n";
					inner_sql += "			REPLACE('" + end_date+ "','-','')						AS N_END_DATE,     				\n";
					inner_sql += "			'" + end_time									+ "'	AS N_END_TIME,       			\n";
					inner_sql += "			'" + gdReq.getHeader("CONS_ITEM_ID").getValue(i)+ "'    AS N_CONS_ITEM_ID,   			\n";
					inner_sql += "			'" + gdReq.getHeader("CONS_QTY").getValue(i)	+ "'    AS N_CONS_QTY,       			\n";
					inner_sql += "			'" + gdReq.getHeader("CONS_QTY_UOM").getValue(i)+ "'    AS N_CONS_QTY_UOM,   			\n";
					inner_sql += "			'I'														AS N_IDU_FLAG,       			\n";
					inner_sql += "			'AD'													AS N_MADE_TYPE,      			\n";
					inner_sql += "			SYSDATE													AS N_MADE_DTTM,      			\n";
					inner_sql += "			'" + user_id									+ "'	AS N_MADE_BY 	    			\n";
					//////////////////////////////////////////////////////////////////////////////////////
					inner_sql += "	FROM	DUAL			                                                  						\n";	
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql += "UNION	ALL \n" + inner_sql;
					}
				//}
									
			}//for�� ��.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.WO_ID	= T2.N_WO_ID                                                                            \n";
			sql += "	AND		T1.ITEM_ID	= T2.N_ITEM_ID                                                                          \n";
			sql += "	AND		T1.SEQ		= T2.N_SEQ	                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		WO_ID		= N_WO_ID, 		SEQ			= N_SEQ,  		PLANT_ID	= N_PLANT_ID,					\n";
			sql += "			ITEM_ID		= N_ITEM_ID,	PROD_VER	= N_PROD_VER,	PROC_ID		= N_PROC_ID,					\n";
			sql += "			OPER_ID		= N_OPER_ID,	LOC_ID		= N_LOC_ID,		QTY			= N_QTY	,						\n";
			sql += "			QTY_UOM		= N_QTY_UOM,	START_DATE	= N_START_DATE,	START_TIME	= N_START_TIME,					\n";
			sql += "			END_DATE	= N_END_DATE,	END_TIME	= N_END_TIME,	CONS_ITEM_ID	= N_CONS_ITEM_ID,			\n";
			sql += "			CONS_QTY	= N_CONS_QTY,	CONS_QTY_UOM= N_CONS_QTY_UOM,	IDU_FLAG	= N_IDU_FLAG,				\n";
			sql += "			MADE_TYPE	= N_MADE_TYPE,	MADE_DTTM	= N_MADE_DTTM,		MADE_BY     = N_MADE_BY   				\n";
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "doMod");
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

	
	
	public GridData doDelete(GridData gdReq) throws Exception {
			
		System.out.println("doDelete() start!!!");



		GridData gdRes = new GridData(); // WiseGrid ��ü����

		
		System.out.println("Total Row Count : " + gdReq.getHeader("SEQ").getRowCount());


			
			String sql;
			
			String prod_item_id	= gdReq.getParam("prod_item_id");
			String wo_id		= gdReq.getParam("wo_id");


			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement ��ü ����
			
			
			System.out.println("���밡�� ������� ����:" + "PROD_ITEM_ID=" + prod_item_id +", WO_ID=" + wo_id );
			
			sql =  "DELETE	IF_SET_PROD_ORDER												          			\n";
			sql += "WHERE	WO_ID			=	'" + wo_id								+ "'	       			\n";
			sql += "AND		ITEM_ID	=	'" + prod_item_id						+ "'	       			\n";
			
			
			
				
			
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			
			boolean result = stmt.execute(sql);
			System.out.println("���밡�� ������� ����!!! - ��� : " + result);
			System.out.println("doDelete() end!!!");
			

			gdRes.addParam("mode", "doDelete");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");			
			
		}catch (Exception e) {
			throw e;
		}finally {
	        databaseUtility.close(conn, stmt, rs);              
	    }
		System.out.println("doDelete() end!!!");

		return gdRes;
	}		
	
	public GridData doDeleteIf(GridData gdReq) throws Exception {
		
		System.out.println("doDeleteIf() start!!!");
		GridData gdRes = new GridData(); // WiseGrid ��ü����
		System.out.println("Total Row Count : " + gdReq.getHeader("SEQ").getRowCount());
			
			String sql;
			String prod_item_id	= gdReq.getParam("prod_item_id");
			String wo_id		= gdReq.getParam("wo_id");
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement ��ü ����
			
			System.out.println("���밡�� ������� ����:" + "PROD_ITEM_ID=" + prod_item_id +", WO_ID=" + wo_id );
			
			sql =  "UPDATE	IF_SET_PROD_ORDER										          			\n";
			sql += "SET		IF_FLAG	=	'N',	    													\n";
			sql += "		IF_MSGS	=	'�������� ��',														\n";
			sql += "		IDU_FLAG=	'D'												       			\n";
			sql += "WHERE	WO_ID	=	'" + wo_id								+ "'	       			\n";
			sql += "AND		ITEM_ID	=	'" + prod_item_id						+ "'	       			\n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			
			boolean result = stmt.execute(sql);
			System.out.println("���밡�� ������� ����!!! - ��� : " + result);
			System.out.println("doDelete() end!!!");
			

			gdRes.addParam("mode", "doDeleteIf");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");			
			
		}catch (Exception e) {
			throw e;
		}finally {
	        databaseUtility.close(conn, stmt, rs);              
	    }
		System.out.println("doDelete() end!!!");

		return gdRes;
	}			
	
	
}                                                                                                                  