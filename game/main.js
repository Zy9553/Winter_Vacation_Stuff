const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const key = {};
const fireInterval = 100;
const jumpInterval = 250;
let lastShootP1 = 0;
let lastShootP2 = 0;
let lastJumpP1 = 0;
let lastJumpP2 = 0;

window.addEventListener("keydown", e=>{
    key[e.code] = true;
});


window.addEventListener("keyup", e=>{
    key[e.code] = false;
});

function P1(){
    player.vx = 0;
    const now = performance.now();
    if(key["KeyD"] && player.x + player.width < canvas.width ) {
        player.vx += player.speed
        player.facing = true;
    };
    if(key["KeyA"] && player.x > 0) {
        player.vx += -player.speed;
        player.facing = false;
    }
    
    if(key["KeyW"] && (player.onGround || player.doublejump) && now - lastJumpP1 > jumpInterval){
        player.vy = -player.jump;
        //player.onGround = false;
        if(player.onGround) player.onGround = false;
        else player.doublejump = false;
        lastJumpP1 = now;
    }

    const onPlatformP1 = Math.abs(player.y + player.height - groundY2) < 2;
    if (key["KeyS"] && player.onGround && onPlatformP1) {
        player.dropDown = true;
        player.vy = 1;
    }


    if(key["KeyJ"] && now-lastShootP1 > fireInterval){
        SpawnBullet(player);
        lastShootP1 = now;
    }

}

function P2(){
    player2.vx = 0;
    const now = performance.now();
    if(key["ArrowRight"] && player2.x + player2.width < canvas.width ) {
        player2.vx += player2.speed
        player2.facing = true;
    };
    if(key["ArrowLeft"] && player2.x > 0) {
        player2.vx += -player2.speed;
        player2.facing = false;
    }
    
    if(key["ArrowUp"] && (player2.onGround || player2.doublejump) && now - lastJumpP2 > jumpInterval){
        player2.vy = -player2.jump;
        //player.onGround = false;
        if(player2.onGround) player2.onGround = false;
        else player2.doublejump = false;
        lastJumpP2 = now;
    }

    const onPlatformP2 = Math.abs(player2.y + player2.height - groundY2) < 2;
    if (key["ArrowDown"] && player2.onGround && onPlatformP2) {
        player2.dropDown = true;
        player2.vy = 1;
    }


    if(key["Numpad1"] && now-lastShootP2 > fireInterval){
        SpawnBullet(player2);
        lastShootP2 = now;
    }

}

function update(){
    P1();
    P2();
    UpdateBullets(canvas);
    apply(player);
    apply(player2);
}



function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, ground, canvas.width, 5);
    ctx.fillRect(groundX2, groundY2, canvas.width/2, 5);

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "green";
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    renderBullets(ctx);
}

function gameLoop(){
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();