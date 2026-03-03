package com.kt.onrace.domain.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kt.onrace.domain.event.entity.EventImage;

public interface EventImageRepository extends JpaRepository<EventImage, Long> {
}
