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
public class ip_03060_Ex_Order extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String cnfm_date  		= gdReq.getParam("cnfm_date");  
			String search_type  	= gdReq.getParam("search_type");  
			String sales_cat05		= gdReq.getParam("sales_cat05");
			
		                                                                                                                 
			String paramKey   = "cnfm_date!%!search_type!%!sales_cat05";                                                                      
			String paramCode  = cnfm_date+"!%!"+search_type+"!%!"+sales_cat05;                                                                   
		  	
			String query_id   = "ip_03060_Ex_Order";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             
				
				gdRes.getHeader("SELECTED"		).addValue("0", ""); 
				gdRes.getHeader("SALES_CAT03" 	).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("SALES_CAT032" 	).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ITEM_ID" 		).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("ITEM_NAME" 	).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("GUBN"	    	).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("LEADTIME"	    ).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("PM_4"			).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("PM_3"	    	).addValue(qResult.get(i).get(8), "");				
				gdRes.getHeader("PM_2"      	).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("PM_1"    		).addValue(qResult.get(i).get(10), ""); 
				gdRes.getHeader("PM_AVG"     	).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("M_0"     		).addValue(qResult.get(i).get(12), "");
				gdRes.getHeader("M_REMAIN"      ).addValue(qResult.get(i).get(13), ""); 
				gdRes.getHeader("M_1"     		).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("M_2"     		).addValue(qResult.get(i).get(15), "");
				gdRes.getHeader("M_3"     		).addValue(qResult.get(i).get(16), "");
				gdRes.getHeader("M_4"     		).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("SAFE_QTY"     	).addValue("0", "");
				gdRes.getHeader("TOTAL_NEED"    ).addValue(qResult.get(i).get(19), "");
				gdRes.getHeader("AVL_MONTH"     ).addValue(qResult.get(i).get(20), "");
				gdRes.getHeader("EVENT_QTY"     ).addValue(qResult.get(i).get(21), "");
				gdRes.getHeader("BASE_STOCK"    ).addValue(qResult.get(i).get(22), "");				
				gdRes.getHeader("RECEIPT_EXPT"  ).addValue(qResult.get(i).get(23), "");
				gdRes.getHeader("RECEIPT_EXPT2" ).addValue(qResult.get(i).get(24), "");
				gdRes.getHeader("RECEIPT_EXPT3" ).addValue(qResult.get(i).get(25), "");
				gdRes.getHeader("RECEIPT_EXPT4" ).addValue(qResult.get(i).get(26), "");
				gdRes.getHeader("RECEIPT_EXPT5" ).addValue(qResult.get(i).get(27), "");
				gdRes.getHeader("TOTAL_QTY"     ).addValue(qResult.get(i).get(28), "");
				gdRes.getHeader("NEED_QTY"     	).addValue(qResult.get(i).get(29), "");
				gdRes.getHeader("ORDER_QTY"     ).addValue(qResult.get(i).get(30), "");
				
		                                                                                                          
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
		
		System.out.println("Total Row Count : " + gdReq.getHeader("SELECTED").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("SELECTED").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
								
			String user_id			= gdReq.getParam("user_id");
			String version			= gdReq.getParam("version");
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!				
			
			sql   = "MERGE INTO MONTH_PR_DATA PR	 		/*+ bypass_ujvc*/       \n";
			sql  += "USING(							                     			\n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//파라미터를 변수에 적용!!					
					
			
					//---------------------------------------------------------------------------------------------	----------------------
					sql += "	SELECT		"	+			version 		+	 											"	AS VERSION,						\n"; 
					sql += "				'"	+			gdReq.getHeader("ITEM_ID"	).getValue(i) +	 					"'	AS ITEM_ID,						\n";
					sql += "				'"	+			gdReq.getHeader("ORDER_QTY"	).getValue(i) +	 					"'	AS QTY							\n";
					sql += "	FROM   DUAL																														\n";	
	               //--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") PR1 												\n";
			sql += "ON (PR.VERSION    = PR1.VERSION    					\n";
			sql += "AND PR.ITEM_ID    = PR1.ITEM_ID)         			\n";
			sql += "WHEN MATCHED THEN UPDATE SET            			\n";
			sql += "     PR.QTY    		= PR1.QTY,   					\n";		
			sql += "     PR.MADE_DTTM  	= SYSDATE   					\n";
			sql += "WHEN NOT MATCHED THEN                               \n";
			sql += "	INSERT                                          \n";
			sql += "	(                                               \n";
			sql += "	 PR.VERSION, PR.ITEM_ID, PR.QTY,   PR.MADE_DTTM	\n";
			sql += "	) VALUES                                        \n";
			sql += "	(                                               \n";
			sql += "	PR1.VERSION, PR1.ITEM_ID, PR1.QTY,   SYSDATE	\n";
			sql += "	        )                                       \n";
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
			gdRes.addParam("mode", "save");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }

        System.out.println("save() end!!!");

		return gdRes;
	}	
	
}                                                                                                                            