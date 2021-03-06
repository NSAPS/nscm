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
public class ip_01130_import_md_PlanAnalysis_list extends HttpServlet {                                                             
                                                                                                                             
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
			
			
			String search_type 		= gdReq.getParam("search_type");
			String user_id	   		= gdReq.getParam("user_id"); 
			String sales_cat05		= gdReq.getParam("sales_cat05");
		
			
		                                                                                                                 
			String paramKey   = "cnfm_date!%!search_type!%!user_id!%!sales_cat05";                                                                      
			String paramCode  = cnfm_date+"!%!"+search_type+"!%!"+user_id+"!%!"+sales_cat05;                                                                   
		
			System.out.println("search_type = " + search_type);                                                                    
			
			String query_id   = "ip_01130_import_md_PlanAnalysis_list";                                                             
                                                                                                                             
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

				//gdRes.getHeader("CRUD"			).addValue("","");
				gdRes.getHeader("SALES_CAT05"   ).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("SALES_CAT03"   ).addValue(qResult.get(i).get(1), "");
			 	gdRes.getHeader("ITEM_ID" 	    ).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ITEM_NAME"	    ).addValue(qResult.get(i).get(3), "");
				//gdRes.getHeader("AVL_STOCK"     ).addValue(qResult.get(i).get(4), "");                                     
				//gdRes.getHeader("NS_STOCK"      ).addValue(qResult.get(i).get(5), "");                               
				//gdRes.getHeader("EXP_STOCK"     ).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("GUBN"			).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("GUBN_IDX"		).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("BOX_CUM"		).addValue("0", "");
				gdRes.getHeader("NO_FLAG"		).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("THREE_MON"		).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("MONTH_5"		).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("MONTH_4"		).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("MONTH_3"		).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("MONTH_2"		).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("MONTH_1"	    ).addValue(qResult.get(i).get(12), "");  
				
				gdRes.getHeader("WEEK_0"	    ).addValue(qResult.get(i).get(13), "");
				gdRes.getHeader("WEEK_1"	    ).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("WEEK_2"	    ).addValue(qResult.get(i).get(15), "");
				gdRes.getHeader("WEEK_3"	    ).addValue(qResult.get(i).get(16), "");
				gdRes.getHeader("WEEK_4"	    ).addValue(qResult.get(i).get(17), "");
				gdRes.getHeader("WEEK_5"	    ).addValue(qResult.get(i).get(18), "");
				gdRes.getHeader("WEEK_6"	    ).addValue(qResult.get(i).get(19), "");
				gdRes.getHeader("WEEK_7"	    ).addValue(qResult.get(i).get(20), "");
				gdRes.getHeader("WEEK_8"	    ).addValue(qResult.get(i).get(21), "");
				gdRes.getHeader("WEEK_9"	    ).addValue(qResult.get(i).get(22), "");
				gdRes.getHeader("WEEK_10"	    ).addValue(qResult.get(i).get(23), "");
				gdRes.getHeader("WEEK_11"	    ).addValue(qResult.get(i).get(24), "");
				gdRes.getHeader("WEEK_12"	    ).addValue(qResult.get(i).get(25), "");
				gdRes.getHeader("WEEK_13"	    ).addValue(qResult.get(i).get(26), "");
				gdRes.getHeader("WEEK_14"	    ).addValue(qResult.get(i).get(27), "");
				gdRes.getHeader("WEEK_15"	    ).addValue(qResult.get(i).get(28), "");
				gdRes.getHeader("WEEK_16"	    ).addValue(qResult.get(i).get(29), "");
				gdRes.getHeader("WEEK_17"	    ).addValue(qResult.get(i).get(30), "");
				gdRes.getHeader("WEEK_18"	    ).addValue(qResult.get(i).get(31), "");
				gdRes.getHeader("WEEK_19"	    ).addValue(qResult.get(i).get(32), "");
				gdRes.getHeader("WEEK_20"	    ).addValue(qResult.get(i).get(33), "");
				gdRes.getHeader("WEEK_21"	    ).addValue(qResult.get(i).get(34), "");
				gdRes.getHeader("WEEK_22"	    ).addValue(qResult.get(i).get(35), "");
				gdRes.getHeader("WEEK_23"	    ).addValue(qResult.get(i).get(36), "");
				gdRes.getHeader("WEEK_24"	    ).addValue(qResult.get(i).get(37), "");
				gdRes.getHeader("WEEK_25"	    ).addValue(qResult.get(i).get(38), "");
				gdRes.getHeader("WEEK_26"	    ).addValue(qResult.get(i).get(39), "");
				gdRes.getHeader("TP_FLAG"	    ).addValue(qResult.get(i).get(40), "");
				gdRes.getHeader("TIMEFANCE_SORT"	).addValue("0", ""); 
		                                                                                                          
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