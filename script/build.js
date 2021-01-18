const execa = require('execa');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const TYPEINGS_FOLDER = 'env-puzzle-typings';
const typeRootDir = path.resolve(__dirname, `../${TYPEINGS_FOLDER}`);
const libRootDir = path.resolve(__dirname, '../es');
const esRootDir = path.resolve(__dirname, '../lib');

const remove = async (filePath, name, fileType) => {
  await rimraf(filePath, {}, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(`remove ${name} ${fileType} folder success`);
  });
};

const getTypingFiles = () => {
  const fileStack = fs.readdirSync(typeRootDir);
  const result = [];

  while (fileStack.length) {
    const filePath = fileStack.shift();
    const absoulteFilePath = `${typeRootDir}/${filePath}`;
    const file = fs.statSync(absoulteFilePath);
    const isDir = file.isDirectory();

    if (isDir) {
      fileStack.push(
          ...(fs.readdirSync(absoulteFilePath) || []).map(
              (item) => `${filePath}/${item}`,
          ),
      );
    } else {
      result.push(filePath);
    }
  }

  return result;
};

(async () => {
  // 1. 使用ttypescript 生成 .d.ts文件
  console.log('start generate declaration folder');
  await execa(`npx ttsc --outDir ${TYPEINGS_FOLDER}`);
  console.log('generate declaration folder success');

  console.log('start remove declaration folder useless file');
  // 2. 去除typings文件夹下多余的js文件
  await rimraf(`${TYPEINGS_FOLDER}/**/*.js`, {}, () => {});
  await rimraf(`${TYPEINGS_FOLDER}/**/*.jsx`, {}, () => {});

  // 3. 去除typings文件夹下多余的demo文件
  await rimraf(`${TYPEINGS_FOLDER}/**/demo`, {}, () => {});
  console.log('remove useless file success');

  // 4. 生成打包后的文件
  await execa('npx father-build');

  // 5. 去除打包后的demo文件
  await remove('lib/**/demo', 'lib', 'demo');
  await remove('es/**/demo', 'es', 'demo');

  // 6. 去除打包后的测试文件
  await remove('lib/**/__tests__', 'lib', '__test__');
  await remove('es/**/__tests__', 'es', '__test__');

  // 7. 去除多余的css文件
  await remove('lib/global.less', 'lib', 'global.less');
  await remove('es/global.less', 'es', 'global.less');

  // 8. 替换打包后的声明文件
  const typingFiles = getTypingFiles();
  typingFiles.forEach((item) => {
    fs.copyFileSync(`${typeRootDir}/${item}`, `${libRootDir}/${item}`);
    fs.copyFileSync(`${typeRootDir}/${item}`, `${esRootDir}/${item}`);
  });

  // 9. 清除声明文件夹的包
  rimraf(TYPEINGS_FOLDER, {}, () => {});
})();
