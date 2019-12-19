module.exports = {
  title: '个人博客',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    // ['link', { rel: 'icon', href: '//at.alicdn.com/t/font_1549951_lz1rwghwoof.css' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'manifest', href: '/photo.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/photo.jpg' }],
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    lastUpdated: '更新时间', 
    displayAllHeaders: true ,
    nav: [ // 导航栏配置
      { text: '首页', link: '/' },
      { text: '个人中心', link: '/home/' },
      { text: '前端基础', link: '/html/' },
      {
        text: 'js进阶',link: '/js/' ,
      },
      {
        text: 'vue',link: '/vue/',
      },
      {
        text: 'react',link: '/react/'
      },
      {
        text: "高级",
        items: [
          {
            text: "算法",
            items: [
              { text: "冒泡", link: "/more/arithmetic" },
              { text: "去重", link: "/more/singe" }
            ]
          },
          {
            text: "设计模式",
            items: [
              { text: '观察者', link: '/more/see' },
              { text: '发布订阅', link: '/more/read' }
            ]
          }

        ]

      },
      { text: 'github', link: 'https://github.com/Mrlai888' }
    ],
    // 侧边栏配置
    sidebar: {
      '/html/': [
        '',
        'html1',
        'closure'
      ],
      '/js/':[
        '',
        'async',
        'jquery',
        'update/',
        'update/object',
        'update/prop',
      ],
      '/react/':[
        '',
        'period',
        'router'
      ],
      '/vue/':[
        '',
        'period',
        'router'
      ],
      '/more/':[
        '',
        'arithmetic',
        'read',
        'see',
        'singe'
      ],
      '/':[
        '',
        'home'
      ]

    }
      
  },

}