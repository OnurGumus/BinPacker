import { toString as toString_1, Record, Union } from "./.fable/fable-library.3.1.1/Types.js";
import { ClientModel_RowItem, ClientModel_ContainerItem, ClientModel_Model, ContainerMode as ContainerMode_2, CalculationMode as CalculationMode_2, ClientModel_Calculation, Container as Container_1, ItemPut, Item, Dim as Dim_2, Coordinates, Calcs, ICalcApi$reflection, Route_builder, ClientModel_Model$reflection, ClientModel_ContainerItem$reflection, ClientModel_RowItem$reflection, CalcResult$reflection } from "../Shared/Shared.fs.js";
import { getCaseFields, getCaseName as getCaseName_1, isUnion, lambda_type, unit_type, record_type, bool_type, union_type, int32_type, option_type, string_type, class_type, list_type } from "./.fable/fable-library.3.1.1/Reflection.js";
import { join, toText, substring, printf, toConsole } from "./.fable/fable-library.3.1.1/String.js";
import { op_UnaryNegation, compare, parse as parse_2, op_Addition, fromInteger, fromInt, toString, toInt, op_Subtraction, abs, op_Multiply, fromBits } from "./.fable/fable-library.3.1.1/Long.js";
import { RemotingModule_createApi, RemotingModule_withRouteBuilder, Remoting_buildProxy_Z15584635 } from "./.fable/Fable.Remoting.Client.7.2.0/Remoting.fs.js";
import { uncurry, stringHash, max as max_3, randomNext, createObj, equals, int32ToString, curry } from "./.fable/fable-library.3.1.1/Util.js";
import { Cmd_batch, Cmd_map, Cmd_OfFunc_result, Cmd_ofSub, Cmd_none, Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./.fable/Fable.Elmish.3.1.0/cmd.fs.js";
import { parse, newGuid } from "./.fable/fable-library.3.1.1/Guid.js";
import { validateSync, single, Validator$1__Test, Validator$1__NotBlank_2B595, Validator$1__To_7C4B0DD6, Validator$1__Gt, Validator$1__Lt, Validator$1__End_Z5E18B1E2 } from "./.fable/Fable.Validation.0.2.1/Validation.fs.js";
import { renderResult, init as init_2 } from "./CanvasRenderer.fs.js";
import { empty as empty_2, max as max_4, groupBy, last, collect as collect_1, maxBy, exists, indexed, length, cons, sumBy, forAll, map as map_2, filter, append as append_1, singleton, item as item_2, ofSeq, ofArray } from "./.fable/fable-library.3.1.1/List.js";
import { empty, singleton as singleton_1, rangeNumber, collect, rangeLong, map as map_1, append, delay } from "./.fable/fable-library.3.1.1/Seq.js";
import { map as map_3, defaultArg, value as value_175, some } from "./.fable/fable-library.3.1.1/Option.js";
import { parse as parse_1 } from "./.fable/fable-library.3.1.1/Double.js";
import { FSharpResult$2 } from "./.fable/fable-library.3.1.1/Choice.js";
import { parse as parse_3 } from "./.fable/fable-library.3.1.1/Int32.js";
import { useReact_useEffect_Z5ECA432F, useReact_useEffect_Z5234A374, useFeliz_React__React_useState_Static_1505, React_functionComponent_2F9D7239 } from "./.fable/Feliz.1.33.0/React.fs.js";
import { useFeliz_React__React_useElmish_Static_17DC4F1D } from "./.fable/Feliz.UseElmish.1.5.0/UseElmish.fs.js";
import { createElement } from "react";
import * as react from "react";
import { reactApi } from "./.fable/Feliz.1.33.0/Interop.fs.js";
import { Helpers_combineClasses } from "./.fable/Feliz.Bulma.2.9.0/ElementBuilders.fs.js";
import { Browser_Types_Event__Event_get_Value } from "./.fable/Fable.React.7.2.0/Fable.React.Extensions.fs.js";
import { op_PlusPlus } from "./.fable/Feliz.Bulma.2.9.0/Operators.fs.js";
import { parse as parse_4 } from "./.fable/fable-library.3.1.1/Boolean.js";
import { Program_Internal_withReactBatchedUsing } from "./.fable/Fable.Elmish.React.3.0.1/react.fs.js";
import { lazyView2With } from "./.fable/Fable.Elmish.HMR.4.1.0/common.fs.js";
import { ProgramModule_map, ProgramModule_runWith, ProgramModule_mkProgram, ProgramModule_withConsoleTrace } from "./.fable/Fable.Elmish.3.1.0/program.fs.js";
import { Program_withDebuggerUsing, Debugger_ConnectionOptions, Debugger_showWarning, Debugger_showError } from "./.fable/Fable.Elmish.Debugger.3.2.0/debugger.fs.js";
import { add } from "./.fable/fable-library.3.1.1/Map.js";
import { Auto_generateEncoder_Z127D9D79, uint64, int64, decimal } from "./.fable/Thoth.Json.5.1.0/Encode.fs.js";
import { fromValue, Auto_generateDecoder_7848D058, uint64 as uint64_1, int64 as int64_1, decimal as decimal_1 } from "./.fable/Thoth.Json.5.1.0/Decode.fs.js";
import { empty as empty_1 } from "./.fable/Thoth.Json.5.1.0/Extra.fs.js";
import { ExtraCoders } from "./.fable/Thoth.Json.5.1.0/Types.fs.js";
import { Options$1 } from "./.fable/Fable.Elmish.Debugger.3.2.0/Fable.Import.RemoteDev.fs.js";
import { connectViaExtension } from "remotedev";
import { Internal_saveState, Model$1, Msg$1, Internal_tryRestoreState } from "./.fable/Fable.Elmish.HMR.4.1.0/hmr.fs.js";

export const r = {};

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ResultLoaded", "ModelSaved", "CalculateRequested", "AddRow", "RemoveItem", "RowUpdated", "ContainerUpdated", "CalculationModeChanged", "ContainerModeChanged", "CurrentResultChanged", "ShareRequested", "ModelLoaded"];
    }
}

export function Msg$reflection() {
    return union_type("Client.Msg", [], Msg, () => [[["Item", list_type(CalcResult$reflection())]], [["Item", class_type("System.Guid")]], [], [], [["Item", string_type]], [["Item1", string_type], ["Item2", option_type(ClientModel_RowItem$reflection())]], [["Item", option_type(ClientModel_ContainerItem$reflection())]], [["Item", string_type]], [["Item", string_type]], [["Item", int32_type]], [], [["Item", ClientModel_Model$reflection()]]]);
}

export const Server_logger = {
    LogError(e) {
        toConsole(printf("%A"))(e);
    },
    Log(str, arr) {
        toConsole(printf("%s"))(str);
    },
};

export function Server_sw() {
    return new (class {
        get ElapsedMilliseconds() {
            return fromBits(1, 0, false);
        }
        StartNew() {
            return Server_sw();
        }
    }
    )();
}

export const Server_api = (() => {
    const calcApi = Remoting_buildProxy_Z15584635(RemotingModule_withRouteBuilder(Route_builder, RemotingModule_createApi()), {
        ResolveType: ICalcApi$reflection,
    });
    return calcApi;
})();

export const run = curry(5, Server_api.run);

export const save = Server_api.saveModel;

export const load = Server_api.loadModel;

export function runCmd(containerMode, calcMode, container, items) {
    return Cmd_OfAsyncWith_perform((x) => {
        Cmd_OfAsync_start(x);
    }, () => run(new Calcs(containerMode, calcMode))(container)(items)(10000000000)(0.99), void 0, (arg0) => (new Msg(0, arg0)));
}

export function saveCmd(model) {
    return Cmd_OfAsyncWith_perform((x) => {
        Cmd_OfAsync_start(x);
    }, () => save(model), void 0, (arg0) => (new Msg(1, arg0)));
}

export function loadCmd(guid) {
    return Cmd_OfAsyncWith_perform((x) => {
        Cmd_OfAsync_start(x);
    }, () => load(guid), void 0, (arg0) => (new Msg(11, arg0)));
}

export function newRowItem() {
    let copyOfStruct;
    return [void 0, (copyOfStruct = newGuid(), copyOfStruct)];
}

