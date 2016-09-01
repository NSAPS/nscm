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
public class sc_13030_set_prod_inout_list extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	ResultSet	rs2		= null;	                                                                                             
	ResultSet	rs3		= null;	                                                                                             
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
			                                                                                                                 
			
			String start_date	= gdReq.getParam("start_date");
			String end_date		= gdReq.getParam("end_date");
			String idu_flag		= gdReq.getParam("idu_flag");
			String scm_charge	= gdReq.getParam("scm_charge");
			String cm_gubn		= gdReq.getParam("cm_gubn");

			                                                                                                                 
			String paramKey   ="start_date!%!end_date!%!idu_flag!%!scm_charge!%!cm_gubn";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+idu_flag+"!%!"+scm_charge+"!%!"+cm_gubn;   		
			
			//String paramKey   ="in_fr_date!%!in_to_date!%!in_item_id!%!in_bl_no";                                                                      
			//String paramCode  = in_fr_date+"!%!"+in_to_date+"!%!"+in_item_id+"!%!"+in_bl_no;   			
			
	        System.out.println("idu_flag="+idu_flag);                                                                                      
			
                                                                                                                             
			String query_id   = "sc_13030_set_prod_inout_list";                                                             
                                                                                                                             
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

				
				
				gdRes.getHeader("SALES_CAT02"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("SALES_CAT03"	).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("SPEC"			).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("BASE_STOCK"	).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("PROD_PLAN"		).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("SALES_PRE"		).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("CHGO"			).addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("STOCK_EXPT"	).addValue(qResult.get(i).get(9  ),"");                                      
				gdRes.getHeader("OPER_QTY"		).addValue(qResult.get(i).get(10 ),"");                                      
				gdRes.getHeader("COMPL_QTY"		).addValue(qResult.get(i).get(11 ),"");                                      
				gdRes.getHeader("REMAIN_QTY"	).addValue(qResult.get(i).get(12 ),"");                                      
				gdRes.getHeader("COMPL_RATE"	).addValue(qResult.get(i).get(13 ),"");                                      
				gdRes.getHeader("PRE_YEAR_SELL"	).addValue(qResult.get(i).get(14 ),"");                                      
				gdRes.getHeader("PRE_MONTH_SELL").addValue(qResult.get(i).get(15 ),"");                                      
				gdRes.getHeader("SALES_PRE_CUM"	).addValue(qResult.get(i).get(16 ),"");
				gdRes.getHeader("PROD_TERM"		).addValue(qResult.get(i).get(17 ),"");
				
                                                                                                                             
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
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount			= gdReq.getHeader("CRUD").getRowCount();
			String cnfm_date 	= gdReq.getParam("cnfm_date");
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Save");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql, sql2, inner_sql2, sql3, inner_sql3;
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.BM,			T2.NEW_BM,				T1.OPER_TYPE,		T2.NEW_OPER_TYPE,							\n";
			sql += "			T1.OPER_QTY,	T2.NEW_OPER_QTY,		T1.START_DATE,		T2.NEW_START_DATE,							\n";
			sql += "			T1.END_DATE,	T2.NEW_END_DATE,		T1.CUST_TYPE,		T2.NEW_CUST_TYPE,							\n";
			sql += "			T1.COST,		T2.NEW_COST,			T1.TO_MEN,			T2.NEW_TO_MEN,							\n";
			sql += "			T1.TO_WOMEN,	T2.NEW_TO_WOMEN,		T1.WORK_CAPA,		T2.NEW_WORK_CAPA							\n";
			sql += "	FROM	SET_PROD_MST	T1,                                                                                    	\n";
			sql += "			(                                                                                                      	\n";
			boolean flag = false;
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					String oper_type = "";
					if(gdReq.getHeader("OPER_TYPE").getSelectedIndex(i) > -1){							
						oper_type = gdReq.getHeader("OPER_TYPE").getComboHiddenValues()[gdReq.getHeader("OPER_TYPE").getSelectedIndex(i)];
					}					
					
					String cust_type = "";
					if(gdReq.getHeader("CUST_TYPE").getSelectedIndex(i) > -1){							
						cust_type = gdReq.getHeader("CUST_TYPE").getComboHiddenValues()[gdReq.getHeader("CUST_TYPE").getSelectedIndex(i)];
					}							
					
					//파라미터를 변수에 적용!!  
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + gdReq.getHeader("LOC_ID").getValue(i)			+ "'	AS LOC_ID,	    		\n";
					inner_sql += "				'" + gdReq.getHeader("BM").getValue(i)				+ "'	AS NEW_BM,	    		\n";
					inner_sql += "				'" + oper_type										+ "'	AS NEW_OPER_TYPE,       \n";
					inner_sql += "				'" + gdReq.getHeader("OPER_QTY").getValue(i)		+ "'	AS NEW_OPER_QTY,	    \n";
					inner_sql += "				'" + gdReq.getHeader("START_DATE").getValue(i)		+ "'	AS NEW_START_DATE,	    \n";
					inner_sql += "				'" + gdReq.getHeader("END_DATE").getValue(i)		+ "'	AS NEW_END_DATE,	    \n";
					inner_sql += "				'" + cust_type										+ "'	AS NEW_CUST_TYPE,       \n";
					inner_sql += "				'" + gdReq.getHeader("COST").getValue(i)			+ "'	AS NEW_COST,	   		\n";
					inner_sql += "				'" + gdReq.getHeader("TO_MEN").getValue(i)			+ "'	AS NEW_TO_MEN,	    	\n";
					inner_sql += "				'" + gdReq.getHeader("TO_WOMEN").getValue(i)		+ "'	AS NEW_TO_WOMEN,	    \n";
					inner_sql += "				'" + gdReq.getHeader("WORK_CAPA").getValue(i)		+ "'	AS NEW_WORK_CAPA	    \n";
					inner_sql += "	FROM	DUAL			                                                  						\n";
					sql += inner_sql;
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql += "	UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for문 끝.
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	AND		T1.LOC_ID	= T2.LOC_ID                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		BM = NEW_BM,							OPER_TYPE = NEW_OPER_TYPE,			                  	\n";
			sql += "			OPER_QTY = NEW_OPER_QTY,				START_DATE = NEW_START_DATE,			                \n";
			sql += "			END_DATE = NEW_END_DATE,				CUST_TYPE = NEW_CUST_TYPE,			                  	\n";
			sql += "			COST = NEW_COST,						TO_MEN = NEW_TO_MEN,			                  	\n";
			sql += "			TO_WOMEN = NEW_TO_WOMEN,				WORK_CAPA = NEW_WORK_CAPA			                  	\n";

			System.out.println("-----------------------------------------------QUERY_1-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY_1-----------------------------------------------");

			
			
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


			System.out.println("-----------------------------------------------QUERY_2-----------------------------------------------");
			//System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY_2-----------------------------------------------");
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			//rs2 = databaseUtility.executeQuery(stmt, sql2);
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
            databaseUtility.close(conn, stmt, rs3);
        }

        System.out.println("doSave() end!!!");

		return gdRes;
	}
	
}                                                                                                                            