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
public class ip_07080_Daily_EDI_Order_Analysis_list extends HttpServlet {                                                             
                                                                                                                             
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
			else if (mode.equals("search_DW2"))
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
                                                                                                                             
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
	        
			String start_date  = gdReq.getParam("start_date");                                                            
			String end_date    = gdReq.getParam("end_date"); 
			String item_type   = gdReq.getParam("item_type");                                                            
			String search_type = gdReq.getParam("search_type"); 
			String search_item = gdReq.getParam("search_item"); 
			String grup_code1  = gdReq.getParam("grup_code1"); 
			String chk_edi_reason  	= gdReq.getParam("chk_edi_reason"); 
			String in_qty_gubn		= gdReq.getParam("in_qty_gubn"); 
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!item_type!%!search_type!%!search_item!%!grup_code1!%!chk_edi_reason!%!in_qty_gubn";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+item_type+"!%!"+search_type+"!%!"+search_item+"!%!"+grup_code1+"!%!"+chk_edi_reason+"!%!"+in_qty_gubn;                                                                   
		
			System.out.println("search_type = " + search_type);                                                                    
			
			String query_id   = "ip_07080_Daily_EDI_Order_Analysis_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("PROD_CODE"       	).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("ITEM_NAME" 	  	).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("GUBN"	        	).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("D00"        		).addValue(qResult.get(i).get(3 ), "");                                     
				gdRes.getHeader("D01"        		).addValue(qResult.get(i).get(4 ), "");                                     
				gdRes.getHeader("D02"        		).addValue(qResult.get(i).get(5 ), "");                                     
				gdRes.getHeader("D03"        		).addValue(qResult.get(i).get(6 ), "");                                     
				gdRes.getHeader("D04"        		).addValue(qResult.get(i).get(7 ), "");                                     
				gdRes.getHeader("D05"        		).addValue(qResult.get(i).get(8 ), "");                                     
				gdRes.getHeader("D06"        		).addValue(qResult.get(i).get(9 ), "");                                     
				gdRes.getHeader("D07"        		).addValue(qResult.get(i).get(10), "");                                     
				gdRes.getHeader("D08"        		).addValue(qResult.get(i).get(11), "");                                     
				gdRes.getHeader("D09"        		).addValue(qResult.get(i).get(12), "");                                     
				gdRes.getHeader("D10"        		).addValue(qResult.get(i).get(13), "");                                     
				gdRes.getHeader("D11"        		).addValue(qResult.get(i).get(14), "");                                     
				gdRes.getHeader("D12"        		).addValue(qResult.get(i).get(15), "");                                     
				gdRes.getHeader("D13"        		).addValue(qResult.get(i).get(16), "");                                     
				gdRes.getHeader("D14"        		).addValue(qResult.get(i).get(17), "");                                     
				gdRes.getHeader("D15"        		).addValue(qResult.get(i).get(18), "");                                     
				gdRes.getHeader("D16"        		).addValue(qResult.get(i).get(19), "");                                     
				gdRes.getHeader("D17"        		).addValue(qResult.get(i).get(20), "");                                     
				gdRes.getHeader("D18"        		).addValue(qResult.get(i).get(21), "");                                     
				gdRes.getHeader("D19"        		).addValue(qResult.get(i).get(22), "");                                     
				gdRes.getHeader("D20"        		).addValue(qResult.get(i).get(23), "");                                     
				gdRes.getHeader("D21"        		).addValue(qResult.get(i).get(24), "");                                     
				gdRes.getHeader("D22"        		).addValue(qResult.get(i).get(25), "");                                     
				gdRes.getHeader("D23"        		).addValue(qResult.get(i).get(26), "");                                     
				gdRes.getHeader("D24"        		).addValue(qResult.get(i).get(27), "");                                     
				gdRes.getHeader("D25"        		).addValue(qResult.get(i).get(28), "");                                     
				gdRes.getHeader("D26"        		).addValue(qResult.get(i).get(29), "");                                     
				gdRes.getHeader("D27"        		).addValue(qResult.get(i).get(30), "");                                     
				gdRes.getHeader("D28"        		).addValue(qResult.get(i).get(31), "");                                     
				gdRes.getHeader("D29"        		).addValue(qResult.get(i).get(32), "");                                     
				gdRes.getHeader("D30"        		).addValue(qResult.get(i).get(33), "");                                     
				gdRes.getHeader("TOT"        		).addValue(qResult.get(i).get(34), "");        
                                                                                                                            
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	public GridData doQuery2(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();		
		int rowCount = 0;
		
		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			System.out.println("getParam...");
			String start_date  = gdReq.getParam("start_date");                                                            
			String end_date    = gdReq.getParam("end_date"); 
			String item_type   = gdReq.getParam("item_type");                                                            
			String search_type = gdReq.getParam("search_type"); 
			String search_item = gdReq.getParam("search_item"); 
			String grup_code1 = gdReq.getParam("grup_code1"); 
			String in_qty_gubn	= gdReq.getParam("in_qty_gubn");
			
			String paramKey   = "start_date!%!end_date!%!item_type!%!search_type!%!search_item!%!grup_code1!%!in_qty_gubn";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+item_type+"!%!"+search_type+"!%!"+search_item+"!%!"+grup_code1+"!%!"+in_qty_gubn;                                                                   

			String query_id   = "ip_07080_EDI_Order_Analysis_Detail_list";    
			
			System.out.println("getSelQeury : " + query_id);
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search_DW2");
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			
	        //그리드에 data input
			System.out.println("DW2_그리드 객체에 Data Input");
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(0 ), ""); 
				gdRes.getHeader("CUST_CODE"		).addValue(qResult.get(i).get(1 ), "");
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(2 ), "");
				gdRes.getHeader("PROD_CODE"		).addValue(qResult.get(i).get(3 ), "");
				gdRes.getHeader("CNFM_DATE"		).addValue(qResult.get(i).get(4 ), "");
				gdRes.getHeader("ODER_BOX"		).addValue(qResult.get(i).get(5 ), "");
				gdRes.getHeader("REQT_BOX"		).addValue(qResult.get(i).get(6 ), "");
				gdRes.getHeader("SELL_BOX"		).addValue(qResult.get(i).get(7 ), "");
				gdRes.getHeader("DC_NAME"	    ).addValue(qResult.get(i).get(8 ), "");
				gdRes.getHeader("SALES_NAME"	).addValue(qResult.get(i).get(9 ), "");
				gdRes.getHeader("GAP"	    	).addValue(qResult.get(i).get(10 ), "");
				
			}
		
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			System.out.println("화면에 전달할 파마미터 설정");
			gdRes.addParam("mode", "search_DW2");
			gdRes.setMessage("조회 완료");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		System.out.println("그리드 객체 return");		
		return gdRes;
	}

}                                                                                                                            