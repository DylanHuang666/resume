!function () {
    //先遍历标记为'[data-x]'的元素，添加offset类,先都往下100px 
    let specialTags = document.querySelectorAll('[data-x]')
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
    }
    findClosestAndRemoveOffset()  //一开始就有往上的动画，其他标记元素滚动到它的位置时才有动画
    window.addEventListener('scroll', function (x) {
        findClosestAndRemoveOffset()
    })

    //找到与滚动位移差值最小（最近，视口大部分都是这个标记元素）的标记元素，获取到a和a对应的导航里的li元素，添加'highlight'类高亮导航
    function findClosestAndRemoveOffset() {
        let specialTags = document.querySelectorAll('[data-x]')
        let minIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }
        }
        specialTags[minIndex].classList.remove('offset')
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')  //获取到标记元素的id对应的a元素 
        let li = a.parentNode
        let brothersAndMe = li.parentNode.children
        for (let i = 0; i < brothersAndMe.length; i++) {
            brothersAndMe[i].classList.remove('highlight') //高亮前先遍历去除所有之前的高亮
        }
        li.classList.add('highlight') //添加高亮
    }

    //鼠标移入高亮导航
    let liTags = document.querySelectorAll('nav.menu > ul > li')
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (x) {
            x.currentTarget.classList.add('active')
        }
        liTags[i].onmouseleave = function (x) {
            x.currentTarget.classList.remove('active')
        }
    }
}.call()
