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
public class op_02070_event_plan_info extends HttpServlet {                                                             
                                                                                                                             
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
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);                                                                                      
			else if (mode.equals("doSave")) //                                                                               
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

	
	// DW 1 조회  쿼리
	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			
			String user_id		= gdReq.getParam("user_id");	
			
			String in_fr_date	=	gdReq.getParam("in_fr_date");
			String in_to_date	=	gdReq.getParam("in_to_date");
			
			String paramKey   ="user_id!%!in_fr_date!%!in_to_date";
			String paramCode  = user_id+"!%!"+in_fr_date+"!%!"+in_to_date;
			String query_id   = "op_02070_event_plan_info";                                                             
                                                                                                                             
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

				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(0),   "");
				gdRes.getHeader("GUBN"			).addValue(qResult.get(i).get(1),   "");
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(2),   "");
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(3),   "");
				gdRes.getHeader("EVEN_METHOD"	).addValue(qResult.get(i).get(4),   "");
				gdRes.getHeader("FRT_CHGO_DATE"	).addValue(qResult.get(i).get(5),   "");	
				gdRes.getHeader("EVEN_S_DATE"	).addValue(qResult.get(i).get(6),   "");
				gdRes.getHeader("EVEN_E_DATE"	).addValue(qResult.get(i).get(7),   "");

				gdRes.getHeader("CHDO_QTY"		).addValue(qResult.get(i).get(8),   "");
				gdRes.getHeader("PLAN_QTY"		).addValue(qResult.get(i).get(9),   "");
				gdRes.getHeader("SUPT_METHOD"	).addValue(qResult.get(i).get(10),  "");
				gdRes.getHeader("CHGO_STD"		).addValue(qResult.get(i).get(11),  "");
				gdRes.getHeader("ETC"			).addValue(qResult.get(i).get(12),  "");
				
				gdRes.getHeader("REAL_CHGO_DATE").addValue(qResult.get(i).get(13),  "");	
				gdRes.getHeader("REAL_S_DATE"	).addValue(qResult.get(i).get(14),  "");
				gdRes.getHeader("REAL_E_DATE"	).addValue(qResult.get(i).get(15),  "");
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        


	
	// doReg // 등록화면 저장
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");



		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // SEQ 컬럼 row 수

			rowCount = gdReq.getHeader("ITEM_NAME").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("doSave : 저장할 DATA가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			
			String sql 
			= "INSERT  INTO event_plan_info_tmp (CUST_NAME,	GUBN,		ITEM_ID,		ITEM_NAME, 	EVEN_METHOD,	FRT_CHGO_DATE,	EVEN_S_DATE,	EVEN_E_DATE,	\n"
				+ "                         	 CHDO_QTY,	PLAN_QTY,	SUPT_METHOD,	CHGO_STD,	ETC,			MADE_TYPE,		MADE_DTTM, 		MADE_BY)		\n";

					
			System.out.println("getParam");

			String user_id		= gdReq.getParam("user_id");	
			String sql3;
			
			
			// 데이터 셋팅
			System.out.println("sql 쿼리 생성");
			for (int i = 0; i < rowCount; i++)  {  
				
					if( i > 0){
						sql += " union all \n"; 
					} 
						
						sql += "	SELECT	'" + gdReq.getHeader("CUST_NAME"		).getValue(i)+ "'   			AS CUST_NAME, 		\n";
						sql += "			'" + gdReq.getHeader("GUBN"				).getValue(i)+ "'   			AS GUBN, 			\n";
						sql += "			'" + gdReq.getHeader("ITEM_ID"			).getValue(i)+ "'   			AS ITEM_ID, 		\n";
						sql += "			'" + gdReq.getHeader("ITEM_NAME"		).getValue(i)+ "'   			AS ITEM_NAME, 		\n";
						sql += "			'" + gdReq.getHeader("EVEN_METHOD"		).getValue(i)+ "'   			AS EVEN_METHOD, 	\n";
											
						sql += "			TRUNC(TO_DATE(NVL('" + gdReq.getHeader("REAL_CHGO_DATE"	).getValue(i)+ "',		'"+ gdReq.getHeader("FRT_CHGO_DATE").getValue(i)+"')))	AS FRT_CHGO_DATE, 	\n";
						sql += "			TRUNC(TO_DATE(NVL('" + gdReq.getHeader("REAL_S_DATE"	).getValue(i)+ "',		'"+ gdReq.getHeader("EVEN_S_DATE").getValue(i)+"')))	AS EVEN_S_DATE, 	\n";
						sql += "			TRUNC(TO_DATE(NVL('" + gdReq.getHeader("REAL_E_DATE"	).getValue(i)+ "',		'"+ gdReq.getHeader("EVEN_E_DATE").getValue(i)+"')))	AS EVEN_E_DATE, 	\n";
						
						
						sql += "			'" + gdReq.getHeader("CHDO_QTY"			).getValue(i)+ "'   			AS CHDO_QTY, 		\n";
						sql += "			'" + gdReq.getHeader("PLAN_QTY"			).getValue(i)+ "'   			AS PLAN_QTY, 		\n";
						sql += "			'" + gdReq.getHeader("SUPT_METHOD"		).getValue(i)+ "'   			AS SUPT_METHOD, 	\n";
						sql += "			'" + gdReq.getHeader("CHGO_STD"			).getValue(i)+ "'   			AS CHGO_STD, 		\n";
						sql += "			'" + gdReq.getHeader("ETC"				).getValue(i)+ "'   			AS ETC, 			\n";

						
						
						sql += "			'AD'																	AS MADE_TYPE,      	\n";
						sql += "			SYSDATE																	AS MADE_DTTM,   	\n";
						sql += "			'" + user_id									   	+ "'				AS MADE_BY 	    	\n";
						sql += "	FROM	DUAL			                                                  							\n";						
			
						
			}
			
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성

			String sql2 = "DELETE	 FROM	EVENT_PLAN_INFO_TMP";
			
			String sql4 = "DELETE	 FROM	EVENT_PLAN_INFO WHERE	PLAN_QTY	=	0";
			
			sql3 	= "MERGE INTO	EVENT_PLAN_INFO EPI						\n";
			sql3	+="	USING	(											\n";
			sql3	+="			SELECT	CUST_NAME,							\n";
			sql3	+="				    GUBN,								\n";
			sql3	+="					ITEM_ID,							\n";
			sql3	+="					ITEM_NAME,							\n";
			sql3	+="					EVEN_METHOD,						\n";
			
			sql3	+="				    FRT_CHGO_DATE,						\n";
			sql3	+="				    EVEN_S_DATE,						\n";
			sql3	+="				    EVEN_E_DATE,						\n";
			
			sql3	+="				    CHDO_QTY,							\n";
			sql3	+="				    PLAN_QTY,							\n";
			sql3	+="				    SUPT_METHOD,						\n";
			sql3	+="				    CHGO_STD,							\n";
			sql3	+="				    ETC,								\n";
			
			sql3	+="					MADE_TYPE,							\n";
			sql3	+="					MADE_DTTM,							\n";
			sql3	+="					MADE_BY								\n";
			sql3	+="			FROM	EVENT_PLAN_INFO_TMP					\n";
			sql3	+="			)	EPI1									\n";
			
			sql3	+="	ON	(EPI.ITEM_ID	=	EPI1.ITEM_ID				\n";
			sql3	+="	AND	EPI.ITEM_NAME	=	EPI1.ITEM_NAME				\n";
			sql3	+="	AND	EPI.CUST_NAME	=	EPI1.CUST_NAME				\n";
			sql3	+="	AND	EPI.EVEN_S_DATE	=	EPI1.EVEN_S_DATE			\n";
			sql3	+="	AND	EPI.EVEN_E_DATE	=	EPI1.EVEN_E_DATE)			\n";
			sql3	+=" WHEN MATCHED THEN UPDATE set						\n";
			sql3	+="	EPI.GUBN			=	EPI1.GUBN, 					\n";
			sql3	+="	EPI.EVEN_METHOD		=	EPI1.EVEN_METHOD, 			\n";
			sql3	+="	EPI.FRT_CHGO_DATE	=	EPI1.FRT_CHGO_DATE, 		\n";
			
			sql3	+="	EPI.CHDO_QTY		=	EPI1.CHDO_QTY, 				\n";  
			sql3	+="	EPI.PLAN_QTY		=	EPI1.PLAN_QTY,				\n";
			
			sql3	+="	EPI.SUPT_METHOD		=	EPI1.SUPT_METHOD, 			\n";  
			sql3	+="	EPI.CHGO_STD		=	EPI1.CHGO_STD,				\n";
			sql3	+="	EPI.ETC				=	EPI1.ETC					\n";
			
			sql3	+=" WHEN NOT MATCHED THEN INSERT(EPI.CUST_NAME,		EPI.GUBN,		EPI.ITEM_ID,		EPI.ITEM_NAME,		EPI.EVEN_METHOD,	EPI.FRT_CHGO_DATE,		EPI.EVEN_S_DATE,	EPI.EVEN_E_DATE,				\n";
			sql3	+="								 EPI.CHDO_QTY,		EPI.PLAN_QTY,	EPI.SUPT_METHOD,	EPI.ETC,			EPI.MADE_TYPE,		EPI.MADE_DTTM,			EPI.MADE_BY)	\n";
			sql3	+=" VALUES			 			(EPI1.CUST_NAME,	EPI1.GUBN,		EPI1.ITEM_ID,		EPI1.ITEM_NAME,		EPI1.EVEN_METHOD,	EPI1.FRT_CHGO_DATE,		EPI1.EVEN_S_DATE,	EPI1.EVEN_E_DATE,			\n";
			sql3	+="								 EPI1.CHDO_QTY,		EPI1.PLAN_QTY,	EPI1.SUPT_METHOD,	EPI1.ETC,			'UP',	SYSDATE,	EPI1.MADE_BY)	\n";
			

			System.out.println("-----------------------------------------------QUERY-DELETE-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY-DELETE-----------------------------------------------");
			
			System.out.println("-----------------------------------------------QUERY_INSERT-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY_INSERT-----------------------------------------------");

			System.out.println("-----------------------------------------------QUERY-MERGE INTO-----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY-MERGE INTO-----------------------------------------------");
			
			boolean result = stmt.execute(sql2);
			
			System.out.println("executeQuery 실행!!!");
			rs = databaseUtility.executeQuery(stmt, sql2);
			rs = databaseUtility.executeQuery(stmt, sql);
			rs = databaseUtility.executeQuery(stmt, sql3);
			rs = databaseUtility.executeQuery(stmt, sql4);
			
			System.out.println("executeQuery 종료!!!");

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