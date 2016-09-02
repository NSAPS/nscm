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
public class ip_02050_Inventory_production_analysis_list extends HttpServlet {                                                             
                                                                                                                             
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
			
			
			String search_type	= gdReq.getParam("search_type");                                                            
			String term_gubn	= gdReq.getParam("term_gubn");                                                            
			String week_flag	= gdReq.getParam("week_flag");                                                            
			String plant_id		= gdReq.getParam("plant_id");                                                            
			String line_id		= gdReq.getParam("line_id");                                                            
			String stock_day 	= gdReq.getParam("stock_day");                                                            
			String stock_day_chk = gdReq.getParam("stock_day_chk");                                                            
			String search_period = gdReq.getParam("search_period");                                                            
			String search_item 	= gdReq.getParam("search_item");                                                            
			String multi_flag 	= gdReq.getParam("multi_flag");                                                            
			String cat06 		= gdReq.getParam("cat06");                                                            
			String prod_chk 	= gdReq.getParam("prod_chk");
			String stock_day_flag 	= gdReq.getParam("stock_day_flag");
			String user_id			= gdReq.getParam("user_id");
			String scm_charge		= gdReq.getParam("scm_charge");
			String sales_cat02		= gdReq.getParam("sales_cat02");
			

			
			String paramKey   ="search_type!%!term_gubn!%!week_flag!%!plant_id!%!line_id!%!stock_day!%!stock_day_chk!%!search_period!%!search_item!%!multi_flag!%!cat06!%!prod_chk!%!stock_day_flag!%!user_id!%!scm_charge!%!sales_cat02";                                                                      
			String paramCode  = search_type+"!%!"+term_gubn+"!%!"+week_flag+"!%!"+plant_id+"!%!"+line_id+"!%!"+stock_day+"!%!"+stock_day_chk+"!%!"+search_period+"!%!"+search_item+"!%!"+multi_flag+"!%!"+cat06+"!%!"+prod_chk+"!%!"+stock_day_flag+"!%!"+user_id+"!%!"+scm_charge+"!%!"+sales_cat02;                                                                   
                                                                                                                             
			String query_id   = "ip_02050_Inventory_production_analysis_list";                                                             
                                                                                                                             
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

				//gdRes.getHeader("CRUD"			).addValue( "", "");
				//gdRes.getHeader("SELECTED"		).addValue("0", "");                    
				//gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(0  ),"");                                      
				//gdRes.getHeader("ITEM_NAME" 	).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("CAT06" 		).addValue(qResult.get(i).get(0  ),"");                                     
				gdRes.getHeader("ITEM_ID" 		).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("ITEM_NAME" 	).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("TYPE" 			).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("DAY_00" 		).addValue(qResult.get(i).get(4  ),"");
				gdRes.getHeader("DAY_01" 		).addValue(qResult.get(i).get(5  ),"");
				gdRes.getHeader("DAY_02" 		).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("DAY_03" 		).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("DAY_04" 		).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("DAY_05" 		).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("DAY_06" 		).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("DAY_07" 		).addValue(qResult.get(i).get(11 ),"");                                     
				gdRes.getHeader("DAY_08" 		).addValue(qResult.get(i).get(12 ),"");                                     
				gdRes.getHeader("DAY_09" 		).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("DAY_10" 		).addValue(qResult.get(i).get(14 ),"");                                     
				
				gdRes.getHeader("DAY_11" 		).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("DAY_12" 		).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("DAY_13" 		).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("DAY_14" 		).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("DAY_15" 		).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("DAY_16" 		).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("DAY_17" 		).addValue(qResult.get(i).get(21 ),"");                                     
				gdRes.getHeader("DAY_18" 		).addValue(qResult.get(i).get(22 ),"");                                     
				gdRes.getHeader("DAY_19" 		).addValue(qResult.get(i).get(23 ),"");                                     
				gdRes.getHeader("DAY_20" 		).addValue(qResult.get(i).get(24 ),"");                                     
                                                                                                                             
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