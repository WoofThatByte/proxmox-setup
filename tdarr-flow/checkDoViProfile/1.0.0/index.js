"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
    name: 'Check DolbyVision profile Video',
    description: 'Check DolbyVision profile',
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
            tooltip: 'DoVi is profile 5',
        },
        {
            number: 2,
            tooltip: 'DoVi is profile 7',
        },
        {
            number: 3,
            tooltip: 'DoVi is profile 8',
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
    var DoViProfile = 0;
    if (Array.isArray((_b = (_a = args === null || args === void 0 ? void 0 : args.inputFileObj) === null || _a === void 0 ? void 0 : _a.mediaInfo) === null || _b === void 0 ? void 0 : _b.track)) {
        
         for (var i = 0; i < args.inputFileObj.mediaInfo.track.length; i += 1) {
            var mediaInfo = args.inputFileObj.mediaInfo.track[i];
            if (mediaInfo["@type"] === 'Video' && mediaInfo.HDR_Format_Profile && mediaInfo.HDR_Format_Profile.includes('dvhe.05')) {
                DoViProfile = 5;
            }
            else if(mediaInfo["@type"] === 'Video' && mediaInfo.HDR_Format_Profile && mediaInfo.HDR_Format_Profile.includes('dvhe.07')){
                DoViProfile = 7;
            }
            else if(mediaInfo["@type"] === 'Video' && mediaInfo.HDR_Format_Profile && mediaInfo.HDR_Format_Profile.includes('dvhe.08')){
                DoViProfile = 8;
            }
        }
        
    }
    else {
        throw new Error('File has not stream data');
    }
    
    //select output
    var outputNo;
    
    switch(DoViProfile) {
        case 5:
            outputNo = 1;
            break;
        case 7:
            outputNo = 2;
            break;
        case 8:
            outputNo = 3;
            break;
        default:
            outputNo = 0;
            break;
            }
    
    return {
        outputFileObj: args.inputFileObj,
        outputNumber: outputNo,
        variables: args.variables,
    };
};
exports.plugin = plugin;
