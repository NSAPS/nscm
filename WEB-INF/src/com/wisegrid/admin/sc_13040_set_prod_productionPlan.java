
package com.wisegrid.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zionex.t3sinc.common.CommonUtil;
import com.zionex.t3sinc.util.db.SincDatabaseUtility;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;


/**
 * 
 * @author iCOMPIA CORP.
 */
public class sc_13040_set_prod_productionPlan extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;

	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	String sql = null;

	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		
		GridData gdReq = null;
		GridData gdRes = null;

		System.out.println("START... sc_13040_set_prod_productionPlan");

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

			if (mode.equals("search")) // 조회
				gdRes = doQuery(gdReq);
			else if (mode.equals("save")) // 저장
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

	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0; 

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			String checked_weekly = gdReq.getParam("checked_weekly");
			String plant_version = gdReq.getParam("plant_version");
			String proc_code = gdReq.getParam("proc_code");
			
			String paramKey = "checked_weekly!%!plant_version!%!proc_code";
			String paramCode = checked_weekly + "!%!" + plant_version  + "!%!" + proc_code;
			String query_id = "sc_13040_set_prod_productionPlan";

			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			// 
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");
				gdRes.setMessage("...");
				gdRes.setStatus("true");
				return gdRes;
			}
			

			
	        
	        //그리드에 data input
			for (int i = 0; i < rowCount; i++) {
				
				
				gdRes.getHeader("CRUD"			).addValue("", "");// CRUD
				gdRes.getHeader("C01"			).addValue(i + "", "");// 번호
				gdRes.getHeader("C02"			).addValue(qResult.get(i).get(0), "");// 업체
				gdRes.getHeader("C03"			).addValue(qResult.get(i).get(1), "");// 업체
				gdRes.getHeader("C04"			).addValue(qResult.get(i).get(2), "");// 생산버전
				gdRes.getHeader("C05"			).addValue(qResult.get(i).get(3), "");// 저장위치
				gdRes.getHeader("C06"			).addValue(qResult.get(i).get(4), "");// 저장위치
				
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(6), "");// 규격
				
				gdRes.getHeader("C07"			).addValue(qResult.get(i).get(7), "");// 설비유형
				gdRes.getHeader("C08"			).addValue(qResult.get(i).get(8), "");// 원가부문
				gdRes.getHeader("C09"			).addValue(qResult.get(i).get(9), "");// 남자
				gdRes.getHeader("C010"			).addValue(qResult.get(i).get(10), "");// 여자
				gdRes.getHeader("C011"			).addValue(qResult.get(i).get(11), "");// CAPA
				gdRes.getHeader("C012"			).addValue(qResult.get(i).get(12), "");// 비용
				gdRes.getHeader("C013"			).addValue(qResult.get(i).get(13), "");// 의뢰량
				
				gdRes.getHeader("SP01").addValue("", "");
				gdRes.getHeader("D01A"			).addValue(qResult.get(i).get(14), "");// 월
				gdRes.getHeader("SP02").addValue("", "");
				gdRes.getHeader("D02A"			).addValue(qResult.get(i).get(15), "");// 화
				gdRes.getHeader("SP03").addValue("", "");
				gdRes.getHeader("D03A"			).addValue(qResult.get(i).get(16), "");// 수
				gdRes.getHeader("SP04").addValue("", "");
				gdRes.getHeader("D04A"			).addValue(qResult.get(i).get(17), "");// 목
				gdRes.getHeader("SP05").addValue("", "");
				gdRes.getHeader("D05A"			).addValue(qResult.get(i).get(18), "");// 금
				gdRes.getHeader("SP06").addValue("", "");
				gdRes.getHeader("D06A"			).addValue(qResult.get(i).get(19), "");// 토
				gdRes.getHeader("SP07").addValue("", "");
				gdRes.getHeader("D07A"			).addValue(qResult.get(i).get(20), "");// 일
				gdRes.getHeader("SP08").addValue("", "");

				gdRes.getHeader("TOT"			).addValue(qResult.get(i).get(21), "");// 합계
				gdRes.getHeader("DIFF"	).addValue(qResult.get(i).get(22), "");// 차이
				
				/* 일자별  WO_ID */
				gdRes.getHeader("D01W"			).addValue(qResult.get(i).get(23), "");// 일
				gdRes.getHeader("D02W"			).addValue(qResult.get(i).get(24), "");// 일
				gdRes.getHeader("D03W"			).addValue(qResult.get(i).get(25), "");// 일
				gdRes.getHeader("D04W"			).addValue(qResult.get(i).get(26), "");// 일
				gdRes.getHeader("D05W"			).addValue(qResult.get(i).get(27), "");// 일
				gdRes.getHeader("D06W"			).addValue(qResult.get(i).get(28), "");// 일
				gdRes.getHeader("D07W"			).addValue(qResult.get(i).get(29), "");// 일
				/* 일자별  IF_FLAG */
				gdRes.getHeader("D01F"			).addValue(qResult.get(i).get(30), "");// 일
				gdRes.getHeader("D02F"			).addValue(qResult.get(i).get(31), "");// 일
				gdRes.getHeader("D03F"			).addValue(qResult.get(i).get(32), "");// 일
				gdRes.getHeader("D04F"			).addValue(qResult.get(i).get(33), "");// 일
				gdRes.getHeader("D05F"			).addValue(qResult.get(i).get(34), "");// 일
				gdRes.getHeader("D06F"			).addValue(qResult.get(i).get(35), "");// 일
				gdRes.getHeader("D07F"			).addValue(qResult.get(i).get(36), "");// 일				
				
			}
		
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "search");
			gdRes.setMessage("조회 완료");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}

	/*
	 * insert, update, delete
	 */
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("C01").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("성공적으로 작업하였습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("CRUD Row Count : " + rowCount);
			
			String sql = "";
			sql += "insert into SET_PROD_SCH_PLAN_MATRIX(PLANT_ID, PROD_VER, PROC_ID, ITEM_ID, PROD_DATES, SHIFT_TYPE, SHIFT_QTY, WO_ID, IF_FLAG, MADE_DTTM, MADE_BY ,CRUD) \n";

			String prod_dates = gdReq.getParam("prod_dates");
			String made_by = gdReq.getParam("user_id");
			
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
                String curdValue = gdReq.getHeader("CRUD").getHiddenValue(i);;
				
				if( i > 0){
					sql += "union all \n"; 
				}
				String crud = gdReq.getHeader("CRUD").getValue(i);
				System.out.println(crud);
				String plant_id = "1300";//공장코드
				//String plant_id = gdReq.getHeader("C02").getHiddenValue(i);//공장코드
				String version = "st";//버전
				//String proc_id = gdReq.getHeader("C07").getHiddenValue(i);//작업장 코드
				
				
				String prod_ver = gdReq.getHeader("C06").getValue(i);//생산버전
				String proc_id	= gdReq.getHeader("C02").getValue(i);//업체코드\
				String loc_id	= gdReq.getHeader("C04").getValue(i);//업체코드\
				
				String item_id = gdReq.getHeader("ITEM_ID").getValue(i);//작업장 코드
				
				
				if(crud.equals("삭제")){
					//--월(조/주/야)---------------------------------------------------------------------------------------------------
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)'),'YYYYMMDD')   ,'" + 1 + "' , '" + 0 + "','" + "' ,'', ''" + " ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--화(조/주/야)--------------------------------------------------------------------------------------------------                                                                   
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "' ,'', ''" + " ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--수(조/주/야)--------------------------------------------------------------------------------------------------                                                                   
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "' ,'', ''" + " ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--목(조/주/야)--------------------------------------------------------------------------------------------------                                                                   
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "' ,'', ''" + " ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--금(조/주/야)--------------------------------------------------------------------------------------------------                                                                   
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "' ,'', ''" + " ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--토(조/주/야)-------------------------------------------------------------------------------------------------                                                                    
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "' ,'', ''" + " ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL union all \n";
					//--일(조/주/야)--------------------------------------------------------------------------------------------------                                                                   
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'" + 1 + "' , '" + 0 + "','" + "' ,'', ''" + " ,SYSDATE ,'" + made_by + "'  ,'"+curdValue+"' from DUAL ";
				}
				else{
					//--월(조/주/야)--------------------------------------------------------------------------------------------------
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)'),'YYYYMMDD')   ,'"+1+"' , '"+gdReq.getHeader("D01A").getValue(i)+"','"+gdReq.getHeader("D01W").getValue(i)+"','"+gdReq.getHeader("D01F").getValue(i)+"', SYSDATE,'"+made_by+"', '"+curdValue+"' from DUAL union all \n";
					//--화(조/주/야)--------------------------------------------------------------------------------------------------                                                                                                                                                                       
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+1,'YYYYMMDD') ,'"+1+"' , '"+gdReq.getHeader("D02A").getValue(i)+"','"+gdReq.getHeader("D02W").getValue(i)+"','"+gdReq.getHeader("D02F").getValue(i)+"', SYSDATE,'"+made_by+"', '"+curdValue+"' from DUAL union all \n";
					//--수(조/주/야)--------------------------------------------------------------------------------------------------                                                                                                                                                                       
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+2,'YYYYMMDD') ,'"+1+"' , '"+gdReq.getHeader("D03A").getValue(i)+"','"+gdReq.getHeader("D03W").getValue(i)+"','"+gdReq.getHeader("D03F").getValue(i)+"', SYSDATE,'"+made_by+"', '"+curdValue+"' from DUAL union all \n";
					//--목(조/주/야)--------------------------------------------------------------------------------------------------                                                                                                                                                                       
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+3,'YYYYMMDD') ,'"+1+"' , '"+gdReq.getHeader("D04A").getValue(i)+"','"+gdReq.getHeader("D04W").getValue(i)+"','"+gdReq.getHeader("D04F").getValue(i)+"', SYSDATE,'"+made_by+"', '"+curdValue+"' from DUAL union all \n";
					//--금(조/주/야)--------------------------------------------------------------------------------------------------                                                                                                                                                                       
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+4,'YYYYMMDD') ,'"+1+"' , '"+gdReq.getHeader("D05A").getValue(i)+"','"+gdReq.getHeader("D05W").getValue(i)+"','"+gdReq.getHeader("D05F").getValue(i)+"', SYSDATE,'"+made_by+"', '"+curdValue+"' from DUAL union all \n";
					//--토(조/주/야)--------------------------------------------------------------------------------------------------                                                                                                                                                                       
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+5,'YYYYMMDD') ,'"+1+"' , '"+gdReq.getHeader("D06A").getValue(i)+"','"+gdReq.getHeader("D06W").getValue(i)+"','"+gdReq.getHeader("D06F").getValue(i)+"', SYSDATE,'"+made_by+"', '"+curdValue+"' from DUAL union all \n";
					//--일(조/주/야)--------------------------------------------------------------------------------------------------                                                                                                                                                                       
					sql += "select '"+plant_id+"' ,'"+prod_ver+"' ,'"+proc_id+"' ,'"+item_id+"' ,to_char(to_date('"+prod_dates+ "','YYYY MM/DD(DY)')+6,'YYYYMMDD') ,'"+1+"' , '"+gdReq.getHeader("D07A").getValue(i)+"','"+gdReq.getHeader("D07W").getValue(i)+"','"+gdReq.getHeader("D07F").getValue(i)+"', SYSDATE,'"+made_by+"', '"+curdValue+"' from DUAL ";
				}
				
			}
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			System.out.println("call SP_13040_SetProdProductionPlan() 실행!!!");
			
			String sql2 = "call SP_13040_SetProdProductionPlan('" + made_by + "')";
			
			stmt.execute(sql2);
			
			System.out.println("call SP_13040_SetProdProductionPlan() 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		} finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doSave() end!!!");

		return gdRes;
	}


}