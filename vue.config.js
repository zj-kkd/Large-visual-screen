const path = require('path')

let proxyObject1 = {
	target: 'http://103.44.144.35:9001',
	ws: true,
	changeOrigin: true,
	pathRewrite: {
		'^/showData': '/showData'
	}
}

let proxyObject2 = {
	target: 'http://localhost:3003'
}

// scss变量全局引用问题
let css = {
	loaderOptions: {
		scss: {
			prependData: `@import "./src/main.scss";`
		}
	}
};

if (process.env.NODE_ENV === 'production') {
	module.exports = {
		publicPath: './',
		outputDir: 'dist',
		assetsDir: 'static',
		indexPath: 'index.html',
		css
	}
} else {
	module.exports = {
		lintOnSave: false,
		devServer: {  
			proxy: {
				'/login': proxyObject2,
				'/test': proxyObject2,
				'/isLogin': proxyObject2,
				'/showData': proxyObject1,
			}

		},
		css
	}
}
