const canvas = document.getElementById("myCanvas")

canvas.height = window.innerHeight
canvas.width = 300


const ctx = canvas.getContext("2d")

const car = new Car(200, 200, 40, 80)
car.render(ctx)


function animate() {
    car.update()
    canvas.height = window.innerHeight
    car.render(ctx)
    requestAnimationFrame(animate)
}


animate()
