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
public class ip_08030_Expert_prod_check extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String cnfm_date  		= gdReq.getParam("cnfm_date");  //AUDAT 傈钎刘葫老, 积己老                      
			String domain			= gdReq.getParam("domain");
			String mto_gubn			= gdReq.getParam("mto_gubn");
			String search_item		= gdReq.getParam("search_item");
		                                                                                                                 
			String paramKey   = "cnfm_date!%!domain!%!mto_gubn!%!search_item";                                                                      
			String paramCode  = cnfm_date+"!%!"+domain+"!%!"+mto_gubn+"!%!"+search_item;                                                                   
		  	
			String query_id   = "ip_08030_Expert_prod_check";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             
				
				gdRes.getHeader("SALES_CAT03" 	).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("ITEM_ID" 	    ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_NAME"	    ).addValue(qResult.get(i).get(2), "");		
				gdRes.getHeader("AVL_STOCK"	    ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("ORDER_BOX"	    ).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("SAFE_QTY"	    ).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("NEED_QTY"     	).addValue(qResult.get(i).get(6), "");	
				gdRes.getHeader("MON_PLAN"     	).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("MON_PROD"     	).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("MON_GAP"     	).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("TUE_PLAN"     	).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("TUE_PROD"     	).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("TUE_GAP"     	).addValue(qResult.get(i).get(12), "");
				gdRes.getHeader("WED_PLAN"     	).addValue(qResult.get(i).get(13), "");
				gdRes.getHeader("WED_PROD"     	).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("WED_GAP"     	).addValue(qResult.get(i).get(15), "");
				gdRes.getHeader("THR_PLAN"     	).addValue(qResult.get(i).get(16), "");
				gdRes.getHeader("THR_PROD"     	).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("THR_GAP"     	).addValue(qResult.get(i).get(18), "");
				gdRes.getHeader("FRI_PLAN"     	).addValue(qResult.get(i).get(19), "");
				gdRes.getHeader("FRI_PROD"     	).addValue(qResult.get(i).get(20), "");
				gdRes.getHeader("FRI_GAP"     	).addValue(qResult.get(i).get(21), "");
				gdRes.getHeader("SAT_PLAN"     	).addValue(qResult.get(i).get(22), "");
				gdRes.getHeader("SAT_PROD"     	).addValue(qResult.get(i).get(23), "");
				gdRes.getHeader("SAT_GAP"     	).addValue(qResult.get(i).get(24), "");
				gdRes.getHeader("TOT_PLAN"     	).addValue(qResult.get(i).get(25), "");
				gdRes.getHeader("TOT_PROD"     	).addValue(qResult.get(i).get(26), "");
				gdRes.getHeader("TOT_GAP"     	).addValue(qResult.get(i).get(27), "");
				gdRes.getHeader("PLAN_QTY"     	).addValue(qResult.get(i).get(28), "");
				gdRes.getHeader("MTO_MTS"     	).addValue(qResult.get(i).get(29), "");
				gdRes.getHeader("ROWNUM"     	).addValue(qResult.get(i).get(30), "");
				                 
				
		                                                                                                          
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