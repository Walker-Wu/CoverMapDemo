//生成指定范围内的随机浮点数
//公式：(Math.random()*(max-min)+min);
// max - 期望的最大值
// min - 期望的最小值

//在经线上，相差一纬度约111km，1公里就是 1/111 = 0.009度，这样就是1公里对应的经线度数。
//在纬线上，相差一经度约111cosα（α该纬线纬度），1KM就是该纬线应约1/(111*cosα)=0.009cosα度。
//假设当前定位的经度是x，纬度为y，那附近L公里的经度范围计算得出来如下：
//经度范围：(x-L/111, x+L/111)
//纬度范围：(y-L/(111*cosy), y+L/(111*cosy))
//只需要精确到小数点后7位，精度就是1CM

/*
function Grid(point) {
    this.min = point;
    this.max = this.sw2ne(this.min, this.size);
}
Grid.prototype.size = 0.02;
Grid.prototype.sw2ne = function (sw, size) {
    var ne = { lng: '', lat: '' };
    ne.lng = sw.lng + size / 111;
    ne.lat = sw.lat + size / (111 * Math.cos(sw.lat));
    return ne;
}
Grid.prototype.draw = function (ctx) {
    ctx.beginPath();
    // 绘制时需要对经纬度进行转换
    var swPixel = map.pointToPixel(this.min);
    var nePixel = map.pointToPixel(this.max);
    ctx.moveTo(swPixel.x, swPixel.y);
    ctx.lineTo(swPixel.x, nePixel.y);
    ctx.lineTo(nePixel.x, nePixel.y);
    ctx.lineTo(nePixel.x, swPixel.y);
    //ctx.closePath();  //效率低于lineTo
    ctx.lineTo(swPixel.x, swPixel.y);
    ctx.stroke();
    ctx.fill();
}
    var grid1 = new Grid(sw);
    console.log(grid1);
    grid1.draw(ctx);
    */

var gridData = (function () {
    function Position(sw, ne) {//构造随机点
        this.lng = Math.random() * (ne.lng - sw.lng) + sw.lng;
        this.lat = Math.random() * (ne.lat - sw.lat) + sw.lat;
    }
    function Grid(around) {//构造栅格
        this.sw = around.sw;
        this.se = around.se;
        this.ne = around.ne;
        this.nw = around.nw;
        this.centre = around.centre;
        this.size = around.size;//单位米
        this.style = '';//rgba(50, 50, 255, 0.3 )
        this.info = '';
    }
    let reg = {//设定区域范围
        centre: { lng: 113.364805, lat: 23.140929 },
        sw: { lng: 113.349529, lat: 23.133497 },
        ne: { lng: 113.380090, lat: 23.148302 }
    };
    let pArr = [];
    for (let i = 0; i < 1000; i++) {//区域范围内生成一组随机点
        pArr.push(new Position(reg.sw, reg.ne));
    }
    let gridArr = pArr.map(function (p) {//所有随机点位置分别生成栅格
        let around = getAround(p.lng, p.lat, 10.0);
        let grid = new Grid(around);
        grid.style = 'rgba(50, 50, 255, 0.3 )';
        grid.info = pArr.indexOf(p);
        return grid;
    })
    return gridArr;
    //return pArr;
})();


