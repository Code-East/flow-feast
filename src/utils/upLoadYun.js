//uploadyun.js文件
//导入加密插件 需要先npm安装
import CryptoJS from 'crypto-js'
const upyunSignature = (folder) => {
    let policy = window.btoa(JSON.stringify({
        'bucket': 'image-feast', //又拍云上面的服务名称
        'content-length-range': '0,10240000',//文件大小限制
        'save-key': folder + '/{filemd5}{.suffix}',//文件存放的路径 固定写法 不拼接默认是更目录
        'expiration': Math.floor(new Date().getTime() / 1000) + 86400 //过期时间
    }))
    //此处文件密钥前要添加&符号，容易出错 policy 后面加的'&V73udRGfD/c0IRGchoAF0sGcJ1Y='是又拍云的上图中文件密钥
    let signature = CryptoJS.MD5(policy + '&KdTbyUl6D5DXMYeeGDV12eBAoEQ=').toString()
    return {
        policy: policy,
        signature: signature
    }
}
//导出参数
export { upyunSignature }