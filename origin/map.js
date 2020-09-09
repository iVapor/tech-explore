const log = console.log.bind(console)

const setUrl = (location) => {
    let ele = document.querySelector('#map')
    log('ele', ele)
    let head = 'https://m.amap.com/navi/'
    let key = '05ff844ff688731c873eee04ee54d376'
    let url = `https://m.amap.com/navi/?dest=120.12,30.16&destName=火车东站&hideRouteIcon=1&key=${ key }`
    // url = `https://m.amap.com/navi/?dest=${location}&destName=阜通西&hideRouteIcon=1&key=${ key }`
    log('url', url)
    ele.src = url
}

const __main = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        log('lat', lat)
        let lon = position.coords.longitude
        log('lon', lon)
        let l = [lon.toFixed(0), lat.toFixed(0)].join(',')
        log('l', l)
        setUrl(l)
    });
    // setUrl()
}

__main()
