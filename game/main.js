const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const key = {};


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
        player.vx = player.speed;
        player.facing = true;
    };
    if(key["KeyA"] && player.x > 0) {
        player.vx = -player.speed;
        player.facing = false;
    }
    
    if(key["KeyW"] && (player.onGround || player.doublejump) && now - lastJumpP1 > jumpInterval){
        player.vy = -player.jump;
        //player.onGround = false;
        if(player.onGround) player.onGround = false;
        else player.doublejump = false;
        lastJumpP1 = now;
    }

    if (key["KeyS"] && player.onGround && (player.y + player.height < ground)) {
        player.dropDown = true;
        player.onGround = false; 
        player.y += 1;
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

    if (key["ArrowDown"] && player2.onGround && (player2.y + player2.height < ground)) {
        player2.dropDown = true;
        player2.onGround = false; 
        player2.y += 1;
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
    ctx.fillRect(platform.x, platform.y, platform.w, 5);

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "green";
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    ctx.fillText(`P1 HP: ${player.hp}`, 20, 30);
    ctx.fillText(`P2 HP: ${player2.hp}`, canvas.width - 120, 30);

    renderBullets(ctx);
}

function gameLoop(){
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();