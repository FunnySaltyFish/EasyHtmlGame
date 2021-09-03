const introduction = `Welcome
Use arrow keys to control the character , your target 
is to collect the stars and avoid being attacked by
bombs. Good luck!
`
const fontFamily = "Comic Sans MS";
class StartScene extends Phaser.Scene{
    // 在整个工程中只会执行一次
    constructor(){
        super({
            key:SCENE_START //与类名一致
        })
    }
    //     // Phaser.Scene.call(this, {
    //     //     key: SCENE_START,
    //     //     active: false // listening resize event;
    //     // });

    // },
    // 每次调用场景SceneA会执行一次;
    
    preload(){
        this.load.image("sky", "assets/sky.png");
        this.load.image("startBtn","assets/start_game.png")
    }
    create(){
        
        this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, "sky");
        let introText = this.add.text(0,0, introduction, {
            fontSize: "24px",
            fill: "#000",
            align : "center",
            fontFamily:fontFamily
        });
        introText.setX((GAME_WIDTH-introText.width)/2);
        introText.setY((GAME_HEIGHT-introText.height)/2 - 100);

        // this.add.text(GAME_WIDTH/2-295,GAME_HEIGHT/2,"---CLICK TO START---",{
        //     fontFamily : fontFamily,
        //     fontSize : "48px",
        //     //textAlign : "center",
        //     align : "center"
        // })

        let startBtn = this.add.sprite(0, 0, 'startBtn').setInteractive();
        resetToCenter(startBtn,0,100)
        //开启元件点击监听，并添加监听事件
        

        startBtn.on('pointerdown', function (pointer) {
            this.setTint(0xff0000);
            console.log("clicked");
        });
    
        startBtn.on('pointerout', function (pointer) {
            this.clearTint();
        });
    
        startBtn.on('pointerup', function (pointer) {
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