package com.wisegrid.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import com.zionex.t3sinc.common.CommonUtil;
import com.zionex.t3sinc.util.db.SincDatabaseUtility;

public class sc_01110_realStockReg_list_new extends HttpServlet{

private static final long serialVersionUID = -419201700278107216L;                                                       
    
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;  
	String 		sql2 	= null;
	String 		sql3 	= null;
	//Map sessionMap 	= new HashMap();                                                                                     
	                                                                                                                         
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();	                                                     
                                                                                                                             
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {               
		GridData gdReq = null;                                                                                               
		GridData gdRes = null;                                                                                               
                                                                                                                             
//        System.out.println("START...");                                                                                      
        
		// Encode Type; UTF-8                                                                                                
		req.setCharacterEncoding("UTF-8");                                                                                   
		res.setContentType("text/html;charset=UTF-8");                                                                       
		                                                                                                                     
		PrintWriter out = res.getWriter();                                                                                   
		try {                                                                                                                
			// WISEGRID_DATA Param WiseGridG                                                                                 
			String rawData = req.getParameter("WISEGRID_DATA");                                                              
			                                                                                                                 
			gdReq = OperateGridData.parse(rawData);                                                                          
                                                                                                                             
			String mode = gdReq.getParam("mode");                                                                            
//			System.out.println("Test :: mode = " + mode);                                                                    

System.out.println("1");			
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);        
			if(mode.equals("save"))
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
			                                                                                                                 
			String in_cnfm_date		  = gdReq.getParam("in_cnfm_date");                                                            
			String sel_plant 		  = gdReq.getParam("sel_plant"); 
			String sel_halb_type      = gdReq.getParam("sel_halb_type");
	                                                                                                                 
			String paramKey   = "in_cnfm_date!%!sel_plant!%!sel_halb_type!%!";                                                                      
			String paramCode  = in_cnfm_date+"!%!"+sel_plant+"!%!"+sel_halb_type;           

//			System.out.println("in_cnfm_date = " + in_cnfm_date);                                                                    
                                                                                                                             
			String query_id   = "sc_01110_realStockReg_list";                                                             
                                                                                                                            
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                                                              

			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("CRUD"			 ).addValue( "", "");
				gdRes.getHeader("PLANT_ID"       ).addValue(qResult.get(i).get(0),"" );
				gdRes.getHeader("PLANT_NAME"     ).addValue(qResult.get(i).get(1),"" );
				gdRes.getHeader("ITEM_ID"        ).addValue(qResult.get(i).get(2),"" );
				gdRes.getHeader("ITEM_NAME"      ).addValue(qResult.get(i).get(3),"" );
				gdRes.getHeader("SPEC"           ).addValue(qResult.get(i).get(4),"" );
				gdRes.getHeader("ERP_QTY"        ).addValue(qResult.get(i).get(5),"" );
				gdRes.getHeader("REAL_QTY"       ).addValue(qResult.get(i).get(6),"" );
				gdRes.getHeader("BASE_UOM"       ).addValue(qResult.get(i).get(7),"" );
				gdRes.getHeader("CONV_QTY"       ).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("CONV_UOM"       ).addValue(qResult.get(i).get(9),"" );
				gdRes.getHeader("ITYPE"          ).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("MOD_FLAG"       ).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("BOX_QTY"        ).addValue(qResult.get(i).get(8),"" );
				gdRes.getHeader("SAFETY_STOCK"   ).addValue(qResult.get(i).get(13),"");	
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}     

//공급할당정보 저장
public GridData doSave(GridData gdReq) throws Exception {

//	System.out.println("doSave() start!!!");

	conn = databaseUtility.getConnection("t3sinc"); // DB Connection
	stmt = conn.createStatement(); // statement 객체 생성

	GridData gdRes = new GridData(); // WiseGrid 객체생성

	int rowCount = 0; // CRUD 컬럼 row 수
	

	try {

		// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
		rowCount = gdReq.getHeader("CRUD").getRowCount();
		
		if(rowCount == 0) {
			gdRes.addParam("mode", "doSave");
			gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
			gdRes.setStatus("true");
			return gdRes;
		}
				
		String plant_id  	 = gdReq.getParam("plant_id");
		String item_id 	 	 = gdReq.getParam("item_id");
		String in_cnfm_date  = gdReq.getParam("in_cnfm_date");
		String real_qty  	 = gdReq.getParam("real_qty");
		String conv_qty  	 = gdReq.getParam("conv_qty");
		String box_qty  	 = gdReq.getParam("box_qty");
		String safety_stock  = gdReq.getParam("safety_stock");
		String user_id       = gdReq.getParam("user_id");

		
		//해당 버젼이 있을경우에는 (MERGE INTO문  UPDATE나 INSERT를) 실행!!	
		sql   = "merge into REAL_STOCK RS 				           \n";
		sql  += "using (                                           \n";
		
		sql2  = "	UPDATE  /*+ bypass_ujvc*/ 			           \n";																			
		sql2 += "	( 									           \n";																		
		sql2 += "	SELECT	ID.BOX_PER_PALET, RS2.CONV_QTY NEW_QTY \n";																	
		sql2 += "	FROM	ITEM_DTL ID,                           \n";                                                                                	
		sql2 += "   (                             		           \n";     
		
		sql3  = "merge into STOCK_POLICY_QTY SP                    \n";
		sql3 += "using (                                           \n";
		
		boolean flag = false;
		
		// 데이터 셋팅
		for (int i = 0; i < rowCount; i++) {

			if( flag){
					sql  += "union all \n";
					sql2 += "union all \n";
					sql3 += "union all \n";
				}
				flag = true;
				
				//파라미터를 변수에 적용!!
					
				//-------------------------------------------------------------------------------------------------------------------

				sql += 	"		select '" + gdReq.getHeader("PLANT_ID").getValue(i)  		+ "'   	  AS PLANT_ID,     " 
				+"					   '" + gdReq.getHeader("ITEM_ID").getValue(i)   		+ "'   	  AS ITEM_ID,      " 
				+"					  (SELECT TRUNC(TO_DATE('" + in_cnfm_date + "'),'D')+1 FROM DUAL) AS CNFM_DATE,    " 
				+"					   '" + gdReq.getHeader("REAL_QTY").getValue(i)  		+ "'   	  AS REAL_QTY,     " 
				+"					   '" + user_id  									    + "' 	  AS MADE_BY       "
				+"				from   DUAL 																		   \n";						
               //--------------------------------------------------------------------------------------------------------------------
				sql2 +=  "		select '" + gdReq.getHeader("PLANT_ID").getValue(i)  		+ "'  	  AS PLANT_ID,     " 
				+"				   	   '" + gdReq.getHeader("ITEM_ID").getValue(i)   		+ "'  	  AS ITEM_ID,      " 
				+"					   '" + gdReq.getHeader("CONV_QTY").getValue(i)  		+ "'   	  AS CONV_QTY,     " 
				+"					   '" + user_id  									    + "' 	  AS MADE_BY       "
				+"				from   DUAL 																           \n";
              //---------------------------------------------------------------------------------------------------------------------				
			  //--------------------------------------------------------------------------------------------------------------------
				sql3 +=  "		select '" + gdReq.getHeader("PLANT_ID").getValue(i)  		+ "' 	  AS PLANT_ID,     " 
				+"				   	   '" + gdReq.getHeader("ITEM_ID").getValue(i)   		+ "'  	  AS ITEM_ID,      " 
				+"						(SELECT  MAX(WORK_DATE) FROM STOCK_POLICY_QTY) 			  	  AS WORK_DATE,    "
				+"				       '" + gdReq.getHeader("SAFETY_STOCK").getValue(i)		+ "'      AS SAFETY_STOCK ,"				
				+"				  	   '" + user_id   										+ "' 	  AS MADE_BY       "
				+"				from   DUAL 																           \n";
              //---------------------------------------------------------------------------------------------------------------------				
			} 
								
	//	}//for문 끝.
		//-----------------------------Merge Into 1----------------------------------------------------------------------------------
		sql += ") RS1 														   \n";
		sql += "ON (RS.LOC_ID      = RS1.PLANT_ID    						   \n";
		sql += "AND RS.ITEM_ID     = RS1.ITEM_ID            				   \n";
		sql += "AND RS.USABLE_DATE = RS1.CNFM_DATE)							   \n";
		sql += "when matched then update set            					   \n";
		sql += "     RS.QTY        = RS1.REAL_QTY      						   \n";
		sql += "when not matched then insert(RS.USABLE_DATE, RS.LOC_TYPE, RS.LOC_ID,    RS.ITEM_ID,  RS.ITYPE, RS.QTY,       RS.QTY_UOM, RS.MADE_TYPE, RS.MADE_DTTM, RS.MADE_BY)\n";
		sql += "values                      (RS1.CNFM_DATE,  'PLANT',     RS1.PLANT_ID, RS1.ITEM_ID,  'HALB',   RS1.REAL_QTY,   'EA' ,       'AD',          SYSDATE,   RS1.MADE_BY) \n";
        //---------------------------------------------------------------------------------------------------------------------------		
		//-----------------------------Merge Into 2----------------------------------------------------------------------------------		
		sql2 += ") RS2 														   \n";
		sql2 += " WHERE ID.PLANT_ID 	 = RS2.PLANT_ID                        \n";
		sql2 += " AND   ID.ITEM_ID  	 = RS2.ITEM_ID                         \n";
		sql2 += " )							                                   \n";
		sql2 += " SET	BOX_PER_PALET    = NEW_QTY							   \n";		
        //---------------------------------------------------------------------------------------------------------------------------		
		//-----------------------------Merge Into 3----------------------------------------------------------------------------------
		sql3 += ") RS3 														   \n";
		sql3 += "ON (SP.LOC_ID      = RS3.PLANT_ID                             \n";
		sql3 += "AND SP.ITEM_ID     = RS3.ITEM_ID                              \n";
		sql3 += "AND SP.LOC_TYPE    = 'PLANT'                                  \n";
		sql3 += "AND SP.WORK_DATE   = RS3.WORK_DATE)                           \n";
		sql3 += "when matched then update set        						   \n";
		sql3 += " SP.CAMP_STOC      = RS3.SAFETY_STOCK                         \n";
		sql3 += "when not matched then insert(SP.WORK_DATE, SP.LOC_TYPE, SP.LOC_ID,    SP.ITEM_ID,  SP.CAMP_STOC, SP.QTY_UOM, SP.MADE_TYPE, SP.MADE_DTTM, SP.MADE_BY) \n";
		sql3 += "values                      (RS3.WORK_DATE,  'PLANT',   RS3.PLANT_ID, RS3.ITEM_ID, RS3.SAFETY_STOCK,   'EA',        'AD',     SYSDATE,   RS3.MADE_BY)\n";                                
        //---------------------------------------------------------------------------------------------------------------------------		
		System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
		System.out.println(sql);
		System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
		
		System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
		System.out.println(sql2);
		System.out.println("-----------------------------------------------QUERY-----------------------------------------------");

		System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
		System.out.println(sql3);
		System.out.println("-----------------------------------------------QUERY-----------------------------------------------");

		
		System.out.println("executeQuery 실행!!!");
		
		rs = databaseUtility.executeQuery(stmt, sql);
		rs = databaseUtility.executeQuery(stmt, sql2);
		rs = databaseUtility.executeQuery(stmt, sql3);
		
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
}