function loadCMap() {//百度地图API功能加载
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=3.0&ak=Qrc3aHbZdONvHowY7ZHXfQbB&callback=initCMap";
    document.body.appendChild(script);
}
function initCMap() {
    let mp = new BMap.Map("covermap", { enableMapClick: false });// 创建Map实例
    let point = new BMap.Point(113.364805, 23.140929);// 创建点坐标
    mp.centerAndZoom(point, 15);
    mp.enableScrollWheelZoom();//启用滚轮放大缩小
    let top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT });//左上角，添加比例尺
    mp.addControl(top_left_control);
    console.log(mp.getPanes());//地图覆盖物分为了8个层级，顶层为'floatPane'， 低层为'vertexPane'
    let gridLayer = new BMap.CanvasLayer({
        //zIndex: 0,
        //paneName: 'vertexPane',
        update: upd
    });
    function upd() {//刷新canvas图层
        let ctx = this.canvas.getContext("2d");
        if (!ctx) { return; }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawGridArr(ctx, mp, gridData);
    }
    mp.addOverlay(gridLayer);//叠加栅格图层到百度地图
}
function drawGridArr(ctx, cMap, gridData) {//绘制一组栅格
    for (let i = 0, len = gridData.length; i < len; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(50, 50, 255, 0.3)";
        let leftBottom = cMap.pointToPixel(new BMap.Point(gridData[i].sw.lng, gridData[i].sw.lat));
        let rightBottom = cMap.pointToPixel(new BMap.Point(gridData[i].se.lng, gridData[i].se.lat));
        let rightTop = cMap.pointToPixel(new BMap.Point(gridData[i].ne.lng, gridData[i].ne.lat));
        let leftTop = cMap.pointToPixel(new BMap.Point(gridData[i].nw.lng, gridData[i].nw.lat));
        ctx.moveTo(leftBottom.x, leftBottom.y);
        ctx.lineTo(rightBottom.x, rightBottom.y);
        ctx.lineTo(rightTop.x, rightTop.y);
        ctx.lineTo(leftTop.x, leftTop.y);
        ctx.lineTo(leftBottom.x, leftBottom.y);
        //ctx.closePath();  //效率低于lineTo
        ctx.stroke();
        ctx.fill();
        //ctx.fillRect(leftBottom.x, leftBottom.y, 30, 30);
    }
}
