import { Union, Record } from "../Client/.fable/fable-library.3.1.1/Types.js";
import { lambda_type, tuple_type, option_type, float64_type, list_type, bool_type, string_type, int32_type, union_type, record_type, class_type } from "../Client/.fable/fable-library.3.1.1/Reflection.js";
import { printf, toText } from "../Client/.fable/fable-library.3.1.1/String.js";

export class Coordinates extends Record {
    constructor(X, Y, Z) {
        super();
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
}

export function Coordinates$reflection() {
    return record_type("Shared.Coordinates", [], Coordinates, () => [["X", class_type("System.Int64")], ["Y", class_type("System.Int64")], ["Z", class_type("System.Int64")]]);
}

export class Dim extends Record {
    constructor(Width, Height, Length) {
        super();
        this.Width = Width;
        this.Height = Height;
        this.Length = Length;
    }
}

export function Dim$reflection() {
    return record_type("Shared.Dim", [], Dim, () => [["Width", class_type("System.Int64")], ["Height", class_type("System.Int64")], ["Length", class_type("System.Int64")]]);
}

export class CalculationMode extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["MinimizeLength", "MinimizeHeight", "MinimizeVolume"];
    }
}

export function CalculationMode$reflection() {
    return union_type("Shared.CalculationMode", [], CalculationMode, () => [[], [], []]);
}

export class ContainerMode extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["SingleContainer", "MultiContainer"];
    }
}

export function ContainerMode$reflection() {
    return union_type("Shared.ContainerMode", [], ContainerMode, () => [[], []]);
}

export class Container extends Record {
    constructor(Dim, Coord, Weight) {
        super();
        this.Dim = Dim;
        this.Coord = Coord;
        this.Weight = (Weight | 0);
    }
}

export function Container$reflection() {
    return record_type("Shared.Container", [], Container, () => [["Dim", Dim$reflection()], ["Coord", Coordinates$reflection()], ["Weight", int32_type]]);
}

export class Item extends Record {
    constructor(Dim, Weight, Id, Tag, NoTop, KeepTop, KeepBottom) {
        super();
        this.Dim = Dim;
        this.Weight = (Weight | 0);
        this.Id = Id;
        this.Tag = Tag;
        this.NoTop = NoTop;
        this.KeepTop = KeepTop;
        this.KeepBottom = KeepBottom;
    }
}

export function Item$reflection() {
    return record_type("Shared.Item", [], Item, () => [["Dim", Dim$reflection()], ["Weight", int32_type], ["Id", string_type], ["Tag", string_type], ["NoTop", bool_type], ["KeepTop", bool_type], ["KeepBottom", bool_type]]);
}

export class ItemPut extends Record {
    constructor(Item, Coord) {
        super();
        this.Item = Item;
        this.Coord = Coord;
    }
}

export function ItemPut$reflection() {
    return record_type("Shared.ItemPut", [], ItemPut, () => [["Item", Item$reflection()], ["Coord", Coordinates$reflection()]]);
}

export class ItemsWithCost extends Record {
    constructor(Items, Cost) {
        super();
        this.Items = Items;
        this.Cost = Cost;
    }
}

export function ItemsWithCost$reflection() {
    return record_type("Shared.ItemsWithCost", [], ItemsWithCost, () => [["Items", list_type(Item$reflection())], ["Cost", float64_type]]);
}

export class Counter extends Record {
    constructor(Value) {
        super();
        this.Value = (Value | 0);
    }
}

export function Counter$reflection() {
    return record_type("Shared.Counter", [], Counter, () => [["Value", int32_type]]);
}

export class CalcResult extends Record {
    constructor(ItemsPut, ContainerVol, ItemsUnput, PutVolume, Container, EmptyContainers) {
        super();
        this.ItemsPut = ItemsPut;
        this.ContainerVol = ContainerVol;
        this.ItemsUnput = ItemsUnput;
        this.PutVolume = PutVolume;
        this.Container = Container;
        this.EmptyContainers = EmptyContainers;
    }
}

export function CalcResult$reflection() {
    return record_type("Shared.CalcResult", [], CalcResult, () => [["ItemsPut", list_type(ItemPut$reflection())], ["ContainerVol", class_type("System.Int64")], ["ItemsUnput", list_type(Item$reflection())], ["PutVolume", class_type("System.Int64")], ["Container", Container$reflection()], ["EmptyContainers", list_type(Container$reflection())]]);
}

export class ClientModel_Calculation extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["NotCalculated", "Calculating", "Calculated"];
    }
}

