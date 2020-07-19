module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            //配置跨域
            '/api': {
                target: "http://localhost:3000", // 服务器端接口地址
                ws: true, //如果要代理 websockets，配置这个参数
                secure: false, // 如果是https接口，需要配置这个参数
                changOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};