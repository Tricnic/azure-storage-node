// 
// Copyright (c) Microsoft and contributors.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
// 

var assert = require('assert');

// Test includes
var testutil = require('../../framework/util');

// Lib includes
var ISO8061Date = testutil.libRequire('common/util/iso8061date');
var date = testutil.libRequire('common/util/date');

describe('iso8061date-tests', function () {
  it('parse should work', function (done) {
    var datetime = new Date(Date.UTC(2011, 6, 17, 14, 0, 23, 270));
    var datetimeAtom = "2011-07-17T14:00:23.270Z";
    var parsed = ISO8061Date.parse(datetimeAtom);
    assert.deepEqual(parsed, datetime);
    done();
  });

  it('parsing a long Timestamp should work', function (done) {
    var datetime = new Date(Date.UTC(2011, 6, 17, 14, 0, 23, 270));
    var datetimeAtom = "2011-07-17T14:00:23.2701234Z";
    var parsed = ISO8061Date.parse(datetimeAtom);
    assert.deepEqual(parsed, datetime);
    done();
  });

  it('parsing a long Timestamp with rounding shoudl work', function (done) {
    var datetime = new Date(Date.UTC(2011, 6, 17, 14, 0, 23, 270));
    var datetimeAtom = "2011-07-17T14:00:23.26993Z";
    var parsed = ISO8061Date.parse(datetimeAtom);
    assert.deepEqual(parsed, datetime);
    done();
  });

  it('parsing a short Millisecond field should work', function (done) {
    var datetime = new Date(Date.UTC(2011, 6, 17, 14, 0, 23, 200));
    var datetimeAtom = "2011-07-17T14:00:23.2Z";
    var parsed = ISO8061Date.parse(datetimeAtom);
    assert.deepEqual(parsed, datetime);
    done();
  });

  it('parsing padded short Milliseconds should work', function (done) {
    var datetime = new Date(Date.UTC(2011, 6, 17, 14, 0, 23, 3));
    var datetimeAtom = "2011-07-17T14:00:23.003Z";
    var parsed = ISO8061Date.parse(datetimeAtom);
    assert.deepEqual(parsed, datetime);
    done();
  });

  it('format should work', function (done) {
    var datetime = Date.UTC(2011, 6, 17, 14, 0, 23, 270);
    var datetimeAtom = "2011-07-17T14:00:23.2700000Z";
    var strdate = ISO8061Date.format(new Date(datetime));
    assert.equal(strdate, datetimeAtom);
    done();
  });
});

describe('date-tests', function () {
  it ('daysFromNow should work', function (done) {
    var shift = 5;
    assert.equal(date.daysFromNow(shift).getDay(), ((new Date()).getDay() + shift) % 7);
    done();
  });
  
  it ('hoursFromNow should work', function (done) {
    var shift = 20;
    assert.equal(date.hoursFromNow(shift).getHours(), ((new Date()).getHours() + shift) % 24);
    done();
  });
  
  it ('minutesFromNow should work', function (done) {
    var shift = 20;
    assert.equal(date.minutesFromNow(shift).getMinutes(), ((new Date()).getMinutes() + shift) % 60);
    done();
  });
  
  it ('secondsFromNow should work', function (done) {
    var shift = 58;
    assert.equal(date.secondsFromNow(shift).getSeconds(), ((new Date()).getSeconds() + shift) % 60);
    done();
  });
});
