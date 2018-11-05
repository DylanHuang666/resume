window.Model = function (options) {
    let resourceName=options.resourceName
    return{
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
            var query = new AV.Query(resourceName); //获取到数据库相应表里的所有数据 
            return query.find()
        },
        save: function (object) {
            var X = AV.Object.extend(resourceName); //创建一个class（表）
            var x = new X(); //往表里创建一个数据行
            return x.save(object)
        }
    }
}