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
public class sc_13010_set_prod_order_list extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	ResultSet	rs2		= null;	                                                                                             
	ResultSet	rs3		= null;	                                                                                             
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
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);                                                                                      
			else if (mode.equals("save")) //                                                                               
				gdRes = doSave(gdReq);
			else if (mode.equals("doIf")) //                                                                               
				gdRes = doIf(gdReq);
			
			
			
			
		
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
			String if_flag		= gdReq.getParam("if_flag");
			String scm_charge		= gdReq.getParam("scm_charge");
			                                                                                                                 
			String paramKey   ="start_date!%!end_date!%!idu_flag!%!scm_charge!%!if_flag";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+idu_flag+"!%!"+scm_charge+"!%!"+if_flag;   		
			
			//String paramKey   ="in_fr_date!%!in_to_date!%!in_item_id!%!in_bl_no";                                                                      
			//String paramCode  = in_fr_date+"!%!"+in_to_date+"!%!"+in_item_id+"!%!"+in_bl_no;   			
			
	        System.out.println("idu_flag="+idu_flag);                                                                                      
			
                                                                                                                             
			String query_id   = "sc_13010_set_prod_order_list";                                                             
                                                                                                                             
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
				gdRes.getHeader("SELECTED"	).addValue("0", "");
				//gdRes.getHeader("SELECTED_DEL"	).addValue("0", "");
				gdRes.getHeader("PLANT_ID"		).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("QTY"			).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("QTY_UOM"		).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("PROD_VER"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("PROC_ID"		).addValue(qResult.get(i).get(6  ),"");
				gdRes.getHeader("PROC_ID_NAME"	).addValue(qResult.get(i).get(7  ),"");
				gdRes.getHeader("LOC_ID"		).addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("LOC_NAME"		).addValue(qResult.get(i).get(9  ),"");
				gdRes.getHeader("START_DATE"	).addValue(qResult.get(i).get(10 ),"");                                      
				gdRes.getHeader("START_TIME"	).addValue(qResult.get(i).get(11 ),"");                                      
				gdRes.getHeader("END_DATE"		).addValue(qResult.get(i).get(12 ),"");                                      
				gdRes.getHeader("END_TIME"		).addValue(qResult.get(i).get(13 ),"");                                      
				gdRes.getHeader("IF_BUTTON"		).addValue(qResult.get(i).get(14 ),"");                                      
				gdRes.getHeader("DEL_BUTTON"	).addValue(qResult.get(i).get(15 ),"");                                      
				gdRes.getHeader("PROD_PO"		).addValue(qResult.get(i).get(16 ),"");                                      
				gdRes.getHeader("IF_FLAG"		).addValue(qResult.get(i).get(17 ),"");                                      
				gdRes.getHeader("IF_MSGS"		).addValue(qResult.get(i).get(18 ),"");
				gdRes.getHeader("WO_ID"			).addValue(qResult.get(i).get(19 ),"");
				gdRes.getHeader("OPER_ID"		).addValue(qResult.get(i).get(20 ),"");
				gdRes.getHeader("IDU_FLAG"		).addValue(qResult.get(i).get(21 ),"");
                                                                                                                             
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}


	
	public GridData doIf(GridData gdReq) throws Exception {

		System.out.println("doIf() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doIf");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql;
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.ITEM_ID, T1.WO_ID,  T1.IF_FLAG, T2.NEW_IF_FLAG														\n";
			sql += "	FROM	IF_SET_PROD_ORDER	T1,                                                                                 \n";
			sql += "			(                                                                                                      	\n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println("crud ="+crud);
				
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					//파라미터를 변수에 적용!!  
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + gdReq.getHeader("WO_ID").getValue(i) 			+ "'	AS WO_ID, 	    		\n";
					inner_sql += "				'N'															AS NEW_IF_FLAG			\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for문 끝.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	AND		T1.WO_ID	= T2.WO_ID                          	                                                \n";
			sql += "	)                                                     	                                                 	\n";
			sql += "	SET		IF_FLAG = NEW_IF_FLAG																				\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "doIf");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);   
        }

        System.out.println("doIf() end!!!");

		return gdRes;
	}			
	

	
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount			= gdReq.getHeader("CRUD").getRowCount();
			String cnfm_date 	= gdReq.getParam("cnfm_date");
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Save");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql, sql2, inner_sql2, sql3, inner_sql3;
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.ITEM_ID, T1.BASE_DAY, T2.NEW_BASE_DAY																\n";
			sql += "	FROM	ITEM_MST	T1,                                                                                        	\n";
			sql += "			(                                                                                                      	\n";
			boolean flag = false;
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					//파라미터를 변수에 적용!!  
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + gdReq.getHeader("BASE_DAY").getValue(i)		+ "'	AS NEW_BASE_DAY	    	\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					sql += inner_sql;
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql += "	UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for문 끝.
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		BASE_DAY = NEW_BASE_DAY														                  	\n";

			System.out.println("-----------------------------------------------QUERY_1-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY_1-----------------------------------------------");
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql2  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql2 += "	( 																												\n";
			sql2 += "	SELECT																											\n";
			sql2 += "			T1.ITEM_ID, T1.LST_PRODQTY, T2.NEW_LST_PRODQTY															\n";
			sql2 += "	FROM	PLANT_ALLOC_ITEM_ADJ	T1,                                                                                        	\n";
			sql2 += "			(                                                                                                      	\n";
			boolean flag2 = false;
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					if( flag2){
						sql2 += "UNION	ALL \n"; 
					}
					flag2 = true;
					//파라미터를 변수에 적용!!  
					inner_sql2  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql2 += "				'" + gdReq.getHeader("W1_PROD_QTY").getValue(i)		+ "'	AS NEW_LST_PRODQTY    	\n";
					inner_sql2 += "	FROM	DUAL			                                                  													\n";
					sql2 += inner_sql2;
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql2 += "	UNION	ALL \n" + inner_sql2;
					}
				}
									
			}//for문 끝.
			sql2 += "			)			T2                                                                                      \n";
			sql2 += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql2 += "	AND		T1.VERSION	LIKE REPLACE('" + cnfm_date + "','-','')||'%'                                         \n";
			sql2 += "	AND		T1.DUE_DATE	= TO_CHAR(TRUNC(TO_DATE('" + cnfm_date + "')+7,'D')+6,'YYYY-MM-DD')-- 차주 토요일로 공장할당 조정물량 입력		\n";
			sql2 += "	)                                                                                                        	\n";
			sql2 += "	SET		LST_PRODQTY = NEW_LST_PRODQTY													                  	\n";

			System.out.println("-----------------------------------------------QUERY_2-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY_2-----------------------------------------------");
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql3  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql3 += "	( 																												\n";
			sql3 += "	SELECT																											\n";
			sql3 += "			T1.ITEM_ID, T1.LST_PRODQTY, T2.NEW_LST_PRODQTY															\n";
			sql3 += "	FROM	PLANT_ALLOC_ITEM_ADJ	T1,                                                                                        	\n";
			sql3 += "			(                                                                                                      	\n";
			boolean flag3 = false;
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					if( flag3){
						sql3 += "UNION	ALL \n"; 
					}
					flag3 = true;
					//파라미터를 변수에 적용!!  
					inner_sql3  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql3 += "				'" + gdReq.getHeader("W3_PROD_QTY").getValue(i)		+ "'	AS NEW_LST_PRODQTY    	\n";
					inner_sql3 += "	FROM	DUAL			                                                  													\n";
					sql3 += inner_sql3;
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql3 += "	UNION	ALL \n" + inner_sql3;
					}
				}
									
			}//for문 끝.
			sql3 += "			)			T2                                                                                      \n";
			sql3 += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql3 += "	AND		T1.VERSION	LIKE REPLACE('" + cnfm_date + "','-','')||'%'                                         \n";
			sql3 += "	AND		T1.DUE_DATE	= TO_CHAR(TRUNC(TO_DATE('" + cnfm_date + "')+14,'D')+6,'YYYY-MM-DD')-- 차주 토요일로 공장할당 조정물량 입력		\n";
			sql3 += "	)                                                                                                        	\n";
			sql3 += "	SET		LST_PRODQTY = NEW_LST_PRODQTY													                  	\n";

			System.out.println("-----------------------------------------------QUERY_2-----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY_2-----------------------------------------------");
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			rs2 = databaseUtility.executeQuery(stmt, sql2);
			rs3 = databaseUtility.executeQuery(stmt, sql3);			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("성공적으로 작업하였습니다.");
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