/**
 *
 * Copyright 2014-present Basho Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Provides all the commands for Riak CRDTs (Conflict-Free Replicated Data Type)
 * @module CRDT
 * @main CRDT
 */
function CRDT() { }

// CRDT exports
module.exports = CRDT;
module.exports.FetchCounter =  require('./crdt/fetchcounter');
module.exports.UpdateCounter =  require('./crdt/updatecounter');
module.exports.FetchMap =  require('./crdt/fetchmap');
module.exports.UpdateMap =  require('./crdt/updatemap');
module.exports.FetchSet =  require('./crdt/fetchset');
module.exports.UpdateSet =  require('./crdt/updateset');
module.exports.UpdateGSet =  require('./crdt/updategset');
module.exports.FetchHll =  require('./crdt/fetchhll');
module.exports.UpdateHll =  require('./crdt/updatehll');