export function numericCheck(t, typef, min, max, name, data) {
    return Validator$1__End_Z5E18B1E2(t, Validator$1__Lt(t, max, "must be less than is {max}")(Validator$1__Gt(t, min, "must be greater than is {min}")(Validator$1__To_7C4B0DD6(t, typef)("must be a number")(Validator$1__NotBlank_2B595(t, "cannot be blank")(Validator$1__Test(t, name, data))))));
}

export function init() {
    let s;
    init_2();
    const colors = ofArray(["green", "blue", "red", "pink", "yellow", "aqua", "orange", "white", "purple", "lime"]);
    const boxes = ofSeq(delay(() => append(map_1((i) => {
        let Dim, Tag;
        const Coord = new Coordinates(op_Multiply(i, fromBits(10, 0, false)), op_Multiply(abs(op_Subtraction(fromBits(5, 0, false), i)), fromBits(10, 0, false)), op_Multiply(abs(op_Subtraction(fromBits(5, 0, false), i)), fromBits(10, 0, false)));
        return new ItemPut((Dim = (new Dim_2(fromBits(10, 0, false), fromBits(10, 0, false), fromBits(10, 0, false))), (Tag = item_2(~(~toInt(i)), colors), new Item(Dim, 0, toString(i), Tag, false, false, false))), Coord);
    }, rangeLong(fromBits(0, 0, false), fromInt(1), fromBits(9, 0, false), false)), delay(() => map_1((i_1) => {
        let Dim_1, Tag_1;
        const Coord_1 = new Coordinates(op_Multiply(i_1, fromBits(10, 0, false)), op_Multiply(abs(op_Subtraction(fromBits(5, 0, false), i_1)), fromBits(10, 0, false)), op_Subtraction(fromBits(90, 0, false), op_Multiply(abs(op_Subtraction(fromBits(5, 0, false), i_1)), fromBits(10, 0, false))));
        return new ItemPut((Dim_1 = (new Dim_2(fromBits(10, 0, false), fromBits(10, 0, false), fromBits(10, 0, false))), (Tag_1 = item_2(~(~toInt(i_1)), colors), new Item(Dim_1, 0, toString(i_1), Tag_1, false, false, false))), Coord_1);
    }, rangeLong(fromBits(0, 0, false), fromInt(1), fromBits(9, 0, false), false))))));
    const container = new Container_1(new Dim_2(fromBits(100, 0, false), fromBits(100, 0, false), fromBits(100, 0, false)), new Coordinates(fromBits(0, 0, false), fromBits(0, 0, false), fromBits(0, 0, false)), 0);
    let patternInput;
    try {
        const window$ = window.top;
        const matchValue = window$.location.search;
        let pattern_matching_result;
        if (matchValue === null) {
            pattern_matching_result = 0;
        }
        else if (matchValue === "") {
            pattern_matching_result = 0;
        }
        else if (s = matchValue, s.indexOf("?g=") === 0) {
            pattern_matching_result = 1;
        }
        else {
            pattern_matching_result = 2;
        }
        switch (pattern_matching_result) {
            case 0: {
                patternInput = [Cmd_none(), false];
                break;
            }
            case 1: {
                const s_1 = matchValue;
                const guid = parse(substring(window.location.search, 3));
                patternInput = [loadCmd(guid), true];
                break;
            }
            case 2: {
                patternInput = [Cmd_none(), false];
                break;
            }
        }
    }
    catch (e) {
        console.log(some(e));
        patternInput = [Cmd_none(), false];
    }
    const loading = patternInput[1];
    const cmd = patternInput[0];
    renderResult(container, boxes, true);
    return [new ClientModel_Model(new ClientModel_Calculation(0), new CalculationMode_2(0), new ContainerMode_2(0), void 0, void 0, singleton(newRowItem()), void 0, 0, false, loading), cmd];
}

export const cols = ofArray(["Length", "Width", "Height", "Weight", "Quant.", "⬆⬆", "⬇⬇", "Stack", "Color", "", ""]);

export function validateTreshold(v) {
    return single((t) => Validator$1__End_Z5E18B1E2(t, Validator$1__Lt(t, 100000, "must be less than {max}")(Validator$1__Gt(t, 0, "must be greater than {min}")(Validator$1__To_7C4B0DD6(t, parse_1)("must be a number")(Validator$1__NotBlank_2B595(t, "cannot be blank")(Validator$1__Test(t, "s", v)))))));
}

export function convertToItems(model) {
    return ofSeq(delay(() => collect((matchValue) => {
        const rowItem = matchValue[0];
        const key = matchValue[1];
        const r_1 = value_175(rowItem);
        return map_1((i) => (new Item(new Dim_2(r_1.Width, r_1.Height, r_1.Length), r_1.Weight, key + int32ToString(i), r_1.Color, !r_1.Stackable, r_1.KeepTop, r_1.KeepBottom)), rangeNumber(1, 1, r_1.Quantity));
    }, model.RowItems)));
}

