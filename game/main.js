const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const key = {};

window.addEventListener("keydown", e=>{
    key[e.code] = true;
});


window.addEventListener("keyup", e=>{
    key[e.code] = false;
});

function move(){
    player.vx = 0;
    if(key["KeyD"] && player.x + player.width < canvas.width ) player.vx += player.speed;
    if(key["KeyA"] && player.x > 0) player.vx += -player.speed;
    
    if(key["KeyW"] && player.onGround){
        player.vy = -player.jump;
        player.onGround = false;
    }

    if(key["KeyS"] && !player.onGround){
        player.vy += gravity;
    }
    apply(player);
}

function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, ground, canvas.width, 5);

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop(){
    move();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();