const CANVAS_WIDTH = 300
const LANECOUNT = 4
const CARWIDTH = CANVAS_WIDTH / LANECOUNT / 1.9

const canvas = document.getElementById("myCanvas")

canvas.height = window.innerHeight
canvas.width = CANVAS_WIDTH


const ctx = canvas.getContext("2d")

const road = new Road(canvas.width / 2, canvas.width * .9, laneCount=LANECOUNT)
const car = new Car(road.getLaneCenter(2), 200, CARWIDTH, CARWIDTH * 2, "KEYS", 5)
const traffic = [
    new Car(road.getLaneCenter(1), -100, CARWIDTH, CARWIDTH * 2, "DUMMY")
]

let camera = 0


function animate() {
    for (let traffic_car of traffic)
    {
        traffic_car.update(road.borders, [])
    }

    car.update(road.borders, traffic)
    canvas.height = window.innerHeight

    camera = car.y - canvas.height * .8

    road.render(ctx, camera)

    for (let traffic_car of traffic)
        traffic_car.render(ctx, camera)
    
    car.render(ctx, camera)
    requestAnimationFrame(animate)
}


animate()
