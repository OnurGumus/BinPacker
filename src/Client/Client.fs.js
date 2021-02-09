import { toString as toString_1, Record, Union } from "./.fable/fable-library.3.1.1/Types.js";
import { ClientModel_RowItem, ClientModel_ContainerItem, ClientModel_Model, ContainerMode as ContainerMode_2, CalculationMode as CalculationMode_2, ClientModel_Calculation, Container as Container_1, ItemPut, Item, Dim as Dim_2, Coordinates, Calcs, ICalcApi$reflection, Route_builder, ClientModel_Model$reflection, ClientModel_ContainerItem$reflection, ClientModel_RowItem$reflection, CalcResult$reflection } from "../Shared/Shared.fs.js";
import { lambda_type, unit_type, record_type, bool_type, union_type, int32_type, option_type, string_type, class_type, list_type } from "./.fable/fable-library.3.1.1/Reflection.js";
import { join, toText, substring, printf, toConsole } from "./.fable/fable-library.3.1.1/String.js";
import { op_UnaryNegation, compare, parse as parse_2, op_Addition, fromInteger, fromInt, toString, toInt, op_Subtraction, abs, op_Multiply, fromBits } from "./.fable/fable-library.3.1.1/Long.js";
import { RemotingModule_createApi, RemotingModule_withRouteBuilder, Remoting_buildProxy_Z15584635 } from "./.fable/Fable.Remoting.Client.7.2.0/Remoting.fs.js";
import { stringHash, max as max_3, randomNext, createObj, equals, int32ToString, curry } from "./.fable/fable-library.3.1.1/Util.js";
import { Cmd_OfFunc_result, Cmd_ofSub, Cmd_none, Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./.fable/Fable.Elmish.3.1.0/cmd.fs.js";
import { parse, newGuid } from "./.fable/fable-library.3.1.1/Guid.js";
import { validateSync, single, Validator$1__Test, Validator$1__NotBlank_2B595, Validator$1__To_7C4B0DD6, Validator$1__Gt, Validator$1__Lt, Validator$1__End_Z5E18B1E2 } from "./.fable/Fable.Validation.0.2.1/Validation.fs.js";
import { renderResult, init as init_1 } from "./CanvasRenderer.fs.js";
import { max as max_4, groupBy, last, collect as collect_1, maxBy, exists, indexed, length, cons, sumBy, forAll, map as map_1, filter, append as append_1, singleton, item as item_2, ofSeq, ofArray } from "./.fable/fable-library.3.1.1/List.js";
import { empty, singleton as singleton_1, rangeNumber, collect, rangeLong, map, append, delay } from "./.fable/fable-library.3.1.1/Seq.js";
import { map as map_2, defaultArg, value as value_175, some } from "./.fable/fable-library.3.1.1/Option.js";
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
import { ProgramModule_mkProgram, ProgramModule_run } from "./.fable/Fable.Elmish.3.1.0/program.fs.js";
import { Program_withReactBatched } from "./.fable/Fable.Elmish.React.3.0.1/react.fs.js";

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

export const Server_api = Remoting_buildProxy_Z15584635(RemotingModule_withRouteBuilder(Route_builder, RemotingModule_createApi()), {
    ResolveType: ICalcApi$reflection,
});

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
    init_1();
    const colors = ofArray(["green", "blue", "red", "pink", "yellow", "aqua", "orange", "white", "purple", "lime"]);
    const boxes = ofSeq(delay(() => append(map((i) => {
        let Dim, Tag;
        const Coord = new Coordinates(op_Multiply(i, fromBits(10, 0, false)), op_Multiply(abs(op_Subtraction(fromBits(5, 0, false), i)), fromBits(10, 0, false)), op_Multiply(abs(op_Subtraction(fromBits(5, 0, false), i)), fromBits(10, 0, false)));
        return new ItemPut((Dim = (new Dim_2(fromBits(10, 0, false), fromBits(10, 0, false), fromBits(10, 0, false))), (Tag = item_2(~(~toInt(i)), colors), new Item(Dim, 0, toString(i), Tag, false, false, false))), Coord);
    }, rangeLong(fromBits(0, 0, false), fromInt(1), fromBits(9, 0, false), false)), delay(() => map((i_1) => {
        let Dim_1, Tag_1;
        const Coord_1 = new Coordinates(op_Multiply(i_1, fromBits(10, 0, false)), op_Multiply(abs(op_Subtraction(fromBits(5, 0, false), i_1)), fromBits(10, 0, false)), op_Subtraction(fromBits(90, 0, false), op_Multiply(abs(op_Subtraction(fromBits(5, 0, false), i_1)), fromBits(10, 0, false))));
        return new ItemPut((Dim_1 = (new Dim_2(fromBits(10, 0, false), fromBits(10, 0, false), fromBits(10, 0, false))), (Tag_1 = item_2(~(~toInt(i_1)), colors), new Item(Dim_1, 0, toString(i_1), Tag_1, false, false, false))), Coord_1);
    }, rangeLong(fromBits(0, 0, false), fromInt(1), fromBits(9, 0, false), false))))));
    const container = new Container_1(new Dim_2(fromBits(100, 0, false), fromBits(100, 0, false), fromBits(100, 0, false)), new Coordinates(fromBits(0, 0, false), fromBits(0, 0, false), fromBits(0, 0, false)), 0);
    let patternInput;
    try {
        const matchValue = window.top.location.search;
        let pattern_matching_result;
        if (matchValue === null) {
            pattern_matching_result = 0;
        }
        else if (matchValue === "") {
            pattern_matching_result = 0;
        }
        else if (matchValue.indexOf("?g=") === 0) {
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
                patternInput = [loadCmd(parse(substring(window.location.search, 3))), true];
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
    renderResult(container, boxes, true);
    return [new ClientModel_Model(new ClientModel_Calculation(0), new CalculationMode_2(0), new ContainerMode_2(0), void 0, void 0, singleton(newRowItem()), void 0, 0, false, patternInput[1]), patternInput[0]];
}

export const cols = ofArray(["Length", "Width", "Height", "Weight", "Quant.", "⬆⬆", "⬇⬇", "Stack", "Color", "", ""]);

export function validateTreshold(v) {
    return single((t) => Validator$1__End_Z5E18B1E2(t, Validator$1__Lt(t, 100000, "must be less than {max}")(Validator$1__Gt(t, 0, "must be greater than {min}")(Validator$1__To_7C4B0DD6(t, parse_1)("must be a number")(Validator$1__NotBlank_2B595(t, "cannot be blank")(Validator$1__Test(t, "s", v)))))));
}

export function convertToItems(model) {
    return ofSeq(delay(() => collect((matchValue) => {
        const r_1 = value_175(matchValue[0]);
        return map((i) => (new Item(new Dim_2(r_1.Width, r_1.Height, r_1.Length), r_1.Weight, matchValue[1] + int32ToString(i), r_1.Color, !r_1.Stackable, r_1.KeepTop, r_1.KeepBottom)), rangeNumber(1, 1, r_1.Quantity));
    }, model.RowItems)));
}

export function update(msg, model) {
    let matchValue_2;
    let patternInput;
    if (msg.tag === 1) {
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, true, model.Loading), Cmd_ofSub((_arg1) => {
            window.history.replaceState(null, null, toText(printf("?g=%s"))(msg.fields[0]));
        })];
    }
    else if (msg.tag === 10) {
        patternInput = [model, saveCmd(model)];
    }
    else if (msg.tag === 9) {
        const matchValue_1 = model.Calculation;
        if (matchValue_1.tag === 2) {
            patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, msg.fields[0], model.UrlShown, model.Loading), Cmd_OfFunc_result(new Msg(0, matchValue_1.fields[0]))];
        }
        else {
            throw (new Error("should not happen"));
        }
    }
    else if (msg.tag === 3) {
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, append_1(model.RowItems, singleton(newRowItem())), model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()];
    }
    else if (msg.tag === 4) {
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, filter((tupledArg) => (tupledArg[1] !== msg.fields[0]), model.RowItems), model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()];
    }
    else if (msg.tag === 5) {
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, map_1((_arg2) => {
            const old = _arg2;
            if (old[1] === msg.fields[0]) {
                return [msg.fields[1], msg.fields[0]];
            }
            else {
                return old;
            }
        }, model.RowItems), model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()];
    }
    else if (msg.tag === 0) {
        const model_2 = new ClientModel_Model(new ClientModel_Calculation(2, msg.fields[0]), model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading);
        patternInput = [model_2, Cmd_ofSub((_arg3) => {
            renderResult(item_2(model_2.CurrentResultIndex, msg.fields[0]).Container, item_2(model_2.CurrentResultIndex, msg.fields[0]).ItemsPut, false);
        })];
    }
    else if (msg.tag === 6) {
        patternInput = [new ClientModel_Model(model.Calculation, model.CalculationMode, model.ContainerMode, model.Container, msg.fields[0], model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()];
    }
    else if (msg.tag === 7) {
        patternInput = ((msg.fields[0] === "Minimize Length") ? [new ClientModel_Model(model.Calculation, new CalculationMode_2(0), model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()] : ((msg.fields[0] === "Minimize Height") ? [new ClientModel_Model(model.Calculation, new CalculationMode_2(1), model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()] : [model, Cmd_none()]));
    }
    else if (msg.tag === 8) {
        patternInput = ((msg.fields[0] === "Single Container") ? [new ClientModel_Model(model.Calculation, model.CalculationMode, new ContainerMode_2(0), model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()] : ((msg.fields[0] === "Multi Container") ? [new ClientModel_Model(model.Calculation, model.CalculationMode, new ContainerMode_2(1), model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, model.CurrentResultIndex, model.UrlShown, model.Loading), Cmd_none()] : [model, Cmd_none()]));
    }
    else if (msg.tag === 2) {
        const c_4 = value_175(model.ContainerItem);
        patternInput = [new ClientModel_Model(new ClientModel_Calculation(1), model.CalculationMode, model.ContainerMode, model.Container, model.ContainerItem, model.RowItems, model.TotalVolume, 0, false, model.Loading), runCmd(model.ContainerMode, model.CalculationMode, new Container_1(new Dim_2(c_4.Width, c_4.Height, c_4.Length), new Coordinates(fromBits(0, 0, false), fromBits(0, 0, false), fromBits(0, 0, false)), c_4.Weight), convertToItems(model))];
    }
    else {
        const matchValue = msg.fields[0].Calculation;
        if (matchValue.tag === 2) {
            patternInput = [new ClientModel_Model(msg.fields[0].Calculation, msg.fields[0].CalculationMode, msg.fields[0].ContainerMode, msg.fields[0].Container, msg.fields[0].ContainerItem, msg.fields[0].RowItems, msg.fields[0].TotalVolume, msg.fields[0].CurrentResultIndex, msg.fields[0].UrlShown, false), Cmd_OfFunc_result(new Msg(0, matchValue.fields[0]))];
        }
        else {
            throw (new Error("should not happen"));
        }
    }
    const model_3 = patternInput[0];
    return [new ClientModel_Model(model_3.Calculation, model_3.CalculationMode, model_3.ContainerMode, model_3.Container, model_3.ContainerItem, model_3.RowItems, (matchValue_2 = model_3.RowItems, forAll((x) => (x[0] != null), matchValue_2) ? sumBy((x_2) => op_Multiply(op_Multiply(op_Multiply(x_2.Width, x_2.Height), x_2.Length), fromInteger(x_2.Quantity, false, 2)), map_1((x_1) => value_175(x_1[0]), matchValue_2), {
        GetZero: () => fromInt(0),
        Add: op_Addition,
    }) : (void 0)), model_3.CurrentResultIndex, model_3.UrlShown, model_3.Loading), patternInput[1]];
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
        return new ClientModel_ContainerItem(floatCheck("width")(formData.Width), floatCheck("height")(formData.Height), floatCheck("length")(formData.Length), numericCheck(t, (value_2) => parse_3(value_2, 511, false, 32), -1, 100000, "weight", formData.Weight));
    });
}

export function Container_update(containerUpdated, msg, state) {
    const formData = state.FormData;
    const formData_1 = (msg.tag === 1) ? (new ContainerFormData(formData.Width, msg.fields[0], formData.Length, formData.Weight)) : ((msg.tag === 2) ? (new ContainerFormData(formData.Width, formData.Height, msg.fields[0], formData.Weight)) : ((msg.tag === 3) ? (new ContainerFormData(formData.Width, formData.Height, formData.Length, msg.fields[0])) : (new ContainerFormData(msg.fields[0], formData.Height, formData.Length, formData.Weight))));
    const r_1 = Container_validate(formData_1);
    return [new Container_Model(r_1, formData_1), (r_1.tag === 0) ? (equals(r_1, state.ContainerItem) ? Cmd_none() : ((r_1.tag === 1) ? Cmd_ofSub((_arg2) => {
        containerUpdated(void 0);
    }) : Cmd_ofSub((_arg1) => {
        containerUpdated(r_1.fields[0]);
    }))) : ((r_1.tag === 1) ? Cmd_ofSub((_arg2) => {
        containerUpdated(void 0);
    }) : Cmd_ofSub((_arg1) => {
        containerUpdated(r_1.fields[0]);
    }))];
}

export const Container_view = React_functionComponent_2F9D7239((props) => {
    const patternInput = useFeliz_React__React_useElmish_Static_17DC4F1D(Container_init(props.ContainerFormData), (msg, state) => Container_update(props.ContainerUpdated, msg, state), []);
    const model = patternInput[0];
    return createElement("div", createObj(ofSeq(delay(() => {
        const cols_1 = ofArray(["Length", "Width", "Height", "Max Weight"]);
        return append(singleton_1(["className", "table"]), delay(() => singleton_1(["children", reactApi.Children.toArray([createElement("div", {
            className: "tr",
            children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => map((col_2) => createElement("div", {
                className: join(" ", ["td", "th"]),
                children: reactApi.Children.toArray([createElement("label", createObj(Helpers_combineClasses("label", ofArray([["className", "is-small"], ["children", col_2]]))))]),
            }), cols_1))))),
        }), createElement("div", {
            className: "tr",
            children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => map((col_3) => {
                let props_5, col_1, matchValue;
                const props_7 = ofArray([["className", "td"], ["children", reactApi.Children.toArray([(props_5 = ofArray([["readOnly", props.Disabled], ["maxLength", 4], ["max", 2000], ["defaultValue", (col_1 = col_3, (col_1 === "Height") ? model.FormData.Height : ((col_1 === "Width") ? model.FormData.Width : ((col_1 === "Length") ? model.FormData.Length : ((col_1 === "Max Weight") ? (matchValue = model.FormData.Weight, (matchValue === null) ? "0" : ((matchValue === "") ? "0" : matchValue)) : (() => {
                    throw (new Error(col_1));
                })()))))], ["className", "is-small"], ["placeholder", col_3], ["onChange", (e_1) => {
                    const v = Browser_Types_Event__Event_get_Value(e_1);
                    const col = col_3;
                    patternInput[1]((col === "Height") ? (new Container_Msg(1, v)) : ((col === "Width") ? (new Container_Msg(0, v)) : ((col === "Length") ? (new Container_Msg(2, v)) : ((col === "Max Weight") ? (new Container_Msg(3, v)) : (() => {
                        throw (new Error(col));
                    })()))));
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
        const Width = floatCheck("width")(formData.Width);
        const Height = floatCheck("height")(formData.Height);
        const Length = floatCheck("length")(formData.Length);
        const Quantity = numericCheck(t, (value_1) => parse_3(value_1, 511, false, 32), 0, 2000, "quantity", formData.Quantity) | 0;
        return new ClientModel_RowItem(Width, Height, Length, numericCheck(t, (value_2) => parse_3(value_2, 511, false, 32), -1, 100000, "weight", formData.Weight), formData.Color, Quantity, formData.Stackable, formData.KeepTop, formData.KeepBottom);
    });
}

export function Row_update(rowUpdated, msg, state) {
    const formData = state.FormData;
    const formData_1 = (msg.tag === 1) ? (new RowFormData(formData.Width, msg.fields[0], formData.Length, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom)) : ((msg.tag === 2) ? (new RowFormData(formData.Width, formData.Height, msg.fields[0], formData.Quantity, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom)) : ((msg.tag === 3) ? (new RowFormData(formData.Width, formData.Height, formData.Length, formData.Quantity, msg.fields[0], formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom)) : ((msg.tag === 7) ? (new RowFormData(formData.Width, formData.Height, formData.Length, msg.fields[0], formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom)) : ((msg.tag === 4) ? (new RowFormData(formData.Width, formData.Height, formData.Length, formData.Quantity, formData.Weight, formData.Color, msg.fields[0], formData.KeepTop, formData.KeepBottom)) : ((msg.tag === 5) ? (new RowFormData(formData.Width, formData.Height, formData.Length, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, msg.fields[0])) : ((msg.tag === 6) ? (new RowFormData(formData.Width, formData.Height, formData.Length, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, msg.fields[0], formData.KeepBottom)) : (new RowFormData(msg.fields[0], formData.Height, formData.Length, formData.Quantity, formData.Weight, formData.Color, formData.Stackable, formData.KeepTop, formData.KeepBottom))))))));
    const r_1 = Row_validate(formData_1);
    return [new Row_Model(r_1, formData_1), (r_1.tag === 0) ? (equals(r_1, state.RowItem) ? Cmd_none() : ((r_1.tag === 1) ? Cmd_ofSub((_arg2) => {
        rowUpdated(void 0);
    }) : Cmd_ofSub((_arg1) => {
        rowUpdated(r_1.fields[0]);
    }))) : ((r_1.tag === 1) ? Cmd_ofSub((_arg2) => {
        rowUpdated(void 0);
    }) : Cmd_ofSub((_arg1) => {
        rowUpdated(r_1.fields[0]);
    }))];
}

export const Row_view = React_functionComponent_2F9D7239((props) => {
    const patternInput = useFeliz_React__React_useElmish_Static_17DC4F1D(Row_init(props.FormData), (msg, state) => Row_update(props.RowUpdated, msg, state), []);
    const model = patternInput[0];
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
        patternInput[1]((col === "Height") ? (new Row_Msg(1, v)) : ((col === "Width") ? (new Row_Msg(0, v)) : ((col === "Weight") ? (new Row_Msg(3, v)) : ((col === "Quant.") ? (new Row_Msg(7, v)) : ((col === "⬆⬆") ? (new Row_Msg(6, parse_4(v))) : ((col === "⬇⬇") ? (new Row_Msg(5, parse_4(v))) : ((col === "Stack") ? (new Row_Msg(4, parse_4(v))) : ((col === "Length") ? (new Row_Msg(2, v)) : (() => {
            throw (new Error(col));
        })()))))))));
    };
    return createElement("div", {
        className: "tr",
        children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => collect((matchValue_2) => {
            let props_15;
            const i = matchValue_2[0] | 0;
            const col_2 = matchValue_2[1];
            return singleton_1((props_15 = ofArray([["className", "td"], ["children", reactApi.Children.toArray(Array.from(ofSeq(delay(() => {
                let props_11, props_13, col_1;
                return (i < (length(cols) - 2)) ? ((col_2 === "⬆⬆") ? singleton_1(createElement("input", createObj(cons(["type", "checkbox"], Helpers_combineClasses("checkbox", ofArray([["className", "is-small"], ["defaultChecked", model.FormData.KeepTop], ["readOnly", props.Disabled], ["onChange", (ev) => {
                    dispatch$0027("⬆⬆", toString_1(ev.target.checked));
                }]])))))) : ((col_2 === "⬇⬇") ? singleton_1(createElement("input", createObj(cons(["type", "checkbox"], Helpers_combineClasses("checkbox", ofArray([["className", "is-small"], ["defaultChecked", model.FormData.KeepBottom], ["readOnly", props.Disabled], ["onChange", (ev_1) => {
                    dispatch$0027("⬇⬇", toString_1(ev_1.target.checked));
                }]])))))) : ((col_2 === "Stack") ? singleton_1(createElement("input", createObj(cons(["type", "checkbox"], Helpers_combineClasses("checkbox", ofArray([["className", "is-small"], ["readOnly", props.Disabled], ["defaultChecked", model.FormData.Stackable], ["onChange", (ev_2) => {
                    dispatch$0027("Stack", toString_1(ev_2.target.checked));
                }]])))))) : ((col_2 === "Color") ? singleton_1((props_11 = ofArray([["className", "is-small"], ["readOnly", true], ["style", {
                    backgroundColor: model.FormData.Color,
                }]]), createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", props_11)))))) : singleton_1((props_13 = ofArray([["maxLength", 5], ["readOnly", props.Disabled], ["defaultValue", (col_1 = col_2, (col_1 === "Height") ? model.FormData.Height : ((col_1 === "Width") ? model.FormData.Width : ((col_1 === "Weight") ? model.FormData.Weight : ((col_1 === "Quant.") ? model.FormData.Quantity : ((col_1 === "⬆⬆") ? toString_1(model.FormData.KeepTop) : ((col_1 === "⬇⬇") ? toString_1(model.FormData.KeepBottom) : ((col_1 === "Stack") ? toString_1(model.FormData.Stackable) : ((col_1 === "Length") ? model.FormData.Length : (() => {
                    throw (new Error(col_1));
                })()))))))))], ["max", 2000], ["className", "is-small"], ["placeholder", col_2], ["onChange", (e_3) => {
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
    const s_1 = join(",", ofSeq(delay(() => append(singleton_1(v.slice(0, (s - 1) + 1)), delay(() => map((i) => v.slice((i * 3) + s, (((i * 3) + s) + 2) + 1), rangeNumber(0, 1, (~(~((v.length - s) / 3))) - 1)))))));
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
    useReact_useEffect_Z5234A374(() => {
        const matchValue_1 = model.Calculation;
        let pattern_matching_result;
        if (matchValue_1.tag === 2) {
            if (exists((r_1) => (length(r_1.ItemsPut) > 0), matchValue_1.fields[0])) {
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
    }, [isCalculating]);
    useReact_useEffect_Z5ECA432F(() => {
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
    });
    const rowItems = ofSeq(delay(() => collect((matchValue_2) => {
        let r_3, Width_1, Height_1, Length_1, Weight_1, arg30, arg20, arg10;
        const row = matchValue_2[1][0];
        const key = matchValue_2[1][1];
        return singleton_1(Row_view(new RowProp((r_2) => {
            dispatch(new Msg(5, key, r_2));
        }, (matchValue_2[0] === (length(model.RowItems) - 1)) ? (() => {
            dispatch(new Msg(3));
        }) : (void 0), (length(model.RowItems) > 1) ? (() => {
            dispatch(new Msg(4, key));
        }) : (void 0), key, isCalculating, (row != null) ? (r_3 = row, (Width_1 = toString(r_3.Width), (Height_1 = toString(r_3.Height), (Length_1 = toString(r_3.Length), (Weight_1 = int32ToString(r_3.Weight), new RowFormData(Width_1, Height_1, Length_1, int32ToString(r_3.Quantity), Weight_1, r_3.Color, r_3.Stackable, r_3.KeepTop, r_3.KeepBottom)))))) : (new RowFormData("", "", "", "", "0", (arg30 = (randomNext(40, 256) | 0), (arg20 = (randomNext(40, 256) | 0), (arg10 = (randomNext(40, 256) | 0), toText(printf("rgb(%i,%i,%i)"))(arg10)(arg20)(arg30)))), true, false, false)))));
    }, indexed(model.RowItems))));
    let content;
    const elms_1 = ofSeq(delay(() => append(singleton_1(createElement("b", {
        children: ["How to use:"],
    })), delay(() => append(singleton_1(createElement("ul", createObj(ofSeq(delay(() => append(singleton_1(op_PlusPlus(["className", "ml-1"], ["className", "is-size-7"])), delay(() => append(singleton_1(["style", {
        listStyleType: "disc",
    }]), delay(() => singleton_1(["children", reactApi.Children.toArray(Array.from(ofSeq(delay(() => map((item) => createElement("li", {
        children: item,
    }), ["Enter container and item dimensions between 1 and 2000, no decimals.", "Weight range is between 0 and 100,000.", "Add as many items as you want.", "If the item is not stackable (no other item is on top of this) uncheck \"Stack\" for that item.", "If the item must keep its upright then check \"⬆⬆\" for that item.", "If the item must be at the bottom (e.g, heavy items) then check \"⬇⬇\" for that item.", "All dimensions are unitless.", "Select the calculation mode depending on items to be at minimum height or pushed to the edge.", "Select container mode to multi container if you want to see how many container it takes to fit", "Click calculate and wait up to 100 sec.", "Bin packer will try to fit the items and minimize the placement.", "Gravity is ignored.", "Review the result in 3D then you may share it via share the result button and copy the url.", "You may visually remove some boxes by using h-filter and v-filter controls on 3D."])))))])))))))))), delay(() => append(singleton_1(react.createElement("br", {})), delay(() => append(singleton_1(createElement("label", createObj(Helpers_combineClasses("label", ofArray([["children", "Enter CONTAINER dimensions:"], ["className", "is-small"]]))))), delay(() => {
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
                children: reactApi.Children.toArray(Array.from(ofSeq(delay(() => map((col) => createElement("div", {
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
                }), (elms = singleton(createElement("output", createObj(ofSeq(delay(() => append(((title.indexOf("Chargable") === 0) ? (v != null) : false) ? singleton_1(["className", "output"]) : empty(), delay(() => singleton_1(["children", defaultArg(map_2(thousands, v), "Please complete the form.")])))))))), createElement("div", {
                    className: "control",
                    children: reactApi.Children.toArray(Array.from(elms)),
                })));
            };
            return append(singleton_1(Array.from(ofSeq(delay(() => collect((matchValue_4) => singleton_1(line(matchValue_4[0], matchValue_4[1])), [["Total Item Volume:", model.TotalVolume]]))))), delay(() => {
                let matchValue_5, container_1;
                return append((matchValue_5 = model.ContainerItem, (matchValue_5 != null) ? (container_1 = matchValue_5, singleton_1(line("Container volume:", op_Multiply(op_Multiply(container_1.Height, container_1.Width), container_1.Length)))) : singleton_1(null)), delay(() => {
                    let matchValue_6;
                    return append((matchValue_6 = model.Calculation, (matchValue_6.tag === 2) ? singleton_1(line("Volume fit:", sumBy((c) => c.PutVolume, matchValue_6.fields[0], {
                        GetZero: () => fromInt(0),
                        Add: op_Addition,
                    }))) : singleton_1(null)), delay(() => {
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
                                maxHeight = ((_arg1_1.tail == null) ? fromBits(0, 0, false) : maxBy((x_5) => x_5.Dim.Height, _arg1_1, {
                                    Compare: compare,
                                }).Dim.Height);
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
                                const items_2 = convertToItems(model);
                                itemExceeds = (exists((item_1) => (compare(max_3(compare, max_3(compare, item_1.Dim.Length, item_1.Dim.Width), item_1.Dim.Height), max_3(compare, max_3(compare, container_4.Length, container_4.Width), container_4.Height)) > 0), items_2) ? true : exists((i_1) => (i_1.Weight > container_4.Weight), items_2));
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
                                    let matchValue_15, props_34, g, children_4, props_44;
                                    const matchValue_14 = model.Calculation;
                                    if (matchValue_14.tag === 2) {
                                        const c_1 = matchValue_14.fields[0];
                                        const itemsPut = collect_1((l) => l.ItemsPut, c_1);
                                        return singleton_1(react.createElement(react.Fragment, {}, (matchValue_15 = [last(c_1).ItemsUnput, itemsPut], (matchValue_15[0].tail == null) ? (props_34 = ofArray([["style", {
                                            color: "#008000",
                                        }], ["children", "All items put successfully!"]]), createElement("label", createObj(Helpers_combineClasses("label", props_34)))) : ((matchValue_15[1].tail == null) ? createElement("label", createObj(Helpers_combineClasses("label", ofArray([["className", "is-danger"], ["children", "Unable to fit all items!"]])))) : (g = groupBy((x_11) => x_11.Tag, matchValue_15[0], {
                                            Equals: (x_12, y_7) => (x_12 === y_7),
                                            GetHashCode: stringHash,
                                        }), react.createElement(react.Fragment, {}, createElement("label", {
                                            className: "label",
                                            children: "Could not fit the following items:",
                                        }), (children_4 = ofSeq(delay(() => collect((matchValue_16) => {
                                            let children_2;
                                            return singleton_1((children_2 = ofArray([createElement("span", createObj(ofArray([op_PlusPlus(["className", "is-inline-block"], ["className", "has-text-white"]), ["children", " x "], ["style", {
                                                backgroundColor: matchValue_16[0],
                                                width: 1 + "ch",
                                            }]]))), createElement("span", createObj(singleton(printf("%i items not fit with this color.").cont((arg00) => ["children", arg00])(length(matchValue_16[1])))))]), createElement("li", {
                                                children: reactApi.Children.toArray(Array.from(children_2)),
                                            })));
                                        }, g))), createElement("ul", {
                                            children: reactApi.Children.toArray(Array.from(children_4)),
                                        })))))), (props_44 = ofArray([["className", "is-info"], ["children", model.UrlShown ? "Now copy the url and share it" : "Share the result"], ["disabled", isCalculating ? true : model.UrlShown], ["onClick", (_arg4) => {
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
                                                children: reactApi.Children.toArray([containers, createElement("span", createObj(ofSeq(delay(() => append(singleton_1(["className", "has-text-weight-semibold"]), delay(() => ((length(item_2(model.CurrentResultIndex, c_3).ItemsPut) > 0) ? singleton_1(printf("Max item L:%i, H:%i").cont((arg00_2) => ["children", arg00_2])(max_4(map_1((i_2) => op_Addition(i_2.Coord.Z, i_2.Item.Dim.Length), item_2(model.CurrentResultIndex, c_3).ItemsPut), {
                                                    Compare: compare,
                                                }))(max_4(map_1((i_3) => op_Addition(i_3.Coord.Y, i_3.Item.Dim.Height), item_2(model.CurrentResultIndex, c_3).ItemsPut), {
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

ProgramModule_run(Program_withReactBatched("elmish-app", ProgramModule_mkProgram(init, update, view)));

