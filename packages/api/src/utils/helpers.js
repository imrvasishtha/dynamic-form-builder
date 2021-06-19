module.exports = {
  isValidFile: async (file, exceptType = ['jpeg', 'jpg', 'png', 'svg']) => {
    const name = file.hapi.filename;
    const extension = name
      .split('.')
      .pop()
      .toLowerCase();
    if (exceptType.includes(extension)) {
      global.logger().info('Valid file!');
      return true;
    }
    global.logger().info('Invalid file!');
    return false;
  },
};
