/**
 * 打印函数
 * @type {any}
 */
const log = console.log.bind(console)

/**
 * 选择文件
 * @returns {Promise<void>}
 */
async function pickFile() {
    // 存储文件 handle 的引用
    let fileHandle;
    // open file picker
    // fileHandle 是一个对象, 有两个属性
    // kind 属性代表类型
    // name 属性是名称
    [fileHandle] = await window.showOpenFilePicker();
    // 拿到文件的信息, 是一个 file 对象
    let file = await fileHandle.getFile()
    // 用文件读取器，读取文件内容
    let read = new FileReader();
    read.readAsBinaryString(file);
    read.onloadend = function(){
        console.log(read.result);
    }
}

/**
 * 返回路径下的文件和文件夹名称
 * @param directoryHandle
 * @returns {Promise<void>}
 */
async function returnPathDirectories(directoryHandle) {

    // 打开一个文件选择
    const [handle] = await self.showOpenFilePicker();
    if (!handle) {
        // 用户取消选择
        return;
    }

    // 检查目录是否存在
    const relativePaths = await directoryHandle.resolve(handle);
    if (relativePaths === null) {
        // 没有目录
    } else {
        // relativePaths 是一个数组，包含展示的文件名和目录
        for (const name of relativePaths) {
            console.log(name);
        }
    }
}

/**
 * 选择目录
 * @returns {Promise<void>}
 */
const pickDirectory = async () => {
    let dirHandle = await window.showDirectoryPicker()
    const dirName = 'directoryToGetName';

    // assuming we have a directory handle: 'currentDirHandle'
    // 查找目录
    const subDir = dirHandle.getDirectoryHandle(dirName, {create: false});
    returnPathDirectories(dirHandle)
}

async function saveFile() {
    // 创建一个文件选择器
    const newHandle = await window.showSaveFilePicker();
    // 创建文件流进行写入
    const writableStream = await newHandle.createWritable();
    log('writableStream', writableStream)
    let file = await newHandle.getFile()
    log('file', file)

    // 将文件内容直接替换
    let str = 'abc'
    // 写入文件
    await writableStream.write(str);
    // 关闭文件，写入硬盘
    await writableStream.close();
}

const bindEvent = () => {
    // 读取文件，需要用户触发
    let fileEle = document.querySelector('.file')
    // 点击按钮，打开文件选择器
    fileEle.addEventListener('click', function (e){
        pickFile()
    })

    // 读取目录，需要用户触发
    let directoryEle = document.querySelector('.directory')
    // 打开目录选择器
    directoryEle.addEventListener('click', function () {
        pickDirectory()
    })

    // 写入文件，需要用户触发
    let writeEle = document.querySelector('.write')
    writeEle.addEventListener('click', function () {
        saveFile()
    })
}

const __main = () => {
    // 在开始之前，先创建一个 demo 文件用于学习，例如 hello.txt, 文件内容 '123'。
    bindEvent()
}

__main()