/* map.js */

// 街マップ
function generateCityMap() {
    const m = [];
    for(let y=0; y<CFG.MAP_H; y++) {
        let row = [];
        for(let x=0; x<CFG.MAP_W; x++) {
            let id = T.BUILD;
            if(x % 6 === 0 || y % 6 === 0) id = T.ROAD;
            if(x===0 || y===0 || y===CFG.MAP_H-1) id = T.BUILD;
            if(x === CFG.MAP_W-1 && y > 10 && y < 20) id = T.ROAD;
            row.push(id);
        }
        m.push(row);
    }
    // 施設配置
    m[6][3] = T.SHOP;     // コンビニ
    m[12][12] = T.OFFICE; // オフィス
    m[18][6] = T.HOME;    // ★自宅を追加
    
    // 他の住宅をランダム配置
    for(let i=0; i<10; i++) {
        let rx = Math.floor(Math.random()*(CFG.MAP_W-2))+1;
        let ry = Math.floor(Math.random()*(CFG.MAP_H-2))+1;
        if(m[ry][rx] === T.BUILD) m[ry][rx] = T.HOME; 
    }
    return m;
}

// 森マップ
function generateWildMap() {
    const m = [];
    for(let y=0; y<CFG.MAP_H; y++) {
        let row = [];
        for(let x=0; x<CFG.MAP_W; x++) {
            let r = Math.random();
            let id = T.GRASS;
            if(r < 0.2) id = T.TREE;
            else if(r < 0.25) id = T.WATER;
            if(x === 0 && y > 10 && y < 20) id = T.GRASS;
            if(y===0 || y===CFG.MAP_H-1 || x===CFG.MAP_W-1) id = T.TREE;
            row.push(id);
        }
        m.push(row);
    }
    m[15][25] = T.CAMP;
    return m;
}

// ★室内マップ生成 (汎用)
function generateRoom(w, h, type) {
    const m = [];
    for(let y=0; y<h; y++) {
        let row = [];
        for(let x=0; x<w; x++) {
            let id = T.FLOOR;
            // 壁
            if(y===0 || y===h-1 || x===0 || x===w-1) id = T.WALL_IN;
            // 出口 (下側中央)
            if(y===h-1 && x===Math.floor(w/2)) id = T.EXIT;
            row.push(id);
        }
        m.push(row);
    }
    
    // 家具配置
    if(type === 'home') {
        m[1][1] = T.BED; m[3][3] = T.TABLE;
    } else if(type === 'office') {
        for(let x=2; x<w-2; x+=2) m[3][x] = T.TABLE; // デスク
        m[1][w-2] = T.BOSS; // 将来用
    } else if(type === 'shop') {
        m[2][2] = T.TABLE; m[2][3] = T.TABLE; // 商品棚
        m[1][w-2] = T.TABLE; // レジ
    }
    return m;
}
