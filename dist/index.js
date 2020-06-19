module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b9e0cd6ddd3c4d4ced78";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://0.0.0.0:3030/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function (updatedModules, renewedModules) {\n  var unacceptedModules = updatedModules.filter(function (moduleId) {\n    return renewedModules && renewedModules.indexOf(moduleId) < 0;\n  });\n\n  var log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n  if (unacceptedModules.length > 0) {\n    log(\"warning\", \"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\");\n    unacceptedModules.forEach(function (moduleId) {\n      log(\"warning\", \"[HMR]  - \" + moduleId);\n    });\n  }\n\n  if (!renewedModules || renewedModules.length === 0) {\n    log(\"info\", \"[HMR] Nothing hot updated.\");\n  } else {\n    log(\"info\", \"[HMR] Updated modules:\");\n    renewedModules.forEach(function (moduleId) {\n      if (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n        var parts = moduleId.split(\"!\");\n        log.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n        log(\"info\", \"[HMR]  - \" + moduleId);\n        log.groupEnd(\"info\");\n      } else {\n        log(\"info\", \"[HMR]  - \" + moduleId);\n      }\n    });\n    var numberIds = renewedModules.every(function (moduleId) {\n      return typeof moduleId === \"number\";\n    });\n    if (numberIds) log(\"info\", \"[HMR] Consider using the NamedModulesPlugin for module names.\");\n  }\n};\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n  var shouldLog = logLevel === \"info\" && level === \"info\" || [\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\" || [\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\";\n  return shouldLog;\n}\n\nfunction logGroup(logFn) {\n  return function (level, msg) {\n    if (shouldLog(level)) {\n      logFn(msg);\n    }\n  };\n}\n\nmodule.exports = function (level, msg) {\n  if (shouldLog(level)) {\n    if (level === \"info\") {\n      console.log(msg);\n    } else if (level === \"warning\") {\n      console.warn(msg);\n    } else if (level === \"error\") {\n      console.error(msg);\n    }\n  }\n};\n/* eslint-disable node/no-unsupported-features/node-builtins */\n\n\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function (level) {\n  logLevel = level;\n};\n\nmodule.exports.formatError = function (err) {\n  var message = err.message;\n  var stack = err.stack;\n\n  if (!stack) {\n    return message;\n  } else if (stack.indexOf(message) < 0) {\n    return message + \"\\n\" + stack;\n  } else {\n    return stack;\n  }\n};\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n/*globals __resourceQuery */\nif (true) {\n  var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\n  var log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n  var checkForUpdate = function checkForUpdate(fromUpdate) {\n    if (module.hot.status() === \"idle\") {\n      module.hot.check(true).then(function (updatedModules) {\n        if (!updatedModules) {\n          if (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n          return;\n        }\n\n        __webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\n        checkForUpdate(true);\n      }).catch(function (err) {\n        var status = module.hot.status();\n\n        if ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n          log(\"warning\", \"[HMR] Cannot apply update.\");\n          log(\"warning\", \"[HMR] \" + log.formatError(err));\n          log(\"warning\", \"[HMR] You need to restart the application!\");\n        } else {\n          log(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n        }\n      });\n    }\n  };\n\n  setInterval(checkForUpdate, hotPollInterval);\n} else {}\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/actions/index.js":
/*!******************************!*\
  !*** ./src/actions/index.js ***!
  \******************************/
/*! exports provided: addCategory, selectCategory, addNewTask, SelectTask, MakeEditable, MakeCategoryEditable, addTaskDescription, markTaskusCompleted, deleteTask, toggleSideBar, sortAscending, sortDecending, AddStep, DeleteStep, MarkStepCompleted, AddFile, RemoveFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addCategory\", function() { return addCategory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectCategory\", function() { return selectCategory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addNewTask\", function() { return addNewTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SelectTask\", function() { return SelectTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MakeEditable\", function() { return MakeEditable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MakeCategoryEditable\", function() { return MakeCategoryEditable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addTaskDescription\", function() { return addTaskDescription; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"markTaskusCompleted\", function() { return markTaskusCompleted; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteTask\", function() { return deleteTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleSideBar\", function() { return toggleSideBar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sortAscending\", function() { return sortAscending; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sortDecending\", function() { return sortDecending; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AddStep\", function() { return AddStep; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DeleteStep\", function() { return DeleteStep; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MarkStepCompleted\", function() { return MarkStepCompleted; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AddFile\", function() { return AddFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RemoveFile\", function() { return RemoveFile; });\n/* harmony import */ var _constants_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/action-types */ \"./src/constants/action-types.js\");\n\nfunction addCategory(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"ADD_CATEGORY\"],\n    payload\n  };\n}\nfunction selectCategory(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"SELECT_CATEGORY\"],\n    payload\n  };\n}\nfunction addNewTask(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"ADD_NEW_TASK\"],\n    payload\n  };\n}\nfunction SelectTask(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"SELECT_TASK\"],\n    payload\n  };\n}\nfunction MakeEditable(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"MAKE_TASK_EDITABLE\"],\n    payload\n  };\n}\nfunction MakeCategoryEditable(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"IS_CATEGORY_EDITABLE\"],\n    payload\n  };\n}\nfunction addTaskDescription(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"ADD_DESCRIPTION\"],\n    payload\n  };\n}\nfunction markTaskusCompleted(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"MARK_US_COMPLETED\"],\n    payload\n  };\n}\nfunction deleteTask(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"DELETE_TASK\"],\n    payload\n  };\n}\nfunction toggleSideBar(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"TOGGLE_SIDEBAR\"],\n    payload\n  };\n}\nfunction sortAscending(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"SORT_ASCENDING\"],\n    payload\n  };\n}\nfunction sortDecending(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"SORT_DECENDING\"],\n    payload\n  };\n}\nfunction AddStep(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"ADD_STEP\"],\n    payload\n  };\n}\nfunction DeleteStep(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"DELETE_STEP\"],\n    payload\n  };\n}\nfunction MarkStepCompleted(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"MARKSTEP_COMPLETED\"],\n    payload\n  };\n}\nfunction AddFile(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"ADDFILE\"],\n    payload\n  };\n}\nfunction RemoveFile(payload) {\n  return {\n    type: _constants_action_types__WEBPACK_IMPORTED_MODULE_0__[\"REMOVEFILE\"],\n    payload\n  };\n}\n\n//# sourceURL=webpack:///./src/actions/index.js?");

/***/ }),

/***/ "./src/assets/ic_add.png":
/*!*******************************!*\
  !*** ./src/assets/ic_add.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAPklEQVRIiWNgGFFg8rI7/ycvu/OfFD1MtHLMqAWjFgwhCxhhDFIzECGQG6XCyMBABx+QBEaLilELRi0YqQAAkGsQdDKzdo0AAAAASUVORK5CYII=\"\n\n//# sourceURL=webpack:///./src/assets/ic_add.png?");

/***/ }),

/***/ "./src/assets/ic_attach.png":
/*!**********************************!*\
  !*** ./src/assets/ic_attach.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABWElEQVRIie2Uu0oDQRSGv5kNwUaFVBYr2khIJHY+ggTEzldQ0AdwWRA0CAsJgnkRy0TwUugDWCgkS0ynRqwsgkWUzYyFI5IYs+aiheSvzpk583/nTHHglyVCK5yqjQjyCNIAaE5R2mU/WR0c4FRtrOAKTazt1RNSLuDFa2EA2R0f5I15AUvaWNIGimhiqOZBaPvhAPMtltzAi9fw4jWsYBMALdKDA2AcoOUrvNSdiSaHAfiU62tcX//4vGdAnxoBRoB/BngFYKs8Z/KX4QIEFwBY4sbk58MANAHIlKIotQacAM8IjpHBOplStKWugyLd/cUD6GkaMkUucQm0blC3sggK4L6/CYQ+MtFu5wK101b31aIrwPVngWve13YB5B5jgU8jkjDmK0AdrVLk5m97BwA45SWkOAQmOtzWQa+STZ71N8GHtsszNHFBLANTwCNCF1E6+13nf6Y3YgJmahbsEQsAAAAASUVORK5CYII=\"\n\n//# sourceURL=webpack:///./src/assets/ic_attach.png?");

/***/ }),

/***/ "./src/assets/ic_checked.png":
/*!***********************************!*\
  !*** ./src/assets/ic_checked.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAC60lEQVRIia2VS0iUURTHf+d+3+RoUeZMTYwZOaXRJqjchPYgosc2iRbRIpBqelASFBH0oucirAgVg95BRARtelBEWdEiWrQMbALFSSPDzHTK+b7TYtRmbBxnov/ynHt//3Puvd93hCy0fGtbcdzSWcSlDFHFosV25MPTxpL2sfbKaImFm6MF4y3nIMhKIADqA8lLZPWnIF8UPgs8+OXVY6/rSvqzNlgcjtYI7l6UEIKVuUSJg0ZclVMvG4ovZzY4rGZJZ3sDUA34MoJHSNFug7nzPBDcwmFxh+ImedHSz9FGYGOu8ESlUuiiG6o62uqT48MGi8PRGtfVaiA/V/gfE/INsq4q3LopKQaLatvyPTHzDrTsX+GpRvK+15EFb5uCfQbAE+MQqqF/gQWKLM7s9OMvTHkLswos9wAMH5GsGvO1pFHQb3NhzxQq5uaxfOGfk1XUFpHVAFK5ozVoOeYNEMy18vO1U5jms7j1pJeGu99S8gpRnHiFsV0zB6Xof8IBBC3CssqNoiEE78gFeR5h2YK/H9TQsUzzWdx49D0tfNDCa7BDRtS46dL7Nk7mSE0R61dMSIGfq/UzdXICfvFeT8ZOXXXUFnU/qkgMUru4er+H+eXj2LZ2Eh5LePymj7pdCfitJ71jwkH7xdJIxksOBT3U7fZTOMHQ88Nl4niTVeWDajcyUGFeXZgRRelItyISHaD27Be6e3OGI0rHs/rSDhtAhEcqMg9VezSTynlerj/8nhUckbhj5AFAwqB/4KgWeKqB8tE6iUQHsoMDqEb643ISBr/kZ1dKY7hyWtGv2VNGVRfC8bdNwb5hA4DmxuJLAncU0k6mLNWnuLeb66dfGwqkzIPmwPSwCNcEunJna7eq3nzRULI9OZp2ZFaFWzcZlf0iplT5++JTlRiZCMeTK89oAIkZYf2UAwZZg2oAxTf8S1GNIdKF0Okq9x2vnshp6I9U5Y7WoKXMxmG2CAp2i+v8annRNPPTWHt/A1WGJDAtY9PBAAAAAElFTkSuQmCC\"\n\n//# sourceURL=webpack:///./src/assets/ic_checked.png?");

/***/ }),

