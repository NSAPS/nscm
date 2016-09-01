/*
 * Created on 2004. 7. 23.
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.zionex.t3sinc.tsf.tool;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GridTool {

	public String getBody(List rows, String columnDelimeter, String rowDelimeter) {
		if (rows == null || rows.size() == 0)	{return "";}

		StringBuffer gridData = new StringBuffer();
		for (Iterator iRow = rows.iterator(); iRow.hasNext();) {
			List columns = (List) iRow.next();
			for (int columnNo = 0; columnNo < columns.size(); columnNo++) {
				gridData.append(columns.get(columnNo))
				.append(columnNo == columns.size() - 1 ? rowDelimeter : columnDelimeter);
			}
		}
		return gridData.toString();
	}

	public List getHeader(String text, String columnDelimeter) {
		// column name, size, align, type

		String[] columns = text.split("[\\[]*[\\]]");
		if (columns == null || columns.length < 1) {
			return null;
		}

		StringBuffer[] header = new StringBuffer[4];
		for (int idx = 0; idx < columns.length; idx++) {
			if (columns[idx].indexOf("[") >= 0) {
				columns[idx] = columns[idx].substring(columns[idx].indexOf("[") + 1);
			}
			String[] elm = columns[idx].split(",");
			header[0].append(elm[0].trim()).append(idx == columns.length - 1 ? "" : columnDelimeter);
			header[1].append(elm[1].trim()).append(idx == columns.length - 1 ? "" : columnDelimeter);
			header[2].append(elm[2].trim()).append(idx == columns.length - 1 ? "" : columnDelimeter);
			header[3].append(elm.length == 4 ? elm[3].trim() : "TEXT").append(idx == columns.length - 1 ? "" : columnDelimeter);
		}
		List formattedHeader = new ArrayList();
		formattedHeader.add(header[0].toString());
		formattedHeader.add(header[1].toString());
		formattedHeader.add(header[2].toString());
		formattedHeader.add(header[3].toString());

		return formattedHeader;
	}

}