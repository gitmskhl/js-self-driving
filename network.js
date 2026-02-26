class NeuralNetwork {
    constructor (neuronCounts) {
        this.levels = []
        for (let i = 0; i < neuronCounts.length - 1; ++i)
            this.levels.push(
                new Level(neuronCounts[i], neuronCounts[i + 1])
            )
    }

    static feedForward(givenInputs, network) {
        let inputs = givenInputs
        for (let level of network.levels) {
            inputs = Level.feedForward(inputs, level)
        }
        return inputs
    }

    static mutate(network, amount=1) {
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases; ++i) {
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                )
            }
            
            for (let i = 0; i < level.inputs.length; ++i) {
                for (let j = 0; j < level.outputs.length; ++j) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount
                    )
                }
            }
        })
    }

    static mean(network1, network2) {
        for (let i = 0; i < network1.levels.length; ++i)
            Level.mean(network1.levels[i], network2.levels[i])
    }

}

class Level {
    constructor (inputCount, outputCount) {
        this.inputs = new Array(inputCount)
        this.outputs = new Array(outputCount)
        this.biases = new Array(outputCount)
        
        this.weights = []
        for (let i = 0; i < inputCount; ++i)
            this.weights[i] = new Array(outputCount)

        Level.#randomize(this)
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; ++i)
            for (let j = 0; j < level.outputs.length; ++j)
                level.weights[i][j] = Math.random() * 2 - 1
        for (let i = 0; i < level.outputs.length; ++i)
            level.biases[i] = Math.random() * 2 - 1
    }

    static feedForward(givenInput, level) {
        for (let i = 0; i < level.inputs.length; ++i) {
            level.inputs[i] = givenInput[i]
        } 
        for (let j = 0; j < level.outputs.length; ++j) {
            let sum = 0
            for (let k = 0; k < level.inputs.length; ++k)
                sum += givenInput[k] * level.weights[k][j]
    
            level.outputs[j] = sum > level.biases[j] ? 1 : 0
        }
        return level.outputs
    }

    static mean(level1, level2) {
        for (let i = 0; i < level1.biases.length; ++i)
            level1.biases[i] = (level1.biases[i] + level2.biases[i]) / 2
        for (let i = 0; i < level1.inputs.length; ++i)
            for (let j = 0; j < level1.outputs.length; ++j)
                level1.weights[i][j] = (level1.weights[i][j] + level2.weights[i][j]) / 2
    }

}