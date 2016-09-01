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
public class group_list extends HttpServlet {
	

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
		
		
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("printWirter 위!!!!!!!!!!!!!!!!!!");
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		
		PrintWriter out = res.getWriter();
		
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		
		try {
			// WISEGRID_DATA Param WiseGridG
			String rawData = req.getParameter("WISEGRID_DATA");
			
			System.out.println("rawData: ys"+rawData);
						
			// 
			gdReq = OperateGridData.parse(rawData);
			
			System.out.println("gdReq: ys"+gdReq);

			//
			String mode = gdReq.getParam("mode");
			
			System.out.println("mode: ys"+mode);

			if (mode.equals("search")) // 
				gdRes = doQuery(gdReq);
			else if (mode.equals("insert")) // 
				gdRes = doInsert(gdReq); 
			else if (mode.equals("update")) // 
				gdRes = doUpdate(gdReq);				
			else if (mode.equals("delete")) // 
				gdRes = doDelete(gdReq);
			else if (mode.equals("save"))
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
		    
		  long startPoint = 0L; // 시작포인트
		  long endPoint = 0L;  // 마지막포인트
		  long rowCount = 0L;  // 전체데이터 수

		  try {
		   /* WiseGrid에서 올라온 컬럼정보를 gdRes에 복사한다.
		    * GridData 객체를 복사하여 새로운 GridData객체를 생성한다.
		    */
		   gdRes = OperateGridData.cloneResponseGridData(gdReq);
		  
		   String _board_search_condition = gdReq.getParam("_board_search_condition");
		   String _board_search_value = gdReq.getParam("_board_search_value");
		   String paramKey = "_board_search_condition!%!_board_search_value";
		   String paramCode = _board_search_condition + "!%!" + _board_search_value;
		   String query_id = "group_list";
		   
		   ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
		   rowCount = qResult.size();
		   /* 본 예제는 DB Connection은 하지 않고 별도의 샘플 데이터를 사용해 조회한다.  */  
		   //sample_data sd = new sample_data();
		   System.out.println("데이터 가져옴_크기: "+ rowCount);
		   long pageCount = 0L; // 보여질 데이터 
		   long pageIndex = 0L; // 페이지인덱스
		   
		   if (gdReq.getTotalCount() == -1L) {   
		              
		    /* 임시로 만든 데이터의 rowCount를 전체 Count로 셋팅한다.
		     * WiseGrid가 전체 데이터가 모두 받아졌는지 판단하는 데이터로 사용된다.
		     */ 
		    //rowCount = sd.getRowcount();
		    gdRes.setTotalCount(rowCount);
		    
		    /* 보여질 데이터수, 시작 인덱스를 셋팅한다.
		     * 보여질 데이터 수가 총 데이터 count보다 크거나 같으면 
		     * 페이징 combobox는 만들어 지지 않는다.
		     */
		    
		    gdRes.setNavigateValue("10,0");

		    pageCount = 10L; // 보여질 데이터 수 
		    pageIndex = 0L; // 시작 인덱스

		   } else {
		    // 임시로 만든 데이터의 rowCount를 전체 Count로 셋팅한다.
		    gdRes.setTotalCount(gdReq.getTotalCount());
		    
		    // 받아온 NavigateValue의 값을 셋팅한다.
		    gdRes.setNavigateValue(gdReq.getNavigateValue());
		    
		    // 받아온 NavigateValue의 값을 ","로 구분해서 naviValue의 배열에 넣는다.
		    String naviValue[] = gdRes.getNavigateValue().split(",");
		    
		    /* 0번째 배열에는 보여질 데이터 수
		     * 1번째 배열에는 페이지 인덱스 수
		     */
		    pageCount = Long.parseLong(naviValue[0]);
		    pageIndex = Long.parseLong(naviValue[1]);
		    
		    // 로우카운트에 가져온 전체 카운트수를 넣는다..
		    rowCount = gdReq.getTotalCount();
		   }

		   // startPoint와 endPoint를 계산한다.
		   startPoint = pageCount * pageIndex ;
		   endPoint = startPoint + pageCount ;
		   

		   /* 
		    * 전체카운트보다 endPoint가 더 클경우 
		    * 조회가 완료된 경우이므로 endPoint에 전체 카운트를 대입한다.
		    */ 
		   if (endPoint >= rowCount)
			   endPoint = rowCount;
		   
		   // startPoint와 endPoint를 int 값으로 변환한다,
		   int start = Integer.parseInt(String.valueOf(startPoint));
		   int end = Integer.parseInt(String.valueOf(endPoint));
		   
		   // DB 사용시 RowNnm을 사용하므로 
		   // DB startPoint = pageCount * pageIndex + 1
		   // DB endPoint = startPoint +(viewCount - 1) 로 해준다.  

		   // startPoint에서 endPoint까지의 데이터를 가져와서 데이터를 셋팅한다.
		   for (int i = start; i < end; i++) {
		   //GROUP_ID, GROUP_NAME 
		    
			gdRes.getHeader("CRUD").addValue("", "");				
			//gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("GROUP_ID").addValue(qResult.get(i).get(0), "");
			gdRes.getHeader("GROUP_NAME").addValue(qResult.get(i).get(1), "");
		   } 

		   if(rowCount == 0)
		    gdRes.setMessage("조회결과가 없습니다.");   
		   else
		    gdRes.setMessage( (startPoint+1) + " - " + endPoint + " 까지 조회되었습니다.");
		   
		   // 화면에 전달할 Status를 설정한다
		   gdRes.setStatus("true");

		  } catch (Exception e) {
		   throw e;
		  }
		  
		  return gdRes;
		 }
	
	

