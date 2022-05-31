const path = require('path');

class HomeCtl {
  async upload(ctx) {
    const filePath = ctx.request.files.file.filepath;
    const basename = path.basename(filePath);
    ctx.body = {
      url: `${ctx.origin}/uploads/${basename}`
    };
  }
}

module.exports = HomeCtl;