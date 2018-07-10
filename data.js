//生成指定范围内的随机浮点数
//公式：(Math.random()*(max-min)+min);
// max - 期望的最大值
// min - 期望的最小值

//在经线上，相差一纬度约111km，1公里就是 1/111 = 0.009度，这样就是1公里对应的经线度数。
//在纬线上，相差一经度约111cosα（α该纬线纬度），1KM就是该纬线应约1/(111*cosα)=0.009cosα度，对应度数与纬度相关，这样就是1公里对应的纬线度数。
//假设当前定位的经度是x，纬度为y，那附近L公里的经度范围计算得出来如下：
//经度范围：(x-L/111, x+L/111)
//纬度范围：(y-L/(111*cosy), y+L/(111*cosy))
//只需要精确到小数点后7位，精度就是1CM

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

    (function () {
        //给定中心点和regionalSize，构造区域范围
        function Regional(p, size) {
            this.pMax = { lng: '', lat: '' };
            this.pMin = { lng: '', lat: '' };
            this.pMax.lng = p.lng + size / 2 / 111;
            this.pMax.lat = p.lat + size / 2 / (111 * Math.cos(p.lat));
            this.pMin.lng = p.lng - size / 2 / 111;
            this.pMin.lat = p.lat - size / 2 / (111 * Math.cos(p.lat));
        }
        //给定pMax点、pMin点，构造随机点经纬度
        function Position(pMax, pMin) {
            this.lng = Math.random() * (pMax.lng - pMin.lng) + pMin.lng;
            this.lat = Math.random() * (pMax.lat - pMin.lat) + pMin.lat;
        }
        //给定起始点和gridSize，构造栅格
        function Grid(p, size) {
            this.pArr = [];
            this.pArr[0] = { lng: p.lng, lat: p.lat };
            this.pArr[1] = { lng: p.lng + size / 111, lat: p.lat };
            this.pArr[2] = { lng: p.lng + size / 111, lat: p.lat + size / (111 * Math.cos(p.lat)) };
            this.pArr[3] = { lng: p.lng, lat: p.lat + size / (111 * Math.cos(p.lat)) };
            this.pArr[4] = this.pArr[0];
            this.style = '';//rgba(50, 50, 255, 0.3 )
            this.info = '';
        }
        //设定区域中心与范围
        let regCentre = { lng: 113.364805, lat: 23.140929 };
        let regSize = 1;//百度地图1公里
        let reg = new Regional(regCentre, regSize);
        //设定栅格大小
        let gridSize = 0.02;//百度地图20米
        //在设定的区域内随机生成一组测试点
        let pArr = [];
        for (let i = 0; i < 10; i++) {
            pArr.push(new Position(reg.pMax, reg.pMin));
        }
        //在所有测试点位置分别生成一个栅格
        let gridArr = pArr.map(function (p) {
            return new Grid(p, gridSize);
        })
        return gridArr;
    })()


