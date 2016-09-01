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
public class ip_02050_Inventory_production_analysis_list_pop_new extends HttpServlet {                                                             
                                                                                                                             
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
			                                                                                                                 
			gdReq = OperateGridData.parse(rawData);                                                                          
                                                                                                                             
			String mode = gdReq.getParam("mode");                                                                            
			System.out.println("Test :: mode = " + mode);                                                                    
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);                                                                                      
			else if (mode.equals("search_plan")) //                                                                               
				gdRes = doQuery_plan(gdReq);
			else if (mode.equals("search2")) //                                                                               
				gdRes = doQuery2(gdReq);                                                                                     
			else if (mode.equals("search3")) //                                                                               
				gdRes = doQuery3(gdReq);
			else if (mode.equals("search4")) //                                                                               
				gdRes = doQuery4(gdReq);  

			
			
			
		
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

	
	// DW 1 조회  쿼리
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			//service_url += "&=" + item_id + "&=" + item_name + "&=" + week_flag;
			
			
			String item_id		= gdReq.getParam("item_id");                                                            
			String item_name	= gdReq.getParam("item_name");                                                            
			String week_flag	= gdReq.getParam("week_flag"); 
			String simul_data		= gdReq.getParam("simul_data"); 
			                                                                                                                 
			String paramKey   ="item_id!%!item_name!%!week_flag!%!simul_data";                                                                      
			String paramCode  = item_id+"!%!"+item_name+"!%!"+week_flag+"!%!"+simul_data;
                                                                                                                             
			String query_id   = "ip_02050_Inventory_production_analysis_list_pop_act";                                                             
                                                                                                                             
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
				gdRes.getHeader("GUBN" 			).addValue(qResult.get(i).get(0  ),"");                                     
				gdRes.getHeader("DAY_00" 		).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("DAY_01" 		).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("DAY_02" 		).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("DAY_03" 		).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("DAY_04" 		).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("DAY_05" 		).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("DAY_06" 		).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("DAY_07" 		).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("DAY_08" 		).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("DAY_09" 		).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("DAY_10" 		).addValue(qResult.get(i).get(11 ),"");                                     
				
				gdRes.getHeader("DAY_11" 		).addValue(qResult.get(i).get(12 ),"");                                     
				gdRes.getHeader("DAY_12" 		).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("DAY_13" 		).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("DAY_14" 		).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("DAY_15" 		).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("DAY_16" 		).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("DAY_17" 		).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("DAY_18" 		).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("DAY_19" 		).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("DAY_20" 		).addValue(qResult.get(i).get(21 ),"");                                     
				
				gdRes.getHeader("DAY_21" 		).addValue(qResult.get(i).get(22 ),"");                                     
				gdRes.getHeader("DAY_22" 		).addValue(qResult.get(i).get(23 ),"");                                     
				gdRes.getHeader("DAY_23" 		).addValue(qResult.get(i).get(24 ),"");                                     
				gdRes.getHeader("DAY_24" 		).addValue(qResult.get(i).get(25 ),"");                                     
				gdRes.getHeader("DAY_25" 		).addValue(qResult.get(i).get(26 ),"");                                     
				gdRes.getHeader("DAY_26" 		).addValue(qResult.get(i).get(27 ),"");                                     
				gdRes.getHeader("DAY_27" 		).addValue(qResult.get(i).get(28 ),"");                                     
				gdRes.getHeader("DAY_28" 		).addValue(qResult.get(i).get(29 ),"");                                     
				gdRes.getHeader("DAY_29" 		).addValue(qResult.get(i).get(30 ),"");                                     
				gdRes.getHeader("DAY_30" 		).addValue(qResult.get(i).get(31 ),"");
				///////////////////////////////////////////////////////////////////////
				gdRes.getHeader("DAY_31" 		).addValue(qResult.get(i).get(32 ),"");                                     
				gdRes.getHeader("DAY_32" 		).addValue(qResult.get(i).get(33 ),"");                                     
				gdRes.getHeader("DAY_33" 		).addValue(qResult.get(i).get(34 ),"");                                     
				gdRes.getHeader("DAY_34" 		).addValue(qResult.get(i).get(35 ),"");                                     
				gdRes.getHeader("DAY_35" 		).addValue(qResult.get(i).get(36 ),"");                                     
				gdRes.getHeader("DAY_36" 		).addValue(qResult.get(i).get(37 ),"");                                     
				gdRes.getHeader("DAY_37" 		).addValue(qResult.get(i).get(38 ),"");                                     
				gdRes.getHeader("DAY_38" 		).addValue(qResult.get(i).get(39 ),"");                                     
				gdRes.getHeader("DAY_39" 		).addValue(qResult.get(i).get(40 ),"");                                     
				gdRes.getHeader("DAY_40" 		).addValue(qResult.get(i).get(41 ),"");

				gdRes.getHeader("DAY_41" 		).addValue(qResult.get(i).get(42 ),"");                                     
				gdRes.getHeader("DAY_42" 		).addValue(qResult.get(i).get(43 ),"");                                     
				gdRes.getHeader("DAY_43" 		).addValue(qResult.get(i).get(44 ),"");                                     
				gdRes.getHeader("DAY_44" 		).addValue(qResult.get(i).get(45 ),"");                                     
				gdRes.getHeader("DAY_45" 		).addValue(qResult.get(i).get(46 ),"");                                     
				gdRes.getHeader("DAY_46" 		).addValue(qResult.get(i).get(47 ),"");                                     
				gdRes.getHeader("DAY_47" 		).addValue(qResult.get(i).get(48 ),"");                                     
				gdRes.getHeader("DAY_48" 		).addValue(qResult.get(i).get(49 ),"");                                     
				gdRes.getHeader("DAY_49" 		).addValue(qResult.get(i).get(50 ),"");                                     
				gdRes.getHeader("DAY_50" 		).addValue(qResult.get(i).get(51 ),"");
				
				gdRes.getHeader("DAY_51" 		).addValue(qResult.get(i).get(52 ),"");                                     
				gdRes.getHeader("DAY_52" 		).addValue(qResult.get(i).get(53 ),"");                                     
				gdRes.getHeader("DAY_53" 		).addValue(qResult.get(i).get(54 ),"");                                     
				gdRes.getHeader("DAY_54" 		).addValue(qResult.get(i).get(55 ),"");                                     
				gdRes.getHeader("DAY_55" 		).addValue(qResult.get(i).get(56 ),"");                                     
				gdRes.getHeader("DAY_56" 		).addValue(qResult.get(i).get(57 ),"");                                     
				gdRes.getHeader("DAY_57" 		).addValue(qResult.get(i).get(58 ),"");                                     
				gdRes.getHeader("DAY_58" 		).addValue(qResult.get(i).get(59 ),"");                                     
				gdRes.getHeader("DAY_59" 		).addValue(qResult.get(i).get(60 ),"");                                     
				gdRes.getHeader("DAY_60" 		).addValue(qResult.get(i).get(61 ),"");

			
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	
	// DW 1 조회 (판매계획)
	public GridData doQuery_plan(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			//service_url += "&=" + item_id + "&=" + item_name + "&=" + week_flag;
			
			
			String item_id		= gdReq.getParam("item_id");                                                            
			String item_name	= gdReq.getParam("item_name");                                                            
			String week_flag	= gdReq.getParam("week_flag"); 
			String simul_data		= gdReq.getParam("simul_data"); 
			                                                                                                                 
			String paramKey   ="item_id!%!item_name!%!week_flag!%!simul_data";                                                                      
			String paramCode  = item_id+"!%!"+item_name+"!%!"+week_flag+"!%!"+simul_data;
                                                                                                                             
			String query_id   = "ip_02050_Inventory_production_analysis_list_pop_plan";                                                             
                                                                                                                             
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
				gdRes.getHeader("GUBN" 			).addValue(qResult.get(i).get(0  ),"");                                     
				gdRes.getHeader("DAY_00" 		).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("DAY_01" 		).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("DAY_02" 		).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("DAY_03" 		).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("DAY_04" 		).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("DAY_05" 		).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("DAY_06" 		).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("DAY_07" 		).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("DAY_08" 		).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("DAY_09" 		).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("DAY_10" 		).addValue(qResult.get(i).get(11 ),"");                                     
				
				gdRes.getHeader("DAY_11" 		).addValue(qResult.get(i).get(12 ),"");                                     
				gdRes.getHeader("DAY_12" 		).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("DAY_13" 		).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("DAY_14" 		).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("DAY_15" 		).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("DAY_16" 		).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("DAY_17" 		).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("DAY_18" 		).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("DAY_19" 		).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("DAY_20" 		).addValue(qResult.get(i).get(21 ),"");                                     
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}            	
	// DW 2 조회  쿼리 -- 과거 30일 실적
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");                                                            
			String paramKey   ="item_id";                                                                      
			String paramCode  = item_id;                                                                   
                                                                                                                             
			String query_id   = "ip_02050_Inventory_production_analysis_list_pop_DW2";                                                             
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

				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("AVG"		).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("DAY_00" 	).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("DAY_01" 	).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("DAY_02" 	).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("DAY_03" 	).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("DAY_04" 	).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("DAY_05" 	).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("DAY_06" 	).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("DAY_07" 	).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("DAY_08" 	).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("DAY_09" 	).addValue(qResult.get(i).get(11 ),"");                                     
				gdRes.getHeader("DAY_10" 	).addValue(qResult.get(i).get(12 ),"");                                     

				gdRes.getHeader("DAY_11" 	).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("DAY_12" 	).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("DAY_13" 	).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("DAY_14" 	).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("DAY_15" 	).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("DAY_16" 	).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("DAY_17" 	).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("DAY_18" 	).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("DAY_19" 	).addValue(qResult.get(i).get(21 ),"");                                     
				gdRes.getHeader("DAY_20" 	).addValue(qResult.get(i).get(22 ),"");                                     

				gdRes.getHeader("DAY_21" 	).addValue(qResult.get(i).get(23 ),"");                                     
				gdRes.getHeader("DAY_22" 	).addValue(qResult.get(i).get(24 ),"");                                     
				gdRes.getHeader("DAY_23" 	).addValue(qResult.get(i).get(25 ),"");                                     
				gdRes.getHeader("DAY_24" 	).addValue(qResult.get(i).get(26 ),"");                                     
				gdRes.getHeader("DAY_25" 	).addValue(qResult.get(i).get(27 ),"");                                     
				gdRes.getHeader("DAY_26" 	).addValue(qResult.get(i).get(28 ),"");                                     
				gdRes.getHeader("DAY_27" 	).addValue(qResult.get(i).get(29 ),"");                                     
				gdRes.getHeader("DAY_28" 	).addValue(qResult.get(i).get(30 ),"");                                     
				gdRes.getHeader("DAY_29" 	).addValue(qResult.get(i).get(31 ),"");                                     
				gdRes.getHeader("DAY_30" 	).addValue(qResult.get(i).get(32 ),"");   				

			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                	
	
	
	// DW 3 조회  쿼리 -- 전년 동일 실적
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");                                                            
			                                                                                                                 
			String paramKey   ="item_id";                                                                      
			String paramCode  = item_id;                                                                   
                                                                                                                             
			String query_id   = "ip_02050_Inventory_production_analysis_list_pop_DW3";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search3");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("AVG"		).addValue(qResult.get(i).get(1  ),"");

				gdRes.getHeader("DAY_00" 	).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("DAY_01" 	).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("DAY_02" 	).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("DAY_03" 	).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("DAY_04" 	).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("DAY_05" 	).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("DAY_06" 	).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("DAY_07" 	).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("DAY_08" 	).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("DAY_09" 	).addValue(qResult.get(i).get(11 ),"");                                     
				gdRes.getHeader("DAY_10" 	).addValue(qResult.get(i).get(12 ),"");                                     

				gdRes.getHeader("DAY_11" 	).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("DAY_12" 	).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("DAY_13" 	).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("DAY_14" 	).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("DAY_15" 	).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("DAY_16" 	).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("DAY_17" 	).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("DAY_18" 	).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("DAY_19" 	).addValue(qResult.get(i).get(21 ),"");                                     
				gdRes.getHeader("DAY_20" 	).addValue(qResult.get(i).get(22 ),"");                                     

				gdRes.getHeader("DAY_21" 	).addValue(qResult.get(i).get(23 ),"");                                     
				gdRes.getHeader("DAY_22" 	).addValue(qResult.get(i).get(24 ),"");                                     
				gdRes.getHeader("DAY_23" 	).addValue(qResult.get(i).get(25 ),"");                                     
				gdRes.getHeader("DAY_24" 	).addValue(qResult.get(i).get(26 ),"");                                     
				gdRes.getHeader("DAY_25" 	).addValue(qResult.get(i).get(27 ),"");                                     
				gdRes.getHeader("DAY_26" 	).addValue(qResult.get(i).get(28 ),"");                                     
				gdRes.getHeader("DAY_27" 	).addValue(qResult.get(i).get(29 ),"");                                     
				gdRes.getHeader("DAY_28" 	).addValue(qResult.get(i).get(30 ),"");                                     
				gdRes.getHeader("DAY_29" 	).addValue(qResult.get(i).get(31 ),"");                                     
				gdRes.getHeader("DAY_30" 	).addValue(qResult.get(i).get(32 ),"");   		
				

				gdRes.getHeader("DAY_31" 	).addValue(qResult.get(i).get(33 ),"");                                     
				gdRes.getHeader("DAY_32" 	).addValue(qResult.get(i).get(34 ),"");                                     
				gdRes.getHeader("DAY_33" 	).addValue(qResult.get(i).get(35 ),"");                                     
				gdRes.getHeader("DAY_34" 	).addValue(qResult.get(i).get(36 ),"");                                     
				gdRes.getHeader("DAY_35" 	).addValue(qResult.get(i).get(37 ),"");                                     
				gdRes.getHeader("DAY_36" 	).addValue(qResult.get(i).get(38 ),"");                                     
				gdRes.getHeader("DAY_37" 	).addValue(qResult.get(i).get(39 ),"");                                     
				gdRes.getHeader("DAY_38" 	).addValue(qResult.get(i).get(40 ),"");                                     
				gdRes.getHeader("DAY_39" 	).addValue(qResult.get(i).get(41 ),"");                                     
				gdRes.getHeader("DAY_40" 	).addValue(qResult.get(i).get(42 ),"");                                     
				gdRes.getHeader("DAY_41" 	).addValue(qResult.get(i).get(43 ),"");                                     

				gdRes.getHeader("DAY_42" 	).addValue(qResult.get(i).get(44 ),"");                                     
				gdRes.getHeader("DAY_43" 	).addValue(qResult.get(i).get(45 ),"");                                     
				gdRes.getHeader("DAY_44" 	).addValue(qResult.get(i).get(46 ),"");                                     
				gdRes.getHeader("DAY_45" 	).addValue(qResult.get(i).get(47 ),"");                                     
				gdRes.getHeader("DAY_46" 	).addValue(qResult.get(i).get(48 ),"");                                     
				gdRes.getHeader("DAY_47" 	).addValue(qResult.get(i).get(49 ),"");                                     
				gdRes.getHeader("DAY_48" 	).addValue(qResult.get(i).get(50 ),"");                                     
				gdRes.getHeader("DAY_49" 	).addValue(qResult.get(i).get(51 ),"");                                     
				gdRes.getHeader("DAY_50" 	).addValue(qResult.get(i).get(52 ),"");                                     
				gdRes.getHeader("DAY_51" 	).addValue(qResult.get(i).get(53 ),"");                                     

				gdRes.getHeader("DAY_52" 	).addValue(qResult.get(i).get(54 ),"");                                     
				gdRes.getHeader("DAY_53" 	).addValue(qResult.get(i).get(55 ),"");                                     
				gdRes.getHeader("DAY_54" 	).addValue(qResult.get(i).get(56 ),"");                                     
				gdRes.getHeader("DAY_55" 	).addValue(qResult.get(i).get(57 ),"");                                     
				gdRes.getHeader("DAY_56" 	).addValue(qResult.get(i).get(58 ),"");                                     
				gdRes.getHeader("DAY_57" 	).addValue(qResult.get(i).get(59 ),"");                                     
				gdRes.getHeader("DAY_58" 	).addValue(qResult.get(i).get(60 ),"");                                     
				gdRes.getHeader("DAY_59" 	).addValue(qResult.get(i).get(61 ),"");                                     
				gdRes.getHeader("DAY_60" 	).addValue(qResult.get(i).get(62 ),"");                                     


				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search3");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}            

	// DW 3 조회  쿼리 -- 전년 동일 실적
	public GridData doQuery4(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");                                                            
			                                                                                                                 
			String paramKey   ="item_id";                                                                      
			String paramCode  = item_id;                                                                   
                                                                                                                             
			String query_id   = "ip_02050_Inventory_production_analysis_list_pop_DW4";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search4");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("DAY_00" 	).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("DAY_01" 	).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("DAY_02" 	).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("DAY_03" 	).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("DAY_04" 	).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("DAY_05" 	).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("DAY_06" 	).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("DAY_07" 	).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("DAY_08" 	).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("DAY_09" 	).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("DAY_10" 	).addValue(qResult.get(i).get(11 ),"");                                     

				gdRes.getHeader("DAY_11" 	).addValue(qResult.get(i).get(12 ),"");                                     
				gdRes.getHeader("DAY_12" 	).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("DAY_13" 	).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("DAY_14" 	).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("DAY_15" 	).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("DAY_16" 	).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("DAY_17" 	).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("DAY_18" 	).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("DAY_19" 	).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("DAY_20" 	).addValue(qResult.get(i).get(21 ),"");                                     

				gdRes.getHeader("DAY_21" 	).addValue(qResult.get(i).get(22 ),"");                                     
				gdRes.getHeader("DAY_22" 	).addValue(qResult.get(i).get(23 ),"");                                     
				gdRes.getHeader("DAY_23" 	).addValue(qResult.get(i).get(24 ),"");                                     
				gdRes.getHeader("DAY_24" 	).addValue(qResult.get(i).get(25 ),"");                                     
				gdRes.getHeader("DAY_25" 	).addValue(qResult.get(i).get(26 ),"");                                     
				gdRes.getHeader("DAY_26" 	).addValue(qResult.get(i).get(27 ),"");                                     
				gdRes.getHeader("DAY_27" 	).addValue(qResult.get(i).get(28 ),"");                                     
				gdRes.getHeader("DAY_28" 	).addValue(qResult.get(i).get(29 ),"");                                     
				gdRes.getHeader("DAY_29" 	).addValue(qResult.get(i).get(30 ),"");                                     
				gdRes.getHeader("DAY_30" 	).addValue(qResult.get(i).get(31 ),"");   			
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search4");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}            
	
	
	
}                                                                                                                  