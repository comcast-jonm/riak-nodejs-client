/*
 * Copyright 2015 Basho Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var CommandBase = require('../commandbase');
var inherits = require('util').inherits;
var Joi = require('joi');


/**
 * Provides the (Yokozuna) FetchSchema command.
 * @module FetchSchema
 */

/**
 * Command used to fetch a Yokozuna schema.
 * 
 * As a convenience, a builder class is provided:
 * 
 *     var FetchSchema = require(./lib/commands/yokozuna/fetchschema');
 *     var fetch = FetchSchema.Builder()
 *                  .withSchemaName('schema_name')
 *                  .withCallback(callback)
 *                  .build();
 *                  
 * 
 * @class FetchSchema
 * @constructor
 * @param {options} the options for this command
 * @param {String} options.schemaName the name of the schema to fetch.
 * @param {Function} options.callback the callback to be executed when the operation completes.
 * @param {String} options.callback.err error message
 * @param {Object[]} options.callback.response the schema
 * @extends CommandBase
 */
function FetchSchema(options) {
    
    CommandBase.call(this, 'RpbYokozunaSchemaGetReq' , 'RpbYokozunaSchemaGetResp');
    var self = this;
    Joi.validate(options, schema, function(err, options) {
       
        if (err) {
            throw err;
        }
    
        self.options = options;
    });
    
    this.remainingTries = 1;

    
}

inherits(FetchSchema, CommandBase);

FetchSchema.prototype.constructPbRequest = function() {
  
    var protobuf = this.getPbReqBuilder();
    
    protobuf.setName(new Buffer(this.options.schemaName));
    
    return protobuf;
    
};

FetchSchema.prototype.onSuccess = function(rpbYokozunaSchemaGetResp) {
    
    var pbSchema = rpbYokozunaSchemaGetResp.schema;
    var schema = { name: pbSchema.name.toString('utf8') };
    if (pbSchema.content) {
        schema.content = pbSchema.content.toString('utf8');
    }
    
    
    this.options.callback(null, schema);
    return true;
};

FetchSchema.prototype.onRiakError = function(rpbErrorResp) {
    this.onError(rpbErrorResp.getErrmsg().toString('utf8'));
};
    
    
FetchSchema.prototype.onError = function(msg) {
    this.options.callback(msg, null);
};

var schema = Joi.object().keys({
    schemaName: Joi.string().default(null).optional(),
    callback: Joi.func().required()
});

/**
 * A builder for constructing FetchSchema instances.
 * * Rather than having to manually construct the __options__ and instantiating
 * a FetchSchema directly, this builder may be used.
 * 
 *     var FetchSchema = require(./lib/commands/yokozuna/fetchschema');
 *     var fetch = FetchSchema.Builder()
 *                  .withSchemaName('schema_name')
 *                  .withCallback(callback)
 *                  .build();
 *       
 * @namespace FetchSchema
 * @class Builder
 * @constructor
 */
function Builder(){}

Builder.prototype = {
    
    /**
     * The name of the schema to fetch.
     * @param {String} schemaName the name of the schema
     * @chainable
     */
    withSchemaName : function(schemaName) {
        this.schemaName = schemaName;
        return this;
    },
    /**
     * Set the callback to be executed when the operation completes.
     * @method withCallback
     * @param {Function} callback - the callback to execute
     * @param {String} callback.err An error message
     * @param {Object} callback.response - the schema returned from riak
     * @chainable
     */
    withCallback : function(callback) {
        this.callback = callback;
        return this;
    },
    /**
     * Construct a FetchSchema instance.
     * @return {FetchSchema}
     */
    build : function() {
        return new FetchSchema(this);
    }
};

module.exports = FetchSchema;
module.exports.Builder = Builder;