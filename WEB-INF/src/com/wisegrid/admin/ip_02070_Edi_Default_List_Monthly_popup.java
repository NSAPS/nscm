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
public class ip_02070_Edi_Default_List_Monthly_popup extends HttpServlet {                                                             
                                                                                                                             
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
			                                                                                                                 
			String cnfm_date	= gdReq.getParam("cnfm_date");                                                            
			                                                                                                                 
			String paramKey   ="cnfm_date";                                                                      
			String paramCode  = cnfm_date;
                                                                                                                             
			String query_id   = "ip_02070_Edi_Default_List_Monthly_popup";                                                             
                                                                                                                             
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

				gdRes.getHeader("CNFM_DATE"			).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("EDI_AMOUNT"		).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("EDI_AMOUNT_SUM"	).addValue( "", "");                                      
				gdRes.getHeader("DEFAULT_AMOUNT"	).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("CUST_DEFAULT"		).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("NS_DEFAULT"		).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("NS_DEFAULT_SUM"	).addValue( "", "");                                      
				gdRes.getHeader("PENALTY_AMOUNT_3"	).addValue( "", "");                                      
				gdRes.getHeader("PENALTY_AMOUNT_5"	).addValue( "", "");                                      
				gdRes.getHeader("DEFAULT_RATE"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("DEFAULT_RATE_SUM"	).addValue( "", "");                                      
				gdRes.getHeader("KAL_DEFAULT"		).addValue(qResult.get(i).get(6  ),"");
				gdRes.getHeader("MJ_DEFAULT"		).addValue(qResult.get(i).get(7  ),"");
				
				
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
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CNFM_DATE").getRowCount());


			rowCount = gdReq.getHeader("CNFM_DATE").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("doSave : 저장할 DATA가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}

		////////////
			 			
			String sql 
			= "INSERT  INTO EDI_DEFAULT(GROUP_CODE, CNFM_DATE, CUST_STORE_CODE, CUST_STORE_NAME, CUST_ITEM_ID, CUST_ITEM_NAME, 			\n"
			+ "                         EDI_GUBN, EDI_QTY, DEFAULT_QTY, EDI_AMOUNT, DEFAULT_AMOUNT, MADE_TYPE, MADE_DTTM, MADE_BY)		\n";
					
			System.out.println("getParam");
			String group_code	= gdReq.getParam("group_code");	
			String user_id		= gdReq.getParam("user_id");	
			String cnfm_date	= gdReq.getParam("cnfm_date");
			
			// 데이터 셋팅
			System.out.println("sql 쿼리 생성");
			for (int i = 0; i < rowCount; i++)  {  
				
					if( i > 0){
						sql += " union all \n"; 
					} 
					
					//String crud = gdReq.getHeader("CRUD").getValue(i);
					//System.out.println(crud);
						sql += "	SELECT	'" + group_code									   	 + "'	AS GROUP_CODE,   	\n";
						sql += "			'" + gdReq.getHeader("CNFM_DATE"		).getValue(i)+ "'   AS CNFM_DATE,   	\n";
						sql += "			'" + gdReq.getHeader("CUST_STORE_CODE"	).getValue(i)+ "'   AS CUST_STORE_CODE, \n";
						sql += "			'" + gdReq.getHeader("CUST_STORE_NAME"	).getValue(i)+ "'   AS CUST_STORE_NAME, \n";
						sql += "			'" + gdReq.getHeader("CUST_ITEM_ID"		).getValue(i)+ "'   AS CUST_ITEM_ID,   	\n";
						sql += "			'" + gdReq.getHeader("CUST_ITEM_NAME"	).getValue(i)+ "'   AS CUST_ITEM_NAME,  \n";
						sql += "			'" + gdReq.getHeader("EDI_GUBN"			).getValue(i)+ "'   AS EDI_GUBN,   		\n";
						sql += "			'" + gdReq.getHeader("EDI_QTY"			).getValue(i)+ "'   AS EDI_QTY,   		\n";
						sql += "			'" + gdReq.getHeader("DEFAULT_QTY"		).getValue(i)+ "'   AS DEFAULT_QTY,   	\n";
						sql += "			'" + gdReq.getHeader("EDI_AMOUNT"		).getValue(i)+ "'   AS EDI_AMOUNT,   	\n";
						sql += "			'" + gdReq.getHeader("DEFAULT_AMOUNT"	).getValue(i)+ "'   AS DEFAULT_AMOUNT,  \n";
						sql += "			'AD'														AS MADE_TYPE,      	\n";
						sql += "			SYSDATE														AS MADE_DTTM,      	\n";
						sql += "			'" + user_id									   	+ "'	AS MADE_BY 	    	\n";
						sql += "	FROM	DUAL			                                                  				\n";						

			}
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
				

			System.out.println("call SP_IP_EDI_DEFAULT_LIST_MAPPING() 실행!!!");
			String sql2 = "DELETE	 FROM	EDI_DEFAULT WHERE CNFM_DATE = '"+cnfm_date+"'";
			System.out.println("-----------------------------------------------QUERY-DELETE-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY-DELETE-----------------------------------------------");
			boolean result2 = stmt.execute(sql2);
			
			
			
			
			
			System.out.println("-----------------------------------------------QUERY_INSERT-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY_INSERT-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			rs = databaseUtility.executeQuery(stmt, sql);
			System.out.println("executeQuery 종료!!!");
			
			
			System.out.println("call SP_IP_EDI_DEFAULT_LIST_MAPPING() 실행!!!");
			String sql3 = "call SP_IP_EDI_DEFAULT_LIST_MAPPING('CRE_DATA',SYSDATE,1,1,'NA',SYSDATE,"+cnfm_date+")";
			System.out.println("-----------------------------------------------QUERY-SP EXE-----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY-SP EXE-----------------------------------------------");
			boolean result3 = stmt.execute(sql3);
			
			
			System.out.println("call SP_IP_EDI_DEFAULT_LIST_MAPPING() 종료!!! - 결과 : " + result3);
			System.out.println("doExePlan() end!!!");
			
			

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