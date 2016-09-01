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
public class sc_13050_set_prod_planVsActualResultByPlant_list extends HttpServlet {                                                             
                                                                                                                             
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
			else if (mode.equals("search3")) //                                                                                    
				gdRes = doQuery3(gdReq);
			
			                                                                                                                 
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
			                                                                                                                 
			String in_fr_date     = gdReq.getParam("in_fr_date");                                                            
			String in_to_date     = gdReq.getParam("in_to_date"); 
			String selected_type  = gdReq.getParam("selected_type");
			String checked_uom    = gdReq.getParam("checked_uom");
			
			String paramKey   	  = "in_fr_date!%!in_to_date!%!selected_type!%!checked_uom";                                                                      
			String paramCode  	  = in_fr_date+"!%!"+in_to_date+"!%!"+selected_type+"!%!"+checked_uom; 					

			System.out.println("in_fr_date		= " + in_fr_date);                                                                    
			System.out.println("in_to_date		= " + in_to_date);
			System.out.println("selected_type	= " + selected_type);
			System.out.println("checked_uom		= " + checked_uom);
			
			String query_id   = "sc_13050_set_prod_planVsActualResultByPlant_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("ITEM_ID" 		).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("SPEC" 			).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("GUBN" 			).addValue(qResult.get(i).get(3), "");
 				gdRes.getHeader("MTS_AN_QTY"	).addValue(qResult.get(i).get(4), "");  
 				gdRes.getHeader("AS_QTY"		).addValue(qResult.get(i).get(5), "");
 				gdRes.getHeader("MTS_PO_QTY" 	).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("WINE_QTY"		).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("DY_QTY"		).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("MIRE_QTY"		).addValue(qResult.get(i).get(9), "");         
				gdRes.getHeader("TK_QTY"		).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("HS_QTY"		).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("TOT"			).addValue(qResult.get(i).get(12),"");					
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("성공적으로 작업을 마쳤습니다");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}           
	
	// 중뷴류 쿼리//
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String in_fr_date     = gdReq.getParam("in_fr_date");                                                            
			String in_to_date     = gdReq.getParam("in_to_date"); 
			String selected_type  = gdReq.getParam("selected_type");
			String checked_uom    = gdReq.getParam("checked_uom");
			
			String paramKey       = "in_fr_date!%!in_to_date!%!selected_type!%!checked_uom";                                                                      
			String paramCode      = in_fr_date+"!%!"+in_to_date+"!%!"+selected_type+"!%!"+checked_uom; 					

			System.out.println("in_fr_date		= " + in_fr_date);                                                                    
			System.out.println("in_to_date		= " + in_to_date);
			System.out.println("selected_type	= " + selected_type);
			System.out.println("checked_uom		= " + checked_uom);
			
			String query_id   = "sc_13050_set_prod_planVsActualResultByPlant_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("SALES_CAT03" 	).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("CD_NAME"		).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("GUBN" 			).addValue(qResult.get(i).get(2), "");
 				gdRes.getHeader("MTS_AN_QTY" 	).addValue(qResult.get(i).get(3), "");    
 				gdRes.getHeader("AS_QTY"	 	).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("MTS_PO_QTY" 	).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("WINE_QTY"		).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("DY_QTY"		).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("MIRE_QTY"		).addValue(qResult.get(i).get(8), "");         
				gdRes.getHeader("TK_QTY"		).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("HS_QTY"		).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("TOT"			).addValue(qResult.get(i).get(11),"");                                           
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("성공적으로 작업을 마쳤습니다");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}    
	
	// 대뷴류 쿼리//
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String in_fr_date     = gdReq.getParam("in_fr_date");                                                            
			String in_to_date     = gdReq.getParam("in_to_date"); 
			String selected_type  = gdReq.getParam("selected_type");
			String checked_uom    = gdReq.getParam("checked_uom");
			
			String paramKey   	  = "in_fr_date!%!in_to_date!%!selected_type!%!checked_uom";                                                                      
			String paramCode  	  = in_fr_date+"!%!"+in_to_date+"!%!"+selected_type+"!%!"+checked_uom; 					

			System.out.println("in_fr_date		= " + in_fr_date);                                                                    
			System.out.println("in_to_date		= " + in_to_date);
			System.out.println("selected_type	= " + selected_type);
			System.out.println("checked_uom		= " + checked_uom);
			
			String query_id   = "sc_13050_set_prod_planVsActualResultByPlant_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("SALES_CAT01" 	).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("CD_NAME"		).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("GUBN" 			).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("MTS_AN_QTY" 	).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("AS_QTY"	 	).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("MTS_PO_QTY" 	).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("WINE_QTY"		).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("DY_QTY"		).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("MIRE_QTY"		).addValue(qResult.get(i).get(8), "");         
				gdRes.getHeader("TK_QTY"		).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("HS_QTY"		).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("TOT"			).addValue(qResult.get(i).get(11),"");                                           
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