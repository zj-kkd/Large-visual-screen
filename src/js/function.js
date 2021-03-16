let sliceString = (() => {
    let sliceNum = 9;
    let row = Math.ceil(item.name.length / sliceNum);
    let arr = [];
    for (let i = 0; i < row; i++) {
        arr.push(item.name.slice(i * sliceNum, (i + 1) * sliceNum));
    }
    return arr.join("\n");
})();


export default {
    tooltip,
    dataZoom,
    lineStyle,
    getRem
}