/***/ "./src/assets/ic_circle_blue_unfilled.png":
/*!************************************************!*\
  !*** ./src/assets/ic_circle_blue_unfilled.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACjklEQVRIia2WS0wTURSG/3NmOoSgUSNCUYlRdugKV6BQAmspAVY+EiKkaTFsRVYUogkh7lBoxLDTuLCBdmkCNkB0hW6UpSg0WB4afC1gpve4GGeiCIVC/2QWc+/k+3LvPfdkgKwiZD97T8aPazvmvWlltBBLAwTlAI78mfoGyHuA40yb0cTQ2VRWgks3Vw/reRvdArSCJMrCMY3l7cTD018AoP5W8rhlUYWw8gPUBMEos9GfGCr6uaugLrBQlta0mAImDZZeB7rjKgNLhUpLhwHyKaT9M8NnPuwoqAsslFkavxSh29ORU88ygbemJrR4FaB+aLpv6oF3/j+BvS2br5XgbrZwVxJcvAZQF7NR5WwXO5N63ka3Aib3CweAqUjpEyHMKNnscsYYsKtFgFaDpXe/cDe61gOgrb59udgVpJXRApLobge6l0wPlqxCMGYZVrMrIJYGFo4dFO6GOSaCBlcAwXkL1myu+B5Ss4CU229h4ZpQ8nuu4HaEakLJHwgLO1WUdY/ZaxhhUhCsV7Ylj+UKWt2ZKgTwFWFS9gpI5gydL+ZKANOsENAc4F40jtuNK0ch9rNI3BV4TP05QE21gaXCg7KrgqkiAhpN6FFXMPG4eBmCUbsrHiw6W30CGXkV8a64AgBgNvoB8tldcX/xBZM3IKjML/AMOGP/lObl0KdzDC0ByJ2p4dKn2cCrQ4vXCXSPRfMlIiUftxW4EtHGhTADXeuZHixZzQSuCqaKdLb6IKhk0fx/w7cVAEBtx8ohu+VSu0DGiHicLbxJPDq5BgDVnZ9PwDQrQOwnoFEgI/kFnoEX972/trIy3t769uViy7CaleAKiVwA4SgAQLAuRO9YJG5CjzoHmoNk/9vyG872AmXwt5qeAAAAAElFTkSuQmCC\"\n\n//# sourceURL=webpack:///./src/assets/ic_circle_blue_unfilled.png?");

/***/ }),

/***/ "./src/assets/ic_circle_grey.png":
/*!***************************************!*\
  !*** ./src/assets/ic_circle_grey.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABb0lEQVRIia3VP09UQRQF8B+PEijMLruUunwD7KgB7WgJSGKL8i0gdDRiCF+ChgRUSlsa/oWSKAsmmmgIBEpCMfPgsWazb9k5yTRn7pxz587MHbpDXxzJMIJF7OIc13Gc4xs+xpiuMYQV/MIaJlApzFcwic8xZhmDZcVHcYxPLaLtUI1GR2iUET/DTNlsCpiNa1+1CxgSMn+OeI45HGpTrhWhLL1iHUut5IhwWGVq3gnDUasO/ZF8jz/YTGBwKxx2FXs5uStcxVSYwtcicYEXCQ0qwo0CGa4SihPayTWyrEAk7TE5MtzhUtoSVfEPd/kOTvA6ocFY1JQbbGE6ocF01HxAXXgc1QTitahV4/Gh3Qhn8BY7PRqs4ju2WycGhZY724P4PA4w0C6gITyQ55i8w0+87BTYEFruutC4OqGGDSHz/8SzVgKnGMffgtGUpxdgGG/i3D5+xzU/SiT0BHV8wBc0PX76zcgtxB0kQ9ct5R7jp0XKVs3lIgAAAABJRU5ErkJggg==\"\n\n//# sourceURL=webpack:///./src/assets/ic_circle_grey.png?");

/***/ }),

/***/ "./src/assets/ic_close.png":
/*!*********************************!*\
  !*** ./src/assets/ic_close.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABN0lEQVRIie2V3WmEQBSFz/yVECEd5MHUEDZJA3lIEUYQrEQYl50iAltAiAtbQ3zYDhKSDpwZzIMGTNCZK+RxD/jgOPd8V+ZcBc5aK623mTEmWVtnjEm03mZ/1/n0pq7rJ6DfWeuaNRBjTGKta4B+N3gsAPq+fwbwBiC11h2rqrqMmWutL6x1rwBSACfO+X76nM0VAKwBcA3g5L27Lcvyfcl8ulcIvsnz/CMIoEIo5ouAGIRqHgQsQYQQjmoeBQDThCAF0I7LKYBWKXmXZdlnqD4KmHkTUDr/EY9tWFLXdaTmooBh4NgBQ/fteF0JIV8ow7jqkIXgG++9p85JEBCK4pphJA3a3IFSIdFPRSgtFAgLFVCiGIP8ShFj7HHc2Colbyg5L4riSyl5jzFdUsqHYMF//3DOiuobx6DZr129uwEAAAAASUVORK5CYII=\"\n\n//# sourceURL=webpack:///./src/assets/ic_close.png?");

/***/ }),

/***/ "./src/assets/ic_item_list.png":
/*!*************************************!*\
  !*** ./src/assets/ic_item_list.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRIie2SO27DMBBEnyI50pJWAIvpciFfw4DhJvcQcgWn8BFym1zDjVOY4kcuSBnpUqQIAnCABWcAcpa7GCj4a1QA48ds+gd2zxY2F07bfXV+eZ3N48xu7ajFQedBR9AeOpvPrLVNXDxoB8oR+sBp+1mdG4CnmsNwZRwsmJkGeGsjB+UZxYMEUAGUB3FJS9bKQbfwXOJh5ZNPAzBcwdhUmymN9v3y/bH7QecPLBwgNbhwNJF6mGA18Q7QR46tpxbHWnnQAdqQViAhGYtLK1qmkek+3VfMPv8fJUUlRb9HSVFJUQHcANoNLAS5DoU/AAAAAElFTkSuQmCC\"\n\n//# sourceURL=webpack:///./src/assets/ic_item_list.png?");

/***/ }),

/***/ "./src/assets/ic_navigation_menu.png":
/*!*******************************************!*\
  !*** ./src/assets/ic_navigation_menu.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA0UlEQVRIie2UQUrDYBBG3/xJLIlewk02Yi1ivYIXiFsXXQg5kNh20QNUsq53aJGiuIkL7yC0wUb+6UKRHGAWJeQd4M0MM99AR+sRgLOH95MkiG4RF5lY1dffSTV/vbvYhACxi24UmaFq4gfhaBN/AYX8VlS5fPw8B28zAa5+yU/fELHquM0IwHBaDtTLWITQxKrUOM2X9+naNSqZLkS82Um2nf+gXU/K/o8PbJbcCJoAXI0/MuDJRv6HarbK0yIE2CXbRW8bj0yf3XH1bOLqOHz2eF9CcO9JsDsAAAAASUVORK5CYII=\"\n\n//# sourceURL=webpack:///./src/assets/ic_navigation_menu.png?");

/***/ }),

/***/ "./src/assets/ic_sort.png":
/*!********************************!*\
  !*** ./src/assets/ic_sort.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABeUlEQVRIie2Uu0sDQRCHv72EK2JpKWgl3MVOrQQ7QfAPsLL1AbaiF4J6CiGJYKdgCiu1jWCppdiIKc8zYmVvJfjC3FicIT7WXB6KTX7d7MzONzPsLPyL0uUenMvlhmJTZYslv4Rzlda5je8X/G4qwTGodVL+WiRAgi4Ug4j06dzqk+VeJHjqOgFGPpwukLM3I0E/qAZwPZNn4whh/GuNKJkmm9zVZkiVLYLgAKWK5KzMV3dtRI/0IxSBWVCn77kzwBxiCK5nagFNjagqxy8AM8AwObukjWlQ8XYuA7B4bWNU9kAd1h9RqzIqCWAIpFfrbhsQxe8AOoC/AqhboEQQe2gXoN/kcCO/bWUrau0vcj2Tp9gUSDzcYJUOP0jZB0CCM/IDHrQ6InfgBQlegZ0wOYCMAgVETfJg3tTvoFEtXc6j1FatLjmnYoyxYd1Xj/QdOH4Bxxccf6guIJ/cRrH+bnmgJj4m/xnQzCvK2qsgK8SMcbL2XWT8b+sNvBN8tQBGm98AAAAASUVORK5CYII=\"\n\n//# sourceURL=webpack:///./src/assets/ic_sort.png?");

/***/ }),

