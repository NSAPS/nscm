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
public class sc_01130_ProductionPlanChange_TimeFance_list extends HttpServlet {                                                             
                                                                                                                             
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
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                  
			String start_date	= gdReq.getParam("start_date");
			String end_date 	= gdReq.getParam("end_date");
			String search_gubn 	= gdReq.getParam("search_gubn");
			
			                                                                                                                 
			
			String paramKey   ="start_date!%!end_date!%!search_gubn";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+search_gubn;                                                                   
			
			
			
			String query_id   = "sc_01130_ProductionPlanChange_TimeFance_list";                                                             
                                                                                                                             
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


				gdRes.getHeader("PLANT_ID"		).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("PLANT_NAME"	).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("WW"			).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("OD_CNT"		).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("CH_CNT"		).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("CH_RATE"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("TP_CNT"		).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("CH_RATE_TP"	).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("CH_RATE_OD"	).addValue(qResult.get(i).get(8  ),"");                                      

				gdRes.getHeader("START_DATE"	).addValue(qResult.get(i).get(9  ),"");                                      
				gdRes.getHeader("END_DATE"		).addValue(qResult.get(i).get(10 ),"");                                      
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}
	
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                  
			String start_date	= gdReq.getParam("start_date");
			String end_date 	= gdReq.getParam("end_date");
			String search_gubn 	= gdReq.getParam("search_gubn");
			String sel_plant_id 	= gdReq.getParam("sel_plant_id");
			
			
			                                                                                                                 
			
			String paramKey   ="start_date!%!end_date!%!search_gubn!%!sel_plant_id";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+search_gubn+"!%!"+sel_plant_id;                                                                   
			
			
			
			String query_id   = "sc_01130_ProductionPlanChange_TimeFance_list_02";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search2");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				
				gdRes.getHeader("PLANT_ID"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("PLANT_NAME").addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("WW"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("PROD_DATE"	).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("CH_DATE"	).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("TERM"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("ITEM_NAME"	).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("BF_QTY"	).addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("AF_QTY"	).addValue(qResult.get(i).get(9  ),"");                                      
				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(10 ),"");                                      
                                                                                                                             
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}   	
	
	
}                                                                                                                            