<template>
    <div class="com-defraud-type-number">
        <li v-for="item in chartData" :key="item.name">
            <p class="title">{{item.name}}</p>
            <p class="info">
                <span class="value">{{item.value}}</span>
                <span class="add">{{item.add}}</span>
            </p>
        </li>
    </div>
</template>
<script>
export default {
    props: ['chartData'],
    mounted() {
        console.log(111, this.chartData)
    }
}
</script>
<style lang="scss" scoped>
.com-defraud-type-number {
    margin-top: 15rem;
    background-image: url('../../../public/static/img/imgs/fanzha/img_centertjbg.png');
    background-size: 100% 100%;
    height: 75rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
        width: 25%;
        height: 70%;
        padding: 0 15rem;
        .title {
            color: rgba(204, 204, 204, 1);
            font-size: 16rem;
        }
        .info {
            position: relative;
            font-weight: 200;
            margin-top: 5rem;
            .value {
                font-size: 22rem;
                color: $yellow;
            }
            .add {
                position: absolute;
                right: 0;
                bottom: 0rem;
                font-size: 18rem;
                color: $yellow;
                &::before {
                    display: inline-block;
                    width: 14rem;
                    height: 14rem;
                    content: '';
                    margin-right: 2rem;
                    background-size: 100%;
                    background-image: url('../../../public/static/img/icons/icon_add.png');
                }
            }
        }
    }
    
}
</style>