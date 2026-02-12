/* game.js */

// キーボード操作のイベントリスナー (PC用)
window.addEventListener('keydown', e => {
    if(e.key==='ArrowUp') input.setDir(0); 
    if(e.key==='ArrowDown') input.setDir(2);
    if(e.key==='ArrowLeft') input.setDir(3); 
    if(e.key==='ArrowRight') input.setDir(1);
    if(e.key==='z' || e.key==='Enter') input.setAction();
});

window.addEventListener('keyup', e => {
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) input.stopDir();
});

// ゲームの状態更新 (毎フレーム実行)
function update() {
    const p = state.player;
    const mapData = maps[state.currentMapKey].data;
    
    let dx=0, dy=0;
    if(input.dir === 0) dy = -CFG.SPEED;
    if(input.dir === 2) dy = CFG.SPEED;
    if(input.dir === 3) dx = -CFG.SPEED;
    if(input.dir === 1) dx = CFG.SPEED;

    // 移動処理
    if(dx!==0 || dy!==0) {
        p.moving = true;
        p.anim = (p.anim + 0.2) % 4;
        
        const margin = 10;
        const nextX = p.x + dx;
        const nextY = p.y + dy;
        
        // 歩行可能かチェックする関数
        const checkWalk = (x, y) => {
            let tx = Math.floor(x/CFG.TILE);
            let ty = Math.floor(y/CFG.TILE);
            
            // マップ範囲外チェック
            if(ty<0 || ty>=CFG.MAP_H) return false;
            
            // マップ切り替え判定 (左右の端)
            if(tx < 0) { // 左へ抜ける
                if(state.currentMapKey === 'wild') {
                    changeMap('city', CFG.MAP_W-2, 15);
                    return false; 
                }
                return false;
            }
            if(tx >= CFG.MAP_W) { // 右へ抜ける
                if(state.currentMapKey === 'city') {
                    changeMap('wild', 1, 15);
                    return false;
                }
                return false;
            }
            
            let tid = mapData[ty][tx];
            return TILE_INFO[tid] ? TILE_INFO[tid].walk : false;
        };

        // プレイヤーの四隅(実際は左上と右下)が歩けるなら移動確定
        if(checkWalk(nextX+margin, nextY+margin) && 
           checkWalk(nextX+CFG.TILE-margin, nextY+CFG.TILE-margin)) {
            p.x = nextX; p.y = nextY;
        }
    } else {
        p.moving = false;
    }

    // カメラ位置更新 (プレイヤー中心)
    state.camera.x = Math.max(0, Math.min(p.x - CFG.SCR_W/2, CFG.MAP_W*CFG.TILE - CFG.SCR_W));
    state.camera.y = Math.max(0, Math.min(p.y - CFG.SCR_H/2, CFG.MAP_H*CFG.TILE - CFG.SCR_H));

    // アクションボタン判定
    if(input.action) {
        checkEvent();
        input.action = false;
    }
}

// イベントチェック (何かあるか調べる)
function checkEvent() {
    const p = state.player;
    // プレイヤーの中心座標
    const cx = p.x + CFG.TILE/2;
    const cy = p.y + CFG.TILE/2;
    // タイル座標
    const tx = Math.floor(cx/CFG.TILE);
    const ty = Math.floor(cy/CFG.TILE);
    
    const mapData = maps[state.currentMapKey].data;
    const tid = mapData[ty][tx];
    
    const msg = document.getElementById('msg-box');
    let text = "";
    
    if(tid === T.SHOP) text = "コンビニだ。棚にはエナジードリンクしかない。";
    else if(tid === T.OFFICE) text = "ここが職場だ。入りたくない。帰りたくなってきた。";
    else if(tid === T.CAMP) text = "ソロキャンプの聖地だ。焚き火を見て心を無にしよう。";
    else if(state.currentMapKey === 'city') text = "コンクリートの匂いがする。";
    else if(state.currentMapKey === 'wild') text = "マイナスイオンを感じる。";
    
    if(text) {
        msg.style.display = 'block';
        msg.innerHTML = text;
        setTimeout(() => msg.style.display = 'none', 3000);
    }
}

