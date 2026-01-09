const gravity = 0.5;
const ground = 700;
//ground 是主地板 ground2是平台

const groundY2 = 550;
const groundX2 = 400;
function apply(player){
    player.vy += gravity;
    player.x += player.vx;
    player.y += player.vy;
    if(player.y + player.height >= ground){
        player.y = ground - player.height;
        player.vy = 0;
        player.onGround = true;
        player.doublejump = true;
        player.dropDown = false;
        return;
    }

    const onPlatformX = player.x + player.width > groundX2 && player.x < groundX2 + canvas.width/2;
    const touchAbove = player.vy >=0 && player.y + player.height >= groundY2 && player.y + player.height - player.vy < groundY2;
    if(onPlatformX && touchAbove && !player.dropDown){
        player.y = groundY2 - player.height;
        player.vy = 0;
        player.onGround = true;
        player.doublejump = true;
        player.dropDown = false;
        return;
    }

    player.onGround = false;

    if (player.dropDown && player.y + player.height < groundY2 - 2) {
    player.dropDown = false;
    }
}

