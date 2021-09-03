class FailureScene extends Phaser.Scene{
    // 在整个工程中只会执行一次
    constructor(){
        super({
            key:SCENE_FAILURE //与类名一致
        })
        this.game = this
    }
    
    preload(){
        this.load.image("sky", "assets/sky.png");
        this.load.image("reStartBtn","assets/start_game.png")
    }
    create(){
        
        this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, "sky");
        let text = this.add.text(0,0, "YOU FAIL", {
            fontSize: "24px",
            fill: "#fff",
            align : "center",
            fontFamily:fontFamily,
            stroke: "#f00",
            strokeThickness: 3
        });
        text.setX((GAME_WIDTH-text.width)/2);
        text.setY((GAME_HEIGHT-text.height)/2 - 100);

        // this.add.text(GAME_WIDTH/2-295,GAME_HEIGHT/2,"---CLICK TO START---",{
        //     fontFamily : fontFamily,
        //     fontSize : "48px",
        //     //textAlign : "center",
        //     align : "center"
        // })

        let reStartBtn = this.add.sprite(0, 0, 'reStartBtn').setInteractive();
        resetToCenter(reStartBtn,0,100)
        //开启元件点击监听，并添加监听事件
        
        reStartBtn.on('pointerdown', function (pointer) {
            this.setTint(0x00ff00);
            //console.log("clicked");
            game.scene.start(SCENE_GAME)
        });
    
        reStartBtn.on('pointerout', function (pointer) {
            this.clearTint();
        });
    
        reStartBtn.on('pointerup', function (pointer) {
            this.clearTint();
        });
        // 1. 从SCENEA emit gameCountDown事件,传送 {countDown:10} 对象到场景B sceneB
        //this.events.emit('gameCountDown',{ountDown:10}); //* 事件KEY=>gameCountDown

        // 2.start方法传送
        //this.scene.start('sceneB',{countDown:10}) //* 场景KEY=> sceneB
    }
}


function resetToCenter(element,xOffset=0,yOffset=0){
    element.setX((GAME_WIDTH) / 2+xOffset);
    element.setY((GAME_HEIGHT) / 2+yOffset);
}