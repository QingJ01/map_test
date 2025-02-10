document.addEventListener('DOMContentLoaded', function () {
    // 所有需要匹配的地级市列表
    const targetCities = [
        "北京市", "天津市", "上海市", "重庆市", "石家庄市", "唐山市", "秦皇岛市", "邯郸市",
        "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市", "太原市",
        "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市",
        "临汾市", "吕梁市", "呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市",
        "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟",
        "阿拉善盟", "沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市",
        "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市", "长春市",
        "吉林市", "四平市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州",
        "哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市",
        "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区", "南京市",
        "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市",
        "扬州市", "镇江市", "泰州市", "宿迁市", "杭州市", "宁波市", "温州市", "嘉兴市",
        "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市", "合肥市",
        "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市",
        "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市", "福州市",
        "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市",
        "南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市",
        "宜春市", "抚州市", "上饶市", "济南市", "青岛市", "淄博市", "枣庄市", "东营市",
        "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市",
        "聊城市", "滨州市", "菏泽市", "郑州市", "开封市", "洛阳市", "平顶山市", "安阳市",
        "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市",
        "商丘市", "信阳市", "周口市", "驻马店市", "武汉市", "黄石市", "十堰市", "宜昌市",
        "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市",
        "恩施土家族苗族自治州", "神农架林区", "长沙市", "株洲市", "湘潭市", "衡阳市",
        "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市",
        "娄底市", "湘西土家族苗族自治州", "广州市", "韶关市", "汕头市", "佛山市", "江门市",
        "茂名市", "湛江市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市",
        "东莞市", "中山市", "潮州市", "揭阳市", "云浮市", "南宁市", "柳州市", "桂林市",
        "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市",
        "河池市", "来宾市", "崇左市", "海口市", "三亚市", "三沙市", "五指山市", "琼海市",
        "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县",
        "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县",
        "琼中黎族苗族自治县", "西沙群岛的岛礁及其海域", "南沙群岛的岛礁及其海域",
        "中沙群岛的岛礁及其海域", "成都市", "自贡市", "攀枝花市", "泸州市", "德阳市",
        "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市",
        "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州",
        "甘孜藏族自治州", "凉山彝族自治州", "贵阳市", "六盘水市", "遵义市", "安顺市",
        "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州",
        "黔南布依族苗族自治州", "昆明市", "曲靖市", "玉溪市", "保山市", "昭通市",
        "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州",
        "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州",
        "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州", "拉萨市",
        "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区", "西安市",
        "宝鸡市", "咸阳市", "铜川市", "渭南市", "汉中市", "榆林市", "延安市", "安康市",
        "商洛市", "兰州市", "嘉峪关市", "金昌市", "酒泉市", "张掖市", "武威市", "白银市",
        "天水市", "平凉市", "庆阳市", "定西市", "陇南市", "西宁市", "海东市",
        "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州",
        "牎树藏族自治州", "海西蒙古族藏族自治州", "银川市", "石嘴山市", "台湾省", "香港特别行政区", "澳门特别行政区"
    ];

    let correctCount = 0;
    let answeredPaths = new Set();
    let cityPaths = new Map();
    let timer = null;
    let seconds = 0;
    let isGameRunning = false;

    // 获取DOM元素
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const endBtn = document.getElementById('endBtn');
    const cityInput = document.getElementById('cityInput');
    const timerDisplay = document.getElementById('timer');

    // 首先加载地图
    fetch('./svg/china.svg')
        .then(response => response.text())
        .then(svgData => {
            document.getElementById('map-container').innerHTML = svgData;
            initializeMap();
            // 加载地图后再加载游戏状态
            loadGameState();
        })
        .catch(error => {
            console.error('加载地图失败:', error);
        });

    function initializeMap() {
        const svg = document.querySelector('#map-container svg');
        if (svg) {
            // 移除原有的样式和属性
            svg.removeAttribute('style');

            // 设置新的尺寸和视图
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');

            // 调整视图范围，使地图居中且放大
            const width = 400;     // 大幅减小宽度以放大地图
            const height = 180;    // 相应减小高度以保持比例
            const centerX = 475;   // 保持水平中心点
            const centerY = 246;   // 保持垂直中心点

            // 计算新的视图范围
            const viewBox = `${centerX - width / 2} ${centerY - height / 2} ${width} ${height}`;
            svg.setAttribute('viewBox', viewBox);

            // 确保地图居中且完整显示
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }

        // 初始化城市列表和路径映射
        targetCities.forEach(city => {
            cityPaths.set(city, null);
        });

        // 收集所有有效的路径
        document.querySelectorAll('path').forEach(path => {
            const id = path.getAttribute('id');
            if (!id || id.includes('界') || id.includes('_JD')) {
                return;
            }

            // 查找匹配的目标城市
            const matchingCity = targetCities.find(city =>
                normalizeCity(id) === normalizeCity(city)
            );

            if (matchingCity) {
                cityPaths.set(matchingCity, path);
            }
        });

        // 显示总数
        const totalCities = targetCities.length;
        document.getElementById('status').textContent = `已答对: 0 / ${totalCities} 个地级市`;

        // 添加输入框事件监听
        cityInput.addEventListener('input', handleInput);
    }

    // 地区名称标准化映射
    const normalizeCity = (name) => {
        return name.replace(/(省|市|区|地区|特别行政区|自治州|自治县|自治区|群岛的岛礁及其海域|族|土家|苗|藏|羌|彝|布依|侗|壮|哈尼|傣|景颇|傈僳|白|蒙古|堂)/g, '')
            .trim();
    };

    // 直辖市及其下属区域映射
    const municipalityDistricts = {
        '北京市': [
            '东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区',
            '顺义区', '昌平区', '大兴区', '通州区', '房山区', '门头沟区',
            '平谷区', '密云区', '怀柔区', '延庆区'
        ],
        '上海市': [
            '黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区',
            '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区',
            '松江区', '青浦区', '奉贤区', '崇明区'
        ],
        '天津市': [
            '和平区', '河东区', '河西区', '南开区', '河北区', '红桥区',
            '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区',
            '滨海新区', '宁河区', '静海区', '蓟州区'
        ],
        '重庆市': [
            '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区',
            '北碚区', '渝北区', '巴南区', '涪陵区', '万州区', '黔江区',
            '长寿区', '江津区', '合川区', '永川区', '南川区', '綦江区',
            '大足区', '璧山区', '铜梁区', '潼南区', '荣昌区', '开州区',
            '梁平区', '武隆区'
        ],
        '香港特别行政区': [
            '中西区', '东区', '南区', '湾仔区', '九龙城区', '观塘区',
            '深水埗区', '黄大仙区', '油尖旺区', '离岛区', '葵青区',
            '北区', '西贡区', '沙田区', '大埔区', '荃湾区', '屯门区',
            '元朗区'
        ],
        '澳门特别行政区': [
            '花地玛堂区', '花王堂区', '望德堂区', '风顺堂区', '大堂区',
            '圣方济各堂区'
        ]
    };

    // 添加保存和加载游戏状态的函数
    function saveGameState() {
        const gameState = {
            correctCount,
            answeredPaths: Array.from(answeredPaths),
            seconds,
            isGameRunning
        };
        localStorage.setItem('cityGameState', JSON.stringify(gameState));
    }

    function loadGameState() {
        const savedState = localStorage.getItem('cityGameState');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            correctCount = gameState.correctCount;
            answeredPaths = new Set(gameState.answeredPaths);
            seconds = gameState.seconds;
            isGameRunning = false;

            updateTimerDisplay();
            const totalCities = targetCities.length;
            document.getElementById('status').textContent =
                `已答对: ${correctCount} / ${totalCities} 个地级市`;

            document.querySelectorAll('path').forEach(path => {
                const id = path.getAttribute('id');
                if (answeredPaths.has(id)) {
                    path.classList.add('highlighted');
                    path.classList.add('answered');
                }
            });

            startBtn.disabled = false;
            pauseBtn.disabled = true;
            endBtn.disabled = false;
        }
    }

    // 在页面加载时加载游戏状态
    loadGameState();

    // 在页面关闭或刷新时保存游戏状态
    window.addEventListener('beforeunload', saveGameState);

    // 按钮事件监听
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', pauseGame);
    endBtn.addEventListener('click', endGame);

    // 添加输入框点击事件
    cityInput.addEventListener('click', function () {
        if (!isGameRunning) {
            startGame();
        }
    });

    // 添加输入框焦点事件
    cityInput.addEventListener('focus', function () {
        if (!isGameRunning) {
            startGame();
        }
    });

    function startGame() {
        if (!isGameRunning) {
            isGameRunning = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            endBtn.disabled = false;
            startTimer();
            saveGameState();
        }
    }

    function pauseGame() {
        if (isGameRunning) {
            isGameRunning = false;
            cityInput.value = '';
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            stopTimer();
            saveGameState();
        }
    }

    function endGame() {
        isGameRunning = false;
        cityInput.value = '';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        endBtn.disabled = true;
        stopTimer();
        showResultModal();
        // 清除游戏记录
        localStorage.removeItem('cityGameState');
    }

    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = `用时: ${formatTime(seconds)}`;
    }

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    cityInput.addEventListener('input', handleInput);

    function handleInput(event) {
        if (!isGameRunning) {
            startGame();
        }

        const input = event.target.value.trim();

        // 清除所有临时高亮
        document.querySelectorAll('path:not(.answered)').forEach(path => {
            path.classList.remove('highlighted');
        });

        if (!input) return;

        const normalizedInput = normalizeCity(input);

        // 特殊处理台湾
        if (normalizedInput === '台湾') {
            document.querySelectorAll('path').forEach(path => {
                const id = path.getAttribute('id');
                if (id === '台湾省') {
                    path.classList.add('highlighted');
                    path.classList.add('answered');
                    answeredPaths.add('台湾');
                    correctCount++;

                    const totalCities = targetCities.length;
                    document.getElementById('status').textContent =
                        `已答对: ${correctCount} / ${totalCities} 个地级市`;

                    setTimeout(() => {
                        event.target.value = '';
                    }, 300);

                    saveGameState();

                    if (correctCount === totalCities) {
                        endGame();
                    }
                    return;
                }
            });
        }

        // 检查是否是直辖市
        for (const [city, districts] of Object.entries(municipalityDistricts)) {
            if (normalizeCity(city) === normalizedInput) {
                // 如果输入的是直辖市名称，高亮所有对应的区
                districts.forEach(district => {
                    document.querySelectorAll('path').forEach(path => {
                        const id = path.getAttribute('id');
                        if (id === district) {
                            path.classList.add('highlighted');
                            path.classList.add('answered');
                            answeredPaths.add(city);
                        }
                    });
                });

                correctCount++;
                const totalCities = targetCities.length;
                document.getElementById('status').textContent =
                    `已答对: ${correctCount} / ${totalCities} 个地级市`;

                setTimeout(() => {
                    event.target.value = '';
                }, 300);

                if (correctCount === totalCities) {
                    endGame();
                }
                return;
            }
        }

        // 原有的城市匹配逻辑
        cityPaths.forEach((path, cityName) => {
            if (answeredPaths.has(cityName)) return;

            const normalizedCityName = normalizeCity(cityName);

            if (normalizedCityName === normalizedInput) {
                // 完全匹配
                answeredPaths.add(cityName);
                correctCount++;

                if (path) {
                    path.classList.add('highlighted');
                    path.classList.add('answered');
                }

                const totalCities = targetCities.length;
                document.getElementById('status').textContent =
                    `已答对: ${correctCount} / ${totalCities} 个地级市`;

                setTimeout(() => {
                    event.target.value = '';
                }, 300);

                // 保存游戏状态
                saveGameState();

                if (correctCount === totalCities) {
                    endGame();
                }
            } else if (path && normalizedCityName.includes(normalizedInput)) {
                // 部分匹配，显示提示
                path.classList.add('highlighted');
            }
        });
    }

    function getEvaluation(correctCount, totalTime) {
        const percentage = (correctCount / targetCities.length) * 100;
        const timeInMinutes = totalTime / 60;

        if (percentage >= 90) {
            if (timeInMinutes < 10) return "完美！你是地理天才！";
            if (timeInMinutes < 20) return "太棒了！掌握得非常好！";
            return "很好！继续保持！";
        } else if (percentage >= 70) {
            if (timeInMinutes < 15) return "不错的表现！";
            return "掌握得还可以，继续努力！";
        } else if (percentage >= 50) {
            return "还需要多加练习哦！";
        } else {
            return "加油，相信你可以做得更好！";
        }
    }

    function showResultModal() {
        const modal = document.getElementById('resultModal');
        const finalTime = document.getElementById('finalTime');
        const finalScore = document.getElementById('finalScore');
        const evaluation = document.getElementById('evaluation');
        const missedList = document.getElementById('missedList');

        // 设置结果
        finalTime.textContent = formatTime(seconds);
        finalScore.textContent = `${correctCount} / ${targetCities.length}`;
        evaluation.textContent = getEvaluation(correctCount, seconds);

        // 生成未答出的城市列表
        missedList.innerHTML = '';
        const missedCities = targetCities.filter(city => !answeredPaths.has(city));
        missedCities.forEach(city => {
            const span = document.createElement('span');
            span.textContent = city;
            missedList.appendChild(span);
        });

        // 显示模态框
        modal.style.display = 'block';

        // 添加关闭按钮事件
        document.getElementById('closeModal').onclick = function () {
            modal.style.display = 'none';
        };

        // 点击模态框外部关闭
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };

        // 移除已存在的重新开始按钮（如果有）
        const existingRestartBtn = document.querySelector('.restart-btn');
        if (existingRestartBtn) {
            existingRestartBtn.remove();
        }

        // 添加重新开始按钮
        const restartBtn = document.createElement('button');
        restartBtn.className = 'btn restart-btn'; // 添加特定的类名以便识别
        restartBtn.style.marginLeft = '10px';
        restartBtn.textContent = '重新开始';
        restartBtn.onclick = function () {
            modal.style.display = 'none';
            resetGame();
        };
        document.getElementById('closeModal').parentNode.appendChild(restartBtn);
    }

    // 添加重置游戏函数
    function resetGame() {
        // 清除游戏数据
        correctCount = 0;
        answeredPaths = new Set();
        seconds = 0;
        isGameRunning = false;

        // 清除高亮
        document.querySelectorAll('path').forEach(path => {
            path.classList.remove('highlighted');
            path.classList.remove('answered');
        });

        // 重置界面显示
        document.getElementById('status').textContent = `已答对: 0 / ${targetCities.length} 个地级市`;
        updateTimerDisplay();

        // 重置按钮状态
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        endBtn.disabled = true;

        // 清空输入框
        cityInput.value = '';

        // 清除本地存储
        localStorage.removeItem('cityGameState');
    }
}); 