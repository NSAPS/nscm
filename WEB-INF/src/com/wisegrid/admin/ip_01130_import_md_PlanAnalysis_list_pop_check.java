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
public class ip_01130_import_md_PlanAnalysis_list_pop_check extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;         
	String		sql2	= null;
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
			if (mode.equals("search2")) //                                                                                    
				gdRes = doQuery2(gdReq); 
			if (mode.equals("search3")) //                                                                                    
				gdRes = doQuery3(gdReq); 
			if (mode.equals("save")) // 
			{
				gdRes = doSave(gdReq);
				gdRes = doSave2(gdReq);
			
		}
				
		
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
			                                                                                                                 
			//service_url += "&=" + item_id + "&=" + item_name + "&=" + cnfm_date;
			
			String cnfm_date	= gdReq.getParam("cnfm_date"); 
			String item_id		= gdReq.getParam("item_id");                                                            
			String item_name	= gdReq.getParam("item_name"); 
			String simul_data 	= gdReq.getParam("simul_data"); 
			String three_mon	= gdReq.getParam("three_mon");
			String no_flag		= gdReq.getParam("no_flag");
			String checked_button = gdReq.getParam("checked_button");
			String paramKey   ="item_id!%!item_name!%!cnfm_date!%!simul_data!%!checked_button!%!three_mon!%!no_flag";                                                                      
			String paramCode  = item_id+"!%!"+item_name+"!%!"+cnfm_date+"!%!"+simul_data+"!%!"+checked_button+"!%!"+three_mon+"!%!"+no_flag;
                                                                                                                             
			String query_id   = "ip_01160_PurchaseRequest_Plan_pop";                                                             
                                                                                                                             
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

				//gdRes.getHeader("CRUD" 			).addValue("","");                                
				gdRes.getHeader("GUBN" 			).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("GUBN_IDX" 		).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("AVG" 			).addValue(qResult.get(i).get(2  ),"");
				
				gdRes.getHeader("WEEK_0" 		).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("WEEK_1" 		).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("WEEK_2" 		).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("WEEK_3" 		).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("WEEK_4" 		).addValue(qResult.get(i).get(7 ),"");                                     
				gdRes.getHeader("WEEK_5" 		).addValue(qResult.get(i).get(8 ),"");
				gdRes.getHeader("WEEK_6" 		).addValue(qResult.get(i).get(9 ),"");                                     
				gdRes.getHeader("WEEK_7" 		).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("WEEK_8" 		).addValue(qResult.get(i).get(11 ),"");                                     
				gdRes.getHeader("WEEK_9" 		).addValue(qResult.get(i).get(12 ),""); 
				
				gdRes.getHeader("WEEK_10" 		).addValue(qResult.get(i).get(13 ),"");
				gdRes.getHeader("WEEK_11" 		).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("WEEK_12" 		).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("WEEK_13" 		).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("WEEK_14" 		).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("WEEK_15" 		).addValue(qResult.get(i).get(18 ),""); 
				gdRes.getHeader("WEEK_16" 		).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("WEEK_17" 		).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("WEEK_18" 		).addValue(qResult.get(i).get(21 ),"");                                     
				gdRes.getHeader("WEEK_19" 		).addValue(qResult.get(i).get(22 ),"");
				
				gdRes.getHeader("WEEK_20" 		).addValue(qResult.get(i).get(23 ),"");				
				gdRes.getHeader("WEEK_21" 		).addValue(qResult.get(i).get(24 ),"");                                     
				gdRes.getHeader("WEEK_22" 		).addValue(qResult.get(i).get(25 ),"");                                     
				gdRes.getHeader("WEEK_23" 		).addValue(qResult.get(i).get(26 ),"");                                     
				gdRes.getHeader("WEEK_24" 		).addValue(qResult.get(i).get(27 ),"");                                     
				gdRes.getHeader("WEEK_25" 		).addValue(qResult.get(i).get(28 ),"");				
				gdRes.getHeader("WEEK_26" 		).addValue(qResult.get(i).get(29 ),"");
				gdRes.getHeader("WEEK_27" 		).addValue(qResult.get(i).get(30 ),""); 
				gdRes.getHeader("WEEK_28" 		).addValue(qResult.get(i).get(31 ),""); 
				gdRes.getHeader("WEEK_29" 		).addValue(qResult.get(i).get(32 ),"");
				
				//gdRes.getHeader("CNT_AVG" 		).addValue("","");
				
				gdRes.getHeader("WEEK_30" 		).addValue(qResult.get(i).get(33 ),"");	
				gdRes.getHeader("WEEK_31" 		).addValue(qResult.get(i).get(34  ),"");                                     
				gdRes.getHeader("WEEK_32" 		).addValue(qResult.get(i).get(35  ),"");                                     
				gdRes.getHeader("WEEK_33" 		).addValue(qResult.get(i).get(36  ),"");                                     
				gdRes.getHeader("WEEK_34" 		).addValue(qResult.get(i).get(37  ),"");                                     
				gdRes.getHeader("WEEK_35" 		).addValue(qResult.get(i).get(38 ),"");                                     
				gdRes.getHeader("WEEK_36" 		).addValue(qResult.get(i).get(39 ),"");
				gdRes.getHeader("WEEK_37" 		).addValue(qResult.get(i).get(40 ),"");                                     
				gdRes.getHeader("WEEK_38" 		).addValue(qResult.get(i).get(41 ),"");                                     
				gdRes.getHeader("WEEK_39" 		).addValue(qResult.get(i).get(42 ),"");                                     
				gdRes.getHeader("WEEK_40" 		).addValue(qResult.get(i).get(43 ),"");
				
				gdRes.getHeader("WEEK_41" 		).addValue(qResult.get(i).get(44  ),"");                                     
				gdRes.getHeader("WEEK_42" 		).addValue(qResult.get(i).get(45  ),"");                                     
				gdRes.getHeader("WEEK_43" 		).addValue(qResult.get(i).get(46  ),"");                                     
				gdRes.getHeader("WEEK_44" 		).addValue(qResult.get(i).get(47  ),"");                                     
				gdRes.getHeader("WEEK_45" 		).addValue(qResult.get(i).get(48 ),"");                                     
				gdRes.getHeader("WEEK_46" 		).addValue(qResult.get(i).get(49 ),"");
				gdRes.getHeader("WEEK_47" 		).addValue(qResult.get(i).get(50 ),"");                                     
				gdRes.getHeader("WEEK_48" 		).addValue(qResult.get(i).get(51 ),"");                                     
				gdRes.getHeader("WEEK_49" 		).addValue(qResult.get(i).get(52 ),"");                                     
				gdRes.getHeader("WEEK_50" 		).addValue(qResult.get(i).get(53 ),"");
				
				gdRes.getHeader("WEEK_51" 		).addValue(qResult.get(i).get(54  ),"");                                     
				gdRes.getHeader("WEEK_52" 		).addValue(qResult.get(i).get(55  ),"");                                     
				gdRes.getHeader("WEEK_53" 		).addValue(qResult.get(i).get(56  ),"");                                     
				gdRes.getHeader("WEEK_54" 		).addValue(qResult.get(i).get(57  ),"");                                     
				gdRes.getHeader("WEEK_55" 		).addValue(qResult.get(i).get(58 ),"");                                     
				gdRes.getHeader("WEEK_56" 		).addValue(qResult.get(i).get(59 ),"");
				gdRes.getHeader("WEEK_57" 		).addValue(qResult.get(i).get(60 ),"");                                     
				gdRes.getHeader("WEEK_58" 		).addValue(qResult.get(i).get(61 ),"");                                     
				gdRes.getHeader("WEEK_59" 		).addValue(qResult.get(i).get(62 ),"");                                     
				gdRes.getHeader("WEEK_60" 		).addValue(qResult.get(i).get(63 ),"");
			
				gdRes.getHeader("TP_FLAG" 		).addValue(qResult.get(i).get(64 ),"");
				gdRes.getHeader("TERM" 		).addValue(qResult.get(i).get(65 ),"");
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
			                                                                                                                 
			String item_id		= gdReq.getParam("item_id");  
			String cnfm_date	= gdReq.getParam("cnfm_date"); 
			String paramKey   ="item_id!%!cnfm_date";                                                                      
			String paramCode  = item_id+"!%!"+cnfm_date;                                                                   
                                                                                                                             
			String query_id   = "ip_01130_import_md_PlanAnalysis_list_pop_dw2";                                                             
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
				gdRes.getHeader("WEEK_0" 	).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("WEEK_1" 	).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("WEEK_2" 	).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("WEEK_3" 	).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("WEEK_4" 	).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("WEEK_5" 	).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("WEEK_6" 	).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("WEEK_7" 	).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("WEEK_8" 	).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("WEEK_9" 	).addValue(qResult.get(i).get(11 ),"");                                     
				gdRes.getHeader("WEEK_10" 	).addValue(qResult.get(i).get(12 ),"");                                     

				gdRes.getHeader("WEEK_11" 	).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("WEEK_12" 	).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("WEEK_13" 	).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("WEEK_14" 	).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("WEEK_15" 	).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("WEEK_16" 	).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("WEEK_17" 	).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("WEEK_18" 	).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("WEEK_19" 	).addValue(qResult.get(i).get(21 ),"");                                     
				gdRes.getHeader("WEEK_20" 	).addValue(qResult.get(i).get(22 ),"");                                     

				gdRes.getHeader("WEEK_21" 	).addValue(qResult.get(i).get(23 ),"");                                     
				gdRes.getHeader("WEEK_22" 	).addValue(qResult.get(i).get(24 ),"");                                     
				gdRes.getHeader("WEEK_23" 	).addValue(qResult.get(i).get(25 ),"");                                     
				gdRes.getHeader("WEEK_24" 	).addValue(qResult.get(i).get(26 ),"");                                     
				gdRes.getHeader("WEEK_25" 	).addValue(qResult.get(i).get(27 ),"");                                     
				gdRes.getHeader("WEEK_26" 	).addValue(qResult.get(i).get(28 ),"");                                     
				gdRes.getHeader("WEEK_27" 	).addValue(qResult.get(i).get(29 ),"");                                     
				gdRes.getHeader("WEEK_28" 	).addValue(qResult.get(i).get(30 ),"");                                     
				gdRes.getHeader("WEEK_29" 	).addValue(qResult.get(i).get(31 ),"");                                     
			    //gdRes.getHeader("WEEK_30" 	).addValue(qResult.get(i).get(32 ),"");   				

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
			                                                                                                                 
			String item_id		= gdReq.getParam("item_id");
			String cnfm_date	= gdReq.getParam("cnfm_date"); 
			String paramKey   	="item_id!%!cnfm_date";                                                                      
			String paramCode  	= item_id+"!%!"+cnfm_date;                                                                      
                                                                                                                             
			String query_id   = "ip_01130_import_md_PlanAnalysis_list_pop_dw3";                                                             
                                                                                                                             
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

				gdRes.getHeader("WEEK_0" 	).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("WEEK_1" 	).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("WEEK_2" 	).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("WEEK_3" 	).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("WEEK_4" 	).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("WEEK_5" 	).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("WEEK_6" 	).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("WEEK_7" 	).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("WEEK_8" 	).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("WEEK_9" 	).addValue(qResult.get(i).get(11 ),"");                                     
				gdRes.getHeader("WEEK_10" 	).addValue(qResult.get(i).get(12 ),"");                                     

				gdRes.getHeader("WEEK_11" 	).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("WEEK_12" 	).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("WEEK_13" 	).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("WEEK_14" 	).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("WEEK_15" 	).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("WEEK_16" 	).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("WEEK_17" 	).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("WEEK_18" 	).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("WEEK_19" 	).addValue(qResult.get(i).get(21 ),"");                                     
				gdRes.getHeader("WEEK_20" 	).addValue(qResult.get(i).get(22 ),"");                                     

				gdRes.getHeader("WEEK_21" 	).addValue(qResult.get(i).get(23 ),"");                                     
				gdRes.getHeader("WEEK_22" 	).addValue(qResult.get(i).get(24 ),"");                                     
				gdRes.getHeader("WEEK_23" 	).addValue(qResult.get(i).get(25 ),"");                                     
				gdRes.getHeader("WEEK_24" 	).addValue(qResult.get(i).get(26 ),"");                                     
				gdRes.getHeader("WEEK_25" 	).addValue(qResult.get(i).get(27 ),"");                                     
				gdRes.getHeader("WEEK_26" 	).addValue(qResult.get(i).get(28 ),"");                                     
				gdRes.getHeader("WEEK_27" 	).addValue(qResult.get(i).get(29 ),"");                                     
				gdRes.getHeader("WEEK_28" 	).addValue(qResult.get(i).get(30 ),"");                                     
				gdRes.getHeader("WEEK_29" 	).addValue(qResult.get(i).get(31 ),"");                                     
				gdRes.getHeader("WEEK_30" 	).addValue(qResult.get(i).get(32 ),"");   		
				
				gdRes.getHeader("WEEK_31" 	).addValue(qResult.get(i).get(33 ),"");                                     
				gdRes.getHeader("WEEK_32" 	).addValue(qResult.get(i).get(34 ),"");                                     
				gdRes.getHeader("WEEK_33" 	).addValue(qResult.get(i).get(35 ),"");                                     
				gdRes.getHeader("WEEK_34" 	).addValue(qResult.get(i).get(36 ),"");                                     
				gdRes.getHeader("WEEK_35" 	).addValue(qResult.get(i).get(37 ),"");                                     
				gdRes.getHeader("WEEK_36" 	).addValue(qResult.get(i).get(38 ),"");                                     
				gdRes.getHeader("WEEK_37" 	).addValue(qResult.get(i).get(39 ),"");                                     
				gdRes.getHeader("WEEK_38" 	).addValue(qResult.get(i).get(40 ),"");                                     
				gdRes.getHeader("WEEK_39" 	).addValue(qResult.get(i).get(41 ),"");                                     
				gdRes.getHeader("WEEK_40" 	).addValue(qResult.get(i).get(42 ),"");                                     
				gdRes.getHeader("WEEK_41" 	).addValue(qResult.get(i).get(43 ),"");                                     

				gdRes.getHeader("WEEK_42" 	).addValue(qResult.get(i).get(44 ),"");                                     
				gdRes.getHeader("WEEK_43" 	).addValue(qResult.get(i).get(45 ),"");                                     
				gdRes.getHeader("WEEK_44" 	).addValue(qResult.get(i).get(46 ),"");                                     
				gdRes.getHeader("WEEK_45" 	).addValue(qResult.get(i).get(47 ),"");                                     
				gdRes.getHeader("WEEK_46" 	).addValue(qResult.get(i).get(48 ),"");                                     
				gdRes.getHeader("WEEK_47" 	).addValue(qResult.get(i).get(49 ),"");                                     
				gdRes.getHeader("WEEK_48" 	).addValue(qResult.get(i).get(50 ),"");                                     
				gdRes.getHeader("WEEK_49" 	).addValue(qResult.get(i).get(51 ),"");                                     
				gdRes.getHeader("WEEK_50" 	).addValue(qResult.get(i).get(52 ),"");                                     
				gdRes.getHeader("WEEK_51" 	).addValue(qResult.get(i).get(53 ),"");                                     

				gdRes.getHeader("WEEK_52" 	).addValue(qResult.get(i).get(54 ),"");                                     
				gdRes.getHeader("WEEK_53" 	).addValue(qResult.get(i).get(55 ),"");                                     
				gdRes.getHeader("WEEK_54" 	).addValue(qResult.get(i).get(56 ),"");                                     
				gdRes.getHeader("WEEK_55" 	).addValue(qResult.get(i).get(57 ),"");                                     
				gdRes.getHeader("WEEK_56" 	).addValue(qResult.get(i).get(58 ),"");                                     
				gdRes.getHeader("WEEK_57" 	).addValue(qResult.get(i).get(59 ),"");                                     
				gdRes.getHeader("WEEK_58" 	).addValue(qResult.get(i).get(60 ),"");                                     
				gdRes.getHeader("WEEK_59" 	).addValue(qResult.get(i).get(61 ),"");                                     
				gdRes.getHeader("WEEK_60" 	).addValue(qResult.get(i).get(62 ),"");
				  
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search3");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	} 
	
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		

		try {

			rowCount = gdReq.getHeader("WEEK_30").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
			String 	cnfm_date 	= gdReq.getParam("cnfm_date");						
			String 	item_id		= gdReq.getParam("item_id");
			String	reason		= gdReq.getParam("reason");
			String	user_id		= gdReq.getParam("user_id");
			String	tp_flag		= gdReq.getParam("tp_flag");
			String	order_qty	= gdReq.getParam("order_qty");
			
			sql   = "MERGE INTO IMPORT_MD_EXPECT MD	 /*+ bypass_ujvc*/       	 \n";
			sql  += "USING(							                     		 \n";
			
						//---------------------------------------------------------------------------------------
					sql += "	SELECT	'" + 	item_id 	+ 										"'	ITEM_ID,				\n"; 
					sql += "			'" + 	cnfm_date  	+ 										"'	VERSION,				\n";
					sql += "			'" + 	reason  	+ 										"'	REASON,					\n";
					sql += "			'" + 	user_id  	+ 										"'	USER_ID,				\n";
					sql += "			'" + 	tp_flag  	+ 										"'	TP_FLAG,				\n";
					sql += "			'" + 	order_qty  	+ 										"'	ORDER_QTY,				\n";
					sql += "								'1'											GUBN,					\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_30"	).getValue(2) +	 		"'	AS WEEK,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_31"	).getValue(2) +	 		"'	AS WEEK_01,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_32"	).getValue(2) +	 		"'	AS WEEK_02,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_33"	).getValue(2) +	 		"'	AS WEEK_03,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_34"	).getValue(2) +	 		"'	AS WEEK_04,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_35"	).getValue(2) +	 		"'	AS WEEK_05,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_36"	).getValue(2) +	 		"'	AS WEEK_06,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_37"	).getValue(2) +	 		"'	AS WEEK_07,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_38"	).getValue(2) +	 		"'	AS WEEK_08,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_39"	).getValue(2) +	 		"'	AS WEEK_09,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_40"	).getValue(2) +	 		"'	AS WEEK_10,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_41"	).getValue(2) +	 		"'	AS WEEK_11,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_42"	).getValue(2) +	 		"'	AS WEEK_12,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_43"	).getValue(2) +	 		"'	AS WEEK_13,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_44"	).getValue(2) +	 		"'	AS WEEK_14,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_45"	).getValue(2) +	 		"'	AS WEEK_15,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_46"	).getValue(2) +	 		"'	AS WEEK_16,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_47"	).getValue(2) +	 		"'	AS WEEK_17,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_48"	).getValue(2) +	 		"'	AS WEEK_18,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_49"	).getValue(2) +	 		"'	AS WEEK_19,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_50"	).getValue(2) +	 		"'	AS WEEK_20,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_51"	).getValue(2) +	 		"'	AS WEEK_21,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_52"	).getValue(2) +	 		"'	AS WEEK_22,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_53"	).getValue(2) +	 		"'	AS WEEK_23,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_54"	).getValue(2) +	 		"'	AS WEEK_24,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_55"	).getValue(2) +	 		"'	AS WEEK_25,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_56"	).getValue(2) +	 		"'	AS WEEK_26,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_57"	).getValue(2) +	 		"'	AS WEEK_27,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_58"	).getValue(2) +	 		"'	AS WEEK_28,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_59"	).getValue(2) +	 		"'	AS WEEK_29,				\n";
					sql += "		'"	+		gdReq.getHeader("WEEK_60"	).getValue(2) +	 		"'	AS WEEK_30	FROM DUAL	\n";
	               //--------------------------------------------------------------------------------------------
				
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") MD1 														\n";
			sql += "ON (MD.VERSION    		= MD1.VERSION    					\n";
			sql += "AND MD.GUBN     		= MD1.GUBN         					\n";
			sql += "AND MD.ITEM_ID     		= MD1.ITEM_ID)         				\n";
			sql += "when matched then update set            					\n";
			sql += "     MD.REASON      	= MD1.REASON,   					\n";
			sql += "     MD.MADE_DTTM      	= SYSDATE,   						\n";
			sql += "     MD.MADE_BY      	= MD1.USER_ID,   					\n";
			sql += "     MD.TP_FLAG      	= MD1.TP_FLAG,   					\n";
			sql += "     MD.ORDER_QTY      	= MD1.ORDER_QTY,   					\n";
			sql += "     MD.WEEK      		= MD1.WEEK,   					   	\n";
			sql += "     MD.WEEK_01      	= MD1.WEEK_01,   					\n";
			sql += "     MD.WEEK_02     	= MD1.WEEK_02,   					\n";
			sql += "     MD.WEEK_03      	= MD1.WEEK_03,   					\n";
			sql += "     MD.WEEK_04      	= MD1.WEEK_04,   					\n";
			sql += "     MD.WEEK_05      	= MD1.WEEK_05,   					\n";
			sql += "     MD.WEEK_06      	= MD1.WEEK_06,   					\n";
			sql += "     MD.WEEK_07     	= MD1.WEEK_07,   					\n";
			sql += "     MD.WEEK_08      	= MD1.WEEK_08,   					\n";
			sql += "     MD.WEEK_09      	= MD1.WEEK_09,   					\n";
			sql += "     MD.WEEK_10      	= MD1.WEEK_10,   					\n";
			sql += "     MD.WEEK_11      	= MD1.WEEK_11,   					\n";
			sql += "     MD.WEEK_12     	= MD1.WEEK_12,   					\n";
			sql += "     MD.WEEK_13      	= MD1.WEEK_13,   					\n";
			sql += "     MD.WEEK_14      	= MD1.WEEK_14,   					\n";
			sql += "     MD.WEEK_15      	= MD1.WEEK_15,   					\n";
			sql += "     MD.WEEK_16      	= MD1.WEEK_16,   					\n";
			sql += "     MD.WEEK_17     	= MD1.WEEK_17,   					\n";
			sql += "     MD.WEEK_18      	= MD1.WEEK_18,   					\n";
			sql += "     MD.WEEK_19      	= MD1.WEEK_19,   					\n";
			sql += "     MD.WEEK_20      	= MD1.WEEK_20,   					\n";
			sql += "     MD.WEEK_21      	= MD1.WEEK_21,   					\n";
			sql += "     MD.WEEK_22     	= MD1.WEEK_22,   					\n";
			sql += "     MD.WEEK_23      	= MD1.WEEK_23,   					\n";
			sql += "     MD.WEEK_24      	= MD1.WEEK_24,   					\n";
			sql += "     MD.WEEK_25      	= MD1.WEEK_25,   					\n";
			sql += "     MD.WEEK_26      	= MD1.WEEK_26,   					\n";
			sql += "     MD.WEEK_27     	= MD1.WEEK_27,   					\n";
			sql += "     MD.WEEK_28      	= MD1.WEEK_28,   					\n";
			sql += "     MD.WEEK_29      	= MD1.WEEK_29,   					\n";
			sql += "     MD.WEEK_30      	= MD1.WEEK_30  						\n";
			
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			
		
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);			
			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "doSave");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
	        databaseUtility.close(conn, stmt, rs);              
	    	}

		System.out.println("doSave() end!!!");

		return gdRes;
		}	
	
	public GridData doSave2(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		

		try {

			rowCount = gdReq.getHeader("WEEK_30").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
			String 	cnfm_date 	= gdReq.getParam("cnfm_date");						
			String 	item_id		= gdReq.getParam("item_id");
			String	reason		= gdReq.getParam("reason");		
			String	user_id		= gdReq.getParam("user_id");
			String	tp_flag		= gdReq.getParam("tp_flag");
			String	order_qty	= gdReq.getParam("order_qty");
		
			
			sql2   = "MERGE INTO IMPORT_MD_EXPECT MD	 /*+ bypass_ujvc*/       	 \n";
			sql2  += "USING(							                     		 \n";
			
						//---------------------------------------------------------------------------------------
					sql2 += "	SELECT	'" + 	item_id 	+ 										"'	ITEM_ID,				\n"; 
					sql2 += "			'" + 	cnfm_date  	+ 										"'	VERSION,				\n";
					sql2 += "			'" + 	reason  	+ 										"'	REASON,					\n";
					sql2 += "			'" + 	user_id  	+ 										"'	USER_ID,				\n";
					sql2 += "			'" + 	tp_flag  	+ 										"'	TP_FLAG,				\n";
					sql2 += "			'" + 	order_qty  	+ 										"'	ORDER_QTY,				\n";
					sql2 += "								'2'											GUBN,					\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_30"	).getValue(1) +	 		"'	AS WEEK,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_31"	).getValue(1) +	 		"'	AS WEEK_01,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_32"	).getValue(1) +	 		"'	AS WEEK_02,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_33"	).getValue(1) +	 		"'	AS WEEK_03,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_34"	).getValue(1) +	 		"'	AS WEEK_04,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_35"	).getValue(1) +	 		"'	AS WEEK_05,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_36"	).getValue(1) +	 		"'	AS WEEK_06,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_37"	).getValue(1) +	 		"'	AS WEEK_07,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_38"	).getValue(1) +	 		"'	AS WEEK_08,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_39"	).getValue(1) +	 		"'	AS WEEK_09,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_40"	).getValue(1) +	 		"'	AS WEEK_10,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_41"	).getValue(1) +	 		"'	AS WEEK_11,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_42"	).getValue(1) +	 		"'	AS WEEK_12,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_43"	).getValue(1) +	 		"'	AS WEEK_13,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_44"	).getValue(1) +	 		"'	AS WEEK_14,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_45"	).getValue(1) +	 		"'	AS WEEK_15,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_46"	).getValue(1) +	 		"'	AS WEEK_16,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_47"	).getValue(1) +	 		"'	AS WEEK_17,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_48"	).getValue(1) +	 		"'	AS WEEK_18,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_49"	).getValue(1) +	 		"'	AS WEEK_19,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_50"	).getValue(1) +	 		"'	AS WEEK_20,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_51"	).getValue(1) +	 		"'	AS WEEK_21,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_52"	).getValue(1) +	 		"'	AS WEEK_22,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_53"	).getValue(1) +	 		"'	AS WEEK_23,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_54"	).getValue(1) +	 		"'	AS WEEK_24,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_55"	).getValue(1) +	 		"'	AS WEEK_25,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_56"	).getValue(1) +	 		"'	AS WEEK_26,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_57"	).getValue(1) +	 		"'	AS WEEK_27,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_58"	).getValue(1) +	 		"'	AS WEEK_28,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_59"	).getValue(1) +	 		"'	AS WEEK_29,				\n";
					sql2 += "		'"	+		gdReq.getHeader("WEEK_60"	).getValue(1) +	 		"'	AS WEEK_30	FROM DUAL	\n";
	               //--------------------------------------------------------------------------------------------
				
						
			//-----------------------------Merge Into 2----------------------------------------------------------------------------------
			sql2 += ") MD1 														\n";
			sql2 += "ON (MD.VERSION    		= MD1.VERSION    					\n";
			sql2 += "AND MD.GUBN     		= MD1.GUBN         					\n";
			sql2 += "AND MD.ITEM_ID     	= MD1.ITEM_ID)         				\n";
			sql2 += "when matched then update set            					\n";
			sql2 += "     MD.REASON      	= MD1.REASON,   					\n";
			sql2 += "     MD.WEEK      		= MD1.WEEK,   					   	\n";
			sql2 += "     MD.MADE_DTTM      = SYSDATE,   						\n";
			sql2 += "     MD.MADE_BY      	= MD1.USER_ID,   					\n";	
			sql2 += "     MD.TP_FLAG      	= MD1.TP_FLAG,   					\n";
			sql2 += "     MD.ORDER_QTY      = MD1.ORDER_QTY,   					\n";
			sql2 += "     MD.WEEK_01      	= MD1.WEEK_01,   					\n";
			sql2 += "     MD.WEEK_02     	= MD1.WEEK_02,   					\n";
			sql2 += "     MD.WEEK_03      	= MD1.WEEK_03,   					\n";
			sql2 += "     MD.WEEK_04      	= MD1.WEEK_04,   					\n";
			sql2 += "     MD.WEEK_05      	= MD1.WEEK_05,   					\n";
			sql2 += "     MD.WEEK_06      	= MD1.WEEK_06,   					\n";
			sql2 += "     MD.WEEK_07     	= MD1.WEEK_07,   					\n";
			sql2 += "     MD.WEEK_08      	= MD1.WEEK_08,   					\n";
			sql2 += "     MD.WEEK_09      	= MD1.WEEK_09,   					\n";
			sql2 += "     MD.WEEK_10      	= MD1.WEEK_10,   					\n";
			sql2 += "     MD.WEEK_11      	= MD1.WEEK_11,   					\n";
			sql2 += "     MD.WEEK_12     	= MD1.WEEK_12,   					\n";
			sql2 += "     MD.WEEK_13      	= MD1.WEEK_13,   					\n";
			sql2 += "     MD.WEEK_14      	= MD1.WEEK_14,   					\n";
			sql2 += "     MD.WEEK_15      	= MD1.WEEK_15,   					\n";
			sql2 += "     MD.WEEK_16      	= MD1.WEEK_16,   					\n";
			sql2 += "     MD.WEEK_17     	= MD1.WEEK_17,   					\n";
			sql2 += "     MD.WEEK_18      	= MD1.WEEK_18,   					\n";
			sql2 += "     MD.WEEK_19      	= MD1.WEEK_19,   					\n";
			sql2 += "     MD.WEEK_20      	= MD1.WEEK_20,   					\n";
			sql2 += "     MD.WEEK_21      	= MD1.WEEK_21,   					\n";
			sql2 += "     MD.WEEK_22     	= MD1.WEEK_22,   					\n";
			sql2 += "     MD.WEEK_23      	= MD1.WEEK_23,   					\n";
			sql2 += "     MD.WEEK_24      	= MD1.WEEK_24,   					\n";
			sql2 += "     MD.WEEK_25      	= MD1.WEEK_25,   					\n";
			sql2 += "     MD.WEEK_26      	= MD1.WEEK_26,   					\n";
			sql2 += "     MD.WEEK_27     	= MD1.WEEK_27,   					\n";
			sql2 += "     MD.WEEK_28      	= MD1.WEEK_28,   					\n";
			sql2 += "     MD.WEEK_29      	= MD1.WEEK_29,   					\n";
			sql2 += "     MD.WEEK_30      	= MD1.WEEK_30  						\n";
				
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
		
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql2);
			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "doSave");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
	        databaseUtility.close(conn, stmt, rs);              
	    	}

		System.out.println("doSave2() end!!!");

		return gdRes;
		}	

}                                                                                                                  