	public GridData doQuery_old(GridData gdReq) throws Exception {
		
		System.out.println("메뉴클릭시!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		
		GridData gdRes = new GridData();
		
		
		long startPoint = 0L;	// 시작포인트
		long endPoint = 0L;		// 마지막포인트
		long rowCountall = 0L;		// 전체데이터 수
		
		
		int rowCount = 0;

		try {
			/* WiseGrid에서 올라온 컬럼정보를 gdRes에 복사한다.
			 * GridData 객체를 복사하여 새로운 GridData객체를 생성한다.
			 */			
			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			
			
			long pageCount = 0L; // 보여질 데이터 
			long pageIndex = 0L; // 페이지인덱스
			

			
			
			
			//String from_date = gdReq.getParam("from_date");
			//String to_date = gdReq.getParam("to_date");
			
			String _board_search_condition = gdReq.getParam("_board_search_condition");
			String _board_search_value = gdReq.getParam("_board_search_value");
			String paramKey = "_board_search_condition!%!_board_search_value";
			String paramCode = _board_search_condition + "!%!" + _board_search_value;
			String query_id = "group_list";
			
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
				gdRes.getHeader("CRUD").addValue("", "");				
				//gdRes.getHeader("SELECTED").addValue("0", "");
				gdRes.getHeader("GROUP_ID").addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("GROUP_NAME").addValue(qResult.get(i).get(1), "");
				
			}
			System.out.println("rowCount ys2:"+rowCount);
			
			/* 
			 * 
			 * Status
			 */		
			gdRes.addParam("mode", "search");		
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		
		System.out.println("gdRes:"+gdRes);
				
		return gdRes;
	}

	
	/* 2009년 2월 9일 yongsoo update, insert, delete */
	/* 저장 */
	public GridData doSave(GridData gdReq) throws Exception {
		
		System.out.println("doSave 까지 탐!!!");
		
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
	    stmt = conn.createStatement();                  // statement 객체 생성
	    String message = null;
		
		GridData gdRes = new GridData(); // WiseGrid 객체생성
		
		int rowCount = 0;
		int chkRowCnt = 0;
		
		String rsget = null;
		
		System.out.println("rowcnt: "+gdReq.getHeader("GROUP_ID").getRowCount());
						
		try {
			
			//화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			ArrayList createDataList = new ArrayList(rowCount);
			ArrayList updateDataList = new ArrayList(rowCount);
			ArrayList deleteDataList = new ArrayList(rowCount);
			
			System.out.println("rowCount:"+rowCount);
			System.out.println("chkRowCnt:"+chkRowCnt);
		 		 						
			//데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
			 
				//화면에서 전달받은 "CRUD"의 HiddenValue를 가져온다.
				String crud = gdReq.getHeader("CRUD").getHiddenValue(i);
				
				if (crud.equals("C")) {
					System.out.println("인설트!!! 행을 생성하여 저장!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_insert";
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID!%!GROUP_NAME";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i)+"!%!";
							paramCode = paramCode + gdReq.getHeader("GROUP_NAME").getValue(i);
							

							//다중 추가시 문제 해결 부분 쿼리에서 에러 안나오게 하기위해 추가함.
							String sql= "";     
							       sql = "select GROUP_ID from REG_GROUP where GROUP_ID = '";
							       sql = sql + gdReq.getHeader("GROUP_ID").getValue(i)+ "'";       
							       rs = databaseUtility.executeQuery(stmt, sql);       
							        
							       if( rs.next() == false ){
							       	  new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							       }else{
							       	  System.out.println("값있음,,,;;");
							       }
							//다중추가 문제  끝.
							
							        
						  //new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
					}
					
					
					
					
				} else if (crud.equals("U")) {
					System.out.println("업데이트!! 수정한값을 저장!!!!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_update";
					
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID!%!GROUP_NAME";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i)+"!%!";
							paramCode = paramCode + gdReq.getHeader("GROUP_NAME").getValue(i);
							new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
					}
					
					
					
				} else if (crud.equals("D")) {
					System.out.println("삭제!! 선택한값을 삭제함!!!!!");
					
					String paramKey = "";
					String paramCode = "";
					String query_id = "group_list_delete";
					
					
					try {
						//
						rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

							
							paramKey = "GROUP_ID";
							
							paramCode = gdReq.getHeader("GROUP_ID").getValue(i);
							new CommonUtil().executeQuery(paramKey,paramCode,query_id);
							
					}catch (Exception e) {
							throw e;
						}
					
					
				}
			}
					
			/*
			 * 생성된 3개의 자료구조를 DataBase에 넘겨 처리한다.
			 */
			
			// 이 예제는 통합통신의 동작을 확인하기 위한 샘플이므로
			// 만들어진 데이터를 화면의 fieldset으로  보내 정상적으로 통신이 이루어졌는지 확인한다.
			//String returnData = getSendData(createDataList, "C");
			//returnData += getSendData(updateDataList, "U");
			//returnData += getSendData(deleteDataList, "D");

			/* 화면에 전달할  파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */			
			gdRes.addParam("mode", "save");
			//gdRes.addParam("saveData", returnData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}
	
	private String getSendData(ArrayList sendData, String CRUDFlag) {
		
		StringBuffer sbData = new StringBuffer();
							
		for(int i = 0; i < sendData.size(); i++) {
			String[] rowData = (String[])sendData.get(i);					
			
			
			for(int k = 0; k < rowData.length; k++){
				sbData.append("[" + rowData[k] + "]");
			}
			sbData.append("\n");
		 
		}
		
			
		if (CRUDFlag.equals("C"))		
			sbData.append(sendData.size() + " 건의 데이터가 등록되었습니다.\n\n");	
		else if (CRUDFlag.equals("U"))	
			sbData.append(sendData.size() + " 건의 데이터가 수정되었습니다.\n\n");
		else if (CRUDFlag.equals("D"))
			sbData.append(sendData.size() + " 건의 데이터가 삭제되었습니다.\n\n");
			
		return sbData.toString();
	}	
	
	
	
	/* 2009년 2월 9일 yongsoo update, insert, delete 끝...*/
	
	
	
	
	
	
	
	
	
	/**
	 * UI Connection LOG
	 * @param login_id
	 * @param service_id
	 * @param connection_ip
	 * @return
	 */
/*	
	public String insertLogs(String login_id, String service_id, String connection_ip) {
		
		String returnVal = null; 
	    System.out.println("login_id_:_" + login_id + "_::_service_id_:_" + service_id + "_::_connection_ip_:_" + connection_ip); 
	    Map parameterMap = new HashMap(); 
	    parameterMap.put("login_id", login_id); 
	    parameterMap.put("service_id", service_id); 
	    parameterMap.put("connection_ip", connection_ip); 
	    String queryId = "insert_connection_logs"; 
	    try {
	    	conn = databaseUtility.getConnection("t3sinc");
	    	stmt = conn.createStatement();
			System.out.println(databaseUtility.getQueryString(queryId, parameterMap));
		    databaseUtility.executeUpdate(stmt, queryId, parameterMap);
			
	    }catch(SQLException e){
	        e.printStackTrace(); 
	        returnVal = e.toString(); 
	    } finally {
			// ERROR CHECK END 
			databaseUtility.close(conn, stmt); 
		}
	    returnVal = "Success"; 
		return returnVal; 
	}	
*/	
	
	

	/* 등록 */
	
	
	private GridData doInsert(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();
		int rowCount = 0;
		
		
		String _board_search_condition = gdReq.getParam("_board_search_condition");
		String _board_search_value = gdReq.getParam("_board_search_value");
		String paramKey = "_board_search_condition!%!_board_search_value";
		String paramCode = _board_search_condition + "!%!" + _board_search_value;
		String query_id = "group_list";
		
		ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);
		
		rowCount = qResult.size();
		
		
		
		// append한 StringBuffer를 insert_data에 넘긴다.			
		String insertData = "";

		try {
			
	    
			
			// 화면에서 전달받은 "SEQ_NO"의 Count를 가져온다.
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();
			
			// 등록시 입력할 데이터를 정해진 형태로 만들어 놓는다.
			String inData[][] = new String[rowCount][];

			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}
			
			/*
			 * 생성된 자료구조를 DataBase에 넘겨 처리한다.
			 */
			
			// 이 예제는 동적헤더의 동작을 확인하기 위한 샘플이므로
			// 만들어진 데이터를 화면의 fieldset으로  보내 정상적으로 통신이 이루어졌는지 확인한다.			
			insertData = getSendData(inData, "C");	
			
			/* 화면에 전달할  파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */	
			gdRes.addParam("mode", "insert");
			gdRes.addParam("insert_data", insertData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}

	/**/
	private GridData doUpdate(GridData gdReq) throws Exception {		
 
		System.out.println("업데이트!!!");
		GridData gdRes = new GridData();
		int rowCount = 0;
				
		String updatedata = "";
		
		String paramKey = "";
		String paramCode = "";
		String query_id = "group_list_update";

		try {
			//
			rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

			
			for (int i = 0; i < rowCount; i++) {	
				
				paramKey = "GROUP_ID!%!GROUP_NAME";
				
				paramCode = gdReq.getHeader("GROUP_ID").getValue(i)+"!%!";
				paramCode = paramCode + gdReq.getHeader("GROUP_NAME").getValue(i);
				new CommonUtil().executeQuery(paramKey,paramCode,query_id);
			}

			
			
			
			/*
			String inData[][] = new String[rowCount][];
			

			
			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}

			updatedata = getSendData(inData, "U");
			*/
			

			
			gdRes.addParam("mode", "update");
			gdRes.addParam("update_data", updatedata);
			gdRes.setMessage("Success");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}

	/* 삭제 */
	private GridData doDelete(GridData gdReq) throws Exception {
		
		System.out.println("삭제!!!!!!");
		GridData gdRes = new GridData();
		int rowCount = 0;
				
		String deleteData = "";
		
		String paramKey = "";
		String paramCode = "";
		String query_id = "group_list_delete";

		try {
			//
			rowCount = gdReq.getHeader("GROUP_ID").getRowCount();

			
			for (int i = 0; i < rowCount; i++) {	
				
				paramKey = "GROUP_ID";
				
				paramCode = gdReq.getHeader("GROUP_ID").getValue(i);
				new CommonUtil().executeQuery(paramKey,paramCode,query_id);
			}
			
			gdRes.addParam("mode", "delete");
			gdRes.addParam("delete_data", deleteData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
			

		} catch (Exception e) {
			throw e;
		}
		return gdRes;
	}
	
	private String getSendData(String[][] sendData, String flag) {
		
		StringBuffer sbData = new StringBuffer();
					
		for(int i = 0; i < sendData.length; i++) {
			String[] rowData = (String[])sendData[i];
			for(int j = 0; j < rowData.length; j++)
				sbData.append("[" + rowData[j] + "]");
			sbData.append("\n");
		}
		
		if(flag.equals("C"))
			sbData.append(sendData.length + "\n");
		else if(flag.equals("U"))
			sbData.append(sendData.length + "\n");
			
		return sbData.toString();
	}
	
	private String getSendData2(String[] sendData) {
		
		StringBuffer sbData = new StringBuffer();
		
		sbData.append(sendData.length + "\n");
			
		return sbData.toString();
	}
}