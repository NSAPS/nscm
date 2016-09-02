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
public class sc_02190_planVsActualResultByPlant_list_new extends HttpServlet {                                                             
                                                                                                                             
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
			String ex_gubn 			= gdReq.getParam("ex_gubn"); 
			String mto_gubn			= gdReq.getParam("mto_gubn");                                                            
			String selected_type 	= gdReq.getParam("selected_type"); 
			String checked_uom	   	= gdReq.getParam("checked_uom"); 
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!user_id!%!ex_gubn!%!mto_gubn!%!selected_type!%!checked_uom";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+user_id+"!%!"+ex_gubn+"!%!"+mto_gubn+"!%!"+selected_type+"!%!"+checked_uom;                                                                   
		  	
			String query_id   = "sc_02190_planVsActualResultByPlant_list_new";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("ITEM_ID" 	    ).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("ITEM_NAME"	    ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("SPEC"        	).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("GUBN"        	).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("ANYANG"      	).addValue(qResult.get(i).get(4), "");                               
				gdRes.getHeader("ANSUNG"    	).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("ANSUNG_B"		).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("ASAN"			).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("KUMI"			).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("PUSAN"			).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("NOKSAN"		).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("TOTAL"			).addValue(qResult.get(i).get(11), "");
		                                                                                                          
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