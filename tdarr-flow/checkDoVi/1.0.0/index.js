"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Check DolbyVision Video',
    description: 'Check if video is DolbyVision',
    style: {
        borderColor: 'orange',
    },
    tags: 'video',
    isStartPlugin: false,
    pType: '',
    requiresVersion: '2.11.01',
    sidebarPosition: -1,
    icon: 'faQuestion',
    inputs: [],
    outputs: [
        {
            number: 1,
            tooltip: 'Video is DolbyVision',
        },
        {
            number: 2,
            tooltip: 'Video is not DolbyVision',
        },
    ],
}); };
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) {
    var _a, _b;
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    var isDoVi = false;
    if (Array.isArray((_b = (_a = args === null || args === void 0 ? void 0 : args.inputFileObj) === null || _a === void 0 ? void 0 : _a.mediaInfo) === null || _b === void 0 ? void 0 : _b.track)) {
        
         for (var i = 0; i < args.inputFileObj.mediaInfo.track.length; i += 1) {
            var mediaInfo = args.inputFileObj.mediaInfo.track[i];
            if (mediaInfo["@type"] === 'Video' && mediaInfo.HDR_Format && mediaInfo.HDR_Format.includes('Dolby Vision')) {
                isDoVi  = true;
            }
           
        }
        
    }
    else {
        throw new Error('File has not stream data');
    }

    
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: isDoVi? 1 : 2,
        variables: args.variables,
    };
};
exports.plugin = plugin;
