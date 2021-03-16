<template>
    <div class="com-Malicious-computer-room">
        <!-- base.scss  fanzha-title -->
        <div class="fanzha-title">
            <p>恶意网址机房TOP10</p>
        </div>
        <div class="chart">
            <li v-for="(item, index) in chartData" :key="index">
                <p class="text">
                    <span class="name">
                        <span class="top">{{(index + 1) == 10 ? 10: '0' + (index + 1)}}</span>
                        <span>{{item.name}}</span>
                    </span>
                    <span class="value">{{item.value}}</span>
                </p>
                <p class="bg">
                    <span class="data animate-left" :style="{width: (item.value/chartData[0].value * 100) + '%'}"></span>
                </p>
            </li>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.com-Malicious-computer-room {
    width: 100%;
    .chart {
        padding-left: 15rem;
        height: 400rem;
        display: flex;
        align-content: space-between;
        flex-wrap: wrap;
        li {
            width: 100%;
            font-size: 14rem;
            line-height: 14rem;
            color: rgba(255, 255, 255, 0.7);
            .text {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .top {
                    margin-right: 10rem;
                }
            }
            .bg {
                position: relative;
                overflow: hidden;
                margin-top: 6rem;
                width: 100%;
                height: 4rem;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 2rem;
                .data {
                    position: absolute;
                    left: 0;
                    display: block;
                    border-radius: 2rem;
                    width: 50%;
                    height: 100%;
                    background-color: #415070;
                    opacity: .8;
                }
            }
        }
    }
}
</style>

<script>
export default {
    props: ['chartData'],
}
</script> 