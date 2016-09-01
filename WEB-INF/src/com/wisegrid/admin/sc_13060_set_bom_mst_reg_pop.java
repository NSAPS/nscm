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
public class sc_13060_set_bom_mst_reg_pop extends HttpServlet {                                                             
                                                                                                                             
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
                                                                                                                             
			String query_id   = "sc_13060_get_set_bom_mst_reg_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                

			String query_id2;	
			ArrayList<ArrayList<String>> cdList; 
			int arrIdx;
			String[] cd;
			String[] cdName;
				
			/* BASE_UOM 콤보 리스트를 추출하여 콤보리스트 생성 */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "UNIT", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("BASE_UOM 콤보 리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("BASE_UOM 컬럼에 콤보리스트 set");
			gdRes.getHeader("BASE_UOM").setComboValues(cdName, cd );			

						
			
			/* CUST_CODE 콤보 리스트를 추출하여 콤보리스트 생성 */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "SET_ROH_CUST", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("CUST_CODE 콤보 리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("CUST_CODE 컬럼에 콤보리스트 set");
			gdRes.getHeader("CUST_CODE").setComboValues(cdName, cd );	
			
			
			for (int i = 0; i < rowCount; i++) {                                                                             

				
				gdRes.getHeader("CRUD"			).addValue( "", "");
				gdRes.getHeader("ITEM_ID" 		).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("SEQ"		 	).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("SEQ_GUBN" 		).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("BASE_UOM" 		).addSelectedHiddenValue(qResult.get(i).get(3));//MULTI_FLAG
				//gdRes.getHeader("BASE_UOM" 		).addValue(qResult.get(i).get(3  ),"");
				gdRes.getHeader("UNIT_COST" 	).addValue(qResult.get(i).get(4  ),"");
				gdRes.getHeader("REQ_QTY" 		).addValue(qResult.get(i).get(5  ),"");
				gdRes.getHeader("MIN_LOT_SIZE" 	).addValue(qResult.get(i).get(6  ),"");
				gdRes.getHeader("LEAD_TIME" 	).addValue(qResult.get(i).get(7  ),"");
				gdRes.getHeader("CUST_CODE" 	).addSelectedHiddenValue(qResult.get(i).get(8));//MULTI_FLAG
				gdRes.getHeader("CUST_NAME" 	).addSelectedHiddenValue(qResult.get(i).get(9));//MULTI_FLAG
				gdRes.getHeader("SAFETY_STOCK" 	).addValue(qResult.get(i).get(10 ),"");
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        


	/* WD 1 저장 */
	public GridData doReg(GridData gdReq) throws Exception {

//		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doReg");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("getParam");
			
			

			String user_id		= gdReq.getParam("user_id");			
			
					
			//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!	
			sql   = "merge into SET_BOM SM				           \n";
			sql  += "using (                                           \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
					}
					flag = true;

					String BASE_UOM = "";
					if(gdReq.getHeader("BASE_UOM").getSelectedIndex(i) > -1){							
						BASE_UOM = gdReq.getHeader("BASE_UOM").getComboHiddenValues()[gdReq.getHeader("BASE_UOM").getSelectedIndex(i)];
					}					
					
					String CUST_CODE = "";
					if(gdReq.getHeader("CUST_CODE").getSelectedIndex(i) > -1){							
						CUST_CODE = gdReq.getHeader("CUST_CODE").getComboHiddenValues()[gdReq.getHeader("CUST_CODE").getSelectedIndex(i)];
					}					

					
					
					//-------------------------------------------------------------------------------------------------------------------
					//파라미터를 변수에 적용!!  
					sql += "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					sql += "				'" + gdReq.getHeader("SEQ").getValue(i)				+ "'	AS SEQ,	    			\n";
					sql += "				'" + BASE_UOM										+ "'	AS NEW_BASE_UOM,                  \n";
					sql += "				'" + gdReq.getHeader("UNIT_COST").getValue(i)		+ "'	AS NEW_UNIT_COST,	    	\n";
					sql += "				'" + gdReq.getHeader("REQ_QTY").getValue(i)			+ "'	AS NEW_REQ_QTY,	    		\n";
					sql += "				'" + gdReq.getHeader("MIN_LOT_SIZE").getValue(i)	+ "'	AS NEW_MIN_LOT_SIZE,	    \n";
					sql += "				'" + gdReq.getHeader("LEAD_TIME").getValue(i)		+ "'	AS NEW_LEAD_TIME,	    	\n";
					sql += "				'" + CUST_CODE										+ "'	AS NEW_CUST_CODE,           \n";
					sql += "				'" + gdReq.getHeader("SAFETY_STOCK").getValue(i)	+ "'	AS NEW_SAFETY_STOCK,	    \n";
					sql += "				'" + user_id										+ "'	AS NEW_MADE_BY		    \n";
					sql += "	FROM		DUAL			                                                  					\n";
				} 
									
		//	}//for문 끝.
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") SM1 														   	\n";
			sql += "ON (SM.ITEM_ID		= SM1.ITEM_ID    						   	\n";
			sql += "AND SM.SEQ			= SM1.SEQ	        )						\n";
			sql += "when matched then update set            					   	\n";
			sql += "	SM.BASE_UOM		= SM1.NEW_BASE_UOM,			SM.UNIT_COST	= SM1.NEW_UNIT_COST,			       		\n";
			sql += "	SM.REQ_QTY		= SM1.NEW_REQ_QTY,			SM.MIN_LOT_SIZE	= SM1.NEW_MIN_LOT_SIZE,			        \n";
			sql += "	SM.LEAD_TIME	= SM1.NEW_LEAD_TIME,		SM.CUST_CODE	= SM1.NEW_CUST_CODE,	                \n";
			sql += "	SM.SAFETY_STOCK	= SM1.NEW_SAFETY_STOCK,		SM.MADE_BY		= SM1.NEW_MADE_BY		\n";
			////////////////////
			sql += "when not matched then insert" +
				   "(ITEM_ID, SEQ, BASE_UOM, UNIT_COST, REQ_QTY, MIN_LOT_SIZE, LEAD_TIME, CUST_CODE, SAFETY_STOCK, MADE_TYPE, MADE_DTTM, MADE_BY) \n";   //MAN_TO, WOMEN_TO, MAN_COST, WOMEN_COST, 
			sql += "values                      " +
				   "(SM1.ITEM_ID, SM1.SEQ, SM1.NEW_BASE_UOM, SM1.NEW_UNIT_COST, SM1.NEW_REQ_QTY, SM1.NEW_MIN_LOT_SIZE, SM1.NEW_LEAD_TIME,  " +
				   "  SM1.NEW_CUST_CODE, SM1.NEW_SAFETY_STOCK, 'AD', SYSDATE, '"+ user_id +"') \n";  // SM1.NEW_MAN_TO, SM1.NEW_WOMEN_TO," +" SM1.NEW_MAN_COST, SM1.NEW_WOMEN_COST, 
			
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
			gdRes.addParam("mode", "doReg");
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
