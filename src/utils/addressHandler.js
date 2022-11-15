import { TextToCode, CodeToText } from "element-china-area-data";
//text to code
export const addressToCode = (addressText) => {
    const addressTextList = addressText.split('/');
    let addressCodeList = [];
    addressCodeList[0] = TextToCode[addressTextList[0]].code;
    addressCodeList[1] = TextToCode[addressTextList[0]][addressTextList[1]].code;
    addressCodeList[2] = TextToCode[addressTextList[0]][addressTextList[1]][addressTextList[2]].code;
    return addressCodeList;
}
//code to text
export const addressToText = (addressCodeList) => {
    let address = '';
    addressCodeList.forEach(item => {
        address = address + CodeToText[item] + "/";
    });
    //删除最后的 /
    address = address.slice(0, address.length - 1);
    return address;
}