{

    
    //初始化数据
    let options = init()
    let { keys, hash } = options

    //生成键盘
    createKeyboard(keys, hash)

    //添加事件监听
    addEvent()
    

    function init() {
        //初始化数据
        let keys = {
            0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
            length: 3
        }
        let hash = {
            q: 'qq.com',
            w: 'weibo.com',
            e: 'ele.me',
            y: 'youtube.com',
            i: 'iqiyi.com',
            o: 'opera.com',
            z: 'zhihu.com',
            v: 'v2ex.com',
        }

        let backUp = JSON.parse(localStorage.getItem('back-up') || 'null')  //如果back-up不存在，将'null' >> null
        if (backUp) {
            hash = backUp
        }
        return {
            keys: keys,
            hash: hash
        }
    }
    

    //生成键盘
    function createKeyboard(keys, hash) {
        //遍历，生成 kbd 标签
        for (let i = 0; i < keys.length; i++) {
            let div = document.createElement('div')
            div.className = "row"
            wrapper.appendChild(div)
            let row = keys[i]   //keys中的数组
            for (let i = 0; i < row.length; i++) {
                let kbd = document.createElement('kbd')
                kbd.className = "kbd"
                let span = document.createElement('span')
                span.textContent = row[i].toUpperCase()
                let img = document.createElement('img')
                img.src = `http://${hash[row[i]]}/favicon.ico`
                img.onerror = function () {
                    img.src = './img/no.png'
                }
                let button = document.createElement('button')
                button.textContent = 'E'
                button.id = row[i]
                button.addEventListener('click', (e) => {
                    let value = e.currentTarget.id
                    let url = prompt(`请为${value}键绑定一个网址`)
                    hash[value] = url
                    localStorage.setItem('back-up', JSON.stringify(hash))
                    img.src = `http://${url}/favicon.ico`
                    img.onerror = function () {
                        img.src = './img/no.png'
                    }
                })
                kbd.appendChild(span)
                kbd.appendChild(button)
                kbd.appendChild(img)
                div.appendChild(kbd)
            }
        }
    }

    //监听按键事件
    function addEvent(){
        document.onkeypress = function (e) {
            let key = e.key
            let website = hash[key]
            window.open(`http://${website}`, '_black')
        }
        let input = document.querySelector('.search')
        input.addEventListener('keypress', function (e) {
            //阻止事件冒泡，因为document监听了keypress
            e.stopPropagation()
        })
        let aBaidu = document.querySelector('.baidu')
        let aGoogle = document.querySelector('.google')
        aGoogle.addEventListener('click', function (e) {
            //阻止默认事件
            e.preventDefault()
            if(input.value !== ''){
                let url = `http://www.google.com/search?q=${input.value}`
                console.log(input.value)
                window.open(url, '_black')
            }else{
                input.focus()
            }
            
        })
        aBaidu.addEventListener('click', function (e) {
            e.preventDefault()
            if(input.value !== ''){
                let url = `http://www.baidu.com/s?wd=${input.value}`
                window.open(url, '_black')
            }else{
                input.focus()
            }
            
        })
    }
    
}

