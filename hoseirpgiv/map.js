/* map.js */

// 街マップ生成
function generateCityMap() {
    const m = [];
    for(let y=0; y<CFG.MAP_H; y++) {
        let row = [];
        for(let x=0; x<CFG.MAP_W; x++) {
            let id = T.BUILD;
            if(x % 6 === 0 || y % 6 === 0) id = T.ROAD;
            if(x===0 || y===0 || y===CFG.MAP_H-1) id = T.BUILD;
            // 右端は「森への入り口」
            if(x === CFG.MAP_W-1 && y > 10 && y < 20) id = T.ROAD;
            row.push(id);
        }
        m.push(row);
    }
    m[6][3] = T.SHOP;
    m[12][12] = T.OFFICE;
    return m;
}

// 森マップ生成
function generateWildMap() {
    const m = [];
    for(let y=0; y<CFG.MAP_H; y++) {
        let row = [];
        for(let x=0; x<CFG.MAP_W; x++) {
            let r = Math.random();
            let id = T.GRASS;
            if(r < 0.2) id = T.TREE;
            else if(r < 0.25) id = T.WATER;
            // 左端は「街への入り口」
            if(x === 0 && y > 10 && y < 20) id = T.GRASS;
            if(y===0 || y===CFG.MAP_H-1 || x===CFG.MAP_W-1) id = T.TREE;
            row.push(id);
        }
        m.push(row);
    }
    m[15][25] = T.CAMP;
    return m;
}

// マップ切り替え処理
function changeMap(mapKey, startX, startY) {
    state.currentMapKey = mapKey;
    state.player.x = startX * CFG.TILE;
    state.player.y = startY * CFG.TILE;
    
    const locName = document.getElementById('loc-name');
    if(locName) {
        locName.innerText = maps[mapKey].name;
    }
}
