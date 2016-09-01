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
public class ip_01120_Jgc_inventoryPlanAnalysis_list_expert extends HttpServlet {                                                             
                                                                                                                             
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
			String mto_gubn    = gdReq.getParam("mto_gubn"); 
			String search_type = gdReq.getParam("search_type"); 
			String search_item = gdReq.getParam("search_item"); 
			
			
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!search_type!%!search_item!%!mto_gubn";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+search_type+"!%!"+search_item+"!%!"+mto_gubn;                                                                   
		
			System.out.println("search_type = " + search_type);                                                                    
			
			String query_id   = "ip_01120_Jgc_inventoryPlanAnalysis_list_expert";                                                             
                                                                                                                             
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

				gdRes.getHeader("SALES_CAT03"       ).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("ITEM_ID" 	        ).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("ITEM_NAME"	        ).addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("SPEC"        		).addValue(qResult.get(i).get(3),"");  
				gdRes.getHeader("GUBN"				).addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("JGC_OCCUR"			).addValue(qResult.get(i).get(5),"");	//장기체화 20%시 재고
				gdRes.getHeader("SALES_PRE"			).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("SALES_CUR"			).addValue(qResult.get(i).get(7),"");
				gdRes.getHeader("BUDU_QTY"			).addValue(qResult.get(i).get(8),"");	//누계
				
				gdRes.getHeader("JGC_STOCK"        	).addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("JGC_START_DATE"	).addValue(qResult.get(i).get(10),"");	//발생일
				gdRes.getHeader("PROD_TERM"	        ).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("TERM_VAL"	        ).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("TERM_VAL_REMAIN"	).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("TERM_PER"      	).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("JGC_PROD_DATE"		).addValue(qResult.get(i).get(15),"");	//생산일
				gdRes.getHeader("STOCK_DAY"	        ).addValue(qResult.get(i).get(16),""); 
				gdRes.getHeader("SALES_MEAN_1WEEK"	).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("SALES_MEAN_3WEEK"	).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("GYR"				).addValue(qResult.get(i).get(19),"");	
				//gdRes.getHeader("REAL_STOCK"				).addValue(qResult.get(i).get(20),"");	
				
				
				
				
		                                                                                                          
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