! function () {

    var view = document.querySelector('section.message')

    var model = {
        init: function () {
            //初始化
            var APP_ID = 'KGc1iw3UmW7o3935K8Aj3iai-9Nh9j0Va';
            var APP_KEY = 'k6OKlRkntyatYnq5l1R6yazH';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function () {
            var query = new AV.Query('Message');     //获取到数据库相应表里的所有数据 
            return query.find()
        },
        save: function (name,content) {
            var Message = AV.Object.extend('Message');    //创建一个class（表），表名字为Message
            var massage = new Message();          //往表里创建一个数据行
            return massage.save({
                'name': name,             //存数据到数据行里面
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view,model) {
            this.view = view
            this.model = model
            this.messageList = document.querySelector('#messageList')
            this.form = document.querySelector('#postMessageForm')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            //获取到数据库相应表里的所有数据           
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name} : ${item.content}`
                    this.messageList.appendChild(li)
                })
            }, function (error) {
                // 异常处理
            })
        },
        bindEvents: function () {
            //把数据存到数据库里
            this.form.addEventListener('submit', (e)=> { //监听form元素'submit'事件
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value //获取到用户输入的留言内容
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name,content).then(function (object) { //存入成功后执行该函数
                alert('存入成功');
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                myForm.querySelector('input[name=name]').value = ''
            })
        }
    }
    controller.init(view,model)

    // var TestObject = AV.Object.extend('TestObject');
    // var testObject = new TestObject();
    // testObject.save({
    //   words: 'Hello World!'
    // }).then(function(object) {
    //   alert('LeanCloud Rocks!');
    // })  
}.call()