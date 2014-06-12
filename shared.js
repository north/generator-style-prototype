var chalk = require('chalk');

module.exports.welcome = function () {
  var welcome =
  chalk.magenta('\n ______     ______   __  __     __         ______') +
  chalk.magenta('\n/\\  ___\\   /\\__  _\\ /\\ \\_\\ \\   /\\ \\       /\\  ___\\      ') + chalk.yellow.bold('D  B  S  i') +
  chalk.magenta('\n\\ \\___  \\  \\/_/\\ \\/ \\ \\____ \\  \\ \\ \\____  \\ \\  __\\      ') + chalk.yellow.bold('e  u  i  n') +
  chalk.magenta('\n \\/\\_____\\    \\ \\_\\  \\/\\_____\\  \\ \\_____\\  \\ \\_____\\    ') + chalk.yellow.bold('s  i  g') +
  chalk.magenta('\n  \\/_____/') + chalk.cyan('_') + chalk.magenta('   ')+ chalk.cyan('_') + chalk.magenta('\\/_/') + chalk.cyan('_') + chalk.magenta('  \\/_____/   \\/_____/')+ chalk.cyan('_') + chalk.magenta('  \\/_____/    ') + chalk.yellow.bold('i  l  n  B') +
  chalk.cyan('\n    /_____/\\ /_____/\\  /_____/\\ /________/\\/_____/\\') + chalk.yellow.bold('     g  d     r') +
  chalk.cyan('\n    \\:::_ \\ \\\\:::_ \\ \\ \\:::_ \\ \\\\__.::.__\\/\\:::_ \\ \\') + chalk.yellow.bold('    n     o  o') +
  chalk.cyan('\n     \\:(_) \\ \\\\:(_) ) )_\\:\\ \\ \\ \\  \\::\\ \\   \\:\\ \\ \\ \\') + chalk.yellow.bold('         f  w') +
  chalk.cyan('\n      \\: ___\\/ \\: __ `\\ \\\\:\\ \\ \\ \\  \\::\\ \\   \\:\\ \\ \\ \\') + chalk.yellow.bold('        f  s') +
  chalk.cyan('\n       \\_\\/_____\\_\\/_\\_\\/_\\_____\\/_  \\__\\/__  \\_____\\/') + chalk.yellow.bold('           e') +
  chalk.cyan('\n        /________/\\/_/\\/_/\\ /_____/\\ /_____/\\ /_____/\\') + chalk.yellow.bold('           r') +
  chalk.cyan('\n        \\__.::.__\\/\\ \\ \\ \\ \\\\:::_ \\ \\\\::::_\\/_\\::::_\\/_') +
  chalk.cyan('\n           \\::\\ \\   \\:\\_\\ \\ \\\\:(_) \\ \\\\:\\/___/\\\\:\\/___/\\') +
  chalk.cyan('\n            \\::\\ \\   \\::::_\\/ \\: ___\\/ \\::___\\/_\\_::._\\:\\') +
  chalk.cyan('\n             \\::\\ \\    \\::\\ \\  \\ \\ \\    \\:\\____/\\ /____\\:\\') +
  chalk.cyan('\n              \\__\\/     \\__\\/   \\_\\/     \\_____\\/ \\_____\\/');

  return welcome;
}



module.exports.commentFind = function (content, section) {
  var startSearch = '//////////////////////////////\n// ' + section.toUpperCase();
  var start = content.indexOf(startSearch);

  if (start >= 0) {
    return start;
  }
  else {
    return false;
  }
}
