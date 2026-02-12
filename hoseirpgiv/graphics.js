/* graphics.js */

const Sprites = {};

// キャンバス上にドット絵パーツを生成する関数
function createAsset(key, color, pattern) {
    const c = document.createElement('canvas');
    c.width = CFG.TILE; c.height = CFG.TILE;
    const ctx = c.getContext('2d');
    
    // 背景色塗りつぶし
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, CFG.TILE, CFG.TILE);
    
    // 模様の描画
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    
    if(pattern === 'brick') { // ビルや壁のレンガ模様
        for(let i=0; i<4; i++) ctx.fillRect(0, i*12, 48, 2);
        for(let i=0; i<4; i++) ctx.fillRect(i*12 + (i%2)*6, 0, 2, 48);
    } 
    else if(pattern === 'tree') { // 木の葉っぱ
        ctx.fillStyle = '#1b5e20';
        ctx.beginPath(); ctx.arc(24, 24, 16, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#2e7d32';
        ctx.beginPath(); ctx.arc(24, 20, 12, 0, Math.PI*2); ctx.fill();
    } 
    else if(pattern === 'road') { // 道路の白線
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(10, 10, 28, 28);
    }
    
    Sprites[key] = c;
}

// 全てのアセットを初期化
function initGraphics() {
    createAsset('grass', '#4caf50', null);
    createAsset('water', '#2196f3', null);
    createAsset('tree',  '#4caf50', 'tree');
    createAsset('road',  '#616161', 'road');
    createAsset('build', '#607d8b', 'brick');
}
