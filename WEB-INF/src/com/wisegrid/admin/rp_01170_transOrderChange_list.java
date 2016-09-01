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
public class rp_01170_transOrderChange_list extends HttpServlet {                                                             
                                                                                                                             
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
			else if (mode.equals("search2")) //                                                                               
				gdRes = doQuery2(gdReq);                                                                                     
			else if (mode.equals("search3")) //                                                                               
				gdRes = doQuery3(gdReq);
			//수송전표 추가
			else if (mode.equals("orderAddWd2")) //전표 추가
				gdRes = doOrderAddWd2(gdReq);		
			else if (mode.equals("orderAddWd3")) //전표 추가
				gdRes = doOrderAddWd3(gdReq);		
			else if (mode.equals("makeBrandNo")) //전표 삭제                                                                               
				gdRes = doMakeBrandNo(gdReq);		
			//else if (mode.equals("orderModi")) //전표 수정
			//	gdRes = doOrderModi(gdReq);		
			
		
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

	
	// 메인상단조회 쿼리
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String trans_start	= gdReq.getParam("trans_start");                                                            
			String trans_end		= gdReq.getParam("trans_end"); 
			String selected_src_loc = gdReq.getParam("selected_src_loc");
			String selected_tgt_loc = gdReq.getParam("selected_tgt_loc");
			String brand_no = gdReq.getParam("brand_no");
			String act_gubn = gdReq.getParam("act_gubn");
			                                                                                                                 
			String paramKey   ="trans_start!%!trans_end!%!selected_src_loc!%!selected_tgt_loc!%!brand_no!%!act_gubn";                                                                      
			String paramCode  = trans_start+"!%!"+trans_end+"!%!"+selected_src_loc+"!%!"+selected_tgt_loc+"!%!"+brand_no+"!%!"+act_gubn;                                                                   
                                                                                                                             
			String query_id   = "rp_01170_transOrderChange_list_1";                                                             
                                                                                                                             
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
				
				gdRes.getHeader("TRANS_DATE"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("SRC_LOC" 		).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("SRC_NAME"      ).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("TGT_LOC"       ).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("TGT_NAME"		).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("BRAND_NO"		).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("BOX_QTY"		).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("PLT_QTY"		).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("TRANS_STATE"	).addValue(qResult.get(i).get(8  ),"");                                     
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	//하단 그리드 WD2 조회 쿼리
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			String trans_date = gdReq.getParam("trans_date");                                                            
			String src_loc = gdReq.getParam("src_loc"); 
			String tgt_loc = gdReq.getParam("tgt_loc");
			String brand_no = gdReq.getParam("brand_no");                                                            
			                                                                                                                 
			String paramKey   ="trans_date!%!src_loc!%!tgt_loc!%!brand_no";                                                                      
			String paramCode  = trans_date+"!%!"+src_loc+"!%!"+tgt_loc+"!%!"+brand_no;                                                                   
                                                                                                                             
			String query_id   = "rp_01170_transOrderChange_list_2";                                                             
                                                                                                                             
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

				gdRes.getHeader("CRUD"		).addValue( "", "");
				//gdRes.getHeader("NO"		).addValue( i+1 + "", "");
				gdRes.getHeader("SELECTED"	).addValue("0", "");                    
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("ITEM_NAME"	).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("BOX_QTY"	).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("PLT_QTY"	).addValue(qResult.get(i).get(3  ),"");

				gdRes.getHeader("TRANS_DATE").addValue(qResult.get(i).get(4  ),"");
				gdRes.getHeader("SRC_LOC"	).addValue(qResult.get(i).get(5  ),"");
				gdRes.getHeader("TGT_LOC"	).addValue(qResult.get(i).get(6  ),"");
				gdRes.getHeader("BRAND_NO"	).addValue(qResult.get(i).get(7  ),"");
				//gdRes.getHeader("DEL_RANK"	).addValue(qResult.get(i).get(9  ),"");
				gdRes.getHeader("DEL_PLT"	).addValue(qResult.get(i).get(12  ),"");
				gdRes.getHeader("BOX_PER_PALET"	).addValue(qResult.get(i).get(10  ),"");
				gdRes.getHeader("CRE_GUBN"	).addValue(qResult.get(i).get(11  ),"");
				gdRes.getHeader("DEL_QTY"	).addValue( "", "");
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}  	
	//하단 그리드 WD3 조회 쿼리
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			String trans_date = gdReq.getParam("trans_date");                                                            
			String src_loc = gdReq.getParam("src_loc"); 
			String tgt_loc = gdReq.getParam("tgt_loc");
			String brand_no = gdReq.getParam("brand_no");                                                            
			                                                                                                                 
