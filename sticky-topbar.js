!function () {
    var view = View('#topNavBar')
    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            //滚动事件，topNavBar添加类，变白变小，字体颜色改变为黑色
            var view=this.view
            window.addEventListener('scroll', function (x) {
                if (window.scrollY > 0) {
                    view.classList.add('sticky')
                } else {
                    view.classList.remove('sticky')
                }
            })
        }
    }
    controller.init(view)

}.call()
