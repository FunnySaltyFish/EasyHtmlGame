class WinScene extends Phaser.Scene{
    // 在整个工程中只会执行一次
    constructor(){
        super({
            key:SCENE_WIN //与类名一致
        })
        this.game = this
    }
    init(data){
        this.score = data.score
    }
    preload(){
        this.load.image("sky", "assets/sky.png");
        this.load.image("btn","assets/replay.png")
        this.load.image("jump","assets/jump_out.png")
    }
    create(){
        
        this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, "sky");
        let text = this.add.text(0,0, "YOU WIN!", {
            fontSize: "36px",
            fill: "#ffeb3b",
            align : "center",
            fontFamily:fontFamily,
            stroke: "#000",
            strokeThickness: 3
        });
        text.setX((GAME_WIDTH-text.width)/2);
        text.setY((GAME_HEIGHT-text.height)/2 - 100);

        let score = this.add.text(0,0, "Your Score : " + this.score, {
            fontSize: "24px",
            fill: "#fff",
            align : "center",
            fontFamily:fontFamily,
            stroke: "#000",
            strokeThickness: 3
        });
        score.setX((GAME_WIDTH-score.width)/2);
        score.setY((GAME_HEIGHT-score.height)/2);

        // this.add.text(GAME_WIDTH/2-295,GAME_HEIGHT/2,"---CLICK TO START---",{
        //     fontFamily : fontFamily,
        //     fontSize : "48px",
        //     //textAlign : "center",
        //     align : "center"
        // })

        let btn = this.add.sprite(0, 0, 'btn').setInteractive();
        resetToCenter(btn,0,100)
        //开启元件点击监听，并添加监听事件
        
        btn.once('pointerdown', (pointer)=> {
            btn.setTint(0xff0000);
            setTimeout(()=>{
                this.scene.start(SCENE_START)
            },200)
        });
    
        btn.once('pointerout', function (pointer) {
            this.clearTint();
        });
    
        btn.once('pointerup', function (pointer) {
            this.clearTint();
        });
        
        let jump = this.add.sprite(0, 0, 'jump').setInteractive();
        jump.setPosition(GAME_WIDTH-jump.width,jump.height,24,24);
        jump.setTint(0x9e9e9e)
        //开启元件点击监听，并添加监听事件
        
        jump.once('pointerdown', (pointer)=> {
            jump.setTint(0x000000);
            setTimeout(()=>{
                
            },200)
        });
    
        jump.once('pointerout', function (pointer) {
            this.clearTint();
        });
    
        jump.once('pointerup', function (pointer) {
            this.clearTint();
        });
    }
}

function resetToCenter(element,xOffset=0,yOffset=0){
    element.setX((GAME_WIDTH) / 2+xOffset);
    element.setY((GAME_HEIGHT) / 2+yOffset);
}