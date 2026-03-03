package com.kt.onrace.domain.event.entity;

import com.kt.onrace.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "event_image")
public class EventImage extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "event_id", nullable = false)
	private Event event;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private EventImageType type;

	@Column(nullable = false, length = 500)
	private String url;

	@Column(nullable = false)
	private int sort;

	@Builder
	private EventImage(Event event, EventImageType type, String url, int sort) {
		this.event = event;
		this.type = type;
		this.url = url;
		this.sort = sort;
	}

	public void updateUrl(String url) {
		this.url = url;
	}

	public void updateSort(int sort) {
		this.sort = sort;
	}
}
