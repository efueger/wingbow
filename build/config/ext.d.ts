/// <reference path="../../node_modules/typescript/lib/lib.dom.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2016.d.ts" />

interface ErrorConstructor {
    stackTraceLimit? :number;
}

interface KarmaRunnerConfig {
    args? :Array<any>;
    clearContext? :boolean;
    useIframe? :boolean;
}

interface KarmaRunner {
    complete(result :any) :void;
    config :KarmaRunnerConfig;
    error(err :Error) :void;
    error(msg :string, url :string, line :number) :void;
    files :Object;
    info(info :any) :void;
    loaded() :void;
    log(type :string, args :Array<any>) :void;
    result() :void;
    result(result :any) :void;
    setupContext(contextWindow :Window) :void;
    skipped :number;
    socket :WebSocket;
    start() :void;
    store() :void;
    store(key :string, value :any) :void;
    stringify(value :any): string;
    VERSION :number;
}
declare var __karma__ :KarmaRunner;
interface Window {
    __karma__ :KarmaRunner;
}
