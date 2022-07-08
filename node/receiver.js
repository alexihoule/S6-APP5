const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

//var connected = false

client.on('connect', () => {
    client.subscribe('houa2909/connected')
    client.subscribe('houa2909/test')
})

client.on('message', (topic, message) => {
    console.log('received message %s %s', topic, message)
    //console.log(message)
    switch(topic) {
        case "houa2909/connected":
            console.log('connected : ', message.toString())

        case "houa2909/test":
            console.log('test : ', message.toString())
    }
    // while (true)
    // {
    //     if (topic == 'houa2909/connected') 
    //     {
    //         console.log('connected : ', message.toString())
    //     }
    //     else if (topic == 'houa2909/connected') 
    //     {
    //         console.log('test : ', message.toString())
    //     }
    // }
})