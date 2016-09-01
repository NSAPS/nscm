
/*
 * Created on 2004. 3. 18.
 *
 * Copyright 1999-2004 ZIONEX, Inc. All Rights Reserved.
 * This software is the proprietary information of ZIONEX, Inc.
 * Use is subject to license terms.
 */
package com.zionex.t3sinc.tsf.tool;
 
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @author 이현찬
 * @since JDK 1.4
 */
public class MoonTool {
	String contextPath = new String();

	public String paging(String _service, String allCount, String perpage,
			String pagenumber, String contextPath) {
		this.contextPath = contextPath;
		return paging(_service, allCount, perpage, pagenumber);

	}

	private String converter(String contextPath) {
		return contextPath.substring(1);
	}

	public String paging(String _service, String allCount, String perpage,
			String pagenumber) {

		StringBuffer result = new StringBuffer();

		if (allCount == null) {
			allCount = "0";
		}
		if (perpage == null) {
			perpage = "20";
		}
		if (pagenumber == null) {
			pagenumber = "20";
		}
		int allCountInt = Integer.parseInt(allCount);
		int perPageInt = Integer.parseInt(perpage);
		int pageNumberInt = Integer.parseInt(pagenumber);
		int allPageNumber;
		//sychoi 2004/04/02
		//paging = all 처리
		if (perPageInt == -1) {
			perPageInt = allCountInt;
			allPageNumber = 1;
			pageNumberInt = 1;
		} else {
			allPageNumber = (int) Math.ceil((double) allCountInt
					/ (double) perPageInt);
		}

		int additionNumber = 10 * (pageNumberInt / 10);
		int min = additionNumber;
		int max = additionNumber + 9;
		result
				.append("<a href=\"Javascript:GoPaging('"
						+ _service
						+ "', '"
						+ perpage
						+ "', '1')\"><img src=\" "
						+ contextPath
						//+ "/sinc/template/basic/images/common/paging_prev.gif\" border=\"0\"/></a> ");
						+ "/sinc/template/basic/skin/nongshim/images/common/btn_pre.gif\" border=\"0\"/></a> ");
		//		result.append("<input type=\"button\"
		// onClick=\"GoPaging('"+_service+"', '"+perpage+"', '1')\" value=\"◁\"
		// class=\"button2_1\" onmouseover=\"this.className='button2_2'\"
		// onmouseout=\"this.className='button2_1'\">");
		if (min > 0) {
			result
					.append("<a href=\"Javascript:GoPaging('"
							+ _service
							+ "', '"
							+ perpage
							+ "', '"
							+ (min - 1)
							+ "')\"><img src=\""
							+ contextPath
							//+ "/sinc/template/basic/images/common/paging_first.gif\" border=\"0\"/></a> ");
							+ "/sinc/template/basic/skin/nongshim/images/common/btn_fir.gif\" border=\"0\"/></a> ");
			//		    result.append("<input type=\"button\"
			// onClick=\"GoPaging('"+_service+"', '"+perpage+"',
			// '"+(min-1)+"')\" value=\"◀\" class=\"button2_1\"
			// onmouseover=\"this.className='button2_2'\"
			// onmouseout=\"this.className='button2_1'\">");
		}

		for (int i = 0; i < 10; i++) {
			int pPageNUmber = (i + additionNumber);

			if (pPageNUmber > allPageNumber) {
				break;
			}
			if (pPageNUmber == pageNumberInt) {
				//result.append("<b>" + pPageNUmber + "</b> ");
				result.append("<span class=\"b f_color_o\">" + pPageNUmber + "</span> ");
				//			    result.append("<input type=\"button\"
				// value=\""+pPageNUmber+"\" class=\"button2_3\">");
			} else if (pPageNUmber != 0) {
				result.append("<a href=\"Javascript:GoPaging('" + _service
						+ "', '" + perpage + "', '" + pPageNUmber + "')\">"
						+ pPageNUmber + "</a> ");
				//			    result.append("<input type=\"button\"
				// onClick=\"GoPaging('"+_service+"', '"+perpage+"',
				// '"+pPageNUmber+"')\" value=\""+pPageNUmber+"\"
				// class=\"button2_1\"
				// onmouseover=\"this.className='button2_2'\"
				// onmouseout=\"this.className='button2_1'\">");
			}
		}
		if (max < allPageNumber) {
			result
					.append("<a href=\"Javascript:GoPaging('"
							+ _service
							+ "', '"
							+ perpage
							+ "', '"
							+ (max + 1)
							+ "')\"><img src=\""
							+ contextPath
							//+ "/sinc/template/basic/images/common/paging_end.gif\" border=\"0\"/></a> ");
							+ "/sinc/template/basic/skin/nongshim/images/common/btn_end.gif\" border=\"0\"/></a> ");
			//		    result.append("<input type=\"button\"
			// onClick=\"GoPaging('"+_service+"', '"+perpage+"',
			// '"+(max+1)+"')\" value=\"▶\"
			// onmouseover=\"this.className='button2_2'\"
			// onmouseout=\"this.className='button2_1'\">");
		}
		result
				.append("<a href=\"Javascript:GoPaging('"
						+ _service
						+ "', '"
						+ perpage
						+ "', '"
						+ allPageNumber
						+ "')\"><img src=\" "
						+ contextPath
						//+ "/sinc/template/basic/images/common/paging_next.gif\" border=\"0\" /></a> ");
						+ "/sinc/template/basic/skin/nongshim/images/common/btn_nex.gif\" border=\"0\" /></a> ");
		//		result.append("<input type=\"button\"
		// onClick=\"GoPaging('"+_service+"', '"+perpage+"',
		// '"+allPageNumber+"')\" value=\"▷\"
		// onmouseover=\"this.className='button2_2'\"
		// onmouseout=\"this.className='button2_1'\">");

		return result.toString();
	}

