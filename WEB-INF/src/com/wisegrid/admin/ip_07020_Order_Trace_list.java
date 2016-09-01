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
public class ip_07020_Order_Trace_list extends HttpServlet {                                                             
                                                                                                                             
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
			                                                                                                                 
			String in_fr_date		= gdReq.getParam("in_fr_date");                                                            
			String in_to_date		= gdReq.getParam("in_to_date"); 
			String in_item_id		= gdReq.getParam("in_item_id"); 
			String in_input_gubn	= gdReq.getParam("in_input_gubn"); 
			String tgt_loc_sel		= gdReq.getParam("tgt_loc_sel");
			
			String sales_list		= gdReq.getParam("sales_list");
			
			
			String in_slip_gubn		= gdReq.getParam("in_slip_gubn"); 
			String in_clos_gubn		= gdReq.getParam("in_clos_gubn"); 
			                                                                                                                 
			String paramKey   ="in_fr_date!%!in_to_date!%!in_item_id!%!in_input_gubn!%!tgt_loc_sel!%!sales_list!%!in_slip_gubn!%!in_clos_gubn";                                                                      
			String paramCode  = in_fr_date+"!%!"+in_to_date+"!%!"+in_item_id+"!%!"+in_input_gubn+"!%!"+tgt_loc_sel+"!%!"+sales_list+"!%!"+in_slip_gubn+"!%!"+in_clos_gubn;                                                                   
                                                                                                                             
			String query_id   = "ip_07020_Order_Trace_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("CNFM_DATE"		).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("DC_NAME" 		).addValue(qResult.get(i).get(1), "");                                     
				gdRes.getHeader("DOMAIN"		).addValue(qResult.get(i).get(2), "");                                     
				gdRes.getHeader("SLIP_GUBN"		).addValue(qResult.get(i).get(3), "");                                     
				gdRes.getHeader("DEPT_NAME"		).addValue(qResult.get(i).get(4), "");                                     
				gdRes.getHeader("HAN_NAME"		).addValue(qResult.get(i).get(5), "");                                     
				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(6), "");                                     
				gdRes.getHeader("SLIP_NO"		).addValue(qResult.get(i).get(7), "");                                     
				gdRes.getHeader("SEQ_NO"		).addValue(qResult.get(i).get(8), "");                                      
				gdRes.getHeader("REQT_BOX" 		).addValue(qResult.get(i).get(9), "");                                     
				gdRes.getHeader("SELL_BOX"      ).addValue(qResult.get(i).get(10),"");                                     
				gdRes.getHeader("IPUT_DTTM"     ).addValue(qResult.get(i).get(11),"");                                     
				gdRes.getHeader("CHGO_GUBN" 	).addValue(qResult.get(i).get(12),"");                                     
				gdRes.getHeader("SHORTAGE_GUBN" ).addValue(qResult.get(i).get(13),"");                                     
				gdRes.getHeader("CLOS_DTTM"     ).addValue(qResult.get(i).get(14),"");                                     
                                                                                                                             
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