/***/ "./src/components/ContextMenu/MenuContext.js":
/*!***************************************************!*\
  !*** ./src/components/ContextMenu/MenuContext.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_contextmenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-contextmenu */ \"react-contextmenu\");\n/* harmony import */ var react_contextmenu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_contextmenu__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/index */ \"./src/actions/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/ContextMenu/MenuContext.js\";\n\n\n\n\n\n\nclass MenuContext extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.onImageDelete = id => {\n      console.log(id);\n      this.props.deletetask({\n        taskid: id\n      });\n    };\n\n    this.onMarkusCompleted = id => {\n      this.props.markusCompeleted({\n        selectedtask: id,\n        selection: !this.props.checked\n      });\n    };\n\n    this.onImageDelete = this.onImageDelete.bind(this);\n    this.onMarkusCompleted = this.onMarkusCompleted.bind(this);\n  }\n\n  render() {\n    const {\n      child,\n      id,\n      checked\n    } = this.props;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 27,\n        columnNumber: 7\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_contextmenu__WEBPACK_IMPORTED_MODULE_1__[\"ContextMenuTrigger\"], {\n      id: '' + id,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 29,\n        columnNumber: 9\n      }\n    }, child), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_contextmenu__WEBPACK_IMPORTED_MODULE_1__[\"ContextMenu\"], {\n      id: '' + id,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 33,\n        columnNumber: 9\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Card\"], {\n      body: true,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 34,\n        columnNumber: 11\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_contextmenu__WEBPACK_IMPORTED_MODULE_1__[\"MenuItem\"], {\n      onClick: () => this.onMarkusCompleted(id),\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 35,\n        columnNumber: 13\n      }\n    }, checked ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 36,\n        columnNumber: 23\n      }\n    }, \"Mark as not completed\") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 36,\n        columnNumber: 57\n      }\n    }, \"Mark as Completed\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_contextmenu__WEBPACK_IMPORTED_MODULE_1__[\"MenuItem\"], {\n      onClick: () => this.onImageDelete(id),\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 38,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      style: {\n        marginTop: '10px',\n        color: 'red'\n      },\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 39,\n        columnNumber: 15\n      }\n    }, \"Delete\")))));\n  }\n\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {\n    markusCompeleted: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_3__[\"markTaskusCompleted\"](task)),\n    deletetask: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_3__[\"deleteTask\"](task))\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(null, mapDispatchToProps)(MenuContext));\n\n//# sourceURL=webpack:///./src/components/ContextMenu/MenuContext.js?");

/***/ }),

/***/ "./src/components/categories/CategoriesList.css":
/*!******************************************************!*\
  !*** ./src/components/categories/CategoriesList.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.SelectedSidebarText{\\n    color: #0078D7;\\n    flex: 0.9;\\n    font-size: 14px; \\n    padding-left: 15px;\\n}\\n.UnselectedSidebarText{\\n    color: black;\\n    flex: 0.9;\\n    font-size: 14px;\\n    padding-left: 10px;\\n}\\n\\n.SelectedColor{\\n  color: #0078D7;\\n  font-size: 14px;\\n}\\n\\n.UnSelectedColor{\\n  font-size: 14px;\\n}\\n\\n.Sidebar{\\n    height: 100%;\\n    flex: 0.2;\\n  }\\n\\n.TextNewCategory {\\n   margin: 10px; \\n   font-size: 14px;\\n   padding-left: 8px;\\n   color: #0078D7;\\n}  \\n\\n.inputCategory {\\n    border: 0;\\n    outline: 0;\\n    font-size: 14px;\\n    padding: 8px;\\n  }\\n\\n  .rowC {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n}\\n\\n.rowCWhiteBackground {\\n  display: flex;\\n  flex-wrap: wrap;\\n  margin: 10px;\\n  align-items: center;\\n  background-color: #FAFAFA;\\n\\n}\\n\\n\\n.categorylogo{\\n  width: 20px;\\n  height: 20px;\\n  margin: 10px;\\n}\\n\\n.categorylogoadd {\\n  width: 20px;\\n  height: 20px;\\n}\\n\\n\\n.navigaitonlogo {\\n  margin: 10px;\\n}\\n\\n.rowCSelected{\\n  display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n  background-color: #EDEDED;\\n}\\n\\n  \", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/categories/CategoriesList.css?");

/***/ }),

/***/ "./src/components/categories/CategoriesList.js":
/*!*****************************************************!*\
  !*** ./src/components/categories/CategoriesList.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/index */ \"./src/actions/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _CategoriesList_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CategoriesList.css */ \"./src/components/categories/CategoriesList.css\");\n/* harmony import */ var _CategoriesList_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_CategoriesList_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _assets_ic_navigation_menu_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/ic_navigation_menu.png */ \"./src/assets/ic_navigation_menu.png\");\n/* harmony import */ var _assets_ic_navigation_menu_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_navigation_menu_png__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _assets_ic_item_list_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/ic_item_list.png */ \"./src/assets/ic_item_list.png\");\n/* harmony import */ var _assets_ic_item_list_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_item_list_png__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/ic_add.png */ \"./src/assets/ic_add.png\");\n/* harmony import */ var _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_add_png__WEBPACK_IMPORTED_MODULE_6__);\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/categories/CategoriesList.js\";\n\n\n\n\n\n\n\n\nclass CategoriesList extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.onNavigationClick = () => {\n      var toggle = !this.props.showFullCategory;\n      console.log(toggle);\n      this.props.toggleSideBar(toggle);\n    };\n\n    this.categoryChange = event => {\n      this.setState({\n        categoryname: event.target.value\n      });\n    };\n\n    this.selectCategory = item => {\n      this.props.selectCategory(item);\n    };\n\n    this.onEnteredPressed = e => {\n      if (e.keyCode === 13) {\n        const now = Date.now(); // Unix timestamp in milliseconds\n\n        this.setState({\n          categoryname: ''\n        });\n        this.props.addCategory({\n          id: now,\n          name: this.state.categoryname,\n          isSelected: false,\n          tasks: [],\n          icon: _assets_ic_item_list_png__WEBPACK_IMPORTED_MODULE_5___default.a\n        });\n      }\n    };\n\n    this.makeEditable = () => {\n      this.props.makeCategory(true);\n    };\n\n    this.categoryChange = this.categoryChange.bind(this);\n    this.onEnteredPressed = this.onEnteredPressed.bind(this);\n    this.makeEditable = this.makeEditable.bind(this);\n    this.selectCategory = this.selectCategory.bind(this);\n    this.onNavigationClick = this.onNavigationClick.bind(this);\n    this.state = {\n      categoryname: ''\n    };\n  }\n\n  getUIbasedonLength(item, index) {\n    if (item.tasks.length > 0) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        key: index,\n        className: \"rowC\",\n        onClick: e => this.selectCategory(item),\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 25,\n          columnNumber: 17\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        alt: item.name,\n        src: item.icon,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 26,\n          columnNumber: 21\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: item.isSelected === true ? 'SelectedSidebarText' : 'UnselectedSidebarText',\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 27,\n          columnNumber: 21\n        }\n      }, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: item.isSelected === true ? 'SelectedColor' : 'UnSelectedColor',\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 28,\n          columnNumber: 21\n        }\n      }, item.tasks.length));\n    } else {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        key: index,\n        className: \"rowC\",\n        onClick: e => this.selectCategory(item),\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 33,\n          columnNumber: 17\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        alt: item.name,\n        src: item.icon,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 34,\n          columnNumber: 21\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: item.isSelected === true ? 'SelectedSidebarText' : 'UnselectedSidebarText',\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 35,\n          columnNumber: 21\n        }\n      }, item.name));\n    }\n  }\n\n  render() {\n    const {\n      categoryname\n    } = this.state;\n    const {\n      isCategoryEditable\n    } = this.props;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"Sidebar\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 72,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"navigaitonlogo\",\n      src: _assets_ic_navigation_menu_png__WEBPACK_IMPORTED_MODULE_4___default.a,\n      alt: \"navigation\",\n      onClick: this.onNavigationClick,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 73,\n        columnNumber: 13\n      }\n    }), this.props.categories.map((item, index) => this.getUIbasedonLength(item, index)), isCategoryEditable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rowCWhiteBackground\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 76,\n        columnNumber: 19\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"categorylogoadd\",\n      alt: \"New list\",\n      src: _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_6___default.a,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 77,\n        columnNumber: 21\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      placeholder: 'New list',\n      type: \"text\",\n      value: categoryname,\n      onKeyDown: this.onEnteredPressed,\n      className: \"inputCategory\",\n      onChange: this.categoryChange,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 78,\n        columnNumber: 21\n      }\n    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rowC\",\n      onClick: this.makeEditable,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 80,\n        columnNumber: 19\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"categorylogoadd\",\n      alt: \"New list\",\n      src: _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_6___default.a,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 81,\n        columnNumber: 21\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"SelectedSidebarText\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 82,\n        columnNumber: 21\n      }\n    }, \" New list\")));\n  }\n\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {\n    addCategory: category => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_1__[\"addCategory\"](category)),\n    selectCategory: category => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_1__[\"selectCategory\"](category)),\n    makeCategory: category => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_1__[\"MakeCategoryEditable\"](category)),\n    toggleSideBar: category => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_1__[\"toggleSideBar\"](category))\n  };\n}\n\nconst mapStateToProps = state => {\n  return {\n    showFullCategory: state.showFullCategory\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(mapStateToProps, mapDispatchToProps)(CategoriesList));\n\n//# sourceURL=webpack:///./src/components/categories/CategoriesList.js?");

/***/ }),

