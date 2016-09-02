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
public class rp_03010_supply_suitability extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String cnfm_date  		= gdReq.getParam("cnfm_date");
			String user_id	   		= gdReq.getParam("user_id"); 
			String gubn				= gdReq.getParam("gubn");
		                                                                                                                 
			String paramKey   = "cnfm_date!%!gubn!%!user_id";                                                                      
			String paramCode  = cnfm_date+"!%!"+gubn+"!%!"+user_id;                                                                   
		                                                                 
			
			String query_id   = "rp_03010_supply_suitability";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
         	                                                                                                            
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("SALES_CAT03"   		).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("ITEM_ID"   			).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_NAME"   			).addValue(qResult.get(i).get(2), "");
			 	gdRes.getHeader("SALES_MEAN_1WEEK_ETC" 	).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("SALES_MEAN_3WEEK_ETC"	).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("SALES_MEAN_13WEEK_ETC" ).addValue(qResult.get(i).get(5), "");				
				gdRes.getHeader("DAY_0"	    			).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("DAY_1"	    			).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("DAY_2"	    			).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("DAY_3"	    			).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("DAY_4"	    			).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("DAY_5"	    			).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("DAY_6"	    			).addValue(qResult.get(i).get(12), "");
				gdRes.getHeader("DAY_7"	    			).addValue(qResult.get(i).get(13), "");
				gdRes.getHeader("DAY_8"	    			).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("DAY_9"	    			).addValue(qResult.get(i).get(15), "");
				gdRes.getHeader("DAY_10"				).addValue(qResult.get(i).get(16), "");
				gdRes.getHeader("DAY_11"				).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("DAY_12"				).addValue(qResult.get(i).get(18), "");
				gdRes.getHeader("DAY_13"				).addValue(qResult.get(i).get(19), "");
				gdRes.getHeader("DAY_14"				).addValue(qResult.get(i).get(20), "");
				gdRes.getHeader("DAY_15"				).addValue(qResult.get(i).get(21), "");
				gdRes.getHeader("DAY_16"				).addValue(qResult.get(i).get(22), "");
				gdRes.getHeader("DAY_17"				).addValue(qResult.get(i).get(23), "");
				gdRes.getHeader("DAY_18"				).addValue(qResult.get(i).get(24), "");
				gdRes.getHeader("DAY_19"				).addValue(qResult.get(i).get(25), "");
				gdRes.getHeader("DAY_20"				).addValue(qResult.get(i).get(26), "");
				gdRes.getHeader("STDDEV_POP"			).addValue(qResult.get(i).get(27), "");
				
				gdRes.getHeader("DAY_GUBN_0"			).addValue(qResult.get(i).get(28), "");
				gdRes.getHeader("DAY_GUBN_1"			).addValue(qResult.get(i).get(29), "");
				gdRes.getHeader("DAY_GUBN_2"			).addValue(qResult.get(i).get(30), "");
				gdRes.getHeader("DAY_GUBN_3"			).addValue(qResult.get(i).get(31), "");
				gdRes.getHeader("DAY_GUBN_4"			).addValue(qResult.get(i).get(32), "");
				gdRes.getHeader("DAY_GUBN_5"			).addValue(qResult.get(i).get(33), "");
				gdRes.getHeader("DAY_GUBN_7"			).addValue(qResult.get(i).get(34), "");
				gdRes.getHeader("DAY_GUBN_8"			).addValue(qResult.get(i).get(35), "");
				gdRes.getHeader("DAY_GUBN_9"			).addValue(qResult.get(i).get(36), "");
				gdRes.getHeader("DAY_GUBN_10"			).addValue(qResult.get(i).get(37), "");
				gdRes.getHeader("DAY_GUBN_11"			).addValue(qResult.get(i).get(38), "");
				gdRes.getHeader("DAY_GUBN_12"			).addValue(qResult.get(i).get(39), "");
				gdRes.getHeader("DAY_GUBN_14"			).addValue(qResult.get(i).get(40), "");
				gdRes.getHeader("DAY_GUBN_15"			).addValue(qResult.get(i).get(41), "");
				gdRes.getHeader("DAY_GUBN_16"			).addValue(qResult.get(i).get(42), "");
				gdRes.getHeader("DAY_GUBN_17"			).addValue(qResult.get(i).get(43), "");
				gdRes.getHeader("DAY_GUBN_18"			).addValue(qResult.get(i).get(44), "");
				gdRes.getHeader("DAY_GUBN_19"			).addValue(qResult.get(i).get(45), "");
		                                                                                                          
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