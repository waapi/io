var waapi = {}; waapi.idl = [
	{
		"type": "interface",
		"name": "AnimationTimeline",
		"partial": false,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "currentTime",
				"extAttrs": []
			}
		],
		"inheritance": null,
		"extAttrs": []
	},
	{
		"type": "interface",
		"name": "DocumentTimeline",
		"partial": false,
		"members": [
			{
				"inheritance": "AnimationTimeline",
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "currentTime",
				"extAttrs": []
			}
		],
		"inheritance": "AnimationTimeline",
		"extAttrs": [
			{
				"name": "Constructor",
				"arguments": [
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "DOMHighResTimeStamp"
						},
						"name": "originTime"
					}
				]
			}
		]
	},
	{
		"type": "interface",
		"name": "Animation",
		"partial": false,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"name": "id",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "AnimationEffectReadOnly"
				},
				"name": "effect",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "AnimationTimeline"
				},
				"name": "timeline",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "startTime",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "currentTime",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "playbackRate",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "AnimationPlayState"
				},
				"name": "playState",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": "Promise",
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": {
						"sequence": false,
						"generic": null,
						"nullable": false,
						"array": false,
						"union": false,
						"idlType": "Animation"
					}
				},
				"name": "ready",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": "Promise",
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": {
						"sequence": false,
						"generic": null,
						"nullable": false,
						"array": false,
						"union": false,
						"idlType": "Animation"
					}
				},
				"name": "finished",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "EventHandler"
				},
				"name": "onfinish",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "EventHandler"
				},
				"name": "oncancel",
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "void"
				},
				"name": "cancel",
				"arguments": [],
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "void"
				},
				"name": "finish",
				"arguments": [],
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "void"
				},
				"name": "play",
				"arguments": [],
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "void"
				},
				"name": "pause",
				"arguments": [],
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "void"
				},
				"name": "reverse",
				"arguments": [],
				"extAttrs": []
			}
		],
		"inheritance": "EventTarget",
		"extAttrs": [
			{
				"name": "Constructor",
				"arguments": [
					{
						"optional": true,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "AnimationEffectReadOnly"
						},
						"name": "effect",
						"default": {
							"type": "null"
						}
					},
					{
						"optional": true,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "AnimationTimeline"
						},
						"name": "timeline",
						"default": {
							"type": "null"
						}
					}
				]
			}
		]
	},
	{
		"type": "enum",
		"name": "AnimationPlayState",
		"values": [
			"idle",
			"pending",
			"running",
			"paused",
			"finished"
		],
		"extAttrs": []
	},
	{
		"type": "interface",
		"name": "AnimationEffectReadOnly",
		"partial": false,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "AnimationEffectTimingReadOnly"
				},
				"name": "timing",
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "ComputedTimingProperties"
				},
				"name": "getComputedTiming",
				"arguments": [],
				"extAttrs": []
			}
		],
		"inheritance": null,
		"extAttrs": []
	},
	{
		"type": "interface",
		"name": "AnimationEffectTimingReadOnly",
		"partial": false,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "delay",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "endDelay",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "FillMode"
				},
				"name": "fill",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "iterationStart",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"name": "iterations",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": true,
					"idlType": [
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "unrestricted double"
						},
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "DOMString"
						}
					]
				},
				"name": "duration",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "PlaybackDirection"
				},
				"name": "direction",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"name": "easing",
				"extAttrs": []
			}
		],
		"inheritance": null,
		"extAttrs": []
	},
	{
		"type": "interface",
		"name": "AnimationEffectTiming",
		"partial": false,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "delay",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "endDelay",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "FillMode"
				},
				"name": "fill",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "iterationStart",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"name": "iterations",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": true,
					"idlType": [
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "unrestricted double"
						},
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "DOMString"
						}
					]
				},
				"name": "duration",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "PlaybackDirection"
				},
				"name": "direction",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"name": "easing",
				"extAttrs": []
			}
		],
		"inheritance": "AnimationEffectTimingReadOnly",
		"extAttrs": []
	},
	{
		"type": "dictionary",
		"name": "AnimationEffectTimingProperties",
		"partial": false,
		"members": [
			{
				"type": "field",
				"name": "delay",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"type": "field",
				"name": "endDelay",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"type": "field",
				"name": "fill",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "FillMode"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "auto"
				}
			},
			{
				"type": "field",
				"name": "iterationStart",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"type": "field",
				"name": "iterations",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 1
				}
			},
			{
				"type": "field",
				"name": "duration",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": true,
					"idlType": [
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "unrestricted double"
						},
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "DOMString"
						}
					]
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "auto"
				}
			},
			{
				"type": "field",
				"name": "direction",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "PlaybackDirection"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "normal"
				}
			},
			{
				"type": "field",
				"name": "easing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "linear"
				}
			}
		],
		"inheritance": null,
		"extAttrs": []
	},
	{
		"type": "dictionary",
		"name": "ComputedTimingProperties",
		"partial": false,
		"members": [
			{
				"type": "field",
				"name": "endTime",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"extAttrs": []
			},
			{
				"type": "field",
				"name": "activeDuration",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"extAttrs": []
			},
			{
				"type": "field",
				"name": "localTime",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": []
			},
			{
				"type": "field",
				"name": "progress",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"extAttrs": []
			},
			{
				"type": "field",
				"name": "currentIteration",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"extAttrs": []
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "delay",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "endDelay",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "fill",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "FillMode"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "auto"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "iterationStart",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "iterations",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 1
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "duration",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": true,
					"idlType": [
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "unrestricted double"
						},
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "DOMString"
						}
					]
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "auto"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "direction",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "PlaybackDirection"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "normal"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "easing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "linear"
				}
			}
		],
		"inheritance": "AnimationEffectTimingProperties",
		"extAttrs": []
	},
	{
		"type": "enum",
		"name": "FillMode",
		"values": [
			"none",
			"forwards",
			"backwards",
			"both",
			"auto"
		],
		"extAttrs": []
	},
	{
		"type": "enum",
		"name": "PlaybackDirection",
		"values": [
			"normal",
			"reverse",
			"alternate",
			"alternate-reverse"
		],
		"extAttrs": []
	},
	{
		"type": "interface",
		"name": "KeyframeEffectReadOnly",
		"partial": false,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "Animatable"
				},
				"name": "target",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "IterationCompositeOperation"
				},
				"name": "iterationComposite",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "CompositeOperation"
				},
				"name": "composite",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"name": "spacing",
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "KeyframeEffect"
				},
				"name": "clone",
				"arguments": [],
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": true,
					"generic": "sequence",
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": {
						"sequence": false,
						"generic": null,
						"nullable": false,
						"array": false,
						"union": false,
						"idlType": "object"
					}
				},
				"name": "getFrames",
				"arguments": [],
				"extAttrs": []
			},
			{
				"inheritance": "AnimationEffectReadOnly",
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "AnimationEffectTimingReadOnly"
				},
				"name": "timing",
				"extAttrs": []
			},
			{
				"inheritance": "AnimationEffectReadOnly",
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "ComputedTimingProperties"
				},
				"name": "getComputedTiming",
				"arguments": [],
				"extAttrs": []
			}
		],
		"inheritance": "AnimationEffectReadOnly",
		"extAttrs": [
			{
				"name": "Constructor",
				"arguments": [
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "Animatable"
						},
						"name": "target"
					},
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "object"
						},
						"name": "frames"
					},
					{
						"optional": true,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": true,
							"idlType": [
								{
									"sequence": false,
									"generic": null,
									"nullable": false,
									"array": false,
									"union": false,
									"idlType": "unrestricted double"
								},
								{
									"sequence": false,
									"generic": null,
									"nullable": false,
									"array": false,
									"union": false,
									"idlType": "KeyframeEffectOptions"
								}
							]
						},
						"name": "options"
					}
				]
			}
		]
	},
	{
		"type": "interface",
		"name": "KeyframeEffect",
		"partial": false,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "Animatable"
				},
				"name": "target",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "IterationCompositeOperation"
				},
				"name": "iterationComposite",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "CompositeOperation"
				},
				"name": "composite",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": true,
				"readonly": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"name": "spacing",
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "void"
				},
				"name": "setFrames",
				"arguments": [
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "object"
						},
						"name": "frames"
					}
				],
				"extAttrs": []
			},
			{
				"inheritance": "KeyframeEffectReadOnly",
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "KeyframeEffect"
				},
				"name": "clone",
				"arguments": [],
				"extAttrs": []
			},
			{
				"inheritance": "KeyframeEffectReadOnly",
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": true,
					"generic": "sequence",
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": {
						"sequence": false,
						"generic": null,
						"nullable": false,
						"array": false,
						"union": false,
						"idlType": "object"
					}
				},
				"name": "getFrames",
				"arguments": [],
				"extAttrs": []
			},
			{
				"inheritance": "AnimationEffectReadOnly",
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "AnimationEffectTimingReadOnly"
				},
				"name": "timing",
				"extAttrs": []
			},
			{
				"inheritance": "AnimationEffectReadOnly",
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "ComputedTimingProperties"
				},
				"name": "getComputedTiming",
				"arguments": [],
				"extAttrs": []
			}
		],
		"inheritance": "KeyframeEffectReadOnly",
		"extAttrs": [
			{
				"name": "Constructor",
				"arguments": [
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "Animatable"
						},
						"name": "target"
					},
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "object"
						},
						"name": "frames"
					},
					{
						"optional": true,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": true,
							"idlType": [
								{
									"sequence": false,
									"generic": null,
									"nullable": false,
									"array": false,
									"union": false,
									"idlType": "unrestricted double"
								},
								{
									"sequence": false,
									"generic": null,
									"nullable": false,
									"array": false,
									"union": false,
									"idlType": "KeyframeEffectOptions"
								}
							]
						},
						"name": "options"
					}
				]
			}
		]
	},
	{
		"type": "dictionary",
		"name": "BaseComputedKeyframe",
		"partial": false,
		"members": [
			{
				"type": "field",
				"name": "offset",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "null"
				}
			},
			{
				"type": "field",
				"name": "computedOffset",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": []
			},
			{
				"type": "field",
				"name": "easing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "linear"
				}
			},
			{
				"type": "field",
				"name": "composite",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "CompositeOperation"
				},
				"extAttrs": []
			}
		],
		"inheritance": null,
		"extAttrs": []
	},
	{
		"type": "dictionary",
		"name": "BasePropertyIndexedKeyframe",
		"partial": false,
		"members": [
			{
				"type": "field",
				"name": "easing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "linear"
				}
			},
			{
				"type": "field",
				"name": "composite",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "CompositeOperation"
				},
				"extAttrs": []
			}
		],
		"inheritance": null,
		"extAttrs": []
	},
	{
		"type": "dictionary",
		"name": "BaseKeyframe",
		"partial": false,
		"members": [
			{
				"type": "field",
				"name": "offset",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "null"
				}
			},
			{
				"type": "field",
				"name": "easing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "linear"
				}
			},
			{
				"type": "field",
				"name": "composite",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "CompositeOperation"
				},
				"extAttrs": []
			}
		],
		"inheritance": null,
		"extAttrs": []
	},
	{
		"type": "dictionary",
		"name": "KeyframeEffectOptions",
		"partial": false,
		"members": [
			{
				"type": "field",
				"name": "iterationComposite",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "IterationCompositeOperation"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "replace"
				}
			},
			{
				"type": "field",
				"name": "composite",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "CompositeOperation"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "replace"
				}
			},
			{
				"type": "field",
				"name": "spacing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "distribute"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "delay",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "endDelay",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "fill",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "FillMode"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "auto"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "iterationStart",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "iterations",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 1
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "duration",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": true,
					"idlType": [
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "unrestricted double"
						},
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "DOMString"
						}
					]
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "auto"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "direction",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "PlaybackDirection"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "normal"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "easing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "linear"
				}
			}
		],
		"inheritance": "AnimationEffectTimingProperties",
		"extAttrs": []
	},
	{
		"type": "enum",
		"name": "IterationCompositeOperation",
		"values": [
			"replace",
			"accumulate"
		],
		"extAttrs": []
	},
	{
		"type": "enum",
		"name": "CompositeOperation",
		"values": [
			"replace",
			"add",
			"accumulate"
		],
		"extAttrs": []
	},
	{
		"type": "interface",
		"name": "SharedKeyframeList",
		"partial": false,
		"members": [],
		"inheritance": null,
		"extAttrs": [
			{
				"name": "Constructor",
				"arguments": [
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "object"
						},
						"name": "frames"
					}
				]
			}
		]
	},
	{
		"type": "interface",
		"name": "Animatable",
		"partial": false,
		"members": [
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "Animation"
				},
				"name": "animate",
				"arguments": [
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": true,
							"array": false,
							"union": false,
							"idlType": "object"
						},
						"name": "frames"
					},
					{
						"optional": true,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": true,
							"idlType": [
								{
									"sequence": false,
									"generic": null,
									"nullable": false,
									"array": false,
									"union": false,
									"idlType": "unrestricted double"
								},
								{
									"sequence": false,
									"generic": null,
									"nullable": false,
									"array": false,
									"union": false,
									"idlType": "KeyframeAnimationOptions"
								}
							]
						},
						"name": "options"
					}
				],
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": true,
					"generic": "sequence",
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": {
						"sequence": false,
						"generic": null,
						"nullable": false,
						"array": false,
						"union": false,
						"idlType": "Animation"
					}
				},
				"name": "getAnimations",
				"arguments": [],
				"extAttrs": []
			}
		],
		"inheritance": null,
		"extAttrs": [
			{
				"name": "NoInterfaceObject",
				"arguments": null
			}
		]
	},
	{
		"type": "dictionary",
		"name": "KeyframeAnimationOptions",
		"partial": false,
		"members": [
			{
				"type": "field",
				"name": "id",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": ""
				}
			},
			{
				"inheritance": "KeyframeEffectOptions",
				"type": "field",
				"name": "iterationComposite",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "IterationCompositeOperation"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "replace"
				}
			},
			{
				"inheritance": "KeyframeEffectOptions",
				"type": "field",
				"name": "composite",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "CompositeOperation"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "replace"
				}
			},
			{
				"inheritance": "KeyframeEffectOptions",
				"type": "field",
				"name": "spacing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "distribute"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "delay",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "endDelay",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "fill",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "FillMode"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "auto"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "iterationStart",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 0
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "iterations",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "unrestricted double"
				},
				"extAttrs": [],
				"default": {
					"type": "number",
					"value": 1
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "duration",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": true,
					"idlType": [
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "unrestricted double"
						},
						{
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "DOMString"
						}
					]
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "auto"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "direction",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "PlaybackDirection"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "normal"
				}
			},
			{
				"inheritance": "AnimationEffectTimingProperties",
				"type": "field",
				"name": "easing",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DOMString"
				},
				"extAttrs": [],
				"default": {
					"type": "string",
					"value": "linear"
				}
			}
		],
		"inheritance": "KeyframeEffectOptions",
		"extAttrs": []
	},
	{
		"type": "interface",
		"name": "Document",
		"partial": true,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": "DocumentTimeline"
				},
				"name": "timeline",
				"extAttrs": []
			},
			{
				"type": "operation",
				"getter": false,
				"setter": false,
				"creator": false,
				"deleter": false,
				"legacycaller": false,
				"static": false,
				"stringifier": false,
				"idlType": {
					"sequence": true,
					"generic": "sequence",
					"nullable": false,
					"array": false,
					"union": false,
					"idlType": {
						"sequence": false,
						"generic": null,
						"nullable": false,
						"array": false,
						"union": false,
						"idlType": "Animation"
					}
				},
				"name": "getAnimations",
				"arguments": [],
				"extAttrs": []
			}
		],
		"extAttrs": []
	},
	{
		"type": "implements",
		"target": "Element",
		"implements": "Animatable",
		"extAttrs": []
	},
	{
		"type": "implements",
		"target": "CSSPseudoElement",
		"implements": "Animatable",
		"extAttrs": []
	},
	{
		"type": "interface",
		"name": "AnimationPlaybackEvent",
		"partial": false,
		"members": [
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "currentTime",
				"extAttrs": []
			},
			{
				"type": "attribute",
				"static": false,
				"stringifier": false,
				"inherit": false,
				"readonly": true,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"name": "timelineTime",
				"extAttrs": []
			}
		],
		"inheritance": "Event",
		"extAttrs": [
			{
				"name": "Constructor",
				"arguments": [
					{
						"optional": false,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "DOMString"
						},
						"name": "type"
					},
					{
						"optional": true,
						"variadic": false,
						"extAttrs": [],
						"idlType": {
							"sequence": false,
							"generic": null,
							"nullable": false,
							"array": false,
							"union": false,
							"idlType": "AnimationPlaybackEventInit"
						},
						"name": "eventInitDict"
					}
				]
			}
		]
	},
	{
		"type": "dictionary",
		"name": "AnimationPlaybackEventInit",
		"partial": false,
		"members": [
			{
				"type": "field",
				"name": "currentTime",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "null"
				}
			},
			{
				"type": "field",
				"name": "timelineTime",
				"required": false,
				"idlType": {
					"sequence": false,
					"generic": null,
					"nullable": true,
					"array": false,
					"union": false,
					"idlType": "double"
				},
				"extAttrs": [],
				"default": {
					"type": "null"
				}
			}
		],
		"inheritance": "EventInit",
		"extAttrs": []
	}
];