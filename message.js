! function () {

    var view = View('section.message')

    var model = Model({resourceName:'Message'})
        
    var controller = Controller({ 
        messageList: null,
        form:null,
        init: function (view,model) {
            this.messageList = document.querySelector('#messageList')
            this.form = document.querySelector('#postMessageForm')
            this.loadMessages()
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
            this.model.save({'name':name,'content':content}).then(function (object) { //存入成功后执行该函数
                alert('存入成功');
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageList = this.messageList
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                myForm.querySelector('input[name=name]').value = ''
            })
        }
    })
    controller.init(view,model)

    // var TestObject = AV.Object.extend('TestObject');
    // var testObject = new TestObject();
    // testObject.save({
    //   words: 'Hello World!'
    // }).then(function(object) {
    //   alert('LeanCloud Rocks!');
    // })  
}.call()