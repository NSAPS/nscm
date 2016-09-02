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
public class ip_07090_EDI_eCvan_Analysis_pop_ecv extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String cnfm_date  	= gdReq.getParam("cnfm_date"); 
			String item_type	= gdReq.getParam("itype");		        
			String gubn			= gdReq.getParam("gubn");	 
			                                                                                                              
			String paramKey   = "cnfm_date!%!item_type!%!gubn";                                                                      
			String paramCode  = cnfm_date+"!%!"+item_type+"!%!"+gubn;                                                                   
		
			                                                                 
			
			String query_id   = "ip_07090_EDI_eCvan_Analysis_pop_list_ecv";                                                             
                                                                                                                             
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
			gdRes.getHeader("CODE_NAME").setComboValues(codeNameList, codeIdList );		//선택구분   콤보리스트 출고 사업장 컬럼에 set
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				
				
				gdRes.getHeader("CNFM_DATE"		).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("CUST_CODE"		).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("EDI_BOX"		).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("DEFAULT_BOX"	).addValue(qResult.get(i).get(6),"");		
				gdRes.getHeader("AMOUNT"		).addValue(qResult.get(i).get(7),"");	
				gdRes.getHeader("DEFAULT_AMOUNT").addValue(qResult.get(i).get(8),"");	
				gdRes.getHeader("DEFAULT_CODE"	).addValue(qResult.get(i).get(9),"");	
				gdRes.getHeader("CODE_NAME"		).addSelectedHiddenValue(qResult.get(i).get(10));                                  

				gdRes.getHeader("DC_ID"			).addValue(qResult.get(i).get(11),"");                                      
				gdRes.getHeader("DC_NAME"		).addValue(qResult.get(i).get(12),"");                                      
				gdRes.getHeader("DEPT_CODE"		).addValue(qResult.get(i).get(13),"");                                      
				gdRes.getHeader("DEPT_NAME"		).addValue(qResult.get(i).get(14),"");                                      
				gdRes.getHeader("HAN_NAME"		).addValue(qResult.get(i).get(15),""); 
				gdRes.getHeader("TEL_NO"		).addValue(qResult.get(i).get(16),""); 
				gdRes.getHeader("BIGO"			).addValue(qResult.get(i).get(17),""); 
				gdRes.getHeader("ALLOC_FLAG"	).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("SELL_STOP_DATE").addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("SPEC"			).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("EDI_GUBN"		).addValue(qResult.get(i).get(21),"");
				gdRes.getHeader("CUST_ITEM_ID"	).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("CUST_STOR_CODE").addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("DEFAULT_GUBN"	).addValue(qResult.get(i).get(24),"");                                                                                                  
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