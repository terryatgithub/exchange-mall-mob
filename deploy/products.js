const fs = require("fs");
const path = require("path");
const envfile =
  process.env.NODE_ENV === "production"
    ? "../.env.production"
    : "../.env.development";
const envPath = path.resolve(__dirname, envfile);
const envObj = parse(fs.readFileSync(envPath, "utf8"));
// const SERVER_ID = parseInt(envObj['VUE_APP_SERVER_ID'])

function parse(src) {
  // 解析KEY=VAL的文件
  const res = {};
  src.split("\n").forEach((line) => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    // eslint-disable-next-line no-useless-escape
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1];
      let value = keyValueArr[2] || "";

      // expand newlines in quoted values
      const len = value ? value.length : 0;
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, "\n");
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, "").trim();

      res[key] = value;
    }
  });
  return res;
}

const SERVER_ID = 0;
console.log("SERVER_ID==========>" + SERVER_ID);

const SERVER_LIST = [
  {
    ftpConnection: {
      host: "172.20.135.54",
      user: "appuser",
      password: "appuser.appuser",
    },
    serverDomain: "beta.webapp.skysrt.com",
    serverDir: "xhb/exchange", //只支持已存在目录下创建一层目录
    // serverDir: 'yuanbo/test/exmall/', //只支持已存在目录下创建一层目录
    localDistDir: path.join(__dirname, "../dist"),
    localSrcDir: path.join(__dirname, "../src"),
    entry: "index.html",
  },
  {
    ftpConnection: {
      host: "172.20.135.54",
      user: "appuser",
      password: "appuser.appuser",
    },
    serverDomain: "beta.webapp.skysrt.com",
    serverDir: "fyb/ccc",
    localDistDir: path.join(__dirname, "../dist"),
    localSrcDir: path.join(__dirname, "../src"),
    entry: "index.html",
  },
];

module.exports = SERVER_LIST[SERVER_ID];
