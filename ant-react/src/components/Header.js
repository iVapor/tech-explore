import "./header.css"

function Header() {
    return (
        <header className="header">
            <div className={'page-title'}>
                <div className={'menu-container'}>
                    <i className="iconfont icon-caidan"></i>
                </div>

                <div className={'home-logo'}>
                    <a href="//m.aliyun.com" className="icon-home"></a>
                </div>
                <div className="navigation-user">
                    <i className="iconfont icon-yonghu-yuan"></i>
                </div>
            </div>
            <div className="ace-developer-subdeveloper-com-left-nav">
                <div className="left-nav-list">
                    <a className="ace-link ace-link-primary left-nav-item active">钉钉开放平台</a>
                    <a className="ace-link ace-link-primary left-nav-item" >热门文章</a>
                    <a className="ace-link ace-link-primary left-nav-item">产品讨论</a>
                </div>
                <div className="left-nav-groups-box"><span></span>热门圈子
                </div>
            </div>
        </header>


    );
}

export default Header;