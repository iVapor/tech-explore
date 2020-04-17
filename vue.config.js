module.exports = {
    devServer: {
        proxy: {
            '/goods-server': {
                target: 'http://61.174.254.2:7300/mock/5e997cdc79758c3a82565456/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/goods-server': '/'
                    // '^/user-server': '/user-server'
                }
            },
        }
    }
};