import { TextToCode } from 'element-china-area-data'

export const feastObjHandler = (feastObj) => {
    const data = {
        fid:'',
        minScale: 0,
        maxScale: 0,
        province: [],
        street: '',
        price: "",
        date_time: "",
        description: "",
        user_id: ""
    }
    data.fid = feastObj.fid;
    //拆分规模
    const scaleList = feastObj.scale.split('~');
    data.minScale = scaleList[0];
    data.maxScale = scaleList[1];
    //处理地址拆分
    const addressList = feastObj.address.split('/');
    //加入省code
    data.province[0] = TextToCode[addressList[0]].code;
    //加入市code
    data.province[1] = TextToCode[addressList[0]][addressList[1]].code;
    //加入区县
    data.province[2] = TextToCode[addressList[0]][addressList[1]][addressList[2]].code;
    //具体街道
    data.street = addressList[3];
    //其他的正常赋值
    data.price = feastObj.price;
    data.date_time = feastObj.date_time;
    data.description = feastObj.description;
    data.user_id = feastObj.user_id;

    return data;

}