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
public class ip_01110_Baeksansu_Stock_Trace extends HttpServlet {                                                             
                                                                                                                             
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
                                                                                                                             
			if (mode.equals("search"))                                                                                     
				gdRes = doQuery(gdReq); 
			
			
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
		        
				String start_date   = gdReq.getParam("start_date");   
				String end_date     = gdReq.getParam("end_date");   
				String search_item	= gdReq.getParam("search_item");

				
				String paramKey   = "start_date!%!end_date!%!search_item";                                                                      
				String paramCode  = start_date+"!%!"+end_date+"!%!"+search_item;
	                                                                   
				
				String query_id   = "ip_01110_Baeksansu_Stock_Trace_list";                                                             
	                                                                                                                             
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
				
				gdRes.getHeader("CNFM_DATE"  ).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("GUBN"	     ).addValue("","");
				gdRes.getHeader("ITEM_ID"	 ).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("ITEM_NAME"	 ).addValue(qResult.get(i).get(2),"");
				
				gdRes.getHeader("STOCK_00"   ).addValue(qResult.get(i).get(3),"");
				gdRes.getHeader("PROD_00"    ).addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("ISSUE_IN"   ).addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("ISSUE_00"   ).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("STOCK_01"   ).addValue(qResult.get(i).get(7),"");
				gdRes.getHeader("PROD_01"    ).addValue(qResult.get(i).get(8),"");
				gdRes.getHeader("ISSUE_01"     ).addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("STOCK_02"     ).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("PROD_02"      ).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("ISSUE_02"     ).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("STOCK_03"     ).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("PROD_03"      ).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("ISSUE_03"     ).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("STOCK_04"     ).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("PROD_04"      ).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("ISSUE_04"     ).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("STOCK_05"     ).addValue("","");
				gdRes.getHeader("PROD_05"      ).addValue("","");
				gdRes.getHeader("ISSUE_05"     ).addValue("","");
 			
			}  	
    	                                                                
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");    
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        
                                                                                                                      
}
                                             
