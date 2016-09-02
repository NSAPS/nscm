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
public class op_02010_Long_Term_Planning_list extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;                                                                                              
	String 		sql2 	= null;                                                                                              
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
			else if (mode.equals("search2")) //                                                                               
				gdRes = doQuery2(gdReq);                                                                                     
			else if (mode.equals("search3")) //                                                                               
				gdRes = doQuery3(gdReq);
			else if (mode.equals("search4")) //                                                                               
				gdRes = doQuery4(gdReq);
			else if (mode.equals("search5")) //                                                                               
				gdRes = doQuery5(gdReq);
			else if (mode.equals("search6")) //                                                                               
				gdRes = doQuery6(gdReq);
			else if (mode.equals("search7")) //                                                                               
				gdRes = doQuery7(gdReq);
			else if (mode.equals("save")) //                                                                               
				gdRes = doSave(gdReq);
			else if (mode.equals("ExePlan")) //                                                                               
				gdRes = doExePlan(gdReq);
			else if (mode.equals("delete")) //                                                                               
				gdRes = doDelete(gdReq);
			else if (mode.equals("doIf")) //                                                                               
				gdRes = doIf(gdReq);
			
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

		GridData gdRes	= new GridData();
		int rowCount	= 0;

		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_type	= gdReq.getParam("item_type");                                                            
			String edit_flag	= gdReq.getParam("edit_flag");                                                            
			String version		= gdReq.getParam("version"); 
			String domain		= gdReq.getParam("domain"); 
			                                                                                                                 
			String paramKey   	=	"version!%!item_type!%!edit_flag!%!domain";                                                                      
			String paramCode  	= version+"!%!"+item_type+"!%!"+edit_flag+"!%!"+domain;
                                                                                                                             
			String query_id   	= "op_02010_Long_Term_Planning_list_dw1";                                                             
                                                                                                                             
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
			String query_id2 = "sel_dmd_list"; 
			System.out.println("getSelQeury : " + query_id2);
			ArrayList<ArrayList<String>> selDmdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = selDmdList.size();
			
			String[] selDmdIdList	= new String[arrIdx];
			String[] selDmdNameList = new String[arrIdx];
			
			System.out.println("출고 사업장 콤보리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				selDmdIdList[i]		= selDmdList.get(i).get(0);   //선택구분 ID 콤보리스트 생성
				selDmdNameList[i]	= selDmdList.get(i).get(1); // 선택구분 이름 콤보리스트 생성
			}
			
			System.out.println("출고 사업장 컬럼에 콤보리스트 set");
			gdRes.getHeader("SEL_DMD").setComboValues(selDmdNameList, selDmdIdList );		//선택구분   콤보리스트 출고 사업장 컬럼에 set
			
			
			
			
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("CRUD"					).addValue( "", "");
				gdRes.getHeader("SELECTED"				).addValue("0", "");                    
				gdRes.getHeader("ITEM_ID"				).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("ITEM_NAME" 			).addValue(qResult.get(i).get(1), "");                                     
				gdRes.getHeader("TERM_VAL" 				).addValue(qResult.get(i).get(2), "");                                     
				gdRes.getHeader("LEAD_TIME" 			).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("BASE_UOM" 				).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("BASE_STOCK" 			).addValue(qResult.get(i).get(5), "");                                     
				gdRes.getHeader("PROG_STOCK" 			).addValue(qResult.get(i).get(6), "");                                     
				gdRes.getHeader("TOT_STOCK" 			).addValue(qResult.get(i).get(7), "");                                     
				gdRes.getHeader("SEL_DMD" 				).addSelectedHiddenValue(qResult.get(i).get(8));//출고사업장
				gdRes.getHeader("STD_STOCK" 			).addValue(qResult.get(i).get(9), "");                                     
				gdRes.getHeader("SAFETY_STOCK" 			).addValue(qResult.get(i).get(10),"");                                     
				gdRes.getHeader("SAFETY_FACTOR" 		).addValue(qResult.get(i).get(11),"");                                     
				gdRes.getHeader("AVG_QTY" 				).addValue(qResult.get(i).get(12),"");                                     
				gdRes.getHeader("STD_DEV" 				).addValue(qResult.get(i).get(13),"");                                     
				gdRes.getHeader("SALES_MEAN_3MONTH" 	).addValue(qResult.get(i).get(14),"");                                     
				gdRes.getHeader("LAST_YEAR" 			).addValue(qResult.get(i).get(15),"");                                     
				gdRes.getHeader("USE_CUM_MONTH" 		).addValue(qResult.get(i).get(16),"");                                     
				gdRes.getHeader("MIN_LOT_SIZE" 			).addValue(qResult.get(i).get(17),"");                                     
				gdRes.getHeader("PR_DATE_NO" 			).addValue(qResult.get(i).get(18),"");                                     
				gdRes.getHeader("PR_QTY" 				).addValue(qResult.get(i).get(19),"");                                     
				gdRes.getHeader("ENTR_DATE" 			).addValue(qResult.get(i).get(20),"");                                     
				gdRes.getHeader("EDIT_FLAG" 			).addValue(qResult.get(i).get(21),"");                                     
				gdRes.getHeader("IF_FLAG" 				).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("PR_NO"					).addValue(qResult.get(i).get(23),"");                                      
				gdRes.getHeader("IF_MSGS"				).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("TOT_LEAD_TIME"			).addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("ITYPE"					).addValue(qResult.get(i).get(26),"");
				gdRes.getHeader("MSG"					).addValue(qResult.get(i).get(27),"");
				gdRes.getHeader("SEQ"					).addValue(qResult.get(i).get(28),"");
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	// DW 2 조회  쿼리
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			                                                                                                                 
			String paramKey		=	"item_id";                                                                      
			String paramCode	=	item_id;                                                                   
                                                                                                                             
			String query_id		=	"op_02010_Long_Term_Planning_list_dw2";                                                             
                                                                                                                             
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

				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1), "");                                     
				gdRes.getHeader("PR_NO"		).addValue(qResult.get(i).get(2), "");                                      
				gdRes.getHeader("PR_REL"	).addValue(qResult.get(i).get(3), "");                                      
				gdRes.getHeader("PR_QTY"	).addValue(qResult.get(i).get(4), "");                                      
				gdRes.getHeader("PO_NO"		).addValue(qResult.get(i).get(5), "");                                      
				gdRes.getHeader("PO_SEQ"	).addValue(qResult.get(i).get(6), "");                                      
				gdRes.getHeader("PO_DATE"	).addValue(qResult.get(i).get(7), "");                                      
				gdRes.getHeader("PO_QTY"	).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("BL_DATE"	).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("CREDIT"	).addValue(qResult.get(i).get(10), "");                                      
				gdRes.getHeader("UNSHIP_QTY").addValue(qResult.get(i).get(11),"");                                      
				gdRes.getHeader("SHIP_QTY"	).addValue(qResult.get(i).get(12),"");                                      
				gdRes.getHeader("BL_NO"		).addValue(qResult.get(i).get(13),"");                                      
				gdRes.getHeader("PORT"		).addValue(qResult.get(i).get(14),"");                                      
				gdRes.getHeader("TONG"		).addValue(qResult.get(i).get(15),"");                                      
				gdRes.getHeader("IPGO"		).addValue(qResult.get(i).get(16),""); 
				gdRes.getHeader("REAL_IPGO"	).addValue(qResult.get(i).get(17),"");  
				gdRes.getHeader("DATE_FLAG"	).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("STATUS"	).addValue(qResult.get(i).get(19),"");
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                	
	
	
	//하단 그리드 WD3 조회 쿼리
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes	= new GridData();		                                                                             
		int rowCount	= 0;                                                                                                    

		System.out.println("search3() start!!!");
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			String version		=	gdReq.getParam("version");                                                            
			String sel_dmd		=	gdReq.getParam("sel_dmd");
			String std_stock	=	gdReq.getParam("std_stock");
			                                                                                                                 
			String paramKey		=	"version!%!item_id!%!sel_dmd!%!std_stock";                                                                      
			String paramCode	=	version+"!%!"+item_id+"!%!"+sel_dmd+"!%!"+std_stock;                                                                  
                                                                                                                             
			String query_id		=	"op_02010_Long_Term_Planning_list_dw3";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search3");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			System.out.println(rowCount);
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("SEL_GUBN"	).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("SEL_NAME"	).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("MON_P15"	).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("MON_P14"	).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("MON_P13"	).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("MON_P12"	).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("MON_P11"	).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("MON_P10"	).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("MON_P09"	).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("MON_P08"	).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("MON_P07"	).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("MON_P06"	).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("MON_P05"	).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("MON_P04"	).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("MON_P03"	).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("MON_P02"	).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("MON_P01"	).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("MON_M00"	).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("MON_M01"	).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("MON_M02"	).addValue(qResult.get(i).get(21),"");
				gdRes.getHeader("MON_M03"	).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("MON_M04"	).addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("MON_M05"	).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("MON_M06"	).addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("TP_FLAG"	).addValue(qResult.get(i).get(26),"");
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search3");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}     

	// DW 4 조회  쿼리
	public GridData doQuery4(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			String itype		=	gdReq.getParam("itype");
			String query_id		=	gdReq.getParam("query_id");
			
			                                                                                                                 
			String paramKey		=	"item_id!%!itype";                                                                      
			String paramCode	=	item_id+"!%!"+itype;                                                                   

			System.out.println("query_id"+query_id);
                                                                                                                             
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
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1), "");                                     
				gdRes.getHeader("MM_0_QTY"	).addValue(qResult.get(i).get(2), "");                                      
				gdRes.getHeader("MM_1_QTY"	).addValue(qResult.get(i).get(3), "");                                      
				gdRes.getHeader("MM_2_QTY"	).addValue(qResult.get(i).get(4), "");                                      
				gdRes.getHeader("MM_3_QTY"	).addValue(qResult.get(i).get(5), "");                                      
				gdRes.getHeader("MM_4_QTY"	).addValue(qResult.get(i).get(6), "");                                      
				gdRes.getHeader("MM_5_QTY"	).addValue(qResult.get(i).get(7), "");                                      
				gdRes.getHeader("MM_6_QTY"	).addValue(qResult.get(i).get(8), "");                                      
				gdRes.getHeader("MM_7_QTY"	).addValue(qResult.get(i).get(9), "");                                      
				gdRes.getHeader("MM_8_QTY"	).addValue(qResult.get(i).get(10),"");                                      
				gdRes.getHeader("MM_9_QTY"	).addValue(qResult.get(i).get(11),"");                                      
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search4");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                      
	
	// DW 5 조회  쿼리
	public GridData doQuery5(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes	= new GridData();		                                                                             
		int rowCount	= 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			                                                                                                                 
			String paramKey		=	"item_id";                                                                      
			String paramCode	=	item_id;                                                                   
                                                                                                                             
			String query_id		=	"op_02010_Long_Term_Planning_list_dw5";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search5");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("QTY"		).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("YYYY_MM"	).addValue(qResult.get(i).get(4),"");                                      
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search5");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}             

	// DW 6 조회  쿼리
	public GridData doQuery6(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes	= new GridData();		                                                                             
		int rowCount	= 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			String itype		=	gdReq.getParam("itype");                                                            
            
			String paramKey		=	"item_id!%!itype";                                                                      
			String paramCode	=	item_id+"!%!"+itype;                                                                   
                                                               
                                                                                                                             
			String query_id		=	"op_02010_Long_Term_Planning_list_dw6";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search6");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("PLANT"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("MADE_DATE"	).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("END_DATE"	).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("TERM"		).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("QTY"		).addValue(qResult.get(i).get(6),"");                                      
				gdRes.getHeader("FLAG"		).addValue(qResult.get(i).get(8),"");                                      
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search6");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}        
	
	// DW 7 조회  쿼리
	public GridData doQuery7(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			String from_mm		=	gdReq.getParam("from_mm");                                                            
			String to_mm		=	gdReq.getParam("to_mm");                                                            
			String serch_flag	=	gdReq.getParam("serch_flag");                                                            
			                                                                                                                 
			String paramKey		=	"item_id!%!from_mm!%!to_mm!%!serch_flag";                                                                      
			String paramCode	=	item_id+"!%!"+from_mm+"!%!"+to_mm+"!%!"+serch_flag;                                                                    
                                                                                                                             
			String query_id		=	"op_02010_Long_Term_Planning_list_dw7";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search7");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("CONS_ITEM_ID"	).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("CONS_ITEM_NAME").addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("ITEM_NAME" 	).addValue(qResult.get(i).get(3),"");                                     
				gdRes.getHeader("PROD_QTY"		).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("USE_QTY"		).addValue(qResult.get(i).get(5),"");                                      
                                     
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search7");		                                                                         
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
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Save");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			String sql, inner_sql, sql2, inner_sql2, sql3;
			
			// APS_PR_PLAN UPDATE 해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	    MERGE INTO APS_PR_PLAN ORG	\n";
			sql += "	    USING (                   	\n";

			// APS_PR_PLAN UPDATE 해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql2  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql2 += "	( 																												\n";
			sql2 += "	SELECT																											\n";
			sql2 += "			T1.ITEM_ID, T1.MINMPSQTY,																				\n";
			sql2 += "			T2.ITEM_ID,	T2.NEW_MIN_LOT_SIZE																			\n";
			sql2 += "	FROM	ITEM_MST	T1,                                                                                        	\n";
			sql2 += "			(                                                                                                      	\n";

			sql3  = "merge into USER_ITEM_MSG  UM                    		\n";	//사용자 입력 메세지 저장 테이블 	2013-02-20//
			sql3 += "using (                                           		\n";		
			
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud		= gdReq.getHeader("CRUD").getValue(i);
				String version	= gdReq.getParam("version");
				System.out.println("crud ="+crud);
				
				if(crud.equals("U") || crud.equals("C")) {
					 
					if( flag){
						sql += "	UNION	ALL \n"; 
						sql2 += "	UNION	ALL \n"; 
						sql3 += "	UNION	ALL \n";
					}
					flag = true;
					
					// 콤보리스트 변수 할당
					String sel_dmd = "";
					if(gdReq.getHeader("SEL_DMD").getSelectedIndex(i) > -1){							
						sel_dmd = gdReq.getHeader("SEL_DMD").getComboHiddenValues()[gdReq.getHeader("SEL_DMD").getSelectedIndex(i)];
					}
					//파라미터를 변수에 적용!!  

					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + version										+ "'	AS VERSION,     		\n";
					inner_sql += "				'1300'	AS PLANT_ID     	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("SEQ").getValue(i)		+ "'	AS SEQ          	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("BASE_STOCK").getValue(i)		+ "'	AS STOCK   	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("PROG_STOCK").getValue(i)		+ "'	AS ETA   	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("STD_STOCK").getValue(i)		+ "'	AS STD_STOCK    	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("SAFETY_STOCK").getValue(i)		+ "'	AS SAFETY_STOCK 	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("SAFETY_FACTOR").getValue(i)		+ "'	AS SAFETY_FACTOR	,     		\n";
//					inner_sql += "				'" + gdReq.getHeader("DMD01").getValue(i)		+ "'	AS DMD01        	,     		\n";
//					inner_sql += "				'" + gdReq.getHeader("DMD02").getValue(i)		+ "'	AS DMD02        	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("SALES_MEAN_3MONTH").getValue(i)		+ "'	AS DMD03        	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("LAST_YEAR").getValue(i)		+ "'	AS DMD04        	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("AVG_QTY").getValue(i)		+ "'	AS DMD05        	,     		\n";
//					inner_sql += "				'" + gdReq.getHeader("DMD06").getValue(i)		+ "'	AS DMD06        	,     		\n";
//					inner_sql += "				'" + gdReq.getHeader("DMD07").getValue(i)		+ "'	AS DMD07        	,     		\n";
//					inner_sql += "				'" + gdReq.getHeader("DMD08").getValue(i)		+ "'	AS DMD08        	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("STD_DEV").getValue(i)		+ "'	AS STD_DEV      	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("USE_CUM_MONTH").getValue(i)		+ "'	AS USE_CUM_MONTH 	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("PR_DATE_NO").getValue(i)		+ "'	AS PR_DATE_NO   	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("PR_QTY").getValue(i)		+ "'	AS PR_QTY       	,     		\n";
					inner_sql += "				'" + gdReq.getHeader("BASE_UOM").getValue(i)		+ "'	AS PR_QTY_UOM   	,     		\n";
					inner_sql += "				REPLACE('" + gdReq.getHeader("ENTR_DATE").getValue(i)		+ "','-')	AS ENTR_DATE    	,     		\n";
					inner_sql += "				SYSDATE	AS MADE_DTTM,     	    		\n";
					inner_sql += "				'" + sel_dmd										+ "'	AS SEL_DMD,      	\n";
					inner_sql += "				'Y'															AS EDIT_FLAG		\n";
					inner_sql += "	FROM	DUAL			                                                  						\n";
					
					/******************************************************************************************************************/

					
					inner_sql2  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql2 += "				'" + gdReq.getHeader("MIN_LOT_SIZE").getValue(i)	+ "'	AS NEW_MIN_LOT_SIZE		\n";
					inner_sql2 += "	FROM	DUAL			                                                  						\n";							
					/***********************************************사용자 입력 메세지 입력 ***********************************************/
					sql3	+=	"	SELECT	'OP_02010'	AS WD_ID, \n";
					sql3	+=	"			'" + gdReq.getHeader("ITEM_ID"			).getValue(i) 			+ "'	AS ITEM_ID, 	\n";		       			
					sql3	+=	"			'" + gdReq.getHeader("MSG"				).getValue(i) 			+ "'	AS MSG, 		\n";
					sql3	+=	"			SYSDATE	AS MADE_DTTM, 	\n";					
					sql3	+=	"			'" + version   													+ "'	AS VERSION      \n";					
					sql3	+=	"	from   DUAL 																			    	\n";

					/***********************************************사용자 입력 메세지 입력 ***********************************************/
					sql += inner_sql;
					sql2 += inner_sql2;
					
					
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
//						sql += "	UNION	ALL \n" + inner_sql;
						sql2 += "	UNION	ALL \n" + inner_sql2;
					
					}
				}
									
			}//for문 끝.
			
			sql += "			  ) TMP                              	\n";
			sql += "	      ON  (                                  	\n";
			sql += "	          		ORG.VERSION		= TMP.VERSION	\n";
			sql += "			  AND	ORG.PLANT_ID	= '1300'     	\n";
			sql += "			  AND	ORG.ITEM_ID		= TMP.ITEM_ID	\n";
			sql += "			  AND	ORG.SEQ			= TMP.SEQ    	\n";
			sql += "	          ) WHEN MATCHED THEN                	\n";
			sql += "	                 UPDATE                      	\n";
			sql += "	SET		STD_STOCK = TMP.STD_STOCK,		SAFETY_STOCK	= TMP.SAFETY_STOCK,					                \n";
			sql += "			PR_DATE_NO = TMP.PR_DATE_NO,	PR_QTY	= TMP.PR_QTY,	PR_QTY_UOM	= TMP.PR_QTY_UOM,				\n";
			sql += "			ENTR_DATE = TMP.ENTR_DATE,		SAFETY_FACTOR	= TMP.SAFETY_FACTOR,	SEL_DMD	= TMP.SEL_DMD,		\n";
			sql += "			EDIT_FLAG = TMP.EDIT_FLAG,																			\n";
			sql += "			MADE_DTTM	= SYSDATE															                  	\n";
			sql += "	            WHEN NOT MATCHED THEN 	\n";
			sql += "	            INSERT                	\n";
			sql += "	            (                     	\n";
			sql += "	                ORG.VERSION,      	\n";
			sql += "	                ORG.PLANT_ID,     	\n";
			sql += "	                ORG.ITEM_ID,      	\n";
			sql += "	                ORG.SEQ,          	\n";
			sql += "	                ORG.STOCK,		   	\n";
			sql += "	                ORG.ETA,   			\n";
			sql += "	                ORG.SEL_DMD,      	\n";
			sql += "	                ORG.STD_STOCK,    	\n";
			sql += "	                ORG.SAFETY_STOCK, 	\n";
			sql += "	                ORG.SAFETY_FACTOR,	\n";
//			sql += "	                ORG.DMD01,        	\n";
//			sql += "	                ORG.DMD02,        	\n";
			sql += "	                ORG.DMD03,        	\n";
			sql += "	                ORG.DMD04,        	\n";
			sql += "	                ORG.DMD05,        	\n";
//			sql += "	                ORG.DMD06,        	\n";
//			sql += "	                ORG.DMD07,        	\n";
//			sql += "	                ORG.DMD08,        	\n";
			sql += "	                ORG.STD_DEV,      	\n";
			sql += "	                ORG.USE_CUM_MONTH, 	\n";
			sql += "	                ORG.PR_DATE_NO,   	\n";
			sql += "	                ORG.PR_QTY,       	\n";
			sql += "	                ORG.PR_QTY_UOM,   	\n";
			sql += "	                ORG.ENTR_DATE,    	\n";
			sql += "	                ORG.EDIT_FLAG,     	\n";
			sql += "	                ORG.MADE_DTTM     	\n";
			sql += "	            ) VALUES              	\n";
			sql += "	            (                     	\n";
			sql += "	            	TMP.VERSION,      	\n";
			sql += "	                TMP.PLANT_ID,     	\n";
			sql += "	                TMP.ITEM_ID,      	\n";
			sql += "	                TMP.SEQ,          	\n";
			sql += "	                TMP.STOCK,		   	\n";
			sql += "	                TMP.ETA,   			\n";
			sql += "	                TMP.SEL_DMD,      	\n";
			sql += "	                TMP.STD_STOCK,    	\n";
			sql += "	                TMP.SAFETY_STOCK, 	\n";
			sql += "	                TMP.SAFETY_FACTOR,	\n";
//			sql += "	                TMP.DMD01,        	\n";
//			sql += "	                TMP.DMD02,        	\n";
			sql += "	                TMP.DMD03,        	\n";
			sql += "	                TMP.DMD04,        	\n";
			sql += "	                TMP.DMD05,        	\n";
//			sql += "	                TMP.DMD06,        	\n";
//			sql += "	                TMP.DMD07,        	\n";
//			sql += "	                TMP.DMD08,        	\n";
			sql += "	                TMP.STD_DEV,      	\n";
			sql += "	                TMP.USE_CUM_MONTH, 	\n";
			sql += "	                TMP.PR_DATE_NO,   	\n";
			sql += "	                TMP.PR_QTY,       	\n";
			sql += "	                TMP.PR_QTY_UOM,   	\n";
			sql += "	                TMP.ENTR_DATE,    	\n";
			sql += "	                TMP.EDIT_FLAG,    	\n";
			sql += "	                TMP.MADE_DTTM     	\n";
			sql += "	            )                    	\n";

			/******************************************************************************************************************/
			
			sql2 += "			)			T2                                                                                      \n";
			sql2 += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql2 += "	)                                                                                                        	\n";
			sql2 += "	SET		MINMPSQTY = NEW_MIN_LOT_SIZE													                  	\n";
			
			/****************************************사용자 입력 메세지 입력 ***********************************************/
			sql3 += ") UM1 											   	   														\n";
			sql3 += "ON (UM.WD_ID			= UM1.WD_ID   			   	   														\n";
			sql3 += "AND UM.VERSION      	= UM1.VERSION    						   											\n";
			sql3 += "AND UM.ITEM_ID      	= UM1.ITEM_ID)    						   											\n";
			sql3 += "when matched then update set            					  					 							\n";
			sql3 += " MSG	 			= UM1.MSG           	   	   														\n";  	/* 차주 예상재고량  2013-02-13 */			
			sql3 += "when not matched then insert(WD_ID,	VERSION,	ITEM_ID		,MSG		,MADE_TYPE	,MADE_DTTM)	\n";
			sql3 += "values						 (UM1.WD_ID, UM1.VERSION,	UM1.ITEM_ID	,UM1.MSG	,'AD' 		,SYSDATE)	\n";
			
			/****************************************사용자 입력 메세지 입력 ***********************************************/
			
			System.out.println("-----------------------------------------------QUERY : APS_PR_PLAN UPDATE -----------------------------------------------");
			//System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY : APS_PR_PLAN UPDATE -----------------------------------------------");
			
			System.out.println("-----------------------------------------------QUERY_2: ITEM_MST MINMPSQTY UPDATE -----------------------------------------------");
			System.out.println("-----------------------------------------------QUERY_2: ITEM_MST MINMPSQTY UPDATE -----------------------------------------------");

			System.out.println("-----------------------------------------------QUERY_3: USER_ITEM_MSG UPDATE -----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY_3: USER_ITEM_MSG UPDATE -----------------------------------------------");
			
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			rs = databaseUtility.executeQuery(stmt, sql2);
			rs = databaseUtility.executeQuery(stmt, sql3);

			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "save");
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
	
	//계획 실행 SP 호출
	public GridData doExePlan(GridData gdReq) throws Exception {
		System.out.println("doExePlan() start!!!");
		GridData gdRes = new GridData(); // WiseGrid 객체생성

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성
		System.out.println("call SP_OP_CR_APS_PR_PLAN_ROH() 실행!!!");
		String sql2 = "call SP_OP_CR_APS_PR_PLAN_ROH('CRE_DATA',SYSDATE,1,1,'NA',SYSDATE)";
		boolean result = stmt.execute(sql2);
		System.out.println("call SP_OP_CR_APS_PR_PLAN_ROH() 종료!!! - 결과 : " + result);
		System.out.println("doExePlan() end!!!");

		gdRes.addParam("mode", "ExePlan");
		gdRes.setMessage("성공적으로 작업하였습니다.");
		gdRes.setStatus("true");
		
		
		return gdRes;		
	}
	
	public GridData doDelete(GridData gdReq) throws Exception {

		System.out.println("doDelete() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Delete");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			String sql, inner_sql;
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																		\n";
			sql += "	( 																								\n";
			sql += "	SELECT																							\n";
			sql += "			T1.ITEM_ID, T1.VERSION, T1.SEQ, T1.SAFETY_FACTOR,										\n";
			sql += "			T1.PR_DATE_NO, T1.PR_QTY, T1.ENTR_DATE,	T1.MADE_DTTM, T1.EDIT_FLAG,						\n";
			sql += "			T2.NEW_SAFETY_FACTOR,	T2.NEW_PR_DATE_NO,												\n";
			sql += "			T2.NEW_PR_QTY,	T2.NEW_ENTR_DATE, T2.NEW_EDIT_FLAG										\n";
			sql += "	FROM	APS_PR_PLAN	T1,                                                                         \n";
			sql += "			(                                                                                       \n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud		= gdReq.getHeader("CRUD").getValue(i);
				String version	= gdReq.getParam("version");
				System.out.println("crud ="+crud);
				//System.out.println("SEL_DMD : " + gdReq.getHeader("SEL_DMD").getHiddenValue(i));
				
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					//파라미터를 변수에 적용!!  
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + version										+ "'	AS VERSION,     		\n";
					inner_sql += "				'" + gdReq.getHeader("SEQ").getValue(i) 			+ "'	AS SEQ,     		\n";
					inner_sql += "				0															AS NEW_SAFETY_FACTOR,   \n";
					inner_sql += "				0															AS NEW_PR_DATE_NO,  	\n";
					inner_sql += "				0															AS NEW_PR_QTY,			\n";
					inner_sql += "				NULL														AS NEW_ENTR_DATE,   	\n";
					inner_sql += "				NULL														AS NEW_EDIT_FLAG		\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for문 끝.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	AND		T1.VERSION	= T2.VERSION                                                                            \n";
			sql += "	AND		T1.SEQ		= T2.SEQ	                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		PR_DATE_NO = NEW_PR_DATE_NO,	PR_QTY	= NEW_PR_QTY,												\n";
			sql += "			ENTR_DATE = NEW_ENTR_DATE,		SAFETY_FACTOR	= NEW_SAFETY_FACTOR,								\n";
			sql += "			EDIT_FLAG = NEW_EDIT_FLAG,																			\n";
			sql += "			MADE_DTTM	= SYSDATE															                  	\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "Delete");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);   
        }

        System.out.println("doDelete() end!!!");

		return gdRes;
	}			
	
	public GridData doIf(GridData gdReq) throws Exception {

		System.out.println("doIf() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doIf");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);


			String sql, inner_sql;
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.ITEM_ID, T1.VERSION, T1.SEQ, T1.IF_FLAG, T2.NEW_IF_FLAG, T1.EDIT_FLAG, T2.NEW_EDIT_FLAG						\n";
			sql += "	FROM	APS_PR_PLAN	T1,                                                                                        	\n";
			sql += "			(                                                                                                      	\n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud		= gdReq.getHeader("CRUD").getValue(i);
				String version	= gdReq.getParam("version");
				System.out.println("crud ="+crud);

				
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					//파라미터를 변수에 적용!!  
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + version										+ "'	AS VERSION,     		\n";
					inner_sql += "				'" + gdReq.getHeader("SEQ").getValue(i) 			+ "'	AS SEQ,     			\n";
					inner_sql += "				'I'															AS NEW_IF_FLAG,			\n";
					inner_sql += "				'Y'															AS NEW_EDIT_FLAG		\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for문 끝.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	AND		T1.VERSION	= T2.VERSION                                                                            \n";
			sql += "	AND		T1.SEQ		= T2.SEQ	                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		IF_FLAG = NEW_IF_FLAG, EDIT_FLAG = NEW_EDIT_FLAG													\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "doIf");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);   
        }

        System.out.println("doIf() end!!!");

		return gdRes;
	}		
	
}                                                                                                                  