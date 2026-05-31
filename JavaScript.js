// 获取DOM元素
const powerBtn = document.getElementById('powerBtn');
const speedBtn = document.getElementById('speedBtn');
const bladeBox = document.querySelector('.fan-blade-box');
const lightList = document.querySelectorAll('.light');

// 全局状态
let isPowerOn = false;
let currentGear = 0;
let slowTimer = null; // 存储减速定时器

// 更新档位指示灯
function updateLight() {
    lightList.forEach((light, index) => {
        if (currentGear >= index + 1) {
            light.classList.add('active');
        } else {
            light.classList.remove('active');
        }
    })
}

// 清除所有旋转相关类名
function clearAllSpeedClass() {
    bladeBox.classList.remove('speed-1','speed-2','speed-3','speed-4','speed-5','slow-stop');
}

// 更新扇叶旋转速度（正常开机转动）
function updateBladeSpeed() {
    clearAllSpeedClass();
    if (isPowerOn) {
        bladeBox.classList.add(`speed-${currentGear}`);
    }
}

// 关机减速函数
function fanSlowStop() {
    clearTimeout(slowTimer);
    clearAllSpeedClass();
    // 开启缓慢减速动画
    bladeBox.classList.add('slow-stop');
    // 减速动画时长2秒，播放完毕彻底清除动画
    slowTimer = setTimeout(() => {
        clearAllSpeedClass();
    }, 2000);
}

// 电源按钮：开关机
powerBtn.addEventListener('click', () => {
    clearTimeout(slowTimer);
    if (!isPowerOn) {
        // 开机
        isPowerOn = true;
        currentGear = 1;
        updateLight();
        updateBladeSpeed();
    } else {
        // 关机：执行缓慢减速
        isPowerOn = false;
        currentGear = 0;
        updateLight();
        fanSlowStop();
    }
})

// 调速按钮点击
speedBtn.addEventListener('click', () => {
    // 关机状态点击直接开机1档
    if (!isPowerOn) {
        isPowerOn = true;
        currentGear = 1;
    } else {
        // 开机循环切换档位
        currentGear += 1;
        if (currentGear > 5) currentGear = 1;
    }
    clearTimeout(slowTimer);
    updateLight();
    updateBladeSpeed();
})