export function update(msg, model) {
    let rowItems;
    let patternInput;
    if (msg.tag === 1) {
        const guid = msg.fields[0];
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, true, model.Loading), Cmd_ofSub((_arg1) => {
            window.history.replaceState(null, null, toText(printf("?g=%s"))(guid));
        })];
    }
    else if (msg.tag === 10) {
        patternInput = [model, saveCmd(model)];
    }
    else if (msg.tag === 9) {
        const i = msg.fields[0] | 0;
        const matchValue_1 = model.Calculation;
        if (matchValue_1.tag === 2) {
            const c_1 = matchValue_1.fields[0];
            patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, i, model.UrlShown, model.Loading), Cmd_OfFunc_result(new Msg(0, c_1))];
        }
        else {
            throw (new Error("should not happen"));
        }
    }
    else if (msg.tag === 3) {
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, append_1(model.RowItems, singleton(newRowItem())), model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()];
    }
    else if (msg.tag === 4) {
        const key = msg.fields[0];
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, filter((tupledArg) => {
            const r_1 = tupledArg[0];
            const k = tupledArg[1];
            return k !== key;
        }, model.RowItems), model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()];
    }
    else if (msg.tag === 5) {
        const key_1 = msg.fields[0];
        const row = msg.fields[1];
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, map_2((_arg2) => {
            const old = _arg2;
            const oldKey = old[1];
            if (oldKey === key_1) {
                return [row, key_1];
            }
            else {
                return old;
            }
        }, model.RowItems), model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()];
    }
    else if (msg.tag === 0) {
        const c_2 = msg.fields[0];
        const model_2 = new ClientModel_Model(new ClientModel_Calculation(2, c_2), model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading);
        patternInput = [model_2, Cmd_ofSub((_arg3) => {
            renderResult(item_2(model_2.CurrentResultIndex, c_2).Container, item_2(model_2.CurrentResultIndex, c_2).ItemsPut, false);
        })];
    }
    else if (msg.tag === 6) {
        const c_3 = msg.fields[0];
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, c_3, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()];
    }
    else if (msg.tag === 7) {
        patternInput = ((msg.fields[0] === "Minimize Length") ? [new ClientModel_Model(model.Calculation, new CalculationMode_2(0), model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()] : ((msg.fields[0] === "Minimize Height") ? [new ClientModel_Model(model.Calculation, new CalculationMode_2(1), model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()] : [model, Cmd_none()]));
    }
    else if (msg.tag === 8) {
        patternInput = ((msg.fields[0] === "Single Container") ? [new ClientModel_Model(model.Calculation, model.CalculationMode, new ContainerMode_2(0), model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()] : ((msg.fields[0] === "Multi Container") ? [new ClientModel_Model(model.Calculation, model.CalculationMode, new ContainerMode_2(1), model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()] : [model, Cmd_none()]));
    }
    else if (msg.tag === 2) {
        const c_4 = value_175(model.ContainerItem);
        const container = new Container_1(new Dim_2(c_4.Width, c_4.Height, c_4.Length), new Coordinates(fromBits(0, 0, false), fromBits(0, 0, false), fromBits(0, 0, false)), c_4.Weight);
        const items = convertToItems(model);
        patternInput = [new ClientModel_Model(new ClientModel_Calculation(1), model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, 0, false, model.Loading), runCmd(model.ContainerMode, model.CalculationMode, container, items)];
    }
    else {
        const model_1 = msg.fields[0];
        const matchValue = model_1.Calculation;
        if (matchValue.tag === 2) {
            const c = matchValue.fields[0];
            patternInput = [new ClientModel_Model(model_1.Calculation, model_1.CalculationMode, model_1.ContainerMode, model_1.Container, model_1.ContainerItem, model_1.RowItems, model_1.TotalVolume, model_1.CurrentResultIndex, model_1.UrlShown, false), Cmd_OfFunc_result(new Msg(0, c))];
        }
        else {
            throw (new Error("should not happen"));
        }
    }
    const model_3 = patternInput[0];
    const cmd = patternInput[1];
    let totalVolume;
    const matchValue_2 = model_3.RowItems;
    if (rowItems = matchValue_2, forAll((x) => (x[0] != null), rowItems)) {
        const rowItems_1 = matchValue_2;
        const rowItems_2 = map_2((x_1) => value_175(x_1[0]), rowItems_1);
        const vol = sumBy((x_2) => op_Multiply(op_Multiply(op_Multiply(x_2.Width, x_2.Height), x_2.Length), fromInteger(x_2.Quantity, false, 2)), rowItems_2, {
            GetZero: () => fromInt(0),
            Add: op_Addition,
        });
        totalVolume = vol;
    }
    else {
        totalVolume = (void 0);
    }
    return [new ClientModel_Model(model_3.Calculation, model_3.CalculationMode, model_3.ContainerMode, model_3.Container, model_3.ContainerItem, model_3.RowItems, totalVolume, model_3.CurrentResultIndex, model_3.UrlShown, model_3.Loading), cmd];
}

export class RowFormData extends Record {
    constructor(Width, Height, Length, Quantity, Weight, Color, Stackable, KeepTop, KeepBottom) {
        super();
        this.Width = Width;
        this.Height = Height;
        this.Length = Length;
        this.Quantity = Quantity;
        this.Weight = Weight;
        this.Color = Color;
        this.Stackable = Stackable;
        this.KeepTop = KeepTop;
        this.KeepBottom = KeepBottom;
    }
}

export function RowFormData$reflection() {
    return record_type("Client.RowFormData", [], RowFormData, () => [["Width", string_type], ["Height", string_type], ["Length", string_type], ["Quantity", string_type], ["Weight", string_type], ["Color", string_type], ["Stackable", bool_type], ["KeepTop", bool_type], ["KeepBottom", bool_type]]);
}

export class RowProp extends Record {
    constructor(RowUpdated, AddRow, Remove, Key, Disabled, FormData) {
        super();
        this.RowUpdated = RowUpdated;
        this.AddRow = AddRow;
        this.Remove = Remove;
        this.Key = Key;
        this.Disabled = Disabled;
        this.FormData = FormData;
    }
}

export function RowProp$reflection() {
    return record_type("Client.RowProp", [], RowProp, () => [["RowUpdated", lambda_type(option_type(ClientModel_RowItem$reflection()), unit_type)], ["AddRow", option_type(lambda_type(unit_type, unit_type))], ["Remove", option_type(lambda_type(unit_type, unit_type))], ["Key", string_type], ["Disabled", bool_type], ["FormData", RowFormData$reflection()]]);
}

export class ContainerFormData extends Record {
    constructor(Width, Height, Length, Weight) {
        super();
        this.Width = Width;
        this.Height = Height;
        this.Length = Length;
        this.Weight = Weight;
    }
}

export function ContainerFormData$reflection() {
    return record_type("Client.ContainerFormData", [], ContainerFormData, () => [["Width", string_type], ["Height", string_type], ["Length", string_type], ["Weight", string_type]]);
}

export class ContainerProp extends Record {
    constructor(ContainerUpdated, Disabled, ContainerFormData) {
        super();
        this.ContainerUpdated = ContainerUpdated;
        this.Disabled = Disabled;
        this.ContainerFormData = ContainerFormData;
    }
}

export function ContainerProp$reflection() {
    return record_type("Client.ContainerProp", [], ContainerProp, () => [["ContainerUpdated", lambda_type(option_type(ClientModel_ContainerItem$reflection()), unit_type)], ["Disabled", bool_type], ["ContainerFormData", ContainerFormData$reflection()]]);
}

export class Container_Model extends Record {
    constructor(ContainerItem, FormData) {
        super();
        this.ContainerItem = ContainerItem;
        this.FormData = FormData;
    }
}

export function Container_Model$reflection() {
    return record_type("Client.Container.Model", [], Container_Model, () => [["ContainerItem", option_type(union_type("Microsoft.FSharp.Core.FSharpResult`2", [ClientModel_ContainerItem$reflection(), class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, list_type(string_type)])], FSharpResult$2, () => [[["ResultValue", ClientModel_ContainerItem$reflection()]], [["ErrorValue", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, list_type(string_type)])]]]))], ["FormData", ContainerFormData$reflection()]]);
}

export class Container_Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["WidthChanged", "HeightChanged", "LengthChanged", "WeightChanged"];
    }
}

export function Container_Msg$reflection() {
    return union_type("Client.Container.Msg", [], Container_Msg, () => [[["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]]]);
}

export function Container_init(formData) {
    return [new Container_Model(void 0, formData), Cmd_none()];
}

export function Container_validate(formData) {
    return validateSync(true, (t) => {
        let floatCheck;
        const min = fromBits(0, 0, false);
        const max = fromBits(2000, 0, false);
        floatCheck = ((name) => ((data) => numericCheck(t, (value) => parse_2(value, 511, false, 64), min, max, name, data)));
        let intCheck;
        const min_1 = fromBits(0, 0, false);
        const max_1 = fromBits(2000, 0, false);
        intCheck = ((name_1) => ((data_1) => numericCheck(t, (value_1) => parse_2(value_1, 511, false, 64), min_1, max_1, name_1, data_1)));
        const weightCheck = (name_2, data_2) => numericCheck(t, (value_2) => parse_3(value_2, 511, false, 32), -1, 100000, name_2, data_2);
        return new ClientModel_ContainerItem(floatCheck("width")(formData.Width), floatCheck("height")(formData.Height), floatCheck("length")(formData.Length), weightCheck("weight", formData.Weight));
    });
}

export function Container_update(containerUpdated, msg, state) {
    const formData = state.FormData;
    let formData_1;
    switch (msg.tag) {
        case 1: {
            const s_1 = msg.fields[0];
            formData_1 = (new ContainerFormData(formData.Width, s_1, formData.Length, formData.Weight));
            break;
        }
        case 2: {
            const s_2 = msg.fields[0];
            formData_1 = (new ContainerFormData(formData.Width, formData.Height, s_2, formData.Weight));
            break;
        }
        case 3: {
            const s_3 = msg.fields[0];
            formData_1 = (new ContainerFormData(formData.Width, formData.Height, formData.Length, s_3));
            break;
        }
        default: {
            const s = msg.fields[0];
            formData_1 = (new ContainerFormData(s, formData.Height, formData.Length, formData.Weight));
        }
    }
    const r_1 = Container_validate(formData_1);
    let cmd;
    let pattern_matching_result;
    if (r_1.tag === 0) {
        if (equals(r_1, state.ContainerItem)) {
            pattern_matching_result = 0;
        }
        else {
            pattern_matching_result = 1;
        }
    }
    else {
        pattern_matching_result = 1;
    }
    switch (pattern_matching_result) {
        case 0: {
            cmd = Cmd_none();
            break;
        }
        case 1: {
            if (r_1.tag === 1) {
                cmd = Cmd_ofSub((_arg2) => {
                    containerUpdated(void 0);
                });
            }
            else {
                const r_2 = r_1.fields[0];
                cmd = Cmd_ofSub((_arg1) => {
                    containerUpdated(r_2);
                });
            }
            break;
        }
    }
    return [new Container_Model(r_1, formData_1), cmd];
}

export const Container_view = React_functionComponent_2F9D7239((props) => {
    const patternInput = useFeliz_React__React_useElmish_Static_17DC4F1D(Container_init(props.ContainerFormData), (msg, state) => Container_update(props.ContainerUpdated, msg, state), []);
    const model = patternInput[0];
    const dispatch = patternInput[1];
    const dispatch$0027 = (col, v) => {
        let other;
        dispatch((col === "Height") ? (new Container_Msg(1, v)) : ((col === "Width") ? (new Container_Msg(0, v)) : ((col === "Length") ? (new Container_Msg(2, v)) : ((col === "Max Weight") ? (new Container_Msg(3, v)) : (other = col, (() => {
            throw (new Error(other));
        })())))));
    };
    const defaultValue = (col_1) => {
        switch (col_1) {
            case "Height": {
                return model.FormData.Height;
            }
            case "Width": {
                return model.FormData.Width;
            }
            case "Length": {
                return model.FormData.Length;
            }
            case "Max Weight": {
                const matchValue = model.FormData.Weight;
                switch (matchValue) {
                    case null:
                    case "": {
                        return "0";
                    }
                    default: {
                        const e = matchValue;
                        return e;
                    }
                }
            }
            default: {
                const other_1 = col_1;
                throw (new Error(other_1));
            }
        }
    };
    return createElement("div", createObj(ofSeq(delay(() => {
        const cols_1 = ofArray(["Length", "Width", "Height", "Max Weight"]);
        return append(singleton_1(["className", "table"]), delay(() => singleton_1(["children", reactApi.Children.toArray([createElement("div", {
            className: "tr",
            children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => map_1((col_2) => createElement("div", {
                className: join(" ", ["td", "th"]),
                children: reactApi.Children.toArray([createElement("label", createObj(Helpers_combineClasses("label", ofArray([["className", "is-small"], ["children", col_2]]))))]),
            }), cols_1))))),
        }), createElement("div", {
            className: "tr",
            children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => map_1((col_3) => {
                let props_5;
                const props_7 = ofArray([["className", "td"], ["children", reactApi.Children.toArray([(props_5 = ofArray([["readOnly", props.Disabled], ["maxLength", 4], ["max", 2000], ["defaultValue", defaultValue(col_3)], ["className", "is-small"], ["placeholder", col_3], ["onChange", (e_1) => {
                    dispatch$0027(col_3, Browser_Types_Event__Event_get_Value(e_1));
                }]]), createElement("input", createObj(cons(["type", "number"], Helpers_combineClasses("input", props_5)))))])]]);
                return createElement("div", createObj(Helpers_combineClasses("control", props_7)));
            }, cols_1))))),
        })])])));
    }))));
});

