class FloorCollisionBlock {
    constructor({ position }) {
        this.position = position;
        this.width = 16;
        this.height = 16;
    }

    draw() {
        context.fillStyle = 'rgba(255, 0, 0, 0.9)';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(player) {
        this.draw();
            if (player.x < block.x + block.width &&
                player.x + player.width > block.x &&
                player.y < block.y + block.height &&
                player.y + player.height > block.y) {
              player.y = block.y - player.height;
            
        }
    }
}