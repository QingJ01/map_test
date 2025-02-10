document.addEventListener('DOMContentLoaded', function () {
    let correctCount = 0;
    let answeredPaths = new Set();
    let countryPaths = new Map();
    let timer = null;
    let seconds = 0;
    let isGameRunning = false;

    // 获取DOM元素
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const endBtn = document.getElementById('endBtn');
    const countryInput = document.getElementById('countryInput');
    const timerDisplay = document.getElementById('timer');

    // 添加国家名称映射（仅包含SVG中存在的国家）
    const countryNameMap = {
        'Afghanistan': '阿富汗',
        'Albania': '阿尔巴尼亚',
        'Algeria': '阿尔及利亚',
        'Andorra': '安道尔',
        'Angola': '安哥拉',
        'Antigua and Barbuda': '安提瓜和巴布达',
        'Argentina': '阿根廷',
        'Armenia': '亚美尼亚',
        'Australia': '澳大利亚',
        'Austria': '奥地利',
        'Azerbaijan': '阿塞拜疆',
        'Bahamas': '巴哈马',
        'Bahrain': '巴林',
        'Bangladesh': '孟加拉国',
        'Barbados': '巴巴多斯',
        'Belarus': '白俄罗斯',
        'Belgium': '比利时',
        'Belize': '伯利兹',
        'Benin': '贝宁',
        'Bhutan': '不丹',
        'Bolivia': '玻利维亚',
        'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
        'Botswana': '博茨瓦纳',
        'Brazil': '巴西',
        'Brunei': '文莱',
        'Bulgaria': '保加利亚',
        'Burkina Faso': '布基纳法索',
        'Burundi': '布隆迪',
        'Cape Verde': '佛得角',
        'Cambodia': '柬埔寨',
        'Cameroon': '喀麦隆',
        'Canada': '加拿大',
        'Central African Republic': '中非共和国',
        'Chad': '乍得',
        'Chile': '智利',
        'China': ['中国', '中华人民共和国'],
        'Colombia': '哥伦比亚',
        'Comoros': '科摩罗',
        'Congo': '刚果共和国',
        'Democratic Republic of the Congo': '刚果民主共和国',
        'Costa Rica': '哥斯达黎加',
        'Ivory Coast': '科特迪瓦',
        'Croatia': '克罗地亚',
        'Cuba': '古巴',
        'Cyprus': '塞浦路斯',
        'Czech Republic': '捷克共和国',
        'Denmark': '丹麦',
        'Djibouti': '吉布提',
        'Dominica': '多米尼克',
        'Dominican Republic': '多明尼加共和国',
        'Ecuador': '厄瓜多尔',
        'Egypt': '埃及',
        'El Salvador': '萨尔瓦多',
        'Equatorial Guinea': '赤道几内亚',
        'Eritrea': '厄立特里亚',
        'Estonia': '爱沙尼亚',
        'Ethiopia': '埃塞俄比亚',
        'Fiji': '斐济',
        'Finland': '芬兰',
        'France': ['法国', '法兰西共和国'],
        'Gabon': '加蓬',
        'Gambia': '冈比亚',
        'Georgia': '格鲁吉亚',
        'Germany': ['德国', '德意志联邦共和国'],
        'Ghana': '加纳',
        'Greece': '希腊',
        'Grenada': '格林纳达',
        'Guatemala': '危地马拉',
        'Guinea': '几内亚',
        'Guinea-Bissau': '几内亚比绍',
        'Guyana': '圭亚那',
        'Haiti': '海地',
        'Honduras': '洪都拉斯',
        'Hungary': '匈牙利',
        'Iceland': '冰岛',
        'India': ['印度', '印度共和国'],
        'Indonesia': ['印度尼西亚', '印尼'],
        'Iran': '伊朗',
        'Iraq': ['伊拉克', '伊拉克共和国'],
        'Ireland': '爱尔兰',
        'Israel': '以色列',
        'Italy': '意大利',
        'Jamaica': '牙买加',
        'Japan': ['日本', '日本国'],
        'Jordan': '约旦',
        'Kazakhstan': '哈萨克斯坦',
        'Kenya': '肯尼亚',
        'Kiribati': '基里巴斯',
        'Kuwait': '科威特',
        'Kyrgyzstan': '吉尔吉斯斯坦',
        'Laos': '老挝',
        'Latvia': '拉脱维亚',
        'Lebanon': '黎巴嫩',
        'Lesotho': '莱索托',
        'Liberia': '利比里亚',
        'Libya': '利比亚',
        'Liechtenstein': '列支敦士登',
        'Lithuania': '立陶宛',
        'Luxembourg': '卢森堡',
        'Madagascar': '马达加斯加',
        'Malawi': '马拉维',
        'Malaysia': ['马来西亚', '大马'],
        'Maldives': '马尔代夫',
        'Mali': '马里',
        'Malta': '马耳他',
        'Marshall Islands': '马绍尔群岛',
        'Mauritania': '毛里塔尼亚',
        'Mauritius': '毛里求斯',
        'Mexico': ['墨西哥', '墨西哥合众国'],
        'Micronesia': '密克罗尼西亚',
        'Moldova': '摩尔多瓦',
        'Monaco': '摩纳哥',
        'Mongolia': '蒙古',
        'Montenegro': '黑山',
        'Morocco': ['摩洛哥', '摩洛哥王国'],
        'Mozambique': '莫桑比克',
        'Myanmar': ['缅甸', '缅甸联邦共和国', '缅'],
        'Namibia': '纳米比亚',
        'Nauru': '瑙鲁',
        'Nepal': ['尼泊尔', '尼泊尔联邦民主共和国'],
        'Netherlands': '荷兰',
        'New Zealand': '新西兰',
        'Nicaragua': '尼加拉瓜',
        'Niger': '尼日尔',
        'Nigeria': '尼日利亚',
        'North Korea': ['朝鲜', '朝鲜民主主义人民共和国'],
        'North Macedonia': '北马其顿',
        'Norway': '挪威',
        'Oman': '阿曼',
        'Pakistan': ['巴基斯坦', '巴基斯坦伊斯兰共和国'],
        'Palau': '帕劳',
        'Palestine': '巴勒斯坦',
        'Panama': '巴拿马',
        'Papua New Guinea': '巴布亚新几内亚',
        'Paraguay': '巴拉圭',
        'Peru': ['秘鲁', '秘鲁共和国'],
        'Philippines': ['菲律宾', '菲律宾共和国'],
        'Poland': ['波兰', '波兰共和国'],
        'Portugal': '葡萄牙',
        'Qatar': '卡塔尔',
        'Romania': '罗马尼亚',
        'Russia': ['俄罗斯', '俄罗斯联邦'],
        'Rwanda': '卢旺达',
        'Saint Kitts and Nevis': '圣基茨和尼维斯',
        'Saint Lucia': '圣卢西亚',
        'Saint Vincent and the Grenadines': '圣文森特和格林纳丁斯',
        'Samoa': '萨摩亚',
        'San Marino': '圣马力诺',
        'Sao Tome and Principe': '圣多美和普林西比',
        'Saudi Arabia': ['沙特阿拉伯', '沙特'],
        'Senegal': '塞内加尔',
        'Serbia': '塞尔维亚',
        'Seychelles': '塞舌尔',
        'Sierra Leone': '塞拉利昂',
        'Singapore': '新加坡',
        'Slovakia': '斯洛伐克',
        'Slovenia': '斯洛文尼亚',
        'Solomon Islands': '所罗门群岛',
        'Somalia': '索马里',
        'South Africa': ['南非', '南非共和国'],
        'South Korea': ['韩国', '大韩民国'],
        'South Sudan': '南苏丹',
        'Spain': ['西班牙', '西班牙王国'],
        'Sri Lanka': '斯里兰卡',
        'Sudan': ['苏丹', '苏丹共和国'],
        'Suriname': '苏里南',
        'Sweden': '瑞典',
        'Switzerland': '瑞士',
        'Syria': '叙利亚',
        'Tajikistan': '塔吉克斯坦',
        'Tanzania': ['坦桑尼亚', '坦桑尼亚联合共和国'],
        'Thailand': ['泰国', '泰王国'],
        'Timor-Leste': '东帝汶',
        'Togo': '多哥',
        'Tonga': '汤加',
        'Trinidad and Tobago': '特立尼达和多巴哥',
        'Tunisia': '突尼斯',
        'Turkey': '土耳其',
        'Turkmenistan': '土库曼斯坦',
        'Tuvalu': '图瓦卢',
        'Uganda': '乌干达',
        'Ukraine': ['乌克兰'],
        'United Arab Emirates': ['阿联酋', '阿拉伯联合酋长国'],
        'United Kingdom': ['英国', '大不列颠及北爱尔兰联合王国'],
        'United States': ['美国', '美利坚合众国', '美利坚'],
        'Uruguay': '乌拉圭',
        'Uzbekistan': ['乌兹别克斯坦', '乌兹别克'],
        'Vanuatu': '瓦努阿图',
        'Vatican City': '梵蒂冈',
        'Venezuela': ['委内瑞拉', '委内瑞拉玻利瓦尔共和国'],
        'Vietnam': ['越南', '越南社会主义共和国'],
        'Yemen': '也门',
        'Zambia': '赞比亚',
        'Zimbabwe': '津巴布韦',
        'Taiwan': '中国',

        // 常用别名
        'USA': '美国',
        'UK': '英国',
        'UAE': '阿联酋',
        'East Timor': '东帝汶',
        'Burma': '缅甸'
    };

    // 首先加载世界地图
    fetch('./svg/world.svg')
        .then(response => response.text())
        .then(svgData => {
            document.getElementById('map-container').innerHTML = svgData;
            initializeMap();
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
            svg.setAttribute('viewBox', '0 0 700 350');  // 调整这些值以适应你的地图

            // 确保地图居中且完整显示
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }

        // 初始化国家列表和路径映射
        document.querySelectorAll('path').forEach(path => {
            const id = path.getAttribute('id');
            if (!id) return;

            const desc = path.querySelector('desc');
            if (!desc) return;

            const name = desc.querySelector('name')?.textContent;
            if (!name) return;

            // 只存储英文名称
            countryPaths.set(name, path);
        });

        // 修改显示总数的计算方式，排除别名
        const aliases = ['USA', 'UK', 'UAE', 'East Timor', 'Burma'];  // 定义所有别名
        const totalCountries = Object.keys(countryNameMap).filter(key => !aliases.includes(key)).length;
        document.getElementById('status').textContent = `已答对: 0 / ${totalCountries} 个国家`;

        countryInput.addEventListener('input', handleInput);
    }

    // 按钮事件监听
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', pauseGame);
    endBtn.addEventListener('click', endGame);

    function startGame() {
        if (!isGameRunning) {
            isGameRunning = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            endBtn.disabled = false;
            startTimer();
        }
    }

    function pauseGame() {
        if (isGameRunning) {
            isGameRunning = false;
            countryInput.value = '';
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            stopTimer();
        }
    }

    function endGame() {
        isGameRunning = false;
        countryInput.value = '';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        endBtn.disabled = true;
        stopTimer();
        showResultModal();
    }

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

        // 遍历所有国家进行匹配
        countryPaths.forEach((path, countryName) => {
            if (answeredPaths.has(countryName)) return;

            const chineseNames = countryNameMap[countryName];
            if (!chineseNames) return;

            const normalizedInput = input.toLowerCase();
            const normalizedEnglishName = countryName.toLowerCase();
            const matches = Array.isArray(chineseNames)
                ? chineseNames.some(name => name.toLowerCase() === normalizedInput)
                : chineseNames.toLowerCase() === normalizedInput;

            if (normalizedEnglishName === normalizedInput || matches) {
                answeredPaths.add(countryName);
                correctCount++;
                path.classList.add('highlighted');
                path.classList.add('answered');

                // 这里也要修改计数方式
                const aliases = ['USA', 'UK', 'UAE', 'East Timor', 'Burma'];
                const totalCountries = Object.keys(countryNameMap).filter(key => !aliases.includes(key)).length;
                document.getElementById('status').textContent =
                    `已答对: ${correctCount} / ${totalCountries} 个国家`;

                setTimeout(() => {
                    event.target.value = '';
                }, 300);

                if (correctCount === totalCountries) {
                    endGame();
                }
            } else if (normalizedEnglishName.includes(normalizedInput) ||
                (Array.isArray(chineseNames)
                    ? chineseNames.some(name => name.toLowerCase().includes(normalizedInput))
                    : chineseNames.toLowerCase().includes(normalizedInput))) {
                path.classList.add('highlighted');
            }
        });
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

    function getEvaluation(correctCount, totalTime) {
        const percentage = (correctCount / countryPaths.size) * 100;
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

        finalTime.textContent = formatTime(seconds);
        // 修改结果显示逻辑，排除别名
        const aliases = ['USA', 'UK', 'UAE', 'East Timor', 'Burma'];
        const totalCountries = Object.keys(countryNameMap).filter(key => !aliases.includes(key)).length;
        finalScore.textContent = `${correctCount} / ${totalCountries}`;
        evaluation.textContent = getEvaluation(correctCount, seconds);

        missedList.innerHTML = '';
        Object.entries(countryNameMap).forEach(([en, zh]) => {
            if (!answeredPaths.has(en)) {
                const span = document.createElement('span');
                span.textContent = `${zh} (${en})`;
                missedList.appendChild(span);
            }
        });

        modal.style.display = 'block';

        document.getElementById('closeModal').onclick = function () {
            modal.style.display = 'none';
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };

        const restartBtn = document.getElementById('restartBtn');
        restartBtn.onclick = function () {
            location.reload();
        };
    }
}); 