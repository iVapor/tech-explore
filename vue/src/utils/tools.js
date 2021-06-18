/**
 * @desc 打印输出
 * @return void
 *
 */
const log = console.log.bind(console);


/**
 * 找出列表的中指定项的 label
 * @param list
 * @param itemValue
 * @returns {string}
 */
const findListLabel = (list, itemValue) => {
    let item = _.find(list, {value: itemValue});
    let label = '';
    if (item !== undefined) {
        label = item.label;
    }
    return label;
};


/**
 * 显示千分符
 * @param num
 * @returns {string}
 */
export const toThousand = (num) => {
    if (!num) {
        return ''
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


/**
 * 只允许两位小数，显示千分符
 * @desc 在 keyup 事件时使用
 * @param num
 * @return {string}
 */
export const allowFloat = (num) => {
    let currentValue = num;
    let removeComma = currentValue.split(',').join('');
    currentValue = removeComma;

    let ex = /^\d+\.?\d{0,2}$/;
    let temp = currentValue;
    if (!ex.test(currentValue)) {
        temp = currentValue.substring(0, currentValue.length - 1);
    }

    let big = Number(temp) >= Math.pow(10, 5);
    if (big) {
        temp = Math.pow(10, 8) - 1;
    }

    return toThousand(temp);
};

/**
 * 保留两位小数
 * @param str
 * @return {string|*}
 */
export const keepTwo = (str) => {
    let noDigi = str.includes('.')
    if (!noDigi) {
        return str = str + '.00'
    }
    let digi = str.split('.')[1]

    if (digi.length > 1) {
        return str
    } else if (digi.length === 1) {
        return str = str + '0'
    }
}

export { log, findListLabel }