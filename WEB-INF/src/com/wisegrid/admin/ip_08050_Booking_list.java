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
public class ip_08050_Booking_list extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String start_date  		= gdReq.getParam("start_date");  //AUDAT ��ǥ������, ������       
			String domain			= gdReq.getParam("domain");
			String end_date			= gdReq.getParam("end_date");
			String search_item		= gdReq.getParam("search_item");
			String search_order		= gdReq.getParam("search_order");
			String search_napum		= gdReq.getParam("search_napum");
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!domain!%!search_item!%!search_order!%!search_napum";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+domain+"!%!"+search_item+"!%!"+search_order+"!%!"+search_napum;                                                                   
		  	
			String query_id   = "ip_08050_Booking_list";                                                             
                                                                                                                             
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
				gdRes.getHeader("BRAND_NO" 		).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("BOOKING_NO" 	).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ITEM_ID" 	    ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("ITEM_NAME"	    ).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("ORDER_QTY"	    ).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("SHIPPLAN_DATE"	).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("ETD_DATE"	    ).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("EXPORT_DECLARE").addValue(qResult.get(i).get(8), "");				
				gdRes.getHeader("CLOSING_DATE"  ).addValue(qResult.get(i).get(9), "");		
				gdRes.getHeader("ZPLDAT"  		).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("LOCAL_DIV"		).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("CENTER_CD"	    ).addValue(qResult.get(i).get(12), "");				
				gdRes.getHeader("DELIVERY_CD"	).addValue(qResult.get(i).get(13), "");				
				gdRes.getHeader("BOOKING_USER"  ).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("BOOKING_DATE"  ).addValue(qResult.get(i).get(15), ""); 
				gdRes.getHeader("BRAND_USER"    ).addValue(qResult.get(i).get(16), "");
				gdRes.getHeader("BRAND_DATE"    ).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("FLAG"    		).addValue(qResult.get(i).get(18), "");
				gdRes.getHeader("GUBN"    		).addValue(qResult.get(i).get(19), "");
				gdRes.getHeader("CHGO_DATE"    	).addValue(qResult.get(i).get(20), "");
				gdRes.getHeader("ROWNUM"     	).addValue(qResult.get(i).get(21), "");
				
		                                                                                                          
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