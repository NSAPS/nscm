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
public class ip_07070_EDI_Order_Analysis_list extends HttpServlet {                                                             
                                                                                                                             
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
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!item_type!%!search_type!%!search_item!%!grup_code1";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+item_type+"!%!"+search_type+"!%!"+search_item+"!%!"+grup_code1;                                                                   
		
			System.out.println("search_type = " + search_type);                                                                    
			
			String query_id   = "ip_07070_EDI_Order_Analysis_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("CNFM_DATE"       	).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("PROD_CODE"       	).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_NAME" 	  	).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("GUBN"	        	).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("EDI32"        		).addValue(qResult.get(i).get(4), "");                                     
				gdRes.getHeader("EDI21"        		).addValue(qResult.get(i).get(5), "");                                     
				gdRes.getHeader("EDI23"         	).addValue(qResult.get(i).get(6), "");                                     
				gdRes.getHeader("EDI03"	        	).addValue(qResult.get(i).get(7), "");                                     
				gdRes.getHeader("EDI20"	        	).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("EDI26"	        	).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("EDI33"	    		).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("EDI27"	    		).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("EDI29"				).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("EDI_TOT"			).addValue(qResult.get(i).get(13),"");
                                                                                                                            
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
			
			String paramKey   = "start_date!%!end_date!%!item_type!%!search_type!%!search_item!%!grup_code1";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+item_type+"!%!"+search_type+"!%!"+search_item+"!%!"+grup_code1;                                                                   

			String query_id   = "ip_07070_EDI_Order_Analysis_Detail_list";    
			
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
				gdRes.getHeader("ODER_BOX"		).addValue(qResult.get(i).get(4 ), "");
				gdRes.getHeader("SELL_BOX"		).addValue(qResult.get(i).get(5 ), "");
				gdRes.getHeader("GAP"	    	).addValue(qResult.get(i).get(6 ), "");
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