package com.wisegrid.admin;                                                                                                  
import java.io.IOException;                                                                                                  
import java.io.PrintWriter;                                                                                                  
                                                                                             
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
public class ip_09010_intergrated_stock_manage extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String start_date  		= gdReq.getParam("start_date");                                                            
			String end_date    		= gdReq.getParam("end_date"); 
			String user_id   		= gdReq.getParam("user_id");  
			String selected_type 	= gdReq.getParam("selected_type"); 
		
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!user_id!%!selected_type";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+user_id+"!%!"+selected_type;                                                                   
		  	
			String query_id   = "ip_09010_intergrated_stock_manage";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("CNFM_DATE" 	 ).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("CUR_STOCK"	     ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("LAST_STOCK"     ).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("CUR_CHGO"       ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("LAST_CHGO"      ).addValue(qResult.get(i).get(4), "");        
				gdRes.getHeader("CUR_STOCK2"	 ).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("LAST_STOCK2"    ).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("CUR_CHGO2"      ).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("LAST_CHGO2"     ).addValue(qResult.get(i).get(8), ""); 
				gdRes.getHeader("CUR_STOCK3"	 ).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("LAST_STOCK3"    ).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("CUR_CHGO3"      ).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("LAST_CHGO3"     ).addValue(qResult.get(i).get(12), ""); 
				gdRes.getHeader("CUR_STOCK4"	 ).addValue(qResult.get(i).get(13), "");
				gdRes.getHeader("LAST_STOCK4"    ).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("CUR_CHGO4"      ).addValue(qResult.get(i).get(15), "");
				gdRes.getHeader("LAST_CHGO4"     ).addValue(qResult.get(i).get(16), ""); 
				gdRes.getHeader("CUR_STOCK5"	 ).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("LAST_STOCK5"    ).addValue(qResult.get(i).get(18), "");
				gdRes.getHeader("CUR_CHGO5"      ).addValue(qResult.get(i).get(19), "");
				gdRes.getHeader("LAST_CHGO5"     ).addValue(qResult.get(i).get(20), ""); 
				
		                                                                                                          
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