// 描画処理 (毎フレーム実行)
const ctx = document.getElementById('gameCanvas').getContext('2d');
ctx.imageSmoothingEnabled = false;

function draw() {
    // 画面クリア
    ctx.fillStyle = '#000'; 
    ctx.fillRect(0, 0, CFG.SCR_W, CFG.SCR_H);
    
    const mapData = maps[state.currentMapKey].data;
    const cam = state.camera;
    
    // 描画範囲の計算 (画面に見えている範囲だけ描画)
    const sx = Math.floor(cam.x / CFG.TILE);
    const sy = Math.floor(cam.y / CFG.TILE);
    const ex = sx + (CFG.SCR_W / CFG.TILE) + 1;
    const ey = sy + (CFG.SCR_H / CFG.TILE) + 1;

    // 1. マップ描画
    for(let y=sy; y<=ey; y++) {
        for(let x=sx; x<=ex; x++) {
            if(y>=0 && y<CFG.MAP_H && x>=0 && x<CFG.MAP_W) {
                let tid = mapData[y][x];
                let px = Math.floor(x*CFG.TILE - cam.x);
                let py = Math.floor(y*CFG.TILE - cam.y);
                
                // 画像アセットがあるか、色塗りか
                if(tid === T.ROAD) ctx.drawImage(Sprites.road, px, py);
                else if(tid === T.BUILD) ctx.drawImage(Sprites.build, px, py);
                else if(tid === T.SHOP) { 
                    ctx.fillStyle='#ff9800'; ctx.fillRect(px,py,CFG.TILE,CFG.TILE); 
                    ctx.fillStyle='white'; ctx.fillText('7', px+15, py+30); 
                }
                else if(tid === T.TREE) ctx.drawImage(Sprites.tree, px, py);
                else if(tid === T.GRASS) ctx.drawImage(Sprites.grass, px, py);
                else if(tid === T.WATER) ctx.drawImage(Sprites.water, px, py);
                else {
                    ctx.fillStyle = TILE_INFO[tid] ? TILE_INFO[tid].color : '#f0f';
                    ctx.fillRect(px, py, CFG.TILE, CFG.TILE);
                }
            }
        }
    }
    
    // 2. プレイヤー描画
    const px = Math.floor(state.player.x - cam.x);
    const py = Math.floor(state.player.y - cam.y);
    const bob = Math.sin(state.player.anim * Math.PI) * 3; // 歩くとき上下に揺れる
    
    // 影
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath(); ctx.ellipse(px+24, py+40, 14, 6, 0, 0, Math.PI*2); ctx.fill();
    
    // 体
    ctx.fillStyle = '#1565c0'; // 青い服
    ctx.fillRect(px+10, py+30+bob, 28, 16);
    
    // 顔
    ctx.fillStyle = '#ffcc80'; // 肌色
    ctx.fillRect(px+12, py+10+bob, 24, 20);
    
    // 目 (向きによって位置を変える)
    ctx.fillStyle = '#000';
    if(state.player.dir === 3) { // 左向き
        ctx.fillRect(px+12, py+16+bob, 4, 4);
    } else if(state.player.dir === 1) { // 右向き
        ctx.fillRect(px+32, py+16+bob, 4, 4);
    } else { // 正面・背面
        ctx.fillRect(px+16, py+16+bob, 4, 4);
        ctx.fillRect(px+28, py+16+bob, 4, 4);
    }
}

// メインループ
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// 起動時処理
window.onload = () => {
    initGraphics(); // 画像生成
    maps.city.data = generateCityMap(); // 街生成
    maps.wild.data = generateWildMap(); // 森生成
    document.getElementById('loc-name').innerText = maps.city.name;
    loop(); // ゲーム開始
};