/***/ "./src/components/categories/CategoriesListIcon.js":
/*!*********************************************************!*\
  !*** ./src/components/categories/CategoriesListIcon.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/index */ \"./src/actions/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _CategoriesList_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CategoriesList.css */ \"./src/components/categories/CategoriesList.css\");\n/* harmony import */ var _CategoriesList_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_CategoriesList_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _assets_ic_navigation_menu_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/ic_navigation_menu.png */ \"./src/assets/ic_navigation_menu.png\");\n/* harmony import */ var _assets_ic_navigation_menu_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_navigation_menu_png__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/ic_add.png */ \"./src/assets/ic_add.png\");\n/* harmony import */ var _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_add_png__WEBPACK_IMPORTED_MODULE_5__);\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/categories/CategoriesListIcon.js\";\n\n\n\n\n\n\n\nclass CategoriesListIcon extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.categoryChange = event => {\n      this.setState({\n        categoryname: event.target.value\n      });\n    };\n\n    this.selectCategory = item => {\n      this.props.selectCategory(item);\n    };\n\n    this.onEnteredPressed = e => {\n      if (e.keyCode === 13) {\n        const now = Date.now(); // Unix timestamp in milliseconds\n\n        this.setState({\n          categoryname: ''\n        });\n        this.props.addCategory({\n          id: now,\n          name: this.state.categoryname,\n          isSelected: false,\n          tasks: []\n        });\n      }\n    };\n\n    this.onNavigationClick = () => {\n      var toggle = !this.props.showFullCategory;\n      console.log(toggle);\n      this.props.toggleSideBar(toggle);\n    };\n\n    this.makeEditable = () => {\n      this.props.makeCategory(true);\n      this.onNavigationClick();\n    };\n\n    this.categoryChange = this.categoryChange.bind(this);\n    this.onEnteredPressed = this.onEnteredPressed.bind(this);\n    this.makeEditable = this.makeEditable.bind(this);\n    this.selectCategory = this.selectCategory.bind(this);\n    this.onNavigationClick = this.onNavigationClick.bind(this);\n    this.state = {\n      categoryname: ''\n    };\n  }\n\n  getUIbasedonLength(item, index) {\n    if (item.tasks.length > 0) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        key: index,\n        className: item.isSelected ? 'rowCSelected' : 'rowC',\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 23,\n          columnNumber: 17\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        alt: item.name,\n        onClick: e => this.selectCategory(item),\n        src: item.icon,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 24,\n          columnNumber: 19\n        }\n      }));\n    } else {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        key: index,\n        className: item.isSelected ? 'rowCSelected' : 'rowC',\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 29,\n          columnNumber: 17\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        alt: item.name,\n        onClick: e => this.selectCategory(item),\n        src: item.icon,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 30,\n          columnNumber: 21\n        }\n      }));\n    }\n  }\n\n  render() {\n    const {\n      categoryname\n    } = this.state;\n    const {\n      isCategoryEditable\n    } = this.props;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"Sidebar\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 69,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"navigaitonlogo\",\n      src: _assets_ic_navigation_menu_png__WEBPACK_IMPORTED_MODULE_4___default.a,\n      alt: \"navigation\",\n      onClick: this.onNavigationClick,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 70,\n        columnNumber: 13\n      }\n    }), this.props.categories.map((item, index) => this.getUIbasedonLength(item, index)), isCategoryEditable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      placeholder: '+ New list',\n      type: \"text\",\n      value: categoryname,\n      onKeyDown: this.onEnteredPressed,\n      className: \"inputCategory\",\n      onChange: this.categoryChange,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 73,\n        columnNumber: 19\n      }\n    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"categorylogo\",\n      src: _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_5___default.a,\n      alt: \"Newlist\",\n      onClick: this.makeEditable,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 74,\n        columnNumber: 15\n      }\n    }));\n  }\n\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {\n    addCategory: category => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_1__[\"addCategory\"](category)),\n    selectCategory: category => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_1__[\"selectCategory\"](category)),\n    makeCategory: category => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_1__[\"MakeCategoryEditable\"](category)),\n    toggleSideBar: category => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_1__[\"toggleSideBar\"](category))\n  };\n}\n\nconst mapStateToProps = state => {\n  return {\n    showFullCategory: state.showFullCategory\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(mapStateToProps, mapDispatchToProps)(CategoriesListIcon));\n\n//# sourceURL=webpack:///./src/components/categories/CategoriesListIcon.js?");

/***/ }),

/***/ "./src/components/customcheckbox/Customcheckbox.css":
/*!**********************************************************!*\
  !*** ./src/components/customcheckbox/Customcheckbox.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.checkboxLogo{\\n    width: 20px;\\n    height: 20px;\\n  }\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/customcheckbox/Customcheckbox.css?");

/***/ }),

/***/ "./src/components/customcheckbox/Customcheckbox.js":
/*!*********************************************************!*\
  !*** ./src/components/customcheckbox/Customcheckbox.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_ic_circle_blue_unfilled_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/ic_circle_blue_unfilled.png */ \"./src/assets/ic_circle_blue_unfilled.png\");\n/* harmony import */ var _assets_ic_circle_blue_unfilled_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_circle_blue_unfilled_png__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_ic_checked_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/ic_checked.png */ \"./src/assets/ic_checked.png\");\n/* harmony import */ var _assets_ic_checked_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_checked_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/index */ \"./src/actions/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Customcheckbox_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Customcheckbox.css */ \"./src/components/customcheckbox/Customcheckbox.css\");\n/* harmony import */ var _Customcheckbox_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Customcheckbox_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _tooltip_CustomTooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tooltip/CustomTooltip */ \"./src/components/tooltip/CustomTooltip.js\");\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/customcheckbox/Customcheckbox.js\";\n\n\n\n\n\n\n\n\nclass Customcheckbox extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.onMarkusCompleted = (name, checked, step, taskid) => {\n      if (step != null && step) {\n        this.props.markStepCompleted({\n          selectedtask: taskid,\n          stepid: name,\n          completed: !checked\n        });\n      } else {\n        this.props.markusCompeleted({\n          selectedtask: name,\n          selection: !checked\n        });\n      }\n    };\n\n    this.onMarkusCompleted = this.onMarkusCompleted.bind(this);\n  }\n\n  render() {\n    const {\n      checked,\n      name,\n      step,\n      taskid\n    } = this.props;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tooltip_CustomTooltip__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n      child: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        alt: name,\n        className: \"checkboxLogo\",\n        onClick: () => this.onMarkusCompleted(name, checked, step, taskid),\n        src: checked ? _assets_ic_checked_png__WEBPACK_IMPORTED_MODULE_2___default.a : _assets_ic_circle_blue_unfilled_png__WEBPACK_IMPORTED_MODULE_1___default.a,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 29,\n          columnNumber: 13\n        }\n      }),\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 28,\n        columnNumber: 13\n      }\n    });\n  }\n\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {\n    markusCompeleted: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_3__[\"markTaskusCompleted\"](task)),\n    markStepCompleted: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_3__[\"MarkStepCompleted\"](task))\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(null, mapDispatchToProps)(Customcheckbox));\n\n//# sourceURL=webpack:///./src/components/customcheckbox/Customcheckbox.js?");

/***/ }),

/***/ "./src/components/filepicker/Cutomfilepicker.css":
/*!*******************************************************!*\
  !*** ./src/components/filepicker/Cutomfilepicker.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".divmarginwithflexSelected{\\n    margin: 10px;\\n    display: flex;\\n    flex-wrap: wrap;\\n  }\\n\\n  .addstepimage{\\n    width: 16px;\\n    height: 16px;\\n    margin: 8px; \\n  }\\n\\n  .steplablewithcolor{\\n    color: #0078D7;\\n    margin-top: 8px;\\n    font-size: 14px; \\n}\\n\\n.stepholder{\\n  margin: 10px;\\n  display: flex;\\n  flex-wrap: wrap;\\n}\\n\\n.stepname{\\n  flex: 0.6;\\n  margin-left: 10px;\\n  font-size: 12px;\\n}\\n\\n.addcloseimage{\\n  width: 16px;\\n  margin: 10px;\\n  height: 16px;\\n \\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/filepicker/Cutomfilepicker.css?");

/***/ }),

/***/ "./src/components/filepicker/Cutomfilepicker.js":
/*!******************************************************!*\
  !*** ./src/components/filepicker/Cutomfilepicker.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-files */ \"react-files\");\n/* harmony import */ var react_files__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_files__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Cutomfilepicker_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Cutomfilepicker.css */ \"./src/components/filepicker/Cutomfilepicker.css\");\n/* harmony import */ var _Cutomfilepicker_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Cutomfilepicker_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_ic_attach_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/ic_attach.png */ \"./src/assets/ic_attach.png\");\n/* harmony import */ var _assets_ic_attach_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_attach_png__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/index */ \"./src/actions/index.js\");\n/* harmony import */ var _assets_ic_close_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/ic_close.png */ \"./src/assets/ic_close.png\");\n/* harmony import */ var _assets_ic_close_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_close_png__WEBPACK_IMPORTED_MODULE_6__);\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/filepicker/Cutomfilepicker.js\";\n\n\n\n\n\n\n\n\nclass Cutomfilepicker extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(...args) {\n    super(...args);\n\n    this.onFilesChange = files => {\n      var file = files[files.length - 1];\n      console.log(files);\n      this.props.addFile({\n        selectedtask: this.props.taskid,\n        tfiles: file\n      });\n    };\n\n    this.deletefile = id => {\n      this.props.removefile({\n        fileid: id,\n        selectedtask: this.props.taskid\n      });\n    };\n\n    this.onFilesError = (error, file) => {\n      console.log('error code ' + error.code + ': ' + error.message);\n    };\n  }\n\n  getFileslist(files) {\n    return files.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"stepholder\",\n      key: index,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 27,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"stepname\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 28,\n        columnNumber: 17\n      }\n    }, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      alt: \"delete\",\n      onClick: () => this.deletefile(item.id),\n      src: _assets_ic_close_png__WEBPACK_IMPORTED_MODULE_6___default.a,\n      className: \"addcloseimage\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 29,\n        columnNumber: 17\n      }\n    })));\n    ;\n  }\n\n  render() {\n    const {\n      files\n    } = this.props;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 38,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"files\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 39,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_files__WEBPACK_IMPORTED_MODULE_1___default.a, {\n      className: \"files-dropzone\",\n      onChange: this.onFilesChange,\n      onError: this.onFilesError,\n      accepts: ['image/png', '.pdf', 'audio/*'],\n      multiple: true,\n      maxFiles: 10000000,\n      maxFileSize: 10000000,\n      minFileSize: 0,\n      clickable: true,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 40,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"divmarginwithflexSelected\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 51,\n        columnNumber: 21\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      alt: \"greycircle\",\n      className: \"addstepimage\",\n      src: _assets_ic_attach_png__WEBPACK_IMPORTED_MODULE_3___default.a,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 52,\n        columnNumber: 25\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"steplablewithcolor\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 53,\n        columnNumber: 25\n      }\n    }, \"Add a file\")))), files != null && files.length > 0 ? this.getFileslist(files) : null);\n  }\n\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {\n    addFile: file => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_5__[\"AddFile\"](file)),\n    removefile: file => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_5__[\"RemoveFile\"](file))\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(null, mapDispatchToProps)(Cutomfilepicker));\n\n//# sourceURL=webpack:///./src/components/filepicker/Cutomfilepicker.js?");

