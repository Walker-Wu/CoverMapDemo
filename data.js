//生成指定范围内的随机浮点数
//公式：(Math.random()*(max-min)+min);
// max - 期望的最大值
// min - 期望的最小值
/*
var lng = 113.364805;
var lat = 23.140929;
*/
var max = { lng: 113.375905, lat: 23.152029 };
var min = { lng: 113.353705, lat: 23.129829 };
var coordData = [];

for (let i = 0; i < 1000; i++) {
    coordData.push(getCoord());
}


function getCoord() {
    mylng = Math.random() * (max.lng - min.lng) + min.lng;
    mylat = Math.random() * (max.lat - min.lat) + min.lat;
    return [mylng, mylat];
}

//在经线上，相差一纬度约111km，1公里就是 1/111 = 0.009度，这样就是1公里对应的经线度数。
//在纬线上，相差一经度约111cosα（α该纬线纬度），1KM就是该纬线应约1/(111*cosα)=0.009cosα度，对应度数与纬度相关，这样就是1公里对应的纬线度数。
//假设当前定位的经度是x，纬度为y，那附近L公里的经度范围计算得出来如下：
//经度范围：(x-L/111, x+L/111)
//纬度范围：(y-L/(111*cosy), y+L/(111*cosy))
//只需要精确到小数点后7位，精度就是1CM
var sw = { lng: 113.364805, lat: 23.140929 };


/*
function draw(swArr, neArr, ctx) {

    for (var i = 0, len = swArr.length; i < len; i++) {
        ctx.beginPath();

        // 绘制时需要对经纬度进行转换
        var swPixel = map.pointToPixel(swArr[i]);
        var nePixel = map.pointToPixel(neArr[i]);

        ctx.moveTo(swPixel.x, swPixel.y);
        ctx.lineTo(swPixel.x, nePixel.y);
        ctx.lineTo(nePixel.x, nePixel.y);
        ctx.lineTo(nePixel.x, swPixel.y);
        //ctx.closePath();  //效率低于lineTo
        ctx.lineTo(swPixel.x, swPixel.y);
        ctx.stroke();
        ctx.fill();
    }

}
*/
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
    /*
    var grid1 = new Grid(sw);
    console.log(grid1);
    grid1.draw(ctx);
    */

    (function () {
        //给定中心点和regionalSize，构造区域范围
        function Regional(centre, regionalSize) {
            this.max = { lng: '', lat: '' };
            this.min = { lng: '', lat: '' };
            this.max.lng = centre.lng + regionalSize / 2 / 111;
            this.max.lat = centre.lat + regionalSize / 2 / (111 * Math.cos(centre.lat));
            this.min.lng = centre.lng - regionalSize / 2 / 111;
            this.min.lat = centre.lat - regionalSize / 2 / (111 * Math.cos(centre.lat));
        }
        //给定max点、min点，构造随机点经纬度
        function Position(max, min) {
            this.lng = Math.random() * (max.lng - min.lng) + min.lng;
            this.lat = Math.random() * (max.lat - min.lat) + min.lat;
        }
        //给定起始点和gridSize，构造栅格
        function Grid(start, gridSize) {
            this.pathArr = [];
            this.pathArr[0] = { lng: start.lng, lat: start.lat };
            this.pathArr[1] = { lng: start.lng + gridSize / 111, lat: start.lat };
            this.pathArr[2] = { lng: start.lng + gridSize / 111, lat: start.lat + gridSize / (111 * Math.cos(start.lat)) };
            this.pathArr[3] = { lng: start.lng, lat: start.lat + gridSize / (111 * Math.cos(start.lat)) };
            this.pathArr[4] = { lng: end.lng, lat: end.lat };
        }
        let centre = { lng: 113.364805, lat: 23.140929 };
        let regionalSize = 1;//百度地图1公里
        let reg = new Regional(centre, regionalSize);
        let start = new Position(reg.max, reg.min);
        let end = start;
        let gridSize = 0.02;//百度地图20米
        return new Grid(start, gridSize);
    })()


