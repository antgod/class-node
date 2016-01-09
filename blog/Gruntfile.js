module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.initConfig({
    clean:{
      build:['build/*']
    },
    copy:{
      html:{
        src:'index.html',
        dest:'build/index.html'
      }
    },
    useminPrepare:{
      html:'index.html',
      options:{
        dest:'build'
      }
    },
    usemin:{
      html:'build/index.html'
    },
    rev:{
      options:{
        algorithm:'md5',
        length:8
      },
      assets:{
        files:[{src:'build/**/*.{js,css,png}'}]
      }
    }
  });

  grunt.registerTask('default',[
    'clean',//清理
    'copy',//拷贝
    'useminPrepare',//生成配置
    'concat',//执行合并
    'uglify',//执行压缩
    'cssmin',//CSS压缩
    'rev',//添加版本号
    'usemin'//修改引用
  ]);
}