export function ClientModel_Calculation$reflection() {
    return union_type("Shared.ClientModel.Calculation", [], ClientModel_Calculation, () => [[], [], [["Item", list_type(CalcResult$reflection())]]]);
}

export class ClientModel_RowItem extends Record {
    constructor(Width, Height, Length, Weight, Color, Quantity, Stackable, KeepTop, KeepBottom) {
        super();
        this.Width = Width;
        this.Height = Height;
        this.Length = Length;
        this.Weight = (Weight | 0);
        this.Color = Color;
        this.Quantity = (Quantity | 0);
        this.Stackable = Stackable;
        this.KeepTop = KeepTop;
        this.KeepBottom = KeepBottom;
    }
}

export function ClientModel_RowItem$reflection() {
    return record_type("Shared.ClientModel.RowItem", [], ClientModel_RowItem, () => [["Width", class_type("System.Int64")], ["Height", class_type("System.Int64")], ["Length", class_type("System.Int64")], ["Weight", int32_type], ["Color", string_type], ["Quantity", int32_type], ["Stackable", bool_type], ["KeepTop", bool_type], ["KeepBottom", bool_type]]);
}

export class ClientModel_ContainerItem extends Record {
    constructor(Width, Height, Length, Weight) {
        super();
        this.Width = Width;
        this.Height = Height;
        this.Length = Length;
        this.Weight = (Weight | 0);
    }
}

export function ClientModel_ContainerItem$reflection() {
    return record_type("Shared.ClientModel.ContainerItem", [], ClientModel_ContainerItem, () => [["Width", class_type("System.Int64")], ["Height", class_type("System.Int64")], ["Length", class_type("System.Int64")], ["Weight", int32_type]]);
}

export class ClientModel_Model extends Record {
    constructor(Calculation, CalculationMode, ContainerMode, Container, ContainerItem, RowItems, TotalVolume, CurrentResultIndex, UrlShown, Loading) {
        super();
        this.Calculation = Calculation;
        this.CalculationMode = CalculationMode;
        this.ContainerMode = ContainerMode;
        this.Container = Container;
        this.ContainerItem = ContainerItem;
        this.RowItems = RowItems;
        this.TotalVolume = TotalVolume;
        this.CurrentResultIndex = (CurrentResultIndex | 0);
        this.UrlShown = UrlShown;
        this.Loading = Loading;
    }
}

export function ClientModel_Model$reflection() {
    return record_type("Shared.ClientModel.Model", [], ClientModel_Model, () => [["Calculation", ClientModel_Calculation$reflection()], ["CalculationMode", CalculationMode$reflection()], ["ContainerMode", ContainerMode$reflection()], ["Container", option_type(Container$reflection())], ["ContainerItem", option_type(ClientModel_ContainerItem$reflection())], ["RowItems", list_type(tuple_type(option_type(ClientModel_RowItem$reflection()), string_type))], ["TotalVolume", option_type(class_type("System.Int64"))], ["CurrentResultIndex", int32_type], ["UrlShown", bool_type], ["Loading", bool_type]]);
}

export class Calcs extends Record {
    constructor(ContainerMode, CalculationMode) {
        super();
        this.ContainerMode = ContainerMode;
        this.CalculationMode = CalculationMode;
    }
}

export function Calcs$reflection() {
    return record_type("Shared.Calcs", [], Calcs, () => [["ContainerMode", ContainerMode$reflection()], ["CalculationMode", CalculationMode$reflection()]]);
}

export function Route_builder(typeName, methodName) {
    return toText(printf("/api/%s/%s"))(typeName)(methodName);
}

export class ICalcApi extends Record {
    constructor(run, saveModel, loadModel) {
        super();
        this.run = run;
        this.saveModel = saveModel;
        this.loadModel = loadModel;
    }
}

export function ICalcApi$reflection() {
    return record_type("Shared.ICalcApi", [], ICalcApi, () => [["run", lambda_type(Calcs$reflection(), lambda_type(Container$reflection(), lambda_type(list_type(Item$reflection()), lambda_type(float64_type, lambda_type(float64_type, class_type("Microsoft.FSharp.Control.FSharpAsync`1", [list_type(CalcResult$reflection())]))))))], ["saveModel", lambda_type(ClientModel_Model$reflection(), class_type("Microsoft.FSharp.Control.FSharpAsync`1", [class_type("System.Guid")]))], ["loadModel", lambda_type(class_type("System.Guid"), class_type("Microsoft.FSharp.Control.FSharpAsync`1", [ClientModel_Model$reflection()]))]]);
}

