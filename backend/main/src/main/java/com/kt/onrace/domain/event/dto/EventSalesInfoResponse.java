package com.kt.onrace.domain.event.dto;

import java.time.LocalDateTime;

import com.kt.onrace.domain.event.entity.Event;
import com.kt.onrace.domain.event.entity.EventAppType;
import com.kt.onrace.domain.event.entity.EventSalesInfo;

import lombok.Builder;

@Builder
public record EventSalesInfoResponse (
	RefundPolicyInfo refundPolicy,
	DeliveryInfo delivery,
	SellerInfo seller
) {

	@Builder
	public record RefundPolicyInfo(
		String refundPeriod,
		String refundDeadline,
		String cancellationFee,
		Boolean isTransferable,
		String refundPolicy,
		String weatherRefund
	) {
	}

	@Builder
	public record DeliveryInfo(
		String deliveryTarget,
		String deliveryMethod,
		String deliverySchedule,
		String deliveryFee,
		String deliveryArea,
		String addressChangePeriod,
		String deliveryCompensation
	) {
	}

	@Builder
	public record SellerInfo(
		String sellerName,
		String businessNo,
		String ecommerceNo,
		Boolean isEcommerceMediator,
		String customerService,
		String sellerAddress
	) {
	}

	public static EventSalesInfoResponse from(EventSalesInfo salesInfo) {
		RefundPolicyInfo refundPolicy = RefundPolicyInfo.builder()
			.refundPeriod(salesInfo.getRefundPeriod())
			.refundDeadline(salesInfo.getRefundDeadline())
			.cancellationFee(salesInfo.getCancellationFee())
			.isTransferable(salesInfo.getIsTransferable())
			.refundPolicy(salesInfo.getRefundPolicy())
			.weatherRefund(salesInfo.getWeatherRefund())
			.build();

		DeliveryInfo delivery = DeliveryInfo.builder()
			.deliveryTarget(salesInfo.getDeliveryTarget())
			.deliveryMethod(salesInfo.getDeliveryMethod())
			.deliverySchedule(salesInfo.getDeliverySchedule())
			.deliveryFee(salesInfo.getDeliveryFee())
			.deliveryArea(salesInfo.getDeliveryArea())
			.addressChangePeriod(salesInfo.getAddressChangePeriod())
			.deliveryCompensation(salesInfo.getDeliveryCompensation())
			.build();

		SellerInfo seller = SellerInfo.builder()
			.sellerName(salesInfo.getSellerName())
			.businessNo(salesInfo.getBusinessNo())
			.ecommerceNo(salesInfo.getEcommerceNo())
			.isEcommerceMediator(salesInfo.getIsEcommerceMediator())
			.customerService(salesInfo.getCustomerService())
			.sellerAddress(salesInfo.getSellerAddress())
			.build();

		return EventSalesInfoResponse.builder()
			.refundPolicy(refundPolicy)
			.delivery(delivery)
			.seller(seller)
			.build();
	}
}
