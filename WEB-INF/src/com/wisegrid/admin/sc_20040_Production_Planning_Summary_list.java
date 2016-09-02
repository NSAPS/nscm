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
public class sc_20040_Production_Planning_Summary_list extends HttpServlet {                                                             
                                                                                                                             
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
			String mto_gubn			= gdReq.getParam("mto_gubn");
		                                                                                                                 
			String paramKey   = "work_date!%!item_type!%!domain!%!search_type!%!multi_flag!%!box_flag!%!sum_type!%!search_item!%!week!%!mto_gubn";                                                                      
			String paramCode  = work_date+"!%!"+item_type+"!%!"+domain+"!%!"+search_type+"!%!"+multi_flag+"!%!"+box_flag+"!%!"+sum_type+"!%!"+search_item+"!%!"+week+"!%!"+mto_gubn;                                                                   
		
			System.out.println("search_type = " + search_type);                                                                    
			
			String query_id   = "sc_20040_Production_Planning_Summary_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();
			System.out.println("ªÁ¿Ã¡Ó:"+rowCount);
                                                                                                                             
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
				//gdRes.getHeader("PROC_ID"	     ).addValue(qResult.get(i).get(49), "");
				//gdRes.getHeader("PROC_NAME"	     ).addValue(qResult.get(i).get(50), "");
				gdRes.getHeader("SPEC"        	 ).addValue(qResult.get(i).get(4), "");                                     
				gdRes.getHeader("DAY0_1"       		 ).addValue(qResult.get(i).get(5), qResult.get(i).get(27)); 
				gdRes.getHeader("DAY0_2"       		 ).addValue(qResult.get(i).get(6), qResult.get(i).get(28));
				gdRes.getHeader("DAY0_3"       		 ).addValue(qResult.get(i).get(7), qResult.get(i).get(29));
				gdRes.getHeader("DAY1_1"       		 ).addValue(qResult.get(i).get(8), qResult.get(i).get(30)); 
				gdRes.getHeader("DAY1_2"       		 ).addValue(qResult.get(i).get(9), qResult.get(i).get(31)); 
				gdRes.getHeader("DAY1_3"       		 ).addValue(qResult.get(i).get(10), qResult.get(i).get(32)); 
				gdRes.getHeader("DAY2_1"	      	 ).addValue(qResult.get(i).get(11), qResult.get(i).get(33));  
				gdRes.getHeader("DAY2_2"       		 ).addValue(qResult.get(i).get(12), qResult.get(i).get(34)); 
				gdRes.getHeader("DAY2_3"       		 ).addValue(qResult.get(i).get(13), qResult.get(i).get(35)); 
				gdRes.getHeader("DAY3_1"	       		 ).addValue(qResult.get(i).get(14), qResult.get(i).get(36));
				gdRes.getHeader("DAY3_2"	       		 ).addValue(qResult.get(i).get(15), qResult.get(i).get(37));
				gdRes.getHeader("DAY3_3"	       		 ).addValue(qResult.get(i).get(16), qResult.get(i).get(38));
				gdRes.getHeader("DAY4_1"	       		 ).addValue(qResult.get(i).get(17), qResult.get(i).get(39));
				gdRes.getHeader("DAY4_2"	       		 ).addValue(qResult.get(i).get(18), qResult.get(i).get(40));
				gdRes.getHeader("DAY4_3"	       		 ).addValue(qResult.get(i).get(19), qResult.get(i).get(41));
				gdRes.getHeader("DAY5_1"			     ).addValue(qResult.get(i).get(20),qResult.get(i).get(42));
				gdRes.getHeader("DAY5_2"			     ).addValue(qResult.get(i).get(21),qResult.get(i).get(43));
				gdRes.getHeader("DAY5_3"			     ).addValue(qResult.get(i).get(22),qResult.get(i).get(44));
				gdRes.getHeader("DAY6_1"				 ).addValue(qResult.get(i).get(23),qResult.get(i).get(45));
				gdRes.getHeader("DAY6_2"			     ).addValue(qResult.get(i).get(24),qResult.get(i).get(46));
				gdRes.getHeader("DAY6_3"			     ).addValue(qResult.get(i).get(25),qResult.get(i).get(47));
				gdRes.getHeader("WEEK_SUM"	   		 	 ).addValue(qResult.get(i).get(26),"");
				gdRes.getHeader("GUBN"	   		 		 ).addValue(qResult.get(i).get(48),"");
				
		
				
		                                                                                                          
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