	public Collection grid(Collection result) {

		//ArrayList rt = (ArrayList)result;
		if (result == null) {
			return new ArrayList();
		}
		Iterator rt = result.iterator();
		ArrayList columnNameArrayList = new ArrayList();
		while (rt.hasNext()) {
			Collection sub_result = (Collection) rt.next();
			Iterator sub_rt = sub_result.iterator();

			ArrayList rowArrayList = new ArrayList();
			while (sub_rt.hasNext()) {
				String rowValue = (String) sub_rt.next();
				System.out.println(rowValue);
				rowArrayList.add("\"" + rowValue + "\"");
			}
			columnNameArrayList.add(rowArrayList);
		}
		System.out.println(columnNameArrayList.toString());
		return columnNameArrayList;
	}

	public Collection grid(Collection result, String choice) {

		if (result == null) {
			return new ArrayList();
		}

		Iterator rt = result.iterator();
		List columnNameArrayList = new ArrayList();
		while (rt.hasNext()) {
			List sub_result = (ArrayList) rt.next();
			List rowArrayList = new ArrayList();
			for (int i = 0; i < choice.length(); i++) {
				int choice_column = Integer.parseInt(String.valueOf(choice
						.charAt(i)));
				String rowValue = (String) sub_result.get(choice_column);
				if (rowValue == null) {
					rowValue = "";
				}
				System.out.println(rowValue);
				rowArrayList.add("\"" + rowValue + "\"");
			}
			columnNameArrayList.add(rowArrayList);
		}

		return columnNameArrayList;
	}

	public Collection gridHeader(Collection result) {

		//ArrayList rt = (ArrayList)result;
		if (result == null) {
			return new ArrayList();
		}
		Iterator rt = result.iterator();

		ArrayList rowArrayList = new ArrayList();
		while (rt.hasNext()) {
			Object resultData = rt.next();

			String rowValue = (String) resultData;
			rowArrayList.add("\"" + rowValue + "\"");
		}

		return rowArrayList;
	}


	//	sychoi
	// for display a order_tracking's grid header
	public Collection gridHeader_OrderTracking(Collection result) {
		//ArrayList rt = (ArrayList)result;
		if (result == null) {
			return new ArrayList();
		}
		//		while (result.iterator().hasNext()) {
		//			System.out.println("=====" +result.iterator().next());
		//			result.remove(result.iterator().next());
		//		}
		int count = result.size();

		ArrayList rowArrayList = new ArrayList();
		rowArrayList.add("\"Route ID\"");
		rowArrayList.add("\"Activity's Start\"");
		rowArrayList.add("\"Activity's End\"");
		rowArrayList.add("\"Quantity\"");

		for (int i = 0; i < count; i++) {
			rowArrayList.add("\"\"");
		}
		//System.out.println(rowArrayList);
		return rowArrayList;
	}