/***/ }),

/***/ "./src/components/menu/Menu.css":
/*!**************************************!*\
  !*** ./src/components/menu/Menu.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.NavBackground{\\n    background-image: linear-gradient(#0078D7, #0078D7,#0078D7); /* Standard syntax (must be last) */\\n  }\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/menu/Menu.css?");

/***/ }),

/***/ "./src/components/menu/Menu.js":
/*!*************************************!*\
  !*** ./src/components/menu/Menu.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Menu; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu.css */ \"./src/components/menu/Menu.css\");\n/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Menu_css__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/menu/Menu.js\";\n\n\n\nclass Menu extends react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  constructor(...args) {\n    super(...args);\n\n    this._onLogoutClick = () => {\n      localStorage.clear();\n    };\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Navbar\"], {\n      className: \"NavBackground\",\n      collapseOnSelect: true,\n      expand: \"lg\",\n      bg: \"dark\",\n      variant: \"dark\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 13,\n        columnNumber: 6\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Navbar\"].Brand, {\n      href: \"/\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 14,\n        columnNumber: 14\n      }\n    }, \"Todo\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Navbar\"].Toggle, {\n      \"aria-controls\": \"responsive-navbar-nav\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 15,\n        columnNumber: 18\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Navbar\"].Collapse, {\n      id: \"responsive-navbar-nav\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 16,\n        columnNumber: 22\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"], {\n      className: \"mr-auto\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 17,\n        columnNumber: 26\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"], {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 19,\n        columnNumber: 21\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"].Link, {\n      href: \"/\",\n      onClick: this._onLogoutClick,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 20,\n        columnNumber: 23\n      }\n    }, \"Logout\"))));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/components/menu/Menu.js?");

/***/ }),

/***/ "./src/components/optionmenu/SortMenu.css":
/*!************************************************!*\
  !*** ./src/components/optionmenu/SortMenu.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.Sort{\\n    font-size: 18px;\\n    padding-left: 5px;\\n    color: #0078D7;\\n  }\\n\\n  .sortdiv{\\n    justify-content: flex-end;\\n    flex: 0.1;\\n    margin-top: 10px;\\n    margin-bottom: 10px;\\n  \\n  }\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/optionmenu/SortMenu.css?");

/***/ }),

/***/ "./src/components/optionmenu/SortMenu.js":
/*!***********************************************!*\
  !*** ./src/components/optionmenu/SortMenu.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_ic_sort_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/ic_sort.png */ \"./src/assets/ic_sort.png\");\n/* harmony import */ var _assets_ic_sort_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_sort_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _SortMenu_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SortMenu.css */ \"./src/components/optionmenu/SortMenu.css\");\n/* harmony import */ var _SortMenu_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_SortMenu_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/index */ \"./src/actions/index.js\");\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/optionmenu/SortMenu.js\";\n\n\n\n\n\n\n\nclass SortMenu extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.sortdecending = () => {\n      this.props.sortDecending();\n    };\n\n    this.sortascending = () => {\n      this.props.sortAscending();\n    };\n\n    this.CustomToggle = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(({\n      children,\n      onClick\n    }, ref) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n      ref: ref,\n      onClick: e => {\n        e.preventDefault();\n        onClick(e);\n      },\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 26,\n        columnNumber: 9\n      }\n    }, children));\n    this.sortascending = this.sortascending.bind(this);\n    this.sortdecending = this.sortdecending.bind(this);\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"sortdiv\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 41,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Dropdown\"], {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 42,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Dropdown\"].Toggle, {\n      as: this.CustomToggle,\n      id: \"dropdown-custom-components\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 43,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 44,\n        columnNumber: 21\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_ic_sort_png__WEBPACK_IMPORTED_MODULE_2___default.a,\n      alt: \"sort\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 45,\n        columnNumber: 25\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n      className: \"Sort\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 46,\n        columnNumber: 25\n      }\n    }, \"sort\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Dropdown\"].Menu, {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 49,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Dropdown\"].Item, {\n      onClick: this.sortascending,\n      eventKey: \"1\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 50,\n        columnNumber: 21\n      }\n    }, \"Ascending\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Dropdown\"].Item, {\n      onClick: this.sortdecending,\n      eventKey: \"2\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 51,\n        columnNumber: 21\n      }\n    }, \"Descending\"))));\n  }\n\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {\n    sortAscending: tasks => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_5__[\"sortAscending\"](tasks)),\n    sortDecending: tasks => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_5__[\"sortDecending\"](tasks))\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(null, mapDispatchToProps)(SortMenu));\n\n//# sourceURL=webpack:///./src/components/optionmenu/SortMenu.js?");

/***/ }),

/***/ "./src/components/taskdescription/DescriptionComponent.css":
/*!*****************************************************************!*\
  !*** ./src/components/taskdescription/DescriptionComponent.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.Sidebar{\\n    background-color: #F4F4F4;\\n    padding: 10px;\\n    height: 100%;\\n  }\\n\\n.rowCA {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n    padding: 5px;\\n    background-color: white;\\n}\\n  \\n.descriptionlable{\\n    margin:10px;\\n}\\n  \\n.descriptionlablewithcolor{\\n    margin-top:10px;\\n    margin-bottom: 10px;\\n    color: #0078D7;\\n  \\n}\\n\\n.descriptionlablewithcolorStrike{\\n    margin-top:10px;\\n    margin-bottom: 10px;\\n    color: #0078D7;\\n    text-decoration: line-through; \\n}\\n  \\n.inputDescription {\\n    border: 0;\\n    outline: 0;\\n    width: 100%;\\n    min-height: 100px;\\n    padding-left: 20px;\\n    padding-top: 10px;\\n    padding-bottom: 10px;\\n    padding-right: 10px;\\n    font-size: 14px;\\n  }\\n\\n  .divmargintop{\\n      margin-top: 10px;\\n  }\\n\\n  .whitebackground{\\n      background-color: white;\\n      padding: 10px;\\n  }\\n\\n  .divmarginwithflex{\\n      margin: 10px;\\n      display: flex;\\n      flex-wrap: wrap;\\n  }\\n\\n  .divmarginwithflexSelected{\\n    margin: 10px;\\n    display: flex;\\n    flex-wrap: wrap;\\n  }\\n\\n  .inputstep {\\n    border: 0;\\n    outline: 0;\\n    font-size: 14px;\\n    padding-left: 10px;\\n  }\\n\\n  .divmargin{\\n    margin: 10px;\\n}\\n\\n  .addstepimage{\\n    width: 20px;\\n    height: 20px;\\n  }\\n\\n  .greycircletheme {\\n    width: 19px;\\n    height: 19px;\\n    margin-left: 5px;\\n  }\\n  \\n.steplablewithcolor{\\n    color: #0078D7;\\n    margin-top: 8px;\\n    font-size: 14px; \\n}\\n\\n.stepholder{\\n  margin: 10px;\\n  display: flex;\\n  flex-wrap: wrap;\\n}\\n\\n.stepname{\\n  flex: 0.6;\\n  margin-top: 10px;\\n  margin-left: 10px;\\n}\\n\\n.stepclose {\\n  flex: 0.2;\\n}\\n\\n.marginten{\\n  margin: 5px;\\n  font-size: 14;\\n}\\n\\n.addstepimagewithflex{\\n  flex: 0.2;\\n  width: 20px;\\n  height: 20px;\\n}\\n\\n.holderdivpadding {\\n  margin-left: 10px;\\n  margin-bottom: 10px;\\n  display: flex;\\n  flex-wrap: wrap; \\n}\\n\\n.holderdivStepPaddding {\\n   margin-left: 15px;\\n   margin-bottom: 10px;\\n   display: flex;\\n   flex-wrap: wrap;\\n   align-items: center;\\n\\n}\\n\\n.holdetStepNamePadding {\\n  flex:0.9;\\n  margin-left: 10px;\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/taskdescription/DescriptionComponent.css?");

/***/ }),

