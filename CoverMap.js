function loadScript() {//百度地图API功能加载
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=3.0&ak=Qrc3aHbZdONvHowY7ZHXfQbB&callback=init";
    document.body.appendChild(script);
}
function init() {
    let mp = new BMap.Map("covermap", { enableMapClick: false });// 创建Map实例
    let point = new BMap.Point(113.364805, 23.140929);// 创建点坐标
    mp.centerAndZoom(point, 15);
    mp.enableScrollWheelZoom();//启用滚轮放大缩小
    let top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT });//左上角，添加比例尺
    mp.addControl(top_left_control);
    //console.log(mp.getPanes());//地图覆盖物分为了8个层级，顶层为'floatPane'， 低层为'vertexPane'
    let gridLayer = new BMap.CanvasLayer({
        //zIndex: 0,
        //paneName: 'vertexPane',
        update: updGridLayer
    });
    function updGridLayer() {//刷新canvas图层
        let ctx = this.canvas.getContext("2d");
        if (!ctx) { return; }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawGridLayer(ctx, mp, gridData);
    }
    mp.addOverlay(gridLayer);//叠加栅格图层到百度地图
}
/** 
 * @param ctx canvas画布 
 * @param map 百度地图实例 
 * @param arr 栅格对象数组 
 * @return
 */
function drawGridLayer(ctx, map, arr) {//绘制一组栅格
    for (let i = 0, len = arr.length; i < len; i++) {
        //绘制前须把经纬度转换像素坐标
        let leftBottom = map.pointToPixel(new BMap.Point(arr[i].sw.lng, arr[i].sw.lat));
        let rightBottom = map.pointToPixel(new BMap.Point(arr[i].se.lng, arr[i].se.lat));
        let rightTop = map.pointToPixel(new BMap.Point(arr[i].ne.lng, arr[i].ne.lat));
        let leftTop = map.pointToPixel(new BMap.Point(arr[i].nw.lng, arr[i].nw.lat));
        ctx.beginPath();
        ctx.fillStyle = arr[i].style;
        //ctx.strokeStyle = arr[i].style;
        ctx.moveTo(leftBottom.x, leftBottom.y);
        ctx.lineTo(rightBottom.x, rightBottom.y);
        ctx.lineTo(rightTop.x, rightTop.y);
        ctx.lineTo(leftTop.x, leftTop.y);
        //ctx.closePath();  //效率低于lineTo，不建议使用
        ctx.lineTo(leftBottom.x, leftBottom.y);
        //ctx.stroke();
        ctx.fill();
    }
}
