'use strict';

var Calendar = {
        months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ],
        days: [
            {"eng": 'monday', "rus": 'Пн'},
            {"eng": 'tuesday', "rus": 'Вт'},
            {"eng": 'wednesday', "rus": 'Ср'},
            {"eng": 'thursday', "rus": 'Чт'},
            {"eng": 'friday', "rus": 'Пт'},
            {"eng": 'saturday', "rus": 'Сб'},
            {"eng": 'sunday', "rus": 'Вс'}
        ],
        reliableDate: null,
        getFzAvailability: function (day, month) {
            var avail = true;
            if (typeof(day) == 'number') {
                var dt = new Date(this.reliableDate.getFullYear(), month, day);
                var delta = this.reliableDate - dt;
                avail = delta > 0 ? ((Math.abs(delta) / (1000 * 60 * 60 * 24) + 1) % 4) >= 2
                                  : ((Math.abs(delta) / (1000 * 60 * 60 * 24)) % 4) >= 2;
            }
            return avail;
        },
        generateMonthHtml: function (month, year) {
            var dt = new Date(year, month, 1);
            var end_day = new Date(year, month + 1, 0).getDate();
            //var mnt_arr = [];
            var mnt_html = '';
            var cur_row = '';

            var shift = dt.getDay() == 0 ? 6 : dt.getDay() - 1;
            for (var i = 0; i < (end_day + shift); ++i) {
                var cell_content = (i < shift) ? '&nbsp' : i - shift + 1;
                var day_name = this.days[(i) % 7]["eng"];
                var fz_avail = this.getFzAvailability(cell_content, month) ? 'fz_busy' : 'fz_avail';
                var id = year + '_' + (month+1) + '_' + cell_content;
                cur_row += '<td id="' + id + '" class="cell ' + day_name + ' ' + fz_avail + '">' + cell_content + '</td>';
                if (day_name == 'sunday') {
                    mnt_html += '<tr>' + cur_row + '</tr>';
                    cur_row = '';
                }
            }
            mnt_html += '<tr>' + cur_row + '</tr>';

            var header = this.days.reduce(function (header, cur) {
                return header += '<td>' + cur.rus + '</td>';
            }, '');
            header = '<tr>' + header + '</tr>';
            mnt_html =
                '<div class="col-md-3">' +
                '<strong>' + this.months[month] + '</strong>' +
                '<table class="table " onclick="table_click()" data-month="' + month + '"data-year="' + year + '">' +
                header +
                mnt_html +
                '</table>' +
                '</div>';
            return mnt_html;
        }
        ,
        generateYearHtml: function () {
            var year_html = '';
            for (var i = 0; i < 3; i++) {
                year_html += '<div class="row">';
                for (var j = 0; j < 4; j++) {
                    year_html += this.generateMonthHtml(i * 4 + j, this.reliableDate.getFullYear());
                }
                year_html += '</div>';
            }
            return year_html;
        }
        ,
        draw: function (elem, reliableDate) {
            this.reliableDate = reliableDate;
            console.log('reliableDate is ' + this.reliableDate);
            var today = new Date();
            today = today.getFullYear() + '_' + (today.getMonth()+1) + '_' + today.getDate();
            document.getElementById(elem).innerHTML = this.generateYearHtml();
            document.getElementById(today).classList.add('today');
        }

    }
    ;