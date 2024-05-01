import moment from 'moment';

moment.defineLocale('ua', {
  months : 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
  monthsShort : 'січ_лют_бер_кві_тра_чер_лип_сер_вер_жов_лис_гру'.split('_'),
  weekdays : 'неділя_понеділок_вівторок_середа_четвер_п\'ятниця_субота'.split('_'),
  weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
  weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
  longDateFormat : {
      LT : 'HH:mm',
      LTS : 'HH:mm:ss',
      L : 'DD.MM.YYYY',
      LL : 'D MMMM YYYY р.',
      LLL : 'D MMMM YYYY р., HH:mm',
      LLLL : 'dddd, D MMMM YYYY р., HH:mm'
  },
  calendar : {
      sameDay: '[Сьогодні в] LT',
      nextDay: '[Завтра в] LT',
      nextWeek: 'dddd [в] LT',
      lastDay: '[Вчора в] LT',
      lastWeek: function () {
          switch (this.day()) {
              case 0:
              case 3:
              case 5:
              case 6:
                  return '[Минулої] dddd [в] LT';
              case 1:
              case 2:
              case 4:
                  return '[Минулого] dddd [в] LT';
          }
      },
      sameElse: 'L'
  },
  relativeTime : {
      future : 'за %s',
      past : '%s тому',
      s : 'декілька секунд',
      ss : '%d секунд',
      m : 'хвилина',
      mm : '%d хвилин',
      h : 'година',
      hh : '%d годин',
      d : 'день',
      dd : '%d днів',
      M : 'місяць',
      MM : '%d місяців',
      y : 'рік',
      yy : '%d роки'
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
  ordinal : function (number, period) {
      switch (period) {
          case 'M':
          case 'd':
          case 'DDD':
          case 'w':
          case 'W':
              return number + '-й';
          case 'D':
              return number + '-го';
          default:
              return number;
      }
  },
  week : {
      dow : 1, // Monday is the first day of the week.
      doy : 7  // The week that contains Jan 1st is the first week of the year.
  }
});

export default moment;