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
    // store a reference to our file handle
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

    // Get a file handle by showing a file picker:
    const [handle] = await self.showOpenFilePicker();
    if (!handle) {
        // User cancelled, or otherwise failed to open a file.
        return;
    }

    // Check if handle exists inside directory our directory handle
    const relativePaths = await directoryHandle.resolve(handle);
    log('relativePaths', relativePaths)
    if (relativePaths === null) {
        // Not inside directory handle
    } else {
        // relativePaths is an array of names, giving the relative path

        for (const name of relativePaths) {
            // log each entry
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
    // create a new handle
    const newHandle = await window.showSaveFilePicker();

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();
    log('writableStream', writableStream)
    let data = await newHandle.getFile()
    log('data', data)

    // 将文件内容直接替换
    let str = 'abc'
    // write our file
    await writableStream.write(str);

    // close the file and write the contents to disk.
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