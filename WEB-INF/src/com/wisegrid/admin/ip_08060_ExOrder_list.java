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
public class ip_08060_ExOrder_list extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	      
	ResultSet	rs2		= null;	 
	String 		sql 	= null;  
	String		sql2	= null;
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
	        
			String start_date  		= gdReq.getParam("start_date");  //AUDAT 傈钎刘葫老, 积己老       
			String domain			= gdReq.getParam("domain");
			String end_date			= gdReq.getParam("end_date");
			String search_item		= gdReq.getParam("search_item");
			String order_no			= gdReq.getParam("order_no");
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!domain!%!search_item!%!order_no";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+domain+"!%!"+search_item+"!%!"+order_no;                                                                   
		  	
			String query_id   = "ip_08060_ExOrder_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {       
				
		
				gdRes.getHeader("ORDER_NO" 		).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("ORDER_USER" 	).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ORDER_DAY" 	).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ORDER_TIME" 	).addValue(qResult.get(i).get(3), "");				
				gdRes.getHeader("BRAND_NO" 		).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("BRAND_DAY" 	).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("BRAND_TIME" 	).addValue(qResult.get(i).get(6), "");				
				gdRes.getHeader("ORDER_QTY"	    ).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("ITEM_ID"	    ).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("ITEM_NAME"	    ).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("CUST_CODE"	    ).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("CUST_NAME"	    ).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("ZPLDAT"		).addValue(qResult.get(i).get(12), "");				
				gdRes.getHeader("ROWNUM"     	).addValue(qResult.get(i).get(13), "");
				
		                                                                                                          
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