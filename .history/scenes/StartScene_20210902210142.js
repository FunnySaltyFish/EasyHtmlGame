const introduction = `Welcome
Use arrow keys to control the character , your target is to collect the stars and avoid 
`

let StartScene = new Phaser.Class({
    Extends: Phaser.Scene,
    // 在整个工程中只会执行一次
    // initialize: function BootScene() {

    //     // Phaser.Scene.call(this, {
    //     //     key: SCENE_START,
    //     //     active: false // listening resize event;
    //     // });

    // },
    // 每次调用场景SceneA会执行一次;
    init: function () {
    },
    preload:function(){
        this.load.image("sky", "assets/sky.png");
    },
    create:function(){
        
        this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, "sky");
        // 1. 从SCENEA emit gameCountDown事件,传送 {countDown:10} 对象到场景B sceneB
        //this.events.emit('gameCountDown',{countDown:10}); //* 事件KEY=>gameCountDown

        // 2.start方法传送
        //this.scene.start('sceneB',{countDown:10}) //* 场景KEY=> sceneB
    },
});