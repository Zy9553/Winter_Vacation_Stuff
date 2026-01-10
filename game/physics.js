const gravity = 0.5;
const ground = 700; // 主地板高度
const fireInterval = 100;
const jumpInterval = 250;
let lastShootP1 = 0;
let lastShootP2 = 0;
let lastJumpP1 = 0;
let lastJumpP2 = 0;

const platform = {
    x: 400,
    y: 550,
    w: 300
};

function isCollide(a, b){
    return (a.x+a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height);
}

function apply(player) {
    player.vy += gravity;
    player.x += player.vx;
    player.y += player.vy;

    if (player.y + player.height >= ground) {
        player.y = ground - player.height;
        player.vy = 0;
        player.onGround = true;
        player.doublejump = true;
        player.dropDown = false;
        return; 
    }

    const onPlatformX = player.x + player.width > platform.x && player.x < platform.x + platform.w;
    
    const isFalling = player.vy >= 0;
    const footAtPlatform = player.y + player.height >= platform.y;
    const prevFootAbovePlatform = (player.y + player.height - player.vy) <= platform.y;

    if (onPlatformX && isFalling && footAtPlatform && prevFootAbovePlatform && !player.dropDown) {
        player.y = platform.y - player.height;
        player.vy = 0;
        player.onGround = true;
        player.doublejump = true;
        return;
    }

    player.onGround = false;

    if (player.dropDown && player.y > platform.y) {
        player.dropDown = false;
    }
}