export class Row_Model extends Record {
    constructor(RowItem, FormData) {
        super();
        this.RowItem = RowItem;
        this.FormData = FormData;
    }
}

export function Row_Model$reflection() {
    return record_type("Client.Row.Model", [], Row_Model, () => [["RowItem", option_type(union_type("Microsoft.FSharp.Core.FSharpResult`2", [ClientModel_RowItem$reflection(), class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, list_type(string_type)])], FSharpResult$2, () => [[["ResultValue", ClientModel_RowItem$reflection()]], [["ErrorValue", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, list_type(string_type)])]]]))], ["FormData", RowFormData$reflection()]]);
}

export class Row_Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["WidthChanged", "HeightChanged", "LengthChanged", "WeightChanged", "StackableChanged", "KeepBottomChanged", "TopChanged", "QuantityChanged"];
    }
}

export function Row_Msg$reflection() {
    return union_type("Client.Row.Msg", [], Row_Msg, () => [[["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", bool_type]], [["Item", bool_type]], [["Item", bool_type]], [["Item", string_type]]]);
}

export function Row_init(formData) {
    return [new Row_Model(void 0, formData), Cmd_none()];
}

export function Row_validate(formData) {
    return validateSync(true, (t) => {
        let floatCheck;
        const min = fromBits(0, 0, false);
        const max = fromBits(2000, 0, false);
        floatCheck = ((name) => ((data) => numericCheck(t, (value) => parse_2(value, 511, false, 64), min, max, name, data)));
        const intCheck = (name_1, data_1) => numericCheck(t, (value_1) => parse_3(value_1, 511, false, 32), 0, 2000, name_1, data_1);
        const weightCheck = (name_2, data_2) => numericCheck(t, (value_2) => parse_3(value_2, 511, false, 32), -1, 100000, name_2, data_2);
        const Width = floatCheck("width")(formData.Width);
        const Height = floatCheck("height")(formData.Height);
        const Length = floatCheck("length")(formData.Length);
        const Quantity = intCheck("quantity", formData.Quantity) | 0;
        return new ClientModel_RowItem(Width, Height, Length, weightCheck("weight", formData.Weight), formData.Color, Quantity, formData.Stackable, formData.KeepTop, formData.KeepBottom);
    });
}

export function Row_update(rowUpdated, msg, state) {
    const formData = state.FormData;
    let formData_1;
    switch (msg.tag) {
        case 1: {
            const s_1 = msg.fields[0];
            formData_1 = (new RowFormData(formData.Width, s_1, formData.Length, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom));
            break;
        }
        case 2: {
            const s_2 = msg.fields[0];
            formData_1 = (new RowFormData(formData.Width, formData.Height, s_2, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom));
            break;
        }
        case 3: {
            const s_3 = msg.fields[0];
            formData_1 = (new RowFormData(formData.Width, formData.Height, formData.Length, formData.Quantity, s_3, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom));
            break;
        }
        case 7: {
            const s_4 = msg.fields[0];
            formData_1 = (new RowFormData(formData.Width, formData.Height, formData.Length, s_4, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom));
            break;
        }
        case 4: {
            const s_5 = msg.fields[0];
            formData_1 = (new RowFormData(formData.Width, formData.Height, formData.Length, formData.Quantity, formData.Weight, formData.Color, s_5, formData.KeepTop, formData.KeepBottom));
            break;
        }
        case 5: {
            const s_6 = msg.fields[0];
            formData_1 = (new RowFormData(formData.Width, formData.Height, formData.Length, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, s_6));
            break;
        }
        case 6: {
            const s_7 = msg.fields[0];
            formData_1 = (new RowFormData(formData.Width, formData.Height, formData.Length, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, s_7, formData.KeepBottom));
            break;
        }
        default: {
            const s = msg.fields[0];
            formData_1 = (new RowFormData(s, formData.Height, formData.Length, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom));
        }
    }
    const r_1 = Row_validate(formData_1);
    let cmd;
    let pattern_matching_result;
    if (r_1.tag === 0) {
        if (equals(r_1, state.RowItem)) {
            pattern_matching_result = 0;
        }
        else {
            pattern_matching_result = 1;
        }
    }
    else {
        pattern_matching_result = 1;
    }
    switch (pattern_matching_result) {
        case 0: {
            cmd = Cmd_none();
            break;
        }
        case 1: {
            if (r_1.tag === 1) {
                cmd = Cmd_ofSub((_arg2) => {
                    rowUpdated(void 0);
                });
            }
            else {
                const r_2 = r_1.fields[0];
                cmd = Cmd_ofSub((_arg1) => {
                    rowUpdated(r_2);
                });
            }
            break;
        }
    }
    return [new Row_Model(r_1, formData_1), cmd];
}

