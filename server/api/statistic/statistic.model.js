'use strict';

import mongoose from 'mongoose';

var StatisticSchema = new mongoose.Schema({
  key: String,
  val: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Statistic', StatisticSchema);
