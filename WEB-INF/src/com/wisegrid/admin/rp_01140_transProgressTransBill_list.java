package com.wisegrid.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import com.zionex.t3sinc.common.CommonUtil;
import com.zionex.t3sinc.util.db.SincDatabaseUtility;

public class rp_01140_transProgressTransBill_list extends HttpServlet {

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
			                                                                                                                 
			String trans_start			= gdReq.getParam("trans_start");                                                            
			String trans_end			= gdReq.getParam("trans_end"); 
			
			String search_item 			= gdReq.getParam("search_item");
			//String item_id				= gdReq.getParam("item_id");
			String selected_src_loc		= gdReq.getParam("selected_src_loc");
			String selected_tgt_loc		= gdReq.getParam("selected_tgt_loc");
			String selected_plan_type	= gdReq.getParam("selected_plan_type");
	                                                                                                                 
			String paramKey   = "trans_start!%!trans_end!%!search_item!%!selected_src_loc!%!selected_tgt_loc!%!selected_plan_type!%!";                                                                      
			String paramCode  = trans_start+"!%!"+trans_end+"!%!"+search_item+"!%!"+selected_src_loc+"!%!"+selected_tgt_loc+"!%!"+selected_plan_type+"!%!";           

			System.out.println("trans_start 	= " + trans_start);                                                                    
			System.out.println("trans_end		= " + trans_end);  
			System.out.println("search_item		= " + search_item);
                                                                                                                             
			String query_id   = "rp_01140_transProgressTransBill_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                                                              

			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				//GridObj.SetColHide("CRUD", true); 						
				
				gdRes.getHeader("TRANS_DATE"     ).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("SRC_LOC_ID"     ).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("SRC_LOC"        ).addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("TGT_LOC_ID"     ).addValue(qResult.get(i).get(3),"");
				gdRes.getHeader("TGT_LOC"        ).addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("TRUCK_SEQ"      ).addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("BRAND_NO"       ).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("PLT_QTY"        ).addValue(qResult.get(i).get(7),"");
				gdRes.getHeader("BOX_QTY"        ).addValue(qResult.get(i).get(8),"");
				gdRes.getHeader("PLAN_TYPE"      ).addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("PLAN_TYPE_NAME" ).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("MADE_TIME"      ).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("CHGO_TIME"      ).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("IPGO_TIME"      ).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("LOAD_TIME"      ).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("TRANS_TIME"     ).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("TOT_TIME"       ).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("TRANS_STATE"    ).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("MICHGO"         ).addValue(qResult.get(i).get(18),"");
				                                                                                                                            
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                              
	
	// DW 2 조회  쿼리 주문정보
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            

			String trans_date = gdReq.getParam("trans_date");                                                            
			String src_loc    = gdReq.getParam("src_loc");
			String tgt_loc    = gdReq.getParam("tgt_loc");
			String truck_seq  = gdReq.getParam("truck_seq");
			String brand_no   = gdReq.getParam("brand_no"); 
			
	     	String paramKey   = "trans_date!%!src_loc!%!tgt_loc!%!truck_seq!%!brand_no";                                                                      
			String paramCode  = trans_date+"!%!"+src_loc+"!%!"+tgt_loc+"!%!"+truck_seq+"!%!"+brand_no;                                                                   
			String query_id   = "rp_01140_transProgressTransBillBrandDetail_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("PROD_CODE" )  .addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("PROD_NAME" )  .addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("TP_PLT" 	)  .addValue(qResult.get(i).get(2),"");                                     
				gdRes.getHeader("TP_BOX"  	)  .addValue(qResult.get(i).get(3),"");                                     
				gdRes.getHeader("TA_PLT" 	)  .addValue(qResult.get(i).get(4),"");     
				gdRes.getHeader("TA_BOX"	)  .addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("TRANS_STATE") .addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("MICHGO"	)  .addValue(qResult.get(i).get(7),"");
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}
}