export const Row_view = React_functionComponent_2F9D7239((props) => {
    const patternInput = useFeliz_React__React_useElmish_Static_17DC4F1D(Row_init(props.FormData), (msg, state) => Row_update(props.RowUpdated, msg, state), []);
    const model = patternInput[0];
    const dispatch = patternInput[1];
    let removeButton;
    const props_1 = ofSeq(delay(() => append(singleton_1(op_PlusPlus(["className", "is-small"], ["className", "is-danger"])), delay(() => append(singleton_1(["disabled", props.Disabled]), delay(() => append(singleton_1(["className", join(" ", ["fa", "fa-times-circle"])]), delay(() => {
        const matchValue = props.Remove;
        if (matchValue != null) {
            const remove = matchValue;
            return singleton_1(["onClick", (_arg1) => {
                remove();
            }]);
        }
        else {
            return singleton_1(["style", {
                visibility: "hidden",
            }]);
        }
    }))))))));
    removeButton = createElement("button", createObj(Helpers_combineClasses("button", props_1)));
    let addButton;
    const props_3 = ofSeq(delay(() => append(singleton_1(op_PlusPlus(["className", "is-small"], ["className", "is-primary"])), delay(() => append(singleton_1(["disabled", props.Disabled]), delay(() => append(singleton_1(["className", join(" ", ["fa", "fa-plus-circle"])]), delay(() => {
        const matchValue_1 = props.AddRow;
        if (matchValue_1 != null) {
            const addRow = matchValue_1;
            return singleton_1(["onClick", (_arg2) => {
                addRow();
            }]);
        }
        else {
            return singleton_1(["style", {
                visibility: "hidden",
            }]);
        }
    }))))))));
    addButton = createElement("button", createObj(Helpers_combineClasses("button", props_3)));
    const dispatch$0027 = (col, v) => {
        let other;
        dispatch((col === "Height") ? (new Row_Msg(1, v)) : ((col === "Width") ? (new Row_Msg(0, v)) : ((col === "Weight") ? (new Row_Msg(3, v)) : ((col === "Quant.") ? (new Row_Msg(7, v)) : ((col === "⬆⬆") ? (new Row_Msg(6, parse_4(v))) : ((col === "⬇⬇") ? (new Row_Msg(5, parse_4(v))) : ((col === "Stack") ? (new Row_Msg(4, parse_4(v))) : ((col === "Length") ? (new Row_Msg(2, v)) : (other = col, (() => {
            throw (new Error(other));
        })())))))))));
    };
    const defaultt = (col_1) => {
        switch (col_1) {
            case "Height": {
                return model.FormData.Height;
            }
            case "Width": {
                return model.FormData.Width;
            }
            case "Weight": {
                return model.FormData.Weight;
            }
            case "Quant.": {
                return model.FormData.Quantity;
            }
            case "⬆⬆": {
                return toString_1(model.FormData.KeepTop);
            }
            case "⬇⬇": {
                return toString_1(model.FormData.KeepBottom);
            }
            case "Stack": {
                return toString_1(model.FormData.Stackable);
            }
            case "Length": {
                return model.FormData.Length;
            }
            default: {
                const other_1 = col_1;
                throw (new Error(other_1));
            }
        }
    };
    return createElement("div", {
        className: "tr",
        children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => collect((matchValue_2) => {
            let props_15;
            const i = matchValue_2[0] | 0;
            const col_2 = matchValue_2[1];
            return singleton_1((props_15 = ofArray([["className", "td"], ["children", reactApi.Children.toArray(Array.from(ofSeq(delay(() => {
                let props_11, props_13;
                return (i < (length(cols) - 2)) ? ((col_2 === "⬆⬆") ? singleton_1(createElement("input", createObj(cons(["type", "checkbox"], Helpers_combineClasses("checkbox", ofArray([["className", "is-small"], ["defaultChecked", model.FormData.KeepTop], ["readOnly", props.Disabled], ["onChange", (ev) => {
                    dispatch$0027("⬆⬆", toString_1(ev.target.checked));
                }]])))))) : ((col_2 === "⬇⬇") ? singleton_1(createElement("input", createObj(cons(["type", "checkbox"], Helpers_combineClasses("checkbox", ofArray([["className", "is-small"], ["defaultChecked", model.FormData.KeepBottom], ["readOnly", props.Disabled], ["onChange", (ev_1) => {
                    dispatch$0027("⬇⬇", toString_1(ev_1.target.checked));
                }]])))))) : ((col_2 === "Stack") ? singleton_1(createElement("input", createObj(cons(["type", "checkbox"], Helpers_combineClasses("checkbox", ofArray([["className", "is-small"], ["readOnly", props.Disabled], ["defaultChecked", model.FormData.Stackable], ["onChange", (ev_2) => {
                    dispatch$0027("Stack", toString_1(ev_2.target.checked));
                }]])))))) : ((col_2 === "Color") ? singleton_1((props_11 = ofArray([["className", "is-small"], ["readOnly", true], ["style", {
                    backgroundColor: model.FormData.Color,
                }]]), createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", props_11)))))) : singleton_1((props_13 = ofArray([["maxLength", 5], ["readOnly", props.Disabled], ["defaultValue", defaultt(col_2)], ["max", 2000], ["className", "is-small"], ["placeholder", col_2], ["onChange", (e_3) => {
                    dispatch$0027(col_2, Browser_Types_Event__Event_get_Value(e_3));
                }]]), createElement("input", createObj(cons(["type", "number"], Helpers_combineClasses("input", props_13)))))))))) : ((i === (length(cols) - 2)) ? singleton_1(removeButton) : singleton_1(addButton));
            }))))]]), createElement("div", createObj(Helpers_combineClasses("control", props_15)))));
        }, indexed(cols)))))),
    });
}, (props_18) => props_18.Key);

export function thousands(n) {
    let v;
    let copyOfStruct = (compare(n, fromBits(0, 0, false)) < 0) ? op_UnaryNegation(n) : n;
    v = toString(copyOfStruct);
    const r_1 = (v.length % 3) | 0;
    const s = ((r_1 === 0) ? 3 : r_1) | 0;
    const s_1 = join(",", ofSeq(delay(() => append(singleton_1(v.slice(0, (s - 1) + 1)), delay(() => map_1((i) => v.slice((i * 3) + s, (((i * 3) + s) + 2) + 1), rangeNumber(0, 1, (~(~((v.length - s) / 3))) - 1)))))));
    if (compare(n, fromBits(0, 0, false)) < 0) {
        return "-" + s_1;
    }
    else {
        return s_1;
    }
}

