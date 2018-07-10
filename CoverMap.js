//百度地图API功能
function loadCMap() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=3.0&ak=Qrc3aHbZdONvHowY7ZHXfQbB&callback=initCMap";
    document.body.appendChild(script);
}
function initCMap() {
    let mp = new BMap.Map("covermap", { enableMapClick: false });            // 创建Map实例
    let point = new BMap.Point(113.364805, 23.140929); // 创建点坐标
    mp.centerAndZoom(point, 15);
    mp.enableScrollWheelZoom();                 //启用滚轮放大缩小
    let top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT });// 左上角，添加比例尺
    mp.addControl(top_left_control);
    console.log(mp.getPanes());//地图覆盖物分为了8个层级，顶层为'floatPane'， 低层为'vertexPane'
    var canvasLayer = new BMap.CanvasLayer({
        //zIndex: 0,
        //paneName: 'vertexPane',
        update: updCanvas
    });
    function updCanvas() {
        var ctx = this.canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "rgba(50, 50, 255, 0.3)";
        ctx.beginPath();
        var data = pData.map(function (p) {
            return new BMap.Point(p.lng, p.lat);
        })
        for (var i = 0, len = data.length; i < len; i++) {
            var pixel = mp.pointToPixel(data[i]);
            ctx.fillRect(pixel.x, pixel.y, 30, 30);
        }
    }
    mp.addOverlay(canvasLayer);
}