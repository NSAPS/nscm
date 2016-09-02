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
public class ip_02070_Edi_Default_List extends HttpServlet {                                                             
                                                                                                                             
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
			else if (mode.equals("search2")) //                                                                               
				gdRes = doQuery2(gdReq);                                                                                     
			else if (mode.equals("search3")) //                                                                               
				gdRes = doQuery3(gdReq);
			else if (mode.equals("search4")) //                                                                               
				gdRes = doQuery4(gdReq);
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
			                                                                                                                 
			String cnfm_date	= gdReq.getParam("cnfm_date");                                                            
			String sort_flag	= gdReq.getParam("sort_flag");                                                            
			                                                                                                                 
			String paramKey   ="cnfm_date!%!sort_flag";                                                                      
			String paramCode  = cnfm_date+"!%!"+sort_flag;
                                                                                                                             
			String query_id   = "ip_02070_Edi_Default_List";                                                             
                                                                                                                             
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
			String query_id2 = "ip_02070_Edi_Default_code_combo"; 
			System.out.println("getSelQeury : " + query_id2);
			ArrayList<ArrayList<String>> comboList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = comboList.size();
			
			String[] codeIdList = new String[arrIdx];
			String[] codeNameList = new String[arrIdx];
			
			System.out.println("콤보리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				codeIdList[i] = comboList.get(i).get(0);   //선택구분 ID 콤보리스트 생성
				codeNameList[i] = comboList.get(i).get(1); // 선택구분 이름 콤보리스트 생성
			}
			