export const viewC = React_functionComponent_2F9D7239((props) => {
    let elms_5, elms_4, props_61, elms_2;
    const model = props.model;
    const dispatch = props.dispatch;
    const isCalculating = (model.Calculation.tag === 1) ? true : false;
    const patternInput = useFeliz_React__React_useState_Static_1505(90);
    const setCounterValue = patternInput[1];
    const counterValue = patternInput[0] | 0;
    const scollDown = () => {
        let results;
        const matchValue_1 = model.Calculation;
        let pattern_matching_result;
        if (matchValue_1.tag === 2) {
            if (results = matchValue_1.fields[0], exists((r_1) => (length(r_1.ItemsPut) > 0), results)) {
                pattern_matching_result = 0;
            }
            else {
                pattern_matching_result = 1;
            }
        }
        else {
            pattern_matching_result = 1;
        }
        switch (pattern_matching_result) {
            case 0: {
                const element = document.querySelector("#calculate-button");
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                break;
            }
        }
        return {
            Dispose() {
            },
        };
    };
    useReact_useEffect_Z5234A374(scollDown, [isCalculating]);
    const subscribeToTimer = () => {
        const subscriptionId = setTimeout(() => {
            if (isCalculating) {
                setCounterValue(counterValue - 1);
            }
        }, 1000) | 0;
        return {
            Dispose() {
                clearTimeout(subscriptionId);
            },
        };
    };
    useReact_useEffect_Z5ECA432F(subscribeToTimer);
    const rowItems = ofSeq(delay(() => collect((matchValue_2) => {
        let r_3, Width_1, Height_1, Length_1, Weight_1, arg30, arg20, arg10;
        const row = matchValue_2[1][0];
        const key = matchValue_2[1][1];
        const i = matchValue_2[0] | 0;
        const addRow = (i === (length(model.RowItems) - 1)) ? (() => {
            dispatch(new Msg(3));
        }) : (void 0);
        const remove = (length(model.RowItems) > 1) ? (() => {
            dispatch(new Msg(4, key));
        }) : (void 0);
        return singleton_1(Row_view(new RowProp((r_2) => {
            dispatch(new Msg(5, key, r_2));
        }, addRow, remove, key, isCalculating, (row != null) ? (r_3 = row, (Width_1 = toString(r_3.Width), (Height_1 = toString(r_3.Height), (Length_1 = toString(r_3.Length), (Weight_1 = int32ToString(r_3.Weight), new RowFormData(Width_1, Height_1, Length_1, int32ToString(r_3.Quantity), Weight_1, r_3.Color, r_3.Stackable, r_3.KeepTop, r_3.KeepBottom)))))) : (new RowFormData("", "", "", "", "0", (arg30 = (randomNext(40, 256) | 0), (arg20 = (randomNext(40, 256) | 0), (arg10 = (randomNext(40, 256) | 0), toText(printf("rgb(%i,%i,%i)"))(arg10)(arg20)(arg30)))), true, false, false)))));
    }, indexed(model.RowItems))));
    let content;
    const elms_1 = ofSeq(delay(() => append(singleton_1(createElement("b", {
        children: ["How to use:"],
    })), delay(() => append(singleton_1(createElement("ul", createObj(ofSeq(delay(() => append(singleton_1(op_PlusPlus(["className", "ml-1"], ["className", "is-size-7"])), delay(() => append(singleton_1(["style", {
        listStyleType: "disc",
    }]), delay(() => {
        const items = ofArray(["Enter container and item dimensions between 1 and 2000, no decimals.", "Weight range is between 0 and 100,000.", "Add as many items as you want.", "If the item is not stackable (no other item is on top of this) uncheck \"Stack\" for that item.", "If the item must keep its upright then check \"⬆⬆\" for that item.", "If the item must be at the bottom (e.g, heavy items) then check \"⬇⬇\" for that item.", "All dimensions are unitless.", "Select the calculation mode depending on items to be at minimum height or pushed to the edge.", "Select container mode to multi container if you want to see how many container it takes to fit", "Click calculate and wait up to 100 sec.", "Bin packer will try to fit the items and minimize the placement.", "Gravity is ignored.", "Review the result in 3D then you may share it via share the result button and copy the url.", "You may visually remove some boxes by using h-filter and v-filter controls on 3D."]);
        return singleton_1(["children", reactApi.Children.toArray(Array.from(ofSeq(delay(() => map_1((item) => createElement("li", {
            children: item,
        }), items)))))]);
    }))))))))), delay(() => append(singleton_1(react.createElement("br", {})), delay(() => append(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", ofArray([["children", "Enter CONTAINER dimensions:"], ["className", "is-small"]]))))), delay(() => {
        let matchValue_3, container, Width_3, Height_3, Weight_3;
        return append(model.Loading ? singleton_1(null) : (matchValue_3 = model.ContainerItem, (matchValue_3 != null) ? (container = matchValue_3, singleton_1(Container_view(new ContainerProp((r_5) => {
            dispatch(new Msg(6, r_5));
        }, isCalculating, (Width_3 = toString(container.Width), (Height_3 = toString(container.Height), (Weight_3 = int32ToString(container.Weight), new ContainerFormData(Width_3, Height_3, toString(container.Length), Weight_3)))))))) : singleton_1(Container_view(new ContainerProp((r_4) => {
            dispatch(new Msg(6, r_4));
        }, isCalculating, new ContainerFormData("", "", "", "0"))))), delay(() => append(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", ofArray([["children", "Enter ITEM dimensions:"], ["className", "is-small"]]))))), delay(() => append(singleton_1(createElement("div", {
            className: "table",
            disabled: isCalculating,
            children: reactApi.Children.toArray([createElement("div", {
                className: "tr",
                children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => map_1((col) => createElement("div", {
                    className: join(" ", ["td", "th"]),
                    children: reactApi.Children.toArray([createElement("label", createObj(Helpers_combineClasses("label", ofArray([["className", "is-small"], ["children", col]]))))]),
                }), cols))))),
            }), Array.from(rowItems)]),
        })), delay(() => {
            const line = (title, v) => {
                let elms;
                return react.createElement(react.Fragment, {}, createElement("label", {
                    className: "label",
                    children: title,
                }), (elms = singleton(createElement("output", createObj(ofSeq(delay(() => append(((title.indexOf("Chargable") === 0) ? (v != null) : false) ? singleton_1(["className", "output"]) : empty(), delay(() => singleton_1(["children", defaultArg(map_3(thousands, v), "Please complete the form.")])))))))), createElement("div", {
                    className: "control",
                    children: reactApi.Children.toArray(Array.from(elms)),
                })));
            };
            return append(singleton_1(Array.from(ofSeq(delay(() => {
                const items_1 = singleton(["Total Item Volume:", model.TotalVolume]);
                return collect((matchValue_4) => {
                    const v_1 = matchValue_4[1];
                    const t = matchValue_4[0];
                    return singleton_1(line(t, v_1));
                }, items_1);
            })))), delay(() => {
                let matchValue_5, container_1;
                return append((matchValue_5 = model.ContainerItem, (matchValue_5 != null) ? (container_1 = matchValue_5, singleton_1(line("Container volume:", op_Multiply(op_Multiply(container_1.Height, container_1.Width), container_1.Length)))) : singleton_1(null)), delay(() => {
                    let matchValue_6, r_6;
                    return append((matchValue_6 = model.Calculation, (matchValue_6.tag === 2) ? (r_6 = matchValue_6.fields[0], singleton_1(line("Volume fit:", sumBy((c) => c.PutVolume, r_6, {
                        GetZero: () => fromInt(0),
                        Add: op_Addition,
                    })))) : singleton_1(null)), delay(() => {
                        let matchValue_8, container_2, volume;
                        const isMultiBin = (model.ContainerMode.tag === 1) ? true : false;
                        const isinvalid = (model.ContainerItem == null) ? true : (model.TotalVolume == null);
                        const volumeExceeds = (!isMultiBin) && (matchValue_8 = [model.ContainerItem, model.TotalVolume], (matchValue_8[0] != null) ? ((matchValue_8[1] != null) ? (container_2 = matchValue_8[0], (volume = matchValue_8[1], compare(op_Multiply(op_Multiply(container_2.Height, container_2.Width), container_2.Length), volume) < 0)) : false) : false);
                        let nostackExceeds;
                        const matchValue_9 = [model.ContainerItem, model.TotalVolume];
                        let pattern_matching_result_1, container_3, volume_1;
                        if (matchValue_9[0] != null) {
                            if (matchValue_9[1] != null) {
                                pattern_matching_result_1 = 0;
                                container_3 = matchValue_9[0];
                                volume_1 = matchValue_9[1];
                            }
                            else {
                                pattern_matching_result_1 = 1;
                            }
                        }
                        else {
                            pattern_matching_result_1 = 1;
                        }
                        switch (pattern_matching_result_1) {
                            case 0: {
                                const containerArea = op_Multiply(container_3.Length, container_3.Width);
                                const areaItems = sumBy((x_2) => op_Multiply(x_2.Dim.Width, x_2.Dim.Length), filter((x_1) => x_1.NoTop, convertToItems(model)), {
                                    GetZero: () => fromInt(0),
                                    Add: op_Addition,
                                });
                                let maxHeight;
                                const _arg1_1 = filter((x_4) => x_4.NoTop, convertToItems(model));
                                if (_arg1_1.tail == null) {
                                    maxHeight = fromBits(0, 0, false);
                                }
                                else {
                                    const other = _arg1_1;
                                    maxHeight = maxBy((x_5) => x_5.Dim.Height, other, {
                                        Compare: compare,
                                    }).Dim.Height;
                                }
                                nostackExceeds = (((compare(areaItems, containerArea) > 0) ? true : (compare(maxHeight, container_3.Height) > 0)) ? (!isMultiBin) : false);
                                break;
                            }
                            case 1: {
                                nostackExceeds = false;
                                break;
                            }
                        }
                        let itemExceeds;
                        const matchValue_10 = [model.ContainerItem, model.TotalVolume];
                        let pattern_matching_result_2, container_4, volume_2;
                        if (matchValue_10[0] != null) {
                            if (matchValue_10[1] != null) {
                                pattern_matching_result_2 = 0;
                                container_4 = matchValue_10[0];
                                volume_2 = matchValue_10[1];
                            }
                            else {
                                pattern_matching_result_2 = 1;
                            }
                        }
                        else {
                            pattern_matching_result_2 = 1;
                        }
                        switch (pattern_matching_result_2) {
                            case 0: {
                                const checkDim = (item_1) => {
                                    const itemDim = max_3(compare, max_3(compare, item_1.Dim.Length, item_1.Dim.Width), item_1.Dim.Height);
                                    const cDim = max_3(compare, max_3(compare, container_4.Length, container_4.Width), container_4.Height);
                                    return compare(itemDim, cDim) > 0;
                                };
                                const items_2 = convertToItems(model);
                                itemExceeds = (exists(checkDim, items_2) ? true : exists((i_1) => (i_1.Weight > container_4.Weight), items_2));
                                break;
                            }
                            case 1: {
                                itemExceeds = false;
                                break;
                            }
                        }
                        return append(singleton_1(createElement("br", {})), delay(() => append(singleton_1(createElement("div", {
                            className: "is-inline-block",
                            children: reactApi.Children.toArray([createElement("label", {
                                className: "label",
                                children: "Calculation mode:",
                            }), createElement("select", {
                                value: (model.CalculationMode.tag === 1) ? "Minimize Height" : "Minimize Length",
                                children: reactApi.Children.toArray([createElement("option", {
                                    children: ["Minimize Height"],
                                }), createElement("option", {
                                    children: ["Minimize Length"],
                                })]),
                                onChange: (e) => {
                                    dispatch(new Msg(7, e.target.value));
                                },
                            })]),
                        })), delay(() => append(singleton_1(createElement("div", createObj(ofArray([op_PlusPlus(["className", "ml-4"], ["className", "is-inline-block"]), ["children", reactApi.Children.toArray([createElement("label", {
                            className: "label",
                            children: "Container mode:",
                        }), createElement("select", {
                            value: (model.ContainerMode.tag === 0) ? "Single Container" : "Multi Container",
                            children: reactApi.Children.toArray([createElement("option", {
                                children: ["Single Container"],
                            }), createElement("option", {
                                children: ["Multi Container"],
                            })]),
                            onChange: (e_1) => {
                                dispatch(new Msg(8, e_1.target.value));
                            },
                        })])]])))), delay(() => append(singleton_1(createElement("br", {})), delay(() => append(singleton_1(createElement("br", {})), delay(() => {
                            let props_32;
                            return append(singleton_1((props_32 = ofSeq(delay(() => append(singleton_1(["disabled", ((isinvalid ? true : isCalculating) ? true : volumeExceeds) ? true : itemExceeds]), delay(() => append(singleton_1(["className", "is-primary"]), delay(() => append(singleton_1(["id", "calculate-button"]), delay(() => append(singleton_1(["children", isCalculating ? toText(printf("Calculating... (Max %i sec)"))(counterValue) : (volumeExceeds ? "Items\u0027 volume exceeds single container volume." : (isinvalid ? "First fill the form correctly!" : (itemExceeds ? "An item\u0027s parameters are larger than container\u0027s." : "Calculate")))]), delay(() => {
                                const duration = ((model.ContainerMode.tag === 1) ? 100 : 100) | 0;
                                return singleton_1(["onClick", (_arg3) => {
                                    setCounterValue(duration);
                                    dispatch(new Msg(2));
                                }]);
                            })))))))))), createElement("button", createObj(Helpers_combineClasses("button", props_32))))), delay(() => append(singleton_1(createElement("span", {
                                className: "my-1",
                                children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => {
                                    let children_4, props_44;
                                    const matchValue_14 = model.Calculation;
                                    if (matchValue_14.tag === 2) {
                                        const c_1 = matchValue_14.fields[0];
                                        const itemsPut = collect_1((l) => l.ItemsPut, c_1);
                                        const itemsUnput = last(c_1).ItemsUnput;
                                        let label;
                                        const matchValue_15 = [itemsUnput, itemsPut];
                                        if (matchValue_15[0].tail == null) {
                                            const props_34 = ofArray([["style", {
                                                color: "#008000",
                                            }], ["children", "All items put successfully!"]]);
                                            label = createElement("label", createObj(Helpers_combineClasses("label", props_34)));
                                        }
                                        else if (matchValue_15[1].tail == null) {
                                            label = createElement("label", createObj(Helpers_combineClasses("label", ofArray([["className", "is-danger"], ["children", "Unable to fit all items!"]]))));
                                        }
                                        else {
                                            const items_3 = matchValue_15[0];
                                            const g = groupBy((x_11) => x_11.Tag, items_3, {
                                                Equals: (x_12, y_7) => (x_12 === y_7),
                                                GetHashCode: stringHash,
                                            });
                                            label = react.createElement(react.Fragment, {}, createElement("label", {
                                                className: "label",
                                                children: "Could not fit the following items:",
                                            }), (children_4 = ofSeq(delay(() => collect((matchValue_16) => {
                                                let children_2;
                                                const values = matchValue_16[1];
                                                const key_54 = matchValue_16[0];
                                                return singleton_1((children_2 = ofArray([createElement("span", createObj(ofArray([op_PlusPlus(["className", "is-inline-block"], ["className", "has-text-white"]), ["children", " x "], ["style", {
                                                    backgroundColor: key_54,
                                                    width: 1 + "ch",
                                                }]]))), createElement("span", createObj(singleton(printf("%i items not fit with this color.").cont((arg00) => ["children", arg00])(length(values)))))]), createElement("li", {
                                                    children: reactApi.Children.toArray(Array.from(children_2)),
                                                })));
                                            }, g))), createElement("ul", {
                                                children: reactApi.Children.toArray(Array.from(children_4)),
                                            })));
                                        }
                                        return singleton_1(react.createElement(react.Fragment, {}, label, (props_44 = ofArray([["className", "is-info"], ["children", model.UrlShown ? "Now copy the url and share it" : "Share the result"], ["disabled", isCalculating ? true : model.UrlShown], ["onClick", (_arg4) => {
                                            dispatch(new Msg(10));
                                        }]]), createElement("button", createObj(Helpers_combineClasses("button", props_44))))));
                                    }
                                    else {
                                        return singleton_1(null);
                                    }
                                })))),
                            })), delay(() => {
                                let children_8;
                                const matchValue_17 = model.Calculation;
                                if (matchValue_17.tag === 2) {
                                    const c_2 = matchValue_17.fields[0];
                                    return singleton_1((children_8 = ofSeq(delay(() => append(singleton_1(createElement("br", {})), delay(() => {
                                        let props_49;
                                        return append(singleton_1((props_49 = ofArray([["className", "is-danger"], ["children", " \u003c\u003c "], ["disabled", (model.CurrentResultIndex === 0) ? true : isCalculating], ["onClick", (_arg5) => {
                                            dispatch(new Msg(9, model.CurrentResultIndex - 1));
                                        }]]), createElement("button", createObj(Helpers_combineClasses("button", props_49))))), delay(() => {
                                            let matchValue_18, c_3;
                                            const containers = createElement("span", createObj(ofArray([["className", "has-text-weight-semibold"], printf("Showing container: %i/%i").cont((arg00_1) => ["children", arg00_1])(model.CurrentResultIndex + 1)(length(c_2))])));
                                            return append((matchValue_18 = model.Calculation, (matchValue_18.tag === 2) ? (c_3 = matchValue_18.fields[0], singleton_1(createElement("span", {
                                                className: "mx-2",
                                                style: {
                                                    display: "inline-flex",
                                                    flexDirection: "column",
                                                },
                                                children: reactApi.Children.toArray([containers, createElement("span", createObj(ofSeq(delay(() => append(singleton_1(["className", "has-text-weight-semibold"]), delay(() => ((length(item_2(model.CurrentResultIndex, c_3).ItemsPut) > 0) ? singleton_1(printf("Max item L:%i, H:%i").cont((arg00_2) => ["children", arg00_2])(max_4(map_2((i_2) => op_Addition(i_2.Coord.Z, i_2.Item.Dim.Length), item_2(model.CurrentResultIndex, c_3).ItemsPut), {
                                                    Compare: compare,
                                                }))(max_4(map_2((i_3) => op_Addition(i_3.Coord.Y, i_3.Item.Dim.Height), item_2(model.CurrentResultIndex, c_3).ItemsPut), {
                                                    Compare: compare,
                                                }))) : empty())))))))]),
                                            }))) : singleton_1(containers)), delay(() => {
                                                let props_54;
                                                return singleton_1((props_54 = ofArray([["className", "is-danger"], ["children", " \u003e\u003e "], ["disabled", (model.CurrentResultIndex === (length(c_2) - 1)) ? true : isCalculating], ["onClick", (_arg6) => {
                                                    dispatch(new Msg(9, model.CurrentResultIndex + 1));
                                                }]]), createElement("button", createObj(Helpers_combineClasses("button", props_54)))));
                                            }));
                                        }));
                                    })))), createElement("div", {
                                        children: reactApi.Children.toArray(Array.from(children_8)),
                                    })));
                                }
                                else {
                                    return singleton_1(null);
                                }
                            }))));
                        }))))))))));
                    }));
                }));
            }));
        }))))));
    }))))))))));
    content = createElement("div", {
        className: "field",
        children: reactApi.Children.toArray(Array.from(elms_1)),
    });
    const elms_6 = singleton((elms_5 = singleton((elms_4 = singleton((props_61 = ofArray([["className", "mt-1"], ["children", reactApi.Children.toArray([(elms_2 = singleton(createElement("h1", {
        style: {
            color: "#FFFFFF",
        },
        children: "3D Bin Packer",
    })), createElement("p", {
        className: "panel-heading",
        children: reactApi.Children.toArray(Array.from(elms_2)),
    })), createElement("div", {
        className: "panel-block",
        children: reactApi.Children.toArray([content]),
    })])]]), createElement("nav", createObj(Helpers_combineClasses("panel", props_61))))), createElement("div", {
        className: "column",
        children: reactApi.Children.toArray(Array.from(elms_4)),
    }))), createElement("div", {
        className: "columns",
        children: reactApi.Children.toArray(Array.from(elms_5)),
    })));
    return createElement("div", {
        className: "container",
        children: reactApi.Children.toArray(Array.from(elms_6)),
    });
});

