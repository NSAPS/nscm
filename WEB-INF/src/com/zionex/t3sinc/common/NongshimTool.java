package com.zionex.t3sinc.common;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.apache.log4j.Logger;

import com.zionex.t3sinc.util.db.SincDatabaseUtility;

public class NongshimTool {
	private static final Logger logger_ = Logger.getLogger(NongshimTool.class);
	private static boolean isUser = false;
	
	public List<String> getFourDivisionSide(List<?> rows) {
		if (rows == null || rows.size() == 0) {return null;}

		int iOneDivisionSide = 0;
		int iTwoDivisionSide = 0;
		int iThreeDivisionSide = 0;
		int iFourDivisionSide = 0;
		
		for (Iterator<?> iRow = rows.iterator(); iRow.hasNext();) {
			List<?> columns = (List<?>) iRow.next();
			String nSideString = (String) columns.get(8);
			if (nSideString.equals("1")) {
				iOneDivisionSide ++;
			} else if (nSideString.equals("2")) {
				iTwoDivisionSide ++;
			} else if (nSideString.equals("3")) {
				iThreeDivisionSide ++;
			} else {
				iFourDivisionSide ++;
			}		
		}
		
		List<String> fourDivisionSides = new ArrayList<String>();
		fourDivisionSides.add(String.valueOf(iOneDivisionSide));
		fourDivisionSides.add(String.valueOf(iTwoDivisionSide));
		fourDivisionSides.add(String.valueOf(iThreeDivisionSide));
		fourDivisionSides.add(String.valueOf(iFourDivisionSide));
		
		return fourDivisionSides;
	}

	public static String getData(String paramKey, String paramCode, String queryId, 
			String columns, String colDelimeter, String rowDelimeter) {
		
	    Connection conn = null;
		Statement stmt	= null;
		ResultSet rs	= null;

		StringBuffer data = new StringBuffer();
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

		try {
			System.out.println("paramKey"+paramKey+"\\paramCode"+paramCode+"\\queryId"+queryId);
			System.out.println("columns"+columns+"\\colDelimeter"+colDelimeter+"\\rowDelimeter"+rowDelimeter);
		    conn = databaseUtility.getConnection("fcst");
		    stmt = conn.createStatement();

			String[] paramKeyArr = paramKey.split(colDelimeter);
			String[] paramCodeArr = paramCode.split(colDelimeter);
			Map<String, String> parameterMap = new HashMap<String, String>();

			for (int i = 0; i < paramKeyArr.length; i++) {
				parameterMap.put(paramKeyArr[i], paramCodeArr[i]);
			}
			logger_.info(databaseUtility.getQueryString(queryId, parameterMap));

			rs = databaseUtility.executeQuery(stmt, queryId, parameterMap);
			String[] columnArr = columns.split(colDelimeter);

			while (rs.next()) {
				for (int i = 0; i < columnArr.length; i++) {
					data.append(rs.getString(columnArr[i]))
						.append(i == columnArr.length - 1 ? rowDelimeter : colDelimeter);
				}
			}			

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} finally {
			//	ERROR CHECK END
			databaseUtility.close(conn, stmt, rs);
		}
		return data.toString();
	}

	public static String updateData(String paramKey, String paramCode, 
			String queryId,	String colDelimeter) {

        Connection connection = null;
        Statement  statement  = null;
        final SincDatabaseUtility databaseUtility = new SincDatabaseUtility();

        try {
            connection = databaseUtility.getConnection("fcst");
            statement  = connection.createStatement();

            String[] paramKeyArr = paramKey.split(colDelimeter);
			String[] paramCodeArr = paramCode.split(colDelimeter);
			Map<String, String> parameterMap = new HashMap<String, String>();

			for (int i = 0; i < paramKeyArr.length; i++) {
				parameterMap.put(paramKeyArr[i], paramCodeArr[i]);
			}

			logger_.info(databaseUtility.getQueryString(queryId, parameterMap));
			databaseUtility.executeUpdate(statement, queryId, parameterMap);
//            final int result = databaseUtility.executeUpdate(statement, queryId, parameterMap);
//            if (result == 1) {
//            	logger_.info("Update 실패!!");
//            } else {
//            	logger_.info("Update 성공!!");
//            }

        } catch (SQLException e) {
            e.printStackTrace();

        } finally {
            //  ERROR CHECK END
            databaseUtility.close(connection, statement);
        }
        
        return "true";        
    }	
	
