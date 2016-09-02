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
public class ip_01120_Jgc_inventoryPlanAnalysis_list extends HttpServlet {                                                             
                                                                                                                             
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
			String search_type = gdReq.getParam("search_type"); 
			String search_item = gdReq.getParam("search_item"); 
			
			
		                                                                                                                 
			String paramKey   = "start_date!%!search_type!%!search_item";                                                                      
			String paramCode  = start_date+"!%!"+search_type+"!%!"+search_item;                                                                   
		
			System.out.println("search_type = " + search_type);                                                                    
			
			String query_id   = "ip_01120_Jgc_inventoryPlanAnalysis_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("DIVISION"       	).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("SALES_CAT03"       ).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("ITEM_ID" 	        ).addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("ITEM_NAME"	        ).addValue(qResult.get(i).get(3),"");
				gdRes.getHeader("SPEC"        		).addValue(qResult.get(i).get(4),"");                                     
				gdRes.getHeader("JGC_STOCK"        	).addValue(qResult.get(i).get(5),""); 
				gdRes.getHeader("USE_PLAN"        	).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("SALES_PRE"	        ).addValue(qResult.get(i).get(7),"");                                     
				gdRes.getHeader("SALES_CUR"	        ).addValue(qResult.get(i).get(8),"");
				gdRes.getHeader("SALES_CUM"	    	).addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("MONTH_RATE"	    ).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("SALES_SUM"	        ).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("REMAIN_STOCK"      ).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("REMAIN_PRICE"      ).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("REMAIN_DAY"		).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("EXPIRY_VERSION"	).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("PROD_TERM"			).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("TERM_PER"			).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("DUE_DATE"			).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("STOCK_USE_PER"		).addValue(qResult.get(i).get(19),"");				
				gdRes.getHeader("REGISTER_AGO"		).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("EXPECT_QTY"	    ).addValue(qResult.get(i).get(21),"");
				gdRes.getHeader("EXPECT_QTY2"		).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("EXPECT_QTY3"		).addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("EXPECT_QTY4"		).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("TERM_VAL"	    	).addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("STOCK_DAY"	        ).addValue(qResult.get(i).get(26),"");
				gdRes.getHeader("SALES_MEAN_3WEEK"	).addValue(qResult.get(i).get(27),"");
				gdRes.getHeader("REGISTER_DAY"	    ).addValue(qResult.get(i).get(28),"");
				
		                                                                                                          
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
		

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
			System.out.println("Rowcount : " + rowCount);
			
			String start_date 	= gdReq.getParam("start_date");						
			String user_id		= gdReq.getParam("user_id");
			String search_type  = gdReq.getParam("search_type");
			String search_item  = gdReq.getParam("search_item");
			
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!				
			
			
			sql   = "MERGE INTO JGC_ITEM_STOCK JGC	 /*+ bypass_ujvc*/       	 \n";
			sql  += "USING(							                 			 \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//파라미터를 변수에 적용!!					
					
					//---------------------------------------------------------------------------------------------	----------------------
					sql += "	SELECT	"		+	gdReq.getHeader("ITEM_ID"				).getValue(i) 	+	"	AS ITEM_ID,						\n";
					sql += "				'"  + 		 	start_date							  			+ 	"' 	AS CNFM_DATE,					\n";
					sql += "				'"  + 		 	user_id								  			+ 	"' 	AS MADE_BY,						\n";
					sql += " 				'"	+	gdReq.getHeader("EXPIRY_VERSION"		).getValue(i) +		"'	AS EXPIRY_VERSION,				\n"; 
					sql += " 				'"	+	gdReq.getHeader("JGC_STOCK"		).getValue(i) +		"'	AS STOCK,								\n"; 
					sql += " 				'"	+	gdReq.getHeader("DUE_DATE"		).getValue(i) +		"'	AS DUE_DATE,							\n"; 
					sql += " 				'"	+	gdReq.getHeader("PROD_TERM"		).getValue(i) +		"'	AS PROD_TERM,							\n"; 
					sql += " 				'"	+	gdReq.getHeader("USE_PLAN"		).getValue(i) +		"'	AS USE_PLAN,							\n";
					sql += " 				'"	+	gdReq.getHeader("TERM_VAL"		).getValue(i) +		"'	AS TERM_VAL,							\n";
					sql += " 				'HAWA'	AS ITYPE,																						\n"; 
					sql += " 				SYSDATE	AS MADE_DTTM,																					\n"; 
					sql += " 				'"	+	gdReq.getHeader("SALES_SUM"		).getValue(i) +		"'	AS SELL_BOX_CUM,						\n"; 
					sql += " 				'Y'	AS SEARCH_FLAG,																						\n"; 
					sql += " 				'"	+	gdReq.getHeader("SALES_PRE"		).getValue(i) +		"'	AS SALES_PRE,							\n"; 
					
