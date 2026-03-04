package com.kt.onrace.domain.event.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EventType {

	MARATHON("마라톤"),
	RUNNING("러닝"),
	TREASURE_HUNT("보물찾기"),
	COPS_AND_ROBBERS("경찰과 도둑");

	private final String description;
}
