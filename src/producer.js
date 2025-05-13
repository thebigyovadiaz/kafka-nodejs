const { Kafka } = require('kafkajs')
const Chance = require('chance')
const { initKafka } = require('./connection')

const topic = "animals"
const chance = new Chance()
const kafka = initKafka('testMyProducer')
const producer = kafka.producer()

const messageProducer = async () => {
  const value = chance.animal()
  console.log('animal: ', value)

  try {
    await producer.send({
      topic,
      messages: [
        { value },
      ],
    })
  } catch (error) {
    console.log('error: ', error.message())
  }
}

const runProducer = async () => {
  await producer.connect()
  setInterval(messageProducer, 1000)
}

runProducer()
  .catch(err => console.log('err: ', err.message()))
