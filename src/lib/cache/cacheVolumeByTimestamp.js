const moment = require('moment')
const getDailyVolume = require('../getDailyVolume')
const cache = require('../cache/cache')

module.exports = (timestamp) => {

  // Data range: 13th of September 2018 till yesterday
  const firstDay = moment.utc().year(2018).month(8).date(13)
  const today = moment.utc().startOf('day')

  if(timestamp < firstDay.unix()){
    return { error: 'date_is_too_early' }
  }

  if(timestamp >= today.unix()){
    return { error: 'day_must_be_complete' }
  }

  const query = {timestamp}

  return cache(query, () => getDailyVolume(timestamp))
}
