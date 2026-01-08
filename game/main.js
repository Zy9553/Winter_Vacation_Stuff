const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const key = {};
const fireInterval = 100;
let lastShoot = 0;


window.addEventListener("keydown", e=>{
    key[e.code] = true;
});


window.addEventListener("keyup", e=>{
    key[e.code] = false;
});

function update(){
    const now = performance.now();
    player.vx = 0;
    if(key["KeyD"] && player.x + player.width < canvas.width ) {
        player.vx += player.speed
        player.facing = true;
    };
    if(key["KeyA"] && player.x > 0) {
        player.vx += -player.speed;
        player.facing = false;
    }
    
    if(key["KeyW"] && player.onGround){
        player.vy = -player.jump;
        player.onGround = false;
    }

    if(key["KeyS"] && !player.onGround){
        player.vy += gravity;
    }

    if(key["KeyJ"] && now-lastShoot > fireInterval){
        SpawnBullet(player);
        lastShoot = now;
    }

    UpdateBullets(canvas);
    apply(player);
}



function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, ground, canvas.width, 5);

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    renderBullets(ctx);
}

function gameLoop(){
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();