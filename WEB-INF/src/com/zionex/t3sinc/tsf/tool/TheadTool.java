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
import java.util.StringTokenizer;
 
/**
 * 
 * @version 1.0
 * @author janux
 * @since JDK 1.4
 */
public class TheadTool {

	public Collection get(String text) {
		return makeThead(text);
	}

	private Collection makeThead(String text) {

		ArrayList result = new ArrayList();

		StringTokenizer st = new StringTokenizer(text, "[");
		while (st.hasMoreTokens()) {
			String contents_text = st.nextToken();
			contents_text = contents_text.substring(0, contents_text
					.indexOf("]"));

			ArrayList contentsArray = new ArrayList();
			StringTokenizer td = new StringTokenizer(contents_text, ",");
			while (td.hasMoreTokens()) {
				String contents = td.nextToken().trim();
				contentsArray.add(contents);
			}
			result.add(contentsArray);
		}
		return result;
	}

	public static void main(String[] arg) {
		TheadTool thead = new TheadTool();
		ArrayList result = (ArrayList) thead
				.get("[이름, 33%, center], [아이디, 33%, center], [번호, 34%, center]");
		System.out.println(result);
	}
}