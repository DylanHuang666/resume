!function () {
    let aTags = document.querySelectorAll('nav.menu > ul > li > a')

    //点击导航栏滚动到相应位置，运用了tween.js去移动
    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }
    requestAnimationFrame(animate);

    for (let i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function (x) {
            x.preventDefault()
            let a = x.currentTarget
            let href = a.getAttribute('href')
            let element = document.querySelector(href)
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


        }
    }
}.call()
