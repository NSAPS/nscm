package com.wisegrid.admin;

import java.io.IOException;                                                                                                  
import java.io.PrintWriter;                                                                                                  
//import java.sql.SQLException;                                                                                                
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

public class ip_02090_hawastockSupportPlan_list_popup_calog extends HttpServlet {                                                             
    
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
			if (mode.equals("doIf")) //                                                                                    
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
			
//			String item_id 		= gdReq.getParam("item_id");
//			String trans_start  = gdReq.getParam("trans_start");
//			String version 		= gdReq.getParam("version");
//			String seq 			= gdReq.getParam("seq");
//			String check_day 	= gdReq.getParam("check_day");
//			String paramKey 	= "item_id!%!trans_start!%!version!%!seq!%!check_day";
//			String paramCode 	= item_id + "!%!" + trans_start + "!%!" + version + "!%!" + seq + "!%!" + check_day;                                                                                                           
								
	        	String paramKey		=	"";                                                                      
				String paramCode	=	"";
	        
	        
				String query_id   = "ip_02090_hawastockSupportPlan_list_popupcall3"; 
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			//ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(query_id2);			                                                                                                                 
			rowCount = qResult.size();          
			
			/*출고 사업장 리스트를 추출하여 콤보리스트 생성 */

			String query_id2 = "trans_dc_id_and_short_name_list"; 

			System.out.println("getSelQeury : " + query_id2);

			ArrayList<ArrayList<String>> locList = new CommonUtil().getSelQeury("", "", query_id2);

			int arrIdx = locList.size();

			String[] locIdList = new String[arrIdx];
			String[] locNameList = new String[arrIdx];

			System.out.println("출고 사업장 콤보리스트 생성");

			for ( int i = 0 ; i < arrIdx ; i++ ){

				locIdList[i]   = locList.get(i).get(0);   // 출고 사업장 ID 콤보리스트 생성
				locNameList[i] = locList.get(i).get(1); // 출고 사업장 이름 콤보리스트 생성

			}

			System.out.println("출고 사업장 컬럼에 콤보리스트 set");

