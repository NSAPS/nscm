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
public class ip_06030_Prty_InOut_analysis_list_new extends HttpServlet {                                                             
                                                                                                                             
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
			else if (mode.equals("search2")) //                                                                                    
				gdRes = doQuery2(gdReq);     
			
			
			
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
		                                                                                                                     
//        System.out.println("doQuery...");                                                                                      
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
				gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
		        
				String in_fr_date     = gdReq.getParam("in_fr_date");                                                            
				String in_to_date     = gdReq.getParam("in_to_date"); 
				String in_item_id     = gdReq.getParam("in_item_id");                                                            
				String in_item_name   = gdReq.getParam("in_item_name"); 
				String sel_gubn       = gdReq.getParam("sel_gubn");
				String insel_prty     = gdReq.getParam("insel_prty"); 
				
				String paramKey   = "in_fr_date!%!in_to_date!%!in_item_id!%!in_item_name!%!sel_gubn!%!insel_prty";                                                                      
				String paramCode  = in_fr_date+"!%!"+in_to_date+"!%!"+in_item_id+"!%!"+in_item_name+"!%!"+sel_gubn+"!%!"+insel_prty;
				
				//System.out.println("in_item_id = "   +   in_item_id);
				System.out.println("selgubn 	= "   + 	 sel_gubn);
				System.out.println("insel_prty  = "   +    insel_prty);                                                                    
				
				String query_id   = "ip_06030_Prty_InOut_analysis_list";                                                             
	                                                                                                                             
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
				
				gdRes.getHeader("CNFM_DATE"  ).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("DAY"	     ).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("CURR_FLAG"	 ).addValue(qResult.get(i).get(2),"");
				
				gdRes.getHeader("PROD_1"     ).addValue(qResult.get(i).get(3),"");
				gdRes.getHeader("SELL_1"     ).addValue(qResult.get(i).get(4),"");
 				gdRes.getHeader("STOCK_1"	 ).addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("STOCK_DAY_1").addValue(qResult.get(i).get(6),"");				

				gdRes.getHeader("PROD_2"     ).addValue(qResult.get(i).get(7),"");
				gdRes.getHeader("SELL_2"     ).addValue(qResult.get(i).get(8),"");
 				gdRes.getHeader("STOCK_2"	 ).addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("STOCK_DAY_2").addValue(qResult.get(i).get(10),"");				
				
				gdRes.getHeader("PROD_3"     ).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("SELL_3"     ).addValue(qResult.get(i).get(12),"");
 				gdRes.getHeader("STOCK_3"	 ).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("STOCK_DAY_3").addValue(qResult.get(i).get(14),"");
				
				gdRes.getHeader("SELL_PLAN_1").addValue(qResult.get(i).get(15),"");	
			}  	
    	                                                                
				gdRes.addParam("mode", "search");		                                                                         
				gdRes.setMessage("성공적으로 작업을 마쳤습니다");                                                                                            
				gdRes.setStatus("true");   
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        
	
                     

// doQuery2
public GridData doQuery2(GridData gdReq) throws Exception {                                                               
    
//    System.out.println("doQuery2...");                                                                                      
	GridData gdRes = new GridData();		                                                                             
	int rowCount = 0;                                                                                                    
                                                                                                                         
	try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
	        
			String in_fr_date     = gdReq.getParam("in_fr_date");                                                            
			String in_to_date     = gdReq.getParam("in_to_date"); 
			String in_item_id     = gdReq.getParam("in_item_id");                                                            
			String in_item_name   = gdReq.getParam("in_item_name"); 
			String sel_gubn       = gdReq.getParam("sel_gubn");
			String insel_prty     = gdReq.getParam("insel_prty"); 
		                                                                                                                 
			String paramKey   = "in_fr_date!%!in_to_date!%!in_item_id!%!in_item_name!%!sel_gubn!%!insel_prty";                                                                      
			String paramCode  = in_fr_date+"!%!"+in_to_date+"!%!"+in_item_id+"!%!"+in_item_name+"!%!"+sel_gubn+"!%!"+insel_prty;

			//System.out.println("in_item_id = "   +   in_item_id);
			System.out.println("sel_gubn 	 = "   +     sel_gubn);
			System.out.println("insel_prty = "     +   insel_prty);                                                                    
			
			String query_id   = "ip_06030_Prty_InOut_analysis_list";                                                             
	                                                                                                                         
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                         
		//                                                                                                               
		if (rowCount == 0) {                                                                                             
			gdRes.addParam("mode", "search");		                                                                     
			gdRes.setMessage("...");                                                                                     
			gdRes.setStatus("true");                                                                                     
			return gdRes;                                                                                                
							}                                                                                                                
				                                                                                                                 
//	                                                                        
		for (int i = 0; i < rowCount; i++) {    
			gdRes.getHeader("CNFM_DATE"  ).addValue(qResult.get(i).get(0),"");
			gdRes.getHeader("DAY"	     ).addValue(qResult.get(i).get(1),"");
			gdRes.getHeader("CURR_FLAG"	 ).addValue(qResult.get(i).get(2),"");
			
			gdRes.getHeader("PROD_1"     ).addValue(qResult.get(i).get(3),"");
			gdRes.getHeader("SELL_1"     ).addValue(qResult.get(i).get(4),"");
			gdRes.getHeader("STOCK_1"	 ).addValue(qResult.get(i).get(5),"");
			gdRes.getHeader("STOCK_DAY_1").addValue(qResult.get(i).get(6),"");				
			
			gdRes.getHeader("SELL_PLAN_1").addValue(qResult.get(i).get(7),"");	
		}
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("성공적으로 작업을 마쳤습니다");                                                                                            
			gdRes.setStatus("true");                                                                                                                
	} catch (Exception e) {                                                                                              
		throw e;                                                                                                         
	}                                                                                                                    
			                                                                                                             
	return gdRes;                                                                                                        
}                                                                                                                       
}
                                             
