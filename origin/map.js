const log = console.log.bind(console)

const setUrl = (location) => {
    let ele = document.querySelector('#map')
    log('ele', ele)
    let head = 'https://m.amap.com/navi/'
    let key = '05ff844ff688731c873eee04ee54d376'
    let url = `//m.amap.com/around/?locations=116.470098,39.992838&keywords=博物馆&defaultIndex=1&defaultView=&searchRadius=5000&key=05ff844ff688731c873eee04ee54d376`
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