			System.out.println("콤보리스트 set");
			gdRes.getHeader("CODE_NAME").setComboValues(codeNameList, codeIdList );		//선택구분   콤보리스트 출고 사업장 컬럼에 set
			
			
			
			
			for (int i = 0; i < rowCount; i++) {                                                                             

				
				gdRes.getHeader("CRUD"			).addValue( "", "");
				gdRes.getHeader("SELECTED"		).addValue("0", "");
				gdRes.getHeader("CNFM_DATE"		).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("CUST_CODE"		).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("EDI_QTY"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("DEFAULT_QTY"	).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("AMOUNT"		).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("DEFAULT_AMOUNT").addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("DEFAULT_CODE"	).addValue(qResult.get(i).get(9  ),"");
				gdRes.getHeader("CODE_NAME" 	).addSelectedHiddenValue(qResult.get(i).get(10));//출고사업장
				//gdRes.getHeader("CODE_NAME"		).addValue(qResult.get(i).get(10 ),"");                                      
				gdRes.getHeader("DC_ID"			).addValue(qResult.get(i).get(11 ),"");                                      
				gdRes.getHeader("DC_NAME"		).addValue(qResult.get(i).get(12 ),"");                                      
				gdRes.getHeader("DEPT_CODE"		).addValue(qResult.get(i).get(13 ),"");                                      
				gdRes.getHeader("DEPT_NAME"		).addValue(qResult.get(i).get(14 ),"");                                      
				gdRes.getHeader("HAN_NAME"		).addValue(qResult.get(i).get(15 ),"");                                      
				gdRes.getHeader("TEL_NO"		).addValue(qResult.get(i).get(16 ),"");                                      
				gdRes.getHeader("COMMT"			).addValue(qResult.get(i).get(17 ),"");
				gdRes.getHeader("ALLOC_FLAG"	).addValue(qResult.get(i).get(18 ),"");
				gdRes.getHeader("SELL_STOP_DATE").addValue(qResult.get(i).get(19 ),"");
				gdRes.getHeader("SPEC"			).addValue(qResult.get(i).get(20 ),"");
				gdRes.getHeader("EDI_GUBN"		).addValue(qResult.get(i).get(21 ),"");
				gdRes.getHeader("CUST_ITEM_ID"	).addValue(qResult.get(i).get(22 ),"");
				gdRes.getHeader("CUST_STORE_CODE").addValue(qResult.get(i).get(23 ),"");
				gdRes.getHeader("DEFAULT_GUBN"	).addValue(qResult.get(i).get(24 ),"");
				
				
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	// DW 2 조회  쿼리 주문정보
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");
			String cust_id	= gdReq.getParam("cust_id");
			String dc_id	= gdReq.getParam("dc_id");
			String cnfm_date	= gdReq.getParam("cnfm_date");
			String edi_gubn	= gdReq.getParam("edi_gubn");
			                                                                                                                 
			String paramKey   ="item_id!%!cust_id!%!dc_id!%!cnfm_date!%!edi_gubn";                                                                      
			String paramCode  = item_id+"!%!"+cust_id+"!%!"+dc_id+"!%!"+cnfm_date+"!%!"+edi_gubn;                                                               
                                                                                                                             
			String query_id   = "ip_02070_Edi_Default_List_DW2";                                                             
                                                                                                                             
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
				
				gdRes.getHeader("GUBN"			).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("CUST_CODE"		).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("SLIP_NO"		).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("SEQ_NO"		).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("REQT_QTY"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("SELL_QTY"		).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("SHORTAGE_GUBN"	).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("IPUT_DTTM"		).addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("CLOS_DTTM"		).addValue(qResult.get(i).get(9  ),"");                                      
				gdRes.getHeader("CHGO_GUBN"		).addValue(qResult.get(i).get(10 ),"");                                      
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                	
	
	
	//하단 그리드 WD3 조회 쿼리  수송정보
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		System.out.println("search3() start!!!");
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");
			String cust_id	= gdReq.getParam("cust_id");
			String dc_id	= gdReq.getParam("dc_id");
			String cnfm_date	= gdReq.getParam("cnfm_date");
			                                                                                                                 
			String paramKey   ="item_id!%!cust_id!%!dc_id!%!cnfm_date";                                                                      
			String paramCode  = item_id+"!%!"+cust_id+"!%!"+dc_id+"!%!"+cnfm_date;                                                               
                                                                                                                             
			String query_id   = "ip_02070_Edi_Default_List_DW3";                                                              
                                                                                                                             
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
				gdRes.getHeader("DC_NAME"		).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("RECEIPT_PRE"	).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("BASE_STOCK"	).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("IPGO"			).addValue(qResult.get(i).get(3  ),"");
				gdRes.getHeader("CHGO"			).addValue(qResult.get(i).get(4  ),"");
				gdRes.getHeader("REQT_QTY"		).addValue(qResult.get(i).get(5  ),"");
				gdRes.getHeader("CONFIRM_QTY"	).addValue(qResult.get(i).get(6  ),"");
				gdRes.getHeader("SHORTAGE_QTY"	).addValue(qResult.get(i).get(7  ),"");
				gdRes.getHeader("ORDER_CNT"		).addValue(qResult.get(i).get(8  ),"");
				gdRes.getHeader("MIN_CLOS_DTTM"	).addValue(qResult.get(i).get(9  ),"");
				gdRes.getHeader("MAX_CLOS_DTTM"	).addValue(qResult.get(i).get(10 ),"");
				gdRes.getHeader("SRC_LOC"		).addValue(qResult.get(i).get(11 ),"");
				gdRes.getHeader("BRAND_NO"		).addValue(qResult.get(i).get(12 ),"");
				gdRes.getHeader("TRANS_STATE"	).addValue(qResult.get(i).get(13 ),"");
				gdRes.getHeader("SHORTAGE_GUBN"	).addValue(qResult.get(i).get(14 ),"");
				gdRes.getHeader("QTY"			).addValue(qResult.get(i).get(15 ),"");
				gdRes.getHeader("CHGO_QTY"		).addValue(qResult.get(i).get(16 ),"");
				gdRes.getHeader("CHGO_DTTM"		).addValue(qResult.get(i).get(17 ),"");
				gdRes.getHeader("IPGO_QTY"		).addValue(qResult.get(i).get(18 ),"");
				gdRes.getHeader("IPGO_DTTM"		).addValue(qResult.get(i).get(19 ),"");
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search3");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}     

	// DW 4 조회  쿼리  EDI 정보
	public GridData doQuery4(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");
			String cust_id	= gdReq.getParam("cust_id");
			String dc_id	= gdReq.getParam("dc_id");
			String cnfm_date	= gdReq.getParam("cnfm_date");
			String edi_gubn	= gdReq.getParam("edi_gubn");
			                                                                                                                 
			String paramKey   ="item_id!%!cust_id!%!dc_id!%!cnfm_date!%!edi_gubn";                                                                      
			String paramCode  = item_id+"!%!"+cust_id+"!%!"+dc_id+"!%!"+cnfm_date+"!%!"+edi_gubn;                                                               
                                                                                                                             
			String query_id   = "ip_02070_Edi_Default_List_DW4";                                                                 
                                                                                                                             
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
				gdRes.getHeader("GUBN"			).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("CNFM_DATE"		).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("CUST_CODE"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("OD_SLIP_NO"	).addValue(qResult.get(i).get(3  ),"");
				gdRes.getHeader("ODER_BOX"		).addValue(qResult.get(i).get(4  ),"");
				gdRes.getHeader("CONV_BOX"		).addValue(qResult.get(i).get(5  ),"");
				gdRes.getHeader("ODER_DATE"		).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("IPUT_TIME"		).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("IPUT_EMP_NO"	).addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("CONV_TIME"		).addValue(qResult.get(i).get(9  ),"");                                      
				gdRes.getHeader("CONV_EMP_NO"	).addValue(qResult.get(i).get(10 ),"");                                      
				gdRes.getHeader("SLIP_NO"		).addValue(qResult.get(i).get(11 ),"");                                      
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search4");		                                                                         
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
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CUST_ITEM_ID").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CUST_ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Save");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CUST_ITEM_ID Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql;
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT	T1.GROUP_CODE,	T1.CNFM_DATE,	T1.CUST_ITEM_ID,		T1.CUST_STORE_CODE,		T1.DEFAULT_CODE,					\n";
			sql += "			T2.NEW_DEFAULT_CODE																						\n";
			sql += "	FROM	EDI_DEFAULT	T1,                                                                                        	\n";
			sql += "			(                                                                                                      	\n";
			boolean flag = false;
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				System.out.println("어디에서 에러 !! 1 : ");
				
				//tring crud			= gdReq.getHeader("CUST_ITEM_ID").getValue(i);
				String crud			= "U";
				//String grup_code	= gdReq.getParam("grup_code");
				String grup_code	= "32";
				//System.out.println("crud ="+crud);
				//System.out.println("CODE_NAME : " + gdReq.getHeader("CODE_NAME").getHiddenValue(i));
				
				if(crud.equals("U")) {
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					// 콤보리스트 변수 할당
					String default_code = "";
					if(gdReq.getHeader("CODE_NAME").getSelectedIndex(i) > -1){							
						default_code = gdReq.getHeader("CODE_NAME").getComboHiddenValues()[gdReq.getHeader("CODE_NAME").getSelectedIndex(i)];
					}
					//파라미터를 변수에 적용!!  
					inner_sql  = "	SELECT		'" + grup_code										+ "'	AS GROUP_CODE,	      	\n";
					inner_sql += "				'" + gdReq.getHeader("CNFM_DATE"	).getValue(i)	+ "'	AS CNFM_DATE,	    	\n";
					inner_sql += "				'" + gdReq.getHeader("CUST_ITEM_ID"	).getValue(i)	+ "'	AS CUST_ITEM_ID,		\n";
					inner_sql += "				'" + gdReq.getHeader("CUST_STORE_CODE"	).getValue(i)+"'	AS CUST_STORE_CODE,		    \n";
					inner_sql += "				'" + default_code									+ "'	AS NEW_DEFAULT_CODE   	\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for문 끝.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.GROUP_CODE	= T2.GROUP_CODE                                                                      \n";
			sql += "	AND		T1.CNFM_DATE	= T2.CNFM_DATE                                                                      \n";
			sql += "	AND		T1.CUST_ITEM_ID	= T2.CUST_ITEM_ID                                                                   \n";
			sql += "	AND		T1.CUST_STORE_CODE	= T2.CUST_STORE_CODE                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		DEFAULT_CODE = NEW_DEFAULT_CODE																	\n";
			//sql += "			MADE_TYPE	= 'UP',																					\n";
			//sql += "			MADE_BY		= ,																						\n";
			//sql += "			MADE_DTTM	= SYSDATE															                  	\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
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