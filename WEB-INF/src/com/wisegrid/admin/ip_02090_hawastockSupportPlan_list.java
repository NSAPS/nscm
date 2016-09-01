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

public class ip_02090_hawastockSupportPlan_list extends HttpServlet {                                                             
    
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
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			String dc_id		=	gdReq.getParam("dc_id"); 
			String sales_cat_02	=	gdReq.getParam("sales_cat_02"); 
			String scm_charge	=	gdReq.getParam("scm_charge");
	                                                                                                                 
			String paramKey		=	"item_id!%!dc_id!%!sales_cat_02!%!scm_charge";                                                                      
			String paramCode	=	item_id+"!%!"+dc_id+"!%!"+sales_cat_02+"!%!"+scm_charge; 
			
			
			//System.out.println("Test :: sales_cat_02 = " + sales_cat_02);
			

			//System.out.println("start_date = " + start_date);                                                                    
			//System.out.println("end_date = " + end_date);                                                                    
			
			
			
			String query_id   = "ip_02090_hawastockSupportPlan_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			//ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(query_id2);			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}       
			
			//String query_id2;	
			//ArrayList<ArrayList<String>> cdList; 
			//int arrIdx;
			//String[] cd;
			//String[] cdName;			
			
			
			/* CD_FLAG 콤보 리스트를 추출하여 콤보리스트 생성 */
			//query_id = "f_get_code_name";  System.out.println("getSelQeury : " + query_id);
			//cdList = new CommonUtil().getSelQeury("cd_grp", "CD_FLAG", query_id);
			//arrIdx = cdList.size();
			//cd = new String[arrIdx];	cdName = new String[arrIdx];
			//System.out.println("CD_FLAG 콤보 리스트 생성");
			//for ( int i = 0 ; i < arrIdx ; i++ ){
				//cd[i] = cdList.get(i).get(0);   
				//cdName[i] = cdList.get(i).get(1); 
			//}
			//System.out.println("CD_FLAG 컬럼에 콤보리스트 set");
			//gdRes.getHeader("CD_FLAG").setComboValues(cdName, cd );					

			
			
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {             

				gdRes.getHeader("ITEM_ID"			) .addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("ITEM_NAME"			) .addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("DC_ID"				) .addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("DC_NAME"			) .addValue(qResult.get(i).get(3),"");      
				gdRes.getHeader("CD_SRC_LOC"		) .addValue(qResult.get(i).get(4),"");
				
				//gdRes.getHeader("CD_FLAG1"			) .addValue(qResult.get(i).get(5),"");				
				
				gdRes.getHeader("SAFETY_STOCK"		) .addValue(qResult.get(i).get(5),"");          
				gdRes.getHeader("SAFETY_STOCK_FLAG"	) .addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("CD_FLAG"			) .addValue(qResult.get(i).get(7),"");				
				//gdRes.getHeader("CD_FLAG"			) .addValue("0", "");
				gdRes.getHeader("SALES_MEAN_3MONTH"	) .addValue(qResult.get(i).get(8),"");                                     
				gdRes.getHeader("PRE_MONTH_SELL"	) .addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("SALES_PRE_CUM"	    ) .addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("SALES_MEAN_1WEEK"	) .addValue(qResult.get(i).get(11),"");                                     
				gdRes.getHeader("SALES_MEAN_3WEEK"	) .addValue(qResult.get(i).get(12),"");                                     
				gdRes.getHeader("BASE_STOCK"		) .addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("IPGO_EXPT"			) .addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("CHGO_EXPT"			) .addValue(qResult.get(i).get(15),"");                                     
				gdRes.getHeader("FINISH_STOCK"		) .addValue(qResult.get(i).get(16),"");                                     
				gdRes.getHeader("STOCK_DAY_1W"		) .addValue(qResult.get(i).get(17),""); 
				gdRes.getHeader("STOCK_DAY_3W"		) .addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("STOCK_TERM"		) .addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("DC_ALLOC"			) .addValue("0", "");
				
				gdRes.getHeader("PAL_QTY"			) .addValue(qResult.get(i).get(20),"");	//PALET	수량//
				
				gdRes.getHeader("D1_QTY"			) .addValue(qResult.get(i).get(21),"");	//D+1	발주량//
				gdRes.getHeader("D2_QTY"			) .addValue(qResult.get(i).get(22),"");	//D+2	발주량//
				gdRes.getHeader("D3_QTY"			) .addValue(qResult.get(i).get(23),"");	//D+3	발주량//
				gdRes.getHeader("D4_QTY"			) .addValue(qResult.get(i).get(24),"");	//D+4	발주량//
				gdRes.getHeader("D5_QTY"			) .addValue(qResult.get(i).get(25),"");	//D+5	발주량//
				gdRes.getHeader("D6_QTY"			) .addValue(qResult.get(i).get(26),"");	//D+6	발주량//
				gdRes.getHeader("TOT"				) .addValue(qResult.get(i).get(27),"");
				
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

//		System.out.println("doSave() start!!!");

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
					
			
			
			
			//String cnfm_date	= gdReq.getParam("cnfm_date");
			//String item_id		= gdReq.getParam("item_id");

			//String dc_id		= gdReq.getParam("dc_id");

			//String dC_alloc		= gdReq.getParam("dC_alloc");
						
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
					
					//파라미터를 변수에 적용!!
						
					//-------------------------------------------------------------------------------------------------------------------
					sql += "			SELECT		TO_CHAR(SYSDATE, 'YYYYMMDD')								AS CNFM_DATE, 		\n"; 
					sql +="					   '" + gdReq.getHeader("ITEM_ID"	).getValue(i)   		+ "'   	  AS ITEM_ID,   	\n";
					sql +="					   '" + gdReq.getHeader("DC_ID"		).getValue(i)   		+ "'   	  AS DC_ID,      	\n";
					sql +="					   '" + gdReq.getHeader("D1_QTY"	).getValue(i)   		+ "'   	  AS D1_QTY,      	\n";
					sql +="					   '" + gdReq.getHeader("D2_QTY"	).getValue(i)   		+ "'   	  AS D2_QTY,      	\n";
					sql +="					   '" + gdReq.getHeader("D3_QTY"	).getValue(i)   		+ "'   	  AS D3_QTY,      	\n";
					sql +="					   '" + gdReq.getHeader("D4_QTY"	).getValue(i)   		+ "'   	  AS D4_QTY,      	\n";
					sql +="					   '" + gdReq.getHeader("D5_QTY"	).getValue(i)   		+ "'   	  AS D5_QTY,      	\n";
					sql +="					   '" + gdReq.getHeader("D6_QTY"	).getValue(i)   		+ "'   	  AS D6_QTY,      	\n";
					
					//+"					   '" + gdReq.getHeader("DC_ALLOC").getValue(i)  		+ "'   	  AS DC_ALLOC,		" 
					sql +="					   '" + user_id  									    + "' 	  AS MADE_BY			\n";
					sql +="				from   DUAL 																		   		\n";						
	               //--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") HP1 														   	\n";
			sql += "ON (HP.CNFM_DATE    = HP1.CNFM_DATE    						   	\n";
			sql += "AND HP.ITEM_ID     	= HP1.ITEM_ID           				   	\n";
			sql += "AND HP.DC_ID     	= HP1.DC_ID)           				   		\n";
			sql += "when matched then update set            					   	\n";
			sql += "     HP.D1_QTY        = HP1.D1_QTY,      					   	\n";
			sql += "     HP.D2_QTY        = HP1.D2_QTY,      					   	\n";
			sql += "     HP.D3_QTY        = HP1.D3_QTY,      					   	\n";
			sql += "     HP.D4_QTY        = HP1.D4_QTY,      					   	\n";
			sql += "     HP.D5_QTY        = HP1.D5_QTY,      					   	\n";
			sql += "     HP.D6_QTY        = HP1.D6_QTY      					   	\n";
			
			sql += "when not matched then insert( HP.CNFM_DATE,  HP.ITEM_ID,  HP.DC_ID,  HP.D1_QTY,  HP.D2_QTY,  HP.D3_QTY,  HP.D4_QTY,  HP.D5_QTY,  HP.D6_QTY, HP.MADE_TYPE, HP.MADE_DTTM, HP.MADE_BY) \n";
			sql += "values                      (HP1.CNFM_DATE, HP1.ITEM_ID, HP1.DC_ID, HP1.D1_QTY, HP1.D2_QTY, HP1.D3_QTY, HP1.D4_QTY, HP1.D5_QTY, HP1.D6_QTY, 'AD',          SYSDATE,    HP1.MADE_BY) \n";
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