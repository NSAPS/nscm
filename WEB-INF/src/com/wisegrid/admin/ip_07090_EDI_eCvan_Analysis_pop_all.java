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
public class ip_07090_EDI_eCvan_Analysis_pop_all extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String start_date  	= gdReq.getParam("start_date"); 
			String end_date  	= gdReq.getParam("end_date"); 
			String item_type	= gdReq.getParam("item_type");		        
			String default_code_ns = gdReq.getParam("default_code_ns");
			                                                                                                              
			String paramKey   = "start_date!%!end_date!%!item_type!%!default_code_ns";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+item_type+"!%!"+default_code_ns;                                                                   
		
			                                                                 
			
			String query_id   = "ip_07090_EDI_eCvan_Analysis_pop_list_all";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			    
			/*선택구분 리스트를 추출하여 콤보리스트 생성 */
			String query_id2 = "ip_02120_Edi_Default_NS_combo"; 
			System.out.println("getSelQeury : " + query_id2);
			ArrayList<ArrayList<String>> comboList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = comboList.size();
			
			String[] codeIdList = new String[arrIdx];
			String[] codeNameList = new String[arrIdx];
			
			System.out.println("콤보리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				codeIdList[i] 	= comboList.get(i).get(0);   //선택구분 ID 콤보리스트 생성
				codeNameList[i] = comboList.get(i).get(1); // 선택구분 이름 콤보리스트 생성
			}
			
			System.out.println("콤보리스트 set");
			gdRes.getHeader("DEFAULT_CODE_NS").setComboValues(codeNameList, codeIdList );		//선택구분   콤보리스트 출고 사업장 컬럼에 set
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				
				
				gdRes.getHeader("CNFM_DATE"		).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("CUST_CODE"		).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("EDI_BOX"		).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("SELL_BOX"		).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("DEFAULT_BOX"	).addValue(qResult.get(i).get(7),"");				
				gdRes.getHeader("DEFAULT_CODE_NS"			).addSelectedHiddenValue(qResult.get(i).get(8));                                  

				gdRes.getHeader("DC_ID"			).addValue(qResult.get(i).get(9),"");                                      
				gdRes.getHeader("DC_NAME"		).addValue(qResult.get(i).get(10),"");                                      
				gdRes.getHeader("DEPT_CODE"		).addValue(qResult.get(i).get(11),"");                                      
				gdRes.getHeader("DEPT_NAME"		).addValue(qResult.get(i).get(12),"");                                      
				gdRes.getHeader("HAN_NAME"		).addValue(qResult.get(i).get(13),""); 
				gdRes.getHeader("BIGO"			).addValue(qResult.get(i).get(14),""); 
		                                                                                                          
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
	        
			String start_date  	= gdReq.getParam("start_date"); 
			String end_date  	= gdReq.getParam("end_date"); 
			String item_type	= gdReq.getParam("item_type");		        
			String default_code_ns = gdReq.getParam("default_code_ns");
			                                                                                                              
			String paramKey   = "start_date!%!end_date!%!item_type!%!default_code_ns";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+item_type+"!%!"+default_code_ns;                                                                   
		
			                                                                 
			
			String query_id   = "ip_07090_EDI_eCvan_Analysis_pop_list_all2";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			    
			/*선택구분 리스트를 추출하여 콤보리스트 생성 */
			String query_id2 = "ip_02120_Edi_Default_NS_combo"; 
			System.out.println("getSelQeury : " + query_id2);
			ArrayList<ArrayList<String>> comboList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = comboList.size();
			
			String[] codeIdList = new String[arrIdx];
			String[] codeNameList = new String[arrIdx];
			
			System.out.println("콤보리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				codeIdList[i] 	= comboList.get(i).get(0);   //선택구분 ID 콤보리스트 생성
				codeNameList[i] = comboList.get(i).get(1); // 선택구분 이름 콤보리스트 생성
			}
			
			System.out.println("콤보리스트 set");
			gdRes.getHeader("DEFAULT_CODE_NS").setComboValues(codeNameList, codeIdList );		//선택구분   콤보리스트 출고 사업장 컬럼에 set
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				
				
				gdRes.getHeader("CNFM_DATE"		).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("CUST_CODE"		).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("EDI_BOX"		).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("SELL_BOX"		).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("DEFAULT_BOX"	).addValue(qResult.get(i).get(7),"");				
				gdRes.getHeader("DEFAULT_CODE_NS"			).addSelectedHiddenValue(qResult.get(i).get(8));                                  

				gdRes.getHeader("DC_ID"			).addValue(qResult.get(i).get(9),"");                                      
				gdRes.getHeader("DC_NAME"		).addValue(qResult.get(i).get(10),"");                                      
				gdRes.getHeader("DEPT_CODE"		).addValue(qResult.get(i).get(11),"");                                      
				gdRes.getHeader("DEPT_NAME"		).addValue(qResult.get(i).get(12),"");                                      
				gdRes.getHeader("HAN_NAME"		).addValue(qResult.get(i).get(13),""); 
				gdRes.getHeader("BIGO"			).addValue(qResult.get(i).get(14),""); 
		                                                                                                          
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode2", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	} 
		
	
}                                                                                                                            