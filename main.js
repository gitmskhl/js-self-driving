const CANVAS_WIDTH = 300
const LANECOUNT = 4
const CARWIDTH = CANVAS_WIDTH / LANECOUNT / 1.9

const N_CARS = 1

const carCanvas = document.getElementById("carCanvas")
carCanvas.height = window.innerHeight
carCanvas.width = CANVAS_WIDTH


const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.height = window.innerHeight
networkCanvas.width = CANVAS_WIDTH * 1.2

const carCtx = carCanvas.getContext("2d")

const networkCtx = networkCanvas.getContext("2d")

const road = new Road(carCanvas.width / 2, carCanvas.width * .9, laneCount = LANECOUNT)

const cars = generateCars(N_CARS)

let currentBest = 0

let bestCar = cars[0]
let lastBestCar = cars[0]

if (localStorage.getItem("bestBrain")) {

    for (let i = 0; i < cars.length; ++i) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        )
        if (i !== 0)
            NeuralNetwork.mutate(cars[i].brain, .2)
    }
}

const traffic = [

]

for (let i = 0; i < 20; ++i) {
    traffic.push(
        new Car(road.getLaneCenter(parseInt(Math.random() * 4)), -(i + 1) * 150, CARWIDTH, CARWIDTH * 2, "DUMMY", 4)
    )
}

let camera = 0

function save() {
    if (localStorage.getItem("bestBrain")) {
        const oldBest = JSON.parse(localStorage.getItem("bestBrain"))
        NeuralNetwork.mean(bestCar.brain, oldBest)
    }
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain)
    )
}

function discard() {
    localStorage.removeItem("bestBrain")
}

function generateCars(N) {
    const cars = []
    for (let i = 1; i <= N; ++i) {
        cars.push(new Car(road.getLaneCenter(1), 100, CARWIDTH, CARWIDTH * 2, "AI", 6))
    }
    return cars
}

function animate() {
    for (let traffic_car of traffic) {
        traffic_car.update(road.borders, [])
    }

    for (let c of cars)
        c.update(road.borders, traffic)

    carCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight

    bestCar = cars.find(
        c => c.y === Math.min(...cars.map(c => c.y))
    )

    if (bestCar === lastBestCar) currentBest += 1
    else currentBest = 0
    
    lastBestCar = bestCar

    camera += (bestCar.y - carCanvas.height * .8 - camera) / 10

    road.render(carCtx, camera)

    for (let traffic_car of traffic)
        traffic_car.render(carCtx, camera)

    carCtx.globalAlpha = .2
    for (let c of cars) {
        if (c !== bestCar)
            c.render(carCtx, camera)
    }
    carCtx.globalAlpha = 1
    bestCar.render(carCtx, camera, true)

    Visualizer.drawNetwork(networkCtx, bestCar.brain)
    requestAnimationFrame(animate)
}


animate()