			gdRes.getHeader("TGT_LOC").setComboValues(locNameList, locIdList );	
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}       
			
							

			
			
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {             
				
				gdRes.getHeader("SELECTED"			) .addValue("0", ""); 
				gdRes.getHeader("ITEM_ID"			) .addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("ITEM_NAME"			) .addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("BASE_STOCK"		) .addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("DC_ALLOC"			) .addValue(qResult.get(i).get(3),"");
			    gdRes.getHeader("DC_ALLOC_PLT"		) .addValue(qResult.get(i).get(4),"");
			    gdRes.getHeader("PAL_QTY"			) .addValue(qResult.get(i).get(5),""); 
			
				
			    gdRes.getHeader("SEQ"				) .addValue(qResult.get(i).get(6),"");
			    gdRes.getHeader("TGT_LOC"		 	). addSelectedHiddenValue(qResult.get(i).get(7));//출고사업장
			
				
			}                                                                                                                
				gdRes.addParam("mode", "search");		                                                                         
				gdRes.setMessage("");                                                                                            
				gdRes.setStatus("true");  
			
			                                                                                       
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                  
	
	
	

	//공급필요량 저장
	public GridData doSave(GridData gdReq) throws Exception {


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
					
									
			String user_id		= gdReq.getParam("user_id");
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!	
			
			sql   = "merge into HAWA_STOCK_SUUPORT_PLAN HP	           \n";
			sql  += "using (                                           \n";
			
			
			
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
						//sql2 += "union all \n";
						//sql3 += "union all \n";
					}
					flag = true;
					
					String tgt_loc = "";
					if(gdReq.getHeader("TGT_LOC").getSelectedIndex(i) > -1){							
						tgt_loc = gdReq.getHeader("TGT_LOC").getComboHiddenValues()[gdReq.getHeader("TGT_LOC").getSelectedIndex(i)];
					}
					
					//파라미터를 변수에 적용!!					
				 
						
					//-------------------------------------------------------------------------------------------------------------------
					sql += "			SELECT		TO_CHAR(SYSDATE, 'YYYYMMDD')								AS CNFM_DATE, 			\n"; 
					sql +="					   '" + gdReq.getHeader("ITEM_ID"		).getValue(i)   		+ "'   	  AS ITEM_ID,   	\n";					
				
					sql +="					   '" + gdReq.getHeader("DC_ALLOC"		).getValue(i)   		+ "'   	  AS DC_ALLOC,      \n";
					sql +="					   '" + gdReq.getHeader("DC_ALLOC_PLT"	).getValue(i)   		+ "'   	  AS DC_ALLOC_PLT,  \n";
					sql +="					   '" + gdReq.getHeader("SEQ"			).getValue(i)   		+ "'   	  AS SEQ, 			\n";
					
					//sql +="					   '" + gdReq.getHeader("RE_ORDER_FLAG"	).getValue(i)   		+ "'   	  AS RE_ORDER_FLAG, \n";
					sql +="					   '8907'   	 														 AS DC_ID, 			\n";
					//+"					   '" + gdReq.getHeader("DC_ALLOC").getValue(i)  		+ "'   	  AS DC_ALLOC,		" 
					sql +="					   '" + user_id  									    + "' 	  AS MADE_BY			\n";
					sql +="				from   DUAL 																		   		\n";						
	               //--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1-----------------------------	-----------------------------------------------------
			sql += ") HP1 														   		\n";
			sql += "ON (HP.CNFM_DATE    	= HP1.CNFM_DATE    						   	\n";
			sql += "AND HP.DC_ID     		= HP1.DC_ID          				 	  	\n";
			sql += "AND HP.ITEM_ID     		= HP1.ITEM_ID	          				   	\n";
			sql += "AND HP.SEQ     			= HP1.SEQ)          				   		\n";
			sql += "when matched then update set            					   		\n";
			//sql += "     HP.DC_ID	      	= '8907',      					  		 	\n";
			sql += "     HP.DC_ALLOC      	= HP1.DC_ALLOC,      					   	\n";
			sql += "     HP.DC_ALLOC_PLT  	= HP1.DC_ALLOC_PLT,  					   	\n";
			
			sql += "     HP.MADE_DTTM     	= SYSDATE	      					   		\n";
			
			
			sql += "when not matched then insert(HP.CNFM_DATE,  HP.ITEM_ID,  HP.DC_ID, HP.DC_ALLOC, HP.DC_ALLOC_PLT ,  HP.MADE_TYPE, HP.MADE_DTTM, HP.MADE_BY, HP.SEQ, HP.ERP_FLAG) \n";
			sql += "values                      (HP1.CNFM_DATE, HP1.ITEM_ID, '8907', HP1.DC_ALLOC, HP1.DC_ALLOC_PLT,   'AD',   SYSDATE,    HP1.MADE_BY, HP1.SEQ, '') \n";
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

			

			String user_id 		= gdReq.getParam("user_id");
			String trans_date	= gdReq.getParam("trans_date");
			String plan_type	= gdReq.getParam("plan_type");
			String truck_seq	= gdReq.getParam("truck_seq");
			String sql ;
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql   = "merge into TRANS_PLAN T1	          	   				\n";
			sql  += "using (                                         	    \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
			
				
				
				 
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					String tgt_loc = "";
					if(gdReq.getHeader("TGT_LOC").getSelectedIndex(i) > -1){							
						tgt_loc = gdReq.getHeader("TGT_LOC").getComboHiddenValues()[gdReq.getHeader("TGT_LOC").getSelectedIndex(i)];
					}
					
					//파라미터를 변수에 적용!!  
					sql  	+= "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					sql 	+= "					'20000000.01.01'										AS VERSION, 			\n";
					sql 	+= "				'" + gdReq.getHeader("SEQ").getValue(i) 			+ "'	AS SEQ, 				\n";
					sql 	+= "				'" + plan_type   									+ "'   	AS PLAN_TYPE,	      	\n";
					sql 	+= "				'" + trans_date   									+ "'   	AS TRANS_DATE,	      	\n";
					sql  	+= "				'" + tgt_loc										+ "'	AS TGT_LOC, 			\n";
					//sql  	+= "				'7500'	AS TGT_LOC, 			\n";
					sql 	+= "				'8907'														AS SRC_LOC, 			\n";
					sql 	+= "				'" + truck_seq   									+ "'   	AS TRUCK_SEQ,	      	\n";
					sql  	+= "				'" + gdReq.getHeader("ITEM_NAME").getValue(i) 		+ "'	AS DESCRIPTION, 		\n";					
					sql 	+= "				'" + gdReq.getHeader("DC_ALLOC"		).getValue(i)   + "'   	AS BASE_STK_QTY,      	\n";
					sql 	+= "				'" + gdReq.getHeader("DC_ALLOC_PLT"	).getValue(i)   + "'   	AS BASE_STK_PLT,      	\n";				
					sql +="					    '" + user_id  									    + "' 	AS MADE_BY				\n";
					
					sql		+= "	FROM	DUAL			                                                  						\n";
																					   		
		               //--------------------------------------------------------------------------------------------------------------------
					} 
							
				//-----------------------------Merge Into 1----------------------------------------------------------------------------------		
					
		
			
			sql += "			)			T2                                                                                      \n";
			sql += "ON (T1.ITEM_ID    		= T2.ITEM_ID    						   												\n";
			sql += "AND		T1.VERSION		= T2.VERSION         				  													\n";
			sql += "AND		T1.SEQ			= T2.SEQ			          				   											\n";
			sql += "AND		T1.PLAN_TYPE	= T2.PLAN_TYPE		          				   											\n";
			sql += "AND		T1.TRANS_DATE	= T2.TRANS_DATE		          				   											\n";
			sql += "AND		T1.TGT_LOC		= T2.TGT_LOC		          				   											\n";
			sql += "AND		T1.SRC_LOC		= T2.SRC_LOC		          				   											\n";
			sql += "AND		T1.TRUCK_SEQ	= T2.TRUCK_SEQ)		          				   											\n";
			sql += "when matched then update set            					  												 	\n";			
			sql += "     T1.BASE_STK_QTY    		= T2.BASE_STK_QTY,     					 										\n";
			sql += "     T1.BASE_STK_PLT    		= T2.BASE_STK_PLT,     					 										\n";
			sql += "     T1.DESCRIPTION    			= T2.DESCRIPTION,     					 										\n";
			sql += "     T1.ADD_STK_QTY    			= 0,     					 													\n";
			sql += "     T1.ADD_STK_PLT    			= 0,     					 													\n";
			sql += "     T1.PROD_QTY    			= 0,     					 													\n";
			sql += "     T1.PROD_PLT    			= 0,     					 													\n";
			sql += "     T1.MOD_FLAG    			= 'AD',     					 												\n";
			sql += "     T1.MOD_QTY    				= 0,     					 													\n";
			sql += "     T1.MADE_TYPE    			= 'AD',     					 												\n";
			sql += "     T1.MADE_BY   				= T2.MADE_BY,   					 											\n";
			sql += "     T1.MADE_DTTM  				= SYSDATE  					  													\n";	
			sql += "when not matched then insert(T1.VERSION, T1.SEQ, T1.PLAN_TYPE, T1.TRANS_DATE, T1.TGT_LOC, T1.SRC_LOC, T1.TRUCK_SEQ, T1.ITEM_ID, T1.DESCRIPTION, T1.BASE_STK_QTY, T1.BASE_STK_PLT, T1.ADD_STK_QTY, T1.ADD_STK_PLT, T1.PROD_QTY, T1.PROD_PLT , T1.MOD_FLAG, T1.MOD_QTY, T1.MADE_TYPE, T1.MADE_DTTM, T1.MADE_BY)\n";
			sql += "values                      ('20000000.01.01',T2.SEQ, T2.PLAN_TYPE, T2.TRANS_DATE, T2.TGT_LOC, T2.SRC_LOC, T2.TRUCK_SEQ, T2.ITEM_ID, T2.DESCRIPTION, T2.BASE_STK_QTY, T2.BASE_STK_PLT,'0','0','0','0','','0','AD',SYSDATE,T2.MADE_BY )\n";
	        

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