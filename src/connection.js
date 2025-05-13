const { Kafka } = require('kafkajs')

const kafkaConnect = null

const initKafka = (clientId) => (
  new Kafka({
    clientId,
    brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094']
  })
)

module.exports = {
  initKafka
}