					sql += " 				'"	+	gdReq.getHeader("SALES_CUR"		).getValue(i) +		"'	AS ISSUE,								\n"; 
					sql += " 				'"	+	gdReq.getHeader("REMAIN_STOCK"		).getValue(i) +		"'	AS REMAIN_STOCK,					\n"; 
					sql += " 				TO_CHAR(TO_DATE('"	+	gdReq.getHeader("REGISTER_DAY"		).getValue(i) +		"'),'YYYY-MM-DD')	AS REGISTER_DAY				\n"; 
					sql += "		FROM   DUAL											\n"	;						
				
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") JGC1 														   	\n";
			sql += "ON (JGC.ITEM_ID    = JGC1.ITEM_ID    						   	\n";
			sql += "AND JGC.CNFM_DATE    = JGC1.CNFM_DATE         					\n";
			sql += "AND JGC.EXPIRY_VERSION   = JGC1.EXPIRY_VERSION )        		\n";
			sql += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql += "     JGC.MADE_BY      	= JGC1.MADE_BY,   					   	\n";
			sql += "     JGC.STOCK      	= JGC1.STOCK,   					   	\n";
			sql += "     JGC.DUE_DATE      	= JGC1.DUE_DATE,   					   	\n";
			sql += "     JGC.PROD_TERM      = JGC1.PROD_TERM,   					\n";
			sql += "     JGC.USE_PLAN       = JGC1.USE_PLAN,   						\n";
			sql += "     JGC.TERM_VAL      	= JGC1.TERM_VAL,   					   	\n";
			sql += "     JGC.ITYPE      	= JGC1.ITYPE,   					   	\n";
			sql += "     JGC.MADE_DTTM      = JGC1.MADE_DTTM,   					\n";
			sql += "     JGC.SELL_BOX_CUM   = JGC1.SELL_BOX_CUM,   					\n";
			sql += "     JGC.SEARCH_FLAG    = JGC1.SEARCH_FLAG,   					\n";
			sql += "     JGC.SALES_PRE      = JGC1.SALES_PRE,   					\n";
			sql += "     JGC.ISSUE      	= JGC1.ISSUE,   					   	\n";
			sql += "     JGC.REMAIN_STOCK   = JGC1.REMAIN_STOCK,   					\n";
			sql += "     JGC.REGISTER_DAY   = JGC1.REGISTER_DAY  					\n";	
			sql += "WHEN NOT MATCHED THEN                                           \n";
			sql += "	INSERT                                                      \n";
			sql += "	(                                                           \n";
			sql += "	 JGC.CNFM_DATE, JGC.ITEM_ID, JGC.EXPIRY_VERSION, JGC.MADE_BY, JGC.STOCK, JGC.USE_PLAN, JGC.DUE_DATE, JGC.PROD_TERM, JGC.TERM_VAL, JGC.ITYPE, JGC.MADE_DTTM, JGC.SELL_BOX_CUM, JGC.SEARCH_FLAG, JGC.SALES_PRE, JGC.ISSUE, JGC.REMAIN_STOCK, JGC.REGISTER_DAY  	\n";
			sql += "	) VALUES                                                                             														\n";
			sql += "	(                                                                                    														\n";
			sql += "	JGC1.CNFM_DATE, JGC1.ITEM_ID, JGC1.EXPIRY_VERSION, JGC1.MADE_BY, JGC1.STOCK, JGC1.USE_PLAN, JGC1.DUE_DATE, JGC1.PROD_TERM, JGC1.TERM_VAL, JGC1.ITYPE, JGC1.MADE_DTTM, JGC1.SELL_BOX_CUM, JGC1.SEARCH_FLAG, JGC1.SALES_PRE, JGC1.ISSUE, JGC1.REMAIN_STOCK, JGC1.REGISTER_DAY  \n";
			sql += "	 )                                                                                    														\n";
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