export function view(model, dispatch) {
    return viewC({
        dispatch: dispatch,
        model: model,
    });
}

(function () {
    let program_5;
    const program_4 = Program_Internal_withReactBatchedUsing(lazyView2With, "elmish-app", ProgramModule_withConsoleTrace(ProgramModule_mkProgram(init, update, view)));
    try {
        let patternInput;
        try {
            let coders;
            let extra_6;
            const extra_3 = new ExtraCoders((() => {
                let copyOfStruct = newGuid();
                return copyOfStruct;
            })(), add("System.Decimal", [decimal, (path) => ((value_1) => decimal_1(path, value_1))], empty_1.Coders));
            extra_6 = (new ExtraCoders((() => {
                let copyOfStruct_1 = newGuid();
                return copyOfStruct_1;
            })(), add("System.Int64", [int64, int64_1], extra_3.Coders)));
            coders = (new ExtraCoders((() => {
                let copyOfStruct_2 = newGuid();
                return copyOfStruct_2;
            })(), add("System.UInt64", [uint64, uint64_1], extra_6.Coders)));
            const encoder_3 = Auto_generateEncoder_Z127D9D79(void 0, coders, void 0, {
                ResolveType: ClientModel_Model$reflection,
            });
            const decoder_3 = Auto_generateDecoder_7848D058(void 0, coders, {
                ResolveType: ClientModel_Model$reflection,
            });
            const deflate = (x) => {
                try {
                    return encoder_3(x);
                }
                catch (er) {
                    Debugger_showWarning(singleton(er.message));
                    return x;
                }
            };
            const inflate = (x_1) => {
                const matchValue = fromValue("$", uncurry(2, decoder_3), x_1);
                if (matchValue.tag === 1) {
                    const er_1 = matchValue.fields[0];
                    throw (new Error(er_1));
                }
                else {
                    const x_2 = matchValue.fields[0];
                    return x_2;
                }
            };
            patternInput = [deflate, inflate];
        }
        catch (er_2) {
            Debugger_showWarning(singleton(er_2.message));
            patternInput = [(value_7) => value_7, (_arg1) => {
                throw (new Error("Cannot inflate model"));
            }];
        }
        const inflater = patternInput[1];
        const deflater = patternInput[0];
        let connection;
        const opt = new Debugger_ConnectionOptions(0);
        const makeMsgObj = (tupledArg) => {
            const case$ = tupledArg[0];
            const fields = tupledArg[1];
            return {
                type: case$,
                msg: fields,
            };
        };
        const getCase = (x_3) => {
            if (isUnion(x_3)) {
                const getCaseName = (acc_mut, x_4_mut) => {
                    getCaseName:
                    while (true) {
                        const acc = acc_mut, x_4 = x_4_mut;
                        const acc_1 = cons(getCaseName_1(x_4), acc);
                        const fields_1 = getCaseFields(x_4);
                        if ((fields_1.length === 1) ? isUnion(fields_1[0]) : false) {
                            acc_mut = acc_1;
                            x_4_mut = fields_1[0];
                            continue getCaseName;
                        }
                        else {
                            return makeMsgObj([join("/", acc_1), fields_1]);
                        }
                        break;
                    }
                };
                return getCaseName(empty_2(), x_3);
            }
            else {
                return makeMsgObj(["NOT-AN-F#-UNION", x_3]);
            }
        };
        const fallback = new Options$1(true, 443, "remotedev.io", true, getCase);
        connection = connectViaExtension((opt.tag === 1) ? (() => {
            const port = opt.fields[1] | 0;
            const address = opt.fields[0];
            const inputRecord_1 = fallback;
            return new Options$1(inputRecord_1.remote, port, address, false, inputRecord_1.getActionType);
        })() : ((opt.tag === 2) ? (() => {
            const port_1 = opt.fields[1] | 0;
            const address_1 = opt.fields[0];
            const inputRecord_2 = fallback;
            return new Options$1(inputRecord_2.remote, port_1, address_1, inputRecord_2.secure, inputRecord_2.getActionType);
        })() : (new Options$1(false, 8000, "localhost", false, fallback.getActionType))));
        program_5 = Program_withDebuggerUsing(deflater, inflater, connection, program_4);
    }
    catch (ex) {
        Debugger_showError(ofArray(["Unable to connect to the monitor, continuing w/o debugger", ex.message]));
        program_5 = program_4;
    }
    let hmrState = null;
    const hot = module.hot;
    if (!(hot == null)) {
        window.Elmish_HMR_Count = ((window.Elmish_HMR_Count == null) ? 0 : (window.Elmish_HMR_Count + 1));
        const value_8 = hot.accept();
        void undefined;
        const matchValue_1 = Internal_tryRestoreState(hot);
        if (matchValue_1 == null) {
        }
        else {
            const previousState = value_175(matchValue_1);
            hmrState = previousState;
        }
    }
    const map = (tupledArg_1) => {
        const model_2 = tupledArg_1[0];
        const cmd = tupledArg_1[1];
        return [model_2, Cmd_map((arg0) => (new Msg$1(0, arg0)), cmd)];
    };
    const mapUpdate = (update_1, msg_1, model_3) => {
        let msg_2, userModel, patternInput_1, newModel, cmd_2;
        const patternInput_2 = map((msg_1.tag === 1) ? [new Model$1(0), Cmd_none()] : (msg_2 = msg_1.fields[0], (model_3.tag === 1) ? (userModel = model_3.fields[0], (patternInput_1 = update_1(msg_2, userModel), (newModel = patternInput_1[0], (cmd_2 = patternInput_1[1], [new Model$1(1, newModel), cmd_2])))) : [model_3, Cmd_none()]));
        const newModel_1 = patternInput_2[0];
        const cmd_3 = patternInput_2[1];
        hmrState = newModel_1;
        return [newModel_1, cmd_3];
    };
    const createModel = (tupledArg_2) => {
        const model_4 = tupledArg_2[0];
        const cmd_4 = tupledArg_2[1];
        return [new Model$1(1, model_4), cmd_4];
    };
    const mapInit = (init_1) => {
        if (hmrState == null) {
            return (arg_2) => createModel(map(init_1(arg_2)));
        }
        else {
            return (_arg1_1) => [hmrState, Cmd_none()];
        }
    };
    const mapSetState = (setState, model_5, dispatch_2) => {
        if (model_5.tag === 1) {
            const userModel_1 = model_5.fields[0];
            setState(userModel_1, (arg_3) => dispatch_2(new Msg$1(0, arg_3)));
        }
    };
    let hmrSubscription;
    const handler = (dispatch_3) => {
        if (!(hot == null)) {
            hot.dispose((data) => {
                Internal_saveState(data, hmrState);
                return dispatch_3(new Msg$1(1));
            });
        }
    };
    hmrSubscription = singleton(handler);
    const mapSubscribe = (subscribe, model_6) => {
        if (model_6.tag === 1) {
            const userModel_2 = model_6.fields[0];
            return Cmd_batch(ofArray([Cmd_map((arg0_2) => (new Msg$1(0, arg0_2)), subscribe(userModel_2)), hmrSubscription]));
        }
        else {
            return Cmd_none();
        }
    };
    const mapView = (view_2, model_7, dispatch_4) => {
        if (model_7.tag === 1) {
            const userModel_3 = model_7.fields[0];
            return view_2(userModel_3, (arg_4) => dispatch_4(new Msg$1(0, arg_4)));
        }
        else {
            throw (new Error("\nYour are using HMR and this Elmish application has been marked as inactive.\n\nYou should not see this message\n                    "));
        }
    };
    ProgramModule_runWith(void 0, ProgramModule_map(uncurry(2, mapInit), mapUpdate, mapView, mapSetState, mapSubscribe, program_5));
})();

