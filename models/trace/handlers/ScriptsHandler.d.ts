import type * as SDK from '../../../core/sdk/sdk.js';
import type * as Protocol from '../../../generated/protocol.js';
import * as Types from '../types/types.js';
import type { HandlerName } from './types.js';
export interface ScriptsData {
    /** Note: this is only populated when the "Enhanced Traces" feature is enabled. */
    scripts: Script[];
}
export interface Script {
    isolate: string;
    scriptId: Protocol.Runtime.ScriptId;
    frame: string;
    ts: Types.Timing.Micro;
    url?: string;
    sourceUrl?: string;
    content?: string;
    /** Note: this is the literal text given as the sourceMappingURL value. It has not been resolved relative to the script url. */
    sourceMapUrl?: string;
    sourceMap?: SDK.SourceMap.SourceMap;
    request?: Types.Events.SyntheticNetworkRequest;
}
export declare function deps(): HandlerName[];
export declare function reset(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function finalize(options: Types.Configuration.ParseOptions): Promise<void>;
export declare function data(): ScriptsData;
