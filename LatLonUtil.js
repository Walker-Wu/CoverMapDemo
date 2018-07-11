const EARTH_RADIUS = 6378137;
const RAD = Math.PI / 180.0;

//@see http://snipperize.todayclose.com/snippet/php/SQL-Query-to-Find-All-Retailers-Within-a-Given-Radius-of-a-Latitude-and-Longitude--65095/   
//The circumference of the earth is 24,901 miles.  
//24,901/360 = 69.17 miles / degree    
/** 
 * @param lat 中心维度 
 * @param lng 中心经度 
 * @param raidus 单位米 
 * @return
 */
function getAround(lng, lat, raidus) {

    let latitude = lat;
    let longitude = lng;

    const degree = (24901 * 1609) / 360.0;
    let raidusMile = raidus;

    let dpmLat = 1 / degree;
    let radiusLat = dpmLat * raidusMile;
    let minLat = latitude - radiusLat;
    let maxLat = latitude + radiusLat;

    let mpdLng = degree * Math.cos(latitude * (Math.PI / 180));
    let dpmLng = 1 / mpdLng;
    let radiusLng = dpmLng * raidusMile;
    let minLng = longitude - radiusLng;
    let maxLng = longitude + radiusLng;

    let sw = { lng: minLng, lat: minLat };
    let se = { lng: maxLng, lat: minLat };
    let ne = { lng: maxLng, lat: maxLat };
    let nw = { lng: minLng, lat: maxLat };
    let centre = { lng: longitude, lat: latitude };
    let size = 2 * raidus;

    return { sw: sw, se: se, ne: ne, nw: nw, centre: centre, size: size };
}

/** 
 * 根据两点间经纬度坐标，计算两点间距离，单位为米 
 * @param lng1 
 * @param lat1 
 * @param lng2 
 * @param lat2 
 * @return 
 */
function getDistance(lng1, lat1, lng2, lat2) {
    let radLat1 = lat1 * RAD;
    let radLat2 = lat2 * RAD;
    let a = radLat1 - radLat2;
    let b = (lng1 - lng2) * RAD;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
    /*
    let lat1 = 34.264648;
    let lon1 = 108.952736;

    let radius = 1000;
    //[34.25566276027792,108.94186385411045,34.27363323972208,108.96360814588955]  
    getAround(lat1, lon1, radius);

    //911717.0   34.264648,108.952736,39.904549,116.407288  
    let dis = getDistance(108.952736, 34.264648, 116.407288, 39.904549);
    return dis;
    */
