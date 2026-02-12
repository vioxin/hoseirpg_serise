/* data.js */

// 設定
const CFG = { TILE: 48, SCR_W: 800, SCR_H: 600, MAP_W: 40, MAP_H: 30, SPEED: 5 };

// タイルID (室内用などを追加)
const T = {
    GRASS: 0, WATER: 1, TREE: 2,
    ROAD: 3,  BUILD: 4, OFFICE: 5,
    SHOP: 10, CAMP: 11,
    // --- 追加分 ---
    HOME: 20,     // 自宅外観
    FLOOR: 21,    // 床
    WALL_IN: 22,  // 室内壁
    BED: 23,      // ベッド
    TABLE: 24,    // 机
    EXIT: 99      // 出口
};

// タイル情報
const TILE_INFO = {
    [T.GRASS]: { color: '#4caf50', walk: true },
    [T.WATER]: { color: '#2196f3', walk: false },
    [T.TREE]:  { color: '#2e7d32', walk: false }, // 木の下半分を判定なしにするためwalkはfalseのまま(game.jsで制御)
    [T.ROAD]:  { color: '#757575', walk: true },
    [T.BUILD]: { color: '#546e7a', walk: false },
    [T.OFFICE]:{ color: '#37474f', walk: false },
    [T.SHOP]:  { color: '#ff9800', walk: false },
    [T.CAMP]:  { color: '#8bc34a', walk: false },
    // 追加分
    [T.HOME]:  { color: '#795548', walk: false },
    [T.FLOOR]: { color: '#d7ccc8', walk: true },
    [T.WALL_IN]:{color: '#5d4037', walk: false },
    [T.BED]:   { color: '#ef5350', walk: true }, // ベッドには乗れる
    [T.TABLE]: { color: '#8d6e63', walk: false },
    [T.EXIT]:  { color: '#000',    walk: true }
};

// マップデータ
const maps = {
    city: { data: [], name: "第13ブラック市街", type: "out" },
    wild: { data: [], name: "現実逃避の森", type: "out" },
    // 室内マップ定義
    home: { data: [], name: "マイホーム(1K)", type: "in" },
    shop_in: { data: [], name: "コンビニ店内", type: "in" },
    office_in: { data: [], name: "弊社オフィス", type: "in" }
};

// プレイヤー情報 (ステータス追加)
const state = {
    currentMapKey: 'city',
    // 建物を出た時に戻る場所
    lastMapKey: 'city',
    lastX: 300, lastY: 300,
    
    player: { 
        x: 300, y: 300, dir: 2, moving: false, anim: 0,
        // ステータス
        hp: 100, maxHp: 100,
        mp: 20, maxMp: 20,
        str: 5, men: 3, money: 1000
    },
    camera: { x: 0, y: 0 },
    isMenuOpen: false
};

const input = {
    dir: -1, action: false,
    setDir: d => input.dir = d,
    stopDir: () => input.dir = -1,
    setAction: () => input.action = true,
    stopAction: () => input.action = false
};
