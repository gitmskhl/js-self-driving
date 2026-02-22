class Car {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.speed = 0
        this.acceleration = .2
        this.friction = .05
        this.maxSpeed = 5
        this.angle = 0

        this.controls = new Controls()
        this.sensor = new Sensor(this)
    }

    update(borders) {
        this.#move()
        this.sensor.update(borders)
    }


    #move() {
        if (this.controls.forward) this.speed += this.acceleration
        else if (this.controls.revert) this.speed -= this.acceleration

        this.speed = Math.min(this.speed, this.maxSpeed)
        this.speed = Math.max(this.speed, -this.maxSpeed / 2)

        if (this.speed > 0) this.speed -= this.friction
        else if (this.speed < 0) this.speed += this.friction

        if (Math.abs(this.speed) < this.friction) this.speed = 0

        if (this.controls.left) this.angle += .03
        if (this.controls.right) this.angle -= .03


        this.x -= Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed
    }

    render(ctx, camera) {

        ctx.save()
        ctx.translate(this.x, this.y - camera)
        ctx.rotate(-this.angle)

        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.rect(
            -this.width / 2,
            - this.height / 2,
            this.width,
            this.height
        )

        ctx.fill()
        
        ctx.restore()
        this.sensor.render(ctx, camera)
    }

}
