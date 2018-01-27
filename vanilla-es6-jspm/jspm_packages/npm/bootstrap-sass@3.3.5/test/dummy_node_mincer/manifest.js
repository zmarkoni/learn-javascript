/* */ 
(function(process) {
  'use strict';
  var Mincer = require('mincer');
  Mincer.logger.use(console);
  var environment = new Mincer.Environment(process.cwd());
  var bootstrapPath = '../../';
  environment.appendPath(bootstrapPath + 'assets/stylesheets');
  environment.appendPath(bootstrapPath + 'assets/fonts');
  environment.appendPath('./');
  environment.ContextClass.defineAssetPath(function(pathname, options) {
    var asset = this.environment.findAsset(pathname, options);
    if (!asset) {
      throw new Error("File " + pathname + " not found");
    }
    return '/assets/' + asset.digestPath;
  });
  var manifest_path = process.argv[2] || __dirname + '/assets';
  var manifest = new Mincer.Manifest(environment, manifest_path);
  manifest.compile(['application.css'], function(err, assetsData) {
    if (err) {
      console.error("Failed compile assets: " + (err.message || err.toString()));
      process.exit(128);
    }
    console.info('\n\nAssets were successfully compiled.\n' + 'Manifest data (a proper JSON) was written to:\n' + manifest.path + '\n\n');
    console.dir(assetsData);
  });
})(require('process'));
