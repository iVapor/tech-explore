import "./content.css"

function Content() {

    let productPicBg = { backgroundImage: 'url(https://ucc.alicdn.com/pic/developer-ecology/41703061be154842aa299073d7acbccb.jpg)'}
    return(<main className={'main-wrapper'}>
        <div className="main-banner">
            <div className="banner-left">
                <div className="banner-left-title">钉钉开放平台</div>
                <div className="banner-left-subtitle">钉钉开放平台提供强大的开放能力、高效接入的开发工具及丰富的场景化案例，在这里可以获得企业级应用开发领域前沿技术分享与交流。
                </div>
            </div>
            <div className="banner-right">
                <button className="follow-btn">立即订阅</button>
            </div>
        </div>

        <div className={'main-content'}>
            <div className={'content-hot-aticles'}>
                <div className="tab-wrap">
                    <div className="nav-extra">推荐文章</div>
                    <div className="tab-container">
                        <div className="tab-list">
                            <div className="tab-item active" data-code="all">全部</div>

                        </div>
                        <div className="tab-operate">
                            <div className="prev disabled"></div>
                            <div className="next"></div>
                        </div>
                    </div>
                </div>

                <div className={'list-area'}>
                    <div className={'product-wrapper'} >
                        <div className="product-item-wrapper">
                            <div className="product-pic"
                                 style={productPicBg}>
                            </div>
                            <div className="product-item">
                                <a target="_blank" >
                                    <div className="product-title">DingTalk「开发者说」第8期 钉钉微应用开发实战</div>
                                </a>
                                <div className="product-detail">
                                    <a target="_blank" >
                                        <img className="user-ava" src="https://ucc.alicdn.com/avatar/avatar3.jpg" />
                                    </a>
                                    <a target="_blank" className="user-name"
                                       >1514539673795777</a><span
                                    className="detail-date">2022-03-25</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="section-footer">

                        <a target="_blank" className="footer-right" href="dingtalk/article">查看全部
                            &gt;</a></footer>
                </div>
            </div>

            <div className={'content-discuss'}>
                <div className="tab-wrap">
                    <div className="nav-extra">产品讨论</div>
                    <div className="tab-container">
                        <div className="tab-list">
                            <div className="tab-item active" data-code="all">全部讨论(258)</div>
                            <div className="tab-item" data-code="opendingtalk">钉钉开发者社区(258)</div>
                        </div>
                        <div className="tab-operate">
                            <div className="prev disabled"></div>
                            <div className="next"></div>
                        </div>
                    </div>
                </div>
                <div className={'list-area-wrapper'}>
                    <div className={'list-area'}>
                        <div className={'product-wrapper'}>
                            <div className="product-item">
                                <a target="_blank" className="product-title" href="/ask/395984">
                                    <div>钉钉请求接口报非法的access_token错误</div>
                                </a>
                                <div className="product-detail">
                                    <a target="_blank" >
                                        <img className="user-ava" src="https://ucc.alicdn.com/avatar/avatar3.jpg" />
                                    </a><span>196浏览量 · 2盖楼</span><span
                                    className="detail-date">2022-03-26 14:19:22</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>)
}

export default Content