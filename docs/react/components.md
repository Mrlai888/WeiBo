---
组件集合
---
## 自定义组件

### 日历组件

```js
import React, { Component } from "react";
import touch from 'components/crossBorder-touch';
import * as _ from "lodash";
import Swiper from 'swiper';
import 'swiper/swiper.scss';
import './index.scss';

class DateItem {
    /**
     *
     * @param  dayNum 日数, 如果和 new Date().getDate() 相等则是今天
     * @param  isNeedTag=false 是否需要添加标签
     * @param  isSelected=false 小于于今日和这个月的日期不能选择
     */
    constructor({ dayNum, isNeedTag = false, isSelected = false }) {
        Object.assign(this, {
            dayNum,
            isNeedTag,
            isSelected,
        });
    }
}
const l = (value) => { console.log(value) }

const weeks = ["日", "一", "二", "三", "四", "五", "六"];
class CroBorDataPicker extends Component {
    constructor(props) {
        super(props);
        this.swiperInstance = null
        this.state = {
            date: '',
            year: '',
            month: '',
            currentCard: 0,
            dayList: [{}, {}, {}],
            pickerList: [[], [], []],
            nowadays: '',
            isShowDateSelect: false,
            croBorDate: props.croBorDate,
            prevMonth: null,
            nextMonth: null
        };
    }



    initState = ({ y, m, d } = {}) => {
        const date = new Date();
        const year = y || date.getFullYear(); // 本年
        const month = m || date.getMonth() + 1; // 本月

        const nextMonth = (month + 1) > 12 ? 1 : (month + 1); // 下个月
        const prevMonth = (month - 1) < 1 ? 12 : (month - 1);  // 上个月
        let nowadays = d || date.getDate(); // 当前时间
        if (year == date.getFullYear() && month == date.getMonth() + 1 && nowadays == date.getDate()) {
            nowadays = nowadays + 1
        }
        // console.log(year, month,'year, month')
        this.getMonthDate(year, month, 0)
        // 计算上个月、下个月
        this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 1)
        this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 2)
        this.setState({
            year,
            month,
            nowadays
        });
    };

    // 获取月份数据
    getMonthDate(year, month, index = 0) {
        // console.log('我被执行le',index)
        let daysList = this.state.dayList;
        let pickerListRes = this.state.pickerList


        let date = new Date()
        // 时间列表
        let list = [];

        // 当前月天数
        let date2 = new Date(year, month, 0);// 最后一天
        let days = date2.getDate();


        // 当前月月第一天是星期几
        let firstDay = new Date(`${year}-${month}`);
        let day = new Date(firstDay.setDate(1)).getDay();

        let isSelected = false;
        const thisMonth = date.getMonth() + 1; // 本月
        const thisYear = date.getFullYear() // 本年
        const date2GtDate = firstDay < new Date();// 是否小于当前时间
        const isCurrentTime = `${year - month}` == `${thisYear - thisMonth}`; // 选择的日期的月份是否是本月
        for (let i = 0; i < days + day; i++) {
            const dayNum = i - day + 1;
            if (date2GtDate) {
                if (isCurrentTime && (i >= (day + date.getDate()))) {
                    isSelected = false;
                } else {
                    isSelected = true;
                }
            } else {
                isSelected = false;
            }

            if (i < day) {
                // 补充日期前面空缺
                list.push(new DateItem({ dayNum: 0, isSelected: false }));
            } else {
                list.push(new DateItem({ dayNum, isSelected }));
            }
        }

        let dayListItem = this.getHlist(list, isSelected)
        daysList[index] = { year, month, days, day }
        pickerListRes[index] = dayListItem
        let result = JSON.parse(JSON.stringify(pickerListRes))

        this.setState({ dayList: daysList, pickerList: result })
    }

    // 把一维日期切成二维日期
    getHlist = (list, isSelected) => {
        let hlist = _.chunk(list, 7); // 转化为二维数组
        let len = hlist.length;
        let to = 7 - hlist[len - 1].length;

        // 循环尾部补空格
        for (let i = 0; i < to; i++) {
            hlist[len - 1].push(new DateItem({ dayNum: 0, isSelected: false }));
        }
        return hlist;
    };

    // 点击左右按钮滑动

    handleMonth(flag) {
        console.log(this.state.dayList, 'dayList')
        // return
        const { currentCard, month, year } = this.state;
        // 下标
        let currentMonth = new Date().getMonth() + 1
        let currentYear = new Date().getFullYear()
        let index = currentCard;
        if (flag === 'left') {
            if (currentMonth === month && currentYear === year) {
                l('无法选择下一个月')
                return
            }
            index = index - 1 < 0 ? 2 : index - 1
            this.handleslideToLoop(index, 900, currentCard, 'slidePrev')
        }
        else {
            index = index + 1 > 2 ? 0 : index + 1
            this.handleslideToLoop(index, 900, currentCard, 'slideNext')
        }
    }

    handleslideToLoop = async (index, speed = 2000, currentCard, methods) => {
        console.log(index, 'indexx')
        this.swiperInstance && this.swiperInstance[methods](1000, async () => {
            let thisMonthInfo = this.state.dayList[currentCard]
            let { year, month } = thisMonthInfo;
            const nextMonth = (month + 1) > 12 ? 1 : (month + 1); // 下个月
            const prevMonth = (month - 1) < 1 ? 12 : (month - 1);  // 上个月
            // index 0当前月  1 下个月   2上个月
            if (index === 0) {
                // 当前月，需要计算上一月、下一月
                await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 1)
                await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 2)
            } else if (index === 1) {
                // 下个月，需要计算当前月、上个月
                await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 2)
                await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 0)
            } else if (index === 2) {
                // 上个月，需要计算当前月、下个月
                await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 0)
                await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 1)
            }
            this.setState({
                currentCard: index,
                year,
                month
            })
        })
    }

    // 点击每个日期
    handleDateItemClick = (e) => {
        const { year, month, date, nowadays } = this.state;
        let data = e.target.getAttribute('datedata')
        if(data){
            let dateItem = JSON.parse(data)
            const { isSelected, isNeedTag, dayNum } = dateItem;
            if (dayNum === 0) return;
            const selectDate = new Date(`${year}-${month}-${dayNum}`);
            console.log("ok", selectDate.getTime(), new Date().getTime());
            if (selectDate.getTime() <= new Date().getTime()) {// 今天不可被选择
                l("不可选择");
                return;
            }
            if (isSelected)
                // 小于今天的日期不能被选择
                return;
    
            this.setState(state => {
                // const hlist = state.hlist.slice();
                // hlist[i][j].isNeedTag = true;
                return {
                    // hlist,
                    nowadays: dayNum
                };
            });
            console.log(year, month, dayNum, '点击每个日期')
            this.props.onSelectCroBorDate && this.props.onSelectCroBorDate({ year, month, dayNum })
        }
    };

    // 切换轮播图
    getCurrentCardNum = async (index, swiper) => {
        console.log(index, 'index')
        let thisMonthInfo = this.state.dayList[index]
        console.log(thisMonthInfo, 'thisMonthInfo')
        // return
        let { year, month } = thisMonthInfo;
        const nextMonth = (month + 1) > 12 ? 1 : (month + 1); // 下个月
        const prevMonth = (month - 1) < 1 ? 12 : (month - 1);  // 上个月
        // index 0当前月  1 下个月   2上个月
        if (index === 0) {
            // 当前月，需要计算上一月、下一月
            await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 1)
            await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 2)
        } else if (index === 1) {
            // 下个月，需要计算当前月、上个月
            await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 2)
            await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 0)
        } else if (index === 2) {
            // 上个月，需要计算当前月、下个月
            await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 0)
            await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 1)
        }
        this.setState({
            currentCard: index,
            year,
            month
        })
        // swiper.update();
    }

    selectDateCard() {
        const currentYear = this.state.year
        let year = new Date().getFullYear();
        let yearArr = []
        for (let i = year; i < year+99; i++) {
            yearArr.push(i)
        }
        let yearList = _.chunk(yearArr, 3); // 转化为二维数组
        return (
            <div
                className='data-picker-selectyear'
            >
                {yearList.map((item, index) => {
                    return (
                        <>
                            {<ul className='data-picker-selectyear-row' key={index + 'item'}>{
                                item.map((el, i) => {
                                    return (
                                        <>{
                                            <li className={el == currentYear ? 'data-picker-selectyear-selectitem' : 'data-picker-selectyear-item'}
                                                key={i + 'el'}
                                                onClick={() => { this.handleSelectYear(el) }}>
                                                {el}
                                            </li>
                                        }</>
                                    )
                                })
                            }</ul>}
                        </>
                    )
                })}
            </div>
        )
    }

    async handleSelectYear(year) {
        console.log(year, this.state.month,this.state.currentCard, 'year')
        let month = this.state.month;
        let index = this.state.currentCard;
        // this.initState({ y: parseInt(year), m: month })
        const nextMonth = (month + 1) > 12 ? 1 : (month + 1); // 下个月
        const prevMonth = (month - 1) < 1 ? 12 : (month - 1);  // 上个月
        // index 0当前月  1 下个月   2上个月
        if (index === 0) {
            // 当前月，需要计算上一月、下一月
            await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 1)
            await this.getMonthDate(year, month, index)
            await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 2)
        } else if (index === 1) {
            // 下个月，需要计算当前月、上个月
            await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 2)
            await this.getMonthDate(year, month, index)
            await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 0)
        } else if (index === 2) {
            // 上个月，需要计算当前月、下个月
            await this.getMonthDate((month + 1) > 12 ? year + 1 : year, nextMonth, 0)
            await this.getMonthDate(year, month, index)
            await this.getMonthDate((month - 1) < 1 ? year - 1 : year, prevMonth, 1)
        }
        this.setState({
            year, 
            isShowDateSelect: false
         })
    }


    showDate(list) {
        const { nowadays } = this.state;
        return (
            <>
                <table>
                    <tbody>
                        {
                            list.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        {item.map((dateItem, index) => {
                                            // console.log(dateItem,'itemmmm')
                                            const dayNum = dateItem.dayNum;
                                            // const isNeedTag = dateItem.isNeedTag;
                                            const isSelected = dateItem.isSelected;
                                            let val = dateItem?JSON.stringify(dateItem):'{}'
                                            return (
                                                <td
                                                    key={`${dayNum}-${index}-${Math.random()}`}
                                                    className={isSelected ? 'data-picker-dateitem disabel' : 'data-picker-dateitem'}
                                                    datedata={val}
                                                >
                                                    <div
                                                     datedata={val}
                                                     className={dayNum === nowadays ? 'data-picker-nowdaytime' : 'data-picker-daytime'}>{dayNum ? dayNum : ''}</div>
                                                </td>
                                            );
                                        })
                                        }
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </>
        )
    }


    render() {
        const { year, month, dayList, pickerList, isShowDateSelect } = this.state;
        return (
            <div className='data-picker'>
                <div className='data-picker-header'>
                    <div className='data-picker-monthselect'>
                        <div>{month}  {year}</div>
                        <i onClick={() => this.setState({ isShowDateSelect: !isShowDateSelect })}></i>
                    </div>
                    {!isShowDateSelect && (<div className='data-picker-monthchange'>
                        <i className='data-picker-monthchange-left ' onClick={() => this.handleMonth('left')}></i>
                        <i className='data-picker-monthchange-right' onClick={() => this.handleMonth('right')}></i>
                    </div>)}
                </div>
                <div className='data-picker-content'
                >
                    {isShowDateSelect && this.selectDateCard()}
                    {weeks.map(el => (
                        <div className='data-picker-weak' key={el}>{el}</div>
                    ))}
                    <div className='data-picker-label'>
                        <div className="swiper-container">
                            <div className="swiper-wrapper" onClick={(e)=>this.handleDateItemClick(e)}>
                                {[0, 1, 2].map(item => {
                                    return (<div className="swiper-slide" key={item}>
                                        {
                                            this.showDate(pickerList[item])
                                        }
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentWillMount() {
        console.log(this.props.croBorDate, 'fffff')
        let year = new Date(this.props.croBorDate).getFullYear()
        let month = new Date(this.props.croBorDate).getMonth() + 1
        let day = new Date(this.props.croBorDate).getDate()
        this.initState({ y: year, m: month, d: day });
    }

    componentDidUpdate() {
        if (this.swiperInstance) {
            this.swiperInstance.loopDestroy()
            this.swiperInstance.loopCreate()
        }
    }

    componentDidMount() {
        //替换this,防止与Swiper中的this冲突
        let self = this;
        setTimeout(() => {
            const SwiperInstance = new Swiper('.swiper-container', {
                //各卡片之间的间距
                spaceBetween: 10,
                // //卡片轮播方向
                direction: 'horizontal',
                loop: true, // 循环播放

                observer: true, //开启动态检查器  数据变化重新渲染swiper  必须加否则出现数据更新但是视图未更新情况
                observeParents: true,  // 数据变化重新渲染swiper  必须加否则出现数据更新但是视图未更新情况

                // // 自动播放时间
                autoplay: false,
                // // 播放的速度
                speed: 1000,
                preventLinksPropagation: false,//防止冒泡
                on: {
                    slideChangeTransitionEnd: function (swiper) {
                        // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                        self.getCurrentCardNum(this.realIndex, swiper);
                    },
                }
            });

            self.swiperInstance = SwiperInstance

        },0)
        //swiper的配置

    }
}

export default CroBorDataPicker;

```

