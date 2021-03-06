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
public class sc_20040_Production_Planning_Summary_list_harb extends HttpServlet {                                                             
                                                                                                                             
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
		
		System.out.println("TEST!!!!!!!!!!!!!!!!!!");
		String job_id = "sc_20040_Production_Planning_Summary_list";
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
	        
			String work_date 		= gdReq.getParam("work_date");                                                            
			String item_type  	    = gdReq.getParam("item_type"); 
			String domain 		    = gdReq.getParam("domain");                                                            
			String search_type 		= gdReq.getParam("search_type"); 
			String multi_flag 		= gdReq.getParam("multi_flag");                                                            
			String box_flag 		= gdReq.getParam("box_flag"); 
			String sum_type  		= gdReq.getParam("sum_type");                                                            
			String search_item 		= gdReq.getParam("search_item"); 
			String week			    = gdReq.getParam("week");                                                            
			
		                                                                                                                 
			String paramKey   = "work_date!%!item_type!%!domain!%!search_type!%!multi_flag!%!box_flag!%!sum_type!%!search_item!%!week";                                                                      
			String paramCode  = work_date+"!%!"+item_type+"!%!"+domain+"!%!"+search_type+"!%!"+multi_flag+"!%!"+box_flag+"!%!"+sum_type+"!%!"+search_item+"!%!"+week;                                                                   
		
			System.out.println("search_type = " + search_type);                                                                    
			
			String query_id   = "sc_20040_Production_Planning_Summary_list_harb";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();
			System.out.println("������:"+rowCount);
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("PLANT_ID"       ).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("HID_NAME"       ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_ID" 	     ).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ITEM_NAME"	     ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("SPEC"        	 ).addValue(qResult.get(i).get(4), "");                                     
				gdRes.getHeader("DAY0"       		 ).addValue(qResult.get(i).get(5), qResult.get(i).get(13));                               
				gdRes.getHeader("DAY1"       		 ).addValue(qResult.get(i).get(6), qResult.get(i).get(14));                                     
				gdRes.getHeader("DAY2"	      		 ).addValue(qResult.get(i).get(7), qResult.get(i).get(15));                                     
				gdRes.getHeader("DAY3"	       		 ).addValue(qResult.get(i).get(8), qResult.get(i).get(16));
				gdRes.getHeader("DAY4"	       		 ).addValue(qResult.get(i).get(9), qResult.get(i).get(17));
				gdRes.getHeader("DAY5"			     ).addValue(qResult.get(i).get(10),qResult.get(i).get(18));
				gdRes.getHeader("DAY6"				 ).addValue(qResult.get(i).get(11),qResult.get(i).get(19));
				gdRes.getHeader("WEEK_SUM"	   		 ).addValue(qResult.get(i).get(12),"");
				
		
				
		                                                                                                          
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