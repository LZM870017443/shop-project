module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            //配置跨域
            '/api': {
                target: "http://localhost:3000",
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};