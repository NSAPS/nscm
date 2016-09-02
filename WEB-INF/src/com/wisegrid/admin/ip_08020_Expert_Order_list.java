package com.wisegrid.admin;                                                                                                  
import java.io.IOException;                                                                                                  
import java.io.PrintWriter;                                                                                                  
                                                                                             
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
public class ip_08020_Expert_Order_list extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	      
	ResultSet	rs2		= null;	 
	ResultSet	rs3		= null;	
	String 		sql 	= null;  
	String		sql2	= null;
	String		sql3	= null;
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
			System.out.println("Test :: mode = " + mode);                                                                    
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);    
			else if (mode.equals("save")) //                                                                               
				gdRes = doSave(gdReq);	
			else if (mode.equals("save2")) //                                                                               
				gdRes = doSave2(gdReq);	
			else if (mode.equals("CreatePlan")) //                                                                               
				gdRes = doCreatePlan(gdReq);
			                                                                                                                 
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
	        
			String cnfm_date  		= gdReq.getParam("cnfm_date");  //AUDAT 전표증빙일, 생성일       
			String domain			= gdReq.getParam("domain");
			String mto_gubn			= gdReq.getParam("mto_gubn");
			
		                                                                                                                 
			String paramKey   = "cnfm_date!%!domain!%!mto_gubn";                                                                      
			String paramCode  = cnfm_date+"!%!"+domain+"!%!"+mto_gubn;                                                                   
		  	
			String query_id   = "ip_08020_Expert_Order_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {       
				
				gdRes.getHeader("CRUD"			).addValue( "", "");
				gdRes.getHeader("MTO_MTS_GUBN" 	).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("SALES_CAT03" 	).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_ID" 	    ).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ITEM_NAME"	    ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("SPEC"	    	).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("AVL_STOCK"	    ).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("AVL_STOCK2"	).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("ORDER_QTY"	    ).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("NEED_QTY"	    ).addValue(qResult.get(i).get(8), "");				
				gdRes.getHeader("MOQ"        	).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("MOQ_GAP"      	).addValue(qResult.get(i).get(10), ""); 
				gdRes.getHeader("PLAN_QTY"     	).addValue(qResult.get(i).get(11), "");				
				gdRes.getHeader("SAFE_QTY"     	).addValue(qResult.get(i).get(12), "");
				gdRes.getHeader("BOOKING_QTY_W2").addValue(qResult.get(i).get(13), "");
				gdRes.getHeader("BOOKING_QTY_W3").addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("BOOKING_QTY_W4").addValue(qResult.get(i).get(15), "");
				gdRes.getHeader("BOOKING_QTY_W5").addValue(qResult.get(i).get(16), "");
				gdRes.getHeader("PRE_MONTH_SELL").addValue(qResult.get(i).get(17), "");	
				gdRes.getHeader("PLAN_QTY2"     ).addValue(qResult.get(i).get(18), ""); 
				gdRes.getHeader("FLAG"     		).addValue(qResult.get(i).get(19), ""); 
				gdRes.getHeader("ROWNUM"     	).addValue(qResult.get(i).get(20), "");
				
		                                                                                                          
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	} 		
	
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
								
			String user_id			= gdReq.getParam("user_id");
			String cnfm_date		= gdReq.getParam("cnfm_date");
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!				
			
			sql3  = "	UPDATE  /*+ bypass_ujvc*/ 																		\n";
			sql3 += "	EX_PROD_PLAN_FLAG 																				\n";
			sql3 += "	SET FLAG ='Y'																					\n";
			sql3 += "	WHERE	VERSION = '" + cnfm_date + "'\n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			rs3 = databaseUtility.executeQuery(stmt, sql3);
			
			sql   = "MERGE INTO EX_PROD_PLAN BP	 /*+ bypass_ujvc*/       	 	  \n";
			sql  += "USING(							                     		  \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//파라미터를 변수에 적용!!					

					//---------------------------------------------------------------------------------------------	----------------------
					sql += "	SELECT	'" 	+ 							cnfm_date	 				+ 			"' 		AS VERSION,			\n"; 
					sql += "			'"	+			gdReq.getHeader("ITEM_ID"	).getValue(i) 	+	 		"'		AS ITEM_ID,			\n";
					sql += "			'"	+			gdReq.getHeader("PLAN_QTY2"	).getValue(i) 	+	 		"'		AS PLAN_QTY,		\n";					
					sql += "			'"  + 		 	user_id									  	+ 			"' 		AS MADE_BY			\n";				
					sql +="		FROM   DUAL 																		   						\n";	
					//--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") BP1 														   	\n";
			sql += "ON (BP.VERSION    = BP1.VERSION    						   		\n";
			sql += "AND BP.ITEM_ID    = BP1.ITEM_ID)         						\n";			
			sql += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql += "     BP.PLAN_QTY    = BP1.PLAN_QTY,   					   		\n";		
			sql += "     BP.MADE_DTTM  	= SYSDATE,   					   			\n";
			sql += "     BP.MADE_BY 	= BP1.MADE_BY   					   		\n";
			sql += "WHEN NOT MATCHED THEN                                           \n";
			sql += "	INSERT                                                      \n";
			sql += "	(                                                           \n";
			sql += "	 BP.VERSION, BP.ITEM_ID, BP.PLAN_QTY,   BP.MADE_DTTM, BP.MADE_BY	\n";
			sql += "	) VALUES                                                        \n";
			sql += "	(                                                               \n";
			sql += "	BP1.VERSION, BP1.ITEM_ID, BP1.PLAN_QTY,   SYSDATE, BP1.MADE_BY	\n";
			sql += "	        )                                                       \n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			sql2   = "MERGE INTO PLANT_ALLOC_ITEM_ADJ BP	 /*+ bypass_ujvc*/       	 	  \n";
			sql2  += "USING(							                     		  \n";
			
			boolean flag2 = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag2){
						sql2  += "union all \n";
	
					}
					flag2 = true;
					
					//파라미터를 변수에 적용!!					

					//---------------------------------------------------------------------------------------------	----------------------
					sql2 += "	SELECT	(SELECT VERSION FROM PLAN_VERSION_LOG																		\n";
					sql2 += "			 WHERE RUN_DATE=TO_DATE('" 	+ cnfm_date	+ "' ,'YYYY-MM-DD') AND CAT_ID ='FA' AND STATUS='22') AS VERSION, 	\n";
					sql2 += "			TO_DATE('" 	+ cnfm_date	+ "','YYYY-MM-DD')+11							AS DUE_DATE,						\n";
					sql2 += "			'"	+			gdReq.getHeader("ITEM_ID"	).getValue(i) 	+	 		"'		AS ITEM_ID,			\n";
					sql2 += "			'"	+			gdReq.getHeader("PLAN_QTY2"	).getValue(i) 	+	 		"'		AS EXPORT_PLAN,		\n";					
					sql2 += "			'"  + 		 	user_id									  	+ 			"' 		AS MADE_BY			\n";				
					sql2 +="		FROM   DUAL 																		   					\n";	
					//--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 2----------------------------------------------------------------------------------
			sql2 += ") BP1 														   	\n";
			sql2 += "ON (BP.VERSION    = BP1.VERSION    						   	\n";
			sql2 += "AND BP.DUE_DATE   = BP1.DUE_DATE         						\n";	
			sql2 += "AND BP.ITEM_ID    = BP1.ITEM_ID)         						\n";			
			sql2 += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql2 += "     BP.EXPORT_PLAN    = BP1.EXPORT_PLAN,   					\n";		
			sql2 += "     BP.MADE_DTTM  	= SYSDATE,   					   		\n";
			sql2 += "     BP.MADE_BY 	= BP1.MADE_BY   					   		\n";
			sql2 += "WHEN NOT MATCHED THEN                                          \n";
			sql2 += "	INSERT                                                      \n";
			sql2 += "	(                                                           \n";
			sql2 += "	 BP.VERSION, BP.ITEM_ID, BP.DUE_DATE, BP.EXPORT_PLAN,   BP.MADE_DTTM, BP.MADE_BY	\n";
			sql2 += "	) VALUES                                                        					\n";
			sql2 += "	(                                                               					\n";
			sql2 += "	BP1.VERSION, BP1.ITEM_ID, BP1.DUE_DATE, BP1.EXPORT_PLAN,   SYSDATE, BP1.MADE_BY	\n";
			sql2 += "	        )                                                       					\n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			
		
			System.out.println("executeQuery 실행!!!");			
			//rs = databaseUtility.executeQuery(stmt, sql);	
			rs2 = databaseUtility.executeQuery(stmt, sql2);
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
        }

        System.out.println("save() end!!!");

		return gdRes;
	}	
	
	public GridData doSave2(GridData gdReq) throws Exception {

		System.out.println("doSave2() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());

		try {



			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save2");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
								
			String user_id		= gdReq.getParam("user_id");
			String cnfm_date		= gdReq.getParam("cnfm_date");
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!				
			
			sql3  = "	UPDATE  /*+ bypass_ujvc*/ 																		\n";
			sql3 += "	EX_PROD_PLAN_FLAG 																				\n";
			sql3 += "	SET FLAG ='Y'																					\n";
			sql3 += "	WHERE	VERSION = '" + cnfm_date + "'\n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			rs3 = databaseUtility.executeQuery(stmt, sql3);
			
			sql   = "MERGE INTO EX_PROD_PLAN BP	 /*+ bypass_ujvc*/       	 	  \n";
			sql  += "USING(							                     		  \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//파라미터를 변수에 적용!!					

					//---------------------------------------------------------------------------------------------	----------------------
					sql += "	SELECT	'" 	+ 							cnfm_date	 				+ 			"' 		AS VERSION,			\n"; 
					sql += "			'"	+			gdReq.getHeader("ITEM_ID"	).getValue(i) 	+	 		"'		AS ITEM_ID,			\n";
					sql += "			'"	+			gdReq.getHeader("PLAN_QTY2"	).getValue(i) 	+	 		"'		AS PLAN_QTY,		\n";					
					sql += "			'"  + 		 	user_id									  	+ 			"' 		AS MADE_BY			\n";				
					sql +="		FROM   DUAL 																		   						\n";	
					//--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") BP1 														   	\n";
			sql += "ON (BP.VERSION    = BP1.VERSION    						   		\n";
			sql += "AND BP.ITEM_ID    = BP1.ITEM_ID)         						\n";			
			sql += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql += "     BP.PLAN_QTY    = BP1.PLAN_QTY,   					   		\n";		
			sql += "     BP.MADE_DTTM  	= SYSDATE,   					   			\n";
			sql += "     BP.MADE_BY 	= BP1.MADE_BY   					   		\n";
			sql += "WHEN NOT MATCHED THEN                                           \n";
			sql += "	INSERT                                                      \n";
			sql += "	(                                                           \n";
			sql += "	 BP.VERSION, BP.ITEM_ID, BP.PLAN_QTY,   BP.MADE_DTTM, BP.MADE_BY	\n";
			sql += "	) VALUES                                                        \n";
			sql += "	(                                                               \n";
			sql += "	BP1.VERSION, BP1.ITEM_ID, BP1.PLAN_QTY,   SYSDATE, BP1.MADE_BY	\n";
			sql += "	        )                                                       \n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			sql2   = "MERGE INTO PLANT_ALLOC_ITEM_ADJ BP	 /*+ bypass_ujvc*/       	 	  \n";
			sql2  += "USING(							                     		  \n";
			
			boolean flag2 = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag2){
						sql2  += "union all \n";
	
					}
					flag2 = true;
					
					//파라미터를 변수에 적용!!					

					//---------------------------------------------------------------------------------------------	----------------------
					sql2 += "	SELECT	(SELECT VERSION FROM PLAN_VERSION_LOG																		\n";
					sql2 += "			 WHERE RUN_DATE=TO_DATE('" 	+ cnfm_date	+ "' ,'YYYY-MM-DD') AND CAT_ID ='FA' AND STATUS='22') AS VERSION, 	\n";
					sql2 += "			TO_DATE('" 	+ cnfm_date	+ "','YYYY-MM-DD')+11							AS DUE_DATE,						\n";
					sql2 += "			'"	+			gdReq.getHeader("ITEM_ID"	).getValue(i) 	+	 		"'		AS ITEM_ID,			\n";
					sql2 += "			'"	+			gdReq.getHeader("PLAN_QTY2"	).getValue(i) 	+	 		"'		AS LST_PRODQTY,		\n";					
					sql2 += "			'"  + 		 	user_id									  	+ 			"' 		AS MADE_BY			\n";				
					sql2 +="		FROM   DUAL 																		   					\n";	
					//--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 2----------------------------------------------------------------------------------
			sql2 += ") BP1 														   	\n";
			sql2 += "ON (BP.VERSION    = BP1.VERSION    						   	\n";
			sql2 += "AND BP.DUE_DATE   = BP1.DUE_DATE         						\n";	
			sql2 += "AND BP.ITEM_ID    = BP1.ITEM_ID)         						\n";			
			sql2 += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql2 += "     BP.LST_PRODQTY    = BP1.LST_PRODQTY,   					\n";		
			sql2 += "     BP.MADE_DTTM  	= SYSDATE,   					   		\n";
			sql2 += "     BP.MADE_BY 	= BP1.MADE_BY   					   		\n";
			sql2 += "WHEN NOT MATCHED THEN                                          \n";
			sql2 += "	INSERT                                                      \n";
			sql2 += "	(                                                           \n";
			sql2 += "	 BP.VERSION, BP.ITEM_ID, BP.DUE_DATE, BP.LST_PRODQTY,   BP.MADE_DTTM, BP.MADE_BY	\n";
			sql2 += "	) VALUES                                                        					\n";
			sql2 += "	(                                                               					\n";
			sql2 += "	BP1.VERSION, BP1.ITEM_ID, BP1.DUE_DATE, BP1.LST_PRODQTY,   SYSDATE, BP1.MADE_BY	\n";
			sql2 += "	        )                                                       					\n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
		
			System.out.println("executeQuery 실행!!!");			
			//rs = databaseUtility.executeQuery(stmt, sql);		
			rs2 = databaseUtility.executeQuery(stmt, sql2);
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "save2");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);  
            databaseUtility.close(conn, stmt, rs2); 
        }

        System.out.println("save2() end!!!");

		return gdRes;
	}
	
	//해외영업 계획 실행 SP 호출
	public GridData doCreatePlan(GridData gdReq) throws Exception {
		
		System.out.println("doCreatePlan() start!!!");
		GridData gdRes = new GridData(); // WiseGrid 객체생성
		
		String max_date	= gdReq.getParam("max_date"); 
		
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성
		System.out.println("call SP_IP_EX_PROD_PLAN() 실행!!!");
		String sql2 = "call SP_IP_EX_PROD_PLAN('CRE_DATA',SYSDATE,1 ,1 ,'NA',SYSDATE,'"+max_date+"')";
		
		boolean result = stmt.execute(sql2);
		System.out.println("call SP_IP_EX_PROD_PLAN() 종료!!! - 결과 : " + result);
		System.out.println("doCreatePlan() end!!!");

		gdRes.addParam("mode", "CreatePlan");
		gdRes.setMessage("성공적으로 작업하였습니다.");
		gdRes.setStatus("true");
		
		
		return gdRes;		
	}
	
	
}                                                                                                                            