var canvas = document.getElementById('bg');
/*获取屏幕宽高。用作适配*/
var w = document.documentElement.offsetWidth;
var h = document.documentElement.offsetHeight;

canvas.width = w;
canvas.height = h;

canvas.backgroundColor = "#000";

var ctx = canvas.getContext('2d');

function Build() {
    this.ctx = ctx;
    this.counts = 300; //最大粒子数
    this.maxSize = 4; //初始化最大的大小
    this.halfWidth = w / 2,
        this.halfHeight = h / 2;
    this.arr = []; //用于存储变量
}
Build.prototype.add = function(coor) {
    var grd = this.ctx.createRadialGradient(coor.x, coor.y, coor.size / 2, coor.x, coor.y, coor.size);
    grd.addColorStop(0, "white");
    grd.addColorStop(1, coor.color);
    this.ctx.fillStyle = grd;
    this.ctx.beginPath();
    this.ctx.arc(coor.x, coor.y, coor.size, 0, Math.PI * 2, true);
    this.ctx.transform(1, 0, 0, 1, 0, coor.z);
    this.ctx.closePath();
    this.ctx.fill();
}
Build.prototype.init = function() {
    this.run();
    this.render();
    this.animate();
}
Build.prototype.run = function() {
    var nums = 0;
    while (nums < this.counts) {
        var coor = {
            x: Math.ceil(Math.random() * w),
            y: Math.ceil(Math.random() * h),
            posx: Math.random() * w - this.halfWidth,
            posy: Math.random() * h - this.halfHeight,
            fl: 100,
            speed: Math.random() * 2,
            posz: Math.random() * 250,
            r: Math.ceil(Math.random() * this.maxSize),
            color: "rgba(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.random() + ")"
        };
        this.arr.push(coor);
        nums++;
    }
}
Build.prototype.clear = function() {
    ctx.clearRect(0, 0, w, h);
}
Build.prototype.render = function() {
    this.clear();
    for (var item of this.arr) {
        this.draw(item);
    }
}
Build.prototype.animate = function() {
        var _this = this;
        this.render();
        /*api自带方法*/
        window.requestAnimationFrame(function() {
            _this.animate();
        });
    },
    Build.prototype.draw = function(item) {
        if (item.posz > -item.fl) {
            /*连续修改scale，保持变化，用于控制量子大小，在屏幕上的位置*/
            var scale = item.fl / (item.fl + item.posz);
            /*修改对应数据*/
            item.x = this.halfWidth + item.posx * scale;
            item.y = this.halfHeight + item.posy * scale;
            item.size = item.r * scale;
            item.posz -= item.speed;
        } else {
            /*初始化超出屏幕的量子。达成屏幕量子数量保持衡量的方法*/
            item.posz = Math.random() * 250;
        }
        this.add(item);
    }
var app = new Build();
app.init();
window.addEventListener('resize', function() {
    canvas.width = w = window.innerWidth;
    canvas.height = h = window.innerHeight;
}, false);