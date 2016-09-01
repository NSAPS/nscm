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
public class ip_07090_EDI_eCvan_Analysis extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String start_date  = gdReq.getParam("start_date");                                                            
			String end_date    = gdReq.getParam("end_date"); 
			String user_id	   = gdReq.getParam("user_id"); 
			String item_type   = gdReq.getParam("item_type"); 
			
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!user_id!%!item_type";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+user_id+"!%!"+item_type;                                                                   
		
			                                                               
			
			String query_id   = "ip_07090_EDI_eCvan_Analysis_list";                                                             
                                                                                                                             
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

				
				gdRes.getHeader("CNFM_DATE"      	 ).addValue(qResult.get(i).get(0), "");	
				gdRes.getHeader("ODER_BOX_NS" 	     ).addValue(qResult.get(i).get(1), "");			// EDI¹ßÁÖ·® 
				gdRes.getHeader("ODER_BOX_NS_2" 	 ).addValue(qResult.get(i).get(1), ""); 
				gdRes.getHeader("ODER_AMT_NS" 	     ).addValue(qResult.get(i).get(2), ""); 		// EDI¹ßÁÖ¾×	
				gdRes.getHeader("EDI_SELL_BOX" 	     ).addValue(qResult.get(i).get(3), "");			// EDI ³³Ç°·®
				gdRes.getHeader("EDI_SELL_BOX_2"     ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("EDI_SELL_AMT" 	     ).addValue(qResult.get(i).get(4), "");			// EDI ³³Ç°¾×
				gdRes.getHeader("EDI_MN_BOX"	     ).addValue(qResult.get(i).get(5), ""); 		// EDI ¹Ì³³·®
				gdRes.getHeader("EDI_MN_BOX_2"	     ).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("EDI_MN_AMT"	     ).addValue(qResult.get(i).get(6), "");			// EDI ¹Ì³³¾×
				
				gdRes.getHeader("EDI_NS_MN"        	 ).addValue(qResult.get(i).get(7), "");          // EDI³ó½É¹Ì³³
				gdRes.getHeader("EDI_NS_MN_2"        ).addValue(qResult.get(i).get(7), "");          // EDI³ó½É¹Ì³³
				gdRes.getHeader("EDI_NS_MN_AMT"      ).addValue(qResult.get(i).get(8), "");          // EDI³ó½É¹Ì³³¾×
				
				gdRes.getHeader("EDI_EMART_MN"       ).addValue(qResult.get(i).get(9), ""); 		// EDIÀÌ¸¶Æ®¹Ì³³  
				gdRes.getHeader("EDI_EMART_MN_2"     ).addValue(qResult.get(i).get(9), ""); 		// EDIÀÌ¸¶Æ®¹Ì³³ 
				gdRes.getHeader("EDI_EMART_MN_AMT"   ).addValue(qResult.get(i).get(10), ""); 		// EDIÀÌ¸¶Æ®¹Ì³³ 
				
				gdRes.getHeader("EDI_MN_RATE"        ).addValue(qResult.get(i).get(11), ""); 		// EDI ¹Ì³³À²
				gdRes.getHeader("ECV_SELL_BOX"		 ).addValue(qResult.get(i).get(12), "");		//³³Ç°·®
				gdRes.getHeader("ECV_SELL_BOX_2"	 ).addValue(qResult.get(i).get(12), "");		//³³Ç°·®
				gdRes.getHeader("ECV_SELL_AMT"		 ).addValue(qResult.get(i).get(13), "");		//³³Ç°¾×
				gdRes.getHeader("ECV_MN_BOX"		 ).addValue(qResult.get(i).get(14), "");		//¹Ì³³·®
				gdRes.getHeader("ECV_MN_BOX_2"		 ).addValue(qResult.get(i).get(14), "");		//¹Ì³³·®
				gdRes.getHeader("ECV_MN_AMT"		 ).addValue(qResult.get(i).get(15), "");		//¹Ì³³
				gdRes.getHeader("ECV_NS_MN"			 ).addValue("0", ""); 
				gdRes.getHeader("ECV_EMART_MN"		 ).addValue("0", ""); 
				gdRes.getHeader("ECV_MN_RATE"		 ).addValue(qResult.get(i).get(16), "");
				
				gdRes.getHeader("MN_GAP"	         ).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("MN_GAP_2"	         ).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("MN_GAP_AMT"	     ).addValue(qResult.get(i).get(18), "");
				gdRes.getHeader("EDI_PANALTY"	     ).addValue(qResult.get(i).get(19), "");
				gdRes.getHeader("ECV_PANALTY"	     ).addValue(qResult.get(i).get(20), "");
				
			
		                                                                                                          
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