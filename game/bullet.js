const bullets = [];
const bulletSpeed = 5;
const bulletCoolDown = 10;
let lastHurtP1 = 0;
let lastHurtP2 = 0;

function SpawnBullet(player){
    const startX = player.facing ? player.x + player.width : player.x;
    const startY = player.y + player.height/2;
    if(player.facing){
        bullets.push({
            x: startX,
            y: startY,
            width: 4,
            height: 4,
            vx: bulletSpeed,
            vy: 0,
            owner: player.id,
        });
    }else{
        bullets.push({
            x: startX,
            y: startY,
            width: 4,
            height: 4,
            vx: -bulletSpeed,
            vy: 0,
            owner: player.id,
        });
    }
    console.log("bullet length: ", bullets.length);
}

function UpdateBullets(canvas){
    for(const b of bullets){
        b.x += b.vx;
        b.y += b.vy;
    }

    for(let i = bullets.length-1; i>=0; i--){
        if(bullets[i].x < -10 || bullets[i].x > canvas.width + 10){
            bullets.splice(i, 1);
        }
    }
}

function renderBullets(ctx){
    console.log("drawBullets");
    ctx.fillStyle = "red";
    for(const b of bullets){
        ctx.fillRect(b.x, b.y, b.width, b.height);
    }
}