### 仪表盘

```js
// 半圆端部带胶囊

import React, { useEffect, FC, useCallback } from "react";
import { thousandBitSeparator, keep2DecimalFull } from 'src/utils/NumUtils';
import './progress.scss';
interface ProgressProps {
    actualPayamt: any,
    totalPayment: any
}

const Progress: FC<ProgressProps> = (props) => {
    const { actualPayamt, totalPayment } = props;
    interface Draw {
        min: number
        max: number
    }

    const draw = useCallback(({ min, max }: Draw, sRadius: number) => {
        if (min < 0 || min > max) {
            return;
        }
        if (sRadius < Math.PI / 2 || sRadius >= 3 / 2 * Math.PI) {
            return;
        }

        const canvas: any = document.querySelector('#canvas')!,
            cxt = canvas.getContext('2d'),
            cWidth = canvas.width,
            radiux = 110, //半径
            bottom = 20,
            outBorder = 16,//外层弧形宽度
            insideBodrder = 10,//内层弧形宽度
            cHeight = canvas.height,
            baseColor = '#F3F3F4',//灰色背景
            coverColor = '#0bffd5',//填充效果
            cileColor = "#FFFFFF",//圆球效果
            PI = Math.PI,
            sR = sRadius || 1 / 2 * PI // 默认圆弧的起始点弧度为π/2
        const finalRadian = sR + ((PI + (PI - sR) * 2) * min / max); // 红圈的终点弧度
        const step = (PI + (PI - sR) * 2) / 100; // 一个1%对应的弧度大小
        let text = 0.3; // 进度 最大值100
        //适配各种分辨率屏幕
        const ratio = getPixelRatio(cxt);
        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;
        cxt.scale(ratio, ratio);

        const paint = () => {
            cxt.clearRect(0, 0, cWidth, cHeight);
            var endRadian = sR + text * step;
            // 画灰色圆弧
            drawCanvas(cWidth / 2, cHeight - bottom, radiux, sR, sR + (PI + (PI - sR) * 2), baseColor, insideBodrder);
            // 画蓝色圆弧
            drawCanvas(cWidth / 2, cHeight - bottom, radiux, sR, endRadian, coverColor, outBorder);

            // 画红色圆头
            // 红色圆头其实就是一个圆，关键的是找到其圆心，涉及到三角函数知识，自己画个图一看就明了
            const angle = 2 * PI - endRadian; // 转换成逆时针方向的弧度（三角函数中的）
            const xPos = Math.cos(angle) * radiux + cWidth / 2; // 灰色圆 圆心的x坐标
            const yPos = -Math.sin(angle) * radiux + cHeight - bottom; // 灰色圆 圆心的y坐标

            const endRadians = sR + (text + 10) * step;
            const angles = 2 * PI - endRadians; // 转换成逆时针方向的弧度（三角函数中的）
            const xsPos = Math.cos(angles) * radiux + cWidth / 2; // 蓝色圆 圆心的x坐标
            const ysPos = -Math.sin(angles) * radiux + cHeight - bottom; // 蓝色圆 圆心的y坐标

            //跟着弧形动的白色⚪
            drawCanvas(xPos, yPos, 2, 0, 2 * PI, cileColor, 4);
             //弧形最开始的白色⚪
            drawCanvas(cWidth / 2 - radiux, cHeight - bottom + (outBorder - insideBodrder) / 2 , 2, 0, 2 * PI, cileColor, 4);
            //滚动金钱
            const textMoney = `${thousandBitSeparator(keep2DecimalFull(actualPayamt))} HKD`;
            const textWidth = cxt.measureText(textMoney).width;
            //画底层胶囊 为了实现边框效果 灰底
            cxt.beginPath();
            if (text <= 80) {
                cxt.moveTo(xsPos - textWidth / 2, ysPos + 10);
                cxt.lineTo(xsPos + textWidth / 2, ysPos + 10);
            } else {
                cxt.moveTo(255.43739679191134 - textWidth / 2, 158.38274739076002);
                cxt.lineTo(255.43739679191134 + textWidth / 2, 158.38274739076002);
            }
            cxt.closePath();
            cxt.lineWidth = 18;
            cxt.strokeStyle = "#f3f3f4";
            cxt.lineJoin = "round";
            cxt.stroke();

            //画上层胶囊 为了实现内容区域 白底
            cxt.beginPath();
            if (text <= 80) {
                cxt.moveTo(xsPos - textWidth / 2, ysPos + 10);
                cxt.lineTo(xsPos + textWidth / 2, ysPos + 10);
            } else {
                cxt.moveTo(255.43739679191134 - textWidth / 2, 158.38274739076002);
                cxt.lineTo(255.43739679191134 + textWidth / 2, 158.38274739076002);
            }
            cxt.closePath();
            cxt.lineWidth = 16;
            cxt.strokeStyle = "#ffffff";
            cxt.lineJoin = "round";
            cxt.stroke();

            //画字体
            cxt.fillStyle = "#484848";
            cxt.font = "48px";
            if (text <= 80) {
                cxt.fillText(textMoney, xsPos - textWidth / 2, ysPos + 14)
            } else {
                cxt.fillText(textMoney, 255.43739679191134 - textWidth / 2, 162.38274739076002)
            }

            text++;
            if (endRadian.toFixed(2) < finalRadian.toFixed(2)) {
                window.requestAnimationFrame(paint);
            }

        }
        window.requestAnimationFrame(paint);
        const drawCanvas = (x: number, y: number, r: number, sRadian: number, eRadian: number, color: string, lineWidth: number) => {
            cxt.beginPath();
            cxt.lineCap = "round";
            cxt.strokeStyle = color;
            cxt.lineWidth = lineWidth;
            cxt.arc(x, y, r, sRadian, eRadian, false);
            cxt.fillStyle = "#FFFFFF"
            cxt.stroke();
        }
    },[actualPayamt])


    useEffect(() => {
        draw({
            min: actualPayamt,
            max: totalPayment,
        }, Math.PI * 0.99);
    }, [actualPayamt, totalPayment,draw])

    const getPixelRatio = (context: any) => {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    }

    return (
        <div id="_content">
            <canvas id="canvas" width="300" height="200"></canvas>
        </div>
    )
}

export default Progress;

// 圆形
import React, { useEffect, FC, useCallback, useState, useRef } from "react";
import { thousandBitSeparator, keep2DecimalFull } from 'src/utils/NumUtils';
import './index.scss';
interface DashBoardProps {
    actualMonth: any,
    totalMonth: any
}

const DashBoard: FC<DashBoardProps> = (props) => {
    const { actualMonth, totalMonth } = props;
    // const [process,setProcess] = useState(0);
    const circleLoading:any = useRef();
    interface Draw {
        min: number
        max: number
    }

    const draw = useCallback(({ min, max }: Draw, start: number) => {
        if (min < 0 || min > max) {
            return;
        }
        const canvas: any = document.querySelector('#dashCanvas'),
            ctx = canvas.getContext('2d'),
            percent = Math.ceil((min / max)*100), //最终百分比
            circleX = canvas.width / 2, //中心x坐标
            circleY = canvas.height / 2, //中心y坐标
            radius = 55, //圆环半径
            cradius = 80, // canvas半径
            lineWidth = 20, //圆形线条的宽度
            fontSize = 16; //字体大小


        //画圆
        const circle = (cx: number, cy: number, r: number) => {
            ctx.beginPath();
            //ctx.moveTo(cx + r, cy);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = '#F3F3F4';
            ctx.arc(cx, cy, r, Math.PI * 0, Math.PI * 2); // cx:x坐标，cy:y坐标，r:半径 ，起始，结束 
            ctx.stroke();
        }

        //画弧线 startAngle:起点，endAngle：终点
        function sector(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            // 渐变色 
            var linGrad = ctx.createLinearGradient(
                circleX - radius - lineWidth, circleY, circleX + radius + lineWidth, circleY
            );
            linGrad.addColorStop(0.0, '#6DBDED');
            linGrad.addColorStop(1.0, '#67F5E0');
            ctx.strokeStyle = linGrad;

            //圆弧两端的样式
            ctx.lineCap = 'round';

            //圆弧
            if(endAngle<100){
                ctx.arc(
                    cx, cy, r,
                    ( startAngle),
                    ( startAngle) + (2 * Math.PI * (endAngle / 100)),
                    false
                );
            }else{
                ctx.arc(
                    cx, cy, r,
                    ( startAngle),
                    ( startAngle) + (2 * Math.PI * (endAngle+2 / 100)),
                    false
                );
            }
      
            ctx.stroke();
        }
        
        //刷新
        const loadingCircle = (process:any) => {

            //清除canvas内容
            ctx.clearRect(0, 0, circleX * 2, circleY * 2);

           //中间的字
           ctx.textAlign = 'center';
           ctx.textBaseline = 'middle';
           ctx.fillStyle = 'black';
           ctx.font = ' normal  bold 28px SF UI Display';
           if (min < 10) {
               ctx.fillText(min + '', circleX - 14, circleY - 10);
           } else {
               ctx.fillText(min + '', circleX - 16, circleY - 10);
           }


           ctx.fillStyle = '#999';
           ctx.font = fontSize + 'px SF UI Display';
           if (min < 10) {
               ctx.fillText('/', circleX, circleY - 8);
               ctx.fillText(totalMonth +'', circleX + 14, circleY - 8);
           } else {
               ctx.fillText('/', circleX+4, circleY - 8);
               ctx.fillText(totalMonth + '', circleX + 18, circleY - 8);
           }

           ctx.fillText('个月', circleX, circleY + 14);

            //圆形
            circle(circleX, circleY, radius);

            //圆弧
            sector(circleX, circleY, radius, start, process);
            
            process+=2

            circleLoading.current = setTimeout(()=>{
                if (process >= percent+2) {
                    clearTimeout(circleLoading.current )
                    return 
                }else{
                    loadingCircle(process);
                }
            }, 20);
        }
        loadingCircle(0)

    }, [actualMonth])


    useEffect(() => {
        draw({
            min: actualMonth,
            max: totalMonth,
        }, Math.PI * 1.5);
    }, [actualMonth, totalMonth])

    return (
        <div id="_dashContent">
            <canvas id="dashCanvas" width="130px" height="130px"></canvas>
        </div>
    )
}

export default DashBoard;

```

