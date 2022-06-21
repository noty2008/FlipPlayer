# FlipPlayer
## 概要
画像をパラパラ漫画やスライドのように表示できるJavaScript用ライブラリです。

## 特徴
・クリックやキーボード入力などによる自由な画像切替

・時間指定による自動での画像切替

・画像終了時にリプレイorリンク移動

・ES5準拠

・jQuery未使用

・背景画像の設定

・コールバック関数を用いた細かい挙動変更

## 記述サンプル
```html 
<div id="flip" onclick="flip.next()"></div>
<button onclick="flip.prev().stop()">Prev</button>
<button onclick="flip.stop()">Stop</button>
<button onclick="flip.reset()">Reset</button>
<script src="FlipPlayer.js"></script>
<script>
var f = 80;            //1フレーム当たりの時間[ms]
var flip = new FlipPlayer(
    "flip",            //対象となるdiv要素のid名
    //以下再生される画像の配列
    //1画像の情報は [画像パス, 画像当たりの表示時間]
    //または"for"～"next"によるループ構文を使用可能
    //多重ループには対応しない
    //ループ開始: ["for", ループ回数]
    //ループ終了: ["next"]
    [
        ["flipStart.png", 0],
        ["000.png", f*10],
        ["for", 5],    // ループ開始
        ["001.png", f*30],
        ["002.png", f*30],
        ["next"],      // ループ終了
        ["003.png", f*40],
        ["004.png", f*25],
        ["flipEnd.png", 0]
    ],
    {
        //終了時にジャンプする場合URL。nullの時リプレイする。
        jumpURL: "https://noty2008.github.io",
        //背景画像を指定する。
        background: "bg.png",
        //サイズ拡大時のアンチエイリアスを無効にする。
        isPixelated: true,
        //画像切替時に任意の操作を行う関数を与える。
        callback: function(flip, frames){
            console.log(flip.index + frames[flip.index][0]);
        },
        //キーイベントを設定。
        //オブジェクトを与えると有効になる。
        //あらかじめ、対象となるキー(○○Keys)とアクション(on○○Keys)が
        //デフォルトで与えられている。
        //これは上書きして変更できる。
        //キーかアクションのどちらかにnullを与えると該当するキーイベントは無効化される。
        //onNextKeys,onPrevKeys,onStopKeys,onResetKeysは"keyup"であるが、
        //onSkipKeysのみ"keydown"となっている。
        keyEvents: {
            nextKeys: ["z","Z"," ","Spacebar","ArrowRight","Right"],
            onNextKeys: flip.next,
            onPrevKeys: null
        }
    }
);
</script>
```

## API
### オブジェクト生成
```js
var flip = new FlipPlayer(
    id :string,
    frames :[frame :string, ms :number][],
    {
        jumpURL :string,
        background :string,
        isPixelated :boolean = true,
        callback :Function(
            flip :FlipPlayer,
            flames :[frame :string, ms :number][]
        ),
        keyEvents: {
            nextKeys :string[] = ["z","Z"," ","Spacebar","Enter","ArrowRight","Right"],
            onNextKeys :Function() = flip.next,
            skipKeys :string[] = ["x","X"],
            onSkipKeys :Function() = flip.next,
            prevKeys :string[] = ["Backspace","ArrowLeft","Left"],
            onPrevKeys :Function() = ()=>flip.prev().stop(),
            stopKeys: string[] = ["p","P","ArrowDown","Down"],
            onStopKeys :Function() = flip.stop,
            resetKeys :string[] = ["t","T","Escape","Esc","ArrowUp","Up"],
            onResetKeys :Function() = flip.reset
        }
    }
```
### 次の画像に切り替え
```flip.next() :FlipPlayer```
### 前の画像に切り替え
```flip.prev() :FlipPlayer```
### 画像をリセット
```flip.reset() :FlipPlayer```
### 再生停止
```flip.stop() :FlipPlayer```
### 指定した画像のインデックスへフレームを切り替え
```flip.jump(index :number|string [, isReverse :boolean]) :FlipPlayer```
### 現在の画像のインデックスを切り替え
```flip.setIndex(index :number|string [, isReverse :boolean]) :FlipPlayer```
### 現在の画像のインデックスを取得
```flip.index :number```
### フレーム全体の枚数を取得
```flip.count :number```


