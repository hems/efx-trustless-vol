const moment = require('moment')
const cacheVolume = require('../../../lib/cache/cacheVolume')

module.exports = async (req, res) => {
  const day = moment().utc().date()
  const month = moment().utc().month()
  const year = moment().utc().year()

  const oneDayAgo = moment.utc()
    .year(year)
    .month(month)
    .date(day-2)

  const cached = await cacheVolume(day-1, month, year)

  res.setHeader('Content-Type', 'application/json');
  res.send(cached)
}