### 上传文件

``` js
import { throws } from "assert";
import { info } from "console";
import { nextTick } from "process";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Button from '../Button';
import Toast from "../toast";
// import SparkMD5 from 'spark-md5';
import './inputFile.scss';

export interface InputFileProps {
    onChange?: any;
    btnText: string;
    accept?: string;
    disabled?: boolean;
    multiple?: boolean,
    style?: object;
    isNeedProgress?: boolean, //是否需要进度条
    onUploadSuccess?: Function
    onUploadBefore?: Function, // 开始上传文件
    onUploadProgress?: Function  // 上传文件中

}

export const InputFile = forwardRef(({
    onChange,
    btnText,
    accept = '',
    disabled = false,
    multiple = true,  // 多个上传
    style = {},
    onUploadSuccess,
    onUploadBefore,
    onUploadProgress,
    isNeedProgress,
}: InputFileProps, ref: any) => {

    const [inputType, setInputType] = useState('file');

    const fileChange = async (e: any) => {
        let fileInfo = e.currentTarget.files;
        let fileList = Array.prototype.slice.call(fileInfo)
        console.log(fileList, 'fileList')

        let readBeforeList = fileList.map(item=>{
            return {
                isok:true,
                info:{
                    fileName: item.name,
                    fileSize: item.size,
                    uploadStatus: 'success'
                }
            }
        })
        onUploadSuccess && onUploadSuccess(readBeforeList)

        // 保存文件上传进度
        let fileProgressObj: any = {}
        await fileList.map(item => {
            fileProgressObj[item.name] = 0
        })
        setInputType('text');

        setTimeout(() => {
            setInputType('file');
        }, 0)
        let result = await getFileInfo(fileList, (val: any, cb: Function) => {
            onUploadBefore ? onUploadBefore(val, cb) : cb(false)
        }, (val: any, resolve: any, reject: any) => {
            if (val.fileName === 'download.zip' || val.fileName === 'information (1).png') {
                reject({
                    error: '上传失败',
                    fileName: val.fileName,
                    fileSize:val.fileSize,
                    uploadStatus: 'fail'
                })
                return 
            }
            // 将本地文件上传至浏览器时读取进度条
            if (isNeedProgress) {
                fileProgressObj[val?.fileName] = val?.uploadProgress
                let currentObj = Object.keys(fileProgressObj).map(item => {
                    return {
                        fileName: item,
                        progress: (parseInt(((fileProgressObj[val?.fileName] / val?.fileSize) * 100).toString())),
                    }
                })
                console.log(val?.fileName, fileProgressObj[val?.fileName], val?.fileSize, 'uploadProgress');
                onUploadProgress && onUploadProgress(currentObj)
            }

        })
        console.log(result, 'result')
        !!result.length && onUploadSuccess && onUploadSuccess(result)

        onChange && onChange(fileList)
    }

    useImperativeHandle(ref, () => ({

    }))

    return (
        <div style={{ position: 'relative', ...style }}>
            <div className="btnWrap">
                <div className="addIcon"></div>
                <div
                    key='name'
                    className="addText"
                >
                    {btnText}
                </div>
            </div>
            <input
                ref={ref}
                type={inputType}
                onChange={(e) => {
                    fileChange(e)
                }}
                disabled={disabled}
                multiple={multiple}
                style={{
                    opacity: 0,
                    width: 120,
                    height: 30,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 1000
                }}
                accept={accept}
            />
        </div>
    )
})



// 读取文件
const getFileInfo = async (fileList: Array<File>, LoadStartCallBack: Function, onProgressCallBck: Function) => {
    const readList: any = []
    fileList.forEach(async (item) => {
        readList.push(wrapPromise(readFileInfo(item, LoadStartCallBack, onProgressCallBck)))
    })
    let result = await Promise.all([...readList])

    // 文件是否上传成功
    // let isAllupLoadSucess = result.every((val) => {
    //     console.log(val, 'val')
    //     if (!val?.isok) {
    //         const { error } = val
    //         Toast.info(error.fileName ? `${error.fileName} 上传失败` : error.error, { duration: 1000 })
    //     }
    //     return val?.isok
    // })

    let uploadFailFile = result.filter(item=>{
        return !item.isok
    }).map(item=>{
        return `文件${item?.info?.fileName} 上传失败`
    })
    Toast.info(uploadFailFile.join(';'),{ duration: 1000 })

    console.log(uploadFailFile.join(';'),'uploadFailFile')

    return result
}


const wrapPromise = (promise: Promise<any>) => {
    return new Promise((reslove, reject) => {
        promise
            .then((info) => reslove({ isok: true, info }))  // 文件读取成功
            .catch((info) => reslove({ isok: false, info })) // 文件读取失败
    })
}


export interface FileInfo {
    fileName: string;
    fileSize: number;
    uploadStatus: string;
    fileMD5?: string;
    chunk_file?: Array<Blob>;
}
const chunkSize = 10485760; // read in chunks of 10MB  每次读取文件大小

export async function readFileInfo(
    file: File,
    LoadStartCallBack?: Function,  // 文件上传前
    onProgressCallBck?: Function   // 文件上传中
): Promise<FileInfo> {

    return new Promise((resolve, reject) => {
        let currentChunk = 0;
        const chunks = Math.ceil(file.size / chunkSize);
        const FileFragment: Blob[] = []
        // const spark = new SparkMD5.ArrayBuffer();

        const fileOnLoad = (e: any) => {
            try {
                console.log('load')
                currentChunk++;
                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    resolve({
                        fileName: file.name,
                        fileSize: file.size,
                        uploadStatus: 'success'
                        // fileMD5: spark.end(),  //
                        // chunk_file:FileFragment  //
                    });
                }
            } catch (error) {
                reject({ error })
            }
        }

        const fileOnError = (error: any) => {
            console.log('error')
            reject({
                error: '上传失败',
                fileName: file.name,
                fileSize:file.size,
                uploadStatus: 'fail'
            })
        };

        const fileOnLoadStart = (cb: Function) => {
            LoadStartCallBack ? LoadStartCallBack({
                file: file,
            }, (isUnNext?: boolean) => {
                // isNext 返回false 继续上传 true 停止上传
                console.log(isUnNext, 'isUnNext')
                if (!isUnNext) {
                    cb()
                }
            }) : cb()
        }

        const fileOnProgress = (val: any, size: any) => {
            // console.log(val, 'progress')
            onProgressCallBck && onProgressCallBck({
                fileName: file.name,
                fileSize: file.size,
                uploadProgress: size
            }, resolve, reject);
        }

        async function loadNext() {
            const fileReader = new FileReader();
            fileReader.onload = fileOnLoad;
            fileReader.onerror = fileOnError;
            fileReader.onloadstart = (val: any) => { };
            // fileReader.abort()
            const start = currentChunk * chunkSize;
            const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            fileReader.onprogress = (val: any) => fileOnProgress(val, end);
            // 将文件分片
            let fragment = File.prototype.slice.call(file, start, end)
            // 将文件切片存储
            FileFragment.push(fragment)
            // 分片读取 防止读取失败
            fileReader.readAsArrayBuffer(fragment);
        }
        fileOnLoadStart(loadNext);
    });
}

```



