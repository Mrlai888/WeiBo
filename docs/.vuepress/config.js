module.exports = {
  title: '个人博客',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    // ['link', { rel: 'icon', href: '//at.alicdn.com/t/font_1549951_lz1rwghwoof.css' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'manifest', href: '/photo.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/photo.jpg' }],
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/WeiBo/', // 这是部署到github相关的配置
  markdown: {
    // lineNumbers: false // 代码块显示行号
    extractHeaders: ['h2', 'h3','h4']
  },
  themeConfig: {
    lastUpdated: '更新时间',
    displayAllHeaders: true,
    nav: [ // 导航栏配置
      { text: '首页', link: '/' },
      { text: '个人中心', link: '/me/' },
      { text: '前端基础', link: '/html/' },
      {
        text: 'js进阶', link: '/js/',
      },
      {
        text: 'vue', link: '/vue/',
      },
      {
        text: 'react', link: '/react/'
      },
      {
        text: "高级",
        items: [
          {
            text: "拓展",
            items: [
              { text: "混合开发", link: "/more/Hybrid" },
              { text: "登录注册服务端", link: "/more/login" }
            ]
          },
          {
            text: "更多",
            items: [
              { text: '云开发', link: '/more/yunServer' },
              { text: 'typeScript', link: '/more/ts' },
              { text: '发布订阅', link: '/more/singe' }

            ]
          }

        ]

      },
      { text: 'github', link: 'https://github.com/Mrlai888' }
    ],
    // 侧边栏配置
    sidebar: {
      '/me/':[
        ''
      ],
      '/html/': [
        '',
        'html1',
        'closure'
      ],
      '/js/': [
        '',
        'home',
        'update'
      ],
      '/react/': [
        '',
        'home',
        'router',
      ],
      '/vue/': [
        '',
        'period',
        'router'
      ],
      '/more/': [
        '',
        'Hybrid',
        'login',
        'yunServer',
        'singe',
        'ts'
      ],
      '/': [
        ''
      ]

    },
    sidebarDepth: 2,
  },

}