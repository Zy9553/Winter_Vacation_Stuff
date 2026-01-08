const gravity = 0.6;
const ground = 350;
function apply(player){
    player.vy += gravity;
    player.x += player.vx;
    player.y += player.vy;
    if(player.y + player.height >= ground){
        player.y = ground - player.height;
        player.vy = 0;
        player.onGround = true;
    }else{
        player.onGround = false;
    }
}

