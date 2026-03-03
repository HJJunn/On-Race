package com.kt.onrace.domain.event.dto;

import java.time.LocalDate;

import com.kt.onrace.common.request.CursorRequest;
import com.kt.onrace.domain.event.entity.EventRegion;
import com.kt.onrace.domain.event.entity.EventStatus;
import com.kt.onrace.domain.event.entity.EventAppType;
import com.kt.onrace.domain.event.entity.EventType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record EventSearchRequest(
	EventType type,
	EventAppType appType,
	EventStatus status,

	@PositiveOrZero(message = "최소 거리는 -1보다 커야 합니다.")
	Integer minDistance,

	@Max(value = 42195, message = "최대 거리는 42.195km 이하이어야 합니다.")
	Integer maxDistance,
	LocalDate eventStartDate,
	LocalDate eventEndDate,
	EventRegion region,
	String keyword,

	@Positive(message = "cursorId는 0보다 커야 합니다.")
	Long cursorId,

	@Min(value = 1, message = "size는 최소 1 이상이어야 합니다.")
	@Max(value = 50, message = "size는 최대 50 이하만 가능합니다.")
	Integer size
) {
	public CursorRequest cursor() {
		return new CursorRequest(cursorId, size);
	}
}
