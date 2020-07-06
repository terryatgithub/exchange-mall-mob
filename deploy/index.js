'use strict'
const fs = require('fs')
const ftpClient = require('ftp')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const server = require('./products')
// const spinner = ora('正在发布到' + (process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器...')
const spinner = ora()
spinner.start()

console.log(server)

let c = ftpClient()

if (fs.existsSync(server.localDistDir)) {
  c.on('ready', function (err) {
    if (err) console.log(chalk.red('  Error: ' + err + '\n'))
    console.log(chalk.yellow('  Ready to upload...\n'))
    uploadFile(server.localDistDir, server.serverDir, function () {
      console.log(chalk.yellow('\n  恭喜发布成功！'))
      spinner.stop()
      let url = 'http://' + path.join(server.serverDomain, server.serverDir, server.entry)
      console.log(url)
      c.end()
    }).catch(function(err) {
      console.log(chalk.red('  Catch ' + err + '\n'))
      c.end()
    })
  })
  c.on('error', function (err) {
    console.log(chalk.red('  Error: ' + err + '\n'))
  })
  c.connect(server.ftpConnection)
} else {
  console.log(chalk.red('  Error: ' + server.localDistDir + '  Not Found!'))
}

async function uploadFile(srcDirPath, desDirPath, callback) {
  try {
    await createRemoteDir(desDirPath)
  } catch (err) {
    console.log(chalk.red('  Throw ' + err + '\n'))
    throw err
  }
  console.log(chalk.green('  Create dir :' + desDirPath))
  let files = fs.readdirSync(srcDirPath)
  for (let filename of files) {
    let file = path.join(srcDirPath, filename)
    let fileState = fs.statSync(file)
    let isFile = fileState.isFile()
    let isDir = fileState.isDirectory()
    if (isFile) {
      // console.log(chalk.cyan('  srcFilePath:' + srcDirPath));
      // console.log(chalk.cyan('  desFilePath:' + path.join(desDirPath, filename)));
      console.log(chalk.cyan('  ' + file + ' -> ' + path.join(desDirPath, filename) + ' await upload'))
      try {
        await uploadFileToFtp(file, path.join(desDirPath, filename))
      } catch (err) {
        console.log(chalk.red('  Throw ' + err + '\n'))
        throw err
      }
      console.log(chalk.cyan('  ' + file + ' -> ' + path.join(desDirPath, filename) + ' upload success'))
    }
    if (isDir) {
      // console.log(chalk.cyan('  srcDirPath:' + file));
      // console.log(chalk.cyan('  desDirPath:' + filename));
      try {
        await uploadFile(file, path.join(desDirPath, filename))
      } catch (err) {
        console.log(chalk.red('  Throw ' + err + '\n'))
        throw err
      }
    }
  }
  callback && callback.call()
}

function createRemoteDir(desDirPath) {
  let _desDirPath = desDirPath.replace(/\\/g, '/') //处理windows和linux斜杠的兼容性
  return new Promise((resolve, reject) => {
    c.mkdir(_desDirPath, false, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function uploadFileToFtp(srcFile, desFile) {
  let _desFile = desFile.replace(/\\/g, '/') //处理windows和linux斜杠的兼容性
  return new Promise((resolve, reject) => {
    c.put(srcFile, _desFile, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
