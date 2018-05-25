/* ================================================================================
 * 公用帮助方法导出
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */

let util = {
    stopPropagation: function(e){
        if( e && e.stopPropagation ){
            e.stopPropagation()
        }else{
            window.event.cancelBubble = true
        }
    },
    preventDefault: function(e){
        if( e && e.preventDefault ){
            e.preventDefault()
        }else{
            window.event.returnValue = false
        }
        return false
    },
    isZeroDate: function(argDate){
        let date = this.dateToDateString(argDate, "yyyy-MM-dd")
        return date == "1-01-01" ? true : false
    },
    toBool: function(value){
        let valueType = typeof value
        if(valueType == "string"){
            value = value.replace(/[\s]/g, '').toLowerCase()
            if(value == "false" || value == "0" || value == "null" || value == "undefined"){
                value = false
            }else{
                value = true
            }
        }else if(valueType == "number"){
            value = value == 0 ? false : true
        }
                
        return value
    },
    dateToDateString: function(...args){
        let date = new Date()
        let formats = ["yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy-MM-dd", "yyyy-MM", "HH:mm:ss", "HH:mm", "mm:ss"]
        let format = formats[0]

        if(args.length > 0){
            date = args[0]
            if(typeof date === "string"){
                if(date != ""){
                    if(date.indexOf("T") == -1){
                        date = new Date(Date.parse(date.replace(/-/g,"/")))
                    }else{
                        date = new Date(date)
                    }
                }else{
                    date = new Date()
                }
            }
            if(args.length == 2){
                format = args[1]
            }
        }

        let dateString
        let year,month,day,hours,minutes,seconds

        year = date.getFullYear()
        month = date.getMonth() + 1
        day = date.getDate()
        hours = date.getHours()
        minutes = date.getMinutes()
        seconds = date.getSeconds()
        month = month <= 9 ?  '0' + month : month
        day = day <= 9 ?  '0' + day : day
        hours = hours <= 9 ?  '0' + hours : hours
        minutes = minutes <= 9 ?  '0' + minutes : minutes
        seconds = seconds <= 9 ?  '0' + seconds : seconds
        
        dateString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
        if(format == formats[1]){
            dateString = year + "-" + month + "-" + day + " " + hours + ":" + minutes
        }else if(format == formats[2]){
            dateString = year + "-" + month + "-" + day
        }else if(format == formats[3]){
            dateString = year + "-" + month
        }else if(format == formats[4]){
            dateString = hours + ":" + minutes + ":" + seconds
        }else if(format == formats[5]){
            dateString = hours + ":" + minutes
        }else if(format == formats[6]){
            dateString = minutes + ":" + seconds
        }
        return dateString
    },
    dateToObject: function(date){
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(), 
            hours: date.getHours(),
            minutes: date.getMinutes(), 
            seconds: date.getSeconds(),
            milliseconds: date.getMilliseconds()
        }
    },
    dateToFriendString: function(...args){
        let date = new Date()
        if(args.length == 1){
            date = args[0]
            if(typeof date === "string"){
                if(date != ""){
                    date = new Date(date)
                }
            }
        }
        let curData = this.dateToObject(new Date())
        let data = this.dateToObject(date)
        let result = this.dateToDateString(date, "yyyy-MM-dd HH:mm:ss")
        let dayStrings = ["一","两","三","四","五","六"]

        if(data.year == curData.year ){
            var dayCount = Math.abs(((Date.parse(curData.month+'/'+curData.day+'/'+curData.year) - Date.parse(data.month+'/'+data.day+'/'+data.year))/86400000))
            if(data.month == curData.month){
                if(data.day == curData.day){
                    var hoursCount = curData.hours - data.hours
                    if(data.hours == curData.hours){
                        var minutesCount = curData.minutes - data.minutes
                        if(data.minutes == curData.minutes){
                            result = "刚刚"
                        }else{
                            result = minutesCount + "分钟前"
                        }
                    }else{
                        result = hoursCount + "小时前"
                    }
                }else{
                    if(dayCount > 14){
                        result = "半个月前"
                    }else if(dayCount > 6){
                        result = "一周前"
                    }else{
                        result = dayStrings[dayCount-1] + "天前"
                    } 
                }
            }else{
                if(dayCount >= 60 && dayCount < 90 ){
                    result = "两个月前"
                }else if(dayCount >= 30 && dayCount < 60 ){
                    result = "一个月前"
                }
            }
        }
        return result
    },
    secondsToPlayTimeString: function(time, duration) {
        time = time || 0   
        let h = parseInt(time / 3600)
        let m = parseInt(time % 3600 / 60)
        let s = parseInt(time % 60)
        s = s < 10 ? "0" + s : s;
        if(duration >= 60 && duration < 3600){
            m = m < 10 ? "0"+m : m; 
            return m + ":" + s;
        }
        if (duration >= 3600){
            m = m < 10 ? "0" + m : m 
            h = h < 10 ? "0" + h : h
            return h + ":" + m + ":" + s
        } 
        return s
    },
    secondsToTimeString: function(duration) {
        duration = duration || 0   
        let h = parseInt(duration / 3600)
        let m = parseInt(duration % 3600 / 60)
        let s = parseInt(duration % 60)
        s = s < 10 ? "0" + s : s;
        if(duration >= 60 && duration < 3600){
            m = m < 10 ? "0" + m : m; 
            return m + ":" + s;
        }
        if (duration >= 3600){
            m = m < 10 ? "0" + m : m 
            h = h < 10 ? "0" + h : h
            return h + ":" + m + ":" + s
        } 
        return s
    },
    getGuid: function(){
        var guids = []
        let count = 32;
        while(count--){
            guids.push(Math.floor(Math.random()*16.0).toString(16))
        }
        return guids.sort(function(){ return 0.5 - Math.random()}) .join("")
    },
    getTick: function(){
        let date = new Date()
        let tickValue = date.getTime()
        return tickValue
    },
    jqueryAjax: function (option) {
        var defaultOption = {
            method: "get",
            url: "",
            data: null,
            result_type: "json",
            progress: null,
            content_type: true,
            is_process_data: true,
        }

        let propertys = Object.getOwnPropertyNames(option)
        for(let index in propertys){
            let name = propertys[index]
            let value = option[name]
            Object.defineProperty(defaultOption, name, {
                value: value
            })  
        }

        let contentType = typeof defaultOption.content_type
        if(contentType == "boolean"){
            if(defaultOption.content_type){
                defaultOption.content_type = "application/x-www-form-urlencoded"
            }
        }

        if(defaultOption.url.indexOf("http://") == -1 && defaultOption.url.substring(0,1) != "/"){
            defaultOption.url = "/" + defaultOption.url
        }

        return $.ajax({
            url: defaultOption.url, 
            type: defaultOption.method,
            data: defaultOption.data,
            dataType: defaultOption.result_type,
            contentType: defaultOption.content_type,
            processData: defaultOption.is_process_data,
            xhrFields: {
                withCredentials: true
            },
            xhr: function(){
                let xhr = $.ajaxSettings.xhr()
                if(defaultOption.progress){
                    if(xhr.upload) {
                        xhr.upload.addEventListener("progress" , defaultOption.progress, false);
                    }
                }
                return xhr
            },
            cache: false,
            crossDomain: true
        }).then(function(result){
                if(result.Code == 0){
                    if(result.Data && $.isArray(result.Data)){
                        result.Data.map(function(v,i){
                            v["__is_checked__"] = false
                        })
                    }
                    return $.Deferred().resolve(result).promise()
                }else{
                    return $.Deferred().reject(result).promise()
                }
        },function(result){
            return $.Deferred().reject({
                Code: 999,
                Msg: "请求失败",
                Data: null
            }).promise()
        }).always(function(){

        })
    },
    request: function(option){
        return this.jqueryAjax(option)
    }
}


export { util }