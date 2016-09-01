/*
 * Created on 2004. 7. 23.
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.zionex.t3sinc.tsf.tool;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Administrator
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class ZLatticeTool {
	
	public String getBody(List result, String columnDelimeter,
			String rowdelimeter) {
		String body = "";

		if (result == null) {
			return body;
		}

		for (int rowIdx = 0; rowIdx < result.size(); rowIdx++) {
			List row = (List) result.get(rowIdx);
			for (int colIdx = 0; colIdx < row.size(); colIdx++) {
				body += row.get(colIdx)
						+ (colIdx == row.size() - 1 ? rowdelimeter
								: columnDelimeter);
			}
		}
		return body;
	}

	public List getHeader(String text, String columnDelimeter) {
		// column name, size, align, type
		String[] header = { "", "", "", "" };

		String[] columns = text.split("[\\[]*[\\]]");
		if (columns == null || columns.length < 1) {
			return null;
		}

		for (int idx = 0; idx < columns.length; idx++) {
			if (columns[idx].indexOf("[") >= 0) {
				columns[idx] = columns[idx]
						.substring(columns[idx].indexOf("[") + 1);
			}
			String[] elm = columns[idx].split(",");
			header[0] += elm[0].trim()
					+ (idx == columns.length - 1 ? "" : columnDelimeter);
			header[1] += elm[1].trim()
					+ (idx == columns.length - 1 ? "" : columnDelimeter);
			header[2] += elm[2].trim()
					+ (idx == columns.length - 1 ? "" : columnDelimeter);
			header[3] += (elm.length == 4 ? elm[3].trim() : "TEXT")
					+ (idx == columns.length - 1 ? "" : columnDelimeter);
		}

		List formattedHeader = new ArrayList();
		formattedHeader.add(header[0]);
		formattedHeader.add(header[1]);
		formattedHeader.add(header[2]);
		formattedHeader.add(header[3]);

		return formattedHeader;
	}

}