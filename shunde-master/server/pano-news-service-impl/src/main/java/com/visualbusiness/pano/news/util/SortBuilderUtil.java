package com.visualbusiness.pano.news.util;

import org.elasticsearch.search.sort.SortBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;

import java.util.ArrayList;
import java.util.List;

public class SortBuilderUtil {
	private SortBuilderUtil() {
	}

	public static List<SortBuilder> getSortBuilders(List<String> sortList) {
		List<SortBuilder> sortBuilders = new ArrayList<SortBuilder>();

		if (sortList != null) {
			for (String sortItem : sortList) {
				String[] sortItemTokens = sortItem.split(":");
				SortBuilder sortBuilder = SortBuilders.fieldSort(sortItemTokens[0]);

				if (sortItemTokens.length > 1) {
					sortBuilder.order(SortOrder.valueOf(sortItemTokens[1].toUpperCase()));
				}
				
				sortBuilders.add(sortBuilder);
			}
		}

		return sortBuilders;
	}
}
