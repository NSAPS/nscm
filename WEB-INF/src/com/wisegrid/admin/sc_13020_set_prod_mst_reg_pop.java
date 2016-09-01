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
public class sc_13020_set_prod_mst_reg_pop extends HttpServlet {                                                             
                                                                                                                             
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
                                                                                                                             
			if (mode.equals("search")) // 등록화면 하단 그리드
				gdRes = doQuery(gdReq);                                                                                      
			else if (mode.equals("search2")) // 등록화면 저장
				gdRes = doQuery2(gdReq);                                                                                      
			else if (mode.equals("doReg")) // 등록화면 저장
				gdRes = doReg(gdReq);

		
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

	
	// 등록 모드 하단 그리드 조회 // 수량 입력후 쿼리 실행
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			// service_url += "&=" + item_id + "&=" + item_name + "&=" +
			// week_flag;
			
			
			String item_id	= gdReq.getParam("item_id");
			//String qty		= gdReq.getParam("qty");
			//String prod_ver	= gdReq.getParam("prod_ver");
			                                                                                                                 
			
			String paramKey   ="item_id";                                                                      
			String paramCode  = item_id;   			
                                                                                                                             
			String query_id   = "sc_13010_set_prod_mst_get_prod_ver_box_cost";                                                             
                                                                                                                             
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
				gdRes.getHeader("ITEM_ID" 		).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("ITEM_NAME" 	).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("PROD_VER" 		).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("PROC_ID" 		).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("PROC_NAME"		).addValue(qResult.get(i).get(4  ),"");
				gdRes.getHeader("BOX_COST" 		).addValue(qResult.get(i).get(5  ),"");
				gdRes.getHeader("WORK_CAPA" 	).addValue(qResult.get(i).get(6  ),"");
				gdRes.getHeader("BOX_COST_START").addValue(qResult.get(i).get(7  ),"");
				gdRes.getHeader("BOX_COST_END" 	).addValue(qResult.get(i).get(8  ),"");                                     
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	// 등록 모드 하단 그리드 조회 // 수량 입력후 쿼리 실행
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			// service_url += "&=" + item_id + "&=" + item_name + "&=" +
			// week_flag;
			
			
			String item_id	= gdReq.getParam("item_id");
			//String qty		= gdReq.getParam("qty");
			//String prod_ver	= gdReq.getParam("prod_ver");
			                                                                                                                 
			
			String paramKey   ="item_id";                                                                      
			String paramCode  = item_id;   			
                                                                                                                             
