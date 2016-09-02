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
public class ip_03020_Gift_Set_list extends HttpServlet {                                                             
                                                                                                                             
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
			System.out.println("Test :: mode = " + mode);                                                                    
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);    
			if (mode.equals("save")) //                                                                                    
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
	        
			String start_date  = gdReq.getParam("start_date");                                                            
			String end_date    = gdReq.getParam("end_date"); 			
			String user_id	   = gdReq.getParam("user_id"); 
			
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!user_id";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+user_id;    
			
			String query_id   = "ip_03020_Gift_Set_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("SALES_CAT02"       ).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("ITEM_ID" 	        ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_NAME"	        ).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("SPEC"        		).addValue(qResult.get(i).get(3), "");                                     
				gdRes.getHeader("GIFT_PLAN"        	).addValue(qResult.get(i).get(4), "");                               
				gdRes.getHeader("GIFT_PROD"         ).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("PROD_CUM"			).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("PROD_REMN"			).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("BASE_STOCK"		).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("SALES_CUR"			).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("SALES_SUM"			).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("CHGO_CUM"	   	 	).addValue(qResult.get(i).get(11), ""); 
				gdRes.getHeader("STOCK_EXPT"	    ).addValue(qResult.get(i).get(12), "");                                     
				gdRes.getHeader("CHGO_RATE"	        ).addValue(qResult.get(i).get(13), "");
				gdRes.getHeader("CHGO_AMOUNT"	    ).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("TOT_AMOUNT"		).addValue(qResult.get(i).get(15),"");				
				gdRes.getHeader("TOT_SALES"			).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("EXCEPT_SALES"	    ).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("COST_PER_BOX"		).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("COST_PER_BOX_CUM"	).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("SALES_CUM_YEAR"	).addValue(qResult.get(i).get(20),"");
				
		                                                                                                          
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	} 
	
	//관심품목 설정
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
			String checked_button = gdReq.getParam("checked_button");						
			String user_id		= gdReq.getParam("user_id");
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!	
			
			System.out.println("test :" + checked_button);
			//관심품목 저장
			if (checked_button.equals("00") ){
			
			sql   = "MERGE INTO ITEM_MST IM	 /*+ bypass_ujvc*/       	 \n";
			sql  += "USING(							                     \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//파라미터를 변수에 적용!!					
					
			
					//---------------------------------------------------------------------------------------------	----------------------
					sql += "	SELECT	ITEM_ID,  																												\n"; 
					sql += "		'"	+			gdReq.getHeader("JGC_DUE_DATE"	).getValue(i) +	 						"'	AS JGC_DUE_DATE,				\n";
					sql += "	SUBSTR(AT_FLAG,0,F_GET_AT_FLAG('" + user_id + "')-1)||'Y'||SUBSTR(AT_FLAG,F_GET_AT_FLAG('" + user_id + "')+1,9) AS AT_FLAG		\n";
					sql +="		FROM   ITEM_MST 																		   										\n";	
					sql +="		WHERE  ITEM_ID ='"	+	gdReq.getHeader("ITEM_ID"		).getValue(i) +	"' 							 							\n";
	               //--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") IM1 														   	\n";
			sql += "ON (IM.ITEM_ID    = IM1.ITEM_ID)    						   	\n";
			sql += "when matched then update set            					   	\n";
			sql += "     IM.AT_FLAG      = IM1.AT_FLAG,   					   		\n";
			sql += "     IM.JGC_DUE_DATE      = IM1.JGC_DUE_DATE   					\n";
			 //---------------------------------------------------------------------------------------------------------------------------		

			
			}
			//장기체화 저장
			else if(checked_button != "00"){
				
				sql   = "MERGE INTO ITEM_MST IM	 /*+ bypass_ujvc*/       	 \n";
				sql  += "USING(							                     \n";
				
				boolean flag = false;
				
				// 데이터 셋팅
				for (int i = 0; i < rowCount; i++) {

					if( flag){
							sql  += "union all \n";
					
						}
						flag = true;
						
						//파라미터를 변수에 적용!!					
						
				
						//-------------------------------------------------------------------------------------------------------------------
						sql += "	SELECT	"		+	gdReq.getHeader("ITEM_ID"		).getValue(i) +		"	AS ITEM_ID,						\n"; 
						sql += 							checked_button								  +		"	AS JGC_DIVISION,'				\n";
						sql += 							gdReq.getHeader("JGC_DUE_DATE"	).getValue(i) +	 	"'	AS JGC_DUE_DATE					\n";
						sql +="		FROM   DUAL																	   								\n";	
						
		               //--------------------------------------------------------------------------------------------------------------------
					} 
							
				//-----------------------------Merge Into 1----------------------------------------------------------------------------------
				sql += ") IM1 														   	\n";
				sql += "ON (IM.ITEM_ID    = IM1.ITEM_ID)    						   	\n";
				sql += "when matched then update set            					   	\n";
				sql += "     IM.JGC_DIVISION      = IM1.JGC_DIVISION,   				\n";
				sql += "     IM.JGC_DUE_DATE      = IM1.JGC_DUE_DATE   					\n";	
				 //---------------------------------------------------------------------------------------------------------------------------	
				
				
			}
				
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