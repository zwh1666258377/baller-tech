module.exports = function(grunt) {
  grunt.registerTask('clean_dist', function() {
    grunt.file.delete('server-dist');
  });

  grunt.registerTask('clean_logs', function() {
    process.stdout.write(
      process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
    );
  });
};