	public Collection gridOrderTracking(Collection result, String choice) {

		if (result == null) {
			return new ArrayList();
		}

		Iterator rt = result.iterator();
		List columnNameArrayList = new ArrayList();
		while (rt.hasNext()) {
			List sub_result = (ArrayList) rt.next();
			List rowArrayList = new ArrayList();
			for (int i = 0; i < choice.length(); i++) {
				int choice_column = Integer.parseInt(String.valueOf(choice
						.charAt(i)));
				if (choice_column == 1) { // Activity ID
					for (int j = 0; j < Integer.parseInt(String.valueOf(sub_result
							.get(0)))-1; j++) {
						rowArrayList.add("\"" + "" + "\"");
					}
					rowArrayList.add("\"" + (String) sub_result.get(1) + "\"");
					int count = result.size() - Integer.parseInt(String.valueOf(sub_result
							.get(0)));
					for(int l = 0 ; l < count ;l++){
						rowArrayList.add("\"" + "" + "\"");
					}
					
				} else {
					String rowValue = (String) sub_result.get(choice_column);
					if (rowValue == null) {
						rowValue = "";
					}
					rowArrayList.add("\"" + rowValue + "\"");
				}
			}	
			columnNameArrayList.add(rowArrayList);
		}
		System.out.println(columnNameArrayList.toString());
		return columnNameArrayList;
	}

	public List getActivityType(Collection result){
		System.out.println("active");
		if (result == null) {
			return new ArrayList();
		}
		Iterator rt = result.iterator();
		List ActivityIDList =  new ArrayList();
		
		while(rt.hasNext()){
			List sub_result = (ArrayList) rt.next();
			Map resultMap = new HashMap();
			String ActivityIDString = (String)sub_result.get(4);
			System.out.println(ActivityIDString);
			if(ActivityIDString.substring(0, 1).equalsIgnoreCase("I")){
				resultMap.put(sub_result.get(0), "red");
			}else{
				resultMap.put(sub_result.get(0), "blue"); 
			}
			ActivityIDList.add(resultMap);
		}
		return ActivityIDList; 
	}
	public Collection gridDateHeader(Collection result) {

		//ArrayList rt = (ArrayList)result;
		if (result == null) {
			return new ArrayList();
		}
		Iterator rt = result.iterator();

		ArrayList rowArrayList = new ArrayList();
		int i = 0;
		while (rt.hasNext()) {
			Object resultData = rt.next();

			String rowValue = (String) resultData;
			//System.out.println(rowValue);
			if (i > 2) {
				rowValue = rowValue.substring(0, 10);
			}
			rowArrayList.add("\"" + rowValue + "\"");
			i++;
		}

		return rowArrayList;
	}


	//sychoi

	//	public Collection gridExcelUploadHeader(Collection result){
	//		ArrayList headerArray = new ArrayList();
	//		if(result == null){
	//			headerArray = null;
	//		}else{
	//			Iterator rt = result.iterator();
	//			Object headValue = rt.next();
	//		}
	//		return headerArray;
	//	}

	public String addQuote(String data, String type) {
		StringBuffer newData = new StringBuffer();
		if (data != null && type != null) {
			String check_string = type.substring(0, 3).toLowerCase();
			if (check_string.equals("var") || check_string.equals("dat")
					|| check_string.equals("cha")) {
				newData.append("'");
				newData.append(data);
				newData.append("'");
			}
		}
		return newData.toString();
	}

	public Collection gridWithOneDimension(Collection result) {

		//ArrayList rt = (ArrayList)result;
		if (result == null) {
			return new ArrayList();
		}

		Iterator rt = result.iterator();
		ArrayList columnNameArrayList = new ArrayList();
		while (rt.hasNext()) {
			String rowValue = (String) rt.next();
			columnNameArrayList.add("\"" + rowValue + "\"");
		}

		return columnNameArrayList;
	}

	public static void main(String[] args) {
		MoonTool vt = new MoonTool();
		System.out.println(vt.paging("", "10000", "10", "10"));
	}
}