package com.kt.onrace.domain.event.dto;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import com.kt.onrace.domain.event.entity.Event;
import com.kt.onrace.domain.event.entity.EventImage;
import com.kt.onrace.domain.event.entity.EventImageType;
import com.kt.onrace.domain.event.entity.EventPace;
import com.kt.onrace.domain.event.entity.EventRegion;
import com.kt.onrace.domain.event.entity.EventStatus;
import com.kt.onrace.domain.event.entity.EventAppType;
import com.kt.onrace.domain.event.entity.EventType;

import lombok.Builder;

@Builder
public record EventDetailResponse(
	Long id,
	String title,
	EventType type,
	EventAppType appType,
	EventStatus status,
	LocalDateTime eventAt,
	LocalDateTime appStartAt,
	LocalDateTime appEndAt,
	EventRegion region,
	String venue,
	LocalDateTime lotteryAnnouncedAt,
	String notice,
	List<CourseDto> courses,
	List<PackageDto> packages,
	List<ImageDto> thumbnailImg,
	List<ImageDto> detailImg,
	List<ImageDto> courseMapImg
) {

	@Builder
	public record CourseDto(
		Long id,
		String name,
		int distanceM,
		long price,
		int courseCapacity,
		List<PaceDto> paces
	) {
	}

	@Builder
	public record PaceDto(
		Long id,
		String name,
		int hour,
		int minutes,
		int capacity
	) {
	}

	@Builder
	public record PackageDto(
		Long id,
		String name,
		long price,
		String description
	) {
	}

	@Builder
	public record ImageDto(
		Long id,
		EventImageType type,
		String url,
		Integer sort
	) {
	}

	public static EventDetailResponse from(Event event) {
		List<CourseDto> courses = event.getCourses().stream()
			.map(course -> CourseDto.builder()
				.id(course.getId())
				.name(course.getName())
				.distanceM(course.getDistanceM())
				.price(course.getPrice())
				.courseCapacity(course.getEventPaces().stream()
					.mapToInt(EventPace::getCapacity)
					.sum())
				.paces(course.getEventPaces().stream()
					.map(pace -> PaceDto.builder()
						.id(pace.getId())
						.name(pace.getName())
						.hour(pace.getHour())
						.minutes(pace.getMinutes())
						.capacity(pace.getCapacity())
						.build())
					.toList())
				.build())
			.toList();

		List<PackageDto> packages = event.getPackages().stream()
			.map(pkg -> PackageDto.builder()
				.id(pkg.getId())
				.name(pkg.getName())
				.price(pkg.getPrice())
				.description(pkg.getDescription())
				.build())
			.toList();

		List<ImageDto> thumbnailImg = event.getImages().stream()
			.filter(image -> image.getType() == EventImageType.THUMBNAIL)
			.sorted(Comparator.comparingInt(EventImage::getSort))
			.map(image -> ImageDto.builder()
				.id(image.getId())
				.type(image.getType())
				.url(image.getUrl())
				.sort(image.getSort())
				.build())
			.toList();

		List<ImageDto> detailImg = event.getImages().stream()
			.filter(image -> image.getType() == EventImageType.DETAIL)
			.sorted(Comparator.comparingInt(EventImage::getSort))
			.map(image -> ImageDto.builder()
				.id(image.getId())
				.type(image.getType())
				.url(image.getUrl())
				.sort(image.getSort())
				.build())
			.toList();

		List<ImageDto> courseMapImg = event.getImages().stream()
			.filter(image -> image.getType() == EventImageType.COURSE_MAP)
			.sorted(Comparator.comparingInt(EventImage::getSort))
			.map(image -> ImageDto.builder()
				.id(image.getId())
				.type(image.getType())
				.url(image.getUrl())
				.sort(image.getSort())
				.build())
			.toList();

		return EventDetailResponse.builder()
			.id(event.getId())
			.title(event.getTitle())
			.type(event.getType())
			.appType(event.getAppType())
			.status(event.getStatus())
			.eventAt(event.getEventAt())
			.appStartAt(event.getAppStartAt())
			.appEndAt(event.getAppEndAt())
			.region(event.getRegion())
			.venue(event.getVenue())
			.lotteryAnnouncedAt(event.getLotteryAnnouncedAt())
			.notice(event.getNotice())
			.courses(courses)
			.packages(packages)
			.thumbnailImg(thumbnailImg)
			.detailImg(detailImg)
			.courseMapImg(courseMapImg)
			.build();
	}
}