			String paramKey   ="trans_date!%!src_loc!%!tgt_loc!%!brand_no";                                                                      
			String paramCode  = trans_date+"!%!"+src_loc+"!%!"+tgt_loc+"!%!"+brand_no;                                                                   
                                                                                                                             
			String query_id   = "rp_01170_transOrderChange_list_3";                                                             
                                                                                                                             
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

				gdRes.getHeader("CRUD"		).addValue( "", "");
				//gdRes.getHeader("SELECTED"	).addValue("0", "");                    
				gdRes.getHeader("SELECTED"	).addValue("0", "");                    
				//gdRes.getHeader("NO"		).addValue( i+1 + "", "");
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("ITEM_NAME"	).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("BOX_QTY"	).addValue( "", "");
				gdRes.getHeader("PLT_QTY"	).addValue( "", "");
				gdRes.getHeader("BOX_PER_PALET"	).addValue(qResult.get(i).get(2  ),"");
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}  	
	

	
	// 수송계회 오수송 
	public GridData doOrderAddWd2(GridData gdReq) throws Exception {

		System.out.println("doOrderAddWd2() start!!!");

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());


			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("SELECTED").getRowCount();

			System.out.println("getParam");
			String brand_no	= gdReq.getParam("brand_no");
			String src_loc	= gdReq.getParam("src_loc");
			String tgt_loc	= gdReq.getParam("tgt_loc");
			String user_id	= gdReq.getParam("user_id");
			String act_gubn = gdReq.getParam("act_gubn");
			String chng_resn = gdReq.getParam("chng_resn");
			String trans_date = gdReq.getParam("trans_date");
			
			if(act_gubn == "03"||act_gubn =="04"){ //오더수량 추가 03
				
				// TRANS_ORDER_CHNG_LOG insert
				String sql2
				= "INSERT	INTO TRANS_ORDER_CHNG_LOG															\n" 
				+ "        ( 																					\n";
				
				// 데이터 셋팅
				System.out.println("sql 쿼리 생성");
				for (int i = 0; i < rowCount; i++) {
								
					//String trans_date 	= gdReq.getHeader("TRANS_DATE").getValue(i);
					String item_id		= gdReq.getHeader("ITEM_ID").getValue(i);
					String qty			= gdReq.getHeader("BOX_QTY").getValue(i);
					String del_plt		= gdReq.getHeader("DEL_PLT").getValue(i);
					String bpp			= gdReq.getHeader("BOX_PER_PALET").getValue(i);
					
					String del_qty;
					del_qty	=  (Float.valueOf(del_plt)*  Float.valueOf(bpp)) + "";
					qty		= (Float.valueOf(qty)-  Float.valueOf(del_qty)) + "";
					
									
					if( brand_no.equals("") || brand_no.equals(null) ){
						continue;
					}
					else{
						if( i > 0){
							sql2 += " union all \n"; 
						} 
						sql2 += "SELECT  '" + trans_date + "' AS TRANS_DATE, '" + src_loc + "' AS SRC_LOC, '" + tgt_loc + "' AS TGT_LOC, '" + act_gubn + "' AS ACT_GUBN, \n";
						sql2 += "        'D' AS CRE_GUBN, '" + chng_resn + "' AS CHNG_RESN, '' AS ITEM_ID, 												 \n";
						sql2 += "        ''  AS QTY, \n";
						sql2 += "        '" + brand_no + "' AS ORG_BRAND_NO, '' AS CHNG_BRAND_NO, '' AS CHNG_TRUCK_SEQ,	\n";
						sql2 += "        SYSDATE AS MADE_DTTM, 'AD' AS MADE_TYPE, '" + user_id + "' AS MADE_BY 																						\n";
						sql2 += "FROM    DUAL                         																																					\n";
					}				
				}
				
				sql2 += ")\n";
				
				
				
			try{
				conn = databaseUtility.getConnection("t3sinc"); // DB Connection
				stmt = conn.createStatement(); // statement 객체 생성
				// 이관 메이드 타입에 ETC
				System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
				System.out.println(sql2);
				System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
				
				System.out.println(" sql2 executeQuery 실행!!!");
				rs = databaseUtility.executeQuery(stmt, sql2);
				System.out.println(" sql2 executeQuery 종료!!!");
	
				System.out.println("call SP_RP_ORDER_CHNG_020() 실행!!!");
				
				String sql3 = "call SP_RP_ORDER_CHNG_020('" + brand_no + "','" + trans_date + "','" + src_loc + "','" + tgt_loc + "','" + act_gubn + "','" + user_id + "')";
				System.out.println(sql3);
				boolean result = stmt.execute(sql3);
				
				System.out.println("call SP_RP_ORDER_CHNG_020() 종료!!! - 결과 : " + result);					
	
				
				/*
				 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
				 */
				gdRes.addParam("mode", "doOrderAddWd2");
				gdRes.setMessage("성공적으로 작업하였습니다.");
				gdRes.setStatus("true");			
			}catch (Exception e) {
				throw e;
			}finally {
	            databaseUtility.close(conn, stmt, rs);              
	        }
		
		}else{//실행구분 03 이외!!
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "orderAdd");
				gdRes.setMessage("doOrderAddWd2 : 저장할 DATA가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}				
		
			System.out.println("SELECTED Row Count : " + rowCount);
			
			// TRANS_ORDER_CHNG_LOG insert
			String sql2
			= "INSERT	INTO TRANS_ORDER_CHNG_LOG															\n" 
			+ "        ( 																					\n";
			
			// 데이터 셋팅
			System.out.println("sql 쿼리 생성");
			for (int i = 0; i < rowCount; i++) {
							
				//String trans_date 	= gdReq.getHeader("TRANS_DATE").getValue(i);
				String item_id		= gdReq.getHeader("ITEM_ID").getValue(i);
				String qty			= gdReq.getHeader("BOX_QTY").getValue(i);
				String del_plt		= gdReq.getHeader("DEL_PLT").getValue(i);
				String bpp			= gdReq.getHeader("BOX_PER_PALET").getValue(i);
				
				String del_qty;
				del_qty	=  (Float.valueOf(del_plt)*  Float.valueOf(bpp)) + "";
				qty		= (Float.valueOf(qty)-  Float.valueOf(del_qty)) + "";
				
								
				if( brand_no.equals("") || brand_no.equals(null) ){
					continue;
				}
				else{
					if( i > 0){
						sql2 += " union all \n"; 
					} 
					sql2 += "SELECT  '" + trans_date + "' AS TRANS_DATE, '" + src_loc + "' AS SRC_LOC, '" + tgt_loc + "' AS TGT_LOC, '" + act_gubn + "' AS ACT_GUBN, \n";
					sql2 += "        'D' AS CRE_GUBN, '" + chng_resn + "' AS CHNG_RESN, '" + item_id + "' AS ITEM_ID, 												 \n";
					sql2 += "        '" + del_qty + "' AS QTY, \n";
					sql2 += "        '" + brand_no + "' AS ORG_BRAND_NO, '' AS CHNG_BRAND_NO, '' AS CHNG_TRUCK_SEQ,	\n";
					sql2 += "        SYSDATE AS MADE_DTTM, 'AD' AS MADE_TYPE, '" + user_id + "' AS MADE_BY 																						\n";
					sql2 += "FROM    DUAL                         																																					\n";
				}				
			}
			
			sql2 += ")\n";
			
			
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
			// 이관 메이드 타입에 ETC
			System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
			
			System.out.println(" sql2 executeQuery 실행!!!");
			rs = databaseUtility.executeQuery(stmt, sql2);
			System.out.println(" sql2 executeQuery 종료!!!");

			System.out.println("call SP_RP_ORDER_CHNG_020() 실행!!!");
			
			String sql3 = "call SP_RP_ORDER_CHNG_020('" + brand_no + "','" + trans_date + "','" + src_loc + "','" + tgt_loc + "','" + act_gubn + "','" + user_id + "')";
			System.out.println(sql3);
			boolean result = stmt.execute(sql3);
			
			System.out.println("call SP_RP_ORDER_CHNG_020() 종료!!! - 결과 : " + result);					

			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "doOrderAddWd2");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }
			
			
		}
			

		
		

		System.out.println("doOrderAddWd2() end!!!");

		return gdRes;
	}	
	
	// 수송계회 오수송 
	public GridData doOrderAddWd3(GridData gdReq) throws Exception {

		System.out.println("doOrderAddWd3() start!!!");



		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());


			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("SELECTED").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "orderAdd");
				gdRes.setMessage("doOrderAddWd3 : 저장할 DATA가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("SELECTED Row Count : " + rowCount);
		
		
			String trans_date = gdReq.getParam("trans_date");

			// TRANS_ORDER_CHNG_LOG insert
			String sql
			= "INSERT	INTO TRANS_ORDER_CHNG_LOG															\n" 
			+ "        ( 																					\n";
			
			
			System.out.println("getParam");
			String brand_no	= gdReq.getParam("brand_no");
			String src_loc	= gdReq.getParam("src_loc");
			String tgt_loc	= gdReq.getParam("tgt_loc");
			String user_id	= gdReq.getParam("user_id");
			String act_gubn = gdReq.getParam("act_gubn");
			String chng_resn = gdReq.getParam("chng_resn");
			//String qty = gdReq.getParam("qty");
			
			
			// 데이터 셋팅
			System.out.println("sql 쿼리 생성");
			for (int i = 0; i < rowCount; i++) {
							
				String item_id		= gdReq.getHeader("ITEM_ID").getValue(i);
				String qty			= gdReq.getHeader("BOX_QTY").getValue(i);
				
								
				if( brand_no.equals("") || brand_no.equals(null) ){
					continue;
				}
				else{
					if( i > 0){
						//sql += " union all \n"; 
						sql += " union all \n"; 
					} 
					sql += "SELECT  '" + trans_date + "' AS TRANS_DATE, '" + src_loc + "' AS SRC_LOC, '" + tgt_loc + "' AS TGT_LOC, '" + act_gubn + "' AS ACT_GUBN, \n";
					sql += "        'I' AS CRE_GUBN, '" + chng_resn + "' AS CHNG_RESN, '" + item_id + "' AS ITEM_ID, 												 \n";
					sql += "        '" + qty + "' AS QTY, '" + brand_no + "' AS ORG_BRAND_NO, '' AS CHNG_BRAND_NO, '' AS CHNG_TRUCK_SEQ,	\n";
					sql += "        SYSDATE AS MADE_DTTM, 'AD' AS MADE_TYPE, '" + user_id + "' AS MADE_BY 																						\n";
					sql += "FROM    DUAL                         																																					\n";
				}				
			}
			
			sql += ")\n";
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
			// 이관 메이드 타입에 ETC
			System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY2-----------------------------------------------");
			
			System.out.println(" sql executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println(" sql executeQuery 종료!!!");


			System.out.println("call SP_RP_ORDER_CHNG_010() 실행!!!");
			
			String sql3 = "call SP_RP_ORDER_CHNG_010('" + brand_no + "','" + trans_date + "','" + src_loc + "','" + tgt_loc + "','" + act_gubn + "','" + user_id + "')";
			System.out.println(sql3);
			boolean result = stmt.execute(sql3);
			
			System.out.println("call SP_RP_ORDER_CHNG_010() 종료!!! - 결과 : " + result);					
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "doOrderAddWd3");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doOrderAddWd3() end!!!");

		return gdRes;
	}	
		
	public GridData doMakeBrandNo(GridData gdReq) throws Exception {

		System.out.println("doMakeBrandNo() start!!!");



		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());


			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			//rowCount = gdReq.getHeader("SELECTED").getRowCount();

			
			System.out.println("SELECTED Row Count : " + rowCount);
		
		
			String trans_date = gdReq.getParam("trans_date");

			
			System.out.println("getParam");
			String brand_no	= gdReq.getParam("brand_no");
			String src_loc	= gdReq.getParam("src_loc");
			String tgt_loc	= gdReq.getParam("tgt_loc");
			String user_id	= gdReq.getParam("user_id");
			String act_gubn = gdReq.getParam("act_gubn");
			String chng_resn = gdReq.getParam("chng_resn");
			//String qty = gdReq.getParam("qty");
			
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
			// 이관 메이드 타입에 ETC

			System.out.println("call SP_RP_ORDER_CHNG_030() 실행!!!");
			
			String sql3 = "call SP_RP_ORDER_CHNG_030('" + brand_no + "','" + trans_date + "','" + src_loc + "','" + tgt_loc + "','" + act_gubn + "','" + user_id + "')";
			System.out.println(sql3);
			boolean result = stmt.execute(sql3);
			
			System.out.println("call SP_RP_ORDER_CHNG_030() 종료!!! - 결과 : " + result);					
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "makeBrandNo");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doMakeBrandNo() end!!!");

		return gdRes;
	}
	
	
}                                                                                                                            