/***/ "./src/components/taskdescription/DescriptionComponent.js":
/*!****************************************************************!*\
  !*** ./src/components/taskdescription/DescriptionComponent.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/index */ \"./src/actions/index.js\");\n/* harmony import */ var _customcheckbox_Customcheckbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../customcheckbox/Customcheckbox */ \"./src/components/customcheckbox/Customcheckbox.js\");\n/* harmony import */ var _DescriptionComponent_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DescriptionComponent.css */ \"./src/components/taskdescription/DescriptionComponent.css\");\n/* harmony import */ var _DescriptionComponent_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_DescriptionComponent_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ \"@material-ui/core\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-textarea-autosize */ \"react-textarea-autosize\");\n/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/ic_add.png */ \"./src/assets/ic_add.png\");\n/* harmony import */ var _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_add_png__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_ic_circle_grey_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../assets/ic_circle_grey.png */ \"./src/assets/ic_circle_grey.png\");\n/* harmony import */ var _assets_ic_circle_grey_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_circle_grey_png__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_ic_close_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../assets/ic_close.png */ \"./src/assets/ic_close.png\");\n/* harmony import */ var _assets_ic_close_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_close_png__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _filepicker_Cutomfilepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../filepicker/Cutomfilepicker */ \"./src/components/filepicker/Cutomfilepicker.js\");\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/taskdescription/DescriptionComponent.js\";\n\n\n\n\n\n\n\n\n\n\n\n\nclass DescriptionComponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.deleteStep = id => {\n      this.props.DeleteStep({\n        stepid: id,\n        selectedtask: this.props.selectedTask.id\n      });\n    };\n\n    this.onAddstepClicked = isedit => {\n      this.setState({\n        iseditable: isedit\n      });\n    };\n\n    this.onStepChange = event => {\n      this.setState({\n        taskname: event.target.value\n      });\n    };\n\n    this.onTasknameChange = event => {\n      this.props.addTaskDescription({\n        description: event.target.value,\n        selectedtask: this.props.selectedTask.id\n      });\n    };\n\n    this.onMarkusCompleted = e => {\n      this.props.markusCompeleted({\n        selectedtask: e.target.name,\n        selection: e.target.checked\n      });\n    };\n\n    this.getListStpItem = steps => {\n      return steps.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        key: index,\n        className: \"holderdivStepPaddding\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 53,\n          columnNumber: 13\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_customcheckbox_Customcheckbox__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        checked: item.isCompleted,\n        name: item.id,\n        step: true,\n        taskid: this.props.selectedTask.id,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 54,\n          columnNumber: 17\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"holdetStepNamePadding\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 55,\n          columnNumber: 17\n        }\n      }, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        alt: \"delete\",\n        onClick: () => this.deleteStep(item.id),\n        className: \"addstepimage\",\n        src: _assets_ic_close_png__WEBPACK_IMPORTED_MODULE_9___default.a,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 56,\n          columnNumber: 16\n        }\n      })));\n    };\n\n    this.onEnteredPressed = e => {\n      if (e.keyCode === 13) {\n        this.setState({\n          taskname: ''\n        });\n        const now = Date.now(); // Unix timestamp in milliseconds\n\n        this.props.AddStep({\n          selectedtask: this.props.selectedTask.id,\n          step: {\n            id: now,\n            name: this.state.taskname,\n            isCompleted: false\n          }\n        });\n      }\n    };\n\n    this.onTasknameChange = event => {\n      this.props.addTaskDescription({\n        description: event.target.value,\n        selectedtask: this.props.selectedTask.id\n      });\n    };\n\n    this.state = {\n      desc: ''\n    };\n    this.onMarkusCompleted = this.onMarkusCompleted.bind(this);\n    this.onAddstepClicked = this.onAddstepClicked.bind(this);\n    this.deleteStep = this.deleteStep.bind(this);\n    this.state = {\n      iseditable: false,\n      taskname: ''\n    };\n  }\n\n  componentDidMount() {\n    this.setState({\n      iseditable: false\n    });\n  }\n\n  render() {\n    const {\n      description,\n      name,\n      completed,\n      selectedTask,\n      steps,\n      files\n    } = this.props;\n    const {\n      iseditable,\n      taskname\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"Sidebar\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 78,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 79,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"Card\"], {\n      className: \"divmargintop\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 80,\n        columnNumber: 21\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rowCA\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 81,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"divmargin\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 82,\n        columnNumber: 29\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_customcheckbox_Customcheckbox__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      checked: completed,\n      name: selectedTask.id,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 83,\n        columnNumber: 33\n      }\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: completed ? 'descriptionlablewithcolorStrike' : 'descriptionlablewithcolor',\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 85,\n        columnNumber: 29\n      }\n    }, name)), this.getListStpItem(steps), iseditable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"holderdivpadding\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 91,\n        columnNumber: 29\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      alt: \"greycircle\",\n      onClick: () => this.onAddstepClicked(false),\n      className: \"greycircletheme\",\n      src: _assets_ic_circle_grey_png__WEBPACK_IMPORTED_MODULE_8___default.a,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 92,\n        columnNumber: 33\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      placeholder: steps.length > 0 ? 'Next step' : 'Add step',\n      className: \"inputstep\",\n      type: \"text\",\n      value: taskname,\n      onChange: this.onStepChange,\n      onKeyDown: this.onEnteredPressed,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 93,\n        columnNumber: 33\n      }\n    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"holderdivpadding\",\n      onClick: () => this.onAddstepClicked(true),\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 96,\n        columnNumber: 29\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      alt: \"addicon\",\n      className: \"addstepimage\",\n      src: _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_7___default.a,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 97,\n        columnNumber: 33\n      }\n    }), steps.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"steplablewithcolor\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 99,\n        columnNumber: 37\n      }\n    }, \"Next step\") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"steplablewithcolor\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 101,\n        columnNumber: 37\n      }\n    }, \"Add step\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"Card\"], {\n      className: \"divmargintop\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 108,\n        columnNumber: 21\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_filepicker_Cutomfilepicker__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      taskid: selectedTask.id,\n      files: files,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 109,\n        columnNumber: 25\n      }\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"Card\"], {\n      className: \"divmargintop\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 112,\n        columnNumber: 21\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_6___default.a, {\n      placeholder: 'Add note',\n      type: \"text\",\n      value: description,\n      className: \"inputDescription\",\n      onChange: this.onTasknameChange,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 113,\n        columnNumber: 25\n      }\n    }))));\n  }\n\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {\n    addTaskDescription: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_2__[\"addTaskDescription\"](task)),\n    markusCompeleted: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_2__[\"markTaskusCompleted\"](task)),\n    AddStep: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_2__[\"AddStep\"](task)),\n    DeleteStep: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_2__[\"DeleteStep\"](task))\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(null, mapDispatchToProps)(DescriptionComponent));\n\n//# sourceURL=webpack:///./src/components/taskdescription/DescriptionComponent.js?");

/***/ }),

/***/ "./src/components/tasklist/TaskList.css":
/*!**********************************************!*\
  !*** ./src/components/tasklist/TaskList.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.rowC {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n    padding: 8px;\\n    margin-top: 8px;\\n    border-bottom: 2px solid #F4F4F4;\\n}\\n\\n.rowCBottomSelected {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  padding: 8px;\\n  margin-top: 10px;\\n  border-bottom: 2px solid #0078D7;\\n}\\n\\n.rowCSelected {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  padding: 8px;\\n  margin-top: 8px;\\n  background-color:#F4F6FF  ;\\n  border-bottom: 1px solid #F4F4F4;\\n}\\n\\n.rowchildTwo {\\n    flex: 0.9;\\n    padding-left: 10px;\\n  }\\n\\n  .TextNewCategory {\\n    margin: 10px; \\n    font-size: 14px;\\n    color: #0078D7;\\n  }\\n\\n  .TaskContainer{\\n    padding: 10px;\\n    height: 100%;\\n  }\\n\\n  .Taskname{\\n    font-size: 18px;\\n    margin-top: 10px;\\n    margin-left: 4px;\\n    margin-bottom: 10px;\\n    color: #0078D7;\\n    flex: 0.9;\\n  }\\n\\n  .TasknameWithoutColor{\\n    font-size: 18px;\\n    margin-top: 20px;\\n    margin-left: 4px;\\n    margin-bottom: 10px;\\n    flex: 0.9;\\n  }\\n\\n\\n  .Sort{\\n    font-size: 18px;\\n    padding-left: 5px;\\n    color: #0078D7;\\n  }\\n\\n  .sortdiv{\\n    justify-content: flex-end;\\n    flex: 0.1;\\n    margin-top: 10px;\\n    margin-bottom: 10px;\\n  \\n  }\\n\\n  \\n  .TextNewSize{\\n    font-size: 14px;\\n    color: #0078D7;\\n    padding-left: 10px;\\n  }\\n\\n  .input {\\n    border: 0;\\n    outline: 0;\\n    flex: 0.8;\\n    padding: 8px;\\n    font-size: 14px;\\n  }\\n  \\n  .crossed-line {\\n    text-decoration: line-through;\\n    padding-left: 10px;\\n}\\n\\n.taskdiv{\\nflex: 0.9;\\n}\\n\\n.Logo{\\n  width: 20px;\\n  height: 20px;\\n}\\n\\n.stepsinfo{\\n  font-size: 12px;\\n}\\n\\n.stepsinfowithMargin{\\n  font-size: 12px;\\n  margin-left: 10px;\\n}\\n\\n\\n.TaskdivListItem {\\n  display: flex;\\n  flex-wrap: wrap;\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/tasklist/TaskList.css?");

/***/ }),

