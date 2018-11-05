!function () {
    var view = View('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (element) {
            let top = element.offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80
            let s = targetTop - currentTop
            var t = Math.abs((s / 100) * 300)
            if (t > 600) {
                t = 600
            }
            var coords = { y: currentTop };
            var tween = new TWEEN.Tween(coords)
                .to({ y: targetTop }, t)
                .easing(TWEEN.Easing.Quadratic.InOut)  //淡进淡出，动画平滑
                .onUpdate(function () {
                    window.scrollTo(0, coords.y)  // coords.y 值每次都会改变，分为很多次去移 
                })
                .start();
        },
        bindEvents: function () {
            //点击导航栏滚动到相应位置，运用了tween.js去移动
            this.aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
            for (let i = 0; i < this.aTags.length; i++) {
                this.aTags[i].onclick = (x)=> {
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        }      
    }
    controller.init(view)
}.call()
