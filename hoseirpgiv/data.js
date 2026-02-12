/* data.js */

// 基本設定
const CFG = { TILE: 48, SCR_W: 800, SCR_H: 600, MAP_W: 40, MAP_H: 30, SPEED: 5 };

// タイルID定義
const T = {
    GRASS: 0, WATER: 1, TREE: 2,  // 自然系
    ROAD: 3,  BUILD: 4, OFFICE: 5, // 都会系
    SHOP: 10, CAMP: 11, TRANSIT: 99 // イベント
};

// タイル情報（色や通行判定）
const TILE_INFO = {
    [T.GRASS]: { color: '#4caf50', walk: true, name: '草地' },
    [T.WATER]: { color: '#2196f3', walk: false, name: '水' },
    [T.TREE]:  { color: '#2e7d32', walk: false, name: '木' },
    [T.ROAD]:  { color: '#757575', walk: true, name: '道路' },
    [T.BUILD]: { color: '#546e7a', walk: false, name: 'ビル' },
    [T.OFFICE]:{ color: '#37474f', walk: false, name: '会社' },
    [T.SHOP]:  { color: '#ff9800', walk: false, name: '店' },
    [T.CAMP]:  { color: '#8bc34a', walk: false, name: 'テント' }
};

// マップデータ格納オブジェクト
const maps = {
    city: { data: [], name: "第13ブラック市街" },
    wild: { data: [], name: "現実逃避の森" }
};

// ゲームの状態管理
const state = {
    currentMapKey: 'city',
    player: { x: 300, y: 300, dir: 2, moving: false, anim: 0 },
    camera: { x: 0, y: 0 }
};

// 入力状態管理
const input = {
    dir: -1, action: false,
    setDir: d => input.dir = d,
    stopDir: () => input.dir = -1,
    setAction: () => input.action = true,
    stopAction: () => input.action = false
};
