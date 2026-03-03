package com.kt.onrace.domain.event.entity;

import com.kt.onrace.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "event_sales_info")
public class EventSalesInfo extends BaseEntity {

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "event_id", nullable = false, unique = true)
	private Event event;

	// 취소 및 환불 정책
	@Column(length = 50)
	private String refundPeriod;

	@Column(length = 50)
	private String refundDeadline;

	@Column(length = 200)
	private String cancellationFee;

	private Boolean isTransferable;

	@Column(columnDefinition = "TEXT")
	private String refundPolicy;

	@Column(columnDefinition = "TEXT")
	private String weatherRefund;

	// 배송 정보

	@Column(length = 100)
	private String deliveryTarget;

	@Column(length = 50)
	private String deliveryMethod;

	@Column(length = 100)
	private String deliverySchedule;

	@Column(length = 50)
	private String deliveryFee;

	@Column(length = 200)
	private String deliveryArea;

	@Column(length = 100)
	private String addressChangePeriod;

	@Column(length = 500)
	private String deliveryCompensation;

	// 판매자 정보
	@Column(length = 100)
	private String sellerName;

	@Column(length = 20)
	private String businessNo;

	@Column(length = 50)
	private String ecommerceNo;

	private Boolean isEcommerceMediator;

	@Column(length = 50)
	private String customerService;

	@Column(length = 200)
	private String sellerAddress;

	@Builder
	public EventSalesInfo (Event event, String refundPeriod, String refundDeadline, String cancellationFee, Boolean isTransferable,
		String refundPolicy, String weatherRefund, String deliveryTarget, String deliveryMethod,
		String deliverySchedule, String deliveryFee, String deliveryArea, String addressChangePeriod,
		String deliveryCompensation, String sellerName, String businessNo, String ecommerceNo,
		Boolean isEcommerceMediator, String customerService, String sellerAddress) {
		this.event = event;
		this.refundPeriod = refundPeriod;
		this.refundDeadline = refundDeadline;
		this.cancellationFee = cancellationFee;
		this.isTransferable = isTransferable;
		this.refundPolicy = refundPolicy;
		this.weatherRefund = weatherRefund;
		this.deliveryTarget = deliveryTarget;
		this.deliveryMethod = deliveryMethod;
		this.deliverySchedule = deliverySchedule;
		this.deliveryFee = deliveryFee;
		this.deliveryArea = deliveryArea;
		this.addressChangePeriod = addressChangePeriod;
		this.deliveryCompensation = deliveryCompensation;
		this.sellerName = sellerName;
		this.businessNo = businessNo;
		this.ecommerceNo = ecommerceNo;
		this.isEcommerceMediator = isEcommerceMediator;
		this.customerService = customerService;
		this.sellerAddress = sellerAddress;
	}
}
