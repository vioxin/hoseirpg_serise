/* graphics.js */

const Sprites = {};

function createAsset(key, color, pattern) {
    const c = document.createElement('canvas');
    c.width = CFG.TILE; c.height = CFG.TILE;
    const ctx = c.getContext('2d');
    
    // ベース
    ctx.fillStyle = color;
    ctx.fillRect(0,0,CFG.TILE,CFG.TILE);
    
    // 模様
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    
    if(pattern === 'brick') {
        for(let i=0; i<4; i++) ctx.fillRect(0, i*12, 48, 2);
        for(let i=0; i<4; i++) ctx.fillRect(i*12 + (i%2)*6, 0, 2, 48);
    } else if(pattern === 'tree') {
        ctx.fillStyle = '#1b5e20';
        ctx.beginPath(); ctx.arc(24, 24, 16, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#2e7d32';
        ctx.beginPath(); ctx.arc(24, 20, 12, 0, Math.PI*2); ctx.fill();
    } else if(pattern === 'road') {
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(10, 10, 28, 28);
    } 
    // --- 追加分 ---
    else if(pattern === 'home') { // 家のアイコン
        ctx.fillStyle = '#3e2723';
        ctx.beginPath(); ctx.moveTo(24, 5); ctx.lineTo(44, 20); ctx.lineTo(4, 20); ctx.fill(); // 屋根
        ctx.fillRect(10, 20, 28, 28); // 壁
        ctx.fillStyle = '#fff'; ctx.fillRect(20, 30, 8, 18); // ドア
    } else if(pattern === 'bed') { // ベッド
        ctx.fillStyle = '#fff'; ctx.fillRect(5, 5, 38, 10); // 枕
        ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(0, 15, 48, 2); // シワ
    } else if(pattern === 'table') { // 机
        ctx.fillStyle = '#5d4037'; ctx.fillRect(4, 4, 40, 40);
        ctx.fillStyle = '#8d6e63'; ctx.fillRect(8, 8, 32, 32);
    }

    Sprites[key] = c;
}

function initGraphics() {
    createAsset('grass', '#4caf50', null);
    createAsset('water', '#2196f3', null);
    createAsset('tree',  '#4caf50', 'tree');
    createAsset('road',  '#616161', 'road');
    createAsset('build', '#607d8b', 'brick');
    // 追加
    createAsset('home',  '#795548', 'home');
    createAsset('floor', '#d7ccc8', null);
    createAsset('wall_in','#5d4037', 'brick');
    createAsset('bed',   '#ef5350', 'bed');
    createAsset('table', '#8d6e63', 'table');
}
