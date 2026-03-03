package com.kt.onrace.domain.event.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EventAppType {

	LOTTERY("응모"),
	FIRST_COME("선착순");

	private final String description;
}
