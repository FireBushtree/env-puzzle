const rimraf = require('rimraf');

const remove = (filePath, name) => {
  rimraf(filePath, {}, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(`remove ${name} demo folder success`);
  });
};

remove('lib/**/demo', 'lib');
remove('es/**/demo', 'es');
