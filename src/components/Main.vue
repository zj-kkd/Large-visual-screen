<template>
    <div class="com-main">
       <div class="top">
           <slot name='header'></slot>
       </div>
       <div class="left"></div>
       <div class="center"></div>
       <div class="right"></div>
       <div class="bottom"></div>
    </div>
</template>
<style lang="scss" scoped>
.com-main {
    width: 100%;
    height: 100vh;
    background-color:orange;
    display: flex;
    flex-wrap: wrap;
    .top {
        height: 60px;
        width: 100%;
        border: 1px solid red;
    }
    .left, .right {
        width: 22%;
        height: calc(60vh - 60px);
        background-color: blue;
    }
    .center {
        width: 56%;
        background-color: yellow;
    }
    .bottom {
        height: 40vh;
        width: 100%;
        background-color: #fff;
    }
}
</style>