			String query_id   = "sc_13010_set_prod_mst_get_prod_ver_man_cost";                                                             
                                                                                                                             
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
				gdRes.getHeader("ITEM_ID" 		).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("ITEM_NAME" 	).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("PROD_VER" 		).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("PROC_ID" 		).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("PROC_NAME"		).addValue(qResult.get(i).get(4  ),"");
				gdRes.getHeader("MEN_TO" 		).addValue(qResult.get(i).get(5  ),"");
				gdRes.getHeader("WOMEN_TO" 		).addValue(qResult.get(i).get(6  ),"");
				gdRes.getHeader("MEN_COST" 		).addValue(qResult.get(i).get(7  ),"");
				gdRes.getHeader("WOMEN_COST" 	).addValue(qResult.get(i).get(8  ),"");
				gdRes.getHeader("MAN_COST_START").addValue(qResult.get(i).get(9  ),"");
				gdRes.getHeader("MAN_COST_END" 	).addValue(qResult.get(i).get(10 ),"");
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}             
	
	// doReg // 등록화면 저장
	public GridData doReg(GridData gdReq) throws Exception {

		System.out.println("doReg() start!!!");



		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // SEQ 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("PROD_VER").getRowCount());


			rowCount = gdReq.getHeader("PROD_VER").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doReg");
				gdRes.setMessage("doSave : 저장할 DATA가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			



		////////////
			 			
			String sql 
			= "INSERT  INTO SET_PROD_MST(	ITEM_ID,LOC_ID, OPER_TYPE, START_DATE, END_DATE, OPER_QTY, BM, COST, 			\n"
			+ " 							CUST_TYPE, TO_MEN, TO_WOMEN, WORK_CAPA, MADE_TYPE, MADE_DTTM, MADE_BY, PROD_VER)\n";

			System.out.println("getParam");
			
			
			String item_id		= gdReq.getParam("item_id");
			String bm			= gdReq.getParam("bm");
			String oper_type	= gdReq.getParam("oper_type");
			String oper_qty		= gdReq.getParam("oper_qty");
			String cust_type	= gdReq.getParam("cust_type");
			String qty_uom		= gdReq.getParam("qty_uom");
			String start_date	= gdReq.getParam("start_date");
			String end_date		= gdReq.getParam("end_date");
			String user_id		= gdReq.getParam("user_id");

			
			// 데이터 셋팅
			System.out.println("sql 쿼리 생성");
			for (int i = 0; i < rowCount; i++)  {  
				
				
					if( i > 0){
						sql += " union all \n"; 
					} 
					
					//String crud = gdReq.getHeader("CRUD").getValue(i);
					//System.out.println(crud);
						sql += "	SELECT	'" + item_id									+ "'	AS ITEM_ID,        		\n";
						sql += "			'" + gdReq.getHeader("PROC_ID").getValue(i)		+ "'    AS LOC_ID,         		\n";
						sql += "			'" + oper_type									+ "'	AS OPER_TYPE,       	\n";
						sql += "			'" + start_date									+ "'	AS START_DATE,        	\n";
						sql += "			'" + end_date									+ "'	AS END_DATE,       		\n";
						sql += "			'" + oper_qty									+ "'	AS OPER_QTY,        	\n";
						sql += "			'" + bm											+ "'	AS BM,        			\n";
						sql += "			'" + gdReq.getHeader("COST").getValue(i)		+ "'    AS COST,         		\n";
						sql += "			'" + cust_type									+ "'	AS CUST_TYPE,         	\n";
						sql += "			'" + gdReq.getHeader("TO_MEN").getValue(i)		+ "'    AS TO_MEN,   			\n";
						sql += "			'" + gdReq.getHeader("TO_WOMEN").getValue(i)	+ "'    AS TO_WOMEN,       		\n";
						sql += "			'" + gdReq.getHeader("WORK_CAPA").getValue(i)	+ "'    AS WORK_CAPA,   		\n";
						sql += "			'AD'													AS MADE_TYPE,      		\n";
						sql += "			SYSDATE													AS MADE_DTTM,      		\n";
						sql += "			'" + user_id									+ "'	AS MADE_BY, 	    	\n";
						sql += "			'" + gdReq.getHeader("PROD_VER").getValue(i)	+ "'    AS PROD_VER   			\n";
						sql += "	FROM	DUAL			                                                  				\n";						

			}
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
				
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");

			gdRes.addParam("mode", "doReg");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");			
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }
		System.out.println("doReg() end!!!");

		return gdRes;
	}	

	public GridData doSave(GridData gdReq) throws Exception {

//		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("getParam");
			
			
			String item_id		= gdReq.getParam("item_id");
			String bm			= gdReq.getParam("bm");
			String oper_type	= gdReq.getParam("oper_type");
			String oper_qty		= gdReq.getParam("oper_qty");
			String cust_type	= gdReq.getParam("cust_type");
			String qty_uom		= gdReq.getParam("qty_uom");
			String start_date	= gdReq.getParam("start_date");
			String end_date		= gdReq.getParam("end_date");
			String user_id		= gdReq.getParam("user_id");			
			
					
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!	
			sql   = "merge into SET_PROD_MST SM				           \n";
			sql  += "using (                                           \n";
			boolean flag = false;
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				if( flag){
						sql  += "union all \n";
					}
					flag = true;
					//-------------------------------------------------------------------------------------------------------------------
					//System.out.println(crud);
					sql += "	SELECT	'" + item_id									+ "'	AS ITEM_ID,        		\n";
					sql += "			'" + gdReq.getHeader("PROD_VER").getValue(i)	+ "'    AS PROD_VER,   			\n";
					sql += "			'" + start_date									+ "'	AS START_DATE,        	\n";
					sql += "			'" + end_date									+ "'	AS END_DATE,       		\n";
					
					
					sql += "			'" + gdReq.getHeader("PROC_ID").getValue(i)		+ "'    AS LOC_ID,         		\n";
					sql += "			'" + oper_type									+ "'	AS OPER_TYPE,       	\n";
					sql += "			'" + oper_qty									+ "'	AS OPER_QTY,        	\n";
					sql += "			'" + bm											+ "'	AS BM,        			\n";
					sql += "			'" + gdReq.getHeader("COST").getValue(i)		+ "'    AS COST,         		\n";
					sql += "			'" + cust_type									+ "'	AS CUST_TYPE,         	\n";
					sql += "			'" + gdReq.getHeader("TO_MEN").getValue(i)		+ "'    AS TO_MEN,   			\n";
					sql += "			'" + gdReq.getHeader("TO_WOMEN").getValue(i)	+ "'    AS TO_WOMEN,       		\n";
					sql += "			'" + gdReq.getHeader("WORK_CAPA").getValue(i)	+ "'    AS WORK_CAPA,   		\n";
					sql += "			'AD'													AS MADE_TYPE,      		\n";
					sql += "			SYSDATE													AS MADE_DTTM,      		\n";
					sql += "			'" + user_id									+ "'	AS MADE_BY, 	    	\n";
					sql += "	FROM	DUAL			                                                  				\n";						
					
					
				} 
									
		//	}//for문 끝.
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") SM1 														   												\n";
			sql += "ON (SM.ITEM_ID		= SM1.ITEM_ID    						   												\n";
			sql += "AND SM.PROD_VER		= SM1.PROD_VER            				  												\n";
			sql += "AND SM.START_DATE	= SM1.NEW_START_DATE)						  											\n";
			sql += "when matched then update set            					  												\n";
			sql += "	SM.BM			= SM1.NEW_BM,				SM.OPER_TYPE	= SM1.NEW_OPER_TYPE,			        	\n";
			sql += "	SM.OPER_QTY		= SM1.NEW_OPER_QTY,			-- 조인조건은 업데이트 할수없음  SM.START_DATE	= SM1.NEW_START_DATE,			        \n";
			sql += "	SM.END_DATE		= SM1.NEW_END_DATE,			SM.CUST_TYPE	= SM1.NEW_CUST_TYPE,			       		\n";
			sql += "	SM.WORK_COST	= SM1.NEW_WORK_COST,		SM.TO_MEN		= SM1.NEW_TO_MEN,			                \n";
			sql += "	SM.TO_WOMEN		= SM1.NEW_TO_WOMEN,			SM.WORK_CAPA	= SM1.NEW_WORK_CAPA,	                	\n";
			sql += "	SM.ROH2_COST	= SM1.NEW_ROH2_COST,		SM.MADE_BY		= SM1.NEW_MADE_BY,							\n";
			sql += "	SM.MADE_TYPE	= 'UP',						SM.MADE_DTTM	= SYSDATE									\n";
			////////////////////
			sql += "when not matched then insert" +
				   "(ITEM_ID, PROD_VER, START_DATE, END_DATE, OPER_TYPE, OPER_QTY, BM, CUST_TYPE, " +
				   " ROH2_COST, WORK_COST, TO_MEN, TO_WOMEN, WORK_CAPA, MADE_TYPE, MADE_DTTM, MADE_BY)\n";
			sql += "values                      " +
				   "(SM1.ITEM_ID, SM1.PROD_VER, NVL(SM1.NEW_START_DATE, TO_CHAR(SYSDATE,'YYYY-MM-DD')), SM1.NEW_END_DATE, NVL(SM1.NEW_OPER_TYPE,'001'), SM1.NEW_OPER_QTY, SM1.NEW_BM, " +
				   " NVL(SM1.NEW_CUST_TYPE,'001'), SM1.NEW_ROH2_COST, SM1.NEW_WORK_COST, SM1.NEW_TO_MEN, SM1.NEW_TO_WOMEN, SM1.NEW_WORK_CAPA, 'AD', SYSDATE, '"+ user_id +"') \n";
	        //---------------------------------------------------------------------------------------------------------------------------		
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "doSave");
			gdRes.setMessage("성공적으로 작업하였습니다.");
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
