import { searchList } from "../Interfaces/SearchList";

export class DateUtils {
  static formatDateTime(value: any): string {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }

    if (isNaN(value.getTime())) {
      return ''; // Invalid date
    }
    const day = value.getDate().toString().padStart(2, '0');
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const year = value.getFullYear().toString();
    const hours = value.getHours().toString().padStart(2, '0');
    const minutes = value.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
 static formatDate(value: any): string {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }

    if (isNaN(value.getTime())) {
      return 'Invalid date'; //
    }
    const day = value.getDate().toString().padStart(2, '0');
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const year = value.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  static formatDateAndCalculateAge(value: any): string {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }

    if (isNaN(value.getTime())) {
      return 'Invalid date';
    }

    const today = new Date();
    const birthDate = new Date(value);

    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    const monthsDiff = today.getMonth() - birthDate.getMonth();
    const hasBirthdayOccurred = today.getDate() >= birthDate.getDate();

    const ageYears = monthsDiff < 0 || (monthsDiff === 0 && !hasBirthdayOccurred) ? yearsDiff - 1 : yearsDiff;
    const ageMonths = monthsDiff < 0 ? 12 - Math.abs(monthsDiff) : monthsDiff;

    const dob = `${birthDate.getDate().toString().padStart(2, '0')}/${(birthDate.getMonth() + 1).toString().padStart(2, '0')}/${birthDate.getFullYear().toString()}`;
    const age = `${ageYears} سنة و ${ageMonths>2?`${ageMonths} اشهر`: ageMonths==2 ? "شهرين":"شهر"}`;

    return `${dob} - ${age}`;
  }
  static getAgeInYear(value:any):number|string{
    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    if (isNaN(value.getTime())) {
      return 'Invalid date';
    }
    const today = new Date();
    const birthDate = new Date(value);
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    const monthsDiff = today.getMonth() - birthDate.getMonth();
    const hasBirthdayOccurred = today.getDate() >= birthDate.getDate();
    const ageYears = monthsDiff < 0 || (monthsDiff === 0 && !hasBirthdayOccurred) ? yearsDiff - 1 : yearsDiff;
    const ageMonths = monthsDiff < 0 ? 12 - Math.abs(monthsDiff) : monthsDiff;
    const age = `${ageYears} سنة و ${ageMonths>2?`${ageMonths} اشهر`: ageMonths==2 ? "شهرين":"شهر"}`;

    return age;
  }
  static getFromDate(date: any): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    if (isNaN(date.getTime())) {
      return 'تاريخ غير صالح';
    }

    const today = new Date();
    const differenceInMilliseconds = today.getTime() - date.getTime();
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    const differenceInMonths = Math.floor(differenceInDays / 30);
    const differenceInYears = Math.floor(differenceInDays / 365);

    let prefix = '';
    if (differenceInMilliseconds < 0) {
      prefix = 'بعد ';
    } else {
      prefix = 'قبل ';
    }

    if (Math.abs(differenceInMinutes) < 1) {
      return `${prefix}لحظات`;
    } else if (Math.abs(differenceInMinutes) < 60) {
      const minutes = Math.abs(differenceInMinutes);
      const minutesText = minutes === 1 ? 'دقيقة' : 'دقائق';
      return `${prefix}${minutes} ${minutesText}`;
    } else if (Math.abs(differenceInHours) < 24) {
      const hours = Math.abs(differenceInHours);
      const hoursText = hours === 1 ? 'ساعة' : 'ساعات';
      const minutes = Math.abs(differenceInMinutes) % 60;
      const minutesText = minutes === 1 ? 'دقيقة' : 'دقيقة';
      return `${prefix}${hours} ${hoursText} و ${minutes} ${minutesText}`;
    } else if (Math.abs(differenceInDays) < 7) {
      const daysText = Math.abs(differenceInDays) === 1 ? 'يوم' : 'أيام';
      return `${prefix}${Math.abs(differenceInDays)} ${daysText}`;
    } else if (Math.abs(differenceInDays) < 30) {
      const weeksText = Math.abs(differenceInWeeks) === 1 ? 'أسبوع' : 'أسابيع';
      return `${prefix}${Math.abs(differenceInWeeks)} ${weeksText}`;
    } else if (Math.abs(differenceInDays) < 365) {
      const monthsText = Math.abs(differenceInMonths) === 1 ? 'شهر' : 'أشهر';
      return `${prefix}${Math.abs(differenceInMonths)} ${monthsText}`;
    } else {
      const yearsText = Math.abs(differenceInYears) === 1 ? 'سنة' : 'سنوات';
      return `${prefix}${Math.abs(differenceInYears)} ${yearsText}`;
    }
  }
  static CheckdifferenceDate(date: any): boolean {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    if (isNaN(date.getTime())) {
      return false;
    }
    const today = new Date();
    const differenceInMilliseconds = today.getTime() - date.getTime();
    return differenceInMilliseconds > 0;
}
static getYears(start: number = 1900, end: number = 2024) {
  return Array.from({ length: end - start + 1 }, (_, i) => ({
      arabicLabel: (end - i).toString() // Convert year to string
  }));
}

static getMonths() {
  const monthsInArabic = [
      "كانون الثاني",  // January
      "شباط",          // February
      "آذار",          // March
      "نيسان",         // April
      "أيار",          // May
      "حزيران",        // June
      "تموز",          // July
      "آب",            // August
      "أيلول",         // September
      "تشرين الأول",   // October
      "تشرين الثاني",  // November
      "كانون الأول"    // December
  ];
  return monthsInArabic.map((month, index) => ({
      id: index + 1,
      arabicLabel: month
  }));
}
static isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

static getDaysByYearAndMonth(year: number, month: number){
  const daysInMonths: { [key: number]: number } = {
      1: 31,  // January
      2: this.isLeapYear(year) ? 29 : 28,  // February
      3: 31,  // March
      4: 30,  // April
      5: 31,  // May
      6: 30,  // June
      7: 31,  // July
      8: 31,  // August
      9: 30,  // September
      10: 31, // October
      11: 30, // November
      12: 31  // December
  };
  if (month < 1 || month > 12) {
      return [];
  }
  return Array.from({ length: daysInMonths[month] }, (_, i) => ({
      id: i + 1,
      value: i + 1
  }));
}

static getYearFromDate(date:Date){
  date.getFullYear();
}
static getMonthFromDate(date:Date){
  date.getMonth();
}
static getDayFromDate(date:Date){
  date.getDay();
}
}