/***/ "./src/components/tasklist/TaskList.js":
/*!*********************************************!*\
  !*** ./src/components/tasklist/TaskList.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _TaskList_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskList.css */ \"./src/components/tasklist/TaskList.css\");\n/* harmony import */ var _TaskList_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_TaskList_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/index */ \"./src/actions/index.js\");\n/* harmony import */ var _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/ic_add.png */ \"./src/assets/ic_add.png\");\n/* harmony import */ var _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_add_png__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _assets_ic_circle_grey_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/ic_circle_grey.png */ \"./src/assets/ic_circle_grey.png\");\n/* harmony import */ var _assets_ic_circle_grey_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_ic_circle_grey_png__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _customcheckbox_Customcheckbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../customcheckbox/Customcheckbox */ \"./src/components/customcheckbox/Customcheckbox.js\");\n/* harmony import */ var _optionmenu_SortMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../optionmenu/SortMenu */ \"./src/components/optionmenu/SortMenu.js\");\n/* harmony import */ var _ContextMenu_MenuContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ContextMenu/MenuContext */ \"./src/components/ContextMenu/MenuContext.js\");\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/tasklist/TaskList.js\";\n\n\n\n\n\n\n\n\n\n\n\nclass TaskList extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.onTasknameChange = event => {\n      this.setState({\n        taskname: event.target.value\n      });\n    };\n\n    this.onEnteredPressed = e => {\n      if (e.keyCode === 13) {\n        this.setState({\n          taskname: ''\n        });\n        const now = Date.now(); // Unix timestamp in milliseconds\n\n        this.props.addNewTask({\n          id: now,\n          name: this.state.taskname,\n          description: '',\n          isSelected: false,\n          isCompleted: false,\n          steps: [],\n          files: []\n        });\n      }\n    };\n\n    this.onTaskClick = this.onTaskClick.bind(this);\n    this.makeEditable = this.makeEditable.bind(this);\n    this.onTasknameChange = this.onTasknameChange.bind(this);\n    this.onEnteredPressed = this.onEnteredPressed.bind(this);\n    this.makenonEditeable = this.makenonEditeable.bind(this);\n    this.state = {\n      taskname: ''\n    };\n  }\n\n  onTaskClick(id, e) {\n    this.setState({\n      taskname: ''\n    });\n    this.props.selectTask({\n      showDescription: true,\n      selectedtask: id\n    });\n  }\n\n  makeEditable() {\n    this.setState({\n      taskname: ''\n    });\n    this.props.MakeEditable(true);\n  }\n\n  makenonEditeable() {\n    this.setState({\n      taskname: ''\n    });\n    this.props.MakeEditable(false);\n  }\n\n  getListItems(category, selectedTask, steps, files) {\n    return category[0].tasks.filter(function (task) {\n      return task.isCompleted !== true;\n    }).map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      key: index,\n      className: selectedTask != null && selectedTask.id === item.id ? 'rowCSelected' : 'rowC',\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 59,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_customcheckbox_Customcheckbox__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      checked: item.isCompleted,\n      name: item.id,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 60,\n        columnNumber: 17\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rowchildTwo\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 61,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ContextMenu_MenuContext__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      checked: item.isCompleted,\n      id: item.id,\n      child: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        onClick: e => this.onTaskClick(item.id, e),\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 63,\n          columnNumber: 25\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 64,\n          columnNumber: 29\n        }\n      }, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"TaskdivListItem\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 65,\n          columnNumber: 29\n        }\n      }, steps != null && steps.length > 0 && selectedTask != null && selectedTask.id === item.id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"stepsinfo\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 67,\n          columnNumber: 33\n        }\n      }, steps.filter(function (step) {\n        return step.isCompleted;\n      }).length, \" of \", steps.length) : null, files != null && files.length > 0 && selectedTask != null && selectedTask.id === item.id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"stepsinfowithMargin\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 73,\n          columnNumber: 33\n        }\n      }, \" @ files attached\") : null)),\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 62,\n        columnNumber: 21\n      }\n    }))));\n  }\n\n  getCompletedListItem(category, selectedTask, steps) {\n    const completedtask = category[0].tasks.filter(function (task) {\n      return task.isCompleted;\n    });\n    return completedtask != null && completedtask.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"ListGroup\"], {\n      variant: \"flush\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 90,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n      className: \"TasknameWithoutColor\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 91,\n        columnNumber: 17\n      }\n    }, \" Completed \"), completedtask.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      key: index,\n      className: selectedTask != null && selectedTask.id === item.id ? 'rowCSelected' : 'rowC',\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 93,\n        columnNumber: 21\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_customcheckbox_Customcheckbox__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      checked: item.isCompleted,\n      name: item.id,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 94,\n        columnNumber: 25\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"taskdiv\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 95,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ContextMenu_MenuContext__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      checked: item.isCompleted,\n      id: item.id,\n      child: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"crossed-line\",\n        onClick: e => this.onTaskClick(item.id, e),\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 97,\n          columnNumber: 33\n        }\n      }, item.name),\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 96,\n        columnNumber: 29\n      }\n    }))))) : null;\n  }\n\n  render() {\n    const {\n      isEditable,\n      category,\n      selectedTask,\n      steps,\n      files\n    } = this.props;\n    const {\n      taskname\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"TaskContainer\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 111,\n        columnNumber: 13\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      style: {\n        display: 'flex',\n        flexDirection: 'row-reverse'\n      },\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 113,\n        columnNumber: 17\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_optionmenu_SortMenu__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 114,\n        columnNumber: 21\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n      className: \"Taskname\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 115,\n        columnNumber: 21\n      }\n    }, category[0].name)), isEditable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rowCBottomSelected\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 119,\n        columnNumber: 23\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"Logo\",\n      onClick: this.makenonEditeable,\n      src: _assets_ic_circle_grey_png__WEBPACK_IMPORTED_MODULE_6___default.a,\n      alt: \"logo\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 120,\n        columnNumber: 25\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      placeholder: 'Add a task',\n      type: \"text\",\n      value: taskname,\n      onKeyDown: this.onEnteredPressed,\n      className: \"input\",\n      onChange: this.onTasknameChange,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 121,\n        columnNumber: 25\n      }\n    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rowC\",\n      onClick: this.makeEditable,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 123,\n        columnNumber: 23\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"Logo\",\n      src: _assets_ic_add_png__WEBPACK_IMPORTED_MODULE_5___default.a,\n      alt: \"logo\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 124,\n        columnNumber: 25\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"TextNewSize\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 125,\n        columnNumber: 25\n      }\n    }, \" Add a task\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"ListGroup\"], {\n      variant: \"flush\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 128,\n        columnNumber: 17\n      }\n    }, this.getListItems(category, selectedTask, steps, files)), this.getCompletedListItem(category, selectedTask, steps, files));\n  }\n\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return {\n    addNewTask: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_4__[\"addNewTask\"](task)),\n    selectTask: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_4__[\"SelectTask\"](task)),\n    MakeEditable: task => dispatch(_actions_index__WEBPACK_IMPORTED_MODULE_4__[\"MakeEditable\"](task))\n  };\n}\n\nconst mapStateToProps = state => {\n  return {\n    category: state.categories.filter(function (item) {\n      return item.isSelected;\n    }),\n    showDescription: state.showDescription,\n    isEditable: state.isEditable\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"connect\"])(mapStateToProps, mapDispatchToProps)(TaskList));\n\n//# sourceURL=webpack:///./src/components/tasklist/TaskList.js?");

/***/ }),

/***/ "./src/components/tooltip/CustomTooltip.js":
/*!*************************************************!*\
  !*** ./src/components/tooltip/CustomTooltip.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CustomTooltip; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Tooltip */ \"@material-ui/core/Tooltip\");\n/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/components/tooltip/CustomTooltip.js\";\n\n\nclass CustomTooltip extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    const {\n      child\n    } = this.props;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_1___default.a, {\n      title: \"Mark as completed\",\n      arrow: true,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 10,\n        columnNumber: 11\n      }\n    }, child);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/components/tooltip/CustomTooltip.js?");

/***/ }),

/***/ "./src/constants/action-types.js":
/*!***************************************!*\
  !*** ./src/constants/action-types.js ***!
  \***************************************/
/*! exports provided: ADD_CATEGORY, SELECT_CATEGORY, ADD_NEW_TASK, SELECT_TASK, MAKE_TASK_EDITABLE, IS_CATEGORY_EDITABLE, ADD_DESCRIPTION, MARK_US_COMPLETED, DELETE_TASK, TOGGLE_SIDEBAR, SORT_ASCENDING, SORT_DECENDING, ADD_STEP, DELETE_STEP, MARKSTEP_COMPLETED, ADDFILE, REMOVEFILE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_CATEGORY\", function() { return ADD_CATEGORY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SELECT_CATEGORY\", function() { return SELECT_CATEGORY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_NEW_TASK\", function() { return ADD_NEW_TASK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SELECT_TASK\", function() { return SELECT_TASK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAKE_TASK_EDITABLE\", function() { return MAKE_TASK_EDITABLE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IS_CATEGORY_EDITABLE\", function() { return IS_CATEGORY_EDITABLE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_DESCRIPTION\", function() { return ADD_DESCRIPTION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MARK_US_COMPLETED\", function() { return MARK_US_COMPLETED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DELETE_TASK\", function() { return DELETE_TASK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TOGGLE_SIDEBAR\", function() { return TOGGLE_SIDEBAR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SORT_ASCENDING\", function() { return SORT_ASCENDING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SORT_DECENDING\", function() { return SORT_DECENDING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_STEP\", function() { return ADD_STEP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DELETE_STEP\", function() { return DELETE_STEP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MARKSTEP_COMPLETED\", function() { return MARKSTEP_COMPLETED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADDFILE\", function() { return ADDFILE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVEFILE\", function() { return REMOVEFILE; });\nconst ADD_CATEGORY = \"ADD_CATEGORY\";\nconst SELECT_CATEGORY = \"SELECT_CATEGORY\";\nconst ADD_NEW_TASK = \"ADD_NEW_TASK\";\nconst SELECT_TASK = \"SELECT_TASK\";\nconst MAKE_TASK_EDITABLE = \"MAKE_TASK_EDITABLE\";\nconst IS_CATEGORY_EDITABLE = \"IS_CATEGORY_EDITABLE\";\nconst ADD_DESCRIPTION = \"ADD_DESCRIPTION\";\nconst MARK_US_COMPLETED = \"MARK_US_COMPLETED\";\nconst DELETE_TASK = \"DELETE_TASK\";\nconst TOGGLE_SIDEBAR = \"TOGGLE_SIDEBAR\";\nconst SORT_ASCENDING = \"SORT_ASCENDING\";\nconst SORT_DECENDING = \"SORT_DECENDING\";\nconst ADD_STEP = 'ADD_STEP';\nconst DELETE_STEP = 'DELETE_STEP';\nconst MARKSTEP_COMPLETED = 'MARKSTEP_COMPLETED';\nconst ADDFILE = 'ADDFILE';\nconst REMOVEFILE = 'REMOVEFILE';\n\n//# sourceURL=webpack:///./src/constants/action-types.js?");

/***/ }),

/***/ "./src/container/dashboard/Dashboard.css":
/*!***********************************************!*\
  !*** ./src/container/dashboard/Dashboard.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".fill-window {\\n  height: 100%;\\n  position: absolute;\\n  width: 100%;\\n  flex-wrap: wrap;\\n  display: inline-flex;\\n  flex-direction: row;\\n  flex-flow: row;\\n}\\n\\n.leftboxtwenty { \\n  float:left;  \\n  width:20%; \\n  height:100vh; \\n} \\n\\n\\n.middleboxsixty { \\n  float:left;  \\n  width:60%; \\n  height:100vh;\\n}\\n.middleboxeighty { \\n  float:left;  \\n  width:75%; \\n  height:100vh;\\n} \\n\\n.rightboxeighty{ \\n  float:right; \\n  width:80%; \\n  height:100vh;\\n} \\n\\n.rightboxtwenty{ \\n  float:right; \\n  width:20%; \\n  height:100vh;\\n} \\n\\n.rightboxnintyfive{ \\n  float:right; \\n  width:95%; \\n  height:100vh;\\n} \\n\\n.leftboxicon {\\n  float:left;  \\n  width:5%; \\n  height:100vh;\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/container/dashboard/Dashboard.css?");

/***/ }),

