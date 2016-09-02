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
public class op_02090_Long_Term_Planning_semi_list extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;                                                                                              
	String 		sql2 	= null;   
	String		sql3    = null;
	String		sql4	= null;
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
			else if (mode.equals("search2")) //                                                                               
				gdRes = doQuery2(gdReq);
			else if (mode.equals("search3")) //                                                                               
				gdRes = doQuery3(gdReq);
			else if (mode.equals("search4")) //                                                                               
				gdRes = doQuery4(gdReq);
			else if (mode.equals("save")) //                                                                               
				gdRes = doSave(gdReq);	
			else if (mode.equals("save2")) //                                                                               
				gdRes = doSave2(gdReq);	
			else if (mode.equals("trans")) //                                                                               
				gdRes = doTrans(gdReq);
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

	
	// DW 1 조회  쿼리
	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes	= new GridData();
		int rowCount	= 0;

		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_type	= gdReq.getParam("item_type");        
			String version		= gdReq.getParam("version"); 
			                                                                
			String paramKey   	="version!%!item_type";                                                                      
			String paramCode  	= version+"!%!"+item_type;
                                                                                                                             
			String query_id   	= "op_02090_Long_Term_Planning_list_semi_dw1";                                                             
                                                                                                                             
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

				gdRes.getHeader("ITEM_ID"			).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("ITEM_NAME" 		).addValue(qResult.get(i).get(1), "");                                     
				gdRes.getHeader("SPEC" 				).addValue(qResult.get(i).get(2), "");                                     
				gdRes.getHeader("PROD_0" 			).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("PROD_1" 			).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("PROD_2" 			).addValue(qResult.get(i).get(5), "");                                     
				gdRes.getHeader("PROD_3" 			).addValue(qResult.get(i).get(6), "");                                     
				gdRes.getHeader("PROD_4" 			).addValue(qResult.get(i).get(7), "");                                     
				gdRes.getHeader("PROD_5" 			).addValue(qResult.get(i).get(8), "");
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	// DW 2 조회  쿼리
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_type	= gdReq.getParam("item_type");        
			String version		= gdReq.getParam("version");                                                           
			                                                                                                                  
			String paramKey		=	"version!%!item_type";                                                                      
			String paramCode	=	version + "!%!" + item_type;                                                                   
                                                                                                                             
			String query_id		=	"op_02090_Long_Term_Planning_semi_list_dw2";                                                             
                                                                                                                             
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
				
				gdRes.getHeader("SELECTED"	).addValue("0", ""); 
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1), "");    
				gdRes.getHeader("IDX" 		).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(3), "");                                      
				gdRes.getHeader("PROD_0"	).addValue(qResult.get(i).get(4), "");                                      
				gdRes.getHeader("PROD_1"	).addValue(qResult.get(i).get(5), "");                                      
				gdRes.getHeader("PROD_2"	).addValue(qResult.get(i).get(6), "");                                      
				gdRes.getHeader("PROD_3"	).addValue(qResult.get(i).get(7), "");                                      
				gdRes.getHeader("PROD_4"	).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("PROD_5"	).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("MINMPSQTY"	).addValue(qResult.get(i).get(10), ""); 
				gdRes.getHeader("NTGEW"		).addValue(qResult.get(i).get(11), ""); 
				gdRes.getHeader("MEINS"		).addValue(qResult.get(i).get(12), "");
				gdRes.getHeader("QTY"		).addValue("", "");
				gdRes.getHeader("IPGO_QTY"	).addValue(qResult.get(i).get(13), "");
				gdRes.getHeader("IPGO_DATE"	).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("READ_TIME"	).addValue(qResult.get(i).get(15), "");
				gdRes.getHeader("TEXT"		).addValue(qResult.get(i).get(16), "");
				gdRes.getHeader("PR_NO"		).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("IF_MSGS"	).addValue(qResult.get(i).get(18), "");
				gdRes.getHeader("BASE_STOCK").addValue("0", "");                                     
		
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                	
	
	// DW 1 조회  쿼리
	public GridData doQuery3(GridData gdReq) throws Exception {

		GridData gdRes	= new GridData();
		int rowCount	= 0;

		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_type	= gdReq.getParam("item_type");        
			String version		= gdReq.getParam("version"); 
			                                                                
			String paramKey   	="version!%!item_type";                                                                      
			String paramCode  	= version+"!%!"+item_type;
                                                                                                                             
			String query_id   	= "op_02090_Long_Term_Planning_list_semi_dw3";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search3");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                

			
			
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("ITEM_ID"			).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("ITEM_NAME" 		).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("MONTH_0" 			).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("MONTH_1" 			).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("MONTH_2" 			).addValue(qResult.get(i).get(4), "");                                     
				gdRes.getHeader("MONTH_3" 			).addValue(qResult.get(i).get(5), "");                                     
				gdRes.getHeader("MONTH_4" 			).addValue(qResult.get(i).get(6), "");                                     
				gdRes.getHeader("MONTH_5" 			).addValue(qResult.get(i).get(7), "");
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search3");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}   
	
	// DW 4 조회  쿼리
	public GridData doQuery4(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			String from_mm		=	gdReq.getParam("from_mm");                                                            
			String to_mm		=	gdReq.getParam("to_mm");    
			String version		= 	gdReq.getParam("version"); 
			                                                                                                                 
			String paramKey		=	"item_id!%!from_mm!%!to_mm!%!version";                                                                      
			String paramCode	=	item_id+"!%!"+from_mm+"!%!"+to_mm+"!%!"+version;                                                                    
                                                                                                                             
			String query_id		=	"op_02090_Long_Term_Planning_list_semi_dw4";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search4");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("ITEM_NAME" 	).addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("DEMAND"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("PROD_QTY"		).addValue(qResult.get(i).get(3),"");  
				gdRes.getHeader("USE_QTY" 		).addValue(qResult.get(i).get(4),"");
                                     
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search4");		                                                                         
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
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {



			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
								
			String user_id		= gdReq.getParam("user_id");
			String version		= gdReq.getParam("version");
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!				
			
			
			sql   = "MERGE INTO BASE_PROD_PLAN BP	 /*+ bypass_ujvc*/       	 \n";
			sql  += "USING(							                     		  \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//파라미터를 변수에 적용!!					
					
//"			DECODE(		 " + gdReq.getHeader("USE_PR_PLAN"		).getValue(i)		+ ",1,'Y','N')	 	AS USE_PR_PLAN,             	\n";
					//---------------------------------------------------------------------------------------------	----------------------
					sql += "	SELECT	TO_CHAR(SYSDATE,'YYYYMMDD')	VERSION,  																					\n"; 
					sql += "			'1300'						PLANT_ID,																					\n";
					sql += "		'"	+			gdReq.getHeader("ITEM_ID"	).getValue(i) +	 						"'	AS ITEM_ID,							\n";
					sql += "	DECODE(TO_CHAR(SYSDATE,'YYYYMM'),SUBSTR('"	+	version	+	"',1,6),'"	+	gdReq.getHeader("PROD_0"	).getValue(i) +	 "',	\n";
					sql += "	'"	+	gdReq.getHeader("PROD_1"	).getValue(i) +	 "')	AS DM,	\n";
					sql += "	DECODE(TO_CHAR(SYSDATE,'YYYYMM'),SUBSTR('"	+	version	+	"',1,6),'"	+	gdReq.getHeader("PROD_1"	).getValue(i) +	 "',	\n";
					sql += "	'"	+	gdReq.getHeader("PROD_2"	).getValue(i) +	 "')	AS DM_1,	\n";
					sql += "	DECODE(TO_CHAR(SYSDATE,'YYYYMM'),SUBSTR('"	+	version	+	"',1,6),'"	+	gdReq.getHeader("PROD_2"	).getValue(i) +	 "',	\n";
					sql += "	'"	+	gdReq.getHeader("PROD_3"	).getValue(i) +	 "')	AS DM_2,	\n";
					sql += "	DECODE(TO_CHAR(SYSDATE,'YYYYMM'),SUBSTR('"	+	version	+	"',1,6),'"	+	gdReq.getHeader("PROD_3"	).getValue(i) +	 "',	\n";
					sql += "	'"	+	gdReq.getHeader("PROD_4"	).getValue(i) +	 "')	AS DM_3,	\n";
					sql += "	DECODE(TO_CHAR(SYSDATE,'YYYYMM'),SUBSTR('"	+	version	+	"',1,6),'"	+	gdReq.getHeader("PROD_4"	).getValue(i) +	 "',	\n";
					sql += "	'"	+	gdReq.getHeader("PROD_5"	).getValue(i) +	 "')	AS DM_4,	\n";
					sql += "	DECODE(TO_CHAR(SYSDATE,'YYYYMM'),SUBSTR('"	+	version	+	"',1,6),'"	+	gdReq.getHeader("PROD_5"	).getValue(i) +	 "',	\n";
					sql += "	'0')	AS DM_5,	\n";				
//					sql += "		'"	+			gdReq.getHeader("PROD_1"	).getValue(i) +	 						"'	AS DM_1,							\n";
//					sql += "		'"	+			gdReq.getHeader("PROD_2"	).getValue(i) +	 						"'	AS DM_2,							\n";
//					sql += "		'"	+			gdReq.getHeader("PROD_3"	).getValue(i) +	 						"'	AS DM_3,							\n";
//					sql += "		'"	+			gdReq.getHeader("PROD_4"	).getValue(i) +	 						"'	AS DM_4,							\n";
//					sql += "		'"	+			gdReq.getHeader("PROD_5"	).getValue(i) +	 						"'	AS DM_5,							\n";
					sql += "		'"  + 		 	user_id									  + 						"' 	AS MADE_BY							\n";
					sql +="		FROM   DUAL 																		   											\n";	
					//--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") BP1 														   	\n";
			sql += "ON (BP.VERSION    = BP1.VERSION    						   		\n";
			sql += "AND BP.ITEM_ID    = BP1.ITEM_ID         						\n";
			sql += "AND BP.PLANT_ID   = BP1.PLANT_ID )        						\n";
			sql += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql += "     BP.DM      = BP1.DM,   					   				\n";
			sql += "     BP.DM_1    = BP1.DM_1,   					   				\n";
			sql += "     BP.DM_2    = BP1.DM_2,   					   				\n";
			sql += "     BP.DM_3    = BP1.DM_3,   					   				\n";
			sql += "     BP.DM_4    = BP1.DM_4,   					   				\n";
			sql += "     BP.DM_5    = BP1.DM_5,   					   				\n";
			sql += "     BP.MADE_DTTM  = SYSDATE,   					   			\n";
			sql += "     BP.MADE_BY = BP1.MADE_BY   					   			\n";
			sql += "WHEN NOT MATCHED THEN                                           \n";
			sql += "	INSERT                                                      \n";
			sql += "	(                                                           \n";
			sql += "	 BP.VERSION, BP.ITEM_ID, BP.PLANT_ID, BP.DM, BP.DM_1, BP.DM_2, BP.DM_3, BP.DM_4, BP.DM_5, MADE_DTTM, MADE_BY  	\n";
			sql += "	) VALUES                                                                             					\n";
			sql += "	(                                                                                    					\n";
			sql += "	BP1.VERSION, BP1.ITEM_ID, '1300', BP1.DM, BP1.DM_1, BP1.DM_2, BP1.DM_3, BP1.DM_4, BP1.DM_5, SYSDATE, BP1.MADE_BY	\n";
			sql += "	        )                                                                                    	\n";
						
			sql2   = "MERGE INTO BASE_PROD_PLAN BP	 /*+ bypass_ujvc*/       	 \n";
			sql2  += "USING(							                     		  \n";
			
			boolean flag2 = false;
			
			// 데이터 셋팅
			for (int j = 0; j < rowCount; j++) {

				if( flag2){
						sql2  += "union all \n";
	
					}
					flag2 = true;
					
					//파라미터를 변수에 적용!!					
					
			
					//---------------------------------------------------------------------------------------------	----------------------
					sql2 += "	SELECT	'" +	version	+"'			VERSION,  																					\n"; 
					sql2 += "			'1300'						PLANT_ID,																					\n";
					sql2 += "		'"	+			gdReq.getHeader("ITEM_ID"	).getValue(j) +	 						"'	AS ITEM_ID,							\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_0"	).getValue(j) +	 						"'	AS DM,								\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_1"	).getValue(j) +	 						"'	AS DM_1,							\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_2"	).getValue(j) +	 						"'	AS DM_2,							\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_3"	).getValue(j) +	 						"'	AS DM_3,							\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_4"	).getValue(j) +	 						"'	AS DM_4,							\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_5"	).getValue(j) +	 						"'	AS DM_5,							\n";
					sql2 += "		'"  + 		 	user_id									  + 						"' 	AS MADE_BY							\n";
					sql2 +="		FROM   DUAL 																		   											\n";	
					//--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql2 += ") BP1 														   	\n";
			sql2 += "ON (BP.VERSION    = BP1.VERSION    						   		\n";
			sql2 += "AND BP.ITEM_ID    = BP1.ITEM_ID         						\n";
			sql2 += "AND BP.PLANT_ID   = BP1.PLANT_ID )        						\n";
			sql2 += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql2 += "     BP.DM      = BP1.DM,   					   				\n";
			sql2 += "     BP.DM_1    = BP1.DM_1,   					   				\n";
			sql2 += "     BP.DM_2    = BP1.DM_2,   					   				\n";
			sql2 += "     BP.DM_3    = BP1.DM_3,   					   				\n";
			sql2 += "     BP.DM_4    = BP1.DM_4,   					   				\n";
			sql2 += "     BP.DM_5    = BP1.DM_5,   					   				\n";
			sql2 += "     BP.MADE_DTTM  = SYSDATE,   					   			\n";
			sql2 += "     BP.MADE_BY = BP1.MADE_BY   					   			\n";
			sql2 += "WHEN NOT MATCHED THEN                                           \n";
			sql2 += "	INSERT                                                      \n";
			sql2 += "	(                                                           \n";
			sql2 += "	 BP.VERSION, BP.ITEM_ID, BP.PLANT_ID, BP.DM, BP.DM_1, BP.DM_2, BP.DM_3, BP.DM_4, BP.DM_5, MADE_DTTM, MADE_BY  	\n";
			sql2 += "	) VALUES                                                                             					\n";
			sql2 += "	(                                                                                    					\n";
			sql2 += "	BP1.VERSION, BP1.ITEM_ID, '1300', BP1.DM, BP1.DM_1, BP1.DM_2, BP1.DM_3, BP1.DM_4, BP1.DM_5, SYSDATE, BP1.MADE_BY	\n";
			sql2 += "	        )                                                                                    	\n";
				
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
			
		
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			rs = databaseUtility.executeQuery(stmt, sql2);
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
	
	
	public GridData doSave2(GridData gdReq) throws Exception {

		System.out.println("doSave2() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {



			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save2");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
								
			String user_id		= gdReq.getParam("user_id");
			String version		= gdReq.getParam("version");
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!	
			
			sql   = "MERGE INTO BASE_STOCK_PLAN BS	 /*+ bypass_ujvc*/       	 \n";
			sql  += "USING(							                     		 \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//파라미터를 변수에 적용!!					
					
			
					//---------------------------------------------------------------------------------------------	----------------------
					sql += "	SELECT	TO_CHAR(SYSDATE,'YYYYMMDD')	VERSION,  																					\n"; 
					sql += "			'1300'						PLANT_ID,																					\n";
					sql += "		'"	+			gdReq.getHeader("ITEM_ID"	).getValue(i) +	 						"'	AS ITEM_ID,							\n";
					sql += "		'"	+			gdReq.getHeader("PROD_0"	).getValue(i) +	 						"'	AS M,								\n";					
					sql += "		'"	+			gdReq.getHeader("PROD_1"	).getValue(i) +	 						"'	AS M_1,								\n";
					sql += "		'"	+			gdReq.getHeader("PROD_2"	).getValue(i) +	 						"'	AS M_2,								\n";					
					sql += "		'"	+			gdReq.getHeader("PROD_3"	).getValue(i) +	 						"'	AS M_3,								\n";
					sql += "		'"	+			gdReq.getHeader("PROD_4"	).getValue(i) +	 						"'	AS M_4,								\n";					
					sql += "		'"	+			gdReq.getHeader("PROD_5"	).getValue(i) +	 						"'	AS M_5,								\n";					
					sql += "		'"	+			gdReq.getHeader("MINMPSQTY"	).getValue(i) +	 						"'	AS MINMPSQTY,						\n";
					sql += "		'"	+			gdReq.getHeader("BASE_STOCK").getValue(i) +	 						"'	AS BASE_STOCK,						\n";
					sql += "		'"	+			gdReq.getHeader("IPGO_QTY"	).getValue(i) +	 						"'	AS IPGO_QTY,						\n";
					sql += "		'"	+			gdReq.getHeader("IPGO_DATE"	).getValue(i) +	 						"'	AS IPGO_DATE,						\n";
					sql += "		'"	+			gdReq.getHeader("READ_TIME"	).getValue(i) +	 						"'	AS READTIME,						\n";
					sql += "		'"	+			gdReq.getHeader("NTGEW"	).getValue(i) +	 							"'	AS NTGEW,							\n";
					sql += "		'"	+			gdReq.getHeader("TEXT"	).getValue(i) 	+	 						"'	AS TEXT,							\n";
					sql += "		'"  + 		 	user_id									  + 						"' 	AS MADE_BY							\n";
					sql +="		FROM   DUAL 																		   											\n";	
					//--------------------------------------------------------------------------------------------------------------------
					
				} 
			sql += ") BS1 														   	\n";
			sql += "ON (BS.VERSION    = BS1.VERSION    						   		\n";
			sql += "AND BS.ITEM_ID    = BS1.ITEM_ID         						\n";
			sql += "AND BS.PLANT_ID   = BS1.PLANT_ID )        						\n";
			sql += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql += "     BS.M   	= BS1.M,   					   					\n";
			sql += "     BS.M_1   	= BS1.M_1,   					   				\n";
			sql += "     BS.M_2   	= BS1.M_2,   					   				\n";
			sql += "     BS.M_3   	= BS1.M_3,   					   				\n";
			sql += "     BS.M_4   	= BS1.M_4,   					   				\n";
			sql += "     BS.M_5   	= BS1.M_5,   					   				\n";
			sql += "     BS.MINMPSQTY   = BS1.MINMPSQTY,   					   		\n";
			sql += "     BS.BASE_STOCK  = BS1.BASE_STOCK,   					   	\n";
			sql += "     BS.IPGO_QTY    = BS1.IPGO_QTY,   					   		\n";
			sql += "     BS.IPGO_DATE   = BS1.IPGO_DATE,   					   		\n";
			sql += "     BS.READTIME    = BS1.READTIME,   					   		\n";
			sql += "     BS.NTGEW    	= BS1.NTGEW,   					   			\n";
			sql += "     BS.TEXT    	= BS1.TEXT,   					   			\n";
			sql += "     BS.MADE_DTTM   = SYSDATE,   					   			\n";
			sql += "     BS.MADE_BY 	= BS1.MADE_BY   					   		\n";
			sql += "WHEN NOT MATCHED THEN                                           \n";
			sql += "	INSERT                                                      \n";
			sql += "	(                                                           \n";
			sql += "	 BS.VERSION, BS.ITEM_ID, BS.PLANT_ID, BS.M, BS.M_1, BS.M_2, BS.M_3, BS.M_4, BS.M_5, BS.MINMPSQTY, BS.BASE_STOCK, BS.IPGO_QTY, BS.IPGO_DATE, BS.TEXT, BS.MADE_DTTM, BS.MADE_BY, BS.READTIME, BS.NTGEW  	\n";
			sql += "	) VALUES                                                                             														\n";
			sql += "	(                                                                                    														\n";
			sql += "	BS1.VERSION, BS1.ITEM_ID, '1300', BS1.M, BS1.M_1, BS1.M_2, BS1.M_3, BS1.M_4, BS1.M_5, BS1.MINMPSQTY, BS1.BASE_STOCK, BS1.IPGO_QTY, BS1.IPGO_DATE, BS1.TEXT, SYSDATE, BS1.MADE_BY, BS1.READTIME, BS1.NTGEW		\n";
			sql += "	 )                                                                                    														\n";
			
			sql2   = "MERGE INTO BASE_STOCK_PLAN BS	 /*+ bypass_ujvc*/       	 \n";
			sql2  += "USING(							                     		 \n";
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			boolean flag2 = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag2){
						sql2  += "union all \n";
	
					}
					flag2 = true;
					
					//파라미터를 변수에 적용!!					
					
			
					//---------------------------------------------------------------------------------------------	----------------------
					sql2 += "	SELECT	'" +	version	+"'			VERSION,  																					\n"; 
					sql2 += "			'1300'						PLANT_ID,																					\n";
					sql2 += "		'"	+			gdReq.getHeader("ITEM_ID"	).getValue(i) +	 						"'	AS ITEM_ID,							\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_0"	).getValue(i) +	 						"'	AS M,								\n";					
					sql2 += "		'"	+			gdReq.getHeader("PROD_1"	).getValue(i) +	 						"'	AS M_1,								\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_2"	).getValue(i) +	 						"'	AS M_2,								\n";					
					sql2 += "		'"	+			gdReq.getHeader("PROD_3"	).getValue(i) +	 						"'	AS M_3,								\n";
					sql2 += "		'"	+			gdReq.getHeader("PROD_4"	).getValue(i) +	 						"'	AS M_4,								\n";					
					sql2 += "		'"	+			gdReq.getHeader("PROD_5"	).getValue(i) +	 						"'	AS M_5,								\n";	
					sql2 += "		'"	+			gdReq.getHeader("MINMPSQTY"	).getValue(i) +	 						"'	AS MINMPSQTY,						\n";
					sql2 += "		'"	+			gdReq.getHeader("BASE_STOCK").getValue(i) +	 						"'	AS BASE_STOCK,						\n";
					sql2 += "		'"	+			gdReq.getHeader("IPGO_QTY"	).getValue(i) +	 						"'	AS IPGO_QTY,						\n";
					sql2 += "		'"	+			gdReq.getHeader("IPGO_DATE"	).getValue(i) +	 						"'	AS IPGO_DATE,						\n";
					sql2 += "		'"	+			gdReq.getHeader("READ_TIME"	).getValue(i) +	 						"'	AS READTIME,						\n";
					sql2 += "		'"	+			gdReq.getHeader("NTGEW"	).getValue(i) +	 							"'	AS NTGEW,							\n";
					sql2 += "		'"	+			gdReq.getHeader("TEXT"	).getValue(i) 	+	 						"'	AS TEXT,							\n";
					sql2 += "		'"  + 		 	user_id									  + 						"' 	AS MADE_BY							\n";
					sql2 +="		FROM   DUAL 																		   											\n";	
					//--------------------------------------------------------------------------------------------------------------------
					
				} 
			sql2 += ") BS1 														   	\n";
			sql2 += "ON (BS.VERSION    = BS1.VERSION    						   	\n";
			sql2 += "AND BS.ITEM_ID    = BS1.ITEM_ID         						\n";
			sql2 += "AND BS.PLANT_ID   = BS1.PLANT_ID )        						\n";
			sql2 += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql2 += "     BS.M   	= BS1.M,   					   					\n";
			sql2 += "     BS.M_1   	= BS1.M_1,   					   				\n";
			sql2 += "     BS.M_2   	= BS1.M_2,   					   				\n";
			sql2 += "     BS.M_3   	= BS1.M_3,   					   				\n";
			sql2 += "     BS.M_4   	= BS1.M_4,   					   				\n";
			sql2 += "     BS.M_5   	= BS1.M_5,   					   				\n";
			sql2 += "     BS.MINMPSQTY   = BS1.MINMPSQTY,   					   	\n";
			sql2 += "     BS.BASE_STOCK  = BS1.BASE_STOCK,   					   	\n";
			sql2 += "     BS.IPGO_QTY    = BS1.IPGO_QTY,   					   		\n";
			sql2 += "     BS.IPGO_DATE   = BS1.IPGO_DATE,   					   	\n";
			sql2 += "     BS.READTIME    = BS1.READTIME,   					   		\n";
			sql2 += "     BS.NTGEW    	= BS1.NTGEW,   					   		\n";
			sql2 += "     BS.TEXT    	= BS1.TEXT,   					   			\n";
			sql2 += "     BS.MADE_DTTM   = SYSDATE,   					   			\n";
			sql2 += "     BS.MADE_BY 	= BS1.MADE_BY   					   		\n";
			sql2 += "WHEN NOT MATCHED THEN                                           \n";
			sql2 += "	INSERT                                                      \n";
			sql2 += "	(                                                           \n";
			sql2 += "	 BS.VERSION, BS.ITEM_ID, BS.PLANT_ID, BS.M, BS.M_1, BS.M_2, BS.M_3, BS.M_4, BS.M_5, BS.MINMPSQTY, BS.BASE_STOCK, BS.IPGO_QTY, BS.IPGO_DATE, BS.TEXT, BS.MADE_DTTM, BS.MADE_BY, BS.READTIME, BS.NTGEW  	\n";
			sql2 += "	) VALUES                                                                             														\n";
			sql2 += "	(                                                                                    														\n";
			sql2 += "	BS1.VERSION, BS1.ITEM_ID, '1300', BS1.M, BS1.M_1, BS1.M_2, BS1.M_3, BS1.M_4, BS1.M_5, BS1.MINMPSQTY, BS1.BASE_STOCK, BS1.IPGO_QTY, BS1.IPGO_DATE, BS1.TEXT, SYSDATE, BS1.MADE_BY, BS1.READTIME, BS1.NTGEW		\n";
			sql2 += "	 )                                                                                    														\n";
						
			
			
			System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
			
			boolean flag3 = false;
			
			sql3  ="MERGE INTO BASE_PROD_PLAN	BP 																			\n";
			sql3 +="USING( 																									\n";
			sql3 +="SELECT	TO_CHAR(SYSDATE,'YYYYMMDD') AS VERSION, S1.PLANT_ID, S1.ITEM_ID, S1.DM, S1.DM_1, 				\n";
			sql3 +="		 S1.DM_2, S1.DM_3, S1.DM_4, S1.DM_5,SYSDATE AS MADE_DTTM, '"+user_id+"' AS MADE_BY 				\n";
			sql3 +="FROM	BASE_PROD_PLAN S1 																				\n";
			sql3 +="WHERE	S1.VERSION = '" +	version	+"'																			\n";
			sql3 +="AND		S1.ITEM_ID IN ( SELECT ITEM_ID FROM BASE_PROD_PLAN WHERE VERSION = ( SELECT	VERSION				\n";
			sql3 +="		FROM (	SELECT VERSION,RANK() OVER (ORDER BY VERSION DESC) IDX	FROM(							\n";
			sql3 +="		SELECT DISTINCT VERSION  FROM BASE_PROD_PLAN))WHERE IDX=2)										\n";
			sql3 +="MINUS																									\n";
			sql3 +="SELECT	ITEM_ID FROM BASE_PROD_PLAN WHERE VERSION = ( SELECT VERSION FROM (								\n";
			sql3 +="SELECT VERSION,RANK() OVER (ORDER BY VERSION DESC) IDX FROM (											\n";
			sql3 +="SELECT DISTINCT VERSION  FROM BASE_PROD_PLAN))WHERE IDX=1))												\n";
			sql3 += ") BP1												   			\n";		
			sql3 += "ON (BP.VERSION    = BP1.VERSION    						   	\n";
			sql3 += "AND BP.ITEM_ID    = BP1.ITEM_ID         						\n";
			sql3 += "AND BP.PLANT_ID   = BP1.PLANT_ID )        						\n";
			sql3 += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql3 += "     BP.DM      = BP1.DM,   					   				\n";
			sql3 += "     BP.DM_1    = BP1.DM_1,   					   				\n";
			sql3 += "     BP.DM_2    = BP1.DM_2,   					   				\n";
			sql3 += "     BP.DM_3    = BP1.DM_3,   					   				\n";
			sql3 += "     BP.DM_4    = BP1.DM_4,   					   				\n";
			sql3 += "     BP.DM_5    = BP1.DM_5,   					   				\n";
			sql3 += "     BP.MADE_DTTM  = SYSDATE,   					   			\n";
			sql3 += "     BP.MADE_BY = BP1.MADE_BY   					   			\n";
			sql3 += "WHEN NOT MATCHED THEN                                           \n";
			sql3 += "	INSERT                                                      \n";
			sql3 += "	(                                                           \n";
			sql3 += "	 BP.VERSION, BP.ITEM_ID, BP.PLANT_ID, BP.DM, BP.DM_1, BP.DM_2, BP.DM_3, BP.DM_4, BP.DM_5, MADE_DTTM, MADE_BY  	\n";
			sql3 += "	) VALUES                                                                             					\n";
			sql3 += "	(                                                                                    					\n";
			sql3 += "	BP1.VERSION, BP1.ITEM_ID, '1300', BP1.DM, BP1.DM_1, BP1.DM_2, BP1.DM_3, BP1.DM_4, BP1.DM_5, SYSDATE, BP1.MADE_BY	\n";
			sql3 += "	        )               \n";
			
			System.out.println("-----------------------------------------------QUERY3-----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY3-----------------------------------------------");
			
			boolean flag4 = false;
			
			sql4  ="MERGE INTO BASE_STOCK_PLAN	BS 																			\n";
			sql4 +="USING( 																									\n";
			sql4 +="SELECT	TO_CHAR(SYSDATE,'YYYYMMDD') AS VERSION, S1.PLANT_ID, S1.ITEM_ID, S1.STOCK,S1.M, S1.M_1, 		\n";
			sql4 +="		 S1.M_2, S1.M_3, S1.M_4, S1.M_5,SYSDATE AS MADE_DTTM, '"+user_id+"' AS MADE_BY, 				\n";
			sql4 +="		 S1.IPGO_QTY,S1.IPGO_DATE,S1.TEXT,S1.MINMPSQTY,S1.READTIME, S1.NTGEW, S1.BASE_STOCK				\n";
			sql4 +="FROM	BASE_STOCK_PLAN S1 																				\n";
			sql4 +="WHERE	S1.VERSION = '" +	version	+"'																	\n";
			sql4 +="AND		S1.ITEM_ID IN ( SELECT ITEM_ID FROM BASE_STOCK_PLAN WHERE VERSION = ( SELECT	VERSION			\n";
			sql4 +="		FROM (	SELECT VERSION,RANK() OVER (ORDER BY VERSION DESC) IDX	FROM(							\n";
			sql4 +="		SELECT DISTINCT VERSION  FROM BASE_STOCK_PLAN))WHERE IDX=2)										\n";
			sql4 +="MINUS																									\n";
			sql4 +="SELECT	ITEM_ID FROM BASE_STOCK_PLAN WHERE VERSION = ( SELECT VERSION FROM (							\n";
			sql4 +="SELECT VERSION,RANK() OVER (ORDER BY VERSION DESC) IDX FROM (											\n";
			sql4 +="SELECT DISTINCT VERSION  FROM BASE_STOCK_PLAN))WHERE IDX=1))											\n";
			sql4 += ") BS1												   			\n";
			sql4 += "ON (BS.VERSION    = BS1.VERSION    						   	\n";
			sql4 += "AND BS.ITEM_ID    = BS1.ITEM_ID         						\n";
			sql4 += "AND BS.PLANT_ID   = BS1.PLANT_ID )        						\n";
			sql4 += "WHEN MATCHED THEN UPDATE SET            					   	\n";
			sql4 += "     BS.M   	= BS1.M,   					   					\n";
			sql4 += "     BS.M_1   	= BS1.M_1,   					   				\n";
			sql4 += "     BS.M_2   	= BS1.M_2,   					   				\n";
			sql4 += "     BS.M_3   	= BS1.M_3,   					   				\n";
			sql4 += "     BS.M_4   	= BS1.M_4,   					   				\n";
			sql4 += "     BS.M_5   	= BS1.M_5,   					   				\n";
			sql4 += "     BS.MINMPSQTY   = BS1.MINMPSQTY,   					   	\n";
			sql4 += "     BS.NTGEW    	 = BS1.NTGEW,   					   		\n";
			sql4 += "     BS.IPGO_QTY    = BS1.IPGO_QTY,   					   		\n";
			sql4 += "     BS.BASE_STOCK  = BS1.BASE_STOCK,   					   	\n";
			sql4 += "     BS.IPGO_DATE   = BS1.IPGO_DATE,   					   	\n";
			sql4 += "     BS.READTIME    = BS1.READTIME,   					   		\n";
			sql4 += "     BS.TEXT    	= BS1.TEXT,   					   			\n";
			sql4 += "     BS.MADE_DTTM   = SYSDATE,   					   			\n";
			sql4 += "     BS.MADE_BY 	= BS1.MADE_BY   					   		\n";
			sql4 += "WHEN NOT MATCHED THEN                                           \n";
			sql4 += "	INSERT                                                      \n";
			sql4 += "	(                                                           \n";
			sql4 += "	 BS.VERSION, BS.ITEM_ID, BS.PLANT_ID, BS.M, BS.M_1, BS.M_2, BS.M_3, BS.M_4, BS.M_5, BS.MINMPSQTY, BS.BASE_STOCK, BS.IPGO_QTY, BS.IPGO_DATE, BS.TEXT, BS.MADE_DTTM, BS.MADE_BY, BS.READTIME, BS.NTGEW  	\n";
			sql4 += "	) VALUES                                                                             														\n";
			sql4 += "	(                                                                                    														\n";
			sql4 += "	BS1.VERSION, BS1.ITEM_ID, '1300', BS1.M, BS1.M_1, BS1.M_2, BS1.M_3, BS1.M_4, BS1.M_5, BS1.MINMPSQTY, BS1.BASE_STOCK, BS1.IPGO_QTY, BS1.IPGO_DATE, BS1.TEXT, SYSDATE, BS1.MADE_BY, BS1.READTIME, BS1.NTGEW		\n";
			sql4 += "	 )                                                                                    														\n";
						
			
			System.out.println("-----------------------------------------------QUERY4-----------------------------------------------");
			System.out.println(sql4);
			System.out.println("-----------------------------------------------QUERY4-----------------------------------------------");
			
		
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			rs = databaseUtility.executeQuery(stmt, sql2);
			rs = databaseUtility.executeQuery(stmt, sql3);
			rs = databaseUtility.executeQuery(stmt, sql4);
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
        }

        System.out.println("save2() end!!!");

		return gdRes;
	}	
	
	//계획 실행 SP 호출
	public GridData doTrans(GridData gdReq) throws Exception {
		
		System.out.println("doTrans() start!!!");
		GridData gdRes = new GridData(); // WiseGrid 객체생성
		
		

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성
		System.out.println("call SP_LTP_VERSION_CREATE() 실행!!!");
		String sql = "call SP_LTP_VERSION_CREATE('CRE_DATA',SYSDATE,1,1,'NA',SYSDATE)";
		boolean result = stmt.execute(sql);
		System.out.println("call SP_LTP_VERSION_CREATE() 종료!!! - 결과 : " + result);
		System.out.println("doTrans() end!!!");

		gdRes.addParam("mode", "trans");
		gdRes.setMessage("성공적으로 작업하였습니다.");
		gdRes.setStatus("true");
		
		
		return gdRes;		
	}
	
	
	public GridData doIf(GridData gdReq) throws Exception {

		System.out.println("doIf() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doIf");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("Row Count : " + rowCount);
			
			String version		= gdReq.getParam("version");
			String user_id		= gdReq.getParam("user_id");
			String sql;
			
			sql   = "MERGE INTO APS_PR_PLAN T1	 	/*+ bypass_ujvc*/       	 \n";
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
					sql += "	SELECT	"		+	gdReq.getHeader("ITEM_ID"		).getValue(i) +		"	AS ITEM_ID,					\n";
					sql += "				'"  + 	version								 		  + 	"' 	AS VERSION,					\n";
					sql += " 						'1300'													AS PLANT_ID,				\n"; 
					sql += " 						SYSDATE													AS MADE_DTTM,				\n";
					sql += "				'"  + 	user_id								 		  + 		"' 	AS MADE_BY,				\n";
					sql += " 				'"	+	gdReq.getHeader("MEINS"			).getValue(i) +		"'	AS PR_QTY_UOM,				\n"; 
					sql += " 				'"	+	gdReq.getHeader("IPGO_QTY"		).getValue(i) +		"'	AS PR_QTY,					\n"; 
					sql += " 	TO_CHAR(TO_DATE('"	+	gdReq.getHeader("IPGO_DATE"		).getValue(i) +	"'),'YYYYMMDD')	AS ENTR_DATE,	\n";
					sql += " 						'I'														AS IF_FLAG,					\n"; 
					sql += " 						'Y'														AS EDIT_FLAG				\n"; 
					sql += "	FROM   DUAL																								\n";
				} 	
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") T2 														\n";
			sql += "ON (T1.ITEM_ID    = T2.ITEM_ID    						   	\n";
			sql += "AND T1.VERSION    = T2.VERSION         						\n";
			sql += "AND T1.PLANT_ID   = T2.PLANT_ID )        					\n";
			sql += "WHEN MATCHED THEN UPDATE SET            					\n";
			sql += "     T1.MADE_BY      	= T2.MADE_BY,   					\n";
			sql += "     T1.MADE_DTTM      	= T2.MADE_DTTM,   					\n";
			sql += "     T1.PR_QTY_UOM      = T2.PR_QTY_UOM,   					\n";
			sql += "     T1.PR_QTY      	= T2.PR_QTY,   					   	\n";
			sql += "     T1.ENTR_DATE      	= T2.ENTR_DATE,   					\n";
			sql += "     T1.IF_FLAG      	= T2.IF_FLAG,   					\n";
			sql += "     T1.EDIT_FLAG      	= T2.EDIT_FLAG   					\n";
			sql += "WHEN NOT MATCHED THEN                                       \n";
			sql += "	INSERT                                                  \n";
			sql += "	(                                                       \n";
			sql += "	 T1.VERSION, T1.ITEM_ID, T1.PLANT_ID, T1.MADE_BY, T1.MADE_DTTM, T1.PR_QTY_UOM, T1.PR_QTY, T1.ENTR_DATE, T1.IF_FLAG, T1.EDIT_FLAG 	\n";
			sql += "	) VALUES                                                                             												\n";
			sql += "	(                                                                                    												\n";
			sql += "	T2.VERSION, T2.ITEM_ID, T2.PLANT_ID, T2.MADE_BY, T2.MADE_DTTM, T2.PR_QTY_UOM, T2.PR_QTY, T2.ENTR_DATE, T2.IF_FLAG, T2.EDIT_FLAG  	\n";
			sql += "	 )                                                                                    												\n";
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
	
}                                                                                                                  