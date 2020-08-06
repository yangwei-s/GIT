$(function () {

    //   给a标签注册鼠标点击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })


    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 表单验证
    var form = layui.form;


    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        password: function (value) {
            // 获取密码表单的val()值
            if (value !== $('.reg-box [name=password]').val()) {
                return '两次输入的密码不一致'
            }

        }
    })




    var layer = layui.layer;
    // 给注册表单绑定事件
    $('#form-reg').on('submit', function (e) {
        //   阻止事件默认跳转
        e.preventDefault()

        // 获取表单的内容
        var username = $('.reg-box [name=username]').val();
        var password = $('.reg-box [name=password]').val();

        // 发送ajax请求
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (backData) {
                console.log(backData);
                if (backData.status !== 0) {
                    return layer.msg(backData.message)
                }
                layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
                $('#link_login').click()
            }
        });




    })
    // 给登录表单绑定事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault();

        //  发送ajax请求
        $.ajax({
            url: '/api/login',
            type: 'post',
            //	dataType:'json',
            data: $(this).serialize(),
            success: function (backData) {
                if (backData.status !== 0) {
                    return layer.msg(backData.message)
                }
                layer.msg('登录成功！')
                //将登陆成功后的获得的请求头存储在本地存储中
                localStorage.setItem('token', backData.token)
                location.href = '/index.html';
            }
        });
    })

})