/***/ "./src/container/dashboard/Dashboard.js":
/*!**********************************************!*\
  !*** ./src/container/dashboard/Dashboard.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dashboard.css */ \"./src/container/dashboard/Dashboard.css\");\n/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Dashboard_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_categories_CategoriesList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/categories/CategoriesList */ \"./src/components/categories/CategoriesList.js\");\n/* harmony import */ var _components_categories_CategoriesListIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/categories/CategoriesListIcon */ \"./src/components/categories/CategoriesListIcon.js\");\n/* harmony import */ var _components_tasklist_TaskList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/tasklist/TaskList */ \"./src/components/tasklist/TaskList.js\");\n/* harmony import */ var _components_taskdescription_DescriptionComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/taskdescription/DescriptionComponent */ \"./src/components/taskdescription/DescriptionComponent.js\");\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/container/dashboard/Dashboard.js\";\n\n\n\n\n\n\n\n\nclass Dashboard extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      showFullCategory: true\n    };\n  }\n\n  render() {\n    const {\n      selected,\n      showDescription,\n      categories,\n      isCategoryEditable,\n      selectedTask,\n      showFullCategory\n    } = this.props;\n    if (showDescription) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"fill-window\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 22,\n        columnNumber: 17\n      }\n    }, showFullCategory ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"leftboxtwenty\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 26,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_categories_CategoriesList__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      categories: categories,\n      isCategoryEditable: isCategoryEditable,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 27,\n        columnNumber: 29\n      }\n    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"leftboxicon\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 30,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_categories_CategoriesListIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      categories: categories,\n      isCategoryEditable: isCategoryEditable,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 31,\n        columnNumber: 29\n      }\n    })), showFullCategory ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"middleboxsixty\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 38,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_tasklist_TaskList__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      files: selectedTask != null ? selectedTask.files : null,\n      steps: selectedTask != null ? selectedTask.steps : null,\n      showFullCategory: showFullCategory,\n      selectedTask: selectedTask,\n      category: selected,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 39,\n        columnNumber: 29\n      }\n    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"middleboxeighty\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 42,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_tasklist_TaskList__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      files: selectedTask != null ? selectedTask.files : null,\n      steps: selectedTask != null ? selectedTask.steps : null,\n      showFullCategory: showFullCategory,\n      selectedTask: selectedTask,\n      category: selected,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 43,\n        columnNumber: 29\n      }\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rightboxtwenty\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 49,\n        columnNumber: 21\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_taskdescription_DescriptionComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n      files: selectedTask != null && selectedTask.files.length > 0 ? selectedTask.files : null,\n      steps: selectedTask.steps,\n      completed: selectedTask.isCompleted,\n      name: selectedTask.name,\n      description: selectedTask.description,\n      selectedTask: selectedTask,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 50,\n        columnNumber: 25\n      }\n    })));else return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"fill-window\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 58,\n        columnNumber: 17\n      }\n    }, showFullCategory ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"leftboxtwenty\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 62,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_categories_CategoriesList__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      categories: categories,\n      isCategoryEditable: isCategoryEditable,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 63,\n        columnNumber: 29\n      }\n    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"leftboxicon\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 66,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_categories_CategoriesListIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      categories: categories,\n      isCategoryEditable: isCategoryEditable,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 67,\n        columnNumber: 29\n      }\n    })), showFullCategory ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rightboxeighty\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 74,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_tasklist_TaskList__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      files: selectedTask != null ? selectedTask.files : null,\n      steps: selectedTask != null ? selectedTask.steps : null,\n      showFullCategory: showFullCategory,\n      selectedTask: selectedTask,\n      category: selected,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 75,\n        columnNumber: 29\n      }\n    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"rightboxnintyfive\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 78,\n        columnNumber: 25\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_tasklist_TaskList__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      files: selectedTask != null ? selectedTask.files : null,\n      steps: selectedTask != null ? selectedTask.steps : null,\n      showFullCategory: showFullCategory,\n      selectedTask: selectedTask,\n      category: selected,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 79,\n        columnNumber: 29\n      }\n    })));\n  }\n\n}\n\nconst mapStateToProps = state => {\n  const selectedCategory = state.categories.filter(function (item) {\n    return item.isSelected;\n  })[0];\n  return {\n    categories: state.categories,\n    showDescription: state.showDescription,\n    isCategoryEditable: state.isCategoryEditable,\n    selected: selectedCategory,\n    selectedTask: state.selectedTask,\n    showFullCategory: state.showFullCategory\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps)(Dashboard));\n\n//# sourceURL=webpack:///./src/container/dashboard/Dashboard.js?");

/***/ }),

/***/ "./src/container/root/App.css":
/*!************************************!*\
  !*** ./src/container/root/App.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".App {\\n  text-align: center;\\n}\\n\\n.App-logo {\\n  animation: App-logo-spin infinite 20s linear;\\n  height: 40vmin;\\n  pointer-events: none;\\n}\\n\\n.App-header {\\n  background-color: #282c34;\\n  min-height: 100vh;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  font-size: calc(10px + 2vmin);\\n  color: white;\\n}\\n\\n.App-link {\\n  color: #61dafb;\\n}\\n\\n@keyframes App-logo-spin {\\n  from {\\n    transform: rotate(0deg);\\n  }\\n  to {\\n    transform: rotate(360deg);\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/container/root/App.css?");

/***/ }),

/***/ "./src/container/root/App.js":
/*!***********************************!*\
  !*** ./src/container/root/App.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_menu_Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/menu/Menu */ \"./src/components/menu/Menu.js\");\n/* harmony import */ var _container_dashboard_Dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../container/dashboard/Dashboard */ \"./src/container/dashboard/Dashboard.js\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.css */ \"./src/container/root/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/container/root/App.js\";\n\n\n\n\n\nfunction App() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 8,\n      columnNumber: 5\n    }\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/container/root/App.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\n\nlet app = __webpack_require__(/*! ./server */ \"./src/server/index.js\").default;\n\nif (true) {\n  module.hot.accept(/*! ./server */ \"./src/server/index.js\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (() => {\n    console.log('Server reloading...');\n\n    try {\n      app = __webpack_require__(/*! ./server */ \"./src/server/index.js\").default;\n    } catch (error) {// Do nothing\n    }\n  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));\n}\n\nexpress__WEBPACK_IMPORTED_MODULE_0___default()().use((req, res) => app.handle(req, res)).listen(\"3000\" || false, () => {\n  console.log(`React SSR App is running: http://localhost:${\"3000\" || false}`);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _middleware_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware/html */ \"./src/server/middleware/html.js\");\n/* harmony import */ var _middleware_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middleware/render */ \"./src/server/middleware/render.js\");\n\n\n\n\nconst publicPath = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '/public');\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(publicPath));\napp.use(Object(_middleware_html__WEBPACK_IMPORTED_MODULE_2__[\"default\"])());\napp.use(Object(_middleware_render__WEBPACK_IMPORTED_MODULE_3__[\"default\"])());\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/middleware/html.js":
/*!***************************************!*\
  !*** ./src/server/middleware/html.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst htmlMiddleware = () => (req, res, next) => {\n  const publicPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '/public');\n  fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile(`${publicPath}/app.html`, 'utf8', (err, html) => {\n    if (!err) {\n      req.html = html;\n      next();\n    } else {\n      res.status(500).send('Error parsing app.html');\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (htmlMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/html.js?");

/***/ }),

/***/ "./src/server/middleware/render.js":
/*!*****************************************!*\
  !*** ./src/server/middleware/render.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! escape-string-regexp */ \"escape-string-regexp\");\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _container_root_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../container/root/App */ \"./src/container/root/App.js\");\nvar _jsxFileName = \"/home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/server/middleware/render.js\";\n\n\n\n\n\nconst renderMiddleware = () => (req, res) => {\n  let html = req.html;\n  const htmlContent = react_dom_server__WEBPACK_IMPORTED_MODULE_2___default.a.renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_container_root_App__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 9,\n      columnNumber: 53\n    }\n  }));\n  const htmlReplacements = {\n    HTML_CONTENT: htmlContent\n  };\n  Object.keys(htmlReplacements).forEach(key => {\n    const value = htmlReplacements[key];\n    html = html.replace(new RegExp('__' + escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default()(key) + '__', 'g'), value);\n  });\n  res.send(html);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/render.js?");

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! /home/i2ilap-217/Documents/ReactLearning/git_learning/ReactLearning/src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core%22?");

/***/ }),

/***/ "@material-ui/core/Tooltip":
/*!********************************************!*\
  !*** external "@material-ui/core/Tooltip" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/Tooltip\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Tooltip%22?");

/***/ }),

/***/ "escape-string-regexp":
/*!***************************************!*\
  !*** external "escape-string-regexp" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"escape-string-regexp\");\n\n//# sourceURL=webpack:///external_%22escape-string-regexp%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-bootstrap\");\n\n//# sourceURL=webpack:///external_%22react-bootstrap%22?");

/***/ }),

/***/ "react-contextmenu":
/*!************************************!*\
  !*** external "react-contextmenu" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-contextmenu\");\n\n//# sourceURL=webpack:///external_%22react-contextmenu%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-files":
/*!******************************!*\
  !*** external "react-files" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-files\");\n\n//# sourceURL=webpack:///external_%22react-files%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-textarea-autosize":
/*!******************************************!*\
  !*** external "react-textarea-autosize" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-textarea-autosize\");\n\n//# sourceURL=webpack:///external_%22react-textarea-autosize%22?");

/***/ })

/******/ });