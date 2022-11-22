<template>
    <div class="open-calendar" >
        <div class="open-calendar-header">
            <div>
                <svg t="1660792768825" @click.stop="prevYear" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1933" width="16" height="16">
                    <path d="M496.529 748.638l-180.54-236.26 186.647-236.256a38.17 38.17 0 0 0 8.781-24.048 38.19 38.19 0 0 0-13.743-29.395 38.172 38.172 0 0 0-53.822 4.962L237.36 487.95c-11.581 14.084-11.581 34.392 0 48.474l200.005 260.308a38.166 38.166 0 0 0 53.822 5.727 38.158 38.158 0 0 0 13.848-25.799 38.178 38.178 0 0 0-8.506-28.022z m0 0M520.196 487.95c-11.58 14.084-11.58 34.392 0 48.474l200.006 260.308a38.164 38.164 0 0 0 53.821 5.727 38.172 38.172 0 0 0 5.723-53.822l-180.92-236.26 186.647-236.256a38.17 38.17 0 0 0 8.78-24.048 38.183 38.183 0 0 0-41.682-38.079 38.178 38.178 0 0 0-25.883 13.646L520.196 487.95z m0 0" p-id="1934" fill="#8a8a8a">
                    </path>
                </svg>
                <svg t="1660793057372" @click.stop="prevMonth" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1764" width="16" height="16">
                    <path d="M319.64 512.016l336.016-336.008 45.248 45.248L364.896 557.28z" p-id="1765" fill="#8a8a8a"></path>
                    <path d="M365.216 466.464l339.976 339.968-45.256 45.256-339.976-339.976z" p-id="1766" fill="#8a8a8a"></path>
                </svg>
            </div>
            <div><span>{{currentYear}}</span>-<span>{{currentMonth}}</span></div>
            <div>
                <svg t="1660793019552" @click.stop="nextMonth" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1560" width="16" height="16">
                    <path d="M658.56 557.392L322.536 221.384l45.248-45.256 336.016 336.008z" p-id="1561" fill="#8a8a8a"></path>
                    <path d="M704.088 512.2L364.12 852.16l-45.256-45.248 339.976-339.976z" p-id="1562" fill="#8a8a8a"></path>
                </svg>
                <svg t="1660792743438" @click.stop="nextYear" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1538" width="16" height="16">
                    <path d="M527.471 275.362l180.54 236.26-186.646 236.256a38.17 38.17 0 0 0-8.781 24.048 38.19 38.19 0 0 0 13.743 29.395 38.172 38.172 0 0 0 53.822-4.962L786.641 536.05c11.581-14.084 11.581-34.392 0-48.474L586.635 227.267a38.169 38.169 0 0 0-53.822-5.726 38.158 38.158 0 0 0-13.848 25.799 38.178 38.178 0 0 0 8.506 28.022z m0 0M503.804 536.05c11.58-14.084 11.58-34.392 0-48.474L303.798 227.267a38.17 38.17 0 0 0-53.821-5.726 38.172 38.172 0 0 0-5.723 53.822l180.92 236.26-186.647 236.255a38.17 38.17 0 0 0-8.78 24.048 38.183 38.183 0 0 0 41.682 38.079 38.178 38.178 0 0 0 25.883-13.646L503.804 536.05z m0 0" p-id="1539" fill="#8a8a8a"></path>
                </svg>
            </div>
        </div>
        <div class="open-calendar-main">
            <div class="open-calendar-main-header">
                <span v-for="item in weeks">{{item}}</span>
            </div>
            <div class="open-calendar-main-mian">
                <span v-for="item in prevDay" class="prev">{{item}}</span>
                <span v-for="item in currentMonthDays" class="current" @click.stop="selectDate(item)">{{item}}</span>
                <span v-for="item in nextDay" class="next">{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OpenCalendar',
        props: {
            width: {
                type:  Number,
                default: 250
            }
        },
        emits:['update:modelValue'],
        data() {
            return {
                weeks: ['日','一','二','三','四','五','六'],
                currentYear: '',//当前年限
                currentMonth: '',//当前月份
                currentMonthDays: '',//当前月份的总共天数
                prevDay:[],
                nextDay:[],
                time: '',
                dW: '0px',
                itemW:'',
                itemH:''
                
            }
        },
        mounted(){
            this.getDate();
            this.dW = this.width + 'px';
            this.itemH = this.width / 7 + 'px';
            this.itemW = this.width / 7 + 'px';

        },
        methods: {
            getDate(){
                let date = new Date();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;
                this.currentMonthDays = this.getDays(this.currentMonth - 1);
                this.createTime();
            },
            // 上个月
            prevMonth(){
                this.currentMonth -= 1;
                if(this.currentMonth < 1){
                    this.currentMonth = 12;
                    this.currentYear -= 1;
                }
                this.createTime();
            },
            // 下个月
            nextMonth(){
                this.currentMonth += 1;
                if(this.currentMonth > 12){
                    this.currentMonth = 1;
                    this.currentYear += 1;
                }
                this.createTime();
            },
              // 上一年
            prevYear(){
                this.currentYear -= 1;
                this.createTime();
            },
            // 下一年
            nextYear(){
                this.currentYear += 1;
                this.createTime();
            },
            // 获取当前显示的时间数据
            createTime(){
                this.currentMonthDays = this.getDays(this.currentYear,this.currentMonth - 1);
                this.getPrevMonth(this.currentYear,this.currentMonth);
                this.getNextMonth(this.currentYear,this.currentMonth,this.currentMonthDays);
            },
            // 获取上个月的时间差
            getPrevMonth(year,month){
                let firstWeekDay = this.getDayWeek(year,month,1);
                //获取上个月天数
                let months = month - 2 < 0 ? 11 : month - 2;
                let prevDays = this.getDays(year,months);
                let timeDiff = [];
                if(firstWeekDay < 7){
                    for(let i = prevDays; i > 0; i -- ){
                        if(timeDiff.length >= firstWeekDay){
                            break;
                        }
                        timeDiff.push(i);
                    }
                } 
                timeDiff = timeDiff.reverse();
                this.prevDay = timeDiff;
            },
            // 获取下个月时间差
            getNextMonth(year,month,day){
                let lastWeekDay = this.getDayWeek(year,month,day);
                 // 获取下个月天数
                let months = month == 12 ? 11 : month;
                let nextDays = this.getDays(year,months);
                let timeDiff = [];
                if(lastWeekDay < 7){
                    for(let i = 1 ; i < nextDays; i ++ ){
                        if(timeDiff.length >= 6 - lastWeekDay ){
                            break;
                        }
                        timeDiff.push(i);
                    }
                }
                if(lastWeekDay == 7){
                    lastWeekDay = 6;
                    for(let i = 1 ; i < nextDays; i ++ ){
                        if(timeDiff.length >= lastWeekDay){
                            break;
                        }
                        timeDiff.push(i);
                    }
                }
                this.nextDay = timeDiff;
            },
             /**
             * 输入日期获取周几
             * @param date:number 几号
             * @param month:number 几月
             * @param year:number 年份
             * @return day:number 周几
            */
            getDayWeek(year,month,date){
                // 判断年月日必须是要有的，并且是数字类型
                if(!date || !month || !year){
                    throw 'Error: The parameter must be both year, month and day; 报错：参数必须是年，月，日';
                    return false;
                }
                // 对月份进行格式化,四舍五入，然后判断大于12或者小于1就默认月份为1
                if(Math.round(month) > 12 || Math.round(month) < 1){
                    month = 1;
                }
                // 对日期进行格式化,四舍五入，然后判断大于当月天数或者小于1就默认日期为1
                if(Math.round(date) > this.getDays(month - 1,year) || Math.round(date) < 1){
                    date = 1;
                }
                // 对年份进行格式化,四舍五入，然后判断年份长度如果不等于4,就默认年份为当前年份
                if(Math.round(year).toString().length != 4){
                    year = new Date().getFullYear();
                }
                let dates = "'" + month + "/" + date + "/" + year + "'";
                let day  = new Date(dates);
                return day.getDay();
            },
            /**
             * 获取本月的天数
             * @param month:number 需要查询的月份
             * @param year:number 需要查询的年份
             * @return days:number 返回查询的月份天数 
            */
            getDays(year,month){
                let monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
                if((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)){
                    monthDays[1] = 29;
                }
                return monthDays[month];
            },
            // 选择日期
            selectDate(day){
                let time = this.currentYear+'-'+this.currentMonth+'-'+day;
                this.$emit('update:modelValue',time);
                this.$emit('change',time);
            }
        }

    }
</script>

<style scoped>
    .open-calendar{
        width: v-bind(dW);
        user-select:none;
        background: #ffffff;
        padding: 10px;
        border-radius: 5px;
    }
    .open-calendar-header{
        display: flex;
        justify-content: space-between;
        padding: 5px 0 10px 0;
        font-size: 13px;
        color: #666666;
    }
    .open-calendar-header span{
        margin: 0 5px;
    }
    svg{
        margin: 0 2px;
        cursor: pointer;

    }
    .open-calendar-main-header{
        display: flex;
        justify-content: space-around;
        font-size: 13px;
    }
    .open-calendar-main-mian{
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        font-size: 13px;
    }
    .open-calendar-main-mian span{
        display: inline-block;
        width: v-bind(itemW);
        height: v-bind(itemH);
        line-height: v-bind(itemH);
        border-radius: 50%;
        text-align: center;
        box-sizing: border-box;
        cursor: pointer;
    }
    .current{
        font-size: 12px;
        color: #666666;
    }
    .current:hover{
        color: #1890ff;
        font-weight: bold;
    }
    .prev,.next{
        color: #cccccc;
    }
</style>