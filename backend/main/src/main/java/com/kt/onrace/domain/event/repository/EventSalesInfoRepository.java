package com.kt.onrace.domain.event.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kt.onrace.common.exception.BusinessException;
import com.kt.onrace.common.exception.ErrorCode;
import com.kt.onrace.domain.event.entity.EventSalesInfo;

public interface EventSalesInfoRepository extends JpaRepository<EventSalesInfo, Long> {

	default EventSalesInfo findByEventIdOrThrow(Long eventId, ErrorCode errorCode) {
		return findByEventId(eventId).orElseThrow(() -> new BusinessException(errorCode));
	}

	Optional<EventSalesInfo> findByEventId(Long eventId);
}
