const { initKafka } = require('./connection')

const topic = "animals"
const kafka = initKafka('testMyConsumer')
const consumer = kafka.consumer({ groupId: 'consumer-group' })

const runReadMessages = async ({ topic, partition, message }) => {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    }
  })
}

const runConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  try {
    await runReadMessages(consumer)
  } catch (error) {
    console.log('error: ', error)
  }
}

runConsumer()
  .catch(console.log())