	public static String loadData(String paramKey, String paramCode, String queryIds,
			String columns, String types) throws Exception {
		
	    Connection conn = null;
		Statement stmt	= null;
		ResultSet rs	= null;
	
		SincDatabaseUtility databaseUtility = new SincDatabaseUtility();
		try {
		    conn = databaseUtility.getConnection("fcst");
		    stmt = conn.createStatement();

			String[] paramKeyArr = paramKey.split("!%!");
			String[] paramCodeArr = paramCode.split("!%!");
			Map<String, String> parameterMap = new HashMap<String, String>();

			for (int i = 0; i < paramKeyArr.length; i++) {
				parameterMap.put(paramKeyArr[i], paramCodeArr[i]);
			}
			
			String[] queryIdArr = queryIds.split(",");
			int queryLength = queryIdArr.length;
			Object[] tables = new Object[queryLength];
			
			for (int i = 0; i < queryLength; i++) {
				logger_.info(databaseUtility.getQueryString(queryIdArr[i], parameterMap));						
				tables[i] = databaseUtility.getQueryString(queryIdArr[i], parameterMap);
			}
			
			if(!isUser) {
				isUser = true;
				String[] processType = types.split(",");		
				runT3Demand(tables, processType);
				isUser = false;
				
			} else {				
				return "현재 다른 사용자가 수요예측을 실행 중에 있습니다. 잠시 후에 이용하여 주십시요.";
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} finally {
			// ERROR CHECK END
			databaseUtility.close(conn, stmt, rs);
		}
		
		return "true";
	}
	
	public static void runT3Demand(Object[] tables, Object[] processTypes) throws Exception {
		
		ClientXMLRPC client = new ClientXMLRPC("http://172.25.1.144:8080/XMLRPC");  //농심엔진개발IP: 172.25.1.241 , 농심엔진운영IP: 172.25.1.144
		Hashtable<String, Serializable> parameters = new Hashtable<String, Serializable>();
		parameters.put("action", "forecast");
	
		// must be 2 sqls in order (20080715)		
		Vector<Object> sqls = new Vector<Object>();
		sqls.add(tables[0]);
		sqls.add(tables[1]);
		parameters.put("selects", sqls);
		
		Vector<Object> methods = new Vector<Object>();
		methods.addAll(Arrays.asList(processTypes));
		parameters.put("operations", methods);
	
		Vector<Object> dels = new Vector<Object>();
		dels.add(tables[2]);
		dels.add(tables[3]);
		dels.add(tables[4]);
		dels.add(tables[5]);
		parameters.put("deletes", dels);		
		
		client.execute(parameters);		
	}
	
	public static int getTotal(List<?> rows) {		
		if (rows == null || rows.size() == 0) {return 0;}
		
		String beforeKey = "";
		int rowCnt = 0;
		for (Iterator<?> iRow = rows.iterator(); iRow.hasNext();) {
			List<?> columns = (List<?>) iRow.next();
			
			String itemId = columns.get(0).toString();			
			String salesId = columns.get(2).toString();			
			String deliveryId = columns.get(4).toString();		
			
			String nowKey = itemId + salesId + deliveryId;			
			if (!beforeKey.equals(nowKey)) {
				beforeKey = nowKey;
				rowCnt++;
			}
			
		}
		
		return rowCnt * 2;
	}
	
	public static String getForecastsControlRow(List<?> rows, String salesType, 
			String fcstName, String colDelimeter, String rowDelimeter) {
		
		if (rows == null || rows.size() == 0) {return "";}
		
		StringBuffer mainGridSB = new StringBuffer();
		StringBuffer subGridSB = new StringBuffer();
		String beforeKey = "";
		boolean isFirst = true;
		for (Iterator<?> iRow = rows.iterator(); iRow.hasNext();) {
			List<?> columns = (List<?>) iRow.next();
			
			String first = columns.get(0).toString();
			String second = columns.get(1).toString();
			String third = columns.get(2).toString();
			String fourth = columns.get(3).toString();
			String fifth = columns.get(4).toString();
			String sixth = columns.get(5).toString();			
			String salesQty = columns.get(7).toString();
			String fcstQty = columns.get(8).toString();
			
			String nowKey = first + third + fifth;			
			if (!beforeKey.equals(nowKey)) {	
				beforeKey = nowKey;
				if(!isFirst) {
					mainGridSB.append(rowDelimeter).append(subGridSB.toString())
					.append(rowDelimeter);
					subGridSB = new StringBuffer();
					
				} else {
					isFirst = false;
				}
				
				mainGridSB.append(first).append("-").append(second).append(colDelimeter)				
				.append(third).append("-").append(fourth).append(colDelimeter)				
				.append(fifth).append("-").append(sixth).append(colDelimeter)
				.append(fcstName);
				
				subGridSB.append(first).append("-").append(second).append(colDelimeter)				
				.append(third).append("-").append(fourth).append(colDelimeter)				
				.append(fifth).append("-").append(sixth).append(colDelimeter)
				.append(salesType);				
			}
			
			mainGridSB.append(colDelimeter).append(fcstQty);
			subGridSB.append(colDelimeter).append(salesQty);			
		}
		mainGridSB.append(rowDelimeter).append(subGridSB.toString());
		
		return mainGridSB.toString();
	}
	
	public static String getForecastsControlHeader(List<?> rows, String colDelimeter) {
		if (rows == null || rows.size() == 0) {return "";}

		StringBuffer gridData = new StringBuffer();
		boolean isFirst = true;
		for (Iterator<?> iRow = rows.iterator(); iRow.hasNext();) {
			List<?> columns = (List<?>) iRow.next();
			if(isFirst) {
				isFirst = false;				
			} else {
				gridData.append(colDelimeter);
			}
			gridData.append(columns.get(1));
		}
		
		return gridData.toString();
	}
	
	public static String getForecastsControlHeaderType(List<?> rows, String colDelimeter) {
		if (rows == null || rows.size() == 0) {return "";}

		StringBuffer gridData = new StringBuffer();
		boolean isFirst = true;
		for (int i = 0; i < rows.size(); i++) {
			if(isFirst) {
				isFirst = false;				
			} else {
				gridData.append(colDelimeter);
			}
			if(i < 4) {
				gridData.append("TEXT");
			} else {
				gridData.append("NUMBER");
			}
		}
		
		return gridData.toString();
	}
	
	public static String getForecastsControlColumnWidth(List<?> rows, String colDelimeter) {
		if (rows == null || rows.size() == 0) { return ""; }

		StringBuffer gridData = new StringBuffer();
		boolean isFirst = true;
		for (int i = 0; i < rows.size(); i++) {
			if(isFirst) {
				isFirst = false;				
			} else {
				gridData.append(colDelimeter);
			}
			if(i < 4) {
				gridData.append("150");
			} else {
				gridData.append("70");
			}
		}
		
		return gridData.toString();
	}
	
	public static String getForecastsControlRow(List<?> rows) {
		
		if (rows == null || rows.size() == 0) {return "";}
		
		StringBuffer valueTypes = new StringBuffer();
		StringBuffer fcstDates = new StringBuffer();
		StringBuffer quantitys = new StringBuffer();
		StringBuffer chartDatas = new StringBuffer();
		
		String beforeKey = "";
		boolean isFirst = true;
		boolean isDateBucket = false;
		
		for (Iterator<?> iRow = rows.iterator(); iRow.hasNext();) {
			List<?> columns = (List<?>) iRow.next();
					
			String nowKey = columns.get(1).toString();
			String fcstDate = columns.get(2).toString();
			String quantity = columns.get(3).toString();
			
			if (!beforeKey.equals(nowKey)) {
				beforeKey = nowKey;
				if(!isFirst) {
					valueTypes.append(",").append(nowKey);					
					quantitys.append("!%!").append(quantity);					
					isDateBucket = true;
					
				} else {
					valueTypes.append(nowKey);
					quantitys.append(quantity);
					fcstDates.append(fcstDate);
					isFirst = false;
				}
				
			} else {
				quantitys.append(",").append(quantity);
				if(!isDateBucket) {
					fcstDates.append(",").append(fcstDate);
				}
			}
			
		}
		chartDatas.append(valueTypes).append("/%/")
		.append(fcstDates).append("/%/").append(quantitys);
		
		return chartDatas.toString();
	}
	
	public static List<?> getCalendarRow(List<List<String>> rows) {	
		if (rows == null || rows.size() == 0) {return null;}		
			
		List<List<?>> newCalendar = new ArrayList<List<?>>();
		List<List<String>> dayMap = new ArrayList<List<String>>();
		List<List<String>> numMap = new ArrayList<List<String>>();
		List<String> dayCols = null;
		List<String> numCols = null;
		
		int nWeek = 1, count = 0;
		for (Iterator<List<String>> iRow = rows.iterator(); iRow.hasNext();) {
			List<String> columns =  iRow.next();
			
			String yyyymmdd = columns.get(0);
			String day = String.valueOf(Integer.parseInt(columns.get(1)));
			String hFlag = columns.get(2);
			String sFactor = String.valueOf(Double.parseDouble(columns.get(3)));		
			if (count == 0) {
				dayMap = new ArrayList<List<String>>();
				numMap = new ArrayList<List<String>>();							
			}	
			dayCols = new ArrayList<String>();
			dayCols.add(yyyymmdd);
			dayCols.add(day);
			dayCols.add(hFlag);
			dayMap.add(dayCols);
			
			numCols = new ArrayList<String>();
			numCols.add(yyyymmdd);
			numCols.add(sFactor);
			numMap.add(numCols);
			if (count < 6) {			
				count++;
				
			} else if (count == 6) {				
				nWeek = nWeek + 1;
				newCalendar.add(dayMap);
				newCalendar.add(numMap);
				count = 0;				
			}			
			
		}	
	
		return newCalendar;
	}
	
	public static String getFactorColorType(String factor, String stdval) {
		double dFactor = Double.parseDouble(factor);
		double dStdval = Double.parseDouble(stdval);
		String color = null;
		
		if(dFactor > dStdval) {
			color = "blue";
		} else if(dFactor == dStdval) {
			color = "black";
		} else {
			color = "red";
		}
		
		return color;
	}
	
}