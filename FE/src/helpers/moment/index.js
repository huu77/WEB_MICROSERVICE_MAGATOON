import moment from 'moment';

export function calculateTimeAgo(targetTime) {
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(targetTime));

    if (duration.asSeconds() < 60) {
        return `${Math.round(duration.asSeconds())} giây trước`;
    } else if (duration.asMinutes() < 60) {
        return `${Math.round(duration.asMinutes())} phút trước`;
    } else if (duration.asHours() < 24) {
        return `${Math.round(duration.asHours())} giờ trước`;
    } else if (duration.asDays() < 7) {
        return `${Math.round(duration.asDays())} ngày trước`;
    } else if (duration.asMonths() < 1) {
        const weeksAgo = Math.round(duration.asWeeks());
        return `${weeksAgo} tuần trước`;
    } else if (duration.asYears() < 1) {
        const monthsAgo = Math.round(duration.asMonths());
        return `${monthsAgo} tháng trước`;
    } else {
        const yearsAgo = Math.round(duration.asYears());
        return `${yearsAgo} năm trước`;
    }
}
