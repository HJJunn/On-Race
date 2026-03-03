package com.kt.onrace.domain.event.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EventImageType {

	THUMBNAIL("썸네일"),
	DETAIL("상세 이미지"),
	COURSE_MAP("코스맵");

	private final String description;
}
