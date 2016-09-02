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
public class op_02050_roh_expt_master_new extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;                                                                                              
	String 		sql2 	= null;                                                                                              
	                                                                                     
	                                                                                                                         
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
			else if (mode.equals("search3")) //                                                                               
				gdRes = doQuery3(gdReq);
			else if (mode.equals("search4")) //                                                                               
				gdRes = doQuery4(gdReq);
			else if (mode.equals("search5")) //                                                                               
				gdRes = doQuery5(gdReq);
			else if (mode.equals("search7")) //                                                                               
				gdRes = doQuery7(gdReq);
			else if (mode.equals("save")) //                                                                               
				gdRes = doSave(gdReq);			
		
		
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
			                                                                                                                 
			String com_code		=	gdReq.getParam("com_code");                                                            
			String mfs_flag		=	gdReq.getParam("mfs_flag");  
			String cnfm_date	=	gdReq.getParam("cnfm_date");

			String paramKey		=	"com_code!%!mfs_flag!%!cnfm_date";
			String paramCode	=	com_code+"!%!"+mfs_flag+"!%!"+cnfm_date;
			String query_id		=	"op_02050_roh_expt_master_new";                                                             
                                                                                                                             
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
			//String query_id2 = "sel_dmd_list"; 
			String query_id2 = "sel_dmd_list_3";
			ArrayList<ArrayList<String>> selDmdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = selDmdList.size();
			
			String[] selDmdIdList	= new String[arrIdx];
			String[] selDmdNameList = new String[arrIdx];
			
			System.out.println("출고 사업장 콤보리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				selDmdIdList[i]		= selDmdList.get(i).get(0);   //선택구분 ID 콤보리스트 생성
				selDmdNameList[i]	= selDmdList.get(i).get(1); // 선택구분 이름 콤보리스트 생성
			}

			gdRes.getHeader("SEL_DMD").setComboValues(selDmdNameList, selDmdIdList );		//선택구분   콤보리스트 출고 사업장 컬럼에 set
			
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("CRUD"					).addValue( "", "");
				gdRes.getHeader("ITEM_ID"			).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("ITEM_NAME" 		).addValue(qResult.get(i).get(1), "");                                     
				gdRes.getHeader("BASE_UOM" 			).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("MFS_FLAG" 			).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("LEAD_TIME" 		).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("TERM_VAL" 			).addValue(qResult.get(i).get(5), ""); 
				gdRes.getHeader("ANYANG" 			).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("KUMI" 				).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("PUSAN" 			).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("HJIN" 				).addValue(qResult.get(i).get(9), ""); 
				gdRes.getHeader("SJP" 				).addValue(qResult.get(i).get(10), ""); 
				gdRes.getHeader("SINHYO" 			).addValue(qResult.get(i).get(11), "");     //당주 기준재고 = 확정재고                                
				gdRes.getHeader("CNFM_STOCK" 		).addValue(qResult.get(i).get(12), "");         
				gdRes.getHeader("SUB_TOT" 			).addValue(qResult.get(i).get(13), ""); 
				gdRes.getHeader("ODER_QTY" 			).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("W1_STOCK" 			).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("SEL_DMD" 			).addSelectedHiddenValue(qResult.get(i).get(16));
				gdRes.getHeader("DMD_QTY" 			).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("DMD03" 			).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("DMD04" 			).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("DMD05" 			).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("DMD06" 			).addValue(qResult.get(i).get(21),"");
				gdRes.getHeader("DMD07" 			).addValue(qResult.get(i).get(22),"");				
				gdRes.getHeader("DMD08" 			).addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("USE_DAY" 			).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("USE_QTY" 			).addValue(qResult.get(i).get(25),"");				
				gdRes.getHeader("MIN_LOT_SIZE" 		).addValue(qResult.get(i).get(26),"");
				gdRes.getHeader("FC_QTY" 			).addValue(qResult.get(i).get(27),"");  
				gdRes.getHeader("SINHYO_EXPT" 		).addValue(qResult.get(i).get(28),"");  
				gdRes.getHeader("SJP_EXPT" 			).addValue(qResult.get(i).get(29),"");  
				gdRes.getHeader("HJIN_EXPT" 		).addValue(qResult.get(i).get(30),"");  
				gdRes.getHeader("MSG"				).addValue(qResult.get(i).get(31),"");	
				gdRes.getHeader("SINHYO_GIJUN"		).addValue(qResult.get(i).get(32),"");	
				gdRes.getHeader("SJP_GIJUN"			).addValue(qResult.get(i).get(33),"");	
				gdRes.getHeader("HJIN_GIJUN"		).addValue(qResult.get(i).get(34),"");	
				
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
	/*public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
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

				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("PR_NO"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("PR_REL"	).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("PR_QTY"	).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("PO_NO"		).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("PO_SEQ"	).addValue(qResult.get(i).get(6),"");                                      
				gdRes.getHeader("PO_DATE"	).addValue(qResult.get(i).get(7),"");                                      
				gdRes.getHeader("PO_QTY"	).addValue(qResult.get(i).get(8),"");                                      
				gdRes.getHeader("CREDIT"	).addValue(qResult.get(i).get(9),"");                                      
				gdRes.getHeader("UNSHIP_QTY").addValue(qResult.get(i).get(10),"");                                      
				gdRes.getHeader("SHIP_QTY"	).addValue(qResult.get(i).get(11),"");                                      
				gdRes.getHeader("BL_NO"		).addValue(qResult.get(i).get(12),"");                                      
				gdRes.getHeader("PORT"		).addValue(qResult.get(i).get(13),"");                                      
				gdRes.getHeader("TONG"		).addValue(qResult.get(i).get(14),"");                                      
				gdRes.getHeader("IPGO"		).addValue(qResult.get(i).get(15),"");                                      
				gdRes.getHeader("DATE_FLAG"	).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("STATUS"	).addValue(qResult.get(i).get(17),"");
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}*/                	
	
	
	//하단 그리드 WD3 조회 쿼리
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		System.out.println("search3() start!!!");
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String	item_id		=	gdReq.getParam("item_id");      
			String cnfm_date	=	gdReq.getParam("cnfm_date");
			                                                                                                                 
			String paramKey		=	"item_id!%!cnfm_date";                                                                      
			String paramCode	=	item_id+"!%!"+cnfm_date;                                                                 
			String query_id		=	"op_02050_MFS_STD_STOCK_dw3";   //dw3 재고전개 뭐리 호출 부분                                                          
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search3");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			System.out.println("search3() rowCount!!!"+rowCount);
			System.out.println(rowCount);
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				gdRes.getHeader("CONS_ITEM_ID"		).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("CONS_ITEM_NAME"	).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("UNIT"				).addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("PRE_STD_STOCK"		).addValue(qResult.get(i).get(3),"");
				gdRes.getHeader("PRE_FC_QTY"		).addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("PRE_IPGO"			).addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("NOW_EXPT"			).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("SIL_STOCK"			).addValue(qResult.get(i).get(7),"");
				gdRes.getHeader("DIFF_QTY"			).addValue(qResult.get(i).get(8),"");
				gdRes.getHeader("CNFM_STOCK"		).addValue(qResult.get(i).get(9),"");
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
				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(0),"");
				
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(2),"");                                     
				gdRes.getHeader("MM_0_QTY"	).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("MM_1_QTY"	).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("MM_2_QTY"	).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("MM_3_QTY"	).addValue(qResult.get(i).get(6),"");                                      
				gdRes.getHeader("MM_4_QTY"	).addValue(qResult.get(i).get(7),"");                                      
				gdRes.getHeader("MM_5_QTY"	).addValue(qResult.get(i).get(8),"");                                     
				gdRes.getHeader("MM_6_QTY"	).addValue(qResult.get(i).get(9),"");                                     
				gdRes.getHeader("MM_7_QTY"	).addValue(qResult.get(i).get(10),"");                                      
				gdRes.getHeader("MM_8_QTY"	).addValue(qResult.get(i).get(11),"");                                      
                                    
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
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
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


	
	
	
	// DW 7 조회  쿼리
	public GridData doQuery7(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
                                                            
			String cons_item_id		=	gdReq.getParam("cons_item_id");
			String cnfm_date		=	gdReq.getParam("cnfm_date");
			
			
			String paramKey			=	"cons_item_id!%!cnfm_date";                                                                      
			String paramCode		=	cons_item_id+"!%!"+cnfm_date;                                                                    
                                                                                                                             
			String query_id			=	"op_02050_even_item_list_dw7";                                                             
                                                                                                                             
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
				gdRes.getHeader("EVEN_DATE"	).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("PROD_CODE"	).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("ITEM_NAME"	).addValue(qResult.get(i).get(2),"");                                     
				gdRes.getHeader("E_QTY"		).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("H_QTY" 	).addValue(qResult.get(i).get(4),"");                                     
				gdRes.getHeader("L_QTY"		).addValue(qResult.get(i).get(5),"");                                      
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
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());

		String cnfm_date		=	gdReq.getParam("cnfm_date");
		String com_code			=	gdReq.getParam("com_code");

		//System.out.println("*************cnfm_date : " + cnfm_date);
		
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
		
			String inner_sql,	sql2	;//sql3, inner_sql3;
			
			String user_id = gdReq.getParam("user_id");
			
						///////////////////////발주예고량 저장 SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql2   = "merge into MFS_ORDER_FORECAST_PURCHASE MF				       																\n";
			sql2  += "using (                                           																\n";
			///////////////////////발주예고량 저장 SQL/////////////////////////////////////////////////////////////////////////////////////////

				
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				
				System.out.println("crud ="+crud);
				
				if(crud.equals("U")) {
					 
					if( flag){
						sql2 += "	UNION	ALL \n";						
						
					}
					flag = true;
					
					// 콤보리스트 변수 할당
					//String sel_dmd = "";
					//파라미터를 변수에 적용!!  					
				
					
					///////////////////////구매팀 발주예고량 저장 SQL//////////////////////////////////////////////////////////////////////////////////
					sql2 	+=	"	SELECT		TO_DATE(REPLACE('"+ cnfm_date + "','-',''),'YYYY-MM-DD')		AS CNFM_DATE, 			\n";
					sql2	+=	"			'" + com_code 												+ "'	AS COM_CODE, 			\n";
					sql2	+=	"			'" + gdReq.getHeader("ITEM_ID"		).getValue(i) 			+ "'	AS CONS_ITEM_ID, 		\n";		       			
					sql2	+=	"			'" + gdReq.getHeader("SINHYO_EXPT"	).getValue(i) 			+ "'	AS SINHYO_QTY, 			\n";
					sql2	+=	"			'" + gdReq.getHeader("SJP_EXPT"		).getValue(i) 			+ "'	AS SJP_QTY, 			\n";
					sql2	+=	"			'" + gdReq.getHeader("HJIN_EXPT"	).getValue(i) 			+ "'	AS HJIN_QTY, 			\n";
					sql2	+=	"			'" + gdReq.getHeader("SINHYO_GIJUN"	).getValue(i) 			+ "'	AS SINHYO_GIJUN, 		\n";
					sql2	+=	"			'" + gdReq.getHeader("SJP_GIJUN"	).getValue(i) 			+ "'	AS SJP_GIJUN, 			\n";
					sql2	+=	"			'" + gdReq.getHeader("HJIN_GIJUN"	).getValue(i) 			+ "'	AS HJIN_GIJUN, 			\n";
					sql2	+=	"			'" + user_id   												+ "'	AS MADE_BY      		\n";
					sql2	+=	"	FROM   DUAL 																		          		\n";
					/////////////////////구매팀 발주예고량 저장 SQL////////////////////////////////////////////////////////////////////////////////////
					
				}
									
			}//for문 끝.

			///////////////////////구매팀 발주예고량 저장 SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql2 += ") MF1 											   	   															\n";
			sql2 += "ON (MF.CONS_ITEM_ID	= MF1.CONS_ITEM_ID    			   	   													\n";
			sql2 += "AND MF.COM_CODE 		= MF1.COM_CODE							   												\n";
			sql2 += "AND MF.CNFM_DATE 		= MF1.CNFM_DATE)							   											\n";
			sql2 += "when matched then update set            					  					 								\n";
			sql2 += " MF.SINHYO_QTY 	 	= MF1.SINHYO_QTY,         	   	   														\n";  	/* 신효 발주예고량  */
			sql2 += " MF.SJP_QTY 	 		= MF1.SJP_QTY,         	   	   															\n";  	/* SJP 발주예고량  */
			sql2 += " MF.HJIN_QTY 	 		= MF1.HJIN_QTY,         	   	   														\n";  	/* 현진 발주예고량  */
			sql2 += " MF.SINHYO_GIJUN 	 	= MF1.SINHYO_GIJUN,         	   	   													\n";  	
			sql2 += " MF.SJP_GIJUN 	 		= MF1.SJP_GIJUN,         	   	   														\n";  	
			sql2 += " MF.HJIN_GIJUN 	 	= MF1.HJIN_GIJUN,         	   	   														\n";  	
			sql2 += " MF.MADE_DTTM 	 		= SYSDATE,         	   	   																\n";  	
			sql2 += " MF.MADE_BY 	 		= MF1.MADE_BY         	   	   															\n"; 
			sql2 += "when not matched then insert(MF.CNFM_DATE,	MF.COM_CODE,	MF.CONS_ITEM_ID,	MF.SINHYO_QTY, MF.SJP_QTY, MF.HJIN_QTY,	MF.SINHYO_GIJUN, MF.SJP_GIJUN, MF.HJIN_GIJUN, MF.MADE_DTTM,	MF.MADE_BY)		\n";
			sql2 += "values						 (MF1.CNFM_DATE, MF1.COM_CODE,	MF1.CONS_ITEM_ID,	MF1.SINHYO_QTY, MF1.SJP_QTY, MF1.HJIN_QTY, MF1.SINHYO_GIJUN, MF1.SJP_GIJUN, MF1.HJIN_GIJUN,	SYSDATE,	MF1.MADE_BY)	\n";			
			///////////////////////발주예고량 저장 SQL/////////////////////////////////////////////////////////////////////////////////////////
		
			System.out.println("-----------------------------------------------QUERY_2: MFS_ORDER_FORECAST_PURCHASE QTY UPDATE -----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY_2: MFS_ORDER_FORECAST_PURCHASE QTY UPDATE -----------------------------------------------");
	
			
			System.out.println("executeQuery 실행!!!");			
			
			rs = databaseUtility.executeQuery(stmt, sql2);			
			
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

	


}                     


                                                                                         