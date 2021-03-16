
// 计算rem
let getRem = function (res) {
    let clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = clientWidth / 1920;
    return res * fontSize;
}

// 鼠标移入
let tooltip = [
    {
        trigger: "item",
        backgroundColor: "rgba(0,101,153,.5)",
        textStyle: {
            fontSize: 12,
            color: '#fff'
        },
        confine: true,
        show: true,
        padding: [10, 10],
    },
    {
        confine: true,
        trigger: "axis",
        axisPointer: {
            label: {
                show: false,
            },
            lineStyle: {
                width: 0
            }
        },
        backgroundColor: "rgba(0,101,153,.5)",
        textStyle: {
            fontSize: 12,
            color: "#fff"
        },
        padding: [10, 10],
    }
];

// 坐标轴缩放
let dataZoom = [
    {
        type: "inside",
        show: true,
        xAxisIndex: [0],
        start: 1,
        end: 30
    }
];

let fontColor = "rgba(255, 255, 255, .5)";
let lineColor = '#384861';

let lineStyle = {
    // 坐标轴名称
    nameTextStyle: {
        color: fontColor,
        fontSize: getRem(12)
    },
    // 坐标标签字体
    axisLabel: {
        color: fontColor,
        fontSize: getRem(12)
    },
    // 坐标线
    axisLine: {
        show: true,
        lineStyle: {
            color: lineColor,
        }
    },
    // 坐标刻度
    axisTick: {
        show: false
    },

    splitLine: {
        show: false,
        lineStyle: {
            color: lineColor
        }
    },
};


export default {
    tooltip,
    dataZoom,
    lineStyle,
    getRem
}